<script lang="ts">
    import type Decimal from "decimal.js";
    import {
        stringToDecimal,
        lookupPrefix,
        lookupUnit,
        convertQuantity,
    } from "./lib/convert";
    import { type Prefix, type AnyUnit, type AnyQuantity } from "./lib/vocab";

    let rawCoeff: string = $state("1");
    let rawPrefix: string = $state("kilo");
    let rawInputUnit: string = $state("meter");
    let rawTargetUnit: string = $state("len");

    let processedCoeff: Decimal = $derived(stringToDecimal(rawCoeff || "1"));
    let processedPrefix: Prefix = $derived(lookupPrefix(rawPrefix || ""));
    let processedInputUnit: AnyUnit = $derived(lookupUnit(rawInputUnit));
    let processedTargetUnit: AnyUnit = $derived(lookupUnit(rawTargetUnit));

    const convertedQuantity: AnyQuantity = $derived(
        convertQuantity(
            {
                prefix: processedPrefix,
                coeff: processedCoeff,
                unit: processedInputUnit,
            },
            processedTargetUnit,
        ),
    );

    let output = $derived(
        `${convertedQuantity.coeff.toNumber().toLocaleString()} ${convertedQuantity.prefix.id}${convertedQuantity.unit.names[0]}`,
    );
</script>

<main>
    <h1>Marks System Converter Tool (msct)</h1>
    <div id="inputContainer">
        <div>
            <p>Coefficient</p>
            <input type="string" placeholder="1" bind:value={rawCoeff} />
        </div>
        <div>
            <p>Prefix</p>
            <input type="string" placeholder="kilo" bind:value={rawPrefix} />
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
    <div id="targetContainer">
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
    #inputContainer {
        display: flex;
        gap: 1rem;
    }
    #inputContainer div {
        display: flex;
        flex-direction: column;
    }
    #inputContainer input {
        width: 100%;
    }
</style>
