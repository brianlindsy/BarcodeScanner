import React, { useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Localization from 'expo-localization';
import { ListItem, Icon } from '@rneui/themed';
import vCardParser from '../utils/vCardParser';
import { isVCard, isValidUrl, isWifi, wifiDisplayName } from '../utils/utils';
import {
    AdMobBanner,
} from 'expo-ads-admob';
import * as Device from 'expo-device';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const testID = 'ca-app-pub-3940256099942544/6300978111';
const productionID = 'ca-app-pub-8812453476407098/1712514911';
// Is a real device and running in production.
const adUnitId = Device.isDevice && !__DEV__ ? productionID : testID;

const scanTimeAndDate = (date) => {
    return new Date(date).toDateString() + ' ' +
    new Date(date).toLocaleTimeString(Localization.locale);
};

const HistoryItemAvatar = (data) => {
    let avatar = 'text-snippet';
    if(isValidUrl(data?.data)){
        avatar = 'link';
    } else if(isVCard(data?.data)){
        avatar = 'contact-page';
    } else if (isWifi(data?.data)){
        avatar = 'wifi';
    }
    return <Icon name={ avatar}/>;
};

const vCardDisplayName = (data) => {
    if(isVCard(data)){
        const vCardJSON = vCardParser.parse(data);

        return vCardJSON[0].displayName;
    }
    
    return data;
};

const HistoryScreen = ({navigation}) => {
    const [data, setData] = useState(null);

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('com.chinotechnologies.barcodescanner');
          if(value !== null) {
            setData(JSON.parse(value));
          }
        } catch(e) {
          console.log('Unable to get data from async storage. ' + e);
        }
    }
  
    useFocusEffect(() => {
        const data = getData();
    });

    const renderItem = ({ item }) => (
        <ListItem bottomDivider onPress={() => navigation.navigate('DataDisplayScreen', {displayInfo: item.data})}>
          <HistoryItemAvatar data={item.data}/>
          <ListItem.Content>
            <ListItem.Title>{scanTimeAndDate(item.date)}</ListItem.Title>
            {isVCard(item.data) && <ListItem.Content><Text>{vCardDisplayName(item.data)}</Text></ListItem.Content>}
            {isWifi(item.data) && <ListItem.Content><Text>{wifiDisplayName(item.data)}</Text></ListItem.Content>}
            {(!isWifi(item.data) && !isVCard(item.data)) && <ListItem.Content><Text>{item.data}</Text></ListItem.Content>}
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
    );

    return (
        data ? <SafeAreaView style={styles.container}>
            <AdMobBanner
                width={width}
            adUnitID={adUnitId} />
            <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.id} />
        </SafeAreaView>
        : <Text>No scans in your history, go to the Scan tab below to get started!</Text>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 4,
    },
    item: {
      backgroundColor: '#D3D3D3',
      padding: 5,
      marginVertical: 4,
      marginHorizontal: 8,
      width: Dimensions.get('window').width * .65
    },
    title: {
      fontSize: 16,
    },
    text: {
        padding: 3,
        alignSelf: "flex-start",
    },
    listItem: {
        flexDirection: 'row',
    },
    icons: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    }
});

export default HistoryScreen;