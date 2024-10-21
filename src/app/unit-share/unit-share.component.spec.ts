import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitShareComponent } from './unit-share.component';

describe('UnitShareComponent', () => {
  let component: UnitShareComponent;
  let fixture: ComponentFixture<UnitShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitShareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
