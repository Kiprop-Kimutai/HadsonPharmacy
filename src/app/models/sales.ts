export class Sales{
    constructor(
        public id:number,
        public receipt_number:string,
        public cashier:string,
        public amount:Number,
        public profit:Number,
        public name:string,
        public balance:Number,
        public created_at:Date,
    ){}
}