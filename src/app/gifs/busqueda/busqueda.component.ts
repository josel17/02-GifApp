import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {
// ! -> Operardor para decirle a TypeScript que es un elemento que no va a ser nulo.
//no null asertion operator -> operador para asegurarse que el elmento no es null
   @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;// propiedad ViewChild para acceder al valor del input el cual se hace por la referencia establecida en el input al oprimir enter.
   
  constructor(private gifsService: GifsService) //Al metodo contructor se le injecta el servicio GifsService para poder utilizarlo 
  {

  }
  buscar()
  {
    
    const valor = this.txtBuscar.nativeElement.value; //obtener el valor del input en la constante valor
    this.txtBuscar.nativeElement.value ="";// limpiar el input txtBuscar
    if(valor.trim().length ===0){return;} //validar si el input esta vacio, si fuera el caso no se inserta en el historial

    this.gifsService.buscarGifs(valor); //enviar el valor al servicio para almacenarlo en el arreglo
    
  }

}
