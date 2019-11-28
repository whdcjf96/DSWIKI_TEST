var	express	= require('express');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static('public'));

app.set('view engine','ejs');
app.set('views',__dirname+'/views');

var database = []

var search_database = []

app.all('/',

	function(request,response)
	{
	
	response.render('home')
	});

app.all('/result',

	function(request,response)
	{
	
		var a = request.body.text;
		if(a in database){
			response.render('search_success', {'text': request.body.text,'introduce':database.introduce ,
												'picture':database.picture,'talk':database.talk});
		}else{														//데이터베이스 연동 값 가져오는 부분
			response.render('search_fail', {'text': request.body.text});
		}
	});


app.all('/insert_to_success', function(request,response){
	
	response.render('search_success',{'text':request.body.text, 'introduce':request.body.intro_in ,'picture':request.body.picture ,
	'talk':request.body.talk_in});
})

app.all('/edit',		//사진은 어떻게할지 정해야함
	function(request,response){
		var human = ["개미분식은 치제뚝이 유명하다 돈까스도 맛잇다.","사진의 위치","밑반찬으로주는 떡볶이도 맛잇다","개미분식"]
		var key= request.body.key
		if(key == '0'){
			response.render('search_success',{'text': request.body.text, 'introduce':request.body.intro_in,
			'picture':human[1],'talk':human[2]})
			human[0] = request.body.intro_in;
			console.log(human[0]);
		}else if(key == '2'){
			response.render('search_success',{'text': request.body.text, 'introduce':human[0],
			'picture':human[1],'talk':request.body.talk_in})
			human[2] = request.body.talk_in;
			console.log(human[0]);
			console.log(human[2]);
		}

		
	})



app.all('/insert',					//데이터베이스 삽입 부분
	function(requset,response)
	{
		console.log(requset.body.text)
		response.render('insert', {'text':requset.body.text})

	});

app.listen(3000, function(){
		console.log('Server is running at http://127.0.0.1:3000!!!!!');
	});
