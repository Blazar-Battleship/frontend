import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceShipsScreenComponent } from './place-ships-screen.component';

describe('PlaceShipsScreenComponent', () => {
  let component: PlaceShipsScreenComponent;
  let fixture: ComponentFixture<PlaceShipsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceShipsScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceShipsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
