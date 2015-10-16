$(document).ready(function(){
	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');

		getComments();
	})

})

function getComments() {
	var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/htmlcomments";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.onload = function() {
		var resp = JSON.parse(xhr.responseText);
		document.getElementById('span').innerHTML=resp.value;
	}
	xhr.send(null);
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


