import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListVideoComponent } from './search-list-video.component';

describe('SearchListVideoComponent', () => {
  let component: SearchListVideoComponent;
  let fixture: ComponentFixture<SearchListVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchListVideoComponent]
    });
    fixture = TestBed.createComponent(SearchListVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
