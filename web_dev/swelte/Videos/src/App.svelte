<script>
    import { Button, Overlay } from "svelte-materialify";
    import Player from "./Player.svelte";
    import colors from "svelte-materialify/src/utils/colors";
    import VideoDescription from "./videoDescription.svelte";
    import { isFullDescription, currentMovie } from "./stores.js";

    let video_player_is_active = false;
    let is_fullscreen = false;
    $isFullDescription = false;


    //"https://www.imdb.com/video/imdb/vi3226468377/imdb/embed"

    const movieInfo = {
        missionImposible_Fallout: {
            img_src:
                "https://is3-ssl.mzstatic.com/image/thumb/Video128/v4/96/4b/c3/964bc350-2122-22d7-1a2c-975a2b8d4231/source/600x600bb.jpg",
            video_src:
                "https://movietrailers.apple.com/movies/paramount/mission-impossible-fallout/mission-impossible-fallout-trailer-1_i320.m4v",
            fullMovie: "https://t22.gomoplayer.com/vxokfuqpx2alavf4eq3yvjouqxhmlu7cqgsebsk72klrdmhahkyxkafknqiq/v.mp4",
                description:
                "Ethan Hunt and his IMF team, along with some familiar allies, race against time after a mission gone wrong.",
            video_poster:
                "https://trailers.apple.com/trailers/paramount/mission-impossible---fallout/images/thumbnail_27843.jpg",
            actors: ["Tom Cruise", "Henry Cavill", "Ving Rhames"],
            runtime: "2h 27m",
            ageRestriction: "15+",
            released: 2018,
            movie_name: "Mission: Impossible - Fallout",
            directors: ["Christopher McQuarrie"],
            genres: ["Action", "spion", "thriller"],
        },
        batman: {
            img_src:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJApnr9b8RCQjrOr0YpzqMTY1xXWNrfWHgq0VvNxVNUaG9XyrV",
            video_src:
                "https://movietrailers.apple.com/movies/wb/the-batman-2022/the-batman-trailer-2_i320.m4v",
            fullMovie: null,   
            description:
                "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
            video_poster: "https://m.media-amazon.com/images/M/MV5BOTc3ODFlMWYtZDJjNC00ZGQyLTk5MWQtNzliNWMzOWVlM2FlXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg",
            actors: ["Robert Pattingson", "Zoë Kravitz", "Jeffrey Wright"],
            runtime: "2h 56m",
            ageRestriction: "15+",
            released: 2022,
            movie_name: "The Batman" ,
            directors: ["Matt Reeves"],
            genres: ["Action", "Drama", "Adventure", "Criminal", "Mystery"],
        },
        shrek: {
            img_src:
                "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSVxk3SR0pJC9qW6r_kysDnnbHgqqGvNfIGQU_yVp10PBzA_vxO",
            video_src:
                "https://ia801603.us.archive.org/25/items/ShrekTrailer/ShrekTrailer.mp4",
            fullMovie: null,    
            description:
                "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.",
            video_poster: "https://m.media-amazon.com/images/M/MV5BMjA5MzkwMzI0N15BMl5BanBnXkFtZTcwMzcwODI0Ng@@._V1_.jpg",    
            actors: [
                "Mike Myers (voice)",
                "Eddie Murphy (voice)",
                "Cameron Diaz (voice)",
            ],
            runtime: "1h 30min",
            ageRestriction: "7+",
            released: 2001,
            movie_name: "Shrek",
            directors: ["Andrew Adamson", "Vicky Jenson"],
            genres: ["Comedy", "Fantasy", "Family"],
        },
        theHangover: {
            img_src:
                "https://m.media-amazon.com/images/M/MV5BMTU1MDA1MTYwMF5BMl5BanBnXkFtZTcwMDcxMzA1Mg@@._V1_.jpg",
            video_src:
                "https://ia902805.us.archive.org/15/items/thehangoveralansfunniestmoments_202002/The%20Hangover%202009%20Official%20Trailer%20%231%20%20%20Comedy%20Movie.mp4",
            fullMovie: null,    
            description:
                "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.",
            video_poster: "https://m.media-amazon.com/images/M/MV5BMjIwMjIxMDY3Nl5BMl5BanBnXkFtZTgwNzMwNjMwMjE@._V1_FMjpg_UX1024_.jpg",    
            actors: ["Bradley Cooper", "Ed Helms", "Zach Galifianakis"],
            runtime: "1 h 30min",
            ageRestriction: "11+",
            released: 2009,
            movie_name: "The Hangover",
            directors: ["Todd Phillips"],
            genres: ["Comedy"],
        },
        matrix: {
            img_src:
                "https://www.idg.se/editorial/0/path/1.759585!imageManager/3229336147.jpg",
            video_src:
                "https://ia803406.us.archive.org/29/items/turner_video_2797/2797.mp4",
            fullMovie: null,
            description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
            video_poster: "https://m.media-amazon.com/images/M/MV5BNzM4OTkzMjcxOF5BMl5BanBnXkFtZTgwMTkxMjI1MTI@._V1_.jpg",
            actors: ["Keanu Reevens", "Laurance Fishburne", "Carrie-Anne Moss"],
            runtime: "2h 16m",
            ageRestriction: "15+",
            released: 1999,
            movie_name: "The Matrix",
            directors: ["Lana Wachowski", "Lilly Wachowski"],
            genres: ["Action", "Sci-Fi"],
        },
    };

    // let indexSrc = {"0": "missionImposible", "" }
</script>

<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">

<main class:no-scrolling={$isFullDescription}>
    <!-- <iframe src="https://www.imdb.com/video/imdb/vi336244761/imdb/embed?autoplay=false&width=480" width="480" height="270" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" frameborder="no" scrolling="no"></iframe> -->

    {#if $isFullDescription}
        <VideoDescription args={movieInfo[$currentMovie]} />
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

        <h1 id="recomended">Recomended</h1>

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
                            $currentMovie =
                                Object.keys(movieInfo)[Math.floor(i / 2)];
                            console.log($currentMovie);
                        }}
                    >
                        <div
                            class="item"
                            style=" background-image: url('
                        {Object.keys(movieInfo).map((key) => {
                                return movieInfo[key]['img_src'];
                            })[Math.floor(i / 2)]}') "
                        />

                        <div class="short_description">
                            <div
                                style="display: flex; flex-direction: row; gap: 10px"
                            >
                                <i class="fa fa-play-circle" />
                                <i class="fa fa-plus" />
                                <i class="fa fa-thumbs-up" />
                                <i
                                    class="fa fa-chevron-circle-down"
                                    style="margin-left: auto; margin-right: 10px "
                                />
                            </div>
                            <div
                                style="display: flex; flex-direction: row; gap: 10px; margin-top: 10px;"
                            >
                                <!-- Index of imagesSrc Math.floor(i/2) -->
                                <span style="color: green">NEW</span>
                                <span class="age-restriction"
                                    >{Object.keys(movieInfo).map((key) => {
                                        return movieInfo[key]["ageRestriction"];
                                    })[Math.floor(i / 2)]}</span
                                >
                                <span
                                    >{Object.keys(movieInfo).map((key) => {
                                        return movieInfo[key]["runtime"];
                                    })[Math.floor(i / 2)]}</span
                                >
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
                            <div
                                style="display: flex; flex-direction: row; gap: 10px"
                            >
                                <i class="fa fa-play-circle" />
                                <i class="fa fa-plus" />
                                <i class="fa fa-thumbs-up" />
                                <i
                                    class="fa fa-chevron-circle-down"
                                    style="margin-left: auto; margin-right: 10px "
                                />
                            </div>
                            <div
                                style="display: flex; flex-direction: row; gap: 10px; margin-top: 10px;"
                            >
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
    </div>

    <div />

    <!-- <div class="grid">
        {#each Array(100) as _, i}
            <div
                class="grid-item"
                on:click={() => {
                    video_player_is_active = true;
                }}
            />
        {/each}
    </div> -->
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

            <Player
                video_arg={{
                        src: "https://sveltejs.github.io/assets/caminandes-llamigos.mp4",
                        poster: "https://sveltejs.github.io/assets/caminandes-llamigos.jpg",
                }}
            />
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
        font-family: 'Roboto', sans-serif;
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

    .no-scrolling {
        height: 100%;
        overflow: hidden;
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
        width: 0.5em;
        height: 0.5em;
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
