import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Container, Container2, MainView, TitleContainer, TitleText, Texto, Texto2 } from '../styles/Adm2';

const Tela4 = ({ route }) => { // Recebendo `route` como uma prop
  const nome = route.params?.nome; // Acessando o nome da rota
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
    } else {
      alert("Por favor, insira valores válidos!");
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

  // Aqui está onde o JSX deve começar


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
