document.querySelector('.copy').addEventListener('click', function () {
  var $temp = $('<input>');
  $('body').append($temp);
  $temp.val($('.wallet-id').text()).select();
  document.execCommand('copy');
  $temp.remove();
});

$('.logIn-modal-target').on('click', function () {
  $('.modalbox').css({ opacity: 1, visibility: 'visible' });
  $('body').css({ overflow: 'hidden' });
});

$('.hero__arrow').click(function () {
  $('html, body').animate(
    {
      scrollTop: $('#wallet-section').offset().top - 70,
    },
    200,
  );
});
