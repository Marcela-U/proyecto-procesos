import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService } from './list.service';

interface contenido {
  channelId: number,
  channelName: string,
  channelContentType: string,
  year: number,
  weeks: number[],
  days: number[],
  startHoure: string,
  endHoure: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public form!: FormGroup;
  title = 'proyectoProcesos';
  listsem:number[] = [];
  listday:number[] = [];
  listCont: any;
  seleccionado:any;
  model:any;

  listContenido: any = [];

  constructor( 
    private listService: ListService,
    private formBuilder: FormBuilder
    ){

      this.initializeForm();

    //consultar registro en el sort
     let nSemana = {
      "weeks": [42]
  };
  
  console.log(nSemana);
  
     this.listService.obtenerParrilla(nSemana).subscribe(res => {
      console.log(res);      
    });

      //consultar list contenidos
    this.listService.getContenidos().subscribe(res => {        
      this.listCont = res.result;      
    });
    
  }

  initializeForm():void{
    this.form = this.formBuilder.group({
      opcionContenido: [null, Validators.required],
      tipoc: [null, Validators.required],
      anio: [null, Validators.required],
      semana: [null, Validators.required],
      segmento: [null, Validators.required],
      inicio: [null, Validators.required],
      fin: [null, Validators.required]
    });
  }

  save(){
    var str = this.form?.get('semana')?.value;
    var listS = str.split(",");
    
    var str2 = this.form?.get('segmento')?.value;
    var listS2 = str2.split(",");
   

    let semanas = listS.map((numero:any) => Number(numero));
    let segmento = listS2.map((x:any) => Number(x));

    var codigo = this.form?.get('opcionContenido')?.value;
    var nombre = "";
    this.listCont.forEach((element:any) => {
      if(element.id == codigo){
        nombre = element.name
      };  
    });

    var inicioh = this.form?.get('inicio')?.value;
    var finh = this.form?.get('fin')?.value

 
    this.listContenido = 
      {
        channelId: +codigo,
        channelName: nombre,
        channelContentType: this.form?.get('tipoc')?.value,
        year: +(this.form?.get('anio')?.value),
        weeks: semanas,
        days: segmento,
        startHoure: inicioh + ":00",
        endHoure: finh + ":00"
      };

     //consultar registro en el sort
     let nSemana = {
      "weeks": [42]
  };

  console.log(nSemana);
  
     this.listService.obtenerParrilla(nSemana).subscribe(res => {
      console.log(res);      
    });

    // //crear registro en el sort
    this.listService.crearParrilla(this.listContenido).subscribe(res => {
      console.log(res);      
    });

    //consultar nuevamente
    this.listService.obtenerParrilla(this.listContenido).subscribe(res => {
      console.log(res);      
    });

    console.log(this.listContenido);

  }
}
