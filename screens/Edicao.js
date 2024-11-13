import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, Alert, View, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, ref as dbRef, update } from 'firebase/database';
import { auth } from '../Config/config';
import { getAuth, updateProfile } from "firebase/auth";

const Edicao = ({ route, navigation }) => {
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    const avatarUrlFromParams = route.params?.avatarUrl;

    if (avatarUrlFromParams) {
      setAvatar(avatarUrlFromParams);
    } else if (user) {
      setUsername(user.displayName || '');
      setAvatar(user.photoURL); // Carregar o avatar atual
    } else {
      Alert.alert('Erro', 'Usuário não autenticado!');
    }
  }, [route]);

  const pickImage = async () => {
    try {
      // Solicitar permissão de acesso à câmera
      let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert("Permissão necessária", "Você precisa permitir o acesso à câmera.");
        return;
      }

      // Lançar a câmera para tirar uma foto
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log('Resultado da câmera:', result); // Adicionar log para verificar o retorno

      if (result.canceled) {
        Alert.alert("Erro", "Imagem não capturada ou selecionada.");
      } else if (result.assets && result.assets[0].uri) {
        setAvatar(result.assets[0].uri); // Use o URI correto
        uploadImageAsBase64(result.assets[0].uri); // Fazer o upload como base64
      } else {
        Alert.alert("Erro", "Imagem não válida.");
      }
    } catch (error) {
      console.error('Erro ao capturar imagem:', error); // Log de erro para depuração
      Alert.alert("Erro", "Falha ao capturar a imagem.");
    }
  };

  const uploadImageAsBase64 = async (uri) => {
    if (!uri) {
      Alert.alert("Erro", "Nenhuma imagem foi selecionada.");
      return;
    }

    const user = auth.currentUser;
  if (user) {
    try {
      // Pegar a imagem em base64
      const base64Image = await uriToBase64(uri);
      
      // Adicionar o prefixo adequado para a imagem JPEG
      const base64WithPrefix = `data:image/jpeg;base64,${base64Image}`;
      
      // Salvar a imagem em base64 no Firebase Realtime Database
      saveAvatarUrlToDatabase(base64WithPrefix);
    } catch (error) {
      console.error("Erro ao converter imagem para base64: ", error);
      Alert.alert("Erro", "Falha ao converter a imagem.");
    }
  } else {
    Alert.alert("Erro", "Usuário não autenticado.");
  }
};

  // Função para converter a URI da imagem em base64
  const uriToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result.split(',')[1]); // Retorna só a parte base64
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  const saveAvatarUrlToDatabase = (base64Image) => {
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const userRef = dbRef(db, 'users/' + user.uid);
      update(userRef, { photoURL: base64Image }) // Salvar imagem base64 no banco de dados
        .then(() => {
          Alert.alert("Sucesso", "Foto de perfil atualizada!");
          navigation.goBack(); // Retorna à tela anterior
        })
        .catch((error) => {
          console.error("Erro ao salvar URL no banco de dados: ", error);
          Alert.alert("Erro", "Falha ao salvar a URL da imagem.");
        });
    }
  };

  const handleUpdate = () => {
    const user = auth.currentUser;
    if (user) {
      if (username !== '') {
        // Atualiza o nome no Firebase Authentication
        updateProfile(user, {
          displayName: username,
        })
          .then(() => {
            // Após atualizar o nome no Firebase Authentication, atualize no Realtime Database
            const db = getDatabase();
            const userRef = dbRef(db, 'users/' + user.uid);
            
            // Atualize o nome no Realtime Database
            update(userRef, { username: username }) // Atualizando o campo 'username' no Realtime Database
              .then(() => {
                Alert.alert('Sucesso', 'Nome de usuário atualizado com sucesso!');
                navigation.goBack(); // Retorna à tela anterior
              })
              .catch((error) => {
                console.error(error);
                Alert.alert('Erro', 'Falha ao atualizar o nome de usuário no banco de dados');
              });
          })
          .catch((error) => {
            console.error(error);
            Alert.alert('Erro', 'Falha ao atualizar o nome de usuário no Firebase Authentication');
          });
      } else {
        Alert.alert('Erro', 'Nome de usuário não pode ser vazio');
      }
    } else {
      Alert.alert('Erro', 'Usuário não autenticado!');
    }
  };
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Editar Avatar</Text>

      <TouchableOpacity onPress={pickImage}>
        <Image
          source={avatar ? { uri: avatar } : require('../styles/avatar.jpg')}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
        />
      </TouchableOpacity>

      <TextInput
        style={{
          height: 40,
          borderColor: '#ccc',
          borderWidth: 1,
          marginVertical: 10,
          paddingLeft: 10,
          width: '100%',
          borderRadius: 5,
        }}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#4CAF50',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          marginTop: 10,
        }}
        onPress={handleUpdate}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Atualizar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Edicao;
