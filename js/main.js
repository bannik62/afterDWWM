let sessionPseudo = sessionStorage.getItem('pseudo')
let sessionId = sessionStorage.getItem('id')



// $(document).ready(
//     function titre() {
//         console.log(typeof sessionPseudo);

//         if (typeof sessionPseudo == "null" || sessionPseudo === "") {
//             $("#user").html("")

//         }
//         else {
//             $("#user").html('<h5> bienvenue ' + sessionPseudo + '</h5>');
//         }

//     });

function deco() {
    sessionStorage.clear('pseudo')
    window.location.href = "index.html";
}

// ---------------api--------------------------------



var utilisateur = {
    nom: $("#nom").val(),
    prenom: $("#prenom").val(),
    telephone: $("#numero").val(),
    adresse: $("#adresse").val(),
    pseudo: $("#pseudo_ins").val(),
    password: $("#password_ins").val(),
    email: $("email").val(),

};
function getUtilisateurs(utilisateur) {

    $.ajax({
        type: 'GET',
        headers: {
            "Accept": "application/json"
        },
        url: ' http://sessionhost:3000/utilisateurs',
        data: utilisateur,
        success: function (utilisateurs) {
            console.log("coucou");
            // Traitement des utilisateurs ici
            // Par exemple, vous pourriez utiliser les données pour remplir une table HTML
        },
        error: function (err) {
            // Traitement des erreurs ici
            console.log("beuhhh")
            // Par exemple, vous pourriez afficher un message d'erreur à l'utilisateur
        }
    });
}


// Fonction pour ajouter un utilisateur
function addUtilisateur() {

    var utilisateur = {
        nom: $("#nom").val(),
        prenom: $("#prenom").val(),
        telephone: $("#numero").val(),
        adresse: $("#adresse").val(),
        pseudo: $("#pseudo_ins").val(),
        password: $("#password_ins").val(),
        email: $("#email").val(),
    }

    $.ajax({
        type: 'POST',
        url: ' http://sessionhost:3000/utilisateurs',
        data: utilisateur,
        success: function (utilisateur) {
            alert("bienvenue " + utilisateur.pseudo + " tu es inscris")
            window.location.href = "index.html";

        },
        error: function (err) {
            // Traitement des erreurs ici
            // Par exemple, vous pourriez afficher un message d'erreur à l'utilisateur
        }
    });
}


// ouverture de session 
function connexion() {


    console.log("hello world");
    var user = {
        pseudo: $("#pseudo_co").val(),
        password: $("#password_co").val(),
    }


    // Faire une requête fetch pour récupérer les données JSON
    fetch('http://localhost:3000/utilisateurs')
        .then(res => res.json())
        .then(utilisateurs => {
            // Boucle pour parcourir les objets dans le tableau
            for (var i = 0; i < utilisateurs.length; i++) {
                // Vérifier si le pseudo et le mot de passe correspondent

                if (utilisateurs[i].pseudo === user.pseudo && utilisateurs[i].password === user.password) {
                    // Stocker le pseudo et l'ID de l'utilisateur dans le sessionStorage
                    let id = sessionStorage.setItem('id', utilisateurs[i].id)
                    let pseudo = sessionStorage.setItem('pseudo', utilisateurs[i].pseudo)
                    let storedPseudo = sessionStorage.getItem('pseudo')
                    window.location.href = "index.html";
                    return;
                }
            }


        })
        .catch(err => console.log(err));
}
// ///////////////////////////////////////gestion////////////////////////////

function gestion() {
    $('.central').html('');
    $(".central").css({ 'height': '0px', 'width': '0px', 'display': 'block', 'background': 'black' }).animate({ 'height': '500px', 'width': '800px' });
    $('.central').html('<div class="container-fluid board d-flex"><div class="menu1">1</div> <div class="menu2">2</div><div class="menu3">3</div></div> ')
    $('.menu1').html(
        '<div class="cardFilm">'+
        '<img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" alt="Card image cap">'+
            '<div class="card-body">'+
                ' <h4 class="card-title"><a>Card title</a></h4>'+
                '        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p >'+
                '<a href="#" class="btn btn-primary">Button</a>'+
                '</div>'+
  '</div>'  
)};


///////////////////////////////////////////////////////////////////////////////


// Fonction pour mettre à jour un utilisateur
function updateUtilisateur(id, utilisateur) {
    $.ajax({
        type: 'PUT',
        url: '/utilisateurs/' + id,
        data: utilisateur,
        success: function (utilisateur) {
            // Traitement de l'utilisateur mis à jour ici
            // Par exemple, vous pourriez afficher un message de confirmation à l'utilisateur
        },
        error: function (err) {
            // Traitement des erreurs ici
            // Par exemple, vous pourriez afficher un message d'erreur à l'utilisateur
        }
    });
}

// Fonction pour récupérer un utilisateur par ID
function getUtilisateur(id) {
    $.ajax({
        type: 'GET',
        url: '/utilisateurs/' + id,
        success: function (utilisateur) {
            // Traitement de l'utilisateur ici
            // Par exemple, vous pourriez utiliser les données pour remplir un formulaire HTML
        },
        error: function (err) {
            // Traitement des erreurs ici
            // Par exemple, vous pourriez afficher un message d'erreur à l'utilisateur
        }
    });
}


///////////////////////////////////////////////////////////requete odb /////////////////
const key = "ba8eb959";
let error = "encore ratée"
const search = $('#search');


$(document).ready(function () {
    $("#search").val("");
    $("#search").on('input', find)

});

function find() {


    $.ajax({
        url: 'http://www.omdbapi.com/',// La ressource ciblée
        type: 'GET', // Le type de la requête HTTP
        data: { val1: 'hello', val2: 'hello2' },
        data: {
            apiKey: key, s: $(this).val()
        },

        // Fonction en cas de success de la requête
        success: function (reponse) {
            console.log(reponse);
            console.log(search.val());

            // Si l'utilisateur a saisi plus de 3 caractères
            if (search.val().length >= 3) {

                console.log($("#search").val().length);
                // On vide la div d'affichage des résultats
                $('#results').html('');

                // Si le résultat nous retourne des films 
                if (reponse.Search && reponse.Search.length != "") {


                    // On fait un foreach des films
                    reponse.Search.forEach(function (movie) {
                        // L'équivalent de cette boucle en PHP serait : foreach ($response['Search'] as $movie)

                        // On créée le HTML d'un film (une bootstrap card)

                        let movieHtml =

                            '<div class="card m-3  ">' +
                            '<div class=" cardFilm align-items-center m-3 justify-content-around mx-auto "> ' +
                            '<div class="card-header bg-dark ">  <h5>Titre: &nbsp ' + movie.Title + '</h5><br/><h5> date de sortie   ' + movie.Year + '</h5></div> ' +
                            '<div class="card-body text-center"><img src="  ' + movie.Poster + ' " height="200" max-width="50"></div>' +

                            '<div class="card-header bg-dark p-1 rounded-border-bottom"><h5 class="p-1">Type :  ' + movie.Type + '</h5>  <br/><h5>Acteur: ' + movie.Actors + '</h5> </div>' +
                            '</div>' +
                            ' </div>' +
                            '</div>';
                        ;
                        // On l'ajoute au div de résultats
                        $('#intro').html('<h5 class="text-center">resultat de votre recherche <h5>')
                        $('#results').append(movieHtml);
                        console.log($('#results'));
                    });
                }

            }
            else {
                $('#results').html(' <p class="text-center">' + error + '</p>');
            }


        },



        error: function (error) {
            // Fonction en cas d'erreur
        },



        complete: function (result, status) {
            // Fonction à executer une fois l'appel Ajax effectué (par exemple, retirer le spinner de chargement)
        }
    })
};



// html::::::::::::::::::::::::::::::::::::::::::::::::::::::::

