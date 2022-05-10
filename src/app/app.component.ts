import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PokemonI } from './models/pokemon.interface';
import { PokemonService } from './services/pokemon/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemos';

  // lista de pokemons
  listPokemos: PokemonI[] | undefined;

  // habilitar campos
  showNew: boolean = false;
  showEdit: boolean = false;

  // nuevo pokemon
  pokemon: PokemonI | undefined;

  // variable para buscar un pokemon
  pokemonSearch: string = '';

  constructor(private _pokemonService: PokemonService,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {

    this.showNew = false;
    this.loadPokemons();
    this.cancel();
  }

  loadPokemons() {
    this._pokemonService.getAllPokemons().subscribe((res: PokemonI[] | undefined) => {

      if(res.length){
        this.listPokemos = res;
      }
    });
  }

  save() {
    if (this.pokemon?.name == '' || this.pokemon?.name == null) {
      this.showWarning("El nombre del pokemon es necesario");
    } else if (this.pokemon?.attack == '' || this.pokemon?.attack == null || this.pokemon?.attack <= '0') {
      this.showWarning("El ataque del pokemon es necesario");

    } else if (this.pokemon?.image == '' || this.pokemon?.image == null) {
      this.showWarning("Debes ingresar la imagen del pokemon");

    } else if (this.pokemon?.defense == '' || this.pokemon?.defense == null) {
      this.showWarning("La defensa del pokemon es necesario");

    }else{

      this.pokemon.created_at = "" + new Date();
      this.pokemon.hp = "100";
      this.pokemon.type = "normal";
      this.pokemon.idAuthor = "1";
      this._pokemonService.createPokemon(this.pokemon).subscribe(res=>{
        this.showNew = false;
        this.loadPokemons();
        this.cancel();
        this.showSuccess("Guardado");
      });
    }
  }

  saveEdit(){
    if (this.pokemon?.name == '' || this.pokemon?.name == null) {
      this.showWarning("El nombre del pokemon es necesario");
    } else if (this.pokemon?.attack == '' || this.pokemon?.attack == null || this.pokemon?.attack <= '0') {
      this.showWarning("El ataque del pokemon es necesario");

    } else if (this.pokemon?.image == '' || this.pokemon?.image == null) {
      this.showWarning("Debes ingresar la imagen del pokemon");

    } else if (this.pokemon?.defense == '' || this.pokemon?.defense == null) {
      this.showWarning("La defensa del pokemon es necesario");

    }else{

      this.pokemon.created_at = "" + new Date();
      this.pokemon.hp = "100";
      this.pokemon.type = "normal";
      this.pokemon.idAuthor = "1";
      this._pokemonService.updatePokemon(this.pokemon).subscribe(res=>{
        this.showNew = false;
        this.loadPokemons();
        this.cancel();
        this.showSuccess(this.pokemon.name + " editado con exito");
      });
    }
  }

  editPokemon(pokemon: PokemonI){
    this.pokemon = pokemon;
    this.showNew = true;
    this.showEdit = true;
  }

  deletePokemon(idPokemon: string){
    this._pokemonService.deletePokemon(idPokemon).subscribe(res=>{
      this.loadPokemons();
      this.showSuccess(this.pokemon.name + " eliminado con exito");
    });
  }

  searchOne(){
    this.listPokemos = [];
    this.cancel();
    if (this.pokemonSearch == '' || this.pokemonSearch == null) {

    }else{
      this._pokemonService.getOnePokemon(this.pokemonSearch).subscribe(res=>{
        
        this.listPokemos[0] = res;
        
      },err =>{
        this.loadPokemons();
      });
    }
  }

  newPokemon() {
    this.showNew = true;
  }

  cancel() {
    this.showNew = false;
    this.showEdit = false;
    this.pokemon = {
      id: '',
      name: '',
      image: '',
      type: '',
      hp: '',
      attack: '',
      defense: '',
      idAuthor: '',
      created_at: '',
      updated_at: ''
    }
  }

  showSuccess(mensaje: any) {
    this.toastr.success(mensaje + '!!!', 'Success', {
      timeOut: 3000,
    });

  }

  showWarning(mensaje: any) {
    this.toastr.warning(mensaje + '!!!', 'Warning', {
      timeOut: 3000,
    });
  }

}
