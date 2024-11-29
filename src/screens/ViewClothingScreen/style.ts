import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {flex: 1},
  backContainer: {paddingHorizontal: 10, marginBottom: 10},
  back: {width: '10%'},
  image: {
    width: '100%',
    height: 400,
    borderRadius: 10
  },
  content: {paddingHorizontal: 20},
  color: {width: 35, height: 35, borderRadius: 20, marginHorizontal: 5},
  colorConatiner: {flexDirection: 'row', alignItems: 'center'},
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
    color: '#426bf2',
    marginHorizontal: 6,
  },
  description: {color: 'black'},
  imageContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.3)',
    backgroundColor: '#f1f2f7',
  },
  addButton: {
    borderRadius: 17,
    backgroundColor: '#426bf2',
    padding: 15,
    width: '85%',
  },
  buttonText: {fontSize: 20, fontWeight: 'bold', color: 'white'},
  detailsGrid: {flexDirection: 'column'},
  buttonContainer:{
    flexDirection: 'row',
    marginHorizontal: 4,
    marginVertical: 6,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
