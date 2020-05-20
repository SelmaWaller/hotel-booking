<?php
    header('Access-Control-Allow-Origin: *'); 
    $contactList = file_get_contents('client/public/hotel-data/contact.json');
    header('Content-Type: application/json');
    echo ($contactList);
?>