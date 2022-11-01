export const isValidUrl = urlString => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
};

export const isVCard = data => {
    if(typeof data === 'string' && data?.includes("BEGIN:VCARD")){
        return true;
    }
    
    return false;
};

export const isWifi = data => {
    if(typeof data === 'string' && data?.startsWith("WIFI:")){
        return true;
    }

    return false;
};

export const wifiDisplayName = data => {
    if(isWifi(data)){
        const wifiName = data.match(/S:(.*);P/);

        return wifiName[1];
    }
    
    return data;
};

export const wifiPassword = data => {
    if(isWifi(data)){
        const wifiPassword = data.match(/P:(.*);H/);

        return wifiPassword[1];
    }
    
    return data;
};