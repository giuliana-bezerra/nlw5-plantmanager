import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

export interface Plant {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
  dateTimeNotification: Date;
}

interface StoragePlantProps {
  [id: string]: {
    data: Plant;
  };
}

export async function savePlant(plant: Plant): Promise<void> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};
    const newPlant = {
      [plant.id]: {
        data: plant,
      },
    };
    await AsyncStorage.setItem(
      '@plantmanager:plants',
      JSON.stringify({
        ...newPlant,
        ...oldPlants,
      })
    );
  } catch (err) {
    throw new Error(err);
  }
}

export async function loadPlants(): Promise<Plant[]> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const plantsData = data ? (JSON.parse(data) as StoragePlantProps) : {};
    const plants = Object.keys(plantsData)
      .map((plant) => {
        return {
          ...plantsData[plant].data,
          hour: format(
            new Date(plantsData[plant].data.dateTimeNotification),
            'HH:mm'
          ),
        };
      })
      .sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
            Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      );

    return plants;
  } catch (err) {
    throw new Error(err);
  }
}
