import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementComponent } from './reglement.component';

describe('ReglementComponent', () => {
  let component: ReglementComponent;
  let fixture: ComponentFixture<ReglementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReglementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
