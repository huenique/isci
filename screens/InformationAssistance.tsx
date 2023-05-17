import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Text } from 'react-native-paper';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import DisasterInfo, { Disaster } from '../components/DisasterInfo';

const DISASTER_INFO = [
  {
    disaster: 'Typhoon',
    icon: 'weather-hurricane',
    info: 'A typhoon is a powerful tropical cyclone that forms over the ocean and can bring sustained winds of at least 74 miles per hour, heavy rain, and storm surge to coastal areas. Typhoons can cause significant damage to buildings, infrastructure, and crops, and pose a serious threat to human life. The severity of a typhoon depends on various factors, including wind speed, storm surge, and the amount and duration of rainfall.',
    preparedness: [
      'Stay informed of the latest weather updates through local news and weather apps.',
      'Keep important documents in a waterproof container or in a cloud storage service.',
      'Regularly check your emergency kit and replenish supplies as necessary.',
      'Have a communication plan with family and friends in case you get separated during an emergency.',
      'Identify a safe location in your home or community where you can take shelter during a typhoon.',
      'Conduct drills with your family and practice evacuating to a safe location.'
    ]
  },
  {
    disaster: 'Fire',
    icon: 'pine-tree-fire',
    info: 'Fires can occur naturally, but they are often caused by human activity, such as careless smoking, unattended cooking, and faulty electrical wiring. Fires can range in size from small flames to large infernos that can destroy homes, businesses, and entire communities. In addition to causing property damage, fires pose a significant risk to human life and can cause smoke inhalation and burns.',
    preparedness: [
      'Stay informed of the latest weather updates through local news and weather apps.',
      'Keep important documents in a waterproof container or in a cloud storage service.',
      'Regularly check your emergency kit and replenish supplies as necessary.',
      'Have a communication plan with family and friends in case you get separated during an emergency.',
      'Identify a safe location in your home or community where you can take shelter during a typhoon.',
      'Conduct drills with your family and practice evacuating to a safe location.'
    ]
  },
  {
    disaster: 'Earthquake',
    icon: 'earth-off',
    info: "An earthquake is a sudden shaking of the Earth's surface caused by the movement of tectonic plates. Earthquakes can occur anywhere in the world and can range in intensity from mild tremors to major quakes that cause widespread damage and loss of life. They can trigger landslides, tsunamis, and volcanic activity. Seismic monitoring systems are used to detect and track seismic activity, and building codes and other measures are implemented to minimize the impact of earthquakes on people and infrastructure.",
    preparedness: [
      'Stay informed of the latest weather updates through local news and weather apps.',
      'Keep important documents in a waterproof container or in a cloud storage service.',
      'Regularly check your emergency kit and replenish supplies as necessary.',
      'Have a communication plan with family and friends in case you get separated during an emergency.',
      'Identify a safe location in your home or community where you can take shelter during a typhoon.',
      'Conduct drills with your family and practice evacuating to a safe location.'
    ]
  }
];

export default function InformationAssistance() {
  const [showMore, setShowMore] = React.useState(false);
  const [shownDisaster, setShownDisaster] = React.useState<Disaster>({
    disaster: '',
    info: '',
    preparedness: []
  });

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <ScrollView>
        {DISASTER_INFO.map((item, index) => (
          <Card key={index} style={styles.card}>
            <Card.Title
              title={
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <Text
                    style={{
                      marginRight: 4
                    }}
                  >
                    {item.disaster}
                  </Text>
                  <MaterialCommunityIcons
                    name={item.icon as 'material-design'}
                    size={16}
                    style={{
                      alignSelf: 'center'
                    }}
                  />
                </View>
              }
            />
            <Card.Content>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                }}
              >
                <Text
                  style={{
                    textAlign: 'justify'
                  }}
                >
                  {item.info}
                </Text>
                <Button
                  buttonColor="#9F9FB7"
                  textColor="#ffffff"
                  mode="contained-tonal"
                  onPress={() => {
                    setShownDisaster(item);
                    toggleShowMore();
                  }}
                >
                  Learn More
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <Modal
        contentContainerStyle={styles.modal}
        visible={showMore}
        onDismiss={toggleShowMore}
      >
        <DisasterInfo {...shownDisaster} />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10
  },
  modal: {
    backgroundColor: '#ffffff',
    padding: 16,
    margin: 16,
    borderRadius: 10
  }
});
