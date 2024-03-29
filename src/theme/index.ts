import {extendTheme} from 'native-base';

const theme = extendTheme({
  fontConfig: {
    Inter: {
      100: {
        normal: 'NotoSans-Light',
        italic: 'NotoSans-LightItalic',
      },
      200: {
        normal: 'NotoSans-Light',
        italic: 'NotoSans-LightItalic',
      },
      300: {
        normal: 'NotoSans-Light',
        italic: 'NotoSans-LightItalic',
      },
      400: {
        normal: 'NotoSans-Regular',
        italic: 'NotoSans-Italic',
      },
      500: {
        normal: 'NotoSans-Medium',
      },
      600: {
        normal: 'NotoSans-SemiBold',
        italic: 'NotoSans-SemiBoldItalic',
      },
      700: {
        normal: 'NotoSans-Bold',
        italic: 'NotoSans-BoldItalic',
      },
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'Inter',
  },
  fontSizes: {
    DLG: 96,
    DMD: 72,
    DSM: 48,
    DXS: 36,
    HLG: 40,
    HMD: 32,
    HSM: 24,
    HXS: 20,
    LLG: 16,
    LMD: 16,
    LSM: 14,
    TXL: 18,
    TMD: 16,
    TSM: 14,
    TXS: 12,
  },
  colors: {
    primary: {
      0: '#EBF5FF',
      100: '#C2E0FF',
      200: '#3373CC',
      300: '#0052A3',
    },
    secondary: {
      0: '#F0FAFA',
      100: '#D1F0F0',
      200: '#66CCCC',
      300: '#297A7A',
    },
    red: {
      0: '#FEEDEC',
      100: '#FCC9C5',
      200: '#E81C0D',
      300: '#9B1208',
    },
    yellow: {
      0: '#FEF8EC',
      100: '#FCE9C5',
      200: '#E89F0C',
      300: '#9B6908',
    },
    green: {
      0: '#EFFBEF',
      100: '#CEF3CF',
      200: '#31C436',
      300: '#218225',
    },
    violet: {
      0: '#F5ECFE',
      100: '#E0C5FC',
      200: '#7A0CE8',
      300: '#52089B',
    },
    gray: {
      0: '#FFFFFF',
      100: '#F2F4F7',
      200: '#DCE0E5',
      300: '#C7CBD1',
      400: '#ADB6C2',
      500: '#9AA2AC',
      600: '#576375',
      700: '#111417',
    },
  },
  components: {
    Input: {
      defaultProps: {
        borderColor: 'gray.300',
        borderRadius: '8px',
        fontSize: 'TMD',
        placeholderTextColor: 'gray.500',
        color: 'gray.700',
        _focus: {
          borderColor: 'primary.200',
          bg: 'inherit',
        },
      },
    },
    Button: {
      variants: {
        outline: {
          borderRadius: '8px',
        },
      },
    },
    TextArea: {
      defaultProps: {
        borderColor: 'gray.300',
        borderRadius: '8px',
        fontSize: 'TMD',
        placeholderTextColor: 'gray.500',
        color: 'gray.700',
        _focus: {
          borderColor: 'primary.200',
          bg: 'inherit',
        },
      },
    },
    Checkbox: {
      defaultProps: {
        background: 'transparent',
        borderColor: 'primary.200',
        _icon: {
          color: 'white',
        },
        _checked: {
          borderColor: 'primary.200',
          background: 'primary.200',
        },
      },
    },
    Radio: {
      defaultProps: {
        background: 'transparent',
        borderColor: 'primary.200',
        _icon: {
          color: 'white',
        },
        _checked: {
          borderColor: 'primary.200',
          background: 'primary.200',
        },
      },
    },
  },
  config: {
    initialColorMode: 'dark',
  },
});

export default theme;
