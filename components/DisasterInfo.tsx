import * as React from 'react';
import { ScrollView } from 'react-native';
import { List, Text } from 'react-native-paper';

type Disaster = {
  disaster: string;
  info: string;
  preparedness: string[];
};

export default function DisasterInfo(props: Disaster) {
  const { preparedness } = props;

  return (
    <List.Section>
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
              margin: 16
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
          title="Preparedness"
          id={2}
          style={{
            backgroundColor: '#ffffff'
          }}
        >
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ flexDirection: 'column', margin: 16 }}
          >
            {preparedness.map((practice, index) => (
              <List.Item
                key={index}
                title={practice}
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
