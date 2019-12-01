<template>
  <div id="app">
    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet"
    />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!--Navbar deslogada-->
    <nav
      v-if="!userToken"
      class="navbar navbar-expand-lg navbar-light bg-white shadow-md px-4"
    >
      <a class="navbar-brand font-semibold" v-on:click="index()">Listing.io</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a
              class="nav-link text-lg text-gray-600 hover:text-gray-800"
              href="#"
            />
          </li>
          <li class="nav-item">
            <a
              class="nav-link text-lg text-gray-600 hover:text-gray-800"
              href="#"
            />
          </li>
          <li class="nav-item">
            <a
              class="nav-link text-lg text-gray-600 hover:text-gray-800"
              href="#"
            />
          </li>
        </ul>

        <form class="form-inline my-2">
          <div class="text-center">
            <input
              class="mx-md-2 rounded-full py-0-35 px-3 mr-4 mb-2 mb-md-0 form-control"
              v-bind:class="{ 'is-invalid': incorrectLogin }"
              type="email"
              placeholder="E-mail"
              v-model="email"
            />
            <input
              class="mx-md-2 rounded-full py-0-35 px-3 mr-4 mb-2 mb-md-0 form-control"
              v-bind:class="{ 'is-invalid': incorrectLogin }"
              type="password"
              placeholder="Senha"
              v-model="password"
            />
          </div>
          <div class="mx-auto">
            <button
              class="form-control btn my-sm-0 text-lg text-gray-600 font-semibold hover:text-gray-800"
              type="button"
              v-on:click="login()"
            >
              Entrar
            </button>
            <button
              class="form-control btn my-sm-0 text-lg text-gray-600 font-semibold hover:text-gray-800"
              type="button"
              v-on:click="signup()"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </nav>

    <!-------------------->
    <!--Navbar logada-->
    <nav
      v-if="userToken"
      class="navbar navbar-expand-lg navbar-light bg-white shadow-md px-4"
    >
      <a class="navbar-brand font-semibold" v-on:click="index()">Listing.io</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="loggedNavbarSupportedContent">
        <form class="form-inline ml-auto">
          <button
            class="form-control btn my-sm-0 text-lg text-red-600 font-semibold hover:text-red-800"
            type="button"
            v-on:click="logout()"
          >
            Sair
          </button>
        </form>
      </div>
    </nav>
    <!-------------------->
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";

@Component
export default class App extends Vue {
  private email: string = "";
  private password: string = "";
  private incorrectLogin: boolean = false;

  login() {
    this.axios
      .post("http://localhost:1337/auth/", {
        username: this.email,
        password: this.password
      })
      .then(
        response => {
          Vue.prototype.userToken = response.data.token;
          router.replace("/private/");
          this.email = "";
          this.password = "";
        },
        error => {
          this.incorrectLogin = true;
          this.password = "";
        }
      );
  }
  logout() {
    Vue.prototype.userToken = "";
    router.replace("/");
  }
  index() {
    router.replace("/");
  }
  signup() {
    router.replace("/signup/");
  }
}
</script>

<style>
@import "~@fortawesome/fontawesome-free/css/all.min.css";

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

.bg-index {
  background-image: url("assets/index-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
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
