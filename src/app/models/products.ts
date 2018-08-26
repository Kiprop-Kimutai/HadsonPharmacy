export class Product {
    constructor(
        public product_id:number,
        public product_code:string,
        public gen_name:string,
        public product_name:string,
        public invoice_no:string,
        public supplier:string,
        public units:string,
        public unit_quantity:string,
        public unit_price:number,
        public actual_cost:number,//(unit_price*units)
        public discount:number,
        public unit_discount:number,//(discount/units)
        public cost:number,//(actual_cost-discount)
        public ordering_price:number,//(actual_cost/original_quantity)
        public selling_price:number,//(percentage of selling price)
        public profit:number, //(ordering_price-selling_price)
        public original_quantity:number,
        public qty_sold:number,
        public onhand_qty:number, //(original_quantity-qty_sold)
        public expiry_date:Date,
        public created_at:Date,
        public updated_at:Date){}
}