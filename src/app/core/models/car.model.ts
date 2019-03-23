import { Equipment } from './equipment.model';

export class Car {
    id: number;
    equipments: Equipment[];
    imageLinks: string[];
    make: string;
    model: string;
    rating: number;
}
