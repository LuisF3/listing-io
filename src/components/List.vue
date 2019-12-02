<template>
  <div class="container mx-auto md:w-4/5 p-4">
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
            <button class="btn text-white rounded-pill mt-2 font-weight-semibold" type="button" v-bind:style="{ 'background-color': list.color }">Salvar alterações</button>
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
            <button class="btn text-white border-0 rounded-pill mt-2 font-weight-semibold" type="button" v-on:click="createListItem(this.list.id)" v-bind:style="{ 'background-color': list.color }">Adicionar</button>
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
        <select class="col-12 rounded text-white font-weight-semibold py-2" id="filter" v-bind:style="{ 'background-color': list.color }" v-model="this.filter">
          <option value="todas" class="text-center">Todas</option>
          <option value="concluidas" class="text-center">Concluídas</option>
          <option value="emandamento" class="text-center">Em andamento</option>
          <option value="lembretes" class="text-center">Lembretes</option>
          <option value="eventos" class="text-center">Eventos</option>
          <option value="metas" class="text-center">Metas</option>
        </select>
      </div>

      <!-- Lista Vazia -->
      <div v-if="!listItems || listItems.length === 0" class="text-center text-primary border py-3">
        <span class="font-weight-bold">O filtro selecionado não resultou em nenhuma lista</span>
      </div>
      <!----------------->

      <div class="container-fluid pb-2">
        <div v-for="item in listItems" v-bind:key="item.id" class="bg-light my-2 py-2 row rounded">
          <!--Descricao-->
          <div class="col-5 text-truncate">
            <input type="checkbox" v-model="item.isDone"/>
            <span class="ml-2 hover-primary" v-if="!item.isDone">{{ item.description }}</span>
            <span class="ml-2 text-secondary" style="text-decoration: line-through;" v-if="item.isDone">{{ item.description }}</span>
          </div>
          <!------------>

          <!--Lembrete-->
          <div class="col-6" v-if="item.type ==='lembrete'"></div>
          <!------------>

          <!----Evento---->
          <div class="col-6" v-if="item.type === 'evento'" >
            <input type="date" class="no-outline bg-light"/>
          </div>
          <!-------------->

          <!----Meta---->
          <div class="col-6" v-if="item.type ==='meta'">
            <div class="container">
              <button type="button" class="bg-primary"><i class="fas fa-plus"/></button>
              <input type="number" class="border"/>
              <span class="px-2">/</span>
              <input type="number" class="border"/>
              <button type="button" class="bg-primary"><i class="fas fa-minus"/></button>
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
  private filter: string = "";
  private list: any = {};
  private listItemForm = {
    description: "",
    type: "",
    isDone: false
  };
  private listItems: any[] = [];

  constructor() {
    super();
    const listId = router.currentRoute.params['listId'];
    this.axios.get('http://localhost:1337/list/' + listId, {
      headers: { Authorization: "token " + Vue.prototype.userToken }
    }).then(response => {
      this.list['title'] = response.data['title'];
      this.list['description'] = response.data['description'];
      this.list['color'] = response.data['color'];
      this.list['listItems'] = response.data['listItems'];
      for(const item of this.list.listItems)
        this.listItems.push(item);
    });
  }

  debug() {
    console.log(this.listItemForm);
  }

  createListItem(listId: number) {
    this.axios
        .post("http://localhost:1337/list/" + listId.toString() + "/createListItem", {
          headers: { Authorization: "token " + Vue.prototype.userToken }
        })
        .then(response => {
          this.list.push(response.data);
          if(this.filter === 'todas') this.listItems.push(response.data);
          else if(this.filter === 'emandamento' && response.data['isDone'] === false) this.listItems.push(response.data);
          else if(this.filter === 'concluidas' && response.data['isDone'] === true) this.listItems.push(response.data);
          else if(this.filter === response.data['type']) this.listItems.push(response.data);
        });
  }

  colorChange(color: string) {
    this.list.color = color;
    //TODO Patch sempre que um atributo for alterado
  }

  deleteItem(itemId: number) {
    this.axios
        .delete("http://localhost:1337/listItem/" + itemId.toString() , {
          headers: { Authorization: "token " + Vue.prototype.userToken }})
        .then(response => {
          const listListItemIndex = this.list.listItems.findIndex((item: any) => item.id === itemId);
          const listItemIndex = this.listItems.findIndex((item: any) => item.id === itemId);
          console.log(listListItemIndex);
          console.log(listItemIndex);
          this.list.listItems.splice(listListItemIndex, 1);
          this.listItems.splice(listItemIndex, 1);
        });
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
