import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Transition } from '@uirouter/core';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/app/api/services/authentication.service';
import { AlertService } from 'src/app/common/services/alert.service';
import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  const authSpy = jasmine.createSpyObj('AuthenticationService', ['resetPassword']);
  const alertsSpy = jasmine.createSpyObj('AlertService', ['success', 'error']);
  const transitionStub = { params: () => ({ token: 'abc' }) } as unknown as Transition;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, MatSnackBarModule],
      declarations: [ResetPasswordComponent],
      providers: [
        { provide: AuthenticationService, useValue: authSpy },
        { provide: AlertService, useValue: alertsSpy },
        { provide: Transition, useValue: transitionStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('submits matching passwords with token', () => {
    authSpy.resetPassword.and.returnValue(of({}));
    component.password = 'p1';
    component.confirm = 'p1';
    component.submit();
    expect(authSpy.resetPassword).toHaveBeenCalled();
  });
});


