<template>
    
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class List extends Vue {
    private listItems: any[] = [];

    private listItemForm = {
      description: "";
      type: "";
      isDone: "";
    }

    private addListForm = {
      title: "",
      description: "",
      color: ""
    };

    constructor() {
      super();
      this.axios
        .get("http://localhost:1337/list/getListData/", {headers: {Authorization: 'token ' + Vue.prototype.userToken}})
        .then(response => {
          this.addListForm.title = response.data.title;
          this.addListForm.description = response.data.description;
          this.addListForm.color = response.data.color;
          for(let listItem of response.data.listItems) {
              this.listItems.push(listItem);
          }
        });
    }
}

</script>

<style scoped></style>