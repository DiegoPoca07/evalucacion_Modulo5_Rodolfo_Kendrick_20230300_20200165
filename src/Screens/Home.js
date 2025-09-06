import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { database, auth } from '../config/Firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import CardUsuarios from '../components/CardUsuarios';

const Home = () => {
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(database, 'usuarios'), where('uid', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setUsuarioActual({ id: doc.id, ...userData });
        });
      });

      return () => unsubscribe();
    }
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sesión cerrada, el componente Navigation cambiará automáticamente la pantalla
        Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
      })
      .catch((error) => {
        Alert.alert('Error', 'No se pudo cerrar sesión.');
        console.error('Error al cerrar sesión:', error);
      });
  };

  return (
    <View style={styles.container}>
      {/* Elementos decorativos de fondo */}
      <View style={styles.backgroundOrb1} />
      <View style={styles.backgroundOrb2} />
      <View style={styles.backgroundOrb3} />
      <View style={styles.backgroundOrb4} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerIcon}>
            <View style={styles.userAvatarOuter}>
              <View style={styles.userAvatarInner} />
            </View>
          </View>
          
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeLabel}>Bienvenido de vuelta</Text>
            {usuarioActual ? (
              <Text style={styles.userName}>{usuarioActual.nombre}</Text>
            ) : (
              <View style={styles.loadingContainer}>
                <View style={styles.loadingDot} />
                <View style={styles.loadingDot} />
                <View style={styles.loadingDot} />
              </View>
            )}
          </View>
          
          <View style={styles.statusIndicator}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>En línea</Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <View style={styles.cardContainer}>
            {usuarioActual ? (
              <CardUsuarios
                id={usuarioActual.id}
                nombre={usuarioActual.nombre}
                correo={usuarioActual.correo}
                titulo={usuarioActual.titulo}
                anioGraduacion={usuarioActual.anioGraduacion}
              />
            ) : (
              <View style={styles.loadingCard}>
                <View style={styles.loadingSpinner} />
                <Text style={styles.loadingText}>Cargando datos del usuario...</Text>
              </View>
            )}
          </View>
        </View>

        {/* Actions Section */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <View style={styles.logoutContent}>
              <View style={styles.logoutIcon} />
              <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Bottom accent */}
      <View style={styles.bottomAccent} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  
  // Elementos decorativos
  backgroundOrb1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    top: -50,
    right: -50,
  },
  
  backgroundOrb2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(168, 85, 247, 0.04)',
    bottom: 200,
    left: -75,
  },
  
  backgroundOrb3: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 212, 255, 0.03)',
    top: '40%',
    right: 20,
  },
  
  backgroundOrb4: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(34, 197, 94, 0.03)',
    bottom: 50,
    right: -30,
  },
  
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
  },
  
  // Header Section
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.3)',
  },
  
  headerIcon: {
    marginBottom: 20,
  },
  
  userAvatarOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#1E40AF',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 15,
  },
  
  userAvatarInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  
  welcomeLabel: {
    fontSize: 18,
    color: '#94A3B8',
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  
  userName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#64748B',
    marginHorizontal: 4,
  },
  
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    marginRight: 8,
  },
  
  statusText: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '600',
  },
  
  // Content Section
  contentSection: {
    marginBottom: 32,
  },
  
  cardContainer: {
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.2)',
  },
  
  loadingCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  loadingSpinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    borderTopColor: '#3B82F6',
    marginBottom: 16,
  },
  
  loadingText: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '500',
    textAlign: 'center',
  },
  
  // Actions Section
  actionsSection: {
    marginTop: 'auto',
    paddingTop: 20,
  },
  
  logoutButton: {
    backgroundColor: '#DC2626',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#B91C1C',
  },
  
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  
  logoutIcon: {
    width: 20,
    height: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginRight: 12,
  },
  
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  
  // Bottom accent
  bottomAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#3B82F6',
  },
});