<template>
  <div>
    <div class="form">
      <label>
        <span>NomModify </span>
        <input type="text" maxlength="20" placeholder="NomModify" v-model="sport.name" />
      </label>
      <br />
      <br />

      <label>
        <span>Nombre de joueurs </span>
        <input type="number" maxlength="5" placeholder="Nombre de joueurs" v-model="sport.players" />
      </label>
      <br />
      <br />

      <label>
        <span>Terrain </span>
        <input type="text" maxlength="20" placeholder="Terrain" v-model="sport.field" />
      </label>
      <br />
      <br />

      <label>
        <span>Description </span>
        <input type="text" maxlength="20" placeholder="Description" v-model="sport.type" />
      </label>
      <br />
      <br />


      <label>
        <span>Detail </span>
        <textarea rows="5" cols="33" placeholder="Detail" v-model="sport.detail" />
      </label>
      <br />
      <br />


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
