/* global console,$,document,window,alert,IDBKeyRange */
var db;

function dtFormat(input) {
    if(!input) return "";
    var res = (input.getMonth()+1) + "/" + input.getDate() + "/" + input.getFullYear() + " ";
    var hour = input.getHours();
    var ampm = "AM";
	if(hour === 12) ampm = "PM";
    if(hour > 12){
        hour-=12;
        ampm = "PM";
    }
    var minute = input.getMinutes()+1;
    if(minute < 10) minute = "0" + minute;
    res += hour + ":" + minute + " " + ampm;
    return res;
}

$(document).ready(function() {

	if(!("indexedDB" in window)) {
		alert("IndexedDB support required for this demo!");
		return;
	}
	
	var $noteDetail = $("#noteDetail");
	var $noteForm = $("#noteForm");
	
	var openRequest = window.indexedDB.open("nettuts_notes_3",1);

    openRequest.onerror = function(e) {
        console.log("Error opening db");
        console.dir(e);
    };

    openRequest.onupgradeneeded = function(e) {

        var thisDb = e.target.result;
		var objectStore;
		
        //Create Note OS
        if(!thisDb.objectStoreNames.contains("note")) {
            console.log("I need to make the note objectstore");
            objectStore = thisDb.createObjectStore("note", { keyPath: "id", autoIncrement:true });
            objectStore.createIndex("titlelc", "titlelc", { unique: false });
		}

    };

    openRequest.onsuccess = function(e) {
        db = e.target.result;

        db.onerror = function(event) {
          // Generic error handler for all errors targeted at this database's
          // requests!
          alert("Database error: " + event.target.errorCode);
        };

        displayNotes();
		doCount();
    };

    function displayNotes(filter) {

        var transaction = db.transaction(["note"], "readonly");  
        var content="<table class='table table-bordered table-striped'><thead><tr><th>Title</th><th>Updated</th><th>&nbsp;</td></thead><tbody>";

		transaction.oncomplete = function(event) {
            $("#noteList").html(content);
        };

        var handleResult = function(event) {  
          var cursor = event.target.result;  
          if (cursor) {  
            content += "<tr data-key=\""+cursor.key+"\"><td class=\"notetitle\">"+cursor.value.title+"</td>";
            content += "<td>"+dtFormat(cursor.value.updated)+"</td>";

            content += "<td><a class=\"btn btn-primary edit\">Edit</a> <a class=\"btn btn-danger delete\">Delete</a></td>";
            content +="</tr>";
            cursor.continue();  
          }  
          else {  
            content += "</tbody></table>";
          }  
        };  

        var objectStore = transaction.objectStore("note");

        if(filter) {
            //Credit: http://stackoverflow.com/a/8961462/52160
			filter = filter.toLowerCase();
            var range = IDBKeyRange.bound(filter, filter + "\uffff");
            var index = objectStore.index("titlelc");
            index.openCursor(range).onsuccess = handleResult;
        } else {
            objectStore.openCursor().onsuccess = handleResult;
        }
    
    }

	function doCount() {
		
		db.transaction(["note"],"readonly").objectStore("note").count().onsuccess = function(event) {
			$("#sizeSpan").text("("+event.target.result+" Notes Total)");
		};
	
	}

    $("#noteList").on("click", "a.delete", function(e) {
        var thisId = $(this).parent().parent().data("key");

		var t = db.transaction(["note"], "readwrite");
		var request = t.objectStore("note").delete(thisId);
		t.oncomplete = function(event) {
			displayNotes();
			doCount();
			$noteDetail.hide();
			$noteForm.hide();
		};
        return false;
    });

    $("#noteList").on("click", "a.edit", function(e) {
        var thisId = $(this).parent().parent().data("key");

        var request = db.transaction(["note"], "readwrite")  
                        .objectStore("note")  
                        .get(thisId);  
        request.onsuccess = function(event) {  
            var note = request.result;
            $("#key").val(note.id);
            $("#title").val(note.title);
            $("#body").val(note.body);
			$noteDetail.hide();
			$noteForm.show();
        };  

        return false;
    });

    $("#noteList").on("click", "td", function() {
        var thisId = $(this).parent().data("key");
        var transaction = db.transaction(["note"]);  
        var objectStore = transaction.objectStore("note");  
        var request = objectStore.get(thisId);  

		request.onsuccess = function(event) {  
			var note = request.result;
			$noteDetail.html("<h2>"+note.title+"</h2><p>"+note.body+"</p>").show();
			$noteForm.hide();
        };  
    });

	$("#addNoteButton").on("click", function(e) {
		$("#title").val("");
		$("#body").val("");
		$("#key").val("");
		$noteDetail.hide();
		$noteForm.show();		
	});
	
    $("#saveNoteButton").on("click",function() {

        var title = $("#title").val();
        var body = $("#body").val();
        var key = $("#key").val();
		var titlelc = title.toLowerCase();
		
		var t = db.transaction(["note"], "readwrite");
		
        if(key === "") {
            t.objectStore("note")
                            .add({title:title,body:body,updated:new Date(),titlelc:titlelc});
        } else {
            t.objectStore("note")
                            .put({title:title,body:body,updated:new Date(),id:Number(key),titlelc:titlelc});
        }

		t.oncomplete = function(event) {
            $("#key").val("");
            $("#title").val("");
            $("#body").val("");
			displayNotes();
			doCount();
			$noteForm.hide();			
		};

        return false;
    });

    $("#filterField").on("keyup", function(e) {
        var filter = $(this).val();
        displayNotes(filter);
    });
	
});

