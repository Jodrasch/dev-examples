$(document).ready(function () {

  // On enregistre un événement qui sera exécuté lorsqu'on clique sur
  // un li qui est dans un #menu.
  $('.menu li').click(function (evt) {

    // menuId contient la valeur de l'attribut data-menu
    // du menu qui vient d'être cliqué.
    var menuId = $(evt.target).data('menu');

    console.log("Menu id cliqué: " + menuId);

    // Il s'agit de masquer tous les sous-menus (class submenu)
    // sauf celui qui doit être affiché.
    $('.submenu').filter(function (index, element) {
      console.log("Id de l'élément courant : " + $(element).attr('id'));
      return $(element).attr('id') != menuId;
    }).addClass('not-displayed');

    // On affiche ou masque le menu sur lequel on vient de cliquer.
    $('#' + menuId).toggleClass('not-displayed');
  });

});
