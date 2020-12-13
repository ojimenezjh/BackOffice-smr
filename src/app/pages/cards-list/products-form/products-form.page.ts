import { Component, OnInit, Input, ViewChild } from '@angular/core';
/* import { Card } from '../../../../models/Card'; */
import { Product } from 'src/models/Product';

import { ProductService } from '../../../../services/product.service';

import { ActivatedRoute, Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.page.html',
  styleUrls: ['./products-form.page.scss'],
})
export class ProductsFormPage implements OnInit {

  @Input() idproduct: number | String;

  producto: Product = {
    id_producto: 0,
    imagen: '',
    producto: '',
    familia: '',
    tipoveg: 1,
    gluten: 0,
    descripcion: '',
    posicion: 0,
    precio: 0,
  }

  gluten: boolean = false;

  edit: boolean = false;

  selectedFile: any;

  constructor(
    private productService: ProductService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController) { }

  ngOnInit() {
    this.productService.getProduct(Number(this.idproduct)).subscribe(
      res => {
        this.producto = res[0];
        this.gluten = this.getGluten(this.producto.gluten);
        console.log(this.producto)
        this.edit = true;
      },
      err => console.log(err)
    )
  }

  getGluten(numGluten:number){
    return numGluten == 0 ? false : true ;
  }

  putGluten(boolGluten:boolean){
    return boolGluten == false ? 0 : 1 ;
  }

  onFileSelected(e){
    this.selectedFile = (e.target.files[0]);
  }

  updateProduct(){
    this.producto.gluten = this.putGluten(this.gluten);
    this.productService.updateProduct(this.producto.id_producto, this.producto).subscribe(
      res => {
        this.closeModal();
      },
      err => console.error(err)
    )
  }

  saveNewProduct() {
    //delete this.producto.id; si quisieramos eliminar el id y configurarlo para que autoincrementará en postgres
    this.producto.gluten = this.putGluten(this.gluten);
    this.productService.saveProduct(this.producto).subscribe(
      res => {
        console.log(res);
        this.closeModal();
      },
      err => console.error(err)
    ); 
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

}
