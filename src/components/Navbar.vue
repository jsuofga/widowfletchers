<template>

    <nav>
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
import axios from 'axios'

export default {
    components: {
            DialogIpAddress
        },
    data: () => ({
        nodeRedURL:`${location.hostname}:1880`,
        controllerStatusFail: true, // Display error message if true
        switchStatusFail: false // Display error message if true
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
       
        // Web Socket Connection 
        console.log("Starting connection to WebSocket Server")
        let connection = new WebSocket(`ws://${this.nodeRedURL}/ws/switchstatus`)
        connection.onmessage = (event) => {
            //console.log(event.data);
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