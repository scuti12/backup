import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RqeinfoComponent } from './rqeinfo.component';

describe('RqeinfoComponent', () => {
  let component: RqeinfoComponent;
  let fixture: ComponentFixture<RqeinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RqeinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RqeinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
