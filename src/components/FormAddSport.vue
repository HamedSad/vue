<template>
  <div>
    <div class="form">

      <form> 

        <div class="form-group">
          <label for="name">Nom *</label>
          <input class="form-control" placeholder="NomAdd" v-model="$v.newSport.name.$model" /> 
        <div class="error" v-if="!$v.newSport.name.required && $v.newSport.name.$dirty">Le champ Nom doit être rempli</div>
        <div class="error" v-if="!$v.newSport.name.minLength">Le champ doit comporter au minimum 3 caractères</div>
        <br />
        <br />
        </div>

        <div class="form-group">
          <label>Nombre de joueurs *</label>
          <input class="form-control" placeholder="Nombre de joueurs" v-model="$v.newSport.players.$model" />
        </div>
        <div class="error" v-if="!$v.newSport.players.required && $v.newSport.players.$dirty" >Le champ Nombre de joueur doit être rempli</div>
        <div class="error" v-if="!$v.newSport.players.numeric" >Le champ ne doit comporter que des chiffres</div>
        <br />
        <br />

        <div class="form-group">
          <label>Terrain *</label>
          <input class="input" placeholder="Terrain" v-model="$v.newSport.field.$model" />
        </div>
        <div class="error" v-if="!$v.newSport.field.required && $v.newSport.field.$dirty">Le champ Terrain doit être rempli</div>
        <div class="error" v-if="!$v.newSport.field.minLength" >Le champ doit comporter au minimum 3 caractères</div>
        <br />
        <br />

        <div class="form-group">
          <label>Description *</label>
          <input class="input" placeholder="Description" v-model="$v.newSport.type.$model" />
        </div>
        <div class="error" v-if="!$v.newSport.type.required && $v.newSport.type.$dirty">Le champ Description doit être rempli</div>
        <div class="error" v-if="!$v.newSport.type.minLength" >Le champ doit comporter au minimum 3 caractères</div>
        <br />
        <br />

        <div class="form-group">
          <label>Détail *</label>
          <textarea rows="5" cols="33" class="textarea" placeholder="Détail" v-model="$v.newSport.detail.$model" />
        </div>
        <div class="error" v-if="!$v.newSport.detail.required && $v.newSport.detail.$model">Le champ Détail doit être rempli</div>
        <div class="error" v-if="!$v.newSport.detail.minLength" >Le champ doit comporter au minimum 10 caractères</div>
        <br />
        <br />

        <button @click="hideSportForm">Annuler</button>
        <!-- Lorsque je clique sur ajouter, j'appel ma fonction emettreNouveauSport -->
        <button type="submit" :disabled="$v.$invalid" @click="emettreNouveauSport">{{newSportLabel}}</button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, numeric } from "vuelidate/lib/validators";

export default {
  name: "FormAddSport",
  props: [],

  data: function() {
    return {
      newSport: {
        name: "",
        players: "",
        field: "",
        type: "",
        detail: ""
      },
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
    },
    submit() {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log('Formulaire invalide');
      } else {
        console.log('Envoyé');
      }
    }
  }
};
</script>

<style>
.error {
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