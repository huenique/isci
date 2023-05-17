import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { List, Text } from 'react-native-paper';

type Disaster = {
  disaster: string;
  info: string;
  safety: string[];
  firstaid: string[];
};

export default function DisasterInfo(props: Disaster) {
  const { safety, firstaid } = props;

  return (
    <List.Section
      style={{
        padding: 16
      }}
    >
      <List.AccordionGroup>
        <List.Accordion
          title="Disaster Information"
          id={1}
          style={{
            backgroundColor: '#ffffff'
          }}
        >
          <Text
            variant="titleMedium"
            style={{
              margin: 16,
              marginBottom: 0
            }}
          >
            {props.disaster}
          </Text>
          <Text
            variant="bodyMedium"
            style={{
              flexWrap: 'wrap',
              margin: 16,
              textAlign: 'justify'
            }}
          >
            {props.info}
          </Text>
        </List.Accordion>
        <List.Accordion
          title="Safety Tips"
          id={2}
          style={{
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#9F9FB7'
          }}
        >
          <Text
            style={{
              marginLeft: 16,
              marginRight: 16,
              textAlign: 'justify'
            }}
            variant="bodyMedium"
          >
            {
              'Preparing for natural disasters is crucial for reducing their impact. Governments and organizations have implemented various measures, including evacuation plans, building codes, and early warning systems to minimize the impact of these disasters. It is essential to remain vigilant and take steps to protect oneself and others in the event of a natural disaster.'
            }
          </Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ flexDirection: 'column', margin: 16 }}
          >
            {safety.map((practice, index) => (
              <List.Item
                key={index}
                title={practice}
                left={() => <List.Icon icon="information-outline" />}
              />
            ))}
          </ScrollView>
        </List.Accordion>
        <List.Accordion
          title="First Aid Kit"
          id={3}
          style={{
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#9F9FB7'
          }}
        >
          <Text
            style={{
              marginLeft: 16,
              marginRight: 16,
              textAlign: 'justify'
            }}
            variant="bodyMedium"
          >
            {
              'It is important to keep your first aid kit in a readily accessible location and to periodically check the expiration dates of items and restock as necessary. Additionally, it is recommended to have a basic understanding of first aid and CPR techniques'
            }
          </Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ flexDirection: 'column', margin: 16 }}
          >
            {firstaid.map((kit, index) => (
              <List.Item
                key={index}
                title={kit}
                left={() => <List.Icon icon="information-outline" />}
              />
            ))}
          </ScrollView>
        </List.Accordion>
      </List.AccordionGroup>
    </List.Section>
  );
}

export { Disaster };
