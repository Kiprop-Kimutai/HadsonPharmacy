import {Component,OnInit,Input} from '@angular/core';
import {Product} from '../../models/products';
import { MatTableDataSource } from '@angular/material';
import { resolve } from 'url';
@Component({
    selector:'testing',
    templateUrl:'./test.component.html',
    styleUrls:['./lpo.component.css']
})
export class TestComponent implements OnInit{
    @Input('product') product:Product;
    products:Product[] = new Array;
    dataSource:MatTableDataSource<Product>;
    displayedColumns:string[];
    constructor(){
        console.log(this.product);
    }
    pushProductToArray():Product[]{
    
    let newArray:Product[] = [];
    newArray.push(this.product);
    this.products = this.products.concat(newArray);
    console.log("Final arrray::"+this.products); 
    return this.products;
    }
    ngOnInit(){
        this.dataSource = new MatTableDataSource(this.pushProductToArray());
        this.displayedColumns = ['product_code','product_name','gen_name','units','unit_quantity','original_quantity','unit_price','actual_cost',
        'discount','unit_discount','cost','expiry_date','ordering_price','selling_price','profit'];
    }
}