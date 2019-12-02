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
var b= {}
var c= {}
var d= {}
var e={}
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
				'text': request.body.text, 'explain': b[request.body.text][0],
				'tip': b[request.body.text][1]
			});break;
			case 'play':response.render('play_success', {
				'text': request.body.text, 'sort': c[request.body.text][0], 'explain': c[request.body.text][1],
				'tip': c[request.body.text][2]
			}); break;
			case 'restaurant': response.render('restaurant_success', {
				'text': request.body.text, 'overview_restaurant': d[request.body.text][0], 'menu': d[request.body.text][1],
				'tip': d[request.body.text][2]
			});break;
			case 'circle':response.render('circle_success', {
				'text': request.body.text, 'overview_circle': e[request.body.text][0], 'activity': e[request.body.text][1], 'repute': e[request.body.text][2],
				'tip': e[request.body.text][3]
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
	app.all('/human_insert_to_success', function (request, response) { //3
		search_database[request.body.text] = 'human' 
		a[request.body.text] = [request.body.introduce, request.body.character, request.body.ssul]
		console.log('this: '+a[request.body.text][0])
	//	human_database['introduce'] = request.body.introduce
//		human_database['character'] = request.body.character
	//	human_database['ssul'] = request.body.ssul
		console.log(human_database)
		response.render('human_success', {
			'text': request.body.text, 'introduce': a[request.body.text][0],
			'character': a[request.body.text][1], 'ssul': a[request.body.text][2]
		});
	})

app.all('/study_insert_to_success', function (request, response) {//2
	search_database[request.body.text] = 'study'
	b[request.body.text] = [request.body.explain_study,request.body.tip_study]
//	study_database['explain'] = request.body.explain_study
//	study_database['tip'] = request.body.tip_study
	console.log(study_database)
	response.render('study_success', {
		'text': request.body.text, 'explain': b[request.body.text][0],
		'tip': b[request.body.text][1]
	});
})

app.all('/play_insert_to_success', function (request, response) { //3
	search_database[request.body.text] = 'play'
	c[request.body.text] = [request.body.sort,request.body.explain_play,request.body.tip_play]
//	play_database['sort'] = request.body.sort
//	play_database['explain'] = request.body.explain_play
//	play_database['tip'] = request.body.tip_play
	console.log(play_database)
	response.render('play_success', {
		'text': request.body.text, 'sort': c[request.body.text][0], 'explain': c[request.body.text][1],
		'tip': c[request.body.text][2]
	});
})
app.all('/restaurant_insert_to_success', function (request, response) { //3
	search_database[request.body.text] = 'restaurant'
	d[request.body.text] = [request.body.overview_restaurant,request.body.menu,request.body.tip_restaurant]
	//restaurant_database['overview_restaurant'] = request.body.overview_restaurant
	//restaurant_database['menu'] = request.body.menu
	//restaurant_database['tip'] = request.body.tip_restaurant
	console.log(restaurant_database)
	response.render('restaurant_success', {
		'text': request.body.text, 'overview_restaurant':d[request.body.text][0], 'menu': d[request.body.text][1],
		'tip': d[request.body.text][2]
	});
})
app.all('/circle_insert_to_success', function (request, response) { //4
	search_database[request.body.text] = 'circle'
	e[request.body.text] = [request.body.overview_circle,request.body.activity,request.body.repute,request.body.tip_circle]
//	circle_database['overview_circle'] = request.body.overview_circle
//	circle_database['activity'] = request.body.activity
//	circle_database['repute'] = request.body.repute
//	circle_database['tip'] = request.body.tip_circle
	console.log(circle_database)
	response.render('circle_success', {
		'text': request.body.text, 'overview_circle': e[request.body.text][0], 'activity': e[request.body.text][1], 'repute': e[request.body.text][2],
		'tip': e[request.body.text][3]
	});
})








app.all('/human_edit',
	function (request, response) {
		var key = request.body.key;
		switch (key) {

			case '1': a[request.body.text][0] = request.body.introduce_in; break;
			case '2': a[request.body.text][1] = request.body.character_in; break;
			case '3': a[request.body.text][2] = request.body.ssul_in; break;

		}
		console.log(human_database)
		response.render('human_success', { 'text': request.body.text, 'introduce': a[request.body.text][0], 'character': a[request.body.text][1], 'ssul': a[request.body.text][2] })
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
	function (request, response) {
		console.log(request.body.text)
		response.render('insert', { 'text': request.body.text })

	});

app.listen(3000, function () {
	console.log('Server is running at http://127.0.0.1:3000!!!!!');
});
