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
                  <div @click= "zoneSelect(index)" class = "roundBtn btn-large" >
                    {{zoneInfo[index].name}}
                  </div>
              </v-col>
              <v-col @click= "allSelect" class= "d-flex justify-center"  cols = "6" sm ="3">
                  <div class = "roundBtn btn-large">
                    <v-icon>mdi-all-inclusive</v-icon> 
                     ALL
                  </div>
              </v-col>
          </v-row>
      </div>


     <v-navigation-drawer app temporary  v-model = "leftDrawer">
            <div class= "d-flex flex-column align-center" >
                <v-avatar size = '100'> 
                    <v-icon color = 'primary' x-large>mdi-audio-video</v-icon>
                </v-avatar>
                <div class = "title ">Video Source Select</div>
            </div>

            <v-divider></v-divider>
             
            <v-list nav  >
                <v-list-item v-for= "(item,index) in videoInputs" :key= "index" >
                    <v-list-item-icon ><v-icon> mdi-import</v-icon></v-list-item-icon>
                    <v-list-item-content >{{item}} </v-list-item-content>
                </v-list-item>
            </v-list>
      </v-navigation-drawer>

     </v-container>

  </div>
</template>

<script>

export default {
   name: 'Home',
   props:['zoneInfo','videoInputs'],
   data: () => ({
    leftDrawer: false
  }),

  methods: {

   zoneSelect: function(_index) {
      let zoneSelected = _index
      this.$emit('zoneSelected', zoneSelected)
      this.$router.push('/zones')

    },
    allSelect: function() {
       let zoneSelected = 'all'
       this.$emit('zoneSelected', zoneSelected)
       this.leftDrawer = true
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