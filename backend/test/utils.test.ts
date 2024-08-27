import { calculateFreightPrice, formatMoney } from "../src/utils/utils";

const priceRateTests = [
    {
        args: {
            distance: 10, vehicleWeight: 5
        },
        result: {
            price: 50, rate: 10
        }
    },
    {
        args: {
            distance: 150, vehicleWeight: 4
        },
        result: {
            price: 600, rate: 90
        }
    },
    {
        args: {
            distance: 800, vehicleWeight: 10
        },
        result: {
            price: 8000, rate: 600
        }
    },
];
const moneyTests = [
    {
        args: 400,
        result: "400,00"
    },
    {
        args: 20.5,
        result: "20,50"
    },
    {
        args: 0.9,
        result: "0,90"
    },
    {
        args: undefined,
        result: undefined
    },
];

test('Calculate the price and rate with default rates', () => {
    for (let i = 0; i < priceRateTests.length; i++) {
        const element = priceRateTests[i];
        expect(calculateFreightPrice(element.args.distance, element.args.vehicleWeight)).toStrictEqual(element.result);
    }
})

test('Format money', () => {
    for (let i = 0; i < moneyTests.length; i++) {
        const element = moneyTests[i];
        expect(formatMoney(element.args)).toStrictEqual(element.result);
    }
})