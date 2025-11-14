<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $name = isset($data['name']) ? strip_tags(trim($data['name'])) : '';
    $email = isset($data['email']) ? strip_tags(trim($data['email'])) : '';
    $message = isset($data['message']) ? strip_tags(trim($data['message'])) : '';
    $recaptchaToken = isset($data['recaptchaToken']) ? $data['recaptchaToken'] : '';
    
    // Validation
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Please fill all required fields']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid email address']);
        exit;
    }
    
    // Verify reCAPTCHA
    if (!empty($recaptchaToken)) {
        $recaptchaSecret = '6LeVRgwsAAAAAGheevsoWx95NwhGpq5FzmwDdHui';
        $recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
        
        $recaptchaData = array(
            'secret' => $recaptchaSecret,
            'response' => $recaptchaToken
        );
        
        $options = array(
            'http' => array(
                'method'  => 'POST',
                'header'  => 'Content-type: application/x-www-form-urlencoded',
                'content' => http_build_query($recaptchaData)
            )
        );
        
        $context = stream_context_create($options);
        $verify = file_get_contents($recaptchaUrl, false, $context);
        $recaptchaResponse = json_decode($verify);
        
        // Check reCAPTCHA score (v3 returns a score between 0.0 and 1.0)
        // if (!$recaptchaResponse->success || $recaptchaResponse->score < 0.3) {
        //     http_response_code(400);
        //     echo json_encode(['success' => false, 'message' => 'Bot detected. Please try again.']);
        //     exit;
        // }
    }
    
    // Email configuration
    $to = "info@excursionsdubai.ae";
    $subject = "New Contact Form Message from $name";
    
    $email_body = "==============================================\n";
    $email_body .= "NEW CONTACT FORM SUBMISSION\n";
    $email_body .= "==============================================\n\n";
    $email_body .= "From: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Date: " . date('F j, Y, g:i a') . "\n\n";
    $email_body .= "----------------------------------------------\n";
    $email_body .= "MESSAGE:\n";
    $email_body .= "----------------------------------------------\n\n";
    $email_body .= "$message\n\n";
    $email_body .= "==============================================\n";
    
    $headers = "From: Excursions Dubai Contact Form <noreply@excursionsdubai.ae>\r\n";
    $headers .= "Reply-To: $name <$email>\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    if (mail($to, $subject, $email_body, $headers)) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully!']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again later.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>