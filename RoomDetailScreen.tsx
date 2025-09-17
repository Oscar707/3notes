import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MyText from './MyText';
import Task from './Task';
import SumTable from './SumTable';
import { StatusBar } from 'expo-status-bar';

interface RoomDetailScreenProps {
  route: {
    params: {
      roomTitle: string;
    };
  };
}

const RoomDetailScreen: React.FC<RoomDetailScreenProps> = ({ route }) => {
  const { roomTitle } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {roomTitle}
        </Text>
      </View>
      
      <View style={styles.content}>
        <MyText style={{ color: 'blue' }}>
          Welcome to {roomTitle} room
        </MyText>
        
        <MyText style={{ color: 'blue', marginTop: 10 }}>
          Add your tasks and notes below:
        </MyText>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          <Task
            text={`${roomTitle} - Complete the project`}
            onDelete={() => console.log('Task deleted from', roomTitle)}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes Table</Text>
          <SumTable initialRows={2} initialCols={3} />
        </View>
      </View>
      
      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    padding: 16,
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});

export default RoomDetailScreen;