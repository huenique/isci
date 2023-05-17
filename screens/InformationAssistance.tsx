import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Portal, Text } from 'react-native-paper';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import DisasterInfo, { Disaster } from '../components/DisasterInfo';

const DISASTER_INFO = [
  {
    disaster: 'Typhoon',
    icon: 'weather-hurricane',
    info: 'A typhoon is a powerful tropical cyclone that forms over the ocean and can bring sustained winds of at least 74 miles per hour, heavy rain, and storm surge to coastal areas. Typhoons can cause significant damage to buildings, infrastructure, and crops, and pose a serious threat to human life. The severity of a typhoon depends on various factors, including wind speed, storm surge, and the amount and duration of rainfall.',
    safety: [
      'Stay informed of the latest weather updates through local news and weather apps.',
      'Keep important documents in a waterproof container or in a cloud storage service.',
      'Regularly check your emergency kit and replenish supplies as necessary.',
      'Have a communication plan with family and friends in case you get separated during an emergency.',
      'Identify a safe location in your home or community where you can take shelter during a typhoon.',
      'Conduct drills with your family and practice evacuating to a safe location.'
    ],
    firstaid: [
      'Bandages, gauze, and adhesive tape for wound care.',
      'Antiseptic wipes or solution for cleaning wounds.',
      'Tweezers to remove foreign objects from wounds.',
      'Pain relievers, such as acetaminophen or ibuprofen.',
      'Anti-diarrheal medication.',
      'Antihistamines for allergic reactions.',
      'Personal medications, such as insulin or asthma inhalers.',
      'First aid manual.'
    ]
  },
  {
    disaster: 'Fire',
    icon: 'pine-tree-fire',
    info: 'Fires can occur naturally, but they are often caused by human activity, such as careless smoking, unattended cooking, and faulty electrical wiring. Fires can range in size from small flames to large infernos that can destroy homes, businesses, and entire communities. In addition to causing property damage, fires pose a significant risk to human life and can cause smoke inhalation and burns.',
    safety: [
      'Regularly check smoke alarms and carbon monoxide detectors to ensure they are working.',
      'Keep flammable items away from heat sources and always supervise cooking activities.',
      'Have a designated meeting place outside your home in case of a fire.',
      'Practice your fire escape plan with your family and make sure everyone knows what to do in case of a fire.',
      'Check electrical outlets, cords, and appliances for signs of wear and tear.',
      'Ensure that fire extinguishers are easily accessible and everyone knows how to use them.'
    ],
    firstaid: [
      'Burn cream or aloe vera gel for treating burns.',
      'Cold packs for reducing pain and swelling from burns.',
      'Non-stick gauze for covering burns.',
      'Sterile saline solution for flushing eyes and wounds.',
      'Tweezers for removing debris from wounds.',
      'Bandages and adhesive tape for wound care.',
      'Pain relievers, such as acetaminophen or ibuprofen.',
      'First aid manual.'
    ]
  },
  {
    disaster: 'Earthquake',
    icon: 'earth-off',
    info: "An earthquake is a sudden shaking of the Earth's surface caused by the movement of tectonic plates. Earthquakes can occur anywhere in the world and can range in intensity from mild tremors to major quakes that cause widespread damage and loss of life. They can trigger landslides, tsunamis, and volcanic activity. Seismic monitoring systems are used to detect and track seismic activity, and building codes and other measures are implemented to minimize the impact of earthquakes on people and infrastructure.",
    safety: [
      'Secure heavy objects and furniture to prevent them from falling and causing injury or damage.',
      'Conduct regular safety inspections of your home and address any potential hazards.',
      "Learn the proper technique for 'Drop, Cover, and Hold On' and practice it regularly with your family.",
      'Identify safe locations in your home and community where you can take shelter during an earthquake.',
      'Conduct drills with your family and practice evacuating to a safe location.',
      'Keep a pair of sturdy shoes and a flashlight near your bed in case of an earthquake at night.'
    ],
    firstaid: [
      'Burn cream or aloe vera gel for treating burns.',
      'Cold packs for reducing pain and swelling from burns.',
      'Non-stick gauze for covering burns.',
      'Sterile saline solution for flushing eyes and wounds.',
      'Tweezers for removing debris from wounds.',
      'Bandages and adhesive tape for wound care.',
      'Pain relievers, such as acetaminophen or ibuprofen.',
      'First aid manual.'
    ]
  }
];

export default function InformationAssistance() {
  const [showMore, setShowMore] = React.useState(false);
  const [shownDisaster, setShownDisaster] = React.useState<Disaster>({
    disaster: '',
    info: '',
    safety: [],
    firstaid: []
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
      <Portal>
        <Modal
          contentContainerStyle={styles.modal}
          visible={showMore}
          onDismiss={toggleShowMore}
        >
          <ScrollView style={{}}>
            <DisasterInfo {...shownDisaster} />
          </ScrollView>
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10
  },
  modal: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 4,
    borderRadius: 10,
    maxHeight: '80%'
  }
});
