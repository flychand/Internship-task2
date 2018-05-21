

<div class="container-fluid"  >
     <div class="cl-mcont">
          <div class="row">
               <div class="col-md-5 col-sm-5">
                    <div class="block-flat">
                         <div class="header">
                              <h3 id="caption">Add Logbook</h3>
                         </div>
                         <div class="content">
                            <form class="form-horizontal" name="form" id="form" role="form">
                                  
                            <div class="form-group">
                              <label for="classes" class="col-sm-4 control-label">Class</label>
                                  <div class="col-sm-8"> 
                                    <select class="select2" id="classes" name="classes" required parsley-trigger="change" > 
			                              <option value=""> Class</option>
			
                                    </select> 
                                  </div>
                            </div>
                    <div class="form-group" id="grp_view">
                          <label for="classes" class="col-sm-4 control-label">Group</label>
                              <div class="col-sm-8"> 
                                <select class="select2" id="groups" name=""> 
                                  <option value=""> Groups</option> 
                                </select>

     
                            </div>
                    </div>
                                   
                    <div class="form-group">
                          <label for="section" class="col-sm-4 control-label">Section</label>
                            <div class="col-sm-8">
                                <select class="select2" id="section1" name="section" required parsley-trigger="change"><option value="">Section</option></select>
                            </div>
                    </div>
                    <div class="form-group">
                      <label for="staffid" class="col-sm-4 control-label">Staff Name</label>
                      <div class="col-sm-8"> 
                        <select class="select2" id="staffid" name="staffid" required parsley-trigger="change">
                        <option value="">Staffs</option>  
                       </select>

                      </div>
                    </div>

                    <div class="form-group">
                           <label for="comment" class="col-sm-4 control-label">Comments</label>
                            <div class="col-sm-8">
                                <textarea class="form-control vresize" style="resize:none" cols="5" rows="8" id="comment" name="description"></textarea>
                            </div>
                    </div>
                                  
                          <div class="form-group">
                            <div class="col-sm-offset-4 col-sm-10"><!--type="hidden"-->
                              <input id="log_id" name="log_id" type="hidden" class="form-control" value="0">
                              <button  id="cncl"  name="cncl"  type="button" class="btn btn-default btn-flat md-close" data-dismiss="modal" value="Cancel">Clear</button>
											<!--  <button type="button" id="search"  name="search" class="btn btn-warning btn-flat" data-dismiss="modal">&nbsp;Show&nbsp; </button> -->
                                 <button type="button" id="save"  name="save" class="btn btn-primary btn-flat" data-dismiss="modal">&nbsp;Save&nbsp; </button>
											  
                                        </div>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
               <div class="col-md-7 col-sm-7 block-flat">
                   
                         <table class="table table-bordered" id="datatable" > 


                         </table>
                    
               </div>
          </div>
     </div>
</div>  