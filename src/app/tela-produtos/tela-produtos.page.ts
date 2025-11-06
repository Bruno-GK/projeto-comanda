import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../services/produtos.service';
import { Item } from '../types/Item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tela-produtos',
  templateUrl: './tela-produtos.page.html',
  styleUrls: ['./tela-produtos.page.scss'],

})
export class TelaProdutosPage {

  produtoEmEdicao: Item
  formularioProduto: FormGroup
  modoEdicao: boolean

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutosService,
    private formBuilder: FormBuilder
  ) {
    this.formularioProduto = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      preco: [0, [Validators.required, Validators.min(0.01)]],
      imagem: ['', [Validators.required]],
      ingredientes: ['', [Validators.required, Validators.min(3)]]
    })

  }

  ionViewWillEnter() {
    this.modoEdicao = false;
    this.produtoEmEdicao = null
    const params = this.activatedRoute.snapshot.queryParams;
    if (params["operacao"] == "editar") {
      this.modoEdicao = true;
      const produto = this.buscarProduto()
      this.preencherProduto(produto)
    }
  }


  private buscarProduto() {
    const params = this.activatedRoute.snapshot.queryParams;
    return this.produtoService.buscarLanchesById(Number(params["id"]))
  }

  private preencherProduto(produto: Item) {
    this.formularioProduto = this.formBuilder.group({
      nome: [produto.nome, [Validators.required, Validators.minLength(3)]],
      preco: [produto.preco, [Validators.required, Validators.min(0.01)]],
      imagem: [produto.imagem, [Validators.required]],
      ingredientes: [produto.ingredientes, [Validators.required, Validators.min(3)]]
    })
  }

  limparFormulario() {
    this.formularioProduto = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      preco: [0, [Validators.required, Validators.min(0.01)]],
      imagem: ['', [Validators.required]],
      ingredientes: ['', [Validators.required, Validators.min(3)]]
    })

    this.router.navigate(['/tabs/tab1'])
  }

  salvarItem() {
    const formularioInfo = this.formularioProduto.value
    const ingredientesFormatados =
      formularioInfo.ingredientes.split(",")
        .map((ingrediente) => ingrediente.trim())

    const item = {
      nome: formularioInfo.nome,
      preco: parseFloat(formularioInfo.preco),
      imagem: formularioInfo.imagem,
      ingredientes: ingredientesFormatados
    }

    this.produtoService.salvarItem(item)

    this.formularioProduto = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      preco: [0, [Validators.required, Validators.min(0.01)]],
      imagem: ['', [Validators.required]],
      ingredientes: ['', [Validators.required, Validators.min(3)]]
    })

    this.router.navigate(['/tabs/tab1'])

  }
}
