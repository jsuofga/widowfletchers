<template>
   <div class="home">

      <v-container>
      <div class= "d-flex justify-center" > 
          <v-img 
              src = '../assets/widowFletchers.png'    
              max-height="120"
              max-width="120"
              contain>
          </v-img> 
      
      </div>  
      <div >
          <v-row justify= "center" >
              <v-col class= "d-flex justify-center" cols = "6" sm ="3"  v-for="(item,index) in zoneInfo" :key="index">
                  <div class = "roundBtn btn-large" @click= "zoneSelect(index)">
                    {{zoneInfo[index].name}}
                  </div>
              </v-col>
              <v-col class= "d-flex justify-center"  cols = "6" sm ="3">
                  <div class = "roundBtn btn-large">
                    <v-icon>mdi-all-inclusive</v-icon> 
                     ALL
                  </div>
              </v-col>
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
   name: 'Home',
   props:['zoneInfo'],
   data: () => ({
    
  }),

  methods: {
   test:function(){
     console.log(this.zoneInfo)
   },
   zoneSelect: function(_index) {
      let zoneSelected = _index
      this.$emit('zoneSelected', zoneSelected)
      this.$router.push('/zones')

    },

  }
}

</script>

<style scoped>
.home{
  display:flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height:65vh;
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