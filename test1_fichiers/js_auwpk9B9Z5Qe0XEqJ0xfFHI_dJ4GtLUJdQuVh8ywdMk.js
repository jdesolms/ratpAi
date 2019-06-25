/* Source and licensing information for the line(s) below can be found at http://www.ratp.fr/modules/custom/ratp_tags/assets/js/tags.js. */
/**
 * Global TMS object.
 *
 * All Drupal JavaScript APIs are contained in this namespace.
 *
 * @global
 *
 * @namespace
 */
  // declaraion variable global
  window.TMS = {default : tc_vars};

  // function pour initier l'objet tc_vars
  TMS.init = function (values) {
    TMS.addUpdateValue(values);
  };

  /**
   * [addUpdateValue ajouter ou modifier une/des valuers de l'objet tc_vars]
   * @param {[array]} values [tableau associatif key:value]
   */
  TMS.addUpdateValue = function (values) {
    for (var key in values) {
      tc_vars[key] = values[key];
    }
    return tc_vars;
  };

  /**
   * [event description]
   * @param  {[type]} [event_id=null]   [description]
   * @param  {[type]} [event_name=null] [description]
   * @param  {[type]} [event_type=null] [description]
   * @param  {[type]} [chapter1=null]   [description]
   * @param  {[type]} [chapter2=null]   [description]
   * @param  {[type]} [chapter3=null]   [description]
   * @return {[type]}                   [description]
   */
  
  TMS.event = function (event_id, event_name, event_type, chapter1, chapter2, chapter3 ) {
      tc_events_1(
      this,
      event_id,
        {
          "EVENT_NAME":event_name,
          "EVENT_TYPE":event_type,
          "CHAPTER1":chapter1,
          "CHAPTER2":chapter2,
          "CHAPTER3":chapter3
        }
    );
  };

/* Source and licensing information for the above line(s) can be found at http://www.ratp.fr/modules/custom/ratp_tags/assets/js/tags.js. */;
/* Source and licensing information for the line(s) below can be found at http://www.ratp.fr/modules/custom/ratp_tags/assets/js/common.js. */
(function($, Drupal) {
    
    jQuery(".actualite-groupe a").click(function(){
        console.log($(this).attr("href"));
         TMS.event("event_click", $(this).attr("href"), "action", tc_vars.new_page_cat1, "en_direct_du_groupe", "");
    }); 
    
    jQuery(".main-menu__item a").click(function(){
        var fildset = $(this).parent().parent().parent();
        TMS.event("event_click", $(this).text(), "navigation", "burger_menu", fildset.children("a").text(), "");
    });

    jQuery("#block-homepagetagsblock a").click(function(){
        TMS.event("event_click", $(this).text(), "navigation", "page_accueil", "tag", "");
    });
    
    
    jQuery('a[href*="/apps/"]').click(function(){
        
        nodeApps($(this).attr("href"));
        
    });

    function nodeApps(url){
         jQuery.ajax({
            url : '/node_apps',
            type : 'POST',
            data : { url : url},
            async: false,
            dataType : 'json',
            success : function(data){
                TMS.event("event_click", data.app, "sortie", tc_vars.new_page_cat1, "app", "");
            },
            error: function(){
                console.log("erreur tag apps");
            }
         });
    }

    Drupal.behaviors.commonTags = {
        attach: function (context, setting) {

    jQuery("a.a2a_button_facebook").click(function(){
        TMS.event("event_click", "facebook", "action", tc_vars.new_page_cat1, "enregistrer", "social");
    });
    jQuery("a.a2a_button_twitter").click(function(){
        TMS.event("event_click", "twitter", "action", tc_vars.new_page_cat1, "enregistrer", "social");
    });
    jQuery("a.a2a_button_linkedin").click(function(){
        TMS.event("event_click", "linkedin", "action", tc_vars.new_page_cat1, "enregistrer", "social");
    });
    jQuery("a.a2a_button_email").click(function(){
        TMS.event("event_click", "email", "action", tc_vars.new_page_cat1, "enregistrer", "social");
    });
    
    /*jQuery(".acticle-info--print-pdf a").click(function(){
        TMS.event("event_click", "imprimer", "action", tc_vars.new_page_cat1, "enregistrer", "%choix_impression");
    });*/

    /*jQuery("#edit-submit-recherche-categories-faq").click(function(){
        TMS.event("event_click", "faq", "action", tc_vars.new_page_cat1, "", "");
    });*/
    
    /*jQuery(".div-left-faq--blocks a.question").click(function(){
        TMS.event("event_click", "faq", "action", tc_vars.new_page_cat1, "", "");
    });*/

    
    
    jQuery(".lang_selector-continue").click(function(){
        var langage_touristes = new Array();
        langage_touristes["Français"] =  'fr';
        langage_touristes["English"] =  'en';
        langage_touristes["Deutsch"] =  'de';
        langage_touristes["Italiano"] =  'it';
        langage_touristes["Español"] =  'es';
        langage_touristes["Nederlandse"] =  'nl';
        langage_touristes["русский"] =  'ru';
        langage_touristes["日本人"] =  'jp';
        langage_touristes["Do Brasil"] =  'br';
        langage_touristes["中国"] =  'ch';
        
        TMS.event("event_click", langage_touristes[jQuery("#lang-selector option:selected").text()], "action", tc_vars.new_page_cat1, tc_vars.new_page_name, "");
    });
            
            
    
       }
    }

})(jQuery, Drupal, drupalSettings);

/* Source and licensing information for the above line(s) can be found at http://www.ratp.fr/modules/custom/ratp_tags/assets/js/common.js. */;
/* Source and licensing information for the line(s) below can be found at http://www.ratp.fr/modules/custom/ratp_tags/assets/js/tags_info_trafic.js. */
(function($, Drupal) {
    Drupal.behaviors.infoTraficTags = {
        attach: function (context, setting) {
            jQuery(".infos-trafic__item .lienRatp").click(function(){
                TMS.event("event_click", "en_savoir_plus", "navigation", tc_vars.new_page_cat1, "info_trafic", "%type_transport"); 
            });
        }
    }

})(jQuery, Drupal, drupalSettings);

/* Source and licensing information for the above line(s) can be found at http://www.ratp.fr/modules/custom/ratp_tags/assets/js/tags_info_trafic.js. */;
/* Source and licensing information for the line(s) below can be found at http://www.ratp.fr/core/assets/vendor/matchMedia/matchMedia.min.js. */
window.matchMedia||(window.matchMedia=function(){"use strict";var e=window.styleMedia||window.media;if(!e){var t=document.createElement("style"),i=document.getElementsByTagName("script")[0],n=null;t.type="text/css";t.id="matchmediajs-test";i.parentNode.insertBefore(t,i);n="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle;e={matchMedium:function(e){var i="@media "+e+"{ #matchmediajs-test { width: 1px; } }";if(t.styleSheet){t.styleSheet.cssText=i}else{t.textContent=i}return n.width==="1px"}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}());

/* Source and licensing information for the above line(s) can be found at http://www.ratp.fr/core/assets/vendor/matchMedia/matchMedia.min.js. */;
