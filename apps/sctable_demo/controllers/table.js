/*globals SCTableDemo*/

SCTableDemo.tableController = SC.ArrayController.create({

  // PUBLIC METHODS

  init: function() {
    sc_super();
    
    var content = [];
    var count = 100;
    
    for (var i = 0; i < count; i++) {
      content.push(SC.Object.create({
        name: 'item %@'.fmt(i),
        index: i,
        description: 'This is a row description for row %@'.fmt(i),
        nameIcon: 'name-16'
      }));
    }

    this.set('content', content);
  },
  
  sayHi: function() {
    console.log('...hi');
  }
  
});
