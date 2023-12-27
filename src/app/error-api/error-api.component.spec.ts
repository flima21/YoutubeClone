import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorApiComponent } from './error-api.component';

describe('ErrorApiComponent', () => {
  let component: ErrorApiComponent;
  let fixture: ComponentFixture<ErrorApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorApiComponent]
    });
    fixture = TestBed.createComponent(ErrorApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
