import React, { useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  View,
  NativeModules,
} from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import BottomSheet from "reanimated-bottom-sheet";
import Container from "../../components/Container";
import TextInput from "../../components/TextInput";
import Typography from "../../components/Typography";
import useBottomTabHeight from "../../navigation/hooks/useBottomTabHeight";
import { useTheme } from "../../theme";
import { removeAccents } from "../../utils";
import Header from "./components/Header";
import Item from "./components/Item";
import WebView from "./components/WebView";
import useHeaderHeight from "./hooks/useHeaderHeight";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  header: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 145,
    justifyContent: "space-between",
  },
  content: {
    minHeight: 200,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});

const data = [
  {
    id: 1,
    title: "Aprendendo Sempre",
    image: require("../../assets/logo.png"),
    url: "https://aprendendosempre.org/",
  },
  {
    id: 2,
    title: "Aprendizap",
    image: require("../../assets/logo.png"),
    url: "https://www.aprendizap.com.br/",
  },
  {
    id: 3,
    title: "Árvore Educação",
    image: require("../../assets/logo.png"),
    url: "https://app.arvoreeducacao.com.br/login?platform=arvore",
  },
  {
    id: 4,
    title: "Escola Digital",
    image: require("../../assets/logo.png"),
    url: "https://escoladigital.org.br/",
  },
  {
    id: 5,
    title: "Google Sala de Aula",
    image: require("../../assets/logo.png"),
    url: "https://edu.google.com/intl/pt/products/classroom/?modal_active=none",
  },
  {
    id: 6,
    title: "Khan Academy",
    image: require("../../assets/logo.png"),
    url: "https://pt.khanacademy.org/",
  },
  {
    id: 7,
    title: "Kinedu",
    image: require("../../assets/logo.png"),
    url: "https://www.kinedu.com/pt",
  },
  {
    id: 8,
    title: "Nova Escola",
    image: require("../../assets/logo.png"),
    url: "https://novaescola.org.br/",
  },
  {
    id: 9,
    title: "AvaMec",
    image: require("../../assets/logo.png"),
    url: "http://avamec.mec.gov.br/#/",
  },
];

function Home() {
  const [searchFilter, setSearchFilter] = useState("");
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const insets = useSafeArea();

  const {
    spacing,
    palette: {
      common: { white },
    },
  } = useTheme();

  const webView = useRef();
  const bottomSheet = useRef();

  const renderContent = () => {
    const filterRegex = new RegExp(
      String(removeAccents(searchFilter).toLowerCase()),
      "i"
    );

    const filter = (item) =>
      filterRegex.test(removeAccents(item.title).toLowerCase());

    const filteredData = data.filter(filter);

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
        {filteredData.map((item) => (
          <Item onPress={() => handlePressItem(item)} key={item.id} {...item} />
        ))}
      </View>
    );
  };

  const handlePressItem = (item) => {
    NativeModules.SmiSdkReactModule.getSDAuth(
      "ak-6807dfa3-a5e6-4eb4-8732-e818b9b352c1",
      item.url,
      "",
      (result) => {
        console.log("result ", result);
        if (result && result.url) {
          setSelectedItem({ ...item, url: result.url });
          toggleModalVisible();
        }
      }
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
            Você não gasta seu{" "}
          </Typography>
          <Typography color="primary" fontWeight="bold" variant="body2">
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

  const firstPoint = height - (insets.top + useBottomTabHeight());
  const middlePoint =
    height - (useHeaderHeight() - spacing(2) + useBottomTabHeight());

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
    if (
      canGoForward &&
      webView &&
      webView.current &&
      webView.current.goForward
    ) {
      webView.current.goForward();
    }
  };

  const handleReload = () => {
    if (webView && webView.current && webView.current.reload) {
      webView.current.reload();
    }
  };

  toggleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

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
          originWhitelist={["*"]}
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
