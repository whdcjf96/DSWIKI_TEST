var express = require('express');

var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'lee493618',
	port: '3306',
	database: 'dswiki'
});

db.connect();

var human_database = {}
var study_database = {}
var play_database = {}
var restaurant_database = {}
var circle_database = {}
var a = {}
var b = {}
var c = {}
var d = {}
var e = {}
var search_database = {}

app.all('/',

	function (request, response) {

		db.query('SELECT * FROM humans', function (error, results) {
			for (i in results) {
				console.log("===h===")
				console.log(results[i]);
				console.log("===h===")
			}

		})
		db.query('SELECT * FROM studys', function (error, results) {
			for (i in results) {
				console.log("===st===")
				console.log(results[i]);
				console.log("===st===")
			}
		})
		db.query('SELECT * FROM plays', function (error, results) {
			for (i in results) {
				console.log("===p===")
				console.log(results[i]);
				console.log("===p===")
			}
		})

		db.query('SELECT * FROM restaurants', function (error, results) {
			for (i in results) {
				console.log("===r===")
				console.log(results[i]);
				console.log("===r===")
			}
		})
		db.query('SELECT * FROM circles', function (error, results) {
			for (i in results) {
				console.log("===c===")
				console.log(results[i]);
				console.log("===c===")
			}
		})

		db.query('SELECT * FROM searchs', function (error, results) {
			for (i in results) {
				console.log("===s===")
				console.log(results[i]);
				console.log("===s===")
			}
		})
		response.render('home')
	});

app.all('/result',

	function (request, response) {
		db.query(`SELECT table_name FROM searchs WHERE name = '${request.body.text}'`, function (err, results, fields) {
			if( results === undefined || results === null || results == ""){
				response.render('search_fail', { 'text': request.body.text });
			}
			else{
				switch (results[0].table_name) {
					case 'humans':
						db.query(`SELECT * FROM humans WHERE name = '${request.body.text}'`, function (err, results2, fields) {
							if (err) throw err;
							response.render('human_success', {
								'text': results2[0].name, 'introduce': results2[0].introduce,
								'character': results2[0].charact, 'ssul': results2[0].ssul
							})
						});
						break;
					case 'studys':
						db.query(`SELECT * FROM studys WHERE name = '${request.body.text}'`, function (err, results2, fields) {
							if (err) throw err;
							response.render('study_success', {
								'text': results2[0].name, 'explain': results2[0].explaination,
								'tip': results2[0].tip
							})
						});
						break;
					case 'plays': 
						db.query(`SELECT * FROM plays WHERE name = '${request.body.text}'`, function (err, results2, fields) {
							if (err) throw err;
							response.render('play_success', {
								'text': results2[0].name, 'sort': results2[0].sort, 'explain': results2[0].explaination,
								'tip': results2[0].tip
							})
						});
					 break;
					case 'restaurants': 
						db.query(`SELECT * FROM restaurants WHERE name = '${request.body.text}'`, function (err, results2, fields){
							if (err) throw err;
							response.render('restaurant_success', {
								'text': results2[0].name, 'overview_restaurant': results2[0].overview, 'menu': results2[0].menu,
								'tip':results2[0].tip
							})
						});
					 break;
					case 'circles': 
						db.query(`SELECT * FROM circles WHERE name = '${request.body.text}'`, function (err, results2, fields){
							if (err) throw err;
							response.render('circle_success', {
								'text': results2[0].name, 'overview_circle': results2[0].overview, 'activity': results2[0].activity, 'repute': results2[0].repute,
								'tip': results2[0].tip
							})
						});
					 break;
					default: response.render('search_fail', { 'text': request.body.text });
				}
			}
			
		})
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
	//search_database[request.body.text] = 'human'
	//a[request.body.text] = [request.body.introduce, request.body.character, request.body.ssul]
	//console.log('this: '+a[request.body.text][0])

	db.query("INSERT INTO humans (name,introduce,charact,ssul) VALUES (?,?,?,?)", [request.body.text, request.body.introduce, request.body.character, request.body.ssul], function (err, results, fields) {
		if (err) throw err;
		console.log("tttt")
	})
	db.query("INSERT INTO searchs (name,table_name) VALUES (?,?)", [request.body.text, 'humans'], function (err, results) {
		if (err) throw err;
		console.log("검색어 테이블에 human 들어감")
	})

	//	human_database['introduce'] = request.body.introduce
	//		human_database['character'] = request.body.character
	//	human_database['ssul'] = request.body.ssul
	//console.log(human_database)
	//var receive_h =[];
	//var a = request.body.text;
	db.query(`SELECT * FROM humans WHERE name='${request.body.text}'`, function (err, results, fields) {
		//receive_h = results.json;
		if (err) throw err;
		console.log(results[0].name)
		console.log(results[0].introduce)
		response.render('human_success', {
			'text': results[0].name, 'introduce': results[0].introduce,
			'character': results[0].charact, 'ssul': results[0].ssul
		});
	})

})

app.all('/study_insert_to_success', function (request, response) {//2
	//search_database[request.body.text] = 'study'
	//b[request.body.text] = [request.body.explain_study, request.body.tip_study]

	db.query("INSERT INTO searchs (name,table_name) VALUES (?,?)", [request.body.text, 'studys'], function (err, results) {
		if (err) throw err;
		console.log("검색어 테이블에 studys 들어감")
	})
	db.query("INSERT INTO studys (name,explaination,tip) VALUES (?,?,?)", [request.body.text, request.body.explain_study, request.body.tip_study], function (err, results, fields) {
		if (err) throw err;
	})

	//	study_database['explain'] = request.body.explain_study
	//	study_database['tip'] = request.body.tip_study

	db.query(`SELECT * FROM studys WHERE name='${request.body.text}'`, function (err, results, fields) {		//receive_h = results.json;
		if (err) throw err;
		console.log(results[0].name)
		console.log(results[0].explaination)
		console.log(results[0].tip)
		response.render('study_success', {
			'text': results[0].name, 'explain': results[0].explaination,
			'tip': results[0].tip
		});
	})
})

app.all('/play_insert_to_success', function (request, response) { //3
	//search_database[request.body.text] = 'play'
	//c[request.body.text] = [request.body.sort, request.body.explain_play, request.body.tip_play]

	db.query("INSERT INTO searchs (name,table_name) VALUES (?,?)", [request.body.text, 'plays'], function (err, results) {
		if (err) throw err;
		console.log("검색어 테이블에 plays 들어감")
	})
	db.query("INSERT INTO plays (name,sort,explaination,tip) VALUES (?,?,?,?)", [request.body.text, request.body.sort, request.body.explain_play, request.body.tip_play], function (err, results, fields) {
		if (err) throw err;
	})
	//	play_database['sort'] = request.body.sort
	//	play_database['explain'] = request.body.explain_play
	//	play_database['tip'] = request.body.tip_play
	//console.log(play_database)
	db.query(`SELECT * FROM plays WHERE name = '${request.body.text}'`, function (err, results, fields) {
		if (err) throw err;
		console.log(results[0].name)
		console.log(results[0].sort)
		console.log(results[0].explaination)
		console.log(results[0].tip)
		response.render('play_success', {
			'text': results[0].name, 'sort': results[0].sort, 'explain': results[0].explaination,
			'tip': results[0].tip
		})
	})


})
app.all('/restaurant_insert_to_success', function (request, response) { //3
	//search_database[request.body.text] = 'restaurant'
	//d[request.body.text] = [request.body.overview_restaurant, request.body.menu, request.body.tip_restaurant]

	db.query("INSERT INTO searchs (name,table_name) VALUES (?,?)", [request.body.text, 'restaurants'], function (err, results) {
		if (err) throw err;
		console.log("검색어 테이블에 restaurants 들어감")
	})
	db.query("INSERT INTO restaurants (name,overview,menu,tip) VALUES (?,?,?,?)", [request.body.text, request.body.overview_restaurant, request.body.menu, request.body.tip_restaurant], function (err, results, fields) {
		if (err) throw err;
	})

	//restaurant_database['overview_restaurant'] = request.body.overview_restaurant
	//restaurant_database['menu'] = request.body.menu
	//restaurant_database['tip'] = request.body.tip_restaurant
	//console.log(restaurant_database)

	db.query(`SELECT * FROM restaurants WHERE name = '${request.body.text}'`, function (err, results, fields) {
		if (err) throw err;
		response.render('restaurant_success', {
			'text': results[0].name, 'overview_restaurant': results[0].overview, 'menu': results[0].menu,
			'tip': results[0].tip
		})
	})
})
app.all('/circle_insert_to_success', function (request, response) { //4
	//search_database[request.body.text] = 'circle'
	//e[request.body.text] = [request.body.overview_circle, request.body.activity, request.body.repute, request.body.tip_circle]

	db.query("INSERT INTO searchs (name,table_name) VALUES (?,?)", [request.body.text, 'circles'], function (err, results) {
		if (err) throw err;
		console.log("검색어 테이블에 circles 들어감")
	})
	db.query("INSERT INTO circles (name,overview,activity,repute,tip) VALUES (?,?,?,?,?)", [request.body.text, request.body.overview_circle, request.body.activity, request.body.repute, request.body.tip_circle], function (err, results, fields) {
		if (err) throw err;
	})

	//	circle_database['overview_circle'] = request.body.overview_circle
	//	circle_database['activity'] = request.body.activity
	//	circle_database['repute'] = request.body.repute
	//	circle_database['tip'] = request.body.tip_circle
	//console.log(circle_database)

	db.query(`SELECT * FROM circles WHERE name = '${request.body.text}'`, function (err, results, fields) {
		if (err) throw err;
		response.render('circle_success', {
			'text': results[0].name, 'overview_circle': results[0].overview, 'activity': results[0].activity, 'repute': results[0].repute,
			'tip': results[0].tip
		})
	})
})
app.all('/human_edit',
	function (request, response) {
		var key = request.body.key;
		switch (key) {

			case '1': db.query(`UPDATE humans SET introduce = '${request.body.introduce_in}' WHERE name = '${request.body.text}'`,function(err,results){if (err) throw err;}); break;
			case '2': db.query(`UPDATE humans SET charact = '${request.body.character_in}' WHERE name = '${request.body.text}'`,function(err,results){if (err) throw err;}); break;
			case '3': db.query(`UPDATE humans SET ssul = '${request.body.ssul_in}' WHERE name = '${request.body.text}'`,function(err,results){if (err) throw err;}); break;
		}

		db.query(`SELECT * FROM humans WHERE name = '${request.body.text}'`,function(err, results){
			if(err) throw err
			response.render('human_success', { 'text': results[0].name, 'introduce': results[0].introduce,
			'character': results[0].charact, 'ssul': results[0].ssul})
		})
		})

app.all('/study_edit',
	function (request, response) {
		var key = request.body.key;
		switch (key) {
			case '1': db.query(`UPDATE studys SET explaination = '${request.body.study_in}' WHERE name = '${request.body.text}'`,function(err,results){if (err) throw err;}); break;
			case '2': db.query(`UPDATE studys SET tip = '${request.body.tip_in}' WHERE name = '${request.body.text}'`,function(err,results){if (err) throw err;}); break;
		}
		db.query(`SELECT * FROM studys WHERE name = '${request.body.text}'`,function(err, results){
			if(err) throw err
			response.render('study_success', { 'text': results[0].name, 'explain': results[0].explaination,
			'tip': results[0].tip})
		})
		})


app.all('/play_edit',
	function (request, response) {
		var key = request.body.key;
		switch (key) {
			case '1': db.query(`UPDATE plays SET sort = '${request.body.sort_in}' WHERE name = '${request.body.text}'`,function(err,results){if (err) throw err;}); break;
			case '2': db.query(`UPDATE plays SET explaination = '${request.body.play_in}' WHERE name = '${request.body.text}'`,function(err,results){if (err) throw err;}); break;
			case '3': db.query(`UPDATE plays SET tip = '${request.body.tip_in}' WHERE name = '${request.body.text}'`,function(err,results){if (err) throw err;}); break;
		}
		db.query(`SELECT * FROM plays WHERE name = '${request.body.text}'`,function(err, results){
			if(err) throw err
			response.render('play_success', {
				'text': results[0].name, 'sort': results[0].sort, 'explain': results[0].explaination,
				'tip': results[0].tip
			})
		})
		
	})

app.all('/restaurant_edit',
	function (request, response) {
		var key = request.body.key;
		switch (key) {

			case '1': db.query(`UPDATE restaurants SET overview = '${request.body.overview_in}' WHERE name = '${request.body.text}'`,function(err,results){if (err) throw err;});break;
			case '2': db.query(`UPDATE restaurants SET menu = '${request.body.menu_in}' WHERE name = '${request.body.text}'`,function(err,results){if (err) throw err;});break;
			case '3': db.query(`UPDATE restaurants SET tip = '${request.body.tip_in}' WHERE name = '${request.body.text}'`,function(err,results){if (err) throw err;});break;
		}
		db.query(`SELECT * FROM restaurants WHERE name = '${request.body.text}'`,function(err, results){
			if(err) throw err
			response.render('restaurant_success', {
				'text': results[0].name, 'overview_restaurant': results[0].overview, 'menu': results[0].menu,
				'tip': results[0].tip
			})
		})
		
	})


app.all('/circle_edit',
	function (request, response) {
		var key = request.body.key;
		switch (key) {
			case '1': db.query(`UPDATE circles SET overview = '${request.body.overview_in}' WHERE name = '${request.body.text}'`,function(err,results){if (err) throw err;});break;
			case '2': db.query(`UPDATE circles SET activity = '${request.body.activity_in}' WHERE name = '${request.body.text}'`,function(err,results){if (err) throw err;});break;
			case '3': db.query(`UPDATE circles SET repute = '${request.body.repute_in}' WHERE name = '${request.body.text}'`,function(err,results){if (err) throw err;});break;
			case '4': db.query(`UPDATE circles SET tip = '${request.body.tip_in}' WHERE name = '${request.body.text}'`,function(err,results){if (err) throw err;});break;
		}
		db.query(`SELECT * FROM circles WHERE name = '${request.body.text}'`,function(err, results){
			if(err) throw err
			response.render('circle_success', {
				'text': results[0].name, 'overview_circle': results[0].overview, 'activity': results[0].activity, 'repute': results[0].repute,
				'tip': results[0].tip
			})
		})
		
	})



app.all('/insert',					//데이터베이스 삽입 부분
	function (request, response) {
		console.log(request.body.text)
		response.render('insert', { 'text': request.body.text })

	});

app.listen(3000, function () {
	console.log('Server is running at http://127.0.0.1:3000!!!!!');
});
