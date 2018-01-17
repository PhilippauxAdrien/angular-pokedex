import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonService } from '../../core/pokemon.service';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
})
export class PokemonsListComponent implements OnInit {

  constructor(private pokemonService: PokemonService) { }

  pokemons: Observable<any>[];
  loading: boolean = true;
  searchText: string; 

  @Output() idPokemonSelected = new EventEmitter();

  ngOnInit() {
  	this.getAllPokemons();
  }

  getAllPokemons(): void{
  	this.pokemonService.getAllPokemons()
  	.subscribe(pokemons => {
  		this.pokemons = pokemons.results;
      
  		this.loading = false;
  	});
  }

  getIdFromUrl(url): string {
  	var tab = url.split("/");
  	return tab[tab.length - 2];
  }

  onSelect(id: number): void{
    console.log("Pokemon " + id + " selectionné !");
    this.idPokemonSelected.emit(id);
  }

  isSearched(searchText: string, pokemon: any): boolean{
    if(!searchText || searchText == '') return true;

    if(pokemon.name.indexOf(searchText) >= 0 || this.getIdFromUrl(pokemon.url).indexOf(searchText) >= 0) return true;

    return false;
  }
}
