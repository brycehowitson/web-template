//----------------------------------------------------------------------------------------
//
//		Scripts to make the website do things. Anything you write from scratch goes here
//      				REMEMBER TO MINIFY THIS LATER
//
//----------------------------------------------------------------------------------------

var theSvg = Snap("#watch");
var secHand = theSvg.select("#second");
var minHand = theSvg.select("#minute");
var hrHand = theSvg.select("#hour");

$(function() {

	setTime();
    var interval = setInterval(setTime,1000);

    secHand.select("#tip").attr({'class':'glow'});
});

var setTime = function(){
  	var date = new Date(),
  	MINUTE = 60, HOUR = 60*MINUTE,
  	seconds = date.getSeconds(),
  	minutes = (date.getMinutes()*MINUTE) + seconds,
  	hours = (date.getHours()*HOUR)+minutes;

    secHand.attr({'transform':'rotate('+360*(seconds/MINUTE)+',324,360)'});
    minHand.attr({'transform':'rotate('+360*(minutes/HOUR)+',324,360)'});
    hrHand.attr({'transform':'rotate('+360*(hours/(12*HOUR))+',324,360)'});
};

var nightTime = function(){
	secHand.attr({'class':'glow'});
}


document.getElementById('hand2').setAttribute('transform', 'rotate('+360*(23/60)+',324,420)');

document.getElementById('hand1').setAttribute('transform', 'rotate('+360*(48/60)+',324,300)');