<!-- 
    Notera att du kan göra en mapp med ett namn, i detta fall wordle,
    och då kommer navigering till den mappen ladda sidan i index.html
    Du kan också om du vill skippa mappen och bara direkt göra en fil som heter "wordle.svelte" under /routes
    Men jag föredrar undermappar för ofta kommer en sida i en undermapp byggas upp av komponenter som man lägger i den undermappen.
-->
<script>
    import { fly } from "svelte/transition";
    import words from "$lib/data/words.json";

    const STATUS = {
        CONTAINS: "CONTAINS",
        CORRECT: "CORRECT",
        INCORRECT: "INCORRECT",
    };

    let keys_one = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    let keys_two = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    let keys_three = ["⌦", "Z", "X", "C", "V", "B", "N", "M", "⏎"];

    let word,
        success,
        failed,
        notword,
        showShort,
        contains,
        corrects,
        incorrects,
        guesses,
        grid,
        colindex,
        rowindex;

    function handleKeydown(key) {
        showShort = false;

        if (key === "BACKSPACE" || key === "⌦") {
            if (failed || success) {
                return;
            }
            deleteKey();
        } else if (key === "ENTER" || key === "⏎") {
            if (failed || success) {
                reset();
                return;
            }
            if (colindex == 5) {
                let temp = grid[rowindex].join("").toUpperCase();
                if (!words.includes(temp.toLowerCase())) {
                    notword = true;
                    setTimeout(() => {
                        notword = false;
                    }, 1500);
                    return;
                }
                colindex = 0;
                if (temp == word.toUpperCase()) {
                    success = true;
                }

                let occurances = {};
                let tempcorrects = {};
                let tempcontains = {};

                for (let index = 0; index < grid[rowindex].length; index++) {
                    const letter = grid[rowindex][index];
                    occurances[letter] = word.match(
                        new RegExp(word[index], "g") || []
                    ).length;

                    tempcorrects[letter] = tempcorrects[letter] ?? 0;
                    tempcontains[letter] = tempcontains[letter] ?? 0;

                    if (
                        word[index] == letter &&
                        tempcorrects[letter] < occurances[letter]
                    ) {
                        guesses[rowindex][index] = STATUS.CORRECT;
                        corrects.push(letter);
                        tempcorrects[letter]++;
                        tempcontains[letter]++;
                    } else if (
                        word.includes(letter) &&
                        tempcontains[letter] < occurances[letter]
                    ) {
                        guesses[rowindex][index] = STATUS.CONTAINS;
                        tempcontains[letter]++;
                        contains.push(letter);
                    } else {
                        guesses[rowindex][index] = STATUS.INCORRECT;
                        incorrects.push(letter);
                    }
                }

                rowindex++;
                contains = contains;
                corrects = corrects;
                incorrects = incorrects;
                guesses = guesses;

                if (rowindex == 6 && !success) {
                    failed = true;
                }
            } else {
                showShort = true;
                setTimeout(() => {
                    showShort = false;
                }, 1500);
            }
        } else {
            if (failed || success) {
                return;
            }
            if (key == "+" && colindex < 5) {
                placeKey(word[colindex]);
            } else if (key.length === 1 && key.match(/[a-z]/i)) {
                placeKey(key);
            }
        }
    }

    function reset() {
        word =
            words.length > 0
                ? words[Math.floor(Math.random() * words.length)].toUpperCase()
                : "HORSE";
        corrects = [];
        contains = [];
        incorrects = [];
        success = false;
        failed = false;
        notword = false;
        showShort = false;

        colindex = 0;
        rowindex = 0;
        grid = [
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
        ];
        guesses = [
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
        ];
    }

    function placeKey(key) {
        let temp = key.toUpperCase();
        if (colindex < 5 && rowindex < 6) {
            grid[rowindex][colindex] = temp;
            grid = grid;
            colindex++;
        }
    }
    function deleteKey() {
        if (colindex > 0) {
            colindex--;
            grid[rowindex][colindex] = "";
            grid = grid;
        }
    }

    reset();
</script>

<svelte:window on:keydown={(event) => handleKeydown(event.key.toUpperCase())} />

<p style="display:none">{word}</p>

<main class="m-20 flex-column justify-center gap-20">
    {#each grid as row, rowi}
        <div class="flex justify-center gap-1 my-1 w-full">
            {#each row as _, coli}
                <input
                    class:contains={guesses[rowi][coli] == STATUS.CONTAINS}
                    class:correct={guesses[rowi][coli] == STATUS.CORRECT}
                    class:incorrect={guesses[rowi][coli] == STATUS.INCORRECT}
                    disabled
                    type="text"
                    class="card card-bordered w-20 pending-use"
                    bind:value={grid[rowi][coli]}
                />
            {/each}
        </div>
    {/each}

    <div class="h-20" />

    <div class="flex justify-center gap-1 my-1 w-full">
        {#each keys_one as key}
            <kbd
                class="kbd pending-use"
                class:contains={contains.includes(key)}
                class:correct={corrects.includes(key)}
                class:incorrect={incorrects.includes(key)}
                class:rotate={key === "⌦"}
                on:click={() => handleKeydown(key)}>{key}</kbd
            >
        {/each}
    </div>
    <div class="flex justify-center gap-1 my-1 w-full">
        {#each keys_two as key}
            <kbd
                class="kbd pending-use"
                class:contains={contains.includes(key)}
                class:correct={corrects.includes(key)}
                class:incorrect={incorrects.includes(key)}
                class:rotate={key === "⌦"}
                on:click={() => handleKeydown(key)}>{key}</kbd
            >
        {/each}
    </div>
    <div class="flex justify-center gap-1 my-1 w-full">
        {#each keys_three as key}
            <kbd
                class="kbd pending-use"
                class:rotate={key === "⌦"}
                class:contains={contains.includes(key)}
                class:correct={corrects.includes(key)}
                class:incorrect={incorrects.includes(key)}
                on:click={() => handleKeydown(key)}>{key}</kbd
            >
        {/each}
    </div>
</main>

<div
    id="popups"
    class="fixed flex h-screen w-screen justify-center items-center"
>
    {#if showShort}
        {#key showShort}
            <div
                class="fade alert  alert-warning shadow-lg w-80 self-center"
                in:fly={{ x: -2000 }}
                out:fly={{ x: 200 }}
            >
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        /></svg
                    >

                    <span>Too short of a word!</span>
                </div>
            </div>
        {/key}
    {/if}

    {#if notword}
        {#key notword}
            <div
                class="fade alert  alert-warning shadow-lg w-80 self-center"
                in:fly={{ x: -2000 }}
                out:fly={{ x: 200 }}
            >
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        /></svg
                    >

                    <span>Not a word!</span>
                </div>
            </div>
        {/key}
    {/if}

    {#if failed}
        {#key failed}
            <div
                class="fade alert  alert-error shadow-lg w-80 self-center"
                in:fly={{ x: -2000 }}
                out:fly={{ x: 200 }}
            >
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        /></svg
                    >

                    <span>{word}</span>
                </div>
                <div class="flex-none">
                    <button class="btn btn-sm btn-primary" on:click={reset}
                        >Play again</button
                    >
                </div>
            </div>
        {/key}
    {/if}
    {#if success}
        {#key success}
            <div
                class="fade alert alert-success shadow-lg w-80 self-center place-self-center"
                in:fly={{ x: -2000 }}
                out:fly={{ x: 200 }}
            >
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        /></svg
                    >

                    <span>Correct!</span>
                </div>
                <div class="flex-none">
                    <button class="btn btn-sm btn-primary" on:click={reset}
                        >Play again</button
                    >
                </div>
            </div>
        {/key}
    {/if}
</div>

<style>
    input {
        text-align: center;
    }

    *:not(#popups) {
        pointer-events: auto;
    }

    #popups {
        pointer-events: none;
    }

    .rotate {
        transform: rotate(180deg);
    }
</style>
