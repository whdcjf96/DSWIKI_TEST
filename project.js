var	express	= require('express');

var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static('public'));

app.set('view engine','ejs');
app.set('views',__dirname+'/views');

app.all('/',

	function(request,response)
	{
	
	response.render('home')
	});


app.all('/result',

	function(request,response)
	{
	console.log(request.body.text);
	response.render('search_fail', {'text': request.body.text})
	});

app.all('/insert',
	function(requset,response)
	{
		response.render('insert',)
	});

app.listen(3000, function(){
		console.log('Server is running at http://127.0.0.1:3000!!!!!');
	});
