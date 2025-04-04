import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AUTComponent } from './aut.component';

describe('AUTComponent', () => {
  let component: AUTComponent;
  let fixture: ComponentFixture<AUTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AUTComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AUTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
