// Type definitions for material-ui v0.13.4
// Project: https://github.com/callemall/material-ui
// Definitions by: Nathan Brown <https://github.com/ngbrown>, Oliver Herrmann <https://github.com/herrmanno>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

///<reference path='../react/react.d.ts' />

declare module "material-ui" {
    export import AppBar = __MaterialUI.AppBar; // require('material-ui/lib/app-bar');
    export import AppCanvas = __MaterialUI.AppCanvas; // require('material-ui/lib/app-canvas');
    export import Avatar = __MaterialUI.Avatar; // require('material-ui/lib/avatar');
    export import Badge = __MaterialUI.Badge; // require('material-ui/lib/badge');
    export import BeforeAfterWrapper = __MaterialUI.BeforeAfterWrapper; // require('material-ui/lib/before-after-wrapper');
    export import Card = __MaterialUI.Card.Card; // require('material-ui/lib/card/card');
    export import CardActions = __MaterialUI.Card.CardActions; // require('material-ui/lib/card/card-actions');
    export import CardExpandable = __MaterialUI.Card.CardExpandable; // require('material-ui/lib/card/card-expandable');
    export import CardHeader = __MaterialUI.Card.CardHeader; // require('material-ui/lib/card/card-header');
    export import CardMedia = __MaterialUI.Card.CardMedia; // require('material-ui/lib/card/card-media');
    export import CardText = __MaterialUI.Card.CardText; // require('material-ui/lib/card/card-text');
    export import CardTitle = __MaterialUI.Card.CardTitle; // require('material-ui/lib/card/card-title');
    export import Checkbox = __MaterialUI.Checkbox; // require('material-ui/lib/checkbox');
    export import CircularProgress = __MaterialUI.CircularProgress; // require('material-ui/lib/circular-progress');
    export import ClearFix = __MaterialUI.ClearFix; // require('material-ui/lib/clearfix');
    export import DatePicker = __MaterialUI.DatePicker.DatePicker; // require('material-ui/lib/date-picker/date-picker');
    export import DatePickerDialog = __MaterialUI.DatePicker.DatePickerDialog; // require('material-ui/lib/date-picker/date-picker-dialog');
    export import Dialog = __MaterialUI.Dialog // require('material-ui/lib/dialog');
    export import DropDownIcon = __MaterialUI.DropDownIcon; // require('material-ui/lib/drop-down-icon');
    export import DropDownMenu = __MaterialUI.DropDownMenu; // require('material-ui/lib/drop-down-menu');
    export import EnhancedButton = __MaterialUI.EnhancedButton; // require('material-ui/lib/enhanced-button');
    export import FlatButton = __MaterialUI.FlatButton; // require('material-ui/lib/flat-button');
    export import FloatingActionButton = __MaterialUI.FloatingActionButton; // require('material-ui/lib/floating-action-button');
    export import FontIcon = __MaterialUI.FontIcon; // require('material-ui/lib/font-icon');
    export import IconButton = __MaterialUI.IconButton; // require('material-ui/lib/icon-button');
    export import IconMenu = __MaterialUI.Menus.IconMenu; // require('material-ui/lib/menus/icon-menu');
    export import LeftNav = __MaterialUI.LeftNav; // require('material-ui/lib/left-nav');
    export import LinearProgress = __MaterialUI.LinearProgress; // require('material-ui/lib/linear-progress');
    export import List = __MaterialUI.Lists.List; // require('material-ui/lib/lists/list');
    export import ListDivider = __MaterialUI.Lists.ListDivider; // require('material-ui/lib/lists/list-divider');
    export import ListItem = __MaterialUI.Lists.ListItem; // require('material-ui/lib/lists/list-item');
    export import Menu = __MaterialUI.Menu.Menu; // require('material-ui/lib/menu/menu');
    export import MenuItem = __MaterialUI.Menu.MenuItem; // require('material-ui/lib/menu/menu-item');
    export import Mixins = __MaterialUI.Mixins; // require('material-ui/lib/mixins/');
    export import Overlay = __MaterialUI.Overlay; // require('material-ui/lib/overlay');
    export import Paper = __MaterialUI.Paper; // require('material-ui/lib/paper');
    export import RadioButton = __MaterialUI.RadioButton; // require('material-ui/lib/radio-button');
    export import RadioButtonGroup = __MaterialUI.RadioButtonGroup; // require('material-ui/lib/radio-button-group');
    export import RaisedButton = __MaterialUI.RaisedButton; // require('material-ui/lib/raised-button');
    export import RefreshIndicator = __MaterialUI.RefreshIndicator; // require('material-ui/lib/refresh-indicator');
    export import Ripples = __MaterialUI.Ripples; // require('material-ui/lib/ripples/');
    export import SelectField = __MaterialUI.SelectField; // require('material-ui/lib/select-field');
    export import Slider = __MaterialUI.Slider; // require('material-ui/lib/slider');
    export import SvgIcon = __MaterialUI.SvgIcon; // require('material-ui/lib/svg-icon');
    export import Icons = __MaterialUI.Icons;
    export import Styles = __MaterialUI.Styles; // require('material-ui/lib/styles/');
    export import Snackbar = __MaterialUI.Snackbar; // require('material-ui/lib/snackbar');
    export import Tab = __MaterialUI.Tabs.Tab; // require('material-ui/lib/tabs/tab');
    export import Tabs = __MaterialUI.Tabs.Tabs; // require('material-ui/lib/tabs/tabs');
    export import Table = __MaterialUI.Table.Table; // require('material-ui/lib/table/table');
    export import TableBody = __MaterialUI.Table.TableBody; // require('material-ui/lib/table/table-body');
    export import TableFooter = __MaterialUI.Table.TableFooter; // require('material-ui/lib/table/table-footer');
    export import TableHeader = __MaterialUI.Table.TableHeader; // require('material-ui/lib/table/table-header');
    export import TableHeaderColumn = __MaterialUI.Table.TableHeaderColumn; // require('material-ui/lib/table/table-header-column');
    export import TableRow = __MaterialUI.Table.TableRow; // require('material-ui/lib/table/table-row');
    export import TableRowColumn = __MaterialUI.Table.TableRowColumn; // require('material-ui/lib/table/table-row-column');
    export import ThemeWrapper = __MaterialUI.ThemeWrapper; // require('material-ui/lib/theme-wrapper');
    export import Toggle = __MaterialUI.Toggle; // require('material-ui/lib/toggle');
    export import TimePicker = __MaterialUI.TimePicker; // require('material-ui/lib/time-picker');
    export import TextField = __MaterialUI.TextField; // require('material-ui/lib/text-field');
    export import Toolbar = __MaterialUI.Toolbar.Toolbar; // require('material-ui/lib/toolbar/toolbar');
    export import ToolbarGroup = __MaterialUI.Toolbar.ToolbarGroup; // require('material-ui/lib/toolbar/toolbar-group');
    export import ToolbarSeparator = __MaterialUI.Toolbar.ToolbarSeparator; // require('material-ui/lib/toolbar/toolbar-separator');
    export import ToolbarTitle = __MaterialUI.Toolbar.ToolbarTitle; // require('material-ui/lib/toolbar/toolbar-title');
    export import Tooltip = __MaterialUI.Tooltip; // require('material-ui/lib/tooltip');
    export import Utils = __MaterialUI.Utils; // require('material-ui/lib/utils/');

    export import GridList = __MaterialUI.GridList.GridList; // require('material-ui/lib/gridlist/grid-list');
    export import GridTile = __MaterialUI.GridList.GridTile; // require('material-ui/lib/gridlist/grid-tile');

    // export type definitions
    export type TouchTapEvent = __MaterialUI.TouchTapEvent;
    export type TouchTapEventHandler = __MaterialUI.TouchTapEventHandler;
    export type DialogAction = __MaterialUI.DialogAction;
}

declare namespace __MaterialUI {
    import React = __React;

    // ReactLink is from "react/addons"
    interface ReactLink<T> {
        value: T;
        requestChange(newValue: T): void;
    }

    // What's common between React.TouchEvent and React.MouseEvent
    interface TouchTapEvent extends React.SyntheticEvent {
        altKey: boolean;
        ctrlKey: boolean;
        getModifierState(key: string): boolean;
        metaKey: boolean;
        shiftKey: boolean;
    }

    // What's common between React.TouchEventHandler and React.MouseEventHandler
    interface TouchTapEventHandler extends React.EventHandler<TouchTapEvent> { }

    // more specific than React.HTMLAttributes

    interface AppBarProps extends React.Props<AppBar> {
        iconClassNameLeft?: string;
        iconClassNameRight?: string;
        iconElementLeft?: React.ReactElement<any>;
        iconElementRight?: React.ReactElement<any>;
        iconStyleRight?: string;
        style?: React.CSSProperties;
        showMenuIconButton?: boolean;
        title?: React.ReactNode;
        zDepth?: number;

        onLeftIconButtonTouchTap?: TouchTapEventHandler;
        onRightIconButtonTouchTap?: TouchTapEventHandler;
    }
    export class AppBar extends React.Component<AppBarProps, {}>{
    }

    interface AppCanvasProps extends React.Props<AppCanvas> {
        style?: React.CSSProperties;
    }
    export class AppCanvas extends React.Component<AppCanvasProps, {}> {
    }

    interface AvatarProps extends React.Props<Avatar> {
        icon?: React.ReactElement<any>;
        backgroundColor?: string;
        color?: string;
        size?: number;
        src?: string;
        style?: React.CSSProperties;
    }
    export class Avatar extends React.Component<AvatarProps, {}> {
    }

    interface BadgeProps extends React.Props<Badge> {
        badgeContent: React.ReactElement<any> | string | number;
        primary?: boolean;
        secondary?: boolean;
        style?: React.CSSProperties;
        badgeStyle?: React.CSSProperties;
    }
    export class Badge extends React.Component<BadgeProps, {}> {
    }

    interface BeforeAfterWrapperProps extends React.Props<BeforeAfterWrapper> {
        beforeStyle?: React.CSSProperties;
        afterStyle?: React.CSSProperties;
        beforeElementType?: string;
        afterElementType?: string;
        elementType?: string;
    }
    export class BeforeAfterWrapper extends React.Component<BeforeAfterWrapperProps, {}> {
    }

    namespace Card {

        interface CardProps extends React.Props<Card> {
            expandable?: boolean;
            initiallyExpanded?: boolean;
            onExpandedChange?: (isExpanded: boolean) => void;
            style?: React.CSSProperties;
        }
        export class Card extends React.Component<CardProps, {}> {
        }

        interface CardActionsProps extends React.Props<CardActions> {
            expandable?: boolean;
            showExpandableButton?: boolean;
            style?: React.CSSProperties;
        }
        export class CardActions extends React.Component<CardActionsProps, {}> {
        }

        interface CardExpandableProps extends React.Props<CardExpandable> {
            onExpanding?: (isExpanded: boolean) => void;
            expanded?: boolean;
            style?: React.CSSProperties;
        }
        export class CardExpandable extends React.Component<CardExpandableProps, {}> {
        }

        interface CardHeaderProps extends React.Props<CardHeader> {
            expandable?: boolean;
            showExpandableButton?: boolean;
            title?: string | React.ReactElement<any>;
            titleColor?: string;
            titleStyle?: React.CSSProperties;
            subtitle?: string | React.ReactElement<any>;
            subtitleColor?: string;
            subtitleStyle?: React.CSSProperties;
            textStyle?: React.CSSProperties;
            style?: React.CSSProperties;
            avatar: React.ReactElement<any> | string;
        }
        export class CardHeader extends React.Component<CardHeaderProps, {}> {
        }

        interface CardMediaProps extends React.Props<CardMedia> {
            expandable?: boolean;
            overlay?: React.ReactNode;
            overlayStyle?: React.CSSProperties;
            overlayContainerStyle?: React.CSSProperties;
            overlayContentStyle?: React.CSSProperties;
            mediaStyle?: React.CSSProperties;
            style?: React.CSSProperties;
        }
        export class CardMedia extends React.Component<CardMediaProps, {}> {
        }

        interface CardTextProps extends React.Props<CardText> {
            expandable?: boolean;
            color?: string;
            style?: React.CSSProperties;
        }
        export class CardText extends React.Component<CardTextProps, {}> {
        }

        interface CardTitleProps extends React.Props<CardTitle> {
            expandable?: boolean;
            showExpandableButton?: boolean;
            title?: string | React.ReactElement<any>;
            titleColor?: string;
            titleStyle?: React.CSSProperties;
            subtitle?: string | React.ReactElement<any>;
            subtitleColor?: string;
            subtitleStyle?: React.CSSProperties;
            textStyle?: React.CSSProperties;
            style?: React.CSSProperties;
        }
        export class CardTitle extends React.Component<CardTitleProps, {}> {
        }
    }

    // what's not commonly overridden by Checkbox, RadioButton, or Toggle
    interface CommonEnhancedSwitchProps<T> extends React.HTMLAttributes, React.Props<T> {
        // <input/> is root element
        id?: string;
        iconStyle?: React.CSSProperties;
        labelStyle?: React.CSSProperties;
        rippleStyle?: React.CSSProperties;
        thumbStyle?: React.CSSProperties;
        trackStyle?: React.CSSProperties;
        name?: string;
        value?: string;
        label?: string;
        required?: boolean;
        disabled?: boolean;
        defaultSwitched?: boolean;
        disableFocusRipple?: boolean;
        disableTouchRipple?: boolean;
    }

    interface EnhancedSwitchProps extends CommonEnhancedSwitchProps<EnhancedSwitch> {
        // <input/> is root element
        inputType: string;
        switchElement: React.ReactElement<any>;
        onParentShouldUpdate: (isInputChecked: boolean) => void;
        switched: boolean;
        rippleColor?: string;
        onSwitch?: (e: React.MouseEvent, isInputChecked: boolean) => void;
        labelPosition?: string;
    }
    export class EnhancedSwitch extends React.Component<EnhancedSwitchProps, {}> {
        isSwitched(): boolean;
        setSwitched(newSwitchedValue: boolean): void;
        getValue(): any;
        isKeyboardFocused(): boolean;
    }

    interface CheckboxProps extends CommonEnhancedSwitchProps<Checkbox> {
        // <EnhancedSwitch/> is root element
        checkedIcon?: React.ReactElement<{ style?: React.CSSProperties }>; // Normally an SvgIcon
        defaultChecked?: boolean;
        iconStyle?: React.CSSProperties;
        label?: string;
        labelStyle?: React.CSSProperties;
        labelPosition?: string;
        style?: React.CSSProperties;
        checked?: boolean;
        unCheckedIcon?: React.ReactElement<{ style?: React.CSSProperties }>; // Normally an SvgIcon

        disabled?: boolean;
        valueLink?: ReactLink<boolean>;
        checkedLink?: ReactLink<boolean>;

        onCheck?: (event: React.MouseEvent, checked: boolean) => void;
    }
    export class Checkbox extends React.Component<CheckboxProps, {}> {
        isChecked(): void;
        setChecked(newCheckedValue: boolean): void;
    }

    interface CircularProgressProps extends React.Props<CircularProgress> {
        mode?: string;
        value?: number;
        min?: number;
        max?: number;
        size?: number;
        color?: string;
        innerStyle?: React.CSSProperties;
        style?: React.CSSProperties;

    }
    export class CircularProgress extends React.Component<CircularProgressProps, {}> {
    }

    interface ClearFixProps extends React.Props<ClearFix> {
    }
    export class ClearFix extends React.Component<ClearFixProps, {}> {
    }

    namespace DatePicker {
        interface DatePickerProps extends React.Props<DatePicker> {
            autoOk?: boolean;
            defaultDate?: Date;
            formatDate?: (date:Date) => string;
            hintText?: string;
            floatingLabelText?: string;
            hideToolbarYearChange?: boolean;
            maxDate?: Date;
            minDate?: Date;
            mode?: string;
            onDismiss?: () => void;

            // e is always null
            onChange?: (e: any, d: Date) => void;

            onFocus?: React.FocusEventHandler;
            onShow?: () => void;
            onTouchTap?: React.TouchEventHandler;
            shouldDisableDate?: (day: Date) => boolean;
            showYearSelector?: boolean;
            style?: React.CSSProperties;
            textFieldStyle?: React.CSSProperties;
        }
        export class DatePicker extends React.Component<DatePickerProps, {}> {
        }

        interface DatePickerDialogProps extends React.Props<DatePickerDialog> {
            disableYearSelection?: boolean;
            initialDate?: Date;
            maxDate?: Date;
            minDate?: Date;
            onAccept?: (d: Date) => void;
            onClickAway?: () => void;
            onDismiss?: () => void;
            onShow?: () => void;
            shouldDisableDate?: (day: Date) => boolean;
            showYearSelector?: boolean;
        }
        export class DatePickerDialog extends React.Component<DatePickerDialogProps, {}> {
        }
    }

    export interface DialogAction {
        id?: string;
        text: string;
        ref?: string;

        onTouchTap?: TouchTapEventHandler;
        onClick?: React.MouseEventHandler;
    }
    interface DialogProps extends React.Props<Dialog> {
        actions?: Array<DialogAction | React.ReactElement<any>>;
        actionFocus?: string;
        autoDetectWindowHeight?: boolean;
        autoScrollBodyContent?: boolean;
        style?: React.CSSProperties;
        bodyStyle?: React.CSSProperties;
        contentClassName?: string;
        contentInnerStyle?: React.CSSProperties;
        contentStyle?: React.CSSProperties;
        modal?: boolean;
        openImmediately?: boolean;
        repositionOnUpdate?: boolean;
        title?: React.ReactNode;
        defaultOpen?: boolean;
        open?: boolean;

        onClickAway?: () => void;
        onDismiss?: () => void;
        onShow?: () => void;
        onRequestClose?: (buttonClicked: boolean) => void;
    }
    export class Dialog extends React.Component<DialogProps, {}> {
        dismiss(): void;
        show(): void;
        isOpen(): boolean;
    }

    interface DropDownIconProps extends React.Props<DropDownIcon> {
        menuItems: Menu.MenuItemRequest[];
        closeOnMenuItemTouchTap?: boolean;
        iconStyle?: React.CSSProperties;
        iconClassName?: string;
        iconLigature?: string;

        onChange?: Menu.ItemTapEventHandler;
    }
    export class DropDownIcon extends React.Component<DropDownIconProps, {}> {
    }

    interface DropDownMenuProps extends React.Props<DropDownMenu> {
        displayMember?: string;
        valueMember?: string;
        autoWidth?: boolean;
        menuItems: Menu.MenuItemRequest[];
        menuItemStyle?: React.CSSProperties;
        selectedIndex?: number;
        underlineStyle?: React.CSSProperties;
        iconStyle?: React.CSSProperties;
        labelStyle?: React.CSSProperties;
        style?: React.CSSProperties;
        disabled?: boolean;
        valueLink?: ReactLink<any>;
        value?: number;

        onChange?: Menu.ItemTapEventHandler;
    }
    export class DropDownMenu extends React.Component<DropDownMenuProps, {}> {
    }

    // non generally overridden elements of EnhancedButton
    interface SharedEnhancedButtonProps<T> extends React.HTMLAttributes, React.Props<T> {
        centerRipple?: boolean;
        containerElement?: string | React.ReactElement<any>;
        disabled?: boolean;
        disableFocusRipple?: boolean;
        disableKeyboardFocus?: boolean;
        disableTouchRipple?: boolean;
        keyboardFocused?: boolean;
        linkButton?: boolean;
        focusRippleColor?: string;
        focusRippleOpacity?: number;
        touchRippleOpacity?: number;
        tabIndex?: number;

        onBlur?: React.FocusEventHandler;
        onFocus?: React.FocusEventHandler;
        onKeyboardFocus?: (e: React.FocusEvent, isKeyboardFocused: boolean) => void;
        onKeyDown?: React.KeyboardEventHandler;
        onKeyUp?: React.KeyboardEventHandler;
        onMouseEnter?: React.MouseEventHandler;
        onMouseLeave?: React.MouseEventHandler;
        onTouchStart?: React.TouchEventHandler;
        onTouchEnd?: React.TouchEventHandler;
        onTouchTap?: TouchTapEventHandler;
    }

    interface EnhancedButtonProps extends SharedEnhancedButtonProps<EnhancedButton> {
        touchRippleColor?: string;
        focusRippleColor?: string;
        style?: React.CSSProperties;
    }
    export class EnhancedButton extends React.Component<EnhancedButtonProps, {}> {
    }

    interface FlatButtonProps extends SharedEnhancedButtonProps<FlatButton> {
        hoverColor?: string;
        label?: string;
        labelPosition?: string;
        labelStyle?: React.CSSProperties;
        linkButton?: boolean;
        primary?: boolean;
        secondary?: boolean;
        rippleColor?: string;
        style?: React.CSSProperties;
    }
    export class FlatButton extends React.Component<FlatButtonProps, {}> {
    }

    interface FloatingActionButtonProps extends SharedEnhancedButtonProps<FloatingActionButton> {
        backgroundColor?: string;
        disabled?: boolean;
        disabledColor?: string;
        iconClassName?: string;
        iconStyle?: React.CSSProperties;
        mini?: boolean;
        secondary?: boolean;
        style?: React.CSSProperties;
    }
    export class FloatingActionButton extends React.Component<FloatingActionButtonProps, {}> {
    }

    interface FontIconProps extends React.Props<FontIcon> {
        color?: string;
        hoverColor?: string;
        onMouseLeave?: React.MouseEventHandler;
        onMouseEnter?: React.MouseEventHandler;
        style?: React.CSSProperties;
        className?: string;
    }
    export class FontIcon extends React.Component<FontIconProps, {}> {
    }

    interface IconButtonProps extends SharedEnhancedButtonProps<IconButton> {
        iconClassName?: string;
        iconStyle?: React.CSSProperties;
        style?: React.CSSProperties;
        tooltip?: string;
        tooltipPosition?: string;
        tooltipStyles?: React.CSSProperties;
        touch?: boolean;

        onBlur?: React.FocusEventHandler;
        onFocus?: React.FocusEventHandler;
    }
    export class IconButton extends React.Component<IconButtonProps, {}> {
    }

    interface LeftNavProps extends React.Props<LeftNav> {
        disableSwipeToOpen?: boolean;
        docked?: boolean;
        header?: React.ReactElement<any>;
        menuItems: Menu.MenuItemRequest[];
        onChange?: Menu.ItemTapEventHandler;
        onNavOpen?: () => void;
        onNavClose?: () => void;
        openRight?: Boolean;
        selectedIndex?: number;
        menuItemClassName?: string;
        menuItemClassNameSubheader?: string;
        menuItemClassNameLink?: string;
        style?: React.CSSProperties;
    }
    export class LeftNav extends React.Component<LeftNavProps, {}> {
    }

    interface LinearProgressProps extends React.Props<LinearProgress> {
        mode?: string;
        value?: number;
        min?: number;
        max?: number;
    }
    export class LinearProgress extends React.Component<LinearProgressProps, {}> {
    }

    namespace Lists {
        interface ListProps extends React.Props<List> {
            insetSubheader?: boolean;
            subheader?: string;
            subheaderStyle?: React.CSSProperties;
            zDepth?: number;
            style?: React.CSSProperties;
        }
        export class List extends React.Component<ListProps, {}> {
        }

        interface ListDividerProps extends React.Props<ListDivider> {
            inset?: boolean;
        }
        export class ListDivider extends React.Component<ListDividerProps, {}> {
        }

        interface ListItemProps extends React.Props<ListItem> {
            autoGenerateNestedIndicator?: boolean;
            disableKeyboardFocus?: boolean;
            initiallyOpen?: boolean;
            innerDivStyle?: React.CSSProperties;
            insetChildren?: boolean;
            innerStyle?: React.CSSProperties;
            leftAvatar?: React.ReactElement<any>;
            leftCheckbox?: React.ReactElement<any>;
            leftIcon?: React.ReactElement<any>;
            nestedLevel?: number;
            nestedItems?: React.ReactElement<any>[];
            onKeyboardFocus?: React.FocusEventHandler;
            onNestedListToggle?: (item: ListItem) => void;
            onClick?: React.MouseEventHandler;
            rightAvatar?: React.ReactElement<any>;
            rightIcon?: React.ReactElement<any>;
            rightIconButton?: React.ReactElement<any>;
            rightToggle?: React.ReactElement<any>;
            primaryText?: React.ReactNode;
            secondaryText?: React.ReactNode;
            secondaryTextLines?: number;
            style?: React.CSSProperties;
        }
        export class ListItem extends React.Component<ListItemProps, {}> {
        }
    }

    // Old menu implementation.  Being replaced by new "menus".
    namespace Menu {
        interface ItemTapEventHandler {
            (e: TouchTapEvent, index: number, menuItem: any): void;
        }

        // almost extends MenuItemProps, but certain required items are generated in Menu and not passed here.
        interface MenuItemRequest extends React.Props<MenuItem> {
            // use value from MenuItem.Types.*
            type?: string;

            text?: string;
            data?: string;
            payload?: string;
            icon?: React.ReactElement<any>;
            attribute?: string;
            number?: string;
            toggle?: boolean;
            onTouchTap?: TouchTapEventHandler;
            isDisabled?: boolean;
            style?: React.CSSProperties;

            // for MenuItems.Types.NESTED
            items?: MenuItemRequest[];

            // for custom text or payloads
            [propertyName: string]: any;
        }

        interface MenuProps extends React.Props<Menu> {
            index: number;
            text?: string;
            menuItems: MenuItemRequest[];
            zDepth?: number;
            active?: boolean;
            onItemTap?: ItemTapEventHandler;
            menuItemStyle?: React.CSSProperties;
            style?: React.CSSProperties;
        }
        export class Menu extends React.Component<MenuProps, {}> {
        }

        interface MenuItemProps extends React.Props<MenuItem> {
            key: number;
            value?: any;
            primaryText?: string;
            icon?: React.ReactElement<any>;
            iconClassName?: string;
            iconRightClassName?: string;
            iconStyle?: React.CSSProperties;
            iconRightStyle?: React.CSSProperties;
            attribute?: string;
            number?: string;
            data?: string;
            toggle?: boolean;
            onTouchTap?: (e: React.MouseEvent, key: number) => void;
            onToggle?: (e: React.MouseEvent, key: number, toggled: boolean) => void;
            selected?: boolean;
            active?: boolean;
            style?: React.CSSProperties;
        }
        export class MenuItem extends React.Component<MenuItemProps, {}> {
            static Types: { LINK: string, SUBHEADER: string, NESTED: string, }
        }
    }

    export namespace Mixins {
        interface ClickAwayable extends React.Mixin<any, any> {
        }
        var ClickAwayable: ClickAwayable;

        interface WindowListenable extends React.Mixin<any, any> {
        }
        var WindowListenable: WindowListenable;

        interface StylePropable extends React.Mixin<any, any> {
        }
        var StylePropable: StylePropable

        interface StyleResizable extends React.Mixin<any, any> {
        }
        var StyleResizable: StyleResizable
    }

    interface OverlayProps extends React.Props<Overlay> {
        autoLockScrolling?: boolean;
        show?: boolean;
        transitionEnabled?: boolean;
    }
    export class Overlay extends React.Component<OverlayProps, {}> {
    }

    interface PaperProps extends React.HTMLAttributes, React.Props<Paper> {
        circle?: boolean;
        rounded?: boolean;
        transitionEnabled?: boolean;
        zDepth?: number;
    }
    export class Paper extends React.Component<PaperProps, {}> {
    }

    interface RadioButtonProps extends CommonEnhancedSwitchProps<RadioButton> {
        // <EnhancedSwitch/> is root element
        defaultChecked?: boolean;
        iconStyle?: React.CSSProperties;
        label?: string;
        labelStyle?: React.CSSProperties;
        labelPosition?: string;
        style?: React.CSSProperties;
        value?: string;

        onCheck?: (e: React.FormEvent, selected: string) => void;
    }
    export class RadioButton extends React.Component<RadioButtonProps, {}> {
    }

    interface RadioButtonGroupProps extends React.Props<RadioButtonGroup> {
        defaultSelected?: string;
        labelPosition?: string;
        name: string;
        style?: React.CSSProperties;
        valueSelected?: string;

        onChange?: (e: React.FormEvent, selected: string) => void;
    }
    export class RadioButtonGroup extends React.Component<RadioButtonGroupProps, {}> {
        getSelectedValue(): string;
        setSelectedValue(newSelectionValue: string): void;
        clearValue(): void;
    }

    interface RaisedButtonProps extends SharedEnhancedButtonProps<RaisedButton> {
        className?: string;
        disabled?: boolean;
        label?: string;
        primary?: boolean;
        secondary?: boolean;
        labelStyle?: React.CSSProperties;
        backgroundColor?: string;
        labelColor?: string;
        disabledBackgroundColor?: string;
        disabledLabelColor?: string;
        fullWidth?: boolean;
    }
    export class RaisedButton extends React.Component<RaisedButtonProps, {}> {
    }

    interface RefreshIndicatorProps extends React.Props<RefreshIndicator> {
        left: number;
        percentage?: number;
        size?: number;
        status?: string;
        top: number;
        style?: React.CSSProperties;
    }
    export class RefreshIndicator extends React.Component<RefreshIndicatorProps, {}> {
    }

    namespace Ripples {
        interface CircleRippleProps extends React.Props<CircleRipple> {
            color?: string;
            opacity?: number;
            style?: React.CSSProperties;
        }
        export class CircleRipple extends React.Component<CircleRippleProps, {}> {
        }

        interface FocusRippleProps extends React.Props<FocusRipple> {
            color?: string;
            style?: React.CSSProperties;
            innerStyle?: React.CSSProperties;
            opacity?: number;
            show?: boolean;
        }
        export class FocusRipple extends React.Component<FocusRippleProps, {}> {
        }

        interface TouchRippleProps extends React.Props<TouchRipple> {
            centerRipple?: boolean;
            color?: string;
            opacity?: number;
            style?: React.CSSProperties;
        }
        export class TouchRipple extends React.Component<TouchRippleProps, {}> {
        }
    }

    interface SelectFieldProps extends React.Props<SelectField> {
        // passed to TextField
        errorStyle?: React.CSSProperties;
        errorText?: string;
        floatingLabelText?: string;
        floatingLabelStyle?: React.CSSProperties;
        fullWidth?: boolean;
        hintText?: string | React.ReactElement<any>;

        // passed to DropDownMenu
        displayMember?: string;
        valueMember?: string;
        autoWidth?: boolean;
        menuItemStyle?: React.CSSProperties;
        selectedIndex?: number;
        underlineStyle?: React.CSSProperties;
        underlineFocusStyle?: React.CSSProperties;
        iconStyle?: React.CSSProperties;
        labelStyle?: React.CSSProperties;
        style?: React.CSSProperties;
        disabled?: boolean;
        valueLink?: ReactLink<any>;
        value?: any;

        onChange?: Menu.ItemTapEventHandler;
        onEnterKeyDown?: React.KeyboardEventHandler;

        // own properties
        selectFieldRoot?: string;
        multiLine?: boolean;
        type?: string;
        rows?: number;
        inputStyle?: React.CSSProperties;
    }
    export class SelectField extends React.Component<SelectFieldProps, {}> {
    }

    interface SliderProps extends React.Props<Slider> {
        name: string;
        defaultValue?: number;
        description?: string;
        error?: string;
        max?: number;
        min?: number;
        required?: boolean;
        step?: number;
        value?: number;
        style?: React.CSSProperties;
        onChange?: Function;
        onDragStart?: Function;
        onDragStop?: Function;
    }
    export class Slider extends React.Component<SliderProps, {}> {
    }

    interface SvgIconProps extends React.Props<SvgIcon> {
        color?: string;
        hoverColor?: string;
        viewBox?: string;
        style?: React.CSSProperties;
    }
    export class SvgIcon extends React.Component<SvgIconProps, {}> {
    }

    export namespace Icons {
        export import NavigationMenu = __MaterialUI.NavigationMenu;
        export import NavigationChevronLeft = __MaterialUI.NavigationChevronLeft;
        export import NavigationChevronRight = __MaterialUI.NavigationChevronRight;
    }

    interface NavigationMenuProps extends React.Props<NavigationMenu> {
    }
    export class NavigationMenu extends React.Component<NavigationMenuProps, {}> {
    }

    interface NavigationChevronLeftProps extends React.Props<NavigationChevronLeft> {
    }
    export class NavigationChevronLeft extends React.Component<NavigationChevronLeftProps, {}> {
    }

    interface NavigationChevronRightProps extends React.Props<NavigationChevronRight> {
    }
    export class NavigationChevronRight extends React.Component<NavigationChevronRightProps, {}> {
    }

    export namespace Styles {
        interface AutoPrefix {
            all(styles: React.CSSProperties): React.CSSProperties;
            set(style: React.CSSProperties, key: string, value: string | number): void;
            single(key: string): string;
            singleHyphened(key: string): string;
        }
        export var AutoPrefix: AutoPrefix;

        interface Spacing {
            iconSize?: number;

            desktopGutter?: number;
            desktopGutterMore?: number;
            desktopGutterLess?: number;
            desktopGutterMini?: number;
            desktopKeylineIncrement?: number;
            desktopDropDownMenuItemHeight?: number;
            desktopDropDownMenuFontSize?: number;
            desktopLeftNavMenuItemHeight?: number;
            desktopSubheaderHeight?: number;
            desktopToolbarHeight?: number;
        }
        export var Spacing: Spacing;

        interface ThemePalette {
            primary1Color?: string;
            primary2Color?: string;
            primary3Color?: string;
            accent1Color?: string;
            accent2Color?: string;
            accent3Color?: string;
            textColor?: string;
            canvasColor?: string;
            borderColor?: string;
            disabledColor?: string;
            alternateTextColor?: string;
        }
        interface MuiTheme {
            rawTheme: RawTheme;
            static: boolean;
            appBar?: {
                color?: string,
                textColor?: string,
                height?: number
            },
            avatar?: {
                borderColor?: string;
            }
            button?: {
                height?: number,
                minWidth?: number,
                iconButtonSize?: number
            },
            checkbox?: {
                boxColor?: string,
                checkedColor?: string,
                requiredColor?: string,
                disabledColor?: string,
                labelColor?: string,
                labelDisabledColor?: string
            },
            datePicker?: {
                color?: string,
                textColor?: string,
                calendarTextColor?: string,
                selectColor?: string,
                selectTextColor?: string,
            },
            dropDownMenu?: {
                accentColor?: string,
            },
            flatButton?: {
                color?: string,
                textColor?: string,
                primaryTextColor?: string,
                secondaryTextColor?: string,
                disabledColor?: string
            },
            floatingActionButton?: {
                buttonSize?: number,
                miniSize?: number,
                color?: string,
                iconColor?: string,
                secondaryColor?: string,
                secondaryIconColor?: string,
                disabledColor?: string,
                disabledTextColor?: string
            },
            inkBar?: {
                backgroundColor?: string;
            },
            leftNav?: {
                width?: number,
                color?: string,
            },
            listItem?: {
                nestedLevelDepth?: number;
            },
            menu?: {
                backgroundColor?: string,
                containerBackgroundColor?: string,
            },
            menuItem?: {
                dataHeight?: number,
                height?: number,
                hoverColor?: string,
                padding?: number,
                selectedTextColor?: string,
            },
            menuSubheader?: {
                padding?: number,
                borderColor?: string,
                textColor?: string,
            },
            paper?: {
                backgroundColor?: string,
            },
            radioButton?: {
                borderColor?: string,
                backgroundColor?: string,
                checkedColor?: string,
                requiredColor?: string,
                disabledColor?: string,
                size?: number,
                labelColor?: string,
                labelDisabledColor?: string
            },
            raisedButton?: {
                color?: string,
                textColor?: string,
                primaryColor?: string,
                primaryTextColor?: string,
                secondaryColor?: string,
                secondaryTextColor?: string,
                disabledColor?: string,
                disabledTextColor?: string
            },
            refreshIndicator?: {
                strokeColor?: string;
                loadingStrokeColor?: string;
            };
            slider?: {
                trackSize?: number,
                trackColor?: string,
                trackColorSelected?: string,
                handleSize?: number,
                handleSizeActive?: number,
                handleSizeDisabled?: number,
                handleColorZero?: string,
                handleFillColor?: string,
                selectionColor?: string,
                rippleColor?: string,
            },
            snackbar?: {
                textColor?: string,
                backgroundColor?: string,
                actionColor?: string,
            },
            table?: {
                backgroundColor?: string;
            };
            tableHeader?: {
                borderColor?: string;
            };
            tableHeaderColumn?: {
                textColor?: string;
            };
            tableFooter?: {
                borderColor?: string;
                textColor?: string;
            };
            tableRow?: {
                hoverColor?: string;
                stripeColor?: string;
                selectedColor?: string;
                textColor?: string;
                borderColor?: string;
            };
            tableRowColumn?: {
                height?: number;
                spacing?: number;
            };
            timePicker?: {
                color?: string;
                textColor?: string;
                accentColor?: string;
                clockColor?: string;
                selectColor?: string;
                selectTextColor?: string;
            };
            toggle?: {
                thumbOnColor?: string,
                thumbOffColor?: string,
                thumbDisabledColor?: string,
                thumbRequiredColor?: string,
                trackOnColor?: string,
                trackOffColor?: string,
                trackDisabledColor?: string,
                trackRequiredColor?: string,
                labelColor?: string,
                labelDisabledColor?: string
            },
            toolbar?: {
                backgroundColor?: string,
                height?: number,
                titleFontSize?: number,
                iconColor?: string,
                separatorColor?: string,
                menuHoverColor?: string,
            };
            tabs?: {
                backgroundColor?: string;
            };
            textField?: {
                textColor?: string;
                hintColor?: string;
                floatingLabelColor?: string;
                disabledTextColor?: string;
                errorColor?: string;
                focusColor?: string;
                backgroundColor?: string;
                borderColor?: string;
            };
            isRtl: boolean;
        }

        interface RawTheme {
            spacing: Spacing;
            fontFamily?: string;
            palette: ThemePalette;
        }

        export function ThemeDecorator(muiTheme: Styles.MuiTheme): <P>(Component: React.ComponentClass<P>) => React.ComponentClass<P>;

        interface ThemeManager {
            getMuiTheme(rawTheme: RawTheme): MuiTheme;
            modifyRawThemeSpacing(muiTheme: MuiTheme, newSpacing: Spacing): MuiTheme;
            modifyRawThemePalette(muiTheme: MuiTheme, newPaletteKeys: ThemePalette): MuiTheme;
            modifyRawThemeFontFamily(muiTheme: MuiTheme, newFontFamily: string): MuiTheme;
        }
        export var ThemeManager: ThemeManager;

        interface Transitions {
            easeOut(duration?: string, property?: string | string[], delay?: string, easeFunction?: string): string;
            create(duration?: string, property?: string, delay?: string, easeFunction?: string): string;
            easeOutFunction: string;
            easeInOutFunction: string;
        }
        export var Transitions: Transitions;

        interface Typography {
            textFullBlack: string;
            textDarkBlack: string;
            textLightBlack: string;
            textMinBlack: string;
            textFullWhite: string;
            textDarkWhite: string;
            textLightWhite: string;

            // font weight
            fontWeightLight: number;
            fontWeightNormal: number;
            fontWeightMedium: number;

            fontStyleButtonFontSize: number;
        }
        export var Typography: Typography;

        export var DarkRawTheme: RawTheme;
        export var LightRawTheme: RawTheme;
    }

    interface SnackbarProps extends React.Props<Snackbar> {
        message: string;
        action?: string;
        autoHideDuration?: number;
        onActionTouchTap?: React.TouchEventHandler;
        onShow?: () => void;
        onDismiss?: () => void;
        openOnMount?: boolean;
        style?: React.CSSProperties;
    }
    export class Snackbar extends React.Component<SnackbarProps, {}> {
    }

    namespace Tabs {
        interface TabProps extends React.Props<Tab> {
            label?: any;
            value?: string;
            selected?: boolean;
            width?: string;
            style?: React.CSSProperties;

            // Called by Tabs component
            onActive?: (tab: Tab) => void;

            onTouchTap?: (value: string, e: TouchTapEvent, tab: Tab) => void;
        }
        export class Tab extends React.Component<TabProps, {}> {
        }

        interface TabsProps extends React.Props<Tabs> {
            contentContainerStyle?: React.CSSProperties;
            initialSelectedIndex?: number;
            inkBarStyle?: React.CSSProperties;
            style?: React.CSSProperties;
            tabItemContainerStyle?: React.CSSProperties;
            tabWidth?: number;
            value?: string | number;
            tabTemplate?: __React.ComponentClass<any>;

            onChange?: (value: string | number, e: React.FormEvent, tab: Tab) => void;
        }
        export class Tabs extends React.Component<TabsProps, {}> {
        }
    }

    namespace Table {
        interface TableProps extends React.Props<Table> {
            allRowsSelected?: boolean;
            fixedFooter?: boolean;
            fixedHeader?: boolean;
            height?: string;
            multiSelectable?: boolean;
            onCellClick?: (row: number, column: number) => void;
            onCellHover?: (row: number, column: number) => void;
            onCellHoverExit?: (row: number, column: number) => void;
            onRowHover?: (row: number) => void;
            onRowHoverExit?: (row: number) => void;
            onRowSelection?: (selectedRows: number[]) => void;
            selectable?: boolean;
            style?: React.CSSProperties;
        }
        export class Table extends React.Component<TableProps, {}> {
        }

        interface TableBodyProps extends React.Props<TableBody> {
            allRowsSelected?: boolean;
            deselectOnClickaway?: boolean;
            displayRowCheckbox?: boolean;
            multiSelectable?: boolean;
            onCellClick?: (row: number, column: number) => void;
            onCellHover?: (row: number, column: number) => void;
            onCellHoverExit?: (row: number, column: number) => void;
            onRowHover?: (row: number) => void;
            onRowHoverExit?: (row: number) => void;
            onRowSelection?: (selectedRows: number[]) => void;
            preScanRows?: boolean;
            selectable?: boolean;
            showRowHover?: boolean;
            stripedRows?: boolean;
            style?: React.CSSProperties;
        }
        export class TableBody extends React.Component<TableBodyProps, {}> {
        }

        interface TableFooterProps extends React.Props<TableFooter> {
            adjustForCheckbox?: boolean;
            style?: React.CSSProperties;
        }
        export class TableFooter extends React.Component<TableFooterProps, {}> {
        }

        interface TableHeaderProps extends React.Props<TableHeader> {
            adjustForCheckbox?: boolean;
            displaySelectAll?: boolean;
            enableSelectAll?: boolean;
            onSelectAll?: (event: React.MouseEvent) => void;
            selectAllSelected?: boolean;
            style?: React.CSSProperties;
        }
        export class TableHeader extends React.Component<TableHeaderProps, {}> {
        }

        interface TableHeaderColumnProps extends React.Props<TableHeaderColumn> {
            columnNumber?: number;
            onClick?: (e: React.MouseEvent, column: number) => void;
            tooltip?: string;
            tooltipStyle?: React.CSSProperties;
            style?: React.CSSProperties;
        }
        export class TableHeaderColumn extends React.Component<TableHeaderColumnProps, {}> {
        }

        interface TableRowProps extends React.Props<TableRow> {
            displayBorder?: boolean;
            hoverable?: boolean;
            onCellClick?: (e: React.MouseEvent, row: number, column: number) => void;
            onCellHover?: (e: React.MouseEvent, row: number, column: number) => void;
            onCellHoverExit?: (e: React.MouseEvent, row: number, column: number) => void;
            onRowClick?: (e: React.MouseEvent, row: number) => void;
            onRowHover?: (e: React.MouseEvent, row: number) => void;
            onRowHoverExit?: (e: React.MouseEvent, row: number) => void;
            rowNumber?: number;
            selectable?: boolean;
            selected?: boolean;
            striped?: boolean;
            style?: React.CSSProperties;
        }
        export class TableRow extends React.Component<TableRowProps, {}> {
        }

        interface TableRowColumnProps extends React.Props<TableRowColumn> {
            columnNumber?: number;
            colSpan?: number;
            hoverable?: boolean;
            onClick?: React.MouseEventHandler;
            onHover?: (e: React.MouseEvent, column: number) => void;
            onHoverExit?: (e: React.MouseEvent, column: number) => void;
            style?: React.CSSProperties;
        }
        export class TableRowColumn extends React.Component<TableRowColumnProps, {}> {
        }
    }

    interface ThemeWrapperProps extends React.Props<ThemeWrapper> {
        theme: Styles.MuiTheme;
    }
    export class ThemeWrapper extends React.Component<ThemeWrapperProps, {}> {
    }

    interface ToggleProps extends CommonEnhancedSwitchProps<Toggle> {
        // <EnhancedSwitch/> is root element

        elementStyle?: React.CSSProperties;
        labelStyle?: React.CSSProperties;
        onToggle?: (e: React.MouseEvent, isInputChecked: boolean) => void;
        toggled?: boolean;
        defaultToggled?: boolean;
    }
    export class Toggle extends React.Component<ToggleProps, {}> {
        isToggled(): boolean;
        setToggled(newToggledValue: boolean): void;
    }

    interface TimePickerProps extends React.Props<TimePicker> {
        defaultTime?: Date;
        format?: string;
        pedantic?: boolean;
        style?: __React.CSSProperties;
        textFieldStyle?: __React.CSSProperties;
        autoOk?: boolean;
        openDialog?: () => void;
        onFocus?: React.FocusEventHandler;
        onTouchTap?: TouchTapEventHandler;
        onChange?: (e: any, time: Date) => void;
        onShow?: () => void;
        onDismiss?: () => void;
    }
    export class TimePicker extends React.Component<TimePickerProps, {}> {
    }

    interface TextFieldProps extends React.Props<TextField> {
        errorStyle?: React.CSSProperties;
        errorText?: string;
        floatingLabelText?: string;
        floatingLabelStyle?: React.CSSProperties;
        fullWidth?: boolean;
        hintText?: string | React.ReactElement<any>;
        id?: string;
        inputStyle?: React.CSSProperties;
        multiLine?: boolean;
        onEnterKeyDown?: React.KeyboardEventHandler;
        style?: React.CSSProperties;
        rows?: number,
        underlineStyle?: React.CSSProperties;
        underlineFocusStyle?: React.CSSProperties;
        underlineDisabledStyle?: React.CSSProperties;
        type?: string;
        hintStyle?: React.CSSProperties;

        disabled?: boolean;
        isRtl?: boolean;
        value?: string;
        defaultValue?: string;
        valueLink?: ReactLink<string>;

        onBlur?: React.FocusEventHandler;
        onChange?: React.FormEventHandler;
        onFocus?: React.FocusEventHandler;
        onKeyDown?: React.KeyboardEventHandler;
    }
    export class TextField extends React.Component<TextFieldProps, {}> {
        blur(): void;
        clearValue(): void;
        focus(): void;
        getValue(): string;
        setErrorText(newErrorText: string): void;
        setValue(newValue: string): void;
    }

    namespace Toolbar {
        interface ToolbarProps extends React.Props<Toolbar> {
            style?: React.CSSProperties;
        }
        export class Toolbar extends React.Component<ToolbarProps, {}> {
        }

        interface ToolbarGroupProps extends React.Props<ToolbarGroup> {
            float?: string;
            style?: React.CSSProperties;
        }
        export class ToolbarGroup extends React.Component<ToolbarGroupProps, {}> {
        }

        interface ToolbarSeparatorProps extends React.Props<ToolbarSeparator> {
            style?: React.CSSProperties;
        }
        export class ToolbarSeparator extends React.Component<ToolbarSeparatorProps, {}> {
        }

        interface ToolbarTitleProps extends React.HTMLAttributes, React.Props<ToolbarTitle> {
            text?: string;
            style?: React.CSSProperties;
        }
        export class ToolbarTitle extends React.Component<ToolbarTitleProps, {}> {
        }
    }

    interface TooltipProps extends React.Props<Tooltip> {
        label: string;
        show?: boolean;
        touch?: boolean;
        verticalPosition?: string;
        horizontalPosition?: string;
    }
    export class Tooltip extends React.Component<TooltipProps, {}> {
    }

    export namespace Utils {
        interface ContrastLevel {
            range: [number, number];
            color: string;
        }
        interface ColorManipulator {
            fade(color: string, amount: string | number): string;
            lighten(color: string, amount: string | number): string;
            darken(color: string, amount: string | number): string;
            contrastRatio(background: string, foreground: string): number;
            contrastRatioLevel(background: string, foreground: string): ContrastLevel;
        }
        export var ColorManipulator: ColorManipulator;

        interface CssEvent {
            transitionEndEventName(): string;
            animationEndEventName(): string;
            onTransitionEnd(el: Element, callback: () => void): void;
            onAnimationEnd(el: Element, callback: () => void): void;
        }
        export var CssEvent: CssEvent;

        interface Dom {
            isDescendant(parent: Node, child: Node): boolean;
            offset(el: Element): { top: number, left: number };
            getStyleAttributeAsNumber(el: HTMLElement, attr: string): number;
            addClass(el: Element, className: string): void;
            removeClass(el: Element, className: string): void;
            hasClass(el: Element, className: string): boolean;
            toggleClass(el: Element, className: string): void;
            forceRedraw(el: HTMLElement): void;
            withoutTransition(el: HTMLElement, callback: () => void): void;
        }
        export var Dom: Dom;

        interface Events {
            once(el: Element, type: string, callback: EventListener): void;
            on(el: Element, type: string, callback: EventListener): void;
            off(el: Element, type: string, callback: EventListener): void;
            isKeyboard(e: Event): boolean;
        }
        export var Events: Events;

        function Extend<T, S1>(base: T, override: S1): (T & S1);

        interface ImmutabilityHelper {
            merge(base: any, ...args: any[]): any;
            mergeItem(obj: any, key: any, newValueObject: any): any;
            push(array: any[], obj: any): any[];
            shift(array: any[]): any[];
        }
        export var ImmutabilityHelper: ImmutabilityHelper;

        interface KeyCode {
            DOWN: number;
            ESC: number;
            ENTER: number;
            LEFT: number;
            RIGHT: number;
            SPACE: number;
            TAB: number;
            UP: number;
        }
        var KeyCode: KeyCode;

        interface KeyLine {
            Desktop: {
                GUTTER: number;
                GUTTER_LESS: number;
                INCREMENT: number;
                MENU_ITEM_HEIGHT: number;
            };

            getIncrementalDim(dim: number): number;
        }
        export var KeyLine: KeyLine;

        interface UniqueId {
            generate(): string;
        }
        export var UniqueId: UniqueId;

        interface Styles {
            mergeAndPrefix(base: any, ...args: any[]): React.CSSProperties;
        }
        export var Styles: Styles;
    }

    // New menus available only through requiring directly to the end file
    namespace Menus {
        interface IconMenuProps extends React.Props<IconMenu> {
            closeOnItemTouchTap?: boolean;
            desktop?: boolean;
            iconButtonElement: React.ReactElement<IconButtonProps>;
            openDirection?: string;
            menuStyle?: React.CSSProperties;
            multiple?: boolean;
            value?: string | Array<string>;
            width?: string | number;
            touchTapCloseDelay?: number;
            style?: React.CSSProperties;

            onKeyboardFocus?: React.FocusEventHandler;
            onItemTouchTap?: (e: TouchTapEvent, item: React.ReactElement<any>) => void;
            onChange?: (e: React.FormEvent, value: string | Array<string>) => void;
        }
        export class IconMenu extends React.Component<IconMenuProps, {}> {
        }

        interface MenuProps extends React.Props<Menu> {
            animated?: boolean;
            autoWidth?: boolean;
            desktop?: boolean;
            listStyle?: React.CSSProperties;
            maxHeight?: number;
            multiple?: boolean;
            openDirection?: string;
            value?: string | Array<string>;
            width?: string | number;
            zDepth?: number;
            style?: React.CSSProperties;
        }
        export class Menu extends React.Component<MenuProps, {}>{
        }

        interface MenuItemProps extends React.Props<MenuItem> {
            checked?: boolean;
            desktop?: boolean;
            disabled?: boolean;
            innerDivStyle?: React.CSSProperties;
            insetChildren?: boolean;
            leftIcon?: React.ReactElement<any>;
            primaryText?: string | React.ReactElement<any>;
            rightIcon?: React.ReactElement<any>;
            secondaryText?: React.ReactNode;
            value?: string;
            style?: React.CSSProperties;

            onEscKeyDown?: React.KeyboardEventHandler;
            onItemTouchTap?: (e: TouchTapEvent, item: React.ReactElement<any>) => void;
            onChange?: (e: React.FormEvent, value: string) => void;
        }
        export class MenuItem extends React.Component<MenuItemProps, {}>{
        }

        interface MenuDividerProps extends React.Props<MenuDivider> {
            inset?: boolean;
            style?: React.CSSProperties;
        }
        export class MenuDivider extends React.Component<MenuDividerProps, {}>{
        }
    }

    namespace GridList {

        interface GridListProps extends React.Props<GridList> {
            cols?: number;
            padding?: number;
            cellHeight?: number;
            style?: React.CSSProperties;
        }

        export class GridList extends React.Component<GridListProps, {}>{
        }

        interface GridTileProps extends React.Props<GridTile> {
            title?: string;
            subtitle?: __React.ReactNode;
            titlePosition?: string; //"top"|"bottom"
            titleBackground?: string;
            actionIcon?: __React.ReactElement<any>;
            actionPosition?: string; //"left"|"right"
            cols?: number;
            rows?: number;
            rootClass?: string | __React.Component<any,any>;
            style?: React.CSSProperties;
        }

        export class GridTile extends React.Component<GridTileProps, {}>{
        }

    }
}    // __MaterialUI

declare module 'material-ui/lib/app-bar' {
    import AppBar = __MaterialUI.AppBar;
    export = AppBar;
}

declare module 'material-ui/lib/app-canvas' {
    import AppCanvas = __MaterialUI.AppCanvas;
    export = AppCanvas;
}

declare module 'material-ui/lib/avatar' {
    import Avatar = __MaterialUI.Avatar;
    export = Avatar;
}

declare module "material-ui/lib/badge" {
    import Badge = __MaterialUI.Badge;
    export = Badge;
}

declare module 'material-ui/lib/before-after-wrapper' {
    import BeforeAfterWrapper = __MaterialUI.BeforeAfterWrapper;
    export = BeforeAfterWrapper;
}

declare module 'material-ui/lib/card/card' {
    import Card = __MaterialUI.Card.Card;
    export = Card;
}

declare module 'material-ui/lib/card/card-actions' {
    import CardActions = __MaterialUI.Card.CardActions;
    export = CardActions;
}

declare module 'material-ui/lib/card/card-expandable' {
    import CardExpandable = __MaterialUI.Card.CardExpandable;
    export = CardExpandable;
}

declare module 'material-ui/lib/card/card-header' {
    import CardHeader = __MaterialUI.Card.CardHeader;
    export = CardHeader;
}

declare module 'material-ui/lib/card/card-media' {
    import CardMedia = __MaterialUI.Card.CardMedia;
    export = CardMedia;
}

declare module 'material-ui/lib/card/card-text' {
    import CardText = __MaterialUI.Card.CardText;
    export = CardText;
}

declare module 'material-ui/lib/card/card-title' {
    import CardTitle = __MaterialUI.Card.CardTitle;
    export = CardTitle;
}

declare module 'material-ui/lib/checkbox' {
    import Checkbox = __MaterialUI.Checkbox;
    export = Checkbox;
}

declare module 'material-ui/lib/circular-progress' {
    import CircularProgress = __MaterialUI.CircularProgress;
    export = CircularProgress;
}

declare module 'material-ui/lib/clearfix' {
    import ClearFix = __MaterialUI.ClearFix;
    export = ClearFix;
}

declare module 'material-ui/lib/date-picker/date-picker' {
    import DatePicker = __MaterialUI.DatePicker.DatePicker;
    export = DatePicker;
}

declare module 'material-ui/lib/date-picker/date-picker-dialog' {
    import DatePickerDialog = __MaterialUI.DatePicker.DatePickerDialog;
    export = DatePickerDialog;
}

declare module 'material-ui/lib/dialog' {
    import Dialog = __MaterialUI.Dialog;
    export = Dialog;
}

declare module 'material-ui/lib/drop-down-icon' {
    import DropDownIcon = __MaterialUI.DropDownIcon;
    export = DropDownIcon;
}

declare module 'material-ui/lib/drop-down-menu' {
    import DropDownMenu = __MaterialUI.DropDownMenu;
    export = DropDownMenu;
}

declare module 'material-ui/lib/enhanced-button' {
    import EnhancedButton = __MaterialUI.EnhancedButton;
    export = EnhancedButton;
}

declare module 'material-ui/lib/flat-button' {
    import FlatButton = __MaterialUI.FlatButton;
    export = FlatButton;
}

declare module 'material-ui/lib/floating-action-button' {
    import FloatingActionButton = __MaterialUI.FloatingActionButton;
    export = FloatingActionButton;
}

declare module 'material-ui/lib/font-icon' {
    import FontIcon = __MaterialUI.FontIcon;
    export = FontIcon;
}

declare module 'material-ui/lib/icon-button' {
    import IconButton = __MaterialUI.IconButton;
    export = IconButton;
}

declare module 'material-ui/lib/left-nav' {
    import LeftNav = __MaterialUI.LeftNav;
    export = LeftNav;
}

declare module 'material-ui/lib/linear-progress' {
    import LinearProgress = __MaterialUI.LinearProgress;
    export = LinearProgress;
}

declare module 'material-ui/lib/lists/list' {
    import List = __MaterialUI.Lists.List;
    export = List;
}

declare module 'material-ui/lib/lists/list-divider' {
    import ListDivider = __MaterialUI.Lists.ListDivider;
    export = ListDivider;
}

declare module 'material-ui/lib/lists/list-item' {
    import ListItem = __MaterialUI.Lists.ListItem;
    export = ListItem;
}

declare module 'material-ui/lib/menu/menu' {
    import Menu = __MaterialUI.Menu.Menu;
    export = Menu;
}

declare module 'material-ui/lib/menu/menu-item' {
    import MenuItem = __MaterialUI.Menu.MenuItem;
    export = MenuItem;
}

declare module 'material-ui/lib/mixins/' {
    export import ClickAwayable = __MaterialUI.Mixins.ClickAwayable; // require('material-ui/lib/mixins/click-awayable');
    export import WindowListenable = __MaterialUI.Mixins.WindowListenable; // require('material-ui/lib/mixins/window-listenable');
    export import StylePropable = __MaterialUI.Mixins.StylePropable; // require('material-ui/lib/mixins/style-propable');
    export import StyleResizable = __MaterialUI.Mixins.StyleResizable; // require('material-ui/lib/mixins/style-resizable');
}

declare module 'material-ui/lib/mixins/click-awayable' {
    import ClickAwayable = __MaterialUI.Mixins.ClickAwayable;
    export = ClickAwayable;
}

declare module 'material-ui/lib/mixins/window-listenable' {
    import WindowListenable = __MaterialUI.Mixins.WindowListenable;
    export = WindowListenable;
}

declare module 'material-ui/lib/mixins/style-propable' {
    import StylePropable = __MaterialUI.Mixins.StylePropable;
    export = StylePropable;
}

declare module 'material-ui/lib/mixins/style-resizable' {
    import StyleResizable = __MaterialUI.Mixins.StyleResizable;
    export = StyleResizable;
}

declare module 'material-ui/lib/overlay' {
    import Overlay = __MaterialUI.Overlay;
    export = Overlay;
}

declare module 'material-ui/lib/paper' {
    import Paper = __MaterialUI.Paper;
    export = Paper;
}

declare module 'material-ui/lib/radio-button' {
    import RadioButton = __MaterialUI.RadioButton;
    export = RadioButton;
}

declare module 'material-ui/lib/radio-button-group' {
    import RadioButtonGroup = __MaterialUI.RadioButtonGroup;
    export = RadioButtonGroup;
}

declare module 'material-ui/lib/raised-button' {
    import RaisedButton = __MaterialUI.RaisedButton;
    export = RaisedButton;
}

declare module 'material-ui/lib/refresh-indicator' {
    import RefreshIndicator = __MaterialUI.RefreshIndicator;
    export = RefreshIndicator;
}

declare module 'material-ui/lib/ripples/' {
    export import CircleRipple = __MaterialUI.Ripples.CircleRipple;
    export import FocusRipple = __MaterialUI.Ripples.FocusRipple;
    export import TouchRipple = __MaterialUI.Ripples.TouchRipple;
}

declare module 'material-ui/lib/select-field' {
    import SelectField = __MaterialUI.SelectField;
    export = SelectField;
}

declare module 'material-ui/lib/slider' {
    import Slider = __MaterialUI.Slider;
    export = Slider;
}

declare module 'material-ui/lib/svg-icon' {
    import SvgIcon = __MaterialUI.SvgIcon;
    export = SvgIcon;
}

declare module 'material-ui/lib/svg-icons/navigation/menu' {
    import NavigationMenu = __MaterialUI.NavigationMenu;
    export = NavigationMenu;
}

declare module 'material-ui/lib/svg-icons/navigation/chevron-left' {
    import NavigationChevronLeft = __MaterialUI.NavigationChevronLeft;
    export = NavigationChevronLeft;
}

declare module 'material-ui/lib/svg-icons/navigation/chevron-right' {
    import NavigationChevronRight = __MaterialUI.NavigationChevronRight;
    export = NavigationChevronRight;
}

declare module 'material-ui/lib/styles/' {
    export import AutoPrefix = __MaterialUI.Styles.AutoPrefix; // require('material-ui/lib/styles/auto-prefix');
    export import Colors = __MaterialUI.Styles.Colors; // require('material-ui/lib/styles/colors');
    export import Spacing = require('material-ui/lib/styles/spacing');
    export import ThemeManager = __MaterialUI.Styles.ThemeManager; // require('material-ui/lib/styles/theme-manager');
    export import Transitions = __MaterialUI.Styles.Transitions; // require('material-ui/lib/styles/transitions');
    export import Typography = __MaterialUI.Styles.Typography; // require('material-ui/lib/styles/typography');
    export import LightRawTheme = __MaterialUI.Styles.LightRawTheme; // require('material-ui/lib/styles/raw-themes/light-raw-theme'),
    export import DarkRawTheme = __MaterialUI.Styles.DarkRawTheme; // require('material-ui/lib/styles/raw-themes/dark-raw-theme'),
    export import ThemeDecorator = __MaterialUI.Styles.ThemeDecorator; //require('material-ui/lib/styles/theme-decorator');
}

declare module 'material-ui/lib/styles/auto-prefix' {
    import AutoPrefix = __MaterialUI.Styles.AutoPrefix;
    export = AutoPrefix;
}

declare module 'material-ui/lib/styles/spacing' {
    type Spacing = __MaterialUI.Styles.Spacing;
    var Spacing: Spacing;
    export = Spacing;
}

declare module 'material-ui/lib/styles/theme-manager' {
    import ThemeManager = __MaterialUI.Styles.ThemeManager;
    export = ThemeManager;
}

declare module 'material-ui/lib/styles/transitions' {
    import Transitions = __MaterialUI.Styles.Transitions;
    export = Transitions;
}

declare module 'material-ui/lib/styles/typography' {
    import Typography = __MaterialUI.Styles.Typography;
    export = Typography;
}

declare module 'material-ui/lib/styles/raw-themes/light-raw-theme' {
    import LightRawTheme = __MaterialUI.Styles.LightRawTheme;
    export = LightRawTheme;
}

declare module 'material-ui/lib/styles/raw-themes/dark-raw-theme' {
    import DarkRawTheme = __MaterialUI.Styles.DarkRawTheme;
    export = DarkRawTheme;
}

declare module 'material-ui/lib/styles/theme-decorator' {
    import ThemeDecorator = __MaterialUI.Styles.ThemeDecorator;
    export = ThemeDecorator;
}


declare module 'material-ui/lib/snackbar' {
    import Snackbar = __MaterialUI.Snackbar;
    export = Snackbar;
}

declare module 'material-ui/lib/tabs/tab' {
    import Tab = __MaterialUI.Tabs.Tab;
    export = Tab;
}

declare module 'material-ui/lib/tabs/tabs' {
    import Tabs = __MaterialUI.Tabs.Tabs;
    export = Tabs;
}

declare module 'material-ui/lib/table/table' {
    import Table = __MaterialUI.Table.Table;
    export = Table;
}

declare module 'material-ui/lib/table/table-body' {
    import TableBody = __MaterialUI.Table.TableBody;
    export = TableBody;
}

declare module 'material-ui/lib/table/table-footer' {
    import TableFooter = __MaterialUI.Table.TableFooter;
    export = TableFooter;
}

declare module 'material-ui/lib/table/table-header' {
    import TableHeader = __MaterialUI.Table.TableHeader;
    export = TableHeader;
}

declare module 'material-ui/lib/table/table-header-column' {
    import TableHeaderColumn = __MaterialUI.Table.TableHeaderColumn;
    export = TableHeaderColumn;
}

declare module 'material-ui/lib/table/table-row' {
    import TableRow = __MaterialUI.Table.TableRow;
    export = TableRow;
}

declare module 'material-ui/lib/table/table-row-column' {
    import TableRowColumn = __MaterialUI.Table.TableRowColumn;
    export = TableRowColumn;
}

declare module 'material-ui/lib/theme-wrapper' {
    import ThemeWrapper = __MaterialUI.ThemeWrapper;
    export = ThemeWrapper;
}

declare module 'material-ui/lib/toggle' {
    import Toggle = __MaterialUI.Toggle;
    export = Toggle;
}

declare module 'material-ui/lib/time-picker' {
    import TimePicker = __MaterialUI.TimePicker;
    export = TimePicker;
}

declare module 'material-ui/lib/text-field' {
    import TextField = __MaterialUI.TextField;
    export = TextField;
}

declare module 'material-ui/lib/toolbar/toolbar' {
    import Toolbar = __MaterialUI.Toolbar.Toolbar;
    export = Toolbar;
}

declare module 'material-ui/lib/toolbar/toolbar-group' {
    import ToolbarGroup = __MaterialUI.Toolbar.ToolbarGroup;
    export = ToolbarGroup;
}

declare module 'material-ui/lib/toolbar/toolbar-separator' {
    import ToolbarSeparator = __MaterialUI.Toolbar.ToolbarSeparator;
    export = ToolbarSeparator;
}

declare module 'material-ui/lib/toolbar/toolbar-title' {
    import ToolbarTitle = __MaterialUI.Toolbar.ToolbarTitle;
    export = ToolbarTitle;
}

declare module 'material-ui/lib/tooltip' {
    import Tooltip = __MaterialUI.Tooltip;
    export = Tooltip;
}

declare module 'material-ui/lib/utils/' {
    export import ColorManipulator = __MaterialUI.Utils.ColorManipulator; // require('material-ui/lib/utils/color-manipulator');
    export import CssEvent = __MaterialUI.Utils.CssEvent; // require('material-ui/lib/utils/css-event');
    export import Dom = __MaterialUI.Utils.Dom; // require('material-ui/lib/utils/dom');
    export import Events = __MaterialUI.Utils.Events; // require('material-ui/lib/utils/events');
    export import Extend = __MaterialUI.Utils.Extend; // require('material-ui/lib/utils/extend');
    export import ImmutabilityHelper = __MaterialUI.Utils.ImmutabilityHelper; // require('material-ui/lib/utils/immutability-helper');
    export import KeyCode = __MaterialUI.Utils.KeyCode; // require('material-ui/lib/utils/key-code');
    export import KeyLine = __MaterialUI.Utils.KeyLine; // require('material-ui/lib/utils/key-line');
    export import UniqueId = __MaterialUI.Utils.UniqueId; // require('material-ui/lib/utils/unique-id');
    export import Styles = __MaterialUI.Utils.Styles; // require('material-ui/lib/utils/styles');
}

declare module 'material-ui/lib/utils/color-manipulator' {
    import ColorManipulator = __MaterialUI.Utils.ColorManipulator;
    export = ColorManipulator;
}

declare module 'material-ui/lib/utils/css-event' {
    import CssEvent = __MaterialUI.Utils.CssEvent;
    export = CssEvent;
}

declare module 'material-ui/lib/utils/dom' {
    import Dom = __MaterialUI.Utils.Dom;
    export = Dom;
}

declare module 'material-ui/lib/utils/events' {
    import Events = __MaterialUI.Utils.Events;
    export = Events;
}

declare module 'material-ui/lib/utils/extend' {
    import Extend = __MaterialUI.Utils.Extend;
    export = Extend;
}

declare module 'material-ui/lib/utils/immutability-helper' {
    import ImmutabilityHelper = __MaterialUI.Utils.ImmutabilityHelper;
    export = ImmutabilityHelper;
}

declare module 'material-ui/lib/utils/key-code' {
    import KeyCode = __MaterialUI.Utils.KeyCode;
    export = KeyCode;
}

declare module 'material-ui/lib/utils/key-line' {
    import KeyLine = __MaterialUI.Utils.KeyLine;
    export = KeyLine;
}

declare module 'material-ui/lib/utils/unique-id' {
    import UniqueId = __MaterialUI.Utils.UniqueId;
    export = UniqueId;
}

declare module 'material-ui/lib/utils/styles' {
    import Styles = __MaterialUI.Utils.Styles;
    export = Styles;
}

declare module "material-ui/lib/menus/icon-menu" {
    import IconMenu = __MaterialUI.Menus.IconMenu;
    export = IconMenu;
}

declare module "material-ui/lib/menus/menu" {
    import Menu = __MaterialUI.Menus.Menu;
    export = Menu;
}

declare module "material-ui/lib/menus/menu-item" {
    import MenuItem = __MaterialUI.Menus.MenuItem;
    export = MenuItem;
}

declare module "material-ui/lib/menus/menu-divider" {
    import MenuDivider = __MaterialUI.Menus.MenuDivider;
    export = MenuDivider;
}

declare module "material-ui/lib/grid-list/grid-list" {
    import GridList = __MaterialUI.GridList.GridList;
    export = GridList;
}

declare module "material-ui/lib/grid-list/grid-tile" {
    import GridTile = __MaterialUI.GridList.GridTile;
    export = GridTile;
}

declare module "material-ui/lib/styles/colors" {
    import Colors = __MaterialUI.Styles.Colors;
    export = Colors;
}

declare namespace __MaterialUI.Styles {
    interface Colors {
        red50: string;
        red100: string;
        red200: string;
        red300: string;
        red400: string;
        red500: string;
        red600: string;
        red700: string;
        red800: string;
        red900: string;
        redA100: string;
        redA200: string;
        redA400: string;
        redA700: string;

        pink50: string;
        pink100: string;
        pink200: string;
        pink300: string;
        pink400: string;
        pink500: string;
        pink600: string;
        pink700: string;
        pink800: string;
        pink900: string;
        pinkA100: string;
        pinkA200: string;
        pinkA400: string;
        pinkA700: string;

        purple50: string;
        purple100: string;
        purple200: string;
        purple300: string;
        purple400: string;
        purple500: string;
        purple600: string;
        purple700: string;
        purple800: string;
        purple900: string;
        purpleA100: string;
        purpleA200: string;
        purpleA400: string;
        purpleA700: string;

        deepPurple50: string;
        deepPurple100: string;
        deepPurple200: string;
        deepPurple300: string;
        deepPurple400: string;
        deepPurple500: string;
        deepPurple600: string;
        deepPurple700: string;
        deepPurple800: string;
        deepPurple900: string;
        deepPurpleA100: string;
        deepPurpleA200: string;
        deepPurpleA400: string;
        deepPurpleA700: string;

        indigo50: string;
        indigo100: string;
        indigo200: string;
        indigo300: string;
        indigo400: string;
        indigo500: string;
        indigo600: string;
        indigo700: string;
        indigo800: string;
        indigo900: string;
        indigoA100: string;
        indigoA200: string;
        indigoA400: string;
        indigoA700: string;

        blue50: string;
        blue100: string;
        blue200: string;
        blue300: string;
        blue400: string;
        blue500: string;
        blue600: string;
        blue700: string;
        blue800: string;
        blue900: string;
        blueA100: string;
        blueA200: string;
        blueA400: string;
        blueA700: string;

        lightBlue50: string;
        lightBlue100: string;
        lightBlue200: string;
        lightBlue300: string;
        lightBlue400: string;
        lightBlue500: string;
        lightBlue600: string;
        lightBlue700: string;
        lightBlue800: string;
        lightBlue900: string;
        lightBlueA100: string;
        lightBlueA200: string;
        lightBlueA400: string;
        lightBlueA700: string;

        cyan50: string;
        cyan100: string;
        cyan200: string;
        cyan300: string;
        cyan400: string;
        cyan500: string;
        cyan600: string;
        cyan700: string;
        cyan800: string;
        cyan900: string;
        cyanA100: string;
        cyanA200: string;
        cyanA400: string;
        cyanA700: string;

        teal50: string;
        teal100: string;
        teal200: string;
        teal300: string;
        teal400: string;
        teal500: string;
        teal600: string;
        teal700: string;
        teal800: string;
        teal900: string;
        tealA100: string;
        tealA200: string;
        tealA400: string;
        tealA700: string;

        green50: string;
        green100: string;
        green200: string;
        green300: string;
        green400: string;
        green500: string;
        green600: string;
        green700: string;
        green800: string;
        green900: string;
        greenA100: string;
        greenA200: string;
        greenA400: string;
        greenA700: string;

        lightGreen50: string;
        lightGreen100: string;
        lightGreen200: string;
        lightGreen300: string;
        lightGreen400: string;
        lightGreen500: string;
        lightGreen600: string;
        lightGreen700: string;
        lightGreen800: string;
        lightGreen900: string;
        lightGreenA100: string;
        lightGreenA200: string;
        lightGreenA400: string;
        lightGreenA700: string;

        lime50: string;
        lime100: string;
        lime200: string;
        lime300: string;
        lime400: string;
        lime500: string;
        lime600: string;
        lime700: string;
        lime800: string;
        lime900: string;
        limeA100: string;
        limeA200: string;
        limeA400: string;
        limeA700: string;

        yellow50: string;
        yellow100: string;
        yellow200: string;
        yellow300: string;
        yellow400: string;
        yellow500: string;
        yellow600: string;
        yellow700: string;
        yellow800: string;
        yellow900: string;
        yellowA100: string;
        yellowA200: string;
        yellowA400: string;
        yellowA700: string;

        amber50: string;
        amber100: string;
        amber200: string;
        amber300: string;
        amber400: string;
        amber500: string;
        amber600: string;
        amber700: string;
        amber800: string;
        amber900: string;
        amberA100: string;
        amberA200: string;
        amberA400: string;
        amberA700: string;

        orange50: string;
        orange100: string;
        orange200: string;
        orange300: string;
        orange400: string;
        orange500: string;
        orange600: string;
        orange700: string;
        orange800: string;
        orange900: string;
        orangeA100: string;
        orangeA200: string;
        orangeA400: string;
        orangeA700: string;

        deepOrange50: string;
        deepOrange100: string;
        deepOrange200: string;
        deepOrange300: string;
        deepOrange400: string;
        deepOrange500: string;
        deepOrange600: string;
        deepOrange700: string;
        deepOrange800: string;
        deepOrange900: string;
        deepOrangeA100: string;
        deepOrangeA200: string;
        deepOrangeA400: string;
        deepOrangeA700: string;

        brown50: string;
        brown100: string;
        brown200: string;
        brown300: string;
        brown400: string;
        brown500: string;
        brown600: string;
        brown700: string;
        brown800: string;
        brown900: string;

        blueGrey50: string;
        blueGrey100: string;
        blueGrey200: string;
        blueGrey300: string;
        blueGrey400: string;
        blueGrey500: string;
        blueGrey600: string;
        blueGrey700: string;
        blueGrey800: string;
        blueGrey900: string;

        grey50: string;
        grey100: string;
        grey200: string;
        grey300: string;
        grey400: string;
        grey500: string;
        grey600: string;
        grey700: string;
        grey800: string;
        grey900: string;

        black: string;
        white: string;

        transparent: string;
        fullBlack: string;
        darkBlack: string;
        lightBlack: string;
        minBlack: string;
        faintBlack: string;
        fullWhite: string;
        darkWhite: string;
        lightWhite: string;
    }
    export var Colors: Colors;
}

declare module "material-ui/lib/svg-icons" {
    export var ActionAccessibility: typeof __MaterialUI.SvgIcon;
    export var ActionAccessible: typeof __MaterialUI.SvgIcon;
    export var ActionAccountBalanceWallet: typeof __MaterialUI.SvgIcon;
    export var ActionAccountBalance: typeof __MaterialUI.SvgIcon;
    export var ActionAccountBox: typeof __MaterialUI.SvgIcon;
    export var ActionAccountCircle: typeof __MaterialUI.SvgIcon;
    export var ActionAddShoppingCart: typeof __MaterialUI.SvgIcon;
    export var ActionAlarmAdd: typeof __MaterialUI.SvgIcon;
    export var ActionAlarmOff: typeof __MaterialUI.SvgIcon;
    export var ActionAlarmOn: typeof __MaterialUI.SvgIcon;
    export var ActionAlarm: typeof __MaterialUI.SvgIcon;
    export var ActionAllOut: typeof __MaterialUI.SvgIcon;
    export var ActionAndroid: typeof __MaterialUI.SvgIcon;
    export var ActionAnnouncement: typeof __MaterialUI.SvgIcon;
    export var ActionAspectRatio: typeof __MaterialUI.SvgIcon;
    export var ActionAssessment: typeof __MaterialUI.SvgIcon;
    export var ActionAssignmentInd: typeof __MaterialUI.SvgIcon;
    export var ActionAssignmentLate: typeof __MaterialUI.SvgIcon;
    export var ActionAssignmentReturn: typeof __MaterialUI.SvgIcon;
    export var ActionAssignmentReturned: typeof __MaterialUI.SvgIcon;
    export var ActionAssignmentTurnedIn: typeof __MaterialUI.SvgIcon;
    export var ActionAssignment: typeof __MaterialUI.SvgIcon;
    export var ActionAutorenew: typeof __MaterialUI.SvgIcon;
    export var ActionBackup: typeof __MaterialUI.SvgIcon;
    export var ActionBook: typeof __MaterialUI.SvgIcon;
    export var ActionBookmarkBorder: typeof __MaterialUI.SvgIcon;
    export var ActionBookmark: typeof __MaterialUI.SvgIcon;
    export var ActionBugReport: typeof __MaterialUI.SvgIcon;
    export var ActionBuild: typeof __MaterialUI.SvgIcon;
    export var ActionCached: typeof __MaterialUI.SvgIcon;
    export var ActionCameraEnhance: typeof __MaterialUI.SvgIcon;
    export var ActionCardGiftcard: typeof __MaterialUI.SvgIcon;
    export var ActionCardMembership: typeof __MaterialUI.SvgIcon;
    export var ActionCardTravel: typeof __MaterialUI.SvgIcon;
    export var ActionChangeHistory: typeof __MaterialUI.SvgIcon;
    export var ActionCheckCircle: typeof __MaterialUI.SvgIcon;
    export var ActionChromeReaderMode: typeof __MaterialUI.SvgIcon;
    export var ActionClass: typeof __MaterialUI.SvgIcon;
    export var ActionCode: typeof __MaterialUI.SvgIcon;
    export var ActionCompareArrows: typeof __MaterialUI.SvgIcon;
    export var ActionCopyright: typeof __MaterialUI.SvgIcon;
    export var ActionCreditCard: typeof __MaterialUI.SvgIcon;
    export var ActionDashboard: typeof __MaterialUI.SvgIcon;
    export var ActionDateRange: typeof __MaterialUI.SvgIcon;
    export var ActionDelete: typeof __MaterialUI.SvgIcon;
    export var ActionDescription: typeof __MaterialUI.SvgIcon;
    export var ActionDns: typeof __MaterialUI.SvgIcon;
    export var ActionDoneAll: typeof __MaterialUI.SvgIcon;
    export var ActionDone: typeof __MaterialUI.SvgIcon;
    export var ActionDonutLarge: typeof __MaterialUI.SvgIcon;
    export var ActionDonutSmall: typeof __MaterialUI.SvgIcon;
    export var ActionEject: typeof __MaterialUI.SvgIcon;
    export var ActionEventSeat: typeof __MaterialUI.SvgIcon;
    export var ActionEvent: typeof __MaterialUI.SvgIcon;
    export var ActionExitToApp: typeof __MaterialUI.SvgIcon;
    export var ActionExplore: typeof __MaterialUI.SvgIcon;
    export var ActionExtension: typeof __MaterialUI.SvgIcon;
    export var ActionFace: typeof __MaterialUI.SvgIcon;
    export var ActionFavoriteBorder: typeof __MaterialUI.SvgIcon;
    export var ActionFavorite: typeof __MaterialUI.SvgIcon;
    export var ActionFeedback: typeof __MaterialUI.SvgIcon;
    export var ActionFindInPage: typeof __MaterialUI.SvgIcon;
    export var ActionFindReplace: typeof __MaterialUI.SvgIcon;
    export var ActionFingerprint: typeof __MaterialUI.SvgIcon;
    export var ActionFlightLand: typeof __MaterialUI.SvgIcon;
    export var ActionFlightTakeoff: typeof __MaterialUI.SvgIcon;
    export var ActionFlipToBack: typeof __MaterialUI.SvgIcon;
    export var ActionFlipToFront: typeof __MaterialUI.SvgIcon;
    export var ActionGavel: typeof __MaterialUI.SvgIcon;
    export var ActionGetApp: typeof __MaterialUI.SvgIcon;
    export var ActionGif: typeof __MaterialUI.SvgIcon;
    export var ActionGrade: typeof __MaterialUI.SvgIcon;
    export var ActionGroupWork: typeof __MaterialUI.SvgIcon;
    export var ActionHelpOutline: typeof __MaterialUI.SvgIcon;
    export var ActionHelp: typeof __MaterialUI.SvgIcon;
    export var ActionHighlightOff: typeof __MaterialUI.SvgIcon;
    export var ActionHistory: typeof __MaterialUI.SvgIcon;
    export var ActionHome: typeof __MaterialUI.SvgIcon;
    export var ActionHourglassEmpty: typeof __MaterialUI.SvgIcon;
    export var ActionHourglassFull: typeof __MaterialUI.SvgIcon;
    export var ActionHttp: typeof __MaterialUI.SvgIcon;
    export var ActionHttps: typeof __MaterialUI.SvgIcon;
    export var ActionImportantDevices: typeof __MaterialUI.SvgIcon;
    export var ActionInfoOutline: typeof __MaterialUI.SvgIcon;
    export var ActionInfo: typeof __MaterialUI.SvgIcon;
    export var ActionInput: typeof __MaterialUI.SvgIcon;
    export var ActionInvertColors: typeof __MaterialUI.SvgIcon;
    export var ActionLabelOutline: typeof __MaterialUI.SvgIcon;
    export var ActionLabel: typeof __MaterialUI.SvgIcon;
    export var ActionLanguage: typeof __MaterialUI.SvgIcon;
    export var ActionLaunch: typeof __MaterialUI.SvgIcon;
    export var ActionLightbulbOutline: typeof __MaterialUI.SvgIcon;
    export var ActionLineStyle: typeof __MaterialUI.SvgIcon;
    export var ActionLineWeight: typeof __MaterialUI.SvgIcon;
    export var ActionList: typeof __MaterialUI.SvgIcon;
    export var ActionLockOpen: typeof __MaterialUI.SvgIcon;
    export var ActionLockOutline: typeof __MaterialUI.SvgIcon;
    export var ActionLock: typeof __MaterialUI.SvgIcon;
    export var ActionLoyalty: typeof __MaterialUI.SvgIcon;
    export var ActionMarkunreadMailbox: typeof __MaterialUI.SvgIcon;
    export var ActionMotorcycle: typeof __MaterialUI.SvgIcon;
    export var ActionNoteAdd: typeof __MaterialUI.SvgIcon;
    export var ActionOfflinePin: typeof __MaterialUI.SvgIcon;
    export var ActionOpacity: typeof __MaterialUI.SvgIcon;
    export var ActionOpenInBrowser: typeof __MaterialUI.SvgIcon;
    export var ActionOpenInNew: typeof __MaterialUI.SvgIcon;
    export var ActionOpenWith: typeof __MaterialUI.SvgIcon;
    export var ActionPageview: typeof __MaterialUI.SvgIcon;
    export var ActionPanTool: typeof __MaterialUI.SvgIcon;
    export var ActionPayment: typeof __MaterialUI.SvgIcon;
    export var ActionPermCameraMic: typeof __MaterialUI.SvgIcon;
    export var ActionPermContactCalendar: typeof __MaterialUI.SvgIcon;
    export var ActionPermDataSetting: typeof __MaterialUI.SvgIcon;
    export var ActionPermDeviceInformation: typeof __MaterialUI.SvgIcon;
    export var ActionPermIdentity: typeof __MaterialUI.SvgIcon;
    export var ActionPermMedia: typeof __MaterialUI.SvgIcon;
    export var ActionPermPhoneMsg: typeof __MaterialUI.SvgIcon;
    export var ActionPermScanWifi: typeof __MaterialUI.SvgIcon;
    export var ActionPets: typeof __MaterialUI.SvgIcon;
    export var ActionPictureInPictureAlt: typeof __MaterialUI.SvgIcon;
    export var ActionPictureInPicture: typeof __MaterialUI.SvgIcon;
    export var ActionPlayForWork: typeof __MaterialUI.SvgIcon;
    export var ActionPolymer: typeof __MaterialUI.SvgIcon;
    export var ActionPowerSettingsNew: typeof __MaterialUI.SvgIcon;
    export var ActionPregnantWoman: typeof __MaterialUI.SvgIcon;
    export var ActionPrint: typeof __MaterialUI.SvgIcon;
    export var ActionQueryBuilder: typeof __MaterialUI.SvgIcon;
    export var ActionQuestionAnswer: typeof __MaterialUI.SvgIcon;
    export var ActionReceipt: typeof __MaterialUI.SvgIcon;
    export var ActionRecordVoiceOver: typeof __MaterialUI.SvgIcon;
    export var ActionRedeem: typeof __MaterialUI.SvgIcon;
    export var ActionReorder: typeof __MaterialUI.SvgIcon;
    export var ActionReportProblem: typeof __MaterialUI.SvgIcon;
    export var ActionRestore: typeof __MaterialUI.SvgIcon;
    export var ActionRoom: typeof __MaterialUI.SvgIcon;
    export var ActionRoundedCorner: typeof __MaterialUI.SvgIcon;
    export var ActionRowing: typeof __MaterialUI.SvgIcon;
    export var ActionSchedule: typeof __MaterialUI.SvgIcon;
    export var ActionSearch: typeof __MaterialUI.SvgIcon;
    export var ActionSettingsApplications: typeof __MaterialUI.SvgIcon;
    export var ActionSettingsBackupRestore: typeof __MaterialUI.SvgIcon;
    export var ActionSettingsBluetooth: typeof __MaterialUI.SvgIcon;
    export var ActionSettingsBrightness: typeof __MaterialUI.SvgIcon;
    export var ActionSettingsCell: typeof __MaterialUI.SvgIcon;
    export var ActionSettingsEthernet: typeof __MaterialUI.SvgIcon;
    export var ActionSettingsInputAntenna: typeof __MaterialUI.SvgIcon;
    export var ActionSettingsInputComponent: typeof __MaterialUI.SvgIcon;
    export var ActionSettingsInputComposite: typeof __MaterialUI.SvgIcon;
    export var ActionSettingsInputHdmi: typeof __MaterialUI.SvgIcon;
    export var ActionSettingsInputSvideo: typeof __MaterialUI.SvgIcon;
    export var ActionSettingsOverscan: typeof __MaterialUI.SvgIcon;
    export var ActionSettingsPhone: typeof __MaterialUI.SvgIcon;
    export var ActionSettingsPower: typeof __MaterialUI.SvgIcon;
    export var ActionSettingsRemote: typeof __MaterialUI.SvgIcon;
    export var ActionSettingsVoice: typeof __MaterialUI.SvgIcon;
    export var ActionSettings: typeof __MaterialUI.SvgIcon;
    export var ActionShopTwo: typeof __MaterialUI.SvgIcon;
    export var ActionShop: typeof __MaterialUI.SvgIcon;
    export var ActionShoppingBasket: typeof __MaterialUI.SvgIcon;
    export var ActionShoppingCart: typeof __MaterialUI.SvgIcon;
    export var ActionSpeakerNotes: typeof __MaterialUI.SvgIcon;
    export var ActionSpellcheck: typeof __MaterialUI.SvgIcon;
    export var ActionStars: typeof __MaterialUI.SvgIcon;
    export var ActionStore: typeof __MaterialUI.SvgIcon;
    export var ActionSubject: typeof __MaterialUI.SvgIcon;
    export var ActionSupervisorAccount: typeof __MaterialUI.SvgIcon;
    export var ActionSwapHoriz: typeof __MaterialUI.SvgIcon;
    export var ActionSwapVert: typeof __MaterialUI.SvgIcon;
    export var ActionSwapVerticalCircle: typeof __MaterialUI.SvgIcon;
    export var ActionSystemUpdateAlt: typeof __MaterialUI.SvgIcon;
    export var ActionTabUnselected: typeof __MaterialUI.SvgIcon;
    export var ActionTab: typeof __MaterialUI.SvgIcon;
    export var ActionTheaters: typeof __MaterialUI.SvgIcon;
    export var ActionThreeDRotation: typeof __MaterialUI.SvgIcon;
    export var ActionThumbDown: typeof __MaterialUI.SvgIcon;
    export var ActionThumbUp: typeof __MaterialUI.SvgIcon;
    export var ActionThumbsUpDown: typeof __MaterialUI.SvgIcon;
    export var ActionTimeline: typeof __MaterialUI.SvgIcon;
    export var ActionToc: typeof __MaterialUI.SvgIcon;
    export var ActionToday: typeof __MaterialUI.SvgIcon;
    export var ActionToll: typeof __MaterialUI.SvgIcon;
    export var ActionTouchApp: typeof __MaterialUI.SvgIcon;
    export var ActionTrackChanges: typeof __MaterialUI.SvgIcon;
    export var ActionTranslate: typeof __MaterialUI.SvgIcon;
    export var ActionTrendingDown: typeof __MaterialUI.SvgIcon;
    export var ActionTrendingFlat: typeof __MaterialUI.SvgIcon;
    export var ActionTrendingUp: typeof __MaterialUI.SvgIcon;
    export var ActionTurnedInNot: typeof __MaterialUI.SvgIcon;
    export var ActionTurnedIn: typeof __MaterialUI.SvgIcon;
    export var ActionUpdate: typeof __MaterialUI.SvgIcon;
    export var ActionVerifiedUser: typeof __MaterialUI.SvgIcon;
    export var ActionViewAgenda: typeof __MaterialUI.SvgIcon;
    export var ActionViewArray: typeof __MaterialUI.SvgIcon;
    export var ActionViewCarousel: typeof __MaterialUI.SvgIcon;
    export var ActionViewColumn: typeof __MaterialUI.SvgIcon;
    export var ActionViewDay: typeof __MaterialUI.SvgIcon;
    export var ActionViewHeadline: typeof __MaterialUI.SvgIcon;
    export var ActionViewList: typeof __MaterialUI.SvgIcon;
    export var ActionViewModule: typeof __MaterialUI.SvgIcon;
    export var ActionViewQuilt: typeof __MaterialUI.SvgIcon;
    export var ActionViewStream: typeof __MaterialUI.SvgIcon;
    export var ActionViewWeek: typeof __MaterialUI.SvgIcon;
    export var ActionVisibilityOff: typeof __MaterialUI.SvgIcon;
    export var ActionVisibility: typeof __MaterialUI.SvgIcon;
    export var ActionWatchLater: typeof __MaterialUI.SvgIcon;
    export var ActionWork: typeof __MaterialUI.SvgIcon;
    export var ActionYoutubeSearchedFor: typeof __MaterialUI.SvgIcon;
    export var ActionZoomIn: typeof __MaterialUI.SvgIcon;
    export var ActionZoomOut: typeof __MaterialUI.SvgIcon;
    export var AlertAddAlert: typeof __MaterialUI.SvgIcon;
    export var AlertErrorOutline: typeof __MaterialUI.SvgIcon;
    export var AlertError: typeof __MaterialUI.SvgIcon;
    export var AlertWarning: typeof __MaterialUI.SvgIcon;
    export var AvAddToQueue: typeof __MaterialUI.SvgIcon;
    export var AvAirplay: typeof __MaterialUI.SvgIcon;
    export var AvAlbum: typeof __MaterialUI.SvgIcon;
    export var AvArtTrack: typeof __MaterialUI.SvgIcon;
    export var AvAvTimer: typeof __MaterialUI.SvgIcon;
    export var AvClosedCaption: typeof __MaterialUI.SvgIcon;
    export var AvEqualizer: typeof __MaterialUI.SvgIcon;
    export var AvExplicit: typeof __MaterialUI.SvgIcon;
    export var AvFastForward: typeof __MaterialUI.SvgIcon;
    export var AvFastRewind: typeof __MaterialUI.SvgIcon;
    export var AvFiberDvr: typeof __MaterialUI.SvgIcon;
    export var AvFiberManualRecord: typeof __MaterialUI.SvgIcon;
    export var AvFiberNew: typeof __MaterialUI.SvgIcon;
    export var AvFiberPin: typeof __MaterialUI.SvgIcon;
    export var AvFiberSmartRecord: typeof __MaterialUI.SvgIcon;
    export var AvForward10: typeof __MaterialUI.SvgIcon;
    export var AvForward30: typeof __MaterialUI.SvgIcon;
    export var AvForward5: typeof __MaterialUI.SvgIcon;
    export var AvGames: typeof __MaterialUI.SvgIcon;
    export var AvHd: typeof __MaterialUI.SvgIcon;
    export var AvHearing: typeof __MaterialUI.SvgIcon;
    export var AvHighQuality: typeof __MaterialUI.SvgIcon;
    export var AvLibraryAdd: typeof __MaterialUI.SvgIcon;
    export var AvLibraryBooks: typeof __MaterialUI.SvgIcon;
    export var AvLibraryMusic: typeof __MaterialUI.SvgIcon;
    export var AvLoop: typeof __MaterialUI.SvgIcon;
    export var AvMicNone: typeof __MaterialUI.SvgIcon;
    export var AvMicOff: typeof __MaterialUI.SvgIcon;
    export var AvMic: typeof __MaterialUI.SvgIcon;
    export var AvMovie: typeof __MaterialUI.SvgIcon;
    export var AvMusicVideo: typeof __MaterialUI.SvgIcon;
    export var AvNewReleases: typeof __MaterialUI.SvgIcon;
    export var AvNotInterested: typeof __MaterialUI.SvgIcon;
    export var AvPauseCircleFilled: typeof __MaterialUI.SvgIcon;
    export var AvPauseCircleOutline: typeof __MaterialUI.SvgIcon;
    export var AvPause: typeof __MaterialUI.SvgIcon;
    export var AvPlayArrow: typeof __MaterialUI.SvgIcon;
    export var AvPlayCircleFilled: typeof __MaterialUI.SvgIcon;
    export var AvPlayCircleOutline: typeof __MaterialUI.SvgIcon;
    export var AvPlaylistAddCheck: typeof __MaterialUI.SvgIcon;
    export var AvPlaylistAdd: typeof __MaterialUI.SvgIcon;
    export var AvPlaylistPlay: typeof __MaterialUI.SvgIcon;
    export var AvQueueMusic: typeof __MaterialUI.SvgIcon;
    export var AvQueuePlayNext: typeof __MaterialUI.SvgIcon;
    export var AvQueue: typeof __MaterialUI.SvgIcon;
    export var AvRadio: typeof __MaterialUI.SvgIcon;
    export var AvRecentActors: typeof __MaterialUI.SvgIcon;
    export var AvRemoveFromQueue: typeof __MaterialUI.SvgIcon;
    export var AvRepeatOne: typeof __MaterialUI.SvgIcon;
    export var AvRepeat: typeof __MaterialUI.SvgIcon;
    export var AvReplay10: typeof __MaterialUI.SvgIcon;
    export var AvReplay30: typeof __MaterialUI.SvgIcon;
    export var AvReplay5: typeof __MaterialUI.SvgIcon;
    export var AvReplay: typeof __MaterialUI.SvgIcon;
    export var AvShuffle: typeof __MaterialUI.SvgIcon;
    export var AvSkipNext: typeof __MaterialUI.SvgIcon;
    export var AvSkipPrevious: typeof __MaterialUI.SvgIcon;
    export var AvSlowMotionVideo: typeof __MaterialUI.SvgIcon;
    export var AvSnooze: typeof __MaterialUI.SvgIcon;
    export var AvSortByAlpha: typeof __MaterialUI.SvgIcon;
    export var AvStop: typeof __MaterialUI.SvgIcon;
    export var AvSubscriptions: typeof __MaterialUI.SvgIcon;
    export var AvSubtitles: typeof __MaterialUI.SvgIcon;
    export var AvSurroundSound: typeof __MaterialUI.SvgIcon;
    export var AvVideoLibrary: typeof __MaterialUI.SvgIcon;
    export var AvVideocamOff: typeof __MaterialUI.SvgIcon;
    export var AvVideocam: typeof __MaterialUI.SvgIcon;
    export var AvVolumeDown: typeof __MaterialUI.SvgIcon;
    export var AvVolumeMute: typeof __MaterialUI.SvgIcon;
    export var AvVolumeOff: typeof __MaterialUI.SvgIcon;
    export var AvVolumeUp: typeof __MaterialUI.SvgIcon;
    export var AvWebAsset: typeof __MaterialUI.SvgIcon;
    export var AvWeb: typeof __MaterialUI.SvgIcon;
    export var CommunicationBusiness: typeof __MaterialUI.SvgIcon;
    export var CommunicationCallEnd: typeof __MaterialUI.SvgIcon;
    export var CommunicationCallMade: typeof __MaterialUI.SvgIcon;
    export var CommunicationCallMerge: typeof __MaterialUI.SvgIcon;
    export var CommunicationCallMissedOutgoing: typeof __MaterialUI.SvgIcon;
    export var CommunicationCallMissed: typeof __MaterialUI.SvgIcon;
    export var CommunicationCallReceived: typeof __MaterialUI.SvgIcon;
    export var CommunicationCallSplit: typeof __MaterialUI.SvgIcon;
    export var CommunicationCall: typeof __MaterialUI.SvgIcon;
    export var CommunicationChatBubbleOutline: typeof __MaterialUI.SvgIcon;
    export var CommunicationChatBubble: typeof __MaterialUI.SvgIcon;
    export var CommunicationChat: typeof __MaterialUI.SvgIcon;
    export var CommunicationClearAll: typeof __MaterialUI.SvgIcon;
    export var CommunicationComment: typeof __MaterialUI.SvgIcon;
    export var CommunicationContactMail: typeof __MaterialUI.SvgIcon;
    export var CommunicationContactPhone: typeof __MaterialUI.SvgIcon;
    export var CommunicationContacts: typeof __MaterialUI.SvgIcon;
    export var CommunicationDialerSip: typeof __MaterialUI.SvgIcon;
    export var CommunicationDialpad: typeof __MaterialUI.SvgIcon;
    export var CommunicationEmail: typeof __MaterialUI.SvgIcon;
    export var CommunicationForum: typeof __MaterialUI.SvgIcon;
    export var CommunicationImportContacts: typeof __MaterialUI.SvgIcon;
    export var CommunicationImportExport: typeof __MaterialUI.SvgIcon;
    export var CommunicationInvertColorsOff: typeof __MaterialUI.SvgIcon;
    export var CommunicationLiveHelp: typeof __MaterialUI.SvgIcon;
    export var CommunicationLocationOff: typeof __MaterialUI.SvgIcon;
    export var CommunicationLocationOn: typeof __MaterialUI.SvgIcon;
    export var CommunicationMailOutline: typeof __MaterialUI.SvgIcon;
    export var CommunicationMessage: typeof __MaterialUI.SvgIcon;
    export var CommunicationNoSim: typeof __MaterialUI.SvgIcon;
    export var CommunicationPhone: typeof __MaterialUI.SvgIcon;
    export var CommunicationPhonelinkErase: typeof __MaterialUI.SvgIcon;
    export var CommunicationPhonelinkLock: typeof __MaterialUI.SvgIcon;
    export var CommunicationPhonelinkRing: typeof __MaterialUI.SvgIcon;
    export var CommunicationPhonelinkSetup: typeof __MaterialUI.SvgIcon;
    export var CommunicationPortableWifiOff: typeof __MaterialUI.SvgIcon;
    export var CommunicationPresentToAll: typeof __MaterialUI.SvgIcon;
    export var CommunicationRingVolume: typeof __MaterialUI.SvgIcon;
    export var CommunicationScreenShare: typeof __MaterialUI.SvgIcon;
    export var CommunicationSpeakerPhone: typeof __MaterialUI.SvgIcon;
    export var CommunicationStayCurrentLandscape: typeof __MaterialUI.SvgIcon;
    export var CommunicationStayCurrentPortrait: typeof __MaterialUI.SvgIcon;
    export var CommunicationStayPrimaryLandscape: typeof __MaterialUI.SvgIcon;
    export var CommunicationStayPrimaryPortrait: typeof __MaterialUI.SvgIcon;
    export var CommunicationStopScreenShare: typeof __MaterialUI.SvgIcon;
    export var CommunicationSwapCalls: typeof __MaterialUI.SvgIcon;
    export var CommunicationTextsms: typeof __MaterialUI.SvgIcon;
    export var CommunicationVoicemail: typeof __MaterialUI.SvgIcon;
    export var CommunicationVpnKey: typeof __MaterialUI.SvgIcon;
    export var ContentAddBox: typeof __MaterialUI.SvgIcon;
    export var ContentAddCircleOutline: typeof __MaterialUI.SvgIcon;
    export var ContentAddCircle: typeof __MaterialUI.SvgIcon;
    export var ContentAdd: typeof __MaterialUI.SvgIcon;
    export var ContentArchive: typeof __MaterialUI.SvgIcon;
    export var ContentBackspace: typeof __MaterialUI.SvgIcon;
    export var ContentBlock: typeof __MaterialUI.SvgIcon;
    export var ContentClear: typeof __MaterialUI.SvgIcon;
    export var ContentContentCopy: typeof __MaterialUI.SvgIcon;
    export var ContentContentCut: typeof __MaterialUI.SvgIcon;
    export var ContentContentPaste: typeof __MaterialUI.SvgIcon;
    export var ContentCreate: typeof __MaterialUI.SvgIcon;
    export var ContentDrafts: typeof __MaterialUI.SvgIcon;
    export var ContentFilterList: typeof __MaterialUI.SvgIcon;
    export var ContentFlag: typeof __MaterialUI.SvgIcon;
    export var ContentFontDownload: typeof __MaterialUI.SvgIcon;
    export var ContentForward: typeof __MaterialUI.SvgIcon;
    export var ContentGesture: typeof __MaterialUI.SvgIcon;
    export var ContentInbox: typeof __MaterialUI.SvgIcon;
    export var ContentLink: typeof __MaterialUI.SvgIcon;
    export var ContentMail: typeof __MaterialUI.SvgIcon;
    export var ContentMarkunread: typeof __MaterialUI.SvgIcon;
    export var ContentMoveToInbox: typeof __MaterialUI.SvgIcon;
    export var ContentNextWeek: typeof __MaterialUI.SvgIcon;
    export var ContentRedo: typeof __MaterialUI.SvgIcon;
    export var ContentRemoveCircleOutline: typeof __MaterialUI.SvgIcon;
    export var ContentRemoveCircle: typeof __MaterialUI.SvgIcon;
    export var ContentRemove: typeof __MaterialUI.SvgIcon;
    export var ContentReplyAll: typeof __MaterialUI.SvgIcon;
    export var ContentReply: typeof __MaterialUI.SvgIcon;
    export var ContentReport: typeof __MaterialUI.SvgIcon;
    export var ContentSave: typeof __MaterialUI.SvgIcon;
    export var ContentSelectAll: typeof __MaterialUI.SvgIcon;
    export var ContentSend: typeof __MaterialUI.SvgIcon;
    export var ContentSort: typeof __MaterialUI.SvgIcon;
    export var ContentTextFormat: typeof __MaterialUI.SvgIcon;
    export var ContentUnarchive: typeof __MaterialUI.SvgIcon;
    export var ContentUndo: typeof __MaterialUI.SvgIcon;
    export var ContentWeekend: typeof __MaterialUI.SvgIcon;
    export var DeviceAccessAlarm: typeof __MaterialUI.SvgIcon;
    export var DeviceAccessAlarms: typeof __MaterialUI.SvgIcon;
    export var DeviceAccessTime: typeof __MaterialUI.SvgIcon;
    export var DeviceAddAlarm: typeof __MaterialUI.SvgIcon;
    export var DeviceAirplanemodeActive: typeof __MaterialUI.SvgIcon;
    export var DeviceAirplanemodeInactive: typeof __MaterialUI.SvgIcon;
    export var DeviceBattery20: typeof __MaterialUI.SvgIcon;
    export var DeviceBattery30: typeof __MaterialUI.SvgIcon;
    export var DeviceBattery50: typeof __MaterialUI.SvgIcon;
    export var DeviceBattery60: typeof __MaterialUI.SvgIcon;
    export var DeviceBattery80: typeof __MaterialUI.SvgIcon;
    export var DeviceBattery90: typeof __MaterialUI.SvgIcon;
    export var DeviceBatteryAlert: typeof __MaterialUI.SvgIcon;
    export var DeviceBatteryCharging20: typeof __MaterialUI.SvgIcon;
    export var DeviceBatteryCharging30: typeof __MaterialUI.SvgIcon;
    export var DeviceBatteryCharging50: typeof __MaterialUI.SvgIcon;
    export var DeviceBatteryCharging60: typeof __MaterialUI.SvgIcon;
    export var DeviceBatteryCharging80: typeof __MaterialUI.SvgIcon;
    export var DeviceBatteryCharging90: typeof __MaterialUI.SvgIcon;
    export var DeviceBatteryChargingFull: typeof __MaterialUI.SvgIcon;
    export var DeviceBatteryFull: typeof __MaterialUI.SvgIcon;
    export var DeviceBatteryStd: typeof __MaterialUI.SvgIcon;
    export var DeviceBatteryUnknown: typeof __MaterialUI.SvgIcon;
    export var DeviceBluetoothConnected: typeof __MaterialUI.SvgIcon;
    export var DeviceBluetoothDisabled: typeof __MaterialUI.SvgIcon;
    export var DeviceBluetoothSearching: typeof __MaterialUI.SvgIcon;
    export var DeviceBluetooth: typeof __MaterialUI.SvgIcon;
    export var DeviceBrightnessAuto: typeof __MaterialUI.SvgIcon;
    export var DeviceBrightnessHigh: typeof __MaterialUI.SvgIcon;
    export var DeviceBrightnessLow: typeof __MaterialUI.SvgIcon;
    export var DeviceBrightnessMedium: typeof __MaterialUI.SvgIcon;
    export var DeviceDataUsage: typeof __MaterialUI.SvgIcon;
    export var DeviceDeveloperMode: typeof __MaterialUI.SvgIcon;
    export var DeviceDevices: typeof __MaterialUI.SvgIcon;
    export var DeviceDvr: typeof __MaterialUI.SvgIcon;
    export var DeviceGpsFixed: typeof __MaterialUI.SvgIcon;
    export var DeviceGpsNotFixed: typeof __MaterialUI.SvgIcon;
    export var DeviceGpsOff: typeof __MaterialUI.SvgIcon;
    export var DeviceGraphicEq: typeof __MaterialUI.SvgIcon;
    export var DeviceLocationDisabled: typeof __MaterialUI.SvgIcon;
    export var DeviceLocationSearching: typeof __MaterialUI.SvgIcon;
    export var DeviceNetworkCell: typeof __MaterialUI.SvgIcon;
    export var DeviceNetworkWifi: typeof __MaterialUI.SvgIcon;
    export var DeviceNfc: typeof __MaterialUI.SvgIcon;
    export var DeviceScreenLockLandscape: typeof __MaterialUI.SvgIcon;
    export var DeviceScreenLockPortrait: typeof __MaterialUI.SvgIcon;
    export var DeviceScreenLockRotation: typeof __MaterialUI.SvgIcon;
    export var DeviceScreenRotation: typeof __MaterialUI.SvgIcon;
    export var DeviceSdStorage: typeof __MaterialUI.SvgIcon;
    export var DeviceSettingsSystemDaydream: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalCellular0Bar: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalCellular1Bar: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalCellular2Bar: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalCellular3Bar: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalCellular4Bar: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalCellularConnectedNoInternet0Bar: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalCellularConnectedNoInternet1Bar: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalCellularConnectedNoInternet2Bar: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalCellularConnectedNoInternet3Bar: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalCellularConnectedNoInternet4Bar: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalCellularNoSim: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalCellularNull: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalCellularOff: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalWifi0Bar: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalWifi1BarLock: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalWifi1Bar: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalWifi2BarLock: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalWifi2Bar: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalWifi3BarLock: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalWifi3Bar: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalWifi4BarLock: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalWifi4Bar: typeof __MaterialUI.SvgIcon;
    export var DeviceSignalWifiOff: typeof __MaterialUI.SvgIcon;
    export var DeviceStorage: typeof __MaterialUI.SvgIcon;
    export var DeviceUsb: typeof __MaterialUI.SvgIcon;
    export var DeviceWallpaper: typeof __MaterialUI.SvgIcon;
    export var DeviceWidgets: typeof __MaterialUI.SvgIcon;
    export var DeviceWifiLock: typeof __MaterialUI.SvgIcon;
    export var DeviceWifiTethering: typeof __MaterialUI.SvgIcon;
    export var EditorAttachFile: typeof __MaterialUI.SvgIcon;
    export var EditorAttachMoney: typeof __MaterialUI.SvgIcon;
    export var EditorBorderAll: typeof __MaterialUI.SvgIcon;
    export var EditorBorderBottom: typeof __MaterialUI.SvgIcon;
    export var EditorBorderClear: typeof __MaterialUI.SvgIcon;
    export var EditorBorderColor: typeof __MaterialUI.SvgIcon;
    export var EditorBorderHorizontal: typeof __MaterialUI.SvgIcon;
    export var EditorBorderInner: typeof __MaterialUI.SvgIcon;
    export var EditorBorderLeft: typeof __MaterialUI.SvgIcon;
    export var EditorBorderOuter: typeof __MaterialUI.SvgIcon;
    export var EditorBorderRight: typeof __MaterialUI.SvgIcon;
    export var EditorBorderStyle: typeof __MaterialUI.SvgIcon;
    export var EditorBorderTop: typeof __MaterialUI.SvgIcon;
    export var EditorBorderVertical: typeof __MaterialUI.SvgIcon;
    export var EditorDragHandle: typeof __MaterialUI.SvgIcon;
    export var EditorFormatAlignCenter: typeof __MaterialUI.SvgIcon;
    export var EditorFormatAlignJustify: typeof __MaterialUI.SvgIcon;
    export var EditorFormatAlignLeft: typeof __MaterialUI.SvgIcon;
    export var EditorFormatAlignRight: typeof __MaterialUI.SvgIcon;
    export var EditorFormatBold: typeof __MaterialUI.SvgIcon;
    export var EditorFormatClear: typeof __MaterialUI.SvgIcon;
    export var EditorFormatColorFill: typeof __MaterialUI.SvgIcon;
    export var EditorFormatColorReset: typeof __MaterialUI.SvgIcon;
    export var EditorFormatColorText: typeof __MaterialUI.SvgIcon;
    export var EditorFormatIndentDecrease: typeof __MaterialUI.SvgIcon;
    export var EditorFormatIndentIncrease: typeof __MaterialUI.SvgIcon;
    export var EditorFormatItalic: typeof __MaterialUI.SvgIcon;
    export var EditorFormatLineSpacing: typeof __MaterialUI.SvgIcon;
    export var EditorFormatListBulleted: typeof __MaterialUI.SvgIcon;
    export var EditorFormatListNumbered: typeof __MaterialUI.SvgIcon;
    export var EditorFormatPaint: typeof __MaterialUI.SvgIcon;
    export var EditorFormatQuote: typeof __MaterialUI.SvgIcon;
    export var EditorFormatShapes: typeof __MaterialUI.SvgIcon;
    export var EditorFormatSize: typeof __MaterialUI.SvgIcon;
    export var EditorFormatStrikethrough: typeof __MaterialUI.SvgIcon;
    export var EditorFormatTextdirectionLToR: typeof __MaterialUI.SvgIcon;
    export var EditorFormatTextdirectionRToL: typeof __MaterialUI.SvgIcon;
    export var EditorFormatUnderlined: typeof __MaterialUI.SvgIcon;
    export var EditorFunctions: typeof __MaterialUI.SvgIcon;
    export var EditorHighlight: typeof __MaterialUI.SvgIcon;
    export var EditorInsertChart: typeof __MaterialUI.SvgIcon;
    export var EditorInsertComment: typeof __MaterialUI.SvgIcon;
    export var EditorInsertDriveFile: typeof __MaterialUI.SvgIcon;
    export var EditorInsertEmoticon: typeof __MaterialUI.SvgIcon;
    export var EditorInsertInvitation: typeof __MaterialUI.SvgIcon;
    export var EditorInsertLink: typeof __MaterialUI.SvgIcon;
    export var EditorInsertPhoto: typeof __MaterialUI.SvgIcon;
    export var EditorLinearScale: typeof __MaterialUI.SvgIcon;
    export var EditorMergeType: typeof __MaterialUI.SvgIcon;
    export var EditorModeComment: typeof __MaterialUI.SvgIcon;
    export var EditorModeEdit: typeof __MaterialUI.SvgIcon;
    export var EditorMoneyOff: typeof __MaterialUI.SvgIcon;
    export var EditorPublish: typeof __MaterialUI.SvgIcon;
    export var EditorShortText: typeof __MaterialUI.SvgIcon;
    export var EditorSpaceBar: typeof __MaterialUI.SvgIcon;
    export var EditorStrikethroughS: typeof __MaterialUI.SvgIcon;
    export var EditorTextFields: typeof __MaterialUI.SvgIcon;
    export var EditorVerticalAlignBottom: typeof __MaterialUI.SvgIcon;
    export var EditorVerticalAlignCenter: typeof __MaterialUI.SvgIcon;
    export var EditorVerticalAlignTop: typeof __MaterialUI.SvgIcon;
    export var EditorWrapText: typeof __MaterialUI.SvgIcon;
    export var FileAttachment: typeof __MaterialUI.SvgIcon;
    export var FileCloudCircle: typeof __MaterialUI.SvgIcon;
    export var FileCloudDone: typeof __MaterialUI.SvgIcon;
    export var FileCloudDownload: typeof __MaterialUI.SvgIcon;
    export var FileCloudOff: typeof __MaterialUI.SvgIcon;
    export var FileCloudQueue: typeof __MaterialUI.SvgIcon;
    export var FileCloudUpload: typeof __MaterialUI.SvgIcon;
    export var FileCloud: typeof __MaterialUI.SvgIcon;
    export var FileCreateNewFolder: typeof __MaterialUI.SvgIcon;
    export var FileFileDownload: typeof __MaterialUI.SvgIcon;
    export var FileFileUpload: typeof __MaterialUI.SvgIcon;
    export var FileFolderOpen: typeof __MaterialUI.SvgIcon;
    export var FileFolderShared: typeof __MaterialUI.SvgIcon;
    export var FileFolder: typeof __MaterialUI.SvgIcon;
    export var HardwareCastConnected: typeof __MaterialUI.SvgIcon;
    export var HardwareCast: typeof __MaterialUI.SvgIcon;
    export var HardwareComputer: typeof __MaterialUI.SvgIcon;
    export var HardwareDesktopMac: typeof __MaterialUI.SvgIcon;
    export var HardwareDesktopWindows: typeof __MaterialUI.SvgIcon;
    export var HardwareDeveloperBoard: typeof __MaterialUI.SvgIcon;
    export var HardwareDeviceHub: typeof __MaterialUI.SvgIcon;
    export var HardwareDevicesOther: typeof __MaterialUI.SvgIcon;
    export var HardwareDock: typeof __MaterialUI.SvgIcon;
    export var HardwareGamepad: typeof __MaterialUI.SvgIcon;
    export var HardwareHeadsetMic: typeof __MaterialUI.SvgIcon;
    export var HardwareHeadset: typeof __MaterialUI.SvgIcon;
    export var HardwareKeyboardArrowDown: typeof __MaterialUI.SvgIcon;
    export var HardwareKeyboardArrowLeft: typeof __MaterialUI.SvgIcon;
    export var HardwareKeyboardArrowRight: typeof __MaterialUI.SvgIcon;
    export var HardwareKeyboardArrowUp: typeof __MaterialUI.SvgIcon;
    export var HardwareKeyboardBackspace: typeof __MaterialUI.SvgIcon;
    export var HardwareKeyboardCapslock: typeof __MaterialUI.SvgIcon;
    export var HardwareKeyboardHide: typeof __MaterialUI.SvgIcon;
    export var HardwareKeyboardReturn: typeof __MaterialUI.SvgIcon;
    export var HardwareKeyboardTab: typeof __MaterialUI.SvgIcon;
    export var HardwareKeyboardVoice: typeof __MaterialUI.SvgIcon;
    export var HardwareKeyboard: typeof __MaterialUI.SvgIcon;
    export var HardwareLaptopChromebook: typeof __MaterialUI.SvgIcon;
    export var HardwareLaptopMac: typeof __MaterialUI.SvgIcon;
    export var HardwareLaptopWindows: typeof __MaterialUI.SvgIcon;
    export var HardwareLaptop: typeof __MaterialUI.SvgIcon;
    export var HardwareMemory: typeof __MaterialUI.SvgIcon;
    export var HardwareMouse: typeof __MaterialUI.SvgIcon;
    export var HardwarePhoneAndroid: typeof __MaterialUI.SvgIcon;
    export var HardwarePhoneIphone: typeof __MaterialUI.SvgIcon;
    export var HardwarePhonelinkOff: typeof __MaterialUI.SvgIcon;
    export var HardwarePhonelink: typeof __MaterialUI.SvgIcon;
    export var HardwarePowerInput: typeof __MaterialUI.SvgIcon;
    export var HardwareRouter: typeof __MaterialUI.SvgIcon;
    export var HardwareScanner: typeof __MaterialUI.SvgIcon;
    export var HardwareSecurity: typeof __MaterialUI.SvgIcon;
    export var HardwareSimCard: typeof __MaterialUI.SvgIcon;
    export var HardwareSmartphone: typeof __MaterialUI.SvgIcon;
    export var HardwareSpeakerGroup: typeof __MaterialUI.SvgIcon;
    export var HardwareSpeaker: typeof __MaterialUI.SvgIcon;
    export var HardwareTabletAndroid: typeof __MaterialUI.SvgIcon;
    export var HardwareTabletMac: typeof __MaterialUI.SvgIcon;
    export var HardwareTablet: typeof __MaterialUI.SvgIcon;
    export var HardwareToys: typeof __MaterialUI.SvgIcon;
    export var HardwareTv: typeof __MaterialUI.SvgIcon;
    export var HardwareVideogameAsset: typeof __MaterialUI.SvgIcon;
    export var HardwareWatch: typeof __MaterialUI.SvgIcon;
    export var ImageAddAPhoto: typeof __MaterialUI.SvgIcon;
    export var ImageAddToPhotos: typeof __MaterialUI.SvgIcon;
    export var ImageAdjust: typeof __MaterialUI.SvgIcon;
    export var ImageAssistantPhoto: typeof __MaterialUI.SvgIcon;
    export var ImageAssistant: typeof __MaterialUI.SvgIcon;
    export var ImageAudiotrack: typeof __MaterialUI.SvgIcon;
    export var ImageBlurCircular: typeof __MaterialUI.SvgIcon;
    export var ImageBlurLinear: typeof __MaterialUI.SvgIcon;
    export var ImageBlurOff: typeof __MaterialUI.SvgIcon;
    export var ImageBlurOn: typeof __MaterialUI.SvgIcon;
    export var ImageBrightness1: typeof __MaterialUI.SvgIcon;
    export var ImageBrightness2: typeof __MaterialUI.SvgIcon;
    export var ImageBrightness3: typeof __MaterialUI.SvgIcon;
    export var ImageBrightness4: typeof __MaterialUI.SvgIcon;
    export var ImageBrightness5: typeof __MaterialUI.SvgIcon;
    export var ImageBrightness6: typeof __MaterialUI.SvgIcon;
    export var ImageBrightness7: typeof __MaterialUI.SvgIcon;
    export var ImageBrokenImage: typeof __MaterialUI.SvgIcon;
    export var ImageBrush: typeof __MaterialUI.SvgIcon;
    export var ImageCameraAlt: typeof __MaterialUI.SvgIcon;
    export var ImageCameraFront: typeof __MaterialUI.SvgIcon;
    export var ImageCameraRear: typeof __MaterialUI.SvgIcon;
    export var ImageCameraRoll: typeof __MaterialUI.SvgIcon;
    export var ImageCamera: typeof __MaterialUI.SvgIcon;
    export var ImageCenterFocusStrong: typeof __MaterialUI.SvgIcon;
    export var ImageCenterFocusWeak: typeof __MaterialUI.SvgIcon;
    export var ImageCollectionsBookmark: typeof __MaterialUI.SvgIcon;
    export var ImageCollections: typeof __MaterialUI.SvgIcon;
    export var ImageColorLens: typeof __MaterialUI.SvgIcon;
    export var ImageColorize: typeof __MaterialUI.SvgIcon;
    export var ImageCompare: typeof __MaterialUI.SvgIcon;
    export var ImageControlPointDuplicate: typeof __MaterialUI.SvgIcon;
    export var ImageControlPoint: typeof __MaterialUI.SvgIcon;
    export var ImageCrop169: typeof __MaterialUI.SvgIcon;
    export var ImageCrop32: typeof __MaterialUI.SvgIcon;
    export var ImageCrop54: typeof __MaterialUI.SvgIcon;
    export var ImageCrop75: typeof __MaterialUI.SvgIcon;
    export var ImageCropDin: typeof __MaterialUI.SvgIcon;
    export var ImageCropFree: typeof __MaterialUI.SvgIcon;
    export var ImageCropLandscape: typeof __MaterialUI.SvgIcon;
    export var ImageCropOriginal: typeof __MaterialUI.SvgIcon;
    export var ImageCropPortrait: typeof __MaterialUI.SvgIcon;
    export var ImageCropRotate: typeof __MaterialUI.SvgIcon;
    export var ImageCropSquare: typeof __MaterialUI.SvgIcon;
    export var ImageCrop: typeof __MaterialUI.SvgIcon;
    export var ImageDehaze: typeof __MaterialUI.SvgIcon;
    export var ImageDetails: typeof __MaterialUI.SvgIcon;
    export var ImageEdit: typeof __MaterialUI.SvgIcon;
    export var ImageExposureNeg1: typeof __MaterialUI.SvgIcon;
    export var ImageExposureNeg2: typeof __MaterialUI.SvgIcon;
    export var ImageExposurePlus1: typeof __MaterialUI.SvgIcon;
    export var ImageExposurePlus2: typeof __MaterialUI.SvgIcon;
    export var ImageExposureZero: typeof __MaterialUI.SvgIcon;
    export var ImageExposure: typeof __MaterialUI.SvgIcon;
    export var ImageFilter1: typeof __MaterialUI.SvgIcon;
    export var ImageFilter2: typeof __MaterialUI.SvgIcon;
    export var ImageFilter3: typeof __MaterialUI.SvgIcon;
    export var ImageFilter4: typeof __MaterialUI.SvgIcon;
    export var ImageFilter5: typeof __MaterialUI.SvgIcon;
    export var ImageFilter6: typeof __MaterialUI.SvgIcon;
    export var ImageFilter7: typeof __MaterialUI.SvgIcon;
    export var ImageFilter8: typeof __MaterialUI.SvgIcon;
    export var ImageFilter9Plus: typeof __MaterialUI.SvgIcon;
    export var ImageFilter9: typeof __MaterialUI.SvgIcon;
    export var ImageFilterBAndW: typeof __MaterialUI.SvgIcon;
    export var ImageFilterCenterFocus: typeof __MaterialUI.SvgIcon;
    export var ImageFilterDrama: typeof __MaterialUI.SvgIcon;
    export var ImageFilterFrames: typeof __MaterialUI.SvgIcon;
    export var ImageFilterHdr: typeof __MaterialUI.SvgIcon;
    export var ImageFilterNone: typeof __MaterialUI.SvgIcon;
    export var ImageFilterTiltShift: typeof __MaterialUI.SvgIcon;
    export var ImageFilterVintage: typeof __MaterialUI.SvgIcon;
    export var ImageFilter: typeof __MaterialUI.SvgIcon;
    export var ImageFlare: typeof __MaterialUI.SvgIcon;
    export var ImageFlashAuto: typeof __MaterialUI.SvgIcon;
    export var ImageFlashOff: typeof __MaterialUI.SvgIcon;
    export var ImageFlashOn: typeof __MaterialUI.SvgIcon;
    export var ImageFlip: typeof __MaterialUI.SvgIcon;
    export var ImageGradient: typeof __MaterialUI.SvgIcon;
    export var ImageGrain: typeof __MaterialUI.SvgIcon;
    export var ImageGridOff: typeof __MaterialUI.SvgIcon;
    export var ImageGridOn: typeof __MaterialUI.SvgIcon;
    export var ImageHdrOff: typeof __MaterialUI.SvgIcon;
    export var ImageHdrOn: typeof __MaterialUI.SvgIcon;
    export var ImageHdrStrong: typeof __MaterialUI.SvgIcon;
    export var ImageHdrWeak: typeof __MaterialUI.SvgIcon;
    export var ImageHealing: typeof __MaterialUI.SvgIcon;
    export var ImageImageAspectRatio: typeof __MaterialUI.SvgIcon;
    export var ImageImage: typeof __MaterialUI.SvgIcon;
    export var ImageIso: typeof __MaterialUI.SvgIcon;
    export var ImageLandscape: typeof __MaterialUI.SvgIcon;
    export var ImageLeakAdd: typeof __MaterialUI.SvgIcon;
    export var ImageLeakRemove: typeof __MaterialUI.SvgIcon;
    export var ImageLens: typeof __MaterialUI.SvgIcon;
    export var ImageLinkedCamera: typeof __MaterialUI.SvgIcon;
    export var ImageLooks3: typeof __MaterialUI.SvgIcon;
    export var ImageLooks4: typeof __MaterialUI.SvgIcon;
    export var ImageLooks5: typeof __MaterialUI.SvgIcon;
    export var ImageLooks6: typeof __MaterialUI.SvgIcon;
    export var ImageLooksOne: typeof __MaterialUI.SvgIcon;
    export var ImageLooksTwo: typeof __MaterialUI.SvgIcon;
    export var ImageLooks: typeof __MaterialUI.SvgIcon;
    export var ImageLoupe: typeof __MaterialUI.SvgIcon;
    export var ImageMonochromePhotos: typeof __MaterialUI.SvgIcon;
    export var ImageMovieCreation: typeof __MaterialUI.SvgIcon;
    export var ImageMovieFilter: typeof __MaterialUI.SvgIcon;
    export var ImageMusicNote: typeof __MaterialUI.SvgIcon;
    export var ImageNaturePeople: typeof __MaterialUI.SvgIcon;
    export var ImageNature: typeof __MaterialUI.SvgIcon;
    export var ImageNavigateBefore: typeof __MaterialUI.SvgIcon;
    export var ImageNavigateNext: typeof __MaterialUI.SvgIcon;
    export var ImagePalette: typeof __MaterialUI.SvgIcon;
    export var ImagePanoramaFishEye: typeof __MaterialUI.SvgIcon;
    export var ImagePanoramaHorizontal: typeof __MaterialUI.SvgIcon;
    export var ImagePanoramaVertical: typeof __MaterialUI.SvgIcon;
    export var ImagePanoramaWideAngle: typeof __MaterialUI.SvgIcon;
    export var ImagePanorama: typeof __MaterialUI.SvgIcon;
    export var ImagePhotoAlbum: typeof __MaterialUI.SvgIcon;
    export var ImagePhotoCamera: typeof __MaterialUI.SvgIcon;
    export var ImagePhotoFilter: typeof __MaterialUI.SvgIcon;
    export var ImagePhotoLibrary: typeof __MaterialUI.SvgIcon;
    export var ImagePhotoSizeSelectActual: typeof __MaterialUI.SvgIcon;
    export var ImagePhotoSizeSelectLarge: typeof __MaterialUI.SvgIcon;
    export var ImagePhotoSizeSelectSmall: typeof __MaterialUI.SvgIcon;
    export var ImagePhoto: typeof __MaterialUI.SvgIcon;
    export var ImagePictureAsPdf: typeof __MaterialUI.SvgIcon;
    export var ImagePortrait: typeof __MaterialUI.SvgIcon;
    export var ImageRemoveRedEye: typeof __MaterialUI.SvgIcon;
    export var ImageRotate90DegreesCcw: typeof __MaterialUI.SvgIcon;
    export var ImageRotateLeft: typeof __MaterialUI.SvgIcon;
    export var ImageRotateRight: typeof __MaterialUI.SvgIcon;
    export var ImageSlideshow: typeof __MaterialUI.SvgIcon;
    export var ImageStraighten: typeof __MaterialUI.SvgIcon;
    export var ImageStyle: typeof __MaterialUI.SvgIcon;
    export var ImageSwitchCamera: typeof __MaterialUI.SvgIcon;
    export var ImageSwitchVideo: typeof __MaterialUI.SvgIcon;
    export var ImageTagFaces: typeof __MaterialUI.SvgIcon;
    export var ImageTexture: typeof __MaterialUI.SvgIcon;
    export var ImageTimelapse: typeof __MaterialUI.SvgIcon;
    export var ImageTimer10: typeof __MaterialUI.SvgIcon;
    export var ImageTimer3: typeof __MaterialUI.SvgIcon;
    export var ImageTimerOff: typeof __MaterialUI.SvgIcon;
    export var ImageTimer: typeof __MaterialUI.SvgIcon;
    export var ImageTonality: typeof __MaterialUI.SvgIcon;
    export var ImageTransform: typeof __MaterialUI.SvgIcon;
    export var ImageTune: typeof __MaterialUI.SvgIcon;
    export var ImageViewComfy: typeof __MaterialUI.SvgIcon;
    export var ImageViewCompact: typeof __MaterialUI.SvgIcon;
    export var ImageVignette: typeof __MaterialUI.SvgIcon;
    export var ImageWbAuto: typeof __MaterialUI.SvgIcon;
    export var ImageWbCloudy: typeof __MaterialUI.SvgIcon;
    export var ImageWbIncandescent: typeof __MaterialUI.SvgIcon;
    export var ImageWbIridescent: typeof __MaterialUI.SvgIcon;
    export var ImageWbSunny: typeof __MaterialUI.SvgIcon;
    export var MapsAddLocation: typeof __MaterialUI.SvgIcon;
    export var MapsBeenhere: typeof __MaterialUI.SvgIcon;
    export var MapsDirectionsBike: typeof __MaterialUI.SvgIcon;
    export var MapsDirectionsBoat: typeof __MaterialUI.SvgIcon;
    export var MapsDirectionsBus: typeof __MaterialUI.SvgIcon;
    export var MapsDirectionsCar: typeof __MaterialUI.SvgIcon;
    export var MapsDirectionsRailway: typeof __MaterialUI.SvgIcon;
    export var MapsDirectionsRun: typeof __MaterialUI.SvgIcon;
    export var MapsDirectionsSubway: typeof __MaterialUI.SvgIcon;
    export var MapsDirectionsTransit: typeof __MaterialUI.SvgIcon;
    export var MapsDirectionsWalk: typeof __MaterialUI.SvgIcon;
    export var MapsDirections: typeof __MaterialUI.SvgIcon;
    export var MapsEditLocation: typeof __MaterialUI.SvgIcon;
    export var MapsFlight: typeof __MaterialUI.SvgIcon;
    export var MapsHotel: typeof __MaterialUI.SvgIcon;
    export var MapsLayersClear: typeof __MaterialUI.SvgIcon;
    export var MapsLayers: typeof __MaterialUI.SvgIcon;
    export var MapsLocalActivity: typeof __MaterialUI.SvgIcon;
    export var MapsLocalAirport: typeof __MaterialUI.SvgIcon;
    export var MapsLocalAtm: typeof __MaterialUI.SvgIcon;
    export var MapsLocalBar: typeof __MaterialUI.SvgIcon;
    export var MapsLocalCafe: typeof __MaterialUI.SvgIcon;
    export var MapsLocalCarWash: typeof __MaterialUI.SvgIcon;
    export var MapsLocalConvenienceStore: typeof __MaterialUI.SvgIcon;
    export var MapsLocalDining: typeof __MaterialUI.SvgIcon;
    export var MapsLocalDrink: typeof __MaterialUI.SvgIcon;
    export var MapsLocalFlorist: typeof __MaterialUI.SvgIcon;
    export var MapsLocalGasStation: typeof __MaterialUI.SvgIcon;
    export var MapsLocalGroceryStore: typeof __MaterialUI.SvgIcon;
    export var MapsLocalHospital: typeof __MaterialUI.SvgIcon;
    export var MapsLocalHotel: typeof __MaterialUI.SvgIcon;
    export var MapsLocalLaundryService: typeof __MaterialUI.SvgIcon;
    export var MapsLocalLibrary: typeof __MaterialUI.SvgIcon;
    export var MapsLocalMall: typeof __MaterialUI.SvgIcon;
    export var MapsLocalMovies: typeof __MaterialUI.SvgIcon;
    export var MapsLocalOffer: typeof __MaterialUI.SvgIcon;
    export var MapsLocalParking: typeof __MaterialUI.SvgIcon;
    export var MapsLocalPharmacy: typeof __MaterialUI.SvgIcon;
    export var MapsLocalPhone: typeof __MaterialUI.SvgIcon;
    export var MapsLocalPizza: typeof __MaterialUI.SvgIcon;
    export var MapsLocalPlay: typeof __MaterialUI.SvgIcon;
    export var MapsLocalPostOffice: typeof __MaterialUI.SvgIcon;
    export var MapsLocalPrintshop: typeof __MaterialUI.SvgIcon;
    export var MapsLocalSee: typeof __MaterialUI.SvgIcon;
    export var MapsLocalShipping: typeof __MaterialUI.SvgIcon;
    export var MapsLocalTaxi: typeof __MaterialUI.SvgIcon;
    export var MapsMap: typeof __MaterialUI.SvgIcon;
    export var MapsMyLocation: typeof __MaterialUI.SvgIcon;
    export var MapsNavigation: typeof __MaterialUI.SvgIcon;
    export var MapsNearMe: typeof __MaterialUI.SvgIcon;
    export var MapsPersonPinCircle: typeof __MaterialUI.SvgIcon;
    export var MapsPersonPin: typeof __MaterialUI.SvgIcon;
    export var MapsPinDrop: typeof __MaterialUI.SvgIcon;
    export var MapsPlace: typeof __MaterialUI.SvgIcon;
    export var MapsRateReview: typeof __MaterialUI.SvgIcon;
    export var MapsRestaurantMenu: typeof __MaterialUI.SvgIcon;
    export var MapsSatellite: typeof __MaterialUI.SvgIcon;
    export var MapsStoreMallDirectory: typeof __MaterialUI.SvgIcon;
    export var MapsTerrain: typeof __MaterialUI.SvgIcon;
    export var MapsTraffic: typeof __MaterialUI.SvgIcon;
    export var MapsZoomOutMap: typeof __MaterialUI.SvgIcon;
    export var NavigationApps: typeof __MaterialUI.SvgIcon;
    export var NavigationArrowBack: typeof __MaterialUI.SvgIcon;
    export var NavigationArrowDownward: typeof __MaterialUI.SvgIcon;
    export var NavigationArrowDropDownCircle: typeof __MaterialUI.SvgIcon;
    export var NavigationArrowDropDown: typeof __MaterialUI.SvgIcon;
    export var NavigationArrowDropUp: typeof __MaterialUI.SvgIcon;
    export var NavigationArrowForward: typeof __MaterialUI.SvgIcon;
    export var NavigationArrowUpward: typeof __MaterialUI.SvgIcon;
    export var NavigationCancel: typeof __MaterialUI.SvgIcon;
    export var NavigationCheck: typeof __MaterialUI.SvgIcon;
    export var NavigationChevronLeft: typeof __MaterialUI.SvgIcon;
    export var NavigationChevronRight: typeof __MaterialUI.SvgIcon;
    export var NavigationClose: typeof __MaterialUI.SvgIcon;
    export var NavigationExpandLess: typeof __MaterialUI.SvgIcon;
    export var NavigationExpandMore: typeof __MaterialUI.SvgIcon;
    export var NavigationFullscreenExit: typeof __MaterialUI.SvgIcon;
    export var NavigationFullscreen: typeof __MaterialUI.SvgIcon;
    export var NavigationMenu: typeof __MaterialUI.SvgIcon;
    export var NavigationMoreHoriz: typeof __MaterialUI.SvgIcon;
    export var NavigationMoreVert: typeof __MaterialUI.SvgIcon;
    export var NavigationRefresh: typeof __MaterialUI.SvgIcon;
    export var NavigationSubdirectoryArrowLeft: typeof __MaterialUI.SvgIcon;
    export var NavigationSubdirectoryArrowRight: typeof __MaterialUI.SvgIcon;
    export var NavigationUnfoldLess: typeof __MaterialUI.SvgIcon;
    export var NavigationUnfoldMore: typeof __MaterialUI.SvgIcon;
    export var NavigationArrowDropRight: typeof __MaterialUI.SvgIcon;
    export var NotificationAdb: typeof __MaterialUI.SvgIcon;
    export var NotificationAirlineSeatFlatAngled: typeof __MaterialUI.SvgIcon;
    export var NotificationAirlineSeatFlat: typeof __MaterialUI.SvgIcon;
    export var NotificationAirlineSeatIndividualSuite: typeof __MaterialUI.SvgIcon;
    export var NotificationAirlineSeatLegroomExtra: typeof __MaterialUI.SvgIcon;
    export var NotificationAirlineSeatLegroomNormal: typeof __MaterialUI.SvgIcon;
    export var NotificationAirlineSeatLegroomReduced: typeof __MaterialUI.SvgIcon;
    export var NotificationAirlineSeatReclineExtra: typeof __MaterialUI.SvgIcon;
    export var NotificationAirlineSeatReclineNormal: typeof __MaterialUI.SvgIcon;
    export var NotificationBluetoothAudio: typeof __MaterialUI.SvgIcon;
    export var NotificationConfirmationNumber: typeof __MaterialUI.SvgIcon;
    export var NotificationDiscFull: typeof __MaterialUI.SvgIcon;
    export var NotificationDoNotDisturbAlt: typeof __MaterialUI.SvgIcon;
    export var NotificationDoNotDisturb: typeof __MaterialUI.SvgIcon;
    export var NotificationDriveEta: typeof __MaterialUI.SvgIcon;
    export var NotificationEnhancedEncryption: typeof __MaterialUI.SvgIcon;
    export var NotificationEventAvailable: typeof __MaterialUI.SvgIcon;
    export var NotificationEventBusy: typeof __MaterialUI.SvgIcon;
    export var NotificationEventNote: typeof __MaterialUI.SvgIcon;
    export var NotificationFolderSpecial: typeof __MaterialUI.SvgIcon;
    export var NotificationLiveTv: typeof __MaterialUI.SvgIcon;
    export var NotificationMms: typeof __MaterialUI.SvgIcon;
    export var NotificationMore: typeof __MaterialUI.SvgIcon;
    export var NotificationNetworkCheck: typeof __MaterialUI.SvgIcon;
    export var NotificationNetworkLocked: typeof __MaterialUI.SvgIcon;
    export var NotificationNoEncryption: typeof __MaterialUI.SvgIcon;
    export var NotificationOndemandVideo: typeof __MaterialUI.SvgIcon;
    export var NotificationPersonalVideo: typeof __MaterialUI.SvgIcon;
    export var NotificationPhoneBluetoothSpeaker: typeof __MaterialUI.SvgIcon;
    export var NotificationPhoneForwarded: typeof __MaterialUI.SvgIcon;
    export var NotificationPhoneInTalk: typeof __MaterialUI.SvgIcon;
    export var NotificationPhoneLocked: typeof __MaterialUI.SvgIcon;
    export var NotificationPhoneMissed: typeof __MaterialUI.SvgIcon;
    export var NotificationPhonePaused: typeof __MaterialUI.SvgIcon;
    export var NotificationPower: typeof __MaterialUI.SvgIcon;
    export var NotificationRvHookup: typeof __MaterialUI.SvgIcon;
    export var NotificationSdCard: typeof __MaterialUI.SvgIcon;
    export var NotificationSimCardAlert: typeof __MaterialUI.SvgIcon;
    export var NotificationSmsFailed: typeof __MaterialUI.SvgIcon;
    export var NotificationSms: typeof __MaterialUI.SvgIcon;
    export var NotificationSyncDisabled: typeof __MaterialUI.SvgIcon;
    export var NotificationSyncProblem: typeof __MaterialUI.SvgIcon;
    export var NotificationSync: typeof __MaterialUI.SvgIcon;
    export var NotificationSystemUpdate: typeof __MaterialUI.SvgIcon;
    export var NotificationTapAndPlay: typeof __MaterialUI.SvgIcon;
    export var NotificationTimeToLeave: typeof __MaterialUI.SvgIcon;
    export var NotificationVibration: typeof __MaterialUI.SvgIcon;
    export var NotificationVoiceChat: typeof __MaterialUI.SvgIcon;
    export var NotificationVpnLock: typeof __MaterialUI.SvgIcon;
    export var NotificationWc: typeof __MaterialUI.SvgIcon;
    export var NotificationWifi: typeof __MaterialUI.SvgIcon;
    export var PlacesAcUnit: typeof __MaterialUI.SvgIcon;
    export var PlacesAirportShuttle: typeof __MaterialUI.SvgIcon;
    export var PlacesAllInclusive: typeof __MaterialUI.SvgIcon;
    export var PlacesBeachAccess: typeof __MaterialUI.SvgIcon;
    export var PlacesBusinessCenter: typeof __MaterialUI.SvgIcon;
    export var PlacesCasino: typeof __MaterialUI.SvgIcon;
    export var PlacesChildCare: typeof __MaterialUI.SvgIcon;
    export var PlacesChildFriendly: typeof __MaterialUI.SvgIcon;
    export var PlacesFitnessCenter: typeof __MaterialUI.SvgIcon;
    export var PlacesFreeBreakfast: typeof __MaterialUI.SvgIcon;
    export var PlacesGolfCourse: typeof __MaterialUI.SvgIcon;
    export var PlacesHotTub: typeof __MaterialUI.SvgIcon;
    export var PlacesKitchen: typeof __MaterialUI.SvgIcon;
    export var PlacesPool: typeof __MaterialUI.SvgIcon;
    export var PlacesRoomService: typeof __MaterialUI.SvgIcon;
    export var PlacesSmokeFree: typeof __MaterialUI.SvgIcon;
    export var PlacesSmokingRooms: typeof __MaterialUI.SvgIcon;
    export var PlacesSpa: typeof __MaterialUI.SvgIcon;
    export var SocialCake: typeof __MaterialUI.SvgIcon;
    export var SocialDomain: typeof __MaterialUI.SvgIcon;
    export var SocialGroupAdd: typeof __MaterialUI.SvgIcon;
    export var SocialGroup: typeof __MaterialUI.SvgIcon;
    export var SocialLocationCity: typeof __MaterialUI.SvgIcon;
    export var SocialMoodBad: typeof __MaterialUI.SvgIcon;
    export var SocialMood: typeof __MaterialUI.SvgIcon;
    export var SocialNotificationsActive: typeof __MaterialUI.SvgIcon;
    export var SocialNotificationsNone: typeof __MaterialUI.SvgIcon;
    export var SocialNotificationsOff: typeof __MaterialUI.SvgIcon;
    export var SocialNotificationsPaused: typeof __MaterialUI.SvgIcon;
    export var SocialNotifications: typeof __MaterialUI.SvgIcon;
    export var SocialPages: typeof __MaterialUI.SvgIcon;
    export var SocialPartyMode: typeof __MaterialUI.SvgIcon;
    export var SocialPeopleOutline: typeof __MaterialUI.SvgIcon;
    export var SocialPeople: typeof __MaterialUI.SvgIcon;
    export var SocialPersonAdd: typeof __MaterialUI.SvgIcon;
    export var SocialPersonOutline: typeof __MaterialUI.SvgIcon;
    export var SocialPerson: typeof __MaterialUI.SvgIcon;
    export var SocialPlusOne: typeof __MaterialUI.SvgIcon;
    export var SocialPoll: typeof __MaterialUI.SvgIcon;
    export var SocialPublic: typeof __MaterialUI.SvgIcon;
    export var SocialSchool: typeof __MaterialUI.SvgIcon;
    export var SocialShare: typeof __MaterialUI.SvgIcon;
    export var SocialWhatshot: typeof __MaterialUI.SvgIcon;
    export var ToggleCheckBoxOutlineBlank: typeof __MaterialUI.SvgIcon;
    export var ToggleCheckBox: typeof __MaterialUI.SvgIcon;
    export var ToggleIndeterminateCheckBox: typeof __MaterialUI.SvgIcon;
    export var ToggleRadioButtonChecked: typeof __MaterialUI.SvgIcon;
    export var ToggleRadioButtonUnchecked: typeof __MaterialUI.SvgIcon;
    export var ToggleStarBorder: typeof __MaterialUI.SvgIcon;
    export var ToggleStarHalf: typeof __MaterialUI.SvgIcon;
    export var ToggleStar: typeof __MaterialUI.SvgIcon;
}
