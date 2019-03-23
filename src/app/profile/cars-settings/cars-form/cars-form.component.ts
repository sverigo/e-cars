import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarService } from 'src/app/core/services/car.service';
import { Car } from 'src/app/core/models/car.model';
import { Upload } from 'src/app/core/models/upload.model';
import { Equipment } from 'src/app/core/models/equipment.model';

@Component({
    selector: 'app-cars-form',
    templateUrl: './cars-form.component.html',
    styleUrls: ['./cars-form.component.scss']
})
export class CarsFormComponent implements OnInit, OnDestroy {
    carForm: FormGroup;
    car: Car;
    action: string;
    uploadButtonText = 'Choose file';

    private carChanges: Subscription;
    private currentRating = 0;
    private currentCarId: number;
    private numberPattern = '^[0-9]+(\.[0-9]+)?$';
    private uploadImages: Upload[] = [];
    private selectedImageLinks = [];
    private removedImageLinks = [];

    constructor(private formBuilder: FormBuilder,
                private carService: CarService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.action = this.activatedRoute.snapshot.url[0].path;
        (this.action === 'create') ? this.processCreateAction() : this.processEditAction();
    }

    ngOnDestroy() {
        if (this.carChanges) this.carChanges.unsubscribe();
    }

    private processCreateAction(): void {
        this.car = new Car();
        this.populateForm(this.car, new FormArray([]));
    }

    private processEditAction(): void {
        if (this.activatedRoute.snapshot.params.id) {
            const id = Number(this.activatedRoute.snapshot.params.id);
            this.carChanges = this.carService.getCarById(id).subscribe(car => {
                if (car) {
                    this.car = car;
                    this.currentCarId = car.id;
                    this.currentRating = car.rating;
                    this.selectedImageLinks = this.car.imageLinks;
                    const currentEquipments = this.generateEquipments(this.car.equipments);
                    this.populateForm(this.car, currentEquipments);
                } else {
                    this.router.navigateByUrl('profile/cars');
                }
            });
        } else {
            this.router.navigateByUrl('profile/cars');
        }
    }

    private populateForm(car: Car, equipmentsArray: FormArray): void {
        this.carForm = this.formBuilder.group({
            make: [car.make, Validators.required],
            model: [car.model, Validators.required],
            imageLinks: [''],
            equipments: equipmentsArray
        });
    }

    private generateEquipments(equipments: Equipment[]): FormArray {
        const equipmentsArray = this.formBuilder.array([]);

        equipments.forEach((equipment) => {
            equipmentsArray.push(this.createFormGroup(equipment));
        });

        return equipmentsArray;
    }

    private createFormGroup(equip?: Equipment): FormGroup {
        const numberValidators = [Validators.required, Validators.pattern(this.numberPattern)];
        let equipment;
        if (equip) {
            equipment = equip;
        } else {
            equipment = {
                name: '',
                price: '',
                properties: {
                    acceleration: '',
                    battery: '',
                    gear: '',
                    power: '',
                    range: '',
                    seating: '',
                    speed: '',
                    weight: ''
                }
            };
        }

        return this.formBuilder.group({
            name: [equipment.name, Validators.required],
            price: [equipment.price, numberValidators],
            properties: this.formBuilder.group({
                acceleration: [equipment.properties.acceleration, numberValidators],
                battery: [equipment.properties.battery, numberValidators],
                gear: [equipment.properties.gear, Validators.required],
                power: [equipment.properties.power, numberValidators],
                range: [equipment.properties.range, numberValidators],
                seating: [equipment.properties.seating, numberValidators],
                speed: [equipment.properties.speed, numberValidators],
                weight: [equipment.properties.weight, numberValidators]
            })
        });
    }

    removeImage(link: string): void {
        this.removedImageLinks.push(link);
        this.car.imageLinks.splice(this.car.imageLinks.indexOf(link), 1);
    }

    addEquipment(): void {
        const equipmentGroup = this.createFormGroup();
        (this.carForm.get('equipments') as FormArray).push(equipmentGroup);
    }

    removeEquipment(arrayId: number): void {
        (this.carForm.get('equipments') as FormArray).removeAt(arrayId);
    }

    onSubmit(): void {
        this.car = this.carForm.value;
        this.car.imageLinks = this.selectedImageLinks;
        this.car.rating = this.currentRating;
        this.convertPropsToNumber(this.car);
        if (this.action === 'create') {
            this.carService.addCar(this.car, this.uploadImages);
        } else {
            this.car.id = this.currentCarId;
            this.carService.updateCar(this.car, this.uploadImages, this.removedImageLinks);
        }
        this.router.navigateByUrl('profile/cars');
    }

    onSelectImage(files: File[]): void {
        if (files.length < 1) {
            this.uploadButtonText = 'Choose a file';
            this.uploadImages = [];
        } else {
            if (files.length === 1) {
                this.uploadButtonText = `${files.length} file selected`;
            } else {
                this.uploadButtonText = `${files.length} files selected`;
            }
            Array.from(files).forEach((file) => {
                this.uploadImages.push(new Upload(file));
            });
        }
    }

    backToCars(): void {
        this.router.navigateByUrl('profile/cars');
    }

    private convertPropsToNumber(car: Car): void {
        car.equipments.forEach(equipment => {
            const properties = equipment.properties;
            equipment.price = Number(equipment.price);
            properties.acceleration = Number(properties.acceleration);
            properties.battery = Number(properties.battery);
            properties.power = Number(properties.power);
            properties.range = Number(properties.range);
            properties.seating = Number(properties.seating);
            properties.speed = Number(properties.speed);
            properties.weight = Number(properties.weight);
        });
    }
}
