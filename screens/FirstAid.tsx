import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, List, Modal, Portal, Text } from 'react-native-paper';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import InjuryBroken from '../assets/injury-broken.svg';
import InjuryBurn from '../assets/injury-burn.svg';
import InjuryCut from '../assets/injury-cut.svg';
import InjuryMinor from '../assets/injury-minor.svg';
import InjurySprain from '../assets/injury-sprain.svg';

type Injury = {
  injury: string;
  treatment: string[];
};

const FIRST_AID_DATA = [
  {
    injury: 'Burns',
    treatment: [
      'Cool the burn with cool water for 10 minutes',
      'Cover the burn with a sterile bandage',
      'Seek medical attention'
    ],
    icon: <InjuryBurn width={64} height={64} />
  },
  {
    injury: 'Sprains and Strains',
    treatment: [
      'Rest the injured area',
      'Apply ice to the injured area',
      'Seek medical attention'
    ],
    icon: <InjurySprain width={64} height={64} />
  },
  {
    injury: 'Bruises',
    treatment: [
      'Apply ice to the injured area',
      'Apply a compression bandage',
      'Seek medical attention'
    ],
    icon: <InjuryMinor width={64} height={64} />
  },
  {
    injury: 'Cuts and Abrasions',
    treatment: [
      'Clean the wound with soap and water',
      'Apply an antibiotic ointment',
      'Cover the wound with a sterile bandage',
      'Seek medical attention'
    ],
    icon: <InjuryCut width={64} height={64} />
  },
  {
    injury: 'Broken Bones',
    treatment: [
      'Keep the affected limb still and immobilized',
      'Apply ice to the injured area',
      'Seek medical attention'
    ],
    icon: <InjuryBroken width={64} height={64} />
  }
];

export default function FirstAid() {
  const [visible, setVisible] = React.useState(false);
  const [injury, setInjury] = React.useState<Injury | null>(null);

  const showModal = (injury: Injury) => {
    setVisible(true);
    setInjury(injury);
  };

  const hideModal = () => setVisible(false);

  const getSteps = (injuryTreatment: string[]) =>
    injuryTreatment.map((step, index) => {
      return (
        <View style={styles.stepContainer} key={index}>
          <View style={styles.step}>
            <View style={styles.stepEclipseParent}>
              <View style={styles.stepEclipseChild}>
                <Text style={styles.textCommon}>{index + 1}</Text>
              </View>
            </View>
          </View>
          <Text>{step}</Text>
        </View>
      );
    });

  const infoModal = (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeaderAction}>
            <TouchableOpacity onPress={hideModal}>
              <MaterialCommunityIcons name="close" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalHeaderContainer}>
            <Text style={styles.textCommon} variant="titleLarge">
              {injury?.injury}
            </Text>
            <Text style={styles.modaSubheader} variant="bodyLarge">
              First aid tips:
            </Text>
          </View>
        </View>
        <ScrollView style={styles.injuryList}>
          {injury ? getSteps(injury.treatment) : <></>}
        </ScrollView>
      </Modal>
    </Portal>
  );

  const options = FIRST_AID_DATA.map((item, index) => {
    return (
      <Card onPress={() => showModal(item)} key={index} style={styles.option}>
        <Card.Content>
          <View style={styles.cardContentSection}>
            <View style={styles.cardIconText}>
              {item.icon}
              <Text variant="titleMedium">{item.injury}</Text>
            </View>
            <List.Icon icon="chevron-right" />
          </View>
        </Card.Content>
      </Card>
    );
  });

  return (
    <ScrollView>
      {infoModal}
      {options}
      <View style={{ marginBottom: 10 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  option: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: '#ffffff'
  },
  modal: {
    backgroundColor: '#ffffff',
    margin: 10,
    borderRadius: 10
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#C0C4FF',
    padding: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10
  },
  modalHeaderAction: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10
  },
  modalHeaderContainer: {
    padding: 10
  },
  textCommon: {
    color: '#ffffff',
    fontWeight: '700'
  },
  modaSubheader: {
    color: '#ffffff'
  },
  cardContentSection: {
    width: '100%',
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  injuryList: {
    padding: 10
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  step: {
    width: 48,
    height: 48,
    margin: 10
  },
  stepEclipseParent: {
    backgroundColor: 'rgba(192, 196, 255, 0.5)',
    width: 48,
    height: 48,
    borderRadius: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepEclipseChild: {
    width: 36,
    height: 36,
    borderRadius: 32,
    backgroundColor: '#C0C4FF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardIconText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  }
});
