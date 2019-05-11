import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { mergeMap, map, filter } from 'rxjs/operators';
import { Car } from '../models/car.model';
import { Upload } from '../models/upload.model';
import { FilterValues } from '../../cars/car-filters/filter.model';
import { storage } from 'firebase/app';

@Injectable({
    providedIn: 'root',
})
export class CarService {

    private carCollection: AngularFirestoreCollection<Car>;
    private currentCarsListSubject = new ReplaySubject<Car[]>(1);
    public currentCarsList = this.currentCarsListSubject.asObservable();
    private storageRef: AngularFireStorageReference;

    constructor(private firestore: AngularFirestore, private fireStorage: AngularFireStorage) {
        this.carCollection = this.firestore.collection('cars');
        this.storageRef = fireStorage.ref('/cars');
        this.setCarsList();
    }

    setCarsList() {
        this.carCollection.snapshotChanges().subscribe(el => {
            const cars: Car[] = el.map( carItem => {
                const car = {
                    id: carItem.payload.doc.id,
                    ...carItem.payload.doc.data()
                } as Car;
                return car;
            });
            cars.sort( (a, b) => {
                return a.id - b.id;
            });
            this.currentCarsListSubject.next(cars);
        });
    }

    getCars() {
        return this.currentCarsList;
    }

    // FIX ISSUE WITH CARS WHEN DB HASN'T CARS
    addCar(car: Car, files: Upload[] = null) {
        this.firestore.collection('cars', ref => ref.orderBy('id', 'desc').limit(1)).get().subscribe((element) => {
            let id = Number(element.docs[0].id);
            car.id = ++id;
            if ( files ) {
                this.uploadCarImages(files).then( images => {
                    car.imageLinks = images;
                    this.carCollection.doc(String(car.id)).set(car);
                });
            } else {
                this.carCollection.doc(String(car.id)).set(car);
            }
        });
    }

    updateCar(car: Car, files: Upload[], removed: string[]) {
        if ( files ) {
            this.uploadCarImages(files).then( images => {
                car.imageLinks = car.imageLinks.concat(images);
                this.carCollection.doc(String(car.id)).update(car).then( () => {
                    if ( removed ) {
                        this.removedCarImagesByUrl(removed);
                    }
                });
            });
        } else {
            this.carCollection.doc(String(car.id)).update(car).then( () => {
                if ( removed ) {
                    this.removedCarImagesByUrl(removed);
                }
            });
        }
    }

    deleteCar(id: number) {
        this.currentCarsList.subscribe( (cars: Car[]) => {
            const carItem = cars.find( (car: Car) => car.id === id);
            this.removedCarImagesByUrl(carItem.imageLinks);
            this.carCollection.doc(String(id)).delete();
        }).unsubscribe();
    }

    removedCarImagesByUrl(urls: string[]) {
        urls.forEach( img => {
            this.fireStorage.storage.refFromURL(img).delete();
        });
    }

    getCarById( id: number ): Observable<Car> {
        return this.currentCarsList.pipe(mergeMap( cars => {
            const carList = cars.filter(el => el.id === id);
            return ( carList.length > 0) ? carList : [null];
        }));
    }

    async uploadCarImages(files: Upload[]) {
        const promiseImageArray = files.map( async file => {
            const url = `/${new Date().getTime()}_${file.file.name}`;
            const uploadTask: AngularFireUploadTask = await this.storageRef.child(url).put(file.file);
            const carImageUrl = await uploadTask.task.snapshot.ref.getDownloadURL();
            return carImageUrl;
        });
        const imageLinks = await Promise.all(promiseImageArray);
        return imageLinks;
    }

    filterCars(filterValues: FilterValues, databaseCars: Car[]): Car[] {

        return databaseCars.filter( (car) => {
            // check make of the car
            if ( filterValues.make ) {
                if ( car.make !== databaseCars[filterValues.make - 1].make ) {
                    return false;
                }
            }
            // check model
            if ( filterValues.model ) {
                if ( car.model !== filterValues.model ) {
                    return false;
                }
            }
            // check ranges min
            return car.equipments.some( ( equipment ) => {
                if ( equipment.price >= filterValues.prices[0] && equipment.price <= filterValues.prices[1] &&
                    equipment.properties.battery >= filterValues.battery[0] && equipment.properties.battery <= filterValues.battery[1] &&
                    equipment.properties.range >= filterValues.range[0] && equipment.properties.range <= filterValues.range[1] &&
                    equipment.properties.power >= filterValues.power[0] && equipment.properties.power <= filterValues.power[1]
                ) {
                    return true;
                } else {
                    return false;
                }
            });
        });
    }

}
