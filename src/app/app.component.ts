import { Component } from '@angular/core';
import {NgFor} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService } from './list.service';
import { MatDialog } from '@angular/material/dialog';
import { ContenidoComponent } from './contenido/contenido.component';

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

export interface datosInstancias {
  instanceid: string;
  process: number;
  processname: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  title = 'proyectoProcesos';
  listsem:number[] = [];
  listday:number[] = [];  
  seleccionado:any;
  model:any;
  listaInstanciass: any[]=[];
  displayedColumnsI: string[] = ['process-instance-id', 'process-id', 'container-id', 'process-name'];
  columnsToDisplayI: string[] = this.displayedColumnsI.slice();
  
  datosI: any[] = [];

  constructor( 
    private listService: ListService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
    ){

      
      const listaInstancias: any[]=[];

    //consultar registro en el sort
     let nSemana = {
      "weeks": [42]
  };
  
  this.listService.consultarInstancia().subscribe(res => {
    console.log(res['process-instance']);
    this.datosI = res['process-instance'];
    console.log(this.datosI);    
  });
  console.log(nSemana);
  
     this.listService.obtenerParrilla(nSemana).subscribe(res => {
      console.log(res);      
    });
    
  }

  

  showModal(){
    console.log('ok');
    const dialog1 = this.dialog.open(ContenidoComponent, {
      data: {
        sem:1, yearss:2023
      }
    });
    dialog1.afterClosed().subscribe(x => {
      console.log(x);      
    })
    
  }

  save(){

  }
}
