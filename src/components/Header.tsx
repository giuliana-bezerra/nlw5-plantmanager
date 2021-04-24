import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import colors from '../styles/colors';
import userImg from '../assets/giu.png';
import fonts from '../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface HeaderProps {
  texto1: string;
  texto2?: string;
}
export default function Header({ texto1, texto2 }: HeaderProps) {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    console.log(texto2);
    if (texto2 === undefined)
      AsyncStorage.getItem('@plantmanager:user').then((user) =>
        setUserName(user || '')
      );
  }, [texto1, texto2]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>{texto1},</Text>
        <Text style={styles.userName}>{userName ? userName : texto2}</Text>
      </View>
      <Image source={userImg} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getStatusBarHeight(),
    marginBottom: 10,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 36,
  },
});
