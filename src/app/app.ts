import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Items } from './Model/Items';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CRUD Application');
  itemList: Items[] = [];
  
  constructor(){
    this.populateItems();
  }
  populateItems(){
    this.itemList.push(new Items(1,'Item A',100,2));
    this.itemList.push(new Items(2,'Item B',150,3));
    this.itemList.push(new Items(3,'Item C',200,1));
    this.itemList.push(new Items(4,'Item D',250,5));
  }

  updateItemQuantity(qty: string, id: number){
    // Find the item by id and update its quantity
    const item = this.itemList.find(i => i.id === id);
    if(item){
      item.quantity = parseInt(qty, 10);
    }
  }

  deleteItem(id: number){
    // Logic to delete an item
    this.itemList = this.itemList.filter(item => item.id !== id);
  }
}