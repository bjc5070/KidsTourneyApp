//Javascript
/* Lovefield.js Database project for BBC Kids Tournament */
window.onload = function(){
	document.getElementById('Clear').onclick=function(){indexedDB.deleteDatabase('KTDB_LF');localStorage.clear();};
	document.getElementById('Add').addEventListener("click", addContestant, false);
	document.getElementById('Update').addEventListener("click", updateContestant, false);
	document.getElementById('Remove').addEventListener("click", removeContestant, false);
	document.getElementById('Everyone').addEventListener("click", getEveryone, false);
	document.getElementById('Populate').addEventListener("click", PopulateFakeData, false);
	// document.getElementById('Baby').addEventListener("click", getBaby, false);
	// document.getElementById('Young').addEventListener("click", getYoung, false);
	// document.getElementById('Old').addEventListener("click", getOld, false);
	// document.getElementById('bluegillOld').addEventListener("click", sortBluegillOld, false);
	document.getElementById('Create').addEventListener("click", CreateDataSets, false);
	//document.getElementById('Test').addEventListener("click", function (){RemoveZeros('CatBaby', CatBaby, 'catfish');}, false);
	document.getElementById('Test').addEventListener("click", RankSpeciesZerosAll, false);
	document.getElementById('Build').addEventListener("click", buildWinnersAll, false);
}
//schema creation
var schemaBuilder = lf.schema.create('KTDB_LF',1),
//Fake test data
	FakeInfo = [{Contestant: "Brendan Conlon", age: 3, num: 75, bluegill: 0.25, perch: 0.23, crappie: 0, catfish: 2.25},
				{Contestant: "Rich Conlon", age: 4, num: 68, bluegill: 0.21, perch: 0.16, crappie: 0.91, catfish: 0},
				{Contestant: "Ryan Conlon", age: 7, num: 69, bluegill: 0, perch: 0.27, crappie: 1.01, catfish: 0},
				{Contestant: "Andrea Conlon", age: 8, num: 70, bluegill: 0.19, perch: 0.31, crappie: 0.45, catfish: 0.89},
				{Contestant: "Kalla Conlon", age: 11, num: 71, bluegill: 0.20, perch: 0, crappie: 0.67, catfish: 1.23},
				{Contestant: "Dana Conlon", age: 12, num: 72, bluegill: 0.25, perch: 0.17, crappie: 0.34, catfish: 0},
				{Contestant: "Owen Niewodowski", age: 3, num: 73, bluegill: 0.23, perch: 0.31, crappie: 1.05, catfish: 0},
				{Contestant: "Levi Belch", age: 12, num: 60, bluegill: 0.2, perch: 0.23, crappie: 0, catfish: 1.25}
				],
	db,
	Kids;

schemaBuilder.createTable('Contestants')
	.addColumn('Contestant', lf.Type.STRING)
	.addColumn('age', lf.Type.NUMBER)
	.addColumn('num', lf.Type.NUMBER)
	.addColumn('bluegill', lf.Type.INTEGER)
	.addColumn('perch', lf.Type.INTEGER)
	.addColumn('crappie', lf.Type.INTEGER)
	.addColumn('catfish', lf.Type.INTEGER)
	.addPrimaryKey(['num'])
	.addIndex('OrderByAge', ['age'], false, lf.Order.ASC);

schemaBuilder.connect().then(function(dbInstance){
	db = dbInstance;
});
function addContestant(){
	console.log('addContenstant started');
	var contestant = document.getElementById('Name').value,
		age = parseInt(document.getElementById('Age').value, 10),
		num = parseInt(document.getElementById('Num').value, 10),
		bluegill = parseFloat(document.getElementById('Bluegill').value, 10),
		perch = parseFloat(document.getElementById('Perch').value, 10),
		crappie = parseFloat(document.getElementById('Crappie').value, 10),
		catfish = parseFloat(document.getElementById('Catfish').value, 10);
		kids = db.getSchema().table('Contestants'),
		newContestant = kids.createRow({
			'Contestant':contestant,
			'age':age,
			'num':num,
			'bluegill':bluegill,
			'perch':perch,
			'crappie':crappie,
			'catfish':catfish
		});
		//performs add
		return db.insert().into(kids).values([newContestant]).exec();
		alert('contestant added');
};

function updateContestant(){
	alert("Are you sure you want to update contestant");
	var contestant = document.getElementById('Name').value,
		age = parseInt(document.getElementById('Age').value, 10),
		num = parseInt(document.getElementById('Num').value, 10),
		bluegill = parseFloat(document.getElementById('Bluegill').value, 10),
		perch = parseFloat(document.getElementById('Perch').value, 10),
		crappie = parseFloat(document.getElementById('Crappie').value, 10),
		catfish = parseFloat(document.getElementById('Catfish').value, 10),
		kids = db.getSchema().table('Contestants'),
		//define a contestant
		updatedContestant = kids.createRow({
			'Contestant':contestant,
			'age':age,
			'num':num,
			'bluegill':bluegill,
			'perch':perch,
			'crappie':crappie,
			'catfish':catfish
		});
		//performs add
		return db.insertOrReplace().into(kids).values([updatedContestant]).exec();
}

function removeContestant(){
	alert('Are you sure you want to remove this entry?');
	var thisId = document.getElementById('NumRemove').value,
		kids = db.getSchema().table('Contestants');
	db.delete().from(kids).where(kids.num.eq(thisId)).exec();
}

function PopulateFakeData(){
	kids = db.getSchema().table('Contestants');

	for(var i in FakeInfo) {
		var row = kids.createRow({
		'Contestant' : FakeInfo[i].Contestant,
		'age'  : FakeInfo[i].age, 
		'num'  : FakeInfo[i].num, 
		'bluegill': FakeInfo[i].bluegill, 
		'perch': FakeInfo[i].perch, 
		'crappie': FakeInfo[i].crappie, 
		'catfish': FakeInfo[i].catfish
		});
		db.insertOrReplace().into(kids).values([row]).exec();
	}
}

function getEveryone(){
	var kids = db.getSchema().table('Contestants'),
		s = '';
	db.select().from(kids).exec().then(function(results) {
		results.forEach(function(row) {
			s += "<tr>";
			for(var field in row){
				s += "<td>" + row[field] + "</td>";
			}
			s += "</tr>";
		});
		document.querySelector("#DataBody").innerHTML = s;
	});
}

// function getBaby() {
// 	var kids = db.getSchema().table('Contestants'),
// 		s = '';
// 	db.select().from(kids).where(kids.age.between(0,5)).orderBy(kids.num, lf.Order.ASC).exec().then(function(results) {
// 		results.forEach(function(row) {
// 			s += "<tr>";
// 			for(var field in row){
// 				s += "<td>" + row[field] + "</td>";
// 			}
// 			s += "</tr>";
// 		});
// 		document.querySelector("#DataBody").innerHTML = s;
// 	});	
// }

// function getYoung() {
// 	var kids = db.getSchema().table('Contestants'),
// 		s = '';
// 	db.select().from(kids).where(kids.age.between(5,10)).orderBy(kids.num, lf.Order.ASC).exec().then(function(results) {
// 		results.forEach(function(row) {
// 			s += "<tr>";
// 			for(var field in row){
// 				s += "<td>" + row[field] + "</td>";
// 			}
// 			s += "</tr>";
// 		});
// 		document.querySelector("#DataBody").innerHTML = s;
// 	});	
// }

// function getOld() {
// 	var kids = db.getSchema().table('Contestants'),
// 		s = '';
// 	db.select().from(kids).where(kids.age.between(10,15)).orderBy(kids.num, lf.Order.ASC).exec().then(function(results) {
// 		results.forEach(function(row) {
// 			s += "<tr>";
// 			for(var field in row){
// 				s += "<td>" + row[field] + "</td>";
// 			}
// 			s += "</tr>";
// 		});
// 		document.querySelector("#DataBody").innerHTML = s;
// 	});	
// }

// function sortBluegillOld() {
// 	var kids = db.getSchema().table('Contestants'),
// 		s = '';
// 	db.select().from(kids).where(kids.age.between(10,15)).orderBy(kids.bluegill, lf.Order.DESC).exec().then(function(results) {
// 		results.forEach(function(row) {
// 			s += "<tr>";
// 			for(var field in row){
// 				s += "<td>" + row[field] + "</td>";
// 			}
// 			s += "</tr>";
// 		});
// 		document.querySelector("#DataBody").innerHTML = s;
// 	});	
// }

var CatBaby = [],
	CatYoung = [],
	CatOld = [],
	CrappieBaby = [],
	CrappieYoung = [],
	CrappieOld = [],
	PerchBaby = [],
	PerchYoung = [],
	PerchOld = [],
	BlueBaby = [],
	BlueYoung = [],
	BlueOld = [],
	CatBabyZeros = [],
	CatYoungZeros = [],
	CatOldZeros = [],
	CrappieBabyZeros = [],
	CrappieYoungZeros = [],
	CrappieOldZeros = [],
	PerchBabyZeros = [],
	PerchYoungZeros = [],
	PerchOldZeros = [],
	BlueBabyZeros = [],
	BlueYoungZeros = [],
	BlueOldZeros = [],
	BabyFiltered = [],
	YoungFiltered = [],
	OldFiltered = [];

function CreateDataSets() {
	var kids = db.getSchema().table('Contestants'),
    	data1 = db.select().from(kids).where(kids.age.between(0,5)).orderBy(kids.catfish, lf.Order.DESC).exec().then(function(rows){
    		CatBaby.push(rows);
    	}),
    	data2 = db.select().from(kids).where(kids.age.between(5,10)).orderBy(kids.catfish, lf.Order.DESC).exec().then(function(rows){
    		CatYoung.push(rows);
    	}),
    	data3 = db.select().from(kids).where(kids.age.between(10,15)).orderBy(kids.catfish, lf.Order.DESC).exec().then(function(rows){
    		CatOld.push(rows);
    	}),
    	data4 = db.select().from(kids).where(kids.age.between(0,5)).orderBy(kids.crappie, lf.Order.DESC).exec().then(function(rows){
    		CrappieBaby.push(rows);
    	}),
    	data5 = db.select().from(kids).where(kids.age.between(5,10)).orderBy(kids.crappie, lf.Order.DESC).exec().then(function(rows){
    		CrappieYoung.push(rows);
    	}),
    	data6 = db.select().from(kids).where(kids.age.between(10,15)).orderBy(kids.crappie, lf.Order.DESC).exec().then(function(rows){
    		CrappieOld.push(rows);
    	}),
    	data7 = db.select().from(kids).where(kids.age.between(0,5)).orderBy(kids.perch, lf.Order.DESC).exec().then(function(rows){
    		PerchBaby.push(rows);
    	}),
    	data8 = db.select().from(kids).where(kids.age.between(5,10)).orderBy(kids.perch, lf.Order.DESC).exec().then(function(rows){
    		PerchYoung.push(rows);
    	}),
    	data9 = db.select().from(kids).where(kids.age.between(10,15)).orderBy(kids.perch, lf.Order.DESC).exec().then(function(rows){
    		PerchOld.push(rows);
    	}),
    	data10 = db.select().from(kids).where(kids.age.between(0,5)).orderBy(kids.bluegill, lf.Order.DESC).exec().then(function(rows){
    		BlueBaby.push(rows);
    	}),
    	data11 = db.select().from(kids).where(kids.age.between(5,10)).orderBy(kids.bluegill, lf.Order.DESC).exec().then(function(rows){
    		BlueYoung.push(rows);
    	}),
    	data12 = db.select().from(kids).where(kids.age.between(10,15)).orderBy(kids.bluegill, lf.Order.DESC).exec().then(function(rows){
    		BlueOld.push(rows);
    	});
    	console.log('Data Sets Created');
}

/*
GroupName is a string to reference global variable
GroupData is value of passed variable associated with GroupName
PropName is property being filtered
*/
/*http://www.sitepoint.com/sophisticated-sorting-in-javascript/
Sophisticated Sorting reference*/

var  RankSpeciesZeros = function (GroupName, GroupData, PropName){
	var GroupZeroStore = GroupName + 'Zeros',
	    GroupDataArray = GroupData[0];
	    console.log(GroupDataArray);
	    console.log(GroupName);
	GroupDataArray.forEach(function(value, index){
    	value.rank = index + 1;
    	value.species = PropName;
    });
	for(i = GroupDataArray.length -1; i >= 0; i--){
		if(GroupDataArray[i][PropName] === 0){
			window[GroupZeroStore].push(GroupDataArray[i]);
			/*window requires a string*/
			window[GroupName][0].splice(i,1);
		}
	};
	console.log(GroupName + ' ' + PropName + ' Zeros removed');
	/*Stores data locally*/
	localStorage.setItem(GroupName, JSON.stringify(GroupDataArray));
};
function RankSpeciesZerosAll(){
	RankSpeciesZeros('CatBaby', CatBaby, 'catfish');
	RankSpeciesZeros('CatYoung', CatYoung, 'catfish');
	RankSpeciesZeros('CatOld', CatOld, 'catfish');
	RankSpeciesZeros('CrappieBaby', CrappieBaby, 'crappie');
	RankSpeciesZeros('CrappieYoung', CrappieYoung, 'crappie');
	RankSpeciesZeros('CrappieOld', CrappieOld, 'crappie');
	RankSpeciesZeros('PerchBaby', PerchBaby, 'perch');
	RankSpeciesZeros('PerchYoung', PerchYoung, 'perch');
	RankSpeciesZeros('PerchOld', PerchOld, 'perch');
	RankSpeciesZeros('BlueBaby', BlueBaby, 'Bluegill');
	RankSpeciesZeros('BlueYoung', BlueYoung, 'Bluegill');
	RankSpeciesZeros('BlueOld', BlueOld, 'Bluegill');
}

/******************************************************
 build sorting functionality here to finish app
 add Zeros back in
 ******************************************************/
function buildWinnersByAge(fishByAge, ageGroup, ageTable){
	var unfilteredAgeGroup = [];
	fishByAge.forEach(function(currentValue){
		currentValue.forEach(function(cV2){
			unfilteredAgeGroup.push(cV2);
		});
	});
	/*remove duplicates*/
	for(i=0; i<=unfilteredAgeGroup.length-1; i++){
		var cV3 = unfilteredAgeGroup[i].Contestant;
		for(k=i+1; k<unfilteredAgeGroup.length-1; k++){
			if(cV3 === unfilteredAgeGroup[k].Contestant){
				unfilteredAgeGroup.splice(k,1);
			}
		}
	}
	/*still  leaves last index in array*/
 	ageGroup = unfilteredAgeGroup;
	console.log(ageGroup);
	var s = '';
	ageGroup.forEach(function(row) {
			s += "<tr>";
			for(var field in row){
				s += "<td>" + row[field] + "</td>";
			}
			s += "</tr>";
		});
		document.querySelector("#Data"+ ageTable).innerHTML = s;
}
function buildWinnersAll(){
	var CatBabyLocal = JSON.parse(localStorage["CatBaby"]),
		CatYoungLocal = JSON.parse(localStorage["CatYoung"]),
		CatOldLocal = JSON.parse(localStorage["CatOld"]),
		CrappieBabyLocal = JSON.parse(localStorage["CrappieBaby"]),
		CrappieYoungLocal = JSON.parse(localStorage["CrappieYoung"]),
		CrappieOldLocal = JSON.parse(localStorage["CrappieOld"]),
		PerchBabyLocal = JSON.parse(localStorage["PerchBaby"]),
		PerchYoungLocal = JSON.parse(localStorage["PerchYoung"]),
		PerchOldLocal = JSON.parse(localStorage["PerchOld"]),
		BlueBabyLocal = JSON.parse(localStorage["BlueBaby"]),
		BlueYoungLocal = JSON.parse(localStorage["BlueYoung"]),
		BlueOldLocal = JSON.parse(localStorage["BlueOld"]);

	buildWinnersByAge([CatBabyLocal,CrappieBabyLocal,PerchBabyLocal,BlueBabyLocal], BabyFiltered,'Baby');
	buildWinnersByAge([CatYoungLocal,CrappieYoungLocal,PerchYoungLocal,BlueYoungLocal], YoungFiltered,'Young');
	buildWinnersByAge([CatOldLocal,CrappieOldLocal,PerchOldLocal,BlueOldLocal], OldFiltered, 'Old');
}


/*---Tab functionality---*/

    var tabLinks = new Array(),
        contentDivs = new Array();

function init() {
      // Grab the tab links and content divs from the page
      var tabListItems = document.getElementById('tabs').childNodes;
      for ( var i = 0; i < tabListItems.length; i++ ) {
        if ( tabListItems[i].nodeName == "LI" ) {
          var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' ),
              id = getHash( tabLink.getAttribute('href') );
          tabLinks[id] = tabLink;
          contentDivs[id] = document.getElementById( id );
        }
      }

      // Assign onclick events to the tab links, and
      // highlight the first tab
      var i = 0;

      for ( var id in tabLinks ) {
        tabLinks[id].onclick = showTab;
        tabLinks[id].onfocus = function() { this.blur() };
        if ( i == 0 ) tabLinks[id].className = 'selected';
        i++;
      }

      // Hide all content divs except the first
      var i = 0;

      for ( var id in contentDivs ) {
        if ( i != 0 ) contentDivs[id].className = 'tabContent hide';
        i++;
      }
    }

 function showTab() {
      var selectedId = getHash( this.getAttribute('href') );

      // Highlight the selected tab, and dim all others.
      // Also show the selected content div, and hide all others.
      for ( var id in contentDivs ) {
        if ( id == selectedId ) {
          tabLinks[id].className = 'selected';
          contentDivs[id].className = 'tabContent';
        } else {
          tabLinks[id].className = '';
          contentDivs[id].className = 'tabContent hide';
        }
      }

      // Stop the browser following the link
      return false;
    }

 function getFirstChildWithTagName( element, tagName ) {
      for ( var i = 0; i < element.childNodes.length; i++ ) {
        if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
      }
    }

    function getHash( url ) {
      var hashPos = url.lastIndexOf ( '#' );
      return url.substring( hashPos + 1 );
    }