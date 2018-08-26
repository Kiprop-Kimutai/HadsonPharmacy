import {Component,Input,OnInit} from '@angular/core';
import {SalesOrder} from '../models/sales_order';
import {FormGroup,FormControl} from '@angular/forms';
import {MatTableDataSource,PageEvent} from '@angular/material';
import {paginatorFunction} from '../common/PaginatorFunction';
@Component({
    selector:'sales-order1',
    templateUrl:'./salesorder.component.html',
    styleUrls:['./salesorder.component.css']
})
export class SalesOrderComponent implements OnInit{
    salesOrder:SalesOrder[] = new Array;
    salesOrderCopy:SalesOrder[] = new Array;
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

    setValues(sales:SalesOrder[]){
       this.salesOrderCopy = new Array;
       this.salesOrderCopy = this.salesOrderCopy.concat(sales);
      this.dataSource = new MatTableDataSource(this.salesOrderCopy);
      this.dataLength = this.salesOrderCopy.length;
    }

    paginateValues(pageSize:number,pageIndex:number){
        this.salesOrder = <SalesOrder[]>paginatorFunction(this.salesOrderCopy,pageSize,pageIndex);
    }


    ngOnInit(){
        console.log("A new entrant");
        console.log(this.salesOrder);
        this.displayedColumns = ["invoice_no","name","gen_name","product_code","price","quantity","amount","profit","Action"];
        this.pageSize = 10;
        this.dataLength = this.salesOrder.length;
        
    }
}
