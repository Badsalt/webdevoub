<script> 
    import { Button, Overlay } from "svelte-materialify";
    import {isFullDescription} from "./stores.js";
    export let video_src; 

</script>

<main>

    <Overlay
    
    opacity = {0.5}
    on:click= {() => {
        $isFullDescription = false;
    }}
    >
        <div class="container">

          
            <iframe width="443" height="253" src="https://www.youtube.com/embed/nMaGGmE-rI8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            <i class="fa fa-times" style="color: white;" on:click= {() => {
                $isFullDescription = false;
            }}></i>
            <div class="img">
                hahahha
            </div>
            <div class="">
                
            <p style="color:white;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel risus faucibus, bibendum velit ut, congue ex. Sed pulvinar rutrum odio quis scelerisque. Aenean posuere efficitur nulla, et sagittis nisl gravida gravida. Fusce risus quam, faucibus a porta nec, ultrices ornare quam. Praesent auctor gravida aliquet. Donec finibus nec mauris id cursus. Aliquam vel dolor metus. Etiam convallis fermentum euismod. Integer nunc mi, viverra nec diam eget, rutrum consectetur felis. Pellentesque in justo ac velit consectetur mattis. In id ultricies tellus, vel consectetur nisi. Proin in hendrerit magna, sit amet interdum est. Nam at commodo velit. Vestibulum malesuada pharetra tempor. Nunc egestas sagittis nibh, eu pretium odio molestie quis.
</p>

            </div>

            
          
        </div>
        


    </Overlay>
    


</main>

<style>

    .container {
        width: 50%;
        margin: auto;
        background-color: rgb(24, 24, 24);

    }

</style>
