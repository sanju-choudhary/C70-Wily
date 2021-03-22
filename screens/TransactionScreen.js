import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,TextInput,Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
       // scannedData: '',
        scannedBookId: '',
        scannedStudentId:'',
        buttonState: 'normal'
      }
    }

    getCameraPermissions = async(id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        hasCameraPermissions: status === "granted",
       // buttonState: "clicked",
       buttonState:id,
        //scanned: false,
        //scannedData:"Hello I am ready to scan"
      });
    }

    handleBarCodeScanned = async({type, data})=>{

      const {buttonState} = this.state

      if(buttonState==="BookId"){
        this.setState({
          scanned: true,
          scannedBookId: data,
          buttonState: 'normal'
        });
      }
      else if(buttonState==="StudentId"){
        this.setState({
          scanned: true,
          scannedStudentId: data,
          buttonState: 'normal'
        });
      }
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions===true){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />

        );
      }

      else{
        return(
          <View style={styles.container}>
            <View>
              <Image
                source={require("../assets/booklogo.jpg")}
                style={{width:200, height: 200}}/>
              <Text style={{textAlign: 'center', fontSize: 30}}>Wily</Text>
            </View>

            <View style={styles.inputView}> 
              <TextInput 
              style={styles.inputBox}
              placeholder='BookID'
              value={this.state.scannedBookId}/>
              <TouchableOpacity 
              style={styles.scanButton}    
              onPress={()=>{
                this.getCameraPermissions("BookId")
              }}>
                <Text>SCAN</Text>
              </TouchableOpacity>
            </View>

            <View> 
              <TextInput placeholder='StudentID'
              value={this.state.scannedStudentId}/>
              <TouchableOpacity
              style={styles.scanButton}
              onPress={()=>{
              this.getCameraPermissions("StudentId")
              }}>
                <Text>SCAN</Text>
              </TouchableOpacity>
            </View>

         
        </View>
        );
      }
    }
  }
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
  });