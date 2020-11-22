import { Component, OnInit, EventEmitter } from '@angular/core';

import DataSource from 'devextreme/data/data_source';

import { CardsService } from '../../../services/cards.service';
import { Card } from 'src/models/Card';
import { CardsFormPage } from '../cards-form/cards-form.page';

import { ProductService } from '../../../services/product.service';
import { Product, CartaProducto } from 'src/models/Product';

import { ModalController } from '@ionic/angular';
import { ViewCardPage } from './view-card/view-card.page';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.page.html',
  styleUrls: ['./cards-list.page.scss'],
})
export class CardsListPage implements OnInit {

  //dataSource: DataSource;

  

  cards: Card[] = [];

  card: Card = {
    id_carta: 0,
    nombre: '',
    descripcion: '',
    horario: '',
    imagen: '',
    posicion: 0
  };

  products: Product[] = [];
  allProducts: Product[] = [];

  cartaProducto: CartaProducto = {
  id_carta: 0,
  id_producto: ''
  }

  product: Product = {
    id_producto: 0,
    imagen: '',
    producto: '',
    familia: '',
    tipoveg: 0,
    gluten: false,
    descripcion: '',
    posicion: 0,
    precio: 0,  
  }

  autoNavigateToFocusedRow = true;

  focusedRowKey: number = 0;
  focusedRowKey2: number = 0;
  gridBoxValue: [] = [];

  

  constructor(private cardsService: CardsService, private productService: ProductService, private modalController: ModalController) { 
    this.onAdd = this.onAdd.bind(this);
  }
  

  ngOnInit() {
    this.getCards();
    this.getProducts();
  }

  //GETS-----------------------------------------------------

  getCards(){
    this.cardsService.getCards().subscribe(
      res => {
        this.cards = res;
      },
      err => console.error(err)
    );
  }

  getCard(id: Number){
    this.cardsService.getCard(id).subscribe(
      res => {
        this.getCards();
        console.log(res);
      },
      err => console.log(err)
    )
  }

  getProductsByCard(id_card: Number){
    this.productService.getProductsByCard(id_card).subscribe(
      res => {
        this.products = res;
      },
      err => console.log(err)
    )
  }

  getProducts(){
    this.productService.getProducts().subscribe(
      res => {
        this.allProducts = res;
      },
      err => console.log(err)
    )
  }

  //POSTS----------------------------------------------------------

  onAdd(e) {
    var id_productos = new Array();
    for(this.product of this.gridBoxValue){ 
      if (Array.isArray(id_productos)){
        id_productos.push(this.product.id_producto);
      }
    }  
    this.cartaProducto.id_carta = this.cards[this.focusedRowKey].id_carta;
    this.cartaProducto.id_producto = JSON.stringify(id_productos);
    this.productService.insertProductToCard(this.cartaProducto).subscribe(
      res => {
        this.getProductsByCard(this.cards[this.focusedRowKey].id_carta);
        this.gridBoxValue = [];
      },
      err => console.log(err)
    )
  }

  //DELETES-----------------------------------------------------

  
  deleteCard(id: Number) {
    this.cardsService.deleteCard(id).subscribe(
      res => {
        this.getCards();
      },
      err => console.log(err)
    )
  }

  //OTROS..............

  onDragStart(e){
    let selectedRowKeys = e.component.getSelectedRowKeys(),
      numSelected = selectedRowKeys.length;

      console.log(selectedRowKeys,numSelected);
  
        document.styleSheets[2].addRule('.dx-sortable-clone.dx-sortable-dragging:before',
                                      'content: "'+numSelected+'"; background-color: green; color: white; padding: 2px 5px 2px 5px;');
  }

  onDisableDrag(e){
    e.cancel=true;
  }

  async addModal(){
    
    const modal = await this.modalController.create({
      component: CardsFormPage
    });

    modal.onWillDismiss().then((data) => {
      this.getCards();
    });

    return await modal.present();

  }

  async viewModal(idcard: number | String){
    
    const modal = await this.modalController.create({
      component: ViewCardPage,
      componentProps: {
        idcard: idcard
      }
    });

    modal.onWillDismiss().then((data) => {
      this.getCards();
    });

    return await modal.present();

  }

  async editModal(idcard: number | String) {
    
    const modal = await this.modalController.create({
      component: CardsFormPage,
      componentProps: {
        idcard: idcard
      }
    });

    modal.onWillDismiss().then((data) => {
      this.getCards();
    });

    return await modal.present();

  }

}
