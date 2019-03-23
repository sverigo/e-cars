export class FilterValues {
    make: number;
    model: string;
    prices: number[];
    battery: number[];
    power: number[];
    range: number[];

    constructor(make, model, prices, battery, power, range) {
        this.make = make;
        this.model = model;
        this.prices = prices;
        this.battery = battery;
        this.power = power;
        this.range = range;
    }
}
