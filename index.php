<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//CZ" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta charset="UTF8">
<head profile="http://www.w3.org/2005/10/profile">
  <link rel="icon" type="image/png" href="http://the-man-called-jakob.com/favicon.png">
<meta name="Pani Mala" content="Artist" />
<meta name="keywords" content="" />
<meta name="description" content="" />
    <script src="js/jquery-2.1.3.js"></script>
    <script src="js/jquery.easing.1.3.js"></script>
    <link rel="stylesheet" type="text/css" href="styles/main.css">
</head><body>
<script>
<?php 
date_default_timezone_set('Europe/Amsterdam');
// collectThings();

echo "var json = " . getJson();

?>
</script>
<!-- <div id="containter"> -->
<div id="contentainer"></div>
<div id="animator"></div>
<!-- </div> -->

<script src="js/main.js"></script>
</body>
</html>
<?php // functions as tools

function getJson(){

		$json = file_get_contents('json/list.json');

		$content = json_decode($json, true);

		// foreach ($content as $key => $value){
		// 	$image["size"] = getimagesize($path . '/' . $project . '/' . $value);
		// 	echo ($key+1) . " ::: " . (htmlspecialchars($value["name"])) . "<br>";
		// }
		for($i = 0; $i < count($content); $i++){
			$content[$i]["imagesize"] = getimagesize('pics/' . $content[$i]["id"] . '.jpg');
			$content[$i]["prevsize"] = getimagesize('pics/prev/' . $content[$i]["id"] . '.jpg');
		}
		return str_replace(array("\r", "\n"), "", json_encode($content));
}
?>
