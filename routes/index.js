var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https') 
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/h5', function(req, res, next) {
  res.render('mobile', { title: 'Express' });
});
// 下载页
router.get('/downloads', function(req, res, next) {
  res.render('download', { title: 'Express' });
});

// tg群
router.get('/crowd', function(req, res, next) {
  res.render('crowd', { title: 'Express' });
});


router.get('/getJobs', function(req, res, next) { // 浏览器端发来get请求
    var page = req.param('page');  //获取get请求中的参数 page

    console.log("page: "+page);
    var Res = res;  //保存，防止下边的修改

    //url 获取信息的页面部分地址
    var url = 'https://t.me/' + page;
    // console.log(url);

    https.get(url,function(res){  //通过get方法获取对应地址中的页面信息
        var chunks = [];
        var size = 0;
        res.on('data',function(chunk){   //监听事件 传输
            chunks.push(chunk);
            size += chunk.length;
        });
        res.on('end',function(){  //数据传输完
            var data = Buffer.concat(chunks,size);  
            var html = data.toString();


            var $ = cheerio.load(html); //cheerio模块开始处理 DOM处理

            var bigoo = {};
            // 获取页面信息
            bigoo.bg_img = $(".tgme_page_photo img").attr('src');
            if ( bigoo.bg_img == undefined) {
                 bigoo.bg_img = null;
            }
            
            var bg_cont = $('.tgme_page_description').html();

            if (bg_cont == null) {

            }else if(bg_cont.indexOf("<strong>Telegram</strong>") != -1){
                bg_cont = bg_cont.replace(/Telegram/, "Bigoo");
            }

            bigoo.bg_cont = bg_cont;
            bigoo.bg_title =  $('.tgme_page_title').text().trim();
            bigoo.bg_extra = $('.tgme_page_extra').text();
            // console.log(bigoo);

            Res.json({  
                bigoo:bigoo
            });
        });
    });

});


module.exports = router;
