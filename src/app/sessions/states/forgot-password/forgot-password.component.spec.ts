import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/app/api/services/authentication.service';
import { AlertService } from 'src/app/common/services/alert.service';
import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  const authSpy = jasmine.createSpyObj('AuthenticationService', ['requestPasswordReset']);
  const alertsSpy = jasmine.createSpyObj('AlertService', ['success', 'error']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, MatSnackBarModule],
      declarations: [ForgotPasswordComponent],
      providers: [
        { provide: AuthenticationService, useValue: authSpy },
        { provide: AlertService, useValue: alertsSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('submits email', () => {
    authSpy.requestPasswordReset.and.returnValue(of({}));
    component.emailOrUsername = 'user@example.com';
    component.submit();
    expect(authSpy.requestPasswordReset).toHaveBeenCalledWith({ email: 'user@example.com' });
  });
});


