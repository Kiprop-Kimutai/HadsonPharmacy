import {Component,OnInit,Input,ViewChild} from '@angular/core';
import {Sales} from '../models/sales';
import {SalesOrder} from '../models/sales_order';
import {Product} from '../models/products';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import {ProductsService} from '../stock/products/products.service';
import {MatTableDataSource,PageEvent} from '@angular/material';
import {paginatorFunction} from '../common/PaginatorFunction';
import {SalesOrderComponent} from './salesorder.component';
@Component({
    selector:'sales-component',
    templateUrl:'./sales.component.html',
    styleUrls:['./sales.component.css'],
    providers:[ProductsService]
})
export class SalesComponent implements OnInit{
    @ViewChild(SalesOrderComponent) private salesOrderComponent:SalesOrderComponent
    salesFormGroup:FormGroup;
    SalesOrderFormGroup:FormGroup;
    products:Product[];
    salesOrder:SalesOrder[] = new Array;
    salesOrderCart:SalesOrder[] = new Array;
    productsCopy:Product[];
    selectedProducts:Product[];
    paginatedProducts:Product[];
    showproductslist:Boolean = false;
    showsalesTable:Boolean = false;
    pageIndex:number = 0;
    pageSize:number;
    dataLength:number;
    dataSource:MatTableDataSource<Product>;
    productsdisplayedColumns:string[];
    name:String = "Jonah Hexx";
    constructor(private productsService:ProductsService){
        this.createForms();
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
            quantity:new FormControl(Validators.required),
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
        return this.productsCopy;
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

    loadSelectedItem(id:number){
        console.log("Trying.....");
        console.log(id);
        selectedProductId = id;
        this.showproductslist = false;
        this.showsalesTable = true;
        this.selectedProducts = this.products.filter(this.findProductById);
        //this.showsalesTable = false;
        this.salesOrderCart = this.castSelectedProductToSalesOrder(this.selectedProducts);
        this.salesOrderComponent.setValues(this.salesOrderCart);
    }

    castSelectedProductToSalesOrder(products:Product[]):SalesOrder[]{
        for(var i =0;i<products.length;i++){
        
            this.salesOrder.push(new SalesOrder(0,"",products[i].invoice_no,""+products[i].product_id,4,((products[i].selling_price)*4),
                        (4*products[i].profit),products[i].product_code,products[i].gen_name,products[i].gen_name,products[i].selling_price,products[i].discount,new Date()));
        }
        console.log("*****************************>>");
        console.log(this.salesOrder);
        return this.salesOrder;
        
    }

    findProductById(product){
        return product.id == selectedProductId;
    }

    ngOnInit(){
        //this.fetchProducts();
        this.dataSource = new MatTableDataSource(this.fetchProducts());
        this.productsdisplayedColumns = ['product_name','gen_name','product_code','onhand_qty','created_at','selling_price'];
        this.pageSize = 10;
    }
}

@Component({
    selector:'sales-order',
    templateUrl:'./salesorder.component.html',
    styleUrls:['./salesorder.component.css']
})
export class SalesOrderComponent1 implements OnInit{
    salesOrder:SalesOrder[];
    @Input() set current_sale_order(current_sale_order:SalesOrder[]){
            this.salesOrder = current_sale_order;
            console.log("****************");
            console.log(this.salesOrder)
    }
    get current_sale_order(){
        return this.salesOrder;
    }
    @Input()title:String;
    salesOrderCopy:SalesOrder[];
    salesOrderProper:SalesOrder[] = new Array;
    salesOrderFormGroup:FormGroup;
    pageIndex:number = 0;
    pageSize:number;
    dataLength:number;
    dataSource:MatTableDataSource<SalesOrder>;
    displayedColumns:string[];
    showTable:Boolean = false;

    constructor(){
        this.createFormGroup();
    }
    createFormGroup(){
        this.salesOrderFormGroup = new FormGroup({
        })
    }

    paginateValues(pageSize:number,pageIndex:number){
        this.salesOrder = <SalesOrder[]>paginatorFunction(this.salesOrderCopy,pageSize,pageIndex);
    }

    getSalesOrderItems():SalesOrder[]{
        for(let i =0;i<this.current_sale_order.length;i++){
            let order:SalesOrder = this.current_sale_order[i];            
            this.salesOrderProper.push(order);
        }
        console.log(this.salesOrderProper);
        return this.salesOrderProper;
    }
    ngOnInit(){
        console.log("A new entrant");
        console.log(this.salesOrder);
        console.log(this.salesOrder[0].getAmount());
        this.displayedColumns = ["invoice_no","name","gen_name","product_code","price","quantity","amount","profit","Action"];
        this.pageSize = 10;
        this.dataLength = this.salesOrder.length;
        this.dataSource = new MatTableDataSource(this.getSalesOrderItems());
        //this.salesOrderCopy = this.salesOrder;
        this.getSalesOrderItems();
    }
}

var queryString = "";
var selectedProductId:number;