/**
 * Created by Ju-iz on 2016/2/23.
 */
$(function(){

    //获取时间的函数
    var getTime = function(){

        var d = new Date();
        var year = d.getFullYear(),
            mouth = d.getMonth() + 1,
            data = d.getDate();

        var str = '';
        str = year + '-' + mouth + '-' + data;
        return str;

    }

    //利用ajax留言博主
    var leaveMessage = function(){

        $('.contact .post').click(function(){


                var $texts = $('.contact form input[type="text"]');

                var obj = {

                    name:$texts.eq(0).val(),
                    email:$texts.eq(1).val(),
                    phone:$texts.eq(2).val(),
                    content:$('.contact-right textarea').val(),
                    data:getTime(),
                    type:'message'

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
            $.post('/contact/post',obj,function(data){

                alert(data);

            })
            }else{
                alert('please to complete this table..')
            }

        })

    }

    leaveMessage();

})