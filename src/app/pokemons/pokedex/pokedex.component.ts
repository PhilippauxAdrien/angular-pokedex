import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  idPokemon: number = 1;

  constructor() { }

  ngOnInit() {
  }

   handleIdUpdated(id) {
    this.idPokemon = id;
  }

}
