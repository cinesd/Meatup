import { View, Text, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { supabase } from '~/utils/supabase';
import SupaImage from '~/components/SupaImage';
export default function EventListItems({ event }: { event: any }) {
  const [numberOfAttendees, setNumberOfAttendees] = useState(0);

  useEffect(() => {
    fetchAttendance();
  }, [event.id]);

  const fetchAttendance = async () => {
    const { count } = await supabase
      .from('attendance')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', event.id);

    setNumberOfAttendees(count ?? 0);
  };

  return (
    <Link href={`/event/${event.id}`} asChild>
      <Pressable>
        <View className="m-3 gap-3 border-b-2 border-gray-100 pb-3">
          <View className=" flex-row">
            <View className="flex-1">
              <Text className=" uppercase text-amber-800">
                {dayjs(event.date).format('ddd, DD MMM • HH:mm CEST')}
              </Text>
              <Text className="text-xl font-bold" numberOfLines={2}>
                {event.title}
              </Text>
              <Text className="text-sm text-gray-700">{event.location}</Text>
            </View>
            {event.image_uri && (
              <SupaImage path={event.image_uri ?? ''} className="aspect-video w-2/5 rounded-lg" />
            )}
          </View>
          <View className="flex-row gap-3">
            <Text className="mr-auto text-sm text-gray-500">
              {numberOfAttendees} going • {Math.round(event.dist_meters / 1000)} km away
            </Text>
            <Feather name="share" size={20} color="black" />
            <Feather name="bookmark" size={20} color="black" />
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
