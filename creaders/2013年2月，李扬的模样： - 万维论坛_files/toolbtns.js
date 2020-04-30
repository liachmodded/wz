

(function () {
    var utils = baidu.editor.utils;
    var editorui = baidu.editor.ui;
    var _Dialog = editorui.Dialog;
	
	utils.loadFile(document, {
		href:'/ueditor/themes/default/css/toolbtns.css',
		tag:"link",
		rel:"stylesheet",
		type:"text/css",
		defer:"defer"
	});
    
	var iframeUrlMap = {
		'flashupload': '~/dialogs/flash/flash.html',
		'mediaupload': '~/dialogs/media/media.html'
    };
    var btnCmds = ['flashupload','mediaupload','musicupload'];

    for (var i = 0, ci; ci = btnCmds[i++];) {
        ci = ci.toLowerCase();
        editorui[ci] = function (cmd) {
            return function (editor) {
                var ui = new editorui.Button({
                    className:'edui-for-' + cmd,
                    title:editor.options.labelMap[cmd] || editor.getLang("labelMap." + cmd) || '',
                    onclick:function () {
                        editor.execCommand(cmd);
                    },
                    theme:editor.options.theme,
                    showText:false
                });
                editorui.buttons[cmd] = ui;
                editor.addListener('selectionchange', function (type, causeByUi, uiReady) {
                    var state = editor.queryCommandState(cmd);
                    if (state == -1) {
                        ui.setDisabled(true);
                        ui.setChecked(false);
                    } else {
                        if (!uiReady) {
                            ui.setDisabled(false);
                            ui.setChecked(state);
                        }
                    }
                });
                return ui;
            };
        }(ci);
    }

    var dialogBtns = {
		noOk:[],
        ok:['flashupload', 'mediaupload']
    };

    for (var p in dialogBtns) {
        (function (type, vals) {
            for (var i = 0, ci; ci = vals[i++];) {
                //todo opera下存在问题
                if (UE.browser.opera && ci === "searchreplace") {
                    continue;
                }
                (function (cmd) {
                    editorui[cmd] = function (editor, iframeUrl, title) {
                        iframeUrl = iframeUrl || (editor.options.iframeUrlMap || {})[cmd] || iframeUrlMap[cmd];
                        title = editor.options.labelMap[cmd] || editor.getLang("labelMap." + cmd) || '';

                        var dialog;
                        //没有iframeUrl不创建dialog
                        if (iframeUrl) {
                            dialog = new editorui.Dialog(utils.extend({
                                iframeUrl:editor.ui.mapUrl(iframeUrl),
                                editor:editor,
                                className:'edui-for-' + cmd,
                                title:title,
                                holdScroll: cmd === 'insertimage',
                                fullscreen: /charts|preview/.test(cmd),
                                closeDialog:editor.getLang("closeDialog")
                            }, type == 'ok' ? {
                                buttons:[
                                    {
                                        className:'edui-okbutton',
                                        label:editor.getLang("ok"),
                                        editor:editor,
                                        onclick:function () {
                                            dialog.close(true);
                                        }
                                    },
                                    {
                                        className:'edui-cancelbutton',
                                        label:editor.getLang("cancel"),
                                        editor:editor,
                                        onclick:function () {
                                            dialog.close(false);
                                        }
                                    }
                                ]
                            } : {}));

                            editor.ui._dialogs[cmd + "Dialog"] = dialog;
                        }

                        var ui = new editorui.Button({
                            className:'edui-for-' + cmd,
                            title:title,
                            onclick:function () {
                                if (dialog) {
                                    switch (cmd) {
                                        case "wordimage":
                                            var images = editor.execCommand("wordimage");
                                            if (images && images.length) {
                                                dialog.render();
                                                dialog.open();
                                            }
                                            break;
                                        case "scrawl":
                                            if (editor.queryCommandState("scrawl") != -1) {
                                                dialog.render();
                                                dialog.open();
                                            }

                                            break;
                                        default:
                                            dialog.render();
                                            dialog.open();
                                    }
                                }
                            },
                            theme:editor.options.theme,
                            disabled:(cmd == 'scrawl' && editor.queryCommandState("scrawl") == -1) || ( cmd == 'charts' )
                        });
                        editorui.buttons[cmd] = ui;
                        editor.addListener('selectionchange', function () {
                            //只存在于右键菜单而无工具栏按钮的ui不需要检测状态
                            var unNeedCheckState = {'edittable':1};
                            if (cmd in unNeedCheckState)return;

                            var state = editor.queryCommandState(cmd);
                            if (ui.getDom()) {
                                ui.setDisabled(state == -1);
                                ui.setChecked(state);
                            }

                        });

                        return ui;
                    };
                })(ci.toLowerCase())
            }
        })(p, dialogBtns[p]);
    }

    /* 上传音乐 */
    editorui["musicupload"] = function (editor) {
        var name = 'musicupload',
            ui = new editorui.Button({
                className:'edui-for-' + name,
                title:editor.options.labelMap[name] || editor.getLang("labelMap." + name) || '',
                onclick:function () {
					window.open('./musicuploadnewpre.php','','height=400,width=630,top='+(window.screen.height-500)/2+',left='+(window.screen.width-300)/2+',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
				},
                theme:editor.options.theme,
                showText:false
            });
        editorui.buttons[name] = ui;

        editor.addListener('selectionchange', function (type, causeByUi, uiReady) {
            var state = editor.queryCommandState(name);
            if (state == -1) {
                ui.setDisabled(true);
                ui.setChecked(false);
            } else {
                if (!uiReady) {
                    ui.setDisabled(false);
                    ui.setChecked(state);
                }
            }
        });
        return ui;
    };

})();