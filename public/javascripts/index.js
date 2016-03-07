/**
 * Created by Ju-iz on 2016/2/16.
 */
$(function () {

    var HideShow = function () {
        var scrollTop = $(window).scrollTop();
        var $Otop = $('#toTop');

        scrollTop > 200 ? $Otop.css({'display': 'block'}) : $Otop.css({'display': 'none'});
    };

    var toTop = function(){
        var $Otop = $('#toTop');
        $Otop.click(function(){
            $('body,html').animate({'scrollTop':0},1000,'easeIn');
        })
    };

    toTop();
    $(window).scroll(function () {
        HideShow();
    });

    var tabChange = function(){

        var $Ali = $('.banner-links').find('li');
        $Ali.click(function(){
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            $(this).find('a').css('color','white')
        })

        $('.banner-links ul li a').mouseenter(function(){
            var classStr = $(this).parent().get(0).className;
            if(!classStr){
                $(this).css('color','black');
            }
        }).mouseleave(function(){
            $(this).css('color','white');
        })

    };
    tabChange();

    //利用ajax进行搜索的实现
    $('.search input[type="submit"]').on('click',function(){

        var $value = $('.search input[type="text"]').val();

        if($value){
            $.post('/search',{key:$value},function(data){

                if(data.length){

                for(var i = 0;i<data.length;i++) {

                    for (var attr in data[i]) {

                        !!((attr == 'title') || (attr == 'content')) && (data[i][attr] = data[i][attr].replace(new RegExp($value,'g'),'<strong style="color: red;font-weight: 700">' + $value + '</strong>'));

                    }

                }

                var html = '';
                $.each(data,function(i,item){
                    if(i<5){
                        item.content = item.content.substr(0,190) + '....';
                        html +=' <div class="content-grid-sec"><div class="content-sec-info"><h3><a href="http://127.0.0.1:3000/single?id:' + item._id + '" target="_blank">'+ item.title + '</a></h3> <h4>'+ item.data +' Posted by : <a href="#">' + item.author + '</a></h4> <p>' + item.content + '</p> <a class="bttn" href="http://127.0.0.1:3000/single?id:' + item._id + '" target="_blank">&#x27a9;&ensp;&#x5168;&#x6587;</a> </div> </div>';
                    }
                });

                var numberP = Math.ceil(data.length/5);

                var htmlP = '<div class="pages"><ul><li class="active"><a>1</a></li>';

                for(var i=0;i<numberP -1;i++){

                    htmlP += '<li><a>'+ (i+2) +'</a></li>';

                }

                htmlP += '<li class="prev"><a>prev</a></li> <li><a name="next">next</a></li></ul></div></div>';
                html += htmlP;

                $('.content-main').html(html);
                }else{

                    alert('search to nothing...')

                }
            })
        }else{
            $('.search input[type="text"]').val('fill ..');
            $('.search input[type="text"]').css({
                'color':'red',
                'fontWeight':'700'
            });
        }

    })

    $('.search input[type="text"]').on('focus',function(){

        $('.search input[type="text"]').css('color','black');

        !!($('.search input[type="text"]').val() == 'fill ..') && $('.search input[type="text"]').val('');

        })
    //利用ajax获取推荐的文章
    var getSuggest = function(){

        $.post('/articles/suggest',function(data){

            if(data){

                var html = '<h3>&#x63a8;&#x8350;</h3><li class="active"><a href="http://127.0.0.1:3000/single?id:' + data[0]._id + '" target="_blank">' + data[0].title  + '</a></li>';

            }

            $.each(data,function(i,item){

                if(i>0){

                    html +='<li><a href="http://127.0.0.1:3000/single?id:' + item._id + '" target="_blank">'+ item.title  +'</a></li>';

                }

            })

            $('.categories').html(html);

        })

    }
    getSuggest();

    //利用ajax获取首页的文章
    $(function(){

        $.post('/articles?t=' + new Date().getTime(),function(data){

            if(data){

                pageTo(data);
                newArticle(data);

                var html = '';
                $.each(data,function(i,item){
                    if(i<5){
                        item.content = item.content.substr(0,190) + '....';
                    html +=' <div class="content-grid-sec"><div class="content-sec-info"><h3><a href="http://127.0.0.1:3000/single?id:' + item._id + '" target="_blank">'+ item.title + '</a></h3> <h4>'+ item.data +' Posted by : <a href="#">' + item.author + '</a></h4> <p>' + item.content + '</p> <a class="bttn" href="http://127.0.0.1:3000/single?id:' + item._id + '" target="_blank">&#x27a9;&ensp;&#x5168;&#x6587;</a> </div> </div>';
                    }
                })

                var numberP = Math.ceil(data.length/5);

                var htmlP = '<div class="pages"><ul><li class="active"><a>1</a></li>';

                for(var i=0;i<numberP -1;i++){

                    htmlP += '<li><a>'+ (i+2) +'</a></li>';

                }

                htmlP += '<li class="prev"><a>prev</a></li> <li><a name="next">next</a></li></ul></div></div>';
                html += htmlP;

                $('.content-main').html(html);

            }

        })

    })

    //最近更新的出现
    function newArticle(data){

        var toTwo = function(number){

            return number > 9? number : '0' + number;

        };
        var firstData = data[0].data;
        var dataArr = firstData.split('-');
        firstData = dataArr[0] + '-' + toTwo(dataArr[1]);

        var Data = function(year,mouth){

            if(mouth == 0){
                mouth =12;
                year = year -1;
            }
            mouth = mouth -1;
            if(mouth < 1){
                mouth = 12;
                year = year -1;
            }
            return year + '-' + toTwo(mouth);

        };

        var html = $('.archives').html() +  '<li class="active sing"><a href="javascript:;">' + firstData + '</a></li>';
        for(var i= 0;i<3;i++){
                var dataString = Data(dataArr[0],dataArr[1] -i );
                html += '<li class="sing"><a href="javascript:;">' + dataString + '</a></li>';
        }

        $('.archives').html(html);
        lastShow(data);

    }

    //最近更新的hover事件
    function lastShow(data){

        $('.archives .sing a').on('click',function(){

            var top = $(this).position().top;
            var value = $(this).text();
            value = value.replace(/-0(\d{1})/g,'-' + value.substr(6,1))
            var re = new RegExp('' + value + '','g');
            var html = '';

            $('.archives .last_article_list').html(html);
            $.each(data,function(i,item){

                while(re.test(item.data)){
                    html += '<li><a href="http://127.0.0.1:3000/single?id:' + item._id + '">' + item.title + '</a></li>';
                }

            })
            if(!html) html = 'There is nothing..';
            $('.archives .last_article_list').html(html);

            $('.last_article').animate({
                'opacity':'1',
                'top':top
            },200)
        })
        $('.archives .last_article_list').mouseleave(function(){

            $('.last_article').animate({
                'opacity':'0'
            },20)

        })
        $('.archives').mouseleave(function(){

            $('.last_article').animate({
                'opacity':'0'
            },20)

        })

    }


    //利用ajax完成翻页的功能
   function pageTo(number,data){

       var Data = null,
           pageNow = 0;
       var argLength = arguments.length;
       if(argLength == 2){

           Data = arguments[1];

       }else{

           Data = arguments[0];

       }

       $('.content-main').on('click','.pages ul li',function(){

           if(!isNaN(parseInt($(this).text()))){

               pageNow =  $(this).index();

               var num = 0;
               (arguments.length == 2) ? num = arguments[0] : num = $(this).index();
               var html = '';
               var length = Math.ceil(Data.length/5) * 5;

               $(this).siblings().removeClass('active');
               $(this).addClass('active');

               for(var i = 0;i<length;i++){

                   if(num*5<=i&&i<(num+1)*5){

                       if(Data[i]){

                           Data[i].content = Data[i].content.substr(0,190) + '....';
                             html = '<div class="content-sec-info"><h3><a href="http://127.0.0.1:3000/single?id:' + Data[i]._id + '" target="_blank">'+ Data[i].title + '</a></h3> <h4>'+ Data[i].data +' Posted by : <a href="#">' + Data[i].author + '</a></h4> <p>' + Data[i].content + '</p> <a class="bttn" href="http://127.0.0.1:3000/single?id:' + Data[i]._id + '" target="_blank">More all</a></div>';
                             $('.content-grid-sec').eq(i%5).html(html);
                             $('.content-grid-sec').eq(i%5).css({
                                 'height':'',
                                 'padding':'2em 18px 2em 18px',
                                 'border':'1px dashed gray'
                             });

                           $('body,html').animate({'scrollTop':0},10,'easeIn');

                       }else{

                            $('.content-grid-sec').eq(i%5).html('');
                             $('.content-grid-sec').eq(i%5).css({
                                 'height':'0px',
                                 'padding':'0px',
                                 'border':'none'
                             });

                       }

                   }

               }

           }else{
                   var onff = $(this).index() == $(this).siblings().size() ? 1 : -1;
                   pageNow = pageNow + onff;

                   if(pageNow < 0){
                       pageNow = 0;
                       alert('first not to prev...')
                       return;
                   }else if(pageNow == ($('.pages ul li').size() - 2)){

                       pageNow = $('.pages ul li').size() - 3;
                       alert('last not to next...')
                       return;

                   }

                   console.log(pageNow);
                   var num = pageNow;
                   var html = '';
                   var length = Math.ceil(Data.length/5) * 5;

                   $('.pages ul li').removeClass('active');
                   $('.pages ul li').eq(num).addClass('active');

                   for(var i = 0;i<length;i++){

                       if(num*5<=i&&i<(num+1)*5){

                           if(Data[i]){

                               Data[i].content = Data[i].content.substr(0,190) + '....';
                               html = '<div class="content-sec-info"><h3><a href="http://127.0.0.1:3000/single?id:' + Data[i]._id + '" target="_blank">'+ Data[i].title + '</a></h3> <h4>'+ Data[i].data +' Posted by : <a href="#">' + Data[i].author + '</a></h4> <p>' + Data[i].content + '</p> <a class="bttn" href="http://127.0.0.1:3000/single?id:' + Data[i]._id + '" target="_blank">More all</a></div>';
                               $('.content-grid-sec').eq(i%5).html(html);
                               $('.content-grid-sec').eq(i%5).css({
                                   'height':'',
                                   'padding':'2em 18px 2em 18px',
                                   'border':'1px dashed gray'
                               });

                               $('body,html').animate({'scrollTop':0},10,'easeIn');

                           }else{

                               $('.content-grid-sec').eq(i%5).html('');
                               $('.content-grid-sec').eq(i%5).css({
                                   'height':'0px',
                                   'padding':'0px',
                                   'border':'none'
                               });

                           }

                       }

                   }


           }

       })

   }

})