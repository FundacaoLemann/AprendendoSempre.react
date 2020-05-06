import React from 'react';
import { ScrollView, Image, Dimensions, View, StyleSheet } from 'react-native';
import Header from './components/Header';
import Container from '../../components/Container';
import Typography from '../../components/Typography';
import { useTheme } from '../../theme';

const { width: viewportWidth } = Dimensions.get('window');

const data = [
  { id: 1, image: 'https://aprendendosempre.org/wp-content/uploads/2020/05/bid.jpg' },
  { id: 2, image: 'https://aprendendosempre.org/wp-content/uploads/2020/05/colabora-educacao.png' },
  { id: 3, image: 'https://aprendendosempre.org/wp-content/uploads/2020/04/consed.jpg' },
  { id: 4, image: 'https://aprendendosempre.org/wp-content/uploads/2020/04/ensina-brasil.png' },
  {
    id: 5,
    image:
      'https://aprendendosempre.org/wp-content/uploads/2020/04/fundacao-grupo-boticario-logo.jpg',
  },
  {
    id: 6,
    image: 'https://aprendendosempre.org/wp-content/uploads/2020/04/fundacao-roberto-marinho.jpg',
  },
  { id: 7, image: 'https://aprendendosempre.org/wp-content/uploads/2020/05/iede.jpg' },
  {
    id: 8,
    image: 'https://aprendendosempre.org/wp-content/uploads/2020/04/instituto-ayrton-senna.png',
  },
  {
    id: 9,
    image: 'https://aprendendosempre.org/wp-content/uploads/2020/04/instituto-rodrigo-mendes.jpg',
  },
  { id: 10, image: 'https://aprendendosempre.org/wp-content/uploads/2020/04/iungo.jpg' },
  { id: 11, image: 'https://aprendendosempre.org/wp-content/uploads/2020/05/ismart1.jpg' },
  {
    id: 12,
    image: 'https://aprendendosempre.org/wp-content/uploads/2020/04/instituto-votorantim.jpg',
  },
  { id: 13, image: 'https://aprendendosempre.org/wp-content/uploads/2020/04/lab-edu.jpg' },
  {
    id: 14,
    image: 'https://aprendendosempre.org/wp-content/uploads/2020/04/movimento-pela-base.png',
  },
  {
    id: 15,
    image: 'https://aprendendosempre.org/wp-content/uploads/2020/04/nova-escola-rodape.png',
  },
  { id: 16, image: 'https://aprendendosempre.org/wp-content/uploads/2020/04/undime-1.jpg' },
];

const styles = StyleSheet.create({
  images: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

function About() {
  const {
    spacing,
    palette: {
      divider,
      common: { white },
    },
    shape: { borderRadius },
  } = useTheme();

  const itemSize = (viewportWidth - spacing(14)) / 4;

  return (
    <>
      <Header />
      <ScrollView>
        <Container>
          <Typography gutterBottom>
            A plataforma Aprendendo Sempre é resultado de um esforço coletivo de organizações
            sociais do terceiro setor, associadas ao Consed (Conselho Nacional de Secretários de
            Educação) e à Undime (União Nacional dos Dirigentes Municipais de Educação), para apoiar
            gestores educacionais, professores e famílias a garantir que todos os estudantes
            continuem aprendendo e se desenvolvendo durante a pandemia de Covid-19, que suspendeu as
            aulas em todo o Brasil.
          </Typography>
          <Typography gutterBottom>
            Promover atividades de ensino e aprendizagem fora das escolas, de forma efetiva e com
            equidade, tornou-se um desafio sem precedentes para a comunidade escolar. Esta
            plataforma reúne uma curadoria de conteúdos e soluções gratuitas para ajudar a facilitar
            esta tarefa.
          </Typography>
          <Typography gutterBottom>
            Em um ambiente único, estão disponíveis indicações de ferramentas com conteúdos
            pedagógicos alinhados à BNCC (Base Nacional Comum Curricular), documento que mostra
            quais são as aprendizagens essenciais para todos os estudantes brasileiros. Além disso,
            há tecnologias que viabilizam a preparação e a transmissão de aulas online, além de
            recomendações para o bom uso dessas soluções e de como é possível promover experiências
            saudáveis e significativas para crianças, adolescentes e jovens remotamente.Com intuito
            de inspirar professores e gestores, casos e histórias de quem que já está conseguindo
            promover aulas a distância também podem ser encontradas na Aprendendo Sempre, bem como
            uma agenda de eventos, cursos, webinários e outras atividades de formação e troca de
            informações online.
          </Typography>
          <Typography gutterBottom>
            Para as famílias, há recomendações de ferramentas e atividades, além de dicas de como
            elas podem ajudar crianças e adolescentes em casa.
          </Typography>
          <Typography gutterBottom>
            Sem a pretensão de fornecer soluções definitivas, a Aprendendo Sempre procura apontar
            diferentes possibilidades para que os estudantes tenham o seu direito de aprender
            preservado. Seu conteúdo seguirá em construção coletiva, com o foco em atender as
            demandas de educadores e familiares, enquanto a pandemia de coronavírus estiver
            interferindo nas rotinas das escolas. Se você tem algum desafio para o qual precisa
            ajuda ou gostaria de compartilhar conteúdos úteis, entre em contato.Saiba quem já está
            colaborando para a Aprendendo Sempre:
          </Typography>
          <Typography variant="h5" color="black" gutterBottom>
            Realização
          </Typography>
          <Container
            py={1}
            style={[
              styles.images,
              {
                backgroundColor: divider,
                borderRadius,
              },
            ]}
          >
            {data.map((item) => (
              <View key={item.id} style={{ backgroundColor: white, marginVertical: spacing() }}>
                <Image
                  resizeMode="contain"
                  style={{ width: itemSize, height: itemSize }}
                  source={{ uri: item.image }}
                />
              </View>
            ))}
          </Container>
        </Container>
      </ScrollView>
    </>
  );
}

export default About;
