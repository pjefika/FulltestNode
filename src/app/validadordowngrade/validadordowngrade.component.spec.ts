import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidadordowngradeComponent } from './validadordowngrade.component';

describe('ValidadordowngradeComponent', () => {
  let component: ValidadordowngradeComponent;
  let fixture: ComponentFixture<ValidadordowngradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidadordowngradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidadordowngradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
