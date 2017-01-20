<?php
session_start();


const DB_SERVER   = "localhost";
const DB_USER     = "cpnv";
const DB_PASSWORD = "cpnv1234";
const DB_NAME     = "infosec";


if (!empty($_POST)) {
  $email = filter_input(INPUT_POST, "email");
  $password = filter_input(INPUT_POST, "password");
  $password_hashed = password_hash($password, PASSWORD_DEFAULT);

  $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME);
  if ($mysqli->connect_errno) {
      // Faire quelque chose avec l'erreur.
      // Attention, pour des raisons de sécurité, il est déconseillé
      // d'afficher des informations sur votre base de données en cas
      // d'erreur. Il vaut mieux mettre un message d'erreur générique.
      echo "Erreur ({$mysqli->connect_errno}): {$mysqli->connect_error}";

      // Exit, redirect, à vous de choisir en fonction de votre
      // scénario.
      exit();
  }

  $query = "insert into users (email, password) values(?, ?)";
  $stmt = $mysqli->prepare($query);
  // Il faudrait gere les erreurs eventuelles.
  $stmt->bind_param('ss', $email, $password_hashed);
  $stmt->execute();

  $_SESSION['email'] = $email;
  $_SESSION['id']    = $stmt->id;

  header('Location: protected.php');
  exit();
}




?><!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Login</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
    <link rel="stylesheet" href="css/styles.css">
  </head>
  <body>
    <header>
      <a href="index.html">Home</a>
    </header>
    <h1>Sign up</h1>
    <form id="login" action="register.php" method="post">
      <div>
        <label for="email">Email: </label><!-- to remove space
        --><input type="email" id="email" name="email" value="cly@cpnv.ch">
      </div>
      <div>
        <label for="password">Password: </label><!-- to remove space
        --><input type="password" id="password" name="password">
      </div>
      <div>
        <input type="submit" value="Enregistrement">
      </div>
    </form>
    <div>
      Déjà enregistré ? <a href="login.php">Connectez-vous</a>.
    </div>
  </body>
</html>
