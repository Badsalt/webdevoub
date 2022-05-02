<script>
    import { Button, Overlay } from "svelte-materialify";
    import Player from "./Player.svelte";
    import colors from "svelte-materialify/src/utils/colors";
    import VideoDescription from "./videoDescription.svelte";
    import { isFullDescription } from "./stores.js";

    let video_player_is_active = false;
    let is_fullscreen = false;
    $isFullDescription = false

    //"https://www.imdb.com/video/imdb/vi3226468377/imdb/embed"

    const imagesSrc = {
        missionImposible: "https://m.media-amazon.com/images/M/MV5BMTc3NjI2MjU0Nl5BMl5BanBnXkFtZTgwNDk3ODYxMTE@._V1_.jpg",
        batman: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJApnr9b8RCQjrOr0YpzqMTY1xXWNrfWHgq0VvNxVNUaG9XyrV",
        shrek: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSVxk3SR0pJC9qW6r_kysDnnbHgqqGvNfIGQU_yVp10PBzA_vxO",
        theHangover: "https://m.media-amazon.com/images/M/MV5BMTU1MDA1MTYwMF5BMl5BanBnXkFtZTcwMDcxMzA1Mg@@._V1_.jpg",
        matrix: "https://www.idg.se/editorial/0/path/1.759585!imageManager/3229336147.jpg"
    };

    // let indexSrc = {"0": "missionImposible", "" }
</script>

<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<main>

    {#if $isFullDescription}
    <VideoDescription video_src = "https://www.imdb.com/video/imdb/vi3226468377/imdb/embed"/>
    {/if}

    <div class="header">
        <div>
            <span style="margin-left: 20px; font-size: 4em, ">neflix</span>
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
            <span class="fa fa-search fa-2x" />
        </div>
    </div>

    <div class="container">
        <!--
            <div class="autoplayVideo">

            <video controls autoplay poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg" src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"><track kind="captions" /></video>
              
        </div>
        -->

        <h1>Recomended</h1>

        <!-- <iframe id="Sv_Multi_3" data-url="" src="https://www.2embed.ru/embed/imdb/movie?id=tt0091530" frameborder="0" style="overflow:hidden;height:100%;width:100%" height="900px" width="100%" scrolling="no" allow="encrypted-media" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" loading="lazy"></iframe> -->

        <div class="flex-container">
            {#each Array(10) as _, i}
                <div
                style="display: flex; flex-direction:row; align-items: center"
                >
                <div
                    class="item-container"
                    on:click={() => {
                        // video_player_is_active = true;
                        $isFullDescription = true;
                    }}
                >
                    <div
                        class="item"
                        style=" background-image: url('
                        {Object.keys(imagesSrc)
                            .map((key) => {
                                return imagesSrc[key];
                            })[Math.floor(i / 2)]}') "
                    />

                    <div class="short_description">
                        <div style="display: flex; flex-direction: row; gap: 10px">
                            <i class="fa fa-play-circle"></i>
                            <i class="fa fa-plus"></i>
                            <i class="fa fa-thumbs-up"></i>
                            <i class="fa fa-chevron-circle-down" style="margin-left: auto; margin-right: 10px "></i>
                        </div>
                        <div style="display: flex; flex-direction: row; gap: 10px; margin-top: 10px;">
                            <span style="color: green">NEW</span>
                            <span class="age-restriction">16+</span>
                            <span>1 h 30 min</span>
                            <span class="resolution">HD</span>
                        </div>
                           
                    </div>

                    </div>
                    </div>



            {/each}
        </div>

        <h1>Top 10</h1>

        <div class="flex-container">
            {#each Array(10) as _, i}
                <div
                    style="display: flex; flex-direction:row; align-items: center"
                >

                    <span style="font-size: 5em;">{i + 1}</span> 
                    <div
                        class="item-container"
                        on:click={() => {
                            video_player_is_active = true;
                        }}
                    >
                        <div class="item" />
                        <div class="short_description">
                            <div style="display: flex; flex-direction: row; gap: 10px">
                                <i class="fa fa-play-circle"></i>
                                <i class="fa fa-plus"></i>
                                <i class="fa fa-thumbs-up"></i>
                                <i class="fa fa-chevron-circle-down" style="margin-left: auto; margin-right: 10px "></i>
                            </div>
                            <div style="display: flex; flex-direction: row; gap: 10px; margin-top: 10px;">
                                <span style="color: green">NEW</span>
                                <span class="age-restriction">16+</span>
                                <span>1 h 30 min</span>
                                <span class="resolution">HD</span>
                            </div>
                            
    
                           
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <h1>Action</h1>

        <div class="flex-container" />
        <h1>News</h1>
    </div>

    <div />

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

    
</main>

<style>



    :root {
        --netflix-red: #e50914;
        --netflix-red-opacity: rgba(229, 9, 20, 0.3);
    }

    :global(body) {
        padding: 0;
        margin: 0;
        background-color: rgb(20, 20, 20);
        overflow: auto;
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
        background-color: rgb(20, 20, 20);
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
        padding-left: 5%;
        padding-right: 5%;
        box-sizing: border-box;
    }

    .container {
        color: white;
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
        overflow-x: scroll;
        overflow-y: visible;
        margin-top: 20px;
        margin-bottom: 20px;
        gap: 20px;
        height: 400px;
        text-align: center;
    }

    .flex-container .item-container {
        box-shadow: 0 4px 8px 4px rgba(0, 0, 0, 0.2),
            0 6px 20px 4px rgba(0, 0, 0, 0.19);
        height: 225px;
        border: grey solid;
    }

    .flex-container .item-container .short_description {
        display: none;
        margin: 0 10px;
        height: 50px;
    }

    .flex-container .item-container:hover {
        height: 280px;
        width: 300px;
    }

    .flex-container .item-container:hover .short_description {
        display: flex;
        flex-direction: column;
    }

    .flex-container .item {
        cursor: pointer;
        background-color: var(--netflix-red-opacity);
        /*border: 1px solid var(--netflix-red); */
        padding: 20px;
        font-size: 30px;
        text-align: center;
        height: 220px;
        width: 150px;
        /*https://sveltejs.github.io/assets/caminandes-llamigos.jpg */
        /* https://api.lorem.space/image/movie?w=960&h=540 */
        /* */
        background-image: url("https://api.lorem.space/image/movie?w=150&h=220");
        background-size: cover; /* Resize the background image to cover the entire container */
        margin: auto;
    }

    .age-restriction {
        border: rgba(255, 255, 255, 0.656) 1px solid;
        padding: 0 5px;
        
    }

    .resolution {
        border: rgba(255, 255, 255, 0.656) 1px solid;
        padding: 0 5px;
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

        transform: translate(-50%, 0);
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
        background-color: rgb(100, 100, 100);
        border-radius: 1em;
        -webkit-box-shadow: rgba(0, 0, 0, 0.12) 0 3px 13px 1px;
        box-shadow: rgba(0, 0, 0, 0.12) 0 3px 13px 1px;
    }
</style>
