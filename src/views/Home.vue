<template>
   <div class="home">

     <v-container>
        <!-- <div class = "myRow"  > 
          <v-img 
              src = '../assets/widowFletchers.png'    
              max-height="80"
              max-width="100"
              contain>
          </v-img> 
      </div> -->
      <div class = 'mt-5'>
          <v-row justify= "center" >
              <v-col class= "d-flex justify-center" cols = "6" sm ="3"  v-for="(item,index) in zoneNamesToDisplay" :key="index">
                  <div class = "roundBtn btn-large" >
                    {{zoneNamesToDisplay[index]}}
                  </div>
              </v-col>
              <v-col class= "d-flex justify-center"  cols = "6" sm ="3">
                  <div class = "roundBtn btn-large">
                    <v-icon>mdi-all-inclusive</v-icon> 
                     ALL
                  </div>
              </v-col>

              <!-- <v-col class= "myColumn"  cols = "6" sm ="3" >1</v-col>
              <v-col class= "myColumn"  cols = "6" sm ="3" >2</v-col>
              <v-col class= "myColumn"  cols = "6" sm ="3" >3</v-col>
              <v-col class= "myColumn"  cols = "6" sm ="3" >4</v-col>
              <v-col class= "myColumn"  cols = "6" sm ="3" >5</v-col>
              <v-col class= "myColumn"  cols = "6" sm ="3" >6</v-col>
              <v-col class= "myColumn"  cols = "6" sm ="3" >7</v-col>
              <v-col class= "myColumn"  cols = "6" sm ="3" >8</v-col> -->
          </v-row>
      </div>


        

      <!-- <div class = "zone" >
          <div @click= "showZone(item,index)" class = "roundBtn btn-large" v-for="(item,index) in zoneNamesToDisplay" :key="index">{{zoneNamesToDisplay[index]}}</div>
          <div @click= "switchAll" class="roundBtn btn-large "><v-icon>mdi-all-inclusive</v-icon>  ALL</div>
     </div> -->
     </v-container>

  </div>
</template>

<script>

export default {
   data: () => ({
     zoneNamesToDisplay: ['Den','Fletchers','Bar']
  }),

  methods: {
   test: function() {
      
    },

  }
}

</script>

<style scoped>
.home{
  display:flex;
  position:relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height:80vh;
  /* border:1px solid red ; */

}
.roundBtn{
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   color: #745550;
   border:5px solid #745550;
   font-size: 1.5rem;
   height:150px;
   width:150px;
   border-radius: 50%;
}
.roundBtn:hover {
  color:white;
  background-color:#745550 !important;
}


</style>