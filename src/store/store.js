import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

const state = {

    ListSports : [],
    OneSport: {}

    };
    // Pour récupérer les données
    const getters = {
      getAllSports : state => state.ListSports,
      sportCount : state => state.ListSports.length,

      //fonction findSportByIdport qui a pour paramettre state (qui va nous récupérer le contenu du state)
      //Puis cette fonction retourne une autre fonction qui a pour paramètre id et nous retournera 
      //l'index du sport désiré via la methode findIndex
      findSportIndex : (state) => (id) => {
        return state.ListSports.findIndex(ListSports => ListSports.id === id)
      },

      getOneSport : state => state.OneSport
      
    }
    
    const mutations = {
      //state par défaut
      //methode pour supprimer un sport de la liste
      deleteMutation(state, index){
        //creation d'un nouveau tableau depuis le tableau par défaut qui est déstructuré via les ...
        const newArraySports = [...state.ListSports]
        newArraySports.splice(index, 1);
        state.ListSports = newArraySports;
      },

      addMutation(state, newSport){
        const newArrayAddSport = [...state.ListSports];
        newArrayAddSport.push(newSport);
        state.ListSports = newArrayAddSport;
      },

      //Récupération de l'action modifyMutation
      modifyMutation(state, modifiedSport, indexSport){
        state.ListSports.splice(indexSport, 1, modifiedSport);     
      },
      //Récupération de l'action retriveListSports 
      setListSports(state, allSports){
        //On change le state avec le contenu des données récupérées
        state.ListSports = allSports;
      },
      setOneSport(state, sport){
        state.OneSport = sport;
      }

    }

    const actions = {
      // context par défaut
      //la methode delete qui permet de commit la mutation
      deleteSport({commit}, index){
        commit('deleteMutation', index)
        },

      add({commit}, newSport){
        commit('addMutation', newSport);
        },

      //creation de l'action modify qui va commit une mutation 'modifyMutation'
      modify({commit, getters}, sport){
        //Appel de la methode findSportIndex présente dans le getters
        const indexSport = getters.findSportIndex(sport.id); 
        commit('modifyMutation', sport, indexSport);
      },

      //Appel API     
      async retrieveListSports({commit}){
        try{
          //connexion à l'api 
          const response = await axios.get('http://localhost:3000');
          //Après la connexion, je récupère les données via response.data et commit une mutation 
          commit('setListSports', response.data)
        } catch(error) {
          // eslint-disable-next-line no-console
          console.log(error)
        }    
      },

      async retrieveOneSport({commit}, id){
        try{
          const response = await axios.get(`http://localhost:3000/${id}`);
          commit('setOneSport', response.data);
        }  catch(error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      }

    }   

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions   
})