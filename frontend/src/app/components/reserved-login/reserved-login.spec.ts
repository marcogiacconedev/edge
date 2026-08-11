import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedLogin } from './reserved-login';

describe('ReservedLogin', () => {
  let component: ReservedLogin;
  let fixture: ComponentFixture<ReservedLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservedLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservedLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
