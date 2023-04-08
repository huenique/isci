import { Appbar } from "react-native-paper";

import { getHeaderTitle } from "@react-navigation/elements";

type NavigationBarProps = {
  navigation: any;
  route: any;
  options: any;
  back: boolean;
};

export default function NavigationBar(props: NavigationBarProps) {
  const title = getHeaderTitle(props.options, props.route.name);
  return (
    <Appbar.Header>
      {props.back && (
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
      )}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
