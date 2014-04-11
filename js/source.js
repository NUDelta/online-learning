/*


	Choose_one javascript functions


*/

function selectImage(image){
	$(".darkClass").removeClass("darkClass");
	$(".selected-image").removeClass("selected-image");

	$("#" + image).addClass("selected-image");
	if(image == "image1"){
		$("#image2").addClass("darkClass");
	} else {
		$("#image1").addClass("darkClass");
	}

	//clear selected options for following questions
	$(".active").removeClass("active");
	$("#label-alignment").fadeOut("slow");
	$("#reasoning").fadeOut("slow");
	$("#submit").fadeOut("slow");

	//display selection options
	$("#label-alignment").fadeIn("slow", function(){
		$("html, body").animate({ scrollTop: $(document).height() }, 1500);

	});

}

function selectLabelAlignment(object){
	$(".label-alignment-selection .active").removeClass("active");
	$(object).addClass("active");

	$("#reasoning").fadeIn("slow", function(){
		$("html, body").animate({ scrollTop: $(document).height() }, 1500);
	});
}

function selectFactors(object){
	if($(object).hasClass("active")){
		$(object).removeClass("active");
	} else {
		$(object).addClass("active");
	}

	$("#submit").show("slow", function(){
		$("html, body").animate({ scrollTop: $(document).height() }, 1500);
	});
}


/*


	Sliding button


*/

function updateButton(sliderPosition){
	$("#button-image").css("margin-left", sliderPosition*6);
	$("#submit").fadeIn("slow");
}

/*


	Single Rank 1


*/

function switchGrey(){
	var grey1 = $(".grey1");
	var grey2 = $(".grey2");
	var highlighted1 = $(".highlighted1");
	var highlighted2 = $(".highlighted2");
	if($(grey1).css("display") == "block"){
		$(grey1).fadeOut("slow");
		$(grey2).fadeIn("slow");
		$(highlighted1).fadeIn("slow");
		$(highlighted2).fadeOut("slow");
		$("#goHome").fadeOut("slow");
	} else {
		$(grey1).fadeIn("slow");
		$(grey2).fadeOut("slow");
		$(highlighted1).fadeOut("slow");
		$(highlighted2).fadeIn("slow");
		$("#goHome").fadeIn("slow");
	}
}

function thumbs(object){
	if($(object).hasClass("selected-icon")){
		$(object).removeClass("selected-icon");
	} else {
		$(object).siblings().removeClass("selected-icon");
		$(object).addClass("selected-icon");
	}
}

function thumbsDown(object){
	if($(object).hasClass("selected-icon")){
		$(object).removeClass("selected-icon");
	} else {
		$(object).siblings().removeClass("selected-icon");
		$(object).addClass("selected-icon");
	}
}

function nextArea(){
	$(".selected-icon").removeClass("selected-icon");
	switchGrey();
}

///Second ranked example

function switchGrey2(){
	var grey1 = $(".grey1-part2");
	var grey2 = $(".grey2-part2");
	var grey21 = $(".grey2-1-part2");
	var grey3 = $(".grey3-part2");
	var highlighted1 = $(".highlighted1-part2");
	var highlighted2 = $(".highlighted2-part2");
	var highlighted3 = $(".highlighted3-part2");

	if($(grey1).css("display") == "block"){
		//move to second part
		$(grey1).fadeOut("slow");
		$(grey2).fadeIn("slow");
		$(grey21).fadeIn("slow");
		$(highlighted1).fadeOut("slow");
		$(highlighted2).fadeIn("slow");
	} else if($(grey2).css("display") == "block"){
		// move to third part
		$(grey2).fadeOut("slow");
		$(grey21).fadeOut("slow");
		$(grey3).fadeIn("slow");
		$(highlighted2).fadeOut("slow");
		$(highlighted3).fadeIn("slow");
		$("#goHome").fadeIn("slow");
	} else {
		// move to first part
		$(grey3).fadeOut("slow");
		$(grey1).fadeIn();
		$(highlighted3).fadeOut("slow");
		$(highlighted1).fadeIn("slow");
		$("#goHome").fadeOut("slow");
	}
}

function nextArea2(){
	$(".selected-icon").removeClass("selected-icon");
	switchGrey2();
}





