import { Stack } from 'expo-router';
import { FlatList } from 'react-native';
import EventListItems from '~/components/EventListItems';
import events from '~/assets/events.json';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <FlatList
        data={events}
        renderItem={({ item }) => <EventListItems event={item} />}
        className="bg-white"
      />
    </>
  );
}
