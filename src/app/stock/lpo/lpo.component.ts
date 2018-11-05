import {Component,OnInit} from '@angular/core';
import {PurchaseOrder} from '../../models/purchase_order';
import {Product} from '../../models/products';
import {FormControl,Validators,FormGroup,FormArray,FormBuilder} from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import {StockService} from "../stock.service";
import {ProductCataLogue} from '../../models/product_catalogue';
import {ActivatedRoute,Router} from '@angular/router';
@Component({
    selector:'lpo',
    templateUrl:'./lpo.component.html',
    styleUrls:['./lpo.component.css'],
    providers:[StockService]
})
export class LpoComponent implements OnInit{
    productCataLogue:ProductCataLogue[];
    purchaseOrderFormGroup:FormGroup;
    //productFormArray:FormArray;
    products:FormArray;
    productPlaceHolderFormGroup:FormGroup;
    displayedColumns:string[];
    productsToOrder:Product[] =[];
    dataSource:MatTableDataSource<Product>;
    suppliers:string[] = ["Cosmos","Kemsa","Europa"];
    constructor(private fb:FormBuilder,private stockService:StockService,private route:ActivatedRoute,private router:Router){
        this.createForm();
        this.createProductPlaceHolders();
        
    }

    fetchProductCatalogue():ProductCataLogue[]{
        this.stockService.fetchProductCatalogue().subscribe(res =>{console.log(res);this.productCataLogue = res.response_message})
        return this.productCataLogue;
    }

    setProductDetails(index:number,catalogueIndex:number){
        console.log("Init...");
        console.log(index + "...."+catalogueIndex);
        console.log(this.productCataLogue[catalogueIndex].code);
        console.log(this.productCataLogue[catalogueIndex].name);
        console.log(this.productCataLogue[catalogueIndex].generic_name);
        this.products = this.purchaseOrderFormGroup.get('products') as FormArray;
        this.products.controls[index].get('product_code').setValue(this.productCataLogue[catalogueIndex].code);
        this.products.controls[index].get('product_name').setValue(this.productCataLogue[catalogueIndex].name);
        this.products.controls[index].get('gen_name').setValue(this.productCataLogue[catalogueIndex].generic_name);
    }
    createForm(){
        this.purchaseOrderFormGroup = new FormGroup({
            id:new FormControl(''),
            ordered_by:new FormControl({value:'Hadson Dispensing Chemist Ltd',disabled:true},Validators.required),
            description:new FormControl({value:'Purchase Order',disabled:true},Validators.required),
            supplier:new FormControl('Martin CC',[]),
            po_number:new FormControl({value:0,disabled:true},Validators.required),
            invoice_no:new FormControl({value:'',disabled:true},[]),
            status:new FormControl({value:'pending',disabled:true},[]),
            date:new FormControl({value:new Date(),disabled:true},Validators.required),
            raised_by:new FormControl({value:'Jonah Hexx',disabled:true},Validators.required),
            products:this.fb.array([this.createProduct()])
            //product:Product[],           
        })

    }

    createProduct():FormGroup{
        return this.fb.group({
            product_code:new FormControl('',Validators.required),
            product_name:new FormControl('',Validators.required),
            gen_name:new FormControl('',Validators.required),
            units:new FormControl('0',Validators.required),//new field
            unit_quantity:new FormControl('0',Validators.required),//new field
            original_quantity:new FormControl({value:'0',disabled:false},Validators.required),//(units * unit_quantity)
            unit_price:new FormControl(0,Validators.required),////new field
            actual_cost:new FormControl({value:'0',disabled:true},[Validators.required]),//new Field(unit_price*units)
            discount:new FormControl('0',[Validators.required]),//new field
            unit_discount:new FormControl({value:'0',disabled:true},[]),//new field(discount/units)
            cost:new FormControl({value:'0',disabled:true},[Validators.required]),//(units*unit price-discount)
            ordering_price:new FormControl({value:'0',disabled:true},Validators.required),//((cost+discount)/original_quantity)
            selling_price:new FormControl([Validators.required]),//((configure as percentage of ordering price) = 1.x*selling price)
            profit:new FormControl({disabled:true},Validators.required),//selling price-ordering price
            onhand_qty:new FormControl(0,Validators.required),//(quantity remaining)
        })
    }
    addProduct(){
        this.products = this.purchaseOrderFormGroup.get('products') as FormArray;
        this.products.push(this.createProduct());
        console.log(this.router.url);
    }

    createProductPlaceHolders(){
        this.productPlaceHolderFormGroup = new FormGroup({
            product_code:new FormControl({value:'product code',disabled:true},Validators.required),
            product_name:new FormControl({value:'name',disabled:true},[Validators.required]),
            gen_name:new FormControl({value:'generic name',disabled:true},Validators.required),
            units:new FormControl({value:'units',disabled:true},Validators.required),//new field
            unit_quantity:new FormControl({value:'unit qty',disabled:true},Validators.required),//new field
            original_quantity:new FormControl({value:'original qty',disabled:true},Validators.required),//(units * unit_quantity)
            unit_price:new FormControl({value:'unit price',disabled:true},Validators.required),////new field
            actual_cost:new FormControl({value:'actual cost',disabled:true},[Validators.required]),//new Field(unit_price*units)
            discount:new FormControl({value:'discount',disabled:true},[Validators.required]),//new field
            unit_discount:new FormControl({value:'unit discount',disabled:true},[]),//new field(discount/units)
            cost:new FormControl({value:'cost',disabled:true},[Validators.required]),//(units*unit price-discount)
            ordering_price:new FormControl({value:'ordering price',disabled:true},Validators.required),//((cost+discount)/original_quantity)
            selling_price:new FormControl({value:'selling price',disabled:true},[Validators.required]),//((configure as percentage of ordering price) = 1.x*selling price)
            profit:new FormControl({value:'profit',disabled:true},Validators.required),//selling price-ordering price
            onhand_qty:new FormControl({value:'onhand qty',disabled:true},Validators.required),//(quantity remaining)
        })
    }

    setProductValues(index:number){
        console.log(index+"...");
        console.log(typeof this.purchaseOrderFormGroup);
        this.products = this.purchaseOrderFormGroup.get('products') as FormArray;
        console.log(this.products);
        console.log(this.products.controls[index].get('original_quantity').value);
        //this.productFormArray.controls[index].get('original_quantity').setValue(10);
        console.log(this.products.controls[index].get('units').value);
        console.log(this.products.controls[index].get('unit_quantity').value);
        console.log(""+(this.products.controls[index].get('units').value)*(+this.products.controls[index].get('unit_quantity').value));
        console.log(".."+(+this.products.controls[index].get('discount').value/(+this.products.controls[index].get('units').value)));

        this.products.controls[index].get('original_quantity').setValue(+(+this.products.controls[index].get('units').value)*(+this.products.controls[index].get('unit_quantity').value));
        this.products.controls[index].get('actual_cost').setValue(+(this.products.controls[index].get('unit_price').value)*+(this.products.controls[index].get('units').value));
        this.products.controls[index].get('unit_discount').setValue(+this.products.controls[index].get('discount').value/(+this.products.controls[index].get('units').value));
        this.products.controls[index].get('cost').setValue((+this.products.controls[index].get('units').value*+this.products.controls[index].get('unit_price').value-(+this.products.controls[index].get('discount').value)));
        this.products.controls[index].get('ordering_price').setValue(((+this.products.controls[index].get('cost').value*+this.products.controls[index].get('discount').value)/(+this.products.controls[index].get('original_quantity').value)));
        this.products.controls[index].get('profit').setValue((+this.products.controls[index].get('selling_price').value -(+this.products.controls[index].get('discount').value)));

    }

    deleteProduct(index:number){
        console.log("deleting from cart....");
        console.log(index);
        //let products:FormArray = <FormArray>this.purchaseOrderFormGroup.controls.productFormArray;
        console.log("-----");
        let products = (this.purchaseOrderFormGroup.get('products') as FormArray).removeAt(index);
        console.log("--- _ _ _ ---");
    }

    submitLPO(){
        console.log("will attempt to save LPO");
        console.log(this.purchaseOrderFormGroup.getRawValue());
        //this.stockService.saveLPO(this.purchaseOrderFormGroup.getRawValue()).subscribe(res =>{console.log(res)});
        this.stockService.print(`http://localhost/4200`+this.router.url).subscribe(data =>{console.log(data)});
    }
    getPurchaseId(){
        this.stockService.getLpoID().subscribe(data =>{console.log(data);this.purchaseOrderFormGroup.get('po_number').setValue(data.response_message)});
    }
    
    private  setSupplier(supplier):void{
        this.purchaseOrderFormGroup.get('supplier').setValue(supplier);
    }

    testFormValue(){
        console.log("random...");
        console.log(this.purchaseOrderFormGroup.status);
        console.log(this.purchaseOrderFormGroup.getRawValue());
        ///console.log(this.purchaseOrderFormGroup.get('supplier').value);
    }


    ngOnInit(){
        this.dataSource = new MatTableDataSource(this.productsToOrder);
        let displayedColumns1 = ['product_code','product_name','gen_name','units','unit_quantity','original_quantity','unit_price','actual_cost',
        'discount','unit_discount','cost','expiry_date','ordering_price','selling_price','profit'];
        this.displayedColumns = ['product_code','product_name','gen_name'];
        this.getPurchaseId();
        this.fetchProductCatalogue();
      
    }
}
var productsToOrder2:Product[] = [];