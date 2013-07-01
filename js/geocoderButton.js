define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_OnDijitClickMixin",
    "dijit/_TemplatedMixin",
    "dojo/on",
    // load template
    "dojo/text!./templates/geocoderButton.html",
    "dojo/i18n!./nls/geocoderButton",
    "dojo/dom",
    "dojo/dom-class",
    "dojo/dom-style",
    "esri/dijit/Geocoder"
],
function (
    declare,
    _WidgetBase, _OnDijitClickMixin, _TemplatedMixin,
    on,
    dijitTemplate, i18n,
    dom, domClass, domStyle,
    Geocoder
) {
    return declare([_WidgetBase, _OnDijitClickMixin, _TemplatedMixin], {
        declaredClass: "modules.geocoderButton",
        templateString: dijitTemplate,
        options: {
            theme: "geocoderButton",
            map: null,
            open: false,
            visible: true,
            geocoderOptions: {
                autoComplete: true
            }
        },
        // lifecycle: 1
        constructor: function(options, srcRefNode) {
            // mix in settings and defaults
            declare.safeMixin(this.options, options);
            // widget node
            this.domNode = srcRefNode;
            this._i18n = i18n;
            // properties
            this.set("map", this.options.map);
            this.set("theme", this.options.theme);
            this.set("open", this.options.open);
            this.set("visible", this.options.visible);
            // listeners
            this.watch("theme", this._updateThemeWatch);
            this.watch("open", this._open);
            this.watch("visible", this._visible);
            // classes
            this._css = {
                container: "container",
                open: "open",
                geocoderTheme: "geocoderToggle",
                item: "navItem",
                search: "zoomSearchButton",
                controlDisabled: "controlDisabled",
                otherButtons: "custom",
                searchContainer: "searchContainer"
            };
        },
        // start widget. called by user
        startup: function() {
            var _self = this;
            // map not defined
            if (!_self.map) {
                _self.destroy();
                return new Error('map required');
            }
            // map domNode
            _self._mapNode = dom.byId(_self.map.id);
            // when map is loaded
            if (_self.map.loaded) {
                _self._init();
            } else {
                on(_self.map, "load", function() {
                    _self._init();
                });
            }
        },
        // connections/subscriptions will be cleaned up during the destroy() lifecycle phase
        destroy: function() {
            this.inherited(arguments);
        },
        /* ---------------- */
        /* Public Events */
        /* ---------------- */
        onLoad: function() {
            this.set("loaded", true);
        },
        /* ---------------- */
        /* Public Functions */
        /* ---------------- */
        toggle: function(){
            var display = domStyle.get(this._searchContainerNode, 'display');
            if(display === 'block'){
                this.set("open", false);
            }
            else{
                this.set("open", true);
            }
        },
        show: function(){
            this.set("visible", true);  
        },
        hide: function(){
            this.set("visible", false);
        },
        open: function(){
            this.set("open", true);  
        },
        close: function(){
            this.set("open", false);
        },
        /* ---------------- */
        /* Private Functions */
        /* ---------------- */
        _visible: function(){
            var _self = this;
            if(_self.get("visible")){
                domStyle.set(_self.domNode, 'display', 'block');
            }
            else{
                domStyle.set(_self.domNode, 'display', 'none');
            }
        },
        _open: function(){
            if(this.get("open")){
                domStyle.set(this._searchContainerNode, 'display', 'block');
                domClass.add(this._containerNode, this._css.open);
                if(this.geocoder){
                    this.geocoder.focus();   
                }
            }
            else{
                domStyle.set(this._searchContainerNode, 'display', 'none');
                domClass.remove(this._containerNode, this._css.open);
                if(this.geocoder){
                    this.geocoder.blur();
                }
            }
        },
        _init: function() {
            var _self = this;
            _self._visible();
            _self._open();
            var options = declare.safeMixin(_self.options.geocoderOptions, {
                theme: _self._css.geocoderTheme,
                map: _self.map
            });
            _self.geocoder = new Geocoder(options, _self._geocoderNode);
            
            on(_self.geocoder, 'select', function(e){
                if(e.result){
                    _self.set("open", false);   
                }
            });
            
            on(_self.map, 'pan-start', function(){
                _self.set("open", false);
            });
            
            _self.geocoder.startup();
            _self.onLoad();
        },
        _updateThemeWatch: function(attr, oldVal, newVal) {
            var _self = this;
            if (_self.get("loaded")) {
                domClass.remove(_self.domNode, oldVal);
                domClass.add(_self.domNode, newVal);
            }
        }
    });
});