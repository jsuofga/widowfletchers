<template>

    <nav>
        <v-app-bar app flat >
            <v-app-bar-nav-icon text  @click = "leftDrawer = !leftDrawer"></v-app-bar-nav-icon>
             <v-toolbar-title>Widow Fletcher AV Control App</v-toolbar-title>
                <v-spacer></v-spacer>
                <DialogAdminLogIn />
                <!-- <DialogIpAddress /> -->
            
        </v-app-bar>



    </nav>
</template>

<script>

import DialogAdminLogIn from '@/components/DialogAdminLogIn'
export default {
    components: {
            DialogAdminLogIn
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