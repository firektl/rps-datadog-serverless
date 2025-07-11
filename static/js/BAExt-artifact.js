var BAAppProfile = {
  profileId: 1097,
  profileName: "Capacitacion",
  baAttributes: {
    browserAgentEnabled: true,
    pageLoadMetricsEnabled: true,
    pageLoadMetricsThreshold: 0,
    ajaxMetricsEnabled: true,
    ajaxMetricsThreshold: 0,
    jsFunctionMetricsEnabled: false,
    jsFunctionMetricsThreshold: 0,
    geoEnabled: true,
    urlExcludeList: [],
    urlIncludeList: [],
    metricFrequency: 3750,
    jsErrorsEnabled: true,
    ajaxErrorsEnabled: false,
    browserLoggingEnabled: false,
    collectorUrl:
      "https://dxc.dxi-na1.saas.broadcom.com/api/1/urn:ca:tenantId:4BF1A669-0A37-4FB2-9829-19A576E57FB7/urn:ca:appId:Capacitacion/browserMetrics",
    sessionTimeout: 3600000,
    softPageMetricsEnabled: true,
    domChangeTimeout: 10000,
    domChangePollingInterval: 100,
    cookieCaptureEnabled: false,
    resourceMetricsEnabled: true,
    resourceMetricsThreshold: 0,
    allowCookies: true,
    proxyEnabled: false,
    proxyUrl: "",
  },
  created: 1689261816163,
  lastUpdated: 1689261816163,
};
/**
 * CA Experience Collector - Browser Agent
 * 99f86a31f5de7d41b665671d11202ba9f61dddea74e8d6ebe6f364c7d96eba9a #33
 * Copyright (c) 2018 CA. All Rights Reserved.
 */
try {
  if (typeof BrowserAgentExtension === "undefined")
    var BrowserAgentExtension = {
      isBAAlive: function () {
        return (
          typeof BrowserAgent !== "undefined" &&
          BrowserAgent.globals.configs.BROWSERAGENTENABLED === true
        );
      },
      init: function () {},
      extAddJSFuncToInstrument: function () {},
      extAddCustomPageMetric: function () {},
      extAddCustomOptionalProperty: function () {},
      extNameFormatter: function (path, name, unit, type, value) {},
      isClickedEventARouteChange: function (event) {
        return null;
      },
    };
} catch (e) {
  if (window.BrowserAgent && BrowserAgent.logger)
    BrowserAgent.logger.error("BrowserAgentExtensionError: " + e.message);
  else if (window && window.console)
    window.console.log("BrowserAgentExtensionError: " + e.message);
}

/**
 * CA Experience Collector - Browser Agent
 * 99f86a31f5de7d41b665671d11202ba9f61dddea74e8d6ebe6f364c7d96eba9a #33
 * Copyright (c) 2018 CA. All Rights Reserved.
 */
var BrowserAgentBootstrap;
try {
  if ("undefined" !== typeof BrowserAgent)
    throw Error(
      "Detected multiple instances of Browser Agent. Skipping monitoring for this instance."
    );
  BrowserAgent = {};
  "undefined" === typeof BrowserAgentBootstrap &&
    (BrowserAgentBootstrap = { origFuncMap: {} });
  BrowserAgent.globals = {
    init: function () {
      BrowserAgent.globals.defaultMetricDefs =
        BrowserAgent.globals.setDefaultMetricDefs();
      var a = {};
      a.schemaVersion = BrowserAgent.jsonUtils.jsonConstants.SCHEMA_VERSION;
      a.creator = {
        name: BrowserAgent.jsonUtils.jsonConstants.CREATOR_NAME,
        version: BrowserAgent.jsonUtils.jsonConstants.CREATOR_VERSION,
      };
      a.clientInfo = {};
      navigator.userAgent && (a.clientInfo.userAgent = navigator.userAgent);
      BrowserAgent.globals.browserFingerprint &&
        (a.clientInfo.fingerPrint = BrowserAgent.globals.browserFingerprint);
      BrowserAgent.globals.platform &&
        (a.clientInfo.browserType = BrowserAgent.globals.platform);
      BrowserAgent.globals.platformVersion &&
        (a.clientInfo.browserMajorVersion =
          BrowserAgent.globals.platformVersion);
      a.app = { ba: { pages: { pageList: [] } } };
      BrowserAgent.globals.appInfo.id &&
        (a.app.id = BrowserAgent.globals.appInfo.id);
      BrowserAgent.globals.appInfo.key &&
        (a.app.key = BrowserAgent.globals.appInfo.key);
      a.app.version = BrowserAgent.jsonUtils.jsonConstants.APP_VERSION;
      BrowserAgent.globals.appInfo.version &&
        (a.app.version = BrowserAgent.globals.appInfo.version);
      a.app.useAxaAppName =
        BrowserAgent.jsonUtils.jsonConstants.APP_USE_AXAAPP_NAME;
      BrowserAgent.globals.appInfo.useAxaAppName &&
        (a.app.useAxaAppName = BrowserAgent.globals.appInfo.useAxaAppName);
      BrowserAgent.globals.appInfo.tenantId &&
        (a.app.tenantId = BrowserAgent.globals.appInfo.tenantId);
      BrowserAgent.globals.profileInfo &&
        (a.app.profileInfo = BrowserAgent.globals.profileInfo);
      BrowserAgent.globals.eumJSONShell = a;
      BrowserAgent.globals.lastCorBrowserGUIDsUsed = new BrowserAgent.Set(1e3);
      BrowserAgent.globals.processedResourceEntries = new BrowserAgent.Set();
    },
    getSequenceNum: function () {
      BrowserAgent.globals.sequenceNum += 1;
      return BrowserAgent.globals.sequenceNum;
    },
    peekSequenceNum: function () {
      return BrowserAgent.globals.sequenceNum + 1;
    },
    setDefaultMetricDefs: function () {
      return {
        NTAPI_PRT: {
          name: "Page Render Time",
          unit: BrowserAgent.globals.defaultMetricUnits.MILLI,
          type: BrowserAgent.globals.metricAggregatorType.INT_LONG_DURATION,
        },
        NTAPI_DPT: {
          name: "DOM Processing Time",
          unit: BrowserAgent.globals.defaultMetricUnits.MILLI,
          type: BrowserAgent.globals.metricAggregatorType.INT_LONG_DURATION,
        },
        NTAPI_PLT: {
          name: "Page Load Time",
          unit: BrowserAgent.globals.defaultMetricUnits.MILLI,
          type: BrowserAgent.globals.metricAggregatorType.INT_LONG_DURATION,
        },
        NTAPI_PST: {
          name: "Page Stall Time",
          unit: BrowserAgent.globals.defaultMetricUnits.MILLI,
          type: BrowserAgent.globals.metricAggregatorType.INT_LONG_DURATION,
        },
        NTAPI_PPUT: {
          name: "Previous Page Unload Time",
          unit: BrowserAgent.globals.defaultMetricUnits.MILLI,
          type: BrowserAgent.globals.metricAggregatorType.INT_LONG_DURATION,
        },
        NTAPI_DLT: {
          name: "Domain Lookup Time",
          unit: BrowserAgent.globals.defaultMetricUnits.MILLI,
          type: BrowserAgent.globals.metricAggregatorType.INT_LONG_DURATION,
        },
        NTAPI_TTFB: {
          name: "Time to First Byte",
          unit: BrowserAgent.globals.defaultMetricUnits.MILLI,
          type: BrowserAgent.globals.metricAggregatorType.INT_LONG_DURATION,
        },
        NTAPI_TTLB: {
          name: "Time to Last Byte",
          unit: BrowserAgent.globals.defaultMetricUnits.MILLI,
          type: BrowserAgent.globals.metricAggregatorType.INT_LONG_DURATION,
        },
        NTAPI_CET: {
          name: "Connection Establishment Time",
          unit: BrowserAgent.globals.defaultMetricUnits.MILLI,
          type: BrowserAgent.globals.metricAggregatorType.INT_LONG_DURATION,
        },
        PAGE_HPI: {
          name: "Page Hits Per Interval",
          unit: BrowserAgent.globals.defaultMetricUnits.NO_UNIT,
          type: BrowserAgent.globals.metricAggregatorType.LONG_INTERVAL_COUNTER,
        },
        FUNC_ET: {
          name: "Execution Time",
          unit: BrowserAgent.globals.defaultMetricUnits.MILLI,
          type: BrowserAgent.globals.metricAggregatorType.INT_LONG_DURATION,
        },
        FUNC_ICPI: {
          name: "Invocation Count Per Interval",
          unit: BrowserAgent.globals.defaultMetricUnits.NO_UNIT,
          type: BrowserAgent.globals.metricAggregatorType.LONG_INTERVAL_COUNTER,
        },
        AJAX_RLT: {
          name: "Resource Load Time",
          unit: BrowserAgent.globals.defaultMetricUnits.MILLI,
          type: BrowserAgent.globals.metricAggregatorType.INT_LONG_DURATION,
        },
        AJAX_TTFB: {
          name: "Time To First Byte",
          unit: BrowserAgent.globals.defaultMetricUnits.MILLI,
          type: BrowserAgent.globals.metricAggregatorType.INT_LONG_DURATION,
        },
        AJAX_RDT: {
          name: "Response Download Time",
          unit: BrowserAgent.globals.defaultMetricUnits.MILLI,
          type: BrowserAgent.globals.metricAggregatorType.INT_LONG_DURATION,
        },
        AJAX_CBET: {
          name: "Callback Execution Time",
          unit: BrowserAgent.globals.defaultMetricUnits.MILLI,
          type: BrowserAgent.globals.metricAggregatorType.INT_LONG_DURATION,
        },
        AJAX_ICPI: {
          name: "Invocation Count Per Interval",
          unit: BrowserAgent.globals.defaultMetricUnits.NO_UNIT,
          type: BrowserAgent.globals.metricAggregatorType.LONG_INTERVAL_COUNTER,
        },
        RES_EPI: {
          name: "Resource Errors Per Interval",
          unit: BrowserAgent.globals.defaultMetricUnits.NO_UNIT,
          type: BrowserAgent.globals.metricAggregatorType.LONG_INTERVAL_COUNTER,
        },
        PAGE_EPI: {
          name: "Page Errors Per Interval",
          unit: BrowserAgent.globals.defaultMetricUnits.NO_UNIT,
          type: BrowserAgent.globals.metricAggregatorType.LONG_INTERVAL_COUNTER,
        },
        PAGE_UDT: {
          name: "User Decision Time",
          unit: BrowserAgent.globals.defaultMetricUnits.MILLI,
          type: BrowserAgent.globals.metricAggregatorType.INT_LONG_DURATION,
        },
        AXA_NRT: {
          name: "Network Response Time",
          unit: BrowserAgent.globals.defaultMetricUnits.MILLI,
          type: BrowserAgent.globals.metricAggregatorType.INT_LONG_DURATION,
        },
      };
    },
    pageWithEventsMap: {},
    sortedBucketList: [],
    processedResourceEntries: null,
    pageBucketsMap: {},
    pageBucketsMaxLen: 100,
    evtTypes: {
      RES: "RES",
      JSERR: "JSERR",
      FN: "FN",
      AXAEXT: "AXAEXT",
      APMEXT: "APMEXT",
      HPLOAD: "HPLOAD",
      SPLOAD: "SPLOAD",
      TTIME: "TTIME",
    },
    evtHandlers: {},
    pageBucketTypes: { HP: "HP", SP: "SP" },
    currPagePtr: null,
    prevPagePtr: null,
    currSession: null,
    prevSessionList: [],
    sessionToChunkMap: {},
    sessionToActiveEUMPayloadMap: {},
    deferredPayloadProcessing: null,
    currTTimeEvtPtr: null,
    initPageInfo: null,
    eumJSONShell: null,
    softPageLoadEvtObj: null,
    harvestIntervalId: null,
    sequenceNum: -1,
    ajaxDataKeys: {
      URL: "url",
      METHOD: "method",
      ASYNC: "async",
      STATUS_CODE: "status",
      STATUS_TEXT: "statusText",
      RESPONSE_CONTENT_LENGTH: "resSize",
      REQUEST_BODY_SIZE: "reqSize",
      ERR: "err",
    },
    appInfo: null,
    bs: "-1",
    bt: "-1",
    btc: "-1",
    commaChar: ",",
    equalChar: "\x3d",
    configs: null,
    contentLengthHdrStr: "Content-Length",
    contentLengthHdrStrLowerCase: "content-length",
    appCookies: null,
    agentCookies: null,
    agentCookieKeys: "agentCookieKeys",
    agentCookieKeyName: {
      AGENTHOST: "AgentHost",
      SERVLETNAME: "ServletName",
      USERID: "UserId",
      AGENTPROCESS: "AgentProcess",
      AGENTNAME: "AgentName",
      WEBAPPNAME: "WebAppName",
    },
    agentCookiePrefix: "apm",
    agentCookieKeysRegexPattern: /^apm.+/,
    CorBrowsGUID: null,
    defaultBTRegex: /^Default BT( via (Chrome|Edge|Firefox|IE|Safari))?$/,
    defaultMetricDefs: null,
    defaultMetricUnits: { NO_UNIT: null, MILLI: "ms" },
    isSoftPageLoad: !0,
    domLastUpdated: null,
    domChangeTimeoutId: null,
    domChangeTimerId: null,
    domChangeObserver: null,
    domChangeObserverConfig: {
      childList: !0,
      characterData: !0,
      subtree: !0,
      attributes: !0,
    },
    dotChar: ".",
    softPageDataKeys: { START: "s", END: "e", REFERRER: "r", URL: "url" },
    emptyObjStr: "{}",
    forwardSlashChar: "/",
    functionsToInstrumentMap: {},
    tracerCacheMap: {},
    jsFuncPreTracerName: "BrowserAgent.funcUtils.tracers.JSFuncPre",
    jsFuncPostTracerName: "BrowserAgent.funcUtils.tracers.JSFuncPost",
    retryFuncIdMap: {},
    gapTimeInMillis: 0,
    geoConstants: { ERROR: -255, DENIED: -401 },
    geo: { lat: -401, lon: -401 },
    hashChar: "#",
    isStoragePresent: !0,
    metricAggregatorType: {
      INT_LONG_DURATION: 0,
      LONG_INTERVAL_COUNTER: 1,
      STRING: 2,
    },
    metricPathConsts: {
      PREFIX: "Business Segment",
      BROWSER: "Browser",
      RES: "Resources",
      HTMLRES: "HTML",
      AJAX: "AJAX Call",
      SYNC: "Sync",
      ASYNC: "Async",
      FUNC: "JavaScript Function",
      SOFTPAGE: "Soft Page",
      URL: "URL",
      CUSTOM: "Custom",
      NETWORKEVT: "Network Event",
    },
    origFuncMap: {},
    platform: "-1",
    platformVersion: "-1",
    pageFullURL: window.location.href,
    unloadEvtHndlrFlag: !1,
    profileURL: "",
    extensionSrcFullPath: "",
    BASrcFullPath: "",
    BALocalProfileUpdate: !0,
    resourceType: { AJAX: "AJAX", HTMLRES: "HTMLRES" },
    resourceSubType: { SYNC: "SYNC", ASYNC: "ASYNC" },
    snippetAttrNames: {
      SCRIPT_ID: {
        OLD: "BA_AXA",
        NEW: "ca_eum_ba",
        EXT_OLD: "BA_AXA_EXT",
        EXT_NEW: "ca_eum_ba_ext",
      },
      PROFILE_URL: "data-profileUrl",
      TENANT_ID: "data-tenantID",
      APP_ID: "data-appID",
      APP_KEY: "data-appKey",
      APP_VERSION: "data-appVersion",
      APP_USE_AXAAPP_NAME: "data-use-axa-appname",
      SRC: "src",
      RESPONSE_BT: "x-apm-ba-response-bt",
      LOCAL_PROFILE_UPDATE: "data-profile-update",
    },
    pageBT: null,
    timestampNames: {
      START_TIME: "s",
      REQUEST_START: "rs",
      CALLBACK_START_TIME: "cs",
      CALLBACK_END_TIME: "ce",
      FIRST_BYTE: "f",
      LAST_BYTE: "l",
      EXTERNAL: "ex",
    },
    pipeChar: "|",
    profileInfo: null,
    semiColonChar: ";",
    colonChar: ":",
    startTime: null,
    endTime: null,
    UNDEFINED: "-1",
    userAgents: {
      CHROME: { name: "Chrome", ver: 30 },
      EDGE: { name: "Edge", ver: 12 },
      FIREFOX: { name: "Firefox", ver: 30 },
      IE: { name: "IE", ver: 9 },
      SAFARI: { name: "Safari", ver: 9 },
      UNSUPPORTED: { name: "Unsupported", ver: -1 },
    },
    isOldXHR: !1,
    browserFingerprint: null,
    baStartTime: null,
    trackerDataKey: "TKR",
    isJQOne: null,
    isJQ: null,
    retryInterval: 1e3,
    funcInstrumentMaxRetryCount: 10,
    underscoreChar: "_",
    dashChar: "-",
    performanceResourceBuffer: 1e3,
    isPerformanceResourceSupported: !1,
    RAW_RESOURCE_TIME_DATA: "rawResourceDataKey",
    isOnUnload: !1,
    traceSource: "Trace Source",
    traceSourceBrowser: "Browser Agent",
    httpStatusCodeMessages: {
      0: "error",
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required - Future Use",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Timeout",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Request Entity Too Large",
      414: "Request-URI Too Long",
      415: "Unsupported Media Type",
      416: "Requested Range Not Satisfiable",
      417: "Expectation Failed",
      426: "Upgrade Required",
      500: "Internal Sever Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Timeout",
      505: "HTTP Version Not Supported",
    },
    httpStatusCodes: { NOT_MODIFIED_304: 304 },
    EVENT_THRESHOLD: 1e3,
    lastUserMouseDown: 0,
    retryPayloadsMap: {},
    MINIMUM_RETRY_DELAY: 5e3,
    isCookieEnabled: !1,
    urlToPerformanceListMap: {},
    currentPerfObjectCount: 0,
    MAX_PERF_OBJECT_CACHE_LIMIT: 500,
    XML_HTTP_REQUEST_PERF_RES_TYPE: "xmlhttprequest",
    REQUEST_START_PROP_NAME: "requestStart",
    PERF_OBJ_CORR_MAX_ALLOWED_SPREAD: 1500,
    lastCustomSPARouteName: "",
    lastCustomSPARouteTime: 0,
    MAX_TIME_BETWEEN_SAME_CUSTOM_ROUTE: 12e4,
    supportedSPARouteTagNames: { "md-tab": !0, "md-tab-item": !0 },
    lastEventTime: 0,
    sessionTimeoutLowerLimit: 6e4,
    lastCorBrowserGUIDsUsed: null,
    selfMonPerformance: {
      baloadinit: { totalTimeMS: 0 },
      baunload: { totalTimeMS: 0 },
      ajax: { numberOfAjax: 0, totalTimeMS: 0, avgTimePerAjaxMS: 0 },
      jquery: { numberOfJQ: 0, totalTimeMS: 0, avgTimePerJQMS: 0 },
      resource: { numberOfRes: 0, totalTimeMS: 0, avgTimePerResMS: 0 },
      harvestpayload: {
        minTimeMS: 0,
        maxTimeMS: 0,
        totalTimeMS: 0,
        avgTimeMS: 0,
        numberOfHarvestCycles: 0,
      },
      payload: {
        startTime: 0,
        lastTime: 0,
        numberOfPayloads: 0,
        totalSizeBytes: 0,
        minSizeBytes: 0,
        maxSizeBytes: 0,
        avgSizeBytes: 0,
        totalNetworkTimeMS: 0,
        avgNetworkTimeMS: 0,
        bytesPerSecond: 0,
      },
    },
  };
  BrowserAgent.logger = {
    logPrefix: " [CA Browser Agent]: ",
    logLevelPrefix: {
      DEBUG: " [DEBUG] ",
      ERROR: " [ERROR] ",
      INFO: " [INFO] ",
      WARN: " [WARN] ",
    },
    isOk: function () {
      return (
        window.console &&
        "object" === typeof window.console &&
        (!BrowserAgent.globals.configs ||
          !0 === BrowserAgent.globals.configs.BROWSERLOGGINGENABLED)
      );
    },
    log: function (a, b) {
      BrowserAgent.logger.isOk() &&
        window.console.log(new Date() + BrowserAgent.logger.logPrefix + a + b);
    },
    debug: function (a) {
      BrowserAgent.logger.log(BrowserAgent.logger.logLevelPrefix.DEBUG, a);
    },
    error: function (a) {
      BrowserAgent.logger.log(BrowserAgent.logger.logLevelPrefix.ERROR, a);
    },
    info: function (a) {
      BrowserAgent.logger.log(BrowserAgent.logger.logLevelPrefix.INFO, a);
    },
    warn: function (a) {
      BrowserAgent.logger.log(BrowserAgent.logger.logLevelPrefix.WARN, a);
    },
  };
  BrowserAgent.Set = function (a) {
    this.backingSet = {};
    this.CONST_VALUE = 1;
    this.size = 0;
    0 < a
      ? ((this.itemOrderArray = []), (this.maxAllowedSize = a))
      : ((this.itemOrderArray = null), (this.maxAllowedSize = 0));
    this._removeFromBackingSet = function (a) {
      this.hasItem(a) && --this.size;
      delete this.backingSet[a];
    };
  };
  BrowserAgent.Set.prototype.addItem = function (a) {
    this.hasItem(a) || (this.size += 1);
    this.backingSet[a] = this.CONST_VALUE;
    this.itemOrderArray && this.itemOrderArray.push(a);
    0 < this.maxAllowedSize &&
      this.size > this.maxAllowedSize &&
      this._removeFromBackingSet(this.itemOrderArray.shift());
    this.itemOrderArray &&
      this.itemOrderArray.length !== this.size &&
      BrowserAgent.logger.warn(
        "BrowserAgent.Set.prototype.addItem: Discrepancy detected: this.itemOrderArray \x3d " +
          this.itemOrderArray +
          ", this.size \x3d " +
          this.size
      );
  };
  BrowserAgent.Set.prototype.removeItem = function (a) {
    this._removeFromBackingSet(a);
    for (var b = 0; this.itemOrderArray && b < this.itemOrderArray.length; b++)
      if (this.itemOrderArray[b] === a) {
        this.itemOrderArray.splice(b, 1);
        break;
      }
    this.itemOrderArray &&
      this.itemOrderArray.length !== this.size &&
      BrowserAgent.logger.warn(
        "BrowserAgent.Set.prototype.removeItem: Discrepancy detected: this.itemOrderArray \x3d " +
          this.itemOrderArray +
          ", this.size \x3d " +
          this.size
      );
  };
  BrowserAgent.Set.prototype.hasItem = function (a) {
    a = this.backingSet[a];
    return void 0 !== a && null !== a && a === this.CONST_VALUE;
  };
  BrowserAgent.Set.prototype.getAll = function () {
    var a = [],
      b;
    for (b in this.backingSet) a.push(b);
    return a;
  };
  BrowserAgent.Set.prototype.isEmpty = function () {
    return 0 === this.size;
  };
  BrowserAgent.browserUtils = {
    UUIDPattern: "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx",
    UUIDChar: "x",
    XHRToSendMetrics: null,
    init: function () {
      BrowserAgent.globals.configs.GEOENABLED && this.getGeoLocation();
      BrowserAgent.globals.browserFingerprint = this.getBrowserFingerprint();
      BrowserAgent.globals.currSession = this.getSession();
    },
    copyObj: function (a, b) {
      if (!a || "object" !== typeof a)
        return BrowserAgent.logger.warn("copyObj: Invalid parameters"), null;
      var c = {},
        d,
        e = BrowserAgent.jsonStringify(a);
      if (!e || "{}" === e || b)
        for (b = [], b.push([null, a, c]); 0 < b.length; )
          if (((a = b.shift()), a[1] && "object" === typeof a[1]))
            if (a[0])
              for (d in ((a[2][a[0]] = {}), a[1]))
                b.push([d, a[1][d], a[2][a[0]]]);
            else for (d in a[1]) b.push([d, a[1][d], a[2]]);
          else a[0] ? (a[2][a[0]] = a[1]) : (a[2] = a[1]);
      else c = a;
      return c;
    },
    includes: function (a, b) {
      "number" !== typeof b && (b = 0);
      return b + a.length > this.length ? !1 : -1 !== this.indexOf(a, b);
    },
    getBrowserInfo: function (a) {
      if (!a || "string" !== typeof a || /opera|opr/i.test(a))
        return {
          name: BrowserAgent.globals.userAgents.UNSUPPORTED.name,
          ver: BrowserAgent.globals.userAgents.UNSUPPORTED.ver,
          isSupported: !1,
        };
      if (/edge/i.test(a)) {
        var b = this.getMajorVersion(a, /(?:edge)\/(\d+(\.\d+)?)/i);
        if (b >= BrowserAgent.globals.userAgents.EDGE.ver)
          return {
            name: BrowserAgent.globals.userAgents.EDGE.name,
            ver: b,
            isSupported: !0,
          };
      }
      return /msie|trident/i.test(a) &&
        ((b = this.getMajorVersion(a, /(?:msie |rv:)(\d+(\.\d+)?)/i)),
        b >= BrowserAgent.globals.userAgents.IE.ver)
        ? {
            name: BrowserAgent.globals.userAgents.IE.name,
            ver: b,
            isSupported: !0,
          }
        : /chrome|crios|crmo/i.test(a) &&
          ((b = this.getMajorVersion(
            a,
            /(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i
          )),
          b >= BrowserAgent.globals.userAgents.CHROME.ver)
        ? {
            name: BrowserAgent.globals.userAgents.CHROME.name,
            ver: b,
            isSupported: !0,
          }
        : /firefox|iceweasel/i.test(a) &&
          ((b = this.getMajorVersion(
            a,
            /(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i
          )),
          b >= BrowserAgent.globals.userAgents.FIREFOX.ver)
        ? {
            name: BrowserAgent.globals.userAgents.FIREFOX.name,
            ver: b,
            isSupported: !0,
          }
        : /safari/i.test(a) &&
          ((b = this.getMajorVersion(a, /version\/(\d+(\.\d+)?)/i)),
          b >= BrowserAgent.globals.userAgents.SAFARI.ver)
        ? {
            name: BrowserAgent.globals.userAgents.SAFARI.name,
            ver: b,
            isSupported: !0,
          }
        : {
            name: BrowserAgent.globals.userAgents.UNSUPPORTED.name,
            ver: BrowserAgent.globals.userAgents.UNSUPPORTED.ver,
            isSupported: !1,
          };
    },
    getMajorVersion: function (a, b) {
      return (a = a.match(b)) &&
        1 < a.length &&
        (a = a[1].split(".")) &&
        0 < a.length
        ? parseInt(a[0])
        : 0;
    },
    generateUUID: function () {
      var a = BrowserAgentBootstrap.origFuncMap.timeNow();
      return BrowserAgent.browserUtils.UUIDPattern.replace(
        /[xy]/g,
        function (b) {
          var c = (a + 16 * Math.random()) % 16 | 0;
          a = Math.floor(a / 16);
          return (
            b == BrowserAgent.browserUtils.UUIDChar ? c : (c & 3) | 8
          ).toString(16);
        }
      );
    },
    getBrowserFingerprint: function () {
      var a = BrowserAgent.cookieUtils.getRawCookie(
        BrowserAgent.cookieUtils.BAFINGERPRINT
      );
      if (a)
        return (
          BrowserAgent.logger.info(
            "getBrowserFingerprint: Browser Fingerprint already exists via cookie"
          ),
          BrowserAgent.storageUtils.putInStorage(
            BrowserAgent.storageUtils.storageTypes.LOCAL,
            BrowserAgent.storageUtils.storageKeys.BAFINGERPRINT,
            a,
            !0
          ),
          a
        );
      a = BrowserAgent.storageUtils.getFromStorage(
        BrowserAgent.storageUtils.storageTypes.LOCAL,
        BrowserAgent.storageUtils.storageKeys.BAFINGERPRINT
      );
      var b = BrowserAgent.browserUtils.getDomainForCookie();
      if (a)
        return (
          BrowserAgent.logger.info(
            "getBrowserFingerprint: Browser Fingerprint already exists via local storage"
          ),
          BrowserAgent.cookieUtils.setRawCookie(
            BrowserAgent.cookieUtils.BAFINGERPRINT,
            a,
            null,
            "/",
            b
          ),
          a
        );
      BrowserAgent.logger.info(
        "getBrowserFingerprint: Generating a new Browser Fingerprint..."
      );
      a = BrowserAgent.browserUtils.generateUUID();
      BrowserAgent.storageUtils.putInStorage(
        BrowserAgent.storageUtils.storageTypes.LOCAL,
        BrowserAgent.storageUtils.storageKeys.BAFINGERPRINT,
        a,
        !0
      );
      BrowserAgent.cookieUtils.setRawCookie(
        BrowserAgent.cookieUtils.BAFINGERPRINT,
        a,
        null,
        "/",
        b
      );
      return a;
    },
    getDomainForCookie: function () {
      var a = null,
        b = window.location.hostname.split(BrowserAgent.globals.dotChar);
      b &&
        2 <= b.length &&
        ((a = b[b.length - 2] + BrowserAgent.globals.dotChar + b[b.length - 1]),
        null !== BrowserAgent.browserUtils.convertToNum(b[b.length - 2]) ||
          null !== BrowserAgent.browserUtils.convertToNum(b[b.length - 1])) &&
        (a = null);
      return a;
    },
    getSession: function () {
      var a = BrowserAgent.storageUtils.getFromStorage(
        BrowserAgent.storageUtils.storageTypes.SESSION,
        BrowserAgent.storageUtils.storageKeys.BASESSION_ID
      );
      if (a) {
        BrowserAgent.logger.info(
          "getSession: Browser Session ID already exists."
        );
        if (
          !BrowserAgent.browserUtils.isSameSession(
            BrowserAgent.globals.baStartTime
          )
        )
          return BrowserAgent.browserUtils.getNewSession(
            BrowserAgent.globals.baStartTime
          );
        var b = {};
        b.id = a;
        b.isNewSession = !1;
        var c = BrowserAgent.browserUtils.convertToNum(
          BrowserAgent.storageUtils.getFromStorage(
            BrowserAgent.storageUtils.storageTypes.SESSION,
            BrowserAgent.storageUtils.storageKeys.BASESSION_STARTTIME
          )
        );
        null !== c && (b.startTime = c);
        BrowserAgent.globals.sessionToChunkMap[a] = {};
        c = BrowserAgent.browserUtils.convertToNum(
          BrowserAgent.storageUtils.getFromStorage(
            BrowserAgent.storageUtils.storageTypes.SESSION,
            BrowserAgent.storageUtils.storageKeys.CHUNK_SEQ
          )
        );
        c = null !== c ? c : 0;
        BrowserAgent.globals.sessionToChunkMap[a].ch = c;
        BrowserAgent.globals.sessionToChunkMap[a].fch = 0 >= c;
        BrowserAgent.globals.sessionToChunkMap[a].lch = !1;
        return b;
      }
      return BrowserAgent.browserUtils.getNewSession(
        BrowserAgent.globals.baStartTime
      );
    },
    getNewSession: function (a) {
      BrowserAgent.logger.info("getNewSession: Generating a new Session ID...");
      var b = BrowserAgent.browserUtils.generateUUID();
      BrowserAgent.browserUtils.updateSessionInfo(b, a, 0, !0);
      BrowserAgent.globals.sessionToChunkMap[b] = { ch: 0, fch: !0, lch: !1 };
      "undefined" !== typeof BrowserAgentExtension &&
        BrowserAgentExtension.internal.clearAllTrackers();
      return { id: b, startTime: a, isNewSession: !0 };
    },
    updateSessionInfo: function (a, b, c, d) {
      BrowserAgent.storageUtils.putInStorage(
        BrowserAgent.storageUtils.storageTypes.SESSION,
        BrowserAgent.storageUtils.storageKeys.BASESSION_ID,
        a,
        d
      );
      BrowserAgent.storageUtils.putInStorage(
        BrowserAgent.storageUtils.storageTypes.SESSION,
        BrowserAgent.storageUtils.storageKeys.BASESSION_STARTTIME,
        b,
        d
      );
      BrowserAgent.storageUtils.putInStorage(
        BrowserAgent.storageUtils.storageTypes.SESSION,
        BrowserAgent.storageUtils.storageKeys.BALASTEVENT_TIME,
        b,
        d
      );
      BrowserAgent.storageUtils.putInStorage(
        BrowserAgent.storageUtils.storageTypes.SESSION,
        BrowserAgent.storageUtils.storageKeys.CHUNK_SEQ,
        c,
        d
      );
    },
    isSameSession: function (a) {
      if ("number" !== typeof a || isNaN(a))
        return (
          BrowserAgent.logger.error(
            "isSameSession: Cannot determine session truth as event time is NaN."
          ),
          !0
        );
      var b = BrowserAgent.browserUtils.convertToNum(
        BrowserAgent.storageUtils.getFromStorage(
          BrowserAgent.storageUtils.storageTypes.SESSION,
          BrowserAgent.storageUtils.storageKeys.BALASTEVENT_TIME
        )
      );
      return !b || a - b >= BrowserAgent.globals.configs.SESSIONTIMEOUT
        ? (BrowserAgent.logger.info(
            "isSameSession: Session timed out due to inactivity."
          ),
          !1)
        : !0;
    },
    hasCustomGeoLocation: function () {
      return (
        null !==
        BrowserAgent.storageUtils.getFromStorage(
          BrowserAgent.storageUtils.storageTypes.SESSION,
          BrowserAgent.storageUtils.storageKeys.GEOCUSTOM
        )
      );
    },
    isiOSMobileAgent: function (a) {
      return a && "string" === typeof a
        ? /iPhone|iPad/i.test(a) && /Mobile/i.test(a) && !/Safari/i.test(a)
          ? !0
          : !1
        : !1;
    },
    getGeoLocation: function () {
      if (!BrowserAgent.browserUtils.hasCustomGeoLocation())
        if (
          navigator &&
          navigator.geolocation &&
          !BrowserAgent.browserUtils.isiOSMobileAgent(navigator.userAgent)
        ) {
          var a = BrowserAgent.storageUtils.getFromStorage(
              BrowserAgent.storageUtils.storageTypes.SESSION,
              BrowserAgent.storageUtils.storageKeys.GEOLAT
            ),
            b = BrowserAgent.storageUtils.getFromStorage(
              BrowserAgent.storageUtils.storageTypes.SESSION,
              BrowserAgent.storageUtils.storageKeys.GEOLONG
            );
          null === a || null === b
            ? ((a = {
                timeout: BrowserAgent.globals.configs.GEOTIMEOUT,
                maximumAge: BrowserAgent.globals.configs.GEOMAXIMUMAGE,
                enableHighAccuracy:
                  BrowserAgent.globals.configs.GEOHIGHACCURACYENABLED,
              }),
              BrowserAgent.logger.info(
                "getGeoLocation: Attempting to calculate geo location"
              ),
              navigator.geolocation.getCurrentPosition(
                this.geoLocationFound,
                this.geoLocationNotFound,
                a
              ),
              setTimeout(function () {
                null ===
                  BrowserAgent.storageUtils.getFromStorage(
                    BrowserAgent.storageUtils.storageTypes.SESSION,
                    BrowserAgent.storageUtils.storageKeys.GEOLAT
                  ) &&
                  (BrowserAgent.logger.warn(
                    "getGeoLocation: Never received a response for geo-location. Setting co-ordinates to " +
                      BrowserAgent.globals.geoConstants.DENIED +
                      "," +
                      BrowserAgent.globals.geoConstants.DENIED
                  ),
                  (BrowserAgent.globals.geo.lat =
                    BrowserAgent.globals.geoConstants.DENIED),
                  (BrowserAgent.globals.geo.lon =
                    BrowserAgent.globals.geoConstants.DENIED),
                  BrowserAgent.storageUtils.putInStorage(
                    BrowserAgent.storageUtils.storageTypes.SESSION,
                    BrowserAgent.storageUtils.storageKeys.GEOLAT,
                    BrowserAgent.globals.geoConstants.DENIED,
                    !0
                  ),
                  BrowserAgent.storageUtils.putInStorage(
                    BrowserAgent.storageUtils.storageTypes.SESSION,
                    BrowserAgent.storageUtils.storageKeys.GEOLONG,
                    BrowserAgent.globals.geoConstants.DENIED,
                    !0
                  ));
              }, parseInt(BrowserAgent.globals.configs.GEOTIMEOUT) + 5e3))
            : ((BrowserAgent.globals.geo.lat = Number(a)),
              (BrowserAgent.globals.geo.lon = Number(b)));
        } else
          BrowserAgent.logger.warn(
            "getGeoLocation: Geolocation is not supported in this browser."
          ),
            BrowserAgent.storageUtils.putInStorage(
              BrowserAgent.storageUtils.storageTypes.SESSION,
              BrowserAgent.storageUtils.storageKeys.GEOLAT,
              BrowserAgent.globals.geoConstants.ERROR,
              !0
            ),
            BrowserAgent.storageUtils.putInStorage(
              BrowserAgent.storageUtils.storageTypes.SESSION,
              BrowserAgent.storageUtils.storageKeys.GEOLONG,
              BrowserAgent.globals.geoConstants.ERROR,
              !0
            );
    },
    geoLocationFound: function (a) {
      BrowserAgent.browserUtils.hasCustomGeoLocation() ||
        ((BrowserAgent.globals.geo.lat = a.coords.latitude),
        (BrowserAgent.globals.geo.lon = a.coords.longitude),
        BrowserAgent.storageUtils.putInStorage(
          BrowserAgent.storageUtils.storageTypes.SESSION,
          BrowserAgent.storageUtils.storageKeys.GEOLAT,
          BrowserAgent.globals.geo.lat,
          !0
        ),
        BrowserAgent.storageUtils.putInStorage(
          BrowserAgent.storageUtils.storageTypes.SESSION,
          BrowserAgent.storageUtils.storageKeys.GEOLONG,
          BrowserAgent.globals.geo.lon,
          !0
        ));
    },
    geoLocationNotFound: function (a) {
      if (!BrowserAgent.browserUtils.hasCustomGeoLocation()) {
        var b = !1;
        switch (a.code) {
          case a.PERMISSION_DENIED:
            BrowserAgent.logger.warn(
              "geoLocationNotFound: Browser indicates that user denied the request for geo-location."
            );
            b = !0;
            break;
          case a.POSITION_UNAVAILABLE:
            BrowserAgent.logger.warn(
              "geoLocationNotFound: Browser's geo-location information is unavailable."
            );
            break;
          case a.TIMEOUT:
            BrowserAgent.logger.warn(
              "geoLocationNotFound: Browser's request to obtain geo-location timed out."
            );
            break;
          default:
            BrowserAgent.logger.warn(
              "geoLocationNotFound: An unknown error occurred while browser attempted geo-location."
            );
        }
        b
          ? ((BrowserAgent.globals.geo.lat =
              BrowserAgent.globals.geoConstants.DENIED),
            (BrowserAgent.globals.geo.lon =
              BrowserAgent.globals.geoConstants.DENIED))
          : ((BrowserAgent.globals.geo.lat =
              BrowserAgent.globals.geoConstants.ERROR),
            (BrowserAgent.globals.geo.lon =
              BrowserAgent.globals.geoConstants.ERROR));
        BrowserAgent.storageUtils.putInStorage(
          BrowserAgent.storageUtils.storageTypes.SESSION,
          BrowserAgent.storageUtils.storageKeys.GEOLAT,
          BrowserAgent.globals.geo.lat,
          !0
        );
        BrowserAgent.storageUtils.putInStorage(
          BrowserAgent.storageUtils.storageTypes.SESSION,
          BrowserAgent.storageUtils.storageKeys.GEOLONG,
          BrowserAgent.globals.geo.lon,
          !0
        );
      }
    },
    convertToNum: function (a) {
      if ("Number" === BrowserAgent.browserUtils.getObjType(a) || null === a)
        return a;
      a = Number(a);
      return isNaN(a) ? null : a;
    },
    getObjType: function (a) {
      var b = typeof a;
      if ("object" !== typeof a) return b.charAt(0).toUpperCase() + b.slice(1);
      try {
        if (
          ((b = Object.prototype.toString.call(a).slice(8, -1)),
          "string" !== typeof b || "" === b)
        )
          return "Object";
      } catch (c) {
        BrowserAgent.logger.error("getObjType: " + c.message), (b = null);
      }
      return b;
    },
    cloneTrackerData: function () {
      var a = [],
        b = BrowserAgentBootstrap.origFuncMap.jsonParse(
          BrowserAgent.storageUtils.getFromStorage(
            BrowserAgent.storageUtils.storageTypes.SESSION,
            BrowserAgent.storageUtils.storageKeys.BATRKR
          )
        );
      if (!b) return a;
      for (var c in b) {
        var d = BrowserAgent.jsonStringify(b[c]);
        d !== BrowserAgent.globals.emptyObjStr && a.push(b[c]);
      }
      return a;
    },
    getXHRforBAMetrics: function () {
      BrowserAgentBootstrap.origFuncMap &&
      BrowserAgentBootstrap.origFuncMap.XHR &&
      BrowserAgentBootstrap.origFuncMap.XHROpen &&
      BrowserAgentBootstrap.origFuncMap.XHRSend
        ? ((BrowserAgent.browserUtils.XHRToSendMetrics =
            new BrowserAgentBootstrap.origFuncMap.XHR()),
          (BrowserAgent.browserUtils.XHRToSendMetrics.open =
            BrowserAgentBootstrap.origFuncMap.XHROpen),
          (BrowserAgent.browserUtils.XHRToSendMetrics.send =
            BrowserAgentBootstrap.origFuncMap.XHRSend))
        : (BrowserAgent.browserUtils.XHRToSendMetrics = new XMLHttpRequest());
    },
    replaceAll: function (a, b, c) {
      return "string" !== typeof a ||
        "string" !== typeof b ||
        "string" !== typeof c
        ? (BrowserAgent.logger.error("replaceAll: Invalid input"), null)
        : a.replace(new RegExp(b, "g"), c);
    },
    parseURL: function (a) {
      if ("string" !== typeof a || 1 > a.length)
        return (
          BrowserAgent.logger.warn(
            "parseURL: Not a valid URL. Skipping parse..."
          ),
          null
        );
      var b = document.createElement("a");
      b.href = a;
      a = b.port;
      0 === a.length &&
        ((a = 80), 0 === b.protocol.indexOf("https") && (a = 443));
      var c = b.pathname,
        d;
      c.charAt(0) !== BrowserAgent.globals.forwardSlashChar &&
        (c = BrowserAgent.globals.forwardSlashChar + c);
      -1 !== (d = c.indexOf(BrowserAgent.globals.semiColonChar)) &&
        (c = c.substring(0, d));
      return {
        hostname: decodeURIComponent(b.hostname),
        port: a,
        pathname: decodeURIComponent(c),
        hash: decodeURIComponent(b.hash),
        href: b.href,
        search: decodeURIComponent(b.search),
      };
    },
    getFullURL: function (a) {
      if ("string" !== typeof a || 1 > a.length)
        return (
          BrowserAgent.logger.warn(
            "getFullURL: Not a valid URL. Skipping parse..."
          ),
          null
        );
      var b = document.createElement("a");
      b.href = a;
      return b.href;
    },
    isJQPresent: function () {
      "undefined" !== typeof jQuery
        ? ((BrowserAgent.globals.isJQ = !0),
          null !== jQuery.fn.jquery.match(/^1\.\d+.*/)
            ? ((BrowserAgent.globals.isJQOne = !0),
              BrowserAgent.logger.info("isJQOnePresent: jQuery 1.x detected."))
            : (BrowserAgent.globals.isJQOne = !1))
        : ((BrowserAgent.globals.isJQ = !1),
          (BrowserAgent.globals.isJQOne = !1));
    },
    shouldPopulateMetrics: function () {
      return (
        !BrowserAgent.globals.isOnUnload ||
        (BrowserAgent.globals.isOnUnload && navigator && navigator.sendBeacon)
      );
    },
    getDefaultHttpStatusCodeMessage: function (a) {
      return "number" === typeof a &&
        BrowserAgent.globals.httpStatusCodeMessages[a]
        ? BrowserAgent.globals.httpStatusCodeMessages[a]
        : (BrowserAgent.logger.warn(
            "getDefaultHttpStatusCodeMessage: HTTP status code [" +
              a +
              "] does not comply to RFC, returning generic error message."
          ),
          BrowserAgent.globals.httpStatusCodeMessages[0]);
    },
    binarySearchByPropCompare: function (a, b, c) {
      for (var d = 0, e = a.length - 1, f; d <= e; ) {
        f = Math.floor((d + e) / 2);
        var g = BrowserAgent.browserUtils.binarySearchCompareFunction(
          a[f],
          b,
          c
        );
        if (0 > g) d = f + 1;
        else if (0 < g) e = f - 1;
        else return f;
      }
      return -(d + 1);
    },
    binarySearchCompareFunction: function (a, b, c) {
      return null === c ? a - b : a[c] - b;
    },
    binaryInsert: function (a, b, c) {
      c = BrowserAgent.browserUtils.binarySearchByPropCompare(
        a,
        null === c ? b : b[c],
        c
      );
      if (0 <= c) var d = c;
      else 0 > c && ((c += 1), 0 === c ? (d = 0) : 0 > c && (d = -1 * c));
      a.splice(d, 0, b);
    },
    getLastSegmentFromPathname: function (a) {
      var b = "",
        c = !1;
      if ("string" !== typeof a || 1 > a.length) return b;
      a[a.length - 1] === BrowserAgent.globals.forwardSlashChar &&
        ((c = !0), (a = a.slice(0, -1)));
      a = a.split(BrowserAgent.globals.forwardSlashChar);
      0 < a.length && (b = a[a.length - 1]);
      return c ? b + BrowserAgent.globals.forwardSlashChar : b;
    },
    setCustomPerformanceNow: function () {
      !1 === "performance" in window && (window.performance = {});
      Date.now =
        Date.now ||
        function () {
          return new Date().getTime();
        };
      if (!1 === "now" in window.performance) {
        var a = Date.now();
        performance.timing &&
          performance.timing.navigationStart &&
          (a = performance.timing.navigationStart);
        window.performance.now = function () {
          return Date.now() - a;
        };
      }
    },
  };
  BrowserAgent.configUtils = {
    configNames: {
      BROWSERLOGGINGENABLED: "browserLoggingEnabled",
      AJAXMETRICSENABLED: "ajaxMetricsEnabled",
      AJAXMETRICSTHRESHOLD: "ajaxMetricsThreshold",
      BROWSERAGENTENABLED: "browserAgentEnabled",
      COLLECTORURL: "collectorUrl",
      GEOENABLED: "geoEnabled",
      GEOHIGHACCURACYENABLED: "geoHighAccuracyEnabled",
      GEOMAXIMUMAGE: "geoMaximumAge",
      GEOTIMEOUT: "geoTimeout",
      JSERRORSENABLED: "jsErrorsEnabled",
      JSFUNCTIONMETRICSENABLED: "jsFunctionMetricsEnabled",
      JSFUNCTIONMETRICSTHRESHOLD: "jsFunctionMetricsThreshold",
      METRICFREQUENCY: "metricFrequency",
      PAGELOADMETRICSENABLED: "pageLoadMetricsEnabled",
      PAGELOADMETRICSTHRESHOLD: "pageLoadMetricsThreshold",
      SESSIONTIMEOUT: "sessionTimeout",
      URLEXCLUDELIST: "urlExcludeList",
      URLINCLUDELIST: "urlIncludeList",
      URLMETRICOFF: "urlMetricOff",
      DOMCHANGETIMEOUT: "domChangeTimeout",
      DOMCHANGEINTERVAL: "domChangePollingInterval",
      COOKIECAPTUREENABLED: "cookieCaptureEnabled",
      ERROREXCLUDELIST: "errorExcludeList",
      ERRORINCLUDELIST: "errorIncludeList",
      ERRORCLAMPPERINTERVAL: "errorClampPerInterval",
      EVENTCOLLECTIONCLAMPPERINTERVAL: "eventCollectionClampPerInterval",
      EVENTDISPATCHCLAMPPERINTERVAL: "eventDispatchClampPerInterval",
      RESOURCEMETRICSENABLED: "resourceMetricsEnabled",
      RESOURCEBUFFERSIZE: "resourceBufferSize",
      RESOURCEMETRICSTHRESHOLD: "resourceMetricsThreshold",
      METRICPAYLOADSENDTRYCOUNT: "metricPayloadSendTryCount",
      DEBUGGING_ENABLED: "debuggingEnabled",
    },
    defaults: {
      BROWSERLOGGINGENABLED: !1,
      AJAXMETRICSENABLED: !0,
      AJAXMETRICSTHRESHOLD: 100,
      BROWSERAGENTENABLED: !1,
      COLLECTORURL: "",
      GEOENABLED: !1,
      GEOHIGHACCURACYENABLED: !1,
      GEOMAXIMUMAGE: 1e4,
      GEOTIMEOUT: 5e3,
      JSERRORSENABLED: !0,
      JSFUNCTIONMETRICSENABLED: !1,
      JSFUNCTIONMETRICSTHRESHOLD: 100,
      METRICFREQUENCY: 3750,
      PAGELOADMETRICSENABLED: !0,
      PAGELOADMETRICSTHRESHOLD: 100,
      SESSIONTIMEOUT: 36e5,
      URLEXCLUDELIST: [],
      URLINCLUDELIST: [],
      URLMETRICOFF: !1,
      DOMCHANGETIMEOUT: 1e4,
      DOMCHANGEINTERVAL: 100,
      COOKIECAPTUREENABLED: !1,
      ERROREXCLUDELIST: [],
      ERRORINCLUDELIST: [],
      ERRORCLAMPPERINTERVAL: 100,
      EVENTCOLLECTIONCLAMPPERINTERVAL: 1e4,
      EVENTDISPATCHCLAMPPERINTERVAL: 2e4,
      RESOURCEMETRICSENABLED: !0,
      RESOURCEBUFFERSIZE: 2e3,
      RESOURCEMETRICSTHRESHOLD: 100,
      METRICPAYLOADSENDTRYCOUNT: 3,
      DEBUGGING_ENABLED: !1,
    },
    processAppProfile: function (a) {
      if (!a || !a.baAttributes)
        return (
          BrowserAgent.logger.error("processAppProfile: Invalid app profile."),
          !1
        );
      for (var b in BrowserAgent.configUtils.configNames) {
        var c = a.baAttributes[BrowserAgent.configUtils.configNames[b]],
          d = BrowserAgent.configUtils.defaults[b],
          e = BrowserAgent.browserUtils.getObjType(c);
        e === BrowserAgent.browserUtils.getObjType(d) &&
        ("Number" !== e || 0 <= c)
          ? (BrowserAgent.globals.configs[b] = c.valueOf())
          : (BrowserAgent.logger.info(
              "processAppProfile: " +
                BrowserAgent.configUtils.configNames[b] +
                " is not provided or invalid. Defaulting to " +
                BrowserAgent.jsonStringify(d)
            ),
            (BrowserAgent.globals.configs[b] = d));
      }
      for (b = 0; b < BrowserAgent.globals.configs.URLINCLUDELIST.length; b++)
        try {
          new RegExp(BrowserAgent.globals.configs.URLINCLUDELIST[b]);
        } catch (f) {
          BrowserAgent.logger.warn(
            "processAppProfile: " +
              BrowserAgent.configUtils.configNames.URLINCLUDELIST +
              " has invalid RegEx entries. Defaulting to: " +
              BrowserAgent.jsonStringify(
                BrowserAgent.configUtils.defaults.URLINCLUDELIST
              )
          );
          BrowserAgent.globals.configs.URLINCLUDELIST =
            BrowserAgent.configUtils.defaults.URLINCLUDELIST;
          break;
        }
      for (b = 0; b < BrowserAgent.globals.configs.URLEXCLUDELIST.length; b++)
        try {
          new RegExp(BrowserAgent.globals.configs.URLEXCLUDELIST[b]);
        } catch (f) {
          BrowserAgent.logger.warn(
            "processAppProfile: " +
              BrowserAgent.configUtils.configNames.URLEXCLUDELIST +
              " has invalid RegEx entries. Defaulting to: " +
              BrowserAgent.jsonStringify(
                BrowserAgent.configUtils.defaults.URLEXCLUDELIST
              )
          );
          BrowserAgent.globals.configs.URLEXCLUDELIST =
            BrowserAgent.configUtils.defaults.URLEXCLUDELIST;
          break;
        }
      for (
        b = 0;
        b < BrowserAgent.globals.configs.ERRORINCLUDELIST.length;
        b++
      ) {
        c = BrowserAgent.globals.configs.ERRORINCLUDELIST[b];
        if (!c.hasOwnProperty("url") || !c.hasOwnProperty("msg")) {
          BrowserAgent.logger.warn(
            "processAppProfile: " +
              BrowserAgent.configUtils.configNames.ERRORINCLUDELIST +
              ' list must include url and msg, in format: \n[ {"url": "RegEx", "msg" :"RegEx" }, { "url": "RegEx", "msg": "RegEx"} ] \ndefaulting to: ' +
              BrowserAgent.jsonStringify(
                BrowserAgent.configUtils.defaults.ERRORINCLUDELIST
              )
          );
          BrowserAgent.globals.configs.ERRORINCLUDELIST =
            BrowserAgent.configUtils.defaults.ERRORINCLUDELIST;
          break;
        }
        try {
          new RegExp(c.url), new RegExp(c.msg);
        } catch (f) {
          BrowserAgent.logger.warn(
            "processAppProfile: " +
              BrowserAgent.configUtils.configNames.ERRORINCLUDELIST +
              " has invalid RegEx entries. Defaulting to: " +
              BrowserAgent.jsonStringify(
                BrowserAgent.configUtils.defaults.ERRORINCLUDELIST
              )
          );
          BrowserAgent.globals.configs.ERRORINCLUDELIST =
            BrowserAgent.configUtils.defaults.ERRORINCLUDELIST;
          break;
        }
      }
      for (
        b = 0;
        b < BrowserAgent.globals.configs.ERROREXCLUDELIST.length;
        b++
      ) {
        c = BrowserAgent.globals.configs.ERROREXCLUDELIST[b];
        if (!c.hasOwnProperty("url") || !c.hasOwnProperty("msg")) {
          BrowserAgent.logger.warn(
            "processAppProfile: " +
              BrowserAgent.configUtils.configNames.ERROREXCLUDELIST +
              ' list must include url and msg, in format: \n[ {"url": "RegEx", "msg" :"RegEx" }, { "url": "RegEx", "msg": "RegEx"} ] \ndefaulting to: ' +
              BrowserAgent.jsonStringify(
                BrowserAgent.configUtils.defaults.ERROREXCLUDELIST
              )
          );
          BrowserAgent.globals.configs.ERROREXCLUDELIST =
            BrowserAgent.configUtils.defaults.ERROREXCLUDELIST;
          break;
        }
        try {
          new RegExp(c.url), new RegExp(c.msg);
        } catch (f) {
          BrowserAgent.logger.warn(
            "processAppProfile: " +
              BrowserAgent.configUtils.configNames.ERROREXCLUDELIST +
              " has invalid RegEx entries. Defaulting to: " +
              BrowserAgent.jsonStringify(
                BrowserAgent.configUtils.defaults.ERROREXCLUDELIST
              )
          );
          BrowserAgent.globals.configs.ERROREXCLUDELIST =
            BrowserAgent.configUtils.defaults.ERROREXCLUDELIST;
          break;
        }
      }
      7500 < BrowserAgent.globals.configs.METRICFREQUENCY &&
        (BrowserAgent.logger.warn(
          "processAppProfile: " +
            BrowserAgent.configUtils.configNames.METRICFREQUENCY +
            " is out of range. Defaulting to " +
            BrowserAgent.configUtils.defaults.METRICFREQUENCY
        ),
        (BrowserAgent.globals.configs.METRICFREQUENCY =
          BrowserAgent.configUtils.defaults.METRICFREQUENCY));
      5 > BrowserAgent.globals.configs.ERRORCLAMPPERINTERVAL &&
        (BrowserAgent.logger.warn(
          "processAppProfile: " +
            BrowserAgent.configUtils.configNames.ERRORCLAMPPERINTERVAL +
            " is out of range. Defaulting to " +
            BrowserAgent.configUtils.defaults.ERRORCLAMPPERINTERVAL
        ),
        (BrowserAgent.globals.configs.ERRORCLAMPPERINTERVAL =
          BrowserAgent.configUtils.defaults.ERRORCLAMPPERINTERVAL));
      BrowserAgent.globals.configs.EVENTCOLLECTIONCLAMPPERINTERVAL <
        BrowserAgent.globals.configs.ERRORCLAMPPERINTERVAL &&
        (BrowserAgent.logger.warn(
          "processAppProfile: " +
            BrowserAgent.configUtils.configNames
              .EVENTCOLLECTIONCLAMPPERINTERVAL +
            " is out of range. Defaulting to " +
            BrowserAgent.configUtils.defaults.EVENTCOLLECTIONCLAMPPERINTERVAL
        ),
        (BrowserAgent.globals.configs.EVENTCOLLECTIONCLAMPPERINTERVAL =
          BrowserAgent.configUtils.defaults.EVENTCOLLECTIONCLAMPPERINTERVAL));
      BrowserAgent.globals.configs.EVENTDISPATCHCLAMPPERINTERVAL <
        BrowserAgent.globals.configs.EVENTCOLLECTIONCLAMPPERINTERVAL &&
        (BrowserAgent.logger.warn(
          "processAppProfile: " +
            BrowserAgent.configUtils.configNames.EVENTDISPATCHCLAMPPERINTERVAL +
            " is out of range. Defaulting to " +
            BrowserAgent.configUtils.defaults.EVENTDISPATCHCLAMPPERINTERVAL
        ),
        (BrowserAgent.globals.configs.EVENTDISPATCHCLAMPPERINTERVAL =
          BrowserAgent.configUtils.defaults.EVENTDISPATCHCLAMPPERINTERVAL));
      if (
        50 > BrowserAgent.globals.configs.DOMCHANGEINTERVAL ||
        1e3 < BrowserAgent.globals.configs.DOMCHANGEINTERVAL
      )
        BrowserAgent.logger.warn(
          "processAppProfile: " +
            BrowserAgent.configUtils.configNames.DOMCHANGEINTERVAL +
            " is out of range. Defaulting to " +
            BrowserAgent.configUtils.defaults.DOMCHANGEINTERVAL
        ),
          (BrowserAgent.globals.configs.DOMCHANGEINTERVAL =
            BrowserAgent.configUtils.defaults.DOMCHANGEINTERVAL);
      if (
        200 > BrowserAgent.globals.configs.DOMCHANGETIMEOUT ||
        15e3 < BrowserAgent.globals.configs.DOMCHANGETIMEOUT
      )
        BrowserAgent.logger.warn(
          "processAppProfile: " +
            BrowserAgent.configUtils.configNames.DOMCHANGETIMEOUT +
            " is out of range. Defaulting to " +
            BrowserAgent.configUtils.defaults.DOMCHANGETIMEOUT
        ),
          (BrowserAgent.globals.configs.DOMCHANGETIMEOUT =
            BrowserAgent.configUtils.defaults.DOMCHANGETIMEOUT);
      BrowserAgent.globals.configs.DOMCHANGETIMEOUT <=
        BrowserAgent.globals.configs.DOMCHANGEINTERVAL &&
        (BrowserAgent.logger.warn(
          "processAppProfile: " +
            BrowserAgent.configUtils.configNames.DOMCHANGETIMEOUT +
            " cannot be less than or equal to " +
            BrowserAgent.configUtils.configNames.DOMCHANGEINTERVAL +
            ". Using default values."
        ),
        (BrowserAgent.globals.configs.DOMCHANGEINTERVAL =
          BrowserAgent.configUtils.defaults.DOMCHANGEINTERVAL),
        (BrowserAgent.globals.configs.DOMCHANGETIMEOUT =
          BrowserAgent.configUtils.defaults.DOMCHANGETIMEOUT));
      if (
        1 > BrowserAgent.globals.configs.METRICPAYLOADSENDTRYCOUNT ||
        10 < BrowserAgent.globals.configs.METRICPAYLOADSENDTRYCOUNT
      )
        BrowserAgent.logger.warn(
          "processAppProfile: " +
            BrowserAgent.configUtils.configNames.METRICPAYLOADSENDTRYCOUNT +
            " cannot be less than 1 or greater than 10 "
        ),
          BrowserAgent.logger.warn(
            "processAppProfile: " +
              BrowserAgent.configUtils.configNames.METRICPAYLOADSENDTRYCOUNT +
              " is out of range. Defaulting to " +
              BrowserAgent.configUtils.defaults.METRICPAYLOADSENDTRYCOUNT
          ),
          (BrowserAgent.globals.configs.METRICPAYLOADSENDTRYCOUNT =
            BrowserAgent.configUtils.defaults.METRICPAYLOADSENDTRYCOUNT);
      BrowserAgent.globals.configs.SESSIONTIMEOUT <
        BrowserAgent.globals.sessionTimeoutLowerLimit &&
        (BrowserAgent.logger.warn(
          "processAppProfile: " +
            BrowserAgent.configUtils.configNames.SESSIONTIMEOUT +
            " cannot be less than 1 min "
        ),
        BrowserAgent.logger.warn(
          "processAppProfile: " +
            BrowserAgent.configUtils.configNames.SESSIONTIMEOUT +
            " is out of range. Defaulting to " +
            BrowserAgent.globals.sessionTimeoutLowerLimit +
            "ms"
        ),
        (BrowserAgent.globals.configs.SESSIONTIMEOUT =
          BrowserAgent.globals.sessionTimeoutLowerLimit));
      BrowserAgent.globals.profileInfo =
        BrowserAgent.configUtils.extractProfileInfo(a);
      return !0;
    },
    getAppProfile: function (a) {
      BrowserAgent.browserUtils.getXHRforBAMetrics();
      var b = BrowserAgent.browserUtils.XHRToSendMetrics;
      b &&
        (b.open("GET", a, !0),
        (b.onreadystatechange = function () {
          if (this.readyState === this.DONE && 200 === this.status) {
            var a = null;
            try {
              a = BrowserAgentBootstrap.origFuncMap.jsonParse(b.responseText);
            } catch (d) {
              BrowserAgent.logger.error(
                "getAppProfile: Invalid app profile - " +
                  d.message +
                  ". Disabling Browser Agent..."
              );
              BrowserAgent.configUtils.disableBA();
              return;
            }
            BrowserAgent.logger.info(
              "getAppProfile: Successfully obtained new app profile."
            );
            BrowserAgent.configUtils.updateAppProfile(a);
          }
        }),
        b.send());
    },
    extractAppInfo: function () {
      var a =
        BrowserAgent.globals.hashChar +
        BrowserAgent.globals.snippetAttrNames.SCRIPT_ID.NEW +
        BrowserAgent.globals.commaChar +
        BrowserAgent.globals.hashChar +
        BrowserAgent.globals.snippetAttrNames.SCRIPT_ID.OLD;
      a = document.querySelector(a);
      if (!a)
        return (
          BrowserAgent.logger.error(
            "extractAppInfo: Snippet is not found. App information could not be extracted."
          ),
          !1
        );
      var b = a.getAttribute(BrowserAgent.globals.snippetAttrNames.PROFILE_URL);
      if ("string" !== typeof b || "" === b)
        BrowserAgent.logger.error(
          "extractAppInfo: Unable to obtain profile URL."
        ),
          (BrowserAgent.globals.profileURL = "");
      BrowserAgent.globals.profileURL = b;
      var c = a.getAttribute(BrowserAgent.globals.snippetAttrNames.APP_ID),
        d = a.getAttribute(BrowserAgent.globals.snippetAttrNames.APP_KEY),
        e = a.getAttribute(BrowserAgent.globals.snippetAttrNames.APP_VERSION),
        f = a.getAttribute(
          BrowserAgent.globals.snippetAttrNames.APP_USE_AXAAPP_NAME
        ),
        g = a.getAttribute(BrowserAgent.globals.snippetAttrNames.TENANT_ID),
        h = a.getAttribute(BrowserAgent.globals.snippetAttrNames.RESPONSE_BT);
      if (
        "string" !== typeof c ||
        "" === c ||
        "string" !== typeof d ||
        "" === d ||
        "string" !== typeof g ||
        "" === g
      )
        return (
          BrowserAgent.logger.error(
            "extractAppInfo: Unable to obtain App specific information."
          ),
          !1
        );
      h &&
        "" !== h &&
        (BrowserAgent.globals.pageBT = decodeURIComponent(
          BrowserAgent.browserUtils.replaceAll(h, "\\+", "%20")
        ));
      h = BrowserAgent.browserUtils.parseURL(
        a.getAttribute(BrowserAgent.globals.snippetAttrNames.SRC)
      );
      if (
        null !== h &&
        ((BrowserAgent.globals.BASrcFullPath = h.pathname + h.search + h.hash),
        (b = BrowserAgent.browserUtils.parseURL(b)))
      ) {
        BrowserAgent.globals.BALocalProfileUpdate =
          h.hostname === b.hostname && h.port === b.port ? !0 : !1;
        a = a.getAttribute(
          BrowserAgent.globals.snippetAttrNames.LOCAL_PROFILE_UPDATE
        );
        if ("string" !== typeof a || "" === a || "true" !== a) a = !1;
        BrowserAgent.globals.BALocalProfileUpdate = a
          ? a
          : BrowserAgent.globals.BALocalProfileUpdate;
      }
      a =
        BrowserAgent.globals.hashChar +
        BrowserAgent.globals.snippetAttrNames.SCRIPT_ID.EXT_NEW +
        BrowserAgent.globals.commaChar +
        BrowserAgent.globals.hashChar +
        BrowserAgent.globals.snippetAttrNames.SCRIPT_ID.EXT_OLD;
      a = document.querySelector(a);
      null !== a &&
        ((a = a.getAttribute(BrowserAgent.globals.snippetAttrNames.SRC)),
        null !== a &&
          ((a = BrowserAgent.browserUtils.parseURL(a)),
          (BrowserAgent.globals.extensionSrcFullPath =
            a.pathname + a.search + a.hash)));
      BrowserAgent.globals.appInfo = {
        id: c,
        key: d,
        tenantId: g,
        version: e,
        useAxaAppName: f,
      };
      return !0;
    },
    updateAppProfile: function (a) {
      var b = BrowserAgent.globals.configs.METRICFREQUENCY,
        c = BrowserAgent.globals.configs.JSERRORSENABLED,
        d = BrowserAgent.globals.configs.PAGELOADMETRICSENABLED,
        e = BrowserAgent.globals.configs.AJAXMETRICSENABLED;
      BrowserAgent.configUtils.processAppProfile(a)
        ? !1 === BrowserAgent.globals.configs.BROWSERAGENTENABLED
          ? (BrowserAgent.logger.info(
              "updateAppProfile: Browser Agent is DISABLED."
            ),
            BrowserAgent.configUtils.disableBA())
          : "string" !== typeof BrowserAgent.globals.configs.COLLECTORURL ||
            "" === BrowserAgent.globals.configs.COLLECTORURL
          ? (BrowserAgent.logger.warn(
              "updateAppProfile: Invalid collector url. Disabling Browser Agent..."
            ),
            BrowserAgent.configUtils.disableBA())
          : ((a = BrowserAgent.configUtils.isUrlExcluded(window.location.href)),
            BrowserAgent.globals.currPagePtr.isExcluded !== a &&
              !0 === a &&
              BrowserAgent.logger.info(
                "updateAppProfile: Page [" +
                  window.location.href +
                  "] is configured to be EXCLUDED. Skipping all instrumentation on this page..."
              ),
            (BrowserAgent.globals.currPagePtr.isExcluded = a),
            d !== BrowserAgent.globals.configs.PAGELOADMETRICSENABLED &&
              (!0 === BrowserAgent.globals.configs.PAGELOADMETRICSENABLED
                ? window.MutationObserver &&
                  window.history &&
                  (BrowserAgent.globals.isSoftPageLoad = !0)
                : BrowserAgent.pageUtils.disableSoftPages()),
            e !== BrowserAgent.globals.configs.AJAXMETRICSENABLED &&
              (!1 === BrowserAgent.globals.configs.AJAXMETRICSENABLED
                ? (BrowserAgent.funcUtils.deInstrumentFunc(
                    "XMLHttpRequest.prototype.open",
                    ["BrowserAgent.funcUtils.tracers.xhrOpenPre"],
                    null,
                    !1
                  ),
                  BrowserAgent.funcUtils.deInstrumentFunc(
                    "XMLHttpRequest.prototype.send",
                    ["BrowserAgent.funcUtils.tracers.xhrSendPre"],
                    null,
                    !1
                  ),
                  BrowserAgent.funcUtils.deInstrumentFunc(
                    "jQuery.ajaxSettings.xhr",
                    [],
                    ["BrowserAgent.funcUtils.tracers.jQXHRPost"],
                    !1
                  ))
                : (BrowserAgent.funcUtils.instrumentFunc(
                    "XMLHttpRequest.prototype.open",
                    [
                      {
                        name: "BrowserAgent.funcUtils.tracers.xhrOpenPre",
                        func: BrowserAgent.funcUtils.tracers.xhrOpenPre,
                      },
                    ],
                    null,
                    BrowserAgent.globals.funcInstrumentMaxRetryCount
                  ),
                  BrowserAgent.funcUtils.instrumentFunc(
                    "XMLHttpRequest.prototype.send",
                    [
                      {
                        name: "BrowserAgent.funcUtils.tracers.xhrSendPre",
                        func: BrowserAgent.funcUtils.tracers.xhrSendPre,
                      },
                    ],
                    null,
                    BrowserAgent.globals.funcInstrumentMaxRetryCount
                  ),
                  BrowserAgent.funcUtils.instrumentFunc(
                    "jQuery.ajaxSettings.xhr",
                    null,
                    [
                      {
                        name: "BrowserAgent.funcUtils.tracers.jQXHRPost",
                        func: BrowserAgent.funcUtils.tracers.jQXHRPost,
                      },
                    ],
                    BrowserAgent.globals.funcInstrumentMaxRetryCount
                  ))),
            c !== BrowserAgent.globals.configs.JSERRORSENABLED &&
              (!1 === BrowserAgent.globals.configs.JSERRORSENABLED
                ? (BrowserAgent.logger.info(
                    "updateAppProfile: JS Error Monitoring is DISABLED. Detaching from window.onerror event..."
                  ),
                  window.removeEventListener(
                    "error",
                    BrowserAgent.errorUtils.captureJSError
                  ))
                : BrowserAgent.errorUtils.init()),
            !0 === BrowserAgent.globals.configs.GEOENABLED
              ? BrowserAgent.browserUtils.getGeoLocation()
              : ((BrowserAgent.globals.geo.lat =
                  BrowserAgent.globals.geoConstants.ERROR),
                (BrowserAgent.globals.geo.lon =
                  BrowserAgent.globals.geoConstants.ERROR),
                delete BrowserAgent.globals.eumJSONShell.clientInfo
                  .geolocation),
            b !== BrowserAgent.globals.configs.METRICFREQUENCY &&
              BrowserAgent.globals.harvestIntervalId &&
              (clearInterval(BrowserAgent.globals.harvestIntervalId),
              (BrowserAgent.globals.harvestIntervalId = setInterval(
                BrowserAgent.evtUtils.harvestEvts,
                BrowserAgent.globals.configs.METRICFREQUENCY
              ))))
        : BrowserAgent.logger.info(
            "updateAppProfile: Using existing app profile."
          );
    },
    extractProfileInfo: function (a) {
      if (!a) return null;
      var b = {},
        c = !1;
      a.profileId && ((b.id = a.profileId), (c = !0));
      a.profileName && ((b.name = a.profileName), (c = !0));
      a.created && ((b.createdAt = a.created), (c = !0));
      a.lastUpdated && ((b.lastUpdatedAt = a.lastUpdated), (c = !0));
      return c ? b : null;
    },
    disableBA: function () {
      BrowserAgent.cookieUtils.clearBAResponseCookies();
      BrowserAgent.globals.harvestIntervalId &&
        (clearInterval(BrowserAgent.globals.harvestIntervalId),
        (BrowserAgent.globals.harvestIntervalId = null));
      BrowserAgent.globals.pageWithEventsMap = {};
      BrowserAgent.globals.pageBucketsMap = {};
      BrowserAgent.globals.sortedBucketList = [];
      BrowserAgent.globals.currTTimeEvtPtr = null;
      BrowserAgent.globals.currPagePtr = null;
      for (var a in BrowserAgent.globals.retryFuncIdMap)
        clearTimeout(BrowserAgent.globals.retryFuncIdMap[a]);
      window.removeEventListener(
        "error",
        BrowserAgent.errorUtils.captureJSError
      );
      window.removeEventListener(
        "beforeunload",
        BrowserAgent.pageUtils.unloadEventHandler,
        !0
      );
      window.removeEventListener(
        "pagehide",
        BrowserAgent.pageUtils.unloadEventHandler,
        !0
      );
      document.removeEventListener(
        "mousedown",
        BrowserAgent.pageUtils.mouseDownHandler,
        !0
      );
      BrowserAgent.pageUtils.disableSoftPages();
      BrowserAgent.globals.configs.BROWSERAGENTENABLED = !1;
      BrowserAgent.globals.configs.JSERRORSENABLED = !1;
      BrowserAgent.globals.configs.PAGELOADMETRICSENABLED = !1;
      BrowserAgent.globals.configs.AJAXMETRICSENABLED = !1;
      BrowserAgent.funcUtils.deInstrumentFunc("XMLHttpRequest.prototype.open");
      BrowserAgent.funcUtils.deInstrumentFunc("XMLHttpRequest.prototype.send");
      BrowserAgent.funcUtils.deInstrumentFunc("jQuery.ajaxSettings.xhr");
      BrowserAgent.globals.configs.JSFUNCTIONMETRICSENABLED = !1;
      BrowserAgent.globals.configs.GEOENABLED = !1;
      BrowserAgent.globals.configs.RESOURCEMETRICSENABLED = !1;
      BrowserAgent.globals.configs.BROWSERLOGGINGENABLED = !1;
      BrowserAgent.globals.isOnUnload ||
        (BrowserAgent.storageUtils.deleteFromStorage(
          BrowserAgent.storageUtils.storageTypes.SESSION,
          BrowserAgent.storageUtils.storageKeys.BATRKR
        ),
        BrowserAgent.storageUtils.deleteFromStorage(
          BrowserAgent.storageUtils.storageTypes.SESSION,
          BrowserAgent.storageUtils.storageKeys.BATTPERST
        ),
        BrowserAgent.storageUtils.deleteFromStorage(
          BrowserAgent.storageUtils.storageTypes.SESSION,
          BrowserAgent.storageUtils.storageKeys.GEOCUSTOM
        ));
    },
    isUrlExcluded: function (a) {
      if ("string" !== typeof a || 1 > a.length)
        return (
          BrowserAgent.logger.warn(
            "isUrlExcluded: Invalid URL. Skipping URL exclusion check..."
          ),
          !1
        );
      var b = BrowserAgent.globals.configs.URLINCLUDELIST,
        c = BrowserAgent.globals.configs.URLEXCLUDELIST;
      return (
        (0 < c.length && BrowserAgent.configUtils.isUrlInRegexList(a, c)) ||
        (0 < b.length && !BrowserAgent.configUtils.isUrlInRegexList(a, b))
      );
    },
    isUrlInRegexList: function (a, b) {
      for (var c = 0; c < b.length; c++)
        if (new RegExp(b[c]).test(a)) return !0;
      return !1;
    },
    isErrorExcluded: function (a, b) {
      if ("string" !== typeof a || 1 > a.length)
        return (
          BrowserAgent.logger.warn(
            "isErrorExcluded: Invalid URL. Skipping error exclusion check..."
          ),
          !1
        );
      if ("string" !== typeof b || 1 > b.length)
        return (
          BrowserAgent.logger.warn(
            "isErrorExcluded: Invalid msg. Skipping error exclusion check..."
          ),
          !1
        );
      var c = BrowserAgent.globals.configs.ERRORINCLUDELIST,
        d = BrowserAgent.globals.configs.ERROREXCLUDELIST;
      return (
        (0 < d.length &&
          BrowserAgent.configUtils.isErrorInRegexList(a, b, d)) ||
        (0 < c.length && !BrowserAgent.configUtils.isErrorInRegexList(a, b, c))
      );
    },
    isErrorInRegexList: function (a, b, c) {
      for (var d = 0; d < c.length; d++)
        if (new RegExp(c[d].url).test(a) && new RegExp(c[d].msg).test(b))
          return !0;
      return !1;
    },
  };
  BrowserAgent.storageUtils = {
    storageTypes: { SESSION: 0, LOCAL: 1 },
    storageKeys: {
      GEOLAT: "BALat",
      GEOLONG: "BALong",
      GEOCUSTOM: "BAGEOCustom",
      BAFINGERPRINT: "BAFinPrt",
      BASESSION_ID: "BASSID",
      BASESSION_STARTTIME: "BASSSTART",
      BALASTEVENT_TIME: "BALASTEVT",
      PATHNAME: window.location.pathname,
      BATRKR: "BATRKR",
      BATTPERST: "BATTPERST",
      PAYLOADRETRYLIST: "PAYLOADRETRYLIST",
      CHUNK_SEQ: "CHUNK_SEQ",
    },
    init: function () {
      try {
        sessionStorage.setItem("BATEST", "test"),
          sessionStorage.removeItem("BATEST"),
          localStorage.setItem("BATEST", "test"),
          localStorage.removeItem("BATEST");
      } catch (a) {
        BrowserAgent.logger.warn(
          "storageUtils.init: Access to browser storage is denied. Browser Agent may exhibit unexpected behavior."
        ),
          (BrowserAgent.globals.isStoragePresent = !1);
      }
    },
    putInStorage: function (a, b, c, d) {
      try {
        switch (b) {
          case BrowserAgent.storageUtils.storageKeys.BALASTEVENT_TIME:
            BrowserAgent.globals.lastEventTime = c;
        }
        if (BrowserAgent.globals.isStoragePresent)
          if (
            "string" !== typeof b ||
            null === c ||
            void 0 === c ||
            "boolean" !== typeof d
          )
            BrowserAgent.logger.warn("putInStorage: Invalid input.");
          else
            switch (a) {
              case BrowserAgent.storageUtils.storageTypes.SESSION:
                switch (b) {
                  case BrowserAgent.storageUtils.storageKeys.BASESSION_ID:
                  case BrowserAgent.storageUtils.storageKeys.BALASTEVENT_TIME:
                  case BrowserAgent.storageUtils.storageKeys.CHUNK_SEQ:
                  case BrowserAgent.storageUtils.storageKeys
                    .BASESSION_STARTTIME:
                    var e =
                      JSON.parse(
                        sessionStorage.getItem(BrowserAgent.globals.appInfo.key)
                      ) || {};
                    e[b] = c;
                    if (
                      d ||
                      (!d &&
                        null ===
                          sessionStorage.getItem(
                            BrowserAgent.globals.appInfo.key
                          ))
                    )
                      return sessionStorage.setItem(
                        BrowserAgent.globals.appInfo.key,
                        JSON.stringify(e)
                      );
                }
                (d || (!d && null === sessionStorage.getItem(b))) &&
                  sessionStorage.setItem(b, c);
                break;
              case BrowserAgent.storageUtils.storageTypes.LOCAL:
                (d || (!d && null === localStorage.getItem(b))) &&
                  localStorage.setItem(b, c);
            }
      } catch (f) {
        BrowserAgent.logger.error("putInStorage: " + f.message);
      }
    },
    getFromStorage: function (a, b) {
      try {
        if (!BrowserAgent.globals.isStoragePresent) {
          switch (b) {
            case BrowserAgent.storageUtils.storageKeys.BALASTEVENT_TIME:
              return BrowserAgent.globals.lastEventTime;
          }
          return null;
        }
        if ("string" !== typeof b)
          return (
            BrowserAgent.logger.warn("getFromStorage: Invalid input."), null
          );
        switch (a) {
          case BrowserAgent.storageUtils.storageTypes.SESSION:
            switch (b) {
              case BrowserAgent.storageUtils.storageKeys.BASESSION_ID:
              case BrowserAgent.storageUtils.storageKeys.BALASTEVENT_TIME:
              case BrowserAgent.storageUtils.storageKeys.CHUNK_SEQ:
              case BrowserAgent.storageUtils.storageKeys.BASESSION_STARTTIME:
                var c = JSON.parse(
                  sessionStorage.getItem(BrowserAgent.globals.appInfo.key)
                );
                return c ? c[b] : sessionStorage.getItem(b);
            }
            return sessionStorage.getItem(b);
          case BrowserAgent.storageUtils.storageTypes.LOCAL:
            return localStorage.getItem(b);
          default:
            return null;
        }
      } catch (d) {
        return BrowserAgent.logger.error("getFromStorage: " + d.message), null;
      }
    },
    deleteFromStorage: function (a, b) {
      try {
        if (!BrowserAgent.globals.isStoragePresent) return null;
        if ("string" !== typeof b)
          return (
            BrowserAgent.logger.warn("deleteFromStorage: Invalid input."), null
          );
        switch (a) {
          case BrowserAgent.storageUtils.storageTypes.SESSION:
            switch (b) {
              case BrowserAgent.storageUtils.storageKeys.BASESSION_ID:
              case BrowserAgent.storageUtils.storageKeys.BALASTEVENT_TIME:
              case BrowserAgent.storageUtils.storageKeys.CHUNK_SEQ:
              case BrowserAgent.storageUtils.storageKeys.BASESSION_STARTTIME:
                var c = JSON.parse(
                  sessionStorage.getItem(BrowserAgent.globals.appInfo.key)
                );
                return c && delete c[b]
                  ? sessionStorage.setItem(
                      BrowserAgent.globals.appInfo.key,
                      JSON.stringify(c)
                    )
                  : sessionStorage.removeItem(b);
            }
            return sessionStorage.removeItem(b);
          case BrowserAgent.storageUtils.storageTypes.LOCAL:
            return localStorage.removeItem(b);
          default:
            return null;
        }
      } catch (d) {
        return (
          BrowserAgent.logger.error("deleteFromStorage: " + d.message), null
        );
      }
    },
  };
  BrowserAgent.cookieUtils = {
    cookies: {
      BTRESP: "x-apm-brtm-response-bt",
      BTRESPID: "x-apm-brtm-response-bt-id",
      BTPAGERESP: "x-apm-brtm-response-bt-page",
      SERVERTIME: "x-apm-brtm-servertime",
      GAPTIME: "x-apm-brtm-gaptime",
      PLATFORM: "x-apm-brtm-bt-p",
      PLATFORMVER: "x-apm-brtm-bt-pv",
    },
    cookieKeys: {
      apmStartTimeChar: "startTime",
      apmEndTimeChar: "endTime",
      bsChar: "bs",
      btChar: "bt",
      btcChar: "btc",
      CorBrowsGUIDChar: "CorBrowsGUID",
      geoChar: "g",
      platformChar: "p",
      platformVerChar: "pv",
    },
    BAFINGERPRINT: "x-apm-ba-BAFinPrt",
    baCookieRegex: /x-apm-brtm-|WMRUMC|x-apm-ba-/,
    baResponseCookieRegex: /x-apm-brtm-response-bt/,
    init: function () {
      if (BrowserAgent.globals.pageBT) var a = BrowserAgent.globals.pageBT;
      else {
        var b = BrowserAgent.cookieUtils.cookies.BTPAGERESP;
        (a = BrowserAgent.browserUtils.getLastSegmentFromPathname(
          window.location.pathname
        )) && (b += "-" + encodeURIComponent(a));
        a = BrowserAgent.cookieUtils.getRawCookie(b);
        a ||
          ((b = BrowserAgent.cookieUtils.cookies.BTPAGERESP),
          (b += "-" + encodeURIComponent(window.location.pathname)),
          (a = BrowserAgent.cookieUtils.getRawCookie(b)));
        BrowserAgent.cookieUtils.deleteCookie(b, "/", null);
      }
      a
        ? BrowserAgent.cookieUtils.updateHPDataObjWithCookieData(
            BrowserAgent.cookieUtils.tokenizeCookieIntoMap(a, ",")
          )
        : BrowserAgent.logger.warn(
            "cookieUtils.init: Cannot get page bt cookie for url \x3d " +
              window.location.pathname
          );
      BrowserAgent.cookieUtils.deleteCookie(
        BrowserAgent.cookieUtils.cookies.SERVERTIME,
        "/",
        null
      );
      BrowserAgent.globals.platform ===
        BrowserAgent.globals.userAgents.IE.name &&
        10 > BrowserAgent.globals.platformVersion &&
        (BrowserAgent.globals.isOldXHR = !0);
    },
    deleteCookie: function (a, b, c) {
      if (a) {
        a = new RegExp(a);
        var d = null,
          e;
        if (0 < document.cookie.length) {
          var f = document.cookie.split(BrowserAgent.globals.semiColonChar);
          for (e = 0; e < f.length; e++) {
            var g = f[e].split(BrowserAgent.globals.equalChar);
            if (2 === g.length && a.test(g[0])) {
              d = g[0];
              break;
            }
          }
        }
        d &&
          (document.cookie =
            d +
            "\x3d; expires\x3dThu, 01-Jan-1970 00:00:01 GMT" +
            (c ? "; domain\x3d" + c : "") +
            (b ? "; path\x3d" + b : ""));
      } else
        BrowserAgent.logger.warn(
          "deleteCookie: Cannot delete cookie by name " + a
        );
    },
    getRawCookie: function (a) {
      if (!a)
        return (
          BrowserAgent.logger.warn("getRawCookie: Cannot obtain cookie " + a),
          null
        );
      a = new RegExp(a);
      var b;
      if (0 < document.cookie.length) {
        var c = document.cookie.split(BrowserAgent.globals.semiColonChar);
        for (b = 0; b < c.length; b++) {
          var d = c[b].split(BrowserAgent.globals.equalChar);
          if (2 === d.length && a.test(d[0]))
            return decodeURIComponent(
              BrowserAgent.browserUtils.replaceAll(d[1], "\\+", "%20")
            );
        }
      }
      return null;
    },
    tokenizeCookieIntoMap: function (a, b) {
      var c = {};
      if (!a || !b)
        return (
          BrowserAgent.logger.warn(
            "tokenizeCookieIntoMap : Cannot parse " + a + " by " + b
          ),
          c
        );
      a = a.replace(/["]/g, "");
      a = a.split(b);
      for (var d, e = 0; e < a.length; e++)
        (b = a[e].split("\x3d")),
          2 === b.length
            ? (c[b[0]] = b[1])
            : 2 < b.length &&
              ((d = a[e].indexOf("\x3d")), (c[b[0]] = a[e].substring(d + 1)));
      return c;
    },
    setRawCookie: function (a, b, c, d, e) {
      if (a) {
        var f = new Date(BrowserAgentBootstrap.origFuncMap.timeNow() + 1e3 * c);
        document.cookie =
          a +
          "\x3d" +
          encodeURIComponent(b) +
          (c ? "; expires\x3d" + f.toUTCString() : "") +
          (e ? "; domain\x3d" + e : "") +
          (d ? "; path\x3d" + d : "");
      } else
        BrowserAgent.logger.warn(
          "setRawCookie : Cannot set cookie with name " + a
        );
    },
    updateCookie: function (a, b) {
      if (a) {
        var c = BrowserAgentBootstrap.origFuncMap.jsonParse(
            this.getRawCookie(a)
          ),
          d = {},
          e;
        for (e in c) d[e] = c[e];
        if ("object" === typeof b)
          for (var f in b) null !== b[f] ? (d[f] = b[f]) : delete d[f];
        else d = b;
        this.setRawCookie(a, BrowserAgent.jsonStringify(d), null, "/", null);
      } else
        BrowserAgent.logger.warn(
          "updateCookie: Cannot update cookie with name " + a
        );
    },
    updateResDataObjWithCookieData: function (a, b) {
      if (a && b && "object" === typeof a && "object" === typeof b) {
        var c;
        for (c in BrowserAgent.cookieUtils.cookieKeys) {
          var d = BrowserAgent.cookieUtils.cookieKeys[c];
          a[d] && ((b[d] = a[d]), delete a[d]);
        }
        d = BrowserAgent.globals.agentCookieKeys;
        for (c in a)
          BrowserAgent.globals.agentCookieKeysRegexPattern.test(c) &&
            (b[d] || (b[d] = {}), (b[d][c] = a[c]));
        BrowserAgent.globals.defaultBTRegex.test(b.bt) &&
          ((b.bs = BrowserAgent.globals.UNDEFINED),
          (b.bt = BrowserAgent.globals.UNDEFINED),
          (b.btc = BrowserAgent.globals.UNDEFINED));
      } else
        BrowserAgent.logger.warn(
          "updateResDataObjWithCookieData: Cannot update object with data from cookie"
        );
    },
    updateHPDataObjWithCookieData: function (a) {
      if (a && "object" === typeof a) {
        var b;
        for (b in BrowserAgent.cookieUtils.cookieKeys) {
          var c = BrowserAgent.cookieUtils.cookieKeys[b];
          a[c] && ((BrowserAgent.globals[c] = a[c]), delete a[c]);
        }
        for (b in a)
          BrowserAgent.globals.agentCookieKeysRegexPattern.test(b) &&
            (BrowserAgent.globals.agentCookies ||
              (BrowserAgent.globals.agentCookies = {}),
            (BrowserAgent.globals.agentCookies[b] = a[b]));
        BrowserAgent.globals.defaultBTRegex.test(BrowserAgent.globals.bt) &&
          ((BrowserAgent.globals.bs = BrowserAgent.globals.UNDEFINED),
          (BrowserAgent.globals.bt = BrowserAgent.globals.UNDEFINED),
          (BrowserAgent.globals.btc = BrowserAgent.globals.UNDEFINED));
      } else
        BrowserAgent.logger.warn(
          "updateHPDataObjWithCookieData: Cannot update object with data from cookie"
        );
    },
    isCookieEnabled: function () {
      var a = !!navigator.cookieEnabled;
      !0 !== a &&
        ((document.cookie = "baTestCookie"),
        (a = -1 !== document.cookie.indexOf("baTestCookie")));
      return a;
    },
    getAppCookies: function () {
      if (!BrowserAgent.globals.isCookieEnabled)
        return (
          BrowserAgent.logger.warn(
            "getAppCookies: Cannot obtain cookie snapshot because cookies are disabled."
          ),
          null
        );
      var a = {};
      if (1 > document.cookie.length) return a;
      var b = document.cookie.split("; ");
      for (var c = 0; c < b.length; c++) {
        var d = b[c].split(BrowserAgent.globals.equalChar);
        BrowserAgent.cookieUtils.baCookieRegex.test(d[0]) ||
          (a[d[0]] = b[c].substring(d[0].length + 1));
      }
      return a;
    },
    clearBAResponseCookies: function () {
      try {
        if (!(1 > document.cookie.length)) {
          var a = document.cookie.split("; ");
          for (var b = 0; b < a.length; b++) {
            var c = a[b].split(BrowserAgent.globals.equalChar);
            BrowserAgent.cookieUtils.baResponseCookieRegex.test(c[0]) &&
              BrowserAgent.cookieUtils.deleteCookie(
                c[0],
                BrowserAgent.globals.forwardSlashChar,
                null
              );
          }
        }
      } catch (d) {
        BrowserAgent.logger.error(
          "clearBAResponseCookies: Could not clear BA cookies due to " +
            d.message
        );
      }
    },
  };
  BrowserAgent.errorUtils = {
    origWindowOnError: window.onerror,
    currErrCt: 0,
    errorKey: "jsError",
    errorType: {
      CLIENT: "CLIENT",
      NETWORK: "NETWORK",
      SUBTYPE: {
        EVAL: "EvalError",
        INT: "InternalError",
        CORS_ERR: "CORSError",
        RNG: "RangeError",
        REF: "ReferenceError",
        SYN: "SyntaxError",
        TYP: "TypeError",
        URI: "URIError",
        ERR: "error",
        TIMEOUT: "timeout",
        ABORT: "abort",
      },
    },
    errorDataFields: {
      NAME: "Name",
      TYP: "ErrType",
      SUB: "SubType",
      MSG: "Msg",
      SRC: "File",
      LIN: "Line",
      COL: "Col",
      STK: "Stack",
      STT: "StartTime",
      DUR: "Duration",
      LINENO: "lineno",
      COLNO: "colno",
    },
    init: function () {
      !1 === BrowserAgent.globals.configs.JSERRORSENABLED
        ? BrowserAgent.logger.info(
            "errorUtils.init: JS Error Monitoring is DISABLED."
          )
        : (BrowserAgent.logger.info(
            "errorUtils.init: Attaching to window.onerror event..."
          ),
          BrowserAgent.globals.userAgents.IE.name ===
            BrowserAgent.globals.platform &&
          9 === BrowserAgent.globals.userAgents.IE.ver
            ? (window.onerror = function (a, b, c) {
                BrowserAgent.errorUtils.captureJSErrorIE9(a, b, c);
                BrowserAgent.errorUtils.origWindowOnError &&
                  BrowserAgent.errorUtils.origWindowOnError.apply(
                    this,
                    arguments
                  );
              })
            : window.addEventListener(
                "error",
                BrowserAgent.errorUtils.captureJSError
              ));
    },
    captureCORSError: function (a, b) {
      BrowserAgent.errorUtils.captureJSError(
        BrowserAgent.errorUtils.createFrameErrorObj(a, b),
        !1
      );
    },
    createFrameErrorObj: function (a, b) {
      a = Error(
        BrowserAgent.errorUtils.errorType.SUBTYPE.CORS_ERR +
          " : Refused to display '" +
          a +
          "' in a frame because of 'X-Frame-Options' settings."
      );
      var c = {},
        d = BrowserAgent.errorUtils.errorDataFields.NAME.toLowerCase(),
        e = BrowserAgent.errorUtils.errorDataFields.STK.toLowerCase();
      c[d] = BrowserAgent.errorUtils.errorType.SUBTYPE.CORS_ERR;
      c[BrowserAgent.errorUtils.errorDataFields.TYP] =
        BrowserAgent.errorUtils.errorType.NETWORK;
      c[BrowserAgent.errorUtils.errorDataFields.SUB] =
        BrowserAgent.errorUtils.errorType.SUBTYPE.CORS_ERR;
      c[BrowserAgent.errorUtils.errorDataFields.MSG] = a.message;
      c[BrowserAgent.errorUtils.errorDataFields.SRC] = document.location.href;
      c[BrowserAgent.errorUtils.errorDataFields.LIN] = b.row;
      c[BrowserAgent.errorUtils.errorDataFields.COL] = b.col;
      c[e] =
        a.message +
        "\n\t at " +
        document.location.href +
        ":" +
        b.row +
        ":" +
        b.col;
      a[BrowserAgent.errorUtils.errorDataFields.LINENO] = b.row;
      a[BrowserAgent.errorUtils.errorDataFields.COLNO] = b.col;
      a.error = c;
      return a;
    },
    elementPointInCode: function (a, b) {
      b = b || 0;
      if (3 == a.nodeType) {
        a = a.parentNode;
        var c = a.outerHTML;
        b = c.indexOf("\x3e") + b + 1;
      } else b = 0;
      for (c = ""; a; ) {
        var d = a.outerHTML;
        if ((a = a.parentNode) && d) {
          var e = a.outerHTML;
          e && ((c = e), (b += c.indexOf(d)));
        }
      }
      a = c.substr(0, b).split("\n");
      return { row: a.length, col: a.pop().length };
    },
    captureJSError: function (a, b) {
      var c = null;
      try {
        if (a) {
          var d = null,
            e = null;
          a.error
            ? ((d = a.error.stack),
              (e = BrowserAgent.errorUtils.getSubType(a.error.name, a.message)))
            : (BrowserAgent.logger.info(
                "captureJSError: Stack information is unavailable from error object"
              ),
              (e = BrowserAgent.errorUtils.getSubType(null, a.message)));
          var f = b && !e ? a.message : e;
          var g = window.location.href;
          if (BrowserAgent.configUtils.isErrorExcluded(g, f))
            BrowserAgent.logger.info(
              "captureJSError: For page: " +
                g +
                " and message: " +
                f +
                ", has been excluded"
            );
          else if (
            (c = BrowserAgent.evtUtils.getEvtObject(
              BrowserAgent.globals.evtTypes.JSERR,
              !0,
              BrowserAgent.errorUtils.errorDataFields.STT
            ))
          )
            (c[BrowserAgent.errorUtils.errorDataFields.TYP] =
              BrowserAgent.errorUtils.errorType.CLIENT),
              (c[BrowserAgent.errorUtils.errorDataFields.SUB] = e),
              (c[BrowserAgent.errorUtils.errorDataFields.MSG] = a.message),
              (c[BrowserAgent.errorUtils.errorDataFields.SRC] = a.filename),
              (c[BrowserAgent.errorUtils.errorDataFields.LIN] = a.lineno),
              (c[BrowserAgent.errorUtils.errorDataFields.COL] = a.colno),
              (c[BrowserAgent.errorUtils.errorDataFields.STK] = d),
              (c.isDone = !0);
        } else
          BrowserAgent.logger.warn(
            "captureJSError: Could not capture error. Error object is unavailable."
          );
      } catch (h) {
        c && (c.isDelete = !0),
          BrowserAgent.logger.error(
            "captureJSError: Could not capture JS error due to " + h.message
          );
      }
    },
    captureJSErrorIE9: function (a, b, c) {
      BrowserAgent.errorUtils.captureJSError(
        { message: a, filename: b, lineno: c },
        !0
      );
    },
    getSubType: function (a, b) {
      if ("string" !== typeof a) {
        if ("string" !== typeof b)
          return (
            BrowserAgent.logger.warn(
              "getSubType: Could not obtain error subtype"
            ),
            null
          );
        a = b.split(":");
        return 2 > a.length ? null : a[0];
      }
      return a;
    },
    createResourceError: function (a, b, c, d, e, f) {
      var g = {};
      if (!a)
        BrowserAgent.logger.info(
          "createResourceError: Skipping creation of resource error as resource event object is not present. Perhaps, events are clamped."
        );
      else if (
        !a.isDelete &&
        (f || !a[BrowserAgent.globals.ajaxDataKeys.ERR])
      ) {
        if (!a[BrowserAgent.globals.ajaxDataKeys.ERR]) {
          if (
            BrowserAgent.evtUtils.isClamped(
              BrowserAgent.evtUtils.evtClampFlags.ERR.type,
              BrowserAgent.errorUtils.currErrCt,
              BrowserAgent.globals.configs.ERRORCLAMPPERINTERVAL
            )
          ) {
            a.isDelete = !0;
            return;
          }
          BrowserAgent.errorUtils.currErrCt++;
        }
        g[BrowserAgent.errorUtils.errorDataFields.STT] =
          BrowserAgentBootstrap.origFuncMap.timeNow();
        g[BrowserAgent.errorUtils.errorDataFields.TYP] =
          BrowserAgent.errorUtils.errorType.NETWORK;
        g[BrowserAgent.errorUtils.errorDataFields.SUB] = b;
        g[BrowserAgent.errorUtils.errorDataFields.MSG] =
          c || BrowserAgent.browserUtils.getDefaultHttpStatusCodeMessage(d);
        g[BrowserAgent.errorUtils.errorDataFields.STK] = e;
        a[BrowserAgent.globals.ajaxDataKeys.ERR] = g;
      }
    },
  };
  BrowserAgent.funcUtils = {
    tracerTypes: { PRE: "pre", POST: "post" },
    tracers: {
      xhrOpenPre: function () {
        try {
          var a = performance.now();
          this._BAState ||
            ((this._BAState = {}), (this._BAState.xhrOpenPre = {}));
          var b = arguments[arguments.length - 1];
          this._BAState.xhrOpenPre.isError = !1;
          this._BAState.xhrOpenPre._isAjaxInstrumented = !0;
          !1 === BrowserAgent.globals.configs.AJAXMETRICSENABLED
            ? (BrowserAgent.logger.info(
                "xhrOpenPre: AJAX Metrics are DISABLED."
              ),
              (this._BAState.xhrOpenPre._isAjaxInstrumented = !1))
            : BrowserAgent.globals.currPagePtr.isExcluded
            ? (this._BAState.xhrOpenPre._isAjaxInstrumented = !1)
            : ((this._BAState.xhrOpenPre._url = b.invocationData[1]),
              (this._BAState.xhrOpenPre._fullURL =
                BrowserAgent.browserUtils.getFullURL(
                  this._BAState.xhrOpenPre._url
                )),
              BrowserAgent.configUtils.isUrlExcluded(
                this._BAState.xhrOpenPre._fullURL
              )
                ? ((this._BAState.xhrOpenPre._isAjaxInstrumented = !1),
                  BrowserAgent.logger.info(
                    "xhrOpenPre: AJAX URL [" +
                      this._BAState.xhrOpenPre._fullURL +
                      "] is configured to be EXCLUDED."
                  ))
                : ((this._BAState.xhrOpenPre._httpMethod = b.invocationData[0]),
                  (this._BAState.xhrOpenPre._async = !0),
                  3 <= b.invocationData.length &&
                    (this._BAState.xhrOpenPre._async = b.invocationData[2]),
                  (BrowserAgent.globals.selfMonPerformance.ajax.totalTimeMS +=
                    performance.now() - a)));
        } catch (c) {
          (this._BAState.xhrOpenPre.isError = !0),
            BrowserAgent.logger.error(
              "xhrOpenPre (" +
                this._BAState.origFunctionName +
                "): " +
                c.message
            );
        }
      },
      xhrOnloadEndPost: function () {
        var a = performance.now();
        this._BAState.xhrSendPre.contentLen =
          BrowserAgent.funcUtils.calculateAjaxResponseSize(this);
        "number" === typeof this._BAState.xhrSendPre.contentLen &&
          (this._BAState.xhrSendPre.evtObj[
            BrowserAgent.globals.ajaxDataKeys.RESPONSE_CONTENT_LENGTH
          ] = this._BAState.xhrSendPre.contentLen);
        this._BAState.xhrSendPre.evtObj[
          BrowserAgent.globals.timestampNames.FIRST_BYTE
        ] ||
          this._BAState.xhrSendPre.contentLen ||
          (this._BAState.xhrSendPre.evtObj[
            BrowserAgent.globals.timestampNames.FIRST_BYTE
          ] =
            this._BAState.xhrSendPre.evtObj[
              BrowserAgent.globals.timestampNames.LAST_BYTE
            ]);
        this._BAState.xhrSendPre.evtObj[
          BrowserAgent.globals.ajaxDataKeys.STATUS_CODE
        ] = this.status;
        this._BAState.xhrSendPre.evtObj[
          BrowserAgent.globals.ajaxDataKeys.STATUS_TEXT
        ] = this.statusText;
        ((0 === this.status && 4 === this.readyState) ||
          (400 <= this.status && 600 >= this.status)) &&
          BrowserAgent.errorUtils.createResourceError(
            this._BAState.xhrSendPre.evtObj,
            BrowserAgent.errorUtils.errorType.SUBTYPE.ERR,
            this.statusText,
            this.status,
            null,
            !1
          );
        var b = BrowserAgent.funcUtils.getValueFromHeader(
          this,
          BrowserAgent.globals.snippetAttrNames.RESPONSE_BT
        );
        b ||
          (b = BrowserAgent.cookieUtils.getRawCookie(
            BrowserAgent.cookieUtils.cookies.BTRESP +
              "-" +
              this._BAState.xhrSendPre.evtObj.id
          ));
        b &&
          ((b = BrowserAgent.cookieUtils.tokenizeCookieIntoMap(b, ",")),
          BrowserAgent.cookieUtils.updateResDataObjWithCookieData(
            b,
            this._BAState.xhrSendPre.evtObj
          ));
        BrowserAgent.cookieUtils.deleteCookie(
          BrowserAgent.cookieUtils.cookies.BTRESP +
            "-" +
            this._BAState.xhrSendPre.evtObj.id,
          "/",
          null
        );
        if (
          ((b =
            this._BAState.xhrSendPre.evtObj[
              BrowserAgent.cookieUtils.cookieKeys.CorBrowsGUIDChar
            ]) &&
            BrowserAgent.globals.lastCorBrowserGUIDsUsed.hasItem(b)) ||
          this._BAState.xhrSendPre.evtObj[
            BrowserAgent.globals.ajaxDataKeys.STATUS_CODE
          ] === BrowserAgent.globals.httpStatusCodes.NOT_MODIFIED_304
        )
          delete this._BAState.xhrSendPre.evtObj[
            BrowserAgent.cookieUtils.cookieKeys.CorBrowsGUIDChar
          ],
            delete this._BAState.xhrSendPre.evtObj[
              BrowserAgent.cookieUtils.cookieKeys.apmStartTimeChar
            ],
            delete this._BAState.xhrSendPre.evtObj[
              BrowserAgent.cookieUtils.cookieKeys.apmEndTimeChar
            ];
        (b =
          this._BAState.xhrSendPre.evtObj[
            BrowserAgent.cookieUtils.cookieKeys.CorBrowsGUIDChar
          ]) && BrowserAgent.globals.lastCorBrowserGUIDsUsed.addItem(b);
        BrowserAgent.globals.selfMonPerformance.ajax.totalTimeMS +=
          performance.now() - a;
        BrowserAgent.globals.selfMonPerformance.ajax.numberOfAjax += 1;
        BrowserAgent.globals.selfMonPerformance.ajax.avgTimePerAjaxMS =
          BrowserAgent.globals.selfMonPerformance.ajax.totalTimeMS /
          BrowserAgent.globals.selfMonPerformance.ajax.numberOfAjax;
      },
      xhrSendPre: function () {
        var a = performance.now();
        this._BAState.xhrSendPre || (this._BAState.xhrSendPre = {});
        var b = arguments[arguments.length - 1];
        this._BAState.xhrSendPre.isError = !1;
        this._BAState.xhrSendPre.contentLen = null;
        try {
          if (
            !this._BAState.xhrOpenPre.isError &&
            this._BAState.xhrOpenPre._isAjaxInstrumented
          ) {
            this._BAState.xhrSendPre.evtObjTS =
              BrowserAgentBootstrap.origFuncMap.timeNow();
            this._BAState.xhrSendPre.evtObj =
              BrowserAgent.evtUtils.getEvtObject(
                BrowserAgent.globals.evtTypes.RES,
                !1,
                null
              );
            if (!this._BAState.xhrSendPre.evtObj) {
              this._BAState.xhrSendPre.isError = !0;
              return;
            }
            BrowserAgent.cookieUtils.setRawCookie(
              BrowserAgent.cookieUtils.cookies.BTRESPID,
              this._BAState.xhrSendPre.evtObj.id,
              2,
              "/",
              null
            );
            this._BAState.xhrSendPre.evtObj[
              BrowserAgent.globals.ajaxDataKeys.URL
            ] = this._BAState.xhrOpenPre._fullURL;
            this._BAState.xhrSendPre.evtObj[
              BrowserAgent.globals.ajaxDataKeys.METHOD
            ] = this._BAState.xhrOpenPre._httpMethod;
            this._BAState.xhrSendPre.evtObj[
              BrowserAgent.globals.ajaxDataKeys.ASYNC
            ] = this._BAState.xhrOpenPre._async;
            this._BAState.xhrSendPre.bodySize =
              BrowserAgent.funcUtils.calculateAjaxRequestSize(
                b.invocationData[0]
              );
            !this._BAState.xhrSendPre.isError &&
              this._BAState.xhrSendPre.bodySize &&
              (this._BAState.xhrSendPre.evtObj[
                BrowserAgent.globals.ajaxDataKeys.REQUEST_BODY_SIZE
              ] = this._BAState.xhrSendPre.bodySize);
            var c = this.onloadend,
              d = this.onreadystatechange,
              e = this.onload,
              f = this.onerror,
              g = this.ontimeout,
              h = this.onabort;
            this.onload = function () {
              var a = performance.now();
              if (e) {
                BrowserAgent.funcUtils.setCbkStart.apply(this, [
                  "xhrSendPre - onload pre",
                ]);
                BrowserAgent.globals.selfMonPerformance.ajax.totalTimeMS +=
                  performance.now() - a;
                var b = e.apply(this, arguments);
              }
              try {
                BrowserAgent.globals.isOldXHR &&
                  !this._BAState.xhrSendPre.isError &&
                  (BrowserAgent.funcUtils.tracers.xhrOnloadEndPost.apply(this),
                  this._BAState.xhrSendPre.evtObj[
                    BrowserAgent.globals.timestampNames.CALLBACK_END_TIME
                  ] ||
                    (this._BAState.xhrSendPre.evtObj[
                      BrowserAgent.globals.timestampNames.CALLBACK_END_TIME
                    ] = BrowserAgentBootstrap.origFuncMap.timeNow()),
                  BrowserAgent.funcUtils.evaluateAndAdjustEvtObject(
                    this._BAState.xhrSendPre
                  ));
              } catch (p) {
                (this._BAState.xhrSendPre.isError = !0),
                  this._BAState.xhrSendPre.evtObj &&
                    (this._BAState.xhrSendPre.evtObj.isDelete = !0),
                  BrowserAgent.logger.error(
                    "xhrSendPre - onload post (" +
                      this._BAState.xhrOpenPre._fullURL +
                      "): " +
                      p.message
                  );
              }
              return b;
            };
            this.onloadend = function () {
              var a = performance.now();
              if (c) {
                BrowserAgent.funcUtils.setCbkStart.apply(this, [
                  "xhrSendPre - onloadend pre",
                ]);
                BrowserAgent.globals.selfMonPerformance.ajax.totalTimeMS +=
                  performance.now() - a;
                var b = c.apply(this, arguments);
              }
              try {
                this._BAState.xhrSendPre.isError ||
                  (BrowserAgent.funcUtils.tracers.xhrOnloadEndPost.apply(this),
                  this._BAState.xhrSendPre.evtObj[
                    BrowserAgent.globals.timestampNames.CALLBACK_END_TIME
                  ] ||
                    (this._BAState.xhrSendPre.evtObj[
                      BrowserAgent.globals.timestampNames.CALLBACK_END_TIME
                    ] = BrowserAgentBootstrap.origFuncMap.timeNow()),
                  BrowserAgent.funcUtils.evaluateAndAdjustEvtObject(
                    this._BAState.xhrSendPre
                  ));
              } catch (p) {
                (this._BAState.xhrSendPre.isError = !0),
                  this._BAState.xhrSendPre.evtObj &&
                    (this._BAState.xhrSendPre.evtObj.isDelete = !0),
                  BrowserAgent.logger.error(
                    "xhrSendPre - onloadend post (" +
                      this._BAState.xhrOpenPre._fullURL +
                      "): " +
                      p.message
                  );
              }
              return b;
            };
            this.onreadystatechange = function () {
              var a = performance.now();
              try {
                this._BAState.xhrSendPre.isError ||
                  (this.readyState === this.LOADING
                    ? (this._BAState.xhrSendPre.evtObj[
                        BrowserAgent.globals.timestampNames.FIRST_BYTE
                      ] = BrowserAgentBootstrap.origFuncMap.timeNow())
                    : this.readyState === this.DONE &&
                      (this._BAState.xhrSendPre.evtObj[
                        BrowserAgent.globals.timestampNames.LAST_BYTE
                      ] = BrowserAgentBootstrap.origFuncMap.timeNow()));
              } catch (p) {
                (this._BAState.xhrSendPre.isError = !0),
                  this._BAState.xhrSendPre.evtObj &&
                    (this._BAState.xhrSendPre.evtObj.isDelete = !0),
                  BrowserAgent.logger.error(
                    "xhrSendPre - orsc pre 1 (" +
                      this._BAState.xhrOpenPre._fullURL +
                      "): " +
                      p.message
                  );
              }
              if (d) {
                this.readyState === this.DONE &&
                  BrowserAgent.funcUtils.setCbkStart.apply(this, [
                    "xhrSendPre - orsc pre 2",
                  ]);
                BrowserAgent.globals.selfMonPerformance.ajax.totalTimeMS +=
                  performance.now() - a;
                var b = d.apply(this, arguments);
              }
              return b;
            };
            this.onerror = function () {
              try {
                BrowserAgent.errorUtils.createResourceError(
                  this._BAState.xhrSendPre.evtObj,
                  BrowserAgent.errorUtils.errorType.SUBTYPE.ERR,
                  this.statusText,
                  this.status,
                  null,
                  !1
                );
              } catch (n) {
                (this._BAState.xhrSendPre.isError = !0),
                  this._BAState.xhrSendPre.evtObj &&
                    (this._BAState.xhrSendPre.evtObj.isDelete = !0),
                  BrowserAgent.logger.error(
                    "xhrSendPre - onerror pre 1 (" +
                      this._BAState.xhrOpenPre._fullURL +
                      "): " +
                      n.message
                  );
              }
              if (f) {
                BrowserAgent.funcUtils.setCbkStart.apply(this, [
                  "xhrSendPre - onerror pre 2",
                ]);
                var a = f.apply(this, arguments);
              }
              return a;
            };
            this.ontimeout = function () {
              try {
                BrowserAgent.globals.isOldXHR
                  ? this._BAState.xhrSendPre.evtObj &&
                    (this._BAState.xhrSendPre.evtObj.isDelete = !0)
                  : BrowserAgent.errorUtils.createResourceError(
                      this._BAState.xhrSendPre.evtObj,
                      BrowserAgent.errorUtils.errorType.SUBTYPE.TIMEOUT,
                      BrowserAgent.errorUtils.errorType.SUBTYPE.TIMEOUT,
                      this.status,
                      null,
                      !1
                    );
              } catch (n) {
                (this._BAState.xhrSendPre.isError = !0),
                  this._BAState.xhrSendPre.evtObj &&
                    (this._BAState.xhrSendPre.evtObj.isDelete = !0),
                  BrowserAgent.logger.error(
                    "xhrSendPre - ontimeout pre 1 (" +
                      this._BAState.xhrOpenPre._fullURL +
                      "): " +
                      n.message
                  );
              }
              if (g) {
                BrowserAgent.funcUtils.setCbkStart.apply(this, [
                  "xhrSendPre - ontimeout pre 2",
                ]);
                var a = g.apply(this, arguments);
              }
              return a;
            };
            this.onabort = function () {
              try {
                BrowserAgent.errorUtils.createResourceError(
                  this._BAState.xhrSendPre.evtObj,
                  BrowserAgent.errorUtils.errorType.SUBTYPE.ABORT,
                  BrowserAgent.errorUtils.errorType.SUBTYPE.ABORT,
                  this.status,
                  null,
                  !1
                );
              } catch (n) {
                (this._BAState.xhrSendPre.isError = !0),
                  this._BAState.xhrSendPre.evtObj &&
                    (this._BAState.xhrSendPre.evtObj.isDelete = !0),
                  BrowserAgent.logger.error(
                    "xhrSendPre - onabort pre 1 (" +
                      this._BAState.xhrOpenPre._fullURL +
                      "): " +
                      n.message
                  );
              }
              if (h) {
                BrowserAgent.funcUtils.setCbkStart.apply(this, [
                  "xhrSendPre - onabort pre 2",
                ]);
                var a = h.apply(this, arguments);
              }
              return a;
            };
            if (BrowserAgent.globals.isOldXHR) {
              var k,
                l = this.abort;
              this.abort = function () {
                try {
                  this._BAState.xhrSendPre.evtObj &&
                    (this._BAState.xhrSendPre.evtObj.isDelete = !0);
                } catch (m) {
                  (this._BAState.xhrSendPre.isError = !0),
                    BrowserAgent.logger.error(
                      "xhrSendPre - abort pre (" +
                        this._BAState.xhrOpenPre._fullURL +
                        "): " +
                        m.message
                    );
                }
                l && (k = l.apply(this, arguments));
                return k;
              };
            }
            this._BAState.xhrSendPre.evtObj[
              BrowserAgent.globals.timestampNames.REQUEST_START
            ] = BrowserAgentBootstrap.origFuncMap.timeNow();
            this._BAState.xhrSendPre.evtObj[
              BrowserAgent.globals.trackerDataKey
            ] = BrowserAgent.browserUtils.cloneTrackerData();
          }
        } catch (m) {
          (this._BAState.xhrSendPre.isError = !0),
            this._BAState.xhrSendPre.evtObj &&
              (this._BAState.xhrSendPre.evtObj.isDelete = !0),
            BrowserAgent.logger.error(
              "xhrSendPre (" +
                this._BAState.xhrOpenPre._fullURL +
                "): " +
                m.message
            );
        }
        BrowserAgent.globals.selfMonPerformance.ajax.totalTimeMS +=
          performance.now() - a;
      },
      JSFuncPre: function () {
        var a = arguments[arguments.length - 1];
        try {
          a.JSFuncPre || (a.JSFuncPre = {}),
            (a.JSFuncPre.isError = !1),
            (a.JSFuncPre.isInstrumented = !0),
            !1 === BrowserAgent.globals.configs.JSFUNCTIONMETRICSENABLED
              ? (BrowserAgent.logger.info(
                  "JSFuncPre (" +
                    a.origFunctionName +
                    "): JS Function Metrics are DISABLED."
                ),
                (a.JSFuncPre.isInstrumented = !1))
              : BrowserAgent.globals.currPagePtr.isExcluded
              ? (a.JSFuncPre.isInstrumented = !1)
              : ((a.JSFuncPre.evtObj = BrowserAgent.evtUtils.getEvtObject(
                  BrowserAgent.globals.evtTypes.FN,
                  !1,
                  BrowserAgent.globals.timestampNames.START_TIME
                )),
                a.JSFuncPre.evtObj || (a.JSFuncPre.isError = !0));
        } catch (b) {
          (a.JSFuncPre.isError = !0),
            a.JSFuncPre.evtObj && (a.JSFuncPre.evtObj.isDelete = !0),
            BrowserAgent.logger.error(
              "JSFuncPre (" + a.origFunctionName + "): " + b.message
            );
        }
      },
      JSFuncPost: function () {
        var a = arguments[arguments.length - 1];
        try {
          !a.JSFuncPre.isError &&
            a.JSFuncPre.isInstrumented &&
            ((a.JSFuncPre.evtObj[BrowserAgent.globals.trackerDataKey] =
              BrowserAgent.browserUtils.cloneTrackerData()),
            (a.JSFuncPre.evtObj[
              BrowserAgent.globals.timestampNames.REQUEST_START
            ] = BrowserAgentBootstrap.origFuncMap.timeNow()),
            (a.JSFuncPre.evtObj.fnName = a.origFunctionName),
            (a.JSFuncPre.evtObj.isDone = !0));
        } catch (b) {
          a.JSFuncPre.evtObj && (a.JSFuncPre.evtObj.isDelete = !0),
            BrowserAgent.logger.error(
              "JSFuncPost (" + a.origFunctionName + "): " + b.message
            );
        }
      },
      routeChangePre: function () {
        var a = arguments[arguments.length - 1];
        try {
          if (
            (a.routeChangePre || (a.routeChangePre = {}),
            (a.routeChangePre.isError = !1),
            (a.routeChangePre[BrowserAgent.globals.softPageDataKeys.START] =
              BrowserAgentBootstrap.origFuncMap.timeNow()),
            (a.routeChangePre[BrowserAgent.globals.trackerDataKey] =
              BrowserAgent.browserUtils.cloneTrackerData()),
            !BrowserAgent.globals.configs.PAGELOADMETRICSENABLED)
          )
            BrowserAgent.logger.info(
              "routeChangePre: Soft Page Metrics are DISABLED."
            );
          else if (
            BrowserAgent.globals.domChangeTimeoutId ||
            BrowserAgent.globals.domChangeTimerId
          )
            BrowserAgent.logger.debug(
              a.origFunctionName +
                " routeChangePre: DOM change tracking terminated by new route change."
            ),
              BrowserAgent.pageUtils.endDomTracking(
                a.routeChangePre[BrowserAgent.globals.softPageDataKeys.START]
              );
        } catch (b) {
          (a.routeChangePre.isError = !0),
            BrowserAgent.logger.error(
              "routeChangePre (" + a.origFunctionName + "): " + b.message
            );
        }
      },
      routeChangePost: function () {
        var a = arguments[arguments.length - 1];
        try {
          !1 !== BrowserAgent.globals.configs.BROWSERAGENTENABLED &&
            (BrowserAgent.pageUtils.addNewPageBucket(
              BrowserAgent.globals.pageBucketTypes.SP,
              window.location.href,
              a.routeChangePre[BrowserAgent.globals.softPageDataKeys.START],
              !0,
              a.routeChangePre[BrowserAgent.globals.trackerDataKey]
            ),
            BrowserAgent.globals.isSoftPageLoad &&
              (a.routeChangePre.isError ||
                BrowserAgent.pageUtils.startDomTracking(
                  a.routeChangePre[BrowserAgent.globals.softPageDataKeys.START],
                  a.routeChangePre[BrowserAgent.globals.trackerDataKey]
                )));
        } catch (b) {
          BrowserAgent.logger.error(
            "routeChangePost (" + a.origFunctionName + "): " + b.message
          );
        }
      },
      jQXHRPost: function () {
        BrowserAgent.globals.selfMonPerformance.jquery.numberOfJQ += 1;
        var a = performance.now(),
          b = arguments[arguments.length - 1];
        try {
          !1 !== BrowserAgent.globals.isJQ &&
            (b.jQXhrPost || (b.jQXhrPost = {}),
            "boolean" !== typeof BrowserAgent.globals.isJQ &&
              BrowserAgent.browserUtils.isJQPresent(),
            !0 !== b.jQXhrPost.isVisited &&
              ($.ajaxPrefilter(function (a, d, e) {
                var c = performance.now();
                if (!1 !== BrowserAgent.globals.configs.AJAXMETRICSENABLED) {
                  a._evtInfo = {};
                  a._evtInfo.evtId = BrowserAgent.globals.peekSequenceNum();
                  a._evtInfo.pageId = BrowserAgent.globals.currPagePtr.id;
                  var g = d.success,
                    h = d.complete,
                    k = d.error,
                    l;
                  BrowserAgent.globals.selfMonPerformance.jquery.totalTimeMS +=
                    performance.now() - c;
                  g &&
                    (a.success = function (a, d, e) {
                      c = performance.now();
                      var f;
                      try {
                        (f =
                          BrowserAgent.globals.pageBucketsMap[
                            this._evtInfo.pageId
                          ].evtMap[this._evtInfo.evtId]) &&
                          (f[
                            BrowserAgent.globals.timestampNames.CALLBACK_START_TIME
                          ] = BrowserAgentBootstrap.origFuncMap.timeNow());
                      } catch (t) {
                        (b.jQXhrPost.isError = !0),
                          f && (f.isDelete = !0),
                          BrowserAgent.logger.error(
                            "jQuery Success CBK Pre (" +
                              b.origFunctionName +
                              "): " +
                              t.message
                          );
                      }
                      BrowserAgent.globals.selfMonPerformance.jquery.totalTimeMS +=
                        performance.now() - c;
                      l = g.apply(this, arguments);
                      c = performance.now();
                      try {
                        !b.jQXhrPost.isError &&
                          f &&
                          (f[
                            BrowserAgent.globals.timestampNames.CALLBACK_END_TIME
                          ] = BrowserAgentBootstrap.origFuncMap.timeNow());
                      } catch (t) {
                        (b.jQXhrPost.isError = !0),
                          f && (f.isDelete = !0),
                          BrowserAgent.logger.error(
                            "jQuery Success CBK Post (" +
                              b.origFunctionName +
                              "): " +
                              t.message
                          );
                      }
                      BrowserAgent.globals.selfMonPerformance.jquery.totalTimeMS +=
                        performance.now() - c;
                      BrowserAgent.globals.selfMonPerformance.jquery.avgTimePerJQMS =
                        BrowserAgent.globals.selfMonPerformance.jquery
                          .totalTimeMS /
                        BrowserAgent.globals.selfMonPerformance.jquery
                          .numberOfJQ;
                      return l;
                    });
                  h &&
                    (a.complete = function (a, c) {
                      var d = performance.now();
                      try {
                        var e =
                          BrowserAgent.globals.pageBucketsMap[
                            this._evtInfo.pageId
                          ].evtMap[this._evtInfo.evtId];
                        b.jQXhrPost.isError ||
                          !e ||
                          e[
                            BrowserAgent.globals.timestampNames
                              .CALLBACK_START_TIME
                          ] ||
                          (e[
                            BrowserAgent.globals.timestampNames.CALLBACK_START_TIME
                          ] = BrowserAgentBootstrap.origFuncMap.timeNow());
                      } catch (q) {
                        (b.jQXhrPost.isError = !0),
                          e && (e.isDelete = !0),
                          BrowserAgent.logger.error(
                            "jQuery Complete CBK Pre (" +
                              b.origFunctionName +
                              "): " +
                              q.message
                          );
                      }
                      BrowserAgent.globals.selfMonPerformance.jquery.totalTimeMS +=
                        performance.now() - d;
                      var f = h.apply(this, arguments);
                      d = performance.now();
                      try {
                        !b.jQXhrPost.isError &&
                          e &&
                          (e[
                            BrowserAgent.globals.timestampNames.CALLBACK_END_TIME
                          ] = BrowserAgentBootstrap.origFuncMap.timeNow());
                      } catch (q) {
                        (b.jQXhrPost.isError = !0),
                          e && (e.isDelete = !0),
                          BrowserAgent.logger.error(
                            "jQuery Complete CBK Post (" +
                              b.origFunctionName +
                              "): " +
                              q.message
                          );
                      }
                      BrowserAgent.globals.selfMonPerformance.jquery.totalTimeMS +=
                        performance.now() - d;
                      BrowserAgent.globals.selfMonPerformance.jquery.avgTimePerJQMS =
                        BrowserAgent.globals.selfMonPerformance.jquery
                          .totalTimeMS /
                        BrowserAgent.globals.selfMonPerformance.jquery
                          .numberOfJQ;
                      return f;
                    });
                  a.error = function (a, c, d) {
                    var e;
                    try {
                      if (
                        (e =
                          BrowserAgent.globals.pageBucketsMap[
                            this._evtInfo.pageId
                          ].evtMap[this._evtInfo.evtId])
                      )
                        if (BrowserAgent.globals.isOldXHR)
                          (e.isDelete = !0), (b.jQXhrPost.isError = !0);
                        else {
                          if ("object" === typeof d) {
                            var f = d.message;
                            var g = d.stack;
                          } else f = d || a.statusText;
                          BrowserAgent.errorUtils.createResourceError(
                            e,
                            c,
                            f,
                            a.status,
                            g,
                            !0
                          );
                        }
                    } catch (u) {
                      (b.jQXhrPost.isError = !0),
                        e && (e.isDelete = !0),
                        BrowserAgent.logger.error(
                          "jQuery Error CBK Pre 1 (" +
                            b.origFunctionName +
                            "): " +
                            u.message
                        );
                    }
                    if (k) {
                      try {
                        !b.jQXhrPost.isError &&
                          e &&
                          (e[
                            BrowserAgent.globals.timestampNames.CALLBACK_START_TIME
                          ] = BrowserAgentBootstrap.origFuncMap.timeNow());
                      } catch (u) {
                        (b.jQXhrPost.isError = !0),
                          e && (e.isDelete = !0),
                          BrowserAgent.logger.error(
                            "jQuery Error CBK Pre 2 (" +
                              b.origFunctionName +
                              "): " +
                              u.message
                          );
                      }
                      var h = k.apply(this, arguments);
                      try {
                        !b.jQXhrPost.isError &&
                          e &&
                          (e[
                            BrowserAgent.globals.timestampNames.CALLBACK_END_TIME
                          ] = BrowserAgentBootstrap.origFuncMap.timeNow());
                      } catch (u) {
                        (b.jQXhrPost.isError = !0),
                          e && (e.isDelete = !0),
                          BrowserAgent.logger.error(
                            "jQuery Error CBK Post (" +
                              b.origFunctionName +
                              "): " +
                              u.message
                          );
                      }
                    }
                    return h;
                  };
                }
              }),
              (b.jQXhrPost.isVisited = !0),
              (BrowserAgent.globals.selfMonPerformance.jquery.totalTimeMS +=
                performance.now() - a)));
        } catch (c) {
          BrowserAgent.logger.error(
            "jQuery.ajaxSettings.xhrPost (" +
              b.origFunctionName +
              "): " +
              c.message
          );
        }
      },
    },
    evaluateAndAdjustEvtObject: function (a) {
      a.evtObj.isDone = !0;
      var b = BrowserAgent.globals.EVENT_THRESHOLD + 1;
      BrowserAgent.globals.lastUserMouseDown < a.evtObjTS &&
        (b = a.evtObjTS - BrowserAgent.globals.lastUserMouseDown);
      b <= BrowserAgent.globals.EVENT_THRESHOLD &&
        a.evtObj.bucketId !== BrowserAgent.globals.currPagePtr.bucketId &&
        null !== BrowserAgent.globals.prevPagePtr &&
        a.evtObj.bucketId === BrowserAgent.globals.prevPagePtr.bucketId &&
        ((b = BrowserAgent.evtUtils.getEvtObject(
          BrowserAgent.globals.evtTypes.RES,
          !1,
          null
        )),
        null !== b &&
          (BrowserAgent.evtUtils.transferEventObject(a.evtObj, b),
          (a.evtObj.isDone = !0),
          (a.evtObj.isDelete = !0),
          (a.evtObj = b),
          (a.evtObj.isDone = !0)));
    },
    init: function () {
      BrowserAgent.funcUtils.instrumentFunc(
        "XMLHttpRequest.prototype.open",
        [
          {
            name: "BrowserAgent.funcUtils.tracers.xhrOpenPre",
            func: BrowserAgent.funcUtils.tracers.xhrOpenPre,
          },
        ],
        null,
        BrowserAgent.globals.funcInstrumentMaxRetryCount
      );
      BrowserAgent.funcUtils.instrumentFunc(
        "XMLHttpRequest.prototype.send",
        [
          {
            name: "BrowserAgent.funcUtils.tracers.xhrSendPre",
            func: BrowserAgent.funcUtils.tracers.xhrSendPre,
          },
        ],
        null,
        BrowserAgent.globals.funcInstrumentMaxRetryCount
      );
      window.history &&
        window.MutationObserver &&
        (BrowserAgent.funcUtils.instrumentFunc(
          "history.pushState",
          [
            {
              name: "BrowserAgent.funcUtils.tracers.routeChangePre",
              func: BrowserAgent.funcUtils.tracers.routeChangePre,
            },
          ],
          [
            {
              name: "BrowserAgent.funcUtils.tracers.routeChangePost",
              func: BrowserAgent.funcUtils.tracers.routeChangePost,
            },
          ],
          BrowserAgent.globals.funcInstrumentMaxRetryCount
        ),
        BrowserAgent.funcUtils.instrumentFunc(
          "history.replaceState",
          [
            {
              name: "BrowserAgent.funcUtils.tracers.routeChangePre",
              func: BrowserAgent.funcUtils.tracers.routeChangePre,
            },
          ],
          [
            {
              name: "BrowserAgent.funcUtils.tracers.routeChangePost",
              func: BrowserAgent.funcUtils.tracers.routeChangePost,
            },
          ],
          BrowserAgent.globals.funcInstrumentMaxRetryCount
        ));
      BrowserAgent.funcUtils.instrumentFunc(
        "jQuery.ajaxSettings.xhr",
        null,
        [
          {
            name: "BrowserAgent.funcUtils.tracers.jQXHRPost",
            func: BrowserAgent.funcUtils.tracers.jQXHRPost,
          },
        ],
        BrowserAgent.globals.funcInstrumentMaxRetryCount
      );
      "undefined" !== typeof BrowserAgentExtension &&
        BrowserAgentExtension.extAddJSFuncToInstrument();
    },
    getFuncFromWindowScope: function (a) {
      try {
        return eval("window." + a + ";");
      } catch (b) {}
      return null;
    },
    cleanseTracerList: function (a, b, c) {
      var d,
        e = [];
      if ("Array" !== BrowserAgent.browserUtils.getObjType(b)) return e;
      for (var f = 0; f < b.length; f++) {
        var g = b[f].name;
        BrowserAgent.globals.tracerCacheMap[a][c].hasItem(g)
          ? BrowserAgent.logger.info(
              "cleanseTracerList: Found duplicate " +
                c +
                " tracer [" +
                g +
                "] for JS Function [" +
                a +
                "]. Ignoring it..."
            )
          : (d = BrowserAgent.funcUtils.getFuncFromWindowScope(g))
          ? ((b[f].func = d),
            e.push(b[f]),
            BrowserAgent.globals.tracerCacheMap[a][c].addItem(g))
          : BrowserAgent.logger.warn(
              "cleanseTracerList: Could not find tracer [" +
                g +
                "] for JS Function [" +
                a +
                "] in global scope. Ignoring it..."
            );
      }
      return e;
    },
    calculateAjaxRequestSize: function (a) {
      var b = BrowserAgent.browserUtils.getObjType(a),
        c = null;
      if ("String" === b) c = a.length;
      else if ("Blob" === b || "File" === b) c = a.size;
      else if ("ArrayBuffer" === b || "DataView" === b) c = a.byteLength;
      return c;
    },
    calculateAjaxResponseSize: function (a) {
      var b = null;
      try {
        var c = a.responseType,
          d =
            BrowserAgent.funcUtils.getValueFromHeader(
              a,
              BrowserAgent.globals.contentLengthHdrStr
            ) ||
            BrowserAgent.funcUtils.getValueFromHeader(
              a,
              BrowserAgent.globals.contentLengthHdrStrLowerCase
            );
        if (d) b = Number(d);
        else if ("" === c || "text" === c)
          b = a.responseText ? a.responseText.length : null;
      } catch (e) {
        BrowserAgent.logger.warn(
          "calculateAjaxResponseSize: Unable to obtain content length due to " +
            e.message
        ),
          (b = null);
      }
      return b;
    },
    getValueFromHeader: function (a, b) {
      try {
        var c = a.getAllResponseHeaders(),
          d = c.indexOf(b + BrowserAgent.globals.colonChar);
        a = null;
        if (-1 !== d) {
          var e = c.substring(d).split(/\r\n/)[0],
            f = e.indexOf(BrowserAgent.globals.colonChar);
          c = f + 1;
          1 <= f &&
            c < e.length &&
            ((a = e.slice(c)), (a = a.replace(/^\s*/, "")));
        }
        if (a)
          return decodeURIComponent(
            BrowserAgent.browserUtils.replaceAll(a, "\\+", "%20")
          );
      } catch (g) {
        BrowserAgent.logger.warn(
          "getValueFromHeader: Unable to obtain value for the key due to " +
            g.message
        );
      }
      return null;
    },
    getInstrumentedFunc: function (a, b) {
      var c = BrowserAgent.globals.functionsToInstrumentMap[b],
        d = function () {
          var e,
            f = [],
            g = !1;
          try {
            for (
              d._BAState.invocationData = arguments, e = 0;
              e < c.preList.length;
              e++
            )
              c.preList[e].args && (f = c.preList[e].args),
                f.push(d._BAState),
                c.preList[e].func.apply(this, f);
          } catch (k) {
            (g = !0),
              BrowserAgent.logger.error(
                "getInstrumentedFunc: Error in pre tracer(s) for JS Function [" +
                  b +
                  "] - " +
                  k.message
              );
          }
          var h = a.apply(this, arguments);
          try {
            d._BAState.funcRetVal = h;
            if (g) return h;
            f = [];
            for (e = 0; e < c.postList.length; e++)
              c.postList[e].args && (f = c.postList[e].args),
                f.push(d._BAState),
                c.postList[e].func.apply(this, f);
          } catch (k) {
            BrowserAgent.logger.error(
              "getInstrumentedFunc: Error in post tracer(s) for JS Function [" +
                b +
                "] - " +
                k.message
            );
          }
          return h;
        };
      d._BAState = {};
      d._BAState.origFunctionName = b;
      delete BrowserAgent.globals.retryFuncIdMap[b];
      return d;
    },
    instrumentFunc: function (a, b, c, d, e) {
      var f = "instrumentFunc: Instrumentation for JS Function [";
      try {
        if ("string" !== typeof a || 1 > a.length)
          BrowserAgent.logger.warn(
            "instrumentFunc: Skipping instrumentation for an invalid JS Function [" +
              a +
              "]"
          );
        else {
          f += a;
          var g = b ? b : [],
            h = c ? c : [],
            k = BrowserAgent.globals.functionsToInstrumentMap[a],
            l = BrowserAgent.funcUtils.isJSFuncTracerPresent(a);
          d === BrowserAgent.globals.funcInstrumentMaxRetryCount &&
            e &&
            (BrowserAgent.globals.tracerCacheMap[a] ||
              ((BrowserAgent.globals.tracerCacheMap[a] = {}),
              (BrowserAgent.globals.tracerCacheMap[a][
                BrowserAgent.funcUtils.tracerTypes.PRE
              ] = new BrowserAgent.Set()),
              (BrowserAgent.globals.tracerCacheMap[a][
                BrowserAgent.funcUtils.tracerTypes.POST
              ] = new BrowserAgent.Set())),
            (g = BrowserAgent.funcUtils.cleanseTracerList(
              a,
              g,
              BrowserAgent.funcUtils.tracerTypes.PRE
            )),
            (h = BrowserAgent.funcUtils.cleanseTracerList(
              a,
              h,
              BrowserAgent.funcUtils.tracerTypes.POST
            )),
            l ||
              (g.push({
                name: BrowserAgent.globals.jsFuncPreTracerName,
                func: BrowserAgent.funcUtils.tracers.JSFuncPre,
              }),
              h.unshift({
                name: BrowserAgent.globals.jsFuncPostTracerName,
                func: BrowserAgent.funcUtils.tracers.JSFuncPost,
              })));
          if (!k)
            BrowserAgent.globals.functionsToInstrumentMap[a] = {
              preList: g,
              postList: h,
            };
          else if (d === BrowserAgent.globals.funcInstrumentMaxRetryCount) {
            var m, n;
            l ? (m = k.preList.pop()) : (n = h.shift());
            k.preList = k.preList.concat(g);
            m && k.preList.push(m);
            n && k.postList.unshift(n);
            k.postList = k.postList.concat(h);
            return;
          }
          var p = BrowserAgent.funcUtils.getFuncFromWindowScope(a);
          p
            ? (BrowserAgent.funcUtils.saveOrigObj(a, p),
              BrowserAgent.logger.info(
                "instrumentFunc: Instrumenting JS Function [" + a + "]..."
              ),
              BrowserAgent.funcUtils.assignFunc(
                a,
                BrowserAgent.funcUtils.getInstrumentedFunc(p, a)
              ),
              BrowserAgent.logger.info(f + "] SUCCEEDED."))
            : 0 > d
            ? (BrowserAgent.logger.warn(
                f +
                  "] FAILED. This could be because it does not exist on this web page."
              ),
              delete BrowserAgent.globals.retryFuncIdMap[a],
              delete BrowserAgent.globals.functionsToInstrumentMap[a],
              delete BrowserAgent.globals.tracerCacheMap[a])
            : (d === BrowserAgent.globals.funcInstrumentMaxRetryCount &&
                BrowserAgent.logger.info(
                  "instrumentFunc: JS Function [" +
                    a +
                    "] could not be found in the browser window scope. Scheduling retry..."
                ),
              (BrowserAgent.globals.retryFuncIdMap[a] = setTimeout(function () {
                BrowserAgent.funcUtils.instrumentFunc(a, b, c, d - 1, e);
              }, BrowserAgent.globals.retryInterval)));
        }
      } catch (r) {
        BrowserAgent.logger.warn(f + "] FAILED."),
          delete BrowserAgent.globals.functionsToInstrumentMap[a],
          delete BrowserAgent.globals.tracerCacheMap[a],
          delete BrowserAgent.globals.retryFuncIdMap[a];
      }
    },
    deInstrumentFunc: function (a, b, c, d) {
      if ("string" !== typeof a || 1 > a.length)
        BrowserAgent.logger.warn(
          "deInstrumentFunc: Skipping De-instrumentation for an invalid JS Function [" +
            a +
            "]"
        );
      else if (
        !BrowserAgent.globals.functionsToInstrumentMap[a] ||
        (d && !BrowserAgent.globals.tracerCacheMap[a])
      )
        BrowserAgent.logger.warn(
          "deInstrumentFunc: Skipping De-instrumentation for an un-instrumented JS Function [" +
            a +
            "]"
        );
      else {
        var e;
        b ||
          ((b = []),
          d && (b = BrowserAgent.globals.tracerCacheMap[a].pre.getAll()));
        c ||
          ((c = []),
          d && (c = BrowserAgent.globals.tracerCacheMap[a].post.getAll()));
        if (d) {
          for (e = 0; e < b.length; e++)
            BrowserAgent.globals.tracerCacheMap[a].pre.removeItem(b[e]);
          for (e = 0; e < c.length; e++)
            BrowserAgent.globals.tracerCacheMap[a].post.removeItem(c[e]);
        }
        BrowserAgent.globals.functionsToInstrumentMap[a].preList =
          BrowserAgent.funcUtils.filterTracers(
            BrowserAgent.globals.functionsToInstrumentMap[a].preList,
            b
          );
        BrowserAgent.globals.functionsToInstrumentMap[a].postList =
          BrowserAgent.funcUtils.filterTracers(
            BrowserAgent.globals.functionsToInstrumentMap[a].postList,
            c
          );
        d &&
          BrowserAgent.globals.tracerCacheMap[a].pre.isEmpty() &&
          BrowserAgent.globals.tracerCacheMap[a].post.isEmpty() &&
          (delete BrowserAgent.globals.tracerCacheMap[a],
          (BrowserAgent.globals.functionsToInstrumentMap[a].preList =
            BrowserAgent.funcUtils.filterTracers(
              BrowserAgent.globals.functionsToInstrumentMap[a].preList,
              [BrowserAgent.globals.jsFuncPreTracerName]
            )),
          (BrowserAgent.globals.functionsToInstrumentMap[a].postList =
            BrowserAgent.funcUtils.filterTracers(
              BrowserAgent.globals.functionsToInstrumentMap[a].postList,
              [BrowserAgent.globals.jsFuncPostTracerName]
            )));
      }
    },
    filterTracers: function (a, b) {
      return a.filter(function (a) {
        return 0 > b.indexOf(a.name);
      });
    },
    isJSFuncTracerPresent: function (a) {
      if (!BrowserAgent.globals.functionsToInstrumentMap[a]) return !1;
      a = BrowserAgent.globals.functionsToInstrumentMap[a].preList;
      for (var b = 0; b < a.length; b++)
        if (a[b].name === BrowserAgent.globals.jsFuncPreTracerName) return !0;
      return !1;
    },
    setCbkStart: function (a) {
      try {
        this._BAState.xhrSendPre.isError ||
          this._BAState.xhrSendPre.evtObj[
            BrowserAgent.globals.timestampNames.CALLBACK_START_TIME
          ] ||
          (this._BAState.xhrSendPre.evtObj[
            BrowserAgent.globals.timestampNames.CALLBACK_START_TIME
          ] = BrowserAgentBootstrap.origFuncMap.timeNow());
      } catch (b) {
        (this._BAState.xhrSendPre.isError = !0),
          this._BAState.xhrSendPre.evtObj &&
            (this._BAState.xhrSendPre.evtObj.isDelete = !0),
          BrowserAgent.logger.error(
            a + " (" + this._BAState.xhrOpenPre._fullURL + "): " + b.message
          );
      }
    },
    assignFunc: function (a, b) {
      b && eval("window." + a + " \x3d b;");
    },
    saveOrigObj: function (a, b) {
      b && a
        ? (BrowserAgentBootstrap.origFuncMap[a] = b)
        : BrowserAgent.logger.warn(
            "saveOrigObj: Cannot save original object without key or the object itself."
          );
    },
  };
  BrowserAgent.jsonUtils = {
    jsonConstants: {
      SCHEMA_VERSION: "2.0",
      CREATOR_NAME: "BA",
      CREATOR_VERSION: "1.0",
      APP_VERSION: "1.0",
    },
    createURLXAttribute: function (a) {
      return a ? BrowserAgent.jsonUtils.createXAttribute("url", a, null) : null;
    },
    createTT: function (a, b, c, d, e, f, g, h, k) {
      var l = {},
        m = !1,
        n = { x_attributeList: [] },
        p = c;
      if (0 < c && 0 < d && 0 < f && 0 < g && (c > d || c + e < d)) {
        if (!h || isNaN(h) || h < d) h = d;
        p = c + Math.ceil((f - (h - d)) / 2) + h - g;
        p > d && (p = d);
      }
      f || (p = d);
      p < c - 6e5 && ((p = c), (b = null));
      a && ((l.path = a), (m = !0));
      "number" !== typeof e || isNaN(e) || ((l.duration = e), (m = !0));
      d && b && ((l.correlationBrowserGUID = b), (m = !0));
      "number" !== typeof c || isNaN(c) || ((l.startTime = c), (m = !0));
      d &&
        b &&
        "number" === typeof p &&
        !isNaN(p) &&
        ((l.adjustedStartTime = p), (m = !0));
      if ("undefined" !== typeof BrowserAgentExtension) {
        BrowserAgentExtension.extAddCustomOptionalProperty();
        if (0 < BrowserAgentExtension.extCustomOptionalPropertyList.length) {
          for (
            a = 0;
            a < BrowserAgentExtension.extCustomOptionalPropertyList.length;
            a++
          )
            (b = BrowserAgentExtension.extCustomOptionalPropertyList[a]),
              BrowserAgent.jsonUtils.addToList(
                BrowserAgent.jsonUtils.createXAttribute(
                  b.name,
                  b.value,
                  b.description
                ),
                n.x_attributeList
              );
          BrowserAgentExtension.extCustomOptionalPropertyList = [];
        }
        a = BrowserAgentBootstrap.origFuncMap.jsonParse(
          BrowserAgent.storageUtils.getFromStorage(
            BrowserAgent.storageUtils.storageTypes.SESSION,
            BrowserAgent.storageUtils.storageKeys.BATTPERST
          )
        );
        for (var r in a) n.x_attributeList = n.x_attributeList.concat(a[r]);
        n.x_attributeList = m
          ? n.x_attributeList.concat({
              name: BrowserAgent.globals.traceSource,
              value: BrowserAgent.globals.traceSourceBrowser,
            })
          : n.x_attributeList;
        n.x_attributeList = m
          ? n.x_attributeList.concat({
              name: "TTPlugin.globalAttribute.AXAAppName",
              value: BrowserAgent.globals.appInfo.id,
            })
          : n.x_attributeList;
        0 < n.x_attributeList.length && ((l.x_attributes = n), (m = !0));
      }
      k &&
        ((l.bucketId = k),
        l.adjustedStartTime || (l.adjustedStartTime = l.startTime),
        (m = !0));
      return m ? l : null;
    },
    createMetric: function (a, b, c, d, e) {
      if (!BrowserAgent.jsonUtils.validateMetric(a, b, c, d, e))
        return (
          BrowserAgent.logger.info(
            "createMetric: Invalid metric input. Discard metric..."
          ),
          null
        );
      if ("undefined" !== typeof BrowserAgentExtension) {
        if (a) {
          a = a.split("|");
          var f = a[2 < a.length ? 2 : a.length - 1];
          if (void 0 === f || (f && ("/" === f.trim() || "" === f.trim())))
            a[2 < a.length ? 2 : a.length - 1] =
              "/" + BrowserAgent.globals.appInfo.id;
          ("true" === BrowserAgent.globals.appInfo.useAxaAppName ||
            !0 === BrowserAgent.globals.appInfo.useAxaAppName) &&
            1 <= a.length &&
            (a[1] = BrowserAgent.globals.appInfo.id);
          if (
            (f = sessionStorage.getItem(
              BrowserAgent.storageUtils.storageKeys.BATTPERST
            ))
          )
            if ((f = JSON.parse(f).axa_transaction))
              for (var g in f) {
                var h = f[g];
                if (
                  h &&
                  h.name &&
                  h.name ===
                    BrowserAgentExtension.internal.axaExtDataKeys.TXNNAME
                ) {
                  a[2 < a.length ? 2 : a.length - 1] = h.value;
                  a.join("|");
                  break;
                }
              }
          a = a.join("|");
        }
        if ((g = BrowserAgentExtension.extNameFormatter(a, b, c, d, e))) {
          if (
            !BrowserAgent.jsonUtils.validateMetric(
              g.path,
              g.name,
              g.unit,
              g.accumulatorType,
              g.value
            )
          )
            return (
              BrowserAgent.logger.info(
                "createMetric: Invalid metric input after Name Formatter. Discard metric..."
              ),
              null
            );
          a = g.path;
          b = g.name;
          c = g.unit;
          d = g.accumulatorType;
          e = g.value;
        }
      }
      b = { path: a, name: b, accumulatorType: d, value: e.toString() };
      0 === d && c && (b.unit = c);
      return b;
    },
    validateMetric: function (a, b, c, d, e) {
      if (
        "string" !== typeof a ||
        0 === a.length ||
        "string" !== typeof b ||
        0 === b.length ||
        "number" !== typeof d
      )
        return !1;
      switch (d) {
        case BrowserAgent.globals.metricAggregatorType.STRING:
          if ("string" !== typeof e || 1 > e.length) return !1;
          break;
        default:
          if ("number" !== typeof e || isNaN(e) || 0 > e) return !1;
      }
      for (var f in BrowserAgent.globals.metricAggregatorType)
        if (d === BrowserAgent.globals.metricAggregatorType[f]) return !0;
      return !1;
    },
    createBS: function (a, b, c) {
      return a && a !== BrowserAgent.globals.UNDEFINED
        ? {
            name: a,
            businessTransactionList: [
              { name: b, transactions: { transactionList: [{ name: c }] } },
            ],
          }
        : null;
    },
    addToList: function (a, b) {
      b && a && b.push(a);
    },
    createAPMData: function (a, b) {
      var c = {},
        d = !1;
      a && 0 < a.length && ((c.metrics = { metricList: a }), (d = !0));
      b &&
        0 < b.length &&
        ((c.transactionTraces = { transactionTraceList: b }), (d = !0));
      return d ? c : null;
    },
    createRequest: function (a, b, c) {
      var d = {},
        e = !1;
      "string" === typeof a && 0 < a.length && ((d.url = a), (e = !0));
      "string" === typeof b &&
        0 < b.length &&
        ((d.method = b.toUpperCase()), (e = !0));
      "number" === typeof c && 0 < c && ((d.bodySize = c), (e = !0));
      return e ? d : null;
    },
    createResponse: function (a, b, c) {
      var d = {},
        e = !1;
      "number" === typeof a && ((d.status = a), (e = !0));
      "string" === typeof b && 0 < b.length && (d.statusText = b);
      c && (d.content = c);
      return e ? d : null;
    },
    createContent: function (a) {
      var b = {},
        c = !1;
      "number" === typeof a && ((b.size = a), (c = !0));
      return c ? b : null;
    },
    createResource: function (a, b, c, d, e, f, g, h, k) {
      var l = {},
        m = !1;
      "string" === typeof a && (l.type = a);
      "string" === typeof b && (l.subType = b);
      "number" === typeof c && (l.timeStamp = c);
      d && (l.businessService = d);
      e && ((l.apmData = e), (m = !0));
      f && ((l.request = f), (m = !0));
      g && ((l.response = g), (m = !0));
      h && (l.error = h);
      k && ((l.axaData = k), (m = !0));
      return m ? l : null;
    },
    createError: function (a, b, c, d, e, f, g, h, k, l) {
      var m = {},
        n = !1;
      a && ((m.type = a), (n = !0));
      "string" === typeof b && 0 < b.length && ((m.subType = b), (n = !0));
      "string" === typeof c && 0 < c.length && ((m.message = c), (n = !0));
      "string" === typeof d && 0 < d.length && ((m.source = d), (n = !0));
      e && ((m.lineNumber = e), (n = !0));
      f && ((m.columnNumber = f), (n = !0));
      "string" === typeof g && 0 < g.length && ((m.stackTrace = g), (n = !0));
      "number" === typeof h && ((m.timeStamp = h), (n = !0));
      k && ((m.apmData = k), (n = !0));
      l && ((m.axaData = l), (n = !0));
      return n ? m : null;
    },
    createXAttribute: function (a, b, c) {
      if (!a || !b) return null;
      var d = {};
      d.name = a;
      d.value = b.toString();
      c && (d.description = c);
      return d;
    },
    createCookies: function (a) {
      if (!a) return null;
      var b = [],
        c = !1,
        d;
      for (d in a) d && a[d] && (b.push({ name: d, value: a[d] }), (c = !0));
      return c ? { cookieList: b } : null;
    },
    createAXAData: function (a) {
      return a && 0 < a.length ? { axaEventList: a } : null;
    },
    createAUTOAXAData: function (a, b, c, d) {
      if (!a || !a.url) return null;
      var e = [],
        f = [],
        g = !1,
        h = BrowserAgent.browserUtils.parseURL(a.url);
      if (h && h.pathname) {
        var k = BrowserAgentExtension.extNameFormatter(
          h.pathname,
          null,
          null,
          null,
          null
        );
        h.pathname = k && k.path ? k.path : h.pathname;
        k = "SP" === a.pageType || h.hash ? !0 : !1;
        !h.pathname ||
          ("/" !== h.pathname && "" !== h.pathname.trim()) ||
          (h.pathname = "/" + BrowserAgent.globals.appInfo.id);
        k =
          k && h && h.hash && 0 < h.hash.length
            ? b || ("#/" !== h.hash && "HP" != a.pageType)
              ? h.pathname + "_" + h.hash
              : h.pathname
            : h.pathname;
        var l = c ? c : a.time;
        var m = d
          ? d
          : a.endTime
          ? a.endTime
          : BrowserAgentBootstrap.origFuncMap.timeNow();
        e.push(BrowserAgent.jsonUtils.createXAttribute("ca_at", k));
        e.push(BrowserAgent.jsonUtils.createXAttribute("ca_as", k));
        e.push(BrowserAgent.jsonUtils.createXAttribute("txn_s", l));
        e.push(BrowserAgent.jsonUtils.createXAttribute("mode", "AUTO"));
      }
      0 < e.length &&
        (f.push({
          eventName: "apptxn_start",
          eventType: "txn_events",
          eventValue: k,
          timeStamp: l,
          x_attributes: { x_attributeList: e },
        }),
        f.push({
          eventName: "apptxn_end",
          eventType: "txn_events",
          eventValue: k,
          timeStamp: m,
          x_attributes: { x_attributeList: e },
        }));
      0 < f.length && (g = !0);
      return g ? { axaEventList: f } : null;
    },
    createInternalData: function (a, b) {
      if (!a) return null;
      var c = BrowserAgent.globals.agentCookiePrefix,
        d = {},
        e = [],
        f;
      for (f in b) {
        var g = c + b[f];
        if (a[g]) {
          d[g] = a[g];
          var h = !0;
          delete a[g];
        }
      }
      for (f in a)
        e.push(BrowserAgent.jsonUtils.createXAttribute(f, a[f])), (h = !0);
      0 < e.length && (d.x_attributes = { x_attributeList: e });
      return h ? d : null;
    },
    updateEUMWithGeo: function (a) {
      var b = BrowserAgent.storageUtils.getFromStorage(
          BrowserAgent.storageUtils.storageTypes.SESSION,
          BrowserAgent.storageUtils.storageKeys.GEOCUSTOM
        ),
        c = null;
      null !== b &&
        ((c = BrowserAgentBootstrap.origFuncMap.jsonParse(b)),
        (BrowserAgent.globals.geo.lat = c.lat),
        (BrowserAgent.globals.geo.lon = c.lon));
      (a.clientInfo.geolocation && null === c) ||
        ((b = BrowserAgent.globals.geo) &&
          b.lat &&
          b.lon &&
          -90 <= b.lat &&
          90 >= b.lat &&
          -180 <= b.lon &&
          180 >= b.lon &&
          (a.clientInfo.geolocation = { latitude: b.lat, longitude: b.lon }));
    },
  };
  BrowserAgent.RetrySendEventXHR = function (a, b) {
    this.retryCount = BrowserAgent.globals.configs.METRICPAYLOADSENDTRYCOUNT;
    this.url = a;
    this.sendData = b;
    this.sendDataAsString = BrowserAgent.jsonStringify(this.sendData);
    this.retryDelay = Math.floor(1e3 * Math.random());
    this.retryInstance = BrowserAgent.browserUtils.generateUUID();
    this.hasStarted = !1;
    this.retryCountOnErrorCBFunction = null;
    BrowserAgent.evtUtils.addToRetryPayloadsMap(
      this.retryInstance,
      this.url,
      this.sendData
    );
    var c = this;
    this._setupXHR = function () {
      c.perfStart = performance.now();
      BrowserAgent.browserUtils.getXHRforBAMetrics();
      var a = BrowserAgent.browserUtils.XHRToSendMetrics;
      a
        ? ((a.onerror = function () {
            0 < c.retryCount
              ? (BrowserAgent.evtUtils.addToRetryPayloadsMap(
                  c.retryInstance,
                  c.url,
                  c.sendData
                ),
                --c.retryCount,
                (c.retryDelay = Math.floor(
                  Math.random() * BrowserAgent.globals.MINIMUM_RETRY_DELAY +
                    BrowserAgent.globals.MINIMUM_RETRY_DELAY
                )),
                BrowserAgent.logger.error(
                  "sendMetrics.setupXHR.onerror: payload error. Retry attempts left: " +
                    c.retryCount +
                    ". Going to retry in: " +
                    c.retryDelay +
                    " ms."
                ),
                setTimeout(c._setupXHR, c.retryDelay))
              : BrowserAgent.logger.error(
                  "sendMetrics.setupXHR.onerror: payload error. No more retries left"
                );
            c.retryCountOnErrorCBFunction &&
              c.retryCountOnErrorCBFunction(c.retryCount);
          }),
          (a.onreadystatechange = function () {
            if (
              this.readyState === this.DONE &&
              (204 === this.status && BrowserAgent.globals.BALocalProfileUpdate
                ? (BrowserAgent.logger.info(
                    "sendMetrics.setupXHR.orsc: Browser Agent app profile updated. Getting new app profile..."
                  ),
                  BrowserAgent.configUtils.getAppProfile(
                    BrowserAgent.globals.profileURL
                  ))
                : 0 === this.status &&
                  BrowserAgent.logger.error(
                    "sendMetrics.setupXHR.orsc: Browser Agent metrics send error. Browser is most likely discarding them."
                  ),
              0 !== this.status)
            ) {
              c.perfEnd = performance.now();
              BrowserAgent.globals.selfMonPerformance.payload.numberOfPayloads += 1;
              BrowserAgent.globals.selfMonPerformance.payload.totalSizeBytes +=
                c.sendDataAsString.length;
              if (
                0 ===
                  BrowserAgent.globals.selfMonPerformance.payload
                    .minSizeBytes ||
                BrowserAgent.globals.selfMonPerformance.payload.minSizeBytes >
                  c.sendDataAsString.length
              )
                BrowserAgent.globals.selfMonPerformance.payload.minSizeBytes =
                  c.sendDataAsString.length;
              BrowserAgent.globals.selfMonPerformance.payload.maxSizeBytes <
                c.sendDataAsString.length &&
                (BrowserAgent.globals.selfMonPerformance.payload.maxSizeBytes =
                  c.sendDataAsString.length);
              BrowserAgent.globals.selfMonPerformance.payload.avgSizeBytes =
                BrowserAgent.globals.selfMonPerformance.payload.totalSizeBytes /
                BrowserAgent.globals.selfMonPerformance.payload
                  .numberOfPayloads;
              var a = c.perfEnd - c.perfStart;
              18e5 > a &&
                (BrowserAgent.globals.selfMonPerformance.payload.totalNetworkTimeMS +=
                  a);
              BrowserAgent.globals.selfMonPerformance.payload.avgNetworkTimeMS =
                BrowserAgent.globals.selfMonPerformance.payload
                  .totalNetworkTimeMS /
                BrowserAgent.globals.selfMonPerformance.payload
                  .numberOfPayloads;
              BrowserAgent.globals.selfMonPerformance.payload.lastTime =
                BrowserAgentBootstrap.origFuncMap.timeNow();
              BrowserAgent.globals.selfMonPerformance.payload.bytesPerSecond =
                (BrowserAgent.globals.selfMonPerformance.payload
                  .totalSizeBytes /
                  (BrowserAgent.globals.selfMonPerformance.payload.lastTime -
                    BrowserAgent.globals.selfMonPerformance.payload
                      .startTime)) *
                1e3;
            }
          }),
          a.open("POST", c.url, !0),
          a.setRequestHeader(
            "Content-type",
            "application/json; charset\x3dutf-8"
          ),
          BrowserAgent.evtUtils.removeFromRetryPayloadsMap(c.retryInstance),
          a.send(c.sendDataAsString),
          BrowserAgent.logger.debug(
            "sendMetrics.setupXHR: Sending POST with " + c.sendDataAsString
          ))
        : BrowserAgent.logger.error(
            "sendMetrics.setupXHR: XHR could not be instantiated. Cannot send Browser Agent metrics to URL: " +
              c.url +
              " with data as " +
              c.sendDataAsString
          );
    };
  };
  BrowserAgent.RetrySendEventXHR.prototype.start = function (a) {
    this.hasStarted
      ? BrowserAgent.logger.warn(
          "RetrySendEventXHR.prototype.start: start can't be called more than once on this instance"
        )
      : ((this.hasStarted = !0),
        a && (this.retryCountOnErrorCBFunction = a),
        this._setupXHR());
  };
  BrowserAgent.evtUtils = {
    currEvtCt: 0,
    evtClampMask: 0,
    evtClampFlags: {
      ERR: { type: "ERR", desc: " ERROR DATA COLLECTION ", code: 1 },
      COL: { type: "COL", desc: " EVENT DATA COLLECTION ", code: 2 },
      SND: { type: "SND", desc: " EVENT DISPATCH ", code: 4 },
    },
    init: function () {
      BrowserAgent.evtUtils.setEvtHndlr(
        BrowserAgent.globals.evtTypes.HPLOAD,
        BrowserAgent.evtUtils.handleHPLoadEvt
      );
      BrowserAgent.evtUtils.setEvtHndlr(
        BrowserAgent.globals.evtTypes.SPLOAD,
        BrowserAgent.evtUtils.handleSPLoadEvt
      );
      BrowserAgent.evtUtils.setEvtHndlr(
        BrowserAgent.globals.evtTypes.RES,
        BrowserAgent.evtUtils.handleResEvt
      );
      BrowserAgent.evtUtils.setEvtHndlr(
        BrowserAgent.globals.evtTypes.JSERR,
        BrowserAgent.evtUtils.handleJSErrEvt
      );
      BrowserAgent.evtUtils.setEvtHndlr(
        BrowserAgent.globals.evtTypes.FN,
        BrowserAgent.evtUtils.handleFnEvt
      );
      BrowserAgent.evtUtils.setEvtHndlr(
        BrowserAgent.globals.evtTypes.APMEXT,
        BrowserAgent.evtUtils.handleAPMExtEvt
      );
      BrowserAgent.evtUtils.setEvtHndlr(
        BrowserAgent.globals.evtTypes.AXAEXT,
        BrowserAgent.evtUtils.handleAXAExtEvt
      );
      BrowserAgent.evtUtils.setEvtHndlr(
        BrowserAgent.globals.evtTypes.TTIME,
        BrowserAgent.evtUtils.handleTTimeEvt
      );
    },
    isValidResEvt: function (a) {
      if (!a) return !1;
      var b = !1;
      a[BrowserAgent.globals.timestampNames.REQUEST_START] &&
        a[BrowserAgent.globals.ajaxDataKeys.URL] &&
        (b = !0);
      return b &&
        a[BrowserAgent.globals.RAW_RESOURCE_TIME_DATA] &&
        a[BrowserAgent.globals.timestampNames.LAST_BYTE]
        ? !0
        : !1 === a[BrowserAgent.globals.ajaxDataKeys.ASYNC] ||
          BrowserAgent.globals.isJQOne ||
          0 === a.status ||
          a.err
        ? b
        : !!(
            b &&
            a[BrowserAgent.globals.timestampNames.LAST_BYTE] &&
            a[BrowserAgent.globals.timestampNames.FIRST_BYTE]
          );
    },
    getEvtObject: function (a, b, c, d, e) {
      void 0 === d && (d = BrowserAgent.globals.currPagePtr);
      var f = BrowserAgentBootstrap.origFuncMap.timeNow();
      if (
        d.isExcluded ||
        BrowserAgent.evtUtils.isClamped(
          BrowserAgent.evtUtils.evtClampFlags.COL.type,
          BrowserAgent.evtUtils.currEvtCt,
          BrowserAgent.globals.configs.EVENTCOLLECTIONCLAMPPERINTERVAL
        ) ||
        (a === BrowserAgent.globals.evtTypes.JSERR &&
          BrowserAgent.evtUtils.isClamped(
            BrowserAgent.evtUtils.evtClampFlags.ERR.type,
            BrowserAgent.errorUtils.currErrCt,
            BrowserAgent.globals.configs.ERRORCLAMPPERINTERVAL
          ))
      )
        return null;
      var g = BrowserAgent.globals.getSequenceNum();
      !BrowserAgent.browserUtils.isSameSession(f) || e
        ? (e = BrowserAgent.pageUtils.addNewPageBucket(
            d.json.pageType,
            d.json.url,
            f,
            !1,
            BrowserAgent.browserUtils.cloneTrackerData()
          )) && (d = e)
        : BrowserAgent.storageUtils.putInStorage(
            BrowserAgent.storageUtils.storageTypes.SESSION,
            BrowserAgent.storageUtils.storageKeys.BALASTEVENT_TIME,
            f,
            !0
          );
      d.evtMap[g] = { id: g, type: a, bucketId: d.bucketId };
      d.evtCount += 1;
      BrowserAgent.globals.pageWithEventsMap[d.id] = 1;
      b &&
        (d.evtMap[g][BrowserAgent.globals.trackerDataKey] =
          BrowserAgent.browserUtils.cloneTrackerData());
      c && (d.evtMap[g][c] = f);
      BrowserAgent.evtUtils.currEvtCt += 1;
      a === BrowserAgent.globals.evtTypes.JSERR &&
        (BrowserAgent.errorUtils.currErrCt += 1);
      return d.evtMap[g];
    },
    transferEventObject: function (a, b, c) {
      if (null !== a && null !== b) {
        "undefined" === typeof c && (c = Object.keys(b));
        var d,
          e = new BrowserAgent.Set();
        for (d = 0; d < c.length; d++) e.addItem(c[d]);
        c = Object.keys(a);
        for (d = 0; d < c.length; d++) {
          var f = c[d];
          e.hasItem(f) || (b[f] = a[f]);
        }
      }
    },
    setEvtHndlr: function (a, b) {
      BrowserAgent.globals.evtTypes[a] && "function" === typeof b
        ? (BrowserAgent.globals.evtHandlers[a] = b)
        : BrowserAgent.logger.warn(
            "setEvtHndlr: Cannot set event handler for event type [" + a + "]"
          );
    },
    handleHPLoadEvt: function (a, b, c) {
      if (!c) return !1;
      if (!a || !b || !BrowserAgent.globals.configs.PAGELOADMETRICSENABLED)
        return (c.isDelete = !0), !1;
      b.pageLoadFlag = !0;
      if (!c.raw)
        return (
          (c.isDelete = !0),
          BrowserAgent.logger.warn(
            "handleHPLoadEvt: Obtained invalid page load data point. Deleting it..."
          ),
          !1
        );
      var d = c.raw.loadEventEnd - c.raw.navigationStart;
      if (0 <= d && d < BrowserAgent.globals.configs.PAGELOADMETRICSTHRESHOLD)
        return (
          BrowserAgent.logger.info(
            "handleHPLoadEvt: Skipping harvest of Page metrics for as it is below the configured Page metric threshold (" +
              BrowserAgent.globals.configs.PAGELOADMETRICSTHRESHOLD +
              " ms)"
          ),
          (c.isDelete = !0),
          !1
        );
      if (!b.businessService && BrowserAgent.globals.configs.URLMETRICOFF)
        return (
          BrowserAgent.logger.info(
            "handleHPLoadEvt: Skipping harvest of Page metrics as URL metric context is DISABLED"
          ),
          (c.isDelete = !0),
          !1
        );
      var e = null;
      BrowserAgent.globals.initPageInfo.pageMetricPathNoHash &&
        ((e = a), (a = BrowserAgent.globals.initPageInfo.pageMetricPathNoHash));
      var f = c.raw.responseStart - c.raw.requestStart,
        g = [];
      if (
        BrowserAgent.browserUtils.shouldPopulateMetrics() &&
        (BrowserAgent.jsonUtils.addToList(
          BrowserAgent.jsonUtils.createMetric(
            a,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_PRT.name,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_PRT.unit,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_PRT.type,
            c.raw.loadEventEnd - c.raw.domComplete
          ),
          g
        ),
        BrowserAgent.jsonUtils.addToList(
          BrowserAgent.jsonUtils.createMetric(
            a,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_CET.name,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_CET.unit,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_CET.type,
            c.raw.connectEnd - c.raw.connectStart
          ),
          g
        ),
        BrowserAgent.jsonUtils.addToList(
          BrowserAgent.jsonUtils.createMetric(
            a,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_DLT.name,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_DLT.unit,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_DLT.type,
            c.raw.domainLookupEnd - c.raw.domainLookupStart
          ),
          g
        ),
        BrowserAgent.jsonUtils.addToList(
          BrowserAgent.jsonUtils.createMetric(
            a,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_DPT.name,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_DPT.unit,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_DPT.type,
            c.raw.domComplete - c.raw.domLoading
          ),
          g
        ),
        BrowserAgent.jsonUtils.addToList(
          BrowserAgent.jsonUtils.createMetric(
            a,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_PLT.name,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_PLT.unit,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_PLT.type,
            d
          ),
          g
        ),
        BrowserAgent.jsonUtils.addToList(
          BrowserAgent.jsonUtils.createMetric(
            a,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_PST.name,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_PST.unit,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_PST.type,
            c.raw.connectStart -
              c.raw.domainLookupEnd +
              c.raw.requestStart -
              c.raw.connectEnd
          ),
          g
        ),
        BrowserAgent.jsonUtils.addToList(
          BrowserAgent.jsonUtils.createMetric(
            a,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_PPUT.name,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_PPUT.unit,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_PPUT.type,
            c.raw.unloadEventEnd - c.raw.unloadEventStart
          ),
          g
        ),
        BrowserAgent.jsonUtils.addToList(
          BrowserAgent.jsonUtils.createMetric(
            a,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_TTFB.name,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_TTFB.unit,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_TTFB.type,
            f
          ),
          g
        ),
        BrowserAgent.jsonUtils.addToList(
          BrowserAgent.jsonUtils.createMetric(
            a,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_TTLB.name,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_TTLB.unit,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_TTLB.type,
            c.raw.responseEnd - c.raw.requestStart
          ),
          g
        ),
        BrowserAgent.jsonUtils.addToList(
          BrowserAgent.jsonUtils.createMetric(
            a,
            BrowserAgent.globals.defaultMetricDefs.PAGE_HPI.name,
            BrowserAgent.globals.defaultMetricDefs.PAGE_HPI.unit,
            BrowserAgent.globals.defaultMetricDefs.PAGE_HPI.type,
            1
          ),
          g
        ),
        e &&
          (BrowserAgent.jsonUtils.addToList(
            BrowserAgent.jsonUtils.createMetric(
              e,
              BrowserAgent.globals.defaultMetricDefs.NTAPI_PLT.name,
              BrowserAgent.globals.defaultMetricDefs.NTAPI_PLT.unit,
              BrowserAgent.globals.defaultMetricDefs.NTAPI_PLT.type,
              d
            ),
            g
          ),
          BrowserAgent.jsonUtils.addToList(
            BrowserAgent.jsonUtils.createMetric(
              e,
              BrowserAgent.globals.defaultMetricDefs.PAGE_HPI.name,
              BrowserAgent.globals.defaultMetricDefs.PAGE_HPI.unit,
              BrowserAgent.globals.defaultMetricDefs.PAGE_HPI.type,
              1
            ),
            g
          )),
        "undefined" !== typeof BrowserAgentExtension &&
          (BrowserAgentExtension.extAddCustomPageMetric(),
          0 < BrowserAgentExtension.extCustomPageMetricList.length))
      ) {
        for (
          e = 0;
          e < BrowserAgentExtension.extCustomPageMetricList.length;
          e++
        ) {
          var h = BrowserAgentExtension.extCustomPageMetricList[e];
          BrowserAgent.jsonUtils.addToList(
            BrowserAgent.jsonUtils.createMetric(
              a,
              h.name,
              h.unit,
              h.accumulatorType,
              h.value
            ),
            g
          );
        }
        BrowserAgentExtension.extCustomPageMetricList = [];
      }
      e = [];
      BrowserAgent.jsonUtils.addToList(
        BrowserAgent.jsonUtils.createTT(
          0 < g.length ? g[0].path : a,
          BrowserAgent.globals.CorBrowsGUID,
          c.raw.navigationStart,
          parseInt(BrowserAgent.globals.startTime),
          d,
          f,
          c.raw.responseStart,
          parseInt(BrowserAgent.globals.endTime),
          c.bucketId
        ),
        e
      );
      a = !1;
      var k;
      g = BrowserAgent.jsonUtils.createAPMData(g, e);
      d = BrowserAgent.jsonUtils.createAXAData(
        c[BrowserAgent.globals.trackerDataKey]
      );
      b.rawData = {
        navigationTiming: BrowserAgent.browserUtils.copyObj(c.raw),
      };
      b.rawData &&
        b.rawData.navigationTiming &&
        (k = BrowserAgent.jsonUtils.createAUTOAXAData(
          b,
          !1,
          b.rawData.navigationTiming.fetchStart,
          b.rawData.navigationTiming.loadEventEnd
        ));
      BrowserAgent.globals.agentCookies &&
        (f = BrowserAgent.jsonUtils.createInternalData(
          BrowserAgent.globals.agentCookies,
          BrowserAgent.globals.agentCookieKeyName
        )) &&
        (BrowserAgent.globals.CorBrowsGUID &&
          (f.correlationBrowserGUID = BrowserAgent.globals.CorBrowsGUID),
        c.bucketId && (f.bucketId = c.bucketId),
        (b.internalData = f));
      g && ((b.apmData = g), (a = !0));
      d ? ((b.axaData = d), (a = !0)) : k && ((b.axaData = k), (a = !0));
      return a;
    },
    handleSPLoadEvt: function (a, b, c) {
      if (!c) return !1;
      if (!a || !b || !BrowserAgent.globals.configs.PAGELOADMETRICSENABLED)
        return (c.isDelete = !0), !1;
      b.pageLoadFlag = !0;
      if (
        !c[BrowserAgent.globals.softPageDataKeys.START] ||
        !c[BrowserAgent.globals.softPageDataKeys.END]
      )
        return (
          (c.isDelete = !0),
          BrowserAgent.logger.warn(
            "handleSPLoadEvt: Obtained invalid page load data point. Deleting it..."
          ),
          !1
        );
      var d =
        c[BrowserAgent.globals.softPageDataKeys.END] -
        c[BrowserAgent.globals.softPageDataKeys.START];
      if (0 <= d && d < BrowserAgent.globals.configs.PAGELOADMETRICSTHRESHOLD)
        return (
          BrowserAgent.logger.info(
            "handleSPLoadEvt: Skipping harvest of Soft Page metrics for as it is below the configured Page metric threshold (" +
              BrowserAgent.globals.configs.PAGELOADMETRICSTHRESHOLD +
              " ms)"
          ),
          (c.isDelete = !0),
          !1
        );
      if (!b.businessService && BrowserAgent.globals.configs.URLMETRICOFF)
        return (
          BrowserAgent.logger.info(
            "handleSPLoadEvt: Skipping harvest of Page metrics as URL metric context is DISABLED"
          ),
          (c.isDelete = !0),
          !1
        );
      b.rawData = {
        softPageTiming: {
          startTime: c[BrowserAgent.globals.softPageDataKeys.START],
          endTime: c[BrowserAgent.globals.softPageDataKeys.END],
        },
      };
      if (BrowserAgent.browserUtils.shouldPopulateMetrics()) {
        var e = [];
        BrowserAgent.jsonUtils.addToList(
          BrowserAgent.jsonUtils.createMetric(
            a,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_PLT.name,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_PLT.unit,
            BrowserAgent.globals.defaultMetricDefs.NTAPI_PLT.type,
            d
          ),
          e
        );
        BrowserAgent.jsonUtils.addToList(
          BrowserAgent.jsonUtils.createMetric(
            a,
            BrowserAgent.globals.defaultMetricDefs.PAGE_HPI.name,
            BrowserAgent.globals.defaultMetricDefs.PAGE_HPI.unit,
            BrowserAgent.globals.defaultMetricDefs.PAGE_HPI.type,
            1
          ),
          e
        );
        var f = [];
        BrowserAgent.jsonUtils.addToList(
          BrowserAgent.jsonUtils.createTT(
            0 < e.length ? e[0].path : a,
            null,
            b.rawData.softPageTiming.startTime,
            b.rawData.softPageTiming.startTime,
            d,
            null,
            null,
            null,
            c.bucketId
          ),
          f
        );
        if ((a = BrowserAgent.jsonUtils.createAPMData(e, f))) b.apmData = a;
      }
      c = BrowserAgent.jsonUtils.createAXAData(
        c[BrowserAgent.globals.trackerDataKey]
      );
      var g;
      b.rawData &&
        b.rawData.softPageTiming &&
        (g = BrowserAgent.jsonUtils.createAUTOAXAData(
          b,
          !1,
          b.rawData.softPageTiming.startTime,
          b.rawData.softPageTiming.endTime
        ));
      b.axaData = c ? c : g;
      return !0;
    },
    handleResEvt: function (a, b, c) {
      if (!c) return !1;
      if (
        !a ||
        !b ||
        !BrowserAgent.evtUtils.isValidResEvt(c) ||
        (!BrowserAgent.globals.configs.AJAXMETRICSENABLED &&
          !c[BrowserAgent.globals.RAW_RESOURCE_TIME_DATA])
      )
        return (
          BrowserAgent.logger.warn(
            "handleResEvt: Obtained invalid AJAX data point or AJAX metrics are DISABLED. Deleting it..."
          ),
          (c.isDelete = !0),
          !1
        );
      var d =
        c[BrowserAgent.globals.timestampNames.CALLBACK_END_TIME] -
        c[BrowserAgent.globals.timestampNames.CALLBACK_START_TIME];
      0 < d &&
      0 < c[BrowserAgent.globals.timestampNames.LAST_BYTE] &&
      c[BrowserAgent.globals.timestampNames.CALLBACK_START_TIME] <
        c[BrowserAgent.globals.timestampNames.LAST_BYTE]
        ? ((c[BrowserAgent.globals.timestampNames.CALLBACK_START_TIME] =
            c[BrowserAgent.globals.timestampNames.LAST_BYTE]),
          (c[BrowserAgent.globals.timestampNames.CALLBACK_END_TIME] =
            d + c[BrowserAgent.globals.timestampNames.CALLBACK_START_TIME]))
        : 0 === c[BrowserAgent.globals.timestampNames.CALLBACK_START_TIME] &&
          0 < c[BrowserAgent.globals.timestampNames.LAST_BYTE] &&
          0 < c[BrowserAgent.globals.timestampNames.CALLBACK_END_TIME] &&
          ((d =
            c[BrowserAgent.globals.timestampNames.CALLBACK_END_TIME] -
            c[BrowserAgent.globals.timestampNames.LAST_BYTE]),
          0 < d
            ? (c[BrowserAgent.globals.timestampNames.CALLBACK_START_TIME] =
                c[BrowserAgent.globals.timestampNames.LAST_BYTE])
            : ((c[BrowserAgent.globals.timestampNames.CALLBACK_START_TIME] = 0),
              (d = c[BrowserAgent.globals.timestampNames.CALLBACK_END_TIME] =
                0)));
      var e = null,
        f = c[BrowserAgent.globals.RAW_RESOURCE_TIME_DATA];
      if (void 0 === f || null === f) {
        var g =
          BrowserAgent.globals.urlToPerformanceListMap[
            c[BrowserAgent.globals.ajaxDataKeys.URL]
          ];
        g &&
          ((e = BrowserAgent.evtUtils.determineBestMatchIndex(
            g,
            c[BrowserAgent.globals.timestampNames.REQUEST_START]
          )),
          (e = BrowserAgent.evtUtils.getCorrelatePerfTimingObject(e, g, c)),
          null !== e &&
            BrowserAgent.evtUtils.adjustAPMMetricsForPerfObject(e, c, d));
      }
      g =
        c[BrowserAgent.globals.timestampNames.CALLBACK_END_TIME] -
        c[BrowserAgent.globals.timestampNames.REQUEST_START];
      if (
        0 <= g &&
        g < BrowserAgent.globals.configs.AJAXMETRICSTHRESHOLD &&
        !c[BrowserAgent.globals.RAW_RESOURCE_TIME_DATA]
      )
        return (
          BrowserAgent.logger.info(
            "handleResEvt: Skipping harvest of ajax metrics for " +
              c[BrowserAgent.globals.ajaxDataKeys.URL] +
              " as it is below the configured ajax metric threshold"
          ),
          (c.isDelete = !0),
          !1
        );
      var h =
        c[BrowserAgent.cookieUtils.cookieKeys.bsChar] &&
        c[BrowserAgent.cookieUtils.cookieKeys.bsChar] !==
          BrowserAgent.globals.UNDEFINED;
      if (!h && !b.businessService && BrowserAgent.globals.configs.URLMETRICOFF)
        return (
          BrowserAgent.logger.info(
            "handleResEvt: Skipping harvest of AJAX metrics as NON-BT based metrics are OFF"
          ),
          (c.isDelete = !0),
          !1
        );
      h &&
        (a =
          BrowserAgent.globals.metricPathConsts.PREFIX +
          BrowserAgent.globals.pipeChar +
          c[BrowserAgent.cookieUtils.cookieKeys.bsChar] +
          BrowserAgent.globals.pipeChar +
          c[BrowserAgent.cookieUtils.cookieKeys.btChar] +
          BrowserAgent.globals.pipeChar +
          c[BrowserAgent.cookieUtils.cookieKeys.btcChar] +
          BrowserAgent.globals.pipeChar +
          BrowserAgent.globals.metricPathConsts.BROWSER);
      f = BrowserAgent.jsonUtils.createBS(
        c[BrowserAgent.cookieUtils.cookieKeys.bsChar],
        c[BrowserAgent.cookieUtils.cookieKeys.btChar],
        c[BrowserAgent.cookieUtils.cookieKeys.btcChar]
      );
      h = BrowserAgent.browserUtils.parseURL(
        c[BrowserAgent.globals.ajaxDataKeys.URL]
      );
      var k =
          h.hostname +
          BrowserAgent.globals.forwardSlashChar +
          h.port +
          BrowserAgent.globals.pipeChar +
          h.pathname,
        l =
          c[BrowserAgent.globals.timestampNames.FIRST_BYTE] -
          c[BrowserAgent.globals.timestampNames.REQUEST_START],
        m =
          c[BrowserAgent.globals.timestampNames.LAST_BYTE] -
          c[BrowserAgent.globals.timestampNames.FIRST_BYTE];
      h = a;
      a +=
        BrowserAgent.globals.pipeChar +
        BrowserAgent.globals.metricPathConsts.RES +
        BrowserAgent.globals.pipeChar;
      switch (c[BrowserAgent.globals.ajaxDataKeys.ASYNC]) {
        case !0:
          var n = BrowserAgent.globals.resourceType.AJAX;
          var p = BrowserAgent.globals.resourceSubType.ASYNC;
          a +=
            BrowserAgent.globals.metricPathConsts.AJAX +
            BrowserAgent.globals.pipeChar +
            BrowserAgent.globals.metricPathConsts.ASYNC;
          break;
        case !1:
          n = BrowserAgent.globals.resourceType.AJAX;
          p = BrowserAgent.globals.resourceSubType.SYNC;
          a +=
            BrowserAgent.globals.metricPathConsts.AJAX +
            BrowserAgent.globals.pipeChar +
            BrowserAgent.globals.metricPathConsts.SYNC;
          break;
        default:
          (n = BrowserAgent.globals.resourceType.HTMLRES),
            (a += BrowserAgent.globals.metricPathConsts.HTMLRES);
      }
      a += BrowserAgent.globals.pipeChar + k;
      k = [];
      BrowserAgent.browserUtils.shouldPopulateMetrics() &&
        (BrowserAgent.jsonUtils.addToList(
          BrowserAgent.jsonUtils.createMetric(
            a,
            BrowserAgent.globals.defaultMetricDefs.AJAX_RLT.name,
            BrowserAgent.globals.defaultMetricDefs.AJAX_RLT.unit,
            BrowserAgent.globals.defaultMetricDefs.AJAX_RLT.type,
            g
          ),
          k
        ),
        0 <= l &&
          BrowserAgent.jsonUtils.addToList(
            BrowserAgent.jsonUtils.createMetric(
              a,
              BrowserAgent.globals.defaultMetricDefs.AJAX_TTFB.name,
              BrowserAgent.globals.defaultMetricDefs.AJAX_TTFB.unit,
              BrowserAgent.globals.defaultMetricDefs.AJAX_TTFB.type,
              l
            ),
            k
          ),
        0 <= m &&
          BrowserAgent.jsonUtils.addToList(
            BrowserAgent.jsonUtils.createMetric(
              a,
              BrowserAgent.globals.defaultMetricDefs.AJAX_RDT.name,
              BrowserAgent.globals.defaultMetricDefs.AJAX_RDT.unit,
              BrowserAgent.globals.defaultMetricDefs.AJAX_RDT.type,
              m
            ),
            k
          ),
        0 <= d &&
          BrowserAgent.jsonUtils.addToList(
            BrowserAgent.jsonUtils.createMetric(
              a,
              BrowserAgent.globals.defaultMetricDefs.AJAX_CBET.name,
              BrowserAgent.globals.defaultMetricDefs.AJAX_CBET.unit,
              BrowserAgent.globals.defaultMetricDefs.AJAX_CBET.type,
              d
            ),
            k
          ),
        BrowserAgent.jsonUtils.addToList(
          BrowserAgent.jsonUtils.createMetric(
            a,
            BrowserAgent.globals.defaultMetricDefs.AJAX_ICPI.name,
            BrowserAgent.globals.defaultMetricDefs.AJAX_ICPI.unit,
            BrowserAgent.globals.defaultMetricDefs.AJAX_ICPI.type,
            1
          ),
          k
        ));
      m = [];
      BrowserAgent.jsonUtils.addToList(
        BrowserAgent.jsonUtils.createTT(
          0 < k.length ? k[0].path : a,
          c[BrowserAgent.cookieUtils.cookieKeys.CorBrowsGUIDChar],
          c[BrowserAgent.globals.timestampNames.REQUEST_START],
          parseInt(c[BrowserAgent.cookieUtils.cookieKeys.apmStartTimeChar]),
          g,
          l,
          c[BrowserAgent.globals.timestampNames.FIRST_BYTE],
          parseInt(c[BrowserAgent.cookieUtils.cookieKeys.apmEndTimeChar]),
          c.bucketId
        ),
        m
      );
      c &&
        c[BrowserAgent.globals.ajaxDataKeys.URL] &&
        ((m[0].x_attributes && m[0].x_attributes.x_attributeList) ||
          ((m[0].x_attributes = m[0].x_attributes ? m[0].x_attributes : {}),
          (m[0].x_attributes.x_attributeList = m[0].x_attributes.x_attributeList
            ? m[0].x_attributes.x_attributeList
            : [])),
        BrowserAgent.jsonUtils.addToList(
          BrowserAgent.jsonUtils.createURLXAttribute(
            c[BrowserAgent.globals.ajaxDataKeys.URL]
          ),
          m[0].x_attributes.x_attributeList
        ));
      m[0].x_attributes.x_attributeList.push(
        BrowserAgent.jsonUtils.createXAttribute(
          "TTPlugin.globalAttribute.AXAAppName",
          BrowserAgent.globals.appInfo.id
        )
      );
      if (
        (l = c[BrowserAgent.globals.ajaxDataKeys.ERR]) &&
        BrowserAgent.configUtils.isErrorExcluded(
          c[BrowserAgent.globals.ajaxDataKeys.URL],
          l[BrowserAgent.errorUtils.errorDataFields.SUB]
        )
      )
        BrowserAgent.logger.warn(
          "handleResEvt: Resource [" +
            c[BrowserAgent.globals.ajaxDataKeys.URL] +
            "] and error message [" +
            l[BrowserAgent.errorUtils.errorDataFields.SUB] +
            "] has been excluded"
        );
      else if (l) {
        var r = BrowserAgent.jsonUtils.createMetric(
          a,
          BrowserAgent.globals.defaultMetricDefs.RES_EPI.name,
          BrowserAgent.globals.defaultMetricDefs.RES_EPI.unit,
          BrowserAgent.globals.defaultMetricDefs.RES_EPI.type,
          1
        );
        r = BrowserAgent.jsonUtils.createAPMData([r], null);
        r = BrowserAgent.jsonUtils.createError(
          l[BrowserAgent.errorUtils.errorDataFields.TYP],
          l[BrowserAgent.errorUtils.errorDataFields.SUB],
          l[BrowserAgent.errorUtils.errorDataFields.MSG],
          null,
          null,
          null,
          l[BrowserAgent.errorUtils.errorDataFields.STK],
          l[BrowserAgent.errorUtils.errorDataFields.STT],
          r,
          null
        );
      }
      (a = BrowserAgent.jsonUtils.createAXAData(
        c[BrowserAgent.globals.trackerDataKey]
      )) ||
        n !== BrowserAgent.globals.resourceType.AJAX ||
        (a = BrowserAgent.jsonUtils.createAUTOAXAData(b, !0, c.rs, c.ce));
      p = BrowserAgent.jsonUtils.createResource(
        n,
        p,
        c[BrowserAgent.globals.timestampNames.REQUEST_START],
        f,
        BrowserAgent.jsonUtils.createAPMData(k, m),
        BrowserAgent.jsonUtils.createRequest(
          c[BrowserAgent.globals.ajaxDataKeys.URL],
          c[BrowserAgent.globals.ajaxDataKeys.METHOD],
          c[BrowserAgent.globals.ajaxDataKeys.REQUEST_BODY_SIZE]
        ),
        BrowserAgent.jsonUtils.createResponse(
          c[BrowserAgent.globals.ajaxDataKeys.STATUS_CODE],
          c[BrowserAgent.globals.ajaxDataKeys.STATUS_TEXT],
          BrowserAgent.jsonUtils.createContent(
            c[BrowserAgent.globals.ajaxDataKeys.RESPONSE_CONTENT_LENGTH]
          )
        ),
        r,
        a
      );
      r = BrowserAgent.globals.agentCookieKeys;
      c[r] &&
        (r = BrowserAgent.jsonUtils.createInternalData(
          c[r],
          BrowserAgent.globals.agentCookieKeyName
        )) &&
        (p.internalData = r);
      return p
        ? (b.resources || (b.resources = { resourceList: [] }),
          (f = c[BrowserAgent.globals.RAW_RESOURCE_TIME_DATA]),
          void 0 !== f && null !== f
            ? (p.rawData = f)
            : (e && (p.rawData = e),
              p.rawData ||
                (p.rawData =
                  BrowserAgent.evtUtils.getSpoofTimingPerfTimingObject(c, g)),
              BrowserAgent.evtUtils.addCBET(p, c, d)),
          b.resources.resourceList.push(p),
          p.error &&
            ((b.resources.resErrCount = b.resources.resErrCount
              ? b.resources.resErrCount + 1
              : 1),
            b.resources.pageMetricPath || (b.resources.pageMetricPath = h)),
          !0)
        : !1;
    },
    determineBestMatchIndex: function (a, b) {
      var c = -1;
      if (0 === a.length) return c;
      var d = Number.MAX_VALUE,
        e = BrowserAgent.browserUtils.binarySearchByPropCompare(
          a,
          b,
          BrowserAgent.globals.REQUEST_START_PROP_NAME
        );
      0 <= e
        ? ((c = e), (d = 0))
        : 0 > e &&
          ((e += 1),
          0 === e
            ? ((c = e), (d = a[0].requestStart - b))
            : 0 > e &&
              ((c = -1 * e),
              (d = Number.MAX_VALUE),
              c < a.length && (d = a[c].requestStart - b),
              (b -= a[c - 1].requestStart),
              d < b || (--c, (d = b))));
      d > BrowserAgent.globals.PERF_OBJ_CORR_MAX_ALLOWED_SPREAD &&
        (BrowserAgent.logger.info(
          "determineBestMatchIndex : For resource " +
            a[c].perfObj.name +
            " spread " +
            d +
            " is greater than threshold " +
            BrowserAgent.globals.PERF_OBJ_CORR_MAX_ALLOWED_SPREAD
        ),
        (c = -1));
      return c;
    },
    getCorrelatePerfTimingObject: function (a, b, c) {
      var d = null;
      0 <= a &&
        ((d = b[a].perfObj),
        (d = {
          performanceResourceTiming: {
            name: d.name ? d.name : "",
            entryType: d.entryType ? d.entryType : "",
            startTime: d.startTime ? Math.ceil(d.startTime) : 0,
            duration: d.duration ? Math.ceil(d.duration) : 0,
            initiatorType: d.initiatorType ? d.initiatorType : "",
            nextHopProtocol: d.nextHopProtocol ? d.nextHopProtocol : "",
            workerStart: d.workerStart ? Math.ceil(d.workerStart) : 0,
            redirectStart: d.redirectStart ? Math.ceil(d.redirectStart) : 0,
            redirectEnd: d.redirectEnd ? Math.ceil(d.redirectEnd) : 0,
            fetchStart: d.fetchStart ? Math.ceil(d.fetchStart) : 0,
            domainLookupStart: d.domainLookupStart
              ? Math.ceil(d.domainLookupStart)
              : 0,
            domainLookupEnd: d.domainLookupEnd
              ? Math.ceil(d.domainLookupEnd)
              : 0,
            connectStart: d.connectStart ? Math.ceil(d.connectStart) : 0,
            connectEnd: d.connectEnd ? Math.ceil(d.connectEnd) : 0,
            secureConnectionStart: d.secureConnectionStart
              ? Math.ceil(d.secureConnectionStart)
              : 0,
            requestStart: d.requestStart ? Math.ceil(d.requestStart) : 0,
            responseStart: d.responseStart ? Math.ceil(d.responseStart) : 0,
            responseEnd: d.responseEnd ? Math.ceil(d.responseEnd) : 0,
            transferSize: d.transferSize ? d.transferSize : 0,
            encodedBodySize: d.encodedBodySize ? d.encodedBodySize : 0,
            decodedBodySize: d.decodedBodySize ? d.decodedBodySize : 0,
          },
        }),
        (d.performanceResourceTiming.duration =
          d.performanceResourceTiming.responseEnd -
          d.performanceResourceTiming.startTime),
        b.splice(a, 1),
        --BrowserAgent.globals.currentPerfObjectCount,
        0 === b.length &&
          delete BrowserAgent.globals.urlToPerformanceListMap[
            c[BrowserAgent.globals.ajaxDataKeys.URL]
          ]);
      return d;
    },
    adjustAPMMetricsForPerfObject: function (a, b, c) {
      if (null !== a) {
        var d = a.performanceResourceTiming.startTime;
        0 === d &&
          ((d = a.performanceResourceTiming.fetchStart),
          0 === d &&
            ((d = a.performanceResourceTiming.requestStart),
            0 === d &&
              (d = b[BrowserAgent.globals.timestampNames.REQUEST_START])));
        d !== b[BrowserAgent.globals.timestampNames.REQUEST_START] &&
          (d += performance.timing.navigationStart);
        b[BrowserAgent.globals.timestampNames.REQUEST_START] = d;
        b[BrowserAgent.globals.timestampNames.FIRST_BYTE] =
          0 < a.performanceResourceTiming.responseStart
            ? a.performanceResourceTiming.responseStart +
              performance.timing.navigationStart
            : b[BrowserAgent.globals.timestampNames.FIRST_BYTE];
        b[BrowserAgent.globals.timestampNames.LAST_BYTE] =
          0 < a.performanceResourceTiming.responseEnd
            ? a.performanceResourceTiming.responseEnd +
              performance.timing.navigationStart
            : b[BrowserAgent.globals.timestampNames.LAST_BYTE];
        0 < c
          ? ((a =
              a.performanceResourceTiming.responseEnd +
              performance.timing.navigationStart),
            (b[BrowserAgent.globals.timestampNames.CALLBACK_START_TIME] = a),
            (b[BrowserAgent.globals.timestampNames.CALLBACK_END_TIME] = c + a))
          : 0 < b[BrowserAgent.globals.timestampNames.CALLBACK_END_TIME] &&
            ((a =
              a.performanceResourceTiming.responseEnd +
              performance.timing.navigationStart),
            b[BrowserAgent.globals.timestampNames.CALLBACK_END_TIME] < a &&
              (b[BrowserAgent.globals.timestampNames.CALLBACK_END_TIME] = a));
      }
    },
    getSpoofTimingPerfTimingObject: function (a, b) {
      var c =
          a[BrowserAgent.globals.timestampNames.REQUEST_START] -
          performance.timing.navigationStart,
        d = 0;
      0 < a[BrowserAgent.globals.timestampNames.FIRST_BYTE] &&
        (d =
          a[BrowserAgent.globals.timestampNames.FIRST_BYTE] -
          performance.timing.navigationStart);
      var e = 0;
      0 < a[BrowserAgent.globals.timestampNames.LAST_BYTE] &&
        (e =
          a[BrowserAgent.globals.timestampNames.LAST_BYTE] -
          performance.timing.navigationStart);
      b = {
        performanceResourceTiming: {
          startTime: c,
          name: a[BrowserAgent.globals.ajaxDataKeys.URL],
          entryType: "resource",
          duration: b,
          requestStart: c,
          responseStart: d,
          responseEnd: e,
        },
      };
      a[BrowserAgent.globals.ajaxDataKeys.RESPONSE_CONTENT_LENGTH] &&
        (b.performanceResourceTiming.decodedBodySize =
          a[BrowserAgent.globals.ajaxDataKeys.RESPONSE_CONTENT_LENGTH]);
      return b;
    },
    addCBET: function (a, b, c) {
      null !== a.rawData &&
        null !== a.rawData.performanceResourceTiming &&
        (0 < c
          ? ((a.rawData.performanceResourceTiming.callbackExecutionTimeStart =
              b[BrowserAgent.globals.timestampNames.CALLBACK_START_TIME] -
              performance.timing.navigationStart),
            (a.rawData.performanceResourceTiming.callbackExecutionTimeEnd =
              b[BrowserAgent.globals.timestampNames.CALLBACK_END_TIME] -
              performance.timing.navigationStart))
          : 0 < b[BrowserAgent.globals.timestampNames.CALLBACK_END_TIME] &&
            (a.rawData.performanceResourceTiming.callbackExecutionTimeEnd =
              b[BrowserAgent.globals.timestampNames.CALLBACK_END_TIME] -
              performance.timing.navigationStart),
        0 < a.rawData.performanceResourceTiming.callbackExecutionTimeEnd &&
          (a.rawData.performanceResourceTiming.duration =
            a.rawData.performanceResourceTiming.callbackExecutionTimeEnd -
            a.rawData.performanceResourceTiming.startTime));
    },
    purgeOldPerfObjects: function () {
      var a = BrowserAgent.globals.currentPerfObjectCount;
      if (
        BrowserAgent.globals.currentPerfObjectCount >
        BrowserAgent.globals.MAX_PERF_OBJECT_CACHE_LIMIT
      ) {
        BrowserAgent.logger.info(
          "purgeOldPerfObjects : called current object count " +
            BrowserAgent.globals.currentPerfObjectCount +
            " exceeds threshold " +
            BrowserAgent.globals.MAX_PERF_OBJECT_CACHE_LIMIT
        );
        var b = BrowserAgentBootstrap.origFuncMap.timeNow() - 3e5,
          c;
        for (c in BrowserAgent.globals.urlToPerformanceListMap) {
          for (
            var d = BrowserAgent.globals.urlToPerformanceListMap[c], e = 0;
            d && e < d.length;
            e++
          )
            d[e].requestStart <= b &&
              (d.splice(e, 1), --BrowserAgent.globals.currentPerfObjectCount);
          0 === d.length &&
            delete BrowserAgent.globals.urlToPerformanceListMap[c];
        }
        BrowserAgent.logger.info(
          "purgeOldPerfObjects : removed " +
            (a - BrowserAgent.globals.currentPerfObjectCount) +
            " expired cached object(s)"
        );
      }
    },
    handleJSErrEvt: function (a, b, c) {
      if (!c) return !1;
      if (!a || !b || !BrowserAgent.globals.configs.JSERRORSENABLED)
        return (c.isDelete = !0), !1;
      if (
        "string" !== typeof c[BrowserAgent.errorUtils.errorDataFields.MSG] ||
        "number" !== typeof c[BrowserAgent.errorUtils.errorDataFields.STT]
      )
        return (
          BrowserAgent.logger.info(
            "handleJSErrEvt: Obtained an invalid JS error data point. Deleting it..."
          ),
          (c.isDelete = !0),
          !1
        );
      if (!b.businessService && BrowserAgent.globals.configs.URLMETRICOFF)
        return (
          BrowserAgent.logger.info(
            "handleJSErrEvt: Skipping harvest of JS error metrics as NON-BT based metrics are OFF"
          ),
          (c.isDelete = !0),
          !1
        );
      var d;
      BrowserAgent.browserUtils.shouldPopulateMetrics() &&
        (a = BrowserAgent.jsonUtils.createMetric(
          a,
          BrowserAgent.globals.defaultMetricDefs.PAGE_EPI.name,
          BrowserAgent.globals.defaultMetricDefs.PAGE_EPI.unit,
          BrowserAgent.globals.defaultMetricDefs.PAGE_EPI.type,
          1
        )) &&
        (d = BrowserAgent.jsonUtils.createAPMData([a], null));
      a = BrowserAgent.jsonUtils.createAXAData(
        c[BrowserAgent.globals.trackerDataKey]
      );
      return (c = BrowserAgent.jsonUtils.createError(
        c[BrowserAgent.errorUtils.errorDataFields.TYP],
        c[BrowserAgent.errorUtils.errorDataFields.SUB],
        c[BrowserAgent.errorUtils.errorDataFields.MSG],
        c[BrowserAgent.errorUtils.errorDataFields.SRC],
        c[BrowserAgent.errorUtils.errorDataFields.LIN],
        c[BrowserAgent.errorUtils.errorDataFields.COL],
        c[BrowserAgent.errorUtils.errorDataFields.STK],
        c[BrowserAgent.errorUtils.errorDataFields.STT],
        d,
        a
      ))
        ? (b.errors || (b.errors = { errorList: [] }),
          b.errors.errorList.push(c),
          !0)
        : !1;
    },
    handleFnEvt: function (a, b, c) {
      if (!c) return !1;
      if (!a || !b || !BrowserAgent.globals.configs.JSFUNCTIONMETRICSENABLED)
        return (c.isDelete = !0), !1;
      if (
        !c[BrowserAgent.globals.timestampNames.START_TIME] ||
        !c[BrowserAgent.globals.timestampNames.REQUEST_START] ||
        !c.fnName
      )
        return (
          BrowserAgent.logger.warn(
            "handleFnEvt: Obtained invalid JS Function data point. Deleting it..."
          ),
          (c.isDelete = !0),
          !1
        );
      if (!b.businessService && BrowserAgent.globals.configs.URLMETRICOFF)
        return (
          BrowserAgent.logger.info(
            "handleFnEvt: Skipping harvest of JS Function metrics as NON-BT based metrics are OFF"
          ),
          (c.isDelete = !0),
          !1
        );
      var d =
        c[BrowserAgent.globals.timestampNames.REQUEST_START] -
        c[BrowserAgent.globals.timestampNames.START_TIME];
      if (0 <= d && d < BrowserAgent.globals.configs.JSFUNCTIONMETRICSTHRESHOLD)
        return (
          BrowserAgent.logger.info(
            "handleFnEvt: Skipping harvest of JS function metrics for " +
              c.fnName +
              " as it is below the configured JS Function metric threshold"
          ),
          (c.isDelete = !0),
          !1
        );
      a +=
        BrowserAgent.globals.pipeChar +
        BrowserAgent.globals.metricPathConsts.FUNC +
        BrowserAgent.globals.pipeChar +
        c.fnName;
      var e = [];
      BrowserAgent.browserUtils.shouldPopulateMetrics() &&
        (e.push(
          BrowserAgent.jsonUtils.createMetric(
            a,
            BrowserAgent.globals.defaultMetricDefs.FUNC_ET.name,
            BrowserAgent.globals.defaultMetricDefs.FUNC_ET.unit,
            BrowserAgent.globals.defaultMetricDefs.FUNC_ET.type,
            d
          )
        ),
        e.push(
          BrowserAgent.jsonUtils.createMetric(
            a,
            BrowserAgent.globals.defaultMetricDefs.FUNC_ICPI.name,
            BrowserAgent.globals.defaultMetricDefs.FUNC_ICPI.unit,
            BrowserAgent.globals.defaultMetricDefs.FUNC_ICPI.type,
            1
          )
        ));
      a = BrowserAgent.jsonUtils.createAPMData(e, null);
      if (!a) return !1;
      a = {
        timeStamp: c[BrowserAgent.globals.timestampNames.START_TIME],
        apmData: a,
      };
      if (
        (c = BrowserAgent.jsonUtils.createAXAData(
          c[BrowserAgent.globals.trackerDataKey]
        ))
      )
        a.axaData = c;
      return a
        ? (b.clientEvents || (b.clientEvents = { clientEventList: [] }),
          b.clientEvents.clientEventList.push(a),
          !0)
        : !1;
    },
    handleAPMExtEvt: function (a, b, c) {
      if (!c) return !1;
      if (!a || !b || !BrowserAgent.globals.configs.BROWSERAGENTENABLED)
        return (c.isDelete = !0), !1;
      if (!c.lst || 1 > c.lst.length)
        return (
          BrowserAgent.logger.info(
            "handleAPMExtEvt: Obtained invalid APM extension metrics list. Deleting it..."
          ),
          (c.isDelete = !0),
          !1
        );
      if (!b.businessService && BrowserAgent.globals.configs.URLMETRICOFF)
        return (
          BrowserAgent.logger.info(
            "handleAPMExtEvt: Skipping harvest of APM extension metrics as NON-BT based metrics are OFF"
          ),
          (c.isDelete = !0),
          !1
        );
      if (BrowserAgent.browserUtils.shouldPopulateMetrics()) {
        a = BrowserAgent.jsonUtils.createAPMData(c.lst, null);
        if (!a) return !1;
        a = { apmData: a };
        b.extensions || (b.extensions = { extensionList: [] });
        b.extensions.extensionList.push(a);
        return !0;
      }
      return !1;
    },
    handleAXAExtEvt: function (a, b, c) {
      if (!c) return !1;
      if (!a || !b || !BrowserAgent.globals.configs.BROWSERAGENTENABLED)
        return (c.isDelete = !0), !1;
      if (!c.d || 1 > c.d.length)
        return (
          BrowserAgent.logger.info(
            "handleAXAExtEvt: Obtained invalid AXA extension data. Deleting it..."
          ),
          (c.isDelete = !0),
          !1
        );
      b.axaData || (b.axaData = { axaEventList: [] });
      b.axaData.axaEventList.push(c.d);
      return !0;
    },
    handleTTimeEvt: function (a, b, c) {
      if (!c) return !1;
      if (!a || !b || !BrowserAgent.globals.configs.BROWSERAGENTENABLED)
        return (c.isDelete = !0), !1;
      if (!c.s || !c.e || c.e < c.s)
        return (
          BrowserAgent.logger.info(
            "handleTTimeEvt: Obtained invalid think time data. Deleting it..."
          ),
          (c.isDelete = !0),
          !1
        );
      if (!b.businessService && BrowserAgent.globals.configs.URLMETRICOFF)
        return (
          BrowserAgent.logger.info(
            "handleTTimeEvt: Skipping harvest of think time metric(s) as NON-BT based metrics are OFF"
          ),
          (c.isDelete = !0),
          !1
        );
      var d = { desc: "pageThinkTime", startTime: c.s, endTime: c.e };
      if (BrowserAgent.browserUtils.shouldPopulateMetrics()) {
        a = BrowserAgent.jsonUtils.createMetric(
          a,
          BrowserAgent.globals.defaultMetricDefs.PAGE_UDT.name,
          BrowserAgent.globals.defaultMetricDefs.PAGE_UDT.unit,
          BrowserAgent.globals.defaultMetricDefs.PAGE_UDT.type,
          c.e - c.s
        );
        if (!a) return !1;
        a = BrowserAgent.jsonUtils.createAPMData([a], null);
        if (!a) return !1;
        d.apmData = a;
      }
      if (
        (c = BrowserAgent.jsonUtils.createAXAData(
          c[BrowserAgent.globals.trackerDataKey]
        ))
      )
        d.axaData = c;
      return d
        ? (b.thinkTimes || (b.thinkTimes = { thinkTimeList: [] }),
          b.thinkTimes.thinkTimeList.push(d),
          !0)
        : !1;
    },
    harvestEvts: function () {
      var a = performance.now(),
        b = BrowserAgent.evtUtils.resourceTimingHarvest(),
        c = performance.now();
      BrowserAgent.globals.selfMonPerformance.resource.numberOfRes += b;
      BrowserAgent.globals.selfMonPerformance.resource.totalTimeMS += c - a;
      0 < BrowserAgent.globals.selfMonPerformance.resource.numberOfRes &&
        (BrowserAgent.globals.selfMonPerformance.resource.avgTimePerResMS =
          BrowserAgent.globals.selfMonPerformance.resource.totalTimeMS /
          BrowserAgent.globals.selfMonPerformance.resource.numberOfRes);
      a = performance.now();
      BrowserAgent.evtUtils.resourceTimingHarvest();
      var d = !1,
        e,
        f,
        g,
        h = 0;
      for (e in BrowserAgent.globals.pageWithEventsMap) {
        var k = !1;
        b = BrowserAgent.globals.pageBucketsMap[e];
        if (void 0 !== b) {
          c = BrowserAgentBootstrap.origFuncMap.jsonParse(
            BrowserAgent.jsonStringify(b.json)
          );
          for (f in b.evtMap)
            if (b.evtMap[f].isDone || b.evtMap[f].isDelete) {
              if (
                !b.evtMap[f].isDelete &&
                !BrowserAgent.evtUtils.isClamped(
                  BrowserAgent.evtUtils.evtClampFlags.SND.type,
                  h,
                  BrowserAgent.globals.configs.EVENTDISPATCHCLAMPPERINTERVAL
                )
              ) {
                var l = b.evtMap[f].type;
                (l = l ? BrowserAgent.globals.evtHandlers[l] : null) &&
                  (g = l(b.pageMetricPath, c, b.evtMap[f]));
                g && (h += 1);
                k = g || k;
              }
              delete b.evtMap[f];
              --b.evtCount;
            }
          1 > b.evtCount && delete BrowserAgent.globals.pageWithEventsMap[e];
          if (
            !0 === b.newPage &&
            !0 === BrowserAgent.globals.configs.COOKIECAPTUREENABLED
          ) {
            if (
              (l = BrowserAgent.jsonUtils.createCookies(
                BrowserAgent.cookieUtils.getAppCookies()
              ))
            )
              (c.cookies = l), (k = !0);
            b.newPage = !1;
          }
          c.resources &&
            1 <= c.resources.resErrCount &&
            ((l = BrowserAgent.jsonUtils.createMetric(
              c.resources.pageMetricPath,
              BrowserAgent.globals.defaultMetricDefs.PAGE_EPI.name,
              BrowserAgent.globals.defaultMetricDefs.PAGE_EPI.unit,
              BrowserAgent.globals.defaultMetricDefs.PAGE_EPI.type,
              c.resources.resErrCount
            )),
            c.apmData
              ? c.apmData.metrics.metricList.push(l)
              : (c.apmData = BrowserAgent.jsonUtils.createAPMData([l], null)),
            delete c.resources.resErrCount,
            delete c.resources.pageMetricPath);
          k
            ? ((d = b.json.sessions.sessionList[0].id),
              (k = BrowserAgent.globals.sessionToActiveEUMPayloadMap[d]),
              k ||
                (BrowserAgent.jsonUtils.updateEUMWithGeo(
                  BrowserAgent.globals.eumJSONShell
                ),
                (k = BrowserAgentBootstrap.origFuncMap.jsonParse(
                  BrowserAgent.jsonStringify(BrowserAgent.globals.eumJSONShell)
                )),
                (k.app.ba.pages.pageList = []),
                (BrowserAgent.globals.sessionToActiveEUMPayloadMap[d] = k)),
              k.app.ba.pages.pageList.push(c),
              (d = !0),
              b.json.pageLoadFlag && (b.json.pageLoadFlag = !1),
              b.json.sessions.sessionList[0].newSessionFlag &&
                (b.json.sessions.sessionList[0].newSessionFlag = !1),
              (c.sessions.sessionList[0].cv = { lch: !1 }))
            : !0 === c.pageLoadFlag && (b.json.pageLoadFlag = !0);
        }
      }
      d &&
        (BrowserAgent.evtUtils.payloadProcessing(),
        BrowserAgent.evtUtils.resetClamps());
      BrowserAgent.evtUtils.purgeOldPerfObjects();
      c = performance.now();
      a = c - a;
      BrowserAgent.globals.selfMonPerformance.harvestpayload.numberOfHarvestCycles += 1;
      if (
        0 ===
          BrowserAgent.globals.selfMonPerformance.harvestpayload.minTimeMS ||
        BrowserAgent.globals.selfMonPerformance.harvestpayload.minTimeMS > a
      )
        BrowserAgent.globals.selfMonPerformance.harvestpayload.minTimeMS = a;
      if (
        0 ===
          BrowserAgent.globals.selfMonPerformance.harvestpayload.maxTimeMS ||
        BrowserAgent.globals.selfMonPerformance.harvestpayload.maxTimeMS < a
      )
        BrowserAgent.globals.selfMonPerformance.harvestpayload.maxTimeMS = a;
      BrowserAgent.globals.selfMonPerformance.harvestpayload.totalTimeMS += a;
      BrowserAgent.globals.selfMonPerformance.harvestpayload.avgTimeMS =
        BrowserAgent.globals.selfMonPerformance.harvestpayload.totalTimeMS /
        BrowserAgent.globals.selfMonPerformance.harvestpayload
          .numberOfHarvestCycles;
    },
    payloadProcessing: function () {
      BrowserAgent.globals.isOnUnload
        ? (null !== BrowserAgent.globals.deferredPayloadProcessing &&
            (clearTimeout(BrowserAgent.globals.deferredPayloadProcessing),
            (BrowserAgent.globals.deferredPayloadProcessing = null)),
          BrowserAgent.browserUtils.isSameSession(
            BrowserAgentBootstrap.origFuncMap.timeNow()
          ) ||
            BrowserAgent.globals.prevSessionList.push(
              BrowserAgent.globals.currSession
            ),
          0 < BrowserAgent.globals.prevSessionList.length
            ? BrowserAgent.evtUtils.lastChunkDetermination()
            : BrowserAgent.evtUtils.chunkStampingAndDispatch())
        : null === BrowserAgent.globals.deferredPayloadProcessing &&
          (0 < BrowserAgent.globals.prevSessionList.length
            ? (BrowserAgent.globals.deferredPayloadProcessing = setTimeout(
                BrowserAgent.evtUtils.lastChunkDetermination,
                2 * BrowserAgent.globals.configs.METRICFREQUENCY
              ))
            : BrowserAgent.evtUtils.chunkStampingAndDispatch());
    },
    lastChunkDetermination: function () {
      for (var a = 0; a < BrowserAgent.globals.prevSessionList.length; a++) {
        var b = BrowserAgent.globals.prevSessionList[a];
        if (
          b &&
          (b = BrowserAgent.globals.sessionToActiveEUMPayloadMap[b.id]) &&
          0 < b.app.ba.pages.pageList.length
        ) {
          b = b.app.ba.pages.pageList;
          for (var c = 0; c < b.length; c++)
            b[c].sessions.sessionList[0].cv.lch = !0;
        }
      }
      BrowserAgent.evtUtils.chunkStampingAndDispatch();
      BrowserAgent.globals.deferredPayloadProcessing = null;
    },
    chunkStampingAndDispatch: function () {
      for (var a = 0; a < BrowserAgent.globals.prevSessionList.length; a++) {
        var b = BrowserAgent.globals.prevSessionList[a];
        b && BrowserAgent.evtUtils.processPayloadForSession(b);
      }
      BrowserAgent.globals.prevSessionList = [];
      BrowserAgent.globals.currSession &&
        (BrowserAgent.evtUtils.processPayloadForSession(
          BrowserAgent.globals.currSession
        ),
        BrowserAgent.storageUtils.putInStorage(
          BrowserAgent.storageUtils.storageTypes.SESSION,
          BrowserAgent.storageUtils.storageKeys.CHUNK_SEQ,
          BrowserAgent.globals.sessionToChunkMap[
            BrowserAgent.globals.currSession.id
          ].ch,
          !0
        ));
      a = Object.keys(BrowserAgent.globals.sessionToActiveEUMPayloadMap).length;
      0 < a &&
        BrowserAgent.logger.error(
          "chunkStampingAndDispatch: sessionToActiveEUMPayloadMap was found to still have " +
            a +
            " payloads "
        );
    },
    processPayloadForSession: function (a) {
      if (a) {
        var b = BrowserAgent.globals.sessionToActiveEUMPayloadMap[a.id];
        if (b && 0 < b.app.ba.pages.pageList.length) {
          for (
            var c = b.app.ba.pages.pageList,
              d = BrowserAgent.globals.sessionToChunkMap[a.id],
              e = 0;
            e < c.length;
            e++
          )
            (c[e].sessions.sessionList[0].cv.ch = d.ch),
              (c[e].sessions.sessionList[0].cv.fch = d.fch);
          d.ch += 1;
          d.fch = !1;
          BrowserAgent.globals.sessionToChunkMap[a.id] = d;
          BrowserAgent.evtUtils.sendEvts(
            BrowserAgent.globals.configs.COLLECTORURL,
            b,
            !BrowserAgent.globals.isOnUnload
          );
          delete BrowserAgent.globals.sessionToActiveEUMPayloadMap[a.id];
        }
      }
    },
    determineEventTime: function (a) {
      BrowserAgent.globals.lastUserMouseDown < a &&
        a - BrowserAgent.globals.lastUserMouseDown <
          BrowserAgent.globals.EVENT_THRESHOLD &&
        (a = BrowserAgent.globals.lastUserMouseDown);
      return a;
    },
    canHarvestResource: function (a) {
      var b = !0;
      if (BrowserAgent.evtUtils.hasItemInPRESet(a)) return !1;
      var c = BrowserAgent.globals.BASrcFullPath,
        d = BrowserAgent.globals.extensionSrcFullPath;
      if (
        a.initiatorType ===
          BrowserAgent.globals.XML_HTTP_REQUEST_PERF_RES_TYPE &&
        (a.name
          .toLowerCase()
          .endsWith(BrowserAgent.globals.configs.COLLECTORURL.toLowerCase()) ||
          a.name
            .toLowerCase()
            .endsWith(BrowserAgent.globals.profileURL.toLowerCase()))
      )
        return !1;
      if (
        (c.length && a.name.endsWith(c)) ||
        (d.length && a.name.endsWith(d)) ||
        BrowserAgent.configUtils.isUrlExcluded(a.name) ||
        !BrowserAgent.evtUtils.canHarvestEdgeResource(a)
      )
        b = !1;
      return b;
    },
    canHarvestEdgeResource: function (a) {
      var b = !0;
      (BrowserAgent.globals.userAgents.EDGE.name !==
        BrowserAgent.globals.platform &&
        BrowserAgent.globals.userAgents.IE.name !==
          BrowserAgent.globals.platform) ||
        0 !== a.responseEnd ||
        (b = !1);
      return b;
    },
    generateProcessedResourceEntriesItem: function (a, b) {
      return a + b;
    },
    findPageBucketIndexForResource: function (a) {
      var b = performance.timing.navigationStart + Math.floor(a.startTime),
        c = BrowserAgent.globals.sortedBucketList.length - 1;
      if (BrowserAgent.globals.sortedBucketList[c].timestamp <= b) return c;
      b = BrowserAgent.browserUtils.binarySearchByPropCompare(
        BrowserAgent.globals.sortedBucketList,
        b,
        "timestamp"
      );
      if (0 <= b) var d = b;
      else
        0 > b &&
          ((b += 1),
          0 === b
            ? BrowserAgent.logger.warn(
                "resourceTimingHarvest: found resource: " +
                  a.name +
                  " with time stamp earlier than all current buckets. Dropping item."
              )
            : 0 > b && (d = -1 * b - 1));
      return d;
    },
    extractDataForResource: function (a, b) {
      if (
        void 0 !== a &&
        0 <= a &&
        ((a = BrowserAgent.evtUtils.getEvtObject(
          BrowserAgent.globals.evtTypes.RES,
          !1,
          null,
          BrowserAgent.globals.sortedBucketList[a].bucket
        )),
        null !== a)
      ) {
        a[BrowserAgent.globals.trackerDataKey] =
          BrowserAgent.browserUtils.cloneTrackerData();
        a[BrowserAgent.globals.ajaxDataKeys.URL] = b.name;
        var c = Math.floor(b.startTime),
          d = Math.floor(b.fetchStart),
          e = Math.floor(b.responseStart),
          f = Math.floor(b.responseEnd);
        if (0 < c || 0 < d)
          a[BrowserAgent.globals.timestampNames.REQUEST_START] =
            performance.timing.navigationStart + (0 < c ? c : d);
        0 < e &&
          (a[BrowserAgent.globals.timestampNames.FIRST_BYTE] =
            performance.timing.navigationStart + e);
        0 < f &&
          ((a[BrowserAgent.globals.timestampNames.LAST_BYTE] =
            performance.timing.navigationStart + f),
          (a[BrowserAgent.globals.timestampNames.CALLBACK_END_TIME] =
            performance.timing.navigationStart + f));
        a[BrowserAgent.globals.ajaxDataKeys.RESPONSE_CONTENT_LENGTH] =
          b.decodedBodySize;
        a[BrowserAgent.globals.RAW_RESOURCE_TIME_DATA] = {
          performanceResourceTiming: BrowserAgent.browserUtils.copyObj(b),
        };
        a.isDone = !0;
      }
    },
    resourceTimingHarvest: function () {
      if (
        !BrowserAgent.globals.configs.RESOURCEMETRICSENABLED ||
        !BrowserAgent.globals.isPerformanceResourceSupported
      )
        return 0;
      var a = performance.getEntriesByType("resource");
      if (void 0 === a || 0 >= a.length) return 0;
      var b;
      for (b = 0; b < a.length; b++) {
        var c = a[b];
        if (BrowserAgent.evtUtils.canHarvestResource(c))
          if (
            c.initiatorType ===
              BrowserAgent.globals.XML_HTTP_REQUEST_PERF_RES_TYPE ||
            "preflight" === c.initiatorType ||
            "other" === c.initiatorType
          ) {
            if (
              c.initiatorType ===
              BrowserAgent.globals.XML_HTTP_REQUEST_PERF_RES_TYPE
            ) {
              var d = c.requestStart + performance.timing.navigationStart,
                e = BrowserAgent.globals.urlToPerformanceListMap[c.name];
              e ||
                ((e = []),
                (BrowserAgent.globals.urlToPerformanceListMap[c.name] = e));
              BrowserAgent.browserUtils.binaryInsert(
                e,
                { perfObj: c, requestStart: d },
                BrowserAgent.globals.REQUEST_START_PROP_NAME
              );
              BrowserAgent.globals.currentPerfObjectCount += 1;
              BrowserAgent.evtUtils.addItemToPRESet(c);
            }
          } else
            0 <= c.duration &&
            c.duration < BrowserAgent.globals.configs.RESOURCEMETRICSTHRESHOLD
              ? (BrowserAgent.evtUtils.addItemToPRESet(c),
                BrowserAgent.logger.info(
                  "resourceTimingHarvest: Skipping harvest of resource metrics for " +
                    c.name +
                    " as it is below the configured resource metric threshold"
                ))
              : ((d = BrowserAgent.evtUtils.findPageBucketIndexForResource(c)),
                void 0 !== d &&
                  (BrowserAgent.evtUtils.extractDataForResource(d, c),
                  BrowserAgent.evtUtils.addItemToPRESet(c)));
      }
      return a.length;
    },
    addItemToPRESet: function (a) {
      if (!a || !BrowserAgent.globals.processedResourceEntries)
        return (
          BrowserAgent.logger.warn(
            "addItemToPRESet: Cannot add resource as either resource is undefined or processResourceEntries Set is not present"
          ),
          !1
        );
      a = BrowserAgent.evtUtils.generateProcessedResourceEntriesItem(
        a.name,
        a.startTime
      );
      BrowserAgent.globals.processedResourceEntries.addItem(a);
      return !0;
    },
    hasItemInPRESet: function (a) {
      if (!a || !BrowserAgent.globals.processedResourceEntries)
        return (
          BrowserAgent.logger.warn(
            "hasItemInPRESet: Cannot find resource as either resource item is undefined or processResourceEntries Set is not present"
          ),
          !1
        );
      a = BrowserAgent.evtUtils.generateProcessedResourceEntriesItem(
        a.name,
        a.startTime
      );
      return BrowserAgent.globals.processedResourceEntries.hasItem(a);
    },
    removeItemFromPRESet: function (a) {
      if (!a || !BrowserAgent.globals.processedResourceEntries)
        return (
          BrowserAgent.logger.warn(
            "hasItemInPRESet: Cannot find resource as either resource item is undefined or processResourceEntries Set is not present"
          ),
          !1
        );
      a = BrowserAgent.evtUtils.generateProcessedResourceEntriesItem(
        a.name,
        a.startTime
      );
      BrowserAgent.globals.processedResourceEntries.removeItem(a);
      return !0;
    },
    sendEvts: function (a, b, c) {
      b && "string" === typeof a
        ? ("boolean" !== typeof c && (c = !0),
          !1 === c
            ? BrowserAgent.evtUtils.sendBeacon(a, b)
            : new BrowserAgent.RetrySendEventXHR(a, b).start())
        : BrowserAgent.logger.error(
            "sendMetrics: Cannot send Browser Agent Metrics to URL: " +
              a +
              " with data as " +
              BrowserAgent.jsonStringify(b)
          );
    },
    sendBeacon: function (a, b) {
      navigator && navigator.sendBeacon
        ? ((b = BrowserAgent.jsonStringify(b)),
          navigator.sendBeacon(a, b),
          BrowserAgent.logger.debug("sendBeacon: Sending POST with " + b))
        : BrowserAgent.evtUtils.addToRetryPayloadsMap(
            BrowserAgent.browserUtils.generateUUID(),
            a,
            b
          );
    },
    isClamped: function (a, b, c) {
      return BrowserAgent.evtUtils.evtClampMask &
        BrowserAgent.evtUtils.evtClampFlags[a].code
        ? !0
        : b + 1 > c
        ? ((BrowserAgent.evtUtils.evtClampMask |=
            BrowserAgent.evtUtils.evtClampFlags[a].code),
          BrowserAgent.logger.warn(
            "isClamped: Browser Agent" +
              BrowserAgent.evtUtils.evtClampFlags[a].desc +
              "clamp reached. Halting" +
              BrowserAgent.evtUtils.evtClampFlags[a].desc +
              "until next metric interval..."
          ),
          !0)
        : !1;
    },
    resetClamps: function () {
      BrowserAgent.evtUtils.currEvtCt = 0;
      BrowserAgent.errorUtils.currErrCt = 0;
      BrowserAgent.evtUtils.evtClampMask = 0;
    },
    addToRetryPayloadsMap: function (a, b, c) {
      var d = BrowserAgent.globals.retryPayloadsMap[a];
      BrowserAgent.globals.retryPayloadsMap[a] = { url: b, data: c };
      return d;
    },
    removeFromRetryPayloadsMap: function (a) {
      var b = BrowserAgent.globals.retryPayloadsMap[a];
      delete BrowserAgent.globals.retryPayloadsMap[a];
      return b;
    },
    saveRetryPayloadsMapToSession: function () {
      var a = [],
        b;
      for (b in BrowserAgent.globals.retryPayloadsMap)
        a.push(BrowserAgent.globals.retryPayloadsMap[b]);
      BrowserAgent.storageUtils.putInStorage(
        BrowserAgent.storageUtils.storageTypes.SESSION,
        BrowserAgent.storageUtils.storageKeys.PAYLOADRETRYLIST,
        BrowserAgent.jsonStringify(a),
        !0
      );
      BrowserAgent.globals.retryPayloadsMap = {};
    },
    processRetryPayloadsFromSession: function () {
      var a = BrowserAgent.storageUtils.getFromStorage(
        BrowserAgent.storageUtils.storageTypes.SESSION,
        BrowserAgent.storageUtils.storageKeys.PAYLOADRETRYLIST
      );
      BrowserAgent.storageUtils.deleteFromStorage(
        BrowserAgent.storageUtils.storageTypes.SESSION,
        BrowserAgent.storageUtils.storageKeys.PAYLOADRETRYLIST
      );
      if (a) {
        a = BrowserAgentBootstrap.origFuncMap.jsonParse(a);
        for (var b = 0; b < a.length; b++)
          BrowserAgent.evtUtils.sendEvts(a[b].url, a[b].data);
      }
    },
  };
  BrowserAgent.pageUtils = {
    performance: null,
    init: function () {
      document.addEventListener(
        "click",
        BrowserAgent.pageUtils.mouseClickRouteChangeWatcher,
        !0
      );
      BrowserAgent.globals.initPageInfo = {};
      BrowserAgent.globals.initPageInfo.url = window.location.href;
      BrowserAgent.globals.initPageInfo.timeStamp =
        BrowserAgent.globals.baStartTime;
      document.referrer &&
        "" !== document.referrer &&
        ((BrowserAgent.globals.initPageInfo.referrer = document.referrer),
        (BrowserAgent.globals.initPageInfo.prevPage =
          BrowserAgent.globals.initPageInfo.referrer));
      var a = BrowserAgent.jsonUtils.createBS(
        BrowserAgent.globals.bs,
        BrowserAgent.globals.bt,
        BrowserAgent.globals.btc
      );
      a && (BrowserAgent.globals.initPageInfo.businessService = a);
      BrowserAgent.globals.initPageInfo.pageMetricPath =
        BrowserAgent.globals.metricPathConsts.PREFIX +
        BrowserAgent.globals.pipeChar;
      a = BrowserAgent.browserUtils.parseURL(
        BrowserAgent.globals.initPageInfo.url
      );
      BrowserAgent.globals.initPageInfo.pageMetricPath =
        BrowserAgent.globals.bs === BrowserAgent.globals.UNDEFINED
          ? BrowserAgent.globals.initPageInfo.pageMetricPath +
            (a.hostname +
              BrowserAgent.globals.forwardSlashChar +
              a.port +
              BrowserAgent.globals.pipeChar +
              a.pathname)
          : BrowserAgent.globals.initPageInfo.pageMetricPath +
            (BrowserAgent.globals.bs +
              BrowserAgent.globals.pipeChar +
              BrowserAgent.globals.bt +
              BrowserAgent.globals.pipeChar +
              BrowserAgent.globals.btc +
              BrowserAgent.globals.pipeChar +
              BrowserAgent.globals.metricPathConsts.BROWSER);
      "" !== a.hash &&
        ((BrowserAgent.globals.initPageInfo.pageMetricPathNoHash =
          BrowserAgent.globals.initPageInfo.pageMetricPath),
        (BrowserAgent.globals.initPageInfo.pageMetricPath +=
          BrowserAgent.globals.pipeChar + a.hash));
      BrowserAgent.pageUtils.addNewPageBucket(
        BrowserAgent.globals.pageBucketTypes.HP,
        BrowserAgent.globals.initPageInfo.url,
        BrowserAgent.globals.initPageInfo.timeStamp,
        !0,
        BrowserAgent.browserUtils.cloneTrackerData()
      );
      BrowserAgent.globals.configs.PAGELOADMETRICSENABLED
        ? this.performance && this.performance.timing
          ? (BrowserAgent.logger.info(
              "pageUtils.init: Navigation Timing API is present."
            ),
            window.addEventListener("load", BrowserAgent.pageUtils.onload, !1))
          : BrowserAgent.logger.warn(
              "pageUtils.init: Navigation Timing API is not present. Page load metrics will not be reported..."
            )
        : (BrowserAgent.logger.info(
            "pageUtils.init: Skipping page and soft page instrumentation because Page load metrics are DISABLED"
          ),
          (BrowserAgent.globals.isSoftPageLoad = !1));
      window.MutationObserver && window.history
        ? (BrowserAgent.globals.userAgents.EDGE.name ===
            BrowserAgent.globals.platform ||
          BrowserAgent.globals.userAgents.IE.name ===
            BrowserAgent.globals.platform
            ? window.addEventListener(
                "hashchange",
                BrowserAgent.pageUtils.onpopstate,
                !0
              )
            : window.addEventListener(
                "popstate",
                BrowserAgent.pageUtils.onpopstate,
                !0
              ),
          (BrowserAgent.globals.domChangeObserver = new MutationObserver(
            function (a) {
              BrowserAgent.globals.domLastUpdated =
                BrowserAgentBootstrap.origFuncMap.timeNow();
              BrowserAgent.globals.domChangeTimerId ||
                (document.addEventListener(
                  "mousedown",
                  BrowserAgent.pageUtils.mouseEventHandler,
                  !0
                ),
                document.addEventListener(
                  "scroll",
                  BrowserAgent.pageUtils.mouseEventHandler,
                  !0
                ),
                (BrowserAgent.globals.domChangeTimerId = setInterval(
                  BrowserAgent.pageUtils.checkLastDOMChange,
                  BrowserAgent.globals.configs.DOMCHANGEINTERVAL
                )));
            }
          )))
        : (BrowserAgent.logger.warn(
            "pageUtils.init: Required browser APIs are not present. Soft Page load metrics will not be reported..."
          ),
          (BrowserAgent.globals.isSoftPageLoad = !1));
      document.addEventListener(
        "mousedown",
        BrowserAgent.pageUtils.mouseDownHandler,
        !0
      );
    },
    mouseClickRouteChangeWatcher: function (a) {
      var b = null;
      a = a || window.event;
      for (var c = a.target || a.srcElement, d = 5; null !== c && 0 < d; ) {
        var e = c.localName ? c.localName.trim().toLocaleLowerCase() : "";
        if (BrowserAgent.globals.supportedSPARouteTagNames[e]) {
          b = c.textContent || c.innerText;
          break;
        }
        c = c.parentElement;
        --d;
      }
      null === b &&
        "undefined" !== typeof BrowserAgentExtension &&
        (b = BrowserAgentExtension.internal.safeCustomFunctionCall(
          this,
          BrowserAgentExtension.isClickedEventARouteChange,
          [a]
        ));
      a = BrowserAgentBootstrap.origFuncMap.timeNow();
      null !== b &&
        b === BrowserAgent.globals.lastCustomSPARouteName &&
        0 < BrowserAgent.globals.lastCustomSPARouteTime &&
        ((c = a - BrowserAgent.globals.lastCustomSPARouteTime),
        0 <= c &&
          c < BrowserAgent.globals.MAX_TIME_BETWEEN_SAME_CUSTOM_ROUTE &&
          (b = null));
      b &&
        ((BrowserAgent.globals.lastCustomSPARouteTime = a),
        (BrowserAgent.globals.lastCustomSPARouteName = b),
        BrowserAgent.pageUtils.onpopstateImpl(window.location.href + "/" + b));
    },
    mouseDownHandler: function () {
      BrowserAgent.globals.lastUserMouseDown =
        BrowserAgentBootstrap.origFuncMap.timeNow();
    },
    addNewPageBucket: function (a, b, c, d, e) {
      if (BrowserAgent.globals.configs.BROWSERAGENTENABLED) {
        var f = BrowserAgent.globals.getSequenceNum(),
          g = {
            json: {
              url: b,
              pageLoadFlag:
                !BrowserAgent.globals.configs.PAGELOADMETRICSENABLED,
              pageType: a,
              sessions: { sessionList: [] },
            },
            evtMap: {},
            evtCount: 0,
            isExcluded: BrowserAgent.configUtils.isUrlExcluded(b),
            bucketId: BrowserAgent.browserUtils.generateUUID(),
          };
        g.isExcluded &&
          BrowserAgent.logger.info(
            "addNewPageBucket: Page [" +
              b +
              "] is configured to be EXCLUDED. Skipping all instrumentation on this page..."
          );
        c = BrowserAgent.evtUtils.determineEventTime(c);
        var h = !1;
        !1 === d
          ? ((g.json.timeStamp =
              BrowserAgent.globals.currPagePtr.json.timeStamp),
            (h = !0))
          : (BrowserAgent.browserUtils.isSameSession(c) || (h = !0),
            (g.json.timeStamp = c));
        h &&
          (BrowserAgent.globals.currTTimeEvtPtr &&
            ((BrowserAgent.globals.currTTimeEvtPtr.e =
              BrowserAgentBootstrap.origFuncMap.timeNow()),
            (BrowserAgent.globals.currTTimeEvtPtr.isDone = !0)),
          BrowserAgent.globals.prevSessionList.push(
            BrowserAgent.globals.currSession
          ),
          BrowserAgent.evtUtils.harvestEvts(),
          (BrowserAgent.globals.currTTimeEvtPtr = null),
          (BrowserAgent.globals.currSession =
            BrowserAgent.browserUtils.getNewSession(c)));
        BrowserAgent.storageUtils.putInStorage(
          BrowserAgent.storageUtils.storageTypes.SESSION,
          BrowserAgent.storageUtils.storageKeys.BALASTEVENT_TIME,
          c,
          !0
        );
        BrowserAgent.globals.currSession.id &&
          ((h = { id: BrowserAgent.globals.currSession.id }),
          "number" === typeof BrowserAgent.globals.currSession.startTime &&
            (h.startTime = BrowserAgent.globals.currSession.startTime),
          "boolean" === typeof BrowserAgent.globals.currSession.isNewSession &&
            (h.newSessionFlag = BrowserAgent.globals.currSession.isNewSession),
          g.json.sessions.sessionList.push(h),
          BrowserAgent.globals.currSession.isNewSession &&
            (BrowserAgent.globals.currSession.isNewSession = !1));
        BrowserAgent.globals.pageBucketsMap[f] = g;
        BrowserAgent.globals.prevPagePtr = BrowserAgent.globals.currPagePtr;
        BrowserAgent.globals.currPagePtr =
          BrowserAgent.globals.pageBucketsMap[f];
        BrowserAgent.globals.currPagePtr.id = f;
        a === BrowserAgent.globals.pageBucketTypes.HP
          ? ((BrowserAgent.globals.initPageInfo.id = f),
            BrowserAgent.globals.initPageInfo.referrer &&
              ((g.json.referrer = {
                url: BrowserAgent.globals.initPageInfo.referrer,
              }),
              (g.json.prevPage = {
                url: BrowserAgent.globals.initPageInfo.prevPage,
                timeStamp: BrowserAgent.globals.initPageInfo.timeStamp,
              })),
            BrowserAgent.globals.initPageInfo.businessService &&
              (g.json.businessService =
                BrowserAgent.globals.initPageInfo.businessService),
            (g.pageMetricPath =
              BrowserAgent.globals.initPageInfo.pageMetricPath),
            !0 === d && (g.newPage = !0))
          : ((g.json.referrer = {
              url: BrowserAgent.globals.initPageInfo.url,
              timeStamp: BrowserAgent.globals.initPageInfo.timeStamp,
            }),
            (g.json.prevPage = {
              url: BrowserAgent.globals.prevPagePtr.json.url,
              timeStamp: BrowserAgent.globals.prevPagePtr.json.timeStamp,
            }),
            (a = BrowserAgent.browserUtils.parseURL(b)),
            BrowserAgent.globals.initPageInfo.businessService
              ? ((g.json.businessService = BrowserAgent.jsonUtils.createBS(
                  BrowserAgent.globals.bs,
                  BrowserAgent.globals.bt,
                  BrowserAgent.globals.btc
                )),
                (g.pageMetricPath =
                  BrowserAgent.globals.metricPathConsts.PREFIX +
                  BrowserAgent.globals.pipeChar +
                  BrowserAgent.globals.bs +
                  BrowserAgent.globals.pipeChar +
                  BrowserAgent.globals.bt +
                  BrowserAgent.globals.pipeChar +
                  BrowserAgent.globals.btc +
                  BrowserAgent.globals.pipeChar +
                  BrowserAgent.globals.metricPathConsts.BROWSER +
                  ("" === a.hash
                    ? ""
                    : BrowserAgent.globals.pipeChar + a.hash)))
              : (g.pageMetricPath =
                  BrowserAgent.globals.metricPathConsts.PREFIX +
                  BrowserAgent.globals.pipeChar +
                  a.hostname +
                  BrowserAgent.globals.forwardSlashChar +
                  a.port +
                  BrowserAgent.globals.pipeChar +
                  a.pathname +
                  ("" === a.hash
                    ? ""
                    : BrowserAgent.globals.pipeChar + a.hash)));
        BrowserAgent.globals.sortedBucketList.push({
          id: f,
          bucket: BrowserAgent.globals.pageBucketsMap[f],
          timestamp: c,
        });
        BrowserAgent.globals.currTTimeEvtPtr &&
          ((BrowserAgent.globals.currTTimeEvtPtr.e = c),
          (BrowserAgent.globals.currTTimeEvtPtr.isDone = !0));
        if (
          (f = BrowserAgent.evtUtils.getEvtObject(
            BrowserAgent.globals.evtTypes.TTIME,
            !1,
            null
          ))
        )
          (f.s = c), (f[BrowserAgent.globals.trackerDataKey] = e);
        BrowserAgent.globals.currTTimeEvtPtr = f;
        BrowserAgent.globals.sortedBucketList.length >
          BrowserAgent.globals.pageBucketsMaxLen &&
          ((c = BrowserAgent.globals.sortedBucketList[0].id),
          delete BrowserAgent.globals.pageBucketsMap[c],
          delete BrowserAgent.globals.pageWithEventsMap[c],
          BrowserAgent.globals.sortedBucketList.shift());
        return BrowserAgent.globals.currPagePtr;
      }
    },
    onpopstate: function (a) {
      BrowserAgent.pageUtils.onpopstateImpl(window.location.href);
    },
    onpopstateImpl: function (a) {
      var b = BrowserAgentBootstrap.origFuncMap.timeNow(),
        c = BrowserAgent.browserUtils.cloneTrackerData();
      BrowserAgent.pageUtils.addNewPageBucket(
        BrowserAgent.globals.pageBucketTypes.SP,
        a,
        b,
        !0,
        c
      );
      if (
        BrowserAgent.globals.domChangeTimeoutId ||
        BrowserAgent.globals.domChangeTimerId
      )
        BrowserAgent.logger.debug(
          "onpopstate: DOM change tracking terminated by new route change."
        ),
          BrowserAgent.pageUtils.endDomTracking(b);
      BrowserAgent.globals.isSoftPageLoad &&
        BrowserAgent.pageUtils.startDomTracking(b, c);
    },
    disableSoftPages: function () {
      (BrowserAgent.globals.domChangeTimeoutId ||
        BrowserAgent.globals.domChangeTimerId) &&
        BrowserAgent.pageUtils.clearDomChangeTrackers();
      BrowserAgent.globals.isSoftPageLoad = !1;
    },
    mouseEventHandler: function () {
      var a = BrowserAgentBootstrap.origFuncMap.timeNow();
      if (
        BrowserAgent.globals.domChangeTimeoutId ||
        BrowserAgent.globals.domChangeTimerId
      )
        BrowserAgent.logger.debug(
          "mouseEventHandler: DOM change tracking terminated by user interaction."
        ),
          BrowserAgent.pageUtils.endDomTracking(a);
    },
    checkLastDOMChange: function () {
      BrowserAgentBootstrap.origFuncMap.timeNow() >
        BrowserAgent.globals.domLastUpdated +
          BrowserAgent.globals.configs.DOMCHANGEINTERVAL &&
        (BrowserAgent.logger.debug(
          "checkLastDOMChange: DOM has finished loading."
        ),
        BrowserAgent.pageUtils.endDomTracking(
          BrowserAgent.globals.domLastUpdated
        ));
    },
    startDomTracking: function (a, b) {
      if (0 < a) {
        var c = BrowserAgent.evtUtils.getEvtObject(
          BrowserAgent.globals.evtTypes.SPLOAD,
          !1,
          null
        );
        c &&
          ((BrowserAgent.globals.domChangeTimeoutId = setTimeout(function () {
            BrowserAgent.logger.debug(
              "startDomTracking: DOM change tracking timed out."
            );
            BrowserAgent.pageUtils.endDomTracking(
              BrowserAgentBootstrap.origFuncMap.timeNow()
            );
          }, BrowserAgent.globals.configs.DOMCHANGETIMEOUT)),
          (BrowserAgent.globals.softPageLoadEvtObj = c),
          (c[BrowserAgent.globals.softPageDataKeys.START] = a),
          (c[BrowserAgent.globals.trackerDataKey] = b),
          BrowserAgent.globals.domChangeObserver.observe(
            document,
            BrowserAgent.globals.domChangeObserverConfig
          ));
      } else
        BrowserAgent.logger.error("startDomTracking: startTime is invalid.");
    },
    endDomTracking: function (a) {
      if (0 < a) {
        var b = BrowserAgent.globals.domLastUpdated;
        BrowserAgent.pageUtils.clearDomChangeTrackers();
        b ||
          (a =
            BrowserAgent.globals.softPageLoadEvtObj[
              BrowserAgent.globals.softPageDataKeys.START
            ]);
        BrowserAgent.globals.softPageLoadEvtObj[
          BrowserAgent.globals.softPageDataKeys.END
        ] = a;
        BrowserAgent.globals.softPageLoadEvtObj.isDone = !0;
      } else BrowserAgent.logger.error("endDomTracking: Input is invalid.");
    },
    clearDomChangeTrackers: function () {
      BrowserAgent.globals.domChangeObserver.disconnect();
      BrowserAgent.globals.domLastUpdated = null;
      clearInterval(BrowserAgent.globals.domChangeTimerId);
      BrowserAgent.globals.domChangeTimerId = null;
      clearTimeout(BrowserAgent.globals.domChangeTimeoutId);
      BrowserAgent.globals.domChangeTimeoutId = null;
      document.removeEventListener(
        "mousedown",
        BrowserAgent.pageUtils.mouseEventHandler,
        !0
      );
      document.removeEventListener(
        "scroll",
        BrowserAgent.pageUtils.mouseEventHandler,
        !0
      );
    },
    onload: function () {
      BrowserAgent.logger.info("onload: Detected 'onload' event...");
      setTimeout(function () {
        BrowserAgent.pageUtils.onloadHelper();
      }, 0);
      setTimeout(function () {
        BrowserAgent.pageUtils.checkAnyCORSIssue();
      }, 2e3);
    },
    getAllFrameSourceList: function () {
      var a = [],
        b,
        c = document.getElementsByTagName("frame");
      for (b = 0; b < c.length; b++) a.push(c[b].src);
      c = document.getElementsByTagName("iframe");
      for (b = 0; b < c.length; b++) a.push(c[b].src);
      return a;
    },
    checkAnyCORSIssue: function () {
      for (
        var a = BrowserAgent.pageUtils.getAllFrameSourceList(), b, c, d = 0;
        d < window.frames.length;
        d++
      )
        try {
          window.frames[d].location.origin &&
            ((c = a.indexOf(window.frames[d].location.href)),
            -1 < c && a.splice(c, 1));
        } catch (e) {
          (((BrowserAgent.globals.platform ===
            BrowserAgent.globals.userAgents.CHROME.name ||
            BrowserAgent.globals.platform ===
              BrowserAgent.globals.userAgents.SAFARI.name) &&
            e.code === DOMException.SECURITY_ERR) ||
            ((BrowserAgent.globals.platform ===
              BrowserAgent.globals.userAgents.IE.name ||
              BrowserAgent.globals.platform ===
                BrowserAgent.globals.userAgents.EDGE.name) &&
              "Permission denied" === e.message) ||
            (e.message &&
              -1 != e.message.indexOf("Blocked a frame with origin"))) &&
            BrowserAgent.logger.info("Frames Exception:: " + e.message, e);
        }
      for (b in a)
        BrowserAgent.errorUtils.captureCORSError(
          a[b],
          BrowserAgent.errorUtils.elementPointInCode(b, 0)
        );
    },
    onloadHelper: function () {
      BrowserAgent.logger.info("onloadHelper: OnloadHelper has started");
      var a =
        BrowserAgent.globals.pageBucketsMap[
          BrowserAgent.globals.initPageInfo.id
        ];
      if (
        !a.isExcluded &&
        !BrowserAgent.evtUtils.isClamped(
          BrowserAgent.evtUtils.evtClampFlags.COL.type,
          BrowserAgent.evtUtils.currEvtCt,
          BrowserAgent.globals.configs.EVENTCOLLECTIONCLAMPPERINTERVAL
        )
      ) {
        var b = BrowserAgent.globals.getSequenceNum();
        a.evtMap[b] = {
          id: b,
          type: BrowserAgent.globals.evtTypes.HPLOAD,
          raw: BrowserAgent.pageUtils.performance.timing,
          isDone: !0,
          bucketId: a.bucketId,
        };
        a.evtMap[b][BrowserAgent.globals.trackerDataKey] =
          BrowserAgent.browserUtils.cloneTrackerData();
        a.evtCount += 1;
        BrowserAgent.globals.pageWithEventsMap[
          BrowserAgent.globals.initPageInfo.id
        ] = 1;
      }
    },
    unloadEventHandler: function () {
      var a = performance.now();
      !BrowserAgent.globals.unloadEvtHndlrFlag &&
        BrowserAgent.globals.currTTimeEvtPtr &&
        ((BrowserAgent.globals.currTTimeEvtPtr.e =
          BrowserAgentBootstrap.origFuncMap.timeNow()),
        (BrowserAgent.globals.currTTimeEvtPtr.isDone = !0),
        (BrowserAgent.globals.unloadEvtHndlrFlag = !0),
        (BrowserAgent.globals.isOnUnload = !0),
        BrowserAgent.evtUtils.harvestEvts(),
        BrowserAgent.evtUtils.saveRetryPayloadsMapToSession(),
        BrowserAgent.configUtils.disableBA(),
        (BrowserAgent.globals.selfMonPerformance.baunload =
          performance.now() - a),
        BrowserAgent.logger.info(
          "unloadEventHandler: unload time was " +
            BrowserAgent.globals.selfMonPerformance.baunload
        ));
    },
  };
  "undefined" !== typeof BrowserAgentExtension &&
    ((BrowserAgentExtension.extCustomPageMetricList = []),
    (BrowserAgentExtension.extCustomOptionalPropertyList = []),
    (BrowserAgentExtension.internal = {
      astralRange:
        /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]?|[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/g,
      maxUserFeedbackLength: 256,
      safeCustomFunctionCall: function (a, b, c) {
        try {
          var d = null;
          "function" === typeof b
            ? (d = b.apply(a, c))
            : BrowserAgent.logger.error(
                "safeCustomFunctionCall: function does not exist "
              );
          return d;
        } catch (e) {
          BrowserAgent.logger.error(
            "safeCustomFunctionCall: Error when invoking custom code in function: " +
              b.name +
              ", Error: " +
              e.message
          );
        }
      },
      axaExtDataKeys: {
        CUSTID: "axa_customerId",
        CUSTSESSINFO: "axa_customSessionInfo",
        TXNNAME: "axa_transactionName",
        SVCNAME: "axa_serviceName",
        TXN: "axa_transaction",
      },
      createAXAEvent: function (a, b, c, d, e, f, g, h, k, l, m, n, p, r, t) {
        var q = {};
        "number" !== typeof a || isNaN(a) || (q.eventId = a);
        "string" === typeof b && (q.eventName = b);
        "string" === typeof c && (q.eventType = c);
        if (("number" === typeof d && !isNaN(d)) || "string" === typeof d)
          q.eventValue = d;
        "number" !== typeof e || isNaN(e) || (q.timeStamp = e);
        "string" === typeof f && (q.url = f);
        "number" !== typeof g || isNaN(g) || (q.responseTime = g);
        "number" !== typeof h || isNaN(h) || (q.statusCode = h);
        "number" !== typeof k || isNaN(k) || (q.dataIn = k);
        "number" !== typeof l || isNaN(l) || (q.dataOut = l);
        "string" === typeof m && (q.countryCode = m);
        "string" === typeof n && (q.zipCode = n);
        "string" === typeof p && (q.latitude = p);
        "string" === typeof r && (q.longitude = r);
        t && 0 < t.length && (q.x_attributes = { x_attributeList: t });
        return q;
      },
      addAXAData: function (a) {
        var b = null;
        try {
          if (null === a || "object" !== typeof a)
            BrowserAgent.logger.warn(
              "addAXAData: Cannot add data due to invalid input"
            );
          else if (
            (b = BrowserAgent.evtUtils.getEvtObject(
              BrowserAgent.globals.evtTypes.AXAEXT,
              !1,
              null
            ))
          ) {
            var c = [],
              d = [],
              e,
              f,
              g = BrowserAgentBootstrap.origFuncMap.jsonParse(
                BrowserAgent.storageUtils.getFromStorage(
                  BrowserAgent.storageUtils.storageTypes.SESSION,
                  BrowserAgent.storageUtils.storageKeys.BATRKR
                )
              );
            if (
              "string" === typeof a.trackerId &&
              null !== a.trackerData &&
              "object" === typeof a.trackerData
            ) {
              if (g && g.trackerId) return;
              for (e in a.trackerData)
                (f = BrowserAgent.jsonUtils.createXAttribute(
                  e,
                  a.trackerData[e]
                )) && c.push(f);
              g = {};
              g[a.trackerId] = { x_attributes: { x_attributeList: c } };
              BrowserAgent.storageUtils.putInStorage(
                BrowserAgent.storageUtils.storageTypes.SESSION,
                BrowserAgent.storageUtils.storageKeys.BATRKR,
                BrowserAgent.jsonStringify(g),
                !0
              );
            } else
              for (var h in g) d = d.concat(g[h].x_attributes.x_attributeList);
            if (a.attr)
              for (e in a.attr)
                (f = BrowserAgent.jsonUtils.createXAttribute(e, a.attr[e])) &&
                  d.push(f);
            (f = BrowserAgentExtension.internal.createAXAEvent(
              a.eid,
              a.n,
              a.ty,
              a.v,
              a.t,
              a.u,
              a.r,
              a.s,
              a.i,
              a.o,
              a.cc,
              a.zp,
              a.la,
              a.lo,
              d
            ))
              ? ((b.d = f), (b.isDone = !0))
              : (b.isDelete = !0);
          }
        } catch (k) {
          b && (b.isDelete = !0);
        }
      },
      clearTracker: function (a) {
        var b;
        try {
          ("string" !== typeof a || 1 > a.length) &&
            BrowserAgent.logger.warn(
              "clearTracker: Cannot clear data for tracker ID [" + a + "]"
            ),
            (b = BrowserAgentBootstrap.origFuncMap.jsonParse(
              BrowserAgent.storageUtils.getFromStorage(
                BrowserAgent.storageUtils.storageTypes.SESSION,
                BrowserAgent.storageUtils.storageKeys.BATRKR
              )
            )) &&
              b[a] &&
              (delete b[a],
              BrowserAgent.storageUtils.putInStorage(
                BrowserAgent.storageUtils.storageTypes.SESSION,
                BrowserAgent.storageUtils.storageKeys.BATRKR,
                BrowserAgent.jsonStringify(b),
                !0
              ));
        } catch (c) {
          BrowserAgent.logger.error(
            "clearTracker: Cannot clear data for tracker ID [" +
              a +
              "] - " +
              c.message
          );
        }
      },
      clearAllTrackers: function () {
        try {
          if (BrowserAgent.globals.isStoragePresent) {
            sessionStorage.removeItem(
              BrowserAgent.storageUtils.storageKeys.BATRKR
            );
            var a = BrowserAgentBootstrap.origFuncMap.jsonParse(
              BrowserAgent.storageUtils.getFromStorage(
                BrowserAgent.storageUtils.storageTypes.SESSION,
                BrowserAgent.storageUtils.storageKeys.BATTPERST
              )
            );
            a &&
              (delete a[BrowserAgentExtension.internal.axaExtDataKeys.TXN],
              BrowserAgent.storageUtils.putInStorage(
                BrowserAgent.storageUtils.storageTypes.SESSION,
                BrowserAgent.storageUtils.storageKeys.BATTPERST,
                BrowserAgent.jsonStringify(a),
                !0
              ));
          }
        } catch (b) {
          BrowserAgent.logger.error(
            "clearAllTrackers: Cannot clear tracker data - " + b.message
          );
        }
      },
      getTrackerDataById: function (a) {
        try {
          var b = BrowserAgentBootstrap.origFuncMap.jsonParse(
            BrowserAgent.storageUtils.getFromStorage(
              BrowserAgent.storageUtils.storageTypes.SESSION,
              BrowserAgent.storageUtils.storageKeys.BATRKR
            )
          );
          return b && b[a] ? b[a] : null;
        } catch (c) {
          return (
            BrowserAgent.logger.error(
              "getTrackerDataById: Cannot obtain data for tracker ID [" +
                a +
                "] - " +
                c.message
            ),
            null
          );
        }
      },
      getTrueLength: function (a) {
        a = a.match(BrowserAgentExtension.internal.astralRange);
        return null === a ? 0 : a.length;
      },
      limitToLength: function (a, b) {
        return BrowserAgentExtension.internal.getTrueLength(a) <= b
          ? a
          : a
              .match(BrowserAgentExtension.internal.astralRange)
              .slice(0, b)
              .join("");
      },
    }),
    (BrowserAgentExtension.createCustomMetric = function (a, b, c, d, e) {
      a = { name: a, accumulatorType: c, value: d, path: e };
      b && (a.unit = b);
      return a;
    }),
    (BrowserAgentExtension.addExtensionJSONObject = function (a) {
      var b = null;
      try {
        if (BrowserAgentExtension.isBAAlive())
          if (a && 0 !== a.length) {
            if (
              (b = BrowserAgent.evtUtils.getEvtObject(
                BrowserAgent.globals.evtTypes.APMEXT,
                !1,
                null
              ))
            ) {
              for (var c = 0; c < a.length; c++) {
                var d = a[c];
                if (
                  !d ||
                  !BrowserAgent.jsonUtils.validateMetric(
                    d.path,
                    d.name,
                    d.unit,
                    d.accumulatorType,
                    d.value
                  )
                ) {
                  BrowserAgent.logger.warn(
                    "addExtensionJSONObject: Invalid metric list. Discard extension JSON object..."
                  );
                  b.isDelete = !0;
                  return;
                }
                a[c].value = a[c].value.toString();
              }
              b.lst = a;
              b.isDone = !0;
            }
          } else
            BrowserAgent.logger.warn(
              "addExtensionJSONObject: Invalid metric list. Discard extension JSON object..."
            );
      } catch (e) {
        b && (b.isDelete = !0),
          BrowserAgent.logger.error("addExtensionJSONObject: " + e.message);
      }
    }),
    (BrowserAgentExtension.addCustomOptionalProperty = function (a, b, c) {
      BrowserAgentExtension.extCustomOptionalPropertyList.push({
        name: a,
        value: b,
        description: c,
      });
    }),
    (BrowserAgentExtension.addCustomAjaxMetric = function () {
      BrowserAgent.logger.warn(
        "addCustomAjaxMetric: This API has been deprecated. Please consult the BA documentation"
      );
    }),
    (BrowserAgentExtension.addCustomJSFuncMetric = function () {
      BrowserAgent.logger.warn(
        "addCustomJSFuncMetric: This API has been deprecated. Please consult the BA documentation"
      );
    }),
    (BrowserAgentExtension.addCustomPageMetric = function (a, b, c, d) {
      BrowserAgentExtension.extCustomPageMetricList.push(
        BrowserAgentExtension.createCustomMetric(a, b, c, d)
      );
    }),
    (BrowserAgentExtension.instrumentFunc = function (a, b, c) {
      BrowserAgentExtension.isBAAlive() &&
        BrowserAgent.funcUtils.instrumentFunc(
          a,
          b,
          c,
          BrowserAgent.globals.funcInstrumentMaxRetryCount,
          !0
        );
    }),
    (BrowserAgentExtension.addJSFuncToInstrument =
      BrowserAgentExtension.instrumentFunc),
    (BrowserAgentExtension.deInstrumentFunc = function (a, b, c) {
      BrowserAgentExtension.isBAAlive() &&
        BrowserAgent.funcUtils.deInstrumentFunc(a, b, c, !0);
    }),
    (BrowserAgentExtension.logTextMetric = function (a) {
      try {
        if (BrowserAgentExtension.isBAAlive())
          if (a && a.key && a.value) {
            var b = {
              t: BrowserAgentBootstrap.origFuncMap.timeNow(),
              ty: "custom",
              n: a.key,
              v: a.value,
            };
            b.attr = a.attributes ? a.attributes : {};
            b.attr.dty = "string";
            BrowserAgentExtension.internal.addAXAData(b);
            BrowserAgentExtension.addExtensionJSONObject([
              BrowserAgentExtension.createCustomMetric(
                a.key,
                null,
                BrowserAgent.globals.metricAggregatorType.STRING,
                a.value,
                BrowserAgent.globals.currPagePtr.pageMetricPath +
                  BrowserAgent.globals.pipeChar +
                  BrowserAgent.globals.metricPathConsts.CUSTOM
              ),
            ]);
          } else
            BrowserAgent.logger.warn(
              "logTextMetric: Event " +
                a +
                " is not valid. Please pass a valid logTextMetric event"
            );
      } catch (c) {
        BrowserAgent.logger.error("logTextMetric: " + c.message);
      }
    }),
    (BrowserAgentExtension.logNumericMetric = function (a) {
      try {
        if (BrowserAgentExtension.isBAAlive())
          if (a && a.key && a.value) {
            var b = {
              t: BrowserAgentBootstrap.origFuncMap.timeNow(),
              ty: "custom",
              n: a.key,
              v: a.value,
            };
            b.attr = a.attributes ? a.attributes : {};
            b.attr.dty = "double";
            BrowserAgentExtension.internal.addAXAData(b);
            BrowserAgentExtension.addExtensionJSONObject([
              BrowserAgentExtension.createCustomMetric(
                a.key,
                null,
                BrowserAgent.globals.metricAggregatorType.INT_LONG_DURATION,
                parseFloat(a.value),
                BrowserAgent.globals.currPagePtr.pageMetricPath +
                  BrowserAgent.globals.pipeChar +
                  BrowserAgent.globals.metricPathConsts.CUSTOM
              ),
            ]);
          } else
            BrowserAgent.logger.warn(
              "logNumericMetric: Event " +
                a +
                " is not valid. Please pass a valid logNumericMetric event"
            );
      } catch (c) {
        BrowserAgent.logger.error("logNumericMetric: " + c.message);
      }
    }),
    (BrowserAgentExtension.setCustomerLocation = function (a) {
      try {
        if (BrowserAgentExtension.isBAAlive())
          if (a) {
            var b = {},
              c = !1;
            a.zipCode &&
              a.countryCode &&
              ((b.zp = a.zipCode), (b.cc = a.countryCode), (c = !0));
            if (a.latitude && a.longitude) {
              b.la = a.latitude;
              b.lo = a.longitude;
              var d = BrowserAgent.jsonStringify({
                lat: Number(b.la),
                lon: Number(b.lo),
              });
              BrowserAgent.storageUtils.putInStorage(
                BrowserAgent.storageUtils.storageTypes.SESSION,
                BrowserAgent.storageUtils.storageKeys.GEOCUSTOM,
                d,
                !0
              );
              c = !0;
            }
            c
              ? ((b.t = BrowserAgentBootstrap.origFuncMap.timeNow()),
                (b.ty = "sessionEvent"),
                (b.n = "customerLocation"),
                a.attributes && (b.attr = a.attributes),
                BrowserAgentExtension.internal.addAXAData(b))
              : BrowserAgent.logger.warn(
                  "setCustomerLocation: " +
                    a +
                    " is not valid. Please pass a valid setCustomerLocation location"
                );
          } else
            BrowserAgent.logger.warn(
              "setCustomerLocation: " +
                a +
                " is not valid. Please pass a valid setCustomerLocation event"
            );
      } catch (e) {
        BrowserAgent.logger.error("setCustomerLocation: " + e.message);
      }
    }),
    (BrowserAgentExtension.setSessionAttribute = function (a) {
      try {
        if (BrowserAgentExtension.isBAAlive())
          if (a && a.key && a.value) {
            var b = {
              t: BrowserAgentBootstrap.origFuncMap.timeNow(),
              n: a.key,
              v: a.value,
              ty: "sessionEvent",
            };
            b.attr = a.attributes ? a.attributes : {};
            a.type
              ? (b.attr.dty = a.type)
              : ((b.attr.dty = "string"), (b.v = b.v.toString()));
            BrowserAgentExtension.internal.addAXAData(b);
            var c = [];
            BrowserAgent.jsonUtils.addToList(
              BrowserAgent.jsonUtils.createXAttribute(
                BrowserAgentExtension.internal.axaExtDataKeys.CUSTSESSINFO +
                  BrowserAgent.globals.underscoreChar +
                  a.key,
                b.v
              ),
              c
            );
            for (var d in a.attributes)
              BrowserAgent.jsonUtils.addToList(
                BrowserAgent.jsonUtils.createXAttribute(
                  BrowserAgentExtension.internal.axaExtDataKeys.CUSTSESSINFO +
                    BrowserAgent.globals.underscoreChar +
                    d,
                  a.attributes[d].toString()
                ),
                c
              );
            var e = BrowserAgentBootstrap.origFuncMap.jsonParse(
              BrowserAgent.storageUtils.getFromStorage(
                BrowserAgent.storageUtils.storageTypes.SESSION,
                BrowserAgent.storageUtils.storageKeys.BATTPERST
              )
            );
            e || (e = {});
            e[
              BrowserAgentExtension.internal.axaExtDataKeys.CUSTSESSINFO +
                BrowserAgent.globals.underscoreChar +
                a.key
            ] = c;
            BrowserAgent.storageUtils.putInStorage(
              BrowserAgent.storageUtils.storageTypes.SESSION,
              BrowserAgent.storageUtils.storageKeys.BATTPERST,
              BrowserAgent.jsonStringify(e),
              !0
            );
          } else
            BrowserAgent.logger.warn(
              "setSessionAttribute: Event " +
                a +
                " is not valid. Please pass a valid setSessionAttribute event"
            );
      } catch (f) {
        BrowserAgent.logger.error("setSessionAttribute: " + f.message);
      }
    }),
    (BrowserAgentExtension.startApplicationTransaction = function (a) {
      try {
        if (BrowserAgentExtension.isBAAlive())
          if (a && a.transactionName) {
            var b = BrowserAgentBootstrap.origFuncMap.timeNow(),
              c = a.transactionName;
            a.serviceName &&
              (c += BrowserAgent.globals.dashChar + a.serviceName);
            if (BrowserAgentExtension.internal.getTrackerDataById(c))
              BrowserAgent.logger.warn(
                "startApplicationTransaction: AXA Transaction with transaction tracker " +
                  c +
                  " already started"
              );
            else {
              var d = {
                t: b,
                ty: "txn_events",
                n: "apptxn_start",
                v: a.transactionName,
                trackerData: { ca_at: a.transactionName, txn_s: b },
                trackerId: c,
              };
              d.attr = a.attributes ? a.attributes : {};
              d.attr.mode = "MANUAL";
              d.attr.txn_s = b;
              a.serviceName &&
                ((d.attr.ca_as = a.serviceName),
                (d.trackerData.ca_as = a.serviceName));
              BrowserAgentExtension.internal.addAXAData(d);
              b = [];
              BrowserAgent.jsonUtils.addToList(
                BrowserAgent.jsonUtils.createXAttribute(
                  BrowserAgentExtension.internal.axaExtDataKeys.TXNNAME,
                  a.transactionName
                ),
                b
              );
              a.serviceName &&
                BrowserAgent.jsonUtils.addToList(
                  BrowserAgent.jsonUtils.createXAttribute(
                    BrowserAgentExtension.internal.axaExtDataKeys.SVCNAME,
                    a.serviceName
                  ),
                  b
                );
              for (var e in a.attributes)
                BrowserAgent.jsonUtils.addToList(
                  BrowserAgent.jsonUtils.createXAttribute(
                    BrowserAgentExtension.internal.axaExtDataKeys.TXN +
                      BrowserAgent.globals.underscoreChar +
                      e,
                    a.attributes[e].toString()
                  ),
                  b
                );
              var f = BrowserAgentBootstrap.origFuncMap.jsonParse(
                BrowserAgent.storageUtils.getFromStorage(
                  BrowserAgent.storageUtils.storageTypes.SESSION,
                  BrowserAgent.storageUtils.storageKeys.BATTPERST
                )
              );
              f || (f = {});
              f[BrowserAgentExtension.internal.axaExtDataKeys.TXN] = b;
              BrowserAgent.storageUtils.putInStorage(
                BrowserAgent.storageUtils.storageTypes.SESSION,
                BrowserAgent.storageUtils.storageKeys.BATTPERST,
                BrowserAgent.jsonStringify(f),
                !0
              );
            }
          } else
            BrowserAgent.logger.warn(
              "startApplicationTransaction: Event " +
                a +
                " is not valid. Please pass a valid startApplicationTransaction  event"
            );
      } catch (g) {
        BrowserAgent.logger.error("startApplicationTransaction: " + g.message);
      }
    }),
    (BrowserAgentExtension.stopApplicationTransaction = function (a) {
      try {
        if (BrowserAgentExtension.isBAAlive())
          if (a && a.transactionName) {
            var b = a.transactionName;
            a.serviceName && (b += "-" + a.serviceName);
            var c = BrowserAgentExtension.internal.getTrackerDataById(b);
            if (c) {
              var d = {
                t: BrowserAgentBootstrap.origFuncMap.timeNow(),
                ty: "txn_events",
                v: a.transactionName,
              };
              d.attr = a.attributes ? a.attributes : {};
              d.attr.mode = "MANUAL";
              a.failure
                ? ((d.n = "apptxn_fail"), (d.attr.fd = a.failure))
                : (d.n = "apptxn_end");
              a.serviceName && (d.attr.ca_as = a.serviceName);
              BrowserAgentExtension.internal.addAXAData(d);
              BrowserAgentExtension.internal.clearTracker(b);
              var e = BrowserAgentBootstrap.origFuncMap.jsonParse(
                BrowserAgent.storageUtils.getFromStorage(
                  BrowserAgent.storageUtils.storageTypes.SESSION,
                  BrowserAgent.storageUtils.storageKeys.BATTPERST
                )
              );
              e &&
                e[BrowserAgentExtension.internal.axaExtDataKeys.TXN] &&
                (delete e[BrowserAgentExtension.internal.axaExtDataKeys.TXN],
                BrowserAgent.storageUtils.putInStorage(
                  BrowserAgent.storageUtils.storageTypes.SESSION,
                  BrowserAgent.storageUtils.storageKeys.BATTPERST,
                  BrowserAgent.jsonStringify(e),
                  !0
                ));
            } else
              BrowserAgent.logger.info(
                "stopApplicationTransaction: Cannot stop AXA Transaction with transaction tracker " +
                  c +
                  ". Please check if transaction is started"
              );
          } else
            BrowserAgent.logger.warn(
              "stopApplicationTransaction: Event " +
                a +
                " is not valid. Please pass a valid stopApplicationTransaction event"
            );
      } catch (f) {
        BrowserAgent.logger.error("stopApplicationTransaction: " + f.message);
      }
    }),
    (BrowserAgentExtension.logNetworkEvent = function (a) {
      try {
        if (BrowserAgentExtension.isBAAlive())
          if (a && a.url && a.status && a.inbytes && a.outbytes && a.time) {
            var b = {
              t: BrowserAgentBootstrap.origFuncMap.timeNow(),
              ty: "network",
              u: a.url,
              s: a.status,
              i: a.inbytes,
              o: a.outbytes,
              r: a.time,
            };
            a.attributes && (b.attr = a.attributes);
            var c = BrowserAgent.browserUtils.parseURL(a.url),
              d =
                BrowserAgent.globals.currPagePtr.pageMetricPath +
                BrowserAgent.globals.pipeChar +
                BrowserAgent.globals.metricPathConsts.CUSTOM +
                BrowserAgent.globals.pipeChar +
                BrowserAgent.globals.metricPathConsts.NETWORKEVT +
                BrowserAgent.globals.pipeChar +
                c.hostname +
                BrowserAgent.globals.forwardSlashChar +
                c.port +
                BrowserAgent.globals.pipeChar +
                c.pathname;
            BrowserAgentExtension.internal.addAXAData(b);
            BrowserAgentExtension.addExtensionJSONObject([
              BrowserAgentExtension.createCustomMetric(
                BrowserAgent.globals.defaultMetricDefs.AXA_NRT.name,
                BrowserAgent.globals.defaultMetricDefs.AXA_NRT.unit,
                BrowserAgent.globals.defaultMetricDefs.AXA_NRT.type,
                parseInt(a.time),
                d
              ),
            ]);
          } else
            BrowserAgent.logger.warn(
              "logNetworkEvent: Event " +
                a +
                " is not valid. Please pass a valid Network Event with url, in bytes, out bytes, status and response time"
            );
      } catch (e) {
        BrowserAgent.logger.error("logNetworkEvent: " + e.message);
      }
    }),
    (BrowserAgentExtension.setCustomerId = function (a) {
      try {
        if (BrowserAgentExtension.isBAAlive())
          if (a && a.customerId) {
            var b = {
              t: BrowserAgentBootstrap.origFuncMap.timeNow(),
              n: "customerId",
              v: a.customerId,
              ty: "sessionEvent",
            };
            a.attributes && (b.attr = a.attributes);
            BrowserAgentExtension.internal.addAXAData(b);
            b = [];
            BrowserAgent.jsonUtils.addToList(
              BrowserAgent.jsonUtils.createXAttribute(
                BrowserAgentExtension.internal.axaExtDataKeys.CUSTID,
                a.customerId.toString()
              ),
              b
            );
            for (var c in a.attributes)
              BrowserAgent.jsonUtils.addToList(
                BrowserAgent.jsonUtils.createXAttribute(
                  BrowserAgentExtension.internal.axaExtDataKeys.CUSTID +
                    BrowserAgent.globals.underscoreChar +
                    c,
                  a.attributes[c].toString()
                ),
                b
              );
            var d = BrowserAgentBootstrap.origFuncMap.jsonParse(
              BrowserAgent.storageUtils.getFromStorage(
                BrowserAgent.storageUtils.storageTypes.SESSION,
                BrowserAgent.storageUtils.storageKeys.BATTPERST
              )
            );
            d || (d = {});
            d[BrowserAgentExtension.internal.axaExtDataKeys.CUSTID] = b;
            BrowserAgent.storageUtils.putInStorage(
              BrowserAgent.storageUtils.storageTypes.SESSION,
              BrowserAgent.storageUtils.storageKeys.BATTPERST,
              BrowserAgent.jsonStringify(d),
              !0
            );
          } else
            BrowserAgent.logger.warn(
              "setCustomerId: Event " +
                a +
                " is not valid. Please pass a valid setCustomerId event"
            );
      } catch (e) {
        BrowserAgent.logger.error("setCustomerId: " + e.message);
      }
    }),
    (BrowserAgentExtension.setUserFeedback = function (a) {
      try {
        if (BrowserAgentExtension.isBAAlive())
          if ("string" !== typeof a || 0 >= a.length)
            BrowserAgent.logger.warn(
              "setUserFeedback: Feedback [" +
                evt +
                "] is not valid. Please provide valid user feedback"
            );
          else {
            var b = BrowserAgentExtension.internal.limitToLength(
                a.trim(),
                BrowserAgentExtension.internal.maxUserFeedbackLength
              ),
              c = {
                t: BrowserAgentBootstrap.origFuncMap.timeNow(),
                n: "User Feedback",
                v: b,
                ty: "custom_event",
              };
            BrowserAgentExtension.internal.addAXAData(c);
          }
      } catch (d) {
        BrowserAgent.logger.error("setUserFeedback: " + d.message);
      }
    }));
  BrowserAgent.main = function () {
    var a = BrowserAgent.browserUtils.getBrowserInfo(navigator.userAgent);
    if (a.isSupported)
      if ("undefined" === typeof BAAppProfile)
        BrowserAgent.logger.error(
          "BrowserAgent.main: BA app profile was not found. Disabling Browser Agent..."
        );
      else {
        var b = performance.now();
        BrowserAgent.funcUtils.saveOrigObj("timeNow", Date.now);
        BrowserAgent.funcUtils.saveOrigObj("timeParse", Date.parse);
        BrowserAgent.funcUtils.saveOrigObj("jsonParse", JSON.parse);
        BrowserAgent.funcUtils.saveOrigObj("jsonStringify", JSON.stringify);
        BrowserAgent.jsonStringify = function (a, b, c) {
          var d = Array.prototype.toJSON;
          delete Array.prototype.toJSON;
          a = BrowserAgentBootstrap.origFuncMap.jsonStringify(a, b, c);
          d && (Array.prototype.toJSON = d);
          return a;
        };
        try {
          var c = BrowserAgentBootstrap.origFuncMap.jsonParse(
            BrowserAgent.jsonStringify(BAAppProfile)
          );
        } catch (d) {
          BrowserAgent.logger.error(
            "BrowserAgent.main: Invalid app profile - " +
              d.message +
              ". Disabling Browser Agent..."
          );
          return;
        }
        if (BrowserAgent.configUtils.extractAppInfo()) {
          if (
            ((BrowserAgent.globals.configs =
              BrowserAgentBootstrap.origFuncMap.jsonParse(
                BrowserAgent.jsonStringify(BrowserAgent.configUtils.defaults)
              )),
            (BrowserAgent.globals.configs.BROWSERLOGGINGENABLED = !0),
            BrowserAgent.configUtils.processAppProfile(c))
          )
            if (!1 === BrowserAgent.globals.configs.BROWSERAGENTENABLED)
              BrowserAgent.logger.info(
                "BrowserAgent.main: Browser Agent is DISABLED."
              );
            else if (
              "string" !== typeof BrowserAgent.globals.configs.COLLECTORURL ||
              "" === BrowserAgent.globals.configs.COLLECTORURL
            )
              BrowserAgent.logger.error(
                "BrowserAgent.main: Invalid collector URL. Disabling Browser Agent..."
              );
            else {
              window.XMLHttpRequest &&
                (BrowserAgent.funcUtils.saveOrigObj(
                  "XHR",
                  window.XMLHttpRequest
                ),
                BrowserAgent.funcUtils.saveOrigObj(
                  "XHROpen",
                  window.XMLHttpRequest.prototype.open
                ),
                BrowserAgent.funcUtils.saveOrigObj(
                  "XHRSend",
                  window.XMLHttpRequest.prototype.send
                ));
              String.prototype.includes ||
                (String.prototype.includes =
                  BrowserAgent.browserUtils.includes);
              String.prototype.endsWith ||
                (String.prototype.endsWith = function (a, b) {
                  var c = this.toString();
                  if (
                    "number" !== typeof b ||
                    !isFinite(b) ||
                    Math.floor(b) !== b ||
                    b > c.length
                  )
                    b = c.length;
                  b -= a.length;
                  a = c.lastIndexOf(a, b);
                  return -1 !== a && a === b;
                });
              String.prototype.trim ||
                (String.prototype.trim = function () {
                  return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
                });
              BrowserAgent.pageUtils.performance = window.performance;
              BrowserAgent.globals.baStartTime =
                BrowserAgent.pageUtils.performance &&
                BrowserAgent.pageUtils.performance.timing &&
                BrowserAgent.pageUtils.performance.timing.navigationStart
                  ? BrowserAgent.pageUtils.performance.timing.navigationStart
                  : BrowserAgentBootstrap.origFuncMap.timeNow();
              c = null;
              BrowserAgent.globals.platform = a.name;
              BrowserAgent.globals.platformVersion = a.ver;
              BrowserAgent.globals.isCookieEnabled =
                BrowserAgent.cookieUtils.isCookieEnabled();
              if (BrowserAgent.globals.isCookieEnabled) {
                if (
                  (BrowserAgent.cookieUtils.setRawCookie(
                    BrowserAgent.cookieUtils.cookies.PLATFORM,
                    a.name,
                    null,
                    BrowserAgent.globals.forwardSlashChar,
                    null
                  ),
                  BrowserAgent.cookieUtils.setRawCookie(
                    BrowserAgent.cookieUtils.cookies.PLATFORMVER,
                    a.ver,
                    null,
                    BrowserAgent.globals.forwardSlashChar,
                    null
                  ),
                  (c = BrowserAgent.cookieUtils.getRawCookie(
                    BrowserAgent.cookieUtils.cookies.SERVERTIME
                  )))
                )
                  (BrowserAgent.globals.gapTimeInMillis =
                    BrowserAgent.globals.baStartTime - c),
                    BrowserAgent.cookieUtils.setRawCookie(
                      BrowserAgent.cookieUtils.cookies.GAPTIME,
                      Math.ceil(BrowserAgent.globals.gapTimeInMillis / 1e3),
                      null,
                      BrowserAgent.globals.forwardSlashChar,
                      null
                    ),
                    BrowserAgent.logger.info(
                      "BrowserAgent.main: Client Server gap time is " +
                        BrowserAgent.globals.gapTimeInMillis +
                        " ms"
                    );
              } else
                BrowserAgent.logger.warn(
                  "BrowserAgent.main: Cookies seem to be DISABLED. Browser Agent may exhibit unexpected behavior."
                );
              BrowserAgent.cookieUtils.init();
              BrowserAgent.storageUtils.init();
              BrowserAgent.browserUtils.init();
              BrowserAgent.funcUtils.init();
              BrowserAgent.errorUtils.init();
              BrowserAgent.evtUtils.init();
              BrowserAgent.globals.init();
              window.addEventListener(
                "beforeunload",
                BrowserAgent.pageUtils.unloadEventHandler,
                !0
              );
              window.addEventListener(
                "pagehide",
                BrowserAgent.pageUtils.unloadEventHandler,
                !0
              );
              BrowserAgent.pageUtils.init();
              BrowserAgent.evtUtils.processRetryPayloadsFromSession();
              "undefined" !== typeof BrowserAgentExtension &&
                BrowserAgentExtension.init();
              BrowserAgent.globals.harvestIntervalId = setInterval(
                BrowserAgent.evtUtils.harvestEvts,
                BrowserAgent.globals.configs.METRICFREQUENCY
              );
              try {
                void 0 !== performance.getEntriesByType("resource") &&
                  ((BrowserAgent.globals.isPerformanceResourceSupported = !0),
                  (a = "browsers default value"),
                  "function" ===
                    typeof performance.setResourceTimingBufferSize &&
                    ((a = BrowserAgent.globals.configs.RESOURCEBUFFERSIZE),
                    performance.setResourceTimingBufferSize(a)),
                  BrowserAgent.logger.info(
                    "Performance API supported, buffer set to: " + a
                  ));
              } catch (d) {
                BrowserAgent.logger.warn("Performance API not supported"),
                  (BrowserAgent.globals.isPerformanceResourceSupported = !1);
              }
              BrowserAgent.globals.selfMonPerformance.baloadinit.totalTimeMS +=
                performance.now() - b;
            }
        } else
          BrowserAgent.logger.warn(
            "BrowserAgent.main: Disabling Browser Agent ..."
          );
      }
    else
      BrowserAgent.logger.warn(
        "BrowserAgent.main: Unsupported browser. Disabling Browser Agent for User Agent [" +
          navigator.userAgent +
          "]"
      );
  };
  "prerender" === document.visibilityState &&
    BrowserAgent.logger.warn("Web page in pre-render state.");
  BrowserAgent.main();
} catch (a) {
  window.console &&
    "object" === typeof window.console &&
    window.console.log(
      new Date() + " [CA Browser Agent]:  [ERROR] " + a.message
    );
}
