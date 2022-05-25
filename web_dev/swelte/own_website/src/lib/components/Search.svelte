<script>
    let question;
    import { goto } from "$app/navigation";
</script>

<div>
    <form
        on:submit|preventDefault={() => {
            goto(`/search/${question}`);
        }}
    >
        <input bind:value={question} />
    </form>
</div>

<style>
    div {
        display: flex;
        gap: 10px;
        width: 50%;
        justify-self: center;
        align-items: center;
    }

    form,
    form input {
        width: 100%;
    }
</style>
