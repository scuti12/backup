import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommisComponent } from './commis.component';

describe('CommisComponent', () => {
  let component: CommisComponent;
  let fixture: ComponentFixture<CommisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
