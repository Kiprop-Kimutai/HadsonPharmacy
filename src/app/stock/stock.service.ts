import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductCataLogue} from '../models/product_catalogue';
import { Product } from '../models/products';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class StockService{
    constructor(private http:HttpClient){

    }

addProductToCatalogue(product:ProductCataLogue):Observable<any>{
    var headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post('http://localhost:2000/api/catalogue/post-catalogue',product,{headers:headers});
}

fetchProductCatalogue():Observable<any>{
    return this.http.get("http://localhost:2000/api/catalogue/get-catalogue");
}
}