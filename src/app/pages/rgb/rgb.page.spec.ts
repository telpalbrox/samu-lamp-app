import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RgbPage } from './rgb.page';

describe('RgbPage', () => {
  let component: RgbPage;
  let fixture: ComponentFixture<RgbPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RgbPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RgbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
