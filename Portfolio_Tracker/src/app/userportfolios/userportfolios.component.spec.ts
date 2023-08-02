import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserportfoliosComponent } from './userportfolios.component';

describe('UserportfoliosComponent', () => {
  let component: UserportfoliosComponent;
  let fixture: ComponentFixture<UserportfoliosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserportfoliosComponent]
    });
    fixture = TestBed.createComponent(UserportfoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
