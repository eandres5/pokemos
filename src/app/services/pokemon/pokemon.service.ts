import { HttpClient } from '@angular/common/http';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { PokemonI } from 'src/app/models/pokemon.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getAllPokemons(){
    this.resultado = this.http.get(`${this.baseUrl}/?idAuthor=1`);
    return this.resultado;
  }

  getOnePokemon(idPokemon: string){
    this.resultado = this.http.get(`${this.baseUrl}/${idPokemon}`);
    return this.resultado;
  }

  createPokemon(pokemon: PokemonI){
    this.resultado = this.http.post(`${this.baseUrl}/?idAuthor=1`, pokemon);
    return this.resultado;
  }

  updatePokemon(pokemon: PokemonI){
    this.resultado = this.http.put(`${this.baseUrl}/${pokemon.id}`, pokemon);
    return this.resultado;
  }

  deletePokemon(idPokemon: string){
    this.resultado = this.http.delete(`${this.baseUrl}/${idPokemon}`);
    return this.resultado;
  }

}
