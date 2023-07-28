var sign = document.querySelector(".sign");
var pagesign = document.querySelector(".pagesign");
var newname = document.querySelector("#nnane");
var newemail = document.querySelector("#nemail");
var newpassword = document.querySelector("#npassword");
var btnsign = document.querySelector(".signup");
var myexit = document.querySelector("#myexist");
var required = document.querySelector("#required");
var lemail = document.querySelector("#email");
var lpassword = document.querySelector("#password");
var btnlogin = document.querySelector(".login");
var home = document.querySelector(".home");
var lrequired = document.querySelector("#lrequired");
var incorrect = document.querySelector("#incorrect");
var welcome = document.getElementById("welcome");
var mylogout = document.querySelector(".mylogout");
var index;
var accounts;

sign.addEventListener("click", function()
{
    pagesign.classList.remove("d-none");
});

if (localStorage.getItem("myaccounts") != null)
{
    accounts = JSON.parse(localStorage.getItem("myaccounts"));
}
else
{
    accounts = [];
}

function addemail()
{
    if (validationname() == true && validationemail() == true && validationpassword() == true && cheackemail() != true)
    {
        required.classList.add("d-none");
        myexit.classList.add("d-none");
        var account = {
            name : newname.value,
            email : newemail.value,
            password : newpassword.value
        };
        
        accounts.push(account);
        localStorage.setItem("myaccounts", JSON.stringify(accounts));
        clearvalue();
    }
    else if(newname.value == "" && newemail.value == "" && newpassword.value == "")
    {
        required.classList.remove("d-none");
    }
    else
    {
        required.classList.add("d-none");
        newemail.classList.add("is-invalid");
        myexit.classList.remove("d-none");
    }
    
}

function clearvalue()
{
    newname.value = "";
    newname.classList.remove("is-valid");
    newemail.value = "";
    newemail.classList.remove("is-valid");
    newpassword.value = "";
    newpassword.classList.remove("is-valid");
    lemail.value = "";
    lpassword.value = "";
}

function validationname() 
{
    var regx = /^[A-Z][a-zA-Z0-9]{3,}$/;

    if (regx.test(newname.value) == true)
    {
        newname.classList.remove("is-invalid");
        newname.classList.add("is-valid");
        return true;
    }
    else
    {
        newname.classList.remove("is-valid");
        newname.classList.add("is-invalid");
        return false;
    }
}

function validationemail() 
{
    var regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (regx.test(newemail.value) == true)
    {
        newemail.classList.remove("is-invalid");
        newemail.classList.add("is-valid");
        return true;
    }
    else
    {
        newemail.classList.remove("is-valid");
        newemail.classList.add("is-invalid");
        return false;
    }
}

function validationpassword() 
{
    var regx = /^\w{8,}$/;

    if (regx.test(newpassword.value) == true)
    {
        newpassword.classList.remove("is-invalid");
        newpassword.classList.add("is-valid");
        return true;
    }
    else
    {
        newpassword.classList.remove("is-valid");
        newpassword.classList.add("is-invalid");
        return false;
    }
}

function cheackemail()
{
    for (var i = 0; i < accounts.length; i++)
    {
        if (newemail.value == accounts[i].email)
        {
            return true;
        }
    }

}

function cheackuser()
{
    var user = {
        nemail : lemail.value,
        npassword : lpassword.value
    }

    for (var i = 0; i < accounts.length; i++)
    {
        if (user.nemail == accounts[i].email && user.npassword == accounts[i].password)
        {
            index = i;
            return true;
        }
    }
}

function loginaccount()
{
    if (cheackuser() == true)
    {
        lrequired.classList.add("d-none");
        incorrect.classList.add("d-none")
        home.classList.remove("d-none");
        welcome.innerHTML = `<div class="col-lg-6 mx-auto item my-5">
        <div class="text-center p-5">
            <h1>Welcome ${accounts[index].name}</h1>
        </div>
    </div>`
    clearvalue();
    }
    else if (lemail.value == "" && lpassword.value == "")
    {
        lrequired.classList.remove("d-none");
    }
    else
    {
        incorrect.classList.remove("d-none");
        clearvalue();
    }    
}

btnsign.addEventListener("click", addemail);
btnlogin.addEventListener("click", loginaccount);
mylogout.addEventListener("click", function(){
    home.classList.add("d-none");
})