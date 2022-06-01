<script>
    import Search from "$lib/components/Search.svelte";
</script>

<main>
    <Search />
    <slot></slot>
</main>

<style>
    :global(body) {
        padding: 0;
        margin: 0;
    }

    main {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
        gap: 50px;
        padding-top: 50px;
        padding-left: 10%;
        padding-right: 10%;
        padding-bottom: 5%;
        box-sizing: border-box;
    }
</style>
