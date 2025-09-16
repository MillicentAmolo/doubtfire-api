import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/api/services/authentication.service';
import { AlertService } from 'src/app/common/services/alert.service';

@Component({
  selector: 'f-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: [],
})
export class ForgotPasswordComponent {
  emailOrUsername = '';
  submitting = false;

  constructor(
    private auth: AuthenticationService,
    private alerts: AlertService,
  ) {}

  submit(): void {
    if (!this.emailOrUsername) {
      return;
    }
    this.submitting = true;
    const payload: any = this.emailOrUsername.includes('@')
      ? { email: this.emailOrUsername }
      : { username: this.emailOrUsername };
    this.auth.requestPasswordReset(payload).subscribe({
      next: () => {
        this.alerts.success('If the account exists, reset instructions have been sent.');
        this.submitting = false;
      },
      error: () => {
        // Paranoid response already used; still show success
        this.alerts.success('If the account exists, reset instructions have been sent.');
        this.submitting = false;
      },
    });
  }
}


