import "./chunk-NE6GCDYT.js";
import {
  DOCUMENT,
  isPlatformBrowser
} from "./chunk-VXD2P2UT.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgZone,
  Output,
  PLATFORM_ID,
  TemplateRef,
  ViewChild,
  makeEnvironmentProviders,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵinject,
  ɵɵloadQuery,
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
  __spreadValues
} from "./chunk-TXDUYLVM.js";

// node_modules/angular-yandex-maps-v3/fesm2022/angular-yandex-maps-v3.mjs
var _c0 = ["container"];
var _c1 = ["marker"];
var _c2 = ["cluster"];
var Y_CONFIG = new InjectionToken("Y_CONFIG", {
  factory: () => ({})
});
var provideYConfig = (config) => {
  return makeEnvironmentProviders([{
    provide: Y_CONFIG,
    useValue: config
  }]);
};
function exitZone(zone) {
  return (source) => new Observable((subscriber) => zone.runOutsideAngular(() => source.subscribe(subscriber)));
}
var YApiLoaderService = class _YApiLoaderService {
  constructor(config, document, platformId, ngZone) {
    this.document = document;
    this.ngZone = ngZone;
    this.defaultConfig = {
      lang: "ru_RU"
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
   * Loads the Yandex.Maps API.
   * Runs outside an Angular zone.
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
        if (cache.ymaps3) {
          const apiObject = cache.ymaps3;
          return from(apiObject.ready).pipe(
            // Each nested operator should run outside the zone.
            // Refer to the comment above for the reason why we need to exit the zone.
            exitZone(this.ngZone),
            // Actually, we need to update it only if they are not equal,
            // it happens if we change the configuration which required new window.ymaps3.
            tap(() => window.ymaps3 = apiObject),
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
        if (window.ymaps3) {
          delete window.ymaps3;
          delete window.__chunk_yandex_ymaps3;
        }
        const load = fromEvent(script, "load").pipe(switchMap(() => from(ymaps3.ready)), tap(() => this.cache.set(cacheKey, {
          script,
          ymaps3
        })), map(() => ymaps3));
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
    const params = this.convertConfigIntoQueryParams(config);
    return `https://api-maps.yandex.ru/v3/?${params}`;
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
    this.ɵfac = function YApiLoaderService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YApiLoaderService)(ɵɵinject(Y_CONFIG), ɵɵinject(DOCUMENT), ɵɵinject(PLATFORM_ID), ɵɵinject(NgZone));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _YApiLoaderService,
      factory: _YApiLoaderService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YApiLoaderService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [Y_CONFIG]
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
var YMapComponent = class _YMapComponent {
  constructor(yaApiLoaderService, ngZone) {
    this.yaApiLoaderService = yaApiLoaderService;
    this.ngZone = ngZone;
    this.destroy$ = new Subject();
    this.map$ = new BehaviorSubject(null);
    this.ready = new EventEmitter();
  }
  ngAfterViewInit() {
    this.yaApiLoaderService.load().pipe(takeUntil(this.destroy$)).subscribe(() => {
      const id = generateRandomId();
      const map2 = this.createMap(id);
      if (this.map$.value) {
        this.map$.value.destroy();
      }
      this.map$.next(map2);
      this.ready.emit({
        ymaps3,
        entity: map2
      });
    });
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.map$.value) {
        this.map$.value.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  createMap(containerId) {
    const containerElem = this.container.nativeElement;
    containerElem.setAttribute("id", containerId);
    containerElem.style.cssText = "width: 100%; height: 100%;";
    const clonedProps = __spreadValues({}, this.props);
    return new ymaps3.YMap(containerElem, clonedProps, this.children);
  }
  static {
    this.ɵfac = function YMapComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapComponent)(ɵɵdirectiveInject(YApiLoaderService), ɵɵdirectiveInject(NgZone));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _YMapComponent,
      selectors: [["y-map"]],
      viewQuery: function YMapComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c0, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.container = _t.first);
        }
      },
      inputs: {
        props: "props",
        children: "children"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature],
      decls: 2,
      vars: 0,
      consts: [["container", ""]],
      template: function YMapComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapComponent, [{
    type: Component,
    args: [{
      selector: "y-map",
      standalone: true,
      template: "<div #container></div>",
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], () => [{
    type: YApiLoaderService
  }, {
    type: NgZone
  }], {
    container: [{
      type: ViewChild,
      args: ["container"]
    }],
    props: [{
      type: Input,
      args: [{
        required: true
      }]
    }],
    children: [{
      type: Input
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapClustererDirective = class _YMapClustererDirective {
  constructor(ngZone, yMapComponent) {
    this.ngZone = ngZone;
    this.yMapComponent = yMapComponent;
    this.destroy$ = new Subject();
    this.ready = new EventEmitter();
  }
  ngAfterContentInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), switchMap((map2) => (
      // It's safe to call it each time, the Yandex.Maps API handles multiple requests under the hood.
      from(ymaps3.import("@yandex/ymaps3-clusterer@0.0.1")).pipe(tap(({
        YMapClusterer,
        clusterByGrid
      }) => {
        const marker = (feature) => {
          const element = this.getTemplateElement(this.markerTemplate, feature);
          return new ymaps3.YMapMarker({
            coordinates: feature.geometry.coordinates
          }, element);
        };
        const cluster = (coordinates, features) => {
          const element = this.getTemplateElement(this.clusterTemplate, {
            coordinates,
            features
          });
          return new ymaps3.YMapMarker({
            coordinates
          }, element);
        };
        this.clusterer = new YMapClusterer(__spreadValues({
          marker,
          cluster,
          method: clusterByGrid({
            gridSize: 64
          })
        }, this.props));
        map2.addChild(this.clusterer);
        this.ready.emit({
          ymaps3,
          entity: this.clusterer
        });
      }))
    )), takeUntil(this.destroy$)).subscribe();
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.clusterer) {
        this.clusterer.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getTemplateElement(templateRef, context) {
    if (!templateRef) {
      throw new Error("TemplateRef cannot be undefined. It must be projected to the component.");
    }
    const view = templateRef.createEmbeddedView({
      $implicit: context
    });
    view.detectChanges();
    const element = view.rootNodes[0];
    if (!element) {
      throw new Error("TemplateRef cannot be empty. It must contain a node.");
    }
    return element;
  }
  static {
    this.ɵfac = function YMapClustererDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapClustererDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YMapComponent));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapClustererDirective,
      selectors: [["y-map-clusterer"]],
      contentQueries: function YMapClustererDirective_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, _c1, 5);
          ɵɵcontentQuery(dirIndex, _c2, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.markerTemplate = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.clusterTemplate = _t.first);
        }
      },
      inputs: {
        props: "props"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapClustererDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-clusterer",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YMapComponent
  }], {
    markerTemplate: [{
      type: ContentChild,
      args: ["marker"]
    }],
    clusterTemplate: [{
      type: ContentChild,
      args: ["cluster"]
    }],
    props: [{
      type: Input,
      args: [{
        required: true
      }]
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapDefaultMarkerDirective = class _YMapDefaultMarkerDirective {
  constructor(ngZone, yMapComponent) {
    this.ngZone = ngZone;
    this.yMapComponent = yMapComponent;
    this.destroy$ = new Subject();
    this.ready = new EventEmitter();
  }
  ngOnInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), switchMap((map2) => (
      // It's safe to call it each time, the Yandex.Maps API handles multiple requests under the hood.
      from(ymaps3.import("@yandex/ymaps3-markers@0.0.1")).pipe(tap(({
        YMapDefaultMarker
      }) => {
        this.marker = new YMapDefaultMarker(this.props);
        map2.addChild(this.marker);
        this.ready.emit({
          ymaps3,
          entity: this.marker
        });
      }))
    )), takeUntil(this.destroy$)).subscribe();
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.marker) {
        this.marker.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.ɵfac = function YMapDefaultMarkerDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapDefaultMarkerDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YMapComponent));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapDefaultMarkerDirective,
      selectors: [["y-map-default-marker"]],
      inputs: {
        props: "props"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapDefaultMarkerDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-default-marker",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YMapComponent
  }], {
    props: [{
      type: Input,
      args: [{
        required: true
      }]
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapFeatureDirective = class _YMapFeatureDirective {
  constructor(ngZone, yMapComponent) {
    this.ngZone = ngZone;
    this.yMapComponent = yMapComponent;
    this.destroy$ = new Subject();
    this.ready = new EventEmitter();
  }
  ngOnInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map2) => {
      this.feature = new ymaps3.YMapFeature(this.props);
      map2.addChild(this.feature);
      this.ready.emit({
        ymaps3,
        entity: this.feature
      });
    });
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.feature) {
        this.feature.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.ɵfac = function YMapFeatureDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapFeatureDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YMapComponent));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapFeatureDirective,
      selectors: [["y-map-feature"]],
      inputs: {
        props: "props"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapFeatureDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-feature",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YMapComponent
  }], {
    props: [{
      type: Input,
      args: [{
        required: true
      }]
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapFeatureDataSourceDirective = class _YMapFeatureDataSourceDirective {
  constructor(ngZone, yMapComponent) {
    this.ngZone = ngZone;
    this.yMapComponent = yMapComponent;
    this.destroy$ = new Subject();
    this.ready = new EventEmitter();
  }
  ngOnInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map2) => {
      this.source = new ymaps3.YMapFeatureDataSource(this.props);
      map2.addChild(this.source);
      this.ready.emit({
        ymaps3,
        entity: this.source
      });
    });
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.source) {
        this.source.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.ɵfac = function YMapFeatureDataSourceDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapFeatureDataSourceDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YMapComponent));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapFeatureDataSourceDirective,
      selectors: [["y-map-feature-data-source"]],
      inputs: {
        props: "props"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapFeatureDataSourceDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-feature-data-source",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YMapComponent
  }], {
    props: [{
      type: Input,
      args: [{
        required: true
      }]
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapHintDirective = class _YMapHintDirective {
  constructor(ngZone, yMapComponent) {
    this.ngZone = ngZone;
    this.yMapComponent = yMapComponent;
    this.destroy$ = new Subject();
    this.ready = new EventEmitter();
  }
  ngAfterContentInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), switchMap((map2) => (
      // It's safe to call it each time, the Yandex.Maps API handles multiple requests under the hood.
      from(ymaps3.import("@yandex/ymaps3-hint@0.0.1")).pipe(tap(({
        YMapHint,
        YMapHintContext
      }) => {
        if (!this.template) {
          throw new Error("TemplateRef cannot be undefined. It must be projected to the component.");
        }
        this.hint = new YMapHint(this.props);
        this.hint.addChild(this.createHintContainer(this.template, YMapHintContext));
        map2.addChild(this.hint);
        this.ready.emit({
          ymaps3,
          entity: this.hint
        });
      }))
    )), takeUntil(this.destroy$)).subscribe();
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.hint) {
        this.hint.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * To render a hint, a container is required.
   * This method isolates all the container creation logic and returns the entity.
   */
  createHintContainer(templateRef, _YMapHintContext) {
    class HintContainer extends ymaps3.YMapGroupEntity {
      _onAttach() {
        const view = templateRef.createEmbeddedView({
          $implicit: null
        });
        view.detectChanges();
        this._element = view.rootNodes[0];
        if (!this._element) {
          throw new Error("TemplateRef cannot be empty. It must contain a node.");
        }
        this._detachDom = ymaps3.useDomContext(this, this._element, null);
        this._watchContext(_YMapHintContext, () => {
          view.context.$implicit = this._consumeContext(_YMapHintContext);
          view.detectChanges();
        }, {
          immediate: true
        });
      }
      _onDetach() {
        if (this._detachDom) {
          this._detachDom();
        }
        this._detachDom = void 0;
      }
    }
    return new HintContainer({});
  }
  static {
    this.ɵfac = function YMapHintDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapHintDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YMapComponent));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapHintDirective,
      selectors: [["y-map-hint"]],
      contentQueries: function YMapHintDirective_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, TemplateRef, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
        }
      },
      inputs: {
        props: "props"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapHintDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-hint",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YMapComponent
  }], {
    template: [{
      type: ContentChild,
      args: [TemplateRef]
    }],
    props: [{
      type: Input,
      args: [{
        required: true
      }]
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapListenerDirective = class _YMapListenerDirective {
  constructor(ngZone, yMapComponent) {
    this.ngZone = ngZone;
    this.yMapComponent = yMapComponent;
    this.destroy$ = new Subject();
    this.ready = new EventEmitter();
  }
  ngOnInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map2) => {
      this.listener = new ymaps3.YMapListener(this.props);
      map2.addChild(this.listener);
      this.ready.emit({
        ymaps3,
        entity: this.listener
      });
    });
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.listener) {
        this.listener.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.ɵfac = function YMapListenerDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapListenerDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YMapComponent));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapListenerDirective,
      selectors: [["y-map-listener"]],
      inputs: {
        props: "props"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapListenerDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-listener",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YMapComponent
  }], {
    props: [{
      type: Input,
      args: [{
        required: true
      }]
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapMarkerDirective = class _YMapMarkerDirective {
  constructor(ngZone, elementRef, yMapComponent) {
    this.ngZone = ngZone;
    this.elementRef = elementRef;
    this.yMapComponent = yMapComponent;
    this.destroy$ = new Subject();
    this.ready = new EventEmitter();
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.marker) {
        this.marker.update(changes["props"].currentValue);
      }
    });
  }
  ngAfterViewInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map2) => {
      if (!this.element) {
        this.element = this.elementRef.nativeElement.firstChild;
      }
      this.marker = new ymaps3.YMapMarker(this.props, this.element);
      map2.addChild(this.marker);
      this.ready.emit({
        ymaps3,
        entity: this.marker
      });
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.ɵfac = function YMapMarkerDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapMarkerDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(YMapComponent));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapMarkerDirective,
      selectors: [["y-map-marker"]],
      inputs: {
        props: "props"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapMarkerDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-marker",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: ElementRef
  }, {
    type: YMapComponent
  }], {
    props: [{
      type: Input,
      args: [{
        required: true
      }]
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapControlsDirective = class _YMapControlsDirective {
  constructor(ngZone, yMapComponent) {
    this.ngZone = ngZone;
    this.yMapComponent = yMapComponent;
    this.destroy$ = new Subject();
    this.controls$ = new BehaviorSubject(null);
    this.ready = new EventEmitter();
  }
  ngOnInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map2) => {
      const controls = new ymaps3.YMapControls(this.props, this.children);
      map2.addChild(controls);
      this.controls$.next(controls);
      this.ready.emit({
        ymaps3,
        entity: controls
      });
    });
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.controls$.value) {
        this.controls$.value.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.ɵfac = function YMapControlsDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapControlsDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YMapComponent));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapControlsDirective,
      selectors: [["y-map-controls"]],
      inputs: {
        props: "props",
        children: "children"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapControlsDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-controls",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YMapComponent
  }], {
    props: [{
      type: Input,
      args: [{
        required: true
      }]
    }],
    children: [{
      type: Input
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapControlDirective = class _YMapControlDirective {
  constructor(ngZone, elementRef, yMapControlsDirective) {
    this.ngZone = ngZone;
    this.elementRef = elementRef;
    this.yMapControlsDirective = yMapControlsDirective;
    this.destroy$ = new Subject();
    this.props = {};
    this.ready = new EventEmitter();
  }
  ngAfterViewInit() {
    this.yMapControlsDirective.controls$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((controls) => {
      if (!this.element) {
        this.element = this.elementRef.nativeElement.firstChild;
      }
      this.control = new ymaps3.YMapControl(this.props);
      this.control.addChild(this.createControlContainer(this.element));
      controls.addChild(this.control);
      this.ready.emit({
        ymaps3,
        entity: this.control
      });
    });
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.control) {
        this.control.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * To render a control, a container is required.
   * This method isolates all the container creation logic and returns the entity.
   */
  createControlContainer(element) {
    class ControlContainer extends ymaps3.YMapGroupEntity {
      _onAttach() {
        this._element = element;
        this._detachDom = ymaps3.useDomContext(this, this._element, null);
      }
      _onDetach() {
        if (this._detachDom) {
          this._detachDom();
        }
        this._detachDom = void 0;
      }
    }
    return new ControlContainer({});
  }
  static {
    this.ɵfac = function YMapControlDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapControlDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(YMapControlsDirective));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapControlDirective,
      selectors: [["y-map-control"]],
      inputs: {
        props: "props"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapControlDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-control",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: ElementRef
  }, {
    type: YMapControlsDirective
  }], {
    props: [{
      type: Input
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapControlButtonDirective = class _YMapControlButtonDirective {
  constructor(ngZone, yMapControlsDirective) {
    this.ngZone = ngZone;
    this.yMapControlsDirective = yMapControlsDirective;
    this.destroy$ = new Subject();
    this.ready = new EventEmitter();
  }
  ngOnInit() {
    this.yMapControlsDirective.controls$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((controls) => {
      this.control = new ymaps3.YMapControlButton(this.props, this.options);
      controls.addChild(this.control);
      this.ready.emit({
        ymaps3,
        entity: this.control
      });
    });
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.control) {
        this.control.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.ɵfac = function YMapControlButtonDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapControlButtonDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YMapControlsDirective));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapControlButtonDirective,
      selectors: [["y-map-control-button"]],
      inputs: {
        props: "props",
        options: "options"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapControlButtonDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-control-button",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YMapControlsDirective
  }], {
    props: [{
      type: Input,
      args: [{
        required: true
      }]
    }],
    options: [{
      type: Input
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapControlCommonButtonDirective = class _YMapControlCommonButtonDirective {
  constructor(ngZone, yMapControlsDirective) {
    this.ngZone = ngZone;
    this.yMapControlsDirective = yMapControlsDirective;
    this.destroy$ = new Subject();
    this.ready = new EventEmitter();
  }
  ngOnInit() {
    this.yMapControlsDirective.controls$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((controls) => {
      this.control = new ymaps3.YMapControlCommonButton(this.props, this.options);
      controls.addChild(this.control);
      this.ready.emit({
        ymaps3,
        entity: this.control
      });
    });
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.control) {
        this.control.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.ɵfac = function YMapControlCommonButtonDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapControlCommonButtonDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YMapControlsDirective));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapControlCommonButtonDirective,
      selectors: [["y-map-control-common-button"]],
      inputs: {
        props: "props",
        options: "options"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapControlCommonButtonDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-control-common-button",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YMapControlsDirective
  }], {
    props: [{
      type: Input,
      args: [{
        required: true
      }]
    }],
    options: [{
      type: Input
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapGeolocationControlDirective = class _YMapGeolocationControlDirective {
  constructor(ngZone, yMapControlsDirective) {
    this.ngZone = ngZone;
    this.yMapControlsDirective = yMapControlsDirective;
    this.destroy$ = new Subject();
    this.props = {};
    this.ready = new EventEmitter();
  }
  ngOnInit() {
    this.yMapControlsDirective.controls$.pipe(filter(Boolean), switchMap((controls) => (
      // It's safe to call it each time, the Yandex.Maps API handles multiple requests under the hood.
      from(ymaps3.import("@yandex/ymaps3-controls@0.0.1")).pipe(tap(({
        YMapGeolocationControl
      }) => {
        this.control = new YMapGeolocationControl(this.props);
        controls.addChild(this.control);
        this.ready.emit({
          ymaps3,
          entity: this.control
        });
      }))
    )), takeUntil(this.destroy$)).subscribe();
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.control) {
        this.control.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.ɵfac = function YMapGeolocationControlDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapGeolocationControlDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YMapControlsDirective));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapGeolocationControlDirective,
      selectors: [["y-map-geolocation-control"]],
      inputs: {
        props: "props"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapGeolocationControlDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-geolocation-control",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YMapControlsDirective
  }], {
    props: [{
      type: Input
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapOpenMapsButtonDirective = class _YMapOpenMapsButtonDirective {
  constructor(ngZone, yMapControlsDirective) {
    this.ngZone = ngZone;
    this.yMapControlsDirective = yMapControlsDirective;
    this.destroy$ = new Subject();
    this.props = {};
    this.ready = new EventEmitter();
  }
  ngOnInit() {
    this.yMapControlsDirective.controls$.pipe(filter(Boolean), switchMap((controls) => (
      // It's safe to call it each time, the Yandex.Maps API handles multiple requests under the hood.
      from(ymaps3.import("@yandex/ymaps3-controls-extra")).pipe(tap(({
        YMapOpenMapsButton
      }) => {
        this.control = new YMapOpenMapsButton(this.props);
        controls.addChild(this.control);
        this.ready.emit({
          ymaps3,
          entity: this.control
        });
      }))
    )), takeUntil(this.destroy$)).subscribe();
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.control) {
        this.control.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.ɵfac = function YMapOpenMapsButtonDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapOpenMapsButtonDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YMapControlsDirective));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapOpenMapsButtonDirective,
      selectors: [["y-map-open-maps-button"]],
      inputs: {
        props: "props"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapOpenMapsButtonDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-open-maps-button",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YMapControlsDirective
  }], {
    props: [{
      type: Input
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapScaleControlDirective = class _YMapScaleControlDirective {
  constructor(ngZone, yMapControlsDirective) {
    this.ngZone = ngZone;
    this.yMapControlsDirective = yMapControlsDirective;
    this.destroy$ = new Subject();
    this.props = {};
    this.ready = new EventEmitter();
  }
  ngOnInit() {
    this.yMapControlsDirective.controls$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((controls) => {
      this.control = new ymaps3.YMapScaleControl(this.props);
      controls.addChild(this.control);
      this.ready.emit({
        ymaps3,
        entity: this.control
      });
    });
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.control) {
        this.control.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.ɵfac = function YMapScaleControlDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapScaleControlDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YMapControlsDirective));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapScaleControlDirective,
      selectors: [["y-map-scale-control"]],
      inputs: {
        props: "props"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapScaleControlDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-scale-control",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YMapControlsDirective
  }], {
    props: [{
      type: Input
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapZoomControlDirective = class _YMapZoomControlDirective {
  constructor(ngZone, yMapControlsDirective) {
    this.ngZone = ngZone;
    this.yMapControlsDirective = yMapControlsDirective;
    this.destroy$ = new Subject();
    this.props = {};
    this.ready = new EventEmitter();
  }
  ngOnInit() {
    this.yMapControlsDirective.controls$.pipe(filter(Boolean), switchMap((controls) => (
      // It's safe to call it each time, the Yandex.Maps API handles multiple requests under the hood.
      from(ymaps3.import("@yandex/ymaps3-controls@0.0.1")).pipe(tap(({
        YMapZoomControl
      }) => {
        this.control = new YMapZoomControl(this.props, this.options);
        controls.addChild(this.control);
        this.ready.emit({
          ymaps3,
          entity: this.control
        });
      }))
    )), takeUntil(this.destroy$)).subscribe();
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.control) {
        this.control.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.ɵfac = function YMapZoomControlDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapZoomControlDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YMapControlsDirective));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapZoomControlDirective,
      selectors: [["y-map-zoom-control-button"]],
      inputs: {
        props: "props",
        options: "options"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapZoomControlDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-zoom-control-button",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YMapControlsDirective
  }], {
    props: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapDefaultFeaturesLayerDirective = class _YMapDefaultFeaturesLayerDirective {
  constructor(ngZone, yMapComponent) {
    this.ngZone = ngZone;
    this.yMapComponent = yMapComponent;
    this.destroy$ = new Subject();
    this.props = {};
    this.ready = new EventEmitter();
  }
  ngOnInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map2) => {
      this.layer = new ymaps3.YMapDefaultFeaturesLayer(this.props, this.options);
      map2.addChild(this.layer);
      this.ready.emit({
        ymaps3,
        entity: this.layer
      });
    });
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.layer) {
        this.layer.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.ɵfac = function YMapDefaultFeaturesLayerDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapDefaultFeaturesLayerDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YMapComponent));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapDefaultFeaturesLayerDirective,
      selectors: [["y-map-default-features-layer"]],
      inputs: {
        props: "props",
        options: "options"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapDefaultFeaturesLayerDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-default-features-layer",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YMapComponent
  }], {
    props: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapDefaultSchemeLayerDirective = class _YMapDefaultSchemeLayerDirective {
  constructor(ngZone, yMapComponent) {
    this.ngZone = ngZone;
    this.yMapComponent = yMapComponent;
    this.destroy$ = new Subject();
    this.props = {};
    this.ready = new EventEmitter();
  }
  ngOnInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map2) => {
      this.layer = new ymaps3.YMapDefaultSchemeLayer(this.props, this.options);
      map2.addChild(this.layer);
      this.ready.emit({
        ymaps3,
        entity: this.layer
      });
    });
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.layer) {
        this.layer.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.ɵfac = function YMapDefaultSchemeLayerDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapDefaultSchemeLayerDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YMapComponent));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapDefaultSchemeLayerDirective,
      selectors: [["y-map-default-scheme-layer"]],
      inputs: {
        props: "props",
        options: "options"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapDefaultSchemeLayerDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-default-scheme-layer",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YMapComponent
  }], {
    props: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    ready: [{
      type: Output
    }]
  });
})();
var YMapLayerDirective = class _YMapLayerDirective {
  constructor(ngZone, yMapComponent) {
    this.ngZone = ngZone;
    this.yMapComponent = yMapComponent;
    this.destroy$ = new Subject();
    this.ready = new EventEmitter();
  }
  ngOnInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map2) => {
      this.layer = new ymaps3.YMapLayer(this.props);
      map2.addChild(this.layer);
      this.ready.emit({
        ymaps3,
        entity: this.layer
      });
    });
  }
  ngOnChanges(changes) {
    this.ngZone.runOutsideAngular(() => {
      if (this.layer) {
        this.layer.update(changes["props"].currentValue);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.ɵfac = function YMapLayerDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _YMapLayerDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(YMapComponent));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _YMapLayerDirective,
      selectors: [["y-map-layer"]],
      inputs: {
        props: "props"
      },
      outputs: {
        ready: "ready"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YMapLayerDirective, [{
    type: Directive,
    args: [{
      selector: "y-map-layer",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: YMapComponent
  }], {
    props: [{
      type: Input,
      args: [{
        required: true
      }]
    }],
    ready: [{
      type: Output
    }]
  });
})();
export {
  YApiLoaderService,
  YMapClustererDirective,
  YMapComponent,
  YMapControlButtonDirective,
  YMapControlCommonButtonDirective,
  YMapControlDirective,
  YMapControlsDirective,
  YMapDefaultFeaturesLayerDirective,
  YMapDefaultMarkerDirective,
  YMapDefaultSchemeLayerDirective,
  YMapFeatureDataSourceDirective,
  YMapFeatureDirective,
  YMapGeolocationControlDirective,
  YMapHintDirective,
  YMapLayerDirective,
  YMapListenerDirective,
  YMapMarkerDirective,
  YMapOpenMapsButtonDirective,
  YMapScaleControlDirective,
  YMapZoomControlDirective,
  Y_CONFIG,
  provideYConfig
};
//# sourceMappingURL=angular-yandex-maps-v3.js.map
