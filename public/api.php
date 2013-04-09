<?php
require("../config.php");

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With");

$public = "public:";
$key = $public . $_GET["key"];
$content = $redis->get($prefix.$key);

if ($content != null) {
    print(json_encode(array(
        "key" => str_replace($public, "", $key),
        "content" => $content
    )));
} else {
    header("HTTP/1.0 404 Not Found");
    print(json_encode(array("error" => "404")));
}
?>
