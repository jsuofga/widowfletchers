<template>

  <div class="text-center">
    <v-dialog v-model="dialog" width = "600">
      <template v-slot:activator="{ on, attrs }">
   
        <v-btn depressed text v-bind="attrs" v-on="on" class = "left" >
                <v-icon >mdi-export</v-icon>Submit
        </v-btn>
      </template>

<v-card>
  

    <v-form v-model="valid">
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

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click= "test"
          >
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
        dialog: false,
        switch1IP:['','','',''],
        switch2IP:['','','',''],
        valid: false,
        ipRules: [
            v => !!v || 'IP is required',
            v => v.length <= 3 || 'Name must be less than 3 characters',
            v => /^[0-9]*$/.test(v) || 'ip must be 0-255',
        ],
        
        
    }),
    methods: {
        test:function(){
            this.dialog = false
            const ipaddress1 =   `${this.switch1IP[0]}.${this.switch1IP[1]}.${this.switch1IP[2]}.${this.switch1IP[3]}`
            const ipaddress2 =   `${this.switch2IP[0]}.${this.switch2IP[1]}.${this.switch2IP[2]}.${this.switch2IP[3]}`
            this.checkIPaddress(ipaddress1,ipaddress2)
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