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
        type Dimensionality,
        emptyPrefix,
        allUnits,
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
                targetUnit,
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

    function listCompatibleUnits(inputDim: Dimensionality): Unit[] {
        return allUnits.filter(
            (unit) => unit.planck.dimensionality === inputDim,
        );
    }

    let inputCoeff: string = $state("1");
    let rawInputPrefix: string = $state("kilo");
    let rawInputUnit: string = $state("meters");

    let outputArray: string[] = $derived.by(() => {
        let inputPrefix: Prefix;
        let inputUnit: Unit;

        try {
            inputPrefix = lookupPrefix(rawInputPrefix);
            inputUnit = lookupUnit(rawInputUnit);
        } catch {
            return ["Couldn't process input"];
        }

        const compatUnits = listCompatibleUnits(
            inputUnit.planck.dimensionality,
        );

        let outputString: string[] = [];

        compatUnits.forEach((unit) =>
            outputString.push(
                convertAndDisplay(
                    {
                        coeff: Decimal(inputCoeff),
                        prefix: inputPrefix,
                        unit: inputUnit,
                    },
                    unit,
                ),
            ),
        );

        return outputString;
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
    <div id="outputContainer">
        {#each outputArray as output}
            <p>{output}</p>
        {/each}
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
