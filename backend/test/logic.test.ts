import { calculateFreightPrice } from "../src/logic/logic";
import { FreightPriceRate } from "../src/logic/types";

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

test('Calculate the price and rate with default rates', () => {
    for (let i = 0; i < priceRateTests.length; i++) {
        const element = priceRateTests[i];
        expect(calculateFreightPrice(element.args.distance, element.args.vehicleWeight)).toStrictEqual(element.result);
    }
})