    /**
     * The base module provides the Base class, which objects requiring attribute and custom event support can extend.
     * The module also provides two ways to reuse code - It augments Base with the Plugin.Host interface which provides
     * plugin support and also provides the BaseCore.build method which provides a way to build custom classes using extensions.
     *
     * @module base
     */

    /**
     * The base-base submodule provides the Base class without the Plugin support, provided by Plugin.Host,
     * and without the extension support provided by BaseCore.build.
     *
     * @module base
     * @submodule base-base
     */

    /**
     * <p>
     * A base class which objects requiring attributes and custom event support can
     * extend. Base also handles the chaining of initializer and destructor methods across
     * the hierarchy as part of object construction and destruction. Additionally, attributes configured
     * through the static <a href="#property_ATTRS">ATTRS</a> property for each class
     * in the hierarchy will be initialized by Base.
     * </p>
     *
     * <p>
     * The static <a href="#property_NAME">NAME</a> property of each class extending
     * from Base will be used as the identifier for the class, and is used by Base to prefix
     * all events fired by instances of that class.
     * </p>
     *
     * @class Base
     * @constructor
     * @uses BaseCore
     * @uses BaseEvents
     * @uses Attribute
     * @uses AttributeCore
     * @uses AttributeEvents
     * @uses AttributeExtras
     * @uses EventTarget
     *
     * @param {Object} config Object with configuration property name/value pairs. The object can be
     * used to provide default values for the objects published attributes.
     *
     * <p>
     * The config object can also contain the following non-attribute properties, providing a convenient
     * way to configure events listeners and plugins for the instance, as part of the constructor call:
     * </p>
     *
     * <dl>
     *     <dt>on</dt>
     *     <dd>An event name to listener function map, to register event listeners for the "on" moment of the event. A constructor convenience property for the <a href="Base.html#method_on">on</a> method.</dd>
     *     <dt>after</dt>
     *     <dd>An event name to listener function map, to register event listeners for the "after" moment of the event. A constructor convenience property for the <a href="Base.html#method_after">after</a> method.</dd>
     *     <dt>bubbleTargets</dt>
     *     <dd>An object, or array of objects, to register as bubble targets for bubbled events fired by this instance. A constructor convenience property for the <a href="EventTarget.html#method_addTarget">addTarget</a> method.</dd>
     *     <dt>plugins</dt>
     *     <dd>A plugin, or array of plugins to be plugged into the instance (see PluginHost's plug method for signature details). A constructor convenience property for the <a href="Plugin.Host.html#method_plug">plug</a> method.</dd>
     * </dl>
     */
    function Base() {
        Y.BaseCore.apply(this, arguments);
        Y.BaseEvents.apply(this, arguments);
    }

    /**
     * The list of properties which can be configured for
     * each attribute (e.g. setter, getter, writeOnce, readOnly etc.)
     *
     * @property _ATTR_CFG
     * @type Array
     * @static
     * @private
     */
    Base._ATTR_CFG      = Y.BaseCore._ATTR_CFG.concat(Y.BaseEvents._ATTR_CFG);
    Base._ATTR_CFG_HASH = Y.Array.hash(Base._ATTR_CFG);

    /**
     * The array of non-attribute configuration properties supported by this class.
     *
     * `Base` supports "on", "after", "plugins" and "bubbleTargets" properties,
     * which are not set up as attributes.
     *
     * This property is primarily required so that when
     * <a href="#property__allowAdHocAttrs">`_allowAdHocAttrs`</a> is enabled by
     * a class, non-attribute configurations don't get added as ad-hoc attributes.
     *
     * @property _NON_ATTRS_CFG
     * @type Array
     * @static
     * @private
     */
    Base._NON_ATTRS_CFG = Y.BaseCore._NON_ATTRS_CFG.concat(Y.BaseEvents._NON_ATTR_CFG);

    /**
     * <p>
     * The string to be used to identify instances of
     * this class, for example in prefixing events.
     * </p>
     * <p>
     * Classes extending Base, should define their own
     * static NAME property, which should be camelCase by
     * convention (e.g. MyClass.NAME = "myClass";).
     * </p>
     * @property NAME
     * @type String
     * @static
     */
    Base.NAME = "base";

    /**
     * The default set of attributes which will be available for instances of this class, and
     * their configuration. In addition to the configuration properties listed by
     * Attribute's <a href="Attribute.html#method_addAttr">addAttr</a> method, the attribute
     * can also be configured with a "cloneDefaultValue" property, which defines how the statically
     * defined value field should be protected ("shallow", "deep" and false are supported values).
     *
     * By default if the value is an object literal or an array it will be "shallow" cloned, to
     * protect the default value.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    Base.ATTRS = Y.AttributeCore.prototype._protectAttrs(Y.BaseCore.ATTRS);

    Base.prototype = {

        /**
         * Utility method to define the attribute hash used to filter/whitelist property mixes for
         * this class.
         *
         * @method _attrCfgHash
         * @private
         */
        _attrCfgHash: function() {
            return Base._ATTR_CFG_HASH;
        }

    };

    Y.mix(Base, Y.BaseCore, false, null, 1);

    // Needs to be `true`, to overwrite methods from `BaseCore`.
    Y.mix(Base, Y.BaseEvents, true, null, 1);

    // Fix constructor
    Base.prototype.constructor = Base;

    Y.Base = Base;
