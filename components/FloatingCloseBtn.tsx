import * as React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';

type FloatingCloseBtnProps = {
  onPress: () => void;
  visible: boolean;
};

export default function FloatingCloseBtn(props: FloatingCloseBtnProps) {
  const { onPress, visible } = props;
  const animation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true
      }).start();
    } else {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true
      }).start();
    }
  }, [animation, visible]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0]
  });

  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <FAB icon="close" style={styles.fab} onPress={onPress} color="#ffffff" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24
  },
  fab: {
    alignSelf: 'center',
    backgroundColor: '#9F9FB7'
  }
});
