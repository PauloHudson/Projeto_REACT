import React from 'react';
import {Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Container, TitleList, InputField, Container2 } from '../styles/adm';

class Cadastro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      email: '', 
      password: '',
    };
  }

  async gravar() {
    try {
      await AsyncStorage.setItem(this.state.user, this.state.password);
      alert('Salvo com sucesso!!!');
    } catch (erro) {
      alert('Erro ao salvar!');
    }
  }
  
  render() {
    return (
      <View>
        <Container2 source={require('../styles/Back.png')}> 
          <Text style={{ color: '#fff', fontSize: 24 }}>Bem-vindo ao Cadastro!</Text>
          <Text style={{ color: '#fff', fontSize: 14, backgroundColor: "grey", marginTop: 20, padding: 10 }}>encontre a melhor dieta para você</Text>
        </Container2>

        <Container> 
        <TitleList> Nome: </TitleList>
          <InputField 
            placeholder="Digite seu nome"
            onChangeText={(texto) => this.setState({ user: texto })} 
          />
          <TitleList> E-mail: </TitleList>
          <InputField 
            placeholder="Digite seu email"
            onChangeText={(email) => this.setState({ email: email })} 
          />
          <TitleList> Senha: </TitleList>
          <InputField 
            secureTextEntry 
            placeholder="Digite sua senha"
            onChangeText={(texto) => this.setState({ password: texto })} 
          />
          <Button title="Cadastrar" onPress={() => this.gravar()} />
        </Container>
      </View>
    );
  }
}

export default Cadastro;
