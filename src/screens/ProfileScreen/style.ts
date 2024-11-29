import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#e4fff6',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: '8%',
    fontWeight: 'bold',
    color: '#000',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 32,
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  userInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  userEmail: {
    fontSize: 16,
    fontWeight: '500',
    color: 'gray',
  },
  buttonAuth: {
    marginBottom: 20,
    marginHorizontal: '23%',
    borderRadius: 17,
    backgroundColor: '#426bf2',
    padding: 15,
  },
  borderedButton: {
    marginBottom: 20,
    marginHorizontal: '23%',
    borderRadius: 17,
    borderColor: '#426bf2',
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    padding: 15,
  },
  borderedButtonText: {fontSize: 18, fontWeight: 'bold', color: '#426bf2'},
  buttonText: {fontSize: 20, fontWeight: 'bold', color: 'white'},
  buttonContainer: {marginBottom: 30},
});
