<template>
   <div class="zones">
   
      <v-container>
      <div class= "d-flex justify-center" > 
          <!-- <v-img 
              src = '../assets/widowFletchers.png'    
              max-height="120"
              max-width="120"
              contain>
          </v-img>  -->
      
      </div>  
      <div >
          <v-row justify= "start" >
              <v-col class= "d-flex justify-center  mb-3" cols = "4" sm ="2"  v-for="(item,index) in tvList" :key="index">
                  <v-btn @click = "tvSelected(index)" large color= "primary">
                      {{tvList[index]}}
                  </v-btn>
        
              </v-col>

          </v-row>
      </div>

     </v-container>

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

  </div>
</template>

<script>

export default {
   name: 'Zones',
   props:['zoneInfo','zoneSelected','videoInputs'],
   data: () => ({
      leftDrawer : false,
      //videoInputs : ['dtv1','dtv2','apple tv']
  }),

  computed:{
    tvList:function(){
        const count = this.zoneInfo[this.zoneSelected].portEnd - this.zoneInfo[this.zoneSelected].portStart
        let tvs = []
        let title = this.zoneInfo[this.zoneSelected].name
        for(let i=0; i<= count; i++ ){
          tvs.push(`${title}${i+1}`)
        }
        return tvs
    },


  },
  methods: {
   tvSelected: function(_index) {
      // Open Video Input Select Left Drawer
       this.leftDrawer = true
      // TV selected from zone. 0= first TV in zone, 1= 2nd TV in zone...
      // Pass message to App.vue to Open Video Input Left Drawer. 
        this.$emit('tvSelectedIndex', _index)
    },

    

  }
}

</script>

<style scoped>
.zones{
  display:flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height:65vh;
  /* border:1px solid red ; */

}



</style>