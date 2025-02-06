import { Stack } from 'expo-router';
import { FlatList } from 'react-native';
import EventListItems from '~/components/EventListItems';
import { supabase } from '~/utils/supabase';
import React, { useState, useEffect } from 'react';
import { NearbyEvent } from '~/types/db';
export default function Home() {
  const [events, setEvents] = useState<NearbyEvent[]>([]);

  useEffect(() => {
    fetchNearbyEvents();
  }, []);

  const fetchAllEvents = async () => {
    const { data, error } = await supabase.from('events').select('*');
    if (error) {
      console.error(error);
    }
    setEvents(data);
  };

  const fetchNearbyEvents = async () => {
    const { data, error } = await supabase.rpc('nearby_events', {
      lat: 48.643005,
      long: 2.350798,
    });
    console.log(JSON.stringify(data, null, 2));
    if (data) {
      setEvents(data);
    }
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
