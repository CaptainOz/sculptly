
Dialog Framework
================

class DialogBase
----------------

### Public
  - static void initiate( jQuery dialog )
  - void _constructor_()
  - void close( void )
  - void suspend( void )
  - void resume( void )
  - void onOpen( Function callback [, Array args ], Boolean oneTime = true )
  - void onClose( Function callback [, Array args ], Boolean oneTime = true )
  - void onSuspend( Function callback [, Array args ], Boolean oneTime = true )
  - void onResume( Function callback [, Array args ], Boolean oneTime = true )
  - void onSave( Function callback [, Array args ], Boolean oneTime = true )
  - void onCancel( Function callback [, Array args ], Boolean oneTime = true )
  - void onReset( Function callback [, Array args ], Boolean oneTime = true )
  - void on( String eventName, Function callback [, Array args ], Boolean oneTime = true )
  - void trigger( String eventName [, Array args ] )
  - void onUI( String eventName, Function callback, Boolean oneTime = true )

### Protected
  - void _close( void )
  - void _suspend( void )
  - void _resume( void )
  - void _save( void )
  - void _cancel( void )
  - void _reset( void )

class DialogManager
-------------------

Dialog Events
-------------
Dialogs are managed event emitters. Several events are pre-bound to UI elements
(see _Automatic Event Bindings_ below), but any event can be bound to or
triggered through the `DialogBase::on` and `DialogBase::trigger` methods. UI
events (such as `click` or `change`) should be bound by using `DialogBase::onUI`.

### Automatic Event Bindings
There are 7 "special" events for dialogs. They are given their own binding
methods (which simply wrap a call to `DialogBase::on`) and are automatically
triggered by actions taken on UI elements based on their classes.

None of these events need have anything bound to them, but if the dialog needs to
react to any of these events (such as to cancel the default action) then it is
available.

#### Open
The `open` event is the only event that is bound beyond the borders of the
dialog. Any element created with this class should have a `data-dialogName` value
also set. When the element is clicked, the dialog named in the `data-dialogName`
attribute will be opened.

#### Close
Any element with the class `.dialog-close` will cause the `close` event to be
triggered on its containing dialog. The `close` event will cause the dialog to be
removed from the `DialogManager`'s stack and the dialog's content will be hidden.

#### Suspend
This event does not have any UI binding. It will be called whenever a new dialog
is opened, making this dialog no longer the top dialog. The dialog's content will
be hidden from the user, but the dialog will remain in the `DialogManager`'s
stack to be resumed later.

#### Resume
When a dialog is brought back to the top the `resume` event is triggered. This
event does not have any UI bindings. The dialog's content will be shown to the
user.



