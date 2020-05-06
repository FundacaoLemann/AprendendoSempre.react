import React from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import { useTheme } from '../theme';

function Container({ children, style, ...rest }) {
  const {
    palette: {
      common: { white },
    },
  } = useTheme();

  return (
    <Box px={2} py={2} style={[{ backgroundColor: white }, style]} {...rest}>
      {children}
    </Box>
  );
}

Container.defaultProps = {
  style: null,
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Container;
