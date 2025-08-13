import { StatusBar } from 'expo-status-bar';
import LoginScreen from './LoginScreen';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <LoginScreen />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
