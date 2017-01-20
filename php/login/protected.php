<?php
session_start();

$logged = !empty($_SESSION);

if (!$logged) {
  header('Location: login.php');
}

?><!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Page admin</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
    <link rel="stylesheet" href="css/styles.css">
  </head>
  <body>
    <header>
      <a href="index.html">Home</a>
    </header>
    <h1>Zone protégée</h1>
    <p>
      Bienvenue <?= $_SESSION['email'] ?> | <a href="signout.php">Déconnexion</a>
    </p>
    <p>
      Vous ne devriez pas accéder à cette page si vous ne vous êtes pas
      authentifié.
    </p>
  </body>
</html>
