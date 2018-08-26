export class ProductModel{
    constructor(
          product_id,
         product_code,
         gen_name,
         product_name,
         invoice_no,
         supplier,
         units,
         unit_quantity,
         unit_price,
         actual_cost,//(unit_price*units)
         discount,
         unit_discount,//(discount/units)
         cost,//(actual_cost-discount)
         ordering_price,//(actual_cost/original_quantity)
         selling_price,//(percentage of selling price)
         profit, //(ordering_price-selling_price)
         original_quantity,
         qty_sold,
         onhand_qty, //(original_quantity-qty_sold)
         expiry_,
         created_at,
         updated_at
    ){}
}

