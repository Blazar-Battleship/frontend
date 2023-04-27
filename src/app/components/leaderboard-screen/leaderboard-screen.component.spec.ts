import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardScreenComponent } from './leaderboard-screen.component';

describe('LeaderboardScreenComponent', () => {
  let component: LeaderboardScreenComponent;
  let fixture: ComponentFixture<LeaderboardScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
