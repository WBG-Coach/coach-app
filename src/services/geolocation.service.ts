import RNGeolocation from '@react-native-community/geolocation';

const GeolocationService = {
  getLocation: (): Promise<{latitude: number; longitude: number}> => {
    return new Promise(resolve => {
      RNGeolocation.getCurrentPosition(
        info => {
          console.log('Locations ', {...info.coords});
          resolve({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          });
        },
        err => {
          console.log('LOCATION ERROR => ', err);
          resolve({
            latitude: 0,
            longitude: 0,
          });
        },
        {timeout: 3000, enableHighAccuracy: false},
      );
    });
  },
};

export default GeolocationService;
