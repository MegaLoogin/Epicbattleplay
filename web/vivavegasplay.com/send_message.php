<?php

$name = $_POST['name'];
$phone = $_POST['email'];
$email = $_POST['phone'];
$token = "7424399552:AAEBzocbQM3LK6lMnFOWqmCqz4afpowsbzo";
$chat_id = "666831176";
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон: ' => $phone,
  'Email' => $email
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: thankful.php');
} else {
  echo "Error";
}
?>