const capitilizeWords = (phrase) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
function flipWords(str) {
  var words = [];
  words = str.match(/\S+/g);
  var result = "";
  for (var i =  words.length-1; i >= 0; i--) {
		result += words[i];
		if (i >0 )
			result += " ";
  }
  return result
}

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
		const regex = new RegExp('/\.+');
		for (let i=0; i < json.message.length; i++)
		{
			var breed = json.message[i].replace("https://images.dog.ceo/breeds/","");
			breed = breed.replace(regex, "");
			breed = breed.replace("-", " ");
			breed = capitilizeWords(breed);
			breed = flipWords(breed);
			images += "<div class='brick'><img src='" + json.message[i] + "' title='" + breed + "' /></div>";
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

$(document).ready( function() {
	$('.dropdown-toggle').dropdown();
});


loadDogPicts(20, "");
