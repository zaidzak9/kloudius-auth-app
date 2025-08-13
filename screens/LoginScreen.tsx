import { StyleSheet, Text, View, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import { useState, useEffect } from 'react';
import { useAuth } from '../src/context/AuthContext';
import { handleLoginLogic } from '../src/utils/authUtils';
import { strings } from '../src/utils/strings';

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useAuth();

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  const handleLogin = () => {
    const errorMessage = handleLoginLogic(email, password);
    setError(errorMessage);
    
    if (!errorMessage) {
      const success = login({ email, password });
      if (success) {
        navigation.navigate(strings.homeScreen);
      } else {
        setError('Invalid email or password');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.login}</Text>
      
      <TextInput
        style={styles.input}
        placeholder={strings.email}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder={strings.password}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{strings.loginButton}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate(strings.signupScreen)}>
        <Text style={styles.linkText}>{strings.goToSignup}</Text>
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
    marginBottom: 15,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
  },
  eyeIcon: {
    padding: 15,
  },
  eyeText: {
    fontSize: 18,
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
  },
});