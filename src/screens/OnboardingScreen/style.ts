import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
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
  subTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 20,
    marginHorizontal: 20,
  },

  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonAuth: {
    marginTop: 40,
    marginHorizontal: '23%',
    borderRadius: 17,
    backgroundColor: '#426bf2',
    padding: 15,
  },
  buttonText: {fontSize: 20, fontWeight: 'bold', color: 'white'},
});
