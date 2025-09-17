import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyText from './MyText';
import Task from './Task';
import SumTable from './SumTable';
import Room from './Room';
import RoomDetailScreen from './RoomDetailScreen';
import { StatusBar } from 'expo-status-bar';


// Home Screen Component
function HomeScreen() {
  const rooms = [
    {
      title: 'groceries',
      lastMessage: 'Need to buy milk and bread',
      timestamp: '2m ago',
      unreadCount: 2,
    },
    {
      title: 'work notes',
      lastMessage: 'Meeting notes from today',
      timestamp: '1h ago',
      unreadCount: 0,
    },
    {
      title: 'travel plans',
      lastMessage: 'Flight booked for next month',
      timestamp: '3h ago',
      unreadCount: 1,
    },
    {
      title: 'recipes',
      lastMessage: 'New pasta recipe to try',
      timestamp: 'yesterday',
      unreadCount: 0,
    },
    {
      title: 'book notes',
      lastMessage: 'Chapter 5 summary',
      timestamp: '2d ago',
      unreadCount: 3,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ThreeNotes</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchPlaceholder}>Search all files</Text>
        </View>
      </View>

      <View style={styles.roomsList}>
        {rooms.map((room, index) => (
          <Room
            key={index}
            title={room.title}
            lastMessage={room.lastMessage}
            timestamp={room.timestamp}
            unreadCount={room.unreadCount}
          />
        ))}
      </View>

      {/* Demo components from original app */}
      <View style={styles.demoSection}>
        <MyText style={{ color: 'blue', margin: 16 }}>
          Demo Components Below:
        </MyText>
        
        <Task
          text="Complete the project"
          onDelete={() => console.log('Task deleted')}
        />
        
        <View style={styles.tableContainer}>
          <SumTable initialRows={1} initialCols={1} />
        </View>
      </View>
      
      <StatusBar style="auto" />
    </ScrollView>
  );
}

// Navigation Stack Setup
const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: 'ThreeNotes',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    RoomDetail: {
      screen: RoomDetailScreen,
      options: {
        title: 'Room',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitle: 'Back',
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

// Main App Component
export default function App() {
  return <Navigation />;
}

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
  searchContainer: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  searchBar: {
    backgroundColor: '#404040',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchPlaceholder: {
    color: '#B0B0B0',
    fontSize: 16,
  },
  roomsList: {
    backgroundColor: '#fff',
  },
  demoSection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tableContainer: {
    margin: 16,
  },
});