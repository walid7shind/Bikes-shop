import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  login = '';
  password = '';
  passwordConfirm = '';

  error = '';
  success = '';

  onSubmit(): void {
    this.error = '';
    this.success = '';

    if (this.password !== this.passwordConfirm) {
      this.error = 'Passwords are not identical.';
      return;
    }

   
    this.success = `Account created for ${this.login}`;
  }
}
