//----------------------------------------------------------------------------------------
//
//		Use this for a simple carousel - Modify as needed
//		REQUIRES: jQuery
//
//
//		USAGE: This expects your entire carousel & controls to be inside ONE container
//		1. Carousel must be a UL with a class of "slider"
//		2. Navigation buttons must have a class of "carouselP" or "carouselN"
//		3. Slide number indication: Create an empty div with a class of "slideCount". The script will add EMPTY <a> tags for each item
//		4. Current slide count <a> receives a class of "current"
//
//		NOTE: There is no styling included. Make sure to float the slide li's to the left, 
//		give their parent overflow hidden and give the UL a huge width
//
//----------------------------------------------------------------------------------------

/* 	Author: Catalyst Studios 
	url: http://catalyststudios.com 
*/




//----------------------------------------------------------------------------------------
//
//		Custom Easing Equasion. Make sure to include this at the top of your JS file
//
//----------------------------------------------------------------------------------------

jQuery.easing.easeOutQuart = function (x, t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
};


//----------------------------------------------------------------------------------------
//
//		Call the carousel function inside jQuery's document ready
//		ARGUMENTS: container Class or ID, Auto Play (True/False) - Default False
//
//----------------------------------------------------------------------------------------

$(document).ready(function () {
    carousel('#containerDivID', true);
});

//----------------------------------------------------------------------------------------
//
//		Carousel Function. Should do pretty much what you need by default
//		Make sure to include this in your script file
//
//----------------------------------------------------------------------------------------

var carousel = function(targContainer, autoRotate){
	var cInner = {};
	var $autoCycle;
	
	if(autoRotate != undefined && autoRotate != "" && autoRotate != false){
		autoCycle = setInterval(function(){cInner.nextSlide();}, 12000);
	}
	
	var $targC = $(targContainer);
	var $slideContainer = $targC.find('ul.slides');
	var $slidesList = $targC.find('ul.slides li');
	var $counter = $targC.find('.slideCount');
	var $bPrev = $(targContainer).find(".carouselP");
	var $bNext = $(targContainer).find(".carouselN");
	var currentIndex;
	
	cInner.setupCarousel = function() {
	    $slidesList.each(function () {
	        $counter.append('<a href="#"></a>'); //remember to style these so something shows up!
	    });
	    $counterLinks = $targC.find('.slideCount a');
	    $counterLinks.click(function (event) {
	        event.preventDefault();
	        clearInterval(autoCycle);
	        cInner.changeSlide($(this).parent().find("a").index($(this)));
	    });
	    
	    if($targC.find('.slideCount a').size()<2){
	    	$counter.hide();
	    	$bPrev.hide();
	    	$bNext.hide();
	    }
	    cInner.changeSlide(0);
	}
	
	cInner.nextSlide = function() {
	    currentIndex = $targC.find('.slideCount a').index($targC.find('.slideCount a').filter(".current"));
	    if (currentIndex < $targC.find('.slideCount a').size() - 1) {
	        cInner.changeSlide(currentIndex + 1);
	    } else {
	        cInner.changeSlide(0);
	    }
	}
	
	cInner.previousSlide = function() {
	    currentIndex = $targC.find('.slideCount a').index($targC.find('.slideCount a').filter(".current"));
	    if (currentIndex >= 1) {
	        cInner.changeSlide(currentIndex - 1);
	    } else {
	        cInner.changeSlide($targC.find('.slideCount a').size() - 1);
	    }
	}
	
	cInner.changeSlide = function(targetIndex) {
	    targetIndex = parseInt(targetIndex);
	    var slideW = $slideContainer.find('li:first-child').outerWidth();
	    var currLM = parseInt($slideContainer.css('margin-left'));
	    var currItm = Math.abs(currLM / slideW);
	    var slideDiff = Math.abs(currItm - targetIndex);
	
	    if (targetIndex > currItm) {
	        var scrollTarg = currLM - (slideDiff * slideW) + "px";
	    } else {
	        var scrollTarg = currLM + (slideDiff * slideW) + "px";
	    }
	    $slideContainer.animate({ "margin-left": scrollTarg }, 600, "easeOutQuart");
	
	    $targC.find('.slideCount a').removeClass("current").filter(":eq(" + targetIndex + ")").addClass("current");
	    $slidesList.removeClass("current").filter(":eq(" + targetIndex + ")").addClass("current");
	};
	
	// setup buttons must have class: carouselN & carouselP

    $bNext.click(function (event) {
        event.preventDefault();
        clearInterval(autoCycle);
        cInner.nextSlide();
    });
    $bPrev.click(function (event) {
        event.preventDefault();
        clearInterval(autoCycle);
        cInner.previousSlide();
    });
    
    cInner.setupCarousel();
}