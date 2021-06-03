;var url = new URL(window.location.href);
var language;
var text;
var encode_numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var community = {"id":url.searchParams.get("community")};
var page = url.searchParams.get("page");
if (!page || !(["community_upcoming", "community_browse", "profile_submit", "profile_remove", "profile_validate"].includes(page))) {
	page = "community_upcoming";
}
if (!community.id) {
	community = {"id": "birthdayexample"};
}
var birthday_list = [];
var countdown_interval = false;

firebase_function("community_get", {"admin":"0"}, function (response) {
	text = response.text;
	if (response.code == "000") {
		language = response.community.language;
		document.body.style.backgroundImage = "url('https"+ response.image.substring(4, response.image.lenght) + "')";
		interface.menu_community.children[0].innerHTML = text.menu.community.title;
		interface.menu_community_upcoming.children[0].innerHTML = text.menu.community.upcoming;
		interface.menu_community_browse.children[0].innerHTML = text.menu.community.browse;
		interface.menu_profile.children[0].innerHTML = text.menu.profile.title;
		interface.menu_profile_submit.children[0].innerHTML = text.menu.profile.submit;
		interface.menu_profile_remove.children[0].innerHTML = text.menu.profile.remove;
		interface.menu_profile_validate.children[0].innerHTML = text.menu.profile.validate;
		interface.menu_project_about.children[0].innerHTML = text.menu.about;
		interface.page_community_browse_form_link.placeholder = text.link;
		interface.page_community_browse_message.children[0].innerHTML = text.page.community_browse_message;
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
		interface.page_profile_validate_form_code.placeholder = text.code;
		
		interface.page_profile_remove_form_link.placeholder = text.link;
		interface.page_project_about.children[0].innerHTML = text.page.about;
		interface.widget_birthday_message.innerHTML = text.birthday_message;
		interface.header_pageTitle.innerHTML = text.title.community_upcoming;
		interface.page_profile_submit_upload.children[0].innerHTML = text.upload;
		interface.page_profile_remove_upload.children[0].innerHTML = text.upload;
		interface.page_profile_validate_upload.children[0].innerHTML = text.upload;
		
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

		interface.page.style.display = "block";
		switch_page(page, false);
		interface.menu_title.children[0].innerHTML = response.community.name;
		interface.menu_title.children[0].href = "http://aminoapps.com/p/" + response.community.chat;
		birthday_list = response.community.birthdays.substring(0, response.community.birthdays.length - 1).split(";");
		if (birthday_list[0] == "") {
			birthday_list = [];
		}
		refresh_community_upcoming(function () {
			setTimeout(function () {
				if (document.readyState === 'complete') {
					page_loaded();
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

var interface = {
	"pageLoading": document.getElementById("page-loading"),
	"header_menu": document.getElementById("header_menu"),
	"header_pageTitle": document.getElementById("header_page-title"),
	"header_icon": document.getElementById("header_icon"),
	"menu": document.getElementById("menu"),
	"menu_title": document.getElementById("menu_title"),
	"menu_community": document.getElementById("menu_community"),
	"menu_community_upcoming": document.getElementById("menu_community_upcoming"),
	"menu_community_browse": document.getElementById("menu_community_browse"),
	"menu_profile": document.getElementById("menu_profile"),
	"menu_profile_submit": document.getElementById("menu_profile_submit"),
	"menu_profile_remove": document.getElementById("menu_profile_remove"),
	"menu_profile_validate": document.getElementById("menu_profile_validate"),
	"menu_project_about": document.getElementById("menu_project_about"),
	"page": document.getElementById("page"),
	"page_community_upcoming": document.getElementById("page_community_upcoming"),
	"page_community_upcoming_birthdays": document.getElementById("page_community_upcoming_birthdays"),
	"page_community_upcoming_message": document.getElementById("page_community_upcoming_message"),
	"page_community_browse": document.getElementById("page_community_browse"),
	"page_community_browse_form_link": document.getElementById("page_community_browse_form_link").children[0],
	"page_community_browse_message": document.getElementById("page_community_browse_message"),
	"page_community_browse_preview": document.getElementById("page_community_browse_preview"),
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
	"page_profile_validate": document.getElementById("page_profile_validate"),
	"page_profile_validate_form_code": document.getElementById("page_profile_validate_form_code").children[0],
	"page_profile_validate_upload": document.getElementById("page_profile_validate_upload"),
	"page_project_about": document.getElementById("page_project_about"),
	"widget":document.getElementById("widget"),
	"widget_birthday": document.getElementById("widget").getElementsByClassName("widget_birthday")[0],
	"widget_birthday_message": document.getElementsByClassName("widget_birthday_message")[0].children[0],
	"notification": document.getElementById("notification"),
	"loading": document.getElementById("loading")
};

function refresh_birthday_list(callback) {
	firebase_function("community_get", {"admin":"0"}, function (response) {
		if (response.code == "000") {
			birthday_list = response.community.birthdays.substring(0, response.community.birthdays.length - 1).split(";");
			if (birthday_list[0] == "") {
				birthday_list = [];
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

interface.page_community_upcoming.style.display = "none";
interface.page_community_browse.style.display = "none";
interface.page_profile_submit.style.display = "none";
interface.page_profile_remove.style.display = "none";
interface.page_profile_validate.style.display = "none";
interface.page_project_about.style.display = "none";
interface.page.style.display = "block";

function switch_page(new_page, transition = true){
	if (transition){
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
					case "profile_submit": interface.page_profile_submit_form_name.focus(); break;
					case "profile_remove": interface.page_profile_remove_form_link.focus(); break;
					case "profile_validate": interface.page_profile_validate_form_code.focus(); interface.page_profile_validate_form_code.value = ""; break;
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
	} else {
		interface.header_pageTitle.innerHTML = text.title[new_page];
		interface["page_" + page].style.opacity = "0";
		interface["page_" + page].style.display = "none";
		interface["page_" + new_page].style.opacity = "1";
		interface["page_" + new_page].style.display = "inline-block";
		page = new_page;
	}
}

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

interface.menu_profile_validate.style.cursor = "pointer";
interface.menu_profile_validate.addEventListener("click", function(){
	switch_page("profile_validate");
	animate_menu();
}, false);
interface.menu_profile_validate.addEventListener("mouseover", function(event) {
	interface.menu_profile_validate.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_profile_validate.addEventListener("mouseout", function(event) {
	interface.menu_profile_validate.children[0].style.color = "#ffffff";
}, false);
interface.menu_profile_validate.addEventListener("touchstart", function(event) {
	interface.menu_profile_validate.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_profile_validate.addEventListener("touchend", function(event) {
	event.preventDefault();
	interface.menu_profile_validate.children[0].style.color = "#ffffff";
	switch_page("profile_validate");
	animate_menu();
}, false);

interface.menu_project_about.style.cursor = "pointer";
interface.menu_project_about.addEventListener("click", function(){
	switch_page("project_about");
	animate_menu();
}, false);
interface.menu_project_about.addEventListener("mouseover", function(event) {
	interface.menu_project_about.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_project_about.addEventListener("mouseout", function(event) {
	interface.menu_project_about.children[0].style.color = "#ffffff";
}, false);
interface.menu_project_about.addEventListener("touchstart", function(event) {
	interface.menu_project_about.children[0].style.color = "#3ef4ab";
}, false);
interface.menu_project_about.addEventListener("touchend", function(event) {
	event.preventDefault();
	interface.menu_project_about.children[0].style.color = "#ffffff";
	switch_page("project_about");
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

var profile_found = false;

interface.page_community_browse_form_link.addEventListener("input", function(event) {
	event.target.value = event.target.value.toLowerCase();
	event.target.value = event.target.value.replace(/[^a-z0-9:/.]/g, "");
	if (!event.target.value.match("^https?:\/\/aminoapps.com\/p\/([a-z0-9]*)$")){
		if(event.target.value.substring(0,7) != "http://" && event.target.value.substring(0,8) != "https://"){
			event.target.value = "http://aminoapps.com/p/" + event.target.value;
		} else {
			event.target.value = "";
		}
	}
	if (event.target.value.match("^https?:\/\/aminoapps.com\/p\/([a-z0-9]{6,9})$")){
		var profile = community.birthdays.find(obj => {
			return obj.id === interface.page_community_browse_form_link.value.trim().match("^https?:\/\/aminoapps.com\/p\/([a-z0-9]+)$")[1];
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
			firebase_function("browse", {"id": interface.page_community_browse_form_link.value.trim().match("^https?:\/\/aminoapps.com\/p\/([a-z0-9]+)$")[1]}, function (response) {
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
	if (countdown_interval != false) {
		countdown.apply();
	}
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
	if (e.keyCode === 13){
		interface.page_profile_submit_form_link.focus();
	}
});

interface.page_profile_submit_form_link.addEventListener("input", function(event) {
	event.target.value = event.target.value.toLowerCase();
	event.target.value = event.target.value.replace(/[^a-z0-9:/.]/g, "");
	if (!event.target.value.match("^https?:\/\/aminoapps.com\/p\/([a-z0-9]*)$")){
		if(event.target.value.substring(0,7) != "http://" && event.target.value.substring(0,8) != "https://"){
			event.target.value = "http://aminoapps.com/p/" + event.target.value;
		} else {
			event.target.value = "";
		}
	}
	if (event.target.value.match("^https?:\/\/aminoapps.com\/p\/([a-z0-9]+)$")){
		correct_profile_submit_info.link = true;
	} else {
		correct_profile_submit_info.link = false;
	}
	correct_profile_submit_info_refresh()
}, false);

interface.page_profile_submit_form_link.addEventListener('keyup', (e) => {
	if (e.keyCode === 13){
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
	if (e.keyCode === 13){
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
	if (e.keyCode === 13){
		interface.page_profile_submit_form_birthday_timezone.focus();
	}
});

interface.page_profile_submit_form_birthday_timezone.addEventListener("input", update_date, false);

interface.page_profile_submit_form_birthday_timezone.addEventListener('keyup', (e) => {
	if (e.keyCode === 13){
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
	var id = interface.page_profile_submit_form_link.value.trim().match("^https?:\/\/aminoapps.com\/p\/([a-z0-9]+)$")[1];
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
	firebase_function("profile_submit", {"id": id, "name": name, "month": month, "day": day, "timezone": timezone, "color": color }, function (response) {
		interface.page_profile_submit_upload.style.background = "#088a56";
		if (response.code == "000") {
			loading(false);
			notify(text.notify.profile_submit[response.code], true);
			switch_page("profile_validate");
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
correct_profile_remove_info_refresh()

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
	if (!event.target.value.match("^https?:\/\/aminoapps.com\/p\/([a-z0-9]*)$")){
		if(event.target.value.substring(0,7) != "http://" && event.target.value.substring(0,8) != "https://"){
			event.target.value = "http://aminoapps.com/p/" + event.target.value;
		} else {
			event.target.value = "";
		}
	}
	correct_profile_remove_info.link = event.target.value.match("^https?:\/\/aminoapps.com\/p\/([a-z0-9]+)$");
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
	if (e.keyCode === 13){
		if (correct_profile_remove_info.global) {
			profile_remove_upload();
		}
	}
});

function profile_remove_upload(){
	document.activeElement.blur();
	var id = interface.page_profile_remove_form_link.value.trim().match("^https?:\/\/aminoapps.com\/p\/([a-z0-9]+)$")[1];
	loading(true);
	firebase_function("profile_remove", {"id": id }, function (response) {
		interface.page_profile_remove_upload.style.background = "#088a56";
		if (response.code == "000") {
			loading(false);
			notify(text.notify.profile_remove[response.code], true);
			switch_page("profile_validate");
		} else if (response.code == "101" || response.code == "102" || response.code == "300") {
			loading(false);
			notify(text.notify.common_error[response.code], false);
		} else {
			loading(false);
			notify(text.notify.profile_remove[response.code], false);
		}
	});
}

var correct_profile_validate_info = {
	"code" : false,
	"global" : false
};
correct_profile_validate_info_refresh()

function correct_profile_validate_info_refresh(){
	if (correct_profile_validate_info.code) {
		correct_profile_validate_info.global = true;
		interface.page_profile_validate_upload.style.backgroundColor = "#088a56";
		interface.page_profile_validate_upload.style.borderColor = "#088a56";
	} else {
		correct_profile_validate_info.global = false;
		interface.page_profile_validate_upload.style.backgroundColor = "#8a8a8a";
		interface.page_profile_validate_upload.style.borderColor = "#8a8a8a";
		interface.page_profile_validate_upload.children[0].style.color = "#ffffff";
	}
}

interface.page_profile_validate_form_code.addEventListener("input", function(event) {
	event.target.value = event.target.value.toUpperCase();
	event.target.value = event.target.value.replace(/[^A-Z0-9]/g, "");
	if (event.target.value.length > 6){
		event.target.value = event.target.value.substring(0, 6);
	}
	correct_profile_validate_info.code = (event.target.value.length == 6);
	correct_profile_validate_info_refresh()
}, false);

interface.page_profile_validate_upload.style.cursor = "pointer";
interface.page_profile_validate_upload.addEventListener("click", function() {
	if (correct_profile_validate_info.global) {
		profile_validate_upload();
	}
}, false);
interface.page_profile_validate_upload.addEventListener("mouseover", function(event) {
	if (correct_profile_validate_info.global) {
		interface.page_profile_validate_upload.children[0].style.color = "#3ef4ab";
	}
}, false);
interface.page_profile_validate_upload.addEventListener("mouseout", function(event) {
	interface.page_profile_validate_upload.children[0].style.color = "#ffffff";
}, false);
interface.page_profile_validate_upload.addEventListener("touchstart", function(event) {
	if (correct_profile_validate_info.global) {
		interface.page_profile_validate_upload.children[0].style.color = "#3ef4ab";
	}
}, false);
interface.page_profile_validate_upload.addEventListener("touchend", function(event) {
	event.preventDefault();
	if (correct_profile_validate_info.global) {
		interface.page_profile_validate_upload.children[0].style.color = "#ffffff";
		profile_validate_upload();
	}
}, false);

interface.page_profile_validate_form_code.addEventListener('keyup', (e) => {
	if (e.keyCode === 13){
		if (correct_profile_validate_info.global) {
			profile_validate_upload();
		}
	}
});

function profile_validate_upload(){
	document.activeElement.blur();
	var code = interface.page_profile_validate_form_code.value;
	loading(true);
	firebase_function("profile_validate", {"code" : code}, function(response){
		interface.page_profile_validate_upload.style.background = "#088a56";
		if (response.code == "000") {
			notify(text.notify.profile_validate[response.code], true);
			refresh_birthday_list(function(){
				loading(false);
				switch_page("community_upcoming");
			});
		} else if (response.code == "101" || response.code == "102" || response.code == "300") {
			loading(false);
			notify(text.notify.common_error[response.code], false);
		} else {
			loading(false);
			notify(text.notify.profile_validate[response.code], false);
		}
	});
}

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

function refresh_community_upcoming(callback = function(){}) {
	var date = new Date();
	interface.page_community_upcoming_birthdays.innerHTML = "";
	interface.page_community_upcoming_message.innerHTML = text.page.community_upcoming_message.replace("${birthday}", birthday_list.length);
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

	birthday_list.sort(function(a, b) {
		var date_a = new Date(date.getUTCFullYear(), encode_numbers.indexOf(a.substring(0, 1)) - 1, encode_numbers.indexOf(a.substring(1, 2)), 0 -  encode_numbers.indexOf(a.substring(2, 3)), 0, 0, 0);
		var date_b = new Date(date.getUTCFullYear(), encode_numbers.indexOf(b.substring(0, 1)) - 1, encode_numbers.indexOf(b.substring(1, 2)), 0 -  encode_numbers.indexOf(b.substring(2, 3)), 0, 0, 0);
		if (date.getTime() >= date_a.getTime() + 86400000) {
			date_a.setUTCFullYear(date_a.getUTCFullYear() + 1);
		}
		if (date.getTime() >= date_b.getTime() + 86400000) {
			date_b.setUTCFullYear(date_b.getUTCFullYear() + 1);
		}
		var day_difference = date_a.getTime() - date_b.getTime();
		if (day_difference == 0) {
			return a.substring(40, a.length).localeCompare(b.substring(40, b.length));
		} else {
			return day_difference;
		}
	});

	for(u = 0; u < birthday_list.length; u ++){
		var profile_data = birthday_list[u];
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
	countdown_interval = setInterval(function(){
		countdown.refresh();
	}, 1000);
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