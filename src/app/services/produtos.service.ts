import { Injectable } from '@angular/core';
import { Item } from '../types/Item';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
   items:Item[] = [
      {
        id: 1,
        nome: "Hamburguer",
        preco: 25.00,
        ingredientes: ["carne", "cebola", "picles", "molho especial"],
        imagem: ""
      },
      {
        id: 2,
        nome: "Hamburguer bacon",
        preco: 30.00,
        ingredientes: ["carne", "cebola", "picles", "molho especial"],
        imagem: ""
      },
      {
        id: 3,
        nome: "Hamburguer bacon",
        preco: 30.00,
        ingredientes: ["carne", "cebola", "picles", "molho especial"],
        imagem: ""
      },

    ];
  constructor() { }


  buscarLanches(): Item[] {
    return this.items;
  }


  //aqui vamos buscar o produto na api
  buscarLanchesById(id: number): Item | null {
    const lanches = this.buscarLanches();
    const lancheEncontrado = lanches.find((lanche) => lanche.id === id);
    if (lancheEncontrado) {
      return lancheEncontrado;
    }

    return null
  }

  salvarItem(item:Item){
     let maiorValor = 1

     this.items.forEach((item)=>{
      if(item.id > maiorValor){
        maiorValor = item.id
      }
     })

     item.id= maiorValor


      this.items.push(item)
  }
}
