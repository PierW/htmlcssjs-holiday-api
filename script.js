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
      mom.month(id);
      mom.year(2018);
  var days = mom.month(id).daysInMonth();

  var source = $("#list").html();
  var template = Handlebars.compile(source);
  var container = $(".holiday-list ul");
      container.html("");       //Ripulisco container a prescindere

  for (var day = 1; day <= days; day++) {

        mom.date(day);
    var output = mom.format("DD MMMM YYYY");
    var datamachine = mom.format("YYYY-MM-DD");
    var data = {
      li: output,
      data_machine: datamachine
    }
    var fullHtml = template(data);
        container.append(fullHtml);
  }

}

function checkHoliday(month) {

  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/holidays",
    method: "GET",
    data: { year: 2018, month: month},
    success: function (dati, stato){

      if (dati.success) {

        var holidays = dati.response;
        for (var i = 0; i < holidays.length; i++) {

          var findDataMachine = $("li[data-check='" + holidays[i].date + "']");
              findDataMachine.addClass("red");
              findDataMachine.text(
                findDataMachine.text()
                + " - "
                + holidays[i].name);
        }
      }
    },
    error: function(richiesta, stato, errori) {

      alert("Errore di connessione.")
    }
  });
}



function init() {

  $(".multi-list li").click(function() {

    var me = $(this);
    var index = me.index(); //Prendo Indice
    changeTitle(index);    //Lo passo alla funzione
    changeList(index);
    checkHoliday(index);
  });

}
