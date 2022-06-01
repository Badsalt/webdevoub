<script>
    import Card from "$lib/components/card.svelte";
    import members from "$lib/data/members.json";
    function scrollToTop() {
        let element = document.getElementById("scroll");
        element.scroll({ top: 0, behavior: "smooth" });
    }
</script>

<svelte:head>
    <title>Lab Members</title>
</svelte:head>

<main id="scroll">
    <div class="container w-11/12 lg:w-3/4">
        <h1>Current Members</h1>
        <Card args={members["sofie_degerman"]} />
        <Card args={members["magnus_hultdin"]} />
        <Card args={members["pia_osterman"]} />
        <Card args={members["mattias_landfors"]} />
        <Card args={members["fernanda_hackenhaar"]} />
        <Card args={members["olivia_carlund"]} />
        <Card args={members["nina_guerini"]} />
        <button class="btn btn-primary test" on:click={() => scrollToTop()}
            >Scroll To Top</button
        >

        <h1 id="2">Former Members</h1>
        
        <Card args={members["emma_andersson_evelönn"]} />
        <Card args={members["zahra_haider"]} />
        <Card args={members["mangnus_borssen"]} />

        <h1 id="3">Students and visting PostDocs</h1>

        <Card args={members["ida_andersson"]} />
        <Card args={members["nina_guerini_student"]} />
        <Card args={members["moa_nydahl"]} />
        <Card args={members["sigrid_wennstedt"]} />
    </div>
</main>

<style>
    main {
        width: 100%;
        border: 0;
        margin: 0;
        padding-bottom: 75px;
        overflow-y: scroll;

    }

    /* .container {
        width: 75%;
    } */

    h1 {
        font-size: 1.5em;
        font-weight: bold;
    }

    .test {
        position: absolute;
        bottom: 75px;
        right: 30px;
        z-index: 10000;
    }

    /* @media screen and (max-width: 1035px){
        .container {
            width: 90%;
        }
    } */
</style>
