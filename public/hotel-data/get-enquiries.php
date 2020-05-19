<?php
    header('Access-Control-Allow-Origin: *'); 
    $enquiriesList = file_get_contents('client/public/hotel-data/enquiries.json');
    header('Content-Type: application/json');
    echo ($enquiriesList);
?>