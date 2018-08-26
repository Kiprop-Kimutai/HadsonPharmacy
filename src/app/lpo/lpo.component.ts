import {Component,OnInit} from '@angular/core';
import {PurchaseOrder} from '../models/purchase_order';
import {Product} from '../models/products';
import {FormControl,Validators,FormGroup} from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
@Component({
    selector:'lpo',
    templateUrl:'./lpo.component.html',
    styleUrls:['./lpo.component.css']
})
export class LpoComponent implements OnInit{
    purchaseOrderFormGroup:FormGroup;
    productFormGroup:FormGroup;
    displayedColumns:string[];
    dataSource:MatTableDataSource<Product>;
    productsToOrder:Product[];
    constructor(){
        
    }
    createForm(){
        this.purchaseOrderFormGroup = new FormGroup({
            id:new FormControl('',Validators.required),
            ordered_by:new FormControl('Hadson Pharamcy',Validators.required),
            description:new FormControl('Purchase Order'),
            supplier:new FormControl('Martin CC'),
            po_number:new FormControl(Validators.required),
            Date:new FormControl(new Date(),Validators.required),
            raised_by:new FormControl('Jonah Hexx',Validators.required),
            //product:Product[],
            product_code:new FormControl('',Validators.required),
            gen_name:new FormControl('',Validators.required),
            product_name:new FormControl('',Validators.required),
            invoice_no:new FormControl('',Validators.required),
            units:new FormControl('',Validators.required),//new field
            unit_quantity:new FormControl('',Validators.required),//new field
            unit_price:new FormControl('',Validators.required),////new field
            actual_cost:new FormControl('',[Validators.required]),//new Field(unit_price*units)
            discount:new FormControl('',[]),//new field
            unit_discount:new FormControl('',[]),//new field(discount/units)
            cost:new FormControl('',[]),//(units*unit price-discount)
            ordering_price:new FormControl('',Validators.required),//((cost+discount)/original_quantity)
            selling_price:new FormControl('',Validators.required),//((configure as percentage of ordering price) = 1.x*selling price)
            profit:new FormControl(8,Validators.required),
            original_quantity:new FormControl('',Validators.required),//(units * unit_quantity)
            qty_sold:new FormControl('',Validators.required),//(quantity sold)
            onhand_qty:new FormControl('',Validators.required),//(quantity remaining)
        })

        this.productFormGroup = new FormGroup({

        })
    }
    ngOnInit(){
        this.dataSource = new MatTableDataSource(this.productsToOrder);
        this.displayedColumns = ['product_id','product_name','gen_name','product_code','supplier','created_at','expiry_date','ordering_price','selling_price','original_quantity','onhand_qty','cost'];
    }
}