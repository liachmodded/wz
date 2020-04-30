// JavaScript Document
//2006-05-24 傅强
function set_site_foot(){
	var host, creaders, language, img, a_style, font_style;
	host = arguments[0];
	creaders = arguments[1];
	language = (arguments[2] != null) ? arguments[2] : "bg2312";
	img = (arguments[3] != null) ? arguments[3] : "1922.gif";
	a_style = (arguments[4] != null) ? ' style="color:' + arguments[4] + ';"' : ' style="color:#63636B;"';
	font_style = arguments[5] != null ? ' style="color:' + arguments[5] + '; font-size:14px;"' : ' style="color:#63636B; font-size:14px;"';
	
	if (language == "big5"){
		document.write('<table width="989" border="0" cellspacing="0" cellpadding="0">');
		document.write('<tr>');
		document.write('<td height="132" align="center" background="' + host + "/" + img + '"' + a_style + '>');
		document.write('<a href="' + creaders + '/about_us.html" target="_blank"' + a_style + '>闽セ</a> | ');
		document.write('<a href="' + creaders + '/ads_service.html" target="_blank"' + a_style + '>約狝叭</a> | ');
		document.write('<a href="' + creaders + '/contact_us.html" target="_blank"' + a_style + '>羛╰и</a> | ');
		document.write('<a href="' + creaders + '/job.html" target="_blank"' + a_style + '>┷竨獺</a> | ');
		document.write('<a href="' + creaders + '/navigate.html" target="_blank"' + a_style + '>呼旧</a> | ');
		document.write('<a href="' + creaders + '/protect.html" target="_blank"' + a_style + '>留╬玂臔</a>');
		document.write('<br><br><font' + font_style + '>');
		document.write('Copyright (C) 1998-2012. CyberMedia Network ');
		document.write('/Creaders.NET. All Rights Reserved.');
		document.write('</font></td>');
		document.write('</tr>');
		document.write('</table>');
	}else{
		document.write('<table width="989" border="0" cellspacing="0" cellpadding="0">');
		document.write('<tr>');
		document.write('<td height="132" align="center" background="' + host + "/" + img + '"' + a_style + '>');
		document.write('<a href="' + creaders + '/about_us.html" target="_blank"' + a_style + '>关于本站</a> | ');
		document.write('<a href="' + creaders + '/ads_service.html" target="_blank"' + a_style + '>广告服务</a> | ');
		document.write('<a href="' + creaders + '/contact_us.html" target="_blank"' + a_style + '>联系我们</a> | ');
		document.write('<a href="' + creaders + '/job.html" target="_blank"' + a_style + '>招聘信息</a> | ');
		document.write('<a href="' + creaders + '/navigate.html" target="_blank"' + a_style + '>网站导航</a> | ');
		document.write('<a href="' + creaders + '/protect.html" target="_blank"' + a_style + '>隐私保护</a>');
		document.write('<br><br><font' + font_style + '>');
		document.write('Copyright (C) 1998-2013. CyberMedia Network ');
		document.write('/Creaders.NET. All Rights Reserved.');
		document.write('</font></td>');
		document.write('</tr>');
		document.write('</table>');
	}
}