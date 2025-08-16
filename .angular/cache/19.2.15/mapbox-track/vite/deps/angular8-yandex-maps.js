import "./chunk-NE6GCDYT.js";
import {
  DOCUMENT,
  isPlatformBrowser
} from "./chunk-VXD2P2UT.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  Output,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵinject,
  ɵɵloadQuery,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵqueryRefresh,
  ɵɵviewQuery
} from "./chunk-QLCWAD4B.js";
import {
  NEVER,
  fromEvent,
  isObservable,
  merge
} from "./chunk-VMI3K6GE.js";
import "./chunk-5KXDAEEK.js";
import {
  BehaviorSubject,
  Observable,
  Subject,
  filter,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  takeUntil,
  tap,
  throwError
} from "./chunk-WD6C567C.js";
import "./chunk-HM5YLMWO.js";
import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-TXDUYLVM.js";

// node_modules/angular8-yandex-maps/fesm2022/angular8-yandex-maps.mjs
var _c0 = ["container"];
var _c1 = ["*"];
var EventManager = class {
  constructor(ngZone) {
    this.ngZone = ngZone;
    this.pending = [];
    this.listeners = [];
    this.targetStream = new BehaviorSubject(void 0);
  }
  /**
   * Gets an observable that adds an event listener to the map when a consumer subscribes to it.
   * @param name
   */
  getLazyEmitter(name) {
    return this.targetStream.pipe(switchMap((target) => {
      const observable = new Observable((observer) => {
        if (!target) {
          this.pending.push({
            observable,
            observer
          });
          return void 0;
        }
        const callback = (event) => {
          const e = {
            event,
            target,
            ymaps
          };
          this.ngZone.run(() => observer.next(e));
        };
        const listener = target.events.add(name, callback);
        this.listeners.push({
          name,
          callback,
          manager: listener
        });
        return () => listener.remove(name, callback);
      });
      return observable;
    }));
  }
  /**
   * Sets the current target that the manager should bind events to.
   * @param target
   */
  setTarget(target) {
    const currentTarget = this.targetStream.value;
    if (target === currentTarget) {
      return;
    }
    if (currentTarget) {
      this.clearListeners();
      this.pending = [];
    }
    this.targetStream.next(target);
    this.pending.forEach((subscriber) => subscriber.observable.subscribe(subscriber.observer));
    this.pending = [];
  }
  /**
   * Destroys the manager and clears the event listeners.
   */
  destroy() {
    this.clearListeners();
    this.pending = [];
    this.targetStream.complete();
  }
  /**
   * Clears all currently-registered event listeners.
   */
  clearListeners() {
    this.listeners.forEach((listener) => {
      const {
        name,
        callback,
        manager
      } = listener;
      manager.remove(name, callback);
    });
    this.listeners = [];
  }
};
var YA_CONFIG = new InjectionToken("YA_CONFIG", {
  factory: () => ({})
});
function enterZone(zone) {
  return (source) => new Observable((subscriber) => source.subscribe({
    next: (value) => zone.run(() => subscriber.next(value)),
    error: (error) => zone.run(() => subscriber.error(error)),
    complete: () => zone.run(() => subscriber.complete())
  }));
}
function exitZone(zone) {
  return (source) => new Observable((subscriber) => zone.runOutsideAngular(() => source.subscribe(subscriber)));
}
var YaApiLoaderService = class _YaApiLoaderService {
  constructor(config, document, platformId, ngZone) {
    this.document = document;
    this.ngZone = ngZone;
    this.defaultConfig = {
      lang: "ru_RU",
      version: "2.1"
    };
    this.config$ = new BehaviorSubject(this.defaultConfig);
    this.cache = /* @__PURE__ */ new Map();
    this.isBrowser = isPlatformBrowser(platformId);
    if (!isObservable(config)) {
      config = of(config);
    }
    config.subscribe((config2) => {
      this.config$.next(__spreadValues(__spreadValues({}, this.defaultConfig), config2));
    });
  }
  /**
   * Loads Yandex.Maps API.
   */
  load() {
    if (!this.isBrowser) {
      return NEVER;
    }
    return this.config$.pipe(
      // 3rd party libraries shouldn't be run in a zone.
      // Libraries run tons of different events (requestAnimationFrame, setTimeout, etc.).
      // We do not need to run change detection for these events from the library.
      // Exit from a zone here, so all components are also created outside a zone.
      exitZone(this.ngZone),
      mergeMap((config) => {
        const cacheKey = this.getScriptSource(config);
        const cache = this.cache.get(cacheKey) || {};
        if (cache.ymaps) {
          const apiObject = cache.ymaps;
          return from(apiObject.ready()).pipe(
            // Each nested operator should run outside the zone.
            // Refer to the comment above for the reason why we need to exit the zone.
            exitZone(this.ngZone),
            /**
             * Actually, we need to update it only if they are not equal,
             * it happens if we change the configuration which required new window.ymaps.
             */
            tap(() => window.ymaps = apiObject),
            map(() => apiObject)
          );
        }
        let script = cache.script;
        if (!script) {
          script = this.createScript(config);
          this.cache.set(cacheKey, {
            script
          });
          this.document.body.appendChild(script);
        }
        if (window.ymaps) {
          delete window.ymaps;
        }
        const load = fromEvent(script, "load").pipe(switchMap(() => from(ymaps.ready())), tap(() => this.cache.set(cacheKey, {
          script,
          ymaps
        })), map(() => ymaps));
        const error = fromEvent(script, "error").pipe(switchMap(throwError));
        return merge(load, error).pipe(
          // Each nested operator should run outside the zone.
          // Refer to the comment above for the reason why we need to exit the zone.
          exitZone(this.ngZone),
          take(1)
        );
      })
    );
  }
  createScript(config) {
    const script = this.document.createElement("script");
    script.type = "text/javascript";
    script.src = this.getScriptSource(config);
    script.id = "yandexMapsApiScript";
    script.async = true;
    script.defer = true;
    return script;
  }
  /**
   * Returns a script source from a config.
   * @param config parameters to add to a source
   * @example
   * // returns 'https://api-maps.yandex.ru/2.1/?apikey=658f67a2-fd77-42e9-b99e-2bd48c4ccad4&lang=en_US'
   * getScriptSource({ apikey: '658f67a2-fd77-42e9-b99e-2bd48c4ccad4', lang: 'en_US' })
   */
  getScriptSource(config) {
    const _a = config, {
      enterprise,
      version
    } = _a, rest = __objRest(_a, [
      "enterprise",
      "version"
    ]);
    const params = this.convertConfigIntoQueryParams(rest);
    if (version === "v3") {
      throw new Error("This package does not support the Yandex.Maps API v3. See https://www.npmjs.com/package/angular-yandex-maps-v3");
    }
    return `https://${enterprise ? "enterprise." : ""}api-maps.yandex.ru/${version}/?${params}`;
  }
  /**
   * Converts a config into query string parameters.
   * @param config object to convert
   * @example
   * // returns "lang=ru_RU&apikey=XXX"
   * convertIntoQueryParams({ lang: 'ru_RU', apikey: 'XXX' })
   */
  convertConfigIntoQueryParams(config) {
    return Object.entries(config).map(([key, value]) => `${key}=${value}`).join("&");
  }
  static {
    this.ɵfac = function YaApiLoaderService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YaApiLoaderService)(ɵɵinject(YA_CONFIG), ɵɵinject(DOCUMENT), ɵɵinject(PLATFORM_ID), ɵɵinject(NgZone));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _YaApiLoaderService,
      factory: _YaApiLoaderService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YaApiLoaderService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [YA_CONFIG]
    }]
  }, {
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }, {
    type: NgZone
  }], null);
})();
var generateRandomId = () => `f${Date.now().toString(16)}`;
var YaMapComponent = class _YaMapComponent {
  constructor(ngZone, yaApiLoaderService) {
    this.ngZone = ngZone;
    this.yaApiLoaderService = yaApiLoaderService;
    this.destroy$ = new Subject();
    this.eventManager = new EventManager(this.ngZone);
    this.map$ = new BehaviorSubject(null);
    this.center = [0, 0];
    this.zoom = 10;
    this.ready = new EventEmitter();
    this.actionbegin = this.eventManager.getLazyEmitter("actionbegin");
    this.actionbreak = this.eventManager.getLazyEmitter("actionbreak");
    this.actionend = this.eventManager.getLazyEmitter("actionend");
    this.actiontick = this.eventManager.getLazyEmitter("actiontick");
    this.actiontickcomplete = this.eventManager.getLazyEmitter("actiontickcomplete");
    this.balloonclose = this.eventManager.getLazyEmitter("balloonclose");
    this.balloonopen = this.eventManager.getLazyEmitter("balloonopen");
    this.boundschange = this.eventManager.getLazyEmitter("boundschange");
    this.yaclick = this.eventManager.getLazyEmitter("click");
    this.yacontextmenu = this.eventManager.getLazyEmitter("contextmenu");
    this.yadblclick = this.eventManager.getLazyEmitter("dblclick");
    this.destroy = this.eventManager.getLazyEmitter("destroy");
    this.hintclose = this.eventManager.getLazyEmitter("hintclose");
    this.hintopen = this.eventManager.getLazyEmitter("hintopen");
    this.marginchange = this.eventManager.getLazyEmitter("marginchange");
    this.yamousedown = this.eventManager.getLazyEmitter("mousedown");
    this.yamouseenter = this.eventManager.getLazyEmitter("mouseenter");
    this.yamouseleave = this.eventManager.getLazyEmitter("mouseleave");
    this.yamousemove = this.eventManager.getLazyEmitter("mousemove");
    this.yamouseup = this.eventManager.getLazyEmitter("mouseup");
    this.multitouchend = this.eventManager.getLazyEmitter("multitouchend");
    this.multitouchmove = this.eventManager.getLazyEmitter("multitouchmove");
    this.multitouchstart = this.eventManager.getLazyEmitter("multitouchstart");
    this.optionschange = this.eventManager.getLazyEmitter("optionschange");
    this.sizechange = this.eventManager.getLazyEmitter("sizechange");
    this.typechange = this.eventManager.getLazyEmitter("typechange");
    this.yawheel = this.eventManager.getLazyEmitter("wheel");
  }
  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      const map2 = this.map$.value;
      if (map2) {
        const {
          center,
          zoom,
          state,
          options
        } = changes;
        if (state) {
          this.setState(this.combineState(), map2);
        }
        if (center) {
          map2.setCenter(center.currentValue);
        }
        if (zoom) {
          map2.setZoom(zoom.currentValue);
        }
        if (options) {
          map2.options.set(options.currentValue);
        }
      }
    });
  }
  ngAfterViewInit() {
    this.yaApiLoaderService.load().pipe(takeUntil(this.destroy$)).subscribe(() => {
      const id = generateRandomId();
      const map2 = this.createMap(id);
      if (this.map$.value) {
        this.map$.value.destroy();
      }
      this.map$.next(map2);
      this.eventManager.setTarget(map2);
      this.ready.emit({
        ymaps,
        target: map2
      });
    });
  }
  ngOnDestroy() {
    this.eventManager.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Destructs state and passes it in API.
   * @param state
   * @param map
   */
  setState(state, map2) {
    const {
      behaviors,
      bounds,
      center,
      controls,
      margin,
      type,
      zoom
    } = state;
    if (behaviors) {
      map2.behaviors.enable(behaviors);
    }
    if (bounds) {
      map2.setBounds(bounds);
    }
    if (center) {
      map2.setCenter(center);
    }
    if (controls) {
      controls.forEach((control) => map2.controls.add(control));
    }
    if (margin) {
      map2.margin.setDefaultMargin(margin);
    }
    if (type) {
      map2.setType(type);
    }
    if (zoom) {
      map2.setZoom(zoom);
    }
  }
  /**
   * Creates a map.
   * @param id ID which will be set to the map container.
   */
  createMap(id) {
    const containerElem = this.container.nativeElement;
    containerElem.setAttribute("id", id);
    containerElem.style.cssText = "width: 100%; height: 100%;";
    return new ymaps.Map(id, this.combineState(), this.options || {});
  }
  /**
   * Combines the center and zoom into single object.
   */
  combineState() {
    const state = this.state || {};
    return __spreadProps(__spreadValues({}, state), {
      center: this.center || state.center || [0, 0],
      zoom: this.zoom ?? state.zoom ?? 10
    });
  }
  static {
    this.ɵfac = function YaMapComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YaMapComponent)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YaApiLoaderService));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _YaMapComponent,
      selectors: [["ya-map"]],
      viewQuery: function YaMapComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c0, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.container = _t.first);
        }
      },
      inputs: {
        center: "center",
        zoom: "zoom",
        state: "state",
        options: "options"
      },
      outputs: {
        ready: "ready",
        actionbegin: "actionbegin",
        actionbreak: "actionbreak",
        actionend: "actionend",
        actiontick: "actiontick",
        actiontickcomplete: "actiontickcomplete",
        balloonclose: "balloonclose",
        balloonopen: "balloonopen",
        boundschange: "boundschange",
        yaclick: "yaclick",
        yacontextmenu: "yacontextmenu",
        yadblclick: "yadblclick",
        destroy: "destroy",
        hintclose: "hintclose",
        hintopen: "hintopen",
        marginchange: "marginchange",
        yamousedown: "yamousedown",
        yamouseenter: "yamouseenter",
        yamouseleave: "yamouseleave",
        yamousemove: "yamousemove",
        yamouseup: "yamouseup",
        multitouchend: "multitouchend",
        multitouchmove: "multitouchmove",
        multitouchstart: "multitouchstart",
        optionschange: "optionschange",
        sizechange: "sizechange",
        typechange: "typechange",
        yawheel: "yawheel"
      },
      standalone: false,
      features: [ɵɵNgOnChangesFeature],
      decls: 2,
      vars: 0,
      consts: [["container", ""]],
      template: function YaMapComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelement(0, "div", null, 0);
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YaMapComponent, [{
    type: Component,
    args: [{
      selector: "ya-map",
      template: "<div #container></div>",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: false
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YaApiLoaderService
  }], {
    container: [{
      type: ViewChild,
      args: ["container"]
    }],
    center: [{
      type: Input
    }],
    zoom: [{
      type: Input
    }],
    state: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    ready: [{
      type: Output
    }],
    actionbegin: [{
      type: Output
    }],
    actionbreak: [{
      type: Output
    }],
    actionend: [{
      type: Output
    }],
    actiontick: [{
      type: Output
    }],
    actiontickcomplete: [{
      type: Output
    }],
    balloonclose: [{
      type: Output
    }],
    balloonopen: [{
      type: Output
    }],
    boundschange: [{
      type: Output
    }],
    yaclick: [{
      type: Output
    }],
    yacontextmenu: [{
      type: Output
    }],
    yadblclick: [{
      type: Output
    }],
    destroy: [{
      type: Output
    }],
    hintclose: [{
      type: Output
    }],
    hintopen: [{
      type: Output
    }],
    marginchange: [{
      type: Output
    }],
    yamousedown: [{
      type: Output
    }],
    yamouseenter: [{
      type: Output
    }],
    yamouseleave: [{
      type: Output
    }],
    yamousemove: [{
      type: Output
    }],
    yamouseup: [{
      type: Output
    }],
    multitouchend: [{
      type: Output
    }],
    multitouchmove: [{
      type: Output
    }],
    multitouchstart: [{
      type: Output
    }],
    optionschange: [{
      type: Output
    }],
    sizechange: [{
      type: Output
    }],
    typechange: [{
      type: Output
    }],
    yawheel: [{
      type: Output
    }]
  });
})();
var YaGeoObjectDirective = class _YaGeoObjectDirective {
  constructor(ngZone, yaMapComponent) {
    this.ngZone = ngZone;
    this.yaMapComponent = yaMapComponent;
    this.destroy$ = new Subject();
    this.eventManager = new EventManager(this.ngZone);
    this.ready = new EventEmitter();
    this.balloonclose = this.eventManager.getLazyEmitter("balloonclose");
    this.balloonopen = this.eventManager.getLazyEmitter("balloonopen");
    this.beforedrag = this.eventManager.getLazyEmitter("beforedrag");
    this.beforedragstart = this.eventManager.getLazyEmitter("beforedragstart");
    this.yaclick = this.eventManager.getLazyEmitter("click");
    this.yacontextmenu = this.eventManager.getLazyEmitter("contextmenu");
    this.yadblclick = this.eventManager.getLazyEmitter("dblclick");
    this.yadrag = this.eventManager.getLazyEmitter("drag");
    this.yadragend = this.eventManager.getLazyEmitter("dragend");
    this.yadragstart = this.eventManager.getLazyEmitter("dragstart");
    this.editorstatechange = this.eventManager.getLazyEmitter("editorstatechange");
    this.geometrychange = this.eventManager.getLazyEmitter("geometrychange");
    this.hintclose = this.eventManager.getLazyEmitter("hintclose");
    this.hintopen = this.eventManager.getLazyEmitter("hintopen");
    this.mapchange = this.eventManager.getLazyEmitter("mapchange");
    this.yamousedown = this.eventManager.getLazyEmitter("mousedown");
    this.yamouseenter = this.eventManager.getLazyEmitter("mouseenter");
    this.yamouseleave = this.eventManager.getLazyEmitter("mouseleave");
    this.yamousemove = this.eventManager.getLazyEmitter("mousemove");
    this.yamouseup = this.eventManager.getLazyEmitter("mouseup");
    this.multitouchend = this.eventManager.getLazyEmitter("multitouchend");
    this.multitouchmove = this.eventManager.getLazyEmitter("multitouchmove");
    this.multitouchstart = this.eventManager.getLazyEmitter("multitouchstart");
    this.optionschange = this.eventManager.getLazyEmitter("optionschange");
    this.overlaychange = this.eventManager.getLazyEmitter("overlaychange");
    this.parentchange = this.eventManager.getLazyEmitter("parentchange");
    this.propertieschange = this.eventManager.getLazyEmitter("propertieschange");
    this.yawheel = this.eventManager.getLazyEmitter("wheel");
  }
  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      const {
        geoObject
      } = this;
      if (geoObject) {
        const {
          feature,
          options
        } = changes;
        if (feature) {
          this.setFeature(feature.currentValue, geoObject);
        }
        if (options) {
          geoObject.options.set(options.currentValue);
        }
      }
    });
  }
  ngOnInit() {
    this.yaMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map2) => {
      const geoObject = this.createGeoObject();
      this.geoObject = geoObject;
      map2.geoObjects.add(geoObject);
      this.eventManager.setTarget(geoObject);
      this.ready.emit({
        ymaps,
        target: geoObject
      });
    });
  }
  ngOnDestroy() {
    if (this.geoObject) {
      this.yaMapComponent?.map$.value?.geoObjects.remove(this.geoObject);
      this.eventManager.destroy();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Destructs feature and passes it in API.
   * @param feature
   * @param geoObject
   */
  setFeature(feature, geoObject) {
    const {
      geometry,
      properties
    } = feature;
    if (geometry) {
      console.warn("The geometry can not be changed after entity init. To set it, you should recreate a GeoObject with new feature.geometry");
    }
    if (properties) {
      geoObject.properties.set(properties);
    }
  }
  /**
   * Creates GeoObject.
   */
  createGeoObject() {
    return new ymaps.GeoObject(this.feature, this.options);
  }
  static {
    this.ɵfac = function YaGeoObjectDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YaGeoObjectDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YaMapComponent));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YaGeoObjectDirective,
      selectors: [["ya-geoobject"]],
      inputs: {
        feature: "feature",
        options: "options"
      },
      outputs: {
        ready: "ready",
        balloonclose: "balloonclose",
        balloonopen: "balloonopen",
        beforedrag: "beforedrag",
        beforedragstart: "beforedragstart",
        yaclick: "yaclick",
        yacontextmenu: "yacontextmenu",
        yadblclick: "yadblclick",
        yadrag: "yadrag",
        yadragend: "yadragend",
        yadragstart: "yadragstart",
        editorstatechange: "editorstatechange",
        geometrychange: "geometrychange",
        hintclose: "hintclose",
        hintopen: "hintopen",
        mapchange: "mapchange",
        yamousedown: "yamousedown",
        yamouseenter: "yamouseenter",
        yamouseleave: "yamouseleave",
        yamousemove: "yamousemove",
        yamouseup: "yamouseup",
        multitouchend: "multitouchend",
        multitouchmove: "multitouchmove",
        multitouchstart: "multitouchstart",
        optionschange: "optionschange",
        overlaychange: "overlaychange",
        parentchange: "parentchange",
        propertieschange: "propertieschange",
        yawheel: "yawheel"
      },
      standalone: false,
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YaGeoObjectDirective, [{
    type: Directive,
    args: [{
      selector: "ya-geoobject",
      standalone: false
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YaMapComponent
  }], {
    feature: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    ready: [{
      type: Output
    }],
    balloonclose: [{
      type: Output
    }],
    balloonopen: [{
      type: Output
    }],
    beforedrag: [{
      type: Output
    }],
    beforedragstart: [{
      type: Output
    }],
    yaclick: [{
      type: Output
    }],
    yacontextmenu: [{
      type: Output
    }],
    yadblclick: [{
      type: Output
    }],
    yadrag: [{
      type: Output
    }],
    yadragend: [{
      type: Output
    }],
    yadragstart: [{
      type: Output
    }],
    editorstatechange: [{
      type: Output
    }],
    geometrychange: [{
      type: Output
    }],
    hintclose: [{
      type: Output
    }],
    hintopen: [{
      type: Output
    }],
    mapchange: [{
      type: Output
    }],
    yamousedown: [{
      type: Output
    }],
    yamouseenter: [{
      type: Output
    }],
    yamouseleave: [{
      type: Output
    }],
    yamousemove: [{
      type: Output
    }],
    yamouseup: [{
      type: Output
    }],
    multitouchend: [{
      type: Output
    }],
    multitouchmove: [{
      type: Output
    }],
    multitouchstart: [{
      type: Output
    }],
    optionschange: [{
      type: Output
    }],
    overlaychange: [{
      type: Output
    }],
    parentchange: [{
      type: Output
    }],
    propertieschange: [{
      type: Output
    }],
    yawheel: [{
      type: Output
    }]
  });
})();
var YaPlacemarkDirective = class _YaPlacemarkDirective {
  constructor(ngZone, yaMapComponent) {
    this.ngZone = ngZone;
    this.yaMapComponent = yaMapComponent;
    this.destroy$ = new Subject();
    this.eventManager = new EventManager(this.ngZone);
    this.geometry = [];
    this.ready = new EventEmitter();
    this.balloonclose = this.eventManager.getLazyEmitter("balloonclose");
    this.balloonopen = this.eventManager.getLazyEmitter("balloonopen");
    this.beforedrag = this.eventManager.getLazyEmitter("beforedrag");
    this.beforedragstart = this.eventManager.getLazyEmitter("beforedragstart");
    this.yaclick = this.eventManager.getLazyEmitter("click");
    this.yacontextmenu = this.eventManager.getLazyEmitter("contextmenu");
    this.yadblclick = this.eventManager.getLazyEmitter("dblclick");
    this.yadrag = this.eventManager.getLazyEmitter("drag");
    this.yadragend = this.eventManager.getLazyEmitter("dragend");
    this.yadragstart = this.eventManager.getLazyEmitter("dragstart");
    this.editorstatechange = this.eventManager.getLazyEmitter("editorstatechange");
    this.geometrychange = this.eventManager.getLazyEmitter("geometrychange");
    this.hintclose = this.eventManager.getLazyEmitter("hintclose");
    this.hintopen = this.eventManager.getLazyEmitter("hintopen");
    this.mapchange = this.eventManager.getLazyEmitter("mapchange");
    this.yamousedown = this.eventManager.getLazyEmitter("mousedown");
    this.yamouseenter = this.eventManager.getLazyEmitter("mouseenter");
    this.yamouseleave = this.eventManager.getLazyEmitter("mouseleave");
    this.yamousemove = this.eventManager.getLazyEmitter("mousemove");
    this.yamouseup = this.eventManager.getLazyEmitter("mouseup");
    this.multitouchend = this.eventManager.getLazyEmitter("multitouchend");
    this.multitouchmove = this.eventManager.getLazyEmitter("multitouchmove");
    this.multitouchstart = this.eventManager.getLazyEmitter("multitouchstart");
    this.optionschange = this.eventManager.getLazyEmitter("optionschange");
    this.overlaychange = this.eventManager.getLazyEmitter("overlaychange");
    this.parentchange = this.eventManager.getLazyEmitter("parentchange");
    this.propertieschange = this.eventManager.getLazyEmitter("propertieschange");
    this.yawheel = this.eventManager.getLazyEmitter("wheel");
  }
  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      const {
        placemark
      } = this;
      if (placemark) {
        const {
          geometry,
          properties,
          options
        } = changes;
        if (geometry) {
          placemark.geometry?.setCoordinates(geometry.currentValue);
        }
        if (properties) {
          placemark.properties.set(properties.currentValue);
        }
        if (options) {
          placemark.options.set(options.currentValue);
        }
      }
    });
  }
  ngOnInit() {
    this.yaMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map2) => {
      const placemark = this.createPlacemark();
      this.placemark = placemark;
      map2.geoObjects.add(placemark);
      this.eventManager.setTarget(placemark);
      this.ready.emit({
        ymaps,
        target: placemark
      });
    });
  }
  ngOnDestroy() {
    if (this.placemark) {
      this.yaMapComponent?.map$.value?.geoObjects.remove(this.placemark);
      this.eventManager.destroy();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Creates a placemark.
   */
  createPlacemark() {
    return new ymaps.Placemark(this.geometry, this.properties, this.options);
  }
  static {
    this.ɵfac = function YaPlacemarkDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YaPlacemarkDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YaMapComponent));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YaPlacemarkDirective,
      selectors: [["ya-placemark"]],
      inputs: {
        geometry: "geometry",
        properties: "properties",
        options: "options"
      },
      outputs: {
        ready: "ready",
        balloonclose: "balloonclose",
        balloonopen: "balloonopen",
        beforedrag: "beforedrag",
        beforedragstart: "beforedragstart",
        yaclick: "yaclick",
        yacontextmenu: "yacontextmenu",
        yadblclick: "yadblclick",
        yadrag: "yadrag",
        yadragend: "yadragend",
        yadragstart: "yadragstart",
        editorstatechange: "editorstatechange",
        geometrychange: "geometrychange",
        hintclose: "hintclose",
        hintopen: "hintopen",
        mapchange: "mapchange",
        yamousedown: "yamousedown",
        yamouseenter: "yamouseenter",
        yamouseleave: "yamouseleave",
        yamousemove: "yamousemove",
        yamouseup: "yamouseup",
        multitouchend: "multitouchend",
        multitouchmove: "multitouchmove",
        multitouchstart: "multitouchstart",
        optionschange: "optionschange",
        overlaychange: "overlaychange",
        parentchange: "parentchange",
        propertieschange: "propertieschange",
        yawheel: "yawheel"
      },
      standalone: false,
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YaPlacemarkDirective, [{
    type: Directive,
    args: [{
      selector: "ya-placemark",
      standalone: false
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YaMapComponent
  }], {
    geometry: [{
      type: Input
    }],
    properties: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    ready: [{
      type: Output
    }],
    balloonclose: [{
      type: Output
    }],
    balloonopen: [{
      type: Output
    }],
    beforedrag: [{
      type: Output
    }],
    beforedragstart: [{
      type: Output
    }],
    yaclick: [{
      type: Output
    }],
    yacontextmenu: [{
      type: Output
    }],
    yadblclick: [{
      type: Output
    }],
    yadrag: [{
      type: Output
    }],
    yadragend: [{
      type: Output
    }],
    yadragstart: [{
      type: Output
    }],
    editorstatechange: [{
      type: Output
    }],
    geometrychange: [{
      type: Output
    }],
    hintclose: [{
      type: Output
    }],
    hintopen: [{
      type: Output
    }],
    mapchange: [{
      type: Output
    }],
    yamousedown: [{
      type: Output
    }],
    yamouseenter: [{
      type: Output
    }],
    yamouseleave: [{
      type: Output
    }],
    yamousemove: [{
      type: Output
    }],
    yamouseup: [{
      type: Output
    }],
    multitouchend: [{
      type: Output
    }],
    multitouchmove: [{
      type: Output
    }],
    multitouchstart: [{
      type: Output
    }],
    optionschange: [{
      type: Output
    }],
    overlaychange: [{
      type: Output
    }],
    parentchange: [{
      type: Output
    }],
    propertieschange: [{
      type: Output
    }],
    yawheel: [{
      type: Output
    }]
  });
})();
var YaClustererComponent = class _YaClustererComponent {
  constructor(ngZone, yaMapComponent) {
    this.ngZone = ngZone;
    this.yaMapComponent = yaMapComponent;
    this.placemarks = new QueryList();
    this.geoObjects = new QueryList();
    this.destroy$ = new Subject();
    this.eventManager = new EventManager(this.ngZone);
    this.ready = new EventEmitter();
    this.hintclose = this.eventManager.getLazyEmitter("hintclose");
    this.hintopen = this.eventManager.getLazyEmitter("hintopen");
    this.mapchange = this.eventManager.getLazyEmitter("mapchange");
    this.optionschange = this.eventManager.getLazyEmitter("optionschange");
    this.parentchange = this.eventManager.getLazyEmitter("parentchange");
  }
  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      const {
        clusterer
      } = this;
      if (clusterer) {
        const {
          options
        } = changes;
        if (options) {
          clusterer.options.set(options.currentValue);
        }
      }
    });
  }
  ngAfterContentInit() {
    this.yaMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map2) => {
      const clusterer = this.createClusterer();
      this.clusterer = clusterer;
      map2.geoObjects.add(clusterer);
      this.eventManager.setTarget(clusterer);
      this.watchForPlacemarkChanges(clusterer);
      this.watchForGeoObjectChanges(clusterer);
      this.ready.emit({
        ymaps,
        target: clusterer
      });
    });
  }
  ngOnDestroy() {
    this.eventManager.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Creates Clusterer.
   */
  createClusterer() {
    return new ymaps.Clusterer(this.options);
  }
  watchForPlacemarkChanges(clusterer) {
    const initialPlacemarks = this.getInternalPlacemarks(this.placemarks.toArray());
    const currentPlacemarks = new Set(initialPlacemarks);
    clusterer.add(initialPlacemarks);
    this.placemarks.changes.pipe(takeUntil(this.destroy$)).subscribe((placemarkDirectives) => {
      const newPlacemarks = new Set(this.getInternalPlacemarks(placemarkDirectives));
      const difference = this.getDifference(newPlacemarks, currentPlacemarks);
      clusterer.add(difference.toAdd);
      clusterer.remove(difference.toRemove);
    });
  }
  watchForGeoObjectChanges(clusterer) {
    const initialGeoObjects = this.getInternalGeoObjects(this.geoObjects.toArray());
    const currentGeoObjects = new Set(initialGeoObjects);
    clusterer.add(initialGeoObjects);
    this.geoObjects.changes.pipe(takeUntil(this.destroy$)).subscribe((geoObjectDirectives) => {
      const newGeoObjects = new Set(this.getInternalGeoObjects(geoObjectDirectives));
      const difference = this.getDifference(newGeoObjects, currentGeoObjects);
      clusterer.add(difference.toAdd);
      clusterer.remove(difference.toRemove);
    });
  }
  /**
   * Determines what should be added/removed in current set to equal new set
   *
   * @param newSet
   * @param currentSet
   */
  getDifference(newSet, currentSet) {
    const toAdd = [];
    const toRemove = [];
    newSet.forEach((component) => {
      if (!currentSet.has(component)) {
        toAdd.push(component);
        currentSet.add(component);
      }
    });
    currentSet.forEach((component) => {
      if (!newSet.has(component)) {
        toRemove.push(component);
        currentSet.delete(component);
      }
    });
    return {
      toAdd,
      toRemove
    };
  }
  getInternalPlacemarks(placemarks) {
    return placemarks.filter((component) => !!component.placemark).map((component) => component.placemark);
  }
  getInternalGeoObjects(geoObjects) {
    return geoObjects.filter((component) => !!component.geoObject).map((component) => component.geoObject);
  }
  static {
    this.ɵfac = function YaClustererComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YaClustererComponent)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YaMapComponent));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _YaClustererComponent,
      selectors: [["ya-clusterer"]],
      contentQueries: function YaClustererComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, YaPlacemarkDirective, 4);
          ɵɵcontentQuery(dirIndex, YaGeoObjectDirective, 4);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.placemarks = _t);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.geoObjects = _t);
        }
      },
      inputs: {
        options: "options"
      },
      outputs: {
        ready: "ready",
        hintclose: "hintclose",
        hintopen: "hintopen",
        mapchange: "mapchange",
        optionschange: "optionschange",
        parentchange: "parentchange"
      },
      standalone: false,
      features: [ɵɵNgOnChangesFeature],
      ngContentSelectors: _c1,
      decls: 1,
      vars: 0,
      template: function YaClustererComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YaClustererComponent, [{
    type: Component,
    args: [{
      selector: "ya-clusterer",
      template: "<ng-content></ng-content>",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: false
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YaMapComponent
  }], {
    placemarks: [{
      type: ContentChildren,
      args: [YaPlacemarkDirective]
    }],
    geoObjects: [{
      type: ContentChildren,
      args: [YaGeoObjectDirective]
    }],
    options: [{
      type: Input
    }],
    ready: [{
      type: Output
    }],
    hintclose: [{
      type: Output
    }],
    hintopen: [{
      type: Output
    }],
    mapchange: [{
      type: Output
    }],
    optionschange: [{
      type: Output
    }],
    parentchange: [{
      type: Output
    }]
  });
})();
var YaControlDirective = class _YaControlDirective {
  constructor(yaMapComponent) {
    this.yaMapComponent = yaMapComponent;
    this.destroy$ = new Subject();
    this.ready = new EventEmitter();
  }
  ngOnChanges() {
    if (this.control) {
      console.warn("Control does not support dynamic configuration. You can config it manually using ymaps or recreate the component with new configuration.");
    }
  }
  ngOnInit() {
    this.yaMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map2) => {
      if (!this.type) {
        throw new Error("ymaps.control[type] is invalid.");
      }
      const control = new ymaps.control[this.type](this.parameters);
      this.control = control;
      if (control instanceof ymaps.control.RoutePanel && this.parameters && this.parameters.state) {
        control.routePanel.state.set(__spreadValues({}, this.parameters.state));
      }
      map2.controls.add(control);
      this.ready.emit({
        ymaps,
        target: control
      });
    });
  }
  ngOnDestroy() {
    if (this.control) {
      this.yaMapComponent?.map$.value?.controls.remove(this.control);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.ɵfac = function YaControlDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YaControlDirective)(ɵɵdirectiveInject(YaMapComponent));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YaControlDirective,
      selectors: [["ya-control"]],
      inputs: {
        type: "type",
        parameters: "parameters"
      },
      outputs: {
        ready: "ready"
      },
      standalone: false,
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YaControlDirective, [{
    type: Directive,
    args: [{
      selector: "ya-control",
      standalone: false
    }]
  }], () => [{
    type: YaMapComponent
  }], {
    type: [{
      type: Input
    }],
    parameters: [{
      type: Input
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YaMultirouteDirective = class _YaMultirouteDirective {
  constructor(ngZone, yaMapComponent) {
    this.ngZone = ngZone;
    this.yaMapComponent = yaMapComponent;
    this.destroy$ = new Subject();
    this.eventManager = new EventManager(this.ngZone);
    this.referencePoints = [];
    this.ready = new EventEmitter();
    this.activeroutechange = this.eventManager.getLazyEmitter("activeroutechange");
    this.balloonclose = this.eventManager.getLazyEmitter("balloonclose");
    this.balloonopen = this.eventManager.getLazyEmitter("balloonopen");
    this.boundsautoapply = this.eventManager.getLazyEmitter("boundsautoapply");
    this.boundschange = this.eventManager.getLazyEmitter("boundschange");
    this.yaclick = this.eventManager.getLazyEmitter("click");
    this.yacontextmenu = this.eventManager.getLazyEmitter("contextmenu");
    this.yadblclick = this.eventManager.getLazyEmitter("dblclick");
    this.geometrychange = this.eventManager.getLazyEmitter("geometrychange");
    this.mapchange = this.eventManager.getLazyEmitter("mapchange");
    this.yamousedown = this.eventManager.getLazyEmitter("mousedown");
    this.yamouseenter = this.eventManager.getLazyEmitter("mouseenter");
    this.yamouseleave = this.eventManager.getLazyEmitter("mouseleave");
    this.yamousemove = this.eventManager.getLazyEmitter("mousemove");
    this.yamouseup = this.eventManager.getLazyEmitter("mouseup");
    this.multitouchend = this.eventManager.getLazyEmitter("multitouchend");
    this.multitouchmove = this.eventManager.getLazyEmitter("multitouchmove");
    this.multitouchstart = this.eventManager.getLazyEmitter("multitouchstart");
    this.optionschange = this.eventManager.getLazyEmitter("optionschange");
    this.overlaychange = this.eventManager.getLazyEmitter("overlaychange");
    this.parentchange = this.eventManager.getLazyEmitter("parentchange");
    this.pixelboundschange = this.eventManager.getLazyEmitter("pixelboundschange");
    this.propertieschange = this.eventManager.getLazyEmitter("propertieschange");
    this.update = this.eventManager.getLazyEmitter("update");
    this.yawheel = this.eventManager.getLazyEmitter("wheel");
  }
  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      const {
        multiroute
      } = this;
      if (multiroute) {
        const {
          referencePoints,
          model,
          options
        } = changes;
        if (model) {
          this.setModel(model.currentValue, multiroute);
        }
        if (referencePoints) {
          multiroute.model.setReferencePoints(referencePoints.currentValue);
        }
        if (options) {
          multiroute.options.set(options.currentValue);
        }
      }
    });
  }
  ngOnInit() {
    this.yaMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map2) => {
      const multiroute = this.createMultiroute();
      this.multiroute = multiroute;
      map2.geoObjects.add(multiroute);
      this.eventManager.setTarget(multiroute);
      this.ready.emit({
        ymaps,
        target: multiroute
      });
    });
  }
  ngOnDestroy() {
    if (this.multiroute) {
      this.yaMapComponent?.map$.value?.geoObjects.remove(this.multiroute);
      this.eventManager.destroy();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Destructs state and passes them in API.
   * @param model
   * @param multiroute
   */
  setModel(model, multiroute) {
    const {
      referencePoints,
      params
    } = model;
    if (referencePoints) {
      multiroute.model.setReferencePoints(referencePoints);
    }
    if (params) {
      multiroute.model.setParams(params);
    }
  }
  /**
   * Creates Multiroute.
   */
  createMultiroute() {
    return new ymaps.multiRouter.MultiRoute(this.combineModel(), this.options);
  }
  /**
   * Combines the models and reference points into single object
   */
  combineModel() {
    const model = this.model || {};
    return __spreadProps(__spreadValues({}, model), {
      referencePoints: this.referencePoints || model.referencePoints
    });
  }
  static {
    this.ɵfac = function YaMultirouteDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YaMultirouteDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YaMapComponent));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YaMultirouteDirective,
      selectors: [["ya-multiroute"]],
      inputs: {
        referencePoints: "referencePoints",
        model: "model",
        options: "options"
      },
      outputs: {
        ready: "ready",
        activeroutechange: "activeroutechange",
        balloonclose: "balloonclose",
        balloonopen: "balloonopen",
        boundsautoapply: "boundsautoapply",
        boundschange: "boundschange",
        yaclick: "yaclick",
        yacontextmenu: "yacontextmenu",
        yadblclick: "yadblclick",
        geometrychange: "geometrychange",
        mapchange: "mapchange",
        yamousedown: "yamousedown",
        yamouseenter: "yamouseenter",
        yamouseleave: "yamouseleave",
        yamousemove: "yamousemove",
        yamouseup: "yamouseup",
        multitouchend: "multitouchend",
        multitouchmove: "multitouchmove",
        multitouchstart: "multitouchstart",
        optionschange: "optionschange",
        overlaychange: "overlaychange",
        parentchange: "parentchange",
        pixelboundschange: "pixelboundschange",
        propertieschange: "propertieschange",
        update: "update",
        yawheel: "yawheel"
      },
      standalone: false,
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YaMultirouteDirective, [{
    type: Directive,
    args: [{
      selector: "ya-multiroute",
      standalone: false
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YaMapComponent
  }], {
    referencePoints: [{
      type: Input
    }],
    model: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    ready: [{
      type: Output
    }],
    activeroutechange: [{
      type: Output
    }],
    balloonclose: [{
      type: Output
    }],
    balloonopen: [{
      type: Output
    }],
    boundsautoapply: [{
      type: Output
    }],
    boundschange: [{
      type: Output
    }],
    yaclick: [{
      type: Output
    }],
    yacontextmenu: [{
      type: Output
    }],
    yadblclick: [{
      type: Output
    }],
    geometrychange: [{
      type: Output
    }],
    mapchange: [{
      type: Output
    }],
    yamousedown: [{
      type: Output
    }],
    yamouseenter: [{
      type: Output
    }],
    yamouseleave: [{
      type: Output
    }],
    yamousemove: [{
      type: Output
    }],
    yamouseup: [{
      type: Output
    }],
    multitouchend: [{
      type: Output
    }],
    multitouchmove: [{
      type: Output
    }],
    multitouchstart: [{
      type: Output
    }],
    optionschange: [{
      type: Output
    }],
    overlaychange: [{
      type: Output
    }],
    parentchange: [{
      type: Output
    }],
    pixelboundschange: [{
      type: Output
    }],
    propertieschange: [{
      type: Output
    }],
    update: [{
      type: Output
    }],
    yawheel: [{
      type: Output
    }]
  });
})();
var YaObjectManagerDirective = class _YaObjectManagerDirective {
  constructor(ngZone, yaMapComponent) {
    this.ngZone = ngZone;
    this.yaMapComponent = yaMapComponent;
    this.destroy$ = new Subject();
    this.eventManager = new EventManager(this.ngZone);
    this.ready = new EventEmitter();
    this.yaclick = this.eventManager.getLazyEmitter("click");
    this.yacontextmenu = this.eventManager.getLazyEmitter("contextmenu");
    this.yadblclick = this.eventManager.getLazyEmitter("dblclick");
    this.geometrychange = this.eventManager.getLazyEmitter("geometrychange");
    this.mapchange = this.eventManager.getLazyEmitter("mapchange");
    this.yamousedown = this.eventManager.getLazyEmitter("mousedown");
    this.yamouseenter = this.eventManager.getLazyEmitter("mouseenter");
    this.yamouseleave = this.eventManager.getLazyEmitter("mouseleave");
    this.yamousemove = this.eventManager.getLazyEmitter("mousemove");
    this.yamouseup = this.eventManager.getLazyEmitter("mouseup");
    this.multitouchend = this.eventManager.getLazyEmitter("multitouchend");
    this.multitouchmove = this.eventManager.getLazyEmitter("multitouchmove");
    this.multitouchstart = this.eventManager.getLazyEmitter("multitouchstart");
    this.optionschange = this.eventManager.getLazyEmitter("optionschange");
    this.overlaychange = this.eventManager.getLazyEmitter("overlaychange");
    this.parentchange = this.eventManager.getLazyEmitter("parentchange");
    this.propertieschange = this.eventManager.getLazyEmitter("propertieschange");
    this.yawheel = this.eventManager.getLazyEmitter("wheel");
  }
  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      const {
        objectManager
      } = this;
      if (objectManager) {
        const {
          options
        } = changes;
        if (options) {
          objectManager.options.set(options.currentValue);
        }
      }
    });
  }
  ngOnInit() {
    this.yaMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map2) => {
      const objectManager = this.createObjectManager();
      this.objectManager = objectManager;
      map2.geoObjects.add(objectManager);
      this.eventManager.setTarget(objectManager);
      this.ready.emit({
        ymaps,
        target: objectManager
      });
    });
  }
  ngOnDestroy() {
    if (this.objectManager) {
      this.yaMapComponent?.map$.value?.geoObjects.remove(this.objectManager);
      this.eventManager.destroy();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Creates ObjectManager.
   */
  createObjectManager() {
    if (!this.options) {
      throw new Error("ObjectManager options are undefined.");
    }
    return new ymaps.ObjectManager(this.options);
  }
  static {
    this.ɵfac = function YaObjectManagerDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YaObjectManagerDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YaMapComponent));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YaObjectManagerDirective,
      selectors: [["ya-object-manager"]],
      inputs: {
        options: "options"
      },
      outputs: {
        ready: "ready",
        yaclick: "yaclick",
        yacontextmenu: "yacontextmenu",
        yadblclick: "yadblclick",
        geometrychange: "geometrychange",
        mapchange: "mapchange",
        yamousedown: "yamousedown",
        yamouseenter: "yamouseenter",
        yamouseleave: "yamouseleave",
        yamousemove: "yamousemove",
        yamouseup: "yamouseup",
        multitouchend: "multitouchend",
        multitouchmove: "multitouchmove",
        multitouchstart: "multitouchstart",
        optionschange: "optionschange",
        overlaychange: "overlaychange",
        parentchange: "parentchange",
        propertieschange: "propertieschange",
        yawheel: "yawheel"
      },
      standalone: false,
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YaObjectManagerDirective, [{
    type: Directive,
    args: [{
      selector: "ya-object-manager",
      standalone: false
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YaMapComponent
  }], {
    options: [{
      type: Input
    }],
    ready: [{
      type: Output
    }],
    yaclick: [{
      type: Output
    }],
    yacontextmenu: [{
      type: Output
    }],
    yadblclick: [{
      type: Output
    }],
    geometrychange: [{
      type: Output
    }],
    mapchange: [{
      type: Output
    }],
    yamousedown: [{
      type: Output
    }],
    yamouseenter: [{
      type: Output
    }],
    yamouseleave: [{
      type: Output
    }],
    yamousemove: [{
      type: Output
    }],
    yamouseup: [{
      type: Output
    }],
    multitouchend: [{
      type: Output
    }],
    multitouchmove: [{
      type: Output
    }],
    multitouchstart: [{
      type: Output
    }],
    optionschange: [{
      type: Output
    }],
    overlaychange: [{
      type: Output
    }],
    parentchange: [{
      type: Output
    }],
    propertieschange: [{
      type: Output
    }],
    yawheel: [{
      type: Output
    }]
  });
})();
var YaPanoramaDirective = class _YaPanoramaDirective {
  constructor(ngZone, yaMapComponent) {
    this.ngZone = ngZone;
    this.yaMapComponent = yaMapComponent;
    this.destroy$ = new Subject();
    this.eventManager = new EventManager(this.ngZone);
    this.point = [];
    this.ready = new EventEmitter();
    this.destroy = this.eventManager.getLazyEmitter("destroy");
    this.directionchange = this.eventManager.getLazyEmitter("directionchange");
    this.yaerror = this.eventManager.getLazyEmitter("error");
    this.fullscreenenter = this.eventManager.getLazyEmitter("fullscreenenter");
    this.fullscreenexit = this.eventManager.getLazyEmitter("fullscreenexit");
    this.markercollapse = this.eventManager.getLazyEmitter("markercollapse");
    this.markerexpand = this.eventManager.getLazyEmitter("markerexpand");
    this.markermouseenter = this.eventManager.getLazyEmitter("markermouseenter");
    this.markermouseleave = this.eventManager.getLazyEmitter("markermouseleave");
    this.panoramachange = this.eventManager.getLazyEmitter("panoramachange");
    this.spanchange = this.eventManager.getLazyEmitter("spanchange");
  }
  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      const {
        player
      } = this;
      if (player) {
        const {
          point,
          layer,
          options
        } = changes;
        if (point || layer) {
          const combinedPoint = point?.currentValue || this.point;
          const combinedLayer = layer?.currentValue || this.layer;
          player.moveTo(combinedPoint, {
            layer: combinedLayer
          });
        }
        if (options) {
          this.setOptions(options.currentValue, player);
        }
      }
    });
  }
  ngOnInit() {
    const panorama$ = this.yaMapComponent.map$.pipe(filter(Boolean), switchMap((map2) => {
      map2.destroy();
      return this.createPanorama();
    }));
    panorama$.pipe(takeUntil(this.destroy$)).subscribe((panorama) => {
      const {
        id
      } = this.yaMapComponent.container.nativeElement;
      const player = new ymaps.panorama.Player(id, panorama, this.options);
      if (this.player) {
        this.player.destroy();
      }
      this.player = player;
      this.player.events.add("destroy", () => {
        this.player = void 0;
      });
      this.eventManager.setTarget(player);
      this.ready.emit({
        ymaps,
        target: player
      });
    });
  }
  ngOnDestroy() {
    this.eventManager.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Destructs state and passes it in API.
   * @param options
   * @param player
   */
  setOptions(options, player) {
    const {
      autoFitToViewport,
      controls,
      direction,
      hotkeysEnabled,
      span,
      scrollZoomBehavior,
      suppressMapOpenBlock
    } = options;
    if (autoFitToViewport || controls || hotkeysEnabled || scrollZoomBehavior || suppressMapOpenBlock) {
      console.warn("Only direction and span can be set after entity init. To set other options, you should recreate a Panorama with new options");
    }
    if (direction) {
      player.setDirection(direction);
    }
    if (span) {
      player.setSpan(span);
    }
  }
  /**
   * Searches for a panorama and returns first
   */
  createPanorama() {
    return from(ymaps.panorama.locate(this.point, {
      layer: this.layer
    })).pipe(map((panoramas) => panoramas[0]));
  }
  static {
    this.ɵfac = function YaPanoramaDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YaPanoramaDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YaMapComponent));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YaPanoramaDirective,
      selectors: [["ya-panorama"]],
      inputs: {
        point: "point",
        layer: "layer",
        options: "options"
      },
      outputs: {
        ready: "ready",
        destroy: "destroy",
        directionchange: "directionchange",
        yaerror: "yaerror",
        fullscreenenter: "fullscreenenter",
        fullscreenexit: "fullscreenexit",
        markercollapse: "markercollapse",
        markerexpand: "markerexpand",
        markermouseenter: "markermouseenter",
        markermouseleave: "markermouseleave",
        panoramachange: "panoramachange",
        spanchange: "spanchange"
      },
      standalone: false,
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YaPanoramaDirective, [{
    type: Directive,
    args: [{
      selector: "ya-panorama",
      standalone: false
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YaMapComponent
  }], {
    point: [{
      type: Input
    }],
    layer: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    ready: [{
      type: Output
    }],
    destroy: [{
      type: Output
    }],
    directionchange: [{
      type: Output
    }],
    yaerror: [{
      type: Output
    }],
    fullscreenenter: [{
      type: Output
    }],
    fullscreenexit: [{
      type: Output
    }],
    markercollapse: [{
      type: Output
    }],
    markerexpand: [{
      type: Output
    }],
    markermouseenter: [{
      type: Output
    }],
    markermouseleave: [{
      type: Output
    }],
    panoramachange: [{
      type: Output
    }],
    spanchange: [{
      type: Output
    }]
  });
})();
var AngularYandexMapsModule = class _AngularYandexMapsModule {
  /**
   * Please use this method when registering the module at the root level.
   * If used in a lazy-loaded module, YaApiLoaderService will not take the provided configuration.
   * @param config configuration for YaApiLoaderService
   */
  static forRoot(config) {
    return {
      ngModule: _AngularYandexMapsModule,
      providers: [{
        provide: YA_CONFIG,
        useValue: config
      }]
    };
  }
  static {
    this.ɵfac = function AngularYandexMapsModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AngularYandexMapsModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _AngularYandexMapsModule,
      declarations: [YaClustererComponent, YaControlDirective, YaGeoObjectDirective, YaMapComponent, YaMultirouteDirective, YaObjectManagerDirective, YaPanoramaDirective, YaPlacemarkDirective],
      exports: [YaClustererComponent, YaControlDirective, YaGeoObjectDirective, YaMapComponent, YaMultirouteDirective, YaObjectManagerDirective, YaPanoramaDirective, YaPlacemarkDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularYandexMapsModule, [{
    type: NgModule,
    args: [{
      declarations: [YaClustererComponent, YaControlDirective, YaGeoObjectDirective, YaMapComponent, YaMultirouteDirective, YaObjectManagerDirective, YaPanoramaDirective, YaPlacemarkDirective],
      exports: [YaClustererComponent, YaControlDirective, YaGeoObjectDirective, YaMapComponent, YaMultirouteDirective, YaObjectManagerDirective, YaPanoramaDirective, YaPlacemarkDirective]
    }]
  }], null, null);
})();
var YaGeocoderService = class _YaGeocoderService {
  constructor(ngZone, yaApiLoaderService) {
    this.ngZone = ngZone;
    this.yaApiLoaderService = yaApiLoaderService;
  }
  /**
   * Processes geocoding requests.
   * @param request the address for which coordinates need to be obtained (forward geocoding),
   * or the coordinates for which the address needs to be determined (reverse geocoding).
   * @param options geocode options.
   */
  geocode(request, options) {
    return this.yaApiLoaderService.load().pipe(switchMap(() => from(ymaps.geocode(request, options))), enterZone(this.ngZone));
  }
  static {
    this.ɵfac = function YaGeocoderService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YaGeocoderService)(ɵɵinject(NgZone), ɵɵinject(YaApiLoaderService));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _YaGeocoderService,
      factory: _YaGeocoderService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YaGeocoderService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YaApiLoaderService
  }], null);
})();
export {
  AngularYandexMapsModule,
  YA_CONFIG,
  YaApiLoaderService,
  YaClustererComponent,
  YaControlDirective,
  YaGeoObjectDirective,
  YaGeocoderService,
  YaMapComponent,
  YaMultirouteDirective,
  YaObjectManagerDirective,
  YaPanoramaDirective,
  YaPlacemarkDirective
};
//# sourceMappingURL=angular8-yandex-maps.js.map
