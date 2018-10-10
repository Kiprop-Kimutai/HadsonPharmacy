export class Sales{
    constructor(
        public id:number,
        public receipt_number:string,
        public cashier:string,
        public cash:Number,//tendered amount
        public amount:Number,
        public profit:Number,
        public name:string,
        public balance:Number,
        public created_at:Date,
    ){}

    public  setCash(cash:Number){
        this.cash= cash;
    }
    public  getCash():Number{
        return this.cash;
    }
}