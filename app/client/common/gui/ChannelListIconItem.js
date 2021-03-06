/**
 * ChannelListIconItem is an item Template used for selecting each item in the list
 * with a highlighter container.
 *
 * @class $N.guiChannelListIconItem
 * @constructor
 * @extends $N.gui.TextItem
 * @requires $N.gui.Group
 * @requires $N.gui.Label
 * @requires $N.gui.TextItem
 * @requires $N.gui.Util
 * @param {Object} docRef (DOM document)
 */
(function ($N) {
	function ChannelListIconItem(docRef) {
		ChannelListIconItem.superConstructor.call(this, docRef);
		this.isFocused = true;
		this.isHighlighted = false;
		this._container = new $N.gui.Group(this._docRef);
		this._container.setWidth(682);
		this._container.setHeight(54);
		this._background = new $N.gui.Container(docRef, this._container);
		this._background.configure({
			width: 660,
			height: 49,
			cssClass: "menuItemBackgroundFocus",
			visible: false
		});
		this._highlight = new $N.gui.Container(docRef, this._container);
		this._highlight.configure({
			x: 0,
			width: 660,
			height: 49,
			cssClass: "channelListItemHighlight",
			visible: false
		});
		this._channelDetails = new $N.gui.Container(docRef, this._container);
		this._channelDetails.configure({
			x: 65,
			y: 0,
			width: 1300
		});
		this._channelNumber = new $N.gui.InlineLabel(this._docRef, this._channelDetails);
		this._channelNumber.configure({
			cssClass: "dialogSubtitle"
		});
		this._text = new $N.gui.Label(this._docRef, this._container);
		this._text.configure({
			x: 155,
			y: 0,
			width: 1300,
			cssClass: "dialogSubtitle"
		});
		this._icon = new $N.gui.Image(docRef, this._container);
		this._icon.configure({
			x: 20,
			y: 9,
			width: 27,
			height: 27,
			visible: true
		});
		this._cursor = new $N.gui.InlineLabel(docRef, this._channelDetails);
		this._cursor.configure({
			cssClass: "textUbuntuMedium directChannelEntryFeedback"
		});

		this.setDataMapper({
			getText: function (obj) {
				return obj.name;
			}
		});
		this._originalChannelNumber = null;
		this._rootSVGRef = this._container.getRootSVGRef();
		this.addMoveAnimation();
		this.addFadeAnimation();
	}
	$N.gui.Util.extend(ChannelListIconItem, $N.gui.TextItem);

	/**
	 * @method updateHighlight
	 */
	ChannelListIconItem.prototype.updateHighlight = function () {
		if (this.isHighlighted && this.isFocused) {
			this._highlight.setCssClass("channelListItemHighlight");
			this._background.setCssClass("menuItemBackgroundFocus");
			this._background.show();
			this._highlight.show();
		} else {
			this._highlight.setCssClass("recordingsWindowBackground");
			this._background.setCssClass("menuItemBackgroundDefocus");
			this._background.hide();
			this._highlight.hide();
		}
	};

	/**
	 * @method highlight
	 */
	ChannelListIconItem.prototype.highlight = function () {
		this.isHighlighted = true;
		this.updateHighlight();
	};

	/**
	 * @method unHighlight
	 */
	ChannelListIconItem.prototype.unHighlight = function () {
		this.isHighlighted = false;
		this.updateHighlight();
	};

	/**
	 * @method focus
	 */
	ChannelListIconItem.prototype.focus = function () {
		this.isFocused = true;
		this.updateHighlight();
	};

	/**
	 * @method defocus
	 */
	ChannelListIconItem.prototype.defocus = function () {
		this.isFocused = false;
		this.updateHighlight();
	};
	/**
	 * @method update
	 */
	ChannelListIconItem.prototype.update = function (data) {
		var iconHref;
		if (data) {
			iconHref = this._dataMapper.getIcon(data);
			this._text.setText(this._dataMapper.getTitle(data));
			this._icon.setHref(iconHref);
			this._channelNumber.setText(this._dataMapper.getChannelNumber(data));
			this._originalChannelNumber = this._dataMapper.getChannelNumber(data);
		}
		ChannelListIconItem.superClass.update.call(this);
	};
	/**
	 * @method updateIcon
	 */
	ChannelListIconItem.prototype.updateIcon = function (data) {
		var iconHref;
		if (data) {
			iconHref = this._dataMapper.getIcon(data);
			this._icon.setHref(iconHref);
		}
	};
	/**
	 * @method update
	 */
	ChannelListIconItem.prototype.setIconUrl = function (iconHref) {
		if (iconHref) {
			this._icon.setHref(iconHref);
		}
	};
	/**
	 * @method showIcon
	 */
	ChannelListIconItem.prototype.showIcon = function () {
		this._icon.show();
	};
	/**
	 * @method hideIcon
	 */
	ChannelListIconItem.prototype.hideIcon = function () {
		this._icon.hide();
	};

	/**
	 * @method getOriginalChannelNumber
	 */
	ChannelListIconItem.prototype.getOriginalChannelNumber = function () {
		return this._originalChannelNumber;
	};

	/**
	 * @method updateForChannelEntry
	 */
	ChannelListIconItem.prototype.updateForChannelEntry = function () {
		this._channelNumber.setCssClass("textUbuntuMedium directChannelEntryFeedback");
	};

	/**
	 * @method updateForChannelEntryOver
	 */
	ChannelListIconItem.prototype.updateForChannelEntryOver = function () {
		this._channelNumber.setCssClass("dialogSubtitle");
	};

	/**
	 * @method setServiceNumber
	 */
	ChannelListIconItem.prototype.setServiceNumber = function (channelNumber) {
		this._channelNumber.setText(channelNumber);
	};

	$N.gui = $N.gui || {};
	$N.gui.ChannelListIconItem = ChannelListIconItem;

}($N || {}));
