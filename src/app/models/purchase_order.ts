import {Product} from './products';
export class PurchaseOrder{
    constructor(
        public id:number,
        public ordered_by:string,
        public description:string,
        public supplier:string,
        public po_number:string,
        public Date:Date,
        public raised_by:string,
        public product:Product[],
        public created_at:Date,
        public updated_at:Date
    ){}

}