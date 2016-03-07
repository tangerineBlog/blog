/**
 * Created by Ju-iz on 2016/2/24.
 */

$(function(){

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

    var getTime = function(){

        var d = new Date();
        var year = d.getFullYear(),
            mouth = d.getMonth() + 1,
            data = d.getDate();

        var str = '';
        str = year + '-' + mouth + '-' + data;
        return str;

    }

//È«Ñ¡ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Êµï¿½ï¿½
    var select = function(){

        console.log($('input[name="checkAll"]').length);

        $('input[name="checkAll"]').on('change', function() {

            $('input[name="checkThis"]').prop('checked', $('input[name="checkAll"]').prop('checked'));
        });

        $('input[name="checkThis"]').on('change', function() {

            $('input[name="checkAll"]').prop('checked', $('input[name="checkThis"]').size() == $('input[name="checkThis"]:checked').size());
        })

    }

//ï¿½ï¿½ï¿½ï¿½ajaÊµï¿½ï¿½É¾ï¿½ï¿½ï¿½Ä²ï¿½ï¿½ï¿½
    var articleDel = function(){

        $('.result-tab tbody').find('.link-del').click(function(){

            var id = $(this).attr('id');
            var _this = $(this);

            if(confirm('are you sure to delete the data of ' + id)){

            $.post('/manage/delete',{'id':id},function(data){

                console.log(data);
                if(data){

                   _this.parent().parent().remove();

                }else{

                    alert('filed to delete..')

                }

            })

            }

        })
    }


    //µ¯³ö²ã´°¿ÚµÄÎ»ÖÃ¿ØÖÆ
$(window).on('scroll',function(){

    $('.mark .result-content').animate({
        'top': $(document).height() - $('.mark .result-content').height()
    },50)

})

//ï¿½ï¿½ï¿½ï¿½ajaxÊµï¿½ï¿½ï¿½ï¿½ï¿½ï¿½É¾ï¿½ï¿½
   var allDel = function(){

       $('#batchDel').click(function(){

           var $boxcheck = $('input[name="checkThis"]');
           var arr = [];
           $.each($boxcheck,function(i,item){

               if($(item).prop('checked')){

                   arr.push($(item).attr('value'));

               }

           })

           if(confirm('are you sure to delete the datas')){

           $.each(arr,function(i,item){

               $.post('/manage/delete',{'id':item},function(data){

                   console.log(data);
                   if(data){

                       $.each($boxcheck,function(i,item){

                           if($(item).prop('checked')){

                               $(item).parent().parent().remove();

                           }

                       })

                   }else{

                       alert('filed to delete..')

                   }

               })

           })
           }

       })

   }

//ï¿½ï¿½ï¿½ï¿½ajaxÊµï¿½ï¿½ï¿½Þ¸ÄµÄ¹ï¿½ï¿½ï¿½
   var reviseArticle = function(){

       $('.mark .close').click(function(){

           $('.mark').css({'display':'none'});

       })
       $('.result-tab tbody').find('.link-update').click(function(){

           var id = $(this).attr('id');
           $.post('/single/articles',{_id:id},function(data){

               if(data){

                   $('.mark').css({'display':'block',
                       'height':$(document).height(),
                       'width':$(document).width()
                   });

                   $('.mark .result-content').css({
                       'top': ($(document).height() - $('.mark .result-content').height())/2 + $(window).scrollTop()
                   })

                   $('.mark #title').val(data.title);
                   $('.mark #author').val(data.author);
                   $('.mark #content').val(data.content);

                   $('.mark .btn-primary').click(function(){

                       if($('.mark #catid').val() && $('.mark #title').val() && $('.mark #author').val() && $('.mark #content').val()){
                           $('.mark').css('display','none');
                           var obj = {};

                           obj.title = $('.mark #title').val();
                           obj.author = $('.mark #author').val();
                           obj.content = $('.mark #content').val();
                           obj.type = $('.mark #catid').val();
                           obj._id = data._id;
                           obj.data = getTime();

                           $.post('/manage/update',obj,function(data){

                               alert(data);

                           })

                       }else{

                           alert('please to complete..')

                       }
                   })
               }

           })

       })

   }

//ï¿½ï¿½ï¿½ï¿½ajax ï¿½ï¿½È¡ï¿½ï¿½ï¿½ï¿½ï¿½Ð±ï¿½
   var getArticle = function(){

       $.post('/articles?t=' + new Date().getTime(),function(data){

           if(data.length){

               var html = $('.result-tab tbody').html();
               $.each(data,function(i,item){

                    html += '<tr datatype="'+ item.type  +'"><td class="tc"><input  name="checkThis" value='+ item._id +' type="checkbox"></td><td class="id">'+ item._id +'</td><td class="title">'+ item.title +'</td><td class="author">' + item.author + '</td><td class="data">'+ item.data +'</td><td style="text-align: center"><a id=' + item._id + ' class="link-update">&#x7f16;&#x7f09;&#x2714;</a>/<a id='  + item._id + ' class="link-del">&#x5220;&#x9664;&#x2716;</a></td></tr>';

               })

               $('.result-tab tbody').html(html);

               select();
               articleDel();
               allDel();
               reviseArticle();

           }

       })

   }

    getArticle();

    //ï¿½ï¿½ï¿½Õ·ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ÂµÄ·ï¿½ï¿½à´¦ï¿½ï¿?
   $('#search-sort').on('change',function(){

       var $type = $(this).val();
       if($type){

           $.post('/manage/classify',{type:$type},function(data){

               if(data){
                   var html = '';
                   $.each(data,function(i,item){

                       html += '<tr datatype="'+ item.type  +'"><td class="tc"><input  name="checkThis" value='+ item._id +' type="checkbox"></td><td class="id">'+ item._id +'</td><td class="title">'+ item.title +'</td><td class="author">' + item.author + '</td><td class="data">'+ item.data +'</td><td><a id=' + item._id + ' class="link-update">revise</a>/<a id='  + item._id + ' class="link-del">delete</a></td></tr>';

                   })

                   $('.result-tab tbody').html(html);
               }else{
                   alert('nothing');
               }

           })

       }else{
           getArticle();
       }

   })

})