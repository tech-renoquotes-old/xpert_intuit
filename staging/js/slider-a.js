/* slider-a ; ie9+ ; Paul Tanase */
function slider_a_see_prev(bo){
	var parent2=$(bo).closest(".viewport"), parent3=parent2.parent(), vpw=parent2.width(), duration=parseInt(1000*vpw/(parent3.data('px-per-sec'))) || 1000, n=parent3.data('nb') || 1, parent=parent2.find(".viewport2");
	
	if (!parent.hasClass("on")){
		parent.addClass("on");
		clearTimeout(parent3.data('clear'));
		
		var sel=".slide:eq(0),.slide:eq(1),.slide:eq(2),.slide:eq(-2)";
		switch(n){
			case 4:
				sel=".slide:eq(0),.slide:eq(1),.slide:eq(2)";
				break;
			case 3:
				sel=".slide:eq(0),.slide:eq(1)";
				break;
			case 2:
				sel=".slide:eq(0)";
				break;
			case 1:
				break;
			default :
				parent.find(".before-last").removeClass("before-last");
				parent.find(".slide:eq(-2)").addClass("before-last");
		}
		
		parent.find(sel).animate(
			{
				left:'+='+(vpw)+'px'
			},
			duration,
			"easeInOutQuart",
			function(){
				$(this).removeAttr("style");
			}
		);
		parent.find(".slide:eq(-1)").animate(
			{
				left:'+='+(vpw)+'px'
			},
			duration,
			"easeInOutQuart",
			function(){
				$(this).prependTo(parent).removeAttr("style");
				if(n>4){
					parent.find(".before-last").removeClass("before-last").prev().addClass("before-last");
				}
				parent.removeClass("on");
				parent2.find(".control a").filter('.on').removeClass('on').end().eq(parent.find('.slide:first').data('idx')).addClass('on');
				slider_a_anim(parent3,'prev');
			}
		);
	}
}

function slider_a_see_next(bo){
	var parent2=$(bo).closest(".viewport"), parent3=parent2.parent(), vpw=parent2.width(), duration=parseInt(1000*vpw/(parent3.data('px-per-sec'))) || 1000, n=parent3.data('nb') || 1, parent=parent2.find(".viewport2");
	
	if (!parent.hasClass("on")){
		parent.addClass("on");
		clearTimeout(parent3.data('clear'));
		
		var sel=".slide:eq(1),.slide:eq(2),.slide:eq(-2),.slide:eq(-1)";
		switch(n){
			case 4:
				sel=".slide:eq(1),.slide:eq(2),.slide:eq(-1)";
				break;
			case 3:
				sel=".slide:eq(1),.slide:eq(2)";
				break;
			case 2:
				sel=".slide:eq(1)";
				break;
			case 1:
				break;
			default :
				parent.find(".before-last").removeClass("before-last");
				parent.find(".slide:eq(-2)").addClass("before-last");
		}
		
		parent.find(".slide:eq(0)").animate(
			{
				left:'-='+(vpw)+'px'
			},
			duration,
			"easeInOutQuart",
			function(){
				$(this).appendTo(parent).removeAttr("style");
				if(n>4){
					parent.find(".before-last").removeClass("before-last").next().addClass("before-last");
				}
				parent.removeClass("on");
				parent2.find(".control a").filter('.on').removeClass('on').end().eq(parent.find('.slide:first').data('idx')).addClass('on');
				slider_a_anim(parent3,'next');
			}
		);
		parent.find(sel).animate(
			{
				left:'-='+(vpw)+'px'
			},
			duration,
			"easeInOutQuart",
			function(){
				$(this).removeAttr("style");
			}
		);
	}
}

function slider_a_see_one(bo){
	var parent2=$(bo).closest(".viewport"), parent3=parent2.parent(), n=parent3.data('nb') || 1, parent=parent2.find(".viewport2"), slides=parent.find(".slide");
	
	if (!parent.hasClass("on")){
		parent.addClass("on");
		clearTimeout(parent3.data('clear'));
		parent2.find(".control a").filter('.on').removeClass('on');
		$(bo).addClass('on');
		
		for(var i=0; i<n; i++){
			if(slides.eq(i).data('idx')!=$(bo).index()){
				parent.append(slides.eq(i));
			}else{
				break;
			}
		}
		parent.find(".before-last").removeClass("before-last");
		parent.find(".slide:eq(-2)").addClass("before-last");
		parent.removeClass("on");
		slider_a_anim(parent3,'next');
	}
}

function slider_a_anim(p,d){
	p.data('clear', setTimeout(
		function(){
			p.find(".see."+d).click();
		},
		p.data('delay') || 5000
	));
}
	
(function($){
  $.fn.slider_a = function() {
    this.each(function() {
		var ob=$(this),ob2=$(this).find('.viewport'), ob3=ob2.parent(), n=ob2.find('.slide').length;
		if(!ob.hasClass("active")){
			ob.addClass("active");
			ob3.data({'nb':n,'clear':0});
			if (n>1){
				ob2.append("<a class='see prev' href='javascript:void(0);' onclick='slider_a_see_prev(this);'><img src='/widgets/images_src/slider-arrow-left2.png' /></a>");
				ob2.append("<a class='see next' href='javascript:void(0);' onclick='slider_a_see_next(this);'><img src='/widgets/images_src/slider-arrow-right2.png' /></a>");
				ob2.append("<div class='control'></div>");
				for(var i=0; i<n; i++){
					ob2.find('.slide:eq('+i+')').data('idx',i);
					if (n>4){ob2.find(".slide:eq(-2)").addClass("before-last");}
					ob2.find('.control').append("<a href='javascript:void(0);' onclick='slider_a_see_one(this);'"+(i==0?" class='on'":"")+"></a>");
				}
				if (typeof $.fn.swipe ==='function'){
					ob2.find('.slide').swipe({
						swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
							if (direction=="right"){
								slider_a_see_prev($(this).closest('.viewport').find('.prev'));
							}else if (direction=="left"){
								slider_a_see_next($(this).closest('.viewport').find('.next'));
							}		
						}
						, allowPageScroll: "vertical"
					});
				}
				slider_a_anim(ob3,'next');
			}
		}
    });
  };
})(jQuery);