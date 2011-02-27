/*globals SCTableDemo SCTable*/

SCTableDemo.tableColumnsController = SC.ArrayController.create({
  
  // PUBLIC PROPERTIES

  content: [
    SC.Object.create(SCTable.Column, {
      name: 'Index',
      valueKey: 'index',
      width: 50,
      classNames: ['index']
    }),
    SC.Object.create(SCTable.Column, {
      name: 'Name (No Sort)',
      valueKey: 'name',
      canSort: NO
    }),
    SC.Object.create(SCTable.Column, {
      name: 'Description',
      valueKey: 'description',
      width: 200
    }),
    SC.Object.create(SCTable.Column, {
      name: "Can't Resize",
      valueKey: 'noResize',
      canResize: NO
    }),
    SC.Object.create(SCTable.Column, {
      name: 'Col A',
      valueKey: 'colA'
    }),
    SC.Object.create(SCTable.Column, {
      name: 'Col B',
      valueKey: 'colB'
    })
  ]
    
});
