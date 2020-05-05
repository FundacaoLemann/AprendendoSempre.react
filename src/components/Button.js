import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme';
import Typography from './Typography';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    borderWidth: 2,
    display: 'flex',
    height: 40,
    justifyContent: 'center',
  },
});

function Button({onPress, style}) {
  const {
    palette: {
      common: {white},
    },
    spacing,
    shape: {borderRadius},
  } = useTheme();

  const buttonStyles = {
    borderColor: white,
    borderRadius,
    paddingHorizontal: spacing(2),
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.root}>
        <View style={[buttonStyles, styles.button, style]}>
          <Typography variant="body2" fontWeight="bold" color="white" uppercase>
            Saiba Mais
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  onPress: null,
  style: null,
};

Button.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Button;
