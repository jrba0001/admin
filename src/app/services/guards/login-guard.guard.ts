import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()

export class LoginGuardGuard implements CanActivate {
  
  constructor (public _usuario_service:UsuarioService,
               public router:Router){}
  
  canActivate(){
    if (this._usuario_service.estaLogueado()){
      console.log("paso el guard")
      return true;
    }else{
      console.log("bloqueado por guard")
      this.router.navigate(['/login'])
      return false
    }
  }
  
}
