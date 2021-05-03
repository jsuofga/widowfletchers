<template>
  <v-app >
    <Navbar/>
    <v-main class = "grey lighten-3" >
      <router-view 
        v-bind:zoneInfo= "zoneInfo"
        v-bind:zoneSelected= "zoneSelected"
        @zoneSelected= "updateZoneSelected">
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
    Navbar
  
  },

  data: () => ({
      zoneInfo:[
        {name: 'Den', switchUnit: '1', portStart:'21', portEnd:'25'},
        {name: 'Tavern', switchUnit: '2', portStart:'1', portEnd:'18'},
        {name: 'Fletcher', switchUnit: '2', portStart:'21', portEnd:'40'},
      ],
      zoneSelected: ''
  }),

  methods:{
     updateZoneSelected: function(payload){
       this.zoneSelected = payload
     
   }

  }
  
}
</script>