import RNGeolocation from '@react-native-community/geolocation';

const GeolocationService = {
  getLocation: (): Promise<{latitude: number; longitude: number}> => {
    return new Promise(resolve => {
      RNGeolocation.getCurrentPosition(
        info => {
          resolve({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          });
        },
        () => {
          console.error('WITHOUT LOCATION');
          resolve({
            latitude: 0,
            longitude: 0,
          });
        },
        {timeout: 1000, enableHighAccuracy: true},
      );
    });
  },
};

export default GeolocationService;
