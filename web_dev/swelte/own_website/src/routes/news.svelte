<svelte:head>
	<title>News</title>
</svelte:head>
<script>
import FormerLabMembers from "./old/former_lab_members.svelte";

	$: is_shared = is_shared
	function copyClipboard() {
  /* Get the text field */
  var copyText = window.location.href;

  /* Select the text field */
//   copyText.select();
//   copyText.setSelectionRange(0, 99999); /* For mobile devices */

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText);

  /* Alert the copied text */
//   alert("Copied the text: " + copyText);
}

async function wait(){
	await setTimeout(100);
	is_shared = false;
}

let is_shared;

import { fly, fade, slide, draw } from "svelte/transition";
import { quintOut } from 'svelte/easing';
import { promise } from '$lib/components/stores.js'

</script>


<div class="container w-11/12 lg:w-3/4 text-center mb-40">



	{#if is_shared}
	<div in:slide="{{delay: 250, duration: 600, easing: quintOut }}" out:slide="{{delay: 250, duration: 600, easing: quintOut }}"  class="alert alert-sucess test shadow-lg absolute w-11/12 lg:w-3/4">
		<div>
		  <span>The link is copied to the clipboard</span>
		</div>
	  </div>
	{/if}

	<ul class="my-12">
		<li><article>

		</article></li>

		<li><article>

		</article></li>

		<li><article class="border-2 rounded-xl border-black">

			<iframe class="mx-auto mt-10 w-1/2 aspect-video" src="https://player.vimeo.com/video/370874522?h=bd3326f2b6&color=ffffff&title=0&byline=0&portrait=0"  frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
			<div class="flex px-5 flex-row justify-between bg-slate-200">
				<div class="">
					Published: 2 years ago
				</div>

				<div>
					<button class="btn btn-primary" on:click={()=>{copyClipboard(); is_shared = !is_shared }}>Share</button>
				</div>
			</div>
		</article></li>
	</ul>
	
	<div>

	</div>

	<div>

	</div>
  
</div>

<style>

</style>