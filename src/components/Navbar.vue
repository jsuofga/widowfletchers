<template>

    <nav>
        <v-app-bar app flat >
            <!-- <v-app-bar-nav-icon text  @click = "leftDrawer = !leftDrawer"></v-app-bar-nav-icon> -->
     
          
 
             <v-toolbar-title >Widow Fletcher </v-toolbar-title>
              
                <v-spacer></v-spacer>
                <DialogIpAddress />  
        </v-app-bar>

        <v-bottom-navigation absolute  >
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