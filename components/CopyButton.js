import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, Text, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';

const copyToClipboard = async (copyText) => {
    await Clipboard.setStringAsync(copyText);
};

const CopyButton = ({data, copyText}) => {

    return (
        <View style={styles.iconGroup}>
            <TouchableOpacity onPress={() => copyToClipboard(data) && Haptics.selectionAsync()}>
                <Ionicons style={styles.icon} name="copy"></Ionicons>
                <Text>{copyText}</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    icon: {
        fontSize: Dimensions.get('window').width * .15,
        color: '#5271ff',
    },
    iconGroup: {
        margin: 5
    }
});

export default CopyButton;