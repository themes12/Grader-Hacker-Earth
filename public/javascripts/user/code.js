$(document).ready(function(){
    $("#code-button").on('click', function(){
        var code = editor.getValue();
        if(code != ""){
            $.ajax({
                type: 'POST',
                url: '/home/run',
                data: {code: code},
            }).done(function(data) {
                var objResponse = JSON.parse(data);
                if(objResponse.statusCode == "CE"){
                    alertify.alert('Error', objResponse.outputTextDetails);
                }else{
                    Swal.fire({
                        title: objResponse.headerText,
                        text:  objResponse.outputText,
                        icon: objResponse.notifyType
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) { 
                Swal.fire({
                    title: 'Error!',
                    text: 'Error connecting API!',
                    icon: 'error'
                })
            });
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Please complete the code!',
                icon: 'error'
            })
        }
    });
});