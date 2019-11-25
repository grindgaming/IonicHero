import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSelectPage } from './class-select.page';

describe('ClassSelectPage', () => {
  let component: ClassSelectPage;
  let fixture: ComponentFixture<ClassSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassSelectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
