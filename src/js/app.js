import 'select2/dist/css/select2.min.css';

import '../scss/main.scss';

import lottieWeb from 'lottie-web';

import $ from 'jquery';
import select2 from 'select2';
import anim from './data.json';
import { currencies } from './currencies.fake.js';
import 'jquery-validation/dist/jquery.validate.min';
//
// select2($);
window.$ = $;
$('.hero__arrow').click(function () {
  $('html, body').animate(
    {
      scrollTop: $('#wallet-section').offset().top - 70,
    },
    200,
  );
});

lottieWeb.loadAnimation({
  animationData: anim,
  container: document.querySelector('.ghx-box__animation--content'), // required
  path: 'data.json', // required
  assetsPath: 'images/content/',
  renderer: 'svg', // required
  loop: true, // optional
  autoplay: true, // optional
});

document.querySelector('.copy').addEventListener('click', function () {
  var $temp = $('<input>');
  $('body').append($temp);
  $temp.val($('.wallet-id').text()).select();
  document.execCommand('copy');
  $temp.remove();
  $('.copy-tooltip').show();
  setTimeout(function () {
    $('.copy-tooltip').hide();
  }, 1000);
});
function selectFormatState(state) {
  if (!state.id) {
    return state.text;
  }
  const baseUrl = `images/content/${state.icon}.svg`;
  const $state = $(
    `<div class="d-flex align--center font--14"><img src="${baseUrl}" class="mr-1" /> <span class="text--semiBold text--dark"> ${state.text}  </span> 
    <div class="ml-auto d-flex">
    <div class="text--dark text--medium mr-1"  > ${state.rate} BTC </div>
    <div class="text--gray text--medium"> ${state.value} ${state.currency} </div>
    </div>

  
      </div>`,
  );
  return $state;
}

$(() => {
  $('.select2-custom-currency').select2({
    placeholder: 'Select an option',
    data: currencies,
    containerCssClass: 'select2-custom',
    minimumResultsForSearch: -1,
    templateResult: selectFormatState,
    templateSelection: selectFormatState,
  });
});

$('.logIn-modal-target').click(function () {
  $('.modalbox').addClass('modal-open');
  $('body').css({ overflow: 'hidden' });
});
$(document).click(function(event) {
  if (!$(event.target).closest('.modalbox__content,.logIn-modal-target').length) {
    $('body').find('.modalbox').removeClass('modal-open');
    $('body').css({ overflow: 'auto' });
  }
});

$('#logIn').validate({
  rules: {
    email: {
      required: true,
    },
    password: {
      required: true,
    },
  },
  highlight: function (element) {
    $(element).parent().addClass('input-group--error');
  },
  unhighlight: function (element) {
    $(element).parent().removeClass('input-group--error');
  },

  errorClass: 'input-group--error',
  errorElement: 'div',
  focusInvalid: false,

  messages: {
    email: {
      required: 'this field is required',
    },
    password: {
      required: 'this field is required',
    },
  },
  submitHandler: function (form) {
    const data = $(form);
    const url = 'http://pszober.dev.cogitech.pl/api/login';

    $.ajax({
      type: 'POST',
      url: url,
      data: data.serialize(),
      success: function (data) {
        console.log(data);
        alert('user has been logged');
        $('.modalbox').css({ opacity: 0, visibility: 'hidden' });
        $('body').css({ overflow: 'auto' });
      },
      error: function (data) {
        console.log(data);
        if ([0, 500].includes(data.status)) {
          alert('API ERROR, check console and contact with administrator!');
        }
        if (data.status === 400) {
          console.log('400');
          $('.form--error').append(
            '<div class="login-error"> incorrect email, username or password </div>',
          );
        }
      },
    });
  },
});
