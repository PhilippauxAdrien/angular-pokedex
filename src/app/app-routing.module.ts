import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonsListComponent } from './pokemons/pokemons-list/pokemons-list.component';
import { PokemonDetailComponent } from './pokemons/pokemon-detail/pokemon-detail.component';
import { PokedexComponent } from './pokemons/pokedex/pokedex.component';

const routes: Routes = [
{ path: 'pokemons', component: PokemonsListComponent },
{ path: 'pokedex', component: PokedexComponent },
{ path: 'pokemon/:id', component: PokemonDetailComponent },
{ path: '', redirectTo: '/pokedex', pathMatch: 'full' },  // DEFAULT ROUTE

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
