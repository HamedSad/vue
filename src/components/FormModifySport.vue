<template>
  <div>
    <div class="form">
      

        <div class="form-group">
          <label for="name">Nom *</label>
          <input type="text" placeholder="NomModify" v-model="$v.sport.name.$model" />
          <div class="error" v-if="!$v.sport.name.required && $v.sport.name.$dirty">Le champ Nom doit être rempli</div>
        <div class="error" v-if="!$v.sport.name.minLength">Le champ doit comporter au minimum 3 caractères</div>
        <br />
        <br />
        </div>


        <div class="form-group">
          <label for="name">Nombre de joueurs *</label>
          <input placeholder="NomModify" v-model="$v.sport.players.$model" />
          <div class="error" v-if="!$v.sport.players.required && $v.sport.players.$dirty">Le champ joueurs doit être rempli</div>
        <div class="error" v-if="!$v.sport.players.numeric">Le champ ne doit comporter que des chiffres</div>
        <br />
        <br />
        </div>

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

import { required, minLength, numeric} from 'vuelidate/lib/validators'

export default {
  name: "FormModifySport",
  props: ["sportAModifier"],

  data: function() {
    return {
      sport: {
        name: "",
        players: "",
        field: "",
        type: "",
        detail: ""

      }
    };
  },

  validations: {
    sport: {
      name: {
        required,
        minLength: minLength(3)
      },

      players: {
        required,
        numeric
      },

      field: {
        required,
        minLength: minLength(3)
      },

      type: {
        required,
        minLength: minLength(3)
      },

      detail: {
        required,
        minLength: minLength(10)
      }
    }
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
