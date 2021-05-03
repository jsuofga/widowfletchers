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

  </div>
</template>

<script>

export default {
   name: 'Zones',
   props:['zoneInfo','zoneSelected'],
   data: () => ({
  
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
    }
  },
  methods: {
   tvSelected: function(_index) {
      // TV selected from zone. 0= first TV in zone, 1= 2nd TV in zone...
      console.log('TV Selected',this.tvList[_index])
      
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