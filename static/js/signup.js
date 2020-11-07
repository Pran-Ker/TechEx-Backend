const signupAjax = async (name, email,phone, password, reenteredPassword) => {
    const res = await axios({
        method: "POST",
        url: "/signup",
        data: {
        name,
        email,
        phone,
        password,
        reenteredPassword,
        },
    });

    if (res.data.status === "captcha-not-done") {
        showAlert("error", "Captcha not done!!");
        document.querySelector("#submitBtn").disabled = false;
        grecaptcha.reset();
    } else if (res.data.status === "Failed-captcha-verification") {
        showAlert("error", "Captcha verification failed!! Try again");
        document.querySelector("#submitBtn").disabled = false;
        grecaptcha.reset();
      if (res.data.status === "email_exist") {
        showAlert("error", "Email already exists!");
        document.querySelector("#submitBtn").disabled = false;
    } else if (res.data.status === "username_exist") {
        showAlert("error", "Username already taken!");
        document.querySelector("#submitBtn").disabled = false;
    } else if (res.data.status === 'success') {
        showAlert('success', 'Signup Successfull. Verification Mail Sent. Verify to continue');
    }
};
function showAlert(type,message){
    if(type==='sucess')
        document.getElementById("spitErrors").style.color="lightgreen";  
    else if(type==="error")
        document.getElementById("spitErrors").style.color="red"; 
    document.getElementById("spitErrors").innerHTML= message;
}
var onSubmit = (token) => {
    const name = document.getElementById("name").value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;
    const reenteredPassword = document.getElementById("rePassword").value;
    signupAjax(name, email, password,reenteredPassword,phone ,token);
}



const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(input.value).toLowerCase())) {
        showAlert("error", "Enter a valid email");
    } else return true;
};

const checkFieldMatch = (input1, input2) => {
    if (input1.value !== input2.value) {
        showAlert("error", "Passwords do not match");
    } else return true;
};


const getFieldName = (input) => input.id.charAt(0).toUpperCase() + input.id.slice(1);


const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showAlert("error", `${getFieldName(input)} must be atleast ${min} characters`);
    } else if (input.value.length > max) {
        showAlert("error", `${getFieldName(input)} cannot exceed ${max} characters`);
    } else return true;
};



document.querySelector("form").addEventListener('submit', (e) => {
    e.preventDefault();
    if(checkEmail(document.getElementById('email')) &&
        checkLength(document.getElementById('password'), 6, 50) &&
        checkFieldMatch(document.getElementById("c-password"), document.getElementById('password')) )  {
            document.querySelector("#submitBtn").disabled = true;
            grecaptcha.execute();
    }
});