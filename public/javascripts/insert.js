/**
 * Created by Ju-iz on 2016/2/24.
 */
//����ajax��������

$(function(){

    //Ĭ������
    $('#author').val('tangerine')

    //ͨ����ȡcookies���ж��Ƿ��¼
    var setPower = function(){

        if(getCookie('name')){

            var obj = {
                'name':getCookie('name'),
                'passwords':getCookie('passwords')
            };

            $.post('action/match',obj,function(data){

                if(!data){
                    window.location.href = 'http://127.0.0.1:3000/login';
                }
            })

        }else{
            window.location.href = 'http://127.0.0.1:3000/login';
        }

    }
    setPower();


    var addArticle = function(){

    $('#myform .btn-primary').click(function(){

        var obj = {

            "author":$('#author').val(),
            "content":$('#content').val(),
            "title":  $('#title').val(),
            'type': $('#catid').val()

        };

        var onff = true;

        for(var attr in obj){

            if(obj[attr] == ''){
                alert(attr + ' is necessary to fill,.');
                onff = false;
                return;
            }

        }

        if(onff){
            $.post('/insert/add',obj,function(data){

                alert(data);
                window.location.href = window.location.href;

            })
        }else{
            alert('please to complete this table..')
        }

    })

}

    addArticle();

    })