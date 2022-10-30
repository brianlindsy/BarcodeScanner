import React from 'react';
import { Text, View} from 'react-native';

const VCard = (vCard) => {

    const vCardData = vCard.vCard;

    const parseAddress = (address) => {
        console.log(address.street)
        let addressString = address.number + " " + address.street + "\n";
        addressString += address.city + ", " + address.region + " " + address.postalCode + "\n";
        addressString += address.country;

        return addressString;
    }

    const parseTelephone = (telephone) => {
        let telephoneString = "";
        telephone.forEach((telephoneInfo) => {
            telephoneString += (telephoneInfo.valueInfo[0] !== "" && telephoneInfo.valueInfo[0] !== undefined) ? telephoneInfo.valueInfo[0] + ":" : "";
            telephoneString += (telephoneInfo.value !== "" && telephoneInfo.value !== undefined) ? telephoneInfo.value + ";" : "";
        });

        return telephoneString;
    }

    return (
        <View>{console.log(vCard)}
            { vCardData.displayName !== null ? <Text>Name: {vCardData.displayName}</Text> : null}
            { vCardData.organization !== '' ? <Text>Organization: {vCardData.organization}</Text> : null}
            { vCardData.telephone !== null ? <Text>Telephone: {parseTelephone(vCardData.telephone)}</Text> : null}
            { vCardData.email[0].value !== '' ? <Text>Email: {vCardData.email[0].value}</Text> : null}
            { vCardData.address[0] !== null ? <Text>Address: {parseAddress(vCardData.address[0].value)}</Text> : null}
        </View>
    );
};

export default VCard;