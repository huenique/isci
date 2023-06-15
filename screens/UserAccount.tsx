import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Avatar,
  Button,
  Dialog,
  Modal,
  Portal,
  RadioButton,
  Text,
  TextInput
} from 'react-native-paper';
import {
  DatePickerModal,
  en,
  registerTranslation
} from 'react-native-paper-dates';

import { scheduleUserNotification } from '../utils/notification';

registerTranslation('en', en);

const db = SQLite.openDatabase('isci.db');

function isoToCommonDate(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Adding 1 because months are zero-based
  const day = date.getDate();

  return `${month}/${day}/${year}`;
}

async function convertImageToBase64(imageUri: string): Promise<string> {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function UserAccount() {
  const [name, setName] = React.useState('');
  const [barangay, setBarangay] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [contactNumber, setContactNumber] = React.useState('');
  const [sex, setSex] = React.useState('male');
  const [birthdate, setBirthdate] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [age, setAge] = React.useState('');
  const [allergies, setAllergies] = React.useState('');
  const [diseases, setDiseases] = React.useState('');
  const [medicine, setMedicine] = React.useState('');
  const [isCalendarVisible, setIsCalendarVisible] = React.useState(false);
  const [avatar, setAvatar] = React.useState('');
  const [successModalVisible, setSuccessModalVisible] = React.useState(false);

  const errCallback = (err: any) => console.error('Error:', err);

  const successCallback = () => setSuccessModalVisible(true);

  const handleSelectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log('Permission to access the media library is required');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.canceled && pickerResult.assets) {
      const selectedImageUri = pickerResult.assets[0].uri;
      const base64Data = await convertImageToBase64(selectedImageUri);

      setAvatar(base64Data);
    }
  };

  const handleSave = () => {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        const insertUserQuery = `
        INSERT INTO users (
          name,
          barangay,
          street,
          contactNumber,
          sex,
          height,
          birthdate,
          weight,
          age,
          allergies,
          diseases,
          medicine,
          avatar
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
        `;

        tx.executeSql('DELETE FROM users;');
        tx.executeSql(
          insertUserQuery,
          [
            name,
            barangay,
            street,
            contactNumber,
            sex,
            birthdate,
            height,
            weight,
            age,
            allergies,
            diseases,
            medicine,
            avatar
          ],
          () => scheduleUserNotification(),
          (_transaction: SQLite.SQLTransaction, _error: SQLite.SQLError) => {
            return true;
          }
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
    setBirthdate(isoToCommonDate(date.date));
  };

  const hideDialog = () => setSuccessModalVisible(false);

  React.useEffect(() => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      barangay TEXT,
      street TEXT,
      contactNumber TEXT,
      sex TEXT,
      birthdate TEXT,
      height TEXT,
      weight TEXT,
      age TEXT,
      allergies TEXT,
      diseases TEXT,
      medicine TEXT,
      avatar TEXT
    );
  `;

    db.transaction((tx) => {
      tx.executeSql(createTableQuery);
      tx.executeSql(
        'SELECT * FROM users LIMIT 1;',
        [],
        (_, { rows }) => {
          const user = rows.item(0);
          if (user) {
            setName(user.name);
            setBarangay(user.barangay);
            setStreet(user.street);
            setContactNumber(user.contactNumber);
            setSex(user.sex);
            setBirthdate(user.birthdate);
            setHeight(user.height);
            setWeight(user.weight);
            setAge(user.age);
            setAllergies(user.allergies);
            setDiseases(user.diseases);
            setMedicine(user.medicine);
            setAvatar(user.avatar);
          }
        },
        (_transaction: SQLite.SQLTransaction, _error: SQLite.SQLError) => {
          return true;
        }
      );
    }, errCallback);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Portal>
          <Dialog visible={successModalVisible} onDismiss={hideDialog}>
            <Dialog.Title>Success!</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Your information has been successfully saved.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <TouchableOpacity onPress={handleSelectImage}>
          <Avatar.Image
            size={80}
            source={avatar ? { uri: avatar } : require('../assets/avatar.png')}
          />
        </TouchableOpacity>

        {/* Section 1 */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8
          }}
        >
          <TextInput
            label="Height (cm)"
            value={height}
            onChangeText={(text) => setHeight(text)}
            mode="outlined"
            keyboardType="numeric"
          />
          <TextInput
            label="Weight"
            value={weight}
            onChangeText={(text) => setWeight(text)}
            mode="outlined"
            keyboardType="numeric"
          />
          <TextInput
            label="Age"
            value={age}
            onChangeText={(text) => setAge(text)}
            mode="outlined"
            keyboardType="numeric"
          />
        </View>

        {/* Section 2 */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8
          }}
        >
          <Text style={styles.sectionTitle}>Health Information</Text>
          <TextInput
            label="Allergies"
            value={allergies}
            onChangeText={(text) => setAllergies(text)}
            mode="outlined"
          />
          <TextInput
            label="Diseases"
            value={diseases}
            onChangeText={(text) => setDiseases(text)}
            mode="outlined"
          />
          <TextInput
            label="Medicine"
            value={medicine}
            onChangeText={(text) => setMedicine(text)}
            mode="outlined"
          />
        </View>

        {/* Section 3 */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8
          }}
        >
          <Text style={styles.sectionTitle}>Extra Personal Information</Text>
          <TextInput
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            mode="outlined"
          />
          <TextInput
            label="Barangay"
            value={barangay}
            onChangeText={(text) => setBarangay(text)}
            mode="outlined"
          />
          <TextInput
            label="Street/Subdivision"
            value={street}
            onChangeText={(text) => setStreet(text)}
            mode="outlined"
          />
          <TextInput
            label="Contact Number"
            value={contactNumber}
            onChangeText={(text) => setContactNumber(text)}
            mode="outlined"
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
          <TextInput
            label="Date of Birth"
            value={birthdate}
            mode="outlined"
            disabled={true}
          />
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start'
            }}
          ></View>
          <Button
            style={{
              alignSelf: 'flex-start'
            }}
            onPress={handleToggleCalendar}
            mode="outlined"
          >
            Select Birthdate
          </Button>
        </View>
        <Button onPress={handleSave} mode="contained">
          Save
        </Button>
        <Portal>
          <Modal visible={isCalendarVisible} onDismiss={handleToggleCalendar}>
            <DatePickerModal
              locale="en"
              mode="single"
              visible={isCalendarVisible}
              onDismiss={handleToggleCalendar}
              onConfirm={handleSelectDate}
              animationType="none"
            />
          </Modal>
        </Portal>
      </View>
    </ScrollView>
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16
  }
});
