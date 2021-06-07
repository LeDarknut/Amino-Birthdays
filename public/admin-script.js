var url = new URL(window.location.href);
var language;
var text;
var encode_numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]; //Number encoding to take only one character in jason files
var community = {"id":url.searchParams.get("community"), "birthday_list": []}; //Get community's id from the url
var admin_key = "";

//Get and display community's infos and birthdays
firebase_function("community_get", {"admin": "1"}, function (response) {
	text = response.text;
	if (response.code == "000") {
		language = response.community.language;
		document.body.style.backgroundImage = "url('https"+ response.image.substring(4, response.image.lenght) + "')";
		interface.pageLogin.style.backgroundImage = "url('https"+ response.image.substring(4, response.image.lenght) + "')";
		interface.pageLogin_form_key.placeholder = text.password;
		interface.menu_community.children[0].innerHTML = text.menu.community.title;
		interface.menu_community_upcoming.children[0].innerHTML = text.menu.community.upcoming;
		interface.menu_community_browse.children[0].innerHTML = text.menu.community.browse;
		interface.menu_community_edit.children[0].innerHTML = text.menu.community.edit;
		interface.menu_community_remove.children[0].innerHTML = text.menu.community.remove;
		interface.menu_community_admin.children[0].innerHTML = text.menu.community.admin;
		interface.menu_profile.children[0].innerHTML = text.menu.profile.title;
		interface.menu_profile_submit.children[0].innerHTML = text.menu.profile.submit;
		interface.menu_profile_remove.children[0].innerHTML = text.menu.profile.remove;
		interface.page_community_browse_form_link.placeholder = text.link;
		interface.page_community_browse_message.children[0].innerHTML = text.page_community.browse_message;
		interface.page_community_edit_form_chat.children[0].innerHTML = text.page_community.edit.chat;
		interface.page_community_edit_form_rep.children[0].innerHTML = text.page_community.edit.rep;
		interface.page_community_edit_form_messages.children[0].children[0].innerHTML = text.page_community.edit.notify;
		interface.page_community_edit_form_messages.children[1].children[0].innerHTML = text.page_community.edit.submit;
		interface.page_community_edit_form_messages.children[2].children[0].innerHTML = text.page_community.edit.edit;
		interface.page_community_edit_form_messages.children[3].children[0].innerHTML = text.page_community.edit.remove;
		interface.page_community_remove_message.innerHTML = text.page_community.remove_message;
		interface.page_community_remove_form_key.placeholder = text.password;
		interface.page_community_admin_form.children[0].children[0].innerHTML = text.page_community.admin_admin;
		interface.page_profile_submit_form_name.placeholder = text.name;
		interface.page_profile_submit_form_link.placeholder = text.link;
		interface.page_profile_submit_form_birthday_label.innerHTML = text.birthday;
		if (text.date_format == "0"){
			interface.page_profile_submit_form_birthday_day.placeholder = text.day;
			interface.page_profile_submit_form_birthday_month.placeholder = text.month;
		} else {
			interface.page_profile_submit_form_birthday_day.placeholder = text.month;
			interface.page_profile_submit_form_birthday_month.placeholder = text.day;
		}
		interface.page_profile_submit_form_birthday_timezone.placeholder = text.timezone;
		interface.page_profile_remove_form_link.placeholder = text.link;
		interface.widget_birthday_message.innerHTML = text.birthday_message;
		interface.header_pageTitle.innerHTML = text.title.community_upcoming;
		interface.pageLogin_upload.children[0].innerHTML = text.upload;
		interface.page_community_edit_upload.children[0].innerHTML = text.upload;
		interface.page_community_remove_upload.children[0].innerHTML = text.upload;
		interface.page_community_admin_upload.children[0].innerHTML = text.upload;
		interface.page_profile_submit_upload.children[0].innerHTML = text.upload;
		interface.page_profile_remove_upload.children[0].innerHTML = text.upload;
		
		interface.page_profile_submit_preview.appendChild(interface.widget_birthday.cloneNode(true));
		interface.page_profile_submit_preview.getElementsByClassName("widget_birthday")[0].style.marginTop = "2vmin";
		interface.page_profile_submit_preview.getElementsByClassName("widget_birthday")[0].style.marginBottom = "2vmin";
		interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_name")[0].children[0].innerHTML = text.name;
		interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_name")[0].children[0].style.color = toRGB(0, 1);
		interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_date")[0].children[0].innerHTML = text.date;
		interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_date")[0].children[0].style.color = toRGB(0, 1);
		interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_timezone")[0].children[0].style.color = toRGB(0, 1);
		interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_timezone")[0].children[1].style.color = toRGB(0, 1);
		interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_countdown_day")[0].style.borderColor = toRGB(0, 1);
		interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_countdown_second")[0].style.color = toRGB(0, 1);
		interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_cadre")[0].style.borderColor = toRGB(0, 1);
		interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_cadre")[0].style.backgroundColor = toRGB(0, 0.4);

		interface.page_community_browse_preview.appendChild(interface.widget_birthday.cloneNode(true));
		interface.page_community_browse_preview.getElementsByClassName("widget_birthday")[0].style.marginTop = "2vmin";
		interface.page_community_browse_preview.getElementsByClassName("widget_birthday_name")[0].children[0].innerHTML = text.name;
		interface.page_community_browse_preview.getElementsByClassName("widget_birthday_name")[0].children[0].style.color = toRGB(0, 1);
		interface.page_community_browse_preview.getElementsByClassName("widget_birthday_date")[0].children[0].innerHTML = text.date;
		interface.page_community_browse_preview.getElementsByClassName("widget_birthday_date")[0].children[0].style.color = toRGB(0, 1);
		interface.page_community_browse_preview.getElementsByClassName("widget_birthday_timezone")[0].children[0].style.color = toRGB(0, 1);
		interface.page_community_browse_preview.getElementsByClassName("widget_birthday_timezone")[0].children[1].style.color = toRGB(0, 1);
		interface.page_community_browse_preview.getElementsByClassName("widget_birthday_countdown_day")[0].style.borderColor = toRGB(0, 1);
		interface.page_community_browse_preview.getElementsByClassName("widget_birthday_countdown_second")[0].style.color = toRGB(0, 1);
		interface.page_community_browse_preview.getElementsByClassName("widget_birthday_cadre")[0].style.borderColor = toRGB(0, 1);
		interface.page_community_browse_preview.getElementsByClassName("widget_birthday_cadre")[0].style.backgroundColor = toRGB(0, 0.4);

		interface.page_community_upcoming.style.display = "inline-block";
		interface.page_community_browse.style.display = "none";
		interface.page_community_edit.style.display = "none";
		interface.page_community_remove.style.display = "none";
		interface.page_community_admin.style.display = "none";
		interface.page_profile_submit.style.display = "none";
		interface.page_profile_remove.style.display = "none";
		interface.page.style.display = "block";
		page = "community_upcoming";
		interface.page_community_edit_form_chat.children[1].value = "http://aminoapps.com/p/" + response.community.chat;
		interface.page_community_edit_form_rep.children[1].value = response.community.rep_min;
		var notify_messages_text = "";
		for (notify_message in response.community.notify_messages) {
			notify_messages_text = notify_messages_text + "\n" + notify_message + " : " + response.community.notify_messages[notify_message].join("\n" + notify_message + " : ");
		}
		notify_messages_text = notify_messages_text.substring(1, notify_messages_text.length);
		interface.page_community_edit_form_messages_notify.value = notify_messages_text;
		interface.page_community_edit_form_messages_submit.value = response.community.validate_messages.submit;
		interface.page_community_edit_form_messages_edit.value = response.community.validate_messages.edit;
		interface.page_community_edit_form_messages_remove.value = response.community.validate_messages.remove;
		correct_community_edit_info_refresh();
		interface.menu_title.children[0].innerHTML = response.community.name;
		interface.menu_title.children[0].href = "http://aminoapps.com/p/" + response.community.chat;
		community.birthday_list = response.community.birthdays.substring(0, response.community.birthdays.length - 1).split(";");
		if (community.birthday_list[0] == "") {
			community.birthday_list = [];
		}
		
		//Ask for admin password if not present in the url
		refresh_community_upcoming(function () {
			setTimeout(function () {
				interface.pageLogin_form_key.focus();
				if (document.readyState === 'complete') {
					countdown.refresh();
					page_loaded();
					if (url.searchParams.get("admin") != "") {
						interface.pageLogin_form_key.value = url.searchParams.get("admin");
						correct_key_info_refresh();
						if (correct_key_info) {
							key_upload();
						}
					}
				} else {
					window.addEventListener("load", page_loaded);
				}
			}, 50);
		});
	} else if (response.code == "101" || response.code == "102" || response.code == "300") {
		loading(false);
		notify(text.notify.common_error[response.code], false);
	} else {
		notify(text.notify.page_load[response.code], false);
	}
});

var width = window.innerWidth;
var height = window.innerHeight;
document.getElementById("viewport").setAttribute("content", "width=" + width + ", height=" + height + ", initial-scale=0");

//Create a var for each usefull DOM's elements
var interface = {
	"pageLoading": document.getElementById("page-loading"),
	"pageLogin": document.getElementById("page-login"),
	"pageLogin_form_key": document.getElementById("page-login_form_key").children[0],
	"pageLogin_upload": document.getElementById("page-login_upload"),
	"header_menu": document.getElementById("header_menu"),
	"header_pageTitle": document.getElementById("header_page-title"),
	"header_icon": document.getElementById("header_icon"),
	"menu": document.getElementById("menu"),
	"menu_title": document.getElementById("menu_title"),
	"menu_community": document.getElementById("menu_community"),
	"menu_community_upcoming": document.getElementById("menu_community_upcoming"),
	"menu_community_browse": document.getElementById("menu_community_browse"),
	"menu_community_edit": document.getElementById("menu_community_edit"),
	"menu_community_remove": document.getElementById("menu_community_remove"),
	"menu_community_admin": document.getElementById("menu_community_admin"),
	"menu_profile": document.getElementById("menu_profile"),
	"menu_profile_submit": document.getElementById("menu_profile_submit"),
	"menu_profile_remove": document.getElementById("menu_profile_remove"),
	"page": document.getElementById("page"),
	"page_community_upcoming": document.getElementById("page_community_upcoming"),
	"page_community_upcoming_birthdays": document.getElementById("page_community_upcoming_birthdays"),
	"page_community_upcoming_message": document.getElementById("page_community_upcoming_message"),
	"page_community_browse": document.getElementById("page_community_browse"),
	"page_community_browse_form_link": document.getElementById("page_community_browse_form_link").children[0],
	"page_community_browse_message": document.getElementById("page_community_browse_message"),
	"page_community_browse_preview": document.getElementById("page_community_browse_preview"),
	"page_community_edit": document.getElementById("page_community_edit"),
	"page_community_edit_form": document.getElementById("page_community_edit_form"),
	"page_community_edit_form_chat": document.getElementById("page_community_edit_form_chat"),
	"page_community_edit_form_rep": document.getElementById("page_community_edit_form_rep"),
	"page_community_edit_form_messages": document.getElementById("page_community_edit_form_messages"),
	"page_community_edit_form_messages_notify": document.getElementById("page_community_edit_form_messages_notify").children[1],
	"page_community_edit_form_messages_submit": document.getElementById("page_community_edit_form_messages_submit").children[1],
	"page_community_edit_form_messages_edit": document.getElementById("page_community_edit_form_messages_edit").children[1],
	"page_community_edit_form_messages_remove": document.getElementById("page_community_edit_form_messages_remove").children[1],
	"page_community_edit_upload": document.getElementById("page_community_edit_upload"),
	"page_community_remove": document.getElementById("page_community_remove"),
	"page_community_remove_message": document.getElementById("page_community_remove_message"),
	"page_community_remove_form_key": document.getElementById("page_community_remove_form_key").children[0],
	"page_community_remove_upload": document.getElementById("page_community_remove_upload"),
	"page_community_admin_form": document.getElementById("page_community_admin_form"),
	"page_community_admin_form_admin": document.getElementById("page_community_admin_form_admin").children[1],
	"page_community_admin_upload": document.getElementById("page_community_admin_upload"),
	"page_profile_submit":document.getElementById("page_profile_submit"),
	"page_profile_submit_form_name": document.getElementById("page_profile_submit_form_name").children[0],
	"page_profile_submit_form_link": document.getElementById("page_profile_submit_form_link").children[0],
	"page_profile_submit_form_birthday_label" : document.getElementById("page_profile_submit_form_birthday_label").children[0],
	"page_profile_submit_form_birthday_day": document.getElementById("page_profile_submit_form_birthday_inputs_day"),
	"page_profile_submit_form_birthday_month": document.getElementById("page_profile_submit_form_birthday_inputs_month"),
	"page_profile_submit_form_birthday_timezone": document.getElementById("page_profile_submit_form_birthday_inputs_timezone"),
	"page_profile_submit_form_color": document.getElementById("page_profile_submit_form_color").children[0],
	"page_profile_submit_preview": document.getElementById("page_profile_submit_preview"),
	"page_profile_submit_upload": document.getElementById("page_profile_submit_upload"),
	"page_profile_remove": document.getElementById("page_profile_remove"),
	"page_profile_remove_form_link": document.getElementById("page_profile_remove_form_link").children[0],
	"page_profile_remove_upload": document.getElementById("page_profile_remove_upload"),
	"page_community_admin":document.getElementById("page_community_admin"),
	"widget":document.getElementById("widget"),
	"widget_birthday": document.getElementById("widget").getElementsByClassName("widget_birthday")[0],
	"widget_birthday_message": document.getElementsByClassName("widget_birthday_message")[0].children[0],
	"notification": document.getElementById("notification"),
	"loading": document.getElementById("loading")
};

//Refresh birthay list
function refresh_birthday_list(callback) {
	firebase_function("community_get", {"admin": "0"}, function (response) {
		if (response.code == "000") {
			community.birthday_list = response.community.birthdays.substring(0, response.community.birthdays.length - 1).split(";");
			if (community.birthday_list[0] == "") {
				community.birthday_list = [];
			}
			refresh_community_upcoming(callback);
		} else if (response.code == "101" || response.code == "102" || response.code == "300") {
			loading(false);
			notify(text.notify.common_error[response.code], false);
		} else {
			notify(text.notify.page_load[response.code]);
		}
	});
}

//Process every birthday widget's countdown
var countdown = {
	"min" : "00",
	"sec" : "00",
	"refresh" : function () {
		var date = new Date();
		countdown.min = Math.trunc(59 - date.getMinutes());
		countdown.sec = Math.trunc(59 - date.getSeconds());
		if (countdown.min == 59 && countdown.sec == 59) {
			refresh_community_upcoming();
		}
		if (countdown.min < 10) { countdown.min = "0" + countdown.min }
		if (countdown.sec < 10) { countdown.sec = "0" + countdown.sec }
		countdown.apply();
	},
	"apply" : function (element = false) {
		if (element) {
			var widget = element.getElementsByClassName("widget_birthday_cadre")[0];
			widget.getElementsByClassName("widget_birthday_countdown_minute")[0].innerHTML = countdown.min;
			widget.getElementsByClassName("widget_birthday_countdown_second")[0].innerHTML = countdown.sec;
		} else {
			if (page == "community_upcoming") {
				for (widgetpos = 0; widgetpos < interface.page_community_upcoming_birthdays.getElementsByClassName("on-screen").length; widgetpos++) {
					var widget = interface.page_community_upcoming_birthdays.getElementsByClassName("on-screen")[widgetpos];
					widget.getElementsByClassName("widget_birthday_countdown_minute")[0].innerHTML = countdown.min;
					widget.getElementsByClassName("widget_birthday_countdown_second")[0].innerHTML = countdown.sec;
				}
			} else if (page == "community_browse" && profile_found != false) {
				var widget = interface.page_community_browse_preview.getElementsByClassName("widget_birthday")[0];
				var date = new Date();
				var textDate = widget.getElementsByClassName("widget_birthday_date")[0].children[0].innerHTML;
				var timezone = parseInt(widget.getElementsByClassName("widget_birthday_timezone")[0].children[1].innerHTML, 10);
				var date_target;
				if (text.date_format == "0"){
					date_target = new Date(Date.UTC(date.getUTCFullYear(), textDate.substring(0, 2) - 1, textDate.substring(3, 5), 0 - timezone, 0, 0, 0));
				} else {
					date_target = new Date(Date.UTC(date.getUTCFullYear(), textDate.substring(3, 5) - 1, textDate.substring(0, 2), 0 - timezone, 0, 0, 0));
				}
				if (date.getTime() >= date_target.getTime() + 86400000) {
					date_target.setUTCFullYear(date_target.getUTCFullYear() + 1)
				}
				var birthday_today = false;
				if (date.getTime() >= date_target.getTime() && date.getTime() < date_target.getTime() + 86400000) {
					birthday_today = true;
				}
				var day = Math.trunc((date_target.getTime() - date.getTime()) / 86400000);
				var hour = Math.trunc((date_target.getTime() - date.getTime()) /3600000) % 24;
				if (day < 100) { day = "0" + day }
				if (day < 10) { day = "0" + day }
				if (hour < 10) { hour = "0" + hour }
				if (!birthday_today) {
					widget.getElementsByClassName("widget_birthday_countdown_day")[0].innerHTML = day;
					widget.getElementsByClassName("widget_birthday_countdown_hour")[0].innerHTML = hour;
					widget.getElementsByClassName("widget_birthday_countdown_minute")[0].innerHTML = countdown.min;
					widget.getElementsByClassName("widget_birthday_countdown_second")[0].innerHTML = countdown.sec;
					widget.getElementsByClassName("widget_birthday_countdown")[0].style.display = "block";
					widget.getElementsByClassName("widget_birthday_message")[0].style.display = "none";
				}
				else {
					widget.getElementsByClassName("widget_birthday_countdown")[0].style.display = "none";
					widget.getElementsByClassName("widget_birthday_message")[0].style.display = "block";
				}
			} else if (page == "profile_submit") {
				var date = new Date();
				var widget = interface.page_profile_submit_preview.getElementsByClassName("widget_birthday")[0];
				var textDate = widget.getElementsByClassName("widget_birthday_date")[0].children[0].innerHTML;
				var timezone = parseInt(widget.getElementsByClassName("widget_birthday_timezone")[0].children[1].innerHTML, 10);
				if (textDate != text.date){
					var date_target;
					if (text.date_format == "0"){
						date_target = new Date(Date.UTC(date.getUTCFullYear(), textDate.substring(0, 2) - 1, textDate.substring(3, 5), 0 - timezone, 0, 0, 0));
					} else {
						date_target = new Date(Date.UTC(date.getUTCFullYear(), textDate.substring(3, 5) - 1, textDate.substring(0, 2), 0 - timezone, 0, 0, 0));
					}
					if (date.getTime() >= date_target.getTime() + 86400000) {
						date_target.setUTCFullYear(date_target.getUTCFullYear() + 1)
					}
					var birthday_today = false;
					if (date.getTime() >= date_target.getTime() && date.getTime() < date_target.getTime() + 86400000) {
						birthday_today = true;
					}
					var day = Math.trunc((date_target.getTime() - date.getTime()) / 86400000);
					var hour = Math.trunc((date_target.getTime() - date.getTime()) /3600000) % 24;
					if (day < 100) { day = "0" + day }
					if (day < 10) { day = "0" + day }
					if (hour < 10) { hour = "0" + hour }
					if (!birthday_today) {
						widget.getElementsByClassName("widget_birthday_countdown_day")[0].innerHTML = day;
						widget.getElementsByClassName("widget_birthday_countdown_hour")[0].innerHTML = hour;
						widget.getElementsByClassName("widget_birthday_countdown_minute")[0].innerHTML = countdown.min;
						widget.getElementsByClassName("widget_birthday_countdown_second")[0].innerHTML = countdown.sec;
						widget.getElementsByClassName("widget_birthday_countdown")[0].style.display = "block";
						widget.getElementsByClassName("widget_birthday_message")[0].style.display = "none";
					}
					else {
						widget.getElementsByClassName("widget_birthday_countdown")[0].style.display = "none";
						widget.getElementsByClassName("widget_birthday_message")[0].style.display = "block";
					}
				} else {
					widget.getElementsByClassName("widget_birthday_countdown_day")[0].innerHTML = "000";
					widget.getElementsByClassName("widget_birthday_countdown_hour")[0].innerHTML = "00";
					widget.getElementsByClassName("widget_birthday_countdown_minute")[0].innerHTML = "00";
					widget.getElementsByClassName("widget_birthday_countdown_second")[0].innerHTML = "00";
					widget.getElementsByClassName("widget_birthday_countdown")[0].style.display = "block";
					widget.getElementsByClassName("widget_birthday_message")[0].style.display = "none";
				}
			}
		}
	}
}

setInterval("countdown.refresh()", 1000);

//Color's Hue and Value to RGB code
function toRGB(nh, nv) {
	var s = 1;
	nh = parseInt(nh);
	nv = parseFloat(nv);
	var h, v;
	switch (nh) {
		case 0: h = 0/24; v = nv; break;
		case 1: h = 1/24, v = nv * 0.975; break;
		case 2: h = 2/24, v = nv * 0.95; break;
		case 3: h = 3/24, v = nv * 0.925; break;
		case 4: h = 4/24, v = nv * 0.9; break;
		case 5: h = 5/24, v = nv * 0.925; break;
		case 6: h = 6/24, v = nv * 0.95; break;
		case 7: h = 7/24, v = nv * 0.975; break;
		case 8: h = 8/24; v = nv; break;
		case 9: h = 9/24, v = nv * 0.975; break;
		case 10: h = 10/24, v = nv * 0.95; break;
		case 11: h = 11/24, v = nv * 0.925; break;
		case 12: h = 12/24, v = nv * 0.9; break;
		case 13: h = 13/24, v = nv * 0.925; break;
		case 14: h = 14/24, v = nv * 0.95; break;
		case 15: h = 15/24, v = nv * 0.975; break;
		case 16: h = 16/24; v = nv; break;
		case 17: h = 17/24, v = nv * 0.975; break;
		case 18: h = 18/24, v = nv * 0.95; break;
		case 19: h = 19/24, v = nv * 0.925; break;
		case 20: h = 20/24, v = nv * 0.9; break;
		case 21: h = 21/24, v = nv * 0.925; break;
		case 22: h = 22/24, v = nv * 0.95; break;
		case 23: h = 23/24, v = nv * 0.975; break;
	}

	var r, g, b;
  
	var i = Math.floor(h * 6);
	var f = h * 6 - i;
	var p = v * (1 - s);
	var q = v * (1 - f * s);
	var t = v * (1 - (1 - f) * s);
  
	switch (i % 6) {
		case 0: r = v, g = t, b = p; break;
		case 1: r = q, g = v, b = p; break;
		case 2: r = p, g = v, b = t; break;
		case 3: r = p, g = q, b = v; break;
	 	case 4: r = t, g = p, b = v; break;
		case 5: r = v, g = p, b = q; break;
	}
  

	return "rgb(" + r * 255 + ", " + g * 255 + ", " + b * 255 + ")";
}

interface.page_community_upcoming.style.display = "inline-block";
interface.page_community_browse.style.display = "none";
interface.page_profile_submit.style.display = "none";
interface.page_profile_remove.style.display = "none";
interface.page.style.display = "block";
page = "community_upcoming";

//Navigate between sections
function switch_page(new_page){
	var step_out = 1.0;
	var animation_fade_out_page = setInterval(frame, 10);
	function frame() {
		if (step_out <= 0) {
			interface["page_" + page].style.opacity = "0";
			interface["page_" + page].style.display = "none";
			interface["page_" + new_page].style.opacity = "0";
			interface["page_" + new_page].style.display = "inline-block";
			clearInterval(animation_fade_out_page);
			interface.header_pageTitle.innerHTML = text.title[new_page];
			switch (new_page) {
				case "community_browse": interface.page_community_browse_form_link.focus(); break;
				case "community_edit": interface.page_community_edit_form_chat.children[0].focus(); break;
				case "community_admin": interface.page_community_admin_form_admin.focus(); break;
				case "profile_submit": interface.page_profile_submit_form_name.focus(); break;
				case "profile_remove": interface.page_profile_remove_form_link.focus(); break;
			}
			countdown.apply();
			var step_in = 0.0;
			var animation_fade_in_page = setInterval(frame, 10);
			function frame() {
				if (step_in >= 1) {
					interface["page_" + new_page].style.opacity = "1";
					clearInterval(animation_fade_in_page);
					page = new_page;
				} else {
					step_in += 0.05;
					interface["page_" + new_page].style.opacity = step_in.toString();
				}
			}
		} else {
			step_out -= 0.05;
			interface["page_" + page].style.opacity = step_out.toString();
		}
	}
}

//Initialize every button's interaction when hovered and clicked
interface.header_menu.style.cursor = "pointer";
interface.header_menu.addEventListener("click", animate_menu, false);
interface.header_menu.addEventListener("mouseover", function(event) {
	document.getElementById("header_menu_icon_line-1").style.stroke = "#3ef4ab";
	document.getElementById("header_menu_icon_line-2").style.stroke = "#3ef4ab";
	document.getElementById("header_menu_icon_line-3").style.stroke = "#3ef4ab";
}, false);
interface.header_menu.addEventListener("mouseout", function(event) {
	document.getElementById("header_menu_icon_line-1").style.stroke = "#ffffff";
	document.getElementById("header_menu_icon_line-2").style.stroke = "#ffffff";
	document.getElementById("header_menu_icon_line-3").style.stroke = "#ffffff";
}, false);
interface.header_menu.addEventListener("touchstart", function(event) {
	document.getElementById("header_menu_icon_line-1").style.stroke = "#3ef4ab";
	document.getElementById("header_menu_icon_line-2").style.stroke = "#3ef4ab";
	document.getElementById("header_menu_icon_line-3").style.stroke = "#3ef4ab";
}, false);
interface.header_menu.addEventListener("touchend", function(event) {
	event.preventDefault();
	document.getElementById("header_menu_icon_line-1").style.stroke = "#ffffff";
	document.getElementById("header_menu_icon_line-2").style.stroke = "#ffffff";
	document.getElementById("header_menu_icon_line-3").style.stroke = "#ffffff";
	animate_menu();
}, false);

interface.menu_title.style.cursor = "pointer";
interface.menu_title.addEventListener("mouseover", function(event) {
	interface.menu_title.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_title.addEventListener("mouseout", function(event) {
	interface.menu_title.children[0].style.color = "#ffffff";
}, false);
interface.menu_title.addEventListener("touchstart", function(event) {
	interface.menu_title.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_title.addEventListener("touchend", function(event) {
	interface.menu_title.children[0].click();
	interface.menu_title.children[0].style.color = "#ffffff";
}, false);

interface.menu_community_upcoming.style.cursor = "pointer";
interface.menu_community_upcoming.addEventListener("click", function(){
	switch_page("community_upcoming");
	animate_menu();
}, false);
interface.menu_community_upcoming.addEventListener("mouseover", function(event) {
	interface.menu_community_upcoming.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_community_upcoming.addEventListener("mouseout", function(event) {
	interface.menu_community_upcoming.children[0].style.color = "#ffffff";
}, false);
interface.menu_community_upcoming.addEventListener("touchstart", function(event) {
	interface.menu_community_upcoming.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_community_upcoming.addEventListener("touchend", function(event) {
	event.preventDefault();
	interface.menu_community_upcoming.children[0].style.color = "#ffffff";
	switch_page("community_upcoming");
	animate_menu();
}, false);

interface.menu_community_browse.style.cursor = "pointer";
interface.menu_community_browse.addEventListener("click", function(){
	switch_page("community_browse");
	animate_menu();
}, false);
interface.menu_community_browse.addEventListener("mouseover", function(event) {
	interface.menu_community_browse.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_community_browse.addEventListener("mouseout", function(event) {
	interface.menu_community_browse.children[0].style.color = "#ffffff";
}, false);
interface.menu_community_browse.addEventListener("touchstart", function(event) {
	interface.menu_community_browse.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_community_browse.addEventListener("touchend", function(event) {
	event.preventDefault();
	interface.menu_community_browse.children[0].style.color = "#ffffff";
	switch_page("community_browse");
	animate_menu();
}, false);

interface.menu_community_edit.style.cursor = "pointer";
interface.menu_community_edit.addEventListener("click", function(){
	switch_page("community_edit");
	animate_menu();
}, false);
interface.menu_community_edit.addEventListener("mouseover", function(event) {
	interface.menu_community_edit.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_community_edit.addEventListener("mouseout", function(event) {
	interface.menu_community_edit.children[0].style.color = "#ffffff";
}, false);
interface.menu_community_edit.addEventListener("touchstart", function(event) {
	interface.menu_community_edit.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_community_edit.addEventListener("touchend", function(event) {
	event.preventDefault();
	interface.menu_community_edit.children[0].style.color = "#ffffff";
	switch_page("community_edit");
	animate_menu();
}, false);

interface.menu_community_remove.style.cursor = "pointer";
interface.menu_community_remove.addEventListener("click", function(){
	switch_page("community_remove");
	animate_menu();
}, false);
interface.menu_community_remove.addEventListener("mouseover", function(event) {
	interface.menu_community_remove.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_community_remove.addEventListener("mouseout", function(event) {
	interface.menu_community_remove.children[0].style.color = "#ffffff";
}, false);
interface.menu_community_remove.addEventListener("touchstart", function(event) {
	interface.menu_community_remove.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_community_remove.addEventListener("touchend", function(event) {
	event.preventDefault();
	interface.menu_community_remove.children[0].style.color = "#ffffff";
	switch_page("community_remove");
	animate_menu();
}, false);

interface.menu_profile_submit.style.cursor = "pointer";
interface.menu_profile_submit.addEventListener("click", function(){
	switch_page("profile_submit");
	animate_menu();
}, false);
interface.menu_profile_submit.addEventListener("mouseover", function(event) {
	interface.menu_profile_submit.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_profile_submit.addEventListener("mouseout", function(event) {
	interface.menu_profile_submit.children[0].style.color = "#ffffff";
}, false);
interface.menu_profile_submit.addEventListener("touchstart", function(event) {
	interface.menu_profile_submit.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_profile_submit.addEventListener("touchend", function(event) {
	event.preventDefault();
	interface.menu_profile_submit.children[0].style.color = "#ffffff";
	switch_page("profile_submit");
	animate_menu();
}, false);

interface.menu_profile_remove.style.cursor = "pointer";
interface.menu_profile_remove.addEventListener("click", function(){
	switch_page("profile_remove");
	animate_menu();
}, false);
interface.menu_profile_remove.addEventListener("mouseover", function(event) {
	interface.menu_profile_remove.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_profile_remove.addEventListener("mouseout", function(event) {
	interface.menu_profile_remove.children[0].style.color = "#ffffff";
}, false);
interface.menu_profile_remove.addEventListener("touchstart", function(event) {
	interface.menu_profile_remove.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_profile_remove.addEventListener("touchend", function(event) {
	event.preventDefault();
	interface.menu_profile_remove.children[0].style.color = "#ffffff";
	switch_page("profile_remove");
	animate_menu();
}, false);

interface.menu_community_admin.style.cursor = "pointer";
interface.menu_community_admin.addEventListener("click", function(){
	switch_page("community_admin");
	animate_menu();
}, false);
interface.menu_community_admin.addEventListener("mouseover", function(event) {
	interface.menu_community_admin.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_community_admin.addEventListener("mouseout", function(event) {
	interface.menu_community_admin.children[0].style.color = "#ffffff";
}, false);
interface.menu_community_admin.addEventListener("touchstart", function(event) {
	interface.menu_community_admin.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_community_admin.addEventListener("touchend", function(event) {
	event.preventDefault();
	interface.menu_community_admin.children[0].style.color = "#ffffff";
	switch_page("community_admin");
	animate_menu();
}, false);

var menu_touchstartX = 0;
var menu_touchstartY = 0;

interface.menu.addEventListener("touchstart", function(event) {
	event.preventDefault();
	menu_touchstartX = event.changedTouches[0].screenX;
	menu_touchstartY = event.changedTouches[0].screenY;
}, false);

interface.menu.addEventListener("touchend", function(event) {
	event.preventDefault();
	if ((menu_touchstartX - event.changedTouches[0].screenX) >= 50 && Math.abs(menu_touchstartY - event.changedTouches[0].screenY) <= 30) {
		animate_menu();
	}
}, false);

//initialize sliding effect of the left menu drawer
interface.menu.style.left = "-100vmin"
function animate_menu() {
	document.activeElement.blur();
	if (interface.menu.style.left == "0vmin") {
		var speed = 0;
		var pos = 0; 
		var id = setInterval(frame, 10);
		function frame() {
			if (pos <= -100) {
				interface.menu.style.left = "-100vmin";
				clearInterval(id);
			} else {
				pos = ((-1 * Math.pow(3 , speed))+1);
				interface.menu.style.left = pos + "vmin";
				speed += 0.1;
			}
		}
	} else if (interface.menu.style.left == "-100vmin") {
		var speed = 4.2;
		var pos = -100;
		var id = setInterval(frame, 10);
		function frame() {
			if (pos >= 0) {
				interface.menu.style.left = "0vmin";
				clearInterval(id);
			} else {
				pos = ((-1 * Math.pow(3 , speed))+1);
				interface.menu.style.left = pos + "vmin";
				speed -= 0.1;
			}
		}
	}
}

//Initialize every input's interaction when focused and edited
var correct_key_info = false;
correct_key_info_refresh();

function correct_key_info_refresh(){
	if (interface.pageLogin_form_key.value.length == 10) {
		correct_key_info = true;
		interface.pageLogin_upload.style.backgroundColor = "#088a56";
		interface.pageLogin_upload.style.borderColor = "#088a56";
	} else {
		correct_key_info = false;
		interface.pageLogin_upload.style.backgroundColor = "#8a8a8a";
		interface.pageLogin_upload.style.borderColor = "#8a8a8a";
		interface.pageLogin_upload.children[0].style.color = "#ffffff";
	}
}

interface.pageLogin_form_key.addEventListener("input", function(event) {
	event.target.value = event.target.value.replace(/[^A-Za-z0-9:/.]/g, "");
	if (event.target.value.length > 10) {
		event.target.value = event.target.value.substring(0, 10);
	}
	correct_key_info_refresh();
}, false);

interface.pageLogin_form_key.addEventListener('keyup', (e) => {
	if (e.key == "Enter"){
		if (correct_key_info) {
			key_upload();
		}
	}
});

interface.pageLogin_upload.style.cursor = "pointer";
interface.pageLogin_upload.addEventListener("click", function() {
	if (correct_key_info) {
		key_upload();
	}
}, false);
interface.pageLogin_upload.addEventListener("mouseover", function(event) {
	if (correct_key_info) {
		interface.pageLogin_upload.children[0].style.color = "#3ef4ab";
	}
}, false);
interface.pageLogin_upload.addEventListener("mouseout", function(event) {
	interface.pageLogin_upload.children[0].style.color = "#ffffff";
}, false);
interface.pageLogin_upload.addEventListener("touchstart", function(event) {
	if (correct_key_info) {
		interface.pageLogin_upload.children[0].style.color = "#3ef4ab";
	}
}, false);
interface.pageLogin_upload.addEventListener("touchend", function(event) {
	event.preventDefault();
	if (correct_key_info) {
		interface.pageLogin_upload.children[0].style.color = "#ffffff";
		key_upload();
	}
}, false);

function key_upload(){
	document.activeElement.blur();
	var key = interface.pageLogin_form_key.value;
	loading(true);
	firebase_function("admin_check", {"admin": key}, function (response) {
		interface.page_profile_submit_upload.style.background = "#088a56";
		if (response.code == "000") {
			admin_key = key;
			loading(false);
			notify(text.notify.admin_login[response.code], true);
			if (!response.master) {
				interface.menu_community_remove.style.display = "none";
				interface.menu_community_admin.style.display = "none";
			} else {
				var admin_list = "";
				for (admin in response.admin_list) {
					admin_list = admin_list + "\n" + response.admin_list[admin].key + " : " + response.admin_list[admin].name;
				}
				interface.page_community_admin_form_admin.value = admin_list.substring(1, admin_list.length);
			}
			var step = 1.0;
			var animation_fade_loading = setInterval(frame, 10);
			function frame() {
				if (step <= 0) {
					interface.pageLogin.style.opacity = "0";
					clearInterval(animation_fade_loading);
					interface.pageLogin.style.display = "none";
				} else {
					step -= 0.05;
					interface.pageLogin.style.opacity = "" + step;
				}
			}
		} else if (response.code == "101" || response.code == "102" || response.code == "300") {
			loading(false);
			notify(text.notify.common_error[response.code], false);
		} else {
			loading(false);
			notify(text.notify.admin_login[response.code], false);
		}
	});
}

var correct_community_edit_info = false;

function correct_community_edit_info_refresh(){
	if (interface.page_community_edit_form_chat.children[1].value.match(/^https?:\/\/aminoapps.com\/p\/([a-z0-9]{6,9})$/) && interface.page_community_edit_form_rep.children[1].value.match(/^[0-9]+$/) && interface.page_community_edit_form_messages_notify.value.match(/^([0-9]+ ?: ?.+\n?)*$/) && (interface.page_community_edit_form_messages_submit.value != "") && (interface.page_community_edit_form_messages_edit.value != "") && (interface.page_community_edit_form_messages_remove.value != "")) {
		correct_community_edit_info = true;
		interface.page_community_edit_upload.style.backgroundColor = "#088a56";
		interface.page_community_edit_upload.style.borderColor = "#088a56";
	} else {
		correct_community_edit_info = false;
		interface.page_community_edit_upload.style.backgroundColor = "#8a8a8a";
		interface.page_community_edit_upload.style.borderColor = "#8a8a8a";
		interface.page_community_edit_upload.children[0].style.color = "#ffffff";
	}
}

interface.page_community_edit_form_chat.children[1].addEventListener("input", function(event) {
	event.target.value = event.target.value.toLowerCase();
	event.target.value = event.target.value.replace(/[^a-z0-9:/.]/g, "");
	if (!event.target.value.match(/^https?:\/\/aminoapps.com\/p\/([a-z0-9]*)$/)){
		if(event.target.value.substring(0,7) != "http://" && event.target.value.substring(0,8) != "https://"){
			event.target.value = "http://aminoapps.com/p/" + event.target.value;
		} else {
			event.target.value = "";
		}
	}
	correct_community_edit_info_refresh();
}, false);

interface.page_community_edit_form_rep.children[1].addEventListener("input", function(event) {
	event.target.value = event.target.value.replace(/[^0-9]/g, "");
	if (event.target.value.length > 10) {
		event.target.value = event.target.value.substring(0, 10);
	}
	correct_community_edit_info_refresh();
}, false);

interface.page_community_edit_form_messages_notify.addEventListener("input", function(event) {
	correct_community_edit_info_refresh();
}, false);

interface.page_community_edit_form_messages_submit.addEventListener("input", function(event) {
	event.target.value = event.target.value.replaceAll("\n", "${nl}");
	correct_community_edit_info_refresh();
}, false);

interface.page_community_edit_form_messages_edit.addEventListener("input", function(event) {
	event.target.value = event.target.value.replaceAll("\n", "${nl}");
	correct_community_edit_info_refresh();
}, false);

interface.page_community_edit_form_messages_remove.addEventListener("input", function(event) {
	event.target.value = event.target.value.replaceAll("\n", "${nl}");
	correct_community_edit_info_refresh();
}, false);

interface.page_community_edit_upload.style.cursor = "pointer";
interface.page_community_edit_upload.addEventListener("click", function() {
	if (correct_community_edit_info) {
		community_edit_upload();
	}
}, false);
interface.page_community_edit_upload.addEventListener("mouseover", function(event) {
	if (correct_community_edit_info) {
		interface.page_community_edit_upload.children[0].style.color = "#3ef4ab";
	}
}, false);
interface.page_community_edit_upload.addEventListener("mouseout", function(event) {
	interface.page_community_edit_upload.children[0].style.color = "#ffffff";
}, false);
interface.page_community_edit_upload.addEventListener("touchstart", function(event) {
	if (correct_community_edit_info) {
		interface.page_community_edit_upload.children[0].style.color = "#3ef4ab";
	}
}, false);
interface.page_community_edit_upload.addEventListener("touchend", function(event) {
	event.preventDefault();
	if (correct_community_edit_info) {
		interface.page_community_edit_upload.children[0].style.color = "#ffffff";
		community_edit_upload();
	}
}, false);

function community_edit_upload(){
	document.activeElement.blur();
	var chat_id = interface.page_community_edit_form_chat.children[1].value.trim().match(/^https?:\/\/aminoapps.com\/p\/([a-z0-9]+)$/)[1];;
	var rep_min = interface.page_community_edit_form_rep.children[1].value;
	var notify_messages = interface.page_community_edit_form_messages_notify.value;
	var submit_message = interface.page_community_edit_form_messages_submit.value;
	var edit_message = interface.page_community_edit_form_messages_edit.value;
	var remove_message = interface.page_community_edit_form_messages_remove.value;
	loading(true);
	firebase_function("community_edit", {"admin": admin_key, "rep_min": rep_min, "chat" : chat_id, "notify_messages": notify_messages, "submit_message" : submit_message, "edit_message" : edit_message, "remove_message" : remove_message}, function (response) {
		interface.page_profile_submit_upload.style.background = "#088a56";
		if (response.code == "000") {
			loading(false);
			notify(text.notify.community_edit[response.code], true);
		} else if (response.code == "101" || response.code == "102" || response.code == "300") {
			loading(false);
			notify(text.notify.common_error[response.code], false);
		} else {
			loading(false);
			notify(text.notify.community_edit[response.code], false);
		}
	});
}

var correct_community_remove_info = false;
correct_community_remove_info_refresh();

function correct_community_remove_info_refresh(){
	if (interface.page_community_remove_form_key.value.length == 10) {
		correct_community_remove_info = true;
		interface.page_community_remove_upload.style.backgroundColor = "#088a56";
		interface.page_community_remove_upload.style.borderColor = "#088a56";
	} else {
		correct_community_remove_info = false;
		interface.page_community_remove_upload.style.backgroundColor = "#8a8a8a";
		interface.page_community_remove_upload.style.borderColor = "#8a8a8a";
		interface.page_community_remove_upload.children[0].style.color = "#ffffff";
	}
}

interface.page_community_remove_form_key.addEventListener("input", function(event) {
	event.target.value = event.target.value.replace(/[^A-Za-z0-9:/.]/g, "");
	if (event.target.value.length > 10) {
		event.target.value = event.target.value.substring(0, 10);
	}
	correct_community_remove_info_refresh();
}, false);

interface.page_community_remove_upload.style.cursor = "pointer";
interface.page_community_remove_upload.addEventListener("click", function() {
	if (correct_community_remove_info){
		community_remove_upload();
	}
}, false);
interface.page_community_remove_upload.addEventListener("mouseover", function(event) {
	if (correct_key_info.global) {
		interface.page_community_remove_upload.children[0].style.color = "#3ef4ab";
	}
}, false);
interface.page_community_remove_upload.addEventListener("mouseout", function(event) {
	interface.page_community_remove_upload.children[0].style.color = "#ffffff";
}, false);
interface.page_community_remove_upload.addEventListener("touchstart", function(event) {
	if (correct_key_info.global) {
		interface.page_community_remove_upload.children[0].style.color = "#3ef4ab";
	}
}, false);
interface.page_community_remove_upload.addEventListener("touchend", function(event) {
	event.preventDefault();
	if (correct_community_remove_info){
		interface.page_community_remove_upload.children[0].style.color = "#ffffff";
		community_remove_upload();
	}
}, false);

function community_remove_upload(){
	document.activeElement.blur();
	var key = interface.page_community_remove_form_key.value;
	loading(true);
	firebase_function("community_remove", {"admin":key}, function (response) {
		interface.page_profile_submit_upload.style.background = "#088a56";
		if (response.code == "000") {
			loading(false);
			notify(text.notify.community_remove[response.code], true);
			setTimeout(function(){
				document.location.href="/";
			}, 5000);
		} else if (response.code == "101" || response.code == "102" || response.code == "300") {
			loading(false);
			notify(text.notify.common_error[response.code], false);
		} else {
			loading(false);
			notify(text.notify.community_remove[response.code], false);
		}
	});
}

var correct_community_admin_info = false;
correct_community_admin_info_refresh();

function correct_community_admin_info_refresh(){
	if (interface.page_community_admin_form_admin.value.match(/^([a-zA-Z0-9]{10} ?: ?[a-zA-Z]+\n?)*$/)) {
		correct_community_admin_info = true;
		interface.page_community_admin_upload.style.backgroundColor = "#088a56";
		interface.page_community_admin_upload.style.borderColor = "#088a56";
	} else {
		correct_community_admin_info = false;
		interface.page_community_admin_upload.style.backgroundColor = "#8a8a8a";
		interface.page_community_admin_upload.style.borderColor = "#8a8a8a";
		interface.page_community_admin_upload.children[0].style.color = "#ffffff";
	}
}

interface.page_community_admin_form_admin.addEventListener("input", function(event) {
	event.target.value = event.target.value.replace(/[^A-Za-z0-9À-ÿ '-:$\n]/g, "");
	while (event.target.value.includes("$")){
		var key_char = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
		var key = "";
		for (u = 0; u < 10; u ++){
			key = key + key_char[Math.floor(Math.random() * 62)];
		}
		event.target.value = event.target.value.replace("$", key);
	}
	correct_community_admin_info_refresh();
}, false);

interface.page_community_admin_upload.style.cursor = "pointer";
interface.page_community_admin_upload.addEventListener("click", function() {
	if (correct_community_admin_info) {
		community_admin_upload();
	}
}, false);
interface.page_community_admin_upload.addEventListener("mouseover", function(event) {
	if (correct_community_admin_info) {
		interface.page_community_admin_upload.children[0].style.color = "#3ef4ab";
	}
}, false);
interface.page_community_admin_upload.addEventListener("mouseout", function(event) {
	interface.page_community_admin_upload.children[0].style.color = "#ffffff";
}, false);
interface.page_community_admin_upload.addEventListener("touchstart", function(event) {
	if (correct_community_admin_info) {
		interface.page_community_admin_upload.children[0].style.color = "#3ef4ab";
	}
}, false);
interface.page_community_admin_upload.addEventListener("touchend", function(event) {
	event.preventDefault();
	if (correct_community_admin_info) {
		interface.page_community_admin_upload.children[0].style.color = "#ffffff";
		community_admin_upload();
	}
}, false);

function community_admin_upload(){
	document.activeElement.blur();
	if (interface.page_community_admin_form_admin.value.charAt(interface.page_community_admin_form_admin.value.length - 1) == "\n") {
		interface.page_community_admin_form_admin.value = interface.page_community_admin_form_admin.value.substring(0, interface.page_community_admin_form_admin.value.length - 1);
	}
	var admin_list = interface.page_community_admin_form_admin.value;
	loading(true);
	firebase_function("admin_edit", {"admin": admin_key, "admin_list": admin_list}, function (response) {
		interface.page_community_admin_upload.style.background = "#088a56";
		if (response.code == "000") {
			loading(false);
			notify(text.notify.community_admin[response.code], true);
		} else if (response.code == "101" || response.code == "102" || response.code == "300") {
			loading(false);
			notify(text.notify.common_error[response.code], false);
		} else {
			loading(false);
			notify(text.notify.community_admin[response.code], false);
		}
	});
}

var profile_found = false;

interface.page_community_browse_form_link.addEventListener("input", function(event) {
	event.target.value = event.target.value.toLowerCase();
	event.target.value = event.target.value.replace(/[^a-z0-9:/.]/g, "");
	if (!event.target.value.match(/^https?:\/\/aminoapps.com\/p\/([a-z0-9]*)$/)){
		if(event.target.value.substring(0,7) != "http://" && event.target.value.substring(0,8) != "https://"){
			event.target.value = "http://aminoapps.com/p/" + event.target.value;
		} else {
			event.target.value = "";
		}
	}
	if (event.target.value.match(/^https?:\/\/aminoapps.com\/p\/([a-z0-9]{6,9})$/)){
		var profile = community.birthdays.find(obj => {
			return obj.id === interface.page_community_browse_form_link.value.trim().match(/^https?:\/\/aminoapps.com\/p\/([a-z0-9]+)$/)[1];
		})
		if (profile != undefined) {
			interface.page_community_browse_message.style.display = "none";
			profile_found = profile;
			var widget = interface.page_community_browse_preview;
			widget.getElementsByClassName("widget_birthday_name")[0].children[0].innerHTML = profile.name;
			widget.getElementsByClassName("widget_birthday_date")[0].children[0].innerHTML = profile.birthday;
			widget.getElementsByClassName("widget_birthday_timezone")[0].children[1].innerHTML = profile.timezone;
			widget.getElementsByClassName("widget_birthday_name")[0].children[0].style.color = toRGB(profile.color, 1);
			widget.getElementsByClassName("widget_birthday_countdown_day")[0].style.borderColor = toRGB(profile.color, 1);
			widget.getElementsByClassName("widget_birthday_countdown_second")[0].style.color = toRGB(profile.color, 1);
			widget.getElementsByClassName("widget_birthday_cadre")[0].style.borderColor = toRGB(profile.color, 1);
			widget.getElementsByClassName("widget_birthday_cadre")[0].style.backgroundColor = toRGB(profile.color, 0.4);
			widget.getElementsByClassName("widget_birthday_date")[0].children[0].style.color = toRGB(profile.color, 1);
			widget.getElementsByClassName("widget_birthday_timezone")[0].children[0].style.color = toRGB(profile.color, 1);
			widget.getElementsByClassName("widget_birthday_timezone")[0].children[1].style.color = toRGB(profile.color, 1);
			widget.getElementsByClassName("widget_birthday_link")[0].href = "http://aminoapps.com/p/" + profile.id;
			countdown.apply();
			widget.style.display = "block";
		} else {
			interface.page_community_browse_message.style.display = "block";
			profile_found = false;
			interface.page_community_browse_preview.style.display = "none";
			firebase_function("browse", {"id": interface.page_community_browse_form_link.value.trim().match(/^https?:\/\/aminoapps.com\/p\/([a-z0-9]+)$/)[1]}, function (response) {
				if (response.code == "000" && response.birthday != false) {
					interface.page_community_browse_message.style.display = "none";
					var profile_data = response.birthday
					profile = {}
					profile.id = profile_data.substring(profile_data.indexOf("/") + 1, profile_data.length);
					profile.name = profile_data.substring(40, profile_data.indexOf("/"));
					var month = encode_numbers.indexOf(profile_data.substring(0, 1));
					var day = encode_numbers.indexOf(profile_data.substring(1, 2));
					var timezone = encode_numbers.indexOf(profile_data.substring(2, 3));
					timezone = 12 - timezone;
					if (timezone >= 0) {
						if (timezone < 10) {
							timezone = "+0" + Math.abs(timezone);
						} else {
							timezone = "+" + Math.abs(timezone);
						}
					} else {
						if (timezone > -10) {
							timezone = "-0" + Math.abs(timezone);
						} else {
							timezone = "-" + Math.abs(timezone);
						}
					}
					profile.timezone = timezone;
					if (day < 10) { day = "0" + day }
					if (month < 10) { month = "0" + month }
					if (text.date_format == "0") {
						profile.birthday =  month + "/" + day;
					} else {
						profile.birthday =  day + "/" + month;
					}
					profile.color = encode_numbers.indexOf(profile_data.substring(3, 4));
					profile_found = profile;
					var widget = interface.page_community_browse_preview;
					widget.getElementsByClassName("widget_birthday_name")[0].children[0].innerHTML = profile.name;
					widget.getElementsByClassName("widget_birthday_date")[0].children[0].innerHTML = profile.birthday;
					widget.getElementsByClassName("widget_birthday_timezone")[0].children[1].innerHTML = profile.timezone;
					widget.getElementsByClassName("widget_birthday_name")[0].children[0].style.color = toRGB(profile.color, 1);
					widget.getElementsByClassName("widget_birthday_countdown_day")[0].style.borderColor = toRGB(profile.color, 1);
					widget.getElementsByClassName("widget_birthday_countdown_second")[0].style.color = toRGB(profile.color, 1);
					widget.getElementsByClassName("widget_birthday_cadre")[0].style.borderColor = toRGB(profile.color, 1);
					widget.getElementsByClassName("widget_birthday_cadre")[0].style.backgroundColor = toRGB(profile.color, 0.4);
					widget.getElementsByClassName("widget_birthday_date")[0].children[0].style.color = toRGB(profile.color, 1);
					widget.getElementsByClassName("widget_birthday_timezone")[0].children[0].style.color = toRGB(profile.color, 1);
					widget.getElementsByClassName("widget_birthday_timezone")[0].children[1].style.color = toRGB(profile.color, 1);
					widget.getElementsByClassName("widget_birthday_link")[0].href = "http://aminoapps.com/p/" + profile.id;
					countdown.apply();
					widget.style.display = "block";
				}
			});
		}
	} else {
		interface.page_community_browse_message.style.display = "none";
		profile_found = false;
		interface.page_community_browse_preview.style.display = "none";
	}
}, false);

var correct_profile_submit_info = {
	"name" : false,
	"link" : false,
	"date" : false,
	"global" : false
};
correct_profile_submit_info_refresh()

function correct_profile_submit_info_refresh(){
	if (correct_profile_submit_info.name && correct_profile_submit_info.link && correct_profile_submit_info.date) {
		correct_profile_submit_info.global = true;
		interface.page_profile_submit_upload.style.backgroundColor = "#088a56";
		interface.page_profile_submit_upload.style.borderColor = "#088a56";
	} else {
		correct_profile_submit_info.global = false;
		interface.page_profile_submit_upload.style.backgroundColor = "#8a8a8a";
		interface.page_profile_submit_upload.style.borderColor = "#8a8a8a";
		interface.page_profile_submit_upload.children[0].style.color = "#ffffff";
	}
	countdown.apply();
}

interface.page_profile_submit_form_name.addEventListener("input", function(event) {
	event.target.value = event.target.value.replace(/[^A-Za-z0-9À-ÿ '-]/g, "");
	if (event.target.value.length > 20){
		event.target.value = event.target.value.substring(0, 20);
	}
	if (event.target.value != ""){
		interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_name")[0].children[0].innerHTML = event.target.value;
		correct_profile_submit_info.name = true;
	} else {
		interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_name")[0].children[0].innerHTML = text.name;
		correct_profile_submit_info.name = false;
	}
	correct_profile_submit_info_refresh()
}, false);

interface.page_profile_submit_form_name.addEventListener('keyup', (e) => {
	if (e.key == "Enter"){
		interface.page_profile_submit_form_link.focus();
	}
});

interface.page_profile_submit_form_link.addEventListener("input", function(event) {
	event.target.value = event.target.value.toLowerCase();
	event.target.value = event.target.value.replace(/[^a-z0-9:/.]/g, "");
	if (!event.target.value.match(/^https?:\/\/aminoapps.com\/p\/([a-z0-9]*)$/)){
		if(event.target.value.substring(0,7) != "http://" && event.target.value.substring(0,8) != "https://"){
			event.target.value = "http://aminoapps.com/p/" + event.target.value;
		} else {
			event.target.value = "";
		}
	}
	if (event.target.value.match(/^https?:\/\/aminoapps.com\/p\/([a-z0-9]+)$/)){
		correct_profile_submit_info.link = true;
	} else {
		correct_profile_submit_info.link = false;
	}
	correct_profile_submit_info_refresh()
}, false);

interface.page_profile_submit_form_link.addEventListener('keyup', (e) => {
	if (e.key == "Enter"){
		interface.page_profile_submit_form_birthday_month.focus();
	}
});

interface.page_profile_submit_form_birthday_month.addEventListener("input", function() {
	if (interface.page_profile_submit_form_birthday_day.value != "" && interface.page_profile_submit_form_birthday_month.value != "") {
		var date = new Date();
		if (text.date_format == "0"){
			date.setDate(interface.page_profile_submit_form_birthday_day.value);
		date.setMonth(interface.page_profile_submit_form_birthday_month.value - 1);
		} else {
			date.setDate(interface.page_profile_submit_form_birthday_month.value);
			date.setMonth(interface.page_profile_submit_form_birthday_day.value - 1);
		}
		var timezone = date.getHours() - date.getUTCHours();
		if (timezone >= 0) {
			timezone = "+" + timezone;
		} else {
			timezone = "-" + Math.abs(timezone);
		}
		interface.page_profile_submit_form_birthday_timezone.value = timezone;
	}
	update_date();
}, false);

interface.page_profile_submit_form_birthday_month.addEventListener('keyup', (e) => {
	if (e.key == "Enter"){
		interface.page_profile_submit_form_birthday_day.focus();
	}
});

interface.page_profile_submit_form_birthday_day.addEventListener("input", function() {
	if (interface.page_profile_submit_form_birthday_day.value != "" && interface.page_profile_submit_form_birthday_month.value != "") {
		var date = new Date();
		if (text.date_format == "0"){
			date.setDate(interface.page_profile_submit_form_birthday_day.value);
		date.setMonth(interface.page_profile_submit_form_birthday_month.value - 1);
		} else {
			date.setDate(interface.page_profile_submit_form_birthday_month.value);
			date.setMonth(interface.page_profile_submit_form_birthday_day.value - 1);
		}
		var timezone = date.getHours() - date.getUTCHours();
		if (timezone >= 0) {
			timezone = "+" + timezone;
		} else {
			timezone = "-" + Math.abs(timezone);
		}
		interface.page_profile_submit_form_birthday_timezone.value = timezone;
	}
	update_date();
}, false);

interface.page_profile_submit_form_birthday_day.addEventListener('keyup', (e) => {
	if (e.key == "Enter"){
		interface.page_profile_submit_form_birthday_timezone.focus();
	}
});

interface.page_profile_submit_form_birthday_timezone.addEventListener("input", update_date, false);

interface.page_profile_submit_form_birthday_timezone.addEventListener('keyup', (e) => {
	if (e.key == "Enter"){
		if (correct_profile_submit_info.global) {
			profile_submit_upload();
		}
	}
});

function update_date() {
	interface.page_profile_submit_form_birthday_day.value = interface.page_profile_submit_form_birthday_day.value.replace(/[^0-9]/g, "");
	interface.page_profile_submit_form_birthday_month.value = interface.page_profile_submit_form_birthday_month.value.replace(/[^0-9]/g, "");
	interface.page_profile_submit_form_birthday_timezone.value = interface.page_profile_submit_form_birthday_timezone.value.replace(/[^0-9+-]/g, "");
	if (text.date_format == "0"){
		var day = interface.page_profile_submit_form_birthday_day.value;
		var month = interface.page_profile_submit_form_birthday_month.value;
	} else {
		var day = interface.page_profile_submit_form_birthday_month.value;
		var month = interface.page_profile_submit_form_birthday_day.value;
	}
	var timezone = interface.page_profile_submit_form_birthday_timezone.value;
	if (day != "" && day != 0) {
		if (text.date_format == "0"){
			day = parseInt(interface.page_profile_submit_form_birthday_day.value, 10).toString();
		} else {
			day = parseInt(interface.page_profile_submit_form_birthday_month.value, 10).toString();
		}
		if (day > 31) {
			day = "31";
		}
	}

	if (month != "" && month != 0) {
		if (text.date_format == "0"){
			month = parseInt(interface.page_profile_submit_form_birthday_month.value, 10).toString();
		} else {
			month = parseInt(interface.page_profile_submit_form_birthday_day.value, 10).toString();
		}
		if (month > 12) {
			month = "12";
		}
	}
	
	if (timezone != "" && timezone != "-" && timezone != "+") {
		timezone = parseInt(interface.page_profile_submit_form_birthday_timezone.value, 10);
		if (timezone > 12) {
			timezone = 12;
		}
		if (timezone < -11) {
			timezone = -11;
		}
		if (timezone >= 0) {
			timezone = "+" + Math.abs(timezone);
		} else {
			timezone = "-" + Math.abs(timezone);
		}
		interface.page_profile_submit_form_birthday_timezone.value = timezone;
		if (timezone >= 0) {
			if (timezone < 10) {
				timezone = "+0" + Math.abs(timezone);
			} else {
				timezone = "+" + Math.abs(timezone);
			}
		} else {
			if (timezone > -10) {
				timezone = "-0" + Math.abs(timezone);
			} else {
				timezone = "-" + Math.abs(timezone);
			}
		}
	}

	if (day == 31 && (month == 4 || month == 6 || month == 9 || month == 11)) {
		day = "30"
		interface.page_profile_submit_form_birthday_day.value = day;
	}
	if (day > 29 && month == 2) {
		day = "29";
		interface.page_profile_submit_form_birthday_day.value = day;
	}
	if (text.date_format == "0"){
		interface.page_profile_submit_form_birthday_day.value = day;
	interface.page_profile_submit_form_birthday_month.value = month;
	} else {
		interface.page_profile_submit_form_birthday_day.value = month;
	interface.page_profile_submit_form_birthday_month.value = day;
	}
	
	if (day == "" || month == "" || timezone == "" || timezone == "-" || timezone == "+" || day == 0 || month == 0){
		interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_date")[0].children[0].innerHTML = text.date;
		interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_timezone")[0].children[1].innerHTML = "+00";
		correct_profile_submit_info.date = false;
	} else {
		if (day < 10) {
			day = "0" + day;
		}
		if (month < 10) {
			month = "0" + month;
		}
		interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_timezone")[0].children[1].innerHTML = timezone;
		if (text.date_format == "0"){
			interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_date")[0].children[0].innerHTML = month + "/" + day;
		} else {
			interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_date")[0].children[0].innerHTML = day + "/" + month;
		}
		correct_profile_submit_info.date = true;
	}
	correct_profile_submit_info_refresh()
}

interface.page_profile_submit_form_color.addEventListener("input", function(event) {
	interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_name")[0].children[0].style.color = toRGB(event.target.value, 1);
	interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_countdown_day")[0].style.borderColor = toRGB(event.target.value, 1);
	interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_countdown_second")[0].style.color = toRGB(event.target.value, 1);
	interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_cadre")[0].style.borderColor = toRGB(event.target.value, 1);
	interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_cadre")[0].style.backgroundColor = toRGB(event.target.value, 0.4);
	interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_date")[0].children[0].style.color = toRGB(event.target.value, 1);
	interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_timezone")[0].children[0].style.color = toRGB(event.target.value, 1);
	interface.page_profile_submit_preview.getElementsByClassName("widget_birthday_timezone")[0].children[1].style.color = toRGB(event.target.value, 1);
}, false);

interface.page_profile_submit_upload.style.cursor = "pointer";
interface.page_profile_submit_upload.addEventListener("click", function() {
	if (correct_profile_submit_info.global) {
		profile_submit_upload();
	}
}, false);
interface.page_profile_submit_upload.addEventListener("mouseover", function(event) {
	if (correct_profile_submit_info.global) {
		interface.page_profile_submit_upload.children[0].style.color = "#3ef4ab";
	}
}, false);
interface.page_profile_submit_upload.addEventListener("mouseout", function(event) {
	interface.page_profile_submit_upload.children[0].style.color = "#ffffff";
}, false);
interface.page_profile_submit_upload.addEventListener("touchstart", function(event) {
	if (correct_profile_submit_info.global) {
		interface.page_profile_submit_upload.children[0].style.color = "#3ef4ab";
	}
}, false);
interface.page_profile_submit_upload.addEventListener("touchend", function(event) {
	event.preventDefault();
	if (correct_profile_submit_info.global) {
		interface.page_profile_submit_upload.children[0].style.color = "#ffffff";
		profile_submit_upload();
	}
}, false);

function profile_submit_upload(){
	document.activeElement.blur();
	var id = interface.page_profile_submit_form_link.value.trim().match(/^https?:\/\/aminoapps.com\/p\/([a-z0-9]+)$/)[1];
	var name = interface.page_profile_submit_form_name.value;
	if (text.date_format == "0"){
		var day = interface.page_profile_submit_form_birthday_day.value;
		var month = interface.page_profile_submit_form_birthday_month.value;
	} else {
		var day = interface.page_profile_submit_form_birthday_month.value;
		var month = interface.page_profile_submit_form_birthday_day.value;
	}
	var timezone = (12 - parseInt(interface.page_profile_submit_form_birthday_timezone.value, 10)).toString();
	var color = interface.page_profile_submit_form_color.value;
		
	loading(true);
	firebase_function("profile_submit", {"admin": admin_key, "id": id, "name": name, "month": month, "day": day, "timezone": timezone, "color": color }, function (response) {
		interface.page_profile_submit_upload.style.background = "#088a56";
		if (response.code == "000") {
			notify(text.notify.profile_submit[response.code], true);
			refresh_birthday_list(function(){
				loading(false);
				switch_page("community_upcoming");
			});
		} else if (response.code == "101" || response.code == "102" || response.code == "300") {
			loading(false);
			notify(text.notify.common_error[response.code], false);
		} else {
			loading(false);
			notify(text.notify.profile_submit[response.code], false);
		}
	});
}

var correct_profile_remove_info = {
	"link" : false,
	"global" : false
};

function correct_profile_remove_info_refresh(){
	if (correct_profile_remove_info.link) {
		correct_profile_remove_info.global = true;
		interface.page_profile_remove_upload.style.backgroundColor = "#088a56";
		interface.page_profile_remove_upload.style.borderColor = "#088a56";
	} else {
		correct_profile_remove_info.global = false;
		interface.page_profile_remove_upload.style.backgroundColor = "#8a8a8a";
		interface.page_profile_remove_upload.style.borderColor = "#8a8a8a";
		interface.page_profile_remove_upload.children[0].style.color = "#ffffff";
	}
}

interface.page_profile_remove_form_link.addEventListener("input", function(event) {
	event.target.value = event.target.value.toLowerCase();
	event.target.value = event.target.value.replace(/[^a-z0-9:/.]/g, "");
	if (!event.target.value.match(/^https?:\/\/aminoapps.com\/p\/([a-z0-9]*)$/)){
		if(event.target.value.substring(0,7) != "http://" && event.target.value.substring(0,8) != "https://"){
			event.target.value = "http://aminoapps.com/p/" + event.target.value;
		} else {
			event.target.value = "";
		}
	}
	correct_profile_remove_info.link = event.target.value.match(/^https?:\/\/aminoapps.com\/p\/([a-z0-9]+)$/);
	correct_profile_remove_info_refresh()
}, false);

interface.page_profile_remove_upload.style.cursor = "pointer";
interface.page_profile_remove_upload.addEventListener("click", function() {
	if (correct_profile_remove_info.global) {
		profile_remove_upload();
	}
}, false);
interface.page_profile_remove_upload.addEventListener("mouseover", function(event) {
	if (correct_profile_remove_info.global) {
		interface.page_profile_remove_upload.children[0].style.color = "#3ef4ab";
	}
}, false);
interface.page_profile_remove_upload.addEventListener("mouseout", function(event) {
	interface.page_profile_remove_upload.children[0].style.color = "#ffffff";
}, false);
interface.page_profile_remove_upload.addEventListener("touchstart", function(event) {
	if (correct_profile_remove_info.global) {
		interface.page_profile_remove_upload.children[0].style.color = "#3ef4ab";
	}
}, false);
interface.page_profile_remove_upload.addEventListener("touchend", function(event) {
	event.preventDefault();
	if (correct_profile_remove_info.global) {
		interface.page_profile_remove_upload.children[0].style.color = "#ffffff";
		profile_remove_upload();
	}
}, false);

interface.page_profile_remove_form_link.addEventListener('keyup', (e) => {
	if (e.key == "Enter"){
		if (correct_profile_remove_info.global) {
			profile_remove_upload();
		}
	}
});

function profile_remove_upload(){
	document.activeElement.blur();
	var id = interface.page_profile_remove_form_link.value.trim().match(/^https?:\/\/aminoapps.com\/p\/([a-z0-9]+)$/)[1];
	loading(true);
	firebase_function("profile_remove", {"admin": admin_key, "id": id }, function (response) {
		interface.page_profile_remove_upload.style.background = "#088a56";
		if (response.code == "000") {
			notify(text.notify.profile_remove[response.code], true);
			refresh_birthday_list(function(){
				loading(false);
				switch_page("community_upcoming");
			});
		} else if (response.code == "101" || response.code == "102" || response.code == "300") {
			loading(false);
			notify(text.notify.common_error[response.code], false);
		} else {
			loading(false);
			notify(text.notify.profile_remove[response.code], false);
		}
	});
}

//Display a notification for successes and errors
function notify(text, success) {
	interface.notification.children[0].innerHTML = text;
	if (success) {
		interface.notification.style.backgroundColor = "#088A56";
	} else {
		interface.notification.style.backgroundColor = "#8A083C";
	}
	var speed = 4.2;
	var pos = -100;
	var id = setInterval(frame, 10);
	function frame() {
		if (pos >= 0) {
			interface.notification.style.right = "0vmin";
			clearInterval(id);
		} else {
			pos = ((-1 * Math.pow(3 , speed))+1);
			interface.notification.style.right = pos + "vmin";
			speed -= 0.2;
		}
	}
	setTimeout(function() {
		var speed = 0;
		var pos = 0; 
		var id = setInterval(frame, 10);
		function frame() {
			if (pos <= -100) {
				interface.notification.style.right = "-100vmin";
				clearInterval(id);
			} else {
				pos = ((-1 * Math.pow(3 , speed))+1);
				interface.notification.style.right = pos + "vmin";
				speed += 0.2;
			}
		}
	}, 5000);
}

//Display a loading animation during process
function loading(state){
	if (state){
		interface.loading.style.display = "block";
		var step = 0.0;
		var animation_fade_loading = setInterval(frame, 10);
		function frame() {
			if (step >= 1) {
				interface.loading.style.opacity = "1";
				clearInterval(animation_fade_loading);
			} else {
				step += 0.05;
				interface.loading.style.opacity = "" + step;
			}
		}
	} else {
		var step = 1.0;
		var animation_fade_loading = setInterval(frame, 10);
		function frame() {
			if (step <= 0) {
				interface.loading.style.opacity = "0";
				clearInterval(animation_fade_loading);
				interface.loading.style.display = "none";
			} else {
				step -= 0.05;
				interface.loading.style.opacity = "" + step;
			}
		}
	}
}

//Interact with the server
function firebase_function(function_name, arguments, callback){
	const http = new XMLHttpRequest();
	var url = "https://europe-west1-aminobirthdays.cloudfunctions.net/function?action=" + function_name + "&community=" + community.id;
	for (const argument_name in arguments) {
		url = url + "&" + argument_name + "=" + arguments[argument_name];
	}
	http.open("GET", encodeURI(url));
	http.send();
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
			callback(JSON.parse(http.response));
		}
	}
}

//Reorder birthdays widget every hour
function refresh_community_upcoming(callback = function(){}) {
	var date = new Date();
	interface.page_community_upcoming_birthdays.innerHTML = "";
	interface.page_community_upcoming_message.innerHTML = text.page_community.upcoming_message.replace("${birthday}", community.birthday_list.length);
	community.birthdays = [];
	var intersectionObserver = new IntersectionObserver(function intersectionCallback(entries) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				countdown.apply(entry.target);
				entry.target.classList.add("on-screen");
			} else {
				entry.target.classList.remove("on-screen");
			}
		});
	}, {threshold : [0]});

	community.birthday_list.sort(function(a, b) {
		var date_a = new Date(Date.UTC(date.getUTCFullYear(), encode_numbers.indexOf(a.substring(0, 1)) - 1, encode_numbers.indexOf(a.substring(1, 2)) + 1, -12 + encode_numbers.indexOf(a.substring(2, 3)), 0, 0, 0));
		var date_b = new Date(Date.UTC(date.getUTCFullYear(), encode_numbers.indexOf(b.substring(0, 1)) - 1, encode_numbers.indexOf(b.substring(1, 2)) + 1, -12 + encode_numbers.indexOf(b.substring(2, 3)), 0, 0, 0));
		if (date.getTime() > date_a.getTime()) {
			date_a.setUTCFullYear(date_a.getUTCFullYear() + 1);
		}
		if (date.getTime() > date_b.getTime()) {
			date_b.setUTCFullYear(date_b.getUTCFullYear() + 1);
		}
		var day_difference = date_a.getTime() - date_b.getTime();
		if (day_difference == 0) {
			return a.substring(40, a.length).localeCompare(b.substring(40, b.length));
		} else {
			return day_difference;
		}
	});

	for(u = 0; u < community.birthday_list.length; u ++){
		var profile_data = community.birthday_list[u];
		var profile = {};
		profile.id = profile_data.substring(profile_data.indexOf("/") + 1, profile_data.length);
		profile.name = profile_data.substring(40, profile_data.indexOf("/"));
		var month = encode_numbers.indexOf(profile_data.substring(0, 1));
		var day = encode_numbers.indexOf(profile_data.substring(1, 2));
		var timezone = encode_numbers.indexOf(profile_data.substring(2, 3));
		timezone = 12 - timezone;
		if (timezone >= 0) {
			if (timezone < 10) {
				timezone = "+0" + Math.abs(timezone);
			} else {
				timezone = "+" + Math.abs(timezone);
			}
		} else {
			if (timezone > -10) {
				timezone = "-0" + Math.abs(timezone);
			} else {
				timezone = "-" + Math.abs(timezone);
			}
		}
		profile.timezone = timezone;
		if (day < 10) { day = "0" + day }
		if (month < 10) { month = "0" + month }
		if (text.date_format == "0") {
			profile.birthday =  month + "/" + day;
		} else {
			profile.birthday =  day + "/" + month;
		}
		profile.color = encode_numbers.indexOf(profile_data.substring(3, 4));
		community.birthdays.push(profile);
		var widget = interface.widget.children[0].cloneNode(true);
		var date_target = new Date(Date.UTC(date.getUTCFullYear(), month - 1, day, 0 - timezone, 0, 0, 0));
		if (date.getTime() > date_target.getTime() + 86400000) {
			date_target.setUTCFullYear(date_target.getUTCFullYear() + 1);
		}
		var birthday_today = false;
		if (date.getTime() >= date_target.getTime() && date.getTime() < date_target.getTime() + 86400000) {
			birthday_today = true;
		}
		var day = Math.trunc((date_target.getTime() - date.getTime()) / 86400000);
		var hour = Math.trunc((date_target.getTime() - date.getTime()) /3600000) % 24;
		if (day < 100) { day = "0" + day }
		if (day < 10) { day = "0" + day }
		if (hour < 10) { hour = "0" + hour }
		if (!birthday_today) {
			widget.getElementsByClassName("widget_birthday_countdown")[0].style.display = "block";
			widget.getElementsByClassName("widget_birthday_message")[0].style.display = "none";
		} else {
			widget.getElementsByClassName("widget_birthday_countdown")[0].style.display = "none";
			widget.getElementsByClassName("widget_birthday_message")[0].style.display = "block";
		}
		widget.getElementsByClassName("widget_birthday_name")[0].children[0].innerHTML = profile.name;
		widget.getElementsByClassName("widget_birthday_date")[0].children[0].innerHTML = profile.birthday;
		widget.getElementsByClassName("widget_birthday_timezone")[0].children[1].innerHTML = profile.timezone;
		widget.getElementsByClassName("widget_birthday_countdown_day")[0].innerHTML = day;
		widget.getElementsByClassName("widget_birthday_countdown_hour")[0].innerHTML = hour;
		widget.getElementsByClassName("widget_birthday_name")[0].children[0].style.color = toRGB(profile.color, 1);
		widget.getElementsByClassName("widget_birthday_countdown_day")[0].style.borderColor = toRGB(profile.color, 1); 
		widget.getElementsByClassName("widget_birthday_countdown_second")[0].style.color = toRGB(profile.color, 1);
		widget.getElementsByClassName("widget_birthday_cadre")[0].style.borderColor = toRGB(profile.color, 1); 
		widget.getElementsByClassName("widget_birthday_cadre")[0].style.backgroundColor = toRGB(profile.color, 0.4); 
		widget.getElementsByClassName("widget_birthday_date")[0].children[0].style.color = toRGB(profile.color, 1); 
		widget.getElementsByClassName("widget_birthday_timezone")[0].children[0].style.color = toRGB(profile.color, 1); 
		widget.getElementsByClassName("widget_birthday_timezone")[0].children[1].style.color = toRGB(profile.color, 1); 
		widget.getElementsByClassName("widget_birthday_link")[0].href = "http://aminoapps.com/p/" + profile.id;
		interface.page_community_upcoming_birthdays.appendChild(widget);
		intersectionObserver.observe(interface.page_community_upcoming_birthdays.lastChild);
	}
	callback();
}

function page_loaded(){
	var step = 1.0;
	var animation_fade_loading = setInterval(frame, 10);
	function frame() {
		if (step <= 0) {
			interface.pageLoading.style.opacity = "0";
			clearInterval(animation_fade_loading);
			interface.pageLoading.style.display = "none";
		} else {
			step -= 0.05;
			interface.pageLoading.style.opacity = "" + step;
		}
	}
}
