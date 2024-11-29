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
  listContainer: {gap: 20, paddingBottom: 100, paddingHorizontal: 20},
  image: {height: 160, width: 160},
  imageContainer: {
    borderWidth: 1,
    paddingVertical: 20,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.3)',
    backgroundColor: '#f1f2f7',
  },
  columnWrapper: {justifyContent: 'space-between'},
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    marginBottom: 20,
    borderRadius: 17,
    backgroundColor: '#426bf2',
    padding: 15,
    marginHorizontal: 20,
  },
  buttonText: {fontSize: 20, fontWeight: 'bold', color: 'white'},
  subTitle: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '500',
    color: '#000'
  },
  checkbox: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 1,
    backgroundColor: '#426bf2',
    padding: 4,
    borderRadius: 6,
  },
  buttonContainer: {position: 'absolute', width: '100%', bottom: 0},
});
