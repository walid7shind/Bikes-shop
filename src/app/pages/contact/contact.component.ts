import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  form: FormGroup;
  submitted?: { email: string; message: string };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted = {
      email: this.form.value.email,
      message: this.form.value.message,
    };
    console.log('CONTACT_FORM_CAPTURED', this.submitted);
  }

  get emailCtrl() {
    return this.form.get('email');
  }

  get messageCtrl() {
    return this.form.get('message');
  }
}
