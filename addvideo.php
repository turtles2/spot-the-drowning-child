<?php
$file_name = "drowning_videos.txt";

$videos = array();

if(is_writable($file_name) and is_readable($file_name)){
    // all good
}else{
    // not good abort
    exit("Unable to read or write to $file_name script aborted");

}

$input_json = file_get_contents($file_name);

$videos = json_decode($input_json);

$video = array(
    "videoId" => $_POST['videoId'],
    "drowningStartSecs" => $_POST['drowningStartSecs'],
    "whistleSecs" => $_POST['whistleSecs'],
    "swimmerSavedSecs" => $_POST['swimmerSavedSecs'],
    "findBoxStyle" => $_POST['findBoxStyle'],
    );

array_push($videos,$video);

$output_json = json_encode($videos);

file_put_contents("$file_name",$output_json);

print_r($videos);

 ?>
