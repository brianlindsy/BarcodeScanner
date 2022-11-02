import React, { useState } from 'react';
import { Text, ScrollView, View, Button, Dimensions, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import {
    AdMobBanner,
} from 'expo-ads-admob';
import * as Device from 'expo-device';
import CopyButton from '../components/CopyButton';
import ShareButton from '../components/ShareButton';
import { isVCard, isWifi } from '../utils/utils';
import VCard from './VCard';
import Wifi from './Wifi';
import vCardParser from '../utils/vCardParser';
  
const testID = 'ca-app-pub-3940256099942544/6300978111';
const productionID = 'ca-app-pub-8812453476407098/1619381695';
// Is a real device and running in production.
const adUnitId = Device.isDevice && !__DEV__ ? productionID : testID;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ScanScreen = () => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [displayInfo, setDisplayInfo] = useState(null);

    const isFocused = useIsFocused();
  
    useFocusEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      };
  
      getBarCodeScannerPermissions();
    });

    const storeData = async (value, type) => {
        let scannedListItem = {
            id: uuid.v4(),
            data: value,
            date: Date.now(),
            scanType: type,
        }
        try {
            let oldData = await AsyncStorage.getItem('com.chinotechnologies.barcodescanner');

            if(oldData) await AsyncStorage.removeItem('com.chinotechnologies.barcodescanner');

            if(oldData !== null){
                const parsedList = JSON.parse(oldData);
                parsedList.unshift(scannedListItem);
                await AsyncStorage.setItem('com.chinotechnologies.barcodescanner', JSON.stringify(parsedList));
            } else {
                let newData = new Array();
                newData.unshift(scannedListItem);
                await AsyncStorage.setItem('com.chinotechnologies.barcodescanner', JSON.stringify(newData));
            }
        } catch (e) {
            console.log('Could not save data: ' + value + ' ' + e);
            alert(`Could not save scan data.`);
        }
    }
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      setDisplayInfo(data);
      storeData(data, type);
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
        <ScrollView style={styles.wrapper}>
            <AdMobBanner
                width={width}
            adUnitID={adUnitId} />
            { isFocused && <Camera
                style={{height: height * .4}}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            /> }
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            <View style={styles.displayData}>
                {scanned && (!isWifi(displayInfo) && !isVCard(displayInfo)) && <View style={styles.displayData}>
                    <Text>{displayInfo}</Text>
                    <View style={styles.icons}>
                        <ShareButton data={displayInfo}/>
                        <CopyButton data={displayInfo}/>
                    </View>
                </View>}
                {scanned && isWifi(displayInfo) && <Wifi wifi={displayInfo} />}
                {scanned && isVCard(displayInfo) && <VCard vCard={vCardParser.parse(displayInfo)[0]} />}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    displayData: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icons: {
        flexDirection: 'row'
    },
    wrapper: {
        flexDirection: 'column'
    }
});

export default ScanScreen;