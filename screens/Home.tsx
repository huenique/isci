import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { NavigationParams } from "react-navigation";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type HomeOptionProps = {
  name: string;
  icon: string;
  onPress: () => void;
};

const HOME_OPTIONS = [
  {
    name: "Emergency Contact",
    icon: "contacts-outline",
  },
  {
    name: "Evacuation Center",
    icon: "exit-run",
  },
  {
    name: "First Aid",
    icon: "medical-bag",
  },
  {
    name: "Information Assistance",
    icon: "information-outline",
  },
];

function createHomeOption(props: HomeOptionProps) {
  return (
    <Card style={styles.card} onPress={props.onPress} key={props.name}>
      <Card.Content>
        <View style={styles.cardContent}>
          <MaterialCommunityIcons
            name={props.icon as "material-design"}
            size={48}
            color="white"
          />
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              fontSize: 16,
            }}
          >
            {props.name}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

export default function Home({ navigation }: any) {
  const homeOptionsComponents = HOME_OPTIONS.map((option) =>
    createHomeOption({
      ...option,
      onPress: () => navigation.jumpTo(option.name),
    })
  );

  return <View style={styles.container}>{homeOptionsComponents}</View>;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  card: {
    margin: 24,
    marginBottom: 0,
    backgroundColor: "#C0C4FF",
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
    padding: 10,
  },
});
