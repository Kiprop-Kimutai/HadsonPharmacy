import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductCataLogue} from '../models/product_catalogue';
import { Product } from '../models/products';
import {PurchaseOrder} from '../models/purchase_order';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class StockService{
    API_URL = "http://localhost:2000/api";
    constructor(private http:HttpClient){

    }

addProductToCatalogue(product:ProductCataLogue):Observable<any>{
    var headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(`${this.API_URL}/catalogue/post-catalogue`,product,{headers:headers});
}

fetchProductCatalogue():Observable<any>{
    return this.http.get(`${this.API_URL}/catalogue/get-catalogue`);
}

    //get the id of next LPO item
    getLpoID():Observable<any>{
        return this.http.get(`${this.API_URL}/lpo/last_lpo_index`);
    }

    //method to save new LPO item
    saveLPO(lpo:PurchaseOrder):Observable<any>{
        let httpheaders = new HttpHeaders({'Content-Type':'application/json'});
        //return this.http.post('http://localhost:2000/api/lpo/save_lpo',lpo,{headers:httpheaders});
        return this.http.post(`${this.API_URL}/lpo/save_lpo`,lpo,{headers:httpheaders});
    }
    // method fetches all LPOs with status "pending"
    fetchAllPendingLPOs():Observable<any>{
        console.log("watching...");
        console.log(`${this.API_URL}/fetch_pending_lpos`);
        return this.http.get(`${this.API_URL}/lpo/fetch_pending_lpos`);
    }

    //fetch specific LPO by id
    fetchPendingLPOById(id:number):Observable<any>{
        let httpheaders = new HttpHeaders({'Content-Type':'application/json'});
        let body = {Id:id}
        return this.http.post(`${this.API_URL}/lpo/fetch_onepending_lpo`,JSON.stringify(body),{headers:httpheaders});
    }

    fetchAllProducts():any{
        return this.http.get(`${this.API_URL}/products/fetchproducts`);
    }

    addProduct(product:Product){
        let httpHeaders = new HttpHeaders({'Content-Type':'application/json','auth':''});
        return this.http.post('/url',{body:product},{headers:httpHeaders});
    }
}