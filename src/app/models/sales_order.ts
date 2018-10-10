export class SalesOrder{
    constructor(
        public id:Number,
        public receipt_number:string,
        public invoice_no:string,
        public product:string,//product id
        public quantity:Number,
        public amount:Number,
        public profit:Number,
        public product_code:string,
        public gen_name:string,
        public name:string,//product name
        public price:Number,
        public ordering_price:Number,
        public discount:Number,
        public created:Date
    ){}

    public getId(){
        return this.id;
    }
    public getReceipt_number(){
        return this.receipt_number;
    }
    public getInvoiceNo(){
        return this.invoice_no;
    }
    public getProduct(){
        return this.product;
    }
    public getQuantity(){
        return this.quantity;
    }
    public getAmount(){
        return this.amount;
    }
    public getProfit(){
        return this.profit;
    }
    public getProductCode(){
        return this.product_code;
    }
    public getGenName(){
        return this.gen_name;
    }
    public getName(){
        return this.name;
    }
    public getPrice(){
        return this.price;
    }
    public getDiscount(){
        return this.discount;
    }
    public getCreatedAt(){
        return this.created;
    }
}