const SERVER_URL = "http://localhost:4000"

test("News Test", async () => {
    // Create Admin
    const adminUsername = "admin";
    const adminPassword = "chickennuggets";
    const registerUserRes = await fetch(`${SERVER_URL}/registerUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: adminUsername,
            password: adminPassword,
        })
    });

    const registerUserBody = await registerUserRes.json();

    expect(registerUserBody.error).toBe(undefined);
    expect(registerUserBody.response).toBe("User registered successfully.");

    // Login admin
    const loginRes = await fetch(`${SERVER_URL}/loginUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: adminUsername,
            password: adminPassword,
        })
    });

    const loginBody = await loginRes.json();
    expect(loginBody.response).toBe("User logged in succesfully.");

    const newsPost = {
        title: "Test Title",
        content: "Test Content",
        date: new Date().toISOString(),
    }
    const token = await loginBody.token;
    const postNewsRes = await fetch(`${SERVER_URL}/postNews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newsPost)
    });

    const postNewsBody = await postNewsRes.json();
    expect(postNewsBody.response).toBe("News post added successfully.");

    console.log(`${SERVER_URL}/editNews/${postNewsBody.newsID}`)

    //Edit News
    const editNewsRes = await fetch(`${SERVER_URL}/editNews/${postNewsBody.newsID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            title: "New Title",
            content: "New Content",
            date: new Date().toISOString(),
        })
    });

    const editNewsBody = await editNewsRes.json();

    expect(editNewsBody.error).toBe(undefined);
    expect(editNewsBody.response).toBe("News post updated successfully.");

    const getNewsRes = await fetch(`${SERVER_URL}/getNews`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });

    const getNewsBody = await getNewsRes.json();

    expect(getNewsBody.error).toBe(undefined);
    expect(getNewsBody.response.length).toBe(1);
    expect(getNewsBody.response[0].title).toBe("New Title");

    const delNewsRes = await fetch(`${SERVER_URL}/deleteNews/${getNewsBody.response[0].id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });

    const delNewsBody = await delNewsRes.json();

    expect(delNewsBody.error).toBe(undefined);
    expect(delNewsBody.response).toBe("News post deleted successfully.");

    // Delete Admin
    const delUserRes = await fetch(`${SERVER_URL}/deleteUser`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            username: adminUsername,
            password: adminPassword,
        })
    });

    const delUserBody = await delUserRes.json();

    expect(delUserBody.error).toBe(undefined);

});
