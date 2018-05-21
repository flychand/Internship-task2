<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class Logbook_model extends CI_Model
		{
				private $table = 'log_book'; 
				function __construct(){
				parent::__construct();
				}
				function list_all(){

				   $this->db->select('lb.log_id,classes,section,lb.staffid,s.name,lb.description',FALSE);
				   $this->db->from('log_book lb,staffs s');
				   $this->db->where('lb.staffid=s.staffid','',FALSE);
				   $this->db->order_by('section','asc');
				   return  $this->db->get();
				}
				function list_all1($clazz,$section,$staffid){
					 $s='';
						if(!empty($clazz))
							$s .= " lb.classes = '".$clazz."' AND ";
						if(!empty($section))
							$s .= "   lb.section = '".$section."' AND ";
						if(!empty($staffid)){
							$s .= "   lb.staffid = '".$staffid."' AND ";}
				 
				   $this->db->select('lb.staffid,lb.description ,log_id,ROMAN_CLS(classes),classes,section,s.name AS staffname',FALSE);
				   $this->db->from('log_book lb,staffs s');
				   $this->db->where($s.'lb.staffid=s.staffid','',FALSE);
				   $this->db->order_by('section','asc');
				   return $this->db->get();
				}

				function get_by_id($id){
					$this->db->where('log_id', $id);
					return $this->db->get($this->table);
				}

				function insert($object){ 
					if ( ! $this->db->insert($this->table, $object)){
						
						$error = $this->db->error();
					}
					return $this->db->insert_id();
				}
				function update($id, $object){
					$this->db->where('log_id', $id);
					 if ( ! $this->db->update($this->table, $object)){
						 	$error = $this->db->error();
						}
					return  $this->db->affected_rows();
				}
				function delete($id){
					$this->db->where('log_id', $id);
					$this->db->delete($this->table);
					return $this->db->affected_rows();
				}
		}