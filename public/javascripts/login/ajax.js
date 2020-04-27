$(document).ready(function(){
    $("#login-form").on('submit', function(e){
        e.preventDefault();
        var rex = /(\s)/;
        var username = $('#username').val();
        var password = $('#pass').val();
        if(username != "" && password != ""){
            if(username.match(rex) || password.match(rex)){
                Swal.fire({
                    title: 'Error!',
                    text: 'Please complete the form!',
                    icon: 'error'
                })
            }else{
                $.ajax({
                    type: 'post',
                    url: '/auth',
                    data: {username: username, password: password},
                    success: function (data, status, xhr) {
                        console.log("success");
                    },
                    error: function (jqXhr, textStatus, errorMessage) {
                        console.log(errorMessage);
                        Swal.fire({
                            title: 'Error!',
                            text: 'Login error!',
                            icon: 'error'
                        })
                    }
                });
            }
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Please complete the form!',
                icon: 'error'
            })
        }
    });
});