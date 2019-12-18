import React from 'react';
import {View, Image, StyleSheet, TextInput} from 'react-native';

const SearchBar = (props) => {
    return (
        <View style={styles.search}>
            <Image 
            style={styles.imageSearch}
            source={require('../../imagens/search.png')}/>
            <TextInput
            placeholder={'Procure uma série'}
            style={styles.input}
            onChangeText={(text) => props.text[1](text)}
            onSubmitEditing={props.submitSearch}/>
        </View>
    );
}

const styles = StyleSheet.create({
    search: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 24,
      borderWidth: 1,
    },

    imageSearch: {
      marginStart: 10,
      width: 14,
      height: 14,
    },

    input: {
        width: 250,
        borderColor: 'lightgray',
        paddingHorizontal: 20,
        fontSize: 20,
    },
});

export default SearchBar;