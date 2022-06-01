<svelte:head>
	<title>Lab Members</title>
</svelte:head>

<script>
import Card from "$lib/components/card.svelte"

import members from "$lib/data/members.json"
function scrollToTop() {
        let element = document.getElementById("scroll");
        element.scroll({ top: 0, behavior: "smooth" });
    }
</script>


<main id="scroll">
    <div class="container">
        <Card args={members["sofie_degerman"]}></Card>
        <Card args={members["magnus_hultdin"]}></Card>
        <Card args={members["pia_osterman"]}></Card>
        <Card args={members["mattias_landfors"]}></Card>
        <Card args={members["fernanda_hackenhaar"]}></Card>
        <Card args={members["olivia_carlund"]}></Card>
        <Card args={members["nina_guerini"]}></Card> 
        <button class="btn btn-primary" on:click={()=>scrollToTop()}>Scroll To Top</button>    
    </div>

</main>

<style>

    main {
        width: 100%;
        border: 0;
        margin: 0;
        padding-bottom: 75px;
    }

    .container {
        width: 75%;
        margin: 20px auto;
    }

    @media screen and (max-width: 650px){
        .container{
            width: 100%;
        }
    }

</style>