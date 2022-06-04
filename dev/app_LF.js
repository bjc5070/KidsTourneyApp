//Javascript
/* Lovefield.js Database project for BBC Kids Tournament */
window.onload = function(){
	document.getElementById('Clear').onclick=function(){indexedDB.deleteDatabase('KTDB_LF');localStorage.clear();};
	document.getElementById('Add').addEventListener("click", function () {addContestant();getEveryone();}, false);
	document.getElementById('Update').addEventListener("click", function() {updateContestant();getEveryone();}, false);
	document.getElementById('Remove').addEventListener("click", function() {removeContestant();getEveryone();}, false);
	document.getElementById('Everyone').addEventListener("click", getEveryone, false);
	document.getElementById('Populate').addEventListener("click", PopulateFileData, false);
	document.getElementById('Create').addEventListener("click", CreateDataSets, false);
	document.getElementById('Rank').addEventListener("click", RankSpeciesZerosAll, false);
	document.getElementById('Build').addEventListener("click", buildWinnersAll, false);
	document.getElementById('Save').addEventListener("click", SaveEveryone, false);
	document.getElementById('LoadFile').addEventListener("click", FileSelect, false);
}
//schema creation
var schemaBuilder = lf.schema.create('KTDB_LF',1),
//Fake test data
	fileDataJson = [{"Contestant":"Aiden Wilhelm","age":4,"num":86,"bluegill":0.38,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Alexis Fleming","age":12,"num":37,"bluegill":0.29,"perch":0.24,"crappie":0.63,"catfish":0},{"Contestant":"Allison Flatt","age":11,"num":67,"bluegill":0.25,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Anna Leasure","age":5,"num":54,"bluegill":0.14,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Austin Ruckert","age":10,"num":43,"bluegill":0.26,"perch":0,"crappie":0.39,"catfish":6.46},{"Contestant":"Avery Aglio","age":7,"num":61,"bluegill":0.25,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Bailey Kujbus","age":6,"num":26,"bluegill":0,"perch":0,"crappie":0,"catfish":8.22},{"Contestant":"Blake Wilhite","age":11,"num":46,"bluegill":0,"perch":0,"crappie":0.79,"catfish":0},{"Contestant":"Braiden Reich","age":10,"num":22,"bluegill":0.12,"perch":0,"crappie":0.25,"catfish":0},{"Contestant":"Brendan Gregory","age":7,"num":34,"bluegill":0.27,"perch":0.31,"crappie":0.81,"catfish":0},{"Contestant":"Brenna Vaughn","age":12,"num":1,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Brennan Wegner","age":5,"num":81,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Brody Kniess","age":5,"num":69,"bluegill":0.21,"perch":0,"crappie":0.41,"catfish":0},{"Contestant":"Caleb Sutter","age":15,"num":38,"bluegill":0.25,"perch":0,"crappie":0.78,"catfish":5.32},{"Contestant":"Carter Proudfoot","age":7,"num":71,"bluegill":0.24,"perch":0.14,"crappie":0,"catfish":0},{"Contestant":"Carter Ray","age":6,"num":9,"bluegill":0.26,"perch":0.36,"crappie":0.88,"catfish":0.57},{"Contestant":"Casey Zurzolo","age":11,"num":51,"bluegill":0.34,"perch":0.2,"crappie":0.4,"catfish":0},{"Contestant":"Cash Walker","age":8,"num":8,"bluegill":0.28,"perch":0.17,"crappie":0.9,"catfish":4.43},{"Contestant":"Christian Leone","age":14,"num":76,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Cody Conrad","age":12,"num":59,"bluegill":0,"perch":0,"crappie":0.88,"catfish":0},{"Contestant":"Connor Henning","age":3,"num":77,"bluegill":0,"perch":0.18,"crappie":0.34,"catfish":0.74},{"Contestant":"Connor McCall","age":6,"num":72,"bluegill":0.26,"perch":0,"crappie":0.24,"catfish":0},{"Contestant":"Dalton Johnson","age":13,"num":60,"bluegill":0,"perch":0,"crappie":0,"catfish":3.28},{"Contestant":"Darik Abdulovic","age":8,"num":79,"bluegill":0,"perch":0,"crappie":0.37,"catfish":4.18},{"Contestant":"Dayton Kriess","age":4,"num":47,"bluegill":0,"perch":0,"crappie":0.73,"catfish":0},{"Contestant":"Deyton Reich","age":6,"num":57,"bluegill":0,"perch":0,"crappie":0.24,"catfish":0},{"Contestant":"Dylan Gibbons","age":11,"num":84,"bluegill":0.24,"perch":0.21,"crappie":0.31,"catfish":0},{"Contestant":"Dylan Reich","age":8,"num":58,"bluegill":0.16,"perch":0,"crappie":0.28,"catfish":0},{"Contestant":"Elijah Anderson","age":9,"num":24,"bluegill":0,"perch":0,"crappie":0.29,"catfish":3.56},{"Contestant":"Elliot Fair","age":1,"num":75,"bluegill":0.18,"perch":0.14,"crappie":0.86,"catfish":0},{"Contestant":"Emily Claire Smith","age":3,"num":11,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Emma Reich","age":10,"num":23,"bluegill":0.21,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Emma Snow","age":5,"num":40,"bluegill":0,"perch":0,"crappie":0,"catfish":5.8},{"Contestant":"Fiona Alter","age":6,"num":13,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Gage Sumansky","age":4,"num":74,"bluegill":0.26,"perch":0.17,"crappie":0.71,"catfish":0},{"Contestant":"Hannah Kemmer","age":13,"num":70,"bluegill":0.27,"perch":0.1,"crappie":0.57,"catfish":0},{"Contestant":"Harley Kriess","age":11,"num":48,"bluegill":0,"perch":0,"crappie":0.81,"catfish":0},{"Contestant":"Hunter Doerflinger","age":7,"num":16,"bluegill":0.32,"perch":0.14,"crappie":0.76,"catfish":0.98},{"Contestant":"Hunter Frederick","age":11,"num":65,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Hunter Organ","age":6,"num":19,"bluegill":0,"perch":0,"crappie":0.8,"catfish":7.45},{"Contestant":"Ian Wilhelm","age":7,"num":87,"bluegill":0,"perch":0,"crappie":0.28,"catfish":0},{"Contestant":"Isaac Smith","age":4,"num":10,"bluegill":0.18,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Isabella Galida","age":4,"num":73,"bluegill":0.27,"perch":0.18,"crappie":0.19,"catfish":0},{"Contestant":"Jacob Reich","age":7,"num":21,"bluegill":0.28,"perch":0,"crappie":0.29,"catfish":0},{"Contestant":"Jeff Cuffman","age":7,"num":31,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Jesse Montgomery","age":13,"num":82,"bluegill":0,"perch":0,"crappie":0.49,"catfish":4.72},{"Contestant":"Joel Dean","age":12,"num":12,"bluegill":0.34,"perch":0.29,"crappie":0.32,"catfish":0},{"Contestant":"Joey Hart","age":10,"num":20,"bluegill":0.28,"perch":0,"crappie":0.16,"catfish":0},{"Contestant":"Jordan Vaughn","age":7,"num":5,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Joseph Knochel","age":12,"num":4,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Julia Brania","age":8,"num":88,"bluegill":0.31,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Karter Frederick","age":9,"num":64,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Kaylee Kniess","age":6,"num":28,"bluegill":0.24,"perch":0,"crappie":0.29,"catfish":0},{"Contestant":"Keaton Jesteadt","age":13,"num":18,"bluegill":0.19,"perch":0.32,"crappie":1.05,"catfish":3.8},{"Contestant":"Kylie Workman","age":5,"num":39,"bluegill":0.14,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Landon Kumpfmiller","age":2,"num":35,"bluegill":0,"perch":0.22,"crappie":0.47,"catfish":0},{"Contestant":"Levi Kujbus","age":4,"num":27,"bluegill":0,"perch":0,"crappie":0,"catfish":5.96},{"Contestant":"Lexi Doerflinger","age":10,"num":15,"bluegill":0.32,"perch":0.1,"crappie":7,"catfish":2.91},{"Contestant":"Luc Tebay","age":7,"num":80,"bluegill":0.27,"perch":0.37,"crappie":0.46,"catfish":3.94},{"Contestant":"Luke Keene","age":9,"num":91,"bluegill":0.27,"perch":0.11,"crappie":0.64,"catfish":0},{"Contestant":"Luke Nelson","age":11,"num":45,"bluegill":0,"perch":0.25,"crappie":0.84,"catfish":0},{"Contestant":"Maddox Bell","age":9,"num":90,"bluegill":0.28,"perch":0,"crappie":0.35,"catfish":0},{"Contestant":"Maddox Reich","age":5,"num":56,"bluegill":0.25,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Madison Vaughn","age":11,"num":2,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Marley Fish","age":11,"num":66,"bluegill":0.25,"perch":0.35,"crappie":0,"catfish":0},{"Contestant":"Mason Cuffman","age":6,"num":33,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Mike Doerflinger","age":15,"num":14,"bluegill":0.3,"perch":0.53,"crappie":0.87,"catfish":0.64},{"Contestant":"Mikenzie Kneidinger","age":5,"num":17,"bluegill":0.15,"perch":0.21,"crappie":0.24,"catfish":0.63},{"Contestant":"Morgan Barber","age":3,"num":42,"bluegill":0.29,"perch":0,"crappie":0.88,"catfish":0},{"Contestant":"Nash Cuiffman","age":6,"num":32,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Nathan Dickey","age":7,"num":53,"bluegill":0.29,"perch":0.57,"crappie":0.39,"catfish":0.4},{"Contestant":"Nathan Kniess","age":13,"num":29,"bluegill":0.16,"perch":0,"crappie":0.43,"catfish":0},{"Contestant":"Nicholas Alter","age":9,"num":89,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Noah Ruby","age":7,"num":49,"bluegill":0.31,"perch":0,"crappie":0.7,"catfish":2.9},{"Contestant":"Owen Flatt","age":8,"num":68,"bluegill":0.24,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Parker Frederick","age":7,"num":63,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Peyton Beck","age":5,"num":36,"bluegill":0.27,"perch":0,"crappie":0.87,"catfish":0},{"Contestant":"Rachel Leslie","age":11,"num":7,"bluegill":0,"perch":0,"crappie":0.67,"catfish":0},{"Contestant":"Riley Dashio","age":13,"num":78,"bluegill":0.27,"perch":0.3,"crappie":1.05,"catfish":0},{"Contestant":"Ryan Leslie","age":9,"num":6,"bluegill":0,"perch":0,"crappie":0.5,"catfish":0},{"Contestant":"Ryder Snow","age":2,"num":41,"bluegill":0,"perch":0,"crappie":0,"catfish":6.65},{"Contestant":"Rylan Zupko","age":8,"num":83,"bluegill":0.39,"perch":0.15,"crappie":0.27,"catfish":0},{"Contestant":"Rylin Edwards","age":9,"num":85,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Skylar Callen","age":5,"num":25,"bluegill":0.32,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Stephen Vaughn, Jr.","age":9,"num":3,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Steven Fair","age":13,"num":44,"bluegill":0,"perch":0.1,"crappie":0.52,"catfish":0.48},{"Contestant":"Steven Leasure","age":7,"num":55,"bluegill":0.17,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Sydney Zurzolo","age":7,"num":50,"bluegill":0.26,"perch":0.35,"crappie":0.33,"catfish":0},{"Contestant":"Taylor Conrad","age":10,"num":52,"bluegill":0,"perch":0,"crappie":0.53,"catfish":0},{"Contestant":"Tucker Frederick","age":2,"num":62,"bluegill":0,"perch":0,"crappie":0,"catfish":0},{"Contestant":"Zac Kniess","age":10,"num":30,"bluegill":0.18,"perch":0,"crappie":0.23,"catfish":0}],
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
		fixZeros(updatedContestant);
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

function FileSelect(filePath) {
	var Path = document.getElementById('FileSelect').files[0];
	var fileRead = new FileReader();

	fileRead.onload = function() {
		fileDataJson = JSON.parse(fileRead.result);
		PopulateFileData();
	}
	fileRead.readAsText(Path);
}

function loadFromFile(file) {
	var File = new XMLHttpRequest();
	File.open("Get", file, false);
	File.onreadystatechange = function ()
    {
        if(File.readyState === 4)
        {
            if(File.status === 200 || File.status == 0)
            {
				var fileData = File.responseText;
				console.log(fileData);
            }
        }
    }
    File.send(null);
}

function PopulateFileData(){
	kids = db.getSchema().table('Contestants');

	for(var i in fileDataJson) {
		var row = kids.createRow({
		'Contestant' : fileDataJson[i].Contestant,
		'age'  : fileDataJson[i].age, 
		'num'  : fileDataJson[i].num, 
		'bluegill': fileDataJson[i].bluegill, 
		'perch': fileDataJson[i].perch, 
		'crappie': fileDataJson[i].crappie, 
		'catfish': fileDataJson[i].catfish
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