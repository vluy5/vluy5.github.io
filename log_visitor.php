<?php

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' and 'YOUR_CHAT_ID' with your actual Telegram bot token and chat ID
$telegramBotToken = '6657447350:AAF5sekOhJiC1jOaMlYWfc7qmcS7HRfq790';
$chatId = '5064446300';

// Get the visitor's IP address
$ipAddress = $_SERVER['REMOTE_ADDR'];

// Create a message with the IP address
$message = "New visitor on your website!\nIP Address: $ipAddress";

// Send the message to your Telegram bot
$telegramApiUrl = "https://api.telegram.org/bot$telegramBotToken/sendMessage";
$telegramApiParams = [
    'chat_id' => $chatId,
    'text' => $message,
];

// Use cURL to send the request to the Telegram API
$ch = curl_init($telegramApiUrl);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $telegramApiParams);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_exec($ch);
curl_close($ch);

?>
