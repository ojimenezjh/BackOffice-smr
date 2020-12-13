import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Card } from "../models/Card";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CardsService {
  API_URI = "http://82.223.128.240:3000/api";

  constructor(private http: HttpClient) {}

  getCards() {
    return this.http.get<Card[]>(`${this.API_URI}/cards`);
  }

  getCard(id_carta: Number) {
    return this.http.get<Card>(`${this.API_URI}/cards/${id_carta}`);
  }

  searchCard(nombre: String) {
    return this.http.get<Card[]>(`${this.API_URI}/cards/name/${nombre}`);
  }

  deleteCard(id_carta: Number) {
    return this.http.delete(`${this.API_URI}/cards/${id_carta}`);
  }

  saveCard(card: Card) {
    return this.http.post(`${this.API_URI}/cards`, card);
  }

  updateCard(id_carta: String | Number, updatedCard: Card): Observable<Card> {
    return this.http.put<Card>(`${this.API_URI}/cards/${id_carta}`, updatedCard);
  }
/* 
  postFile(fileToUpload: File){
    const endpoint = `${this.API_URI}/cards/upload`
    const formData = new FormData;
    formData.append("image", fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData)
  } */
}
