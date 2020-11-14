import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../../models/Card';

import { CardsService } from '../../../services/cards.service';

import { ActivatedRoute, Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cards-form',
  templateUrl: './cards-form.page.html',
  styleUrls: ['./cards-form.page.scss'],
})
export class CardsFormPage implements OnInit {

  @Input() idcard: number | String;

  card: Card = {
    id_carta: 0,
    nombre: '',
    descripcion: '',
    horario: '',
    imagen: '',
    posicion: 0
  };

  edit: boolean = false;

  constructor(private cardsService: CardsService, private router: Router, private activatedRoute: ActivatedRoute, private modalController: ModalController) { }

  ngOnInit() {

    this.cardsService.getCard(Number(this.idcard)).subscribe(
      res => {
        console.log(res);
        this.card = res[0];
        this.edit = true;
      },
      err => console.error(err)
    )
    
  }

  saveNewCard() {
    //delete this.card.id; si quisieramos eliminar el id y configurarlo para que autoincrementará en postgres
    
    this.cardsService.saveCard(this.card).subscribe(
      res => {
        console.log(res);
        this.closeModal();
      },
      err => console.error(err)
    );

  }

  updateCard() {
    this.cardsService.updateCard(this.card.id_carta, this.card).subscribe(
      res => { 
        console.log(res);
        this.closeModal();
      },
        err => console.error(err)
    )
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

}
