import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Card, List, Modal, Portal, Text } from 'react-native-paper';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import InjuryBroken from '../assets/injury-broken.svg';
import InjuryBurn from '../assets/injury-burn.svg';
import InjuryCut from '../assets/injury-cut.svg';
import InjuryMinor from '../assets/injury-minor.svg';
import InjurySprain from '../assets/injury-sprain.svg';
import FloatingCloseBtn from '../components/FloatingCloseBtn';

type Injury = {
  injury: string;
  treatment: Treatment[];
  icon: any;
};

type Treatment = {
  instruction: string;
  visual?: any;
};

const FIRST_AID_DATA: Injury[] = [
  {
    injury: 'Burns',
    treatment: [
      {
        instruction: 'Cool the burn with cool water for 10 minutes',
        visual: require('../assets/firstaid-visuals/burns_1.jpeg')
      },
      {
        instruction: 'Cover the burn with a sterile bandage',
        visual: require('../assets/firstaid-visuals/burns_2.jpeg')
      },
      {
        instruction: 'Seek medical attention'
      }
    ],
    icon: <InjuryBurn width={64} height={64} />
  },
  {
    injury: 'Sprains and Strains',
    treatment: [
      {
        instruction: 'Rest the injured area',
        visual: require('../assets/firstaid-visuals/sprain_1.jpeg')
      },
      {
        instruction: 'Apply ice to the injured area',
        visual: require('../assets/firstaid-visuals/sprain_2.jpeg')
      },
      {
        instruction: 'Seek medical attention'
      }
    ],
    icon: <InjurySprain width={64} height={64} />
  },
  {
    injury: 'Bruises',
    treatment: [
      {
        instruction: 'Apply ice to the injured area',
        visual: require('../assets/firstaid-visuals/bruise_1.jpeg')
      },
      {
        instruction: 'Apply a compression bandage',
        visual: require('../assets/firstaid-visuals/bruise_2.jpeg')
      },
      {
        instruction: 'Seek medical attention'
      }
    ],
    icon: <InjuryMinor width={64} height={64} />
  },
  {
    injury: 'Cuts and Abrasions',
    treatment: [
      {
        instruction: 'Clean the wound with soap and water',
        visual: require('../assets/firstaid-visuals/cuts_1.jpeg')
      },
      {
        instruction: 'Apply an antibiotic ointment',
        visual: require('../assets/firstaid-visuals/cuts_2.jpeg')
      },
      {
        instruction: 'Cover the wound with a sterile bandage',
        visual: require('../assets/firstaid-visuals/cuts_3.jpeg')
      },
      {
        instruction: 'Seek medical attention'
      }
    ],
    icon: <InjuryCut width={64} height={64} />
  },
  {
    injury: 'Broken Bones',
    treatment: [
      {
        instruction: 'Keep the affected limb still and immobilized',
        visual: require('../assets/firstaid-visuals/bone_1.jpeg')
      },
      {
        instruction: 'Apply ice to the injured area',
        visual: require('../assets/firstaid-visuals/bone_2.jpeg')
      },
      {
        instruction: 'Seek medical attention'
      }
    ],
    icon: <InjuryBroken width={64} height={64} />
  }
];

export default function FirstAid() {
  const [visible, setVisible] = React.useState(false);
  const [injury, setInjury] = React.useState<Injury | null>(null);
  const [isScrollAtEnd, setIsScrollAtEnd] = React.useState(false);

  const handleScroll = (event: {
    nativeEvent: {
      layoutMeasurement: any;
      contentOffset: any;
      contentSize: any;
    };
  }) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isAtEnd =
      layoutMeasurement.height + contentOffset.y >= contentSize.height;
    setIsScrollAtEnd(isAtEnd);
  };

  const showModal = (injury: Injury) => {
    setVisible(true);
    setInjury(injury);
  };

  const hideModal = () => setVisible(false);

  const getSteps = (injuryTreatment: Treatment[]) =>
    injuryTreatment.map((step, index) => {
      return (
        <View
          style={{
            marginBottom: 16
          }}
          key={index}
        >
          <View>
            <View style={styles.stepContainer}>
              <View style={styles.step}>
                <View style={styles.stepEclipseParent}>
                  <View style={styles.stepEclipseChild}>
                    <Text style={styles.textCommon}>{index + 1}</Text>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  maxWidth: '100%'
                }}
              >
                {step.instruction}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {step.visual && (
                <View
                  style={{
                    width: 300,
                    height: 300,
                    margin: 10
                  }}
                  key={index + 1}
                >
                  <Image
                    source={step.visual}
                    resizeMethod="scale"
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#000000'
                    }}
                  />
                </View>
              )}
            </View>
          </View>
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
          <View style={styles.modalHeaderContainer}>
            <View>
              <Text style={styles.textCommon} variant="titleLarge">
                {injury?.injury}
              </Text>
              <Text style={styles.modaSubheader} variant="bodyLarge">
                First aid tips:
              </Text>
            </View>
            <View style={styles.modalHeaderAction}>
              <TouchableOpacity onPress={hideModal}>
                <MaterialCommunityIcons
                  name="close"
                  size={32}
                  color="#ffffff"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView style={styles.injuryList} onScroll={handleScroll}>
          <View
            style={{
              marginBottom: '40%'
            }}
          >
            {injury ? getSteps(injury.treatment) : null}
          </View>
          <FloatingCloseBtn onPress={hideModal} visible={isScrollAtEnd} />
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
    height: '100%',
    maxHeight: '100%'
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#9384D1',
    padding: 10
  },
  modalHeaderAction: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  modalHeaderContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    alignItems: 'center',
    marginBottom: 10
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
    backgroundColor: '#9384D1',
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
