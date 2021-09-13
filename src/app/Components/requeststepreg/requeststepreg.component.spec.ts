import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequeststepregComponent } from './requeststepreg.component';

describe('RequeststepregComponent', () => {
  let component: RequeststepregComponent;
  let fixture: ComponentFixture<RequeststepregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequeststepregComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequeststepregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
