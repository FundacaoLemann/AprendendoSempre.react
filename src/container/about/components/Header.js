import React from 'react';
import { StyleSheet } from 'react-native';
import Background from '../../../components/Background';
import Box from '../../../components/Box';
import Logo from '../../../components/Logo';
import Typography from '../../../components/Typography';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

function Header() {
  return (
    <Background height={100}>
      <Box p={2} style={styles.root}>
        <Logo />
        <Typography variant="h6" color="white">
          Sobre o projeto
        </Typography>
      </Box>
    </Background>
  );
}

export default Header;
