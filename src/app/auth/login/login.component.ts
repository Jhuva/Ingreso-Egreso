import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router){ }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  login() {
    if(this.loginForm.invalid){ return; }
    Swal.fire({
      title: 'Espere por favor',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    const { correo, password } = this.loginForm.value;
    this.authService.login(correo, password)
      .then(res => {
        this.router.navigate(['/']);
        Swal.close();
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Credenciales incorrectas!',
        })
      })


  }

}
