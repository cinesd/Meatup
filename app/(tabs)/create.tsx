import { View, TextInput, Text, Pressable, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';
import { supabase } from '~/utils/supabase';
import { useAuth } from '~/context/AuthProvider';
import { router } from 'expo-router';
export default function CreateEvent() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { user } = useAuth();

  const createEvent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .insert([{ title, description, date: date.toISOString(), user_id: user?.id }])
      .select()
      .single(); // Returns: { data: { id: 1, title: "My Event", ... } }
    //Example without .single():
    // Returns: { data: [{ id: 1, title: "My Event", ... }] }
    if (error) {
      Alert.alert('Failed to create the event', error.message);
    } else {
      setTitle('');
      setDescription('');
      setDate(new Date());
      router.push(`/event/${data.id}`);
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 gap-4 bg-white p-5">
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        className="rounded-md border border-gray-200 p-3"
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        className="min-h-32 rounded-md border border-gray-200 p-3"
      />
      <Text
        onPress={() => setOpen(true)}
        className="rounded-md border border-gray-200 p-3 text-lg text-gray-500">
        {date.toLocaleString()}
      </Text>

      <DatePicker
        modal
        open={open}
        date={date}
        minimumDate={new Date()}
        minuteInterval={15}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Pressable
        onPress={() => createEvent()}
        disabled={loading}
        className="mt-auto items-center rounded-md bg-red-500 p-3 px-8">
        <Text className="text-lg font-bold text-white">Create</Text>
      </Pressable>
    </View>
  );
}
