$(document).ready(function(){
	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');


	})
	getComments();
	getBlurayNames();

})

function getComments() {
	$.get( "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/htmlcomments", function( data ) {  $( "#comments" ).html( data );});
}

function myFunction() {
    var x = document.getElementById("mySelect").value;
    document.getElementById("demo").innerHTML = "You selected: " + x;
}

function makeSelection(){
	var selection = $('#sel1').val() 
    if(selection == 0){
      getBlurayNames();
    }
    if(selection == 1){
      getBookNames();
    }
}

function registerNewUser(){
	var address = $('#address_area').val();
	var username = $('#username_area').val();
	var password = $('#password_area').val();

	var message = JSON.stringify({"Address":address, "Name":username, "Password":password});


	var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/register";
	var xhr = new XMLHttpRequest();
	xhr.open("POST", uri, true);
	xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8"); 
	xhr.send(message); 
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) { 
			console.log("newUser worked!");
			alert("New User Created");
		} else if(xhr.readyState != 4 && xhr.status != 200){
			console.log("newUser didn't work: "+ xhr.status); 
			alert("New User not Created");
		}
	}


}


function getBlurayNames() {
	var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brlist?orderby=Title"
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.send(null);
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText);
		showBluRay(resp);
	}

}

function searchSite(){
	var selection = $('#sel1').val() 
    if(selection == 0){
      searchBluRay();
    }
    if(selection == 1){
      searchBooks();
    }
}

function searchBluRay(){
	console.log("Here");
	var search = $('#searchBar').val();
	var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brsearch?term=" + search
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.send(null);
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText);
		showBluRay(resp);
	}
}

function searchBooks(){
	var search = $('#searchBar').val();
	var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booksearch?term=" + search
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.send(null);
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText);
		showBooks(resp);
	}
}

function getBookNames() {
	var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booklist?orderby=Title"
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.send(null);
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText);
		showBooks(resp);
	}
	
}

function showBluRay(resp){
	$('#Titles').empty();
	for(var element in resp){
		$('#Titles').append("<tr><td width=\"40%\"><img src='http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brimg?id="+resp[element].Id+"'></td><td idth=\"50%\">" + resp[element].Title + 
			"</td><td><button type='Buy_Button' class='btn btn-default' onclick=\"location.href='http://redsox.tcs.auckland.ac.nz/BC/Closed/Service.svc/brbuy?id="+resp[element].Id+"'\">Buy Now</button></td></tr>\n");
	}
}

function showBooks(resp){
	$('#Titles').empty();
	for(var element in resp){
		$('#Titles').append("<tr><td><img src='http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/bookimg?id="+resp[element].Id+"'></td><td>" + resp[element].Title + 
			"</td><td><button type='Buy_Button' class='btn btn-default' onclick=\"location.href='http://redsox.tcs.auckland.ac.nz/BC/Closed/Service.svc/bookbuy?id="+resp[element].Id+"'\">Buy Now</button></td></tr>\n");
	}
}

function postComment() { 
	var comment = $("#comment_area").val();
	var name = $("#name_area").val();
	var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/comment?name="+name;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", uri, true);
	xhr.setRequestHeader("Content-type", "application/json"); 
	xhr.send(JSON.stringify(comment)); 
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) { 
			console.log("postComments worked!");
			getComments(); 
		} else {
			console.log("postComments didn't work: "+ xhr.status); 
		}
	}
}

function show(shown, hidden1, hidden2) {
	document.getElementById(shown).style.display='block';
	document.getElementById(hidden1).style.display='none';
	document.getElementById(hidden2).style.display='none';
	return false;

}


