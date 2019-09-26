<template>
  <div>
    <h2>Avec getters, il y a {{sportCount}} sports dans la liste</h2>
    <table>
      <thead>
        <tr>
          <!--v-for pour obtenir le contenu de la variable entitled v-if="sports.length"-->
          <th v-for="titled in entitled">{{titled}}</th>
        </tr>
      </thead>

      <tbody>
        <!--v-for pour obtenir sous forme de liste les sports du sport-->
        <tr v-for="(sport, index) in sports">
          <button @click="showSport(sport.id)">
            <td>{{sport.name}}</td>
          </button>

          <td>{{sport.players}}</td>
          <td>{{sport.field}}</td>
          <td>{{sport.type}}</td>
          <td>
            <!-- Lorsque je clique sur le bouton supprimer, il appliquera la methode deleteSport -->
            <button @click="supprimerSport(index)">Supprimer {{sport.name}}</button>
            <button @click="editSport(index)">Modifier {{sport.name}}</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showOneSport">
      <Sport :sport="getOneSport"></Sport>
      <button @click="hideSport">Fermer</button>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import Sport from "./Sport";

export default {
  name: "ListSports",
  components: {
    Sport
  },
  props: ["sports"],

  data: function() {
    return {
      showOneSport: false,
      entitled: [
        "Sport",
        "Nombre de joueur",
        "Terrain",
        "Description",
        "Actions"
      ]
    };
  },

  computed: {
    // compteurSports() {
    //   if (this.sports.length > 1) {
    //     return `Il y a ${this.sports.length} sports dans la liste`;
    //   } else if (this.sports.length == 1) {
    //     return `Il y a ${this.sports.length} sport dans la liste`;
    //   } else {
    //     return `Pas de sport dans la liste`;
    //   }
    // }
    ...mapGetters(["sportCount", "getOneSport"])
  },

  methods: {

    ...mapActions([
      "retrieveOneSport",
    ]),

    supprimerSport(index) {
      this.$emit("delSport", index);
    },
    editSport(index) {
      this.$emit("modifySport", index);
    },
    showSport(id) { 
      this.showOneSport = true;
      this.retrieveOneSport(id);
    },
    hideSport() {
      this.showOneSport = false;
    }

    
  }
};
</script>