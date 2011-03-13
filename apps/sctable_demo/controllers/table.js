/*globals SCTableDemo SCTable*/

SCTableDemo.tableController = SC.ArrayController.create(SCTable.TableDelegate, {

  // PUBLIC METHODS

  contentBinding: 'SCTableDemo.sampleRows',
  
  // PUBLIC METHODS
  
  sayHi: function() {
    console.log('...hi');
  },
  
  /*
    This method is called once per cell being rendered, to generate the content of the
    cell's outer div element.  Override it to add custom content.  By default it simply
    pushes an additional div containing the cell's value as text onto the render context.
    
    This method is called quite often, so keep it fast for the best table performance.
    If you're rendering user-saved data, make sure it's safe as well as this function
    pushes HTML code straight into the DOM.
    
    NOTE: Always return the render context, even if you do nothing with it.  This
    function is a subroutine in an existing render() call.
  */
  renderTableCellContent: function(tableView, renderContext, rowContent, rowIndex, column, columnIndex) {
    if (column.get('valueKey') === 'stars') { // demo specialized rendering -- make an itunes-like stars column
      renderContext = this._renderStars(tableView, renderContext, rowContent, rowIndex, column, columnIndex);
    }
    else {
      renderContext = renderContext.push('<div class=\"text\">%@</div>'.fmt(SC.RenderContext.escapeHTML(rowContent ? rowContent.get(column.get('valueKey')) : null)));
    }
  
    return renderContext;
  },
  
  // PRIVATE METHODS
  
  /*
    Demo for special column rendering
  */
  _renderStars: function(tableView, renderContext, rowContent, rowIndex, column, columnIndex) {
    var numStars = rowContent.get('stars') * 1, i;
    
    renderContext = renderContext.push('<div class=\"stars-0\"></div>');
    
    // draw five stars -- see CSS def for styling and positioning
    for (i = 1; i <= 5; i++) {
      renderContext = renderContext.push('<div class=\"stars-%@ %@\"></div>'.fmt(i, (i <= numStars) ? 'on' : ''));
    }

    return renderContext;
  },
  
  /*
    Called when a mouse-down occurs on a table row view.  'evt' is the original mouse event, so you can
    query it for the actual DOM target that was hit if desired.
  */
  mouseDownOnTableRow: function(tableView, rowView, evt) {
    var classNames = evt.target.className, n, i;
    
    // Special column rendering demo: look for a mouse-down on a star and set a row's value based
    // on which star was clicked
    if (classNames) {
      classNames = classNames.split(' ');

      for (i = 0; i < classNames.length; i++) {
        if (classNames[i].substr(0, 6) === 'stars-') {
          n = classNames[i].substr(6, classNames[i].length - 6) * 1;
          rowView.setPath('content.stars', n);
        }
      }
    }
    
  }

});
