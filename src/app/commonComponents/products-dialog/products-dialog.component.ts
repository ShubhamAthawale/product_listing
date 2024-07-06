import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.scss'],
  providers: [DialogService]
})
export class ProductsDialogComponent {
  productsForm:any;
  categories = [
    'Mens clothing', 'Shoes', 'Perfume', 'accessories'
  ];

  ;

    constructor(
      public dialogconfig: DynamicDialogConfig,
      public dialogService: DialogService,
      public ref: DynamicDialogRef,
    ) {}

  ngOnInit(){
    this.productsForm = new FormGroup({
      category : new FormControl('',Validators.required),
      productName : new FormControl('',Validators.required),
      price : new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$') 
      ]),
      rating : new FormControl('',Validators.required)
    })

    // console.log( this.dialogconfig.data)

    if(this.dialogconfig.data){
      this.productsForm.patchValue({
        category : this.dialogconfig.data.category,
        productName : this.dialogconfig.data.productName,
        price : this.dialogconfig.data.price,
        rating : this.dialogconfig.data.rating 
      })
    }
  }

  get formControl(){
    return this.productsForm.controls;
  }

  submitProduct(){
    // console.log(this.productsForm.value)
    if(this.dialogconfig.data){
      this.productsForm.value.id = this.dialogconfig.data.id
    }
    this.ref.close(this.productsForm.value)
    this.ref.destroy()
  }
}
