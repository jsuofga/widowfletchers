<template>

    <nav>
    <v-snackbar v-model="snackbar" top color = "success" :timeout= "10000">{{ textSnackbar }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
        <v-app-bar app flat dark color ="blue-grey darken-4" >
            <v-img 
              src = '../assets/octava-logo-white.png'    
              max-height="120"
              max-width="120"
              contain>
          </v-img> 
            <v-spacer></v-spacer>
             <div v-if ="switchStatusFail" class = "red mx-5">Network Switches Not Detected </div>
             <div v-if ="controllerStatusFail" class = "red mx-5">HDLAN Controller Not Detected</div>
                <v-spacer></v-spacer>
                <DialogIpAddress /> 
                <DialogFileUpdate @fileUpdated= "snackbar = true"/> 
                
        </v-app-bar>

        <v-bottom-navigation absolute color ="blue-grey darken-4"  >
            <v-btn  router-link :to= " '/' " >
                <span>Home</span>
                <v-icon large>mdi-home</v-icon>
            </v-btn>
  
        </v-bottom-navigation>
    </nav>
    
</template>

<script>

import DialogIpAddress from '@/components/DialogIpAddress'
import DialogFileUpdate from '@/components/DialogFileUpdate'
import axios from 'axios'

export default {
    components: {
            DialogIpAddress,
            DialogFileUpdate
        },
    data: () => ({
        nodeRedURL:`${location.hostname}:1880`,
        controllerStatusFail: false, // Display error message if true
        switchStatusFail: false, // Display error message if true
        vlanMembership:{vlansSwitch1:[],vlansSwitch2:[]},   //
        snackbar:false,
        textSnackbar :'File updated!'
    }),
    methods: {
      //Send get command to hdlan controller. If no response, then throw an error that HDLAN Controller not detected
      getStatus:function(){
      
         
       axios.get(`http://${this.nodeRedURL}/status`)
        .then((response)=> {
            // handle success
            this.controllerStatusFail = false
            console.log(response);
        })
        .catch((error) =>{
            // handle error
            this.controllerStatusFail = true
            console.log(error);
        })
          
      },
    },
    created: function() {
       
        // Web Socket Connection. To get updated switchstatus
        console.log("Starting connection to WebSocket Server")
        let connection = new WebSocket(`ws://${this.nodeRedURL}/ws/switchstatus`)
        connection.onmessage = (event) => {
             let switch1_vlans = JSON.parse(event.data).switch1_vlans  //convert strings to objects
             let switch2_vlans = JSON.parse(event.data).switch2_vlans
           
            //  console.log(event.data);
              console.log('test',switch1_vlans)
              console.log('test',switch2_vlans)
            // console.log('vlanMembership',this.vlanMembership)
             this.vlanMembership.vlansSwitch1 =[...switch1_vlans]
             this.vlanMembership.vlansSwitch2 =[...switch2_vlans]
             this.$emit('message-vlanMembership',this.vlanMembership)

          
            // Check if switch1status , switch2status = fail
            if(Object.values(JSON.parse(event.data)).includes("fail")){
                    this.switchStatusFail = true
            }else{
                    this.switchStatusFail = false
            }
        }

      // Start pinging HDLAN Controller to see if online
        setInterval(this.getStatus, 10000);

    }

}

</script>

<style scoped>

</style>