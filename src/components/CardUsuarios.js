import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { database } from '../config/Firebase';

const CardUsuarios = ({ id, nombre, correo, titulo, anioGraduacion }) => {
  const [editMode, setEditMode] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [datosEditados, setDatosEditados] = useState({
    nombre: nombre || '',
    correo: correo || '',
    titulo: titulo || '',
    anioGraduacion: anioGraduacion ? anioGraduacion.toString() : '',
  });

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(database, 'usuarios', id));
      Alert.alert('Usuario eliminado', `Se eliminó el usuario ${nombre}`);
    } catch (e) {
      console.error('Error al eliminar el usuario:', e);
      Alert.alert('Error', 'No se pudo eliminar el usuario.');
    }
  };

  const handleSave = async () => {
    if (
      !datosEditados.nombre.trim() ||
      !datosEditados.correo.trim() ||
      !datosEditados.titulo.trim() ||
      !datosEditados.anioGraduacion.trim()
    ) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const anio = parseInt(datosEditados.anioGraduacion);
    if (isNaN(anio) || anio < 1900 || anio > new Date().getFullYear() + 5) {
      Alert.alert('Error', 'Ingresa un año de graduación válido');
      return;
    }

    try {
      await updateDoc(doc(database, 'usuarios', id), {
        nombre: datosEditados.nombre,
        correo: datosEditados.correo,
        titulo: datosEditados.titulo,
        anioGraduacion: anio,
      });
      Alert.alert('Actualización exitosa', 'Usuario actualizado correctamente');
      setEditMode(false);
    } catch (e) {
      console.error('Error al actualizar el usuario:', e);
      Alert.alert('Error', 'No se pudo actualizar el usuario.');
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setDatosEditados({
      nombre: nombre || '',
      correo: correo || '',
      titulo: titulo || '',
      anioGraduacion: anioGraduacion ? anioGraduacion.toString() : '',
    });
  };

  return (
    <View style={styles.card}>
      {/* Header de la tarjeta */}
      <View style={styles.cardHeader}>
        <View style={styles.profileIndicator}>
          <View style={styles.profileDot} />
        </View>
        <Text style={styles.cardTitle}>
          {editMode ? 'Editando Perfil' : 'Información del Usuario'}
        </Text>
        {!editMode && (
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Activo</Text>
          </View>
        )}
      </View>

      {editMode ? (
        <View style={styles.editContainer}>
          {/* Input Nombre */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre Completo</Text>
            <View
              style={[
                styles.inputWrapper,
                focusedInput === 'nombre' && styles.inputWrapperFocused,
              ]}
            >
              <View style={styles.inputIcon}>
                <View style={styles.userIcon} />
              </View>
              <TextInput
                style={styles.input}
                value={datosEditados.nombre}
                onChangeText={(text) => setDatosEditados({ ...datosEditados, nombre: text })}
                placeholder="Nombre completo"
                placeholderTextColor="#64748B"
                onFocus={() => setFocusedInput('nombre')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
          </View>

          {/* Input Correo */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Correo Electrónico</Text>
            <View
              style={[
                styles.inputWrapper,
                focusedInput === 'correo' && styles.inputWrapperFocused,
              ]}
            >
              <View style={styles.inputIcon}>
                <View style={styles.emailIcon} />
              </View>
              <TextInput
                style={styles.input}
                value={datosEditados.correo}
                onChangeText={(text) => setDatosEditados({ ...datosEditados, correo: text })}
                placeholder="correo@ejemplo.com"
                placeholderTextColor="#64748B"
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => setFocusedInput('correo')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
          </View>

          {/* Input Título */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Título Universitario</Text>
            <View
              style={[
                styles.inputWrapper,
                focusedInput === 'titulo' && styles.inputWrapperFocused,
              ]}
            >
              <View style={styles.inputIcon}>
                <View style={styles.academicIcon} />
              </View>
              <TextInput
                style={styles.input}
                value={datosEditados.titulo}
                onChangeText={(text) => setDatosEditados({ ...datosEditados, titulo: text })}
                placeholder="Título universitario"
                placeholderTextColor="#64748B"
                onFocus={() => setFocusedInput('titulo')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
          </View>

          {/* Input Año */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Año de Graduación</Text>
            <View
              style={[
                styles.inputWrapper,
                focusedInput === 'anio' && styles.inputWrapperFocused,
              ]}
            >
              <View style={styles.inputIcon}>
                <View style={styles.calendarIcon} />
              </View>
              <TextInput
                style={styles.input}
                value={datosEditados.anioGraduacion}
                onChangeText={(text) => setDatosEditados({ ...datosEditados, anioGraduacion: text })}
                placeholder="2024"
                placeholderTextColor="#64748B"
                keyboardType="numeric"
                onFocus={() => setFocusedInput('anio')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
          </View>

          {/* Botones de edición */}
          <View style={styles.editButtonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <View style={styles.saveButtonContent}>
                <View style={styles.saveIcon} />
                <Text style={styles.saveButtonText}>Guardar</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.viewContainer}>
          {/* Información del usuario */}
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <View style={styles.userIconView} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Nombre</Text>
                <Text style={styles.infoValue}>{nombre}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <View style={styles.emailIconView} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Correo</Text>
                <Text style={styles.infoValue}>{correo}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <View style={styles.academicIconView} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Título</Text>
                <Text style={styles.infoValue}>{titulo}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <View style={styles.calendarIconView} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Graduación</Text>
                <Text style={styles.infoValue}>{anioGraduacion}</Text>
              </View>
            </View>
          </View>

          {/* Botones de acción */}
          <View style={styles.actionButtonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={() => setEditMode(true)}>
              <View style={styles.editButtonContent}>
                <View style={styles.editIcon} />
                <Text style={styles.editButtonText}>Editar</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <View style={styles.deleteButtonContent}>
                <View style={styles.deleteIcon} />
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 24,
    margin: 16,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  
  // Header
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  
  profileIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  
  profileDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  
  statusBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  
  statusText: {
    fontSize: 12,
    color: '#22C55E',
    fontWeight: '600',
  },
  
  // Vista de información
  viewContainer: {
    flex: 1,
  },
  
  infoSection: {
    marginBottom: 24,
  },
  
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#475569',
  },
  
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  
  userIconView: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#9CA3AF',
  },
  
  emailIconView: {
    width: 18,
    height: 14,
    backgroundColor: '#9CA3AF',
    borderRadius: 2,
  },
  
  academicIconView: {
    width: 18,
    height: 16,
    backgroundColor: '#9CA3AF',
    borderRadius: 2,
  },
  
  calendarIconView: {
    width: 16,
    height: 18,
    backgroundColor: '#9CA3AF',
    borderRadius: 2,
  },
  
  infoContent: {
    flex: 1,
  },
  
  infoLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
    marginBottom: 4,
  },
  
  infoValue: {
    fontSize: 16,
    color: '#F8FAFC',
    fontWeight: '600',
  },
  
  // Contenedor de edición
  editContainer: {
    flex: 1,
  },
  
  inputLabel: {
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
  
  // Botones de acción
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  
  editButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  editButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  
  editIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginRight: 8,
  },
  
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  
  deleteButton: {
    flex: 1,
    backgroundColor: '#DC2626',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  deleteButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  
  deleteIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginRight: 8,
  },
  
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  
  // Botones de edición
  editButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 24,
  },
  
  saveButton: {
    flex: 1,
    backgroundColor: '#22C55E',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#22C55E',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  saveButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  
  saveIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginRight: 8,
  },
  
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  
  cancelButtonText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CardUsuarios;