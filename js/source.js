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