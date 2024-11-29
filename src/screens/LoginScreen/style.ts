import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  wrapperPage: {
    height: '100%',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: '20%',
  },

  email: {
    borderWidth: 1,
    color: '#000',
    borderRadius: 14,
    height: 50,
    fontSize: 20,
    marginHorizontal: 30,
    backgroundColor: '#A9A9A9',
    borderColor: '#e0e0e0',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  inputPass: {
    borderWidth: 1,
    borderRadius: 14,
    height: 50,
    fontSize: 20,
    marginHorizontal: 30,
    backgroundColor: '#A9A9A9',
    borderColor: '#e0e0e0',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  
  registerText: {color: '#426bf2'},
  error: {marginHorizontal: 34},

  inputContainer: {borderBottomWidth: 0},

  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonText: {fontSize: 20, fontWeight: 'bold', color: 'white'},
  buttonAuth: {
    marginTop: 40,
    marginHorizontal: '23%',
    borderRadius: 17,
    backgroundColor: '#426bf2',
    padding: 15,
  },
});
