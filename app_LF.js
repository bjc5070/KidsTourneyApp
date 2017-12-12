//Javascript
/* Lovefield.js Database project for BBC Kids Tournament */
window.onload = function(){
	document.getElementById('Clear').onclick=function(){indexedDB.deleteDatabase('KTDB_LF');localStorage.clear();};
	document.getElementById('Add').addEventListener("click", addContestant, false);
	document.getElementById('Update').addEventListener("click", updateContestant, false);
	document.getElementById('Remove').addEventListener("click", removeContestant, false);
	document.getElementById('Everyone').addEventListener("click", getEveryone, false);
	document.getElementById('Populate').addEventListener("click", PopulateFakeData, false);
	document.getElementById('Create').addEventListener("click", CreateDataSets, false);
	document.getElementById('Rank').addEventListener("click", RankSpeciesZerosAll, false);
	document.getElementById('Build').addEventListener("click", buildWinnersAll, false);
	document.getElementById('Save').addEventListener("click", SaveEveryone, false);
}
//schema creation
var schemaBuilder = lf.schema.create('KTDB_LF',1),
//Fake test data
	FakeInfo = [{"Contestant":"Allison Blake","age":8,"num":1,"bluegill":0.25,"perch":0,"crappie":0,"catfish":0,"rank":8,"species":"bluegill"},{"Contestant":"Bailee Ewell","age":6,"num":45,"bluegill":0,"perch":0,"crappie":0,"catfish":0,"rank":4,"species":"bluegill"},{"Contestant":"Blake Wilhite","age":12,"num":44,"bluegill":0,"perch":0,"crappie":0,"catfish":2.13,"rank":5,"species":"catfish"},{"Contestant":"Carter Ray","age":7,"num":39,"bluegill":0,"perch":0,"crappie":2.05,"catfish":0,"rank":1,"species":"crappie"},{"Contestant":"Casey Zurzolo","age":12,"num":36,"bluegill":0.3,"perch":0.16,"crappie":0.33,"catfish":0,"rank":8,"species":"bluegill"},{"Contestant":"Cash Walker","age":9,"num":27,"bluegill":0.35,"perch":0.23,"crappie":1.04,"catfish":6.54,"rank":3,"species":"bluegill"},{"Contestant":"Christian Leone","age":15,"num":16,"bluegill":0,"perch":0,"crappie":0,"catfish":0,"rank":4,"species":"bluegill"},{"Contestant":"Cody Conrad","age":13,"num":11,"bluegill":0,"perch":0,"crappie":1.34,"catfish":0,"rank":1,"species":"crappie"},{"Contestant":"Colton Blake","age":5,"num":2,"bluegill":0,"perch":0,"crappie":0,"catfish":0,"rank":5,"species":"bluegill"},{"Contestant":"Connor Henning","age":4,"num":17,"bluegill":0,"perch":0,"crappie":0.5,"catfish":4.34,"rank":8,"species":"crappie"},{"Contestant":"Cooper Vensel","age":3,"num":14,"bluegill":0.3,"perch":0,"crappie":0.72,"catfish":0,"rank":4,"species":"bluegill"},{"Contestant":"Darik Abdulovic","age":9,"num":15,"bluegill":0,"perch":0,"crappie":0,"catfish":5.01,"rank":3,"species":"catfish"},{"Contestant":"Dayten Kriess","age":5,"num":41,"bluegill":0,"perch":0,"crappie":1.74,"catfish":0,"rank":1,"species":"crappie"},{"Contestant":"Destiny Bortz","age":11,"num":8,"bluegill":0.28,"perch":0.51,"crappie":0.51,"catfish":6,"rank":10,"species":"bluegill"},{"Contestant":"Dominic Cancilla","age":5,"num":21,"bluegill":0.31,"perch":0.62,"crappie":0.39,"catfish":2.16,"rank":3,"species":"bluegill"},{"Contestant":"Dylan Gibbons","age":12,"num":3,"bluegill":0,"perch":0,"crappie":0,"catfish":0,"rank":3,"species":"bluegill"},{"Contestant":"Elliot Dennis-Fair","age":2,"num":28,"bluegill":0.33,"perch":0,"crappie":0.94,"catfish":2.32,"rank":2,"species":"bluegill"},{"Contestant":"Emily Kumpfmiller","age":2,"num":40,"bluegill":0,"perch":0,"crappie":1.7,"catfish":0,"rank":2,"species":"crappie"},{"Contestant":"Emily Smith","age":4,"num":47,"bluegill":0.3,"perch":0,"crappie":0,"catfish":0,"rank":5,"species":"bluegill"},{"Contestant":"Gage Sumansky","age":5,"num":19,"bluegill":0.27,"perch":0,"crappie":0.26,"catfish":0,"rank":7,"species":"bluegill"},{"Contestant":"Gaspare Parco","age":11,"num":7,"bluegill":0.32,"perch":0,"crappie":0,"catfish":0,"rank":5,"species":"bluegill"},{"Contestant":"Gracyn Vardy","age":8,"num":9,"bluegill":0,"perch":0,"crappie":0.33,"catfish":0,"rank":7,"species":"crappie"},{"Contestant":"Hannah Kemmer","age":14,"num":38,"bluegill":0.38,"perch":1.7,"crappie":0.29,"catfish":0,"rank":1,"species":"bluegill"},{"Contestant":"Harley Kriess","age":12,"num":42,"bluegill":0,"perch":0,"crappie":0,"catfish":1.45,"rank":7,"species":"catfish"},{"Contestant":"Hunter Doerflinger","age":8,"num":31,"bluegill":0.41,"perch":0.85,"crappie":0.57,"catfish":0.66,"rank":1,"species":"bluegill"},{"Contestant":"Isaac Smith","age":5,"num":48,"bluegill":0,"perch":0.12,"crappie":0,"catfish":0,"rank":3,"species":"perch"},{"Contestant":"Isabella Concilla","age":3,"num":22,"bluegill":0.26,"perch":0,"crappie":0.31,"catfish":0,"rank":8,"species":"bluegill"},{"Contestant":"Joey Hart","age":11,"num":34,"bluegill":0,"perch":0,"crappie":0.72,"catfish":2.38,"rank":4,"species":"crappie"},{"Contestant":"Josie Wilhite","age":2,"num":43,"bluegill":0,"perch":0,"crappie":1.2,"catfish":0,"rank":4,"species":"crappie"},{"Contestant":"Keaton Jesteadt","age":14,"num":33,"bluegill":0,"perch":0.16,"crappie":0.77,"catfish":1.62,"rank":7,"species":"perch"},{"Contestant":"Landon Kumpfmiller","age":3,"num":23,"bluegill":0.22,"perch":0,"crappie":1.68,"catfish":0,"rank":10,"species":"bluegill"},{"Contestant":"Lexi Doerflinger","age":11,"num":32,"bluegill":0.35,"perch":0.26,"crappie":1.2,"catfish":1.12,"rank":3,"species":"bluegill"},{"Contestant":"Liam Throm","age":8,"num":52,"bluegill":0.27,"perch":0,"crappie":0,"catfish":0,"rank":7,"species":"bluegill"},{"Contestant":"Logan Orloski","age":14,"num":25,"bluegill":0.35,"perch":0,"crappie":0.27,"catfish":0,"rank":2,"species":"bluegill"},{"Contestant":"Luc Tebay","age":8,"num":46,"bluegill":0.33,"perch":0.22,"crappie":1.06,"catfish":6.49,"rank":4,"species":"bluegill"},{"Contestant":"Luke Keene","age":11,"num":4,"bluegill":0.32,"perch":0,"crappie":0.45,"catfish":3.68,"rank":4,"species":"bluegill"},{"Contestant":"Luke Nelson","age":12,"num":49,"bluegill":0.29,"perch":0,"crappie":0,"catfish":0,"rank":9,"species":"bluegill"},{"Contestant":"Marley Fish","age":12,"num":13,"bluegill":0.31,"perch":0.17,"crappie":0.29,"catfish":0,"rank":6,"species":"bluegill"},{"Contestant":"Mikenzie Kneidinger","age":3,"num":51,"bluegill":0.27,"perch":0.28,"crappie":0.3,"catfish":0,"rank":6,"species":"bluegill"},{"Contestant":"Nathan Dickey","age":8,"num":5,"bluegill":0.28,"perch":0,"crappie":0.27,"catfish":3.6,"rank":6,"species":"bluegill"},{"Contestant":"Noah Chupka","age":8,"num":18,"bluegill":0,"perch":0,"crappie":0,"catfish":0,"rank":5,"species":"bluegill"},{"Contestant":"Peyton Beck","age":6,"num":24,"bluegill":0.21,"perch":0,"crappie":2.04,"catfish":1.42,"rank":9,"species":"bluegill"},{"Contestant":"Rachel Leslie","age":12,"num":29,"bluegill":0,"perch":0,"crappie":0,"catfish":3.48,"rank":3,"species":"catfish"},{"Contestant":"Riley Dashio","age":14,"num":35,"bluegill":0.3,"perch":0.26,"crappie":0.6,"catfish":0,"rank":7,"species":"bluegill"},{"Contestant":"Ryan Leslie","age":10,"num":30,"bluegill":0,"perch":0,"crappie":0,"catfish":2.43,"rank":5,"species":"catfish"},{"Contestant":"Skylar Callen","age":6,"num":20,"bluegill":0.32,"perch":0,"crappie":0,"catfish":0,"rank":5,"species":"bluegill"},{"Contestant":"Steven Fair","age":14,"num":26,"bluegill":0.2,"perch":0,"crappie":0.33,"catfish":0,"rank":11,"species":"bluegill"},{"Contestant":"Sydney Zurzolo","age":8,"num":37,"bluegill":0.35,"perch":0.19,"crappie":0.35,"catfish":0,"rank":2,"species":"bluegill"},{"Contestant":"Taylor Conrad","age":11,"num":12,"bluegill":0,"perch":0,"crappie":0.26,"catfish":0,"rank":13,"species":"crappie"},{"Contestant":"Tehlor Kneidinger","age":3,"num":50,"bluegill":0.24,"perch":0.09,"crappie":0.55,"catfish":0.71,"rank":9,"species":"bluegill"},{"Contestant":"Walker Vardy","age":3,"num":10,"bluegill":0.37,"perch":0,"crappie":0,"catfish":0,"rank":1,"species":"bluegill"},{"Contestant":"Willem Wolfe","age":10,"num":6,"bluegill":0,"perch":0,"crappie":0,"catfish":0,"rank":6,"species":"bluegill"}],
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
		kids = db.getSchema().table('Contestants');
		currentContestant= [],
		contestantData = db.select().from(kids).where(kids.num.eq(num)).exec();

		//define a contestant
		var updatedContestant = kids.createRow({
			'Contestant':contestant,
			'age':age,
			'num':num,
			'bluegill':bluegill,
			'perch':perch,
			'crappie':crappie,
			'catfish':catfish
		});
		console.log(contestantData.sa);
		console.log(updatedContestant);
		console.log(currentContestant);
		//clear form fields
// 		var InputVals = document.getElementsByTagName('input');
// 		for(var i = 0; i<=InputVals.length-1;i++){
// 		InputVals[i].value = '';
// 		}
		alert('Contestant Updated');
		//performs add
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
	db.select().from(kids).orderBy(kids.Contestant, lf.Order.ASC).exec().then(function(results) {
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
			s += "<tr>";
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