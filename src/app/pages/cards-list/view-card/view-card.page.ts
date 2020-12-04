import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../../../models/Card';

import { CardsService } from '../../../../services/cards.service';

import { ActivatedRoute, Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.page.html',
  styleUrls: ['./view-card.page.scss'],
})
export class ViewCardPage implements OnInit {

  @Input() idcard: number | String;

  card: Card = {
    id_carta: 0,
    nombre: '',
    descripcion: '',
    hora_inicio: '',
    hora_fin: '',
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
      },
      err => console.error(err)
    )

   /* let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.cardsService.getCard(id).subscribe(result => 
      this.content = result);*/
    
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

}
