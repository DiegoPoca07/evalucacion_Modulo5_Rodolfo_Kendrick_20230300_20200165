import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  Alert,
  ScrollView
} from 'react-native';
import { auth, database } from '../config/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

const RegistroUsuarios = ({ navigation }) => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    titulo: '',
    anioGraduacion: '',
  });

  const registrarUsuario = async () => {
    const { nombre, correo, contrasena, titulo, anioGraduacion } = usuario;

    if (!nombre || !correo || !contrasena || !titulo || !anioGraduacion) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const uid = userCredential.user.uid;

      // Guardar información adicional en Firestore
      await addDoc(collection(database, 'usuarios'), {
        uid,
        nombre,
        correo,
        titulo,
        anioGraduacion: parseInt(anioGraduacion),
        creado: new Date(),
        activo: true,
      });

      Alert.alert('Registro exitoso', 'Usuario creado correctamente');

      // No navegamos manualmente porque el listener de auth cambia el stack automáticamente

    } catch (error) {
      console.error('Error al registrar usuario', error);
      Alert.alert('Error', 'No se pudo registrar. Tal vez el correo ya está en uso.');
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      {/* Elementos decorativos de fondo */}
      <View style={styles.backgroundShape1} />
      <View style={styles.backgroundShape2} />
      <View style={styles.backgroundShape3} />
      
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerSection}>
          <View style={styles.headerIcon}>
            <View style={styles.iconInner} />
          </View>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Completa tu información para registrarte</Text>
        </View>

        {/* Formulario */}
        <View style={styles.formSection}>
          
          {/* Nombre */}
          <Text style={styles.label}>Nombre Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu nombre completo"
            placeholderTextColor="#64748B"
            value={usuario.nombre}
            onChangeText={(text) => setUsuario({ ...usuario, nombre: text })}
          />

          {/* Correo */}
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="tu@email.com"
            placeholderTextColor="#64748B"
            keyboardType="email-address"
            autoCapitalize="none"
            value={usuario.correo}
            onChangeText={(text) => setUsuario({ ...usuario, correo: text })}
          />

          {/* Contraseña */}
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#64748B"
            secureTextEntry
            value={usuario.contrasena}
            onChangeText={(text) => setUsuario({ ...usuario, contrasena: text })}
          />

          {/* Título */}
          <Text style={styles.label}>Título Universitario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Ingeniero en Sistemas"
            placeholderTextColor="#64748B"
            value={usuario.titulo}
            onChangeText={(text) => setUsuario({ ...usuario, titulo: text })}
          />

          {/* Año de graduación */}
          <Text style={styles.label}>Año de Graduación</Text>
          <TextInput
            style={styles.input}
            placeholder="2024"
            placeholderTextColor="#64748B"
            keyboardType="numeric"
            value={usuario.anioGraduacion}
            onChangeText={(text) => setUsuario({ ...usuario, anioGraduacion: text })}
          />

          {/* Botones */}
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.registerButton} onPress={registrarUsuario}>
              <View style={styles.buttonGradient}>
                <Text style={styles.registerButtonText}>Crear Cuenta</Text>
                <View style={styles.buttonIcon} />
              </View>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>o</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>Ya tengo cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegistroUsuarios;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
    paddingTop: 60,
  },
  
  // Elementos decorativos
  backgroundShape1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(59, 130, 246, 0.04)',
    top: -50,
    right: -80,
  },
  
  backgroundShape2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(168, 85, 247, 0.03)',
    bottom: 100,
    left: -60,
  },
  
  backgroundShape3: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0, 212, 255, 0.02)',
    top: '30%',
    right: 20,
  },
  
  container: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 20,
  },
  
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  
  headerIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#1E40AF',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 15,
  },
  
  iconInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F8FAFC',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 24,
  },
  
  formSection: {
    width: '100%',
  },
  
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E2E8F0',
    marginBottom: 8,
    marginLeft: 4,
    marginTop: 16,
  },
  
  input: {
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
  
  buttonSection: {
    marginTop: 24,
  },
  
  registerButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  
  buttonGradient: {
    backgroundColor: '#3B82F6',
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 8,
  },
  
  buttonIcon: {
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
    marginVertical: 24,
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
  
  loginButton: {
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  
  loginButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
  },
});