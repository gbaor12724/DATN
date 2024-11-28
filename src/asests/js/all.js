
 /** ĐĂNG NHẬP */
var objuser = [
    {
        username:"admin",
        password:"admin"
    },

]
function checklogin()
{
    var login = document.getElementById("login");
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    for( i = 0 ; i <objuser.length ; i++ )
    {
        if(user == objuser[i].username && pass == objuser[i].password)
        {
            alert("Chào mừng "+ user + " đã đăng nhập vào 3TWatch");
            localStorage.clear();
            localStorage.setItem("login",user);
            window.location.href = "admin/admin.html";    
            return;
        }    
    }
    alert("Sai mật khẩu hoặc tài khoản !!!");
}

