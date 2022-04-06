<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script>
    
    import { Button, Overlay } from "svelte-materialify";
    import Player from "./Player.svelte";
    import colors from "svelte-materialify/src/utils/colors";

    let video_player_is_active = false;
    let is_fullscreen = false;
</script>

<main>
    <div class="header">

            <div>
                <span style="margin-left: 20px; font-size: 4em">Neblix</span>
            </div>
            <div>
                <ul class="navMenu">
                    <li>Home</li>
                    <li>Series</li>
                    <li>Movies</li>
                    <li>New and popular</li>
                    <li>My list</li>
                </ul>
            </div>

            <div class="navSearch">
                <span class="fa fa-search fa-2x"></span>
            </div>    
        </div>
    
    <div class="container">
        <!--
            <div class="autoplayVideo">

            <video controls autoplay poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg" src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"><track kind="captions" /></video>
              
        </div>
        -->
        
       
        <h1>Recomended</h1>

        <div class="flex-container">
            {#each Array(20) as _, i}
                <div  on:click={() => { video_player_is_active = true;}}>
                
                <div class="item"></div>
                </div>
                
            {/each}
        </div>

        <h1>Top 10</h1>

        <div class="flex-container">
            
            {#each Array(10) as _, i}

                <div style="display: flex; flex-direction:row; align-items: center">
                    <span style="font-size: 5em;">{i+1}</span>
                    <div  on:click={() => { video_player_is_active = true;}}>
                
                        <div class="item"></div>
                    </div>
                </div>
            {/each}
        </div>

        <h1>Action</h1>

        <div class="flex-container">
            
        </div>

        <h1>News</h1>

    </div>

    <div>
        
    </div>


   <div class="grid">
        {#each Array(100) as _, i}
            <div
                class="grid-item"
                on:click={() => {
                    video_player_is_active = true;
                }}
            />
            
        {/each}
    </div>
    <Overlay
        opacity={is_fullscreen ? 1 : 0.7}
        color="black"
        active={video_player_is_active}
        on:click={() => {
            video_player_is_active = false;
        }}
    >
        <div
            id="video"
            class:fullscreen={is_fullscreen == true}
            on:click={(e) => {
                e.stopPropagation();
            }}
        >
            <div id="close">
                <Button
                    class="error-color"
                    size="small"
                    on:click={() => {
                        video_player_is_active = false;
                    }}
                >
                    Close
                </Button>
            </div>
            <div id="fullscreen">
                <Button
                    size="small"
                    class="primary-color"
                    on:click={() => {
                        is_fullscreen = !is_fullscreen;
                        // do not focus the fullscreenbutton if clicked
                        // this is because otherwise clicking space will cause
                        // the video player to maximize/minimize instead of pause/play
                        // when space is clicked
                        if (document.activeElement != document.body)
                            document.activeElement.blur();
                    }}
                >
                    {is_fullscreen ? "Minimize" : "Theatre Mode"}
                </Button>
            </div>

            {#if is_fullscreen}
                <div id="gigascreen">
                    <Button
                        size="small"
                        class="secondary-color"
                        on:click={() => {
                            // do not focus the fullscreenbutton if clicked
                            // this is because otherwise clicking space will cause
                            // the video player to maximize/minimize instead of pause/play
                            // when space is clicked
                            if (document.activeElement != document.body)
                                document.activeElement.blur();

                            let div = document.getElementById("vid");
                            if (div.requestFullscreen) div.requestFullscreen();
                            else if (div.webkitRequestFullscreen)
                                div.webkitRequestFullscreen();
                            else if (div.msRequestFullScreen)
                                div.msRequestFullScreen();
                        }}
                    >
                        {"Gigascreen"}
                    </Button>
                </div>
            {/if}

            <Player />
        </div>
    </Overlay>>

<src>
    
</src> -->

</main>

<style>
    :root {
        --netflix-red: #e50914;
        --netflix-red-opacity: rgba(229, 9, 20, 0.3);
    }

    :global(body) {
        padding: 0;
        margin: 0;
    }

    h1 {
        font-size: 3em;
    }

    .header {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: start;
        top: 0;
        right: 0;
        left: 0;
        vertical-align: middle;
        background-color: black;
        color: white;
        height: 75px;
    }

    .navMenu {
        top: 0;
        right: 10px;
        list-style: none;
        display: flex;
        gap: 15px;
    }

    .navSearch {
        margin-left: auto;
        margin-right: 20px;        
    }


    main {
        min-height: 100vh;
        width: 100vw;
        background: black;
        padding-left: 5%;
        padding-right: 5%;
        box-sizing: border-box;
    }

    .container {
        color: white;
        background-color: black;
        margin-top: 75px;
        margin-left: auto;
        margin-right: auto;
        width: 95%;
    }

    .flex-container {
        padding: 15px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: grey;
        overflow-x: scroll;
        overflow-y: hidden;
        margin-top: 20px;
        margin-bottom: 20px;
        gap: 20px;
        height: 200px;
        text-align: center;
    }

    .flex-container .item {
        cursor: pointer;
        background-color: var(--netflix-red-opacity);
        /*border: 1px solid var(--netflix-red); */
        padding: 20px;
        font-size: 30px;
        text-align: center;
        height: 133px;
        width: 220px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        background-image: url("https://sveltejs.github.io/assets/caminandes-llamigos.jpg");
        background-size: cover; /* Resize the background image to cover the entire container */
    }

    .autoplayVideo {
        margin-top: 10px;
        height: 100%;
        width: 100%;
        background-color: green;
        margin-left: auto;
        margin-right: auto;
    }


    #video {
        position: fixed;
        transition: all 0.3s ease-out;
        left: 15%;
        right: 15%;
        top: 15%;
        bottom: 15%;
    }

    #video.fullscreen {
        left: 0%;
        right: 0%;
        top: 0%;
        bottom: 0%;
    }

    #video.fullscreen #gigascreen {
        position: absolute;
        top: 10px; /* position the top  edge of the element at the middle of the parent */
        left: 50%; /* position the left edge of the element at the middle of the parent */

        transform: translate(-50%,  0);
        z-index: 100;
    }
    #video #close {
        position: absolute;
        top: -10px;
        right: -10px;
        z-index: 100;
    }

    #video #fullscreen {
        position: absolute;
        top: -10px;
        left: -10px;
        z-index: 100;
    }

    #video.fullscreen #close {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 100;
    }

    #video.fullscreen #fullscreen {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 100;
    }

    .grid {
        margin-top: 75px;
        display: grid;
        grid-row-gap: 50px;
        grid-column-gap: 50px;
        grid-template-columns: auto auto auto auto auto;
        padding: 10px;
    }

    .grid-item {
        cursor: pointer;
        background-color: var(--netflix-red-opacity);
        border: 1px solid var(--netflix-red);
        padding: 20px;
        font-size: 30px;
        text-align: center;
        height: 80px;
        background-image: url("https://sveltejs.github.io/assets/caminandes-llamigos.jpg");
        background-size: cover; /* Resize the background image to cover the entire container */
    }

    #title {
        color: var(--netflix-red);
        font-size: 62px;
        line-height: 100px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: black;
        height: 100px;
        padding-left: calc(5% + 5px);
    }

    /** https://onaircode.com/html-css-custom-scrollbar-examples/ */
    ::-webkit-scrollbar {
        width: 1.5em;
        height: 1.5em;
    }
    ::-webkit-scrollbar-track {
        border-radius: 1em;
        background-color: #ffffff33;
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgb(255, 255, 255);
        border-radius: 1em;
        -webkit-box-shadow: rgba(0, 0, 0, 0.12) 0 3px 13px 1px;
        box-shadow: rgba(0, 0, 0, 0.12) 0 3px 13px 1px;
    }
</style>
