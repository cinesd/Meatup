import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import { supabase } from '~/utils/supabase';

export default function Attendance() {
  const { id } = useLocalSearchParams();
  const [attendees, setAttendees] = useState<any[]>([]);

  useEffect(() => {
    fetchAttendance();
  }, [id]);

  const fetchAttendance = async () => {
    const { data } = await supabase.from('attendance').select('*, profiles(*)').eq('event_id', id);

    setAttendees(data ?? []);
  };
  return (
    <View>
      <Text>Attendance</Text>
      <FlatList
        data={attendees}
        renderItem={({ item }) => (
          <View className="p-3">
            <Text className="text-lg font-bold">{item.profiles.full_name}</Text>
          </View>
        )}
      />
    </View>
  );
}
