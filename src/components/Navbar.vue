<template>

    <nav>
        <v-app-bar app flat >
            <v-app-bar-nav-icon text  @click = "leftDrawer = !leftDrawer"></v-app-bar-nav-icon>
     
            <v-spacer></v-spacer>
 
             <!-- <v-toolbar-title class="justify-center">Widow Fletcher AV Control App</v-toolbar-title> -->
              
                <v-spacer></v-spacer>
                <DialogIpAddress />  
        </v-app-bar>
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