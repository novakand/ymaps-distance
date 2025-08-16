import {
  BaseComponent
} from "./chunk-Y6A2EGEY.js";
import {
  BaseStyle
} from "./chunk-QKY7V5ON.js";
import {
  SharedModule
} from "./chunk-FYM5GVYR.js";
import "./chunk-UM5VRUGR.js";
import "./chunk-SPI32U7T.js";
import {
  CommonModule
} from "./chunk-NE6GCDYT.js";
import "./chunk-VXD2P2UT.js";
import {
  Component,
  HostBinding,
  Injectable,
  Input,
  NgModule,
  inject,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵgetInheritedFactory,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵstyleMap
} from "./chunk-QLCWAD4B.js";
import "./chunk-VMI3K6GE.js";
import "./chunk-5KXDAEEK.js";
import "./chunk-WD6C567C.js";
import "./chunk-HM5YLMWO.js";
import "./chunk-TXDUYLVM.js";

// node_modules/primeng/fesm2022/primeng-inputgroupaddon.mjs
var _c0 = ["*"];
var classes = {
  root: "p-inputgroupaddon"
};
var InputGroupAddonStyle = class _InputGroupAddonStyle extends BaseStyle {
  name = "inputgroupaddon";
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵInputGroupAddonStyle_BaseFactory;
    return function InputGroupAddonStyle_Factory(__ngFactoryType__) {
      return (ɵInputGroupAddonStyle_BaseFactory || (ɵInputGroupAddonStyle_BaseFactory = ɵɵgetInheritedFactory(_InputGroupAddonStyle)))(__ngFactoryType__ || _InputGroupAddonStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _InputGroupAddonStyle,
    factory: _InputGroupAddonStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputGroupAddonStyle, [{
    type: Injectable
  }], null, null);
})();
var InputGroupAddon = class _InputGroupAddon extends BaseComponent {
  /**
   * Inline style of the element.
   * @group Props
   */
  style;
  /**
   * Class of the element.
   * @group Props
   */
  styleClass;
  _componentStyle = inject(InputGroupAddonStyle);
  get hostStyle() {
    return this.style;
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵInputGroupAddon_BaseFactory;
    return function InputGroupAddon_Factory(__ngFactoryType__) {
      return (ɵInputGroupAddon_BaseFactory || (ɵInputGroupAddon_BaseFactory = ɵɵgetInheritedFactory(_InputGroupAddon)))(__ngFactoryType__ || _InputGroupAddon);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _InputGroupAddon,
    selectors: [["p-inputgroup-addon"], ["p-inputGroupAddon"]],
    hostVars: 7,
    hostBindings: function InputGroupAddon_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("data-pc-name", "inputgroupaddon");
        ɵɵstyleMap(ctx.hostStyle);
        ɵɵclassMap(ctx.styleClass);
        ɵɵclassProp("p-inputgroupaddon", true);
      }
    },
    inputs: {
      style: "style",
      styleClass: "styleClass"
    },
    features: [ɵɵProvidersFeature([InputGroupAddonStyle]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function InputGroupAddon_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    dependencies: [CommonModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputGroupAddon, [{
    type: Component,
    args: [{
      selector: "p-inputgroup-addon, p-inputGroupAddon",
      template: ` <ng-content></ng-content> `,
      standalone: true,
      imports: [CommonModule],
      host: {
        "[class]": "styleClass",
        "[class.p-inputgroupaddon]": "true",
        "[attr.data-pc-name]": '"inputgroupaddon"'
      },
      providers: [InputGroupAddonStyle]
    }]
  }], null, {
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    hostStyle: [{
      type: HostBinding,
      args: ["style"]
    }]
  });
})();
var InputGroupAddonModule = class _InputGroupAddonModule {
  static ɵfac = function InputGroupAddonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputGroupAddonModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _InputGroupAddonModule,
    imports: [InputGroupAddon, SharedModule],
    exports: [InputGroupAddon, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [InputGroupAddon, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputGroupAddonModule, [{
    type: NgModule,
    args: [{
      imports: [InputGroupAddon, SharedModule],
      exports: [InputGroupAddon, SharedModule]
    }]
  }], null, null);
})();
export {
  InputGroupAddon,
  InputGroupAddonModule,
  InputGroupAddonStyle
};
//# sourceMappingURL=primeng_inputgroupaddon.js.map
