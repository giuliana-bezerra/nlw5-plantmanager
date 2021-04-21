import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function Confirmation() {
  const navigation = useNavigation();

  function handleGoToPlantSelect() {
    navigation.navigate('PlantSelect');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.emoji}>😁</Text>
        <Text style={styles.title}>Prontinho</Text>
        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas {'\n'}
          plantinhas com muito cuidado.
        </Text>
        <View style={styles.footer}>
          <Button text="Começar" onPress={handleGoToPlantSelect} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30,
  },
  emoji: {
    fontSize: 96,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    textAlign: 'center',
    color: colors.heading,
    paddingVertical: 16,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20,
  },
});
