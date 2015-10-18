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

function getBlurayNames() {
//	if($("#sel1").val() == "Blurays"){
	var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brlist?orderby=Title"
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.send(null);
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText);
		showNames(resp);
	}

}

function getBookNames() {
//	if($("#sel1").val() == "Blurays"){
	var uri = "Service at http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booklist?orderby=Title"
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.send(null);
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText);
		showNames(resp);
	}
	
}

function showNames(resp){
	console.log("working");
	console.log(resp);
	for(var element in resp){
		$('#Titles').append("<tr><td>" + resp[element].Title + "</td><td>Boop</td><td>Boop</td></tr>\n");
	}
}

function getDestinations() {
	var uri = "http://services.odata.org/Northwind/Northwind.svc/Orders?orderby=OrderID&$select=OrderID,ShipName,ShipAddress,ShipCity,ShipPostalCode,ShipCountry&$format=json";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText);
		showDestinations(resp.value);
	}
	xhr.send(null);
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

function showDestinations(dest) {
	var tableContent = "<tr class='orderTitle'><td>Order Id</td><td>Destination</td></tr>\n";
	for (var i = 0; i < dest.length; ++i) {
		var record = dest[i];
		var addrs = record.ShipName + ", " + record.ShipAddress + ", " + record.ShipCity + ", " + record.ShipPostalCode + ", " + record.ShipCountry;
      if (i & 1 == 1) { // odd row
      	tableContent += "<tr class='orderOdd'>";
      }
      else { // even row
      	tableContent += "<tr class='orderEven'>";
      }
      tableContent += "<td>" + record.OrderID + "</td><td>" + addrs + "</td></tr>\n";
  }
  document.getElementById("showTab").innerHTML = tableContent;
}

function show(shown, hidden1, hidden2) {
	document.getElementById(shown).style.display='block';
	document.getElementById(hidden1).style.display='none';
	document.getElementById(hidden2).style.display='none';
	return false;

}


