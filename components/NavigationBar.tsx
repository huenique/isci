import { Appbar } from 'react-native-paper';

import { getHeaderTitle } from '@react-navigation/elements';

type NavigationBarProps = {
  navigation: any;
  route: any;
  options: any;
};

export default function NavigationBar(props: NavigationBarProps) {
  const title = getHeaderTitle(props.options, props.route.name);

  return (
    <Appbar.Header
      style={{
        backgroundColor: '#C0C4FF'
      }}
    >
      <Appbar.Content
        title={title}
        titleStyle={{
          color: '#ffffff'
        }}
      />
    </Appbar.Header>
  );
}
