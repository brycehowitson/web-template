jQuery.fixPlaceHolder = function () {
    // Fallback for HTML5 PlaceHolder feature
    // Use placeholder for any textfield instead of writing js to swap out the text on focus
    if (!Modernizr.input.placeholder) {
        $("[placeholder]").each(function () {
            var $this = $(this);
            if ($this.attr("type") == "password") {
                $this.attr("realType", "password");
            }
        }).focus(function () {
            var $input = $(this);
            if ($input.val() == $input.attr("placeholder")) {
                if ($input.attr("realType") == "password") {
                    try {
                        $input.setAttribute("type", "password");
                    } catch (e) { }
                }
                $input.val("");
                $input.removeClass("placeholder");
            }
        }).blur(function () {
            var $input = $(this);
            if ($input.val() == "" || $input.val() == $input.attr("placeholder")) {
                if ($input.attr("realType") == "password") {
                    try {
                        $input.setAttribute("type", "text");
                    } catch (e) { //if we can't change the type, we need to create a copy and hide/show the different fields
                        var $next = $input.next();
                        if ($next.size() == 0 || $next.attr("isCopy") != "true") {
                            $next = $($input.clone().wrap("<div></div>").parent().html().replace("type=password", "type='text'"));
                            $next.attr("isCopy", "true");
                            $input.after($next);
                            $next.val($input.attr("placeholder"));
                            $next.focus(function () {
                                $input.show();
                                $next.hide();
                                $input.focus();
                            });
                        }
                        $input.hide();
                        $next.show();
                    }
                }
                $input.addClass("placeholder");
                $input.val($input.attr("placeholder"));
            }
        }).blur();
        $("[placeholder]").parents("form").submit(function () {
            $(this).find("[placeholder]").each(function () {
                var $input = $(this);
                if ($input.val() == $input.attr("placeholder")) {
                    $input.val("");
                }
                if ($input.attr("isCopy") == "true") {
                    $input.remove();
                }
                else {
                    $input.show();
                }
            })
        });
    }
};

jQuery.fn.equalHeight = function(resetHeights) {
	if (resetHeights == undefined) {
		resetHeights = false;
	}
	if (resetHeights) {
		this.height("auto");
	}
	var maxHeight = 0;
	this.each(function() {
		if ($(this).height() > maxHeight) {
			maxHeight = $(this).height();
		}
	});
	this.height(maxHeight);
};

jQuery.fn.center = function() {
	this.css("position", "absolute");
	this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
	this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
	return this;
}

jQuery.fn.equalMinHeight = function() {
	var maxHeight = 0;
	this.each(function() {
		if ($(this).height() > maxHeight) {
			maxHeight = $(this).height();
		}
	});
	if ($(".ie6,.ie7").length) {
		this.height(maxHeight);
	}
	else {
		this.css({ "min-height": maxHeight });
	}
};

jQuery.fn.catTabs = function (options) {
    options = options || { };
    options.linkSelector = options.linkSelector || "#tabList .tabNav";
    options.activeLinkClass = options.activeLinkClass || "active";
    options.tabContentSelector = options.tabContentSelector || "#tabContent .tabContentSection";

    var $tabContainer = this;
    var tabLinks = $tabContainer.find(options.linkSelector);
    var tabContent = $tabContainer.find(options.tabContentSelector);
    tabLinks.click(function (e) {
        e.preventDefault();
        window.location.hash = $(this).attr('href');
        tabContent.hide().filter(this.hash).show();
        tabLinks.removeClass(options.activeLinkClass).filter(this).addClass(options.activeLinkClass);
    });
    if(window.location.hash) {
        var urlHash = window.location.hash;
        var hashTarg = urlHash;
        tabLinks.each(function(){
            var $this = $(this);
            if($this.attr('href') == hashTarg ){
                $this.click();
            }
        });
    } else {
        tabLinks.filter(':first').click();
    }
};

jQuery.fn.catSelect = function() {
    this.each(function(){
        var $select = $(this);
        var $selectWrap = $("<div>",{
            class: "fancySelect",
            html: "<div class='selectMain'></div><ul class='dropDown layout'></ul>"
        });

        if($select.hasClass("elastic")){
            var sWidth = Math.round(( 100 * parseFloat($select.css("width")) / parseFloat($select.parent().css("width")) )) + "%";
            $selectWrap.css("width", sWidth);
        }else{
            var sWidth = $select.css("width") + "px"
            $selectWrap.css("width", sWidth);
        }
        
        var $selectMenu = $selectWrap.find('.dropDown');
        var $selectMain = $selectWrap.find('.selectMain');

        $select.find("option").each(function(i){
            var $option = $(this);
            var $li = $('<li>',{
                class:'selectRow',
                html: $option.text()
            });

            if($option.is(":selected")){
                $selectMain.html($option.text());
                $li.addClass("selected");
            }

            $li.click(function(){
                $selectMain.html($option.text());
                $select.val($option.val());
                $selectMenu.trigger('hide');
                $(this).parent().find("li").removeClass("selected").filter($(this)).addClass("selected");
                return false;
            });

            $selectMenu.append($li);
        });

        $selectMenu.hide();
        $select.hide().after($selectWrap);

        $selectMenu.bind('show',function(){
            if($selectMenu.is(':animated')){
                return false;
            }
            $selectMain.addClass('expanded');
            $selectMenu.slideDown(200);

        }).bind('hide',function(){
                if($selectMenu.is(':animated')){
                    return false;
                }
                $selectMain.removeClass('expanded');
                $selectMenu.slideUp(200);

            }).bind('toggle',function(){
                if($selectMain.hasClass('expanded')){
                    $selectMenu.trigger('hide');
                }
                else $selectMenu.trigger('show');
            });

        $selectMain.click(function(){
            $selectMenu.trigger('toggle');
            return false;
        });

        $(document).click(function(){
            $selectMenu.trigger('hide');
        });
    });
}

// --- Regular expression to check target location of a link// Creating custom :external selector
$.expr[":"].external = function(obj) {
    try {
        return obj.href !== "" 
            &&!obj.href.match(/^mailto\:/)
	        && !(obj.href.indexOf("javascript") == 0)
	        && !(obj.href == "#")
            && (obj.hostname != location.hostname);
    }
    catch (exception) {
	//if this runs on a hyperlink like <a href="http://address@server.com">address@server.com</a> it will throw this exception
        if (exception.message = "A security problem occurred.") {
            return false;
        }
        else {
            throw(exception);
        }
    }
};