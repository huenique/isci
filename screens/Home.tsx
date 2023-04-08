import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { NavigationParams } from 'react-navigation';

type HomeOptionProps = {
  name: string;
  icon: string;
  onPress: () => void;
};

function createHomeOption(props: HomeOptionProps) {
  return (
    <Card style={styles.card} onPress={props.onPress} key={props.name}>
      <Card.Content>
        <Text>{props.name}</Text>
      </Card.Content>
    </Card>
  );
}

const HOME_OPTIONS = [
  {
    name: "Emergency Contact",
    icon: "emergencyContactIcon",
  },
  {
    name: "Evacuation Center",
    icon: "evacuationCenterIcon",
  },
  {
    name: "First Aid",
    icon: "firstAidIcon",
  },
  {
    name: "Information Assistance",
    icon: "informationAssistanceIcon",
  },
];

export default function Home({ navigation }: { navigation: NavigationParams }) {
  const homeOptionsComponents = HOME_OPTIONS.map((option) =>
    createHomeOption({
      ...option,
      onPress: () => navigation.navigate(option.name.replace(/\s+/g, "")),
    })
  );

  return <View style={styles.container}>{homeOptionsComponents}</View>;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  card: {
    // width: '25%',
  },
});
