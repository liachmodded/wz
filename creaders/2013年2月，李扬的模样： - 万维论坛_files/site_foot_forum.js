// JavaScript Document
//2006-05-24 ��ǿ
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
		document.write('<a href="' + creaders + '/about_us.html" target="_blank"' + a_style + '>���_����</a> | ');
		document.write('<a href="' + creaders + '/ads_service.html" target="_blank"' + a_style + '>�s�i�A��</a> | ');
		document.write('<a href="' + creaders + '/contact_us.html" target="_blank"' + a_style + '>�p�t�ڭ�</a> | ');
		document.write('<a href="' + creaders + '/job.html" target="_blank"' + a_style + '>�۸u�H��</a> | ');
		document.write('<a href="' + creaders + '/navigate.html" target="_blank"' + a_style + '>�����ɯ�</a> | ');
		document.write('<a href="' + creaders + '/protect.html" target="_blank"' + a_style + '>���p�O�@</a>');
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
		document.write('<a href="' + creaders + '/about_us.html" target="_blank"' + a_style + '>���ڱ�վ</a> | ');
		document.write('<a href="' + creaders + '/ads_service.html" target="_blank"' + a_style + '>������</a> | ');
		document.write('<a href="' + creaders + '/contact_us.html" target="_blank"' + a_style + '>��ϵ����</a> | ');
		document.write('<a href="' + creaders + '/job.html" target="_blank"' + a_style + '>��Ƹ��Ϣ</a> | ');
		document.write('<a href="' + creaders + '/navigate.html" target="_blank"' + a_style + '>��վ����</a> | ');
		document.write('<a href="' + creaders + '/protect.html" target="_blank"' + a_style + '>��˽����</a>');
		document.write('<br><br><font' + font_style + '>');
		document.write('Copyright (C) 1998-2013. CyberMedia Network ');
		document.write('/Creaders.NET. All Rights Reserved.');
		document.write('</font></td>');
		document.write('</tr>');
		document.write('</table>');
	}
}