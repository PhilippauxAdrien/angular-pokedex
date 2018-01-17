import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

import { PokemonService } from '../../core/pokemon.service';
import { TypeService } from '../../core/type.service';

import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { SlizeDecimalPipe } from '../pipes/sliceDecimal.pipe';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  frenchName: String;
  frenchDescription: String;
  pokemon: Array<any>[];
  loading: boolean = true;
  typesArray: Array<string> = new Array();

  @Input() idPokemon: number;

  constructor(
  	    private route: ActivatedRoute,
  	    private location: Location,
  	    private pokemonService: PokemonService,
        private typeService: TypeService,
	) { }

  ngOnInit() {
    console.log("INIT POKEMON ID : " + this.idPokemon);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("CHANGEMENT ONCHANGGES");
    this.reinitVariables();
    this.getPokemon(this.idPokemon);
    this.getSpecies(this.idPokemon); 
  }

  reinitVariables(): void {
    this.loading = true;
    this.typesArray = [];
    this.pokemon = [];
    this.frenchDescription = '';
    this.frenchName = '';
  }

  getPokemon(idPokemon: number): void {
   
      this.pokemonService.getPokemon(idPokemon).pipe(
        map(pokemon => this.pokemon = pokemon),
        mergeMap(pokemon => {

         const joinArray: Array<Observable<any>> = new Array();

          pokemon.types.forEach(type => {
              joinArray.push(this.getType(type.type.name));
          });
          return forkJoin(joinArray)
        })
      ).subscribe();
    
  }

  getSpecies(idPokemon: number): void {
    
      this.pokemonService.getSpecies(idPokemon).subscribe(species => {

        species.flavor_text_entries.forEach(description => {
            if(description.language.name == 'fr'){
              this.frenchDescription = description.flavor_text;
            }
        });

        species.names.forEach(name => {
            if(name.language.name == 'fr'){
              this.frenchName = name.name;
            }
        });
            this.loading = false;
      });

  }
  
  getType(name: string): Observable<any>{
    let typeName;

    this.typeService.getType(name).pipe(
      map(type => {
        type.names.forEach(name => {
          if(name.language.name == 'fr'){
            typeName = name.name;
          }
      });
      this.typesArray.push(typeName);
      }))
    .subscribe();
    return typeName;
  }
}
