import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { loginUsuario } from '../services/userService';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

export default function UserLoginScreen() {
  const navigation = useNavigation();

  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      const response = await loginUsuario(email, senha);
      console.log('Usuário logado com sucesso:', response.data);

      Alert.alert('Bem-vindo!', 'Login realizado com sucesso!');
      
      login();
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert('Erro', 'Email ou senha inválidos.');
      } else {
        Alert.alert('Erro', 'Usuário ou senha incorretos.');
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <Button title="Entrar" onPress={handleLogin} />
      )}
      <Text style={styles.textRoute}>Ainda não tem conta? <Text style={styles.textLink} onPress={() => navigation.navigate('Cadastro')}>Cadastre-se</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  textRoute: {
    top: 12,
    fontSize: 16,
    fontWeight: 'bold'
  },
  textLink: {
    color: '#0000ff'
  }
});
