console.log("cheers");

var currentPic = 0;

var width, height;
var interactionClosed = false;

$(document).ready(function() {
	width = $(window).outerWidth();
	height = $(window).outerHeight();
	init();
});
$( window ).resize(function() {
	layout();
});

function init(){
	createContent();
	$('.content').css('display','none');
	$(getCurrentId()).css('display','block');
	$('#rang').click(function(){
		next(1);
	});
	$('#lang').click(function(){
		next(-1);
	});
	$('.arrow').mouseover(function(){
		$(this).fadeTo(300,1);
	});
	$('.arrow').mouseout(function(){
		$(this).fadeTo(300,0);
	});
	$('#about').click(function(){
		if(!interactionClosed)
			if( $(getCurrentId()).css('opacity') > 0 ){
				$(getCurrentId()).fadeTo(200,0);
				$('.arrow').css('display','none');
				$('#aboutContent').fadeTo(300,1);
				$('#aboutContent').css('zIndex',1000);
				$(this).html("zp&#283;t");
			} else {
				$(getCurrentId()).fadeTo(300,1);
				$('.arrow').css('display','block');
				$('#aboutContent').fadeTo(200,0);
				$('#aboutContent').css('zIndex',-1);
				$(this).html("O autorovi");
			}
	});
	// createAvailableContent();
}

function layout(){
	width = $(window).outerWidth();
	height = $(window).outerHeight();
	$('.content').css('display','block');
	for(var i = 0; i < json.length; i++){
		var scale = (height*0.77642)*0.00125;
		var w = scale * json[i]["prevsize"][0];
		var h = scale * json[i]["prevsize"][1];
		var _left = width/2 - w/2;
		var _top = height/2 - h/2;
		$('#pic-' + json[i]["id"]).outerWidth(w);
		$('#pic-' + json[i]["id"]).outerHeight(h);
		$('#pic-' + json[i]["id"]).offset({ top: _top, left: _left });

		$('#name'+json[i]["id"]).offset({
        	left : width/2 - $('#name'+json[i]["id"]).outerWidth()/2
    	});
	}
	$('.content').css('display','none');
	$(getCurrentId()).css('display','block');
	$('#aboutContent').height(height-20);
	$('#aboutContent').offset({left: width/2 - $('#aboutContent').outerWidth()/2 });
	$('.arrow').offset({top: height/2 - 60 });
}

function createContent(){
	for(var i = 0; i < json.length; i++){
		var id = 'content-' + json[i]["id"];
		$('#contentainer').append('<div class="content" id="' + id + '"></div>');
		$('#' + id).append('<a href="pics/' + json[i]["id"] + '.jpg" target="_blank"><img class="painting" id="pic-' + json[i]["id"] + '" src="pics/prev/' + json[i]["id"] + '.jpg"' + '></a>');
		$('#pic-' + json[i]["id"]).attr('data-w',json[i]["imagesize"][0]);
		$('#pic-' + json[i]["id"]).attr('data-h',json[i]["imagesize"][1]);
		$('#pic-' + json[i]["id"]).attr('data-pw',json[i]["prevsize"][0]);
		$('#pic-' + json[i]["id"]).attr('data-ph',json[i]["prevsize"][1]);
		var scale = (height*0.77642)*0.00125;
		var w = scale * json[i]["prevsize"][0];
		var h = scale * json[i]["prevsize"][1];
		var _left = width/2 - w/2;
		var _top = height/2 - h/2;
		$('#pic-' + json[i]["id"]).outerWidth(w);
		$('#pic-' + json[i]["id"]).outerHeight(h);
		$('#pic-' + json[i]["id"]).offset({ top: _top, left: _left });

		var info = $('<div class="info"></div>');
		if(json[i]["price"].indexOf('archiv') >= 0){
			$(info).append('<p class="big">Prod&aacute;no</p>');
		} else {
			$(info).append('<p class="big">' + json[i]["price"] + '</p>');
		}
		$(info).append('<p>'+htmlEntify(json[i]["comment"]) + '</p>');
		$(info).append('<p>' + json[i]["size"] + '<br>' + htmlEntify(json[i]["technique"]) + '</p>');
		$('#' + id).append(info);

		var name = $('<div id="name' + json[i]["id"] + '" class="name"></div>');
		$(name).append('<p><nobr>' + htmlEntify(json[i]["name"]) + '</nobr></p>');
		$('#' + id).append(name);
		$('#name'+json[i]["id"]).offset({
        	left : width/2 - $('#name'+json[i]["id"]).outerWidth()/2
    	});
	}

	var logo = $('<div id="logo">Ale&#353; Mal&yacute;<br></div>');
	$('body').append(logo);

	var about = $('<div id="about">O autorovi</div>');
	$('body').append(about);

	var aboutContent = $('<div id="aboutContent"></div>');
	var aboutInner = $('<div id="aboutInner"></div>');
	aboutInner.append('<img id="aboutImage" src="pics/aboutImage.png">');
	aboutInner.append(aboutText);
	aboutInner.height(height-20);
	// aboutContent.css('overflow','auto');
	$('body').append(aboutContent);
	$('#aboutContent').append(aboutInner);
	$('#aboutInner').offset({left: width/2 - $('#aboutInner').outerWidth()/2 });

	var info = $('<div class="info"></div>');
	$(info).append('<p class="big">kontakt</p>');
	$(info).append('<p>Ale&#353; Mal&yacute;</p><p> Dubenec 156<br>544 55 Dubenec</p><p>e-mail: maly.ales@tiscali.cz</p>');
	$('#aboutContent').append(info);

	var rang = $('<div id="rang" class="arrow">&rang;</div>');
	var lang = $('<div id="lang" class="arrow">&lang;</div>');
	$('body').append(rang);
	$('body').append(lang);
	$('.arrow').offset({top: height/2 - 60 });
	$('.arrow').fadeTo(0,0);
}

function htmlEntify(text){
	return text.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
   		return '&#'+i.charCodeAt(0)+';';
	});
}

function next(direction){
	if(!interactionClosed){
		interactionClosed = true;
		$("#content-" + json[nextPic(direction)]["id"]).css('display','block');
		$("#content-" + json[nextPic(direction)]["id"]).offset({ left: direction * width });

		$(getCurrentId() + " .info").fadeTo(600,0);
		$(getCurrentId() + " .name").fadeTo(600,0);
		$("#animator").css('font-size', 0).animate({ fontSize: 1.2 }, {
		    duration: 1200,
		    easing: 'easeOutQuad',
		    step: function(now,fx) {
		    	$(getCurrentId()).offset({ left: direction * Math.max(0,now-0.2) * width });
		    	$("#content-" + json[nextPic(direction)]["id"]).offset({ left: (direction * (1-Math.min(1,now)) * -1 * width) });
		    },
		    complete: function(){
				$(getCurrentId()).css('display','none');
				$(getCurrentId() + " .info").fadeTo(0,1);
				$(getCurrentId() + " .name").fadeTo(0,1);
		    	increment(direction);
				$(getCurrentId()).offset({ left: 0 });
		    	interactionClosed = false;
		    }
		}
		);
	}
}

function getCurrentId(){
	return '#content-' + json[currentPic]["id"];
}

function nextPic(direction){
	if(direction == 1){
		return (currentPic+1)%json.length;
	} else {
		return (currentPic-1+json.length)%json.length;
	}
}

function increment(direction){
	currentPic = nextPic(direction);
}

var aboutText = '<p><span class="big">Motto</span></p><p><span class="liste">\"' + htmlEntify('Paní Malá, on ten Alešek hezky kreslí, skoro bych řekla, že by se zde dalo mluvit o talentu...ale když on to nakonec vždycky něčím tak zvorá!\"') + '</span></p><p style="text-align:right; margin-top:-15px; margin-right:40px;">' + htmlEntify('(rok 1969, paní učitelka 1. třídy Marie Lacinová).') + '</p><p>' + htmlEntify('Aleš Malý, nar. 5. 10. 1962 v Jablonci nad Nisou') + '</p><p>studia<br><span class="list">' + htmlEntify('1978 – 1981 	SUPŠ Jablonec nad Nisou, obor rytec kovu') + '<br>' + htmlEntify('1982 – 1986	PF Ústí nad Labem, obor 1. st. ZŠ se zaměřením na Vv') + '<br>' + htmlEntify('1990 – 1994	PF Ústí nad Labem, obor Vv pro 2. a 3. st.') + '</span></p><p>' + htmlEntify('V současné době působí autor jako vesnický učitel v Dubenci u Dvora Králové nad Labem. Duchovním snažením se celoživotně pohybuje na průsečíku křesťanské mystiky a jógové filozofie. Je zcela fascinován projevem božské tvůrčí síly v přírodě.') + '</p>';






