//loader
function loading(status) {
  if (status == true) {
    $(".loadingOverlay").addClass("active");
    $("html").css("overflow", "hidden");
  } else if (!status) {
    $(".loadingOverlay").removeClass("active");
    $("html").css("overflow-y", "auto");
  }
}

$(document).ready(function () {
  $("body").on("click", ".popupButton", function () {
    var elem = $(this).attr("attr-popup-id");
    var title = $(this).attr("attr-title");
    var text = $("#" + elem + "").html();
    Swal.fire({
      title: title,
      html: text,
      showCancelButton: false,
      showConfirmButton: false,
      confirmButtonText: "TAMAM",
      showCloseButton: true,
      showClass: {
        backdrop: "text_popup",
      },
      closeButtonHtml: '<i class="fa-solid fa-xmark"></i>',
    });
  });

  $("body").on("click", ".mobil-button", function () {
    $("body").toggleClass("menu-active");
  });

  $("body").on("click", ".left li", function () {
    var index = $(this).index();
    $('.left li').removeClass('active');
    $(this).addClass('active');
    $('.right li').hide();
    $('.right li:eq('+index+')').show();
  });
});
