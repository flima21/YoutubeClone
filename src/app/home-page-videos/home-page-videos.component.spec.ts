import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageVideosComponent } from './home-page-videos.component';

describe('HomePageVideosComponent', () => {
  let component: HomePageVideosComponent;
  let fixture: ComponentFixture<HomePageVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageVideosComponent]
    });
    fixture = TestBed.createComponent(HomePageVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
