<!-- ERROR PAGE DISPLAYED WHEN ENDPOINTS DONT EXIST -->
<script context="module">
    export const load = ({ error, status }) => {
        return {
            props: {
                title: `${status}: ${error.message}`,
            },
        };
    };
</script>

<script>
    export let title;
</script>

<div class="error">
    <h1>{title}</h1>
</div>

<style>
    .error {
        height: 100vh;
        display: grid;
        gap: var(--spacing-32);
        place-content: center;
        place-items: center;
    }
</style>
