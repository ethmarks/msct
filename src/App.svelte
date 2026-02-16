<script lang="ts">
    import Decimal from "decimal.js";

    import {
        lookupPrefix,
        lookupUnit,
        getPlanck,
        genericConvert,
    } from "./lib/convert";
    import { type ScaledQuantity } from "./lib/vocab";

    Decimal.set({ precision: 70 });

    let inputCoeff: string = $state("1");
    let inputPrefix: string = $state("kilo");
    let inputUnit: string = $state("meters");
    let targetUnit: string = $state("len");
    let addPrefixToTarget: boolean = $state(false);

    const convertedQuantity: ScaledQuantity = $derived(
        genericConvert(
            getPlanck({
                coeff: Decimal(inputCoeff),
                prefix: lookupPrefix(inputPrefix),
                unit: lookupUnit(inputUnit),
            }),
            lookupUnit(targetUnit),
            addPrefixToTarget,
        ),
    );

    const output = $derived(
        convertedQuantity.coeff.toNumber().toLocaleString() +
            " " +
            convertedQuantity.prefix.id +
            (convertedQuantity.coeff.toNumber() === 1
                ? convertedQuantity.unit.id
                : convertedQuantity.unit.plural),
    );
</script>

<main>
    <h1>Marks System Converter Tool (msct)</h1>
    <h2>Input</h2>
    <div id="inputContainer" class="container">
        <div>
            <p>Coefficient</p>
            <input type="string" placeholder="1" bind:value={inputCoeff} />
        </div>
        <div>
            <p>Prefix</p>
            <input type="string" placeholder="kilo" bind:value={inputPrefix} />
        </div>
        <div>
            <p>Unit</p>
            <input type="string" placeholder="meter" bind:value={inputUnit} />
        </div>
    </div>
    <h2>Target</h2>
    <div id="targetContainer" class="container">
        <div>
            <p>Add Prefix?</p>
            <input type="checkbox" bind:checked={addPrefixToTarget} />
        </div>
        <div>
            <p>Unit</p>
            <input type="string" placeholder="len" bind:value={targetUnit} />
        </div>
    </div>
    <div id="outputContainer" class="container">
        <p id="output">{output}</p>
    </div>
</main>

<style>
    .container {
        display: flex;
        gap: 1rem;
    }
    .container input {
        width: 100%;
    }
</style>
