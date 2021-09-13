import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RqfileComponent } from './rqfile.component';

describe('RqfileComponent', () => {
  let component: RqfileComponent;
  let fixture: ComponentFixture<RqfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RqfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RqfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
