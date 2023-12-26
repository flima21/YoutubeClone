import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePrincipalPageComponent } from './home-principal-page.component';

describe('HomePrincipalPageComponent', () => {
  let component: HomePrincipalPageComponent;
  let fixture: ComponentFixture<HomePrincipalPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePrincipalPageComponent]
    });
    fixture = TestBed.createComponent(HomePrincipalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
