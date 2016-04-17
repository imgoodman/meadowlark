var express=require('express');

var app=express();
app.use(express.static(__dirname+'/public'));
app.use(require('body-parser')());
app.disable('x-powered-by');

//设置handlebars视图引擎
var handlebars=require('express-handlebars').create({
	defaultLayout:'main',//默认布局
	helpers:{
		section:function(name,options){
			if(!this._sections) this._sections={};
			this._sections[name]=options.fn(this);
			return null;
		}
	}
});
//设置express的视图引擎
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port', process.env.PORT || 3000);

//用于测试
app.use(function(req,res,next){
	if(app.get('env')!=='production' && req.query.test==='1'){
		res.locals.showTests=true;
	}
	next();
});

//home
app.get('/',function(req,res){
	res.render('home');
});

//about
app.get('/about',function(req,res){
	res.render('about');
});

//newsletter
app.get('/newsletter',function(req,res){
	res.render('newsletter',{
		csrf:'CSRF token here'
	})
});
app.post('/process',function(req,res){
	console.log('Form (from querystring): '+req.query.form);
	console.log('CSRF token (from hidden form field):'+req.body._csrf);
	console.log('Name (from visible form field): '+req.body.name);
	console.log('Email (from visible form field): '+req.body.email);
	if(req.xhr || req.accepts('json,html')==='json'){
		res.json({success:true})
	}else{
	res.redirect(303,'/thank-you');
	}
});
app.get('/thank-you',function(req,res){
	res.render('thank-you');
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