var passback_domain = '//exchange.adtrue.com/tag/passback';
if (adtrue_passback) {
    var adQueryString = "?" + ArrayToURL(adtrue_passback);
    cb_min = 0;
    cb_max = 2147483647;
    var rand_ads = Math.floor(Math.random() * (cb_max - cb_min + 1)) + cb_min;
    adQueryString += "&divid=" + rand_ads;
    var adtrue_ads = '<scr' + 'ipt type="text/javascript" src="' + passback_domain + adQueryString + '"></scr' + 'ipt>';
    document.write(adtrue_ads);
}
function ArrayToURL(array) {
    var pairs = [];
    for (var key in array)
        if (array.hasOwnProperty(key))
            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(array[key]));
    return pairs.join('&');
}