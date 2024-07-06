import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductsDialogComponent } from 'src/app/commonComponents/products-dialog/products-dialog.component';
import { MessageService } from 'primeng/api';

interface Product {
  id?: number;
  category?: string;
  productName?: string;
  price?: number;
  rating?: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [DialogService, MessageService]
})

export class ProductsComponent {
  initialProducts: any = [
    {
      id: 1,
      category: 'Mens clothing',
      productName: 'denim jeans',
      price: 800,
      rating: "4.4"

    },
    {
      id: 2,
      category: 'Shoes',
      productName: 'Nike',
      price: 1800,
      rating: "4.4"

    },
    {
      id: 3,
      category: 'Perfume',
      productName: 'denver',
      price: 400,
      rating: "4.4"

    },
    {
      id: 4,
      category: 'accessories',
      productName: 'Belt',
      price: 800,
      rating: "4.4"

    },
    {
      id: 5,
      category: 'accessories',
      productName: 'walllet',
      price: 800,
      rating: "4.4"

    },
    {
      id: 6,
      category: 'Mens clothing',
      productName: 'cargo',
      price: 800,
      rating: "4.4"

    },
    {
      id: 6,
      category: 'Mens clothing',
      productName: 'Shirt',
      price: 800,
      rating: "4.4"

    },
  ]
  products!: Product[];
  cities: any;
  selectedCity: any;
  graphDataset:any;
  view:any =[550,0];

  ref: DynamicDialogRef | undefined;
  oneventFire: EventEmitter<number> = new EventEmitter<number>();

  constructor(public dialogService: DialogService, public messageService: MessageService) { }


  ngOnInit() {
    // if (!localStorage.getItem('products')) {
    //   let items = JSON.stringify(this.initialProducts)
    //   localStorage.setItem('products', items)
    // } else {
    //   let localItems: any = localStorage.getItem('products')
    //   this.products = JSON.parse(localItems)
    //   this.graphDta(this.products)
    // }
    let items = JSON.stringify(this.initialProducts)
      localStorage.setItem('products', items)
    let localItems: any = localStorage.getItem('products')
      this.products = JSON.parse(localItems)
      this.graphData(this.products)
  }
  

  graphData(data:any){
      const uniqueCategories = [...new Set(data.map((product:any) => product.category))];
      this.graphDataset = uniqueCategories.map(category => {
        return { 
          name: category, 
          value: data.filter((product:any) => product.category === category).length 
        };
      });
      this.graphDataset = [...this.graphDataset]
      // console.log("dddddddd",this.graphDataset)

  }

  createProduct(para: string) {
    this.ref = this.dialogService.open(ProductsDialogComponent, {
      header: 'Add Product',
      width: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((product) => {
      // console.log('close', product)
      let timestamp = Date.now()
      if (product) {
        // console.log(product)
        let productObj = {
          id: timestamp.toString(),
          category: product.category,
          productName: product.productName,
          price: product.price,
          rating: product.rating

        }
        // console.log(productObj)
        let localItems: any = localStorage.getItem('products')
        let allItems = JSON.parse(localItems)
        allItems.unshift(productObj)
        this.products = allItems;
        let items = JSON.stringify(allItems)
        localStorage.setItem('products', items)
        this.graphData(this.products)
      }
    });
  }

  updateProduct(item: any) {
    // console.log(item)

    this.ref = this.dialogService.open(ProductsDialogComponent, {
      header: 'Edit Product',
      width: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: item
    });

    this.ref.onClose.subscribe((product: Product) => {
      if (product) {
        // console.log(product)
        let localItems: any = localStorage.getItem('products')
        let allItems = JSON.parse(localItems)
        allItems.forEach((ele: any, i: any) => {
          if (product.id == ele.id) {
            allItems.splice(i, 1, product)
          }
        });
        this.products = allItems;
        let items = JSON.stringify(allItems)
        localStorage.setItem('products', items)
        this.graphData(this.products)
      }
    });
  }

  deleteProduct(item: any) {
    let localItems: any = localStorage.getItem('products')
    let allItems = JSON.parse(localItems)
    allItems.forEach((ele: any, i: any) => {
      if (item.id == ele.id) {
        allItems.splice(i, 1)
      }
    });
    this.products = allItems;
    let items = JSON.stringify(allItems)
    localStorage.setItem('products', items)
    this.graphData(this.products)
  }

  onResize(event:any) {
    this.view = [event.target.innerWidth / 1.35, 400];
    if(event.target.innerWidth > 1280){
      this.view = [0,0]
    }
  }
}

