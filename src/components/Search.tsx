import React from 'react';
import {TextInput, View, TextInputProps, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#F2F2F2',
    borderRadius: 5,
  },
});

const Search: React.FC<TextInputProps> = props => {
  return (
    <View style={styles.container}>
      <TextInput {...props} />
    </View>
  );
};

export default Search;
