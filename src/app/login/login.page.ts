import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.formularioLogin = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  ngOnInit() {
  }

  logar(){
    if(this.formularioLogin.value.login != 'admin' || 
      this.formularioLogin.value.login != 'admin'){
      return
    }
    this.router.navigate(['/tabs/tab1'])
  }

}
