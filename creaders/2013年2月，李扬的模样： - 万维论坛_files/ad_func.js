/*
 * path　应该设置为ads.swf的路径
 *
 */
function get_flash_code_x(main_site, path, zone_id, width, height, swf_src, is_open_url, url_pos, ad_id){
//	if( is_open_url == "yes" ){
//		inside_path = "";
//		if( url_pos == "inside" ) inside_path = path + "/html/site_ad_html/";
//		src = "/ads.swf?swf=" + swf_src
//					+ "&path=" + path
//					+ "&main_site=" + main_site
//					+ "&source=" + source
//					+ "&id=" + ad_id
//					+ "&url=" + inside_path;
//		src = main_site + src + open_url;
//	}else if( is_open_url == "no" ){
		src = path + "/html/site_ad_images/" + swf_src;
//	}


	html = "<object style=\"border:1px #000000 solid;\" classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0\" width=\"" + width + "\" height=\"" + height + "\">"					
			 + "<param name='flash_component' value='ImageViewer.swc' />"
			 + "<param name=\"allowScriptAccess\" value=\"sameDomain\" />"
			 + "<param name=\"movie\" value=\"" + src + "\" />"
			 + "<param name=\"quality\" value=\"high\" />"
			 + "<embed src=\"" + src + "\" quality=\"high\" width=\"" + width + "\" height=\"" + height + "\" allowScriptAccess=\"sameDomain\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />"
			 + "</object>";
	return html;
}

function get_image_code(main_site, path, zone_id, width, height, src, is_open_url, url_pos, ad_id, open_url,ad_tip){
	html = "<img src='" + path + "/html/site_ad_images/" + src + "' width='" + width + "' height='" + height + "' style='border:1px #000000 solid' alt='" + ad_tip + "'>";
	if( is_open_url == "yes" ){
		inside_path = "";
		if( url_pos == "inside" ) inside_path = path + "/html/site_ad_html/";
		html = "<a href='" + main_site + "/ads.php?source=" + zone_id + "&id=" + ad_id + "&url=" + inside_path + open_url + "' target='_blank'>"
			+ html
			+ "</a>";
	}
	return html;
}

function decode_string( str ){
	var from_str = new Array("&lt;", "&gt;", "&quot;", "&#039;", "&amp;", "-r-n");
	var to_str   = new Array("<",    ">",    "\"",     "'",      "&"    , "\r\n");
	
	
	for( i=0; i<from_str.length; i++ ){
		while( 1 ){
			str = str.replace(from_str[i], to_str[i]);
			if( str.search(from_str[i]) == -1 ) break;
		}
	}
	var random_ad = Math.round(Math.random() * 10000000);
	var pos = str.indexOf("[CACHEBUSTER]");
	while(pos > 0){
		str = str.replace("[CACHEBUSTER]", random_ad);
		pos = str.indexOf("[CACHEBUSTER]");
	}
	
	
	return str;
}

//function show_large_ad(main_site, path, width, height, count, ad_id, ad_effect, ad_open_details, ad_url_position, ad_url, probability, ad_type, ads_code){
//	rand_number = Math.floor(Math.random() * 100);
//	sum = 0;
//	for(i = 0; i < count; i++){
//		if(rand_number > sum && rand_number <= (sum += probability[i])) break;
//	}
//	if(i > count - 1) i = count - 1;
//	
//	if("code" != ad_type[i]){
//		var ptn = /^\d{16}(\.swf)$/i;
//		if(ptn.test(ad_effect[i])){
//			html = get_flash_code(main_site, path, width, height, ad_effect[i], ad_open_details[i], ad_url_position[i], ad_id[i], ad_url[i]);
//		}else{
//			html = get_image_code(main_site, path, width, height, ad_effect[i], ad_open_details[i], ad_url_position[i], ad_id[i], ad_url[i]);
//		}
//	}else{
//		//html = "<div style='width:" + width + "px;height:" + height + "px;overflow:hidden;border:solid 1px #000000;text-align:center'>" + decode_string( ads_code[i] ) + "</div>";
//		html = decode_string(ads_code[i]);
//	}
//	document.write(html);
//}
/**********  2007-3-22 修改大型广告显示方式  **********
  显示方法：
			该广告位上有效的广告，根据设置的显示频率显示出来
	广告有效性判定（满足1条即可）：
			1.循环模式(ad_loop_type)为no，并且运行状态(ad_release)为1
			2.循环模式(ad_loop_type)不为no，并且在循环周期(ad_loop_time)内
			show_large_ad(\"{$mainSite}\", \"{$path}\", {$zone_id}, 
*/
function show_large_ad(main_site, path, zone_id, width, height, count, ad_id, ad_effect, ad_open_details, ad_url_position, ad_url, probability, ad_type, ads_code, ad_release, ad_loop_type, ad_loop_time, is_default, ad_tip, DefaultZone)
{
	var http = createXMLHttpRequest();
	http.open("GET", "include/get_server_time.php", false);
	http.send(null);
	var now_array = new Array();
	now_array = http.responseText.split(";");
	var now_y = now_array[0].valueOf();
	var now_m = now_array[1].valueOf();
	var now_d = now_array[2].valueOf();
	var now_H = now_array[3].valueOf();
	var now_i = now_array[4].valueOf();
	var now_s = now_array[5].valueOf();
	var now_date = new Date(now_y, now_m - 1, now_d, now_H, now_i, now_s, 0);
	var now_w = now_date.getDay();
	delete http;
	delete now;
	
	/* 计算有效的广告的显示频率总合sum，同时生成有效广告数组 */
	var sum1 = sum2 = sum3 = 0;
	
	var effe_bound = 0;
	var effe_ad_id           = new Array();
	var effe_ad_effect       = new Array();
	var effe_ad_open_details = new Array();
	var effe_ad_url_position = new Array();
	var effe_ad_url          = new Array();
	var effe_probability     = new Array();
	var effe_ad_type         = new Array();
	var effe_ads_code        = new Array();
	var effe_ad_release      = new Array();
	var effe_ad_loop_type    = new Array();
	var effe_ad_loop_time    = new Array();
	var effe_ad_tip          = new Array();
	
	for(var i = 0; i < count; i++){
		if(ad_loop_type[i] == "no"){ //有效广告条件1
			if(ad_release[i] == 1){
				if(is_default[i] == 1){
					sum1 += probability[i];
				}else if(is_default[i] == 2){
					sum2 += probability[i];
				}else{
					sum3 += probability[i];
				}
				effe_ad_id[effe_bound]           = ad_id[i];
				effe_ad_effect[effe_bound]       = ad_effect[i];
				effe_ad_open_details[effe_bound] = ad_open_details[i];
				effe_ad_url_position[effe_bound] = ad_url_position[i];
				effe_ad_url[effe_bound]          = ad_url[i];
				effe_probability[effe_bound]     = probability[i];
				effe_ad_type[effe_bound]         = ad_type[i];
				effe_ads_code[effe_bound]        = ads_code[i];
				effe_ad_release[effe_bound]      = ad_release[i];
				effe_ad_loop_type[effe_bound]    = ad_loop_type[i];
				effe_ad_loop_time[effe_bound]    = ad_loop_time[i];
				effe_ad_tip[effe_bound]          = ad_tip[i];
				effe_bound++;
			}
		}else{ //有效广告条件2
			switch(ad_loop_type[i]){
				case "year":
					var ptn = new RegExp(/[\d]{2}/gi);
					var tmp_array = ad_loop_time[i].match(ptn);
					for(var j = 0; j < tmp_array.length; j++){
						if(tmp_array[j].valueOf() == now_m.valueOf()){
							if(is_default[i] == 1){
								sum1 += probability[i];
							}else if(is_default[i] == 2){
								sum2 += probability[i];
							}else{
								sum3 += probability[i];
							}
							effe_ad_id[effe_bound]           = ad_id[i];
							effe_ad_effect[effe_bound]       = ad_effect[i];
							effe_ad_open_details[effe_bound] = ad_open_details[i];
							effe_ad_url_position[effe_bound] = ad_url_position[i];
							effe_ad_url[effe_bound]          = ad_url[i];
							effe_probability[effe_bound]     = probability[i];
							effe_ad_type[effe_bound]         = ad_type[i];
							effe_ads_code[effe_bound]        = ads_code[i];
							effe_ad_release[effe_bound]      = ad_release[i];
							effe_ad_loop_type[effe_bound]    = ad_loop_type[i];
							effe_ad_loop_time[effe_bound]    = ad_loop_time[i];
							effe_ad_tip[effe_bound]          = ad_tip[i];
							effe_bound++;
							break;
						}
					}
					break;
				case "month":
					var ptn = new RegExp(/[\d]{2}/gi);
					var tmp_array = ad_loop_time[i].match(ptn);
					for(var j = 0; j < tmp_array.length; j++){
						if(tmp_array[j].valueOf() == now_d.valueOf()){
							if(is_default[i] == 1){
								sum1 += probability[i];
							}else if(is_default[i] == 2){
								sum2 += probability[i];
							}else{
								sum3 += probability[i];
							}
							effe_ad_id[effe_bound]           = ad_id[i];
							effe_ad_effect[effe_bound]       = ad_effect[i];
							effe_ad_open_details[effe_bound] = ad_open_details[i];
							effe_ad_url_position[effe_bound] = ad_url_position[i];
							effe_ad_url[effe_bound]          = ad_url[i];
							effe_probability[effe_bound]     = probability[i];
							effe_ad_type[effe_bound]         = ad_type[i];
							effe_ads_code[effe_bound]        = ads_code[i];
							effe_ad_release[effe_bound]      = ad_release[i];
							effe_ad_loop_type[effe_bound]    = ad_loop_type[i];
							effe_ad_loop_time[effe_bound]    = ad_loop_time[i];
							effe_ad_tip[effe_bound]          = ad_tip[i];
							effe_bound++;
							break;
						}
					}
					break;
				case "week":
					var ptn = new RegExp(/[\d]{1}/gi);
					var tmp_array = ad_loop_time[i].match(ptn);
					for(var j = 0; j < tmp_array.length; j++){
						if(tmp_array[j].valueOf() == now_w.valueOf()){
							if(is_default[i] == 1){
								sum1 += probability[i];
							}else if(is_default[i] == 2){
								sum2 += probability[i];
							}else{
								sum3 += probability[i];
							}
							effe_ad_id[effe_bound]           = ad_id[i];
							effe_ad_effect[effe_bound]       = ad_effect[i];
							effe_ad_open_details[effe_bound] = ad_open_details[i];
							effe_ad_url_position[effe_bound] = ad_url_position[i];
							effe_ad_url[effe_bound]          = ad_url[i];
							effe_probability[effe_bound]     = probability[i];
							effe_ad_type[effe_bound]         = ad_type[i];
							effe_ads_code[effe_bound]        = ads_code[i];
							effe_ad_release[effe_bound]      = ad_release[i];
							effe_ad_loop_type[effe_bound]    = ad_loop_type[i];
							effe_ad_loop_time[effe_bound]    = ad_loop_time[i];
							effe_ad_tip[effe_bound]          = ad_tip[i];
							effe_bound++;
							break;
						}
					}
					break;
				case "day":
					var ptn = new RegExp(/[\d]{2}:[\d]{2}:[\d]{2}-[\d]{2}:[\d]{2}:[\d]{2}/gi);
					var tmp_array_1 = ad_loop_time[i].match(ptn);
					for(var j = 0; j < tmp_array_1.length; j++){
						ptn = /[\d]{2}/gi;
						tmp_array_2 = tmp_array_1[j].match(ptn);
						var date_1 = new Date(now_y, now_m - 1, now_d, tmp_array_2[0].valueOf(), tmp_array_2[1].valueOf(), tmp_array_2[2].valueOf(), 0);
						var date_2 = new Date(now_y, now_m - 1, now_d, tmp_array_2[3].valueOf(), tmp_array_2[4].valueOf(), tmp_array_2[5].valueOf(), 0);
						if(now_date >= date_1 && now_date <= date_2){
							if(is_default[i] == 1){
								sum1 += probability[i];
							}else if(is_default[i] == 2){
								sum2 += probability[i];
							}else{
								sum3 += probability[i];
							}
							effe_ad_id[effe_bound]           = ad_id[i];
							effe_ad_effect[effe_bound]       = ad_effect[i];
							effe_ad_open_details[effe_bound] = ad_open_details[i];
							effe_ad_url_position[effe_bound] = ad_url_position[i];
							effe_ad_url[effe_bound]          = ad_url[i];
							effe_probability[effe_bound]     = probability[i];
							effe_ad_type[effe_bound]         = ad_type[i];
							effe_ads_code[effe_bound]        = ads_code[i];
							effe_ad_release[effe_bound]      = ad_release[i];
							effe_ad_loop_type[effe_bound]    = ad_loop_type[i];
							effe_ad_loop_time[effe_bound]    = ad_loop_time[i];
							effe_ad_tip[effe_bound]          = ad_tip[i];
							effe_bound++;
							break;
						}
					}
					break;
			}
		}
	}
	delete now_date;
	//alert("sum1="+sum1+"; sum2="+sum2+"; sum3="+sum3+";");
	/* 生成1到sum的随机数rand */
	var rand;
	if(sum1 > 0){
		rand = Math.floor(Math.random() * sum1 + 1);
	}else if(sum2 > 0){
		rand = Math.floor(Math.random() * sum2 + 1);
	}else{
		rand = Math.floor(Math.random() * sum3 + 1);
	}
	//var rand = Math.floor(Math.random() * sum + 1);
	
	/* 使用随机数rand确定应取广告数组下标bound */
	var bound = 0; //默认第一条广告
	var total = 0; //定义并且初始化计数器
	for(var i = 0; i < count; i++){
		if(rand > total && total + effe_probability[i] >= rand){
			bound = i;
			break;
		}else{
			total += effe_probability[i];
		}
	}//document.write(rand);
	
	/* 根据取得的广告数组下标bound，写入广告 */
	if("code" != effe_ad_type[bound]){
		var ptn = /^\d{16}(\.swf)$/i;
		if(ptn.test(effe_ad_effect[bound])){
			html = get_flash_code_x(main_site, path, zone_id, width, height, effe_ad_effect[bound], effe_ad_open_details[bound], effe_ad_url_position[bound], effe_ad_id[bound], effe_ad_url[bound]);
		}else{
			html = get_image_code(main_site, path, zone_id, width, height, effe_ad_effect[bound], effe_ad_open_details[bound], effe_ad_url_position[bound], effe_ad_id[bound], effe_ad_url[bound],effe_ad_tip[bound]);
		}
	}else{
		html = decode_string(effe_ads_code[bound]);
	}
	
	if(window.ActiveXObject) { document.write(html); } else { if (document.getElementById(DefaultZone)) { var patrn=/script/; if (patrn.test(html)) { document.write(html); } else { document.getElementById(DefaultZone).innerHTML = html; } } else { document.write(html); } }
}

function createXMLHttpRequest(){
	var xmlhttp;
	if(window.XMLHttpRequest){ //Mozilla 浏览器
		xmlhttp = new XMLHttpRequest();
	}else if(window.ActiveXObject){ // IE浏览器
		try{
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(err1){
			try{
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(err2){
				alert(err2.message);
			}
		}
	}
	return xmlhttp;
}