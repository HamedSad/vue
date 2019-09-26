<template>
  <div>

    <div class="form">

      <div class="form-group">
        <label>Nom *</label>
        <input class="input" placeholder="NomAdd"  v-model="newSport.name"/>
      </div>
      <div class="error" v-if="!$v.newSport.name.required  && !$v.newSport.name.$error">Le champs Nom doit être rempli</div>
      <div class="error" v-if="!$v.newSport.name.minLength">Le champs doit comporter au minimum 3 caractères</div>
      <br />
      <br />


      <div class="form-group">
        <label>Nombre de joueurs *</label>
        <input placeholder="Nombre de joueurs" v-model="newSport.players" />   
      </div>
      <div class="error"  v-if="!$v.newSport.players.required">Le champs Nombre de joueur doit être rempli</div>
      <div class="error" v-if="!$v.newSport.players.numeric">Le champs ne doit comporter que des chiffres</div>
      <br />
      <br />

      <div class="form-group">
        <label>Terrain *</label>
        <input class="input" placeholder="Terrain" v-model="newSport.field" />
      </div>
      <div class="error" v-if="!$v.newSport.field.required">Le champs Terrain doit être rempli</div>
      <div class="error" v-if="!$v.newSport.field.minLength">Le champs doit comporter au minimum 3 caractères</div>
      <br />
      <br />

      <div class="form-group">
        <label>Description *</label>
        <input class="input" placeholder="Description" v-model="newSport.type" />
      </div>
      <div class="error" v-if="!$v.newSport.type.required">Le champs Description doit être rempli</div>
      <div class="error" v-if="!$v.newSport.type.minLength">Le champs doit comporter au minimum 3 caractères</div>
      <br />
      <br />
      
      <div class="form-group">
        <label>Détail *</label>
        <textarea rows="5" cols="33" class="textarea" placeholder="Détail" v-model="newSport.detail" />
      </div>
      <div class="error" v-if="!$v.newSport.detail.required">Le champs Détail doit être rempli</div>
      <div class="error" v-if="!$v.newSport.detail.minLength">Le champs doit comporter au minimum 10 caractères</div>
      <br />
      <br />
      
      

      <button @click="hideSportForm">Annuler</button>
      <!-- Lorsque je clique sur ajouter, j'appel ma fonction emettreNouveauSport :disabled="$v.$invalid"-->
      <button  @click.prevent="emettreNouveauSport">{{newSportLabel}}</button>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength, numeric } from "vuelidate/lib/validators";

export default {
  name: "FormAddSport",
  props: [],

  data: function() {
    return {
      newSport: {
      }
    };
  },

  validations: {
    newSport: {
      name: {
        required,
        minLength: minLength(3)
      },

      players: {
        required,
        maxLength: maxLength(2),
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

<style>

.error{
  color: red;
}

.form {
  padding: 30px;
}

label {
  padding: 30px;
}

.input {
  width: 100px;
}
</style>