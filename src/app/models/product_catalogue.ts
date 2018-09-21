export class ProductCataLogue{
    constructor(public code:string,public name:string,public generic_name:string){
        
    }

    public setCode(code:string){
        this.code = code;
    }
    public getCode():string{
        return this.code;
    }
    
    public setName(name:string){
        this.name = name;
    }
    public getName():string{
        return this.name;
    }
    
    public setGenericName(generic_name:string){
        this.generic_name = generic_name;
    }
    public getGenericName():string{
        return this.generic_name;
    }
}