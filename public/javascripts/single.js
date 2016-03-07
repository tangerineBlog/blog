/**
 * Created by Ju-iz on 2016/2/17.
 */
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
    //利用ajax获取单篇文章
    (function(){

        var id = (window.location.search).substr(4);
        console.log(id);
        $.post('/single/articles',{_id:id},function(data){

            console.log(data);

            var html = '';
            html = '<div class="content-grid-head"><h4>' + data.data + ',Posted by: <a href="#">'+ data.author  +'</a></h4><div class="clearfix"></div></div><div class="content-grid-single"><h3>'+ data.title  +'</h3>'+ data.content +'</div>';

            $('.content-grid').html(html);
        })
    })();

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

    //利用ajax获取最近更新
    $.post('/articles?t=' + new Date().getTime(),function(data){

        newArticle(data);
        lastShow(data);

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


})