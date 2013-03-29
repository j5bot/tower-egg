			define(["jquery","jqueryui","tower"], (function () {
				function createTower(solve) {
					var userSource = $("#enter-source").val(),
						userDiscs = $("#no-of-discs").val(),
						options = {
							container: ".target"
						};

					if (userDiscs.length > 0) {
						userDiscs = parseInt(userDiscs, 10);
						options.source = "<div><span>1</span></div>";
						options.min = userDiscs;
					} else if (userSource.length > 0) {
						options.source = "<div>" + userSource + "</div>";
					} else {
						options.source = '<div><span>1</span><span>2</span><span>3</span></div>';
					}

					$(".target").empty();
					$.tower(options, solve); // or $(options.source).tower({ container: ".target", min: 3 };
				}

				$("#trigger-tower").click(function () {
					createTower();
				});

				$("#trigger-tower-solve").click(function () {
					createTower(true);
				});

				$("#reset-tower").click(function () {
					$(".target").empty();
					$("#enter-source").val("");
					$("#no-of-discs").val("");
				});

				// closure
				(function () {
					var clicks = 0, buffer = [];

					function clicker () {
						clicks++;
						$("#clicks").val(clicks);
						if (clicks === 10) {
							$(document).keypress(keyer);
							$(document).unbind("click", clicker);
						}
					}

					function keyer (event) {
						if (buffer.length > 5) {
							buffer.shift();
						}
						buffer.push(String.fromCharCode(event.keyCode));
						$("#keyer").val(buffer.join(""));
						if (buffer.join("") === "t0w3r") {
							createTower(false);
							$(document).unbind("keypress", keyer);
						}
					}

					$("#start-egg-mode").click(function () {
						$(document).click(clicker);
					});
				}());

			}));