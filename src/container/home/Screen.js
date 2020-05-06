import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
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

function Home() {
  const [data, setData] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const insets = useSafeArea();

  useEffect(() => {
    function fetchData() {
      fetch('https://aprendendosempre.luby.com.br/json/data.json')
        .then((response) => response.json())
        .then((responseData) => setData(responseData))
        .catch(() => {
          // no feedback
        });
    }

    fetchData();
  }, []);

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

  const handlePressItem = (item) => {
    NativeModules.SmiSdkReactModule.getSDAuth(
      'ak-6807dfa3-a5e6-4eb4-8732-e818b9b352c1',
      item.url,
      '',
      (result) => {
        if (result && result.url) {
          setSelectedItem({ ...item, url: result.url });
          toggleModalVisible();
        }
      },
    );
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
