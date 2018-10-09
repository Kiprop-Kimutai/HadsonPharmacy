import {Component,OnInit,Inject} from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef,MatDialogContent} from '@angular/material';
import { Sales } from '../models/sales';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { SalesService } from './sales.service';
import {Router} from '@angular/router';

@Component({
    selector:'sales-dialog',
    templateUrl:'./receipt-dialog.html',
    styleUrls:['./receipt-dialog.css'],
    providers:[SalesService]
})
export class ReceiptDialog implements OnInit{
    title = "Hadson Pharmacy Limited";
    description = "Cash sale";
    sales:Sales = new Sales(0,"","",0,0,0,"",0,new Date());
    hidePrintButton:boolean = false;
    hideReceiptPreview = true;
    cashierFormGroup:FormGroup;
    constructor(public dialogRef:MatDialogRef<ReceiptDialog>,@Inject(MAT_DIALOG_DATA) public data:any,private salesService:SalesService,private router:Router){
        this.createCashierFormGroup();
    }

    createCashierFormGroup(){
        this.cashierFormGroup = new FormGroup({
            amount:new FormControl('',[Validators.required,Validators.min(Number(this.sales.amount))])
        })
    }
    prepareSalesAndSalesOrder(){
        let receiptnum = generateReceiptNumber();
        new Promise((resolve,reject) =>{
            for(let salesorder of this.data.sales){
                salesorder.receipt_number = receiptnum;
                this.sales.amount = Number(this.sales.amount) + Number(salesorder.amount);
                //this.sales.amount =  Number(salesorder.amount);
                this.sales.profit = Number(this.sales.profit) + Number(salesorder.profit);
                this.sales.setCash(this.cashierFormGroup.get('amount').value);
                this.sales.balance = Number(this.cashierFormGroup.get('amount').value)-Number(this.sales.amount)
            }
            this.sales.cashier = "Jonah Hexx";
            this.sales.name = "";
            this.sales.receipt_number = receiptnum;
            resolve(this.data.sales);
        }).then((processedsalesorder)=>{
            console.log("<----->");
            console.log(this.data.sales);
            console.log(this.sales);
        })
        console.log(this.data.sales);

    }

    toggleCashDrawer(){
        this.hideReceiptPreview = this.hideReceiptPreview === true ? false:true;
        this.prepareSalesAndSalesOrder();
        console.log(this.cashierFormGroup.get('amount').value);

    }
    printReceipt(){
        this.hidePrintButton = true;
        setTimeout(()=>window.print(),100);
        setTimeout(() =>this.salesService.postSales(this.sales,this.data.sales).subscribe(res =>{
            console.log(res);
            this.dialogRef.close();
            //this.router.navigate(['/layout/dashboard']);
            this.router.navigate(['sales']);

        }),110);
        //setTimeout(()=>window.print(),100);
    }

    get currentTime(){
        return new Date().toLocaleString();
    }
    ngOnInit(){
        console.log("-----watch for data----");
        console.log(this.data.sales);
        //console.log(generateReceiptNumber());
        //this.prepareSalesAndSalesOrder();
        //window.print();
    }
}

function generateReceiptNumber(){
    let date:string = new Date().getDate().toString().length<2 ? "0".concat(new Date().getDate().toString()) : new Date().getDate().toString();
    let month:string = new Date().getMonth().toString().length<2 ? "0".concat(new Date().getMonth().toString()) : new Date().getMonth().toString();
    let hour:string = new Date().getHours().toString().length<2 ? "0".concat(new Date().getHours().toString()) : new Date().getHours().toString();

    return new Date().getUTCFullYear().toString().concat(month).concat(date).concat(hour).concat(new Date().getMinutes().toString()).concat(new Date().getSeconds().toString()).concat(Math.floor(Math.random()*1000+1).toString());

}