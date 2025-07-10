/**
 * CA Experience Collector - Browser Agent 
 * 99f86a31f5de7d41b665671d11202ba9f61dddea74e8d6ebe6f364c7d96eba9a #33 
 * Copyright (c) 2018 CA. All Rights Reserved.
 */
try{if(typeof BrowserAgentExtension==="undefined")var BrowserAgentExtension={isBAAlive:function(){return typeof BrowserAgent!=="undefined"&&BrowserAgent.globals.configs.BROWSERAGENTENABLED===true},init:function(){},extAddJSFuncToInstrument:function(){},extAddCustomPageMetric:function(){},extAddCustomOptionalProperty:function(){},extNameFormatter:function(path,name,unit,type,value){},isClickedEventARouteChange:function(event){return null}}}catch(e){if(window.BrowserAgent&&BrowserAgent.logger)BrowserAgent.logger.error("BrowserAgentExtensionError: "+
e.message);else if(window&&window.console)window.console.log("BrowserAgentExtensionError: "+e.message)};
