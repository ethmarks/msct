<script lang="ts">
    import Decimal from "decimal.js";

    import {
        lookupPrefix,
        lookupUnit,
        getPlanck,
        genericConvert,
    } from "./lib/convert";
    import { type ScaledQuantity, emptyPrefix } from "./lib/vocab";

    Decimal.set({ precision: 70 });

    function displayScaledQuantity(quantity: ScaledQuantity): string {
        return (
            quantity.coeff.toNumber().toLocaleString() +
            " " +
            quantity.prefix.id +
            (quantity.coeff.toNumber() === 1
                ? quantity.unit.id
                : quantity.unit.plural)
        );
    }

    let inputCoeff: string = $state("1");
    let inputPrefix: string = $state("kilo");
    let inputUnit: string = $state("meters");
    let targetUnit: string = $state("len");

    const prefixedConvertedQuantity: ScaledQuantity = $derived(
        genericConvert(
            getPlanck({
                coeff: Decimal(inputCoeff),
                prefix: lookupPrefix(inputPrefix),
                unit: lookupUnit(inputUnit),
            }),
            lookupUnit(targetUnit),
            true,
        ),
    );

    let output: string = $derived.by(() => {
        let result = displayScaledQuantity(prefixedConvertedQuantity);

        if (prefixedConvertedQuantity.prefix !== emptyPrefix) {
            const unprefixedConvertedQuantity: ScaledQuantity = genericConvert(
                getPlanck({
                    coeff: Decimal(inputCoeff),
                    prefix: lookupPrefix(inputPrefix),
                    unit: lookupUnit(inputUnit),
                }),
                lookupUnit(targetUnit),
                false,
            );

            result += ` (${displayScaledQuantity(unprefixedConvertedQuantity)})`;
        }

        return result;
    });
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
