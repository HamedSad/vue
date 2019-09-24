<template>
  <div class="sport">
    <div class="pic">
      <img :src="sport.picture" />
    </div>

    <div class="description">
      <h1>{{sport.name}}</h1>
      <h2>{{sport.type}}</h2>
      <p>{{sport.detail}}</p>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import Vue from 'vue';
import VueMq from 'vue-mq';


export default {
  name: "Sport",

  props: ["sport"],

  data: function() {
    return {};
  },

};
</script>

<style>
.sport {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
}

.description{
  padding: 20px;
}

.pic img {
  height: 150px;
  weight: 150px;
  margin: 20px;
}

@media screen and (max-width: 500px) {
  .sport{
    display: flex;
    flex-direction: column;
    };     
  p{
    text-align: left
   }    
   h1, h2{
    text-align: center
   } 
   .pic{
    text-align: center 
   }
  
}
</style>