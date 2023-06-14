import * as React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Divider, List, Modal, Paragraph, Portal, Text } from 'react-native-paper';

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

type Strats = {
  name: string;
  steps: {
    desc: string;
    visual: any;
  }[];
};

type Bandage = {
  name: string;
  visual: any;
  intro: string;
  subinfo: string;
  subinfo2: string[];
  subinfo3: string;
  strats: Strats[];
};

const FIRST_AID_BANDAGES: Bandage[] = [
  {
    name: 'Triangular Bandage',
    visual: require('../assets/bandages-visuals/triangular.png'),
    intro:
      'The most common materials for a triangle bandage, additionally referred to as a triangular sling, are cotton or muslin fabric. These bandages are extremely effective and adaptable. These can be used to apply the appropriate pressure to a bleeding wound or folded into a sling.',
    subinfo:
      "The base, the tip, and the ends make up a triangle's three constituent elements.",
    subinfo2: [
      "Base: The triangle bandage's longest portion.",
      "Point: This is the corner that faces away from the base's center."
    ],
    subinfo3: 'The final two corners make up the ends.',
    strats: [
      {
        name: 'AS AN ARM SLING',
        steps: [
          {
            desc: "1. Ask the victim to use their other hand to support their arm. Slide the triangle-shaped bandage slowly under the arm. The damaged arm's elbow should be where the triangle's point is located. Wrap the back of the neck with the bandage's upper end.",
            visual: require('../assets/bandages-visuals/triangular_arm_sling_1.png')
          },
          {
            desc: '2. To meet the top of the bandage at the shoulder on the damaged side, fold the lower end of the wrap up over the forearm.',
            visual: require('../assets/bandages-visuals/triangular_arm_sling_2.png')
          },
          {
            desc: '3. Tie the two ends of the bandage together in a reef knot above their collar bone and tuck in the free ends.',
            visual: require('../assets/bandages-visuals/triangular_arm_sling_3.png')
          },
          {
            desc: '4. Adjust the sling so that it supports their arm all the way to the end of their little finger.',
            visual: require('../assets/bandages-visuals/triangular_arm_sling_4.png')
          },
          {
            desc: "5. Make sure the bandage's elbow-side edge is fastened by twisting the cloth and tucking it in or by using a safety pin.",
            visual: require('../assets/bandages-visuals/triangular_arm_sling_5.png')
          },
          {
            desc: "6. Every 10 minutes, check the blood flow in their fingertips. When someone's nail becomes pale after being pressed for five seconds, they release the pressure to check whether the color comes back in two seconds.",
            visual: require('../assets/bandages-visuals/triangular_arm_sling_6.png')
          }
        ]
      },
      {
        name: 'AS AN ELEVATION SLING',
        steps: [
          {
            desc: '1. As the casualty is being helped, ask them to cross their damaged arm across their chest with their fingers resting on the opposing shoulder.',
            visual: require('../assets/bandages-visuals/triangular_elevation_sling_1.png')
          },
          {
            desc: "2. Place one end of the triangle bandage over their undamaged shoulder and place the other end over their chest and wounded arm. Just below the elbow on the damaged side, hold the bandage's tip in place.",
            visual: require('../assets/bandages-visuals/triangular_elevation_sling_2.png')
          },
          {
            desc: "3. Put the bandage's lowest portion beneath the hurt arm. Bring it across their back in a diagonal motion, joining the other end of the bandage at their shoulder.",
            visual: require('../assets/bandages-visuals/triangular_elevation_sling_3.png')
          },
          {
            desc: '4. Tie the two ends of the bandage together in a reef knot above their collar bone and tuck in the free ends.',
            visual: require('../assets/bandages-visuals/triangular_elevation_sling_4.png')
          },
          {
            desc: '5. Make sure that the edge of the bandage by the elbow is secured by twisting the fabric and tucking it in, or using a safety pin to fasten.',
            visual: require('../assets/bandages-visuals/triangular_elevation_sling_5.png')
          },
          {
            desc: "6. Check the circulation in their thumb every 10 minutes. If it's too tight, then loosen the sling and readjust.",
            visual: require('../assets/bandages-visuals/triangular_elevation_sling_6.png')
          }
        ]
      }
    ]
  }
];

type Tip = {
  name: string;
  visual: any;
  intro: string;
  steps: {
    desc: string;
    visual: any;
  }[];
};

const FIRST_AID_TIPS: Tip[] = [
  {
    name: 'Applying a compression wrap for a sprained ankle',
    visual: require('../assets/tips-visuals/sprained_ankle.png'),
    intro:
      'To reduce swelling and improve the comfort of your ankle, try a compression bandage. It does not support or restrain the ankle, thus other than serving as a warning to be mindful of your ankle, it does not protect it.',
    steps: [
      {
        desc: "1. If the elastic bandage isn't already pulled up, roll it up. Hold your ankle at a 90-degree angle, approximately. Start at the point where your toes and foot body converge. At the side of your foot, hold the bandage's loose end. Once around the ball of your foot, wrap the bandage, keeping it relatively taut with a little pull.",
        visual: require('../assets/tips-visuals/sprained_ankle_tip_1.png')
      },
      {
        desc: "2. After that, carefully begin to work your way around the foot's arch. Draw the bandage diagonally over the top of the foot from the bottom of the toes to the ankle. The bandage should now be applied in a figure-eight pattern diagonally over the top of the foot and beneath the arch.",
        visual: require('../assets/tips-visuals/sprained_ankle_tip_2.png')
      },
      {
        desc: "3. When you come to the anklebone if you're using a felt pad, wrap the bandage around the felt piece to keep it in place beneath the anklebone. Continue in a figure-eight pattern around the foot and ankle, traveling from heel to calf at the bottom and top of the eight.",
        visual: require('../assets/tips-visuals/sprained_ankle_tip_3.png')
      },
      {
        desc: "4. All of the foot should be wrapped, and it should stop approximately 8 to 10 centimeters (3 to 4 inches) above the ankle. Compression wraps often have clip fasteners or self-fastening closures. Alternatively, tape the end shut. Even though the wrap should be tight, the foot's blood flow shouldn't be restricted.",
        visual: require('../assets/tips-visuals/sprained_ankle_tip_4.png')
      }
    ]
  }
];

export default function FirstAid() {
  const [tip, setTip] = React.useState<Tip | null>(null);
  const [tipVisible, setTipVisible] = React.useState(false);
  const [bandage, setBandage] = React.useState<Bandage | null>(null);
  const [instructVisible, setInstructVisible] = React.useState(false);
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

  const getBandage = (bandage: Bandage) => {
    return (
      <Card
        style={{
          borderRadius: 0
        }}
      >
        <Card.Content>
          <View
            style={{
              alignItems: 'center'
            }}
          >
            <Image
              source={bandage ? bandage.visual : null}
              resizeMethod="scale"
              resizeMode="contain"
              style={{
                marginBottom: 10,
                marginTop: 10,
                height: 300,
                width: 300
              }}
            />
          </View>
          <Paragraph
            style={{
              textAlign: 'justify',
              marginBottom: 10
            }}
          >
            {bandage.intro}
          </Paragraph>
          <Paragraph
            style={{
              textAlign: 'justify',
              marginBottom: 10
            }}
          >
            {bandage.subinfo}
          </Paragraph>
          <Paragraph
            style={{
              textAlign: 'justify',
              marginBottom: 10
            }}
          >
            {bandage.subinfo2.join('\n')}
          </Paragraph>
          <Paragraph
            style={{
              textAlign: 'justify',
              marginBottom: 10
            }}
          >
            {bandage.subinfo3}
          </Paragraph>
        </Card.Content>
        {bandage.strats.map((strat, index) => (
          <View key={index}>
            <Divider
              horizontalInset={true}
              style={{
                marginBottom: 10,
                marginTop: 10
              }}
            />
            <Card.Content
              style={{
                marginBottom: 20
              }}
            >
              <Text variant="titleMedium">{strat.name}</Text>
              {strat.steps.map((step, stepIndex) => (
                <React.Fragment key={stepIndex}>
                  <Paragraph
                    style={{
                      textAlign: 'justify'
                    }}
                  >
                    {step.desc}
                  </Paragraph>
                  {step.visual && (
                    <View
                      style={{
                        alignItems: 'center'
                      }}
                    >
                      <Image
                        resizeMethod="scale"
                        resizeMode="contain"
                        style={{
                          marginBottom: 10,
                          marginTop: 10,
                          height: 300,
                          width: 300
                        }}
                        source={step.visual}
                      />
                    </View>
                  )}
                </React.Fragment>
              ))}
            </Card.Content>
          </View>
        ))}
      </Card>
    );
  };

  const bandageModal = (
    <Portal>
      <Modal
        visible={instructVisible}
        onDismiss={() => setInstructVisible(false)}
        contentContainerStyle={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeaderContainer}>
            <View>
              <Text style={styles.textCommon} variant="titleLarge">
                {bandage ? bandage.name : null}
              </Text>
            </View>
            <View style={styles.modalHeaderAction}>
              <TouchableOpacity onPress={() => setInstructVisible(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={32}
                  color="#ffffff"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView onScroll={handleScroll}>
          {bandage ? getBandage(bandage) : null}
        </ScrollView>
      </Modal>
    </Portal>
  );

  const bandages = FIRST_AID_BANDAGES.map((item, index) => {
    return (
      <Card
        onPress={() => {
          setInstructVisible(true);
          setBandage(item);
        }}
        key={index}
        style={styles.option}
      >
        <Card.Content>
          <View style={{ ...styles.cardContentSection, ...{ height: 24 } }}>
            <View style={styles.cardIconText}>
              <Text variant="titleMedium">{item.name}</Text>
            </View>
            <List.Icon icon="chevron-right" />
          </View>
        </Card.Content>
      </Card>
    );
  });

  const getTip = (tip: Tip) => {
    return (
      <Card
        style={{
          borderRadius: 0
        }}
      >
        <Card.Content>
          <Text variant="titleSmall">{tip ? tip.name : null}</Text>
          <Divider
            style={{
              marginBottom: 10,
              marginTop: 10
            }}
          />
          <View
            style={{
              alignItems: 'center'
            }}
          >
            <Image
              source={tip ? tip.visual : null}
              resizeMethod="scale"
              resizeMode="contain"
              style={{
                marginBottom: 10,
                marginTop: 10,
                height: 300,
                width: 300
              }}
            />
          </View>
          <Paragraph
            style={{
              textAlign: 'justify',
              marginBottom: 10
            }}
          >
            {tip.intro}
          </Paragraph>
        </Card.Content>
        {tip.steps.map((step, index) => (
          <View key={index}>
            <Divider
              horizontalInset={true}
              style={{
                marginBottom: 10,
                marginTop: 10
              }}
            />
            <Card.Content
              style={{
                marginBottom: 20
              }}
            >
              <React.Fragment>
                <Paragraph
                  style={{
                    textAlign: 'justify'
                  }}
                >
                  {step.desc}
                </Paragraph>
                {step.visual && (
                  <View
                    style={{
                      alignItems: 'center'
                    }}
                  >
                    <Image
                      resizeMethod="scale"
                      resizeMode="contain"
                      style={{
                        marginBottom: 10,
                        marginTop: 10,
                        height: 300,
                        width: 300
                      }}
                      source={step.visual}
                    />
                  </View>
                )}
              </React.Fragment>
            </Card.Content>
          </View>
        ))}
      </Card>
    );
  };

  const tipModal = (
    <Portal>
      <Modal
        visible={tipVisible}
        onDismiss={() => setTipVisible(false)}
        contentContainerStyle={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeaderContainer}>
            <View></View>
            <View style={styles.modalHeaderAction}>
              <TouchableOpacity onPress={() => setTipVisible(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={32}
                  color="#ffffff"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView onScroll={handleScroll}>
          {tip ? getTip(tip) : null}
        </ScrollView>
      </Modal>
    </Portal>
  );

  const tips = FIRST_AID_TIPS.map((tip, index) => {
    return (
      <Card
        onPress={() => {
          setTipVisible(true);
          setTip(tip);
        }}
        key={index}
        style={styles.option}
      >
        <Card.Content>
          <View style={{ ...styles.cardContentSection, ...{ height: 48 } }}>
            <View style={styles.cardIconText}>
              <Text
                variant="bodyMedium"
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  maxWidth: 300
                }}
              >
                {tip.name}
              </Text>
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
      {bandageModal}
      {tipModal}
      <Text
        variant="labelLarge"
        style={{
          marginTop: 16,
          marginLeft: 16,
          marginBottom: 16
        }}
      >
        Injuries and Treatments
      </Text>
      <View
        style={{
          marginBottom: 28
        }}
      >
        {options}
      </View>
      <Divider horizontalInset={true} />
      <Text
        variant="labelLarge"
        style={{
          marginTop: 16,
          marginLeft: 16,
          marginBottom: 16
        }}
      >
        Dressings and Bandages
      </Text>
      <View
        style={{
          marginBottom: 28
        }}
      >
        {bandages}
      </View>
      <Divider horizontalInset={true} />
      <Text
        variant="labelLarge"
        style={{
          marginTop: 16,
          marginLeft: 16,
          marginBottom: 16
        }}
      >
        Tips and Tricks
      </Text>
      <View
        style={{
          marginBottom: 28
        }}
      >
        {tips}
      </View>
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
