import { Stack } from 'expo-router';
import { FlatList } from 'react-native';
import EventListItems from '~/components/EventListItems';
import { supabase } from '~/utils/supabase';
import { useState, useEffect } from 'react';

// Define an interface for your event type
interface Event {
  id: number;
  date: string;
  title: string;
  // other event properties
  numberOfAttendees?: number;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    // Step 1: Fetch all events
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (eventsError) {
      console.error(eventsError);
      return;
    }

    // Step 2: Fetch attendance counts
    const { data: attendanceCounts, error: attendanceError } = await supabase
      .from('attendance')
      .select('event_id, count')
      .eq('count', '*');

    if (attendanceError) {
      console.error(attendanceError);
      return;
    }

    // Step 3: Create a lookup for attendance counts
    const attendanceMap = (attendanceCounts || []).reduce(
      (acc, item: { event_id: number; count: number }) => {
        acc[item.event_id] = item.count;
        return acc;
      },
      {} as Record<number, number>
    );

    // Step 4: Merge attendance counts into events
    const formattedData = (events || []).map((event) => ({
      ...event,
      numberOfAttendees: attendanceMap[event.id] || 0,
    }));

    // Step 5: Save to state
    setEvents(formattedData);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <FlatList
        data={events}
        renderItem={({ item }) => <EventListItems event={item} />}
        keyExtractor={(item) => item.id.toString()}
        className="bg-white"
      />
    </>
  );
}
