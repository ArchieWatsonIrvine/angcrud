export class ProductModel{
    ProductUId:number;
    ProductCode:string;
    ProductName:string;
    ProductDescription:string;
    ManufactureCode:string;
    ManufactureName:string;
    CartonQty:number;
    Available:boolean;

    constructor(ProductUId:number,ProductCode:string,ProductName:string,ProductDescription:string,ManufactureCode:string,ManufactureName:string,CartonQty:number,Available:boolean){
        this.ProductUId=ProductUId;
        this.ProductCode=ProductCode;
        this.ProductName=ProductName;
        this.ProductDescription=ProductDescription;
        this.ManufactureCode=ManufactureCode;
        this.ManufactureName=ManufactureName;
        this.CartonQty=CartonQty;
        this.Available=Available;
    }
}