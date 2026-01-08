import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable, OnInit } from "@angular/core";
import { firstValueFrom, map, Observable } from "rxjs";
import { ProductModel } from "../Model/Product";
import { UpdateProductByQueryDTO } from "../DTO/UpdateProductByQueryDTO";
import { CreateProductByQueryDTO } from "../DTO/CreateProductByQueryDTO";
import { ProductNoUId } from "../Model/ProductNoUId";


@Injectable({ providedIn: 'root' })
export class CRUDService implements OnInit {
    private http = inject(HttpClient);
    //apiUrl = "https://localhost:7180";
    apiUrl = "http://localhost:5291";

    ngOnInit() {
        this.getProducts();
    }

    //Post(add-product)
    async addProduct(productNoUId: ProductNoUId) {
        return await firstValueFrom(this.http.post(`${this.apiUrl}/add-product`, productNoUId));
    }

    //Post(add-products)
    async addProducts(ListProductNoUId: ProductNoUId[]) {
            return await firstValueFrom(this.http.post(`${this.apiUrl}/add-products`, ListProductNoUId));
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
        return await firstValueFrom(this.http.get<ProductModel[]>(`${this.apiUrl}/get-products`));
    }

    //HttpPut("edit-product")
    async editProduct(Product: ProductModel) {
        return await firstValueFrom(this.http.put(`${this.apiUrl}/edit-product`, Product));
    }

    //HttpPut("edit-products")
    async editProducts(Products: ProductModel[]) {
        return await firstValueFrom(this.http.put(`${this.apiUrl}/edit-products`, Products));
    }

    //HttpPut("edit-product-by-query")
    async editProductByQuery(updateProductByQueryDTO: UpdateProductByQueryDTO) {
        return await firstValueFrom(this.http.put(`${this.apiUrl}/edit-product-by-query?`, updateProductByQueryDTO));
    }

    //HttpDelete("remove-product")
    async removeProduct(ProductUId: number) {
        return await firstValueFrom(this.http.delete(`${this.apiUrl}/remove-product?ProductUId=${ProductUId}`));
    }
}