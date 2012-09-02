//load CSS
var bk = chrome.extension.getBackgroundPage();
$("head").append("<link>");
css = $("head").children(":last");
css.attr({
    rel: "stylesheet",
    type: "text/css",
    href: bk.FeedExtensionPopCssFile + '.css?d=aassd34112'
});
$("head").append("<link>");
css = $("head").children(":last");
css.attr({
    rel: "stylesheet",
    type: "text/css",
    href: (bk.FeedExtensionPopCssFile + '_' + bk.lang + '.css?d=wasdsse34112')
});

//image and url
//$('#title_a').attr('href', bk.theImageLinkTo);
//$('#mainImage').attr('alt', bk.theImagetitle);
//$('#mainImage').attr('src', bk.theImageSrcUrl);
var selectedTab = 0;
if (localStorage["selectedTabIndex"] != undefined)
    selectedTab = localStorage["selectedTabIndex"];
window.setTimeout(function () {
    var bk = chrome.extension.getBackgroundPage();
    //image and url
    $('#allInfo').text(bk.ChannelTitle)

    //items
    var allItemsIDs = new Array();
    for (i = 0; i < bk.fruitvegbasket.length; i++) {
        var varItem = bk.fruitvegbasket[i];

        var theId = varItem.sourceRss_id;
        var sourceRssItem = bk.getRssItemById(theId)
        var tabsDivId = 'tabs-' + theId;
        var thesourceRss_text = varItem.sourceRss_text;
        //if category not found then create it
        if ($('#' + tabsDivId).length == 0) {
            $('<li><a href="#' + tabsDivId + '">' + thesourceRss_text + '</a></li>').appendTo('#TabsNamesUlLis ul');
            $('<div id="' + tabsDivId + '" class="mainTabDiv"><div class="accordion ' + tabsDivId + 'Class"  sourceRss_text="' + varItem.sourceRss_text + '"  sourceRss_id="' + varItem.sourceRss_id + '"  sourceRss_text="' + escape(varItem.sourceRss_text) + '"  sourceRss_smallimage="' + varItem.sourceRss_smallimage + '" sourceRss_largeimage="' + varItem.sourceRss_largeimage + '" ></div></div>').appendTo('#Contentstabs');
            allItemsIDs.push(tabsDivId);
        }
        var desc1 = varItem.itemdescription;
        var desc1txt = $('<div>' + desc1 + '<div>').text();
        if (desc1txt.length > 184)
            desc1txt = desc1txt.substring(0, 180) + "...";
        var desc1img = $('<div>' + desc1 + '<div>').find('img');
        if (desc1img.length > 0) {
            imgSrc = $(desc1img[0]).attr('src');
            if (imgSrc.toLowerCase().indexOf('http://feeds.feedburner.com') == -1)
                desc1txt = '<img src="' + imgSrc + '"  border="0">' + desc1txt;
        }
        $('<h3  category="' + varItem.sourceRss_text + '" itemID="' + theId + i.toString() + '" categoryID="' + theId + '" categorysmallImage="' + varItem.sourceRss_smallimage + '"  categorylargelImage="' + varItem.sourceRss_largeimage + '"><a href="#">' + varItem.itemTitle + '</a></h3><div class="thedescription124" ><div class="popItemContent">' + desc1txt + ' <a class="aBolder" href="javascript:void(0)" theHref="' + varItem.itemlink + '" onclick="goOpenUrl(this);" id="readMore' + theId + i.toString() + '">' + bk.cnfg_ReadMoreWords + '</a><div class="allInfoRight"></div></div><div class="socialBuuttons" id="SocialLinks' + theId + i.toString() + '"><div class="overTheSocialWhite"></div><div class="socialBuuttonsInner">here</div><div class="LastUpdatedDateItem"><a class="aReadMore" href="javascript:void(0)" theHref="' + varItem.itemlink + '" onclick="goOpenUrl(this);" id="readMore_2_' + theId + i.toString() + '">' + bk.cnfg_ReadMoreWords + '</a> - ' + (varItem.itemdate == '' ? varItem.itempubDate : varItem.itemdate) + '</div></div></div>').appendTo('#' + tabsDivId + ' div.accordion');
    }





    //accordion
    $("#tabs").tabs({
        select: function (event, ui) {
            var selectedItemClass = ui.tab.hash.replace('#', '') + 'Class';
            createTheAccordionfor(selectedItemClass)
            //remove unneded content
            $('.' + selectedItemClass + ' ' + bk.RemoveSelectorFromRssDescription).hide();
            //set text and logo of selected Category
            $("#mainImage").attr('src', $('.' + selectedItemClass).attr('sourceRss_largeimage'));
            $("#allInfo").text($('.' + selectedItemClass).attr('sourceRss_text'));

            //save selected tab
            localStorage["selectedTabIndex"] = ui.index;
            
        },
        show: function (event, ui) {
            updateSocialLinks();
        }
    });

    var selectedItemClass = allItemsIDs[Number(selectedTab)] + 'Class';
    if ($('.' + selectedItemClass).length == 0) {
        selectedItemClass = allItemsIDs[0] + 'Class';
        localStorage["selectedTabIndex"] = selectedTab = 0;
    }

    //make accordion for the first node
    $("#tabs").tabs("select", Number(selectedTab));
    createTheAccordionfor(allItemsIDs[Number(selectedTab)]+ 'Class');
    //set text and logo of selected Category


    $("#mainImage").attr('src', $('.' + selectedItemClass).attr('sourceRss_largeimage'));
    $("#allInfo").text($('.' + selectedItemClass).attr('sourceRss_text'));


    $("img").error(function () {
        $(this).hide();
    })
}, 300);

function createTheAccordionfor(selectedItemClass) {
    $('.' + selectedItemClass).accordion({
        changestart: function (event, ui) {
            var a = "sdfsd";
            var b = event;
            var c = ui;
        },
        change: function (event, ui) {
            updateSocialLinks();
        },
        create: function (event, ui) {
            updateSocialLinks();
        },
        autoHeight: true,
        navigation: true
    });
}

function updateSocialLinks() {
    //get template
    var templ = $('.socialBuuttonsTemplate').html();
    $('.mainTabDiv').each(function () {
        if (!$(this).is('.ui-tabs-hide')) {
            //this is selected tab
            var theH3a = $(this).find('h3[aria-selected="true"]');
            if (theH3a.length > 0) {
                var theH3 = $(theH3a[0]);
                var itemID = theH3.attr('itemID');
                if ($('#SocialLinks' + itemID + ' div.socialBuuttonsInner').find('.st_facebook').length == 0) {

                    var categoryText = escape(theH3.attr('category'));
                    var theLink = escape($('#readMore' + itemID).attr('theHref'));
                    templ = templ.replace(/##urlEncoded##/gi, theLink);
                    templ = templ.replace(/##titleEncoded##/gi, categoryText);
                    templ = templ.replace(/##title##/gi, theH3.attr('category'));
                    templ = templ.replace(/##smallImage##/gi, theH3.attr('categorysmallImage'));
                    //clear all
                    $('.socialBuuttons div.socialBuuttonsInner').html('');
                    $('div.LastUpdatedDateItem').hide();
                    $('div.overTheSocialWhite').show();
                    $('div.LastUpdatedDateItem').show();

                    //$('#SocialLinks' + itemID + ' div.socialBuuttonsInner').hide();
                    $('#SocialLinks' + itemID + ' div.socialBuuttonsInner').html(templ);
                    $('#SocialLinks' + itemID + ' div.overTheSocialWhite').fadeOut('fast', function () {
                        //$('#SocialLinks' + itemID + ' div.LastUpdatedDateItem').fadeIn('slow');
                    });
                }
            }
        }
    });
}
$().ready(function () {
    updateSocialLinks();
});