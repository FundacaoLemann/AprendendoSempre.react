import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import BottomSheet from "reanimated-bottom-sheet";
import Container from "../../components/Container";
import Typography from "../../components/Typography";
import useBottomTabHeight from "../../navigation/hooks/useBottomTabHeight";
import { useTheme } from "../../theme";
import Header from "./components/Header";
import useHeaderHeight from "./hooks/useHeaderHeight";
import TextInput from "../../components/TextInput";
import Item from "./components/Item";

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
  const insets = useSafeArea();

  const {
    spacing,
    palette: {
      common: { white },
    },
  } = useTheme();

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
        <Item key={item.id} {...item} />
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
    </>
  );
}

export default Home;
