<?php
header('Access-Control-Allow-Origin: *'); 
//Creates a class called Enquiry
class Enquiry
{
    public $establishment;
    public $clientName;
    public $email;
    public $checkin;
    public $checkout;
    public $time;
}

//Creates new enquiry and sets properties
$newEnquiry = new Enquiry();
$newEnquiry->establishment = $_POST["establishment"];
$newEnquiry->clientName = $_POST["clientName"];
$newEnquiry->email = $_POST["email"];
$newEnquiry->checkin = $_POST["checkin"];
$newEnquiry->checkout = $_POST["checkout"];
$newEnquiry->adults = $_POST["adults"];
$newEnquiry->children = $_POST["children"];
$newEnquiry->notes = $_POST["notes"];
$newEnquiry->time = $_POST["time"];

//Adds object to array
$enquiriesList = file_get_contents('client/public/hotel-data/enquiries.json');
$jsonInput = json_decode($enquiriesList, true);
array_push($jsonInput, $newEnquiry);

//Writes array to JSON file
$jsonData = json_encode($jsonInput);
file_put_contents('client/public/hotel-data/enquiries.json', $jsonData);
?>
