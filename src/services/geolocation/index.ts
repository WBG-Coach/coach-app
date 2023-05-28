import RNGeolocation from '@react-native-community/geolocation';

const Geolocation = {
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
      );
    });
  },
};

export default Geolocation;
