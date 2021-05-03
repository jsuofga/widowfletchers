<template>
  <v-app >
    <Navbar/>

    <v-main class = "grey lighten-3" >
      <router-view 
        v-bind:zoneInfo= "zoneInfo"
        v-bind:zoneSelected= "zoneSelected"
        v-bind:videoInputs= "videoInputs"
        @zoneSelected= "updateZoneSelected"
        @tvSelectedIndex= "updateTvSelected"
      >

      </router-view>
    </v-main>

  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',

  components: {
    Navbar,

  },

  data: () => ({
      zoneInfo:[
        {name: 'Den', switchUnit: '1', portStart:'21', portEnd:'25'},
        {name: 'Tavern', switchUnit: '2', portStart:'1', portEnd:'18'},
        {name: 'Fletcher', switchUnit: '2', portStart:'21', portEnd:'40'},
      ],
      videoInputs : ['dtv1','dtv2','apple tv'],
      zoneSelected: '',  //index of the zone selected.  0 = zone1, 1 = zone2...
      tvSelected:'',  //index of the tv selected.  0 = tv1, 1 = tv2...
   
  }),

  methods:{
     updateZoneSelected: function(payload){
       this.zoneSelected = payload
       console.log('zoneSelected', this.zoneSelected)
     
   },
    updateTvSelected: function(payload){
       this.tvSelected = payload
       console.log('tvSelected', payload)
       console.log('zoneSelected', this.zoneSelected)
   }

  }
  
}
</script>