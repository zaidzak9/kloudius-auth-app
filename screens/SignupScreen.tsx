import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import { handleSignupLogic } from '../src/utils/authUtils';
import { strings } from '../src/utils/strings';

interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

export default function SignupScreen({ navigation }: { navigation: any }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const { signup } = useAuth();

  const handleSignup = () => {
    const validationErrors = handleSignupLogic(name, email, password);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      signup({ name, email });
      Alert.alert(strings.success, strings.accountCreated);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.signup}</Text>
      
      <TextInput
        style={styles.input}
        placeholder={strings.name}
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}
      
      <TextInput
        style={styles.input}
        placeholder={strings.email}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      
      <TextInput
        style={styles.input}
        placeholder={strings.password}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>{strings.signupButton}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate(strings.loginScreen)}>
        <Text style={styles.linkText}>{strings.goToLogin}</Text>
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
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
  },
});