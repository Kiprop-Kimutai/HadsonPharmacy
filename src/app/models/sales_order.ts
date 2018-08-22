export class SalesOrder{
    constructor(
        public id:Number,
        public invoice:string,
        public product:string,//product id
        public quantity:Number,
        public amount:Number,
        public profit:Number,
        public product_code:string,
        public gen_name:string,
        public name:string,//product name
        public price:Number,
        public discount:Number,
        public created:Date
    ){}
}