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

function createDogbreedRequestFromHtml(html)
{
  var words = [];
  words = html.match(/\S+/g);
  var result = "";
  for (var i = words.length-1; i >=0; i--)
  {
    result += words[i];
    if (i >0)
      result += "/";
  }
  return result;
}

function loadDogPicts(numPicts, dogbreed)
{
	console.log("Load Dog Picts" + dogbreed);
	let url = "https://dog.ceo/api/";
	if (numPicts <= 0)
	{
		console.log("Stranger error, num requested picts is less than 0");
	}

	if (dogbreed === "" || dogbreed === "random")
	{
		url += "breeds/image/random";
	}
	else
	{
		url += "breed/" + dogbreed + "/images/random";
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

function addColumnIfNeeded(itemCount)
{
	const maxItems = 17;
	if (itemCount % maxItems === 0)
	{
		return "</div><div class='dropdown-col'>"
	}
	else
	{
		return "";
	}
}

function getDogBreedList()
{
	let url = "https://dog.ceo/api/breeds/list/all";
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		console.log(json);

		let breedList = "<div class='dropdown-col'><li><a class='dropdown-item' href='#'>random</a></li>";
		let itemCount = 0;
		for (const prop in json.message)
		{
			if (json.message[prop].length == 0)
			{
				breedList += "<li><a class='dropdown-item' href='#'>" + prop + "</a></li>";
			}
			else
			{
        for (let i=0; i < json.message[prop].length; ++i)
        {
				      breedList += "<li><a class='dropdown-item' href='#'>" + json.message[prop][i] + " " + prop + "</a></li>";
        }
			}
		}
		breedList +="</ul>";
		document.getElementById("BreedList").innerHTML = breedList;
	});
}

$(document).ready( function() {
	$('.dropdown-toggle').dropdown();
});




loadDogPicts(20, "");
getDogBreedList();


//Adding a listener based on a class
var base = document.querySelector('#BreedList');
var selector = '.dropdown-item';
base.addEventListener('click', function(event)
{
  var closest = event.target.closest(selector);
  if (closest && base.contains(closest)) {
    // handle class event;
    console.log(closest.innerHTML);
    document.getElementById("navbarDropdownMenuLink").innerHTML = closest.innerHTML;
    loadDogPicts(20, createDogbreedRequestFromHtml(closest.innerHTML));
  }
});
