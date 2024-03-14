const signupForm = document.getElementById("loginForm");

signupForm.onsubmit = async function (submitEvent) {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("password").value.trim();

  submitEvent.preventDefault();
  console.log(email, password);
  //   if (!email || !password) throw new Error("provide email and password!");
  try {
    const response = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const { message } = await response.json();
    console.log(message);
  } catch (err) {
    console.log(err);
  }
};
