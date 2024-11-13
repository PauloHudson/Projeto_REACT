import React from 'react';
import { TouchableOpacity, Image, View, Text, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { MainView, Container, Container2, TitleContainer, TitleText, Texto, StyledImage, AvatarImage } from '../styles/Adm2';
import { auth } from '../Config/config';
import { getDatabase, ref, get } from 'firebase/database';


class Tela3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: '',
      ultimaMedicao: null, // Estado para armazenar a última medição
      recomendacaoDieta: '', // Estado para armazenar a recomendação da dieta
      avatarUrl: '', // Estado para armazenar a URL do avatar
    };
  }

  componentDidMount() {
    this.getUsuario();
    this.getUltimaMedicao();
  }

  getUsuario = () => {
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            this.setState({ usuario: userData.username, avatarUrl: userData.photoURL || require('../styles/avatar.jpg') });
          } else {
            console.log("Nenhum dado encontrado para o usuário.");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do usuário: ", error);
          Alert.alert("Erro", "Não foi possível recuperar os dados.");
        });
    } else {
      Alert.alert('Erro', 'Usuário não autenticado!');
    }
  };

  getUltimaMedicao = () => {
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const imcRef = ref(db, 'users/' + user.uid + '/imc');
      get(imcRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const ultimaMedicao = snapshot.val();
            this.setState({ ultimaMedicao }, this.definirRecomendacaoDieta);
          } else {
            console.log("Nenhuma medição encontrada.");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar última medição: ", error);
        });
    }
  };

  definirRecomendacaoDieta = () => {
    const { ultimaMedicao } = this.state;
    
    if (ultimaMedicao) {
      const imc = parseFloat(ultimaMedicao);
      let recomendacao = '';

      if (imc < 18.5) {
        recomendacao = "Dieta para ganho de peso: \nfoco em proteínas e carboidratos de boa qualidade.";
      } else if (imc >= 18.5 && imc < 24.9) {
        recomendacao = "Dieta balanceada: continue \n com uma \nalimentação equilibrada com boas fontes de proteína e vegetais.";
      } else if (imc >= 25 && imc < 29.9) {
        recomendacao = "Dieta para perda de peso: foco em alimentos com baixo índice glicêmico e controle de calorias.";
      } else {
        recomendacao = "Dieta para emagrecimento: aumentar a ingestão de fibras e reduzir alimentos processados.";
      }

      this.setState({ recomendacaoDieta: recomendacao });
    }
  };

  handleNavigate = () => {
    this.props.navigation.navigate('Tela4', { nome: this.state.usuario });
  };

  handleNavigateToEditAvatar = () => {
    this.props.navigation.navigate('Edicao', { avatarUrl: this.state.avatarUrl });
 };
 

  render() {
    const { usuario, ultimaMedicao, recomendacaoDieta, avatarUrl } = this.state;

    return (
      <MainView>
        <Container>
          <TitleContainer>
            <TouchableOpacity onPress={this.handleNavigateToEditAvatar}>
              {/* Botão de editar avatar */}
              <AvatarImage source={avatarUrl ? { uri: avatarUrl } : require('../styles/avatar.jpg')} />
            </TouchableOpacity>
            <TitleText>Bem-vindo(a), {usuario || 'Usuário'}!</TitleText>
          </TitleContainer>

          <Card.Title 
            title="Última Medição:" subtitle={ultimaMedicao ? `IMC: ${ultimaMedicao}` : "Nenhuma medição registrada"}
            titleStyle={{ fontSize: 18, fontWeight: '500', color: '#555' }}
          />
          <TouchableOpacity onPress={this.handleNavigate}>
            <StyledImage source={require('../styles/Imc.png')} />
          </TouchableOpacity>
        </Container>

        <Container2>
          {recomendacaoDieta ? (
            <Texto>
              <Text style={{ fontWeight: 'bold' }}>Recomendação de Dieta:</Text>
              {'\n'}{recomendacaoDieta}
            </Texto>
          ) : (
            <Texto>Aguarde enquanto processamos as suas recomendações...</Texto>
          )}
        </Container2>
      </MainView>
    ); 
  }
}

export default Tela3;
