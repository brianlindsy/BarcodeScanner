import React from 'react';
import { TouchableOpacity, StyleSheet, Linking, Dimensions} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';


const isValidUrl = urlString => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

const followLinkOut = (link) => {
    Linking.openURL(link);
};

const ShareButton = ({data}) => {

    return (
        isValidUrl(data) && 
        <TouchableOpacity onPress={() => Haptics.selectionAsync() && followLinkOut(data)}>
            <Ionicons style={styles.icon} name="share-sharp"/>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    icon: {
        fontSize: Dimensions.get('window').width * .15,
        color: '#5271ff',
    }
});

export default ShareButton;