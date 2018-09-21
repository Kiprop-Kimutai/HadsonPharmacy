import {Product} from './products';
export class PurchaseOrder{
    constructor(
        public id:number,
        public invoice_no:string,
        public ordered_by:string,
        public description:string,
        public supplier:string,
        public po_number:string,
        public date:Date,
        public raised_by:string,
        public products:Product[],
        public status:string, //any of pending,cancelled,delivered
        public created_at:Date,
        public updated_at:Date
    ){}

}