import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  DeviceEventEmitter,
  Dimensions,
  Modal,
  NativeModules,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import BottomSheet from 'reanimated-bottom-sheet';
import Container from '../../components/Container';
import TextInput from '../../components/TextInput';
import Typography from '../../components/Typography';
import useBottomTabHeight from '../../navigation/hooks/useBottomTabHeight';
import { useTheme } from '../../theme';
import { removeAccents } from '../../utils';
import Header from './components/Header';
import Item from './components/Item';
import WebView from './components/WebView';
import useHeaderHeight from './hooks/useHeaderHeight';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 145,
    justifyContent: 'space-between',
  },
  content: {
    minHeight: 200,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'green',
    flex: 1,
  },
});

const data = [
  {
    id: 1,
    title: 'Aprendendo Sempre',
    image: 'https://aprendendosempre.luby.com.br/imgs/aprendendo_sempre.png',
    url: 'https://aprendendosempre.org/',
  },
  {
    id: 2,
    title: 'Aprendizap',
    image: 'https://aprendendosempre.luby.com.br/imgs/aprendizap-logo.png',
    url: 'https://www.aprendizap.com.br/',
  },
  {
    id: 3,
    title: 'Árvore Educação',
    image: 'https://aprendendosempre.luby.com.br/imgs/arvore_de_livros.png',
    url: 'https://app.arvoreeducacao.com.br/login?platform=arvore',
  },
  {
    id: 4,
    title: 'AvaMec',
    image: 'https://aprendendosempre.luby.com.br/imgs/avamec.png',
    url: 'http://avamec.mec.gov.br/#/',
  },
  {
    id: 5,
    title: 'Escola Digital',
    image: 'https://aprendendosempre.luby.com.br/imgs/escola_digital.png',
    url: 'https://escoladigital.org.br/',
  },
  {
    id: 6,
    title: 'Google Sala de Aula',
    image: 'https://aprendendosempre.luby.com.br/imgs/google_sala_de_aula.png',
    url: 'https://edu.google.com/intl/pt/products/classroom/?modal_active=none',
  },
  {
    id: 7,
    title: 'Khan Academy',
    image: 'https://aprendendosempre.luby.com.br/imgs/khan_academy.png',
    url: 'https://pt.khanacademy.org/',
  },
  {
    id: 8,
    title: 'Kinedu',
    image: 'https://aprendendosempre.luby.com.br/imgs/kinedu.png',
    url: 'https://www.kinedu.com/pt',
  },
  {
    id: 9,
    title: 'Nova Escola',
    image: 'https://aprendendosempre.luby.com.br/imgs/nova_escola.png',
    url: 'https://novaescola.org.br/',
  },
];

function Home() {
  // const [data, setData] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const insets = useSafeArea();

  const getSponsoredUrl = (url = '') => {
    return new Promise((resolve) => {
      NativeModules.SmiSdkReactModule.getSDAuth(
        'ak-6807dfa3-a5e6-4eb4-8732-e818b9b352c1',
        url,
        '',
        (result) => {
          if (result && result.url) {
            resolve(result.url);
          } else {
            resolve(url);
          }
        },
      );
    });
  };

  const onSdStateChange = (event) => {
    if (event.sd_state === 'SD_AVAILABLE') {
      Alert.alert('Parabéns!', 'Parabéns! Você está navegando sem consumir seu pacote de dados.');
    }
  };

  useEffect(() => {
    DeviceEventEmitter.addListener('onSdStateChange', onSdStateChange);
    NativeModules.SmiSdkReactModule.registerSdStateChangeListner();

    return () => {
      DeviceEventEmitter.removeListener('onSdStateChange');
    };
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     const url = await getSponsoredUrl('https://aprendendosempre.luby.com.br/json/data.json');

  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((responseData) => setData(responseData))
  //       .catch(() => {
  //         // no feedback
  //       });
  //   }

  //   fetchData();
  // }, []);

  const {
    spacing,
    palette: {
      common: { white },
      primary,
    },
  } = useTheme();

  const webView = useRef();
  const bottomSheet = useRef();

  const toggleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  const handlePressItem = async (item) => {
    const url = await getSponsoredUrl(item.url);
    setSelectedItem({ ...item, url });
    toggleModalVisible();
  };

  const renderContent = () => {
    const filterRegex = new RegExp(String(removeAccents(searchFilter).toLowerCase()), 'i');

    const filter = (item) => filterRegex.test(removeAccents(item.title).toLowerCase());

    const filteredData = data.filter(filter);

    if (data.length === 0) {
      return <ActivityIndicator />;
    }

    return (
      <View
        style={[
          styles.content,
          {
            padding: spacing(2),
            backgroundColor: white,
          },
        ]}
      >
        {data.length === 0 ? (
          <View style={styles.loader}>
            <ActivityIndicator color={primary} />
          </View>
        ) : (
          filteredData.map((item) => (
            <Item onPress={() => handlePressItem(item)} key={item.id} {...item} />
          ))
        )}
      </View>
    );
  };

  const renderHeader = () => (
    <Container style={styles.header}>
      <View>
        <Typography variant="h5" color="black">
          Aplicativos & Sites
        </Typography>
        <Typography>
          <Typography color="primary" variant="body2">
            Você não gasta seu
          </Typography>
          <Typography color="primary" fontWeight="bold" variant="body2">
            {' '}
            dados móveis!
          </Typography>
        </Typography>
      </View>
      <TextInput
        icon="search"
        onBlur={() => bottomSheet.current.snapTo(1)}
        onChangeText={(value) => setSearchFilter(value)}
        onFocus={() => bottomSheet.current.snapTo(0)}
        value={searchFilter}
      />
    </Container>
  );

  const handleNavigationStateChange = (event) => {
    setCanGoBack(event.canGoBack);
    setCanGoForward(event.canGoForward);
  };

  const handleBack = () => {
    if (canGoBack && webView && webView.current && webView.current.goBack) {
      webView.current.goBack();
    }
  };

  const handleForward = () => {
    if (canGoForward && webView && webView.current && webView.current.goForward) {
      webView.current.goForward();
    }
  };

  const handleReload = () => {
    if (webView && webView.current && webView.current.reload) {
      webView.current.reload();
    }
  };

  const firstPoint = height - (insets.top + useBottomTabHeight());
  const middlePoint = height - (useHeaderHeight() - spacing(2) + useBottomTabHeight());

  return (
    <>
      <Header />
      <BottomSheet
        ref={bottomSheet}
        initialSnap={1}
        snapPoints={[firstPoint, middlePoint]}
        renderHeader={renderHeader}
        renderContent={renderContent}
        enabledBottomClamp
      />
      <Modal
        animationType="slide"
        onRequestClose={toggleModalVisible}
        transparent={false}
        visible={modalVisible}
      >
        <WebView
          allowFileAccess
          allowFileAccessFromFileURLs
          allowingReadAccessToURL
          allowsBackForwardNavigationGestures
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          allowsLinkPreview
          allowUniversalAccessFromFileURLs
          automaticallyAdjustContentInsets={false}
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          domStorageEnabled
          geolocationEnabled
          goBack={handleBack}
          goForward={handleForward}
          javaScriptEnabled
          onClose={toggleModalVisible}
          onNavigationStateChange={handleNavigationStateChange}
          originWhitelist={['*']}
          ref={webView}
          reload={handleReload}
          sharedCookiesEnabled
          source={{ uri: selectedItem.url }}
          startInLoadingState
          thirdPartyCookiesEnabled
        />
      </Modal>
    </>
  );
}

export default Home;
