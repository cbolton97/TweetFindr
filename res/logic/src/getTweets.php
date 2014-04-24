
<?php

session_start();

ini_set('display_errors','On');
error_reporting(E_ALL);

$query = urlencode(htmlentities($_POST['query'], ENT_COMPAT, 'UTF-8'));

//Perhaps I shouldn't be using this?
require_once("twitteroauth.php"); //Path to twitteroauth library

$notweets = 30;
$consumerkey = "uqfeqMugt4nHyq4Ijd2XoQ";
$consumersecret = "awKlsv4HRm5IEAkScBLOKXJuefNMpwOsDlGmQmuF7zA";
$accesstoken = "355378041-kGNQSnXE3zOd2al47Pdx7mnQQLIzcnAWo2vZPXv0";
$accesstokensecret = "60Gc7By29jUadAornsVpauhYtMCS4DT705d1iSw9gYKxw";

function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
 

$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);

echo json_encode($connection->get("https://api.twitter.com/1.1/search/tweets.json?q=$query"));



