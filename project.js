var	express	= require('express');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static('public'));

app.set('view engine','ejs');
app.set('views',__dirname+'/views');

var human_database = []
var study_database = []
var play_database = []
var restaurant_database = []
var circle_database = []

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
		if(a in human_database){
			response.render('search_success', {'text': request.body.text,'introduce':human_database.introduce ,
												'picture':human_database.picture,'talk':human_database.talk});
		}else{														//데이터베이스 연동 값 가져오는 부분
			response.render('search_fail', {'text': request.body.text});
		}
	});


app.all('/study_insert_to_success', function(request,response){
	search_database.push({text:request.body.text})
	study_database.push({explain:request.body.explain_study})
	study_database.push({explain:request.body.tip_study})
	console.log(study_database)
	response.render('study_success',{'text':request.body.text, 'explain':request.body.explain_study ,
	'tip':request.body.tip_study});
})
app.all('/human_insert_to_success', function(request,response){
	search_database.push({text:request.body.text})
	human_database.push({introduce:request.body.introduce})
	human_database.push({character:request.body.character})
	human_database.push({ssul:request.body.ssul})
	console.log(human_database)
	response.render('human_success',{'text':request.body.text, 'introduce':request.body.introduce ,
	'character':request.body.character, 'ssul': request.body.ssul});
})
app.all('/play_insert_to_success', function(request,response){
	search_database.push({text:request.body.text})
	play_database.push({sort:request.body.explain_sort})
	play_database.push({explain:request.body.explain_play})
	play_database.push({tip:request.body.tip_play})
	console.log(play_database)
	response.render('play_success',{'text':request.body.text, 'sort':request.body.sort, 'explain':request.body.explain_play ,
	'tip':request.body.tip_play});
})
app.all('/restaurant_insert_to_success', function(request,response){
	search_database.push({text:request.body.text})
	restaurant_database.push({overview_restaurant:request.body.overview_restaurant})
	restaurant_database.push({menu:request.body.menu})
	restaurant_database.push({tip:request.body.tip_restaurant})
	console.log(restaurant_database)
	response.render('restaurant_success',{'text':request.body.text, 'overview_restaurant':request.body.overview_restaurant, 'menu':request.body.menu ,
	'tip':request.body.tip_restaurant});
})
app.all('/circle_insert_to_success', function(request,response){
	search_database.push({text:request.body.text})
	circle_database.push({overview_circle:request.body.overview})
	circle_database.push({activity:request.body.activity})
	circle_database.push({repute:request.body.repute})
	circle_database.push({tip:request.body.tip_circle})
	console.log(circle_database)
	response.render('circle_success',{'text':request.body.text, 'overview_circle':requset.body.overview_circle, 'activity':requset.body.activity, 'repute':request.body.repute ,
	'tip':request.body.tip_study});
})

app.all('/human_edit',		
	function(request,response){
		var key= request.body.key;
		switch(key){
				case '1': human_database.introduce=request.body.introduce_in; break;
				case '2': human_database.character=request.body.character_in; break;
				case '3': human_database.ssul=request.body.ssul_in; break;

		}
			
		console.log(key)
		console.log(human_database)
		response.render('human_success',{'text':request.body.text, 'introduce':human_database[0][0],'character':human_database.character,'ssul':human_database.ssul})
			
		

		
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
