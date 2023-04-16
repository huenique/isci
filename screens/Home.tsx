import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type HomeOptionProps = {
  name: string;
  icon: string;
  onPress: () => void;
};

const ROUTES = [
  {
    name: 'Emergency Contacts',
    icon: 'contacts-outline'
  },
  {
    name: 'Evacuation Center',
    icon: 'exit-run'
  },
  {
    name: 'First Aid',
    icon: 'medical-bag'
  },
  {
    name: 'Information Assistance',
    icon: 'information-outline'
  }
];

function createHomeOption(props: HomeOptionProps) {
  const theme = useTheme();

  return (
    <Card
      style={{ ...styles.card, backgroundColor: theme.colors.primary }}
      onPress={props.onPress}
      key={props.name}
    >
      <Card.Content>
        <View style={styles.cardContent}>
          <MaterialCommunityIcons
            name={props.icon as 'material-design'}
            size={48}
            color="white"
          />
          <Text style={styles.cardTitle} variant="titleMedium">
            {props.name}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

export default function Home({ navigation }: any) {
  const homeOptionsComponents = ROUTES.map((option) =>
    createHomeOption({
      ...option,
      onPress: () => navigation.jumpTo(option.name)
    })
  );

  return <View style={styles.container}>{homeOptionsComponents}</View>;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  card: {
    margin: 24,
    marginBottom: 0
  },
  cardTitle: {
    color: 'white'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
    padding: 10
  }
});
