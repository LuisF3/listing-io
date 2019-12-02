<template>
  <main class="md:w-3/4 p-4 container" v-on:click="print()">
    <div class="row">
      <div class="col col-md-8 col-xl-4 shadow border container p-4 my-4">
        <div class="row align-items-center">
          <label class="col-12 col-md-5 font-weight-bold" for="title"
            >Título:
          </label>
          <input
            v-model="addListForm.title"
            v-bind:class="{
              'is-invalid': incorrectAddListForm && addListForm.title === ''
            }"
            class="col-12 col-md-7 form-control mb-3"
            type="text"
            id="title"
          />
          <label class="col-12 col-md-5 font-weight-bold" for="description"
            >Descrição:
          </label>
          <input
            v-model="addListForm.description"
            class="col-12 col-md-7 form-control mb-3"
            type="text"
            id="description"
          />
          <label class="col-12 col-md-5 font-weight-bold">Cor: </label>
          <span class="col-12 col-md-7 d-flex justify-content-around mb-3">
            <button
              type="button"
              class="rounded-pill bg-primary"
              v-on:click="addListForm.color = '#007bff'"
              style="height: 25px; width: 25px;"
            />
            <button
              type="button"
              class="rounded-pill bg-warning"
              v-on:click="addListForm.color = '#ffc107'"
              style="height: 25px; width: 25px;"
            />
            <button
              type="button"
              class="rounded-pill bg-success"
              v-on:click="addListForm.color = '#28a745'"
              style="height: 25px; width: 25px;"
            />
            <button
              type="button"
              class="rounded-pill bg-danger"
              v-on:click="addListForm.color = '#dc3545'"
              style="height: 25px; width: 25px;"
            />
            <button
              type="button"
              class="rounded-pill purple-600"
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
              class="btn btn-primary rounded-pill font-weight-semibold mt-2"
              type="button"
              v-on:click="addList()"
            >
              Adicionar lista
            </button>
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
      <div
        v-if="!allLists || allLists.length === 0"
        class="text-center w-100 mt-4"
      >
        <h3>Você não tem nenhuma lista!</h3>
      </div>
      <!--Item-->
      <div
        v-for="list in allLists"
        v-bind:key="list.id"
        class="pb-0 col-lg-3 col-12 mt-4"
      >
        <div
          class="rounded-lg font-semibold text-md text-white px-3 py-2 d-flex align-items-center"
          v-bind:style="{ 'background-color': list.color }"
        >
          <a class="mr-auto hover-underline" v-on:click="goToList(list.id)">{{ list.title }}</a>
          <i v-on:click="deleteList(list.id)" class="fas fa-times text-white" />
        </div>
        <!-- Sem items-->
        <div
          v-if="!list.listItems || list.listItems.length === 0"
          class="mt-0-2rem d-flex flex-column py-2 px-3 bg-gray-200 rounded-lg"
        >
          <span class="text-sm overflow-hidden"
            >Esta lista ainda não possui nenhum item</span
          >
        </div>
        <!-------------->
        <!--Checklist-->
        <div
          v-for="listItem in list.listItems"
          v-bind:key="listItem.id"
          class="mt-0-2rem d-flex flex-column py-2 px-3 bg-gray-200 rounded-lg"
        >
          <span v-if="!list.listItems" class="text-sm overflow-hidden"
            >Esta lista ainda não possui nenhum item</span
          >
          <span
            class="text-sm overflow-hidden"
            v-bind:class="{ 'crossed-text': listItem.isDone }"
            >{{ listItem.description }}
          </span>
        </div>
        <!------------>
      </div>
      <!-------->
    </div>
    <!-------->
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";

@Component
export default class AllLists extends Vue {
  private allLists: any[] = [];

  private addListForm = {
    title: "",
    description: "",
    color: "#007bff"
  };
  private incorrectAddListForm: boolean = false;

  constructor() {
    super();

    if (Vue.prototype.userToken === "") {
      router.replace("/");
      return;
    }

    this.axios
      .get("http://localhost:1337/list/getAll", {
        headers: { Authorization: "token " + Vue.prototype.userToken }
      })
      .then(response => {
        for (let list of response.data) this.allLists.push(list);
      });
  }

  addList() {
    if (this.addListForm.title === "") {
      this.incorrectAddListForm = true;
      return;
    }

    this.axios
      .post("http://localhost:1337/list", this.addListForm, {
        headers: { Authorization: "token " + Vue.prototype.userToken }
      })
      .then(response => this.allLists.push(response.data));

    this.incorrectAddListForm = false;
    // this.addListForm.title = "";
    // this.addListForm.description = "";
    // this.addListForm.color = "#007bff";
  }

  deleteList(id: number) {
    this.axios
      .delete("http://localhost:1337/list/" + id.toString(), {
        headers: { Authorization: "token " + Vue.prototype.userToken }
      })
      .then(response => {
        const itemIndex = this.allLists.findIndex(item => item.id === id);
        console.log(itemIndex);
        this.allLists.splice(itemIndex, 1);
      });
  }

  goToList(id: number) {
    router.push(id.toString());
  }

  print() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hover-underline:hover {
  text-decoration: underline;
}
.crossed-text {
  text-decoration: line-through;
}
</style>
