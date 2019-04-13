import { Component, OnInit, ViewChild } from '@angular/core';
import { Cor } from '../model/cor';
import { Veiculo } from '../model/veiculo';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {

  public veiculo: Veiculo;
  public veiculoModel: Veiculo = new Veiculo();
  public veiculos: any;
  public cor: Cor;
  public cores: any;
  public editando: boolean = false;

  public dataSource: any;

  displayColumnsVeiculo: string[] = ['actionsColumn', 'codigo', 'placa', 'renavan', 'chassi', 'marca', 'modelo', 'ano', 'cor'];

  @ViewChild(MatPaginator) paginatorCustom: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() { }

  ngOnInit() {
    this.veiculo = new Veiculo();
    this.veiculos = new Array<Veiculo>();
    this.cor = new Cor();
    this.cores = new Array<Cor>();
    this.criaCores();
  }

  criaCores() {
    let cor = new Cor();
    cor.id = 1;
    cor.descricao = "Branco";
    this.cores.push(cor);
    cor = new Cor();
    cor.id = 2;
    cor.descricao = "Cinza";
    this.cores.push(cor);
    cor = new Cor();
    cor.id = 3;
    cor.descricao = "Preto";
    this.cores.push(cor);
    console.log("Cores ----->");
    console.log(this.cores);
  }

  salvar() {

    if (this.editando) {
      this.veiculos.forEach(item => {
        if (item.veiculoid = this.veiculoModel.id) {
          this.veiculos.splice(this.veiculos.findIndex(d => d.veiculoId === item.veiculoid - 1), 1);
          this.veiculos.push(this.veiculoModel);
        }
      });
    } else {
      console.log("Veiculo Salvo")
      console.log(this.veiculoModel);
      this.veiculos.push(this.veiculoModel);
      this.veiculoModel = new Veiculo(); //Instancia uma novo veiculo para não perder a referência da primeiro,
    }
    this.editando = false;
    this.atualizaTable();
  }

  excluir(veiculoID: number) {
    this.veiculos.splice(this.veiculos.findIndex(d => d.veiculoId === veiculoID), 1);
    this.atualizaTable();

  }

  editar(veiculoID: number) {
    this.editando = true;
    alert("Editando==> " + veiculoID);
    let veiculoUpdate;
    this.veiculos.forEach(item => {
      if (item.veiculoid == veiculoID) {
        veiculoUpdate = item;
      }
    });
    this.veiculoModel = veiculoUpdate;
  }

  aplicarFiltro(valor: string) {
    valor = valor.trim(); // Remove whitespace
    valor = valor.toLowerCase();

    console.log("realiza o filtro com " + valor);
    this.dataSource.filterPredicate = (data: Veiculo, filter: string) =>
      data.id.toString().indexOf(filter) != -1 ||
      data.placa.toLowerCase().indexOf(filter) != -1 ||
      data.renavan.toString().indexOf(filter) != -1 ||
      data.chassi.toLowerCase().indexOf(filter) != -1 ||
      data.marca.toLowerCase().indexOf(filter) != -1 ||
      data.modelo.toLowerCase().indexOf(filter) != -1 ||
      data.ano.toString().indexOf(filter) != -1 ||
      data.corVeiculo.descricao.toLowerCase().indexOf(filter) != -1;

    this.dataSource.filter = valor;
  }

  atualizaTable() {
    console.log("Lista de Veiculos");
    console.log(this.veiculos);
    this.dataSource = new MatTableDataSource<Veiculo>(this.veiculos);
    this.dataSource.paginator = this.paginatorCustom;
    this.dataSource.sort = this.sort;
  }
}
