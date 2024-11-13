import styled from 'styled-components/native';

// Parte branca
export const Container = styled.SafeAreaView`
  flex: 5;
  background-color: #FFFFFF;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave */
`;

// Parte preta
export const Container2 = styled.SafeAreaView`
  flex: 4;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: rgba(0, 0, 0, 0.8); 
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const MainView = styled.SafeAreaView`
  background-color: #EFEFEF; /* Ajuste a cor de fundo se necessário */
  flex: 1;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const TitleText = styled.Text`
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-left: 10px;
`;

export const Texto = styled.Text`
  color: white;
  font-size: 18px;
  text-align: left;
  line-height: 28px;
  padding: 0 10px;
`;

export const Texto2 = styled.Text`
  color: white;
  font-size: 18px;
  text-align: left;
  line-height: 28px;
  padding: 0 10px;
`;

export const StyledImage = styled.Image`
  height: 110px;
  
  margin-top: 15px;
  resize-mode: contain;
  align-self: center;
  border-radius: 10px;
`;

export const AvatarImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  resize-mode: cover;
`;
