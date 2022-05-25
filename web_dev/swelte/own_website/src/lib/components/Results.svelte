<script>
    export let json;
    import { fly, fade, slide, draw } from "svelte/transition";
    console.log(json);
</script>

{#if json && "data" in json && "items" in json.data && json.data.items.length > 0}
    <div id="item-holder">
        {#each json.data.items as item}
            <div id="item">
                {#each Object.entries(item) as [key, value]}
                    <p in:fade>{JSON.stringify(value)}</p>
                {/each}
            </div>
        {/each}
    </div>
{:else if json}
    <div>
        <p in:fade>{JSON.stringify(json)}</p>
    </div>
{/if}

<style>
    #item-holder {
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
        overflow-y: scroll;
        box-sizing: border-box;
        padding-left: 10%;
        padding-right: 10%;
        max-width: 100%;
        row-gap: 20px;
    }

    #item {
        border-radius: 25px;
        background-color: whitesmoke;
        border: 2px solid whitesmoke;
        padding: 20px;
        width: 100%;
        box-sizing: border-box;
        word-wrap: break-word;
    }

    p {
        border: 2px solid black;
        padding: 5px;
        margin: 5px;
    }

    /** https://onaircode.com/html-css-custom-scrollbar-examples/ */
    ::-webkit-scrollbar {
        width: 15px;
        height: 15px;
    }
    ::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.1);
    }
    ::-webkit-scrollbar-thumb {
        background-image: linear-gradient(45deg, #00aeff, #a68eff);
        border-radius: 10px;
        -webkit-box-shadow: rgba(0, 0, 0, 0.12) 0 3px 13px 1px;
    }
</style>
