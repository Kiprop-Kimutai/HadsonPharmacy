import {Component,OnInit} from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {StockService} from '../stock.service';
import {PurchaseOrder} from '../../models/purchase_order';
import {FormGroup,FormControl,FormBuilder} from '@angular/forms';
import { Product } from '../../models/products';
import {PageEvent,MatTableDataSource} from '@angular/material';
@Component({
    selector:'lpo-detail',
    templateUrl:'./lpo-detail.component.html',
    styleUrls:['./lpo-detail.component.css']
})

export class LpoDetailComponent implements OnInit{
    products:Product[] = [new Product(0,'','','','','',0,0,0,0,0,0,0,0,0,0,0,0,0,new Date(),new Date())];
    //lpoItem:PurchaseOrder = new PurchaseOrder(0,'','','','','',new Date(),'',this.products,'',new Date(),new Date());
    lpoItem:PurchaseOrder;
    lpoDetailFormGroup:FormGroup;
    pageSize:Number;
    pageIndex = 0;
    dataLength:Number;
    columnsToDisplay:string[];
    dataSource:MatTableDataSource<Product>
    constructor(private router:Router,private route:ActivatedRoute,private stockservice:StockService,private fb:FormBuilder){
        //this.lpoItem = this.fetchLPOItem();
    }

    createLPODetailFormGroup(){
        this.lpoDetailFormGroup = new FormGroup({

        })
    }

    fetchLPOItem():any{
        let id = this.route.snapshot.paramMap.get("id");
        console.log("-->LPO id::"+id);
        this.stockservice.fetchPendingLPOById(+id).subscribe(lpoitem =>{
            console.log("----");
            console.log(lpoitem[0]);
            console.log("------");
            this.lpoItem = lpoitem[0];
            console.log(this.lpoItem);
            return lpoitem;
        });
    }

    async logParams(){
        await this.fetchLPOItem();
        this.lpoItem = this.fetchLPOItem();
        console.log(this.lpoItem);
    }

    renderProductsTable(){
        console.log("......>>");
        this.dataSource = new MatTableDataSource(this.products);
        this.dataLength = this.products.length;
        this.pageSize = 10;
        this.columnsToDisplay = ["product_code","product_name","gen_name","units","unit_quantity","original_quantity","unit_price","actual_cost","discount","unit_discount","cost","ordering_price","selling_price","profit","expiry_date"];
    }

    setProductValues(index:number,expiry_date?:Date){
        console.log("Index to work on "+index);
        //unit discount = discount/units
        console.log("Discount::"+this.lpoItem.products[index].discount);
        this.lpoItem.products[index].unit_discount = this.lpoItem.products[index].discount/this.lpoItem.products[index].units;
        console.log("Unit discount:"+this.lpoItem.products[index].unit_discount);
        //cost = actual cost-discount
        this.lpoItem.products[index].cost = this.lpoItem.products[index].actual_cost - this.lpoItem.products[index].discount;
        console.log("Cost:"+this.lpoItem.products[index].cost);
        //set ordering price = cost/original quantity
        this.lpoItem.products[index].ordering_price = Math.round(this.lpoItem.products[index].cost/this.lpoItem.products[index].original_quantity);
        console.log("Ordering price:"+this.lpoItem.products[index].ordering_price);
        //set selling price = percentage of ordering price
        console.log("Selling price:"+this.lpoItem.products[index].selling_price);
        //set profit = selling price-ordering price
        this.lpoItem.products[index].profit = this.lpoItem.products[index].selling_price - this.lpoItem.products[index].ordering_price;
        //set expiry date
        this.lpoItem.products[index].expiry_date = expiry_date;
        console.log("Profit:"+this.lpoItem.products[index].profit);

    }
    addToStock(){
        console.log("About to save product");
        //update lpo item status to received and update
        this.lpoItem.status = 'received';
        for(let product of this.lpoItem.products){
            product.invoice_no = this.lpoItem.invoice_no;
            product.qty_sold = 0;
            product.onhand_qty = product.original_quantity-product.qty_sold;
            product.supplier = this.lpoItem.supplier;
        }
        console.log(this.lpoItem);
        this.stockservice.saveLPO(this.lpoItem).subscribe(res =>console.log(res));
    }
    ngOnInit(){
        this.lpoItem = this.fetchLPOItem();
        console.log(this.lpoItem);
        this.renderProductsTable();
    }
}