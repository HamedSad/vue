<template>
  <div>
    <div class="form">
      <label>
        <span>NameModify</span>
        <input type="text" maxlength="20" placeholder="nameModify" v-model="sport.name" />
      </label>

      <label>
        <span>Nombre de joueurs</span>
        <input type="number" maxlength="5" placeholder="players" v-model="sport.players" />
      </label>

      <label>
        <span>Terrain</span>
        <input type="text" maxlength="20" placeholder="Terrain" v-model="sport.field" />
      </label>

      <label>
        <span>Description</span>
        <input type="text" maxlength="20" placeholder="Description" v-model="sport.type" />
      </label>
    </div>

    <button @click="hideSportForm">Annuler</button>
    <!-- Lorsque je clique sur ajouter, j'appel ma fonction emettreNouveauSport -->
    <button @click="modifySport">Modifier {{sport.name}} :</button>
  </div>
</template>

<script>
export default {
  name: "FormModifySport",
  props: ["sportAModifier"],

  data: function() {
    return {
      sport: {}
    };
  },

  created() {
    this.sport = { ...this.sportAModifier };
  },

  methods: {
    hideSportForm() {
      this.$emit("hideFormModify");
    },

    modifySport() {
      this.$emit("modification", this.sport);
    }
  }
};
</script>