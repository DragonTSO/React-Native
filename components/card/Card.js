import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Card = (CardProps) => {
  return (
      <View>
          <Text style={styles.title}>{CardProps.title}</Text>
          <Image source={CardProps.imgUrl} style={styles.image} />
      </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    height: 250,
    resizeMode: 'cover',
  },
});