import { View, Text, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import dayjs from 'dayjs';

export default function EventListItems({ event }: { event: any }) {
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
            <Image source={{ uri: event.image }} className="aspect-video w-2/5 rounded-lg" />
          </View>
          <View className="flex-row gap-3">
            <Text className="mr-auto text-sm text-gray-500">16 going • ICON</Text>
            <Feather name="share" size={20} color="black" />
            <Feather name="bookmark" size={20} color="black" />
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
