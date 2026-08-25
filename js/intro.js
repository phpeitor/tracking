$(window).on("load", function () {
  "use strict";

  var count = 0;

  // AUTO detect total frames
  var frames = $('[id^="frame"]');
  var pagenum = frames.length;

  var playing = false;
  var idSound = $('#playerintro');
  var loader = $('.preloaderintro');
  var n = document.getElementById('playerintro');
  var allelement = $('div, h1, h2, h3, h4, h5, p, ul, li, a, i, button, section, span');
  var box = $('#boxintro');
  var boxwrap = $('#main-intro');
  var boxskip = $('#boxskip');

  // redirect landing page
  function directpage() {
    window.location.href = 'index.html';
  }

  // =================
  // PRELOADER ONLY (NO AUTOPLAY, NO AUTO ANIMATION)
  // =================
  loader.fadeOut('slow', function () {
    $('#boxintro').fadeIn(300);
  });

  // skip button
  boxwrap.on('mouseenter', function () {
    boxskip.show();
  });
  boxwrap.on('mouseleave', function () {
    boxskip.hide();
  });

  // skip button
  $(document).on('click', '#skipbtn', function () {
    $(this).fadeOut(500);
    setTimeout(function () {
      endpage();
    }, 600);
  });

  // =====================
  // PLAY BUTTON CONTROL
  // =====================
  $(document).on('click', '#intro-play-btn', function () {
    $('#intro-play-overlay').fadeOut(1500);

    $('#frame1').fadeOut(600, function () {
      animationstart();

      n.muted = false;
      n.play();

      idSound[0].volume = 0;
      idSound.animate({ volume: 1 }, 2000);

      playing = true;
      $('#soundintro').removeClass('soundOffintro').addClass('soundOnintro');
    });
  });

  // =====================
  // SOUND BUTTON TOGGLE
  // =====================
  $(document).on('click', '#soundintro', function () {
    $(this).toggleClass("soundOffintro");

    if (playing === false) {
      n.muted = false;
      n.play();
      playing = true;

      idSound[0].volume = 0;
      idSound.animate({ volume: 1 }, 1000);

    } else {
      playing = false;

      idSound[0].volume = 1;
      idSound.animate({ volume: 0 }, 1000, function () {
        n.pause();
      });
    }
  });

  // =========================
  // ANIMATION START
  // =========================
  function animationstart() {
    count++;

    var page = $('#frame' + count);

    if (!page.length) {
      endpage();
      return;
    }

    var timeframe = page.attr("data-frame");

    if (count >= pagenum) {
      setTimeout(endpage, timeframe);
    } else {
      setTimeout(animress, timeframe);
    }

    page.fadeIn(1000);

    allelement.each(function () {
      var $this = $(this);
      var time = $this.attr('data-time');

      if (time) {
        setTimeout(function () {
          $this.addClass('intro');
        }, time);
      }
    });
  }

  // =================
  // CLEAR ANIMATION
  // =================
  function animress() {
    var page = $('#frame' + count);
    var fallText = page.find('.fall-text');

    if (fallText.length) {
      fallText.removeClass('intro done');
      void fallText[0].offsetWidth;
      fallText.addClass('out');
    }

    allelement.each(function (i) {
      var t = $(this);
      setTimeout(function () {
        t.removeClass('intro');
      }, (i + 1) * 10);
    });

    setTimeout(function () {
      page.fadeOut(1000, 'swing', function () {
        if (fallText.length) {
          fallText.removeClass('out');
        }
        animationstart();
      });
    }, fallText.length ? 500 : 0);
  }

  // ============
  // END PAGE
  // ============
  function endpage() {
    $('#main-intro').fadeOut(1000, 'swing');

    var page = $('#frame' + count);
    page.fadeOut(500, 'swing');

    // show first frame again softly
    $('#frame1').fadeIn(3000);

    // wait intro fade first
    setTimeout(function () {
      if (playing === true) {

        // smooth fade out sound
        idSound.stop(true);
        idSound.animate(
          { volume: 0 },
          1500,
          'linear',
          function () {
            n.pause();
            n.currentTime = 0;
            playing = false;
            directpage();
          }
        );

      } else {
        directpage();
      }
    }, 300);
  }

  $('.fall-text').each(function () {
    var text = $(this).text().trim();
    var html = '';
    var delay = 0;

    for (var i = 0; i < text.length; i++) {
      var char = text[i];

      if (char === ' ') {
        html += '&nbsp;';
      } else {
        html += '<span style="animation-delay:' + (delay * 0.08) + 's">' + char + '</span>';
        delay++;
      }
    }

    $(this).html(html);
  });

});