import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { MainView, Container, Container2, TitleContainer, TitleText, Texto, StyledImage, AvatarImage } from '../styles/Adm2';

class Tela3 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usuario: '',
    };
  }
  
  handleNavigate = () => {
    this.props.navigation.navigate('Tela4', { nome: this.state.usuario }); // Passando o nome
  };

  render() {
    const { route } = this.props;
    const nome = route.params?.nome; 

    return (
      <MainView>
        <Container>
          <TitleContainer>
            <AvatarImage source={require('../styles/avatar.jpg')} />
            <TitleText>Bem-vindo(a), {nome || 'Usuário'}!</TitleText>
          </TitleContainer>
          <Card.Title 
            title="Última Medição" 
            titleStyle={{ fontSize: 20, fontWeight: '500', color: '#555' }}
          />
          <TouchableOpacity onPress={this.handleNavigate}>
            <StyledImage source={require('../styles/Imc.png')} />
          </TouchableOpacity>
        </Container>

        <Container2>
          <Texto>
            Café da Manhã
            {'\n'}1 fatia de pão integral com abacate ou queijo cottage
            {'\n'}1 ovo cozido ou mexido
            {'\n'}1 fruta (banana, maçã ou laranja)
            {'\n'}1 xícara de chá ou café sem açúcar
            {'\n\n'}Lanche da Manhã
            {'\n'}1 punhado de nozes ou amêndoas
            {'\n'}1 iogurte natural
          </Texto>
        </Container2>
      </MainView>
    ); 
  }
}

export default Tela3;
