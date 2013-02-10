<?php
 // composer provided autoloader
require("../vendor/autoload.php");
header("Content-Type: application/json");

$prefix = "doc:";
 
$redis = new Predis\Client();
 
$key = $_POST["key"];
$content = $_POST["content"];

if (empty($key))
    $key = base_convert(time(), 10, 36);
    
$redis->set($prefix.$key, $content);

print(json_encode(array(
    "key" => $key
)));

?>
