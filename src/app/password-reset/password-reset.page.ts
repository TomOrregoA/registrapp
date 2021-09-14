import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  formularioRestaurar: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.formularioRestaurar = this.fb.group({
      nombre: new FormControl('',Validators.required),
    });
  }

  ngOnInit() {
  }

}
