import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Equipment } from '../models/equipment.model';
import { Car } from '../models/car.model';
import { query } from '@angular/animations';

@Injectable({
    providedIn: 'root',
})
export class EquipmentService {

    private equipmentCollection;

    constructor(private firestore: AngularFirestore) {
        this.equipmentCollection = this.firestore.collection('equipments');
    }

    getMinEquipmentsValue(propsArray: Equipment[], propName: string): number {
        if (propsArray.length > 0) {
            const minEquipmentValue: number = propsArray.reduce((min, current) => {
                const prop = current.properties[propName] || current[propName];
                return prop < min ? prop : min;
            }, Infinity);
            return minEquipmentValue;
        } else {
            return 0;
        }
    }

    getMaxEquipmentsValue(propsArray: Equipment[], propName: string): number {
        if (propsArray.length > 0) {
            const maxEquipmentValue: number = propsArray.reduce((max, current) => {
                const prop = current.properties[propName] || current[propName];
                return prop > max ? prop : max;
            }, -Infinity);
            return maxEquipmentValue;
        } else {
            return 0;
        }
    }
}
