

Type = require 'md-components/Type'
{ Ripple } = require 'md-components/Ripple'
{ Theme } = require 'md-components/Theme'
{ Icon } = require 'md-components/Icon'
{ Button } = require 'md-components/Button'
{ TextArea } = require 'md-components/TextArea'
{ TextField } = require 'md-components/TextField'
{ Slider } = require 'md-components/Slider'
{ Radiobox } = require 'md-components/Radiobox'
{ Checkbox } = require 'md-components/Checkbox'
{ Switch } = require 'md-components/Switch'
{ Divider } = require 'md-components/Divider'
{ GridList } = require 'md-components/GridList'
{ Tile } = require 'md-components/Tile'
{ Dialog } = require 'md-components/Dialog'
{ StatusBar } = require 'md-components/StatusBar'
{ Header } = require 'md-components/Header'
{ Notification } = require 'md-components/Notification'
{ Snackbar } = require 'md-components/Snackbar'
{ RowItem } = require 'md-components/RowItem'
{ MenuOverlay } = require 'md-components/MenuOverlay'
{ MenuButton } = require 'md-components/MenuButton'
{ ActionButton } = require 'md-components/ActionButton'
{ View } = require 'md-components/View'
{ Page } = require 'md-components/Page'
{ BottomNav } = require 'md-components/BottomNav'
{ Card } = require 'md-components/Card'
{ App } = require 'md-components/App'

# TODO: Change App from master flow component to Screen manager.
# App shouldn't directly manage pages: a new class, 'screen' will manage Pages.
# Tabs allow navigation between Screens. Content is still added to Pages.

# Our goal is to require only one require in Framer project, so this 
# is a clunky way of letting user create text using md.Title, etc.

exports.Ripple = Ripple
exports.Theme = Theme
exports.Icon = Icon
exports.Button = Button
exports.TextArea = TextArea
exports.TextField = TextField
exports.Slider = Slider
exports.Radiobox = Radiobox
exports.Checkbox = Checkbox
exports.Switch = Switch
exports.Divider = Divider
exports.GridList = GridList
exports.Tile = Tile
exports.Dialog = Dialog
exports.StatusBar = StatusBar
exports.Header = Header
exports.Notification = Notification
exports.Snackbar = Snackbar
exports.RowItem = RowItem
exports.ActionButton = ActionButton
exports.MenuButton = MenuButton
exports.MenuOverlay = MenuOverlay
exports.View = View
exports.Page = Page
exports.Card = Card
exports.App = App

exports.Title = Title = Type.Title
exports.Headline = Headline = Type.Headline
exports.Subhead = Subhead = Type.Subhead
exports.Regular = Regular = Type.Regular
exports.Body2 = Body2 = Type.Body2
exports.Body1 = Body1 = Type.Body1
exports.Caption = Caption = Type.Caption
exports.DialogAction = DialogAction = Type.DialogAction

Framer.Extras.Hints.disable()

























