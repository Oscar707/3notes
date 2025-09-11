import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

interface MyTextProps extends TextProps {
  children: React.ReactNode;
}

export default class MyText extends React.Component<MyTextProps> {
  render() {
    const { style, children, ...props } = this.props;
    
    return (
      <Text style={[styles.defaultStyle, style]} {...props}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    textAlign: 'right',
  },
});