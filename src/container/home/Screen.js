import React, { useRef, useState } from "react";
import { Dimensions, Modal, StyleSheet, View } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import BottomSheet from "reanimated-bottom-sheet";
import Container from "../../components/Container";
import TextInput from "../../components/TextInput";
import Typography from "../../components/Typography";
import useBottomTabHeight from "../../navigation/hooks/useBottomTabHeight";
import { useTheme } from "../../theme";
import Header from "./components/Header";
import Item from "./components/Item";
import WebView from "./components/WebView";
import useHeaderHeight from "./hooks/useHeaderHeight";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  header: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 100 + 45,
    justifyContent: "space-between",
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
    url: "https://classroom.google.com/",
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
    url: "https://www.aquitemanglo.com.br/",
  },
];

function Home() {
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

  const renderContent = () => (
    <View
      style={[
        styles.content,
        {
          padding: spacing(2),
          backgroundColor: white,
        },
      ]}
    >
      {data.map((item) => (
        <Item
          onPress={() => {
            setSelectedItem(item);
            toggleModalVisible();
          }}
          key={item.id}
          {...item}
        />
      ))}
    </View>
  );

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
      <TextInput icon="search" />
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
    if (canGoBack && webView && webView.current && webView.current.reload) {
      webView.current.goBack();
    }
  };

  const handleForward = () => {
    if (canGoForward && webView && webView.current && webView.current.reload) {
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
          automaticallyAdjustContentInsets={false}
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          onClose={toggleModalVisible}
          decelerationRate="normal"
          domStorageEnabled
          goBack={handleBack}
          goForward={handleForward}
          javaScriptEnabled
          onNavigationStateChange={handleNavigationStateChange}
          ref={webView}
          reload={handleReload}
          source={{ uri: selectedItem.url }}
          startInLoadingState
        />
      </Modal>
    </>
  );
}

export default Home;
