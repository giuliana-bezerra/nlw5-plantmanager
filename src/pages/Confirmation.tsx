import { useNavigation, useRoute } from '@react-navigation/core';
import React, { Dispatch, SetStateAction } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Props {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  hug: '🤗',
  smile: '😁',
};

interface ConfirmationProps {
  setHasOnboarded?: Dispatch<SetStateAction<boolean>>;
}

export default function Confirmation({ setHasOnboarded }: ConfirmationProps) {
  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen,
  } = routes.params as Props;

  function handleNextScreen() {
    if (setHasOnboarded !== undefined) setHasOnboarded(true);
    navigation.navigate(nextScreen);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.footer}>
          <Button text={buttonTitle} onPress={handleNextScreen} />
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
