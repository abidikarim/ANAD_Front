import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualitiesManagementComponent } from './actualities-management.component';

describe('ActualitiesManagementComponent', () => {
  let component: ActualitiesManagementComponent;
  let fixture: ComponentFixture<ActualitiesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualitiesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualitiesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
