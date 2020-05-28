import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import Box from './Box';
import Typography from './Typography';

function Loading({ loading }) {
  return (
    <Modal transparent visible={loading}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: 120,
            height: 120,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box mb={1}>
            <ActivityIndicator color="white" size="small" />
          </Box>
          <Typography color="white">Aguarde...</Typography>
        </View>
      </View>
    </Modal>
  );
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loading;
