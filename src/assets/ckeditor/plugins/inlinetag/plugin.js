
/**
 *
 * InlineTags
 *
 * Created by Stephan Galea
 * 
 */


// Register the plugin within the editor.
CKEDITOR.plugins.add( 'inlinetag', {
	requires: 'widget',
	// icons: 'inlinetag',

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {

		  
		var getTag = function(text){

				return `<span class="inlinetag" contentEditable='false'>
			<span class="inlinetag-head"  contentEditable='false'>&nbsp;</span>
			<span class="inlinetag-content"  contentEditable='false'>${text}</span>
			<span class="inlinetag-close"  contentEditable='false'  onclick="CKEDITOR.tools.callFunction(22,this);return false;">
			<svg class="inlinetag-svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg></span></span>`;   
		}


		var createCommand = function( tag ) {
			var tavVar = tag.replace(' ','');
			editor.widgets.add( 'inlinetag'+tavVar, {

				template:getTag(tag),
	
				upcast: function( element ) {
					return element.name == 'span' && element.hasClass( 'inlinetag' );
				},
			
				init: function() {
					// https://stackoverflow.com/questions/4536532/how-to-set-cursor-position-to-end-of-text-in-ckeditor
					// Move Cursor After
					// var range = editor.createRange();
					// range.moveToElementEditEnd( range.root );
					// // range.collapse();
					// if(editor.getSelection())
					// editor.getSelection().selectRanges( [ range ] );
				},
			
				data: function() {

                }
                
			} );

			// https://stackoverflow.com/questions/36812216/ckeditor-widget-set-a-toolbar-for-the-button
			editor.ui.addButton('inlinetag'+tavVar, {
				label: 'Insert '+tag,
				command: 'inlinetag'+tavVar,
				toolbar: 'insert',
				 icon: 'inlinetag',
				class: 'inlinetag',
			});
	
		}

		for(var tag of editor.config.inlinetag.types ){
			createCommand( tag );
        }
        
	}
} );
