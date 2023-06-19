import * as Linking from 'expo-linking';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Dialog,
  List,
  Portal,
  Provider,
  Text,
  useTheme
} from 'react-native-paper';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type Contact = {
  cellphone: string | null;
};

const CONTACTS: {
  name: string;
  icon: string;
  contact: Contact;
}[] = [
  {
    name: 'National Emergency Hotline',
    icon: 'car-emergency',
    contact: {
      cellphone: '911',
    }
  },
  {
    name: 'Tayabas City Disaster Risk Reduction and Management Office',
    icon: 'office-building',
    contact: {
      cellphone: '0951 218 1022',
    }
  },
  {
    name: 'Tayabas City Police Station',
    icon: 'police-badge',
    contact: {
      cellphone: '0917 839 8483',
    }
  },
  {
    name: 'Tayabas City Fire Station',
    icon: 'fire-truck',
    contact: {
      cellphone: '0932 140 2703',
    }
  },
  {
    name: 'Tayabas Community Hospital',
    icon: 'hospital-building',
    contact: {
      cellphone: '0945 273 8398',
    }
  }
];

export default function EmergencyContacts() {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<Contact>({
    cellphone: null,
  });

  const showDialog = (contact: Contact) => {
    setDialogContent(contact);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  const callNumber = () => Linking.openURL(`tel:${dialogContent.cellphone}`);

  const contacts = CONTACTS.map((contact) => (
    <List.Item
      key={contact.name}
      title={<Text style={{ color: '#000000' }}>{contact.name}</Text>}
      left={(props) => (
        <List.Icon {...props} icon={contact.icon} color="#000000" />
      )}
      right={(props) => (
        <List.Icon {...props} icon="chevron-right" color="#000000" />
      )}
      onPress={() => showDialog(contact.contact)}
      style={styles.listItem}
    />
  ));

  return (
    <Provider>
      <View>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={styles.dialog}
          >
            <Dialog.Content style={styles.dialogContent}>
              {dialogContent.cellphone ? (
                <View style={styles.dialogContentItem}>
                  <MaterialCommunityIcons
                    name="cellphone"
                    size={32}
                    color={theme.colors.primary}
                  />
                  <Text
                    style={{ color: theme.colors.primary }}
                    variant="bodyLarge"
                  >
                    {dialogContent.cellphone}
                  </Text>
                </View>
              ) : null}
            </Dialog.Content>
            <Dialog.Actions>
              <Button textColor="#000000" onPress={hideDialog}>
                Cancel
              </Button>
              <Button
                textColor={
                  dialogContent.cellphone
                    ? theme.colors.primary
                    : 'rgba(0, 0, 0, 0.502)'
                }
                disabled={!dialogContent.cellphone}
                onPress={callNumber}
              >
                Call
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        {contacts}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 6,
    backgroundColor: '#ffffff'
  },
  listItem: {
    height: 64,
    marginBottom: 2
  },
  dialogContent: {
    display: 'flex',
    gap: 10
  },
  dialogContentItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
});
