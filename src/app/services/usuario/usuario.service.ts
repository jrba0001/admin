import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import {map} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario:Usuario;
  token:string;
  id:string;


  constructor(
    public http:HttpClient,
    public router:Router,
    public _subirArchivoService:SubirArchivoService
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
       this.id = localStorage.getItem('id')
     }else{
       this.token="";
       this.usuario=null
       this.id=""
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
     this.id =""
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
   actualizarUsuario(usuario:Usuario){
     let url = URL_SERVICIOS + '/usuario/'+this.id;
     url+="?token="+this.token
     return this.http.put(url,usuario)
     .pipe (map((resp:any)=>{
      let usuarioDB:Usuario = resp.usuario;
      this.usuario = usuarioDB;
      //this.token =  this.token; //es el mismo token
      this.id = usuarioDB._id;
      this.guardarStorage(usuarioDB._id, this.token, usuarioDB)
      swal.fire('Usuario actualizado',usuarioDB.email+" "+usuarioDB.nombre,'success')
     }))
     
   }
   cambiarImagen(file:File, id:string){
     this._subirArchivoService.subirArchivo(file,'usuarios',id)
     .then((resp:any)=>{
       console.log((resp));
       this.usuario.img=resp.usuario.img;
       swal.fire('imagen actualizada',this.usuario.nombre,'success');
       this.guardarStorage(id,this.token, this.usuario)
     })
     .catch(resp=>{
       console.log(resp)
     });


       
  }

}

