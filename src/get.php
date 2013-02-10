<?php
require("../config.php");

header("Content-Type: application/json");

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
