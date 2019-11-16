<template>
  <main class="md:w-3/4 p-4 container">
    <div class="row">
      <div class="col col-md-8 col-xl-4 shadow border container p-4 my-4">
        <div class="row align-items-center">
          <label class="col-12 col-md-5 font-weight-bold" for="title">Título:
          </label>
          <input v-model="addListForm.title" class="col-12 col-md-7 form-control mb-3" type="text" id="title"/>
          <label class="col-12 col-md-5 font-weight-bold" for="description"
            >Descrição:
          </label>
          <input v-model="addListForm.description" class="col-12 col-md-7 form-control mb-3" type="text" id="description" />
          <label class="col-12 col-md-5 font-weight-bold">Cor: </label>
          <span class="col-12 col-md-7 d-flex justify-content-around mb-3">
            <button type="button" class="rounded-pill bg-primary" v-on:click="addListForm.color = '#007bff'" style="height: 25px; width: 25px;"></button>
            <button type="button" class="rounded-pill bg-warning" v-on:click="addListForm.color = '#ffc107'" style="height: 25px; width: 25px;"></button>
            <button type="button" class="rounded-pill bg-success" v-on:click="addListForm.color = '#28a745'" style="height: 25px; width: 25px;"></button>
            <button type="button" class="rounded-pill bg-danger" v-on:click="addListForm.color = '#dc3545'" style="height: 25px; width: 25px;"></button>
            <button type="button" class="rounded-pill purple-600" v-on:click="addListForm.color = '#805ad5'" style="height: 25px; width: 25px;"></button>
            <button type="button" class="rounded-pill teal-500" v-on:click="addListForm.color = '#38b2ac'" style="height: 25px; width: 25px;"></button>
          </span>
          <span class="col-12 text-center">
            <button class="btn btn-primary" type="button" v-on:click="addList()">Adicionar lista</button>
          </span>
        </div>
      </div>
    </div>
    <!--Titulo-->
    <div class="row">
      <h2 class="col mb-4" style="font-size: xx-large">Suas listas</h2>
    </div>
    <!---------->
    <!--Itens-->
    <div class="w-100 row">
      <!--Item-->
      <div class="pb-0 col-lg-3 col-12 mt-4">
        <div v-for="list in lists"
          class="rounded-lg font-semibold text-md text-white px-3 py-2 d-flex" :style="background-color: {list.color}"
        >
          <span class="mr-auto">{list.title}</span>
          <i class="fas fa-edit text-white pr-1"></i>
          <i class="fas fa-times text-white"></i>
        </div>
        <!--Checklist-->
        <div v-for="listItem in listItems"
          class="mt-0-2rem d-flex flex-column py-2 px-3 bg-gray-200 rounded-lg"
        >
          <span class="text-sm overflow-hidden">{listItem.description}</span>
        </div>
      </div>
      <!-------->
    </div>
    <!--------->
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AllLists extends Vue {
  private addListForm = {
    title: "",
    description: "",
    color: ""
  };

  constructor() {
    super();
  }

  addList() {
    console.log(this.addListForm);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
