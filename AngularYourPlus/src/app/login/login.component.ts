import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../cargar-scripts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './service/login.service';
import { Router } from '@angular/router';
import { CredentialPersona } from '../domain/credentialpersona';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  persona: FormGroup = new FormGroup({
    correo: new FormControl('', [
      Validators.pattern(
        '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
      ),
      Validators.required
    ]),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {}

  loading: boolean = false;

  signIn(from: CredentialPersona) {
    this.loading = true; // Habilita el botón
    this.auth.authenticate(from).subscribe(
      (res) => {
        console.log(res['token']);
        this.auth.saveToken(res['token']);
        this.router.navigate(['/producto']); // Redirige a la página después de iniciar sesión
      },
      (error) => {
        alert("Ocurrio un error manejando la sesion actual")
      },
      () => {
        this.loading = false; // Restablece el estado del botón
      }
    );
  }
}
