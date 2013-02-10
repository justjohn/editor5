<?php
// composer provided autoloader
require("../vendor/autoload.php");
header("Content-Type: application/json");

$prefix = "doc:";

$redis = new Predis\Client();

$key = $_GET["key"];
$content = $redis->get($prefix.$key);

if ($content != null) {
    print(json_encode(array(
        "key" => $key,
        "content" => $content
    )));
} else {
    print(json_encode(array("error" => "404")));
}
?>
