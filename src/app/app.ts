import { Component, computed, inject, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CRUDService } from './Service/CRUD.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CRUD Application');
  itemList = signal<ProductModel[]>([]);
  crudService = inject(CRUDService);
  
  constructor(){
    this.getProducts();
  }

  addProduct(productNoUId: ProductNoUId): void{
    // Logic to add a new item
    this.crudService.addProduct(productNoUId).subscribe();
  }

  addProdcuts(products: ProductNoUId[]): void{
    // Logic to add multiple items
    this.crudService.addProducts(products).subscribe();
  }

  addProductsByQuery(createProductByQueryDTO: CreateProductByQueryDTO): void{
    // Logic to add a new item by query
    this.crudService.addProductsByQuery(createProductByQueryDTO).subscribe();
  }

  getProduct(id: number): void{
    // Logic to get a single item
    this.crudService.getProduct(id).subscribe((data:any)=>{
      this.itemList = data;
    });
  }

  async getProducts(){
    // Logic to get all items
    await this.crudService.getProducts().then((data:any)=>{
      this.itemList.set(data);
    });
  }

  editProduct(prodcut: ProductModel): void{
    // Find the item by id and update its quantity
    this.crudService.editProduct(prodcut).subscribe();
  }

  editProducts(products: ProductModel[]): void{
    // Logic to edit multiple items
    this.crudService.editProducts(products).subscribe();
  }

  editProductByQuery(updateProductByQueryDTO: UpdateProductByQueryDTO): void{
    // Logic to edit an item by query
    this.crudService.editProductByQuery(updateProductByQueryDTO).subscribe();
  }

  deleteItem(id: number) : void{
    // Logic to delete an item
    // this.crudService.removeProduct(id).subscribe(()=>{
    //   this.itemList = this.itemList.filter(i => i.ProductUId !== id);
    // });
  }
}

export type ProductNoUId = {
    ProductCode: string;
    ProductName: string;
    ProductDescription: string;
    ManufactureCode: string; 
    ManufactureName: string;
    ManufactureDescription: string;
    CartonQty: number;
    Available: boolean;
  };

  export type ProductModel = {
    ProductUId:number;
    ProductCode:string;
    ProductName:string;
    ProductDescription:string;
    ManufactureCode:string;
    ManufactureName:string;
    CartonQty:number;
    Available:boolean;
  };

  
export type UpdateProductByQueryDTO = {
    ProductCode: string;
    ProductName: string;
    ProductDescription: string;
    ManufactureCode: string; 
    ManufactureName: string;
    ManufactureDescription: string;
    CartonQty: number;
    Available: boolean;
  };

  export type CreateProductByQueryDTO = {
    ProductUId:number;
    ProductCode:string;
    ProductName:string;
    ProductDescription:string;
    ManufactureCode:string;
    ManufactureName:string;
    CartonQty:number;
    Available:boolean;
  };