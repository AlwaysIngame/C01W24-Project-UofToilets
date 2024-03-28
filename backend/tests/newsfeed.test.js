const SERVER_URL = "http://localhost:4000"

test("/getUserWashrooms - All washrooms from a business owner", async () => {

    const username = "testuser1";
    const password = "12345678";

    const regUserRes = await fetch(`${SERVER_URL}/registerUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })

    const regUserBody = await regUserRes.json();
    expect(regUserBody.error).toBe(undefined);
    expect(regUserBody.response).toBe("User registered successfully.")
    const token = regUserBody.token;

    const washroom = {
        name: "Washroom1",
        longitude: 45.1,
        latitude: 45.1,
        places_id: "1"
    }

    const addWashroomRes = await fetch(`${SERVER_URL}/addWashroom`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(washroom)
    })

    const addWashroomBody = await addWashroomRes.json();

    expect(addWashroomBody.error).toBe(undefined);
    expect(addWashroomBody.response).toBe("Washroom added successfully.");
    
    const getWashroomRes = await fetch(`${SERVER_URL}/getUserWashrooms`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    const getWashroomBody = await getWashroomRes.json();

    expect(getWashroomBody.error).toBe(undefined);
    expect(getWashroomBody.response.length).toBe(1);
    expect(getWashroomBody.response[0].name).toBe("Washroom1");

    const washroomID = addWashroomBody.washroomID;
    console.log(`${SERVER_URL}/deleteWashroom/${washroomID}`);
    
    const deleteWashroomRes = await fetch(`${SERVER_URL}/deleteWashroom/${washroomID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })

    const deleteWashroomBody = await deleteWashroomRes.json();

    expect(deleteWashroomBody.error).toBe(undefined);
    expect(deleteWashroomBody.response).toBe("Washroom with id " + washroomID + " deleted.");

    const delUserRes = await fetch(`${SERVER_URL}/deleteUser`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })

    const delUserBody = await delUserRes.json();

    expect(delUserBody.response).toBe("User " + username + " deleted.");
})