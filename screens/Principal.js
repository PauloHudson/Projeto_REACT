import React from 'react';
import { Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Container, TitleList, InputField, Container2 } from '../styles/adm';

class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: '',
      senha: '',
    };
  }

  async ler() {
    try {
      let senha = await AsyncStorage.getItem(this.state.usuario);
      if (senha != null) {
        if (senha === this.state.senha) {
          console.log('Usuário:', this.state.usuario); 
          this.props.navigation.navigate('Tela3', { nome: this.state.usuario }); // Passando o nome
        } else {
          alert('Senha Incorreta!');
        }
      } else {
        alert('Usuário não foi encontrado!');
      }
    } catch (erro) {
      console.log(erro);
    }
  }

  render() {
    return (
      <View>
        <Container2 source={require('../styles/Back.png')}> 
          <Text style={{ color: '#fff', fontSize: 24 }}>Bem vindo ao Health FIT!</Text>
          <Text style={{ color: '#fff', fontSize: 14, backgroundColor: "grey", marginTop: 20, padding: 10 }}>encontre a melhor dieta para você</Text>
        </Container2>

        <Container> 
          <TitleList> Usuário: </TitleList>
          <InputField 
            placeholder="Digite seu nome"
            onChangeText={(texto) => this.setState({ usuario: texto })} 
          />
          <TitleList> Senha: </TitleList>

         
          <InputField 
            secureTextEntry 
            placeholder="Digite sua senha"
            onChangeText={(texto) => this.setState({ senha: texto })} 
          />


          <Button title="Logar" onPress={() => this.ler()} />
        </Container>
      </View>
    );
  }
}

export default Principal;
