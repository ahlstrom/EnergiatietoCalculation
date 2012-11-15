function profilePrinter(profile, outputTarget) {
			
	var hour;
	var output = "";

	for(hour=0;hour<profile.profile.length;hour++) {
		output += profile.profile[hour] + "<br>";
	}

	document.getElementById(outputTarget).innerHTML = output;
}