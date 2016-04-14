var express=require('express');

var app=express();
app.use(express.static(__dirname+'/public'));

//设置handlebars视图引擎
var handlebars=require('express-handlebars').create({
	defaultLayout:'main'//默认布局
});
//设置express的视图引擎
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port', process.env.PORT || 3000);


//home
app.get('/',function(req,res){
	res.render('home.handlebars');
});

//about
app.get('/about',function(req,res){
	res.render('about');
});
//400
app.use(function(req,res){
	res.status(404);
	res.render('404');
});

//500
app.use(function(err,req,res,next){
	console.log(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:'+app.get('port')+'; press Ctrl+C to terminate');
});