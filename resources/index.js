const functions = require("firebase-functions");
const http = require("https");
const zlib = require("zlib")
var admin = require("firebase-admin");
admin.initializeApp();

function write_file(file_name, data, callback, error_handler=function(code){}, remember={}) {
	admin.storage().bucket().file(file_name).save(JSON.stringify(data), function(err){
		if (!err) {
			callback(remember);
		} else {
			error_handler("102");
			functions.logger.error("Cant't write " + file_name + ".")
		}
	});
}

function read_file(file_name, callback, error_handler=function(code){}, remember={}) {
	admin.storage().bucket().file(file_name).download(function(err, contents) {
		if (!err) {
			callback(JSON.parse(contents), remember);
		} else {
			error_handler("102");
			functions.logger.error("Cant't read " + file_name + ".")
		}
	});
}

function file_exists(file_name, callback, error_handler=function(code){}, remember={}){
	admin.storage().bucket().file(file_name).exists(function(err, exists) {
		if (!err) {
			callback(exists, remember);
		} else {
			error_handler("102");
			functions.logger.error("Cant't check " + file_name + ".")
		}
	});
}

function delete_file(file_name, callback, error_handler=function(code){}, remember={}){
	admin.storage().bucket().file(file_name).delete(function(err) {
		if (!err) {
			callback(remember);
		} else {
			error_handler("102");
			functions.logger.error("Cant't delete " + file_name + ".")
		}
	});
}

var encode_numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var amino;
amino = {
	"login": function (allowed_tries=8, callback = function(){}, error_handler = function(){}, remember={}) {
		var tries = 0;
		(function try_login(){
			tries += 1
			var data = {
				"email": amino.account.mail,
				"v": 2,
				"secret": "0 " + amino.account.password,
				"deviceID": amino.account.device,
				"clientType": 100,
				"action": "normal"
			};
			var post_options = {
				host: "service.narvii.com",
				path: "/api/v1/g/s/auth/login",
				method: "POST",
				headers: {
					"NDCDEVICEID": amino.account.device,
					"NDC-MSG-SIG": "Aa0ZDPOEgjt1EhyVYyZ5FgSZSqJt",
					"Accept-Language": "en-US",
					"Content-Type": "application/json; charset=utf-8",
					"Accept-Encoding": "gzip",
					"User-Agent": "Dalvik/2.1.0 (Linux; U; Android 5.1.1; SM-G973N Build/beyond1qlteue-user 5; com.narvii.amino.master/3.4.33562)",
					"Host": "service.narvii.com",
					"Connection": "Keep-Alive",
					"Content-Length":  Buffer.byteLength(JSON.stringify(data), "utf8")
				}
			};
			var response_body = "";
			var request = http.request(post_options, function (response) {
				var gunzip = zlib.createGunzip();            
				response.pipe(gunzip);
				gunzip.on("data", function (data) {
					response_body = response_body + data.toString();
				});
				gunzip.on("end", function () {
					response_body = JSON.parse(response_body);
					if (response_body["api:message"] == "OK"){
						amino.account.sid = "sid=" + response_body["sid"];
						write_file("account.json", amino.account, function () {
							callback(remember)
						}, function (code) { 
							callback(remember)
						});
					} else {
						functions.logger.error("Cannot login : " + response_body["api:message"]);
						if (tries > allowed_tries) {
							error_handler("102");
						} else {
							try_login();
						}
					}
				});
				response.on("error", function (e) {
					functions.logger.error("Cannot login");
					if (tries > allowed_tries) {
						error_handler("101");
					} else {
						try_login();
					}
				})
			});
			request.on("error", (error) => {
				functions.logger.error("Cannot login");
				if (tries > allowed_tries) {
					error_handler("101");
				} else {
					try_login();
				}
			});
			request.write(JSON.stringify(data));
			request.end();
		})()
	},
	"req_get": function (path, data = {}, allowed_tries=8, callback = function(){}, error_handler = function(){}, remember={}, error_code = "102") {
		var tries = 0;
		(function try_get(){
			tries += 1
			var data_string = "";
			var first_argument = true;
			for (argument in data) {
				if (first_argument) {
					data_string = data_string + "?";
					first_argument = false;
				} else {
					data_string = data_string + "&";
				}
				data_string = data_string + argument + "=" + data[argument];
			}
			var get_options = {
				host: "service.narvii.com",
				port: 443,
				path: "/api/v1/" + path + data_string,
				method: "GET",
				headers: {
					"NDCDEVICEID": amino.account.device,
					"NDCAUTH": amino.account.sid,
					"NDC-MSG-SIG": "Aa0ZDPOEgjt1EhyVYyZ5FgSZSqJt",
					"Accept-Language": "en-US",
					"Content-Type": "application/json; charset=utf-8",
					"Accept-Encoding": "gzip",
					"User-Agent": "Dalvik/2.1.0 (Linux; U; Android 5.1.1; SM-G973N Build/beyond1qlteue-user 5; com.narvii.amino.master/3.4.33562)",
					"Host": "service.narvii.com",
					"Connection": "Keep-Alive"
				}
			};
			var response_body = "";
			var request = http.request(get_options, function (response) {
				var gunzip = zlib.createGunzip();            
				response.pipe(gunzip);
				gunzip.on("data", function (data) {
					response_body = response_body + data.toString();
				});
				gunzip.on("end", function () {
					response_body = JSON.parse(response_body);
					if (response_body["api:message"] == "OK"){
						callback(response_body, remember);
					} else {
						functions.logger.error("Amino error during " + path + " : " + response_body["api:message"] + "\n" + JSON.stringify(response_body));
						if (tries > allowed_tries) {
							error_handler(error_code);
						} else {
							amino.login(2, function() {
								try_get();
							});
						}
					}
				});
				response.on("error", function (e) {
					if (tries > allowed_tries) {
						error_handler("101");
					} else {
						try_get();
					}
				})
			});
			request.on("error", (error) => {
				if (tries > allowed_tries) {
					error_handler("101");
				} else {
					try_get();
				}
			});
			request.end();
		})()
	},
	"req_post": function (path, data = {}, allowed_tries=8, callback = function(){}, error_handler = function(){}, remember={}, error_code = "102") {
		var tries = 0;
		(function try_post(){
			tries += 1
			var post_options = {
				host: "service.narvii.com",
				path: "/api/v1/" + path,
				method: "POST",
				headers: {
					"NDCDEVICEID": amino.account.device,
					"NDCAUTH": amino.account.sid,
					"NDC-MSG-SIG": "Aa0ZDPOEgjt1EhyVYyZ5FgSZSqJt",
					"Accept-Language": "en-US",
					"Content-Type": "application/json; charset=utf-8",
					"Accept-Encoding": "gzip",
					"User-Agent": "Dalvik/2.1.0 (Linux; U; Android 5.1.1; SM-G973N Build/beyond1qlteue-user 5; com.narvii.amino.master/3.4.33562)",
					"Host": "service.narvii.com",
					"Connection": "Keep-Alive",
					"Content-Length":  Buffer.byteLength(JSON.stringify(data), "utf8")
				}
			};
			var response_body = "";
			var request = http.request(post_options, function (response) {
				var gunzip = zlib.createGunzip();            
				response.pipe(gunzip);
				gunzip.on("data", function (data) {
					response_body = response_body + data.toString();
				});
				gunzip.on("end", function () {
					response_body = JSON.parse(response_body);
					if (response_body["api:message"] == "OK"){
						callback(response_body, remember);
					} else {
						functions.logger.error("Amino error during " + path + " : " + response_body["api:message"] + "\n" + JSON.stringify(response_body));
						if (tries > allowed_tries) {
							error_handler(error_code);
						} else {
							amino.login(2, function() {
								try_post();
							});
						}
					}
				});
				response.on("error", function (e) {
					if (tries > allowed_tries) {
						error_handler("101");
					} else {
						try_post()
					}
				})
			});
			request.on("error", (error) => {
				if (tries > allowed_tries) {
					error_handler("101");
				} else {
					try_post()
				}
			});
			request.write(JSON.stringify(data));
			request.end();
		})()
	},
	"account":{
		"device" : "",
		"sid" : "",
		"email" : "",
		"password" : "",
		"uid" : ""
	}
}


exports.function = functions.runWith({timeoutSeconds: 30,memory: "128MB"}).region("europe-west1").https.onRequest(async (req, res) => {
	res.set("Access-Control-Allow-Origin", "https://aminobirthdays.web.app");
	read_file("account.json", function (account) {
		amino.account = account;
		if (req.query.action == "community_get") {
			file_exists("communities/" + req.query.community + ".json", function (exists) {
				if (exists) {
					read_file("communities/" + req.query.community + ".json", function (community) {
						amino.req_get("g/s-x" + community.id + "/community/info", {}, 4, function (info) {
							file_exists("languages/" + info.community.primaryLanguage + ".json", function (exists) {
								if (exists) {
									read_file("languages/" + info.community.primaryLanguage + ".json", function (language) {
										if (req.query.admin == "1") {
											language = language.admin;
										} else {
											language = language.user;
											language.notify.profile_submit["204"] = language.notify.profile_submit["204"].split("${rep_min}").join(community.rep_min);
											delete community.notify_messages;
											delete community.validate_messages;
											delete community.rep_min;
										}
										res.send(JSON.stringify({ "code": "000", "community": community, "image": image, "text": language }));
									}, function (code) { res.send(JSON.stringify({ "code": code })) });
								} else {
									read_file("languages/en.json", function (language) {
										if (req.query.admin == "1") {
											language = language.admin;
										} else {
											language = language.user;
											language.notify.profile_submit["204"] = language.notify.profile_submit["204"].split("${rep_min}").join(community.rep_min);
											delete community.notify_messages;
											delete community.validate_messages;
											delete community.rep_min;
										}
										res.send(JSON.stringify({ "code": "000", "community": community, "image": image, "text": language }));
									}, function (code) { res.send(JSON.stringify({ "code": code })) });
								}
							}, function (code) { res.send(JSON.stringify({ "code": code })) });
							var image = info.community.promotionalMediaList[0][1];
							delete community.id;
							community.name = info.community.name;
						}, function (code) { res.send(JSON.stringify({ "code": code })) });
					}, function (code) { res.send(JSON.stringify({ "code": code })) });
				} else {
					read_file("languages/en.json", function (language) {
						res.send(JSON.stringify({ "code": "201", "text": language.user }));
					}, function (code) { res.send(JSON.stringify({ "code": code })) });
				}
			}, function (code) { res.send(JSON.stringify({ "code": code })) });
		} else if (req.query.action == "browse") {
			file_exists("communities/" + req.query.community + ".json", function (exists) {
				if (exists) {
					read_file("communities/" + req.query.community + ".json", function (community) {
						amino.req_get("g/s/link-resolution", { "q": req.query.id }, 4, function (response) {
							var user_id = response["linkInfoV2"]["extensions"]["linkInfo"]["objectId"];
							var birthday_list = community.birthdays.substring(0, community.birthdays.length - 1).split(";");
							profile_found = false
							for (u = 0; u < birthday_list.length; u++) {
								if (birthday_list[u].substring(4, 40) == user_id) {
									profile_found = birthday_list[u];
									break;
								}
							}
							res.send(JSON.stringify({ "code": "000", "birthday" : profile_found }));
						}, function (code) { res.send(JSON.stringify({ "code": code })) });
					}, function (code) { res.send(JSON.stringify({ "code": code })) });
				} else {
					read_file("languages/en.json", function (language) {
						res.send(JSON.stringify({ "code": "201", "text": language.user }));
					}, function (code) { res.send(JSON.stringify({ "code": code })) });
				}
			}, function (code) { res.send(JSON.stringify({ "code": code })) });
		} else if (req.query.action == "profile_submit") {
			file_exists("communities/" + req.query.community + ".json", function(exists) {
				if (exists) {
					if (/^[A-Za-z0-9À-ÿ '-]{1,20}$/.test(req.query.name) && /^[a-z0-9]{6,9}$/.test(req.query.id) && req.query.day >= 1 && req.query.day <= 31 && (req.query.day <= 29 || req.query.month != 2) && (req.query.day <= 30 || req.query.month != 4 || req.query.month != 6 || req.query.month != 9 || req.query.month != 11) && req.query.month >= 1 && req.query.month <= 12 && req.query.timezone >= 0 && req.query.timezone <= 23) {
						read_file("communities/" + req.query.community + ".json", function (community) {
							var month = req.query.month;
							if (month<10) {
								month = "0" + month;
							}
							var day = req.query.day;
							if (day<10) {
								day = "0" + day;
							}
							var utc = 12 - parseInt(req.query.timezone, 10);
							if (utc >= 0) {
								if (utc < 10) {
									utc = "+0" + Math.abs(utc);
								} else {
									utc = "+" + Math.abs(utc);
								}
							} else {
								if (utc > -10) {
									utc = "-0" + Math.abs(utc);
								} else {
									utc = "-" + Math.abs(utc);
								}
							}
							var message_submit = community.validate_messages.submit.split("${nl}").join("\n").split("${name}").join(req.query.name).split("${month}").join(month).split("${day}").join(day).split("${utc}").join(utc);
							var message_edit = community.validate_messages.edit.split("${nl}").join("\n").split("${name}").join(req.query.name).split("${month}").join(month).split("${day}").join(day).split("${utc}").join(utc);
							amino.req_get("g/s/link-resolution", { "q": req.query.id }, 4, function (response) {
								if (response["linkInfoV2"]["extensions"]["linkInfo"]["fullPath"].substring(0, response["linkInfoV2"]["extensions"]["linkInfo"]["fullPath"].indexOf("/")) == req.query.community && response["linkInfoV2"]["extensions"]["linkInfo"]["objectType"] == 0) {
									var user_id = response["linkInfoV2"]["extensions"]["linkInfo"]["objectId"];
									var birthday_list = community.birthdays.substring(0, community.birthdays.length - 1).split(";");
									var registered = false;
									for (u = 0; u < birthday_list.length; u++) {
										if (birthday_list[u].substring(4, 40) == user_id) {
											registered = true;
											break;
										}
									}
									if (req.query.admin == undefined){
										amino.req_get("x" + community.id + "/s/user-profile/" + user_id, {}, 4, function (response) {
											var status = response["userProfile"]["status"]
											if (status != 9 && status != 10) {
												amino.req_post("x" + community.id + "/s/chat/thread", {"title": null, "inviteeUids": [user_id], "initialMessageContent": null, "publishToGlobal": 0, "type": 0 }, 4, function (response) {
													var chat_id = response["thread"]["threadId"];
													read_file("validation.json", function (validation) {
														var validation_code;
														do {
															var validation_code = "";
															for (d = 0; d < 6; d++) {
																validation_code = validation_code + encode_numbers[Math.floor(Math.random() * 36)];
															}
														} while (req.query.community in validation && validation_code in validation[req.query.community]);
														if (registered) {
															var profile_info = encode_numbers[parseInt(req.query.month, 10)] + encode_numbers[parseInt(req.query.day, 10)] + encode_numbers[parseInt(req.query.timezone, 10)] + encode_numbers[parseInt(req.query.color, 0)] + user_id + req.query.name + "/" + req.query.id ;
															if (!(req.query.community in validation)) {
																validation[req.query.community] = {};
															}
															validation[req.query.community][validation_code] = { "action": "edit", "id": user_id, "content": profile_info, "time": Date.now() };
															var action_left = 2;
															write_file("validation.json", validation, function () {
																action_left -= 1;
																if (action_left == 0) {
																	res.send(JSON.stringify({ "code": "000" }));
																}
															}, function (code) { res.send(JSON.stringify({ "code": code })) });
															amino.req_post("x" + community.id + "/s/chat/thread/" + chat_id + "/message", { "type": 0, "content": "[C]" + validation_code + "\n\n" + message_edit}, 4, function (response) {
																action_left -= 1;
																if (action_left == 0) {
																	res.send(JSON.stringify({ "code": "000" }));
																}
															}, function (code) { res.send(JSON.stringify({ "code": code })) });
														} else {
															amino.req_get("x" + community.id + "/s/user-profile/" + user_id, {}, 4, function (response) {
																if (response["userProfile"]["reputation"] >= community.rep_min) {
																	var profile_info = encode_numbers[parseInt(req.query.month, 10)] + encode_numbers[parseInt(req.query.day, 10)] + encode_numbers[parseInt(req.query.timezone, 10)] + encode_numbers[parseInt(req.query.color, 0)] + user_id + req.query.name + "/" + req.query.id ;
																	validation[req.query.community][validation_code] = { "action": "submit", "content": profile_info, "time": Date.now() };
																	var action_left = 2;
																	write_file("validation.json", validation, function () {
																		action_left -= 1;
																		if (action_left == 0) {
																			res.send(JSON.stringify({ "code": "000" }));
																		}
																	}, function (code) { res.send(JSON.stringify({ "code": code })) });
																	amino.req_post("x" + community.id + "/s/chat/thread/" + chat_id + "/message", {"type": 0, "content": "[C]" + validation_code + "\n\n" + message_submit}, 4, function (response) {
																		action_left -= 1;
																		if (action_left == 0) {
																			res.send(JSON.stringify({ "code": "000" }));
																		}
																	}, function (code) { res.send(JSON.stringify({ "code": code })) });
																} else {
																	res.send(JSON.stringify({ "code": "204" }));
																}
															}, function (code) { res.send(JSON.stringify({ "code": code })) });
														}
													}, function (code) { res.send(JSON.stringify({ "code": code })) });
												}, function (code) { res.send(JSON.stringify({ "code": code })) });
											} else {
												res.send(JSON.stringify({ "code": "203" }));
											}
										}, function (code) { res.send(JSON.stringify({ "code": code })) });
									} else {
										read_file("admin.json", function(admin){
											if (req.query.admin == admin.master || admin.community[req.query.community].master == req.query.admin || admin.community[req.query.community].moderator.filter(obj => { return obj.key === req.query.admin }).length === 1){
												var profile_info = encode_numbers[parseInt(req.query.month, 10)] + encode_numbers[parseInt(req.query.day, 10)] + encode_numbers[parseInt(req.query.timezone, 10)] + encode_numbers[parseInt(req.query.color, 0)] + user_id + req.query.name + "/" + req.query.id ;
												if (registered) {
													var birthday_list = community.birthdays.substring(0, community.birthdays.length - 1).split(";");
													for (u = 0; u < birthday_list.length; u++) {
														if (birthday_list[u].substring(4, 40) == user_id) {
															birthday_list[u] = profile_info;
															break;
														}
													}
													community.birthdays = birthday_list.join(";") + ";";
												} else {
													community.birthdays = community.birthdays + profile_info + ";";
												}
												write_file("communities/" + req.query.community + ".json", community, function () {
													res.send(JSON.stringify({ "code": "000" }));
												}, function (code) { res.send(JSON.stringify({ "code": code })) });
											} else {
												res.send(JSON.stringify({ "code": "300" }));
											}
										}, function(code){res.send(JSON.stringify({"code":code}))});
									}
								} else {
									res.send(JSON.stringify({ "code": "202" }));
								}
							}, function(code){res.send(JSON.stringify({"code":code}))}, {}, "202");
						}, function(code){res.send(JSON.stringify({"code":code}))});
					} else {
						res.send(JSON.stringify({"code":"202"}));
					}
				} else {
					res.send(JSON.stringify({"code":"201"}));
				}
			}, function(code){res.send(JSON.stringify({"code":code}))});
		} else if (req.query.action == "profile_remove") {
			file_exists("communities/" + req.query.community + ".json", function(exists) {
				if (exists) {
					read_file("communities/" + req.query.community + ".json", function (community) {
						var message_remove = community.validate_messages.remove.split("${nl}").join("\n");
						amino.req_get("g/s/link-resolution", { "q": req.query.id }, 4, function (response) {
							if (response["linkInfoV2"]["extensions"]["linkInfo"]["fullPath"].substring(0, response["linkInfoV2"]["extensions"]["linkInfo"]["fullPath"].indexOf("/")) == req.query.community && response["linkInfoV2"]["extensions"]["linkInfo"]["objectType"] == 0) {
								var user_id = response["linkInfoV2"]["extensions"]["linkInfo"]["objectId"];
								var birthday_list = community.birthdays.substring(0, community.birthdays.length - 1).split(";");
								var registered = false;
								for (u = 0; u < birthday_list.length; u++) {
									if (birthday_list[u].substring(4, 40) == user_id) {
										registered = true;
										break;
									}
								}
								if (req.query.admin == undefined){
									amino.req_post("x" + community.id + "/s/chat/thread", {"title": null, "inviteeUids": [user_id], "initialMessageContent": null, "publishToGlobal": 0, "type": 0 }, 4, function (response) {
										var chat_id = response["thread"]["threadId"];
										read_file("validation.json", function (validation) {
											var validation_code;
											do {
												var validation_code = "";
												for (d = 0; d < 6; d++) {
													validation_code = validation_code + encode_numbers[Math.floor(Math.random() * 36)];
												}
											} while (req.query.community in validation && validation_code in validation[req.query.community]);
											if (registered) {
												validation[req.query.community][validation_code] = { "action": "remove", "id": user_id, "time": Date.now() };
												var action_left = 2;
												write_file("validation.json", validation, function () {
													action_left -= 1;
													if (action_left == 0) {
														res.send(JSON.stringify({ "code": "000" }));
													}
												}, function (code) { res.send(JSON.stringify({ "code": code })) });
												amino.req_post("x" + community.id + "/s/chat/thread/" + chat_id + "/message", {"type": 0, "content": "[C]" + validation_code + "\n\n" + message_remove}, 4, function (response) {
													action_left -= 1;
													if (action_left == 0) {
														res.send(JSON.stringify({ "code": "000" }));
													}
												}, function (code) { res.send(JSON.stringify({ "code": code })) });
											} else {
												res.send(JSON.stringify({ "code": "203" }));
											}
										}, function (code) { res.send(JSON.stringify({ "code": code })) });
									}, function (code) { res.send(JSON.stringify({ "code": code })) });
								} else {
									read_file("admin.json", function(admin){
										if (req.query.admin == admin.master || admin.community[req.query.community].master == req.query.admin || admin.community[req.query.community].moderator.filter(obj => { return obj.key === req.query.admin }).length === 1){
											var birthday_list = community.birthdays.substring(0, community.birthdays.length - 1).split(";");
											for (u = 0; u < birthday_list.length; u++) {
												if (birthday_list[u].substring(4, 40) == user_id) {
													birthday_list.splice(u, 1);
													break;
												}
											}
											if (birthday_list.length > 0) {
												community.birthdays = birthday_list.join(";") + ";";
											} else {
												community.birthdays = "";
											}
											write_file("communities/" + req.query.community + ".json", community, function () {
												res.send(JSON.stringify({ "code": "000" }));
											}, function (code) { res.send(JSON.stringify({ "code": code })) });
										} else {
											res.send(JSON.stringify({ "code": "300" }));
										}
									}, function(code){res.send(JSON.stringify({"code":code}))});
								}
							} else {
								res.send(JSON.stringify({"code":"202"}));
							}
						}, function(code){res.send(JSON.stringify({"code":code}))}, {}, "202");
					}, function(code){res.send(JSON.stringify({"code":code}))});
				} else {
					res.send(JSON.stringify({"code":"201"}));
				}
			}, function(code){res.send(JSON.stringify({"code":code}))});
		} else if (req.query.action == "profile_validate") {
			file_exists("communities/" + req.query.community + ".json", function(exists) {
				if (exists) {
					read_file("validation.json", function (validation) {
						for (community in validation) {
							for (code in validation[community]){
								if(Date.now() - validation[community][code].time > 3600000) {
									delete validation[community][code];
								}
							}
						}
						if(req.query.code in validation[req.query.community]) {
							var action_info = validation[req.query.community][req.query.code];
							delete validation[req.query.community][req.query.code];
							var action_left = 2;
							write_file("validation.json", validation, function () {
								action_left -= 1;
								if (action_left == 0) {
									res.send(JSON.stringify({ "code": "000" }));
								}
							}, function(code){res.send(JSON.stringify({"code":code}))});
							read_file("communities/" + req.query.community + ".json", function (community) {
								if (action_info.action == "submit") {
									community.birthdays = community.birthdays + action_info.content + ";";
								} else if (action_info.action == "edit") {
									var birthday_list = community.birthdays.substring(0, community.birthdays.length - 1).split(";");
									for (u = 0; u < birthday_list.length; u++) {
										if (birthday_list[u].substring(4, 40) == action_info.id) {
											birthday_list[u] = action_info.content;
											break;
										}
									}
									community.birthdays = birthday_list.join(";") + ";";
								} else if (action_info.action == "remove") {
									var birthday_list = community.birthdays.substring(0, community.birthdays.length - 1).split(";");
									for (u = 0; u < birthday_list.length; u++) {
										if (birthday_list[u].substring(4, 40) == action_info.id) {
											birthday_list.splice(u, 1);
											break;
										}
									}
									community.birthdays = birthday_list.join(";") + ";";
								}
								write_file("communities/" + req.query.community + ".json", community, function () {
									action_left -= 1;
									if (action_left == 0) {
										res.send(JSON.stringify({ "code": "000" }));
									}
								}, function(code){res.send(JSON.stringify({"code":code}))});
							}, function(code){res.send(JSON.stringify({"code":code}))});
						} else {
							res.send(JSON.stringify({"code":"202"}));
						}
					}, function(code){res.send(JSON.stringify({"code":code}))});
				} else {
					res.send(JSON.stringify({ "code": "201" }));
				}
			}, function (code) { res.send(JSON.stringify({ "code": code })) });
		} else if (req.query.action == "admin_check") {
			read_file("admin.json", function (admin) {
				if (req.query.admin == admin.master || admin.community[req.query.community].master == req.query.admin) {
					res.send(JSON.stringify({ "code": "000", "master": true, "admin_list": admin.community[req.query.community].moderator}));
				} else if (admin.community[req.query.community].moderator.filter(obj => { return obj.key === req.query.admin }).length === 1){
					res.send(JSON.stringify({ "code": "000", "master": false}));
				} else {
					res.send(JSON.stringify({ "code": "300" }));
				}
			}, function (code) { res.send(JSON.stringify({ "code": code })) });
		} else if (req.query.action == "community_edit") {
			read_file("admin.json", function (admin) {
				if (req.query.admin == admin.master || admin.community[req.query.community].master == req.query.admin || admin.community[req.query.community].moderator.filter(obj => { return obj.key === req.query.admin }).length === 1){
					read_file("communities/" + req.query.community + ".json", function(community){
						
						rep_min_match = req.query.rep_min.match("^([0-9]+)$");
						if (rep_min_match) {
							community.rep_min = parseInt(rep_min_match[1], 10);
						}
						
						notify_messages = {};
						notify_messages_match = true;
						notify_messages_entries = req.query.notify_messages.split("\n");
						for (var message = 0; message < notify_messages_entries.length; message ++) {
							message_match = notify_messages_entries[message].match("^([0-9]+) ?: ?(.+)$");
							if (message_match) {
								if (notify_messages[message_match[1]] == undefined) {
									notify_messages[message_match[1]] = [];
								}
								notify_messages[message_match[1]].push(message_match[2]);
							} else {
								notify_messages_match = false;
								break;
							}
						}
						if (notify_messages_match) {
							community.notify_messages = notify_messages;
						}
						
						if (req.query.submit_message != undefined) {
							community.validate_messages.submit = req.query.submit_message;
						}
						if (req.query.edit_message != undefined) {
							community.validate_messages.edit = req.query.edit_message;
						}
						if (req.query.remove_message != undefined) {
							community.validate_messages.remove = req.query.remove_message;
						}
						
						chat_match = req.query.chat.match("^([a-z0-9]+)$");
						if (chat_match && community.chat != chat_match[1]) {
							community.chat = chat_match[1];
							amino.req_get("g/s/link-resolution", { "q": chat_match[1] }, 4, function (response) {
								community.chat_id = response["linkInfoV2"]["extensions"]["linkInfo"]["objectId"];
								write_file("communities/" + req.query.community + ".json", community, function () {
									res.send(JSON.stringify({ "code": "000"}));
								}, function(code){res.send(JSON.stringify({"code":code}))});
							}, function(code){res.send(JSON.stringify({"code":code}))}, {}, "201");
						} else {
							write_file("communities/" + req.query.community + ".json", community, function () {
								res.send(JSON.stringify({ "code": "000"}));
							}, function(code){res.send(JSON.stringify({"code":code}))});
						}
					}, function(code){res.send(JSON.stringify({"code":code}))});
				} else {
					res.send(JSON.stringify({ "code": "300" }));
				}
			}, function (code) { res.send(JSON.stringify({ "code": code })) });
		} else if (req.query.action == "admin_edit") {
			read_file("admin.json", function (admin) {
				if (req.query.admin == admin.master || admin.community[req.query.community].master == req.query.admin) {
					moderators = [];
					moderators_match = true;
					moderators_list = req.query.admin_list.split("\n");
					for (var moderator = 0; moderator < moderators_list.length; moderator ++) {
						moderator_match = moderators_list[moderator].match(/^([a-zA-Z0-9]{10}) ?: ?([a-zA-Z]+)$/);
						if (moderator_match) {
							moderators.push({"name" : moderator_match[2], "key" : moderator_match[1]});
						} else {
							moderators_match = false;
							break;
						}
					}
					if (moderators_match) {
						admin.community[req.query.community].moderator = moderators;
					}
					write_file("admin.json", admin, function () {
						res.send(JSON.stringify({ "code": "000"}));
					}, function (code) { res.send(JSON.stringify({ "code": code })) });
				} else {
					res.send(JSON.stringify({ "code": "300" }));
				}
			}, function (code) { res.send(JSON.stringify({ "code": code })) });
		} else if (req.query.action == "community_remove") {
			read_file("admin.json", function (admin) {
				if (req.query.admin == admin.master || admin.community[req.query.community].master == req.query.admin) {
					action_left = 3;
					read_file("validation.json", function(validation){
						delete validation[req.query.community];
						write_file("validation.json", validation, function () {
							action_left -= 1;
							if (action_left == 0){
								res.send(JSON.stringify({ "code": "000"}));
							}
						}, function(code){res.send(JSON.stringify({"code":code}))});
					}, function(code){res.send(JSON.stringify({"code":code}))});
					delete admin.community[req.query.community];
					write_file("admin.json", admin, function () {
						action_left -= 1;
						if (action_left == 0){
							res.send(JSON.stringify({ "code": "000"}));
						}
					}, function(code){res.send(JSON.stringify({"code":code}))});
					delete_file("communities/" + req.query.community + ".json", function () {
						action_left -= 1;
						if (action_left == 0){
							res.send(JSON.stringify({ "code": "000"}));
						}
					}, function(code){res.send(JSON.stringify({"code":code}))});
				} else {
					res.send(JSON.stringify({ "code": "300" }));
				}
			}, function (code) { res.send(JSON.stringify({ "code": code })) });
		} else if (req.query.action == "community_register") {
			read_file("admin.json", function (admin) {
				if (req.query.admin == admin.master) {
					amino.req_get("g/s/link-resolution", { "q": req.query.chat }, 4, function (response) {
						var path = response["linkInfoV2"]["extensions"]["linkInfo"]["fullPath"];
						var community = path.substring(0, path.indexOf("/"))
						var object_id = response["linkInfoV2"]["extensions"]["linkInfo"]["ndcId"];
						var chat_id = response["linkInfoV2"]["extensions"]["linkInfo"]["objectId"];
						var admin_key = "";
						var key_char = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
						for (u = 0; u < 10; u++) {
							admin_key = admin_key + key_char[Math.floor(Math.random() * 62)];
						}
						admin.community[community] = { "master": admin_key, "moderator": [] };
						action_left = 3;
						read_file("validation.json", function (validation) {
							validation[community] = {};
							write_file("validation.json", validation, function () {
								action_left -= 1;
								if (action_left == 0) {
									res.send(JSON.stringify({ "code": "000", "community": community, "admin": admin_key }));
								}
							}, function (code) { res.send(JSON.stringify({ "code": code })) });
						}, function (code) { res.send(JSON.stringify({ "code": code })) });
						write_file("admin.json", admin, function () {
							action_left -= 1;
							if (action_left == 0) {
								res.send(JSON.stringify({ "code": "000", "community": community, "admin": admin_key }));
							}
						}, function (code) { res.send(JSON.stringify({ "code": code })) });
						write_file("communities/" + community + ".json", { "id": object_id.toString(), "chat": req.query.chat, "chat_id": chat_id,"birthdays": "", "rep_min": 5000, "messages": { "0": ["Happy Birthday ${name}!"], "3": ["${name}'s birthday is in just 3 days!"], "validate_submit": "[CB]VALIDATION CODE${nl}${nl}Object: Submit${nl}Name: ${name}${nl}Birthday: ${month}/${day} UTC${utc}${nl}${nl}[i]Validate only if you are at the origin of the request.", "validate_edit": "[CB]VALIDATION CODE${nl}${nl}Object: Edit${nl}Name: ${name}${nl}Birthday: ${month}/${day} UTC${utc}${nl}${nl}[i]Validate only if you are at the origin of the request.", "validate_remove": "[CB]VALIDATION CODE${nl}${nl}Object: Remove${nl}${nl}[i]Validate only if you are at the origin of the request." } }, function () {
							action_left -= 1;
							if (action_left == 0) {
								res.send(JSON.stringify({ "code": "000", "community": community, "admin": admin_key }));
							}
						}, function (code) { res.send(JSON.stringify({ "code": code })) });
					}, function (code) { res.send(JSON.stringify({ "code": code })) });
				} else {
					res.send(JSON.stringify({ "code": "300" }));
				}
			}, function (code) { res.send(JSON.stringify({ "code": code })) });
		} else {
			res.send(JSON.stringify({ "code": "400" }));
		}
	}, function(code){
		res.send(JSON.stringify({ "code": code }));
	});
	functions.logger.log(JSON.stringify(req.query));
});

exports.bot = functions.runWith({timeoutSeconds: 540,memory: "128MB"}).region("europe-west1").pubsub.schedule("55 * * * *").onRun((context) => {
	read_file("account.json", function (account) {
		amino.account = account;
		var date = new Date();
		date.setUTCHours(date.getUTCHours() + 1);
		timezone = ((12 + date.getUTCHours()) % 24).toString();
		functions.logger.log("Bot beggin at timezone " + timezone + ".");
		var action_left = 1;
		if (timezone == 23) {
			action_left = 2;
		}
		var bot_id = amino.account.uid;
		read_file("schedule.json", function (schedule) {
			if (schedule[timezone].length == 0){
				action_left -= 1;
				if (action_left == 0){
					functions.logger.log("Bot ended with code 000.");
				}
			} else {
				for (profile_pos in schedule[timezone]){
					action_left += 1;
					var request = schedule[timezone][profile_pos];
					(function(request){
						setTimeout(function () {
							functions.logger.log("Bot wish : " + JSON.stringify(request))
							amino.req_post("x" + request.community + "/s/chat/thread/" + request.chat + "/message", {"type": 0, "content": request.message, "extensions": {"mentionedArray": request.mentions}, "attachedObject": { "objectId": request.user.object_id, "objectType": 0, "link": "http://aminoapps.com/p/" + request.user.id, "title": request.user.name }}, 4, function (response) {
								action_left -= 1;
								if (action_left == 0) {
									functions.logger.log("Bot ended with code 000.");
								}
							}, function (code) {functions.logger.log("Bot ended with code " + code + ".")});
						}, (Math.trunc(Date.now() / 3600000) + 1) * 3600000 - Date.now());
					}(request));
				}
				action_left -= 1;
			}
			var community_left = 0;				
		}, function(code){functions.logger.log("Bot ended with code " + code + ".")});
		if (timezone == 23) {
			var schedule = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
			var community_left = 0;				
			read_file("admin.json", function (admin) {
				for (community_id in admin.community) {
				community_left += 1;
					read_file("communities/" + community_id + ".json", function (community, remember) {
						amino.req_post("x" + community.id + "/s/check-in", {"timezone":0}, 1, function(response){}, function(code){});
						amino.req_post("x" + community.id + "/s/chat/thread/" + community.chat_id + "/member/" + bot_id, {}, 1, function(response){}, function(code){});
						var birthday_list  = community.birthdays.substring(0, community.birthdays.length - 1).split(";");
						for (birthday_pos = 0; birthday_pos < birthday_list.length; birthday_pos++) {
							var date_target = new Date(Date.UTC(date.getUTCFullYear(), encode_numbers.indexOf(birthday_list[birthday_pos].charAt(0)) - 1, encode_numbers.indexOf(birthday_list[birthday_pos].charAt(1)), 0, 0, 0, 0));
							if (date.getTime() > date_target.getTime()) {
								date_target.setUTCFullYear(date_target.getUTCFullYear() + 1);
							}
							var day_left = Math.trunc((date_target.getTime() - date.getTime()) / 86400000);
							for (var day_notified in community.notify_messages) {
								if (day_left == day_notified){
									let user_info = birthday_list[birthday_pos];
									let message = community.notify_messages[day_notified][Math.floor(Math.random() * community.notify_messages[day_notified].length)].split("${nl}").join("\n").split("${name}").join("\u200e\u200f@" + user_info.substring(40, user_info.indexOf("/")) + "\u200c\u202c\u202d").split("${month}").join(encode_numbers.indexOf(user_info.charAt(0))).split("${day}").join(encode_numbers.indexOf(user_info.charAt(1)));
									let mentions = [];
									for (mention_pos = 0; mention_pos < (message.split("\u200e\u200f@").length - 1); mention_pos++) {
										mentions.push({'uid': user_info.substring(4, 40)});
									} 
									schedule[encode_numbers.indexOf(user_info.substring(2, 3))].push({"community": community.id, "chat": community.chat_id, "message": message, "mentions" : mentions, "user":{"object_id": user_info.substring(4, 40), "id": user_info.substring(user_info.indexOf("/") + 1, user_info.length), "name": user_info.substring(40, user_info.indexOf("/"))}});
								}
							}
						}
						community_left -= 1;
						if (community_left == 0) {
							functions.logger.log("Schedule : " + JSON.stringify(schedule));
							write_file("schedule.json", schedule, function(response){
								action_left -= 1;
								if (action_left == 0) {
									functions.logger.log("Bot ended with code 000.");
									amino.login(2);
								}
							}, function(code){functions.logger.log("Bot ended with code " + code + ".")});
						}
					}, function(code){functions.logger.log("Bot ended with code " + code + ".")}, {"community": {"id": community_id}});
				}
			}, function(code){functions.logger.log("Bot ended with code " + code + ".")});
		}
	}, function(code){functions.logger.log("Bot ended with code " + code + ".")});
});