import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalementManagementComponent } from './signalement-management.component';

describe('SignalementManagementComponent', () => {
  let component: SignalementManagementComponent;
  let fixture: ComponentFixture<SignalementManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalementManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalementManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
