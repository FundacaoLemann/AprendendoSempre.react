import React from 'react';
import { StyleSheet, View, Linking, Alert } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import Background from '../../../components/Background';
import Box from '../../../components/Box';
import Button from '../../../components/Button';
import Logo from '../../../components/Logo';
import Typography from '../../../components/Typography';
import useHeaderHeight from '../hooks/useHeaderHeight';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  alignCenter: {
    alignItems: 'center',
  },
  button: {
    minWidth: 200,
  },
});

function Home() {
  const insets = useSafeArea();
  const height = useHeaderHeight();

  const handlePress = async () => {
    try {
      await Linking.openURL('https://aprendendosempre.org');
    } catch (error) {
      Alert.alert('Seu dispositivo não é compatível para esta ação.');
    }
  };

  return (
    <Background height={height}>
      <Box
        px={2}
        pb={2}
        style={[
          styles.flex,
          {
            paddingTop: insets.top,
          },
        ]}
      >
        <Box mt={2} mb={3}>
          <Logo />
        </Box>
        <View style={[styles.flex, styles.alignCenter]}>
          <Box mb={0.5}>
            <Typography variant="h5" color="white">
              Olá
            </Typography>
          </Box>
          <Typography variant="body1" color="white">
            Explore recursos,
          </Typography>
          <Typography color="white" fontWeight="bold" variant="body1">
            sem nenhum custo.
          </Typography>
          <Box mt={3}>
            <Button onPress={handlePress} style={styles.button}>
              Saiba Mais
            </Button>
          </Box>
        </View>
      </Box>
    </Background>
  );
}

export default Home;
