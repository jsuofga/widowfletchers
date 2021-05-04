<template>

    <nav>
        <v-app-bar app flat dark color ="brown lighten-1" >
            <v-img 
              src = '../assets/octava-logo-white.png'    
              max-height="120"
              max-width="120"
              contain>
          </v-img> 
             <v-toolbar-title > </v-toolbar-title>
              
                <v-spacer></v-spacer>
                <DialogIpAddress />  
        </v-app-bar>

        <v-bottom-navigation absolute color ="brown lighten-1"  >
            <v-btn  router-link :to= " '/' " >
                <span>Home</span>
                <v-icon>mdi-home</v-icon>
            </v-btn>
            <!-- <v-btn value="favorites"  >
                <span>Favorites</span>
                <v-icon>mdi-heart</v-icon>
            </v-btn>
        
            <v-btn value="nearby" >
                <span>Nearby</span>
                <v-icon>mdi-map-marker</v-icon>
            </v-btn> -->
        </v-bottom-navigation>
    </nav>
    
</template>

<script>


import DialogIpAddress from '@/components/DialogIpAddress'
export default {
    components: {
            DialogIpAddress
        },
    data: () => ({

    }),
    methods: {
        test: function() {
         
        },
    }

}

</script>

<style scoped>

</style>