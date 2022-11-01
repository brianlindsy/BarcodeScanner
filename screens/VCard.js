import React from 'react';
import { Text, View, StyleSheet, Dimensions} from 'react-native';
import ShareButton from '../components/ShareButton';
import CopyButton from '../components/CopyButton';

const VCard = (vCard) => {

    const vCardData = vCard.vCard;

    const parseAddress = (address) => {
        let addressString = address.number + " " + address.street + "\n";
        addressString += address.city + ", " + address.region + " " + address.postalCode + "\n";
        addressString += address.country;

        return addressString;
    }

    const parseTelephone = (telephone) => {
        const foundTeleObj = telephone.find((telephoneInfo) => 
            telephoneInfo.value !== ""
        );

        return foundTeleObj?.value;
    }

    const googleAddressString = (address) => {
        return "https://www.google.com/search?q=" + address.trim().replace(/\n/g," ").replace(/,/g,"").replace(/ /g,"+");
    }

    return (
        <View>
            { vCardData.displayName !== null ? <Text>Name: {vCardData.displayName}</Text> : null}
            { vCardData.organization !== '' ? <Text>Organization: {vCardData.organization}</Text> : null}
            { vCardData.telephone !== null ? <Text>Telephone: {parseTelephone(vCardData.telephone)}</Text> : null}
            { vCardData.email[0].value !== '' ? <Text>Email: {vCardData.email[0].value}</Text> : null}
            { vCardData.address[0] !== null ? <Text>Address: {parseAddress(vCardData.address[0].value)}</Text> : null}
            <View style={styles.icons}>
                <ShareButton shareText={'Google Address'} data={googleAddressString(parseAddress(vCardData.address[0].value))}/>
                <CopyButton copyText={'Copy Name'} data={vCardData.displayName}/>
                <CopyButton copyText={'Copy Email'} data={vCardData.email[0].value}/>
                <CopyButton copyText={'Copy Telephone'} data={parseTelephone(vCardData.telephone)}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    icons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: Dimensions.get('window').width,
        padding: 5
    }
});

export default VCard;