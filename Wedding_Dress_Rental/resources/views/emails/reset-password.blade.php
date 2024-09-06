<!-- resources/views/emails/reset-password.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>Password Reset</title>
</head>
<body>
    <p>Click the link below to reset your password:</p>
    <a href="{{  'http://localhost:5173' . '/reset-password/' . $token . '/' . $email }}">Reset Password</a>
</body>
</html>
