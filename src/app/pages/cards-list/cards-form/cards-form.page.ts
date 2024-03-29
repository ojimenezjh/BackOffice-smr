import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Card } from '../../../../models/Card';

import { CardsService } from '../../../../services/cards.service';

import { ActivatedRoute, Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cards-form',
  templateUrl: './cards-form.page.html',
  styleUrls: ['./cards-form.page.scss'],
})
export class CardsFormPage implements OnInit {

  //@Output() onFileSelect: EventEmitter<Object> = new EventEmitter();
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

  //selectedFile: any;


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

/*   onFileSelected(e){
    this.selectedFile = (<File>e.target.files[0]);
    this.card.imagen = this.selectedFile.data;

    //Preview
    if (this.selectedFile){
      const reader = new FileReader();
      reader.onload = () => {
        this.card.imagen = reader.result as string;
        console.log(this.card.imagen)
      };
      reader.readAsDataURL(this.selectedFile);
      //this.onFileSelect.emit(this.selectedFile);
    }
  } */


  /* onSubmit(){

  } */

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
   // this.cardsService.postFile(this.selectedFile).subscribe(res => {console.log(res)}, err => console.error(err));
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
