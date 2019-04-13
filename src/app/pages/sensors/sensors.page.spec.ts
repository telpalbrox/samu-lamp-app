import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsPage } from './sensors.page';

describe('SensorsPage', () => {
  let component: SensorsPage;
  let fixture: ComponentFixture<SensorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
