<script context="module">
    // ran before loading page
    export async function load({ params, fetch, session, stuff }) {
        let answers = fetch(
            `https://demo.dataverse.org/api/search?q=` + params.question
        ).then((e) => e.json());

        return {
            props: {
                // answers in props matches to "export let answers in script tag"
                // params.question matches [question].svelte
                answers: answers,
            },
        };
    }
</script>

<script>
    import Spinner from "$lib/components/Spinner.svelte";
    import Results from "$lib/components/Results.svelte";
    export let answers;
</script>

{#await answers}
    <Spinner />
{:then result}
    <Results json={result} />
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
