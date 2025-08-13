import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import { strings } from '../src/utils/strings';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate(strings.loginScreen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.welcomeHome}</Text>
      
      <View style={styles.userInfo}>
        <Text style={styles.label}>{strings.nameLabel}</Text>
        <Text style={styles.value}>{user?.name || strings.notAvailable}</Text>
        
        <Text style={styles.label}>{strings.emailLabel}</Text>
        <Text style={styles.value}>{user?.email || strings.notAvailable}</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>{strings.logout}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  userInfo: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});