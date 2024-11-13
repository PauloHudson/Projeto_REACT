import React from 'react';
import { Text, Button, Alert } from 'react-native';
import { View, Container, TitleList, InputField, Container2 } from '../styles/adm';
import { auth } from '../Config/config'; // Importação do auth do arquivo de configuração
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

class Cadastro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',    // Nome do usuário
      email: '',   // Email do usuário
      password: '', // Senha do usuário
    };
  }

  gravar() {
    const { email, password, user } = this.state;

    if (!email || !password || !user) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    // Usando a função createUserWithEmailAndPassword de Firebase 9+
    createUserWithEmailAndPassword(auth, email.toLowerCase(), password)
      .then((userCredential) => {
        // Recupera o UID do usuário recém-criado
        const userId = userCredential.user.uid;

        // Salvar o nome do usuário no banco de dados Firebase
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
          username: user,  // Nome do usuário
          email: email,    // Email do usuário
        })
        .then(() => {
          Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
          this.props.navigation.navigate('Login');
        })
        .catch(error => {
          Alert.alert('Erro', "Ocorreu um erro ao salvar os dados: " + error.message);
        });
      })
      .catch(error => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          Alert.alert('Erro', "Esse email já está em uso");
        } else if (errorCode === "auth/weak-password") {
          Alert.alert('Erro', "Senha fraca, escolha uma senha mais segura");
        } else if (errorCode === "auth/invalid-email") {
          Alert.alert('Erro', "Formato do email inválido");
        } else {
          Alert.alert('Erro', "Ocorreu um erro: " + error.message);
        }
      });
  }
  
  render() {
    return (
      <View>
        <Container2 source={require('../styles/Back.png')}> 
          <Text style={{ color: '#fff', fontSize: 24 }}>Bem-vindo ao Cadastro!</Text>
          <Text style={{ color: '#fff', fontSize: 14, backgroundColor: "grey", marginTop: 20, padding: 10 }}>Encontre a melhor dieta para você</Text>
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
