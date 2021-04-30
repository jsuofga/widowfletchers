<template>

  <div class="text-center">

    <!-- Admin Login Dialog  -->
    <v-dialog v-model="dialogLogin" width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn depressed text v-bind="attrs" v-on="on" class = "left" >
            <v-icon >mdi-export</v-icon>sign in
        </v-btn>
      </template>

      <v-card>
            <v-card-title class="headline grey lighten-2 justify-center mb-10">
              Admin Access 
            </v-card-title>

            <div class='mb-5'>
              <v-text-field label="Enter Admin User Name"
                prepend-icon="mdi-account"
                :rules="rules"
                hide-details="auto"
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
            <v-row>
                <v-col cols="12" md="3">
                  <v-text-field v-model="switch1IP[0]" :rules="ipRules" label="Switch1 IP" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="switch1IP[1]" :rules="ipRules" label="Switch1 IP" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="switch1IP[2]" :rules="ipRules" label="Switch1 IP" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="switch1IP[3]" :rules="ipRules" label="Switch1 IP" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="3">
                    <v-text-field v-model="switch2IP[0]" :rules="ipRules" label="Switch2 IP" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="switch2IP[1]" :rules="ipRules" label="Switch2 IP" required></v-text-field>
                  </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="switch2IP[2]" :rules="ipRules" label="Switch2 IP" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="switch2IP[3]" :rules="ipRules" label="Switch2 IP" required></v-text-field>
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


export default {

    data: () => ({
        dialogLogin: false,
        dialogIp:false,
      
        // login:'',
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
          this.dialogLogin= false,
          this.dialogIp= true
        },
        submit:function(){
          const ipaddress1 = `${this.switch1IP[0]}.${this.switch1IP[1]}.${this.switch1IP[2]}.${this.switch1IP[3]}`
          const ipaddress2 = `${this.switch2IP[0]}.${this.switch2IP[1]}.${this.switch2IP[2]}.${this.switch2IP[3]}`
          if(this.checkIPaddress(ipaddress1,ipaddress2) == true){
              // IP Address valid. Write IP Address to HDLAN Controller
                 
              // Close dialog
              this.dialogLogin= false,
              this.dialogIp= false
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