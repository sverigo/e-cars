import { TestBed } from '@angular/core/testing';

import { CarRateService } from './car-rate.service';

describe('CarRateService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: CarRateService = TestBed.get(CarRateService);
        expect(service).toBeTruthy();
    });
});
