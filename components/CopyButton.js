import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';

const copyToClipboard = async (copyText) => {
    await Clipboard.setStringAsync(copyText);
};

const CopyButton = ({data}) => {

    return (
        <TouchableOpacity onPress={() => copyToClipboard(data) && Haptics.selectionAsync()}>
            <Ionicons style={styles.icon} name="copy"></Ionicons>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    icon: {
        fontSize: Dimensions.get('window').width * .15,
        color: '#5271ff',
    }
});

export default CopyButton;