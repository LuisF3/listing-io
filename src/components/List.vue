<template>
  <div class="mx-auto md:w-4/5 p-4">
    <!--Informações gerais-->
    <div class="row">
      <div class="col col-md-8 col-xl-4 shadow-sm border container p-4 my-4">
        <h4 class="mb-3 font-weight-semibold text-secondary text-center">
          Informações gerais
        </h4>
        <div class="row align-items-center pr-2">
          <label class="col-12 col-md-4 font-weight-bold" for="title"
            >Título:
          </label>
          <input
            class="col-12 col-md-8 form-control mb-3"
            type="text"
            id="title"
          />
          <label class="col-12 col-md-4 font-weight-bold" for="listDescription"
            >Descrição:</label
          >
          <input
            class="col-12 col-md-8 form-control mb-3"
            type="text"
            id="listDescription"
          />
          <label class="col-12 col-md-4 font-weight-bold">Cor: </label>
          <span class="col-12 col-md-8 d-flex justify-content-center mb-3">
            <button
              type="button"
              class="rounded-pill bg-primary mr-3"
              v-on:click="addListForm.color = '#007bff'"
              style="height: 25px; width: 25px;"
            />
            <button
              type="button"
              class="rounded-pill bg-warning mr-3"
              v-on:click="addListForm.color = '#ffc107'"
              style="height: 25px; width: 25px;"
            />
            <button
              type="button"
              class="rounded-pill bg-success mr-3"
              v-on:click="addListForm.color = '#28a745'"
              style="height: 25px; width: 25px;"
            />
            <button
              type="button"
              class="rounded-pill bg-danger mr-3"
              v-on:click="addListForm.color = '#dc3545'"
              style="height: 25px; width: 25px;"
            />
            <button
              type="button"
              class="rounded-pill purple-600 mr-3"
              v-on:click="addListForm.color = '#805ad5'"
              style="height: 25px; width: 25px;"
            />
            <button
              type="button"
              class="rounded-pill teal-500"
              v-on:click="addListForm.color = '#38b2ac'"
              style="height: 25px; width: 25px;"
            />
          </span>
          <span class="col-12 text-center">
            <button
              class="btn btn-primary rounded-pill mt-2 font-weight-semibold"
              type="button"
            >
              Salvar alterações
            </button>
          </span>
        </div>
      </div>
    </div>
    <!---------------------->

    <!--Formulário de item da lista-->
    <div class="row">
      <div class="col col-md-8 col-xl-4 shadow-sm border container p-4 my-4">
        <h4 class="mb-3 font-weight-semibold text-secondary text-center">
          Nova tarefa
        </h4>
        <div class="row align-items-center pr-2">
          <label class="col-12 col-md-4 font-weight-bold" for="description"
            >Descrição:</label
          >
          <input
            class="col-12 col-md-8 form-control mb-3"
            type="text"
            id="description"
          />
          <label class="col-12 col-md-4 font-weight-bold" for="type"
            >Categoria:</label
          >
          <select
            class="col-12 col-md-8 form-control mb-3 text-center"
            id="type"
          >
            <option value="lembrete">Lembrete</option>
            <option value="evento">Evento</option>
            <option value="meta">Meta</option>
          </select>
          <label class="col-12 col-md-4 font-weight-bold" for="createIsDone"
            >Concluído:</label
          >
          <select
            class="col-12 col-md-8 form-control mb-3 text-center"
            id="createIsDone"
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
          <span class="col-12 text-center">
            <button
              class="btn btn-primary rounded-pill mt-2 font-weight-semibold"
              type="button"
            >
              Adicionar
            </button>
          </span>
        </div>
      </div>
      <!------------------------------->
    </div>

    <!--Lista de itens-->
    <div class="col-md-7 container p-4 my-4">
      <h4 class="mb-4 font-weight-semibold text-secondary text-center">
        Minhas tarefas
      </h4>

      <div>
        <select
            class="col-12 text-center bg-primary rounded text-white font-weight-semibold py-2"
            id="filter"
          >
            <option value="lembrete">Todas</option>
            <option value="lembrete">Concluídas</option>
            <option value="lembrete">Em andamento</option>
            <option value="lembrete">Lembretes</option>
            <option value="evento">Eventos</option>
            <option value="meta">Metas</option>
          </select>
      </div>

      <div class="container-fluid pb-2">
        <div class="bg-light my-2 py-2 row rounded">
          <div class="col-5 text-truncate">
            <input type="checkbox" />
            <span class="ml-2 hover-primary"
              >Descrição de lembrete em andamento</span
            >
          </div>
          <div class="col-6"></div>
          <div class="col-1">
            <button><i class="fa-trash" /></button>
          </div>
        </div>
        <div class="bg-light my-2 py-2 row rounded">
          <div class="col-5 text-truncate">
            <input type="checkbox" />
            <span
              class="ml-2 text-secondary"
              style="text-decoration: line-through;"
              >Descrição de lembrete concluído</span
            >
          </div>
          <div class="col-6"></div>
          <div class="col-1">
            <button><i class="fa-trash" /></button>
          </div>
        </div>
        <div class="bg-light my-2 py-2 row rounded">
          <div class="col-5 text-truncate">
            <input type="checkbox" />
            <span class="ml-2 hover-primary"
              >Descrição de evento em andamento</span
            >
          </div>
          <div class="col-6 text-center">
            <input type="date" class="no-outline bg-light" />
          </div>
          <div class="col-1">
            <button><i class="fa-trash" /></button>
          </div>
        </div>
        <div class="bg-light my-2 py-2 row rounded">
          <div class="col-5 text-truncate">
            <input type="checkbox" />
            <span
              class="ml-2 text-secondary"
              style="text-decoration: line-through;"
              >Descrição de evento concluído</span
            >
          </div>
          <div class="col-6 text-center">
            <input type="date" class="no-outline bg-light" />
          </div>
          <div class="col-1">
            <button><i class="fa-trash" /></button>
          </div>
        </div>
        <div class="bg-light my-2 py-2 row rounded">
          <div class="col-5 text-truncate">
            <input type="checkbox" />
            <span class="ml-2 hover-primary"
              >Descrição de meta em andamento</span
            >
          </div>
          <div class="col-6">
            <div class="row container">
              <button class="bg-primary" />
              <input type="number" class="border" />
              <span class="px-2">/</span>
              <input type="number" class="border" />
              <button class="bg-primary" />
            </div>
          </div>
          <div class="col-1">
            <button><i class="fa-trash" /></button>
          </div>
        </div>
        <div class="bg-light my-2 py-2 row rounded">
          <div class="col-5 text-truncate">
            <input type="checkbox" id="isDone" />
            <span
              class="ml-2 text-secondary"
              style="text-decoration: line-through;"
              >Descrição de meta concluída</span
            >
          </div>
          <div class="col-6">
            <div class="row container">
              <button type="button" class="bg-primary" />
              <input type="number" class="border" />
              <span class="px-2">/</span>
              <input type="number" class="border" />
              <button type="button" class="bg-primary" />
            </div>
          </div>
          <div class="col-1">
            <button><i class="fa-trash" /></button>
          </div>
        </div>
      </div>
    </div>
    <!------------------>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class List extends Vue {

  private listItems: any[] = [];

  private listItemForm = {
    description: "",
    type: "",
    isDone: ""
  };

  private addListForm = {
    title: "",
    description: "",
    color: ""
  };

  constructor() {
    super();

    // this.axios
    //   .get("http://localhost:1337/list/getListData/", {
    //     headers: { Authorization: "token " + Vue.prototype.userToken }
    //   })
    //   .then(response => {
    //     this.addListForm.title = response.data.title;
    //     this.addListForm.description = response.data.description;
    //     this.addListForm.color = response.data.color;
    //     for (let listItem of response.data.listItems) {
    //       this.listItems.push(listItem);
    //     }
    //   });
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
