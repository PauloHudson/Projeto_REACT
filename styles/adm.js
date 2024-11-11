import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';
//styled view. styled.text


//parte branca
export const Container = styled.SafeAreaView`
  flex: 1.6;
  background-color: white;
  justify-content: center;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

//pretinha
export const Container2 = styled(ImageBackground)`
  flex: 1;
  background-color: #121212; 
  justify-content: center;
  align-items: center;
  padding: 2px;
`;

export const View = styled.SafeAreaView`
  background-color: #121212;
  flex: 1;

`;
export const TitleList = styled.Text`
  color: black;
  font-size: 17px;

  text-align: left;
`;

export const StyledButton = styled.Button`
  margin-top: 20px;

  background-color: #6200ee;
`;

export const InputField = styled.TextInput`
  width: 100%;
  padding: 13px;
  margin-bottom: 5px;
  margin-top: 5px;
  border: grey;
  border-radius: 5px;
  font-size: 15px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;