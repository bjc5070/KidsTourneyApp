//javascript
/*indexedDB.deleteDatabase('')*/
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.msIndexedDB,
	IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange,
	openCopy = indexedDB && indexedDB.open,
	IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.onload = function(){
document.getElementById('Clear').onclick=function(){indexedDB.deleteDatabase('KTDB')};
}
var db,
	currCatfishTop,
	currCrappieTop,
	currPerchTop,
	currBluegillTop,
	pos = 1;
	FakeInfo = [{name: "Brendan Conlon", age: 3, num: 67, bluegill: 0.25, perch: 0.23, crappie: 0, catfish: 2.25},
				{name: "Rich Conlon", age: 4, num: 68, bluegill: 0.21, perch: 0.16, crappie: 0.91, catfish: 0},
				{name: "Ryan Conlon", age: 7, num: 69, bluegill: 0, perch: 0.27, crappie: 1.01, catfish: 0},
				{name: "Andrea Conlon", age: 8, num: 70, bluegill: 0.19, perch: 0.31, crappie: 0.45, catfish: 0.89},
				{name: "Kalla Conlon", age: 11, num: 71, bluegill: 0.20, perch: 0, crappie: 0.67, catfish: 1.23},
				{name: "Dana Conlon", age: 12, num: 72, bluegill: 0.25, perch: 0.17, crappie: 0.34, catfish: 0},
				{name: "Owen Niewodowski", age: 3, num: 73, bluegill: 0.23, perch: 0.31, crappie: 1.05, catfish: 0}
				];

function indexedDBOk() {
    return "indexedDB" in window;
}

document.addEventListener("DOMContentLoaded", function(){
    if(!indexedDBOk) {
        alert('This browser version does not support indexedDB.');
	}
	if(indexedDBOk){
		var openRequest = indexedDB.open("KTDB",1);
		
		openRequest.onupgradeneeded = function(e) {
			var thisDB = e.target.result;
			console.log('upgrade started');
			
			if(!thisDB.objectStoreNames.contains("Contestants")){
				var os = thisDB.createObjectStore("Contestants", { keyPath: 'num' });
				// create indexes
				os.createIndex("age", "age", {unique:false});
				os.createIndex("bluegill", "bluegill", {unique:false});
				os.createIndex("perch", "perch", {unique:false});
				os.createIndex("crappie", "crappie", {unique:false});
				os.createIndex("catfish", "catfish", {unique:false});
			}
			if(!thisDB.objectStoreNames.contains("Winners")){
				var WinnersOS = thisDB.createObjectStore("Winners", { keyPath: 'position' });
				// create indexes
				WinnersOS.createIndex("position","position", {unique:false});
			}
		}
		openRequest.onsuccess = function(e){
			db = e.target.result;	
			console.log('Success!');
			document.getElementById('Add').addEventListener("click", addContestant, false);
			document.getElementById('Update').addEventListener("click", updateContestant, false);
			document.getElementById('Remove').addEventListener("click", removeContestant, false);
			document.getElementById('Everyone').addEventListener("click", getEveryone, false);
			document.getElementById('Baby').addEventListener("click", getBaby, false);
			document.getElementById('Young').addEventListener("click", getYoung, false);
			document.getElementById('Old').addEventListener("click", getOld, false);
			document.getElementById('Populate').addEventListener("click", PopulateFakeData, false);
			document.getElementById('Sort').addEventListener("click", WinnersSort, false);
		}
	}
},false);

function addContestant(e){
	var name = document.getElementById('Name').value,
		age = parseInt(document.getElementById('Age').value, 10),
		num = parseInt(document.getElementById('Num').value, 10),
		bluegill = parseFloat(document.getElementById('Bluegill').value, 10),
		perch = parseFloat(document.getElementById('Perch').value, 10),
		crappie = parseFloat(document.getElementById('Crappie').value, 10),
		catfish = parseFloat(document.getElementById('Catfish').value, 10),
		transaction = db.transaction(["Contestants"],'readwrite'),
		store = transaction.objectStore("Contestants"),
		//define a contestant
		contestant = {
			name:name,
			age:age,
			num:num,
			bluegill:bluegill,
			perch:perch,
			crappie:crappie,
			catfish:catfish,
			removed: false
		},
		//performs add
		request = store.add(contestant);
		
		request.onerror = function(e) {
        console.log("Error",e.target.error.name);
        //some type of error handler
		}
		request.onsuccess = function(e) {
        console.log(name + " added.");
		}
}

function updateContestant(e){
	alert("Are you sure you want to update contestant");
	var name = document.getElementById('Name').value,
		age = parseInt(document.getElementById('Age').value, 10),
		num = parseInt(document.getElementById('Num').value, 10),
		bluegill = parseFloat(document.getElementById('Bluegill').value, 10),
		perch = parseFloat(document.getElementById('Perch').value, 10),
		crappie = parseFloat(document.getElementById('Crappie').value, 10),
		catfish = parseFloat(document.getElementById('Catfish').value, 10),
		transaction = db.transaction(["Contestants"],'readwrite'),
		store = transaction.objectStore("Contestants"),
		//define a contestant
		contestant = {
			name:name,
			age:age,
			num:num,
			bluegill:bluegill,
			perch:perch,
			crappie:crappie,
			catfish:catfish,
			removed: false
		},
		//performs add
		request = store.put(contestant);
}

function removeContestant(e){
	alert('Are you sure you want to remove this entry?');
	var t = db.transaction(["Contestants"], "readwrite"),
		thisId = document.getElementById('NumRemove').value,
		request = t.objectStore("Contestants").delete(thisId);
}

function getEveryone(e){
	var s = '';
	db.transaction(["Contestants"], "readonly").objectStore("Contestants").openCursor().onsuccess = function(e) {
		var cursor = e.target.result;
		if(cursor) {
			s += "<tr>";
			for(var field in cursor.value) {
				if(field === Object.keys(cursor.value)[7]){
					continue;
				}else{
				s+= "<td>"+cursor.value[field]+"</td>";
				}
			}
			s+="</tr>";
			cursor.continue();
		}
		document.querySelector("#DataBody").innerHTML = s;
	}
}

function getBaby(e) {
	var transaction = db.transaction(['Contestants'],'readonly'),
		store = transaction.objectStore('Contestants'),
		index = store.index("age"),
		range = IDBKeyRange.bound(0,5,true,false),
		b = '';

	index.openCursor(range, "prev").onsuccess = function(e){
		var cursor = e.target.result;

			if(cursor){
				b += "<tr>";
				for(var field in cursor.value) {
				if(field === Object.keys(cursor.value)[7]){
					continue;
				}else{
					b+= "<td>"+cursor.value[field]+"</td>";
					}
				}
				b+="</tr>";
				cursor.continue();
			}
		document.querySelector("#DataBody").innerHTML = b;
	}
}

function getYoung(e) {
	var transaction = db.transaction(['Contestants'],'readonly'),
		store = transaction.objectStore('Contestants'),
		index = store.index("age"),
		range = IDBKeyRange.bound(5,10,true,false),
		y = '';

	index.openCursor(range, "prev").onsuccess = function(e){
		var cursor = e.target.result;

			if(cursor){
				y += "<tr>";
				for(var field in cursor.value) {
				if(field === Object.keys(cursor.value)[7]){
					continue;
				}else{
					y+= "<td>"+cursor.value[field]+"</td>";
					}
				}
				y+="</tr>";
				cursor.continue();
			}
		document.querySelector("#DataBody").innerHTML = y;
	}
}

function getOld(e) {
	var transaction = db.transaction(['Contestants'],'readonly'),
		store = transaction.objectStore('Contestants'),
		index = store.index("age"),
		range = IDBKeyRange.bound(10,15,true,false),
		o = '';

	index.openCursor(range, "prev").onsuccess = function(e){
		var cursor = e.target.result;
			if(cursor){
				o += "<tr>";
				for(var field in cursor.value) {
				if(field === Object.keys(cursor.value)[7]){
					continue;
				}else{
					o+= "<td>"+cursor.value[field]+"</td>";
					}
				}
				o+="</tr>";
				cursor.continue();
			}
		document.querySelector("#DataBody").innerHTML = o;
	}
}

function PopulateFakeData(e){
	var FakeData = FakeInfo;
	for(var i in FakeData){
		var name = FakeInfo[i].name,
		age = FakeInfo[i].age,
		num = FakeInfo[i].num,
		bluegill = FakeInfo[i].bluegill,
		perch = FakeInfo[i].perch,
		crappie = FakeInfo[i].crappie,
		catfish = FakeInfo[i].catfish,
		transaction = db.transaction(["Contestants"],'readwrite'),
		store = transaction.objectStore("Contestants"),
		//define a contestant
		contestant = {
			name:name,
			age:age,
			num:num,
			bluegill:bluegill,
			perch:perch,
			crappie:crappie,
			catfish:catfish,
			removed: false
		},
		//performs add
		request = store.add(contestant);
	}
	console.log('Fake Data Populated');
}

function addToWinners(entry){
	var winnersTransaction = db.transaction(['Winners'],'readwrite'),
		WinnersStore = winnersTransaction.objectStore("Winners"),
		WinnersRequest = WinnersStore.put(entry);
}

function WinnersSort(e){
	var winnersTransaction = db.transaction(['Winners'],'readwrite'),
		WinnersStore = winnersTransaction.objectStore("Winners"),
		transaction = db.transaction(['Contestants'],'readonly'),
		store = transaction.objectStore('Contestants'),
		catfishIndx = store.index("catfish"),
		crappieIndx = store.index("crappie"),
		perchIndx = store.index("perch"),
		bluegillIndx = store.index("bluegill");
		
/*---------------- CATFISH CURSORS START ----------------*/
	var oldCatfishSort = function (){
		var catfishLength = catfishIndx.count();
		catfishIndx.openCursor(undefined,"prev").onsuccess = function(e) {
			var cursor = e.target.result;
			
			if(cursor){
				if(cursor.value.removed === false && cursor.value.age > 10 && cursor.value.age <= 15 && cursor.value.catfish > 0){
					cursor.value.removed = true;
					cursor.value.position = pos;
					currCatfishTop = cursor.value;
					pos++;
					addToWinners(currCatfishTop);
				}
			console.log(cursor.value);
			console.log("old");
			cursor.continue();
			}
		}
	}
	
	var youngCatfishSort = function (){
		catfishIndx.openCursor(undefined,"prev").onsuccess = function(e) {
			var cursor = e.target.result;
			if(cursor){
				if(cursor.value.removed === false && cursor.value.age > 5 && cursor.value.age <= 10 && cursor.value.catfish > 0){
					cursor.value.removed = true;
					cursor.value.position = pos;
					currCatfishTop = cursor.value;
					pos++;
					addToWinners(currCatfishTop);
				}
			console.log(cursor.value);
			console.log('young');
			cursor.continue();
			}
		}
	}

	var babyCatfishSort = function (){
		catfishIndx.openCursor(undefined,"prev").onsuccess = function(e) {
			var cursor = e.target.result;
			if(cursor){
				if(cursor.value.removed === false && cursor.value.age > 0 && cursor.value.age <= 5 && cursor.value.catfish > 0){
					cursor.value.removed = true;
					cursor.value.position = pos;
					currCatfishTop = cursor.value;
					pos++;
					addToWinners(currCatfishTop);
				}
			console.log(cursor.value);
			console.log("baby");
			cursor.continue();
			}
		}
	}
	/*catfishIndx.openCursor(undefined,"prev").onsuccess = function(e) {
		var cursor = e.target.result;
		if(cursor){
			if(cursor.value.removed === false){
				cursor.value.removed = true;
				cursor.value.position = pos;
				currCatfishTop = cursor.value;
				pos++;
				addToWinners(currCatfishTop);
			}
		cursor.continue();
		}
	}*/
/*---------------- CATFISH CURSORS END ----------------
******************************************************
/*---------------- CRAPPIE CURSOR START ----------------*/
	crappieIndx.openCursor(undefined,"prev").onsuccess = function(e) {
		var cursor = e.target.result;
		if(cursor){
			for(var field in cursor.value){
				//console.log(cursor.value);
			}
		cursor.continue();
		}
	}
/*---------------- CRAPPIE CURSOR END ----------------
******************************************************
/*---------------- PERCH CURSOR START ----------------*/
	perchIndx.openCursor(undefined,"prev").onsuccess = function(e) {
		var cursor = e.target.result;
		if(cursor){
			for(var field in cursor.value){
				//console.log(cursor.value);
			}
		cursor.continue();
		}
	}
/*---------------- PERCH CURSOR END ----------------
******************************************************
/*---------------- BLUEGILL CURSOR START ----------------*/
	bluegillIndx.openCursor(undefined,"prev").onsuccess = function(e) {
		var cursor = e.target.result;
		if(cursor){
			for(var field in cursor.value){
				//console.log(cursor.value);
			}
		cursor.continue();
		}
	}
/*---------------- BLUEGILL CURSOR END ----------------*/

oldCatfishSort();
//youngCatfishSort();
//babyCatfishSort();
console.log('Winners Sorted');
}