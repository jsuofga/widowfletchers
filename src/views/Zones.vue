<template>
   <div class="zones">

      <v-container>
      <div id = 'zone-title' class= "mb-5"> 
            <h1  class= "d-flex justify-center  "> 
               {{zoneInfo[zoneSelected].name}}
            </h1>  
        </div>

      <div >
          <v-row id = "tv-buttons" justify= "start" >
              <v-col class= "d-flex flex-column justify-center align-center mb-3" cols = "4" sm ="2"  v-for="(item,index) in tvList" :key="index">
                  <v-btn @click = "tv(index)" large dark color= "blue-grey darken-4" >
                        {{index+1}}
                  </v-btn>
                  <span>{{sourceList[index]}}</span>
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
                <v-list-item @click= "switchVideo(index)"  v-for= "(item,index) in videoInputs" :key= "index" >
                    <v-list-item-icon ><v-icon> mdi-import</v-icon></v-list-item-icon>
                    <v-list-item-content >{{item}} </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

  </div>
</template>

<script>
import axios from 'axios';
export default {
   name: 'Zones',
   props:['zoneInfo','zoneSelected','videoInputs','vlanMembership'],
   data: () => ({
      nodeRedURL:`${location.hostname}:1880`,
      leftDrawer: false,
      tvSelected: 0 ,// TV selected from zone. 0= first TV in zone, 1= 2nd TV in zone...
    //   sourceList: [] // list of source names that each TV in ZOne is switched to
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

    sourceList:function(){  // List the names of the sources each TV is switched to Ex. ['dtv1', 'sepectrum1'....]
        // this.sourceList = []
        let inputs=[]
        let switchUnitSelected = this.zoneInfo[this.zoneSelected].switchUnit
        let firstPortofZone =  this.zoneInfo[this.zoneSelected].portStart
        let lastPortofZone =  this.zoneInfo[this.zoneSelected].portEnd
        let vlans = []  // list of video sources that TV are currently swithed to 
        console.log('vlanMembership x ', this.vlanMembership[`vlansSwitch${switchUnitSelected}`])
        vlans = this.vlanMembership[`vlansSwitch${switchUnitSelected}`].slice(firstPortofZone-1,lastPortofZone)
        console.log('vlans', vlans)

        // Assign actual Video Input Names to each vlan
         vlans.forEach((item,index)=>{
             inputs.push(this.videoInputs[item-2]) 
         })
        return inputs
    },

  },
  methods: {

   tv: function(_index) {
      // Open Video Input Select Left Drawer
       this.leftDrawer = true
      // TV selected from zone. 0= first TV in zone, 1= 2nd TV in zone...
       this.tvSelected = _index
      // Pass message to App.vue to Open Video Input Left Drawer. 
        this.$emit('message-tvSelectedIndex', _index)
    },
    switchVideo: function(_index){
        let vlan = _index + 2
        let switch_unit = this.zoneInfo[this.zoneSelected].switchUnit
        let rxport = parseInt(this.zoneInfo[this.zoneSelected].portStart) + this.tvSelected
        // console.log(`zoneSelected is ` , this.zoneSelected)
        // console.log(`swich unit is ` ,switch_unit )
        // console.log(`gi port is ` ,gi_port )
        console.log(`http://${this.nodeRedURL}/switch-unit/${switch_unit}/rxport/${rxport}/vlan/${vlan}`)

        axios.get(`http://${this.nodeRedURL}/switch-unit/${switch_unit}/rxport/${rxport}/vlan/${vlan}`)
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
.zones{
  display:flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  height:65vh;
  /* border:1px solid red ; */
}




</style>