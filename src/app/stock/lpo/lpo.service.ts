import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {PurchaseOrder} from '../../models/purchase_order';
@Injectable()
export class LPOService{
     API_URL = "http://localhost:2000/api/lpo";
    constructor(private http:HttpClient){

    }

    getLpoID():Observable<any>{
        return this.http.get(`${this.API_URL}/last_lpo_index`);
    }

    saveLPO(lpo:PurchaseOrder):Observable<any>{
        let httpheaders = new HttpHeaders({'Content-Type':'application/json'});
        //return this.http.post('http://localhost:2000/api/lpo/save_lpo',lpo,{headers:httpheaders});
        return this.http.post(`${this.API_URL}/save_lpo`,lpo,{headers:httpheaders});
    }

    fetchAllPendingLPOs():Observable<any>{
        console.log("watching...");
        console.log(`${this.API_URL}/fetch_pending_lpos`);
        return this.http.get(`${this.API_URL}/fetch_pending_lpos`);
    }



}

var retrievedPurchaseOrders:PurchaseOrder[] = [];