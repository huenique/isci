import * as React from 'react';
import { Appbar, useTheme } from 'react-native-paper';

import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { getHeaderTitle } from '@react-navigation/elements';

export default function NavigationBar(props: BottomTabHeaderProps) {
  const theme = useTheme();
  const title = getHeaderTitle(props.options, props.route.name);

  return (
    <Appbar.Header
      style={{
        backgroundColor: theme.colors.primary
      }}
    >
      {props.route.name !== 'Home' ? (
        <Appbar.BackAction
          onPress={() => {
            props.navigation.goBack();
          }}
          iconColor="#ffffff"
        />
      ) : null}

      <Appbar.Content
        title={title}
        titleStyle={{
          color: '#ffffff'
        }}
      />
      <Appbar.Action
        icon="account"
        color="white"
        onPress={() => {
          props.navigation.navigate('Account');
        }}
      />
    </Appbar.Header>
  );
}
