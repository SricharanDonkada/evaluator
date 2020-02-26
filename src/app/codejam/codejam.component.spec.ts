import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodejamComponent } from './codejam.component';

describe('CodejamComponent', () => {
  let component: CodejamComponent;
  let fixture: ComponentFixture<CodejamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodejamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodejamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
