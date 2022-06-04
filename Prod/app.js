//Javascript
/* Lovefield.js Database project for BBC Kids Tournament */
window.onload = function(){
	document.getElementById('Clear').onclick=function(){alert('are you sure you want to clear indexedDB and Local Storage?');indexedDB.deleteDatabase('KTDB_LF');localStorage.clear();};
	document.getElementById('Add').addEventListener("click", function () {addContestant();getEveryone();}, false);
	document.getElementById('Update').addEventListener("click", function() {updateContestant();getEveryone();}, false);
	document.getElementById('Remove').addEventListener("click", function() {removeContestant();getEveryone();}, false);
	document.getElementById('Everyone').addEventListener("click", getEveryone, false);
	document.getElementById('Create').addEventListener("click", CreateDataSets, false);
	document.getElementById('Rank').addEventListener("click", RankSpeciesZerosAll, false);
	document.getElementById('Build').addEventListener("click", buildWinnersAll, false);
	document.getElementById('Save').addEventListener("click", SaveEveryone, false);
}

//schema creation
var schemaBuilder = lf.schema.create('KTDB_LF',1),
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

function fixZeros(Contestant) {
	// fill zeros if NaN
	['bluegill','perch','crappie','catfish'].forEach(function(elem) {
		if(Number.isNaN(Contestant.m[elem])) {
			Contestant.m[elem] = 0;
		}
	});
};

function addContestant(){
	var contestant = document.getElementById('Name').value,
		age = parseInt(document.getElementById('Age').value, 10),
		num = parseInt(document.getElementById('Num').value, 10),
		bluegill = parseFloat(document.getElementById('Bluegill').value, 10),
		perch = parseFloat(document.getElementById('Perch').value, 10),
		crappie = parseFloat(document.getElementById('Crappie').value, 10),
		catfish = parseFloat(document.getElementById('Catfish').value, 10),
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
		fixZeros(newContestant);
		//clear form fields
		var InputVals = document.getElementsByTagName('input');
		for(var i = 0; i<=InputVals.length-1;i++){
		InputVals[i].value = '';
		}
		alert('contestant added');
		//performs add
		return db.insert().into(kids).values([newContestant]).exec();
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
		fixZeros(updatedContestant);
		//clear form fields
		var InputVals = document.getElementsByTagName('input');
		for(var i = 0; i<=InputVals.length-1;i++){
		InputVals[i].value = '';
		}
		//performs add
		alert('Contestant Updated');
		return db.insertOrReplace().into(kids).values([updatedContestant]).exec();
}

function removeContestant(){
	alert('Are you sure you want to remove this entry?');
	var thisId = document.getElementById('NumRemove').value,
		kids = db.getSchema().table('Contestants');
	db.delete().from(kids).where(kids.num.eq(thisId)).exec();
	//clear form fields
		var InputVals = document.getElementsByTagName('input');
		for(var i = 0; i<=InputVals.length-1;i++){
		InputVals[i].value = '';
		}
}

function getEveryone(){
	var kids = db.getSchema().table('Contestants'),
		s = '';
	db.select().from(kids).orderBy(kids.Contestant, lf.Order.ASC).exec().then(function(results) {
		results.forEach(function(row) {
			s += "<tr>";
			for(var field in row){
				if(field === 'Contestant'){
					s += "<td class='ContName'>" + row[field] + "</td>";
				}else{
					s += "<td>" + row[field] + "</td>";
				}
			}
			s += "</tr>";
		});
		document.querySelector("#DataBody").innerHTML = s;
	}).then(function() {
		var Names = document.getElementsByClassName('ContName');
		for(var cn = 0; cn <= Names.length-1; cn++){
			Names[cn].addEventListener("click", NameClick, false);
		};
	});
}

function NameClick(){
	kids = db.getSchema().table('Contestants');
	db.select().from(kids).where(kids.Contestant.eq(this.innerHTML)).exec().then(function(results) {
		document.getElementById('Name').value = results[0].Contestant;
		document.getElementById('Age').value = results[0].age;
		document.getElementById('Num').value = results[0].num;
		document.getElementById('Bluegill').value = results[0].bluegill;
		document.getElementById('Perch').value = results[0].perch;
		document.getElementById('Crappie').value = results[0].crappie;
		document.getElementById('Catfish').value = results[0].catfish;
	});
}	

function SaveEveryone(){
	var kids = db.getSchema().table('Contestants');
	db.select().from(kids).orderBy(kids.Contestant, lf.Order.ASC).exec().then(function(results) {
		var a = document.body.appendChild(
			document.createElement("a")
		);
		a.download = "KidsData.txt";
		a.href = "data:text/plain;base64," + btoa(JSON.stringify(results));
		a.id = 'databaseDownload'
	});
	var timer = function(){
		window.setTimeout(delayedClick, 1000);
	}
	function delayedClick() {
		document.getElementById('databaseDownload').click();
	}
	timer();
}

/*Globals for handling data */
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
	BabyZeros = [],
	YoungZeros = [],
	OldZeros = [],
	BabyFiltered = [],
	YoungFiltered = [],
	OldFiltered = [];

function CreateDataSets() {
	var kids = db.getSchema().table('Contestants'),
    	data1 = db.select().from(kids).where(lf.op.and(kids.age.between(0,5),kids.catfish.gt(0))).orderBy(kids.catfish, lf.Order.DESC).exec().then(function(rows){
    		CatBaby.push(rows);
    	}),
    	data2 = db.select().from(kids).where(lf.op.and(kids.age.between(6,10),kids.catfish.gt(0))).orderBy(kids.catfish, lf.Order.DESC).exec().then(function(rows){
    		CatYoung.push(rows);
    	}),
    	data3 = db.select().from(kids).where(lf.op.and(kids.age.between(11,15),kids.catfish.gt(0))).orderBy(kids.catfish, lf.Order.DESC).exec().then(function(rows){
    		CatOld.push(rows);
    	}),
    	data4 = db.select().from(kids).where(lf.op.and(kids.age.between(0,5),kids.crappie.gt(0))).orderBy(kids.crappie, lf.Order.DESC).exec().then(function(rows){
    		CrappieBaby.push(rows);
    	}),
    	data5 = db.select().from(kids).where(lf.op.and(kids.age.between(6,10),kids.crappie.gt(0))).orderBy(kids.crappie, lf.Order.DESC).exec().then(function(rows){
    		CrappieYoung.push(rows);
    	}),
    	data6 = db.select().from(kids).where(lf.op.and(kids.age.between(11,15),kids.crappie.gt(0))).orderBy(kids.crappie, lf.Order.DESC).exec().then(function(rows){
    		CrappieOld.push(rows);
    	}),
    	data7 = db.select().from(kids).where(lf.op.and(kids.age.between(0,5),kids.perch.gt(0))).orderBy(kids.perch, lf.Order.DESC).exec().then(function(rows){
    		PerchBaby.push(rows);
    	}),
    	data8 = db.select().from(kids).where(lf.op.and(kids.age.between(6,10),kids.perch.gt(0))).orderBy(kids.perch, lf.Order.DESC).exec().then(function(rows){
    		PerchYoung.push(rows);
    	}),
    	data9 = db.select().from(kids).where(lf.op.and(kids.age.between(11,15),kids.perch.gt(0))).orderBy(kids.perch, lf.Order.DESC).exec().then(function(rows){
    		PerchOld.push(rows);
    	}),
    	data10 = db.select().from(kids).where(lf.op.and(kids.age.between(0,5),kids.bluegill.gt(0))).orderBy(kids.bluegill, lf.Order.DESC).exec().then(function(rows){
    		BlueBaby.push(rows);
    	}),
    	data11 = db.select().from(kids).where(lf.op.and(kids.age.between(6,10),kids.bluegill.gt(0))).orderBy(kids.bluegill, lf.Order.DESC).exec().then(function(rows){
    		BlueYoung.push(rows);
    	}),
    	data12 = db.select().from(kids).where(lf.op.and(kids.age.between(11,15),kids.bluegill.gt(0))).orderBy(kids.bluegill, lf.Order.DESC).exec().then(function(rows){
    		BlueOld.push(rows);
    	}),
    	data13 = db.select().from(kids).where(lf.op.and(
    		kids.age.between(0,5),
    		kids.bluegill.eq(0),
    		kids.catfish.eq(0),
    		kids.crappie.eq(0),
    		kids.perch.eq(0))).exec().then(function(rows){
    		BabyZeros.push(rows);
    	}),
    	data14 = db.select().from(kids).where(lf.op.and(
    		kids.age.between(6,10),
    		kids.bluegill.eq(0),
    		kids.catfish.eq(0),
    		kids.crappie.eq(0),
    		kids.perch.eq(0))).exec().then(function(rows){
    		YoungZeros.push(rows);
    	}),
    	data15 = db.select().from(kids).where(lf.op.and(
    		kids.age.between(11,15),
    		kids.bluegill.eq(0),
    		kids.catfish.eq(0),
    		kids.crappie.eq(0),
    		kids.perch.eq(0))).exec().then(function(rows){
    		OldZeros.push(rows);
    	});
    	console.log('Data Sets Created');
}

/*
GroupName is a string to reference global variable
GroupData is value of passed variable associated with GroupName
PropName is property being filtered
*/
var  RankSpeciesZeros = function (GroupName, GroupData, PropName){
	var GroupDataArray = GroupData[0];
	GroupDataArray.forEach(function(value, index){
    	value.rank = index + 1;
    	value.species = PropName;
    });
	for(i = GroupDataArray.length -1; i >= 0; i--){
		if(GroupDataArray[i][PropName] === 0){
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
	RankSpeciesZeros('BlueBaby', BlueBaby, 'bluegill');
	RankSpeciesZeros('BlueYoung', BlueYoung, 'bluegill');
	RankSpeciesZeros('BlueOld', BlueOld, 'bluegill');
}

/******************************************************
 build sorting functionality here to finish app
 add Zeros back in
 ******************************************************/
function buildWinnersByAge(fishByAge, ageGroup, ageTable){
	var unfilteredAgeGroup = [],
	    ageZeros = ageTable + 'Zeros';
	/*combines all species arrays into one large array*/
	fishByAge.forEach(function(currentValue){
		currentValue.forEach(function(cV2){
			unfilteredAgeGroup.push(cV2);
		});
	});
	/*remove duplicates*/
	/*stores each index as a variable to compare to the rest of the array*/
	for(var i=0; i<=unfilteredAgeGroup.length-1; i++){
		var cV3 = unfilteredAgeGroup[i].Contestant,
			cV3Rank = unfilteredAgeGroup[i].rank;
			
		/*begins at next index to compare to the rest*/
		for(k=0; k<unfilteredAgeGroup.length-1; k++){
			if(unfilteredAgeGroup[i] === unfilteredAgeGroup[k]){
				continue;
			}
			/* first instance has better rank*/
			if(cV3 === unfilteredAgeGroup[k].Contestant && cV3Rank <= unfilteredAgeGroup[k].rank){
				unfilteredAgeGroup.splice(k,1);
				/*sets index back one to avoid splice index change issue*/
				k-=1;
			}
			/*fist instance has worse rank*/
			if(cV3 === unfilteredAgeGroup[k].Contestant && cV3Rank >= unfilteredAgeGroup[k].rank){
				unfilteredAgeGroup.splice(i,1);
				/*sets index back one to avoid splice index change issue*/
				k = unfilteredAgeGroup.length;
				i--;
			}
		}
	}
	/* adjusts ranks after data filtering. Needs DRY Optimized*/
	var catRank = 1,
		crapRank = 1,
		perRank = 1,
		blueRank = 1;
	unfilteredAgeGroup.forEach(function(value){
		if(value.species == "catfish"){
			value.rank = catRank;
			catRank += 1;
		}
		if(value.species == "crappie"){
			value.rank = crapRank;
			crapRank++;
		}
		if(value.species == "perch"){
			value.rank = perRank;
			perRank += 1;
		}
		if(value.species == "bluegill"){
			value.rank = blueRank;
			blueRank += 1;
		}
	});
	/*adds Zeros to bluegill and ranks before adding Zeros back in*/
	this[ageZeros][0].forEach(function(value){
    	value.rank = blueRank;
    	value.species = 'bluegill';
    	blueRank += 1;
    });
 	ageGroup = unfilteredAgeGroup.concat(this[ageZeros][0]);
	var s = '';
	ageGroup.forEach(function(row) {
			BestWeight = row.species;
			s += '<tr data-species="'+row.species+'">';
			s += "<td>" + row.rank + "</td>";
			s += "<td>" + row.species + "</td>";
			s += "<td>" + row.Contestant + "</td>";
			s += "<td>" + row.num + "</td>";
			s += "<td>" + row[BestWeight] + "</td>";
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
		BlueOldLocal = JSON.parse(localStorage["BlueOld"]),
		allZeros = BabyZeros[0].concat(YoungZeros[0], OldZeros[0]);

	buildWinnersByAge([CatBabyLocal,CrappieBabyLocal,PerchBabyLocal,BlueBabyLocal], BabyFiltered,'Baby');
	buildWinnersByAge([CatYoungLocal,CrappieYoungLocal,PerchYoungLocal,BlueYoungLocal], YoungFiltered,'Young');
	buildWinnersByAge([CatOldLocal,CrappieOldLocal,PerchOldLocal,BlueOldLocal], OldFiltered, 'Old');

	/*all zeros tab*/
	var z = '';
	allZeros.forEach(function(row) {
			z += "<tr>";
			for(var field in row){
				z += "<td>" + row[field] + "</td>";
			}
			z += "</tr>";
		});
		document.querySelector("#DataZeros").innerHTML = z;
}



/*----------------------------
------Tab functionality-------
----------------------------*/

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
init();
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