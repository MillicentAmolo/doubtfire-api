import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/app/api/services/authentication.service';
import { UserService } from 'src/app/api/services/user.service';
import { DoubtfireConstants } from 'src/app/config/constants/doubtfire-constants';
import { EditProfileFormComponent } from './edit-profile-form.component';

describe('EditProfileFormComponent - change password', () => {
  let component: EditProfileFormComponent;
  let fixture: ComponentFixture<EditProfileFormComponent>;

  const authSpy = jasmine.createSpyObj('AuthenticationService', ['changePassword']);
  const userServiceStub = {
    currentUser: { id: 1, firstName: 'A', systemRole: 'Student' },
    isAnonymousUser: () => false,
  } as unknown as UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, MatSnackBarModule],
      declarations: [EditProfileFormComponent],
      providers: [
        DoubtfireConstants,
        { provide: AuthenticationService, useValue: authSpy },
        { provide: UserService, useValue: userServiceStub },
        { provide: MAT_DIALOG_DATA, useValue: { mode: 'edit' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('calls changePassword with current and new passwords', () => {
    authSpy.changePassword.and.returnValue(of({}));
    component.currentPassword = 'old';
    component.newPassword = 'new';
    component.onChangePassword();
    expect(authSpy.changePassword).toHaveBeenCalledWith({ current_password: 'old', new_password: 'new' });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileFormComponent } from './edit-profile-form.component';

describe('EditProfileComponent', () => {
  let component: EditProfileFormComponent;
  let fixture: ComponentFixture<EditProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProfileFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
