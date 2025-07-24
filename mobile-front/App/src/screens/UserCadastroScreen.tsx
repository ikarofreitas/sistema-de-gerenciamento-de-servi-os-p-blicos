import React, { useState } from 'react'
import {
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ActivityIndicator,
    View
} from 'react-native';
import { cadastrarUsuario } from '../services/userService';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

export default function UserCadastroScreen() {
    const navigation = useNavigation();

    const { login } = useAuth();

    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [dataNascimento, setDataNascimento] = useState<string>('');
    const [cidade, setCidade] = useState<string>('');
    const [estado, setEstado] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const handleCadastro = async () => {
        if (!nome || !email || !senha || !dataNascimento) {
            Alert.alert('Preencha todos os campos')
        }

        setLoading(true);
        try {
            await cadastrarUsuario({
                email,
                senha,
                nome,
                data_nascimento: dataNascimento,
                cidade,
                estado
            });

            Alert.alert('Usuario cadastrado com sucesso');
            
            login();
        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao cadastrar usuário!');
        } finally {
            setLoading(false);
        }
    };


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />

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

            <TextInput
                style={styles.input}
                placeholder="Data de nascimento (YYYY-MM-DD)"
                value={dataNascimento}
                onChangeText={setDataNascimento}
            />

            <TextInput
                style={styles.input}
                placeholder="Cidade"
                value={cidade}
                onChangeText={setCidade}
            />

            <TextInput
                style={styles.input}
                placeholder="Estado"
                value={estado}
                onChangeText={setEstado}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <Button title="Cadastrar" onPress={handleCadastro} />
            )}
            <Text style={styles.textRoute}>Já tem uma conta? <Text style={styles.textLink} onPress={() => navigation.navigate('Login')}>Faça login.</Text></Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1,
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