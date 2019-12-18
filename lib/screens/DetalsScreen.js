import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const DetalsScreen = ({navigation}) => {
    const [apiResult, setApiResult] = useState(null);
    var resultList = [];

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@apiResponse')
                if(value !== null) {
                    setApiResult(JSON.parse(value));
                    resultList.push(JSON.parse(value));
                }
        } catch(e) {}
    };
    getData();

    const getDataStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('@storageResponse');
            if (value !== null ){
                resultList = resultList.concat(JSON.parse(value));
                resultList = resultList.filter((x, i) => resultList.map(j => j.id).indexOf(x.id) === i);
            }
        } catch(e) {}
    };

    const like = async () => {
        try {
            await getDataStorage();
            await AsyncStorage.setItem('@storageResponse', JSON.stringify(resultList));
        } catch(e){};
    };

    return(
        <View style={styles.screen}>
            <Image style={styles.imageResult}
                    source={{ uri: !apiResult || !apiResult.image ? 'https://i.ibb.co/YfZFr7k/noimg.png' : (apiResult.image.original || apiResult.image.medium) }}/>
            
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.titleResult}>{!apiResult || !apiResult.name ? 'Sem Nome' : apiResult.name}</Text>
                        <Text style={styles.genderResult}>{ !apiResult || !apiResult.genres ? 'Sem Gênero': apiResult.genres.join(', ')}</Text>
                    </View>
                    <View style={styles.likeView}>
                        <TouchableOpacity onPress={() => like()}>
                            <Image 
                                style={styles.imageLike}
                                source={require('../../imagens/like.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text>{ !apiResult || !apiResult.summary ? 'Sem Sumário': apiResult.summary.replace(/<(.|\n)*?>/g, '')}</Text>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 15,
    },

    imageResult: {
        height: 150,
        width: 330,
        marginTop: 20,
        resizeMode: 'stretch',
    },

    container: {
        paddingHorizontal: 15,
    },

    header: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingBottom: 15,
    },

    imageLike: {
        width: 40,
        height: 40,
        alignItems: 'flex-end',
    },

    likeView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    titleResult: {
        fontSize: 23,
        paddingBottom: 5,
    },
    
    genderResult: {
        fontSize: 16,
    }
});

export default DetalsScreen;