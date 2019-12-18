import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../service/api';
import Card from '../components/Card'
import SearchBar from '../components/SearchBar';


const HomeScreen = ({navigation}) => {
    const [searchText, setSearchText] = useState('');
    const [apiResult, setResult] = useState(null);
    const [textResult, setTextResult] = useState('');

    const submitSearch = async () =>  { 
        if (searchText != '') {
            try {
                const response = await api.get('/search/shows', {
                    params: { q: searchText }
                });
                setResult(response.data);
                if (apiResult != null) setTextResult('Resultado da Busca');
            } catch (error) {}
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storageResponse')
                if(value !== null){
                    setTextResult('Resultados Favoritados');
                    setResult(JSON.parse(value));
                }
        } catch(e) {}
    };

    const undefinedObject = (object) => {
        if (typeof object.show != "undefined") return object.show;
        if (typeof object != "undefined") return object;
    }

    const ScreenList = () => {
        if (apiResult != null) {
            return (
            <View style={styles.results}>
                <Text style={styles.textResult}>{textResult}</Text>
                <FlatList
                data={apiResult}
                renderItem={({ item }) => (<>
                    {
                    item ? 
                        <Card 
                            info={undefinedObject(item)} 
                            myNavigation={(apiResponse) => myNavigation(apiResponse, navigation)}/>
                    : null
                    }
                </>)}
                keyExtractor={item => undefinedObject(item).id}
                
                />
            </View>
            );
        } else {
            return <View style={styles.results}/>;
        }
    }

    const myNavigation = async (apiResponse, navigation) => {
        try{
            await AsyncStorage.setItem('@apiResponse', JSON.stringify(apiResponse));
        } catch (e) {}
        navigation.navigate('Detals');
    }

    return (
    <View style={styles.screen}>
        <View style={styles.searchBar}>
            <SearchBar 
            text={[searchText, setSearchText]}
            submitSearch={() => submitSearch()}/>
            <TouchableOpacity onPress={() => getData()}>
                <Image 
                style={styles.imageLike}
                source={require('../../imagens/like.png')}/>
            </TouchableOpacity>
            
        </View>
        <ScreenList/>
    </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },

    searchBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    imageLike: {
        marginStart: 10,
        width: 30,
        height: 30,
    },

    results: {
        flex: 4,
    },

    textResult: {
        fontSize: 21,
        paddingBottom: 15,
        paddingStart: 20,
    },
});

export default HomeScreen;
