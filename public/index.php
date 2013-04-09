<?php
require("../config.php");

$public = "public:";
$key = $public . $_GET["key"];
$content = $redis->get($prefix.$key);

if ($content != null) {
    print($content);
} else {
    print("404");
}
?>
