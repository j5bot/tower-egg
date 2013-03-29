(function ($) {
	var STYLE_SHEET = ".tower-container{position:relative;width:800px;height:280px;background-color:white;border:#3d9952 solid 3px;font-family:Helvetica,Arial,sans-serif;border-radius:20px;z-index:20;user-select:none;-webkit-user-select:none}.tower-banner{display:none;position:absolute;top:50px;left:200px;height:100px;width:400px;font-size:12px;background-color:#3d9952;color:white;text-align:center;padding:20px;border-radius:20px;border:solid 1px #c6f1a2;z-index:24}.tower-banner h1{font-size:30px}.tower-peg{display:inline-block;position:relative;margin:0;padding:0;margin-left:10px;width:250px;height:280px;background-image:-webkit-linear-gradient(left,transparent 52px,#53c66d 52px,#c6f1a2 72px,#53c66d 84px,transparent 88px);background-image:linear-gradient(left,transparent 25%,#c6f1a2 26%,#53c66d 34%,transparent 36%)}.tower-peg-top{height:30px;width:60px;position:absolute;top:0;left:50px;background-color:white;background-image:-webkit-radial-gradient(20px bottom,20px 13px,#c6f1a2 0,#53c66d 88%,rgba(0,0,0,0) 88%);background-image:radial-gradient(10% 10% at 25% bottom,#c6f1a2 22%,#3d9952 88%,rgba(0,0,0,0) 88%)}.tower-discs{list-style-type:none;margin:0;padding:0;position:absolute;bottom:0;width:230px;text-align:center;z-index:23;cursor:hand}.tower-disc{display:block;color:white;font-size:15px;line-height:25px;font-weight:bold;text-shadow:-1px -1px rgba(0,0,0,0.3);background-color:#4bd321;background-image:-webkit-linear-gradient(top,#c6f1a2 22%,#3d9952 88%);background-image:-moz-linear-gradient(top,#c6f1a2 22%,#3d9952 88%);background-image:-ms-linear-gradient(top,#c6f1a2 22%,#3d9952 88%);background-image:-o-linear-gradient(top,#c6f1a2 22%,#3d9952 88%);background-image:linear-gradient(to bottom,#c6f1a2 22%,#3d9952 88%);border:solid 1px #3d9952;border-radius:15px;margin:10px;height:25px}";
	/**
	 * Create a Lucas' Tower / Tower of Hanoi game in a container on the page
	 *
	 * @this   {jQuery collection}	source items, used for disc text and disc count or jQuery itself in which case source option is required
	 * @param  {Object} options		Container $()-able item or object hash options for the game source, minimum number of discs, and container:
	 *                              {
	 *                                  source: ".source",		// optional, anything $()-able, container whose children will be used as the source items
	 *                                  container: ".target",	// anything $()-able, container where the game will be placed
	 *                                  min: 3
	 *                              }
	 * @return {jQuery collection}	sourceItems
	 */
	$.tower = $.fn.tower = function (options, solve) {

		function solveTower (container) {
			var moves = 0,
				$towerDiscs = $(".tower-disc", container),
				$towerPegs = $(".tower-peg", container),
				$lastPeg = $towerPegs.last(),
				$smallDisc = $towerDiscs.first(),
				numberOfDiscs = $towerDiscs.size(),
				minimumMoves = Math.pow(2, numberOfDiscs) - 1,
				odd = $towerDiscs.size() % 2 > 0;

			function moveSmallDisc () {
				if ($(".tower-disc", $lastPeg).size() == numberOfDiscs) {
					console.log(moves + " / " + minimumMoves);
					return;
				}

				moves++;

				var $moveSmallDiscTo, moveSmallDiscToPosition, smallDiscPosition = $smallDisc.offset();

				$moveSmallDiscTo = $towerPegs.eq($smallDisc.parent().parent().data(odd ? "leftPeg" : "rightPeg"));
				moveSmallDiscToPosition = $moveSmallDiscTo.offset();
				moveSmallDiscToPosition.left = (moveSmallDiscToPosition.left - smallDiscPosition.left) + $smallDisc.position().left;
				$smallDisc.animate({
					top:  "-100px",
					left: moveSmallDiscToPosition.left + "px"
				},{
					duration: 1000,
					complete: makeAfterSmallDisc($smallDisc, $moveSmallDiscTo)
				});
			}

			function moveOtherDisc () {
				if ($(".tower-disc", $lastPeg).size() == numberOfDiscs) {
					console.log(moves + " / " + minimumMoves);
					return;
				}

				moves++;

				var $discToMove, $moveDiscTo, moveDiscToPosition, discPosition, discSizes = [];

				$towerPegs.each(function () {
					var $topDisc = $(".tower-disc:first", this);
					if ($topDisc.size() > 0) {
						discSizes.push(parseInt($topDisc.attr("data-tower-disc-size"), 10));
					} else {
						discSizes.push(Infinity);
					}
				});

				// i is the hopper, comparing against the pad, which is p :)
				for (var i = 0, l = discSizes.length; i < l; i++) {
					for (var p = 0, pl = discSizes.length; p < pl; p++) {
						if (discSizes[i] > 1 && discSizes[i] < discSizes[p]) {
							$discToMove = $(".tower-disc:first", $towerPegs.eq(i));
							discPosition = $discToMove.offset();
							$moveDiscTo = $towerPegs.eq(p);
							break;
						}
					}
				}

				moveDiscToPosition = $moveDiscTo.offset();
				moveDiscToPosition.left = (moveDiscToPosition.left - discPosition.left) + $discToMove.position().left;
				$discToMove.animate({
					top: "-100px",
					left: moveDiscToPosition.left + "px"
				},{
					duration: 1000,
					complete: makeAfterOtherDisc($discToMove, $moveDiscTo)
				});
			}

			function makeAfterSmallDisc($smallDisc, $moveSmallDiscTo) {
				return function () {
					$smallDisc.css({ top: "", left: "" }).prependTo($(".tower-discs", $moveSmallDiscTo));
					moveOtherDisc();
				};
			}

			function makeAfterOtherDisc($otherDisc, $moveDiscTo) {
				return function () {
					$otherDisc.css({ top: "", left: "" }).prependTo($(".tower-discs", $moveDiscTo));
					moveSmallDisc();
				};
			}

			for (var i = 0, l = $towerPegs.size(); i < l; i++) {
				if (odd) {
					$towerPegs.eq(i).data("leftPeg", i === 0 ? l - 1 : i - 1);
				} else {
					$towerPegs.eq(i).data("rightPeg", i === l - 1 ? 0 : i + 1);
				}
			}

			moveSmallDisc();
		}

		function initTower (sourceItems, container) {
			var moves = 0,
				DISC_HEIGHT = 45,
				MIN_WIDTH = 110, MAX_WIDTH = 230,
				minimumDiscs = options.min || 3,
				numberOfDiscs = sourceItems.size(),
				minimumMoves,
				$towerContainer = $('<div class="tower-container" />')
					.append('<div class="tower-peg"><ul class="tower-discs" /><div class="tower-peg-top" /></div>')
					.append('<div class="tower-peg"><ul class="tower-discs" /><div class="tower-peg-top" /></div>')
					.append('<div class="tower-peg"><ul class="tower-discs" /><div class="tower-peg-top" /></div>')
					.append('<div class="tower-banner"><h1>CONGRATULATIONS!</h1><p>Completed in <span class="tower-moves">0</span> moves (your score: <span class="tower-score">0</span>%)</p></div>')
					.appendTo(container),
				$towerPegs = $(".tower-peg", $towerContainer),
				$firstDiscs = $(".tower-discs", $towerPegs).first(),
				$towerDiscs, stepWidth;

			// pad to 3 elements
			if (numberOfDiscs < minimumDiscs) {
				for (var i = numberOfDiscs; i < minimumDiscs; i++) {
					sourceItems = sourceItems.add("<span>" + (i + 1) + "</span>");
				}
				numberOfDiscs = sourceItems.size();
			}
			$towerContainer.add($towerPegs).css({ height: (DISC_HEIGHT * (numberOfDiscs + 1)) + "px" });
			minimumMoves = Math.pow(2, numberOfDiscs) - 1;

			stepWidth = Math.floor((MAX_WIDTH - MIN_WIDTH) / numberOfDiscs);

			sourceItems.each(function (index) {
				var $sourceItem = $(this),
					sourceText = $sourceItem.text();

				if (!sourceText || sourceText.length === 0) {
					sourceText = (index + 1).toString();
				}

				$("<li class=\"tower-disc\" data-tower-disc-size=\"" + (index + 1) + "\">" + sourceText + "</li>").css({
					width: (MIN_WIDTH + (index * stepWidth)) + "px"
				}).appendTo($firstDiscs);
			});

			$towerDiscs = $(".tower-disc");

			$towerPegs.last().addClass("winner");

			$towerPegs.droppable({
				accept: function (draggable) {
					var topDiscSize = $(".tower-disc:first", this).attr("data-tower-disc-size"),
						draggableDiscSize = parseInt(draggable.attr("data-tower-disc-size"),0);

					if (isNaN(topDiscSize) || parseInt(topDiscSize, 10) > draggableDiscSize) {
						return true;
					}
					return false;
				},
				drop: function (event, ui) {
					var $this = $(this),
						discCount, totalDiscs;

					ui.draggable.css({
						top: "",
						left: ""
					}).prependTo($(".tower-discs", this)).draggable("option", "revert", false);

					moves++;

					if ($this.hasClass("winner")) {
						totalDiscs = $(".tower-disc", $this.parent()).size();
						discCount = $(".tower-disc", $this).size();
						if (discCount === totalDiscs) {
							$(".tower-moves").text(moves);
							$(".tower-score").text(Math.floor(moves / minimumMoves * 100));
							$(".tower-banner").show();
							$towerDiscs.draggable("disable");
						}
					}
				},
				tolerance: "intersect",
				scope: "tower"
			});

			$towerDiscs.draggable({
				cancel: ".tower-discs .tower-disc:gt(0)",
				containment: ".tower-container",
				cursor: "hand",
				scope: "tower",
				zIndex: 3000,
				start: function (event, ui) {
					$(this).draggable("option", "revert", true);
				}
			});

			return sourceItems;
		}

		var $elements = this;

		if (options.source) {
			$elements = $(options.source).children();
		}

		if ($("#tower-stylesheet").size() === 0) {
			$("<style id=\"tower-stylesheet\" />").html(STYLE_SHEET).appendTo("head");
		}

		initTower($elements, $(options.container ? options.container : options));

		if (solve) {
			solveTower($(options.container ? options.container : options));
		}

		return this;
	};

}(jQuery));