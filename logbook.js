$(document).ready(function(){
	$('#grp_view').hide();
        var url = base_url+"index.php/master/logbook/classteachers";
		var curl = base_url+"index.php/master/section/sections";
		var vcurl = base_url+"index.php/admin/staff/staffs/roles/2"; // for teachers
		var urlpost = base_url+"index.php/master/logbook/classteacher";
 		var urlDelete = base_url+"index.php/master/logbook/classteacher/id/";
		var title= "Class Teacher";    
		$.getJSON( vcurl, function( data ) { 
			var items = []; 
			$.each( data, function( key, val ) { 
				var div_data = "<option value=" + val.staffid + ">" + val.name + "</option>";  
				$(div_data).appendTo('#staffid'); 
			}); 
		});

		load_table(sln=1);  

	$('#datatable tbody').on('click', 'tr td span a', function () {
			var name = $('td', this).eq(0).text();
			var oTable;
			if ( $.fn.dataTable.isDataTable( '#datatable' ) ) {
				oTable   = $('#datatable').dataTable();
			}
			var rowindex = oTable.fnGetPosition( $(this).closest('tr')[0] );
			var aPos     = oTable.fnGetPosition(this);
			var aData    = oTable.fnGetData(rowindex);
		   	$("#caption").html("Edit Logbook");
		   	$("#log_id").val(aData.log_id); 
            $("#classes").val(aData.classes).trigger("change");
			$("#comment").val(aData.description);  
			load_class(aData.classes,aData.section);					     
            $("#staffid").val(aData.staffid).trigger("change"); 
	});
	$('#datatable tbody').on('click', 'tr td strong a', function () {
			var oTable;
			if ( $.fn.dataTable.isDataTable( '#datatable' ) ) {
				oTable   = $('#datatable').dataTable();
			
			}
			var rowindex = oTable.fnGetPosition( $(this).closest('tr')[0] );
			var aPos     = oTable.fnGetPosition(this);
			var aData    = oTable.fnGetData(rowindex);
			$("#custom-error").html(delcmsg); 
		 	$("#mod-error").modal("show");   
			$( ".btn-danger" ).click(function(){	 
				var data = $.ajax({ 
					url: urlDelete+aData.log_id,  
				 	type:"delete", 
					success:function (html){  
						$("#datatable").dataTable().fnDestroy(); 
						var data = $.parseJSON(call_ajax(url, false, "json", "", "get").responseText);  
						load_table(sln=1,data);  
						load_table(sln=1);  
						pop_me(title,delete_msg, success); 
					}  
				}); 
			}); 
					
	});
       /* Formating function for row details */

        function fnFormatDetails ( oTable, nTr, action ){ 
            var aData = oTable.fnGetData( nTr ); 
			if(action ==='edit'){ 
				$("#log_id").val(aData.log_id); 
                $("#classes").val(aData.classes).trigger("change");  
                $("#section").val(aData.section).trigger("change");  
                $("#staffid").val(aData.staffid).trigger("change");
               
					
			}   
			if(action ==='delete'){  
				 $("#custom-error").html(delcmsg); 
				 $("#mod-error").modal("show");   
				 $( ".btn-danger" ).click(function(){	 
					var data = $.ajax({ 
						url: urlDelete+aData.log_id,  
 						type:"delete", 
						success:function (html){  
							$("#datatable").dataTable().fnDestroy(); 
							//Load table data
								var data = $.parseJSON( 
								call_ajax(url, false, "json", "", "get").responseText
							);  
							load_table(sln=1,data);  
 							pop_me(title,delete_msg, success); 
						}  
					}); 
			     }); 
			} 
        } 
 	/*Start dataTable code*/

	function load_table(sln){ 
	
	var data = $.parseJSON(call_ajax(url, false, "json", "", "get").responseText);  
		
		data = data;
	 		config={ 
			 dom: 'Bfrtip',
	         buttons: [
	           /* 'excelHtml5', 
	            'pdfHtml5',*/ 
	            
	        ],
	    	"aaData":data, 
		 	"bPaginate":false,  
		 	'iDisplayLength': 100,
	       	'language': {
		        'search': '_INPUT_',
		        'searchPlaceholder': 'Search'
	    	},
	    	"aoColumns": [	
				{"mData": null ,"sTitle":"S.No.","sWidth": "10%","sDefaultContent":0,"mRender": function (data,type){    return (type=="display")? sln++:0; 
				}
				},
				//{ "mData": "log_id","sTitle":"Log id"}, 	 
		      	{ "mData": "classes","sTitle":"Class"}, 
			 	{ "mData": "section","sTitle":"Section"},
			 	//{ "mData": "staffid","sTitle":"Staff idd"}, 
			  	{ "mData": "name","sTitle":"Staff Name"},
			  	{ "mData": "description","sTitle":"Description"}, 
		    	{"mData": null,"sTitle":"Edit / Delete","sDefaultContent": "<td><span><a class='btn btn-primary btn-xs md-trigger' data-toggle='modal'><i class='fa fa-pencil'></i></a></span><strong><a class='btn btn-danger btn-xs' href='#' data-original-title='Remove' data-toggle='tooltip'><i class='fa fa-times'></i></a></strong></td>","sWidth": "25%","bSortable": false}
		    
	    	],
	    		
		}; 

		$('#datatable').dataTable(  config  );
  	}
 	/*End dataTable code*/
/*to save the data */
	var frm = $("#form"); 
	var JSONdataclear = JSON_Array(frm); 

	$("#save").click(function(){ 
		if ( !$('#form').parsley().validate()) {
               event.preventDefault();	
               return false; 
        }
 		var frm = $("#form"); 
		var serialized = frm.serializeArray(); 
		var JSONdata = JSON_Array(frm);
		var data = {data:JSONdata};
		var request = call_ajax(urlpost, false, "json", data, "post"); 
			if(request.statusText=="OK"){  
				$("#datatable").dataTable().fnDestroy(); 
				pop_me(title,save_msg, success); 
				$("#classes").val("").trigger("change");  
	   			$("#section1").val("").empty().select2(); 
	 			$("#staffid").val("").trigger("change");
	 			$("#comment").val("").trigger("change"); 

			}
            var data = $.parseJSON(call_ajax(url, false, "json", "", "get").responseText);  
				load_table(sln=1,data);  //call function
			}); 
 
	 $("#cncl").click(function(){ 
		  $("#log_id").val(""); 
		  $("#classes").val("").trigger("change");  
          $("#section1").val("").empty().select2(); 
          $("#staffid").val("").trigger("change");
          $("#comment").val("").trigger("change");  
	 });

	$("#classes").on("select2-selecting", function(e) {											   
	classes = e.val;
	section ="";
	load_class(classes,section);
});
	
	function load_class(classes,section){										  
		var urlgetsection = base_url+"index.php/master/section/classsection/classes/"+encodeURI(classes);
	    request = $.ajax({
		url: urlgetsection,
	    type: "get"
	    });
	    request.done(function(response) {
			$('#section1').find('option').remove().end().append('<option value="">Section</option>');
			$.each( response, function( key, val ) { 
			   var div_data = "<option value=" + val.sectionName + ">" + val.sectionName + "</option>";  
				   $(div_data).remove();
				   $(div_data).appendTo('#section1'); 
				   if(section != ""){
						$("#section1").val(section).trigger("change"); 
						

					   }
				   else{
					   $("#section1").val("").trigger("change"); 
					   }
	  		}); 
			
	    });

	  	if(classes == 'XI Std' || classes == 'XII Std' ){
	  		$('#grp_view').show();

	  	}else{
	  	
	  	$('#grp_view').hide();
	  	}
	}

 	$("#groupid").on("select2-selecting", function(e) {											
		var clsName = $('#classes').val();
		var groupid = e.val;
		var url_sub = base_url+"index.php/master/logbook/subfilterbyclsandsec/classes/"+clsName+"/groupid/"+groupid;
	  
		$('#subjectId1').find('option').remove().end().append('<option value="0">Subject</option>');
	    var data = call_ajax(url_sub, false, "json", "", "get").responseText;	
		var result = $.parseJSON(data);
		$.each( result, function( key, val ) { 															
		   var div_data = "<option value=" + val.subjectId + ">" + val.subjectName + "</option>";  
		   $(div_data).appendTo('#subjectId1'); 
		  });										
	});


$("#search").click(function(){ 
		
  	var classes = $("#classes").val(); 
    var section= $("#section1").val();
    var staffid = $("#staffid").val();
    var description = $("#comment").val();	
	var url_id = base_url+"index.php/master/logbook/classteacher1";			
	var urlData = url_id +'?classes='+classes+'&section='+section+'&staffid='+staffid;
	$("#datatable").dataTable().fnDestroy();
		
		var listdata = $.parseJSON(
		 call_ajax(urlData, false, "json", "", "get").responseText
	); 
 
		load_table(sln=1,listdata);
});

});

