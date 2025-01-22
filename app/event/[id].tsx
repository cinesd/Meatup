import { View, Text, Image } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import dayjs from 'dayjs';
import events from '~/assets/events.json';

export default function Event() {
  const { id } = useLocalSearchParams();
  const event = events.find((event) => event.id === id);
  if (!event) return <Text>Event not found</Text>;
  return (
    <View className="flex-1 gap-3 bg-white p-4">
      <Stack.Screen options={{ title: 'Event', headerTintColor: 'black' }} />
      <Image source={{ uri: event.image }} className="aspect-video w-full rounded-lg" />
      <Text className="text-2xl font-bold">{event.title}</Text>
      <Text className=" uppercase text-amber-800">
        {dayjs(event.datetime).format('ddd, DD MMM • HH:mm CEST')}
      </Text>
      <Text className="text-lg">{event.description}</Text>
    </View>
  );
}
