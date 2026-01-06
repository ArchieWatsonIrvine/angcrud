export class ProductNoUId{
    ProductCode:string;
    ProductName:string;
    ProductDescription:string;
    ManufactureCode:string;
    ManufactureName:string;
    ManufactureDescription:string;
    CartonQty:number;
    Available:boolean;

    constructor(ProductCode:string,ProductName:string,ProductDescription:string,ManufactureCode:string,ManufactureName:string,ManufactureDescription:string,CartonQty:number,Available:boolean){
        this.ProductCode=ProductCode;
        this.ProductName=ProductName;
        this.ProductDescription=ProductDescription;
        this.ManufactureCode=ManufactureCode;
        this.ManufactureName=ManufactureName;
        this.ManufactureDescription=ManufactureDescription;
        this.CartonQty=CartonQty;
        this.Available=Available;
    }
}