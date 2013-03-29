(function(e){"function"==typeof define&&define.amd?define(["jquery","jquery-ui"],e):e(jQuery)})(function(e){var t=".tower-container{position:relative;width:800px;height:280px;background-color:white;border:#3d9952 solid 3px;font-family:Helvetica,Arial,sans-serif;border-radius:20px;z-index:20;user-select:none;-webkit-user-select:none}.tower-banner{display:none;position:absolute;top:50px;left:200px;height:100px;width:400px;font-size:12px;background-color:#3d9952;color:white;text-align:center;padding:20px;border-radius:20px;border:solid 1px #c6f1a2;z-index:24}.tower-banner h1{font-size:30px}.tower-peg{display:inline-block;position:relative;margin:0;padding:0;margin-left:10px;width:250px;height:280px;background-image:-webkit-linear-gradient(left,transparent 52px,#53c66d 52px,#c6f1a2 72px,#53c66d 84px,transparent 88px);background-image:linear-gradient(left,transparent 25%,#c6f1a2 26%,#53c66d 34%,transparent 36%)}.tower-peg-top{height:30px;width:60px;position:absolute;top:0;left:50px;background-color:white;background-image:-webkit-radial-gradient(20px bottom,20px 13px,#c6f1a2 0,#53c66d 88%,rgba(0,0,0,0) 88%);background-image:radial-gradient(10% 10% at 25% bottom,#c6f1a2 22%,#3d9952 88%,rgba(0,0,0,0) 88%)}.tower-discs{list-style-type:none;margin:0;padding:0;position:absolute;bottom:0;width:230px;text-align:center;z-index:23;cursor:hand}.tower-disc{display:block;color:white;font-size:15px;line-height:25px;font-weight:bold;text-shadow:-1px -1px rgba(0,0,0,0.3);background-color:#4bd321;background-image:-webkit-linear-gradient(top,#c6f1a2 22%,#3d9952 88%);background-image:-moz-linear-gradient(top,#c6f1a2 22%,#3d9952 88%);background-image:-ms-linear-gradient(top,#c6f1a2 22%,#3d9952 88%);background-image:-o-linear-gradient(top,#c6f1a2 22%,#3d9952 88%);background-image:linear-gradient(to bottom,#c6f1a2 22%,#3d9952 88%);border:solid 1px #3d9952;border-radius:15px;margin:10px;height:25px}";e.tower=e.fn.tower=function(r,o){function i(t){function r(){if(e(".tower-disc",p).size()==l)return console.log(n+" / "+f),void 0;n++;var t,r,o=c.offset();t=d.eq(c.parent().parent().data(g?"leftPeg":"rightPeg")),r=t.offset(),r.left=r.left-o.left+c.position().left,c.animate({top:"-100px",left:r.left+"px"},{duration:1e3,complete:i(c,t)})}function o(){if(e(".tower-disc",p).size()==l)return console.log(n+" / "+f),void 0;n++;var t,r,o,i,s=[];d.each(function(){var t=e(".tower-disc:first",this);t.size()>0?s.push(parseInt(t.attr("data-tower-disc-size"),10)):s.push(1/0)});for(var c=0,g=s.length;g>c;c++)for(var w=0,u=s.length;u>w;w++)if(s[c]>1&&s[c]<s[w]){t=e(".tower-disc:first",d.eq(c)),i=t.offset(),r=d.eq(w);break}o=r.offset(),o.left=o.left-i.left+t.position().left,t.animate({top:"-100px",left:o.left+"px"},{duration:1e3,complete:a(t,r)})}function i(t,r){return function(){t.css({top:"",left:""}).prependTo(e(".tower-discs",r)),o()}}function a(t,o){return function(){t.css({top:"",left:""}).prependTo(e(".tower-discs",o)),r()}}for(var n=0,s=e(".tower-disc",t),d=e(".tower-peg",t),p=d.last(),c=s.first(),l=s.size(),f=Math.pow(2,l)-1,g=s.size()%2>0,w=0,u=d.size();u>w;w++)g?d.eq(w).data("leftPeg",0===w?u-1:w-1):d.eq(w).data("rightPeg",w===u-1?0:w+1);r()}function a(t,o){var i,a,n,s=0,d=45,p=110,c=230,l=r.min||3,f=t.size(),g=e('<div class="tower-container" />').append('<div class="tower-peg"><ul class="tower-discs" /><div class="tower-peg-top" /></div>').append('<div class="tower-peg"><ul class="tower-discs" /><div class="tower-peg-top" /></div>').append('<div class="tower-peg"><ul class="tower-discs" /><div class="tower-peg-top" /></div>').append('<div class="tower-banner"><h1>CONGRATULATIONS!</h1><p>Completed in <span class="tower-moves">0</span> moves (your score: <span class="tower-score">0</span>%)</p></div>').appendTo(o),w=e(".tower-peg",g),u=e(".tower-discs",w).first();if(l>f){for(var h=f;l>h;h++)t=t.add("<span>"+(h+1)+"</span>");f=t.size()}return g.add(w).css({height:d*(f+1)+"px"}),i=Math.pow(2,f)-1,n=Math.floor((c-p)/f),t.each(function(t){var r=e(this),o=r.text();o&&0!==o.length||(o=""+(t+1)),e('<li class="tower-disc" data-tower-disc-size="'+(t+1)+'">'+o+"</li>").css({width:p+t*n+"px"}).appendTo(u)}),a=e(".tower-disc"),w.last().addClass("winner"),w.droppable({accept:function(t){var r=e(".tower-disc:first",this).attr("data-tower-disc-size"),o=parseInt(t.attr("data-tower-disc-size"),0);return isNaN(r)||parseInt(r,10)>o?!0:!1},drop:function(t,r){var o,n,d=e(this);r.draggable.css({top:"",left:""}).prependTo(e(".tower-discs",this)).draggable("option","revert",!1),s++,d.hasClass("winner")&&(n=e(".tower-disc",d.parent()).size(),o=e(".tower-disc",d).size(),o===n&&(e(".tower-moves").text(s),e(".tower-score").text(Math.floor(100*(s/i))),e(".tower-banner").show(),a.draggable("disable")))},tolerance:"intersect",scope:"tower"}),a.draggable({cancel:".tower-discs .tower-disc:gt(0)",containment:".tower-container",cursor:"hand",scope:"tower",zIndex:3e3,start:function(){e(this).draggable("option","revert",!0)}}),t}var n=this;return r.source&&(n=e(r.source).children()),0===e("#tower-stylesheet").size()&&e('<style id="tower-stylesheet" />').html(t).appendTo("head"),a(n,e(r.container?r.container:r)),o&&i(e(r.container?r.container:r)),this}});