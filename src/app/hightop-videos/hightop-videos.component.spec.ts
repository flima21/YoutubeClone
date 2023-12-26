import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HightopVideosComponent } from './hightop-videos.component';

describe('HightopVideosComponent', () => {
  let component: HightopVideosComponent;
  let fixture: ComponentFixture<HightopVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HightopVideosComponent]
    });
    fixture = TestBed.createComponent(HightopVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
