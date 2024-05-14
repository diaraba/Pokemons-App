import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: [
  ]
})
export class SearchPokemonComponent implements OnInit {

  searchTerm=new Subject<string>();
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
    ){}
  ngOnInit(): void {
    this.pokemons$= this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemon(term))
    );
  }

  search(term: string){
    this.searchTerm.next(term);
  }

  goToDetail(pokemon: Pokemon){
    const link= ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
