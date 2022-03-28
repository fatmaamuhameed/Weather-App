import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingDisplayComponent } from './landing-display.component';

describe('LandingDisplayComponent', () => {
  let component: LandingDisplayComponent;
  let fixture: ComponentFixture<LandingDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
