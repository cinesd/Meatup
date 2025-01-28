import { Stack } from 'expo-router';
import { FlatList } from 'react-native';
import EventListItems from '~/components/EventListItems';
import { supabase } from '~/utils/supabase';
import { useState, useEffect } from 'react';

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    let { data, error } = await supabase.from('events').select('*');
    if (error) {
      console.error(error);
    }
    setEvents(data || []);
  };
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
