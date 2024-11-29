import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  titleContainer: { marginBottom: 20 },
  welcomeTitle: {
    textAlign: 'auto',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  name: {
    textAlign: 'auto',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 30,
    color: '#426bf2',
  },
  listContainer: { gap: 20, paddingBottom: 20 },
  image: { height: 150, width: 150, margin: 5, borderRadius: 10},
  deletedImage: {
    margin: 5,
    borderRadius: 18,
    height: 150,
    width: 150,
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    zIndex: 99,
    justifyContent: 'center',
  },
  deletedItemText: { textAlign: 'center', color: 'white' },
  imageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageContainer: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.3)',
    backgroundColor: '#f1f2f7',
  },
  emptyTitle: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.5)',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  delete: {
    backgroundColor: '#426bf2',
    alignSelf: 'flex-end',
    padding: 8,
    borderRadius: 20,
  },
});
