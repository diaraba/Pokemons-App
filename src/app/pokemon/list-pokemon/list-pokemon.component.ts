import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { POKEMONS } from '../mock-pokemon-list';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',

})
export class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[] ;
  pokemonSelected: Pokemon|undefined;

  constructor(private router: Router, private pokemonService: PokemonService){}
  ngOnInit(): void {
    this.pokemonService.getPokemonList()
      .subscribe(pokemons => this.pokemonList=pokemons);
  }

  selectPokemon(pokemonId: string){
    const pokemon: Pokemon|undefined = this.pokemonList.find(p => p.id == +pokemonId);
    if(pokemon){
      console.log(`Vous avez demandé le pokemon ${pokemon.name}`);
      this.pokemonSelected=pokemon;
    }else{
      console.log(`Vous avez demandé un pokemon qui n'existe pas`);
      this.pokemonSelected=pokemon;
    }
  }

  goToPokemon(pokemon: Pokemon){
    this.router.navigate(['/pokemon/', pokemon.id]);
  }

}
