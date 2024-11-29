import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {gap: 20, paddingBottom: 20, paddingHorizontal: 20,},
  image: {height: 160, width: 160},
  imageContainer: {
    borderWidth: 1,
    paddingVertical: 20,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.3)',
    backgroundColor: '#f1f2f7',
  },
  columnWrapper: {justifyContent: 'space-between'},
  dropDownContainer: {
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    width: '47%',
  },
  usageDropDownContainer: {
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    width: '47%',
    position: 'absolute',
    right: 0,
    top: -50,
  },
  dropDownPlaceholder: {
    color: 'rgba(0,0,0,0.3)',
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
  filterIconContainer: {position: 'absolute', right: 14, top: 14, zIndex: 2},
});
