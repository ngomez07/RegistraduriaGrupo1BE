import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrutarComponent } from './enrutar.component';

describe('EnrutarComponent', () => {
  let component: EnrutarComponent;
  let fixture: ComponentFixture<EnrutarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrutarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrutarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
