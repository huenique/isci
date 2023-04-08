import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type HomeOptionProps = {
  title: string;
  icon: string;
  onPress: () => void;
};

const ROUTES = [
  {
    title: 'Emergency Contacts',
    name: 'Contacts',
    icon: 'contacts-outline'
  },
  {
    title: 'Evacuation Centers',
    name: 'Evacuation',
    icon: 'exit-run'
  },
  {
    title: 'First Aid',
    name: 'First Aid',
    icon: 'medical-bag'
  },
  {
    title: 'Information Assistance',
    name: 'Information',
    icon: 'information-outline'
  }
];

function createHomeOption(props: HomeOptionProps) {
  return (
    <Card style={styles.card} onPress={props.onPress} key={props.title}>
      <Card.Content>
        <View style={styles.cardContent}>
          <MaterialCommunityIcons
            name={props.icon as 'material-design'}
            size={48}
            color="white"
          />
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontSize: 16
            }}
          >
            {props.title}
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
    marginBottom: 0,
    backgroundColor: '#C0C4FF'
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
