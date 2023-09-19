//Phone confirm
function isphoneisvalid(p) {
  var pnumber = p.replace(/[^0-9]/g, "");
  return (
    (pnumber.length === 10 && pnumber.indexOf("5") === 0) ||
    (pnumber.length === 11 && p.indexOf("05") === 0) ||
    (pnumber.length === 11 && p.indexOf("5") === 0)
  );
}
//Phone confirm

//mail reg
function isEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
//mail reg

$(document).ready(function () {
  try {
    $(".select").select2({
      minimumResultsForSearch: -1,
    });
    $("#phone").inputmask(
      "(599) 999-9999",
      { placeholder: "(5__) ___-____" },
      { greedy: false, jitMasking: true, numericInput: true, repeat: 10 }
    );
  } catch (e) {}
  //Captch
  $("#captchaImg").click(function () {
    refreshCaptcha();
  });
  //Captch

  //Phone mask

  $("#phone").bind("keypress", function (event) {
    var regex = new RegExp("^[0-9]*$");
    var key = String.fromCharCode(
      !event.charCode ? event.which : event.charCode
    );
    if (
      event.keyCode !== 8 &&
      event.keyCode !== 46 &&
      event.keyCode !== 9 &&
      event.keyCode !== 13 &&
      !(event.keyCode >= 35 && event.keyCode <= 40)
    ) {
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    }
  });

  $("#phone").on("keyup change", function () {
    var max_length = $(this).attr("maxlength");
    var telval = $(this).val().trim();
    if (telval.length > 0) {
      if (this.value.length >= max_length) {
        $(this).val($(this).val().substr(0, max_length));
      }
    }
  });

  $.validator.addMethod(
    "validPhone",
    function (value, element) {
      return isphoneisvalid(value);
    },
    ""
  );
  //Phone mask

  try {
    $(".BirthDate").inputmask({
        alias: 'dategood',
        min: '01/01/1993',
        max: '10/08/2018'
    });
} catch (e) {

}

var today = new Date(); var dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
var mm = today.getMonth() < 10 ? `0${today.getMonth()}` : today.getMonth() + 1; var yyyy = today.getFullYear();
var maxDate = `${dd}-${mm}-${yyyy}`;
console.log(maxDate);
try {
    $('.BirthDate').inputmask('datetime',
        {
            inputFormat: 'dd/mm/yyyy',
            placeholder: '_',
            clearIncomplete: true,
            min: '01-01-1900', max: maxDate
        });
} catch (e) {

}

//email confirm
$('#mail').bind('keypress', function (event) {
    var regex = new RegExp("^[ ]*$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (regex.test(key)) {
        event.preventDefault();
        return false
    }
});
$('#mail').keyup(function () {
    var $th = $(this);
    $th.val($th.val().replace(/\s+/g, function (str) {
        return ''
    }))
});

$.validator.addMethod("strictemail", function (value, element) {

    var valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value);
    return valid;
}, ""
);
//email confirm
});


//Captch
function refreshCaptcha() {
    var cImage = $("#captchaImg").attr("src") + "";
    cImage = cImage.split("?")[0];
    cImage = cImage + "?q=" + Math.random();
    $("#captchaImg").attr("src", cImage);
    $("#capcha").val("");
}

var timeInterval;
function startTimer(duration, display, disableElem) {
    var timer = duration, minutes, seconds;
    clearInterval(timeInterval);

    timeInterval = setInterval(function () {

        window.sessionStorage.setItem("_time", timer);

        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            //timer = duration;
            disableElem.attr("disabled", "disabled");
            clearInterval(timeInterval);
        }
    }, 1000);
}

/* WEBP Check */
function check_webp_feature(callback) {
    var lossy = "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"

    var img = new Image();
    img.onload = function () {
        var result = (img.width > 0) && (img.height > 0);
        callback(result);
    };
    img.onerror = function () {
        callback(false);
    };
    img.src = "data:image/webp;base64," + lossy;
}
function setQueryString(key, value) {
    var uri = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

function getQueryString(name) {
    var url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}