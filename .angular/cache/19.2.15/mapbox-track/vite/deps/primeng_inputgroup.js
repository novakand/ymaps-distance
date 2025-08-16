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
  Injectable,
  Input,
  NgModule,
  inject,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵclassMap,
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

// node_modules/primeng/fesm2022/primeng-inputgroup.mjs
var _c0 = ["*"];
var theme = ({
  dt
}) => `
.p-inputgroup,
.p-inputgroup .p-floatlabel,
.p-inputgroup .p-iftalabel {
    display: flex;
    align-items: stretch;
    width: 100%;
}

.p-inputgroup .p-inputtext,
.p-inputgroup .p-inputwrapper {
    flex: 1 1 auto;
    width: 1%;
}

.p-inputgroupaddon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${dt("inputgroup.addon.padding")};
    background: ${dt("inputgroup.addon.background")};
    color: ${dt("inputgroup.addon.color")};
    border-block-start: 1px solid ${dt("inputgroup.addon.border.color")};
    border-block-end: 1px solid ${dt("inputgroup.addon.border.color")};
    min-width: ${dt("inputgroup.addon.min.width")};
}

.p-inputgroupaddon:first-child,
.p-inputgroupaddon + .p-inputgroupaddon {
    border-inline-start: 1px solid ${dt("inputgroup.addon.border.color")};
}

.p-inputgroupaddon:last-child {
    border-inline-end: 1px solid ${dt("inputgroup.addon.border.color")};
}

.p-inputgroupaddon:has(.p-button) {
    padding: 0;
    overflow: hidden;
}

.p-inputgroupaddon .p-button {
    border-radius: 0;
}

.p-inputgroup > .p-component,
.p-inputgroup > .p-inputwrapper > .p-component,
.p-inputgroup:first-child > p-button > .p-button,
.p-inputgroup > .p-floatlabel > .p-component,
.p-inputgroup > .p-floatlabel > .p-inputwrapper > .p-component,
.p-inputgroup > .p-iftalabel > .p-component,
.p-inputgroup > .p-iftalabel > .p-inputwrapper > .p-component {
    border-radius: 0;
    margin: 0;
}

.p-inputgroupaddon:first-child,
.p-inputgroup > .p-component:first-child,
.p-inputgroup > .p-inputwrapper:first-child > .p-component,
.p-inputgroup > .p-floatlabel:first-child > .p-component,
.p-inputgroup > .p-floatlabel:first-child > .p-inputwrapper > .p-component,
.p-inputgroup > .p-iftalabel:first-child > .p-component,
.p-inputgroup > .p-iftalabel:first-child > .p-inputwrapper > .p-component {
    border-start-start-radius: ${dt("inputgroup.addon.border.radius")};
    border-end-start-radius: ${dt("inputgroup.addon.border.radius")};
}

.p-inputgroupaddon:last-child,
.p-inputgroup > .p-component:last-child,
.p-inputgroup > .p-inputwrapper:last-child > .p-component,
.p-inputgroup > .p-floatlabel:last-child > .p-component,
.p-inputgroup > .p-floatlabel:last-child > .p-inputwrapper > .p-component,
.p-inputgroup > .p-iftalabel:last-child > .p-component,
.p-inputgroup > .p-iftalabel:last-child > .p-inputwrapper > .p-component {
    border-start-end-radius: ${dt("inputgroup.addon.border.radius")};
    border-end-end-radius: ${dt("inputgroup.addon.border.radius")};
}

.p-inputgroup .p-component:focus,
.p-inputgroup .p-component.p-focus,
.p-inputgroup .p-inputwrapper-focus,
.p-inputgroup .p-component:focus ~ label,
.p-inputgroup .p-component.p-focus ~ label,
.p-inputgroup .p-inputwrapper-focus ~ label {
    z-index: 1;
}

.p-inputgroup > .p-button:not(.p-button-icon-only) {
    width: auto;
}

/*For PrimeNG*/

.p-inputgroup p-button:first-child, .p-inputgroup p-button:last-child {
    display: inline-flex;
}

.p-inputgroup:has(> p-button:first-child) .p-button{
    border-start-start-radius: ${dt("inputgroup.addon.border.radius")};
    border-end-start-radius: ${dt("inputgroup.addon.border.radius")};
}

.p-inputgroup:has(> p-button:last-child) .p-button {
    border-start-end-radius: ${dt("inputgroup.addon.border.radius")};
    border-end-end-radius: ${dt("inputgroup.addon.border.radius")};
}
`;
var classes = {
  root: ({
    props
  }) => ["p-inputgroup", {
    "p-inputgroup-fluid": props.fluid
  }]
};
var InputGroupStyle = class _InputGroupStyle extends BaseStyle {
  name = "inputgroup";
  theme = theme;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵInputGroupStyle_BaseFactory;
    return function InputGroupStyle_Factory(__ngFactoryType__) {
      return (ɵInputGroupStyle_BaseFactory || (ɵInputGroupStyle_BaseFactory = ɵɵgetInheritedFactory(_InputGroupStyle)))(__ngFactoryType__ || _InputGroupStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _InputGroupStyle,
    factory: _InputGroupStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputGroupStyle, [{
    type: Injectable
  }], null, null);
})();
var InputGroupClasses;
(function(InputGroupClasses2) {
  InputGroupClasses2["root"] = "p-inputgroup";
})(InputGroupClasses || (InputGroupClasses = {}));
var InputGroup = class _InputGroup extends BaseComponent {
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
  _componentStyle = inject(InputGroupStyle);
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵInputGroup_BaseFactory;
    return function InputGroup_Factory(__ngFactoryType__) {
      return (ɵInputGroup_BaseFactory || (ɵInputGroup_BaseFactory = ɵɵgetInheritedFactory(_InputGroup)))(__ngFactoryType__ || _InputGroup);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _InputGroup,
    selectors: [["p-inputgroup"], ["p-inputGroup"], ["p-input-group"]],
    hostAttrs: [1, "p-inputgroup"],
    hostVars: 5,
    hostBindings: function InputGroup_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("data-pc-name", "inputgroup");
        ɵɵstyleMap(ctx.style);
        ɵɵclassMap(ctx.styleClass);
      }
    },
    inputs: {
      style: "style",
      styleClass: "styleClass"
    },
    features: [ɵɵProvidersFeature([InputGroupStyle]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function InputGroup_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    dependencies: [CommonModule, SharedModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputGroup, [{
    type: Component,
    args: [{
      selector: "p-inputgroup, p-inputGroup, p-input-group",
      standalone: true,
      imports: [CommonModule, SharedModule],
      template: ` <ng-content></ng-content> `,
      providers: [InputGroupStyle],
      host: {
        class: "p-inputgroup",
        "[attr.data-pc-name]": '"inputgroup"',
        "[class]": "styleClass",
        "[style]": "style"
      }
    }]
  }], null, {
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }]
  });
})();
var InputGroupModule = class _InputGroupModule {
  static ɵfac = function InputGroupModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputGroupModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _InputGroupModule,
    imports: [InputGroup, SharedModule],
    exports: [InputGroup, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [InputGroup, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputGroupModule, [{
    type: NgModule,
    args: [{
      imports: [InputGroup, SharedModule],
      exports: [InputGroup, SharedModule]
    }]
  }], null, null);
})();
export {
  InputGroup,
  InputGroupClasses,
  InputGroupModule,
  InputGroupStyle
};
//# sourceMappingURL=primeng_inputgroup.js.map
