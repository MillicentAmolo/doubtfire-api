import { Component } from '@angular/core';
import { Transition } from '@uirouter/core';
import { AuthenticationService } from 'src/app/api/services/authentication.service';
import { AlertService } from 'src/app/common/services/alert.service';

@Component({
  selector: 'f-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: [],
})
export class ResetPasswordComponent {
  password = '';
  confirm = '';
  submitting = false;
  token: string;
  strength: 'weak' | 'ok' | 'strong' | '' = '';

  constructor(
    private transition: Transition,
    private auth: AuthenticationService,
    private alerts: AlertService,
  ) {
    this.token = this.transition.params().token;
  }

  submit(): void {
    if (!this.password || this.password !== this.confirm) {
      this.alerts.error('Passwords do not match.');
      return;
    }
    if (!this.isStrongEnough(this.password)) {
      this.alerts.error('Password is too weak. Use at least 8 chars with letters and numbers.');
      return;
    }
    this.submitting = true;
    this.auth
      .resetPassword({ reset_password_token: this.token, password: this.password, password_confirmation: this.confirm })
      .subscribe({
        next: () => {
          this.alerts.success('Your password has been reset. You can now sign in.');
          this.submitting = false;
        },
        error: (e) => {
          this.alerts.error('Reset failed. The link may have expired.');
          this.submitting = false;
        },
      });
  }

  onPasswordInput(): void {
    if (!this.password) {
      this.strength = '';
      return;
    }
    this.strength = this.estimateStrength(this.password);
  }

  private isStrongEnough(pw: string): boolean {
    return pw.length >= 8 && /[A-Za-z]/.test(pw) && /\d/.test(pw);
  }

  private estimateStrength(pw: string): 'weak' | 'ok' | 'strong' {
    const lengthScore = pw.length >= 12 ? 2 : pw.length >= 8 ? 1 : 0;
    const variety = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].reduce((a, r) => (r.test(pw) ? a + 1 : a), 0);
    const score = lengthScore + variety;
    if (score >= 5) return 'strong';
    if (score >= 3) return 'ok';
    return 'weak';
  }
}


