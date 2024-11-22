<?php

session_start();
// Update contact.php
if(isset($_POST["submit"])) {
    $recipient = "carlos.nieves@estudiantat.upc.edu";
    $subject = "Email Portfolio";
    $sender = strip_tags($_POST["sender"]);
    $senderEmail = strip_tags($_POST["senderEmail"]);
    $message = strip_tags($_POST["message"]);

    $mailBody = "Name: $sender\nEmail: $senderEmail\n\nMessage:\n$message";
    
    $headers = "From: $sender <$senderEmail>\r\n";
    $headers .= "Reply-To: $senderEmail\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if(mail($recipient, $subject, $mailBody, $headers)) {
        $_SESSION['message'] = "Thank you! Your message has been sent.";
        $_SESSION['message_type'] = "success";
    } else {
        $_SESSION['message'] = "Sorry, there was an error sending your message.";
        $_SESSION['message_type'] = "error";
    }
    
    header("Location: index.php#contact");
    exit();
}
?>