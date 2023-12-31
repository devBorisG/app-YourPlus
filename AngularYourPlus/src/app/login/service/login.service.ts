import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialPersona } from 'src/app/domain/credentialpersona';
import { Persona } from 'src/app/domain/persona';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode} from 'jwt-decode';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'

const autenticateurl = environment.urlautentication;
const urlpersona = environment.urlpersona;
const urlroles = environment.urlrol;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tkn:string;
  private httpHeaders = new  HttpHeaders({'content-Type':'application/json'})
  constructor(public http: HttpClient) {
    this.tkn = 'current_session';
  }
  public getRol(headers: HttpHeaders): Observable<any> {
    const options = {
      headers: headers,
      observe: 'response' as const,
    };
    return this.http.get(`${urlroles}`, options);
  }
  authenticate(persona: CredentialPersona){
    return this.http.post(`${autenticateurl}`, persona);
  }

  public savePersona(persona: Persona, headers: HttpHeaders): Observable<any> {
    const options = {
      headers: headers,
      observe: 'response' as const,
    };
    return this.http.post(`${urlpersona}`, persona, options);
  }

  saveToken(token: string){
    setCookie(this.tkn,token);
  }

  getToken(){
    const token = getCookie(this.tkn);
    if(!token){
      console.error("token not available");
    }
    return getCookie(this.tkn);
  }

  removeToken(){
    removeCookie(this.tkn);
  }

  getDataUser(){
    let token: any = sessionStorage.getItem('currentUser' ) == null ? null : sessionStorage.getItem('currentUser');
    let userData: any = token == null || token.length < 35? null : jwtDecode(token);
    return userData;
  }
}
