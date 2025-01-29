import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { supabase } from '~/utils/supabase';
import { useAuth } from '~/context/AuthProvider';

export default function Event() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState<any>(null);

  const { user } = useAuth();

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
    setEvent(data);

    const { data: dataAttendance, error: errorAttendance } = await supabase
      .from('attendance')
      .select('*')
      .eq('user_id', user?.id)
      .eq('event_id', id)
      .single();

    setJoined(dataAttendance);

    setLoading(false);
  };

  const joinEvent = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .insert({
        event_id: event.id,
        user_id: user?.id,
      })
      .select()
      .single();

    setJoined(data);
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  return (
    <View className="flex-1 gap-3 bg-white p-4">
      <Stack.Screen options={{ title: 'Event', headerTintColor: 'black' }} />
      <Image source={{ uri: event.image_uri }} className="aspect-video w-full rounded-lg" />
      <Text className="text-2xl font-bold">{event.title}</Text>
      <Text className=" uppercase text-amber-800">
        {dayjs(event.date).format('ddd, DD MMM • HH:mm CEST')}
      </Text>
      <Text className="text-lg">{event.description}</Text>
      <Link href={`/event/${event.id}/attendance`} className="text-blue-500">
        View Attendance
      </Link>
      {/* Footer */}
      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between border-t-2 border-gray-300 p-5 pb-10">
        <Text className="text-xl font-semibold">Free</Text>
        {joined ? (
          <Text className="text-lg font-bold text-green-500">You are joined</Text>
        ) : (
          <Pressable onPress={joinEvent} className="rounded-md bg-red-500 p-5 px-8">
            <Text className="text-lg font-bold text-white">Join and RSVP</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
