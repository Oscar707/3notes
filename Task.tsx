import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated,
  Dimensions 
} from 'react-native';
import { 
  GestureDetector,
  Gesture
} from 'react-native-gesture-handler';

interface TaskProps {
  text: string;
  onDelete?: () => void;
}

const Task: React.FC<TaskProps> = ({ text, onDelete }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const translateX = new Animated.Value(0);
  const screenWidth = Dimensions.get('window').width;

  const deleteTask = () => {
    setIsVisible(false);
    onDelete?.();
  };

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate((event) => {
          translateX.setValue(event.translationX);
        })
        .onEnd((event) => {
          if (event.translationX < -screenWidth * 0.3) {
            // Swipe left threshold (30% of screen)
            // Animate out and delete
            Animated.timing(translateX, {
              toValue: -screenWidth,
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              setTimeout(() => {}, 0);
            });
          } else {
            // Snap back
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        }),
    [translateX, screenWidth, deleteTask]
  );

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View 
        style={[
          styles.container,
          { transform: [{ translateX }] }
        ]}
      >
        <Text 
          style={[
            styles.taskText,
            isChecked && styles.checkedText
          ]}
        >
          {text}
        </Text>
        <TouchableOpacity onPress={toggleCheck} style={styles.checkbox}>
          <View style={[styles.checkboxInner, isChecked && styles.checked]}>
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  taskText: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    color: '#333',
    marginRight: 12,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  checkbox: {
    padding: 4,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  checked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Task;