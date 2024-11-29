import {Platform} from 'react-native';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {flex: 1},
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 14,
    marginBottom: 10,
    marginTop: Platform.OS === 'android' ? 12 : 0,
  },
  welcomeTitle: {
    textAlign: 'auto',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 6,
    color: 'black',
  },
  listContainer: {gap: 30, paddingBottom: 20},
  image: {height: 120, width: 120, borderRadius: 10},
  imageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  deletedImage: {
    height: 140,
    width: 140,
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    zIndex: 99,
    justifyContent: 'center',
    borderRadius: 18
  },
  deletedItemText: {textAlign: 'center', color: 'white'},
  imageContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.3)',
    backgroundColor: '#f1f2f7',
    flexDirection: 'row',
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
  subListContainer: {gap: 20, paddingHorizontal: 20},
  date: {
    marginHorizontal: 22,
    fontSize: 16,
    marginBottom: 12,
    fontWeight: '500',
    color: '#426bf2',
  },
});
