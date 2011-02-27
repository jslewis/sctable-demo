/*globals SCTableDemo SCTable*/

SCTableDemo.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'tableView'.w(),
    
    tableView: SCTable.TableView.design({
      layout: { left: 200, top: 50, bottom: 50, right: 200 },

      target: SCTableDemo.tableController,
      action: 'sayHi',

      //content: [SC.Object.create({ index: 0 })],
      contentBinding: 'SCTableDemo.tableController.arrangedObjects',
      // init: function() {
      //   sc_super();
      //   
      //   var content = [];
      //   var count = 10;
      //   
      //   for (var i = 0; i < count; i++) {
      //     content.push(SC.Object.create({
      //       index: i
      //     }));
      //   }
      // 
      //   this.set('content', content);
      // },
      
      selectionBinding: 'SCTableDemo.tableController.selection',

      columnsBinding: 'SCTableDemo.tableColumnsController.arrangedObjects',
      columnSelectionBinding: 'SCTableDemo.tableColumnsController.selection'
    })
  })
  
});
