import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  consultarInstancia(): Observable<any>{
    return this.http.get('kie-server/services/rest/server/containers/ProyectoBPMS_1.0.0-SNAPSHOT/processes/instances?status=1&page=0&pageSize=10&sortOrder=true');    
  }

getContenidos(): Observable<any> {
 
const payload2 = {
  "jsonrpc":"2.0",
  "method":"call",
  "params":
  {
      "service":"object",
      "method":"execute",
      "args":["odoo_canal_capital",2,"admin","product.template","search_read",[],[]]
  }
};

const payload = {
  "jsonrpc": "2.0",
  "method": "call",
  "params": {
      "service": "object",
      "method": "execute",
      "args": [
          "odoo_canal_capital",
          2,
          "admin",
          "product.template",
          "search_read",
          [],["name"]
      ]
  },
  "id": 1
};

return this.http.post('jsonrpc', payload);    
}

getLocal(): Observable<any> {
  const payload = {
    "id": 1,
    "nombre": "mateo",
    "telefono": "12245"
  };

return this.http.post('api', payload);    
}

obtenerParrilla(datos:any): Observable<any> {  
  const payload = {
    "weeks" : [40]
  };
  return this.http.post('rest/tv-channel/programmation/search-programmation-raw-return', datos);  
}

crearParrilla(datos:any): Observable<any> {
  const payload = {
    "channelId": 1,
    "channelName": "concierto",
    "channelContentType": "novela",
    "startHoure": "14:00:00",
    "endHoure": "15:00:00",
    "weeks": [
        17,
        18,
        19,
        20
    ],
    "days": [
        1,
        2,
        3,
        4,
        5
    ],
    "year": 2023
};

return this.http.post('rest/tv-channel/programmation/add-programmation', datos);    
}
  
}
