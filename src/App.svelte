<script lang="ts">
    import Decimal from "decimal.js";
    import {
        stringToDecimal,
        lookupPrefix,
        lookupUnit,
        convertQuantity,
    } from "./lib/convert";
    import { type Prefix, type Unit, type Quantity } from "./lib/vocab";

    let rawCoeff: string = $state("1");
    let rawInputPrefix: string = $state("kilo");
    let rawInputUnit: string = $state("meter");
    let rawTargetPrefix: string = $state("deca");
    let rawTargetUnit: string = $state("len");

    let processedCoeff: Decimal = $derived(stringToDecimal(rawCoeff || "1"));
    let processedInputPrefix: Prefix = $derived(
        lookupPrefix(rawInputPrefix || ""),
    );
    let processedTargetPrefix: Prefix = $derived(
        lookupPrefix(rawTargetPrefix || ""),
    );
    let processedInputUnit: Unit = $derived(lookupUnit(rawInputUnit));
    let processedTargetUnit: Unit = $derived(lookupUnit(rawTargetUnit));

    const convertedQuantity: Quantity = $derived(
        convertQuantity(
            {
                prefix: processedInputPrefix,
                coeff: processedCoeff,
                unit: processedInputUnit,
            },
            {
                prefix: processedTargetPrefix,
                coeff: Decimal(1),
                unit: processedTargetUnit,
            },
        ),
    );

    let output = $derived(
        `${convertedQuantity.coeff.toNumber().toLocaleString()} ${convertedQuantity.prefix.id}${convertedQuantity.unit.id}`,
    );
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
