import { Stack } from 'expo-router';
import { FlatList, Alert } from 'react-native';
import EventListItems from '~/components/EventListItems';
import { supabase } from '~/utils/supabase';
import React, { useState, useEffect } from 'react';
import { NearbyEvent } from '~/types/db';
import * as Location from 'expo-location';

export default function Home() {
  const [events, setEvents] = useState<NearbyEvent[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchNearbyEvents();
    }
  }, [location]);

  const fetchAllEvents = async () => {
    const { data, error } = await supabase.from('events').select('*');
    if (error) {
      console.error(error);
    }
    setEvents(data);
  };

  const fetchNearbyEvents = async () => {
    if (!location) {
      return;
    }
    const { data, error } = await supabase.rpc('nearby_events', {
      lat: location.coords.latitude,
      long: location.coords.longitude,
    });

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
