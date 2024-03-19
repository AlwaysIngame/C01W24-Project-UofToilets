const SERVER_URL = "http://localhost:4000"

test("/registerUser - Register a user", async () => {
    const username = "testuser1"
    const password = "12345678"

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

    expect(regUserBody.response).toBe("User registered successfully.")

    const token = regUserBody.token;

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

test("/registerUser - Attempt to register a user that already exists", async () => {
    const username = "testuser1"
    const password = "12345678"

    const regUser1Res = await fetch(`${SERVER_URL}/registerUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })

    const regUser2Res = await fetch(`${SERVER_URL}/registerUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })

    const regUser1Body = await regUser1Res.json();
    const regUser2Body = await regUser2Res.json();

    expect(regUser2Res.status).toBe(400);
    expect(regUser2Body.error).toBe("Username already exists.");

    const token = regUser1Body.token;

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

test("/loginUser - Login with valid credentials", async () => {
    const username = "testuser1"
    const password = "12345678"

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

    expect(regUserBody.response).toBe("User registered successfully.")

    const token = regUserBody.token;

    const loginRes = await fetch(`${SERVER_URL}/loginUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })

    const loginBody = await loginRes.json();

    expect(loginBody.response).toBe("User logged in succesfully.")
    expect(loginBody.token).toBe(token);

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