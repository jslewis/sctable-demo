/*globals SCTableDemo*/

var t;

SCTableDemo.main = function main() {

  SCTableDemo.mainPage.get('mainPane').append();
  t = SCTableDemo.mainPage.getPath('mainPane.tableView');
  
  SCTableDemo.parseSampleData();
};

function main() { SCTableDemo.main(); }
