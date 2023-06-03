import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Avatar,
  Button,
  Modal,
  Portal,
  Provider,
  RadioButton,
  Text,
  TextInput
} from 'react-native-paper';
import {
  DatePickerModal,
  en,
  registerTranslation
} from 'react-native-paper-dates';
import { SafeAreaProvider } from 'react-native-safe-area-context';

registerTranslation('en', en);

const db = SQLite.openDatabase('isci.db');

export default function UserAccount() {
  const [name, setName] = React.useState('');
  const [barangay, setBarangay] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [contactNumber, setContactNumber] = React.useState('');
  const [sex, setSex] = React.useState('male');
  const [birthdate, setBirthdate] = React.useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = React.useState(false);
  const [avatarUri, setAvatarUri] = React.useState<string | null>(null);

  const errCallback = (err: any) => {
    console.log('Error:', err);
  };

  const successCallback = () => {
    console.log('Success');
  };

  const handleSelectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log('Permission to access the media library is required');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.canceled && pickerResult.assets) {
      setAvatarUri(pickerResult.assets[0].uri);
    }
  };

  const handleSave = () => {
    db.transaction(
      (tx: any) => {
        tx.executeSql('DELETE FROM users;');
        tx.executeSql(
          'INSERT INTO users (1, name, barangay, street, contactNumber, sex, birthdate) VALUES (?, ?, ?, ?, ?, ?);',
          [name, barangay, street, contactNumber, sex, birthdate],
          () => console.log('User saved to database'),
          (error: any) => console.log('Error saving user to database:', error)
        );
      },
      errCallback,
      successCallback
    );
  };

  const handleToggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleSelectDate = (date: any) => {
    setIsCalendarVisible(false);
    setBirthdate(date);
  };

  React.useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, barangay TEXT, street TEXT, contactNumber TEXT, sex TEXT, birthdate TEXT);'
        );
        tx.executeSql('SELECT * FROM users LIMIT 1;', [], (_, { rows }) => {
          const user = rows.item(0);
          console.log('User:', user);

          if (user) {
            setName(user.name);
            setBarangay(user.barangay);
            setStreet(user.street);
            setContactNumber(user.contactNumber);
            setSex(user.sex);
            setBirthdate(user.birthdate);
          }
        });
      },
      errCallback,
      successCallback
    );
  }, []);

  return (
    <Provider>
      <SafeAreaProvider>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleSelectImage}>
            <Avatar.Image
              size={80}
              source={
                avatarUri ? { uri: avatarUri } : require('../assets/avatar.png')
              }
            />
          </TouchableOpacity>
          <TextInput
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            label="Barangay"
            value={barangay}
            onChangeText={(text) => setBarangay(text)}
          />
          <TextInput
            label="Street/Subdivision"
            value={street}
            onChangeText={(text) => setStreet(text)}
          />
          <TextInput
            label="Contact Number"
            value={contactNumber}
            onChangeText={(text) => setContactNumber(text)}
          />
          <RadioButton.Group
            onValueChange={(value) => setSex(value)}
            value={sex}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 8
              }}
            >
              <View style={styles.radioButtonContainer}>
                <RadioButton value="male" />
                <Text>Male</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton value="female" />
                <Text>Female</Text>
              </View>
            </View>
          </RadioButton.Group>
          <Button onPress={handleToggleCalendar}>Select Birthdate</Button>
          <Button onPress={handleSave}>Save</Button>
          <Portal>
            <Modal visible={isCalendarVisible} onDismiss={handleToggleCalendar}>
              <DatePickerModal
                locale="en"
                mode="single"
                visible={isCalendarVisible}
                onDismiss={handleToggleCalendar}
                dates={birthdate}
                onConfirm={handleSelectDate}
                animationType="none"
              />
            </Modal>
          </Portal>
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 16
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
