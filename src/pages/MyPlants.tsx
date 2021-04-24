import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import waterdrop from '../assets/waterdrop.png';
import Header from '../components/Header';
import Loading from '../components/Loading';
import PlantCardSecondary from '../components/PlantCardSecondary';
import { loadPlants, Plant, removePlant } from '../libs/storage';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import emptyBoxAnimation from '../assets/empty-box.json';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => {
    loadPlants().then((plantsStoraged) => {
      console.log('Olha aqui  ');
      if (plantsStoraged.length) {
        const nextTime = formatDistance(
          new Date(plantsStoraged[0].dateTimeNotification).getTime(),
          new Date().getTime(),
          { locale: ptBR }
        );

        setNextWatered(
          `Não esqueça de regar a ${plantsStoraged[0].name} daqui a ${nextTime}.`
        );
        setMyPlants(plantsStoraged);
      }
      setLoading(false);
    });
  }, []);

  function handleRemovePlant(plant: Plant): void {
    Alert.alert('Remover Planta', `Deseja remover a planta ${plant.name}?`, [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            removePlant(plant.id).then((_) =>
              setMyPlants((oldData) =>
                oldData.filter((item) => item.id !== plant.id)
              )
            );
          } catch (err) {
            Alert.alert('Não foi possível remover a planta selecionada.');
          }
        },
      },
    ]);
  }

  if (loading) return <Loading />;
  return (
    <SafeAreaView style={styles.container}>
      <Header texto1="Minhas" texto2="Plantinhas" />
      {!!myPlants.length && (
        <View style={styles.spotlight}>
          <Image source={waterdrop} style={styles.spotlightImage} />
          <Text style={styles.spotlightText}>{nextWatered}</Text>
        </View>
      )}
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas Regas</Text>
        {!!myPlants.length && (
          <FlatList
            data={myPlants}
            keyExtractor={(item: Plant) => String(item.id)}
            renderItem={({ item }: { item: Plant }) => (
              <PlantCardSecondary
                plant={item}
                handleRemove={() => handleRemovePlant(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, marginVertical: 10 }}
          />
        )}
        {!myPlants.length && (
          <Text style={styles.emptyResult}>Nenhuma planta cadastrada.</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 10,
  },
  emptyResult: {
    flex: 1,
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.gray,
    maxHeight: 200,
  },
});
