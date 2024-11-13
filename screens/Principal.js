import React from 'react';
import { Text, Button, Alert } from 'react-native';
import { View, Container, TitleList, InputField, Container2 } from '../styles/adm';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Atualizando para o método modular

class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  ler() {
    console.log("logado");
    const { email, password } = this.state;
    
    if (!email || !password) {
      console.log("logado");
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const auth = getAuth(); // Obtenha a instância de autenticação

    signInWithEmailAndPassword(auth, email.toLowerCase(), password) // Método de login
      .then(() => {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        this.props.navigation.navigate('Tela3', { nome: email });
      })
      .catch(error => {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-email") {
          Alert.alert('Erro', "Formato do email inválido");
        } else if (errorCode === "auth/user-not-found") {
          Alert.alert('Erro', "Usuário não encontrado");
        } else {
          Alert.alert('Erro', "Ocorreu um erro: " + error.message);
        }
      });
  }

  render() {
    return (
      <View>
        <Container2 source={require('../styles/Back.png')}> 
          <Text style={{ color: '#fff', fontSize: 24 }}>Bem-vindo ao Health FIT!</Text>
          <Text style={{ color: '#fff', fontSize: 14, backgroundColor: "grey", marginTop: 20, padding: 10 }}>Encontre a melhor dieta para você</Text>
        </Container2>

        <Container> 
          <TitleList> E-mail: </TitleList>
          <InputField 
            placeholder="Digite seu e-mail"
            onChangeText={(texto) => this.setState({ email: texto })} 
          />
          <TitleList> Senha: </TitleList>
          <InputField 
            secureTextEntry 
            placeholder="Digite sua senha"
            onChangeText={(texto) => this.setState({ password: texto })} 
          />
          <Button title="Logar" onPress={() => this.ler()} />
        </Container>
      </View>
    );
  }
}

export default Principal;
