import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { rendererTypeName } from '@angular/compiler';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit,OnDestroy {

  subscription: Subscription;

  constructor() { 
    
  
    this.subscription = this.regresaObservable().subscribe (
    numero =>console.log(numero),
    error => {
      console.log(error)},
    () => console.log('terminado'))

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();

    
  }
  regresaObservable(){
    return  new Observable( observer =>{

      let contador = 0;
     


      let intervalo =setInterval(()=>{
        contador += 1;
        let salida ={
          valor:contador
        }
        observer.next(salida);

        
       
      },500)
    }).pipe(map((resp:any) =>{
      return resp.valor

    }));
    
  }

}
