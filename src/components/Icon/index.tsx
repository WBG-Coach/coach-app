import React, {Component} from 'react';
import Svg, {Path} from 'react-native-svg';
import {ViewStyle, TouchableOpacity, View} from 'react-native';

import {Props} from './types';
import {icons} from './Icon.data';

const containerStyle = {
  width: 'auto',
  height: 'auto',
} as ViewStyle;

/**
 * Svg icon component
 */
export default class Icon extends Component<Props> {
  static defaultProps = {
    color: '#333',
    size: 24,
  };

  render(): JSX.Element {
    const {color, size = 24, name, width, onPress} = this.props;
    const localIcons: any = icons;

    if (!icons || !localIcons[name]) {
      return <></>;
    }

    if (onPress) {
      return (
        <TouchableOpacity style={[containerStyle]} {...this.props}>
          <Svg width={width || size} height={size} viewBox="0 0 1024 1024">
            <Path d={localIcons[name]} fill={color} />
          </Svg>
        </TouchableOpacity>
      );
    }

    return (
      <View style={[containerStyle]} {...this.props}>
        <Svg width={width || size} height={size} viewBox="0 0 1024 1024">
          <Path d={localIcons[name]} fill={color} />
        </Svg>
      </View>
    );
  }
}
