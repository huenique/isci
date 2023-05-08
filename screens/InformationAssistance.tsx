import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SegmentedButtons, useTheme } from 'react-native-paper';

export default function InformationAssistance() {
  const theme = useTheme();
  const [value, setValue] = React.useState('');

  const getButtonStyle = (selectedValue: string, value: string) => {
    if (selectedValue === value) {
      return [
        styles.button,
        {
          backgroundColor: theme.colors.primary,
          borderBottomWidth: 1,
          borderBottomColor: 'black'
        }
      ];
    }

    return styles.button;
  };

  const getButton = (selectedValue: string, value: string, label: string) => ({
    value,
    label,
    uncheckedColor: '#ffffff',
    style: getButtonStyle(selectedValue, value),
    accessibilityLabel: label
  });

  const updateButtonStyle = (selectedValue: string) => {
    return [
      getButton(selectedValue, 'before', 'BEFORE'),
      getButton(selectedValue, 'during', 'DURING'),
      getButton(selectedValue, 'after', 'AFTER')
    ];
  };

  const [buttons, setButtons] = React.useState(updateButtonStyle(''));

  const handleValueChange = (selectedValue: any) => {
    const updatedButtons = updateButtonStyle(selectedValue);
    setValue(selectedValue);
    setButtons(updatedButtons);
  };

  return (
    <SegmentedButtons
      value={value}
      onValueChange={handleValueChange}
      buttons={buttons}
      style={{
        backgroundColor: theme.colors.primary
      }}
      theme={{
        roundness: 1
      }}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff00'
  }
});
