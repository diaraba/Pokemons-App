import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { POKEMONS } from '../mock-pokemon-list';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styles: [
  ]
})
export class DetailPokemonComponent {
  pokemonList: Pokemon[] ;
  pokemon: Pokemon|undefined;
  constructor(private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService){}
  ngOnInit() {

    const pokemonId: string | null= this.route.snapshot.paramMap.get('id');
    if(pokemonId){
        this.pokemonService.getPokemonById(+pokemonId)
          .subscribe(pokemon => this.pokemon=pokemon);
    }

  }

  goToPokemonList(){
    this.router.navigate(['/pokemons']);
  } 

  goToEditPokemon(pokemon: Pokemon){
    this.router.navigate(['/edit/pokemon', pokemon.id]);
  } 
  
  deletePokemon(pokemon: Pokemon){
    this.pokemonService.deletePokemonById(pokemon.id)
      .subscribe(() => this.goToPokemonList());
  }
}
