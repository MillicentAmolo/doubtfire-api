import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DoubtfireConstants } from 'src/app/config/constants/doubtfire-constants';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService password helpers', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService, DoubtfireConstants],
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('requests password reset by email', () => {
    service.requestPasswordReset({ email: 'a@b.com' }).subscribe();
    const req = httpMock.expectOne(`${service['AUTH_URL']}/password/forgot`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'a@b.com' });
    req.flush({});
  });

  it('resets password with token', () => {
    service.resetPassword({ reset_password_token: 'tok', password: 'new' }).subscribe();
    const req = httpMock.expectOne(`${service['AUTH_URL']}/password/reset`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.reset_password_token).toBe('tok');
    req.flush({});
  });
});


