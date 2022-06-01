
<script>

export let args;
import { fly, fade, slide, draw ,blur } from "svelte/transition";
import { quintOut } from 'svelte/easing';
</script>
<!-- in:fly="{{ y: 75, duration: 1000 }}" -->
<div in:blur="{{delay: 250, duration: 600, easing: quintOut }}" class="card lg:card-side bg-base-100 shadow-x1 w-full">
    {#if args.pic_src} 
    <figure><img src={args.pic_src} style="width: (292/2)px; height:(341/2)px" alt={args.name}></figure>
    {/if}
    
    <div class="card-body">
      <h2 class="card-title">{args.name}, <span style="color: rgb(82,71,71)">{args.title}</span></h2>
      {#if args.description}
        <p>{args.description}</p>
      {/if}
      {#if args.mail_adress}
      <a href="mailto:{args.mail_adress}">{args.mail_adress}</a>
      {/if}

      {#if args.status.period}
          <p>{args.status.period}</p>
      {/if}
    </div>
  </div>


  <style>

    .card {
        background-color: rgb(175, 172, 172);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        transition: all 0.1s;
        margin: 20px 0;
        box-shadow: 2px 2px 2px grey;
    }

    .card:hover {
        box-shadow: 0 4px 8px 5px rgb(0 0 0 / 20%), 0 6px 20px 10px rgb(0 0 0 / 19%);
    }

</style>