!function(a,b){function g(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function h(a){return"undefined"==typeof a}if(a){var c={},d=a.TraceKit,e=[].slice,f="?";c.noConflict=function(){return a.TraceKit=d,c},c.wrap=function(b){function d(){try{return b.apply(this,arguments)}catch(a){throw c.report(a),a}}return d},c.report=function(){function j(a){p(),d.push(a)}function k(a){for(var b=d.length-1;b>=0;--b)d[b]===a&&d.splice(b,1)}function l(a,b){var f=null;if(!b||c.collectWindowErrors){for(var h in d)if(g(d,h))try{d[h].apply(null,[a].concat(e.call(arguments,2)))}catch(a){f=a}if(f)throw f}}function o(a,b,d,e,f){var g=null;if(i)c.computeStackTrace.augmentStackTraceWithInitialElement(i,b,d,a),q();else if(f)g=c.computeStackTrace(f),l(g,!0);else{var h={url:b,line:d,column:e};h.func=c.computeStackTrace.guessFunctionName(h.url,h.line),h.context=c.computeStackTrace.gatherContext(h.url,h.line),g={mode:"onerror",message:a,stack:[h]},l(g,!0)}return!!m&&m.apply(this,arguments)}function p(){n!==!0&&(m=a.onerror,a.onerror=o,n=!0)}function q(){var a=i,b=f;f=null,i=null,h=null,l.apply(null,[a,!1].concat(b))}function r(b){if(i){if(h===b)return;q()}var d=c.computeStackTrace(b);throw i=d,h=b,f=e.call(arguments,1),a.setTimeout(function(){h===b&&q()},d.incomplete?2e3:0),b}var m,n,d=[],f=null,h=null,i=null;return r.subscribe=j,r.unsubscribe=k,r}(),c.computeStackTrace=function(){function i(b){if(!c.remoteFetching)return"";try{var d=function(){try{return new a.XMLHttpRequest}catch(b){return new a.ActiveXObject("Microsoft.XMLHTTP")}},e=d();return e.open("GET",b,!1),e.send(""),e.responseText}catch(a){return""}}function j(b){if("string"!=typeof b)return[];if(!g(e,b)){var c="",d="";try{d=a.document.domain}catch(a){}var f=/(.*)\:\/\/([^:\/]+)([:\d]*)\/{0,1}([\s\S]*)/.exec(b);f&&f[2]===d&&(c=i(b)),e[b]=c?c.split("\n"):[]}return e[b]}function k(a,b){var k,c=/function ([^(]*)\(([^)]*)\)/,d=/['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,e="",g=10,i=j(a);if(!i.length)return f;for(var l=0;l<g;++l)if(e=i[b-l]+e,!h(e)){if(k=d.exec(e))return k[1];if(k=c.exec(e))return k[1]}return f}function l(a,b){var d=j(a);if(!d.length)return null;var e=[],f=Math.floor(c.linesOfContext/2),g=f+c.linesOfContext%2,i=Math.max(0,b-f-1),k=Math.min(d.length,b+g-1);b-=1;for(var l=i;l<k;++l)h(d[l])||e.push(d[l]);return e.length>0?e:null}function m(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g,"\\$&")}function n(a){return m(a).replace("<","(?:<|&lt;)").replace(">","(?:>|&gt;)").replace("&","(?:&|&amp;)").replace('"','(?:"|&quot;)').replace(/\s+/g,"\\s+")}function o(a,b){for(var c,d,e=0,f=b.length;e<f;++e)if((c=j(b[e])).length&&(c=c.join("\n"),d=a.exec(c)))return{url:b[e],line:c.substring(0,d.index).split("\n").length,column:d.index-c.lastIndexOf("\n",d.index)-1};return null}function p(a,b,c){var f,d=j(b),e=new RegExp("\\b"+m(a)+"\\b");return c-=1,d&&d.length>c&&(f=e.exec(d[c]))?f.index:null}function q(b){if(!h(a&&a.document)){for(var e,j,k,l,c=[a.location.href],d=a.document.getElementsByTagName("script"),f=""+b,g=/^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,i=/^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,p=0;p<d.length;++p){var q=d[p];q.src&&c.push(q.src)}if(k=g.exec(f)){var r=k[1]?"\\s+"+k[1]:"",s=k[2].split(",").join("\\s*,\\s*");e=m(k[3]).replace(/;$/,";?"),j=new RegExp("function"+r+"\\s*\\(\\s*"+s+"\\s*\\)\\s*{\\s*"+e+"\\s*}")}else j=new RegExp(m(f).replace(/\s+/g,"\\s+"));if(l=o(j,c))return l;if(k=i.exec(f)){var t=k[1];if(e=n(k[2]),j=new RegExp("on"+t+"=[\\'\"]\\s*"+e+"\\s*[\\'\"]","i"),l=o(j,c[0]))return l;if(j=new RegExp(e),l=o(j,c))return l}return null}}function r(a){if(!a.stack)return null;for(var i,j,b=/^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,c=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|\[native).*?)(?::(\d+))?(?::(\d+))?\s*$/i,d=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:ms-appx|https?|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,e=a.stack.split("\n"),g=[],m=/^(.*) is undefined$/.exec(a.message),n=0,o=e.length;n<o;++n){if(i=b.exec(e[n])){var q=i[2]&&i[2].indexOf("native")!==-1;j={url:q?null:i[2],func:i[1]||f,args:q?[i[2]]:[],line:i[3]?+i[3]:null,column:i[4]?+i[4]:null}}else if(i=d.exec(e[n]))j={url:i[2],func:i[1]||f,args:[],line:+i[3],column:i[4]?+i[4]:null};else{if(!(i=c.exec(e[n])))continue;j={url:i[3],func:i[1]||f,args:i[2]?i[2].split(","):[],line:i[4]?+i[4]:null,column:i[5]?+i[5]:null}}!j.func&&j.line&&(j.func=k(j.url,j.line)),j.line&&(j.context=l(j.url,j.line)),g.push(j)}return g.length?(g[0]&&g[0].line&&!g[0].column&&m?g[0].column=p(m[1],g[0].url,g[0].line):g[0].column||h(a.columnNumber)||(g[0].column=a.columnNumber+1),{mode:"stack",name:a.name,message:a.message,stack:g}):null}function s(a){var b=a.stacktrace;if(b){for(var g,c=/ line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,d=/ line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i,e=b.split("\n"),f=[],h=0;h<e.length;h+=2){var i=null;if((g=c.exec(e[h]))?i={url:g[2],line:+g[1],column:null,func:g[3],args:[]}:(g=d.exec(e[h]))&&(i={url:g[6],line:+g[1],column:+g[2],func:g[3]||g[4],args:g[5]?g[5].split(","):[]}),i){if(!i.func&&i.line&&(i.func=k(i.url,i.line)),i.line)try{i.context=l(i.url,i.line)}catch(a){}i.context||(i.context=[e[h+1]]),f.push(i)}}return f.length?{mode:"stacktrace",name:a.name,message:a.message,stack:f}:null}}function t(b){var c=b.message.split("\n");if(c.length<4)return null;var p,d=/^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,e=/^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,f=/^\s*Line (\d+) of function script\s*$/i,h=[],i=a&&a.document&&a.document.getElementsByTagName("script"),m=[];for(var q in i)g(i,q)&&!i[q].src&&m.push(i[q]);for(var r=2;r<c.length;r+=2){var s=null;if(p=d.exec(c[r]))s={url:p[2],func:p[3],args:[],line:+p[1],column:null};else if(p=e.exec(c[r])){s={url:p[3],func:p[4],args:[],line:+p[1],column:null};var t=+p[1],u=m[p[2]-1];if(u){var v=j(s.url);if(v){v=v.join("\n");var w=v.indexOf(u.innerText);w>=0&&(s.line=t+v.substring(0,w).split("\n").length)}}}else if(p=f.exec(c[r])){var x=a.location.href.replace(/#.*$/,""),y=new RegExp(n(c[r+1])),z=o(y,[x]);s={url:x,func:"",args:[],line:z?z.line:p[1],column:null}}if(s){s.func||(s.func=k(s.url,s.line));var A=l(s.url,s.line),B=A?A[Math.floor(A.length/2)]:null;A&&B.replace(/^\s*/,"")===c[r+1].replace(/^\s*/,"")?s.context=A:s.context=[c[r+1]],h.push(s)}}return h.length?{mode:"multiline",name:b.name,message:c[0],stack:h}:null}function u(a,b,c,d){var e={url:b,line:c};if(e.url&&e.line){a.incomplete=!1,e.func||(e.func=k(e.url,e.line)),e.context||(e.context=l(e.url,e.line));var f=/ '([^']+)' /.exec(d);if(f&&(e.column=p(f[1],e.url,e.line)),a.stack.length>0&&a.stack[0].url===e.url){if(a.stack[0].line===e.line)return!1;if(!a.stack[0].line&&a.stack[0].func===e.func)return a.stack[0].line=e.line,a.stack[0].context=e.context,!1}return a.stack.unshift(e),a.partial=!0,!0}return a.incomplete=!0,!1}function v(a,b){for(var i,j,l,d=/function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,e=[],g={},h=!1,m=v.caller;m&&!h;m=m.caller)if(m!==w&&m!==c.report){if(j={url:null,func:f,args:[],line:null,column:null},m.name?j.func=m.name:(i=d.exec(m.toString()))&&(j.func=i[1]),"undefined"==typeof j.func)try{j.func=i.input.substring(0,i.input.indexOf("{"))}catch(a){}if(l=q(m)){j.url=l.url,j.line=l.line,j.func===f&&(j.func=k(j.url,j.line));var n=/ '([^']+)' /.exec(a.message||a.description);n&&(j.column=p(n[1],l.url,l.line))}g[""+m]?h=!0:g[""+m]=!0,e.push(j)}b&&e.splice(0,b);var o={mode:"callers",name:a.name,message:a.message,stack:e};return u(o,a.sourceURL||a.fileName,a.line||a.lineNumber,a.message||a.description),o}function w(a,b){var c=null;b=null==b?0:+b;try{if(c=s(a))return c}catch(a){if(d)throw a}try{if(c=r(a))return c}catch(a){if(d)throw a}try{if(c=t(a))return c}catch(a){if(d)throw a}try{if(c=v(a,b+1))return c}catch(a){if(d)throw a}return{mode:"failed"}}function x(a){a=(null==a?0:+a)+1;try{throw new Error}catch(b){return w(b,a+1)}}var d=!1,e={};return w.augmentStackTraceWithInitialElement=u,w.guessFunctionName=k,w.gatherContext=l,w.ofCaller=x,w.getSource=j,w}(),c.extendToAsynchronousCallbacks=function(){var b=function(d){var f=a[d];a[d]=function(){var b=e.call(arguments),d=b[0];return"function"==typeof d&&(b[0]=c.wrap(d)),f.apply?f.apply(this,b):f(b[0],b[1])}};b("setTimeout"),b("setInterval")},c.remoteFetching||(c.remoteFetching=!0),c.collectWindowErrors||(c.collectWindowErrors=!0),(!c.linesOfContext||c.linesOfContext<1)&&(c.linesOfContext=11),"undefined"!=typeof module&&module.exports&&this.module!==module?module.exports=c:"function"==typeof define&&define.amd?define("TraceKit",[],c):a.TraceKit=c}}("undefined"!=typeof window?window:global);
