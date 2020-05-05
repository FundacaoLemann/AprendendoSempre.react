import React from 'react';
import {TextInput as TextInputAsNative, View} from 'react-native';
import {useTheme} from '../theme';
import Icon from './Icon';

function TextInput({icon, ...rest}) {
  const {
    palette: {primaryLight},
    spacing,
    typography: {
      fonts: {
        regular: {fontFamily},
      },
    },
    textInput: {height},
  } = useTheme();

  const textInputStyles = {
    backgroundColor: primaryLight,
    borderRadius: height / 2,
    fontFamily,
    height,
    paddingHorizontal: spacing(2),
  };

  return (
    <View style={{position: 'relative'}}>
      <View
        style={{
          width: 24,
          height,
          position: 'absolute',
          justifyContent: 'center',
          marginLeft: spacing(2),
        }}>
        <Icon name={icon} />
      </View>
      <TextInputAsNative style={[textInputStyles]} {...rest} />
    </View>
  );
}

export default TextInput;
