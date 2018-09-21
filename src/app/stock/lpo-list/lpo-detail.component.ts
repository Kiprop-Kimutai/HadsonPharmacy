import {Component,OnInit} from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
    selector:'lpo-detail',
    templateUrl:'./lpo-detail.component.html',
    styleUrls:['./lpo-detail.component.css']
})

export class LpoDetailComponent implements OnInit{

    constructor(private router:Router,private route:ActivatedRoute){}

    
    ngOnInit(){

    }
}