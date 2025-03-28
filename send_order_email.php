<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$to = "your-email@hivepure.com";
$subject = "New Order from " . $data['firstName'] . " " . $data['lastName'];
$message = "
<html>
<head>
<title>New Order</title>
</head>
<body>
<h2>New Order Received</h2>
<p><strong>Customer:</strong> {$data['firstName']} {$data['lastName']}</p>
<p><strong>Email:</strong> {$data['email']}</p>
<p><strong>Phone:</strong> {$data['phone']}</p>
<p><strong>Address:</strong> {$data['address']}, {$data['city']}, {$data['state']} {$data['zip']}, {$data['country']}</p>
<h3>Order Items:</h3>
<pre>{$data['orderItems']}</pre>
<p><strong>Total:</strong> Rs.{$data['orderTotal']}</p>
<p><strong>Notes:</strong> {$data['notes']}</p>
</body>
</html>
";

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: {$data['email']}\r\n";

mail($to, $subject, $message, $headers);

echo json_encode(['success' => true]);
?>