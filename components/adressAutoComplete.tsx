import { View, TextInput } from 'react-native';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function AdressAutoComplete() {
  const [input, setInput] = useState('');
  const [locations, setLocations] = useState([]);

  return (
    <View>
      <View className="flex flex-row items-center gap-2">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="location"
          className="flex-1 rounded-md border border-gray-200 p-3"
        />
        <FontAwesome className="bg-red-800" name="search" size={24} color="black" />
      </View>
    </View>
  );
}
