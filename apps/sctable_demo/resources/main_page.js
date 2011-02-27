/*globals SCTableDemo SCTable*/

SCTableDemo.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'tableView'.w(),
    
    tableView: SCTable.TableView.design({
      layout: { left: 200, top: 50, bottom: 50, right: 200 },

      target: SCTableDemo.tableController,
      action: 'sayHi',

      contentBinding: 'SCTableDemo.tableController.arrangedObjects',
      selectionBinding: 'SCTableDemo.tableController.selection',

      columnsBinding: 'SCTableDemo.tableColumnsController.arrangedObjects',
      columnSelectionBinding: 'SCTableDemo.tableColumnsController.selection'
    })
  })
  
});
