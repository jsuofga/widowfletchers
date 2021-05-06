<template>

  <div class="text-center">

    <!-- Admin Login Dialog  -->
    <v-dialog v-model="dialogLogin" width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn depressed text v-bind="attrs" v-on="on" class = "left" >
            <v-icon >mdi-server-network</v-icon>
        </v-btn>
      </template>

      <v-card>
            <v-card-title class="headline grey lighten-2 justify-center mb-10">
              Admin Access 
            </v-card-title>

            <div class='mb-5'>
              <v-text-field label="Enter Admin User Name"
                v-model= "adminPass"
                prepend-icon="mdi-account"
                hide-details="auto"
                autocomplete="false"       
              ></v-text-field>
            </div>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click= "login"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>

    </v-dialog>

    <!-- IP Address Dialog -->
    <v-dialog v-model="dialogIp" width="600">

        <v-card>
            <v-card-title class="headline grey lighten-2 justify-center mb-10">
              Cisco Switch IP Address
            </v-card-title>
            <v-form v-model="valid2" class = "mb-5">
              <v-container>
                  <h5 class= "justify-center">Switch 1 IP</h5>
                  <v-row>
                      <v-col cols="3" md="3" v-for="(item,index) in switch1IP" :key="index" >
                        <v-text-field  outlined v-model="switch1IP[index]" :rules="ipRules" label="0-255" placeholder = "0-255" required></v-text-field>
                      </v-col>
                </v-row>
                <h5 class= "justify-center">Switch 2 IP</h5>
                <v-row>
                        <v-col cols="3" md="3" v-for="(item,index) in switch2IP" :key="index" >
                          <v-text-field  outlined v-model="switch2IP[index]" :rules="ipRules" label="0-255" placeholder = "0-255" required></v-text-field>
                        </v-col>
                  </v-row>
              </v-container>
            </v-form>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click= "submit">
                Submit
              </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>

  </div>


</template>

<script>
import axios from 'axios';

export default {

    data: () => ({
        expressURL:`${location.hostname}:3000`, // Express server and port
        adminPass: '',
        dialogLogin: false,
        dialogIp:false,
        valid:false,
        valid2:false,     
        switch1IP:['','','',''],
        switch2IP:['','','',''],

        ipRules: [
            v => !!v || 'IP is required',
            v => v.length <= 3 || 'Name must be less than 3 characters',
            v => /^[0-9]*$/.test(v) || 'ip must be 0-255',
        ],
        
    }),
    methods: {
        login:function(){

          if(this.adminPass=='Octava' || this.adminPass=='octava'){
             this.dialogLogin= false,
             this.dialogIp= true
          }else{
            alert("Login Failed")
          }
         
        },
        submit:function(){
          
          let ipAddress1 = `${this.switch1IP[0]}.${this.switch1IP[1]}.${this.switch1IP[2]}.${this.switch1IP[3]}`
          let ipAddress2 = `${this.switch2IP[0]}.${this.switch2IP[1]}.${this.switch2IP[2]}.${this.switch2IP[3]}`

          if(this.checkIPaddress(ipAddress1,ipAddress2) == true){
              // IP Address valid. Write IP Address to HDLAN Controller
                   console.log('ip1',ipAddress1)
                   console.log('ip2',ipAddress2)
          
              // Save switch config to server
              let sg350Config = {"ip1":"","ip2":"","onTime":"","offTime":""} //
              sg350Config['ip1'] = ipAddress1
              sg350Config['ip2'] = ipAddress2
                // console.log(sg350Config)

              axios.get(`http://${this.expressURL}/write/UserSwitchConfig/${JSON.stringify(sg350Config)}`)
              .then(function (response) {
                // handle success
                console.log(response);
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              })

              // Close Vuetify Dialog. Clear Admin Pass input
                this.dialogLogin= false,
                this.dialogIp= false
                this.adminPass = ''
             
        
          }else{
            // IP Address Invalid. 

          }
      
        },
        checkIPaddress:function(_ipaddress1,_ipaddress2){
          const ip_pattern = /^(?=.*[^\.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4}$/
          if (ip_pattern.test(_ipaddress1) && ip_pattern.test(_ipaddress2)) {  
              return (true)  
          }else{
              alert("Please enter valid IP address(s)!")  
              return (false)  
          }
        }
        
    }
}

</script>

<style scoped>


</style>