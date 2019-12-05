<template>
  <div class="container mx-auto md:w-4/5 p-4" v-on:click="filterFunc()">
    <!--Informações gerais-->
    <div class="row">
      <div class="col col-md-8 col-xl-5 shadow-sm border container my-4">
        <div class="row">
          <h4 class="w-100 mb-3 font-weight-semibold text-white text-center p-2" v-bind:style="{ 'background-color': list.color }">Informações gerais</h4>
        </div>
        <div class="row align-items-center p-4">
          <label class="col-12 col-md-4 font-weight-bold" for="title">Título:</label>
          <input class="col-12 col-md-8 form-control mb-3" type="text" id="title" v-model="list.title"/>
          <label class="col-12 col-md-4 font-weight-bold" for="listDescription">Descrição:</label>
          <input class="col-12 col-md-8 form-control mb-3" type="text" id="listDescription" v-model="list.description"/>
          <label class="col-12 col-md-4 font-weight-bold">Cor: </label>
          <span class="col-12 col-md-8 d-flex justify-content-center mb-3">
            <button type="button" class="rounded-pill bg-primary mr-3" style="height: 25px; width: 25px;" v-on:click="colorChange('#007bff')"/>
            <button type="button" class="rounded-pill bg-warning mr-3" style="height: 25px; width: 25px;" v-on:click="colorChange('#ffc107')"/>
            <button type="button" class="rounded-pill bg-success mr-3" style="height: 25px; width: 25px;" v-on:click="colorChange('#28a745')"/>
            <button type="button" class="rounded-pill bg-danger mr-3" style="height: 25px; width: 25px;" v-on:click="colorChange('#dc3545')"/>
            <button type="button" class="rounded-pill purple-600 mr-3" style="height: 25px; width: 25px;" v-on:click="colorChange('#805ad5')"/>
            <button type="button" class="rounded-pill teal-500" style="height: 25px; width: 25px;" v-on:click="colorChange('#38b2ac')"/>
          </span>
          <span class="col-12 text-center">
            <button v-on:click="updateList()" class="btn text-white rounded-pill mt-2 font-weight-semibold" type="button" v-bind:style="{ 'background-color': list.color }">Salvar alterações</button>
          </span>
        </div>
      </div>
    </div>
    <!---------------------->

    <!--Formulário de item da lista-->
    <div class="row">
      <div class="col col-md-8 col-xl-5 shadow-sm border container my-4">
        <div class="row">
          <h4 class="w-100 mb-3 font-weight-semibold text-white text-center p-2" v-bind:style="{ 'background-color': list.color }">
            Nova tarefa
          </h4>
        </div>
        <div class="row align-items-center p-4">
          <label class="col-12 col-md-4 font-weight-bold" for="description">Descrição:</label>
          <input class="col-12 col-md-8 form-control mb-3" type="text" id="description" v-model="listItemForm.description"/>
          <label class="col-12 col-md-4 font-weight-bold" for="type">Categoria:</label>
          <select class="col-12 col-md-8 form-control mb-3 text-center" id="type" v-model="listItemForm.type">
            <option value="lembrete">Lembrete</option>
            <option value="evento">Evento</option>
            <option value="meta">Meta</option>
          </select>
          <label class="col-12 col-md-4 font-weight-bold" for="createIsDone">Concluído:</label>
          <select class="col-12 col-md-8 form-control mb-3 text-center" id="createIsDone" v-model="listItemForm.isDone">
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
          <span class="col-12 text-center">
            <button class="btn text-white border-0 rounded-pill mt-2 font-weight-semibold" type="button" v-on:click="createListItem(list.id)" v-bind:style="{ 'background-color': list.color }">Adicionar</button>
          </span>
        </div>
      </div>
      <!------------------------------>
    </div>

    <!--Lista de itens-->
    <div class="col-md-7 container p-4 my-4">
      <h4 class="mb-4 font-weight-semibold text-secondary text-center">
        Minhas tarefas
      </h4>

      <div>
        <select class="col-12 rounded text-white font-weight-semibold py-2" id="filter" v-bind:style="{ 'background-color': list.color }" v-model="filter" v-on:change="filterCount = 0">
          <option value="todas" class="text-center">Todas</option>
          <option value="concluidas" class="text-center">Concluídas</option>
          <option value="emandamento" class="text-center">Em andamento</option>
          <option value="lembrete" class="text-center">Lembretes</option>
          <option value="evento" class="text-center">Eventos</option>
          <option value="meta" class="text-center">Metas</option>
        </select>
      </div>

      <!-- Lista Vazia -->
      <div v-if="filterFunc()" class="bg-light my-2 py-2 text-center rounded">
        <span class="font-weight-bold text-center text-primary">O filtro selecionado não resultou em nenhuma lista</span>
      </div>
      <!----------------->

      <div v-for="item in list.listItems" v-bind:key="item.id" class="container-fluid">
        <div v-if="filter === 'todas' || item.type === filter || (filter === 'emandamento' && !item.isDone) || (filter === 'concluidas' && item.isDone)" class="bg-light my-2 py-2 row align-items-center rounded" style="height: 56px;">
          <!--Descricao-->
          <div class="col-1 text-center" v-on:="filterCount++">
            <input type="checkbox" v-model="item.isDone" v-on:change="updateListItem(item, 'isDone')"/>
          </div>
          <div class="col-4 text-truncate">
            <input v-model="item.description" class="ml-2 form-control font-weight-bold" :style="'text-decoration: ' + (item.isDone ? 'line-through;' : 'none;')" v-bind:class="{'text-secondary': item.isDone}" v-on:change="updateListItem(item, 'description')"/>
          </div>
          <!------------>

          <!--Lembrete-->
          <div class="col-6" v-if="item.type ==='lembrete'"></div>
          <!------------>

          <!----Evento---->
          <div class="col-6" v-if="item.type === 'evento'" >
            <input type="date" class="form-control mx-auto w-50" v-model="item.date" v-on:change="updateListItem(item, 'date')"/>
          </div>
          <!-------------->

          <!----Meta---->
          <div class="col-6" v-if="item.type ==='meta'">
            <div class="d-flex align-content-center justify-content-center" style="height: 32px;">

              <button type="button" class="btn border-0 rounded-right px-2 h-100" v-bind:style="{ 'background-color': list.color }" v-on:click="decreaseQtd(item)"><i class="fas fa-minus text-white"/></button>
              <input type="number" class="form-control w-175 rounded-left-0 h-100" v-model="item.currentQtd" v-on:click="updateQtd(item.currentQtd)" v-on:change="validateQtd(item, 'current')"/>
              <span class="px-2">/</span>
              <input type="number" class="form-control w-175 rounded-right-0 h-100" v-model="item.maxQtd" v-on:click="updateQtd(item.maxQtd)" v-on:change="validateQtd(item, 'max')"/>

              <button type="button" class="btn border-0 rounded-left px-2 h-100" v-bind:style="{ 'background-color': list.color }" v-on:click="increaseQtd(item)"><i class="fas fa-plus text-white"/></button>
            </div>
          </div>
          <!------------>

          <!----Remover---->
          <div class="col-1">
            <button v-on:click="deleteItem(item.id)"><i class="fas fa-trash"/></button>
          </div>
          <!-------------->
        </div>
      </div>
    </div>
  <!------------------>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from '@/router';

@Component
export default class List extends Vue {
  private filter: string = "todas";
  private filterControl = {
    hasEvento: 0,
    hasLembrete: 0,
    hasMeta: 0,
    hasEmAndamento: 0,
    hasConcluida: 0
  };
  private lastValidQtd: number = 0;

  private list: any = {
    id: -1,
    title: "",
    description: "",
    color: "",
    listItems: []
  };
  private listItemForm = {
    description: "",
    type: "lembrete",
    isDone: false
  };

  constructor() {
    super();
    const listId = router.currentRoute.params['listId'];
    this.axios.get('http://localhost:1337/list/' + listId, {
      headers: { Authorization: "token " + Vue.prototype.userToken }
    }).then(response => {
      this.list['id'] = response.data['id'];
      this.list['title'] = response.data['title'];
      this.list['description'] = response.data['description'];
      this.list['color'] = response.data['color'];
      this.list['listItems'] = response.data['listItems'];

      for (const item of this.list.listItems) {
        if (item.isDone)
          this.filterControl.hasConcluida++;
        else
          this.filterControl.hasEmAndamento++;
        if (item.type == 'evento')
          this.filterControl.hasEvento++;
        if (item.type == 'lembrete')
          this.filterControl.hasLembrete++;
        if (item.type == 'meta')
          this.filterControl.hasMeta++;
      }
    });
  }

  filterFunc () {
    if (this.filter === 'todas')
      return this.list.listItems.length === 0;
    if (this.filter === 'concluidas')
      return this.filterControl.hasConcluida === 0;
    if (this.filter === 'emandamento')
      return this.filterControl.hasEmAndamento === 0;
    if (this.filter === 'evento')
      return this.filterControl.hasEvento === 0;
    if (this.filter === 'lembrete')
      return this.filterControl.hasLembrete === 0;
    if (this.filter === 'meta')
      return this.filterControl.hasMeta === 0;
  }

  debug() {
    console.log(this.list.listItems, this.list.listItems.find(item => item.isDone) !== undefined);
  }

  createListItem(listId: number) {
    this.axios
        .post("http://localhost:1337/list/createListItem/" + listId.toString(), this.listItemForm, {
          headers: { Authorization: "token " + Vue.prototype.userToken }
        })
        .then(response => {
          this.list.listItems.push(response.data);

          if (response.data.isDone)
            this.filterControl.hasConcluida++;
          else
            this.filterControl.hasEmAndamento++;
          if (response.data.type == 'evento')
            this.filterControl.hasEvento++;
          if (response.data.type == 'lembrete')
            this.filterControl.hasLembrete++;
          if (response.data.type == 'meta')
            this.filterControl.hasMeta++;
        });
  }

  colorChange(color: string) {
    this.list.color = color;
  }

  deleteItem(itemId: number) {
    this.axios
        .delete("http://localhost:1337/listItem/" + itemId.toString() , {
          headers: { Authorization: "token " + Vue.prototype.userToken }})
        .then(response => {
          const listListItemIndex = this.list.listItems.findIndex((item: any) => item.id === itemId);
          if (this.list.listItems[listListItemIndex].isDone)
            this.filterControl.hasConcluida--;
          else
            this.filterControl.hasEmAndamento--;
          if (this.list.listItems[listListItemIndex] == 'evento')
            this.filterControl.hasEvento--;
          if (this.list.listItems[listListItemIndex] == 'lembrete')
            this.filterControl.hasLembrete--;
          if (this.list.listItems[listListItemIndex] == 'meta')
            this.filterControl.hasMeta--;

          this.list.listItems.splice(listListItemIndex, 1);
        });
  }

  updateList() {
    this.axios.patch('http://localhost:1337/list/' + this.list.id.toString(), {
      title: this.list.title,
      description: this.list.description,
      color: this.list.color
    }, {
      headers: { Authorization: "token " + Vue.prototype.userToken }
    }).then();
  }

  updateListItem(listItem: any, attribute: string) {
    const obj = {};
    obj[attribute] = listItem[attribute];
    this.axios.patch('http://localhost:1337/list/updateListItem/' + listItem.id.toString(), obj, {
      headers: { Authorization: "token " + Vue.prototype.userToken }
    }).then(response => {
      if (attribute == 'isDone') {
        if (response.data.isDone) {
          this.filterControl.hasEmAndamento--;
          this.filterControl.hasConcluida++;
        }
        else {
          this.filterControl.hasEmAndamento++;
          this.filterControl.hasConcluida--;
        }
      }
    });
  }

  increaseQtd(listItem: any) {
    if(listItem.currentQtd + 1 <= listItem.maxQtd) {
      listItem.currentQtd++;
      this.updateListItem(listItem, 'currentQtd');
    }
  }

  decreaseQtd(listItem: any) {
    if(listItem.currentQtd - 1 >= 0){
      listItem.currentQtd--;
      this.updateListItem(listItem, 'currentQtd');
    }
  }

  validateQtd(listItem: any, value: string) {
    console.log(this.lastValidQtd);
    if(value === 'current'){
      if(listItem.currentQtd == '' || listItem.currentQtd < 0 || listItem.currentQtd > listItem.maxQtd) listItem.currentQtd = this.lastValidQtd;
      else this.updateListItem(listItem, 'currentQtd');
    }

    else{
      if(listItem.maxQtd == '' || listItem.maxQtd < 0 || listItem.currentQtd > listItem.maxQtd) listItem.maxQtd = this.lastValidQtd;
      else this.updateListItem(listItem, 'maxQtd');
    }
  }

  updateQtd(qtd: number) {
    this.lastValidQtd = qtd;
  }
}
</script>

<style scoped>
.py-0-35 {
  padding-top: 0.35rem;
  padding-bottom: 0.35rem;
}

.focus-purple:focus {
  border-color: #5a54ff !important;
}

.main-index-vh {
  height: 91.7vh;
}

.mt-0-2rem {
  margin-top: 0.2rem;
}

@media (max-width: 768px) {
  .w-md-25 {
    width: 25% !important;
  }

  .w-md-75 {
    width: 75% !important;
  }
}

.flex-basis-100 {
  flex-basis: 100%;
}

.min-width-23-5 {
  min-width: 23.5%;
}

input.form-control {
  line-height: 1rem;
  border-top: 0;
  border-left: 0;
  border-right: 0;
}

.font-weight-semibold {
  font-weight: 600 !important;
}

.text-lg {
  font-size: 1.125rem !important;
}

.hover-primary:hover {
  color: #007bff !important;
}

.py-16 {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.py-36 {
  padding-top: 9rem;
  padding-bottom: 9rem;
}

.px-16 {
  padding-left: 4rem;
  padding-right: 4rem;
}

.mb-20 {
  margin-bottom: 5rem;
}

.mt-16 {
  margin-top: 4rem;
}

.mt-36 {
  margin-top: 9rem;
}

.no-outline {
  border: none !important;
}

.purple-600 {
  background-color: #805ad5;
}

.teal-500 {
  background-color: #38b2ac;
}
</style>
