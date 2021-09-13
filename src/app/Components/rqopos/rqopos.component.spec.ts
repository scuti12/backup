import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RqoposComponent } from './rqopos.component';

describe('RqoposComponent', () => {
  let component: RqoposComponent;
  let fixture: ComponentFixture<RqoposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RqoposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RqoposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
