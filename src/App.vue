<template>
  <div id="app">
    <header>Sports Inconnus</header>

    <!-- @click appelle la methode showAddSport lorsque l'on clique sur le bouton -->
    <button v-if="!showCreationSport" @click="showAddSport">Ajouter un sport</button>

    <div v-if="showModificationSport">
      <FormModifySport :sportAModifier="getAllSports[modifierIndex]" @modification="updateSport"></FormModifySport>
    </div>

    <div>
      <!-- <span v-if="sportsList.length">{{sportsList.length}} sports dans la liste</span> -->
      <!-- <span v-else>Aucun sport dans la liste</span> -->
    </div>

    <div v-if="showCreationSport">
      <!-- J'écoute l'évenement qui s'appelle addSport, 
      j'appelle ma methode addNewSport avec en paramètre la valeur de l'évenement avec le mot clé $event qui est caché-->
      <FormAddSport @addSport="addNewSport($event)" @hideForm="hideAddSport($event)"></FormAddSport>
    </div>

    <div>
      <!-- Je bind v-bind = :  la prop sport avec la variable sports -->
      <listSports :sports="getAllSports" @delSport="deleteSport" @modifySport="modifierSport"></listSports>
    </div>
  </div>
</template>

<script>
// Import des composants

import ListSports from "./components/ListSports";
import FormAddSport from "./components/FormAddSport";
import FormModifySport from "./components/FormModifySport";
import axios from "axios";
import { log } from "util";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "app",
  components: {
    //Mise à disposition du composant
    ListSports,
    FormAddSport,
    FormModifySport
  },

  data: function() {
    return {
      showCreationSport: false,
      showModificationSport: false,
      modifierIndex: 0
    };
  },

  created() {
    this.retrieveListSports();
    this.retrieveOneSport();
  },

  computed: {
    ...mapGetters(["getAllSports", "getOneSport"])
  },

  // async created() {
  //   try {
  //     const response = await axios.get("http://localhost:3000");
  //     this.sportsList = response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   //  axios
  //   //     .get('http://localhost:3000')
  //   //     .then(response => (this.sportsList = response.data))
  //   //     .catch(error => console.log(error))
  // },

  methods: {
    //On met a disposition les actions
    ...mapActions([
      "deleteSport",
      "add",
      "modify",
      "retrieveListSports",
      "retrieveOneSport"
    ]),

    //Utulisation de la mutation en reprenant la methode deleteSport du composant listSports
    // et la methode delete du mapActions

    addNewSport(newSport) {
      this.add(newSport);
      this.hideAddSport();
    },

    toggleAddSport: () => {
      this.showCreationSport = this.showSport ? false : true;
    },
    hideAddSport() {
      this.showCreationSport = false;
    },
    showAddSport() {
      this.showCreationSport = true;
    },
    hideModifySport() {
      this.showModificationSport = false;
    },
    showModifySport() {
      this.showModificationSport = true;
    },

    modifierSport(index) {
      this.showModifySport();
    },

    updateSport(sport) {
      // methode qui modifie le tableau de base
      // this.sportsList = [...this.sportsList.slice(0, this.modifierIndex), sport, ...this.sportsList.slice(this.modifierIndex +1)]
      //this.sportsList.splice(this.modifierIndex, 1, sport);
      this.modify(sport);
      this.hideModifySport();
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
