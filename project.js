var express = require('express');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

var human_database = {}
var study_database = {}
var play_database = {}
var restaurant_database = {}
var circle_database = {}
var a= {}
var search_database = {}

app.all('/',

	function (request, response) {

		response.render('home')
	});

app.all('/result',

	function (request, response) {

		var search = request.body.text;
		console.log(search)
		console.log(search_database)

		switch(search_database[search]){
			case 'human': response.render('human_success', {
				'text': request.body.text, 'introduce': a[request.body.text][0],
				'character': a[request.body.text][1], 'ssul': a[request.body.text][2]
				}); break;
			case 'study': response.render('study_success', {
				'text': request.body.text, 'explain': request.body.explain_study,
				'tip': request.body.tip_study
			});break;
			case 'play':response.render('play_success', {
				'text': request.body.text, 'sort': request.body.sort, 'explain': request.body.explain_play,
				'tip': request.body.tip_play
			}); break;
			case 'restaurant': response.render('restaurant_success', {
				'text': request.body.text, 'overview_restaurant': request.body.overview_restaurant, 'menu': request.body.menu,
				'tip': request.body.tip_restaurant
			});break;
			case 'circle':response.render('circle_success', {
				'text': request.body.text, 'overview_circle': request.body.overview_circle, 'activity': request.body.activity, 'repute': request.body.repute,
				'tip': request.body.tip_circle
			});break;
			default : response.render('search_fail', { 'text': request.body.text });
		}



	/*	if (search in search_database) {
			response.render('human_success', {
				'text': request.body.text, 'introduce': human_database.introduce,
				'character': human_database.character, 'ssul': human_database.ssul
				
			});
		} else {														//데이터베이스 연동 값 가져오는 부분
			response.render('search_fail', { 'text': request.body.text });
		}
		*/
	});


app.all('/study_insert_to_success', function (request, response) {//2
	search_database[request.body.text] = 'study'
	study_database['explain'] = request.body.explain_study
	study_database['tip'] = request.body.tip_study
	console.log(study_database)
	response.render('study_success', {
		'text': request.body.text, 'explain': request.body.explain_study,
		'tip': request.body.tip_study
	});
})
app.all('/human_insert_to_success', function (request, response) { //3
	search_database[request.body.text] = 'human' 
	var introduce = request.body.introduce
	var character =request.body.character
	var ssul = request.body.ssul

	a[request.body.text] = [introduce, character, ssul]
	console.log('this'+a[request.body.text][0])
	human_database['introduce'] = request.body.introduce
	human_database['character'] = request.body.character
	human_database['ssul'] = request.body.ssul
	console.log(human_database)
	response.render('human_success', {
		'text': request.body.text, 'introduce': request.body.introduce,
		'character': request.body.character, 'ssul': request.body.ssul
	});
})
app.all('/play_insert_to_success', function (request, response) { //3
	search_database[request.body.text] = 'play'
	
	play_database['sort'] = request.body.sort
	play_database['explain'] = request.body.explain_play
	play_database['tip'] = request.body.tip_play
	console.log(play_database)
	response.render('play_success', {
		'text': request.body.text, 'sort': request.body.sort, 'explain': request.body.explain_play,
		'tip': request.body.tip_play
	});
})
app.all('/restaurant_insert_to_success', function (request, response) { //3
	search_database[request.body.text] = 'restaurant'
	
	
	restaurant_database['overview_restaurant'] = request.body.overview_restaurant
	restaurant_database['menu'] = request.body.menu
	restaurant_database['tip'] = request.body.tip_restaurant
	console.log(restaurant_database)
	response.render('restaurant_success', {
		'text': request.body.text, 'overview_restaurant': request.body.overview_restaurant, 'menu': request.body.menu,
		'tip': request.body.tip_restaurant
	});
})
app.all('/circle_insert_to_success', function (request, response) { //4
	search_database[request.body.text] = 'circle'
	

	circle_database['overview_circle'] = request.body.overview_circle
	circle_database['activity'] = request.body.activity
	circle_database['repute'] = request.body.repute
	circle_database['tip'] = request.body.tip_circle
	console.log(circle_database)
	response.render('circle_success', {
		'text': request.body.text, 'overview_circle': request.body.overview_circle, 'activity': request.body.activity, 'repute': request.body.repute,
		'tip': request.body.tip_circle
	});
})

app.all('/human_edit',
	function (request, response) {
		var key = request.body.key;
		switch (key) {
			case '1': human_database.introduce = request.body.introduce_in; break;
			case '2': human_database.character = request.body.character_in; break;
			case '3': human_database.ssul = request.body.ssul_in; break;
		}
		console.log(human_database)
		response.render('human_success', { 'text': request.body.text, 'introduce': human_database['introduce'], 'character': human_database['character'], 'ssul': human_database['ssul'] })
	})

app.all('/study_edit',
	function (request, response) {
		var key = request.body.key;
		switch (key) {
			case '1': study_database.explain = request.body.study_in; break;
			case '2': study_database.tip = request.body.tip_in; break;
		}
		console.log(key)
		console.log(study_database)
		response.render('study_success', { 'text': request.body.text, 'explain': study_database['explain'], 'tip': study_database['tip']})
	})


app.all('/play_edit',
	function (request, response) {
		var key = request.body.key;
		switch (key) {
			case '1': play_database.sort = request.body.sort_in; break;
			case '2': play_database.explain = request.body.play_in; break;
			case '3': play_database.tip = request.body.tip_in; break;
		}
		console.log(play_database)
		response.render('play_success', { 'text': request.body.text, 'sort': play_database['sort'], 'explain': play_database['explain'], 'tip': play_database['tip'] })
	})


app.all('/restaurant_edit',
	function (request, response) {
		var key = request.body.key;
		switch (key) {
			
			case '1': restaurant_database.overview_restaurant = request.body.overview_in; break;
			case '2': restaurant_database.menu = request.body.menu_in; break;
			case '3': restaurant_database.tip = request.body.tip_in; break;
		}
		console.log(restaurant_database)
		response.render('restaurant_success', { 'text': request.body.text, 'overview_restaurant': restaurant_database['overview_restaurant'], 'menu': restaurant_database['menu'], 'tip': restaurant_database['tip'] })
	})


app.all('/circle_edit',
	function (request, response) {
		var key = request.body.key;
		switch (key) {
			case '1': circle_database.overview_circle = request.body.overview_in; break;
			case '2': circle_database.activity = request.body.activity_in; break;
			case '3': circle_database.repute = request.body.repute_in; break;
			case '4': circle_database.tip = request.body.tip_in; break;
		}
		console.log(circle_database)
		response.render('circle_success', { 'text': request.body.text, 'overview_circle': circle_database['overview_circle'], 'activity': circle_database['activity'], 'repute': circle_database['repute'], 'tip': circle_database['tip'] })
	})



app.all('/insert',					//데이터베이스 삽입 부분
	function (requset, response) {
		console.log(requset.body.text)
		response.render('insert', { 'text': requset.body.text })

	});

app.listen(3000, function () {
	console.log('Server is running at http://127.0.0.1:3000!!!!!');
});
