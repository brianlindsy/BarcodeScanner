import React from 'react';
import { Text, View, StyleSheet, Dimensions} from 'react-native';
import ShareButton from '../components/ShareButton';
import CopyButton from '../components/CopyButton';
import { wifiDisplayName, wifiPassword } from '../utils/utils';

const Wifi = (wifi) => {

    const wifiName = wifiDisplayName(wifi?.wifi);
    const wifiPass = wifiPassword(wifi?.wifi);

    return (
        <View>
            { <Text>SSID: {wifiName}</Text>}
            { <Text>Password: {wifiPass}</Text>}
            <View style={styles.icons}>
                <CopyButton copyText={'Copy SSID'} data={wifiName}/>
                <CopyButton copyText={'Copy Password'} data={wifiPass}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        fontSize: Dimensions.get('window').width * .20,
        color: '#5271ff',
    }
});

export default Wifi;