import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    fontWeight: '500',
  },
  allText: {
    color: '#000',
  },
  fieldContainer: {
    marginBottom: 20,
    gap: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  colorOverlay: {
    width: 46,
    height: 46,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 4,
    position: 'absolute',
    bottom: -3,
    left: -3,
    borderColor: '#426bf2',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  dropDownContainer: {
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
  },
  dropDownPlaceholder: {
    color: 'rgba(0,0,0,0.3)',
  },
  addButton: {
    marginBottom: 20,
    borderRadius: 17,
    backgroundColor: '#426bf2',
    padding: 15,
    marginHorizontal: 20,
  },
  buttonText: {fontSize: 20, fontWeight: 'bold', color: 'white'},
  tipsPoints: {marginLeft: 20, color: '#000',},
  tipsContainer: {opacity: 0.6},
  buttonContainer: {position: 'absolute', width: '100%', bottom: 0},
});
