<template>
  <div>
    <div class="form">
      <label>
        <span>Nom : </span>
        <input type="text" maxlength="20" placeholder="NomAdd" v-model="newSport.name" />
      </label>

      <label>
        <span>Nombre de joueurs : </span>
        <input type="number" maxlength="5" placeholder="Nombre de joueurs" v-model="newSport.players" />
      </label>

      <label>
        <span>Terrain : </span>
        <input type="text" maxlength="20" placeholder="Terrain" v-model="newSport.field" />
      </label>

      <label>
        <span>Description : </span>
        <input type="text" maxlength="20" placeholder="Description" v-model="newSport.type" />
      </label>
    </div>

      <label>
        <span>Détail : </span>
        <input type="textarea" placeholder="Détail" v-model="newSport.detail" />
      </label>

    <button @click="hideSportForm">Annuler</button>
    <!-- Lorsque je clique sur ajouter, j'appel ma fonction emettreNouveauSport -->
    <button @click="emettreNouveauSport">{{newSportLabel}}</button>
  </div>
</template>

<script>
export default {
  name: "FormAddSport",
  props: [],

  data: function() {
    return {
      newSport: {}
    };
  },

  computed: {
    newSportLabel() {
      if (this.newSport.name == null || this.newSport.field == null) {
        return `Ajouter`;
      } else {
        return `Ajouter ${this.newSport.name} : ${this.newSport.field}`;
      }
    }
  },

  methods: {
    // Ajouter un sport
    // 1 instanciation, 2 on push, 3 on reset le formulaire, 4 on ferme le formulaire
    emettreNouveauSport() {
      const activity = this.newSport;

      this.resetNewSport();
      // J'emmet un évenement vers le composant parent.
      // Le nom de l'évenement s'appelle addSport et sa valeur activity
      this.$emit("addSport", activity);
    },
    resetNewSport() {
      this.newSport = {};
    },
    hideSportForm() {
      this.$emit("hideForm");
    }
  }
};
</script>