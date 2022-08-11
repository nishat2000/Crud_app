import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  bookForm:FormGroup;
  showSucessMessage: boolean=false;

  constructor(
    public formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private crudService:CrudService
  ) {
    this.bookForm=this.formBuilder.group({
      name:[''],
      price:[''],
      description:['']
    })
   }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.crudService.AddBook(this.bookForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
        // this.showSucessMessage = true;
        this.ngZone.run(() => this.router.navigateByUrl('/books-list'))
      }, (err) => {
        console.log(err);
    });
  }
}
