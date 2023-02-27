import {Center, Image} from 'native-base';
import React from 'react';
import {ImageStyle} from 'react-native/types';
import {LogoXXXS} from '../../assets/images/logos';

const Header: React.FC = () => {
  return (
    <Center w={'100%'} p={'16px'} safeAreaTop>
      <Image
        source={LogoXXXS}
        style={{height: 24, width: 64} as ImageStyle}
        alt={'Coach logo'}
      />
    </Center>
  );
};

export default Header;
