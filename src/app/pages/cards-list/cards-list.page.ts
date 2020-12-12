import { Component, OnInit, EventEmitter } from '@angular/core';

import { CardsService } from '../../../services/cards.service';
import { Card } from 'src/models/Card';
import { CardsFormPage } from './cards-form/cards-form.page';

import { ProductService } from '../../../services/product.service';
import { Product, CartaProducto } from 'src/models/Product';

import { ModalController, AlertController } from "@ionic/angular";
import { ViewCardPage } from './view-card/view-card.page';

import { DxDataGridComponent } from "devextreme-angular";
import { ViewChild } from '@angular/core';

import { custom } from 'devextreme/ui/dialog';
import { ProductsFormPage } from './products-form/products-form.page';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.page.html',
  styleUrls: ['./cards-list.page.scss'],
})
export class CardsListPage implements OnInit {

  //dataSource: DataSource;

  @ViewChild('grid1', { static: false }) grid1: DxDataGridComponent;
  @ViewChild('grid2', { static: false }) grid2: DxDataGridComponent;
  @ViewChild('grid3', { static: false }) grid3: DxDataGridComponent;

  cards: Card[] = [];

  card: Card = {
    id_carta: 0,
    nombre: '',
    descripcion: '',
    hora_inicio: '',
    hora_fin: '',
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
    gluten: 0,
    descripcion: '',
    posicion: 0,
    precio: 0,
  }

  autoNavigateToFocusedRow = true;

  focusedRowKey: number = 0;
  focusedRowKey2: number = 0;
  focusedRowKey3: number = 0;
  gridBoxValue: [] = [];

  pageIndex;
  realFocusIndex;

  numRows: number = 10;

  constructor(private cardsService: CardsService, private productService: ProductService, private modalController: ModalController, private alertCtrl: AlertController) {
    this.onAdd = this.onAdd.bind(this);
  }


  ngOnInit() {
    this.getCards();
    this.getProducts();
  }

  //GETS-----------------------------------------------------

  getCards() {
    this.cardsService.getCards().subscribe(
      res => {
        this.cards = res;
      },
      err => console.error(err)
    );
  }

  getCard(id: Number) {
    this.cardsService.getCard(id).subscribe(
      res => {
        this.getCards();
        console.log(res);
      },
      err => console.log(err)
    )
  }

  getProductsByCard(id_card: Number) {
    this.productService.getProductsByCard(id_card).subscribe(
      res => {
        this.products = res;
      },
      err => console.log(err)
    )
  }

  getProducts() {
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
    for (this.product of this.gridBoxValue) {
      if (Array.isArray(id_productos)) {
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


  deleteCard(id: number) {
    console.log(id)
    this.cardsService.deleteCard(id).subscribe(
      res => {
        this.getCards();
      },
      err => console.log(err)
    )
  }

  deleteProductInCard(id_carta: number, id_producto: number) {
    console.log(id_carta, id_producto);
    this.productService.deleteProductInCard(id_carta, id_producto).subscribe(
      res => {
        this.getProductsByCard(id_carta);
      },
      err => console.log(err)
    )
  }

  deleteProduct(id: number) {
    console.log(id)
    this.productService.deleteProduct(id).subscribe(
      res => {
        this.getProducts();
      },
      err => console.log(err)
    )
  }

  //OTROS..............

  onDragStart(e) {
    let selectedRowKeys = e.component.getSelectedRowKeys(),
      numSelected = selectedRowKeys.length;

    console.log(selectedRowKeys, numSelected);

    document.styleSheets[2].addRule('.dx-sortable-clone.dx-sortable-dragging:before',
      'content: "' + numSelected + '"; background-color: green; color: white; padding: 2px 5px 2px 5px;');
  }

  onDisableDrag(e) {
    e.cancel = true;
  }

  async addModal() {

    const modal = await this.modalController.create({
      component: CardsFormPage
    });

    modal.onWillDismiss().then((data) => {
      this.getCards();
    });

    return await modal.present();

  }

  async addModalProduct() {

    const modal = await this.modalController.create({
      component: ProductsFormPage
    });

    modal.onWillDismiss().then((data) => {
      this.getProducts();
    });

    return await modal.present();

  }

  async viewModal(idcard: number | String) {

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

  async editModalProduct(idproduct: number | String) {

    const modal = await this.modalController.create({
      component: ProductsFormPage,
      componentProps: {
        idproduct: idproduct
      }
    });

    modal.onWillDismiss().then((data) => {
      this.getProducts();
    });

    return await modal.present();

  }

  onToolbarPreparing(e) {
    console.log(e.element.id)
    var texto = '';
    if (e.element.id == "gridContainer") {
      texto = 'Cartas'
    }
    if (e.element.id == "gridContainer3") {
      texto = 'Productos'
    }
    e.toolbarOptions.items.unshift({
      location: 'before',
      text: texto
    }, {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'add',
        onClick: this.addDataGrid.bind(this, e)

      }
    },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'edit',
          onClick: this.editDataGrid.bind(this, e)
        }

      }, {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'trash',
        onClick: this.deleteDataGrid.bind(this, e)
      }

    });
  }

  onToolbarPreparing2(e) {

    e.toolbarOptions.items.unshift({
      location: 'before',
      text: 'Carta Seleccionada'
    }, {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'trash',
        onClick: this.deleteDataGrid.bind(this, e)
      }

    });
  }
  addDataGrid(e) {
    if (e.element.id == "gridContainer") {
      this.addModal();
      //this.grid1.instance.addRow();
    }
    else if (e.element.id == "gridContainer3") {
      this.addModalProduct();
    }

  }

  editDataGrid(e) {
    if (e.element.id == "gridContainer") {
      this.pageIndex = e.component.pageIndex();
      this.realFocusIndex = (this.pageIndex * this.numRows) + this.focusedRowKey;
      this.editModal(this.cards[this.realFocusIndex].id_carta);
      /* console.log(this.cards[this.focusedRowKey].horario)
      this.grid1.instance.editRow(this.focusedRowKey); */
    }
    else if (e.element.id == "gridContainer3") {
      this.pageIndex = e.component.pageIndex();
      this.realFocusIndex = (this.pageIndex * this.numRows) + this.focusedRowKey3;
      this.editModalProduct(this.allProducts[this.realFocusIndex].id_producto);
    }
  }

  async deleteDataGrid(e) {
    this.pageIndex = e.component.pageIndex();
    if (e.element.id == "gridContainer") {
      let alert = custom({
        title: "Aviso",
        message: "¿Desea borrar la carta?",
        buttons: [
          {
            text: "Aceptar",
            onClick: (e) => {
              this.realFocusIndex = (this.pageIndex * this.numRows) + this.focusedRowKey;
              this.deleteCard(this.cards[this.focusedRowKey].id_carta);
            },
          },
          {
            text: "Cancelar",
            onClick: (e) => {
              alert.hide();
            },
          },
        ],
      });
      alert.show().then(() => {

      });
    }
    else if (e.element.id == "gridContainer2") {
      let alert = custom({
        title: "Aviso",
        message: "¿Desea borrar el producto de la carta?",
        buttons: [
          {
            text: "Aceptar",
            onClick: (e) => {
              var pageIndexCard = this.grid1.instance.pageIndex();
              var realFocusIndexCarta = (pageIndexCard * this.numRows) + this.focusedRowKey;
              this.realFocusIndex = (this.pageIndex * this.numRows) + this.focusedRowKey2;
              this.deleteProductInCard(this.cards[realFocusIndexCarta].id_carta, this.products[this.realFocusIndex].id_producto);
            },
          },
          {
            text: "Cancelar",
            onClick: (e) => {
              alert.hide();
            },
          },
        ],
      });
      alert.show().then(() => {

      });
    }
    else if (e.element.id == "gridContainer3") {
      let alert = custom({
        title: "Aviso",
        message: "¿Desea borrar el producto?",
        buttons: [
          {
            text: "Aceptar",
            onClick: (e) => {
              this.realFocusIndex = (this.pageIndex * this.numRows) + this.focusedRowKey3;
              this.deleteProduct(this.allProducts[this.realFocusIndex].id_producto);
            },
          },
          {
            text: "Cancelar",
            onClick: (e) => {
              alert.hide();
            },
          },
        ],
      });
      alert.show().then(() => {

      });
    }
  }

  /*   imagenCarta(id:number){
      console.log(this.cards[id]);
      return this.cards[id].imagen;
  
      for(let card of this.cards){
        if(this.focusedRowKey = card.id_carta) return card.imagen;
      }
  
    } */

}
