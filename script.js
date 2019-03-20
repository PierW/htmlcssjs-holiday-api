$(document).ready(init);

// Inizio funzione per cambiare il titolo e giorni totali
function changeTitle(id) {

  var mom = moment();
      mom.month(id);
  var days = mom.daysInMonth();
  var outputMonth = mom.format("MMMM");


  var source = $("#month-title").html();
  var template = Handlebars.compile(source);

  var data = {
    month : outputMonth,
    days : "1 - " + days
  }
  var fullHtml = template(data);

  var container = $(".holiday-list");
      container.html(fullHtml);

}


function init() {

  $(".multi-list li").click(function() {

    var me = $(this);
    var index = me.index(); //Prendo Indice
    changeTitle(index);    //Lo passo alla funzione
  });

}
