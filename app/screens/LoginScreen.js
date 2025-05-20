import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useLogin } from '../hooks/useLogin';
import { styles } from '../styles/LoginScreen.styles';

export const LoginScreen = ({ navigation }) => {
  const {
    email,
    password,
    isLoading,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    handleGoogleLogin,
    handleForgotPassword,
  } = useLogin(navigation);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
          autoCapitalize="none"
        />

        {/* Error Message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>Log In</Text>
          )}
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Separator */}
        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>or</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Google Login Button */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
        >
          <MaterialIcons name="google" size={24} color="#DB4437" />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}; 