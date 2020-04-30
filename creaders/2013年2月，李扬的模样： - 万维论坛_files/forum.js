//==========================================================================================================
//  ajax����
//==========================================================================================================

/* ����ajax���� */
function createXMLHttpRequest(){
	var xmlHttp;
	if(window.XMLHttpRequest){ //Mozilla�����
		xmlHttp = new XMLHttpRequest();
	}else if (window.ActiveXObject){ // IE�����
		try{
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(err){
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(err){
				return false;
			}
		}
	}
	return xmlHttp;
}


/* ajaxͬ�����÷��� */
function getValueXMLHttp(exec_url){ //����ҳ��
	var xmlHttp = createXMLHttpRequest();
	xmlHttp.open("POST", exec_url, false);
	xmlHttp.send(null);
	var str = xmlHttp.responseText;
	delete xmlHttp;
	return str;
}



//==========================================================================================================
//  ���ú���
//==========================================================================================================
/* ����û�����ʽ */
function check_user_name(uname){
	var regEx = new RegExp(/^[a-z][\w]{3,15}$/gi);
	return regEx.test(uname);
}

/* ����û������ʽ */
function check_user_password(upassword){
	var regEx = new RegExp(/^[\w]{4,20}$/gi);
	return regEx.test(upassword);
}

/* ���Email */
function check_email(email){
	var regEx = new RegExp(/^([\w-]\.*)+@[\w-]+\.[a-z]{2,6}(\.[a-z]{2}|[\t]*)$/gi);
	return regEx.test(email);
}

/* ��������1:ѡ���ı� */
function deal_content(begintxt, endtxt, textarea_id){
	var objtxt = document.getElementById(textarea_id);
	objtxt.focus();
	if(document.uniqueID){ //IE�����
		var rang = document.selection.createRange();
		var rang_txt = rang.text;
		rang.text = begintxt + rang_txt + endtxt;
	}else{ //Mozilla�����
		var startpos = objtxt.selectionStart;
		var endpos = objtxt.selectionEnd + begintxt.length + endtxt.length;
		var txt1 = objtxt.value.substring(0, objtxt.selectionStart);
		var txt2 = objtxt.value.substring(objtxt.selectionEnd);
		objtxt.value = txt1 + begintxt + objtxt.value.substring(objtxt.selectionStart, objtxt.selectionEnd) + endtxt + txt2;
		objtxt.selectionStart = startpos;
		objtxt.selectionEnd = endpos;
	}
}

/* ��������2:��ǰλ�� */
function insert_content(txt, textarea_id){
	var objtxt = document.getElementById(textarea_id);
	
	objtxt.focus();
	if(document.uniqueID){ //IE�����
		var rang = document.selection.createRange();
		var rang_txt = rang.text;
		rang.text = rang_txt + txt;
	}else{ //Mozilla�����
		var startpos = objtxt.selectionEnd;
		var endpos = startpos + txt.length;
		var txt1 = objtxt.value.substring(0, objtxt.selectionEnd);
		var txt2 = objtxt.value.substring(objtxt.selectionEnd);
		objtxt.value = txt1 + txt + txt2;
		objtxt.selectionStart = startpos;
		objtxt.selectionEnd = endpos;
	}
}



//==========================================================================================================
//  ��������
//==========================================================================================================
/* ����û���¼״̬ */
function user_login_state(url, frm_id){
	var login = document.getElementById("div_login");
	var panel = document.getElementById("div_panel");
	
	var html = getValueXMLHttp("ajax.forum.php?act=state&url=" + url + "&frm_id=" + frm_id);
	var html_array = html.split("&&&");
	login.innerHTML = html_array[0];
	panel.innerHTML = html_array[1];
	
	
}

/* �����û���¼״̬ȷ���û���������������Ƿ���ʾ */
function name_display(obj_id){
	var obj = document.getElementById(obj_id);
	var html = getValueXMLHttp("ajax.forum.php?act=check_login");
	if(html === "FALSE"){
		obj.style.display = "";
	}else{
		obj.style.display = "none";
	}
}

/* ��ʾ�ظ���Ϣ�б� */
//�������ظ���ID��ͼƬһID��ͼƬ��ID��ͼƬ��·�����ظ����ݱ��ID����̳ID������ID
function show_back_thread(div_id, img1_id, img2_id, img_lib, table_id, frm_id, trd_id){
	var div = document.getElementById(div_id);
	var img1 = document.getElementById(img1_id);
	
	if(div.style.cssText == ""){ //-- ���ػظ���
		div.style.cssText = "display:none;";
		img1.src = img_lib + "f024.gif";
	}else{ //-- ��ʾ�ظ���
		div.style.cssText = "";
		img1.src = img_lib + "f023.gif";
		var table = document.getElementById(table_id);
		var html = div.innerHTML;
		div.innerHTML = html;
	}
}

/* ��ʾ�ظ���Ϣ���б� */
function show_back_thread_sub(div_id, img_id, img_lib){
	var div = document.getElementById(div_id);
	var img = document.getElementById(img_id);
	
	if(div == null) return;
	
	if(div.style.cssText == ""){ //-- ���ػظ���
		div.style.cssText = "display:none;";
		img.src = img_lib + "f024.gif";
	}else{ //-- ��ʾ�ظ���
		div.style.cssText = "";
		img.src = img_lib + "f023.gif";
	}
}

/* �༭������ʽ */
function editor_format(flag, textarea_id){
	var begintxt = "[" + flag + "]";
	var endtxt = "[/" + flag + "]";
	deal_content(begintxt, endtxt, textarea_id);
}

/* �༭������ɫ */
function editor_format_color(path, textarea_id){
	if(document.uniqueID){ //IE�����
		var color = window.showModalDialog("control/color/color.html", "", "dialogWidth:217px; dialogHeight:180px; status:0; help:0;");
		if(color == ""){
			return;
		}else{
			var begintxt = "[color=" + color + "]";
			var endtxt = "[/color]";
			deal_content(begintxt, endtxt, textarea_id);
		}
	}else{ //Mozilla�����
		window.open("control/color/color.html?id=" + textarea_id, "", "width=212,height=155");
	}
}
function editor_format_color_Mozilla(textarea_id){
		var begintxt = "[color=" + global_color + "]";
		var endtxt = "[/color]";
		deal_content(begintxt, endtxt, textarea_id);
}

/* �༭�������� */
function editor_format_font(font, textarea_id){
	var begintxt = "[font=" + font + "]";
	var endtxt = "[/font]";
	deal_content(begintxt, endtxt, textarea_id);
}

/* �༭�����ֺ� */
function editor_format_size(size, textarea_id){
	var begintxt = "[size=" + size + "]";
	var endtxt = "[/size]";
	deal_content(begintxt, endtxt, textarea_id);
}

/* ������Դ */
function editor_format_link(flag, text, textarea_id){
	var val;
	
	switch(flag){
		case "img":
		case "avi":
		case "url":
		case "mp3":
		case "ff":
		case "rm":
		case "iframe":
			val = "http://";
			break;
		case "email":
			val = "";
			break;
		default:
			return;
	}
	
	var input = prompt(text, val);
	if(input == "" || input == null) {
		
		return;}
	var txt;
	
	switch(flag){
		case "img":
			txt = "[img]" + input + "[/img]";
			break;
		case "avi":
			txt = "[avi]" + input + "[/avi]";
			break
			;		
		case "rm":
			txt = "[rm]" + input + "[/rm]";
			break
			;		
		case "url":
			txt = "[url]" + input + "[/url]";
			break;
		case "mp3":
			txt = "[mp3]" + input + "[/mp3]";
			break;
		case "email":
			txt = "[email]" + input + "[/email]";
			break;
		case "ff":
			txt = "[flash]" + input + "[/flash]";
			break;
		case "iframe":
			txt = "[iframe]" + input + "[/iframe]";
			break;
	}
	
	insert_content(txt, textarea_id);
}

function get_flash_code(url)
{
	var template = '<OBJECT codeBase=http://download.macromedia.com'
	 +'/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0 '
	 + 'height=300 width=500 classid=clsid:D27CDB6E-AE6D-11cf-96B8-444553540000>'
	 + '<PARAM NAME="_cx" VALUE="13229"><PARAM NAME="_cy" VALUE="7938">'
	 + '<PARAM NAME="FlashVars" VALUE=""><PARAM NAME="Movie" VALUE="' 
	 + url +
	 '"><PARAM NAME="Src" VALUE="'
	 +	url +
	 '"><PARAM NAME="WMode" VALUE="Window"><PARAM NAME="Play" VALUE="-1">'
	 + '<PARAM NAME="Loop" VALUE="-1"><PARAM NAME="Quality" VALUE="High">'
	 + '<PARAM NAME="SAlign" VALUE=""><PARAM NAME="Menu" VALUE="-1">'
	 + '<PARAM NAME="Base" VALUE=""><PARAM NAME="AllowScriptAccess" VALUE="">'
	 + '<PARAM NAME="Scale" VALUE="ShowAll"><PARAM NAME="DeviceFont" VALUE="0">'
	 + '<PARAM NAME="EmbedMovie" VALUE="0"><PARAM NAME="BGColor" VALUE="">'
	 + '<PARAM NAME="SWRemote" VALUE=""><PARAM NAME="MovieData" VALUE="">'
	 + '<PARAM NAME="SeamlessTabbing" VALUE="1">'
	 + '<PARAM NAME="Profile" VALUE="0"><PARAM NAME="ProfileAddress" VALUE="">'
	 + '<PARAM NAME="ProfilePort" VALUE="0">'
	 + '<PARAM NAME="AllowNetworking" VALUE="all">'
	 + '<PARAM NAME="AllowFullScreen" VALUE="false">'
	 + '<embed src=' +
	url 
	+' pluginspage'
	+ '=\'http://www.macromedia.com/shockwave/'+
	'download/index.cgi?P1_Prod_Version=ShockwaveFlash\' '
	+ 'type=\'application/x-shockwave-flash\'' +
	'width=500 height=300></embed></OBJECT>';
	
  return template;

}
