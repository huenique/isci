import * as Location from 'expo-location';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { IconButton, MD3Colors, Text, useTheme } from 'react-native-paper';

// import MapViewDirections from 'react-native-maps-directions';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { calculateDistance, getNearest } from '../utils/distance';
import { useMountEffectOnce } from '../utils/useMountEffectOnce';

// Default location: Minor Basilica of St. Michael the Archangel Coordinates
const CHURCH: Region = {
  latitude: 14.026038316958063,
  longitude: 121.59105249712137,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01
};

const CRITICAL_FACILITIES = [
  {
    name: 'Tayabas West Central School I',
    latitude: 14.026486626506466,
    longitude: 121.59111690566009
  },
  {
    name: 'Luis Palad National High School',
    latitude: 14.025292952194462,
    longitude: 121.5865232248655
  },
  {
    name: 'Tayabas Community Hospital Inc.',
    latitude: 14.02067021164268,
    longitude: 121.59740522412777
  }
];

export default function EvacuationCenter() {
  const theme = useTheme();
  const ref = React.useRef(
    new MapView({
      initialRegion: CHURCH
    })
  );
  const [location, setLocation] = React.useState<Region | null>(null);
  const [destination, setDestination] = React.useState<Region | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  const getUserLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const loc = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };
    const nearest = getNearest(
      calculateDistance(loc.latitude, loc.longitude, CRITICAL_FACILITIES)
    ).facility;

    setLocation(loc);
    setDestination({
      latitude: nearest.latitude,
      longitude: nearest.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });
    ref.current.animateToRegion(loc, 1000);
  };

  useMountEffectOnce(() => {
    getUserLocation();
  });

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  let loc = location || CHURCH;
  let des = destination || CHURCH;

  return (
    <View style={styles.container}>
      {/* <View style={styles.loaderContainer}>
        <ActivityIndicator animating={true} size={48} />
      </View> */}

      <MapView initialRegion={CHURCH} ref={ref} style={styles.map}>
        <Marker coordinate={loc} flat={true}>
          <MaterialCommunityIcons
            name={'circle-outline' as 'material-design'}
            size={24}
            color="black"
          />
        </Marker>
        <Marker coordinate={des} />
        {/* This requires a Google Maps API key */}
        {/* <MapViewDirections
                 origin={location}
                 destination={criticalFacility}
                 apikey=""
               /> */}
      </MapView>

      <IconButton
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          margin: 16,
          borderRadius: 10
        }}
        icon="crosshairs-gps"
        iconColor={MD3Colors.neutral20}
        containerColor={theme.colors.primary}
        onPress={getUserLocation}
        mode="contained"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  map: {
    width: '100%',
    height: '100%'
  },
  loaderContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});