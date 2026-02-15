<script lang="ts">
    import Decimal from "decimal.js";

    let rawCoeff: string = $state("1");
    let rawInputPrefix: string = $state("kilo");
    let rawInputUnit: string = $state("meter");
    let rawTargetPrefix: string = $state("deca");
    let rawTargetUnit: string = $state("len");

    let output = "";
</script>

<main>
    <h1>Marks System Converter Tool (msct)</h1>
    <h2>Input</h2>
    <div id="inputContainer" class="container">
        <div>
            <p>Coefficient</p>
            <input type="string" placeholder="1" bind:value={rawCoeff} />
        </div>
        <div>
            <p>Prefix</p>
            <input
                type="string"
                placeholder="kilo"
                bind:value={rawInputPrefix}
            />
        </div>
        <div>
            <p>Unit</p>
            <input
                type="string"
                placeholder="meter"
                bind:value={rawInputUnit}
            />
        </div>
    </div>
    <h2>Target</h2>
    <div id="targetContainer" class="container">
        <div>
            <p>Prefix</p>
            <input
                type="string"
                placeholder="deca"
                bind:value={rawTargetPrefix}
            />
        </div>
        <div>
            <p>Unit</p>
            <input type="string" placeholder="len" bind:value={rawTargetUnit} />
        </div>
    </div>
    <div id="outputContainer">
        <p id="output">{output}</p>
    </div>
</main>

<style>
    .container {
        display: flex;
        gap: 1rem;
    }
    .container div {
        display: flex;
        flex-direction: column;
    }
    .container input {
        width: 100%;
    }
</style>
