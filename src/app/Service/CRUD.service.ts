import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class CRUDService {
    private http = inject(HttpClient);
    apikey = "46F0B613-A331-42CE-B9EF-0096BB1F3547";
    //apiUrl = "https://localhost:7180";
    apiUrl = "http://localhost:5291";

    //Post(add-product)
    addProduct(productNoUId: ProductNoUId) {
        return this.http.post(`${this.apiUrl}/add-product`, productNoUId);
    }

    //Post(add-products)
    addProducts(ListProductNoUId: ProductNoUId[]) {
            return this.http.post(`${this.apiUrl}/add-products`, ListProductNoUId);
        }

    //HttpPost("add-product-by-query")
    addProductsByQuery(product: CreateProductByQueryDTO) {
            return this.http.post(`${this.apiUrl}/add-product-by-query`, product);
        }

    //HttpGet("get-product")
    getProduct(ProductUId: number) {
            return this.http.get(`${this.apiUrl}/get-product?ProductUId=${ProductUId}`);
        }

    //HttpGet("get-products")
    async getProducts(): Promise<ProductModel[]> {
        const data = await firstValueFrom(this.http.get<ProductModel[]>(`${this.apiUrl}/get-products`, {
            headers:
            {
                "api_key": this.apikey
            }
        }));
        return data;
    }

    //HttpPut("edit-product")
    editProduct(Product: ProductModel) {
            return this.http.put(`${this.apiUrl}/edit-product`, Product);
        }

    //HttpPut("edit-products")
    editProducts(Products: ProductModel[]) {
            return this.http.put(`${this.apiUrl}/edit-products`, Products);
        }

    //HttpPut("edit-product-by-query")
    editProductByQuery(updateProductByQueryDTO: UpdateProductByQueryDTO) {
            return this.http.put(`${this.apiUrl}/edit-product-by-query`, updateProductByQueryDTO);
        }

    //HttpDelete("remove-product")
    removeProduct(ProductUId: number) {
            return this.http.delete(`${this.apiUrl}/remove-product?ProductUId=${ProductUId}`);
        }
}

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