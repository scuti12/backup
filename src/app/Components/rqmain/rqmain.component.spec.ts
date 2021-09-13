import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RqmainComponent } from './rqmain.component';

describe('RqmainComponent', () => {
  let component: RqmainComponent;
  let fixture: ComponentFixture<RqmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RqmainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RqmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
