<template>
  <!--Formulário-->
  <div id="signup" class="container text-center border rounded shadow-sm mt-16">
    <div class="row">
      <div class="col-12 col-md-6 bg-primary py-12">
        <img
          src="../assets/signup.svg"
          style="width: 92%; height: 92%;"
          alt="Random image"
        />
      </div>
      <div class="col-12 col-md-6 py-12">
        <h3 class="mb-4 mt-5" style="font-size: 2rem;">Informações pessoais</h3>
        <form class="px-16">
          <div>
            <input
              class="bg-gray-300 rounded-pill py-1 m-2 px-3 border-2 focus-purple placeholder-gray-700"
              type="email"
              placeholder="E-mail"
              v-model="email"
            />
            <input
              class="bg-gray-300 rounded-pill py-1 m-2 px-3 border-2 focus-purple placeholder-gray-700"
              type="text"
              placeholder="Nome"
              v-model="name"
            />
            <input
              class="bg-gray-300 rounded-pill py-1 m-2 px-3 border-2 focus-purple placeholder-gray-700"
              type="text"
              placeholder="Nome de usuário"
              v-model="username"
            />
            <input
              class="bg-gray-300 rounded-pill py-1 m-2 px-3 border-2 focus-purple placeholder-gray-700"
              type="password"
              placeholder="Senha"
              v-model="password"
            />
          </div>
          <button
            type="button"
            class="btn btn-primary btn-md rounded-pill px-5 my-3 font-weight-semibold"
            v-on:click="register()"
          >
            Criar conta
          </button>
        </form>
      </div>
    </div>
  </div>
  <!-------------->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";

@Component
export default class App extends Vue {
  private email: string = "";
  private name: string = "";
  private username: string = "";
  private password: string = "";

  register() {
    console.log(this.email, this.name, this.username, this.password);
    this.axios
      .post("http://localhost:1337/register", {
        email: this.email,
        name: this.name,
        username: this.username,
        password: this.password
      })
      .then(response => {
        Vue.prototype.userToken = response.data.id;
        router.push('/private/');
      });
  }
}
</script>
