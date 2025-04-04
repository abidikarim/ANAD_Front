import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalementDopageComponent } from './signalement-dopage.component';

describe('SignalementDopageComponent', () => {
  let component: SignalementDopageComponent;
  let fixture: ComponentFixture<SignalementDopageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalementDopageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalementDopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
