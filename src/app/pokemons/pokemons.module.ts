import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';

import { PokemonService } from '../core/pokemon.service';
import { TypeService } from '../core/type.service';

import { MatListModule } from '@angular/material/list';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { SlizeDecimalPipe } from './pipes/sliceDecimal.pipe';
import { PokedexComponent } from './pokedex/pokedex.component';

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    MatChipsModule,
    MatGridListModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  declarations: [PokemonsListComponent, PokemonDetailComponent, CapitalizePipe, SlizeDecimalPipe, PokedexComponent],
  providers: [ PokemonService, TypeService ],

})
export class PokemonsModule { }
