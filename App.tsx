import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MyText from './MyText';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.headerText}>  
          ThreeNotes
        </Text>
        <MyText style={{color:'blue'}}>This text will be right-aligned</MyText>
        <MyText style={{color:'blue'}}>This text will be right-aligned,This text will be right-aligned,This text will be right-aligned,This text will be right-aligned</MyText>
    </View>
    </ScrollView>
      
  );
}

const styles = StyleSheet.create({
  header:{
    backgroundColor:'black',
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent:'center',

  },
  headerText:{
    color:'white',
    fontSize:24,
    fontWeight:'bold',
  },
  searchContainer:{
    backgroundColor:'black',
    paddingVertical:15,
    paddingHorizontal:16,
  },
  searchBar:{
    backgroundColor: '#404040',
    borderRadius:25,
    paddingVertical:12,
    paddingHorizontal:20,
    alignItems:'center',
    justifyContent:'center',
  },
  searchPlaceholder:{
    color:"#B0B0B0",
    fontSize:16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});