import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ListService } from '../list.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent {

  public form!: FormGroup;
  listCont: any;
  listContenido: any = [];
  displayedColumnsI: string[] = ['channelId', 'channelName', 'channelContentType', 'startHoure'];
  columnsToDisplayI: string[] = this.displayedColumnsI.slice();  
  datosI: any[] = [];
  datosemana: boolean = false;
  semanasel:any;
  aniosel:any;
  public datosS: any;

  constructor(
    public dialogRef: MatDialogRef<ContenidoComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: any,
    private listService: ListService,
    private formBuilder: FormBuilder
    ) {
    
       //consultar list contenidos
    this.listService.getContenidos().subscribe(res => {        
      this.listCont = res.result;      
    });

    //consultar registro en el sort
    let nSemana = { };
    this.listService.obtenerParrilla(nSemana).subscribe(res => {
      this.datosI = res.data;
      console.log(res);      
    });

    }

  ngOnInit() {
  }

  initializeForm(){
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

  llamarDatos(){ //consultar registro en el sort
    let nSemana = {
      "weeks": [this.data.sem],
      "year": this.data.yearss
  };
  console.log(this.data);
  
    this.listService.obtenerParrilla(nSemana).subscribe(res => {
      this.datosI = res.data;
      console.log(res);      
    });

  }

  cancelar() {
    this.dialogRef.close(this.data);
  }

  ingresar(event:any){
    this.semanasel = this.data.sem;
    this.aniosel = this.data.yearss;
    this.datosemana = true;
    this.initializeForm();    
    this.llamarDatos();
  }

  guardar(){

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

    this.initializeForm();
    console.log('datos nuevamente');
    
    console.log(this.data);
    
    this.llamarDatos();
  }

}
