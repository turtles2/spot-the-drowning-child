<?php
// This script loads the videos from the file for javascript

$file_name = "drowning_videos.txt";

$videos = array();

if(is_writable($file_name) and is_readable($file_name)){
    // all good
}else{
    // not good abort
    exit("Unable to read or write to $file_name script aborted");

}

$input_json = file_get_contents($file_name);

echo "$input_json";
 ?>
