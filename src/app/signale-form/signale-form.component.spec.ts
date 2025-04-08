import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaleFormComponent } from './signale-form.component';

describe('SignaleFormComponent', () => {
  let component: SignaleFormComponent;
  let fixture: ComponentFixture<SignaleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignaleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignaleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
