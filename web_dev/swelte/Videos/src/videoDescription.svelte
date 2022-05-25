<script>
    import { Button, Overlay } from "svelte-materialify";
    import { isFullDescription } from "./stores.js";
    import Player from "./Player.svelte";
    export let args;

    // Video player INSPIRED BY AND IMPROVED FROM https://svelte.dev/tutorial/media-elements

    // These values are bound to properties of the video
    let time = 0;
    let duration;
    let paused = true;

    let showControls = true;
    let showControlsTimeout;

    // Used to track time of last mouse down event
    let lastMouseDown;

    function handleMove(e) {
        // Make the controls visible, but fade out after
        // 2.5 seconds of inactivity
        clearTimeout(showControlsTimeout);
        showControlsTimeout = setTimeout(() => (showControls = false), 2500);
        showControls = true;

        if (!duration) return; // video not loaded yet
        if (e.type !== "touchmove" && !(e.buttons & 1)) return; // mouse not down

        const clientX =
            e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
        const { left, right } = this.getBoundingClientRect();
        time = (duration * (clientX - left)) / (right - left);
    }

    function a() {
        clearTimeout(showControlsTimeout);
        showControlsTimeout = setTimeout(() => (showControls = false), 2500);
        showControls = true;
    }

    //https://t22.gomoplayer.com/vxokfuqpx2alavf4eq3yvjouqxhmlu7cqgsebsk72klrdmhahkyxkafknqiq/v.mp4

    // we can't rely on the built-in click event, because it fires
    // after a drag — we have to listen for clicks ourselves
    function handleMousedown(e) {
        lastMouseDown = new Date();
    }

    function handleMouseup(e) {
        if (new Date() - lastMouseDown < 300) {
            if (paused) e.target.play();
            else e.target.pause();
        }
    }

    function handleKeyDown(e) {
        let video = document.getElementById("vid");
        if (e && e.key == " ") {
            if (paused) video.play();
            else video.pause();
        }
    }

    function format(seconds) {
        if (isNaN(seconds)) return "...";

        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        if (seconds < 10) seconds = "0" + seconds;

        return `${minutes}:${seconds}`;
    }

    //https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen#examples
    function toggleFullScreen() {
        let div = document.getElementById("vid");
    
        if (!document.fullscreenElement) {
            div.requestFullscreen();
        } else {
            document.exitFullscreen();
        }

    }
</script>

<Overlay
    style="display:block;  margin-bottom: 10px ;"
    active={$isFullDescription}
    opacity={0.5}
>
    <div class="container">
        <span
            style="position: absolute; top:5px; left:5px; color: white; z-index: 5;"
            ><b>{args["movie_name"]}</b></span
        >
        <div class="video-container" id="vid">
            <video
                src={args["video_src"]}
                poster={args["video_poster"]}
                style="max-width: 100%; width: 100%"
                on:mousedown|preventDefault|stopPropagation={handleMousedown}
                on:mouseup|preventDefault|stopPropagation={handleMouseup}
                bind:currentTime={time}
                bind:duration
                bind:paused
            >
                <track kind="captions" />
            </video>

            <div
                class="controls"
                style="opacity: {duration && showControls ? 1 : 0}"
                on:mousemove|preventDefault|stopPropagation={a}
                on:touchmove|preventDefault|stopPropagation={a}
                on:mousedown|preventDefault|stopPropagation={a}
                on:mouseup|preventDefault|stopPropagation={a}
            >
                <div class="info">
                    <span class="time">{format(time)}</span>
                    <progress
                        value={time / duration || 0}
                        on:mousemove|preventDefault|stopPropagation={handleMove}
                        on:touchmove|preventDefault|stopPropagation={handleMove}
                        on:mousedown|preventDefault|stopPropagation={handleMove}
                        on:mouseup|preventDefault|stopPropagation={handleMove}
                    />
                    <span>
                        <span class="time" style="margin-right: 10%;"
                            >{format(duration)}</span
                        >
                    </span>
                </div>
                <Button
                    size="small"
                    class="secondary-color"
                    style="z-index: 10"
                    on:click={() => {
                        // do not focus the fullscreenbutton if clicked
                        // this is because otherwise clicking space will cause
                        // the video player to maximize/minimize instead of pause/play
                        // when space is clicked
                        //     if (document.activeElement != document.body)
                        //         document.activeElement.blur();

                        toggleFullScreen();
                    }}
                >
                    <i class="fa fa-arrows-alt" />
                </Button>
            </div>
        </div>

        <i
            class="fa fa-times fa-2x"
            style="color: white; position:absolute; top:0; right:0;"
            on:click={() => {
                $isFullDescription = false;
            }}
        />
        <div class="flex-box">
            <div class="item" style="margin-left: 5px;">
                <p style="color:white;">{args["description"]}</p>
            </div>

            <div class="item">
                <div class="flex-box-cast">
                    <p class="actors">
                        <b>Actors:</b>
                        {#each args["actors"] as value}
                            <span>{value}, </span>
                        {/each}
                    </p>
                    <p class="directors">
                        <b>Directors:</b>
                        {args["directors"]}
                    </p>
                    <p class="genres"><b>Genres:</b>
                        {#each args["genres"] as value}
                            <span>{value}, </span>
                        {/each}                        
                    </p>
                </div>
            </div>
        </div>
    </div>
</Overlay>

<style>
    .container {
        width: 70%;
        max-height: 100vh;
        position: relative;
        padding-bottom: 10px;
        background-color: rgb(12, 12, 12);
        margin: 10px auto;
        overflow-y: auto;
    }

    .video-container {
        text-align: center;
        position: relative;
    }

    .controls {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        transition: opacity 1s;
        margin-bottom: 0;
        padding-bottom: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-items: end;
        align-content: flex-end;
        color: white;
    }

    .info {
        display: flex;
        width: 90%;
        justify-content: space-between;
        margin-right: auto;
    }

    .time {
        width: 3em;
    }

    .time:last-child {
        text-align: right;
    }

    progress {
        width: 90%;
        height: 20px;
        margin-right: auto;
        -webkit-appearance: none;
        appearance: none;
    }
    
    @media screen and (max-width: 800px) {
        .container {
            width: 100%;
            font-size: 14px;
        }
    }
    @media screen and (min-width: 2000px) {
        .container {
            width: 50%;
        }
    }


    progress::-webkit-progress-bar {
        background-color: rgba(0, 0, 0, 0.2);
    }

    progress::-webkit-progress-value {
        background-color: rgba(255, 255, 255, 0.6);
    }

    .flex-box {
        display: flex;
        gap: 10px;
    }

    .flex-box-cast {
        display: flex;
        flex-direction: column;
        gap: 1px;
    }

    .flex-box-cast p {
        margin: 0;
        color: white;
    }

    .item {
        width: 50%;
    }

    /** https://onaircode.com/html-css-custom-scrollbar-examples/ */
    ::-webkit-scrollbar {
        width: 0.2em;
        height: 1em;
    }
    ::-webkit-scrollbar-track {
        border-radius: 1em;
        background-color: #ffffff33;
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgb(100, 100, 100);
        border-radius: 1em;
        -webkit-box-shadow: rgba(0, 0, 0, 0.12) 0 3px 13px 1px;
        box-shadow: rgba(0, 0, 0, 0.12) 0 3px 13px 1px;
    }
</style>
