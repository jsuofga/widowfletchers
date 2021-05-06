<template>

  <div class="text-center">

    <!-- Admin Login Dialog  -->
    <v-dialog v-model="dialogLogin" width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn depressed text v-bind="attrs" v-on="on" class = "left" >
            <v-icon >mdi-file-download-outline</v-icon>
        </v-btn>
      </template>

      <v-card>
            <v-card-title class="headline grey lighten-2 justify-center mb-10">
             File Update  
            </v-card-title>
            <v-card-subtitle>Current Version is 5.6.21A</v-card-subtitle>

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

    <!-- File Update Address Dialog -->
    <v-dialog v-model="dialogFileUpdate" width="600">

        <v-card>
            <v-card-title class="headline grey lighten-2 justify-center mb-10">
              Update File
            </v-card-title>
             <v-card-subtitle>only use dist.tar file provided by Octava</v-card-subtitle>
            <v-container>
                <v-file-input
                    :rules="rules"
                    accept="application/x-tar"
                    placeholder="load dist.tar file provided by Octava"
                    prepend-icon="mdi-file"
                    label="load dist.tar file provided by Octava"
                    outlined
                    v-model="selectedFile"
                ></v-file-input>
                <v-progress-linear :value= "completion"></v-progress-linear>
                <div v-if = "completion != 0" class = "text-center">{{this.completion}}</div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click= "upload"
              >
                Upload
              </v-btn>
            </v-card-actions>
            </v-container>
            
        </v-card>

    </v-dialog>

  </div>


</template>

<script>
import axios from 'axios';

export default {

    data: () => ({
        nodeRedURL:`${location.hostname}:1880`,
        adminPass: '',
        dialogLogin:false,
        dialogFileUpdate: false,
        selectedFile:null,
        completion:0,

        rules: [v => !!v || 'File is mandatory',
                v => (v.name == 'dist.tar') || 'Wrong file.File should be dist.tar',  // check file name is 'dist.tart', if not output 'please select the dist.tar provided by Octava'
                
                ],
        
    }),
    methods: {
        login:function(){

          if(this.adminPass=='Octava' || this.adminPass=='octava'){
             this.dialogLogin= false,
             this. dialogFileUpdate= true
          }else{
            alert("Login Failed")
          }
         
        },
        upload:function(){
            console.log(this.selectedFile)
            
            const fd = new FormData();

      // file name and type must be "dist.tar" and a tar file
      if(this.selectedFile == null){
          alert('No file selected')
      }else{
        if((this.selectedFile.type == 'application/x-tar')&&(this.selectedFile.name == 'dist.tar')){
        
          fd.append('image',this.selectedFile)
          axios.post(`http://${this.nodeRedURL}/update`,fd,{
           onUploadProgress:  uploadEvent => {
            // Do whatever you want with the native progress event
            console.log('upload progress:' + Math.round(uploadEvent.loaded/uploadEvent.total * 100) +'%')
            this.completion = Math.round(uploadEvent.loaded/uploadEvent.total * 100).toString() + '%'
          
          },

          })
          .then(res => {
            // JSON responses are automatically parsed.
            if (res.status === 200) {
              //alert('update request received')
              this.dialogFileUpdate = false  //close dialog 
              this.$emit('fileUpdated')
              location.reload()  // reload page to update
              
            } else {
              // Handle the user data here...
              alert('fail')
            }
        
          })
          .catch(e => {
            this.errors.push(e)
          })

        }else{
          // file not dist.tar . do nothing
          alert('Wrong file.File should be dist.tar. Please contact info@octavainc.com to get correct file')
        }
      }

            
    },
        
    }
}

</script>

<style scoped>


</style>