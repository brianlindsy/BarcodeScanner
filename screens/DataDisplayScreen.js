import React from 'react';
import { Text, View, StyleSheet, Dimensions} from 'react-native';
import CopyButton from '../components/CopyButton';
import ShareButton from '../components/ShareButton';
import { isVCard } from '../utils/utils';
import vCardParser from '../utils/vCardParser';
import VCard from './VCard';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const DataDisplayScreen = ({ route, navigation }) => {

    const { displayInfo } = route.params;

    return (
        <View style={styles.displayData}>{console.log(displayInfo)}
            {!isVCard(displayInfo) && <Text>{displayInfo}</Text>}
            {isVCard(displayInfo) && <VCard vCard={vCardParser.parse(displayInfo)[0]} />}
            <View style={styles.icons}>
                <ShareButton data={displayInfo}/>
                <CopyButton data={displayInfo}/>
            </View>
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