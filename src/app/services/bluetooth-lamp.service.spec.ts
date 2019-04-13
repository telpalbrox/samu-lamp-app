import { TestBed } from '@angular/core/testing';

import { BluetoothLampService } from './bluetooth-lamp.service';

describe('BluetoothLampServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BluetoothLampService = TestBed.get(BluetoothLampService);
    expect(service).toBeTruthy();
  });
});
