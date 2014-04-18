<?php
session_start();
require_once("twitteroauth.php"); //Path to twitteroauth library
 
$twitteruser = "cbolton97";
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
 
$tweets_raw = $connection->get("https://api.twitter.com/1.1/search/tweets.json?q=ukraine");
?>
<script>
	var tweets = <?php $json_encode($tweets_raw); ?>
</script>
?>