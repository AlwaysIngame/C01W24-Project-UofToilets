interface Washroom {
    id: string,                 //The unique id of the washroom, set automatically
    name: string,               //The name of the loaction, set by the business owner
    approved: boolean,          //The approval status of the washroom. If false, will not show in app
    owner_username: string,     //The owner's username
    longitude: number,          //Longitutde
    latitude: number,           //Latitude
    places_id: string,          //The id of the location in the places api

    // Not stored in database
    address: string,            //The address of the business, can be derived from places_id
}