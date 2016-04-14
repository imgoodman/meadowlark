var express=require('express');

var app=express();

app.set('port', process.env.PORT || 3000);

app.get('/',function(req,res){
	res.type('text/plain');
	res.send('Meadowlark works');
});

//400
app.use(function(req,res){
	res.type('text/plain');
	res.status(404);
	res.send('404 -- Not found');
});

//500
app.use(function(err,req,res,next){
	console.log(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 -- Internal server error');
});

app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:'+app.get('port')+'; press Ctrl+C to terminate');
});