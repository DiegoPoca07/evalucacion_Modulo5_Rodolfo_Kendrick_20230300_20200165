import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
 
const { width, height } = Dimensions.get('window');
 
const LoadingScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
 
  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
 
    // Animación de rotación continua
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
 
    // Animación de pulso
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
 
    // Barra de progreso
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, []);
 
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
 
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
 
  return (
    <LinearGradient
      colors={['#0F0F23', '#1A1A2E', '#16213E', '#0F3460']}
      style={styles.container}
      locations={[0, 0.3, 0.7, 1]}
    >
      <StatusBar barStyle="light-content" />
      
      {/* Elementos decorativos de fondo */}
      <View style={styles.backgroundOrb1} />
      <View style={styles.backgroundOrb2} />
      <View style={styles.backgroundOrb3} />
     
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Header con icono */}
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.iconCore} />
            <View style={styles.iconRing1} />
            <View style={styles.iconRing2} />
          </View>
        </View>

        {/* Título mejorado */}
        <Animated.View style={[styles.titleContainer, { transform: [{ scale: pulseAnim }] }]}>
          <Text style={styles.titleMain}>Evaluación</Text>
          <View style={styles.subtitleContainer}>
            <View style={styles.subtitleAccent} />
            <Text style={styles.subtitle}>Módulo 5</Text>
            <View style={styles.subtitleAccent} />
          </View>
        </Animated.View>
 
        {/* Spinner rediseñado */}
        <View style={styles.spinnerSection}>
          <Animated.View
            style={[
              styles.spinnerContainer,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          >
            <View style={styles.spinner}>
              <View style={styles.spinnerTrack} />
              <View style={styles.spinnerDot1} />
              <View style={styles.spinnerDot2} />
              <View style={styles.spinnerDot3} />
              <View style={styles.spinnerDot4} />
            </View>
          </Animated.View>
          
          {/* Anillos decorativos */}
          <View style={styles.decorativeRing1} />
          <View style={styles.decorativeRing2} />
        </View>
 
        {/* Texto de carga */}
        <Text style={styles.loadingText}>Preparando evaluación...</Text>
        <Text style={styles.loadingSubtext}>Esto puede tomar unos segundos</Text>
 
        {/* Barra de progreso mejorada */}
        <View style={styles.progressSection}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: progressWidth,
                  },
                ]}
              >
                <LinearGradient
                  colors={['#00D4FF', '#0099FF', '#0066FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.progressGradient}
                />
              </Animated.View>
            </View>
          </View>
          
          {/* Indicadores de progreso */}
          <View style={styles.progressIndicators}>
            <Animated.View style={[styles.progressDot, { opacity: fadeAnim }]} />
            <Animated.View style={[styles.progressDot, { opacity: fadeAnim, transform: [{ scale: pulseAnim }] }]} />
            <Animated.View style={[styles.progressDot, { opacity: fadeAnim }]} />
          </View>
        </View>
      </Animated.View>
      
      {/* Partículas flotantes */}
      <View style={styles.particle1} />
      <View style={styles.particle2} />
      <View style={styles.particle3} />
      <View style={styles.particle4} />
    </LinearGradient>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Elementos decorativos de fondo
  backgroundOrb1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(0, 212, 255, 0.03)',
    top: -100,
    right: -100,
  },
  backgroundOrb2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 153, 255, 0.05)',
    bottom: -50,
    left: -50,
  },
  backgroundOrb3: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(0, 102, 255, 0.04)',
    top: '40%',
    right: 30,
  },
  
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 32,
    padding: 48,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 25,
    backdropFilter: 'blur(20px)',
  },
  
  headerContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  
  iconContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  iconCore: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00D4FF',
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  
  iconRing1: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(0, 212, 255, 0.3)',
    borderStyle: 'dashed',
  },
  
  iconRing2: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'rgba(0, 153, 255, 0.2)',
  },
  
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  
  titleMain: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -1,
    textShadowColor: 'rgba(0, 212, 255, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  subtitleAccent: {
    width: 20,
    height: 2,
    backgroundColor: '#00D4FF',
    marginHorizontal: 12,
    borderRadius: 1,
  },
  
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#94A3B8',
    textAlign: 'center',
    letterSpacing: 2,
  },
  
  spinnerSection: {
    position: 'relative',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  spinnerContainer: {
    zIndex: 3,
  },
  
  spinner: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  
  spinnerTrack: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderStyle: 'dashed',
  },
  
  spinnerDot1: {
    position: 'absolute',
    top: -6,
    left: '50%',
    width: 12,
    height: 12,
    backgroundColor: '#00D4FF',
    borderRadius: 6,
    marginLeft: -6,
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
  },
  
  spinnerDot2: {
    position: 'absolute',
    top: '50%',
    right: -6,
    width: 10,
    height: 10,
    backgroundColor: '#0099FF',
    borderRadius: 5,
    marginTop: -5,
    shadowColor: '#0099FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  
  spinnerDot3: {
    position: 'absolute',
    bottom: -6,
    left: '50%',
    width: 8,
    height: 8,
    backgroundColor: '#0066FF',
    borderRadius: 4,
    marginLeft: -4,
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  
  spinnerDot4: {
    position: 'absolute',
    top: '50%',
    left: -5,
    width: 10,
    height: 10,
    backgroundColor: '#0099FF',
    borderRadius: 5,
    marginTop: -5,
    shadowColor: '#0099FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  
  decorativeRing1: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.1)',
    zIndex: 1,
  },
  
  decorativeRing2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: 'rgba(0, 153, 255, 0.05)',
    zIndex: 0,
  },
  
  loadingText: {
    fontSize: 18,
    color: '#E2E8F0',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  
  loadingSubtext: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '400',
  },
  
  progressSection: {
    width: '100%',
    alignItems: 'center',
  },
  
  progressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  
  progressBackground: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  
  progressBar: {
    height: '100%',
    borderRadius: 3,
    overflow: 'hidden',
  },
  
  progressGradient: {
    flex: 1,
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  
  progressIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00D4FF',
    marginHorizontal: 6,
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  
  // Partículas flotantes
  particle1: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0, 212, 255, 0.6)',
    top: '20%',
    left: '15%',
  },
  
  particle2: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 153, 255, 0.4)',
    top: '70%',
    right: '20%',
  },
  
  particle3: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(0, 102, 255, 0.5)',
    top: '30%',
    right: '10%',
  },
  
  particle4: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(0, 212, 255, 0.3)',
    bottom: '25%',
    left: '10%',
  },
});
 
export default LoadingScreen;