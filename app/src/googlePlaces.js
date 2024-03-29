export const getHours = async (placeId) => {
    const result = await getFromAPI('current_opening_hours', placeId);
    return [result.current_opening_hours.weekday_text.map((day) => day.split(': ')[1]), result.current_opening_hours.open_now];
}

export const getStatus = async (placeId) => {
    let status = (await getFromAPI('business_status', placeId)).business_status;
    return status;
}

export const getAddress = async (placeId) => {
    let address = (await getFromAPI('formatted_address', placeId)).formatted_address.split(',');
    address = address[0] + ',' + address[1];
    return address;
}

export const getCoordinates = async (placeId) => {
    const result = await getFromAPI('geometry', placeId);
    return result.geometry.location;
}

export const getWebsite = async (placeId) => {
    const result = await getFromAPI('website', placeId);
    return result.website;
}

export const getPhone = async (placeId) => {
    const result = await getFromAPI('formatted_phone_number', placeId);
    return result.formatted_phone_number;
}

const getFromAPI = async (field, placeId) => {
    const placeReq = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${field}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_PLATFORM_API_KEY}`);
    const placeReqBody = await placeReq.json();
    if (placeReqBody.error_message) {
        console.log(placeReqBody.error_message);
    }
    return placeReqBody.result;
}