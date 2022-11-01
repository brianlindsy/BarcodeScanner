import React from 'react';
import { Text, View, StyleSheet, Dimensions} from 'react-native';
import CopyButton from '../components/CopyButton';
import ShareButton from '../components/ShareButton';
import { isVCard, isWifi } from '../utils/utils';
import vCardParser from '../utils/vCardParser';
import VCard from './VCard';
import Wifi from './Wifi';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const DataDisplayScreen = ({ route, navigation }) => {

    const { displayInfo } = route.params;

    const isVCardBool = isVCard(displayInfo);
    const isWifiBool = isWifi(displayInfo);

    return (
        <View style={styles.displayData}>
            {isVCardBool && <VCard vCard={vCardParser.parse(displayInfo)[0]} />}
            {isWifiBool && <Wifi wifi={displayInfo} />}
            {!isVCardBool && !isWifiBool && <Text>{displayInfo}</Text>}
            {!isVCardBool && !isWifiBool && <View style={styles.icons}>
                <ShareButton data={displayInfo}/>
                <CopyButton data={displayInfo}/>
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    displayData: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        width: width
    },
    icons: {
        flexDirection: 'row'
    }
});

export default DataDisplayScreen;