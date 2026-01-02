import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

newEmployee = new FormGroup({
    // Define form controls here
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl('')
  })

  addEmployee(){
    // Logic to add a new employee
  }
}
