<script lang="ts">
    import Decimal from "decimal.js";

    import {
        lookupPrefix,
        lookupUnit,
        getPlanck,
        genericConvert,
    } from "./lib/convert";
    import {
        type ScaledQuantity,
        type Prefix,
        type Unit,
        emptyPrefix,
    } from "./lib/vocab";

    Decimal.set({ precision: 70 });

    function displayScaledQuantity(quantity: ScaledQuantity): string {
        const coeffString: string = quantity.coeff.toPrecision(4).toString();
        const prefixString: string = quantity.prefix.id;
        const unitString: string =
            quantity.coeff.toNumber() === 1
                ? quantity.unit.id
                : quantity.unit.plural;
        return coeffString + " " + prefixString + unitString;
    }

    function convertAndDisplay(
        input: ScaledQuantity,
        targetUnit: Unit,
    ): string {
        let prefixedConvertedQuantity: ScaledQuantity;
        let unprefixedConvertedQuantity: ScaledQuantity;

        try {
            prefixedConvertedQuantity = genericConvert(
                getPlanck(input),
                targetUnit,
                true,
            );
            unprefixedConvertedQuantity = genericConvert(
                getPlanck({
                    coeff: Decimal(inputCoeff),
                    prefix: lookupPrefix(rawInputPrefix),
                    unit: lookupUnit(rawInputUnit),
                }),
                lookupUnit(rawTargetUnit),
                false,
            );
        } catch (e) {
            return e instanceof Error ? e.message : "Unknown error";
        }

        let result = displayScaledQuantity(prefixedConvertedQuantity);

        if (prefixedConvertedQuantity.prefix !== emptyPrefix) {
            result += ` (${displayScaledQuantity(unprefixedConvertedQuantity)})`;
        }

        return result;
    }

    let inputCoeff: string = $state("1");
    let rawInputPrefix: string = $state("kilo");
    let rawInputUnit: string = $state("meters");
    let rawTargetUnit: string = $state("len");

    let output: string = $derived.by(() => {
        let inputPrefix: Prefix;
        let inputUnit: Unit;
        let targetUnit: Unit;

        try {
            inputPrefix = lookupPrefix(rawInputPrefix);
            inputUnit = lookupUnit(rawInputUnit);
            targetUnit = lookupUnit(rawTargetUnit);
        } catch {
            return "Couldn't process input";
        }

        return convertAndDisplay(
            {
                coeff: Decimal(inputCoeff),
                prefix: inputPrefix,
                unit: inputUnit,
            },
            targetUnit,
        );
    });
</script>

<main>
    <h1>Marks System Converter Tool (msct)</h1>
    <h2>Input</h2>
    <div id="inputContainer" class="container">
        <div>
            <p>Coefficient</p>
            <input type="text" placeholder="1" bind:value={inputCoeff} />
        </div>
        <div>
            <p>Prefix</p>
            <input type="text" placeholder="kilo" bind:value={rawInputPrefix} />
        </div>
        <div>
            <p>Unit</p>
            <input type="text" placeholder="meter" bind:value={rawInputUnit} />
        </div>
    </div>
    <h2>Target</h2>
    <div id="targetContainer" class="container">
        <div>
            <p>Unit</p>
            <input type="text" placeholder="len" bind:value={rawTargetUnit} />
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
