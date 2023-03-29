// 필요한 모듈 require - common js 형식
var http = require('http');
var url = require('url');
var qs = require('querystring');

// 웹 서버 객체 만들기
var app = http.createServer(function (request, response) {
  var _url = request.url;
  // url 을 문자열에서 객체로 변환, 그리고 pathname을 path라는 변수에 저장
  var path = url.parse(_url, true).pathname;
  console.log(path);
  // 경로가 /일때
  if (path === '/') {
    response.writeHead(200);
    response.end(`
      <!doctype html>
      <html>
      <head>
        <title>POST</title>
        <meta charset="utf-8">
      </head>
      <body>
        <form action="/post_test" method="post">
          <p><input type="text" name="title67" placeholder="title"></p>
          <p><textarea name="description" placeholder="description"></textarea></p>
          <p><input type="submit"></p>
        </form>
      </body>
      </html>
      `);
      // 경로가 /post_test일 때
  } else if (path === '/post_test') {
    response.writeHead(200);
    var body = '';
    request.on('data', data => {
      body = body + data;
    });
    request.on('end', function () {
      // qs의 문자열을 객체로 변환하여 post라는 변수에 저장
      var post = qs.parse(body);
      var title2 = post.title67;
      var description2 = post.description;
      response.end(`
          <!doctype html>
          <html>
          <head>
            <title>POST</title>
            <meta charset="utf-8">
          </head>
          <body>
            <p>title : ${title2}</p>
            <p>description : ${description2}</p>
          </body>
          </html>
          `);
    });
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);