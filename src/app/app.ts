import { Component, computed, inject, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CRUDService } from './Service/CRUD.service';
import { ProductModel } from './Model/Product';
import { UpdateProductByQueryDTO } from './DTO/UpdateProductByQueryDTO';
import { CreateProductByQueryDTO } from './DTO/CreateProductByQueryDTO';
import { ProductNoUId } from './Model/ProductNoUId';

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
  selectedIds = signal(new Set<number>());
  newItemsList = signal<any[]>([]);

  constructor(){
    this.getProducts();
  }

  async addProduct(
    ProductCode:string,
    ProductName:string,
    ProductDescription:string,
    ManufactureCode:string,
    ManufactureName:string,
    ManufactureDescription:string,
    CartonQty:string,
    Available:string){
    // Logic to add a new item
    if(isNaN(Number(CartonQty)) || Number(CartonQty) < 0) return;
    
    const productNoUId: ProductNoUId = {
      Available: Available === 'true',
      CartonQty: parseInt(CartonQty),
      ManufactureCode: ManufactureCode,
      ManufactureDescription: ManufactureDescription,
      ManufactureName: ManufactureName,
      ProductCode: ProductCode,
      ProductDescription: ProductDescription,
      ProductName: ProductName
    }
    await this.crudService.addProduct(productNoUId).then();
  }

  openBulkAddModal(dialog: HTMLDialogElement) {
    this.newItemsList.set([this.newEmptyRow()]); 
    dialog.showModal();
  }

  newEmptyRow() {
    return {
      ProductName: '',
      ProductCode: '',
      CartonQty: 0,
      Available: true
    };
  }

  addLineToPopup() {
    this.newItemsList.update(list => [...list, this.newEmptyRow()]);
  }

  removeLineFromPopup(index: number) {
    this.newItemsList.update(list => list.filter((_, i) => i !== index));
  }

  updatePopupField(index: number, field: string, value: any) {
    this.newItemsList.update(list => {
      const updated: ProductNoUId[] = [...list];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  async addProducts(dialog: HTMLDialogElement){
    // Logic to add multiple items

    const itemsToSave = this.newItemsList();

    console.log(itemsToSave);
    // Basic Validation
    if (itemsToSave.some(x => !x.ProductName)) {
      alert('All items must have a Name.');
      return;
    }

    try {
      this.crudService.addProducts(itemsToSave).then()

      this.getProducts(); // Refresh main table
      dialog.close();
      this.newItemsList.set([]); // Clear memory
      
    } catch (err) {
      console.error(err);
      alert('Failed to save items.');
    }
  }

  addProductsByQuery(createProductByQueryDTO: CreateProductByQueryDTO){
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

  async editProduct(product: ProductModel, newQuantity: string){
    // Find the item by id and update its quantity
    product.cartonQty = parseInt(newQuantity);
    await this.crudService.editProduct(product).then();
  }

  async editProducts(valueStr: string, dialog: HTMLDialogElement){
    // Logic to edit multiple items
    const filteredItems = this.itemList().filter(item => this.selectedIds().has(item.productUId))
    const isAvailable = valueStr === 'true';
    if(filteredItems.length === 0)return;

    const payload = filteredItems.map(item => ({
      productUId: item.productUId,
      cartonQty: item.cartonQty,
      manufactureDescription: item.manufactureDescription,
      manufactureName: item.manufactureName,
      productCode: item.productCode,
      productDescription: item.productDescription,
      productName: item.productName,
      manufactureCode: item.manufactureCode,
      available: isAvailable
    }));

    try{
      await this.crudService.editProducts(payload).then();
    } catch(err){
      console.error(err)
    }
  }

  async editProductByQuery(updateProductByQueryDTO: UpdateProductByQueryDTO){
    // Logic to edit an item by query
    await this.crudService.editProductByQuery(updateProductByQueryDTO).then();
  }

  async deleteItem(id: number){
    console.log("Delete item with id:", id);
    await this.crudService.removeProduct(id).then();
  }

  searchItems(query: string): void {
    // Logic to search items
    this.itemList.set(this.itemList().filter(item => 
      item.productName.toLowerCase().includes(query.toLowerCase()) ||
      item.productDescription.toLowerCase().includes(query.toLowerCase())
    ));
  }

  editProductQuantity(id: number, newQuantity: number): void {
    // Logic to edit product quantity
    const product = this.itemList().find(item => item.productUId === id);
    console.log(product);
  }

  // Inside ProductListComponent

toggleRow(uid: number) {
  this.selectedIds.update(currentSet => {
    const newSet = new Set(currentSet);
    if (newSet.has(uid)) {
      newSet.delete(uid); // If selected, deselect it
    } else {
      newSet.add(uid);    // If not selected, select it
    }
    return newSet;
  });
}
}