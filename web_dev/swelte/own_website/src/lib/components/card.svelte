
<script>

export let args;
import { fly, fade, slide, draw } from "svelte/transition";
</script>

<div in:fly="{{ y: 75, duration: 1000 }}" out:fade class="card lg:card-side bg-base-100 shadow-x1 w-full">
    <figure><img src={args.pic_src} style="width: (292/2)px; height:(341/2)px" alt={args.name}></figure>
    <div class="card-body">
      <h2 class="card-title">{args.name}, <span style="color: rgb(82,71,71)">{args.title}</span></h2>
      <p>{args.description}</p>
     <a href="mailto:{args.mail_adress}">{args.mail_adress}</a>
    </div>
  </div>


  <style>

    .card {
        background-color: grey;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        transition: all 0.1s;
        margin: 20px 0;
    }

    .card:hover {
        box-shadow: 0 4px 8px 5px rgb(0 0 0 / 20%), 0 6px 20px 10px rgb(0 0 0 / 19%);
    }

</style>