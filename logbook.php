<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';
class logbook extends REST_Controller
	{
		function __construct(){
			parent::__construct();
			$this->load->library(array('table','form_validation'));
			$this->load->model('master/Logbook_model','',TRUE);
			$this->load->helper('url');
		}
		public function index_get()
		{

			$data['page']='master/logbook';
			$data['sidebar']='menu/master';//subject
			$data['js']='master/logbook.js';
			$this->load->view("main",$data);  
		}
		/*list out the data in table */
		public function classteachers_get()
		{
			$data=$this->Logbook_model->list_all()->result();

			$this->response($data, 200);
		}
		public function classteacher1_get()
		{
			$clazz= $this->get('classes');
			$section = $this->get('section');
			$staffid = $this->get('staffid');
			$data=$this->Logbook_model->list_all1($clazz,$section,$staffid)->result();
			$this->response($data, 200);
		}
		/*to get the id*/
	  	public function classteacher_get()
		{
			 if(!$this->get('id'))
	        {
	            $this->response(NULL, 400);
	        }
	        else
	        {
				$data=$this->Logbook_model->get_by_id($this->get('id'))->result();
				$this->response($data, 200);
			}
		}
/*to insert and update the table*/
		public function classteacher_post()
		{
	 		$json = $this->post('data'); 
			$logbook = json_decode($json,true);
			print_r($logbook);
			$id=$logbook['log_id'];
	 		if(empty($id))
	        {
				$data = $this->Logbook_model->insert($logbook);  
			}
			else
			{ 
				$data = $this->Logbook_model->update($id, $logbook); 
			}
			if(!empty($data))
				$this->response($data, 200);
			else
				 $this->response($data, 400);	
		}

/*to delete the data from table*/
		public function classteacher_delete()
		{
			$id=$this->get('id');
			$data = $this->Logbook_model->delete($id);
			if(!empty($data))
				$this->response($data, 200);
			else
				 $this->response(NULL, 400);	
		}  
	}
