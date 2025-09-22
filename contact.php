<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(strip_tags($_POST['name']));
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $phone = htmlspecialchars(strip_tags($_POST['phone']));
    $company = htmlspecialchars(strip_tags($_POST['company']));
    $message = htmlspecialchars(strip_tags($_POST['message']));

    if(!$email) {
        echo "Invalid email!";
        exit;
    }

    $to = "wajahatalimalik@outlook.com";
    $subject = "Contact Form Submission from $name";
    $body = "Name: $name\nEmail: $email\nPhone: $phone\nCompany: $company\nMessage:\n$message";
    $headers = "From: $email";

    if(mail($to,$subject,$body,$headers)){
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message. Please try again.";
    }
}
?>
