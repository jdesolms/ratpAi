/* Source and licensing information for the line(s) below can be found at http://www.ratp.fr/modules/contrib/addtoany/js/addtoany.js. */
/* global a2a*/
(function (Drupal) {
  'use strict';

  Drupal.behaviors.addToAny = {
    attach: function (context, settings) {
      // If not the full document (it's probably AJAX), and window.a2a exists
      if (context !== document && window.a2a) {
        a2a.init_all('page'); // Init all uninitiated AddToAny instances
      }
    }
  };

})(Drupal);

/* Source and licensing information for the above line(s) can be found at http://www.ratp.fr/modules/contrib/addtoany/js/addtoany.js. */;
/* Source and licensing information for the line(s) below can be found at http://www.ratp.fr/themes/ratp/js/global.js. */
function open_new_tab(url){
    window.open(url, '_blank');
}
function openBurgerMenu(){
  jQuery('body').addClass('u-no-scroll');
  jQuery(".burger-menu").removeClass("closed");
  jQuery(".burger-menu").addClass("opened");
  jQuery(".burger-menu").css({"transform":"translate(0,0)","visibility": "visible"});
  jQuery(".burger-menu").attr('aria-hidden', "false");
  jQuery(".burger-menu").find("a").attr('tabindex',"0");
  jQuery(".burger-menu").find("button").attr('tabindex',"0");
  jQuery("#close-burger-menu-id").focus();
  jQuery(".bk-menu").css("position","fixed");
  jQuery('#burger-button-id').attr('aria-expanded','true'); 

  var element = document.createElement('div');
  element.className += "burger-overlay";
  jQuery("header").append(element);
  jQuery('.burger-overlay').click(function () {
    jQuery('body').removeClass('u-no-scroll');
    closeBurgerMenu();
  });

}
function closeBurgerMenu(){
      setTimeout(function () {
  
  jQuery('body').removeClass('u-no-scroll');
  jQuery(".burger-menu").removeClass("opened");
  jQuery(".burger-menu").addClass("closed");
  jQuery(".burger-menu").css({"transform":"translate(100%,0)"});
  jQuery(".burger-menu").attr('aria-hidden', "true");
  jQuery(".burger-menu").find("a").attr('tabindex',"-1");
  jQuery(".burger-menu").find("button").attr('tabindex',"-1");
  jQuery("#burger-button-id").focus();
  jQuery(".burger-overlay").remove();
  jQuery('#burger-button-id').attr('aria-expanded','false'); 
  }, 100);
}

function toggleScroll() {
  if (jQuery(".burger-menu ").hasClass("closed")) {
    openBurgerMenu();
  } 
}
var el = document.getElementById("footer-list-menu-n2");jQuery(el).keyup(function(e) {
    if (e.keyCode == 27) {
        toggleDropdownVisibility('footer-list-menu-n2','footer-menu-button');
        jQuery('#footer-menu-button').focus();
    }
});
jQuery("#list-lang-block-selecteurdelangue-2 li").last().focusout(function(){
      toggleDropdownVisibility('list-lang-block-selecteurdelangue-2', 'language-menu-button-block-selecteurdelangue-2')
      jQuery('#burger-menu-id li').first().focus();
    });
jQuery("#search1").bind('change keyup', function(ev) {
        if (jQuery('#list-lang-block-selecteurdelangue').is(':visible')) {  
            toggleDropdownVisibility('list-lang-block-selecteurdelangue', 'language-menu-button-block-selecteurdelangue');
        } 
});
jQuery(document).on('keyup', function (evt) {
      if (evt.keyCode == 27) {
        if (!jQuery('#list-lang-block-selecteurdelangue').is(':visible')) { 
         jQuery('#language-menu-button-block-selecteurdelangue').attr('aria-expanded','false'); 
        }
    }
});
jQuery(document).on('keyup', function (evt) {
      if (evt.keyCode == 27) {
        if (jQuery('#actualite-groupe--content').is(':visible')) {  
                jQuery('.block-groupe-ratp').css('display', 'none');
                jQuery('.block-groupe-ratp').removeClass("opened");
                jQuery('#actualite-groupe--title').attr('aria-expanded','false');

        }
    }
});
jQuery(document).on('keyup', function (evt) {
      if (evt.keyCode == 27) {
        if (jQuery('.burger-menu.u-toggle__block.opened').is(':visible')) {  
              jQuery("#close-burger-menu-id").click();
        }
    }
});
jQuery("#block-navigationprincipale").replaceWith(jQuery('<div id="block-navigationprincipale">' + jQuery("#block-navigationprincipale").html() + '</div>'));
function toggleDropdownVisibility(id, button, accordeon) {
  if (accordeon === true) {
    jQuery('.squeezecnt').hide();
  }
  var displayCss = jQuery("#" + id).css("display");
  jQuery("#" + id).slideToggle(300, 'swing');
  if (displayCss == "block") {
    jQuery('#' + button).attr('aria-expanded', "false");
  } else {
    jQuery('#' + button).attr('aria-expanded', "true");
  }
}

function toggleGroupButton() {
  if (jQuery('.block-groupe-ratp').hasClass("opened")) {
    jQuery('.block-groupe-ratp').css('display', 'none');
    jQuery('.block-groupe-ratp').removeClass("opened");
    jQuery('#actualite-groupe--title').attr('aria-expanded','false');
  } else {
    jQuery('.block-groupe-ratp').css('display', 'block');
    jQuery('.block-groupe-ratp').addClass("opened");
    jQuery('#actualite-groupe--title').attr('aria-expanded','true');
  }
}
function get_max_date(){
    var date = new Date();
    var d=date.getDate();var m=date.getMonth() + 1;var y=date.getFullYear();
    if(m< 10){
        m="0"+m;
    }
    if(d< 10){
        d="0"+d;
    }
    return y+'-' +m + '-' + d;
}
var twitterId = "modal-tw-icn-block-socialmedialinks";
function updateTwitterId(id) {
    twitterId = id;
}

/**
 * Return line by network
 * @param {*} network 
 * @param {*} line 
 */
var cacheLineObject = new Object(); // Var to cache ajax response
if(!sessionStorage.getItem('cacheLine')){
  sessionStorage.setItem('cacheLine', '');
} else {
  cacheLineObject = JSON.parse(sessionStorage.getItem('cacheLine'));
}

function getLineByNetwork(network, lineId) {
  return jQuery.ajax({
    url: '/api/getLine/'+network+'/'+lineId
  });
}

// Div lien d'évitement #29376
var navAccess = jQuery('#nav-access');
if(navAccess.length > 0){
  navAccess.find('a').on('focus', function(){
    navAccess.addClass('visible');
  });
  navAccess.on('focusout', function(){
    navAccess.removeClass('visible');
  });
}
function nth(d) {
  if (d > 3 && d < 21) return 'th'; 
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}
(function ($, Drupal) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const month = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    var d = new Date();
    var dayName = days[d.getDay()];
    var MonthName = month[d.getMonth()];
    var hour=("0"+d.getHours()).slice(-2);
    var minute=("0"+d.getMinutes()).slice(-2);
    var lang=drupalSettings.path.currentLanguage;
    if(lang === 'fr'){
        $(".time-weather").html(Drupal.t(dayName)+" "+d.getDate()+" "+Drupal.t(MonthName)+" "+ hour + ":" + minute +" Paris");
    }else{
        $(".time-weather").html(Drupal.t(dayName)+" "+Drupal.t(MonthName)+" <span class'day'>"+d.getDate()+"<sup class'dayth'>"+nth(d.getDate())+"</sup></span>, "+hour + ":" + minute +" Paris");
    }
$(".anchor__link.js-anchor-link").click(function() {
    var id_anchor = $(this).attr("anchor-id");
    var header_height=$('header').height();
    if ($('.adminimal-admin-toolbar').length){
      header_height=header_height + $('#toolbar-bar').height();       
    }
 
    $([document.documentElement, document.header]).animate({
        scrollTop: $("#"+id_anchor).offset().top - header_height
    }, 200);
});
if ($('div.block-bandeau-crise-global').length && !$('.accueil').length){
    $('body').addClass("page-with-banner");
}
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && $('div.block-bandeau-crise-global').length && $('.accueil').length ) {
      $('body').addClass("page-with-banner");  
} 
//Pub accessibility is-playing button
$('.play-pause-perturbation').unbind('click').on('click', function(e){
  if($('.play-pause-perturbation').hasClass('is-playing')){
    $('.play-pause-perturbation').removeClass('is-playing');
    $("#crise-desc").addClass('stop-marquee');
    $(".play-pause-perturbation img").attr("src","/themes/ratp/images/rounded-play-button.svg");
  } else {
    $('.play-pause-perturbation').addClass('is-playing');
    $("#crise-desc").removeClass('stop-marquee');
    $(".play-pause-perturbation img").attr("src","/themes/ratp/images/rounded-pause-button.svg");
 
  }
  e.preventDefault();
  e.stopPropagation();
  return false;
});
    if($("body").width()< 500){
        $('.accueil.page-with-banner .page--home').before($('div.block-bandeau-crise-global'));
    }
  if($("header").css('padding-left')=="20px" && $("body").width()< 500 && $( "header" ).hasClass( "desktop" )){
        $('header').prepend($('.header-colonne'));
        $(".itineraire-home--form").before($('.itineraire-home--etiquettes'));
        $('.itineraire-home--etiquettes').css({'padding-top':'0','background-color':'#ededed'});
        $('.page--home.home-desktop .u-colonne').css("width","100%");
        $('header').css('padding','0');
        $('.logo, .raccourcis').css('padding-left','20px');
        $('.raccourcis').css('padding-right','20px');
        $('.actualite-groupe').css('padding-left','10px');       
   }
  $(document).ready(function () {
        function change_select_year_value(year, m, d, source ){
         var tableau = [];
          jQuery('.ui-datepicker-year').find('option').each(function() {
              tableau.push(jQuery(this).val());
          });
          for (i = tableau[0]-1 ; i > 1900; i--){
              $('.ui-datepicker-year').prepend($('<option>',
                {
                   value: i,
                   text : i 
               }));
          }
          if(!$('.webform-submission-demande-de-stage-form').length){
          for (i = tableau[9] ; i < new Date().getFullYear(); i++){
              $('.ui-datepicker-year').append($('<option>',
                {
                   value: i,
                   text : i 
               }));
          }
      }
           jQuery( ".ui-datepicker-year" ).change(function() {
              change_select_year_value( this.value );
          });
          jQuery( ".ui-datepicker-month" ).change(function() {
          change_select_year_value();
          });
      }
      $( "#edit-date-de-naissance " ).click(function() {
          var val=$( "#edit-date-de-naissance" ).val();
          var y= val.split('/')[2];
          var m= val.split('/')[1];
          var d= val.split('/')[0];
          change_select_year_value(y,m-1,d,"input");
          $( "#edit-date-de-naissance" ).val("");

      });
     // $('#burger-button-id').prepend($('.bk-menu'));
      $('.dialog-off-canvas-main-canvas').attr("aria-hidden", "false");
      $(".u-flag--en a").removeAttr("hreflang");
  setTimeout(function(){
  $text=jQuery('h2.div-result-faq-titre').text()
  jQuery(".page--nos-faq h1").text($text);
},1000);

    // back to top button for all pages

    $(window).scroll(function(){
        if($(this).scrollTop() > 100){
            $('#scroll').fadeIn();
        }else{
            $('#scroll').fadeOut();
        }
    });
    $('#scroll').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    // Remove attr role on id "block-selecteurdelangue-2"
    $("#block-selecteurdelangue-2").removeAttr('role');

    //exclure les liens et boutons du burger menu de la tabulation
    $(".burger-menu").find("a").attr('tabindex',"-1");
    $(".burger-menu").find("button").attr('tabindex',"-1");
    //Menu Langues
   /* $("button[id^='language-menu-button-']").click(function () {
      toggleDropdownVisibility($(this).attr("aria-controls"), $(this).attr("id"));
    });*/
    $('#block-maratp-2 a').focusout(function () {
        //$("#language-menu-button-block-selecteurdelangue-2").focus();
    });
    $('.button-menu-n1__item').focusout(function () {
      if ($(this).next().length === 0) {
        $("#footer-list-menu-n2").hide();
      }
    });
    $('.list-lang .language-link').focusout(function () {
      if ($(this).attr('hreflang') === "en") {
        $(".list-lang").hide();
      }
    });

    /*$(".burger-menu a").last().focusout(function(){
      jQuery("#close-burger-menu-id").focus();
    });*/
    jQuery(document).on('keyup', function (evt) {
    if (evt.shiftKey && evt.key === 'Tab') {
        if($("button#burger-button-id").is(":focus") && $("#burger-menu-panneau").hasClass("opened")){
           $(".burger-menu a").last().focus();
       }
    }
    if(evt.key === 'Tab'   ) {
    if(($("button.get-info-trafic").is(":focus") || $("button.play-pause-perturbation").is(':focus') || $("a.breadcrumbs__link").is(':focus')) && $("#burger-menu-panneau").hasClass("opened")){
    jQuery("#close-burger-menu-id").focus();  
    }
    }
    });

    $(window).scroll(function() {
      if ($(window).scrollTop() >= 630) {
        $('.home-desktop').hide();
        $('#header-home').css("position", "fixed");
        $(".home-desktop-main").css("margin-top","771px");
      } else {
        $('.home-desktop').show();
        $('#header-home').css("position", "relative");
        $(".home-desktop-main").css("margin-top","0px");
      }

    });

    //Aide et contact
    menuAccessFocusEchap("faq-forms-list", "faq-forms-menu-button");

    //Menu langues hub touriste
    menuAccessFocusEchap("hub-tourist-langue-list", "hub-tourist-langue-list-button");

    /**
     * Accessibilité Menu focusOut et Echap
     */
    function menuAccessFocusEchap(id, idButton) {
      var menu;
      $("#" + id + " > li").each(function () {
        menu = $(this);
      });
      $("#" + id + " > li").on('keydown', function (e) {
        if (e.keyCode === 27) { // ESC
          toggleDropdownVisibility(id, idButton);
          $("#" + idButton).focus();
        } else if ($(this).text() == menu.text()) {
          toggleDropdownVisibility(id, idButton);
        }
      });
    }

    $('.actualite-groupe').hover(function () {
     if( ! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      if ($('.block-groupe-ratp').hasClass("opened")) {
        $('.block-groupe-ratp').css('display', 'none');
        $('.block-groupe-ratp').removeClass("opened");
      } else {
        $('.block-groupe-ratp').css('display', 'block');
        $('.block-groupe-ratp').addClass("opened");
      }
}
    });

    $('.last').focusout(function () {
      $('.block-groupe-ratp').css('display', 'none');
      $('.block-groupe-ratp').removeClass("opened");
    })

    $(document).on('keydown', function (e) {
      if (e.keyCode === 27) { // ESC
        if ($(document.activeElement).hasClass("menu-n2-link")) {
          $("#footer-list-menu-n2").hide();
          $("#footer-menu-button").focus();
        }
        var idListLang = $(document.activeElement).parent().parent().attr('id');
        if (idListLang !== undefined && idListLang.indexOf('list-lang-') >= 0) {
          $("#"+$(document.activeElement).parent().parent().attr('id')).hide();
          $("#"+$(document.activeElement).parent().parent().prev('button').attr('id')).focus();
        }

        if ($('.block-groupe-ratp').hasClass("opened")) {
          $('.block-groupe-ratp').css('display', 'none');
          $('.block-groupe-ratp').removeClass("opened");
        }

        //gestion de la fermeture du burger menu après l'échap
        if($(document.activeElement).parents().find("#menu-principal").length >0 && $('.burger-overlay').lengh >0){
          closeBurgerMenu();
        }
      }
    });

    $("button[id^='modal-tw-icn-']").click(function () {
      $(".layout-container").attr("aria-hidden", "true");
      $(".msg-access").attr("aria-hidden", "true");
      $(".go-to-main").attr("aria-hidden", "true");
      $(".ui-helper-hidden-accessible").attr("aria-hidden", "true");
      $("#block-enquetemodalblock").attr("aria-hidden", "true");
      $("#ui-datepicker-div").attr("aria-hidden", "true");
       updateTwitterId($(this).attr('id'));
    });
  });
  Drupal.behaviors.modal = {
    attach: function (context, setting) {
        $( ".js-form-wrapper" ).each(function( index ) {
            if($(this).text()=="Sur quel aspect souhaitez-vous faire un compliment ?"){
                $(this).addClass('complement');
            }
            if($(this).text()=="Quel aspect souhaitez vous aborder ?" ){
                $(this).addClass('otherr');
            }
        });
  //Alt Vide image liens Accessibilité
  $('.card__image img').each(function () {
    $(this).attr("alt", "");
  });
  $('.une__image img').each(function () {
    $(this).attr("alt", "");
  });
  $('.billet__image img').each(function () {
    $(this).attr("alt", "");
  });
  $('.rebond__vignette img').each(function () {
    $(this).attr("alt", "");
  });
  $('.type-metier--image img').each(function () {
    $(this).attr("alt", "");
  });
    $('a.billets_similaires__link img').each(function () {
    $(this).attr("alt", "");
  });
  
        if($("[id^='edit-que-souhaitez-vous-partager-compliment']").is(':not(:checked)')) {
            $('.complement').css('display','none');
        }
        if($("[id^='edit-que-souhaitez-vous-partager-autre']").is(':not(:checked)')) {
            $('.otherr').css('display','none');
        }
        if($("[name^='que_souhaitez_vous_partager']").is(':not(:checked)')) {
            $("[id^='edit-type-de-precision-']").css('display','none');
        }
        if($("[name^='que_souhaitez_vous_partager']").is(':checked')){
            $("[id^='edit-type-de-precision-']").css('display','block');

        }
        $('input[type="radio"]').on('click change', function(e) {
            if(this.value=="Problème" || this.value=="Suggestion" || (this.value=="Autre" && this.name=="type_de_precision")){
                $('.complement').css('display','none');
            }
            if(this.value=="Compliment"){
                $('.complement').css('display','block');

            }
            if(this.value=="Problème" || this.value=="Suggestion" || this.value=="Compliment"){
                $('.otherr').css('display','none');
            }
            if((this.value=="Autre" && this.name=="que_souhaitez_vous_partager")){
                $('.otherr').css('display','block');

            }
            if(this.name=="que_souhaitez_vous_partager"){
                $("[id^='edit-type-de-precision-']").css('display','block');
            }
        });
     $(".div-left-faq--blocks li a").click(function() {
       $('h1.u-titre--page-header').html($(this).text());
    });  
      $('.popin-twitter--right a').each(function( index ) {
          $(".picto.rer.symbole img").attr("alt", "RER");
          $("span.picto.metro.symbole img").attr("alt", "Métro");
          $("span.picto.tram.symbole img").attr("alt", "Tramway");
          $('.dialog-off-canvas-main-canvas').attr("aria-hidden", "true")
          var ligne=[];        
          var href=$(this).attr('href');
          var uri=href.split("/")[3];
          var line = uri.split("_")[0];
          //console.log(mode);
           if(line[0]=="R"){
             mode="RER";
             ligne=line.split("_");
             if(ligne[0]=="RER"){
                 line= "A";
             }else{
                 line="B";
             }
          }else if (line[0]=="L") {
             ligne=line.split("Ligne"); 
             mode="metro"; 
             line=ligne[1];
          }else {
             ligne=line.split("T"); 
             mode="tramway";
             line=ligne[1];
          }
          $(this).attr('aria-label', "Compte Twitter de la ligne "+ line +" (nouvelle fenêtre)");
          $("img",this ).attr('alt', "ligne "+line);
      });

      if ($(context).children(':first').attr("id") == "twitter-modal") {
        //Init Focus button Fermer twitter-modal
        setTimeout(function () {
            dialog.find('.ui-dialog-titlebar-close').focus();

        }, 1000);
        // get dialog object from context parent
        var dialog = $(context).parent().dialog().parent();
        dialog.removeAttr("role");
        dialog.removeAttr("aria-describedby");
        dialog.removeAttr("aria-labelledby");
        dialog.find('.ui-dialog-titlebar-close span.ui-button-icon-primary').attr("aria-hidden", "true");
        dialog.find('.ui-dialog-titlebar-close').removeAttr("title");
        dialog.find('.ui-dialog-titlebar-close span.ui-button-text').text("Fermer la fenêtre");

        dialog.find('.ui-dialog-titlebar-close').click(function () {
          $(".layout-container").removeAttr("aria-hidden");
          $(".msg-access").removeAttr("aria-hidden");
          $(".go-to-main").removeAttr("aria-hidden");
          $(".ui-helper-hidden-accessible").removeAttr("aria-hidden");
          $("#block-enquetemodalblock").removeAttr("aria-hidden");
          $("#ui-datepicker-div").removeAttr("aria-hidden");
          $('.ui-widget-overlay').remove();
          $('.dialog-off-canvas-main-canvas').attr("aria-hidden", "false");
          $("#"+twitterId).focus();
        });
        dialog.after('<div class="ui-widget-overlay ui-front" style="z-index: 99998;"></div>');
        $(document).on('keydown', function (e) {
          if (e.keyCode === 27) { // ESC
            $(".layout-container").removeAttr("aria-hidden");
            $(".msg-access").removeAttr("aria-hidden");
            $(".go-to-main").removeAttr("aria-hidden");
            $(".ui-helper-hidden-accessible").removeAttr("aria-hidden");
            $("#block-enquetemodalblock").removeAttr("aria-hidden");
            $("#ui-datepicker-div").removeAttr("aria-hidden");
            $('.ui-widget-overlay').remove();
            $("#"+twitterId).focus();
          }
        });
      }
      //Forcer l'affichage des image picto en SVG (Modal)
      afficheImagePictoSvg('#drupal-modal');
      //iframe
      setTimeout(function () {
        $("iframe").removeAttr('frameborder');
      }, 2000);
    }
  };

  //Forcer l'affichage des image picto en SVG (Content)
  afficheImagePictoSvg('.layout-container');

  //Autocomplete Message
  Drupal.behaviors.autocompletemessage = {
    attach: function (context, setting) {
      var tab = ['[data-drupal-selector="edit-tid"]', '[data-drupal-selector="end"]',
        '[data-drupal-selector="start"]', '[data-drupal-selector="address"]',
        '[data-drupal-selector="edit-field-tags-target-id"]', '#autocompleteBusNoctilien',
        '[data-drupal-selector="edit-stop-point-rer"]', '[data-drupal-selector="edit-stop-point-metro"]',
        '[data-drupal-selector="edit-name-line-busratp"]', '[data-drupal-selector="edit-stop-point-busratp"]',
        '[data-drupal-selector="edit-stop-point-tram"]', '[data-drupal-selector="edit-name-line-noctilien"]',
        '[data-drupal-selector="edit-stop-point-noctilien"]'];
      for (var i = 0, c = tab.length; i < c; i++) {
        if ($(tab[i]).length > 0) {
          $(tab[i]).autocomplete({
            // Traduction du texte d'aide
            messages: {
              noResults:  Drupal.t("Aucun résultat"),
              results: function (amount) {
                return amount + " " + Drupal.t("résultats sont disponibles, utilisez les flèches du clavier pour naviguer");
              }
            },
          });
        }
      }
    }

  };

  setTimeout(function () {
    $("iframe").removeAttr('frameborder');
  }, 2000);

  Drupal.behaviors.swiperariahidden = {
    attach: function (context, setting) {
      //Init
      swiperAriaHidden();
      swiperTablist();
      swiperTicketsPrice();
      desabledButton();
      //Mouse Down
      $(".swiper-slide").on("click mousedown mouseup pointerdown pointerup focus blur change", function () {
        swiperAriaHidden();
      });
      $('.swiper-button-prev').click(function () {
        swiperAriaHidden();
        swiperTicketsPrice();
      });
      $('.swiper-button-next').click(function () {
        swiperAriaHidden();
        swiperTicketsPrice();
      });
      $(".swiper-pagination").on("click", function () {
        swiperAriaHidden();
      });

      $(".swiper-groupe-pagination-bullet").on("click", function () {
        swiperTablist();
      });
    }
  };

  /* button desabled */

  function desabledButton(){
    $('.swiper-button-prev').each(function () {
        if( $(this).hasClass( "swiper-button-disabled" ) ){
            $(this).attr("disabled", "disabled");
        }
    });

    $('.swiper-button-prev').click(function () {
        if( $(this).hasClass( "swiper-button-disabled" ) ){
            $(this).attr("disabled", "disabled");
        }
        var parrent = $(this).parent();
        var next = parrent.children('.swiper-button-next');

        if( next.hasClass( "swiper-button-disabled" ) == false ){
            next.removeAttr("disabled");
        }

    });


    $('.swiper-button-next').each(function () {
        if( $(this).hasClass( "swiper-button-disabled" ) ){
            $(this).attr("disabled", "disabled");
        }

    });

    $('.swiper-button-next').click(function () {
        if( $(this).hasClass( "swiper-button-disabled" ) ){
            $(this).attr("disabled", "disabled");
        }
        var parrent = $(this).parent();
        var prev = parrent.children('.swiper-button-prev');
        if( prev.hasClass( "swiper-button-disabled" ) == false ){
            prev.removeAttr("disabled");
        }
    });

  }


  //Swiper aria-hidden
  function swiperAriaHidden() {
    //Init
    $('.swiper-slide').each(function () {
      $(this).attr("aria-hidden", "true");
      $(this).children('a').attr("tabindex", "-1");
      $(this).children().children('a').attr("tabindex", "-1");
    });
    //Supprimer les attributs Cas Visible
    $('.swiper-slide-visible').each(function () {
      $(this).removeAttr("aria-hidden");
      $(this).children('a').removeAttr("tabindex");
      $(this).children().children('a').removeAttr("tabindex");
    });
    setTimeout(function () {
      $('.swiper-slide-active').removeAttr("aria-hidden");
      $('.swiper-slide-active a').removeAttr("tabindex");
      $('.swiper-slide-visible').removeAttr("aria-hidden");
      $('.swiper-slide-visible a').removeAttr("tabindex");
      $('.swiper-notification').remove();
    }, 2000);
  }

  //Swiper tablist
  function swiperTablist() {

    setTimeout(function () {
      //Init
      $('.swiper-groupe-pagination-bullet').each(function () {
        $(this).attr("aria-selected", "false");
        $(this).attr("tabindex", "-1");
        $(this).attr("aria-controls", "panneau-" + numAriaControls($(this).attr("aria-label")));
      });
      //Supprimer les attributs Cas Visible
      $('.swiper-pagination-bullet-active').each(function () {
        $(this).attr("aria-selected", "true");
        $(this).attr("tabindex", "0");
      });

    }, 1000);
  }

  function numAriaControls(ariaLabel) {
    var splits = ariaLabel.split("Go to slide ");
    return splits[1];
  }
  //Swiper Tickets hub read more
  function swiperTicketsPrice() {

    setTimeout(function () {
      //Init
      $('.billets-hub__read-more .swiper-slide--hub').each(function () {
        $(this).attr("aria-selected", "false");
        $(this).attr("tabindex", "-1");
        $(this).attr("aria-hidden", "true");

      });
      //Supprimer les attributs Cas Visible
      $('.billets-hub__read-more .swiper-slide--hub.swiper-slide-visible').each(function () {
        $(this).attr("aria-selected", "true");
        $(this).removeAttr("tabindex");
        $(this).attr("aria-hidden", "false");
      });

    }, 1000);
  }



  //Forcer l'affichage des image picto en SVG
  function afficheImagePictoSvg(classOrId) {
    //Pas de modification pour la PG
    if (window.location.href.indexOf("/infos-trafic") !== -1 || window.location.href.indexOf("/trafic-") !== -1
        || window.location.href.indexOf("/travaux") !== -1 || $(".crise-niveau-deux").length > 0
        || $(".crise-niveau-trois--bg").length > 0) {
        return false;
    }
    var pictoList = $(classOrId).find('.picto');
    $.each(pictoList, function () {
      var that = $(this),
        thatClassArray = that.attr('class').split(' '),
        thatText = that.text(),
        network = thatClassArray[1],
        name = thatClassArray.pop(),
        thatImgSrc = '',
        thatImg = new Image();
      if (that.find('img').length === 0 && (window.location.href.indexOf("/itineraires") === -1 || window.location.href.indexOf("/itineraires") !== -1 && classOrId === '#drupal-modal')) {
        if ('walk' === network) {
          thatImgSrc = '/sites/default/files/network/marche.svg';
        } else {
          thatImgSrc = '/sites/default/files/network/' + network + '/' + name + '.svg';
        }
        thatImg.src = thatImgSrc;
        $.get(thatImgSrc).done(function () {
          // img exist on server, display it
          thatImg.src = thatImgSrc;
          that.html(thatImg);
        }).fail(function () {
          // img doesn't exist on server, display previous line text instead
          that.html(thatText);
        });
      }
    });
  }

  //cookies Popup
  Drupal.behaviors.cookiesPopup = {
    attach: function () {
        if ($('#sliding-popup').length > 0) {
            $('.layout-container').addClass('cookies-layout');
            $('#popup-buttons > button').click(function () {
                $('.layout-container').removeClass('cookies-layout');
            });
        }
    }
  };

  //Page Rejoignez-nous
  Drupal.behaviors.rejoignezNous = {
    attach: function () {
      setAriaLabelSelect("edit-field-domaine-metier-target-id");
      setAriaLabelSelect("edit-field-diplomes-target-id");
      setAriaLabelSelect("edit-field-type-d-offre-target-id");
      setAriaLabelSelect("edit-field-offre-lieu-value");
    }
  };

  /**
   * Mettre à jour aria label select par value option selected
   */
  function setAriaLabelSelect(id) {
    $("#" + id + " option").each(function () {
      if ($(this).is(':selected')) {
        $(this).parent('select').attr('aria-label', $(this).text());
      }
    });
  }

})(jQuery, Drupal);

/* Source and licensing information for the above line(s) can be found at http://www.ratp.fr/themes/ratp/js/global.js. */;
/* Source and licensing information for the line(s) below can be found at http://www.ratp.fr/modules/custom/ratp_content/js/links_lang.js. */
(function ($, Drupal) {
   $("#edit-description-bandeau-format,#edit-description-bandeau-format").css('display','none');
   //$("#edit-description-bandeau-format,#edit-description-bandeau-format").remove();      

  //Check if IE and execute the code for popin Twitter
  if (document.documentMode || /Edge/.test(navigator.userAgent))
  {
    jQuery(".actualite-groupe").on("mouseenter", function () {
      jQuery(".block-groupe-ratp").show();
    });

    jQuery(".actualite-groupe--content").on("mouseleave", function () {
      jQuery(".block-groupe-ratp").hide();
    });

    jQuery(".twitter_timeline").on("mouseenter", function () {
      jQuery(".block-groupe-ratp").show();
    });

  }

})(jQuery, Drupal);
/* Source and licensing information for the above line(s) can be found at http://www.ratp.fr/modules/custom/ratp_content/js/links_lang.js. */;
/* Source and licensing information for the line(s) below can be found at http://www.ratp.fr/modules/custom/ratp_content/js/msg_access.js. */
(function ($, Drupal) {
    $(".msg-access > a").focusin(function () {
        $(".msg-access").css("top", "0");
    });

    $(".msg-access > a").focusout(function () {
        $(".msg-access").removeAttr('style');
    });
    Drupal.behaviors.mycontent = {
   attach: function (context, settings) {
    var ua = window.navigator.userAgent;
    var is_ie = /MSIE|Trident/.test(ua);
    if ( is_ie ) {
        $(".js .paragraph-type-top").css("display","block");
    }     
  }
  }
    
    
    
    
    
    
    
    
    
})(jQuery, Drupal);
/* Source and licensing information for the above line(s) can be found at http://www.ratp.fr/modules/custom/ratp_content/js/msg_access.js. */;
/* Source and licensing information for the line(s) below can be found at http://www.ratp.fr/modules/custom/ratp_content/js/menu.js. */
(function($, Drupal) {
    var link = false;

    $( "ul#burger-menu-id li" ).each( function() {
        var _this = $(this),
            _subMenu = _this.find( ".main-menu.main-menu-n1" ),
            _mainLink = _this.find( "a" ).eq(0),
            _navigation = $('#block-navigationprincipale');

        _this.on('click',function(){
            if(_mainLink.attr('href')!=''){
                 link = true;
            }  
            if(!link){
            if(!_this.hasClass('activeMenu')){
                $('ul.main-menu.main-menu-n1',_this ).css('display','block');
               //ouverture
                $( "ul#burger-menu-id li" ).siblings( ".main-menu-n0__item" ).not(_this).addClass('menu-disabled');
                _this.addClass("activeMenu");
                _this.attr('area-expanded','true');
                _mainLink.addClass("activeLinkMenu");

                _navigation.addClass('menu-margin-top');
                _subMenu.addClass("opened-menu");

            } else {
                
                $('ul.main-menu.main-menu-n1',_this ).css('display','none');
                //fermeture
                $( "ul#burger-menu-id li" ).siblings( ".main-menu-n0__item" ).not(_this).removeClass('menu-disabled');
                _this.removeClass("activeMenu");
                _this.attr('area-expanded','false');
                _mainLink.removeClass("activeLinkMenu");

                _navigation.removeClass('menu-margin-top');
                _subMenu.removeClass("opened-menu");
            }
            $('#block-formulairederecherche-2,#block-selecteurdelangue-2,#block-socialmedialinks-3').toggle();
            }

        });

    });

    Drupal.behaviors.burgerMenuOpen = {
        attach: function (context, setting) {
           
            /** TO DO philip
            $( "ul#burger-menu-id li" ).each(function() {
            	var _this = $(this);ry(document).ready(function () {
                var pathname = window.location.
            	var _that = _this.first().find( "a" ).eq(0);

            	_this.toggleClass("activeMenu");
            	$('#block-navigationprincipale').toggleClass('menu-margin-top');

            	$('#block-formulairederecherche-2,#block-selecteurdelangue-2,#block-socialmedialinks-3').toggle();

				_that.toggleClass("activeLinkMenu");
				_this.find( ".main-menu.main-menu-n1" ).toggleClass("opened-menu");
				
                $("ul#burger-menu-id li").not(".activeMenu").toggleClass('menu-disabled');
                _this.toggleClass('menu-disabled');
                _this.find( ".main-menu.main-menu-n1 li" ).css("display","block");
			});

			$('.activeMenu').click(function(){
                
                var _this = $(this);

                _this.addClass('menu-enabled');
                $("ul#burger-menot(".acnu-id li").removeClass('menu-disabled');

				_this.toggleClass("activeMenu");
                

				_this.find( "a" ).toggleClass("activeLinkMenu");
				_this.find( ".main-menu.main-menu-n1" ).toggleClass("opened-menu");

                _this.find( ".main-menu.main-menu-n1 li" ).css("display","none");

				$('#block-formulairederecherche-2,#block-selecteurdelangue-2,#block-socialmedialinks-3').toggle();

            	$('#block-navigationprincipale').toggleClass('menu-margin-top');
			});**/
            
        }
    }
   //accessibilité burguer menu
 $('.main-menu__item.main-menu-n0__item').keypress(function(e){
    if( e.which == 13 ){
      jQuery(".no_link").click();    
  }
});
$('#burger-menu-panneau').on('keydown', function(e) {
    if (e.keyCode == 9) {
       if($('ul.main-menu.main-menu-n1.opened-menu li:last-child a').is(":focus")){
         $("li.main-menu__item.main-menu-n0__item.activeMenu > a").focus();        
        }
    }
});
$(".no-link").click(function(event) {
    event.preventDefault();
    url = $(this).attr("href");
});
})(jQuery, Drupal, drupalSettings);
/* Source and licensing information for the above line(s) can be found at http://www.ratp.fr/modules/custom/ratp_content/js/menu.js. */;
