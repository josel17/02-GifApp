import { HttpClient } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';



//serivicio de tipo injectable
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey: string = "LVRdkesAK6gQBG8uqr7SN7lAHhkFk2W8";
  private _historial:string[] = []; //Declarar variable privada - encapsulacion

  //TODO: cambiar any por su tipo correspondiente 
  public resultados: Gif[] = [];

  get historial() //metodo get para acceder a la propiedad historial de tipo arreglo de strings
  {
    return [...this._historial]; //corchetes para asegurar que se accede al metodo y no se modifica el valor por referencia del la variable
  }

  constructor(private http: HttpClient){// importar HttpClient para hacer peticiones http

    //llamar los datos almacenados en el local storage para mostrarlos en el view
    if(localStorage.getItem('historial'))
    {
      //convertimos el string del local storage en objeto para pasarlo al _historial
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
  }

    

  buscarGifs(query: string = '')
  {

    query = query.trim().toLocaleLowerCase(); //funcion toLocaleLower para pasar todo a miniscula.

    if(!this._historial.includes(query)) //condicion para validar el arreglo contiene el nuevo elemento retorna true or false
    {
      this._historial.unshift(query); //agregar el valor query al arreglo en la primera pocision 
      this._historial = this._historial.splice(0,10); //cortar el  arreglo cuando contenga 10 pocisiones
      localStorage.setItem('historial',JSON.stringify(this._historial)); //almacenando los datos en el local storage (Solo se pueden almacenar strings para se utiliza el stringify para guardar on ubjeto como un string)

    }

    //Mediante peticion Http se obtine los resultados del servicio y se coloca el tipo de datos de acuerdo a la clase interface 
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=LVRdkesAK6gQBG8uqr7SN7lAHhkFk2W8&q=${ query }&limit=10`)
    .subscribe( ( resp ) =>  
      {
        console.log(resp.data);
        this.resultados = resp.data;
      });
    
  }

  
}
