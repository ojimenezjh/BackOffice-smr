import { Component, OnInit, EventEmitter } from '@angular/core';

import DataSource from 'devextreme/data/data_source';

import { CardsService } from '../../../services/cards.service'
import { Card } from 'src/models/Card';
import { CardsFormPage } from '../cards-form/cards-form.page';

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

  autoNavigateToFocusedRow = true;

  focusedRowKey: number = 0;

  constructor(private cardsService: CardsService, private modalController: ModalController) { }

  ngOnInit() {
    this.getCards();
  }

  getCards(){
    this.cardsService.getCards().subscribe(
      res => {
        this.cards = res;
      },
      err => console.error(err)
    );
  }

  deleteCard(id: Number) {
    this.cardsService.deleteCard(id).subscribe(
      res => {
        this.getCards();
      },
      err => console.log(err)
    )
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
