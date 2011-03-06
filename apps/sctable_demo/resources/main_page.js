/*globals SCTableDemo SCTable*/

SCTableDemo.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    classNames: 'main-demo-pane',
    childViews: 'tableView titleView sourceLinkView'.w(),
    
    sourceLinkView: SC.View.design({
      classNames: 'source-link-view',
      layout: { left: 20, top: 30, width: 130, height: 24 },
      render: function(context, firstTime) {
        context = context.push('<a href=\"http://www.github.com/jslewis/sctable\">Get the Source!</a>');
      }
    }),
    
    titleView: SC.LabelView.design({
      classNames: 'main-page-title',
      layout: { left: 0, right: 0, top: 0, height: 88 },
      textAlign: SC.ALIGN_CENTER,
      value: 'SCTable.TableView'
    }),

    tableView: SCTable.TableView.design({
      layout: { left: 0, top: 88, right: 0, bottom: 0 },

      target: SCTableDemo.tableController,
      action: 'sayHi',

      contentBinding: 'SCTableDemo.tableController.arrangedObjects',
      selectionBinding: 'SCTableDemo.tableController.selection',

      columnsBinding: 'SCTableDemo.tableColumnsController.arrangedObjects',
      columnSelectionBinding: 'SCTableDemo.tableColumnsController.selection'
    })
  })
  
});
