import {Component,OnInit} from '@angular/core';
import {Sales} from '../models/sales';
import {SalesOrder} from '../models/sales_order';
import {Product} from '../models/products';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import {ProductsService} from '../products/products.service';
import {MatTableDataSource,PageEvent} from '@angular/material';
import {paginatorFunction} from '../common/PaginatorFunction';
@Component({
    selector:'sales-component',
    templateUrl:'./sales.component.html',
    styleUrls:['./sales.component.css'],
    providers:[ProductsService]
})
export class SalesComponent implements OnInit{
    salesFormGroup:FormGroup;
    SalesOrderFormGroup:FormGroup;
    products:Product[];
    productsCopy:Product[];
    paginatedProducts:Product[];
    showproductslist:Boolean = false;
    pageIndex:number = 0;
    pageSize:number;
    dataLength:number;
    dataSource:MatTableDataSource<Product>;
    salesOrderDataSource:MatTableDataSource<SalesOrder>;
    salesorderdataLength:number;
    productspageSize:number;
    salesorderpageSize:number;
    productsdisplayedColumns:string[];
    salesorderdisplayedColumns:string[];
    salesorderpageIndex:number = 0;
    constructor(private productsService:ProductsService){

    }
    createForms(){
        this.salesFormGroup = new FormGroup({
            invoice_number:new FormControl('',Validators.required),
            cashier:new FormControl('Jonah Hexx'),
            amount:new FormControl('',Validators.required),
            profit:new FormControl('',Validators.required),
            name:new FormControl('',Validators.required),
            balance:new FormControl('',Validators.required),
            
        });

        this.SalesOrderFormGroup = new FormGroup({
            invoice:new FormControl('',Validators.required),
            product:new FormControl('',Validators.required),
            quantity:new FormControl('',Validators.required),
            amount:new FormControl('',Validators.required),
            profit:new FormControl('',Validators.required),
            product_code:new FormControl('',Validators.required),
            gen_name:new FormControl('',Validators.required),
            name:new FormControl('',Validators.required),
            price:new FormControl('',Validators.required),
            discount:new FormControl('',Validators.required)

        })
    }

    fetchProducts():Product[]{
       
        this.productsService.fetchAllProducts().subscribe(data =>{this.products = data.response_message;this.productsCopy = data.response_message;console.log(data);this.paginatedProducts = data.response_message;this.dataLength = data.response_message.length;});
        return this.products;
    }
    toggleProductList(){
        this.showproductslist = (this.showproductslist === false ?true:false);
    }
    filterProducts(text:string){
        queryString = text;
        this.products = this.productsCopy.filter(this.filterProduct);
    }
    filterProduct(product:Product){
        var patt = new RegExp(queryString,"i");
        if(patt.test(""+product.cost) || patt.test(""+product.created_at) || patt.test(""+product.expiry_date) ||
            patt.test(product.gen_name) || patt.test(""+product.onhand_qty) || patt.test(""+product.ordering_price)||
            patt.test(""+product.selling_price) || patt.test(product.product_code) || patt.test(""+product.product_id) || 
            patt.test(product.product_name) || patt.test(""+product.profit) || patt.test(""+product.original_quantity)){
                return product;
            }
    }

    paginateValues(pageSize:number,pageIndex:number){
        this.products = <Product[]>paginatorFunction(this.paginatedProducts,pageSize,pageIndex);
    }
    ngOnInit(){
        //this.fetchProducts();
        this.dataSource = new MatTableDataSource(this.fetchProducts());
        this.productsdisplayedColumns = ['product_name','gen_name','product_code','onhand_qty','created_at','selling_price'];
        this.pageSize = 10;
    }
}

var queryString = "";