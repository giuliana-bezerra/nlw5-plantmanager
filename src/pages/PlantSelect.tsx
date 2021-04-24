import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EnviromentButton } from '../components/EnviromentButton';
import Header from '../components/Header';
import Loading from '../components/Loading';
import PlantCardPrimary from '../components/PlantCardPrimary';
import { Plant } from '../libs/storage';
import api from '../servers/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Environment {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [activeEnvironment, setActiveEnvironment] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchEnvironments() {
      const { data } = await api.get(
        '/plants_environments?_sort=title&_order=asc'
      );
      setEnvironments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data,
      ]);
    }
    fetchEnvironments();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  function handlePlantSelect(plant: Plant) {
    navigation.navigate('PlantSave', { plant });
  }

  async function fetchPlants() {
    const { data } = await api.get(
      `/plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );
    if (!data) return setLoading(true);

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoadMore(false);
    setLoading(false);
  }

  function handleActiveEnvironment(environment: string) {
    setActiveEnvironment(environment);
    if (environment === 'all') return setFilteredPlants(plants);
    const filteredPlantsByEnvironment = plants.filter((plant) =>
      plant.environments.includes(environment)
    );
    setFilteredPlants(filteredPlantsByEnvironment);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) return;
    setLoadMore(true);
    setPage((oldValue) => oldValue + 1);
    fetchPlants();
  }

  if (loading) return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <Header texto1="Olá" />
      <Text style={styles.title}>Em qual ambiente</Text>
      <Text style={styles.subTitle}>você quer colocar sua planta?</Text>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={environments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === activeEnvironment}
              onPress={() => handleActiveEnvironment(item.key)}
            />
          )}
        />
      </View>
      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              plant={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadMore ? <ActivityIndicator color={colors.green} /> : null
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 32,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 23,
  },
  subTitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 23,
    color: colors.heading,
  },
  plants: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
});
