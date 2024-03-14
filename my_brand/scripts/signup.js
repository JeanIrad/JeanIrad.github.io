const signupForm = document.getElementById("signupForm");
signupForm.onsubmit = async function (submitEvent) {
  submitEvent.preventDefault();
  const email = document.getElementById("signup_email").value.trim();
  const password = document.getElementById("password").value.trim();
  //   const confirmPassword = document
  //     .getElementById("passwordConfirm")
  //     .value.trim();
  const fullName = document.getElementById("fullName").value.trim();
  const [firstName, lastName] = fullName.split(" ");
  //   console.log(email, password);
  //   if (password !== confirmPassword) {
  //     alert("password must match");
  //     return;
  //   }
  try {
    const response = await fetch("http://localhost:3000/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    console.log(response.ok);
  } catch (err) {
    console.log(err);
  }
};
