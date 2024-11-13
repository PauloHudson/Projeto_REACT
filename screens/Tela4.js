import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { Container, Container2, MainView, TitleContainer, TitleText, Texto, Texto2 } from '../styles/Adm2';
import { auth } from '../Config/config'; // Importa a autenticação do Firebase
import { getDatabase, ref, set } from 'firebase/database'; // Importa o Database do Firebase

const Tela4 = ({ route }) => {
  const nome = route.params?.nome;
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [feedback, setFeedback] = useState('');

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura) / 100;
    if (pesoNum > 0 && alturaNum > 0) {
      const imc = (pesoNum / (alturaNum * alturaNum)).toFixed(2);
      setResultado(imc);
      gerarFeedback(imc);
      salvarIMC(imc); // Salva o IMC no banco de dados
    } else {
      alert("Por favor, insira valores válidos!");
    }
  };

  const salvarIMC = (imc) => {
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const imcRef = ref(db, 'users/' + user.uid + '/imc');
      set(imcRef, imc)
        .then(() => {
          Alert.alert("Sucesso", "IMC salvo com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao salvar o IMC: ", error);
          Alert.alert("Erro", "Não foi possível salvar o IMC.");
        });
    } else {
      Alert.alert("Erro", "Usuário não autenticado.");
    }
  };

  const gerarFeedback = (imc) => {
    let recomendacao = '';
    if (imc < 18.5) {
      recomendacao = 'Você está abaixo do peso. Considere consultar um nutricionista para orientação.';
    } else if (imc >= 18.5 && imc < 24.9) {
      recomendacao = 'Seu peso está normal. Continue mantendo uma dieta equilibrada e exercícios regulares.';
    } else if (imc >= 25 && imc < 29.9) {
      recomendacao = 'Você está com sobrepeso. Tente adotar hábitos saudáveis para melhorar sua saúde.';
    } else {
      recomendacao = 'Você está classificado como obeso. É importante procurar ajuda médica para orientações sobre saúde.';
    }
    setFeedback(recomendacao);
  };

  const limparCampos = () => {
    setPeso('');
    setAltura('');
    setResultado(null);
    setFeedback('');
  };

  return (
    <MainView>
      <Container>
        <TitleContainer>
          <TitleText>Cálculo do IMC</TitleText>
        </TitleContainer>
        <TitleContainer>
          <TitleText>Bem-vindo(a), {nome || 'Usuário'}!</TitleText>
        </TitleContainer>

        <Texto2 style={{color: "black"}}>Insira seu peso (kg):</Texto2>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 10, borderRadius: 5, padding: 10, width: 200 }}
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />

        <Texto2 style={{color: "black"}}>Insira sua altura (cm):</Texto2>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 10, borderRadius: 5, padding: 10, width: 200 }}
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />

        <TouchableOpacity
          onPress={calcularIMC}
          style={{
            backgroundColor: '#007BFF',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            marginVertical: 10,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Calcular IMC</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={limparCampos}
          style={{
            backgroundColor: '#DC3545',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            marginVertical: 10,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Limpar</Text>
        </TouchableOpacity>

        {resultado && (
          <Texto style={{ marginTop: 20, color: "black" }}>
            Seu IMC é: <Text style={{ fontWeight: 'bold', color: "black" }}>{resultado}</Text>
          </Texto>
        )}

        {feedback && (
          <Texto style={{ marginTop: 10, color: 'black', fontWeight: 'bold' }}>
            {feedback}
          </Texto>
        )}
      </Container>
    </MainView>
  );
};

export default Tela4;
