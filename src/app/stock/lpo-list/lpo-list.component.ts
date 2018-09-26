import { Component, OnInit } from '@angular/core';
import {StockService} from '../stock.service';
import {PurchaseOrder} from '../../models/purchase_order';
import {MatTableDataSource,PageEvent} from '@angular/material';
import {paginatorFunction} from '../../common/PaginatorFunction';
import { Product } from '../../models/products';
import { resolve } from 'url';
import {Router} from  '@angular/router';
import {FormGroup,FormArray,FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-lpo-list',
  templateUrl: './lpo-list.component.html',
  styleUrls: ['./lpo-list.component.css']
})

export class LpoListComponent implements OnInit {
  pendingLPos:PurchaseOrder[];
  pendingLPOsCopy:PurchaseOrder[];
  pageIndex:number;
  pageSize:number = 10;
  dataLength:number;
  columnsToDisplay:string[];
  dataSource:MatTableDataSource<PurchaseOrder>;
  constructor(private stockservice:StockService,private router:Router) {
    this.columnsToDisplay = ["po_number","raised_by","supplier","created_at","status"];
    this.dataSource = new MatTableDataSource(this.pendingLPos);
   }
   //function fetches all LPOs with status "pending"
   fetchAllPendingLPOs(){
    new Promise((resolve,reject) =>{
      this.stockservice.fetchAllPendingLPOs().subscribe(responselpos =>{
        delete responselpos.response_message.__v;
        delete responselpos.response_message._id;
        this.pendingLPos = responselpos.response_message;
        this.pendingLPOsCopy = responselpos.response_message;
        resolve(responselpos.response_message)
      })
    }).then((result) =>{
      console.log(result);
      console.log("------------");
      console.log(this.pendingLPos);
      this.dataSource = new MatTableDataSource(this.pendingLPos);
    })
  }

  //custome filter function for MatTableDataSource
  filterLPOs(text:string){
    queryString = text;
    this.pendingLPos = this.pendingLPOsCopy.filter(this.filterLPO);
  }
  filterLPO(purchase_order:PurchaseOrder){
    var patt = new RegExp(queryString,"i");
    if(patt.test(""+purchase_order.po_number) || patt.test(purchase_order.raised_by) || patt.test(purchase_order.supplier) || patt.test(""+purchase_order.created_at) || patt.test(purchase_order.status)){
      return purchase_order;
    }
  }
  paginateValues(pageSize:number,pageIndex:number){
    this.pendingLPos = <PurchaseOrder[]>paginatorFunction(this.pendingLPOsCopy,pageSize,pageIndex);

  }
  //function navigates to selected LPO item
  navigateToLPOItem(id:number){
    this.router.navigate(['/layout/stock-management/lpolist',id]);
  }
  ngOnInit() {
    this.fetchAllPendingLPOs();
    // this.columnsToDisplay = ["po_number","raised_by","supplier","created_at","status"];
    // this.dataSource = new MatTableDataSource(this.fetchAllPendingLPOs());
  }

}

var queryString = "";
