import { useState } from 'react';

export const useLogin = (navigation) => {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Input change handlers
  const handleEmailChange = (text) => {
    setEmail(text);
    setError(''); // Clear error when user types
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setError(''); // Clear error when user types
  };

  // Form validation
  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!password.trim()) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  // Login handler
  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful login
      navigation.navigate('MainScreen');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Google login handler (placeholder for future implementation)
  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    console.log('Google login clicked');
  };

  // Forgot password handler
  const handleForgotPassword = () => {
    // TODO: Implement forgot password flow
    console.log('Forgot password clicked');
  };

  return {
    // State
    email,
    password,
    isLoading,
    error,
    
    // Handlers
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    handleGoogleLogin,
    handleForgotPassword,
  };
}; 