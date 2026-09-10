import { Dimensions, StyleSheet } from 'react-native';
import { palette, radius, shadow } from '../constants/Theme';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    flex: 1,
    marginHorizontal: 20,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
    backgroundColor: palette.surface,
    borderRadius: radius.large,
    ...shadow.card,
  },
  title: {
    fontSize: Math.max(28, width * 0.07),
    fontWeight: '800',
    marginBottom: 30,
    textAlign: 'center',
    color: palette.text,
  },
  input: {
    minHeight: 56,
    borderWidth: 1.5,
    borderColor: palette.border,
    borderRadius: radius.medium,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 17,
    color: palette.text,
    backgroundColor: palette.surface,
  },
  errorText: {
    color: palette.error,
    backgroundColor: palette.errorSoft,
    borderRadius: radius.small,
    padding: 12,
    marginBottom: 15,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: palette.primary,
    minHeight: 56,
    borderRadius: radius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  forgotPassword: {
    alignItems: 'center',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: palette.primary,
    fontSize: 14,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#666',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: width * 0.1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  googleButtonText: {
    marginLeft: 10,
    fontSize: width * 0.04,
    color: '#333',
  },
  registerButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  
  registerButtonText: {
    color: palette.primary,
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 12,
  }
  
}); 
