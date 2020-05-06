import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TextInput as TextInputAsNative, View } from 'react-native';
import { useTheme } from '../theme';
import Icon, { iconNames } from './Icon';

const styles = StyleSheet.create({
  relative: {
    position: 'relative',
  },
});

function TextInput({ icon, ...rest }) {
  const {
    palette: { primaryLight },
    spacing,
    typography: {
      fonts: {
        regular: { fontFamily },
      },
    },
    textInput: { height },
    icon: { size },
  } = useTheme();

  const textInputStyles = {
    backgroundColor: primaryLight,
    borderRadius: height / 2,
    fontFamily,
    height,
    paddingLeft: icon ? spacing(3) + size : spacing(2),
    paddingRight: spacing(2),
  };

  return (
    <View style={styles.relative}>
      {icon && (
        <View
          style={{
            width: 24,
            height,
            position: 'absolute',
            justifyContent: 'center',
            marginLeft: spacing(2),
          }}
        >
          <Icon name={icon} />
        </View>
      )}
      <TextInputAsNative style={[textInputStyles]} {...rest} />
    </View>
  );
}

TextInput.defaultProps = {
  icon: null,
};

TextInput.propTypes = {
  icon: PropTypes.oneOf(iconNames),
};

export default TextInput;
