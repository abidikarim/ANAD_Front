import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntidopageComponent } from './antidopage.component';

describe('AntidopageComponent', () => {
  let component: AntidopageComponent;
  let fixture: ComponentFixture<AntidopageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AntidopageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntidopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
