<svelte:head>
	<title>News</title>
</svelte:head>
<script>
import { fly, fade, slide, draw } from "svelte/transition";
import { quintOut } from 'svelte/easing';
import { is_shared } from "$lib/components/stores.js"
 $is_shared = false;

	function copyClipboard(id) {
		wait()
  /* Get the text field */
  var copyText = window.location.host + window.location.pathname + "#" +id;

  /* Select the text field */
//   copyText.select();
//   copyText.setSelectionRange(0, 99999); /* For mobile devices */

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText);

  /* Alert the copied text */
//   alert("Copied the text: " + copyText);
}

async function wait(){
	$is_shared = true
	//Display time alertBox.
	await new Promise((resolve) => setTimeout(resolve, 2000));
	$is_shared = false;
}


</script>


<div class="container w-11/12 lg:w-3/4 text-center mb-40">



	{#if $is_shared}
	<div in:slide="{{delay: 250, duration: 1500, easing: quintOut }}" out:slide="{{delay: 250, duration: 1000, easing: quintOut }}"  class="alert alert-sucess test shadow-lg fixed w-11/12 lg:w-3/4">
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

		<li><article id="1" class="border-2 rounded-xl border-black">

			<iframe class="mx-auto mt-10 w-1/2 aspect-video" src="https://player.vimeo.com/video/370874522?h=bd3326f2b6&color=ffffff&title=0&byline=0&portrait=0"  frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
			<div class="flex px-5 flex-row justify-between bg-base-300">
				<div class="">
					Published: 2 years ago
				</div>

				<div>
					<button class="btn btn-primary" on:click={()=>copyClipboard(1)}>Share</button>
				</div>
			</div>
		</article></li>
		<li class="mt-5"><article id="2" class="border-2 rounded-xl border-black">
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan quam erat, in hendrerit dolor luctus in. Morbi semper magna id massa ullamcorper, a faucibus metus porttitor. Proin ultrices posuere nisl, non egestas purus vehicula mollis. Aliquam id leo sed metus gravida vulputate eget nec ligula. Donec finibus, quam sit amet convallis posuere, arcu quam rutrum enim, sed ullamcorper nibh sem sit amet nibh. Quisque sapien ipsum, placerat in nisi a, interdum tincidunt magna. Nullam aliquam eros id metus pellentesque luctus. Donec porttitor eu leo eu scelerisque. Aliquam aliquam nunc eu quam consectetur finibus. Vestibulum condimentum neque et lacinia lobortis. Integer tempus auctor nulla vitae fringilla. Vivamus sit amet ligula aliquet, ultrices est vitae, interdum ipsum. Integer posuere diam sit amet metus elementum sodales.</p>
			<p class="mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra dolor id erat aliquam, a mattis dolor pulvinar. Etiam feugiat, urna sed gravida egestas, enim sapien vestibulum quam, non facilisis purus urna sit amet metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque vulputate leo id massa accumsan feugiat. Sed lectus lacus, facilisis eleifend felis eu, rhoncus commodo lectus. Nulla facilisis, nulla nec luctus venenatis, arcu arcu semper massa, vitae iaculis lorem orci non elit. Maecenas vitae mauris in nisi aliquam convallis in vel sem. Etiam quis massa velit.</p>
			<div class="flex px-5 flex-row justify-end bg-base-300">
				
				<div>
					<button class="btn btn-primary" on:click={()=>copyClipboard(2)}>Share</button>
				</div>
			</div></article></li>
			<li class="mt-5"><article id="3" class="border-2 rounded-xl border-black">
				<h1 class="font-bold">News from other Sorces</h1>
				<ul>
					<li><a class="underline decoration-blue" href="https://www.barncancerfonden.se/barncancerforskning/sa-ska-forskarna-utrota-barncancer/forskningsreportage/hostutlysningen---sophie-degerman/">https://www.barncancerfonden.se/barncancerforskning/sa-ska-forskarna-utrota-barncancer/forskningsreportage/hostutlysningen---sophie-degerman/</a></li>
					<li><a class="underline decoration-blue" href="https://www.vk.se/2018-12-21/spannande-att-kunna-paverka-framtidens-vard">https://www.vk.se/2018-12-21/spannande-att-kunna-paverka-framtidens-vard</a></li>
				</ul>
				<div class="flex px-5 flex-row justify-end bg-base-300">

					<div>
						<button class="btn btn-primary" on:click={()=>copyClipboard(3)}>Share</button>
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

	.test {

	}

</style>