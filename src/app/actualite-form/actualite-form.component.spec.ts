import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActualiteComponent } from './actualite-form.component';

describe('AddActualiteComponent', () => {
  let component: AddActualiteComponent;
  let fixture: ComponentFixture<AddActualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddActualiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
