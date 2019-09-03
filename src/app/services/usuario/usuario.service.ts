import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import {map} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario:Usuario;
  token:string;


  constructor(
    public http:HttpClient,
    public router:Router
  ) {
   this.cargarStorage();
   }

   estaLogueado(){
   return (this.token.length >5 )?true:false;
   }

   cargarStorage(){
     if (localStorage.getItem('token')){
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse(localStorage.getItem('usuario'));
     }else{
       this.token="";
       this.usuario=null
     }

   }

   guardarStorage(id:string, token:string, usuario:Usuario){
    localStorage.setItem('id',id);
    localStorage.setItem('token',token);
    localStorage.setItem('usuario',JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;

   }

   logout(){
     this.usuario = null;
     this.token="";
     localStorage.clear();
    //  localStorage.removeItem('token');
    //  localStorage.remoteItem('usuario');
     this.router.navigate(['/login'])


   }


   login(usuario:Usuario,recordar:boolean=false){
     if (recordar){
       localStorage.setItem('email',usuario.email)
     }else{
       localStorage.removeItem('email');
     }
     let url = URL_SERVICIOS + '/login';
     return this.http.post(url,usuario)
     .pipe(map((resp:any)=>{
       this.guardarStorage(resp.id, resp.token, resp.usuario)
      //  localStorage.setItem('id',resp.id);
      //  localStorage.setItem('token',resp.token);
      //  localStorage.setItem('usuario',JSON.stringify(resp.usuario));
       return true;
      }))


   }


   crearUsuario(usuario:Usuario){
     let url = URL_SERVICIOS + '/usuario'
     
     return this.http.post(url,usuario)
     .pipe(map((resp:any)=>{
       swal.fire('Usuario Creado',usuario.email,'info')
       return resp.usuario

     }));

   }
}
