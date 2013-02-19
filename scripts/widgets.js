/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

//>>built
require({cache:{"dojo/string":function(){define("dojo/string",["./_base/kernel","./_base/lang"],function(_1,_2){_2.getObject("string",true,_1);_1.string.rep=function(_3,_4){if(_4<=0||!_3){return "";}var _5=[];for(;;){if(_4&1){_5.push(_3);}if(!(_4>>=1)){break;}_3+=_3;}return _5.join("");};_1.string.pad=function(_6,_7,ch,_8){if(!ch){ch="0";}var _9=String(_6),_a=_1.string.rep(ch,Math.ceil((_7-_9.length)/ch.length));return _8?_9+_a:_a+_9;};_1.string.substitute=function(_b,_c,_d,_e){_e=_e||_1.global;_d=_d?_2.hitch(_e,_d):function(v){return v;};return _b.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_f,key,_10){var _11=_2.getObject(key,false,_c);if(_10){_11=_2.getObject(_10,false,_e).call(_e,_11,key);}return _d(_11,key).toString();});};_1.string.trim=String.prototype.trim?_2.trim:function(str){str=str.replace(/^\s+/,"");for(var i=str.length-1;i>=0;i--){if(/\S/.test(str.charAt(i))){str=str.substring(0,i+1);break;}}return str;};return _1.string;});},"dijit/a11y":function(){define("dijit/a11y",["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/_base/sniff","./_base/manager","."],function(_12,_13,_14,dom,_15,_16,has,_17,_18){var _19=(_18._isElementShown=function(_1a){var s=_16.get(_1a);return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_15.get(_1a,"type")!="hidden");});_18.hasDefaultTabStop=function(_1b){switch(_1b.nodeName.toLowerCase()){case "a":return _15.has(_1b,"href");case "area":case "button":case "input":case "object":case "select":case "textarea":return true;case "iframe":var _1c;try{var _1d=_1b.contentDocument;if("designMode" in _1d&&_1d.designMode=="on"){return true;}_1c=_1d.body;}catch(e1){try{_1c=_1b.contentWindow.document.body;}catch(e2){return false;}}return _1c&&(_1c.contentEditable=="true"||(_1c.firstChild&&_1c.firstChild.contentEditable=="true"));default:return _1b.contentEditable=="true";}};var _1e=(_18.isTabNavigable=function(_1f){if(_15.get(_1f,"disabled")){return false;}else{if(_15.has(_1f,"tabIndex")){return _15.get(_1f,"tabIndex")>=0;}else{return _18.hasDefaultTabStop(_1f);}}});_18._getTabNavigable=function(_20){var _21,_22,_23,_24,_25,_26,_27={};function _28(_29){return _29&&_29.tagName.toLowerCase()=="input"&&_29.type&&_29.type.toLowerCase()=="radio"&&_29.name&&_29.name.toLowerCase();};var _2a=function(_2b){for(var _2c=_2b.firstChild;_2c;_2c=_2c.nextSibling){if(_2c.nodeType!=1||(has("ie")&&_2c.scopeName!=="HTML")||!_19(_2c)){continue;}if(_1e(_2c)){var _2d=_15.get(_2c,"tabIndex");if(!_15.has(_2c,"tabIndex")||_2d==0){if(!_21){_21=_2c;}_22=_2c;}else{if(_2d>0){if(!_23||_2d<_24){_24=_2d;_23=_2c;}if(!_25||_2d>=_26){_26=_2d;_25=_2c;}}}var rn=_28(_2c);if(_15.get(_2c,"checked")&&rn){_27[rn]=_2c;}}if(_2c.nodeName.toUpperCase()!="SELECT"){_2a(_2c);}}};if(_19(_20)){_2a(_20);}function rs(_2e){return _27[_28(_2e)]||_2e;};return {first:rs(_21),last:rs(_22),lowest:rs(_23),highest:rs(_25)};};_18.getFirstInTabbingOrder=function(_2f){var _30=_18._getTabNavigable(dom.byId(_2f));return _30.lowest?_30.lowest:_30.first;};_18.getLastInTabbingOrder=function(_31){var _32=_18._getTabNavigable(dom.byId(_31));return _32.last?_32.last:_32.highest;};return {hasDefaultTabStop:_18.hasDefaultTabStop,isTabNavigable:_18.isTabNavigable,_getTabNavigable:_18._getTabNavigable,getFirstInTabbingOrder:_18.getFirstInTabbingOrder,getLastInTabbingOrder:_18.getLastInTabbingOrder};});},"dijit/_WidgetBase":function(){define("dijit/_WidgetBase",["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./registry"],function(_33,_34,_35,_36,_37,_38,dom,_39,_3a,_3b,_3c,_3d,_3e,_3f,on,_40,_41,_42,win,_43){if(!_3e.isAsync){_40(0,function(){var _44=["dijit/_base/manager"];_33(_44);});}var _45={};function _46(obj){var ret={};for(var _47 in obj){ret[_47.toLowerCase()]=true;}return ret;};function _48(_49){return function(val){_39[val?"set":"remove"](this.domNode,_49,val);this._set(_49,val);};};return _38("dijit._WidgetBase",_41,{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_48("lang"),dir:"",_setDirAttr:_48("dir"),textDir:"","class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{},_blankGif:_36.blankGif||_33.toUrl("dojo/resources/blank.gif"),postscript:function(_4a,_4b){this.create(_4a,_4b);},create:function(_4c,_4d){this.srcNodeRef=dom.byId(_4d);this._connects=[];this._supportingWidgets=[];if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id;}if(_4c){this.params=_4c;_3f.mixin(this,_4c);}this.postMixInProperties();if(!this.id){this.id=_43.getUniqueId(this.declaredClass.replace(/\./g,"_"));}_43.add(this);this.buildRendering();if(this.domNode){this._applyAttributes();var _4e=this.srcNodeRef;if(_4e&&_4e.parentNode&&this.domNode!==_4e){_4e.parentNode.replaceChild(this.domNode,_4e);}}if(this.domNode){this.domNode.setAttribute("widgetId",this.id);}this.postCreate();if(this.srcNodeRef&&!this.srcNodeRef.parentNode){delete this.srcNodeRef;}this._created=true;},_applyAttributes:function(){var _4f=this.constructor,_50=_4f._setterAttrs;if(!_50){_50=(_4f._setterAttrs=[]);for(var _51 in this.attributeMap){_50.push(_51);}var _52=_4f.prototype;for(var _53 in _52){if(_53 in this.attributeMap){continue;}var _54="_set"+_53.replace(/^[a-z]|-[a-zA-Z]/g,function(c){return c.charAt(c.length-1).toUpperCase();})+"Attr";if(_54 in _52){_50.push(_53);}}}_34.forEach(_50,function(_55){if(this.params&&_55 in this.params){}else{if(this[_55]){this.set(_55,this[_55]);}}},this);for(var _56 in this.params){this.set(_56,this[_56]);}},postMixInProperties:function(){},buildRendering:function(){if(!this.domNode){this.domNode=this.srcNodeRef||_3b.create("div");}if(this.baseClass){var _57=this.baseClass.split(" ");if(!this.isLeftToRight()){_57=_57.concat(_34.map(_57,function(_58){return _58+"Rtl";}));}_3a.add(this.domNode,_57);}},postCreate:function(){},startup:function(){if(this._started){return;}this._started=true;_34.forEach(this.getChildren(),function(obj){if(!obj._started&&!obj._destroyed&&_3f.isFunction(obj.startup)){obj.startup();obj._started=true;}});},destroyRecursive:function(_59){this._beingDestroyed=true;this.destroyDescendants(_59);this.destroy(_59);},destroy:function(_5a){this._beingDestroyed=true;this.uninitialize();var c;while(c=this._connects.pop()){c.remove();}var w;while(w=this._supportingWidgets.pop()){if(w.destroyRecursive){w.destroyRecursive();}else{if(w.destroy){w.destroy();}}}this.destroyRendering(_5a);_43.remove(this.id);this._destroyed=true;},destroyRendering:function(_5b){if(this.bgIframe){this.bgIframe.destroy(_5b);delete this.bgIframe;}if(this.domNode){if(_5b){_39.remove(this.domNode,"widgetId");}else{_3b.destroy(this.domNode);}delete this.domNode;}if(this.srcNodeRef){if(!_5b){_3b.destroy(this.srcNodeRef);}delete this.srcNodeRef;}},destroyDescendants:function(_5c){_34.forEach(this.getChildren(),function(_5d){if(_5d.destroyRecursive){_5d.destroyRecursive(_5c);}});},uninitialize:function(){return false;},_setStyleAttr:function(_5e){var _5f=this.domNode;if(_3f.isObject(_5e)){_3d.set(_5f,_5e);}else{if(_5f.style.cssText){_5f.style.cssText+="; "+_5e;}else{_5f.style.cssText=_5e;}}this._set("style",_5e);},_attrToDom:function(_60,_61,_62){_62=arguments.length>=3?_62:this.attributeMap[_60];_34.forEach(_3f.isArray(_62)?_62:[_62],function(_63){var _64=this[_63.node||_63||"domNode"];var _65=_63.type||"attribute";switch(_65){case "attribute":if(_3f.isFunction(_61)){_61=_3f.hitch(this,_61);}var _66=_63.attribute?_63.attribute:(/^on[A-Z][a-zA-Z]*$/.test(_60)?_60.toLowerCase():_60);_39.set(_64,_66,_61);break;case "innerText":_64.innerHTML="";_64.appendChild(win.doc.createTextNode(_61));break;case "innerHTML":_64.innerHTML=_61;break;case "class":_3a.replace(_64,_61,this[_60]);break;}},this);},get:function(_67){var _68=this._getAttrNames(_67);return this[_68.g]?this[_68.g]():this[_67];},set:function(_69,_6a){if(typeof _69==="object"){for(var x in _69){this.set(x,_69[x]);}return this;}var _6b=this._getAttrNames(_69),_6c=this[_6b.s];if(_3f.isFunction(_6c)){var _6d=_6c.apply(this,Array.prototype.slice.call(arguments,1));}else{var _6e=this.focusNode&&!_3f.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_6e].tagName,_6f=_45[tag]||(_45[tag]=_46(this[_6e])),map=_69 in this.attributeMap?this.attributeMap[_69]:_6b.s in this?this[_6b.s]:((_6b.l in _6f&&typeof _6a!="function")||/^aria-|^data-|^role$/.test(_69))?_6e:null;if(map!=null){this._attrToDom(_69,_6a,map);}this._set(_69,_6a);}return _6d||this;},_attrPairNames:{},_getAttrNames:function(_70){var apn=this._attrPairNames;if(apn[_70]){return apn[_70];}var uc=_70.replace(/^[a-z]|-[a-zA-Z]/g,function(c){return c.charAt(c.length-1).toUpperCase();});return (apn[_70]={n:_70+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});},_set:function(_71,_72){var _73=this[_71];this[_71]=_72;if(this._watchCallbacks&&this._created&&_72!==_73){this._watchCallbacks(_71,_73,_72);}},on:function(_74,_75){return _35.after(this,this._onMap(_74),_75,true);},_onMap:function(_76){var _77=this.constructor,map=_77._onMap;if(!map){map=(_77._onMap={});for(var _78 in _77.prototype){if(/^on/.test(_78)){map[_78.replace(/^on/,"").toLowerCase()]=_78;}}}return map[_76.toLowerCase()];},toString:function(){return "[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]";},getChildren:function(){return this.containerNode?_43.findWidgets(this.containerNode):[];},getParent:function(){return _43.getEnclosingWidget(this.domNode.parentNode);},connect:function(obj,_79,_7a){var _7b=_37.connect(obj,_79,this,_7a);this._connects.push(_7b);return _7b;},disconnect:function(_7c){var i=_34.indexOf(this._connects,_7c);if(i!=-1){_7c.remove();this._connects.splice(i,1);}},subscribe:function(t,_7d){var _7e=_42.subscribe(t,_3f.hitch(this,_7d));this._connects.push(_7e);return _7e;},unsubscribe:function(_7f){this.disconnect(_7f);},isLeftToRight:function(){return this.dir?(this.dir=="ltr"):_3c.isBodyLtr();},isFocusable:function(){return this.focus&&(_3d.get(this.domNode,"display")!="none");},placeAt:function(_80,_81){if(_80.declaredClass&&_80.addChild){_80.addChild(this,_81);}else{_3b.place(this.domNode,_80,_81);}return this;},getTextDir:function(_82,_83){return _83;},applyTextDir:function(){}});});},"dojo/touch":function(){define("dojo/touch",["./_base/kernel","./on","./has","./mouse"],function(_84,on,has,_85){function _86(_87){return function(_88,_89){return on(_88,_87,_89);};};var _8a=has("touch");_84.touch={press:_86(_8a?"touchstart":"mousedown"),move:_86(_8a?"touchmove":"mousemove"),release:_86(_8a?"touchend":"mouseup"),cancel:_8a?_86("touchcancel"):_85.leave};return _84.touch;});},"dojo/io/script":function(){define("dojo/io/script",["../main"],function(_8b){_8b.getObject("io",true,_8b);var _8c=_8b.isIE?"onreadystatechange":"load",_8d=/complete|loaded/;_8b.io.script={get:function(_8e){var dfd=this._makeScriptDeferred(_8e);var _8f=dfd.ioArgs;_8b._ioAddQueryToUrl(_8f);_8b._ioNotifyStart(dfd);if(this._canAttach(_8f)){var _90=this.attach(_8f.id,_8f.url,_8e.frameDoc);if(!_8f.jsonp&&!_8f.args.checkString){var _91=_8b.connect(_90,_8c,function(evt){if(evt.type=="load"||_8d.test(_90.readyState)){_8b.disconnect(_91);_8f.scriptLoaded=evt;}});}}_8b._ioWatch(dfd,this._validCheck,this._ioCheck,this._resHandle);return dfd;},attach:function(id,url,_92){var doc=(_92||_8b.doc);var _93=doc.createElement("script");_93.type="text/javascript";_93.src=url;_93.id=id;_93.async=true;_93.charset="utf-8";return doc.getElementsByTagName("head")[0].appendChild(_93);},remove:function(id,_94){_8b.destroy(_8b.byId(id,_94));if(this["jsonp_"+id]){delete this["jsonp_"+id];}},_makeScriptDeferred:function(_95){var dfd=_8b._ioSetArgs(_95,this._deferredCancel,this._deferredOk,this._deferredError);var _96=dfd.ioArgs;_96.id=_8b._scopeName+"IoScript"+(this._counter++);_96.canDelete=false;_96.jsonp=_95.callbackParamName||_95.jsonp;if(_96.jsonp){_96.query=_96.query||"";if(_96.query.length>0){_96.query+="&";}_96.query+=_96.jsonp+"="+(_95.frameDoc?"parent.":"")+_8b._scopeName+".io.script.jsonp_"+_96.id+"._jsonpCallback";_96.frameDoc=_95.frameDoc;_96.canDelete=true;dfd._jsonpCallback=this._jsonpCallback;this["jsonp_"+_96.id]=dfd;}return dfd;},_deferredCancel:function(dfd){dfd.canceled=true;if(dfd.ioArgs.canDelete){_8b.io.script._addDeadScript(dfd.ioArgs);}},_deferredOk:function(dfd){var _97=dfd.ioArgs;if(_97.canDelete){_8b.io.script._addDeadScript(_97);}return _97.json||_97.scriptLoaded||_97;},_deferredError:function(_98,dfd){if(dfd.ioArgs.canDelete){if(_98.dojoType=="timeout"){_8b.io.script.remove(dfd.ioArgs.id,dfd.ioArgs.frameDoc);}else{_8b.io.script._addDeadScript(dfd.ioArgs);}}return _98;},_deadScripts:[],_counter:1,_addDeadScript:function(_99){_8b.io.script._deadScripts.push({id:_99.id,frameDoc:_99.frameDoc});_99.frameDoc=null;},_validCheck:function(dfd){var _9a=_8b.io.script;var _9b=_9a._deadScripts;if(_9b&&_9b.length>0){for(var i=0;i<_9b.length;i++){_9a.remove(_9b[i].id,_9b[i].frameDoc);_9b[i].frameDoc=null;}_8b.io.script._deadScripts=[];}return true;},_ioCheck:function(dfd){var _9c=dfd.ioArgs;if(_9c.json||(_9c.scriptLoaded&&!_9c.args.checkString)){return true;}var _9d=_9c.args.checkString;return _9d&&eval("typeof("+_9d+") != 'undefined'");},_resHandle:function(dfd){if(_8b.io.script._ioCheck(dfd)){dfd.callback(dfd);}else{dfd.errback(new Error("inconceivable dojo.io.script._resHandle error"));}},_canAttach:function(_9e){return true;},_jsonpCallback:function(_9f){this.ioArgs.json=_9f;}};return _8b.io.script;});},"dojo/Stateful":function(){define("dojo/Stateful",["./_base/kernel","./_base/declare","./_base/lang","./_base/array"],function(_a0,_a1,_a2,_a3){return _a0.declare("dojo.Stateful",null,{postscript:function(_a4){if(_a4){_a2.mixin(this,_a4);}},get:function(_a5){return this[_a5];},set:function(_a6,_a7){if(typeof _a6==="object"){for(var x in _a6){this.set(x,_a6[x]);}return this;}var _a8=this[_a6];this[_a6]=_a7;if(this._watchCallbacks){this._watchCallbacks(_a6,_a8,_a7);}return this;},watch:function(_a9,_aa){var _ab=this._watchCallbacks;if(!_ab){var _ac=this;_ab=this._watchCallbacks=function(_ad,_ae,_af,_b0){var _b1=function(_b2){if(_b2){_b2=_b2.slice();for(var i=0,l=_b2.length;i<l;i++){try{_b2[i].call(_ac,_ad,_ae,_af);}catch(e){console.error(e);}}}};_b1(_ab["_"+_ad]);if(!_b0){_b1(_ab["*"]);}};}if(!_aa&&typeof _a9==="function"){_aa=_a9;_a9="*";}else{_a9="_"+_a9;}var _b3=_ab[_a9];if(typeof _b3!=="object"){_b3=_ab[_a9]=[];}_b3.push(_aa);return {unwatch:function(){_b3.splice(_a3.indexOf(_b3,_aa),1);}};}});});},"dijit/_base/manager":function(){define("dijit/_base/manager",["dojo/_base/array","dojo/_base/config","../registry",".."],function(_b4,_b5,_b6,_b7){_b4.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(_b8){_b7[_b8]=_b6[_b8];});_b7.defaultDuration=_b5["defaultDuration"]||200;return _b7;});},"dojo/text":function(){define("dojo/text",["./_base/kernel","require","./has","./_base/xhr"],function(_b9,_ba,has,xhr){var _bb;if(1){_bb=function(url,_bc,_bd){xhr("GET",{url:url,sync:!!_bc,load:_bd});};}else{if(_ba.getText){_bb=_ba.getText;}else{console.error("dojo/text plugin failed to load because loader does not support getText");}}var _be={},_bf=function(_c0){if(_c0){_c0=_c0.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");var _c1=_c0.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);if(_c1){_c0=_c1[1];}}else{_c0="";}return _c0;},_c2={},_c3={},_c4={dynamic:true,normalize:function(id,_c5){var _c6=id.split("!"),url=_c6[0];return (/^\./.test(url)?_c5(url):url)+(_c6[1]?"!"+_c6[1]:"");},load:function(id,_c7,_c8){var _c9=id.split("!"),_ca=_c9.length>1,_cb=_c9[0],url=_c7.toUrl(_c9[0]),_cc=_c2,_cd=function(_ce){_c8(_ca?_bf(_ce):_ce);};if(_cb in _be){_cc=_be[_cb];}else{if(url in _c7.cache){_cc=_c7.cache[url];}else{if(url in _be){_cc=_be[url];}}}if(_cc===_c2){if(_c3[url]){_c3[url].push(_cd);}else{var _cf=_c3[url]=[_cd];_bb(url,!_c7.async,function(_d0){_be[_cb]=_be[url]=_d0;for(var i=0;i<_cf.length;){_cf[i++](_d0);}delete _c3[url];});}}else{_cd(_cc);}}};_b9.cache=function(_d1,url,_d2){var key;if(typeof _d1=="string"){if(/\//.test(_d1)){key=_d1;_d2=url;}else{key=_ba.toUrl(_d1.replace(/\./g,"/")+(url?("/"+url):""));}}else{key=_d1+"";_d2=url;}var val=(_d2!=undefined&&typeof _d2!="string")?_d2.value:_d2,_d3=_d2&&_d2.sanitize;if(typeof val=="string"){_be[key]=val;return _d3?_bf(val):val;}else{if(val===null){delete _be[key];return null;}else{if(!(key in _be)){_bb(key,true,function(_d4){_be[key]=_d4;});}return _d3?_bf(_be[key]):_be[key];}}};return _c4;});},"dijit/registry":function(){define("dijit/registry",["dojo/_base/array","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window","."],function(_d5,has,_d6,win,_d7){var _d8={},_d9={};var _da={length:0,add:function(_db){if(_d9[_db.id]){throw new Error("Tried to register widget with id=="+_db.id+" but that id is already registered");}_d9[_db.id]=_db;this.length++;},remove:function(id){if(_d9[id]){delete _d9[id];this.length--;}},byId:function(id){return typeof id=="string"?_d9[id]:id;},byNode:function(_dc){return _d9[_dc.getAttribute("widgetId")];},toArray:function(){var ar=[];for(var id in _d9){ar.push(_d9[id]);}return ar;},getUniqueId:function(_dd){var id;do{id=_dd+"_"+(_dd in _d8?++_d8[_dd]:_d8[_dd]=0);}while(_d9[id]);return _d7._scopeName=="dijit"?id:_d7._scopeName+"_"+id;},findWidgets:function(_de){var _df=[];function _e0(_e1){for(var _e2=_e1.firstChild;_e2;_e2=_e2.nextSibling){if(_e2.nodeType==1){var _e3=_e2.getAttribute("widgetId");if(_e3){var _e4=_d9[_e3];if(_e4){_df.push(_e4);}}else{_e0(_e2);}}}};_e0(_de);return _df;},_destroyAll:function(){_d7._curFocus=null;_d7._prevFocus=null;_d7._activeStack=[];_d5.forEach(_da.findWidgets(win.body()),function(_e5){if(!_e5._destroyed){if(_e5.destroyRecursive){_e5.destroyRecursive();}else{if(_e5.destroy){_e5.destroy();}}}});},getEnclosingWidget:function(_e6){while(_e6){var id=_e6.getAttribute&&_e6.getAttribute("widgetId");if(id){return _d9[id];}_e6=_e6.parentNode;}return null;},_hash:_d9};if(has("ie")){_d6.addOnWindowUnload(function(){_da._destroyAll();});}_d7.registry=_da;return _da;});},"dojo/uacss":function(){define("dojo/uacss",["./dom-geometry","./_base/lang","./ready","./_base/sniff","./_base/window"],function(_e7,_e8,_e9,has,_ea){var _eb=_ea.doc.documentElement,ie=has("ie"),_ec=has("opera"),maj=Math.floor,ff=has("ff"),_ed=_e7.boxModel.replace(/-/,""),_ee={"dj_ie":ie,"dj_ie6":maj(ie)==6,"dj_ie7":maj(ie)==7,"dj_ie8":maj(ie)==8,"dj_ie9":maj(ie)==9,"dj_quirks":has("quirks"),"dj_iequirks":ie&&has("quirks"),"dj_opera":_ec,"dj_khtml":has("khtml"),"dj_webkit":has("webkit"),"dj_safari":has("safari"),"dj_chrome":has("chrome"),"dj_gecko":has("mozilla"),"dj_ff3":maj(ff)==3};_ee["dj_"+_ed]=true;var _ef="";for(var clz in _ee){if(_ee[clz]){_ef+=clz+" ";}}_eb.className=_e8.trim(_eb.className+" "+_ef);_e9(90,function(){if(!_e7.isBodyLtr()){var _f0="dj_rtl dijitRtl "+_ef.replace(/ /g,"-rtl ");_eb.className=_e8.trim(_eb.className+" "+_f0+"dj_rtl dijitRtl "+_ef.replace(/ /g,"-rtl "));}});return has;});},"dojo/window":function(){define("dojo/window",["./_base/kernel","./_base/lang","./_base/sniff","./_base/window","./dom","./dom-geometry","./dom-style"],function(_f1,_f2,has,_f3,dom,_f4,_f5){_f2.getObject("window",true,_f1);_f1.window.getBox=function(){var _f6=(_f3.doc.compatMode=="BackCompat")?_f3.body():_f3.doc.documentElement;var _f7=_f4.docScroll();var _f8=_f3.doc.parentWindow||_f3.doc.defaultView;return {l:_f7.x,t:_f7.y,w:_f8.innerWidth||_f6.clientWidth,h:_f8.innerHeight||_f6.clientHeight};};_f1.window.get=function(doc){if(has("ie")&&window!==document.parentWindow){doc.parentWindow.execScript("document._parentWindow = window;","Javascript");var win=doc._parentWindow;doc._parentWindow=null;return win;}return doc.parentWindow||doc.defaultView;};_f1.window.scrollIntoView=function(_f9,pos){try{_f9=dom.byId(_f9);var doc=_f9.ownerDocument||_f3.doc,_fa=doc.body||_f3.body(),_fb=doc.documentElement||_fa.parentNode,_fc=has("ie"),_fd=has("webkit");if((!(has("mozilla")||_fc||_fd||has("opera"))||_f9==_fa||_f9==_fb)&&(typeof _f9.scrollIntoView!="undefined")){_f9.scrollIntoView(false);return;}var _fe=doc.compatMode=="BackCompat",_ff=(_fc>=9&&_f9.ownerDocument.parentWindow.frameElement)?((_fb.clientHeight>0&&_fb.clientWidth>0&&(_fa.clientHeight==0||_fa.clientWidth==0||_fa.clientHeight>_fb.clientHeight||_fa.clientWidth>_fb.clientWidth))?_fb:_fa):(_fe?_fa:_fb),_100=_fd?_fa:_ff,_101=_ff.clientWidth,_102=_ff.clientHeight,rtl=!_f4.isBodyLtr(),_103=pos||_f4.position(_f9),el=_f9.parentNode,_104=function(el){return ((_fc<=6||(_fc&&_fe))?false:(_f5.get(el,"position").toLowerCase()=="fixed"));};if(_104(_f9)){return;}while(el){if(el==_fa){el=_100;}var _105=_f4.position(el),_106=_104(el);if(el==_100){_105.w=_101;_105.h=_102;if(_100==_fb&&_fc&&rtl){_105.x+=_100.offsetWidth-_105.w;}if(_105.x<0||!_fc){_105.x=0;}if(_105.y<0||!_fc){_105.y=0;}}else{var pb=_f4.getPadBorderExtents(el);_105.w-=pb.w;_105.h-=pb.h;_105.x+=pb.l;_105.y+=pb.t;var _107=el.clientWidth,_108=_105.w-_107;if(_107>0&&_108>0){_105.w=_107;_105.x+=(rtl&&(_fc||el.clientLeft>pb.l))?_108:0;}_107=el.clientHeight;_108=_105.h-_107;if(_107>0&&_108>0){_105.h=_107;}}if(_106){if(_105.y<0){_105.h+=_105.y;_105.y=0;}if(_105.x<0){_105.w+=_105.x;_105.x=0;}if(_105.y+_105.h>_102){_105.h=_102-_105.y;}if(_105.x+_105.w>_101){_105.w=_101-_105.x;}}var l=_103.x-_105.x,t=_103.y-Math.max(_105.y,0),r=l+_103.w-_105.w,bot=t+_103.h-_105.h;if(r*l>0){var s=Math[l<0?"max":"min"](l,r);if(rtl&&((_fc==8&&!_fe)||_fc>=9)){s=-s;}_103.x+=el.scrollLeft;el.scrollLeft+=s;_103.x-=el.scrollLeft;}if(bot*t>0){_103.y+=el.scrollTop;el.scrollTop+=Math[t<0?"max":"min"](t,bot);_103.y-=el.scrollTop;}el=(el!=_100)&&!_106&&el.parentNode;}}catch(error){console.error("scrollIntoView: "+error);_f9.scrollIntoView(false);}};return _f1.window;});},"dijit/_OnDijitClickMixin":function(){define("dijit/_OnDijitClickMixin",["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(on,_109,keys,_10a,has,_10b,win){var _10c=null;if(has("ie")){(function(){var _10d=function(evt){_10c=evt.srcElement;};win.doc.attachEvent("onkeydown",_10d);_10b.addOnWindowUnload(function(){win.doc.detachEvent("onkeydown",_10d);});})();}else{win.doc.addEventListener("keydown",function(evt){_10c=evt.target;},true);}var _10e=function(node,_10f){if(/input|button/i.test(node.nodeName)){return on(node,"click",_10f);}else{function _110(e){return (e.keyCode==keys.ENTER||e.keyCode==keys.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey;};var _111=[on(node,"keypress",function(e){if(_110(e)){_10c=e.target;e.preventDefault();}}),on(node,"keyup",function(e){if(_110(e)&&e.target==_10c){_10c=null;_10f.call(this,e);}}),on(node,"click",function(e){_10f.call(this,e);})];return {remove:function(){_109.forEach(_111,function(h){h.remove();});}};}};return _10a("dijit._OnDijitClickMixin",null,{connect:function(obj,_112,_113){return this.inherited(arguments,[obj,_112=="ondijitclick"?_10e:_112,_113]);}});});},"dijit/hccss":function(){define("dijit/hccss",["require","dojo/_base/config","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/ready","dojo/_base/sniff","dojo/_base/window"],function(_114,_115,_116,_117,_118,_119,has,win){if(has("ie")||has("mozilla")){_119(90,function(){var div=_117.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(_115.blankGif||_114.toUrl("dojo/resources/blank.gif"))+"\");"}},win.body());var cs=_118.getComputedStyle(div);if(cs){var _11a=cs.backgroundImage;var _11b=(cs.borderTopColor==cs.borderRightColor)||(_11a!=null&&(_11a=="none"||_11a=="url(invalid-url:)"));if(_11b){_116.add(win.body(),"dijit_a11y");}if(has("ie")){div.outerHTML="";}else{win.body().removeChild(div);}}});}});},"dijit/_TemplatedMixin":function(){define("dijit/_TemplatedMixin",["dojo/_base/lang","dojo/touch","./_WidgetBase","dojo/string","dojo/cache","dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(lang,_11c,_11d,_11e,_11f,_120,_121,_122,has,_123,win){var _124=_121("dijit._TemplatedMixin",null,{templateString:null,templatePath:null,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){this._attachPoints=[];this._attachEvents=[];},_stringRepl:function(tmpl){var _125=this.declaredClass,_126=this;return _11e.substitute(tmpl,this,function(_127,key){if(key.charAt(0)=="!"){_127=lang.getObject(key.substr(1),false,_126);}if(typeof _127=="undefined"){throw new Error(_125+" template:"+key);}if(_127==null){return "";}return key.charAt(0)=="!"?_127:_127.toString().replace(/"/g,"&quot;");},this);},buildRendering:function(){if(!this.templateString){this.templateString=_11f(this.templatePath,{sanitize:true});}var _128=_124.getCachedTemplate(this.templateString,this._skipNodeCache);var node;if(lang.isString(_128)){node=_122.toDom(this._stringRepl(_128));if(node.nodeType!=1){throw new Error("Invalid template: "+_128);}}else{node=_128.cloneNode(true);}this.domNode=node;this.inherited(arguments);this._attachTemplateNodes(node,function(n,p){return n.getAttribute(p);});this._beforeFillContent();this._fillContent(this.srcNodeRef);},_beforeFillContent:function(){},_fillContent:function(_129){var dest=this.containerNode;if(_129&&dest){while(_129.hasChildNodes()){dest.appendChild(_129.firstChild);}}},_attachTemplateNodes:function(_12a,_12b){var _12c=lang.isArray(_12a)?_12a:(_12a.all||_12a.getElementsByTagName("*"));var x=lang.isArray(_12a)?0:-1;for(;x<_12c.length;x++){var _12d=(x==-1)?_12a:_12c[x];if(this.widgetsInTemplate&&(_12b(_12d,"dojoType")||_12b(_12d,"data-dojo-type"))){continue;}var _12e=_12b(_12d,"dojoAttachPoint")||_12b(_12d,"data-dojo-attach-point");if(_12e){var _12f,_130=_12e.split(/\s*,\s*/);while((_12f=_130.shift())){if(lang.isArray(this[_12f])){this[_12f].push(_12d);}else{this[_12f]=_12d;}this._attachPoints.push(_12f);}}var _131=_12b(_12d,"dojoAttachEvent")||_12b(_12d,"data-dojo-attach-event");if(_131){var _132,_133=_131.split(/\s*,\s*/);var trim=lang.trim;while((_132=_133.shift())){if(_132){var _134=null;if(_132.indexOf(":")!=-1){var _135=_132.split(":");_132=trim(_135[0]);_134=trim(_135[1]);}else{_132=trim(_132);}if(!_134){_134=_132;}this._attachEvents.push(this.connect(_12d,_11c[_132]||_132,_134));}}}}},destroyRendering:function(){_120.forEach(this._attachPoints,function(_136){delete this[_136];},this);this._attachPoints=[];_120.forEach(this._attachEvents,this.disconnect,this);this._attachEvents=[];this.inherited(arguments);}});_124._templateCache={};_124.getCachedTemplate=function(_137,_138){var _139=_124._templateCache;var key=_137;var _13a=_139[key];if(_13a){try{if(!_13a.ownerDocument||_13a.ownerDocument==win.doc){return _13a;}}catch(e){}_122.destroy(_13a);}_137=_11e.trim(_137);if(_138||_137.match(/\$\{([^\}]+)\}/g)){return (_139[key]=_137);}else{var node=_122.toDom(_137);if(node.nodeType!=1){throw new Error("Invalid template: "+_137);}return (_139[key]=node);}};if(has("ie")){_123.addOnWindowUnload(function(){var _13b=_124._templateCache;for(var key in _13b){var _13c=_13b[key];if(typeof _13c=="object"){_122.destroy(_13c);}delete _13b[key];}});}lang.extend(_11d,{dojoAttachEvent:"",dojoAttachPoint:""});return _124;});},"dijit/_Widget":function(){define("dijit/_Widget",["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_13d,_13e,_13f,_140,_141,lang,_142,_143,_144,_145,_146,_147){function _148(){};function _149(_14a){return function(obj,_14b,_14c,_14d){if(obj&&typeof _14b=="string"&&obj[_14b]==_148){return obj.on(_14b.substring(2).toLowerCase(),lang.hitch(_14c,_14d));}return _14a.apply(_13f,arguments);};};_13d.around(_13f,"connect",_149);if(_141.connect){_13d.around(_141,"connect",_149);}var _14e=_140("dijit._Widget",[_145,_146,_147],{onClick:_148,onDblClick:_148,onKeyDown:_148,onKeyPress:_148,onKeyUp:_148,onMouseDown:_148,onMouseMove:_148,onMouseOut:_148,onMouseOver:_148,onMouseLeave:_148,onMouseEnter:_148,onMouseUp:_148,constructor:function(_14f){this._toConnect={};for(var name in _14f){if(this[name]===_148){this._toConnect[name.replace(/^on/,"").toLowerCase()]=_14f[name];delete _14f[name];}}},postCreate:function(){this.inherited(arguments);for(var name in this._toConnect){this.on(name,this._toConnect[name]);}delete this._toConnect;},on:function(type,func){if(this[this._onMap(type)]===_148){return _13f.connect(this.domNode,type.toLowerCase(),this,func);}return this.inherited(arguments);},_setFocusedAttr:function(val){this._focused=val;this._set("focused",val);},setAttribute:function(attr,_150){_141.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");this.set(attr,_150);},attr:function(name,_151){if(_13e.isDebug){var _152=arguments.callee._ach||(arguments.callee._ach={}),_153=(arguments.callee.caller||"unknown caller").toString();if(!_152[_153]){_141.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_153,"","2.0");_152[_153]=true;}}var args=arguments.length;if(args>=2||typeof name==="object"){return this.set.apply(this,arguments);}else{return this.get(name);}},getDescendants:function(){_141.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");return this.containerNode?_142("[widgetId]",this.containerNode).map(_144.byNode):[];},_onShow:function(){this.onShow();},onShow:function(){},onHide:function(){},onClose:function(){return true;}});if(!_141.isAsync){_143(0,function(){var _154=["dijit/_base"];require(_154);});}return _14e;});},"dijit/_FocusMixin":function(){define("dijit/_FocusMixin",["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(_155,_156,_157,lang){lang.extend(_156,{focused:false,onFocus:function(){},onBlur:function(){},_onFocus:function(){this.onFocus();},_onBlur:function(){this.onBlur();}});return _157("dijit._FocusMixin",null,{_focusManager:_155});});},"dijit/focus":function(){define("dijit/focus",["dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/Evented","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/sniff","dojo/Stateful","dojo/_base/unload","dojo/_base/window","dojo/window","./a11y","./registry","."],function(_158,_159,dom,_15a,_15b,_15c,lang,on,_15d,has,_15e,_15f,win,_160,a11y,_161,_162){var _163=_159([_15e,_15c],{curNode:null,activeStack:[],constructor:function(){var _164=lang.hitch(this,function(node){if(dom.isDescendant(this.curNode,node)){this.set("curNode",null);}if(dom.isDescendant(this.prevNode,node)){this.set("prevNode",null);}});_158.before(_15b,"empty",_164);_158.before(_15b,"destroy",_164);},registerIframe:function(_165){return this.registerWin(_165.contentWindow,_165);},registerWin:function(_166,_167){var _168=this;var _169=function(evt){_168._justMouseDowned=true;setTimeout(function(){_168._justMouseDowned=false;},0);if(has("ie")&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){return;}_168._onTouchNode(_167||evt.target||evt.srcElement,"mouse");};var doc=has("ie")?_166.document.documentElement:_166.document;if(doc){if(has("ie")){_166.document.body.attachEvent("onmousedown",_169);var _16a=function(evt){var tag=evt.srcElement.tagName.toLowerCase();if(tag=="#document"||tag=="body"){return;}if(a11y.isTabNavigable(evt.srcElement)){_168._onFocusNode(_167||evt.srcElement);}else{_168._onTouchNode(_167||evt.srcElement);}};doc.attachEvent("onactivate",_16a);var _16b=function(evt){_168._onBlurNode(_167||evt.srcElement);};doc.attachEvent("ondeactivate",_16b);return {remove:function(){_166.document.detachEvent("onmousedown",_169);doc.detachEvent("onactivate",_16a);doc.detachEvent("ondeactivate",_16b);doc=null;}};}else{doc.body.addEventListener("mousedown",_169,true);doc.body.addEventListener("touchstart",_169,true);var _16c=function(evt){_168._onFocusNode(_167||evt.target);};doc.addEventListener("focus",_16c,true);var _16d=function(evt){_168._onBlurNode(_167||evt.target);};doc.addEventListener("blur",_16d,true);return {remove:function(){doc.body.removeEventListener("mousedown",_169,true);doc.body.removeEventListener("touchstart",_169,true);doc.removeEventListener("focus",_16c,true);doc.removeEventListener("blur",_16d,true);doc=null;}};}}},_onBlurNode:function(){this.set("prevNode",this.curNode);this.set("curNode",null);if(this._justMouseDowned){return;}if(this._clearActiveWidgetsTimer){clearTimeout(this._clearActiveWidgetsTimer);}this._clearActiveWidgetsTimer=setTimeout(lang.hitch(this,function(){delete this._clearActiveWidgetsTimer;this._setStack([]);this.prevNode=null;}),100);},_onTouchNode:function(node,by){if(this._clearActiveWidgetsTimer){clearTimeout(this._clearActiveWidgetsTimer);delete this._clearActiveWidgetsTimer;}var _16e=[];try{while(node){var _16f=_15a.get(node,"dijitPopupParent");if(_16f){node=_161.byId(_16f).domNode;}else{if(node.tagName&&node.tagName.toLowerCase()=="body"){if(node===win.body()){break;}node=_160.get(node.ownerDocument).frameElement;}else{var id=node.getAttribute&&node.getAttribute("widgetId"),_170=id&&_161.byId(id);if(_170&&!(by=="mouse"&&_170.get("disabled"))){_16e.unshift(id);}node=node.parentNode;}}}}catch(e){}this._setStack(_16e,by);},_onFocusNode:function(node){if(!node){return;}if(node.nodeType==9){return;}this._onTouchNode(node);if(node==this.curNode){return;}this.set("curNode",node);},_setStack:function(_171,by){var _172=this.activeStack;this.set("activeStack",_171);for(var _173=0;_173<Math.min(_172.length,_171.length);_173++){if(_172[_173]!=_171[_173]){break;}}var _174;for(var i=_172.length-1;i>=_173;i--){_174=_161.byId(_172[i]);if(_174){_174._hasBeenBlurred=true;_174.set("focused",false);if(_174._focusManager==this){_174._onBlur(by);}this.emit("widget-blur",_174,by);}}for(i=_173;i<_171.length;i++){_174=_161.byId(_171[i]);if(_174){_174.set("focused",true);if(_174._focusManager==this){_174._onFocus(by);}this.emit("widget-focus",_174,by);}}},focus:function(node){if(node){try{node.focus();}catch(e){}}}});var _175=new _163();_15d(function(){var _176=_175.registerWin(win.doc.parentWindow||win.doc.defaultView);if(has("ie")){_15f.addOnWindowUnload(function(){_176.remove();_176=null;});}});_162.focus=function(node){_175.focus(node);};for(var attr in _175){if(!/^_/.test(attr)){_162.focus[attr]=typeof _175[attr]=="function"?lang.hitch(_175,attr):_175[attr];}}_175.watch(function(attr,_177,_178){_162.focus[attr]=_178;});return _175;});},"dijit/main":function(){define("dijit/main",["dojo/_base/kernel"],function(dojo){return dojo.dijit;});},"dojo/cache":function(){define("dojo/cache",["./_base/kernel","./text"],function(dojo,text){return dojo.cache;});},"widget/TwitterTickerWidget":function(){define("widget/TwitterTickerWidget",["dijit/_Widget","dijit/_TemplatedMixin","dojo/io/script"],function(_179,_17a,_17b){var _17c=dojo.declare("widget.TwitterTickerWidget",[_179,_17a],{templateString:"<div>Twitter wall for ${tweeter}</div>",tweeter:"web5_conf",tweetCount:10,tweetSearchUrl:"http://search.twitter.com/search.json",header:"Twitter Wall for @web5_conf",preamble:function(){arguments[0]["class"]="twitterTickerWidget "+arguments[0]["class"];},postCreate:function(){this.__fetchTweets();},constructor:function(){},postMixInProperties:function(){},__getFromField:function(){var _17d="";tweeters=this.tweeter.split(",");for(var i=0;i<tweeters.length;i++){if(i!=0){_17d+="+OR+";}_17d+=""+tweeters[i];}return _17d;},__fetchTweets:function(){var _17e=dojo.hitch(this,this.__tweetCallBack);_17b.get({callbackParamName:"callback",url:this.tweetSearchUrl+"?q="+this.__getFromField()+"&rpp="+this.tweetCount,handleAs:"json",load:_17e,error:function(err){if(err.dojoType=="timeout"||err.dojoType=="cancel"){return;}}});},__tweetCallBack:function(data){tweets=this.__buildTweetList(data.results);dojo.empty(this.domNode);dojo.place(tweets,this.domNode);},__buildTweet:function(_17f){var _180=dojo.create("div",{"class":"singleTweet"}),_181=dojo.create("img",{"src":_17f["profile_image_url"],"class":"tweeterImage"},_180),_182=dojo.create("div",{"innerHTML":this.__autolink(_17f["text"]),"class":"tweetText"},_180),_183=dojo.create("span",{"innerHTML":_17f["from_user"],"class":"tweeterName"},_180),_184=dojo.create("span",{"innerHTML":this.__formatDate(_17f["created_at"]),"class":"tweetTime"},_180);dojo.create("div",{"class":"clearer"},_180);return _180;},__buildTweetList:function(_185){var _186=dojo.create("h1",{"class":"tweetListHeader","innerHTML":this.header});var _187=dojo.create("div",{"class":"tweetList"});var that=this;dojo.place(_186,_187);_185.forEach(function(item){dojo.place(that.__buildTweet(item),_187);});return _187;},__autolink:function(s){var _188=/\s(ht|f)tp:\/\/([^ \,\;\:\!\)\(\"\'\<\>\f\n\r\t\v])+/g;return (s.replace(_188,function($0,$1,$2){s=$0.substring(1,$0.length);while(s.length>0&&s.charAt(s.length-1)=="."){s=s.substring(0,s.length-1);}return " "+s.link(s);}));},__formatDate:function(_189){var _18a=Date.parse(_189);var now=new Date();now=now.getTime();var _18b=parseInt((now-_18a)/1000);if(_18b<=30){return "Just now";}if(_18b<=60){return "A minute ago";}if(_18b<3600){return parseInt(_18b/60)+" minutes ago";}if(_18b<=1.5*3600){return "One hour ago";}if(_18b<23.5*3600){return Math.round(_18b/3600)+" hours ago";}if(_18b<1.5*24*3600){return "One day ago";}if(_18b<7*24*3600){return "Within 1 week";}if(_18b<31*24*3600){return "Within 1 month";}if(_18b<364*24*3600){return "Within 1 year";}return "A long time ago, in a galaxy far far away";}});return _17c;});}}});define("widgets",[],1);