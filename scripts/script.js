function loadDogPicts(numPicts, dogbreed)
{
	console.log("Load Dog Picts" + dogbreed);
	let url = "https://dog.ceo/api/";
	if (numPicts <= 0)
	{
		console.log("Stranger error, num requested picts is less than 0");
	}

	if (dogbreed === "")
	{
		url += "breeds/image/random";
	}
	else
	{
		url += "breed/" + dogbreed + "/image/random";
	}
	url += "/" + numPicts;
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		console.log(json);
		let images = "";
		for (let i=0; i < json.message.length; i++)
		{
			images += "<div class='brick'><img src='" + json.message[i] + "' /></div>";
		}
		document.getElementById("masonry").innerHTML = images;
	});
}

function getDogBreedList()
{
	let url = "https://dog.ceo/api/breeds/list/all";
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		console.log(json);
	});
}


loadDogPicts(20, "");
