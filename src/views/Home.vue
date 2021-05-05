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
                    <v-icon color='white' class ="mx-1">mdi-all-inclusive</v-icon> 
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
                <v-list-item @click= "switchAll(index)"  v-for= "(item,index) in videoInputs" :key= "index" >
                    <v-list-item-icon><v-icon> mdi-import</v-icon></v-list-item-icon>
                    <v-list-item-content >{{item}} </v-list-item-content>
                </v-list-item>
            </v-list>
      </v-navigation-drawer>

     </v-container>

  </div>
</template>

<script>
import axios from 'axios';
export default {
   name: 'Home',
   props:['zoneInfo','videoInputs'],
   data: () => ({
    nodeRedURL:`${location.hostname}:1880`,
    leftDrawer: false,
    zoneSelected:0,
    switch1RXPorts :[],
    switch2RXPorts :[],
    connection: null  // websocket
  }),
  computed: {
    // a computed getter
    getSwitch1RxPorts: function () {
      let switch1RXPorts = [] //{switch1RxStart:, switch1RxEnd}
      //Filter zoneInfo[] and output only switchUnit1 attributes
      let switch1 = ((this.zoneInfo.filter(item => item.switchUnit == `1`)))
      // Get switch1 start port, end port
      switch1RXPorts.push( {'switch1RxStart': Math.min(...switch1.map((item)=>parseInt(item.portStart)))} )
      switch1RXPorts.push( {'switch1RxEnd': Math.max(...switch1.map((item)=>parseInt(item.portEnd)))})
      return (switch1RXPorts )
    },
    getSwitch2RxPorts: function () {
      let switch2RXPorts = [] //{switch2RxStart:, switch2RxEnd}
      //Filter zoneInfo[] and output only switchUnit2 attributes
      // Get switch2 start port, end port
      let switch2 = ((this.zoneInfo.filter(item => item.switchUnit == `2`)))
      switch2RXPorts.push( {'switch2RxStart': Math.min(...switch2.map((item)=>parseInt(item.portStart)))} )
      switch2RXPorts.push( {'switch2RxEnd': Math.max(...switch2.map((item)=>parseInt(item.portEnd)))})
      return (switch2RXPorts )
    }

  },

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
    switchAll: function(_index){
      
      let vlan = _index + 2
      // console.log(this.getSwitch1RxPorts)
      // console.log(this.getSwitch1RxPorts[0].switch1RxStart)
      // console.log(this.getSwitch1RxPorts[1].switch1RxEnd)
      
      // console.log(`http://${this.nodeRedUrl}/switchAll/switch-unit/1/gi-start/${this.getSwitch1RxPorts[0].switch1RxStart}/gi-end/${this.getSwitch1RxPorts[1].switch1RxEnd}/vlan/${vlan}`)
      // console.log(`http://${this.nodeRedUrl}/switchAll/switch-unit/2/gi-start/${this.getSwitch2RxPorts[0].switch2RxStart}/gi-end/${this.getSwitch2RxPorts[1].switch2RxEnd}/vlan/${vlan}`)

      axios.get(`http://${this.nodeRedURL}/switchall-unit/1/start/${this.getSwitch1RxPorts[0].switch1RxStart}/end/${this.getSwitch1RxPorts[1].switch1RxEnd}/vlan/${vlan}`)
      .then(function (response) {
        // handle success
        console.log(response);
              })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

      axios.get(`http://${this.nodeRedURL}/switchall-unit/2/start/${this.getSwitch2RxPorts[0].switch2RxStart}/end/${this.getSwitch2RxPorts[1].switch2RxEnd}/vlan/${vlan}`)
      .then(function (response) {
        // handle success
        console.log(response);
              })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
         
    }

  },
 
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
   color: white;
   /* border:5px solid #263238; */
   background-color:#263238 ;
   font-size: 1.5rem;
   height:150px;
   width:150px;
   border-radius: 50%;
}
.roundBtn:hover {
  color:white;
  background-color: teal !important;
}


</style>