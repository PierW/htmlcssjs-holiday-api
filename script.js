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

  var container = $(".holiday-title");
      container.html(fullHtml);

}

function changeList(id) {

  var mom = moment();
  var days = mom.month(id).daysInMonth();

  var source = $("#list").html();
  var template = Handlebars.compile(source);
  var container = $(".holiday-list ul");
      container.html("");

  for (var day = 1; day <= days; day++) {

        mom.month(id);
        mom.year(2018);
    var output = mom.format("MMMM YYYY")

    var data = {
      li: day + " " + output
    }
    var fullHtml = template(data);
        container.append(fullHtml);
  }
}


function init() {

  $(".multi-list li").click(function() {

    var me = $(this);
    var index = me.index(); //Prendo Indice
    changeTitle(index);    //Lo passo alla funzione
    changeList(index);
  });

}
