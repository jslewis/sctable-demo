/*globals SCTableDemo SCTable*/

SCTableDemo.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'tableView'.w(),
    
    tableView: SCTable.TableView.design({
      layout: { left: 0, top: 0, bottom: 0, right: 0 },

      target: SCTableDemo.tableController,
      action: 'sayHi',

      contentBinding: 'SCTableDemo.tableController.arrangedObjects',
      selectionBinding: 'SCTableDemo.tableController.selection',

      columnsBinding: 'SCTableDemo.tableColumnsController.arrangedObjects',
      columnSelectionBinding: 'SCTableDemo.tableColumnsController.selection'
    })
  })
  
});
