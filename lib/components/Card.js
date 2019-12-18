import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

const Card = (props) => {
    return (
        <TouchableOpacity onPress={() => props.myNavigation(props.info)}> 
            <View style={styles.listResult}>
                <Image style={styles.imageResult}
                    source={{ uri: props.info.image == null ? 'https://i.ibb.co/YfZFr7k/noimg.png' : (props.info.image.original || props.info.image.medium) }}/>
                <View style={styles.insideResult}>
                    <Text 
                        style={styles.titleResult}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}>{props.info.name || 'Sem Nome'}</Text>
                    <Text>{props.info.genres.join(', ') || 'Sem Gênero'}</Text>
                </View> 
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    imageResult: {
        height: 100,
        width: 100,
        marginRight: 10,
    },
    titleResult: {
        fontSize: 23,
        paddingBottom: 5,
        width: "100%"
    },
    listResult: {
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: 30,
    },
    insideResult: {
        flexShrink: 1,
        flexWrap: "wrap",
        alignSelf: "baseline"
    }
});

export default Card;
  
