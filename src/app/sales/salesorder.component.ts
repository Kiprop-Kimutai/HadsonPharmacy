import {Component,Input,OnInit,Output,EventEmitter} from '@angular/core';
import {SalesOrder} from '../models/sales_order';
import {FormGroup,FormControl} from '@angular/forms';
import {MatTableDataSource,PageEvent,MatDialog} from '@angular/material';
import {paginatorFunction} from '../common/PaginatorFunction';
import {ReceiptDialog} from './receipt.dialog';

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

    @Output() deleted = new EventEmitter<SalesOrder[]>();
    @Output() updated = new EventEmitter<SalesOrder[]>();

    constructor(private dialog:MatDialog){
        this.createFormGroup();
        this.dataSource = new MatTableDataSource(this.salesOrderCopy);

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

    delete(index:number){
        console.log(index);
        console.log("Trying to delete item...");
        this.salesOrderCopy.splice(index,1);
        console.log(this.salesOrderCopy);
        //this.dataSource = new MatTableDataSource(this.salesOrderCopy);
        this.deleted.emit(this.salesOrderCopy);
    }

    setSalesDetails(index:number){
        console.log("setting profit....");
        console.log(index);
        let quantity:number = Number(this.salesOrderCopy[index].quantity);
        console.log("quanity::"+quantity);
        //let profit:number = Number(this.salesOrderCopy[index].profit) *quantity;
        this.salesOrderCopy[index].profit = (Number(this.salesOrderCopy[index].price) - Number(this.salesOrderCopy[index].ordering_price)) * quantity;
        this.salesOrderCopy[index].amount = Number(this.salesOrderCopy[index].price)*Number(this.salesOrderCopy[index].quantity);
        console.log(this.salesOrderCopy);

    }

    saveSales(){
        this.dialog.open(ReceiptDialog,{
            height:'auto',
            width:'auto',
            data:{
                sales:this.salesOrderCopy
            }
        })
    }
    ngOnInit(){
        //reset salesorder values on page load/page refresh
        this.salesOrderCopy = [];
        console.log("A new entrant");
        console.log(this.salesOrder);
        this.displayedColumns = ["invoice_no","name","gen_name","product_code","price","quantity","amount","profit","Action"];
        this.pageSize = 10;
        this.dataLength = this.salesOrder.length;
        
        
    }
}
