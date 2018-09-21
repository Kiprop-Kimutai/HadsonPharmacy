import { Component, OnInit } from '@angular/core';
import {LPOService} from '../lpo/lpo.service';
import {PurchaseOrder} from '../../models/purchase_order';
import {MatTableDataSource,PageEvent} from '@angular/material';
import {paginatorFunction} from '../../common/PaginatorFunction';
import { Product } from '../../models/products';
import { resolve } from 'url';
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
  constructor(private lpoService:LPOService) {
    this.columnsToDisplay = ["po_number","raised_by","supplier","created_at","status"];
    this.dataSource = new MatTableDataSource(this.pendingLPos);
   }

   fetchAllPendingLPOs(){
    new Promise((resolve,reject) =>{
      this.lpoService.fetchAllPendingLPOs().subscribe(responselpos =>{
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
    //  this.lpoService.fetchAllPendingLPOs().subscribe(pendinglpos =>{this.pendingLPos = pendinglpos.response_message;this.pendingLPOsCopy = pendinglpos.response_message;console.log(pendinglpos);console.log("--->"+this.pendingLPos)});
    // //this.dataLength = this.pendingLPos.length;
    // this.dataLength = 10;
    // console.log("----------");
    // console.log(this.pendingLPos);
    // for(let key in this.pendingLPos){
    //   console.log("....");
    //   console.log(this.pendingLPos[key]);
    // }
    // return this.pendingLPos;
  }

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
  ngOnInit() {
    this.fetchAllPendingLPOs();
    // this.columnsToDisplay = ["po_number","raised_by","supplier","created_at","status"];
    // this.dataSource = new MatTableDataSource(this.fetchAllPendingLPOs());
  }

}

var queryString = "";
