<?php
session_start();

$username = "";
$password = "";

if (isset($_COOKIE['remember_user'])) {
    $username = $_COOKIE['remember_user'];
}

if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login Page</title>
</head>

<body>

<h2>Welcome, <?php echo htmlspecialchars($username); ?>!</h2>

<h2>Log In Successful! Session Created</h2>

<form method="post">

    User Name:
    <input type="text" name="username"
           value="<?php echo htmlspecialchars($username); ?>">

    <br>

    Password:
    <input type="password" name="password"
           value="<?php echo htmlspecialchars($password); ?>">

    <br>

    <input type="checkbox" name="remember">
    Remember Me

    <br>

    <input type="submit" name="login" value="LogIn">
    <input type="reset" value="Reset">

</form>

</body>
</html>