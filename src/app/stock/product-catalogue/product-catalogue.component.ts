import { Component, OnInit } from '@angular/core';
import {MatTableDataSource,PageEvent} from '@angular/material';
import {ProductCataLogue} from '../../models/product_catalogue';
import {StockService} from '../stock.service';
import {paginatorFunction} from '../../common/PaginatorFunction';

@Component({
  selector: 'app-product-catalogue',
  templateUrl: './product-catalogue.component.html',
  styleUrls: ['./product-catalogue.component.css']
})
export class ProductCatalogueComponent implements OnInit {
  productCataLogue:ProductCataLogue[];
  productCataLogueCopy:ProductCataLogue[];
  dataLength:number;
  dataSource:MatTableDataSource<ProductCataLogue>;
  pageIndex:number;
  pageSize:number;
  displayedColumns:string[];
  constructor(private stockService:StockService) { }

   fetchCataLogue():ProductCataLogue[]{
     
        this.stockService.fetchProductCatalogue().subscribe(res =>{console.log(res);this.productCataLogue = res.response_message;this.productCataLogueCopy = res.response_message;
    this.dataLength = res.response_message.length})
    return this.productCataLogue
   
    
    // this.stockService.fetchProductCatalogue().subscribe(res =>{console.log(res);this.productCataLogue = res.response_message;this.productCataLogueCopy = res.response_message;});
    // return this.productCataLogue;
  }
  updateCataLogue(productCataLogue:ProductCataLogue){
    this.stockService.addProductToCatalogue(productCataLogue).subscribe(res =>{console.log(res)});
  }

  paginateValues(pageSize:number,pageIndex:number){
    this.productCataLogue = <ProductCataLogue[]>paginatorFunction(this.productCataLogueCopy,pageSize,pageIndex);
}

filterProductCatalogues(text:string){
  queryString = text;
  this.productCataLogue = this.productCataLogueCopy.filter(this.filterProduct);
 
}
filterProduct(productCataLogue:ProductCataLogue){
  var patt = new RegExp(queryString,"i");
  if(patt.test(""+productCataLogue.code) || patt.test(""+productCataLogue.generic_name) || patt.test(""+productCataLogue.name)){
          return productCataLogue;
      }
}

  ngOnInit() {
    //this.fetchCataLogue().then((result) =>{this.productCataLogue = result;this.dataSource = new MatTableDataSource(result)});
    this.dataSource = new MatTableDataSource(this.fetchCataLogue());
    this.displayedColumns = ["code","generic_name","name"];
    this.dataLength = 4;
    this.pageSize =10;
  }

}

var queryString = "";
