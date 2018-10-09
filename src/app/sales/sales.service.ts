import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '../../../node_modules/@angular/core';
import { Sales } from '../models/sales';
import { SalesOrder } from '../models/sales_order';

@Injectable()
export class SalesService {
     API_URL = "http://localhost:2000/api";

    constructor(private http:HttpClient){}
     postSales(sales,salesOrder:SalesOrder[]){
         var header = new HttpHeaders({'Content-Type':'application/json'});
         var requestBody = {sales:sales,salesOrder:salesOrder};
         return this.http.post(`${this.API_URL}/sales/savesales`,{sales,salesOrder},{headers:header});
     }
}