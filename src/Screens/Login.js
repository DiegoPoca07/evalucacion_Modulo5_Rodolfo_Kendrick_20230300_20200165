import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Firebase';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const iniciarSesion = async () => {
    if (!correo || !contrasena) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
      console.log('Usuario autenticado correctamente');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      {/* Elementos decorativos de fondo */}
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />
      <View style={styles.backgroundCircle3} />
      
      <View style={styles.loginContainer}>
        {/* Indicador visual superior */}
        <View style={styles.topIndicator} />
        
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon} />
          </View>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>Inicia sesión en tu cuenta</Text>
        </View>

        <View style={styles.formContainer}>
          
          {/* Email Input */}
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="tu@email.com"
            placeholderTextColor="#9CA3AF"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password Input */}
          <Text style={styles.inputLabel}>Contraseña</Text>
          <TextInput
            style={styles.textInput}
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginButton} onPress={iniciarSesion}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            <View style={styles.buttonArrow} />
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity 
            style={styles.registerButton}
            onPress={() => navigation.navigate('Registrarse')}
          >
            <Text style={styles.registerButtonText}>Crear nueva cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    padding: 20,
  },
  // Elementos decorativos de fondo
  backgroundCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#1E293B',
    top: -50,
    right: -50,
    opacity: 0.3,
  },
  backgroundCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#334155',
    bottom: 100,
    left: -75,
    opacity: 0.2,
  },
  backgroundCircle3: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#475569',
    top: '40%',
    right: 20,
    opacity: 0.15,
  },
  loginContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 32,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  topIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#3B82F6',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3B82F6',
    borderWidth: 3,
    borderColor: '#1D4ED8',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    fontWeight: '400',
  },
  formContainer: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E2E8F0',
    marginBottom: 8,
    marginLeft: 4,
    marginTop: 16,
  },
  textInput: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#475569',
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#F8FAFC',
    fontWeight: '500',
    marginBottom: 8,
  },
  loginButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 8,
  },
  buttonArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 0,
    borderBottomWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: '#FFFFFF',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#475569',
  },
  dividerText: {
    color: '#94A3B8',
    fontSize: 14,
    marginHorizontal: 16,
    fontWeight: '500',
  },
  registerButton: {
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  registerButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
  },
});