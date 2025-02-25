const apiUrl = "http://localhost:5000/api/users";  // Make sure your backend URL matches
let token = localStorage.getItem("token");

if (token) {
    checkUserStatus();
}

async function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    const response = await fetch(apiUrl + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
        token = data.token;
        localStorage.setItem("token", token);
        checkUserStatus();
    } else {
        errorMessage.textContent = data.message || "Login failed";
    }
}

async function registerUser() {
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const errorMessage = document.getElementById("error-message");

    const response = await fetch(apiUrl + "/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.status === 201) {
        errorMessage.textContent = "Registration successful. You can now log in!";
    } else {
        errorMessage.textContent = data.message || "Registration failed";
    }
}

async function checkUserStatus() {
    const response = await fetch(apiUrl + "/me", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    const data = await response.json();

    // Hide login and register forms
    document.getElementById("auth-forms").style.display = "none";
    // Show either the admin or user panel based on the role
    if (data.role === "admin") {
        document.getElementById("admin-panel").style.display = "block";
        console.log("admin")
    } else if (data.role === "user") {
        document.getElementById("user-panel").style.display = "block";
        console.log("user")
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location.reload(); // Refresh the page to show login/register forms again
}

// User actions (e.g., create post, view posts, liked posts)
function createPost() {
    document.getElementById("create-post-form").style.display = "block";
}

function cancelPostCreation() {
    document.getElementById("create-post-form").style.display = "none";
}

async function submitPost() {
    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;

    const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
    });

    const data = await response.json();
    alert(data.message);
    document.getElementById("create-post-form").style.display = "none";
}

async function viewUserPosts() {
    const response = await fetch("http://localhost:5000/api/posts/user-posts", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    const data = await response.json();
    alert("Your Posts: " + JSON.stringify(data));
}

async function viewLikedPosts() {
    const response = await fetch("http://localhost:5000/api/posts/liked-posts", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    const data = await response.json();
    alert("Liked Posts: " + JSON.stringify(data));
}

