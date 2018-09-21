import {Component,OnInit} from '@angular/core';
import {Product} from '../../models/products';
import {FormBuilder,FormGroup,FormArray,FormControl} from '@angular/forms';
@Component({
    selector:'',
    templateUrl:'./wed.component.html',
    styleUrls:['./lpo.component.css']
})
export class WedComponent implements OnInit{
    orderForm:FormGroup;
    items:FormArray;
    constructor(private fb:FormBuilder){
        this.createForm();
    }
    createForm(){
        this.orderForm = this.fb.group({
            customerName:'',
            email:'',
            items:this.fb.array([this.createItem()])
        })
    }
    createItem():FormGroup{
        return this.fb.group({
            name:new FormControl('Jonah Hexx'),
            description:new FormControl('Lee'),
            price:new FormControl(60000)
        })
    }
    addItem():void{
        this.items = this.orderForm.get('items') as FormArray;
        this.items.push(this.createItem());
    }
    get orderValue(){
        return JSON.stringify(this.orderForm.getRawValue())
    }
    ngOnInit(){

    }
}