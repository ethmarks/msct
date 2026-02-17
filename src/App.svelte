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

    /**
     * Formats a coefficient for display:
     * - Scientific notation (ax10^b) for |value| >= 10^7 or |value| < 10^-5
     * - 2 decimal places (without trailing zeros) for 1 <= |value| < 100
     * - Comma separators for 1000 <= |value| < 10^7
     * - No decimals for 100 <= |value| < 10^7
     * - Normal notation for 10^-5 <= |value| < 10^7
     */
    function formatCoefficient(coeff: Decimal): string {
        const absValue = coeff.abs().toNumber();

        // Use scientific notation for extreme values
        if (absValue >= 1e7 || (absValue < 1e-5 && absValue !== 0)) {
            const exponent = Math.floor(Math.log10(absValue));
            const mantissa = coeff.div(Decimal(10).pow(exponent));
            const mantissaStr = mantissa.toFixed(2).replace(/\.?0+$/, "");

            // Simplify "1×10^b" to just "10^b"
            if (mantissaStr === "1") {
                return `10^${exponent}`;
            }

            return `${mantissaStr}×10^${exponent}`;
        }

        // Normal notation with smart decimal handling
        if (absValue >= 1000) {
            // Add comma separators for values >= 1000
            const num = coeff.toFixed(0);
            return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else if (absValue >= 100) {
            // No decimals for values between 100 and 1000
            return coeff.toFixed(0);
        } else if (absValue >= 1) {
            // 2 decimal places (without trailing zeros) for values between 1 and 100
            return coeff.toFixed(2).replace(/\.?0+$/, "");
        } else if (absValue === 0) {
            return "0";
        } else {
            // For values between 10^-5 and 1, show 2 significant non-zero decimals
            const str = coeff.toFixed(10); // Get enough decimals
            const match = str.match(/^-?0\.0*[1-9]\d?/);
            const result = match ? match[0] : coeff.toFixed(2);
            return result.replace(/\.?0+$/, ""); // Remove trailing zeros
        }
    }

    function displayScaledQuantity(quantity: ScaledQuantity): string {
        const coeffString: string = formatCoefficient(quantity.coeff);
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
