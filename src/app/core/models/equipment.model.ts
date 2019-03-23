import { DocumentReference } from '@angular/fire/firestore';

export class Equipment {
    // car_id: DocumentReference;
    name: string;
    price: number;
    properties: {
        acceleration: number,
        battery: number,
        gear: string,
        power: number,
        range: number,
        seating: number,
        speed: number,
        weight: number,
    };
}
