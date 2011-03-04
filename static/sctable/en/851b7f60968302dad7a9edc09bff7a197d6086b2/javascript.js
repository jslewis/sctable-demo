window.SCTable=SC.Object.create({SORT_DIRECTION_NONE:null,SORT_DIRECTION_ASCENDING:"asc",SORT_DIRECTION_DESCENDING:"desc"});
SCTable.Column={isColumn:YES,name:"Column Name",valueKey:null,iconKey:null,width:100,canResize:YES,canSort:YES,classNames:null};
SCTable.TableColumnsDelegate={isTableColumnsDelegate:YES,beginColumnResizeDrag:function(a,c,b){},updateColumnResizeDrag:function(a,c,b,d){},endColumnResizeDrag:function(a,c,b,d){},tableColumnDidRequestSort:function(b,a,c){}};
SCTable.TableDelegate={isTableDelegate:YES,tableDidRequestSort:function(a,d,c,b,e){return NO
},renderTableCellContent:function(a,b,e,f,d,c){return b.push('<div class="text">%@</div>'.fmt(SC.RenderContext.escapeHTML(e?e.get(d.get("valueKey")):null)))
}};SCTable.TableRowView=SC.View.extend(SC.Control,{classNames:"sctable-row-view",isMouseOver:NO,displayProperties:["isMouseOver"],willDestroyLayer:function(){this.set("content",null)
},contentPropertyDidChange:function(){this.displayDidChange()},render:function(d,a){var b=this.getPath("displayDelegate.tableDelegate");
var f=b?b.get("columns"):null;var h=(b?b.get("tableWidth"):0)||0;var e=0,j,c,k;var i=this.get("content");
var g=this.get("contentIndex");d=d.addClass((g%2===0)?"even":"odd");d=d.setClass("hover",this.get("isMouseOver"));
if(f&&f.isEnumerable){f.forEach(function(m,l){var n=m.get("iconKey");c=m.get("width")||0;
d=d.push('<div class="cell col-%@ %@" style="left: %@px; top: 0px; bottom: 0px; width: %@px;">'.fmt(l,(n?"has-icon":""),e,c));
d=b.renderTableCellContent(this,d,i,g,m,l);d=n?d.push('<div class="icon %@"></div></div>'.fmt(i.get(n))):d.push("</div>");
e+=c},this)}},mouseEntered:function(a){this.set("isMouseOver",YES)},mouseExited:function(a){this.set("isMouseOver",NO)
}});sc_require("mixins/table_columns_delegate");SCTable.TableHeaderView=SC.CollectionView.extend(SCTable.TableColumnsDelegate,{classNames:"sctable-header-view",sort:null,ownerTableView:null,ghostActsLikeCursor:YES,isResizeDragInProgress:NO,shouldLiveResize:YES,insertionPointView:SC.View.extend({backgroundColor:"red",layout:{left:0,top:0,bottom:0,width:2},render:function(a,b){if(b){a.push('<div class="anchor"></div>')
}}}),layoutForContentIndex:function(e){var c=this.get("content");var d=0,b,a;if(c&&c.isEnumerable){c.forEach(function(g,f){if(f<e){d+=g.get("width")
}else{if(f===e){b=g.get("width")}}});a={left:d,width:b}}return a},createItemView:function(e,a,b){var c=this.get("sort");
var d=c?c.valueKey:null;if(b.content&&(b.content.get("valueKey")===d)){b.sortDirection=c?c.direction:null
}else{delete b.sortDirection}return e.create(b)},tableColumnDidRequestSort:function(c,b,d){var a=this.get("ownerTableView");
if(a&&a.tableColumnDidRequestSort){a.tableColumnDidRequestSort(c,b,d)}},collectionViewDragViewFor:function(b,d){var c;
var a=30;var e=[];d.forEach(function(f){var g=this.itemViewForContentIndex(f);if(g){e.push(g.getPath("content.name"))
}},this);c=SC.View.create({layout:{width:100,height:a*e.length},backgroundColor:"gray",content:e,rowHeight:a,createChildViews:function(){var j=[];
var h=this.get("content"),f;var g=this.get("rowHeight");if(h){for(f=0;f<h.length;
f++){j.push(this.createChildView(SC.LabelView,{layout:{left:0,right:0,top:g*f,height:g},value:h[f]}))
}}this.set("childViews",j)}});return c},insertionIndexForLocation:function(e,f){var c=this.get("childViews");
var b,d;var a=-1;if(c){for(b=0;b<c.length;b++){d=c[b].get("frame");if((e.x>=d.x)&&(e.x<=(d.x+d.width))){a=[b,SC.DROP_AFTER];
if((e.x-d.x)<((d.x+d.width)-e.x)){a[1]=SC.DROP_BEFORE}break}}}return a},showInsertionPoint:function(b,e){var a=this._insertionPointView;
var d=b.get("frame");var c=d.x;if(!a){a=this._insertionPointView=this.get("insertionPointView").create()
}if(e&SC.DROP_AFTER){if(b.get("contentIndex")===(this.get("length")-1)){c=d.x+d.width-a.get("frame").width
}else{c=d.x+d.width}}a.adjust({left:c});this.appendChild(a)},hideInsertionPoint:function(){if(this._insertionPointView){this._insertionPointView.removeFromParent().destroy()
}this._insertionPointView=null},beginColumnResizeDrag:function(){this.set("isResizeDragInProgress",YES)
},updateColumnResizeDrag:function(a,c,b,d){if(this.get("shouldLiveResize")){this._resizeData={evt:a,col:c,colIndex:b,newWidth:d};
this.invokeOnce("_overrideColumnWidth")}},endColumnResizeDrag:function(){console.log("%@.endResizeDrag()".fmt(this));
this.set("isResizeDragInProgress",NO);this._resizeData=null},_sortDidChange:function(){this.invokeOnce("_updateSortView")
}.observes("sort"),_updateSortView:function(){var f=this.get("childViews"),d,b;var c=this.get("sort");
var e=c?c.valueKey:null;var a=c?c.direction:null;if(f){for(d=0;d<f.length;d++){b=f[d].get("content");
if(b){if(b.get("valueKey")===e){f[d].set("sortDirection",a)}else{f[d].set("sortDirection",null)
}}}}},_overrideColumnWidth:function(){var b,d,a,c,e,f;if(this._resizeData){b=this.get("content");
d=b?b.get("length"):0;this.beginPropertyChanges();if(this._resizeData.colIndex<d){c=this.itemViewForContentIndex(this._resizeData.colIndex);
if(c){c.adjust({width:this._resizeData.newWidth});e=c.get("frame").x+this._resizeData.newWidth
}for(a=this._resizeData.colIndex+1;a<d;a++){c=this.itemViewForContentIndex(a);f=c.get("frame");
c.adjust({left:e});e=e+f.width}}this.endPropertyChanges()}},_resizeData:null,_insertionPointView:null});
sc_require("views/table_row");sc_require("views/table_header");sc_require("mixins/table_columns_delegate");
SCTable.TableView=SC.View.extend(SCTable.TableColumnsDelegate,SCTable.TableDelegate,{classNames:"sctable-table-view",content:null,selection:null,rowHeight:28,showAlternatingRows:NO,target:null,action:null,isVerticalScrollerVisible:YES,columns:null,columnSelection:null,canReorderColumns:YES,sort:null,headerHeight:28,delegate:null,tableDelegate:function(){var a=this.get("delegate"),b=this.get("content");
return this.delegateFor("isTableDelegate",a,b)}.property("delegate","content").cacheable(),tableWidth:function(){var b=this.get("columns");
var a=0;if(b&&b.isEnumerable){b.forEach(function(c){a+=(c.get("width")||0)},this)
}return a}.property().cacheable(),createChildViews:function(){var f=[],c,e;var b=this.get("headerHeight");
var a=this.get("tableWidth");var d=this.get("tableDelegate");e=this.createChildView(SC.ScrollView,{classNames:"sctable-body-scroll-view",layout:{left:0,right:0,top:b+1,bottom:0},contentView:SC.ListView.extend({layout:{right:0,minWidth:a},contentBinding:SC.Binding.from("content",this),selectionBinding:SC.Binding.from("selection",this),contentValueKey:"name",exampleView:SCTable.TableRowView,rowHeight:this.get("rowHeight"),tableDelegateBinding:SC.Binding.from("tableDelegate",this).oneWay(),showAlternatingRowsBinding:SC.Binding.from("showAlternatingRows",this).oneWay(),targetBinding:SC.Binding.from("target",this).oneWay(),actionBinding:SC.Binding.from("action",this).oneWay()}),isVerticalScrollerVisibleBinding:SC.Binding.from("isVerticalScrollerVisible",this)});
this._bodyScrollView=e;this._bodyView=e.get("contentView");c=this.createChildView(SC.ScrollView,{classNames:"sctable-header-scroll-view",layout:{left:1,right:0,top:0,height:b},contentView:SCTable.TableHeaderView.extend({layout:{right:0,minWidth:a},exampleView:SCTable.TableColumnHeaderView,contentBinding:SC.Binding.from("columns",this),selectionBinding:SC.Binding.from("columnSelection",this),sortBinding:SC.Binding.from("sort",this),tableDelegate:SC.Binding.from("tableDelegate",this).oneWay(),ownerTableView:this,allowDeselectAll:YES,canReorderContentBinding:SC.Binding.from("canReorderColumns",this),target:this,action:"_onColumnAction",actOnSelect:YES}),hasVerticalScroller:NO,horizontalScrollerView:SC.ScrollerView.extend({scrollbarThickness:0}),horizontalScrollOffsetBinding:SC.Binding.from("horizontalScrollOffset",e)});
this._headerScrollView=c;this._headerView=c.get("contentView");this.set("childViews",[e,c])
},reload:function(){if(this._headerView){this._headerView.reload()}if(this._bodyView){this._bodyView.reload()
}},tableColumnDidRequestSort:function(b,a,c){if(b.get("canSort")){this._sortData={col:b,colIndex:a,direction:c};
this.invokeOnce("_sortContent")}},_sortContent:function(){var a=this.get("tableDelegate");
var f=this.get("content");var d=this._sortData?this._sortData.direction:SCTable.SORT_DIRECTION_NONE;
var c=this._sortData?this._sortData.col:null;var b=this._sortData?this._sortData.colIndex:null;
var g=NO,e;if(a&&a.tableDidRequestSort&&!a.tableDidRequestSort(this,f,c,b,d)){if(SC.kindOf(f,SC.ArrayController)){if(d===SCTable.SORT_DIRECTION_ASCENDING){f.set("orderBy","ASC %@".fmt(c.get("valueKey")))
}else{if(d===SCTable.SORT_DIRECTION_DESCENDING){f.set("orderBy","DESC %@".fmt(c.get("valueKey")))
}else{f.set("orderBy",null)}}g=YES}else{if(SC.typeOf(f)===SC.T_ARRAY){e=c.get("valueKey");
if(d===SCTable.SORT_DIRECTION_ASCENDING){f.sort(function(i,h){i=i?i.get(e):null;h=h?h.get(e):null;
if(i<h){return -1}else{if(i>h){return 1}}return 0})}else{if(d===SCTable.SORT_DIRECTION_DESCENDING){f.sort(function(i,h){i=i?i.get(e):null;
h=h?h.get(e):null;if(i<h){return 1}else{if(i>h){return -1}}return 0})}}if(f.isEnumerable){f.enumerableContentDidChange()
}g=YES}else{console.warn("Error in TableView(%@)._sortContent(): Content type is not recognized as sortable.".fmt(this))
}}if(g){this.set("sort",{valueKey:c.get("valueKey"),direction:d})}}this._sortData=null
},_isVerticalScrollerVisibleDidChange:function(){this.invokeOnce("_updateTableLayout")
}.observes("isVerticalScrollerVisible"),_columnsDidChange:function(){this.notifyPropertyChange("tableWidth");
this.invokeOnce("_updateColumnObservers");this.invokeOnce("reload")}.observes("*columns.[]"),_tableWidthDidChange:function(){this.invokeOnce("_updateTableLayout")
}.observes("tableWidth"),_updateTableLayout:function(){var a=this.get("tableWidth");
var b=this._bodyScrollView.getPath("containerView.frame").width;var c=Math.max(a,b);
this.beginPropertyChanges();if(this._headerScrollView){this._headerScrollView.adjust({right:this._bodyScrollView.get("frame").width-this._bodyScrollView.getPath("containerView.frame").width})
}if(this._headerView){this._headerView.adjust({minWidth:c})}if(this._bodyView){this._bodyView.adjust({minWidth:c})
}this.endPropertyChanges()},_updateColumnObservers:function(){var c=this.get("columns");
var a={},b;if(!this._columnIndex){this._columnIndex={}}if(c&&c.isEnumerable){c.forEach(function(e,d){var f=SC.guidFor(e);
if(!this._columnIndex[f]){this._columnIndex[f]=e;e.addObserver("width",this,"_columnWidthDidChange")
}a[f]=YES},this)}for(b in this._columnIndex){if(this._columnIndex.hasOwnProperty(b)&&!a[b]){this._columnIndex[b].removeObserver("width",this,"_columnWidthDidChange");
delete this._columnIndex[b]}}},_columnWidthDidChange:function(c,b,d,a){this.notifyPropertyChange("tableWidth");
this.invokeOnce("reload")},_onColumnAction:function(d){var e=d?d.get("selection"):null;
var b,c,a=SCTable.SORT_DIRECTION_ASCENDING;if(e&&(e.get("length")===1)&&this._lastColumnSelection&&(this._lastColumnSelection.get("firstObject")===e.get("firstObject"))){b=e.get("firstObject");
c=this.get("sort");if(c&&(c.valueKey===b.get("valueKey"))&&(c.direction===SCTable.SORT_DIRECTION_ASCENDING)){a=SCTable.SORT_DIRECTION_DESCENDING
}this.tableColumnDidRequestSort(b,this.get("columns").indexOf(b),a)}this._lastColumnSelection=e
},_headerScrollView:null,_headerView:null,_bodyScrollView:null,_bodyView:null,_columnIndex:null,_sortData:null,_lastColumnSelection:null});
SCTable.TableColumnHeaderView=SC.View.extend(SC.Control,{classNames:"sctable-column-header-view",sortDirection:null,displayProperties:["sortDirection","isMouseOver"],minWidth:30,isMouseOver:NO,contentPropertyDidChange:function(){this.displayDidChange()
},render:function(b,e){var a=["sort-indicator"];var c=this.get("sortDirection");var d=this.getPath("content.classNames");
if(!SC.none(c)){a.push(c)}b=b.addClass("col-%@".fmt(this.get("contentIndex")));if(this.get("isMouseOver")){b=b.addClass("hover")
}if(d){b=b.addClass(d)}b=b.begin("div").addClass("col-border").end();b=b.begin("div").addClass("col-name").text(this.getPath("content.name")).end();
if(this.getPath("content.canSort")){b=b.begin("div").addClass(a).end()}if(this.getPath("content.canResize")){b=b.begin("div").addClass("resize-handle").end()
}},willDestroyLayer:function(){this.set("content",null);this.set("tableDelegate",null)
},mouseDown:function(b){var c=NO,a;this._isDraggingHandle=NO;this._mouseDownInfo=null;
if(b.target.className==="resize-handle"){this._isDraggingHandle=YES;this._mouseDownInfo={didMove:NO,startPageX:b.pageX,startWidth:this.get("frame").width};
a=this.get("displayDelegate");if(a&&a.isTableColumnsDelegate){a.beginColumnResizeDrag(b,this.get("content"),this.get("contentIndex"))
}c=YES}return c},mouseDragged:function(b){var a,c;if(this._isDraggingHandle){this._mouseDownInfo.didMove=YES;
a=this.get("displayDelegate");if(a&&a.isTableColumnsDelegate){c=Math.max(this._mouseDownInfo.startWidth+b.pageX-this._mouseDownInfo.startPageX,this.get("minWidth"));
a.updateColumnResizeDrag(b,this.get("content"),this.get("contentIndex"),c)}}return this._isDraggingHandle
},mouseUp:function(b){var a,d,c=this._isDraggingHandle;if(this._isDraggingHandle){d=Math.max(this._mouseDownInfo.startWidth+b.pageX-this._mouseDownInfo.startPageX,this.get("minWidth"));
this.setPathIfChanged("content.width",d);a=this.get("displayDelegate");if(a&&a.isTableColumnsDelegate){a.endColumnResizeDrag(b,this.get("content"),this.get("contentIndex"),d)
}}this._isDraggingHandle=NO;this._mouseDownInfo=null;return c},mouseEntered:function(){if(!this.getPath("displayDelegate.isResizeDragInProgress")){this.setIfChanged("isMouseOver",YES)
}},mouseExited:function(){if(!this.getPath("displayDelegate.isResizeDragInProgress")){this.set("isMouseOver",NO)
}},_isDraggingHandle:NO,_mouseDownInfo:null});if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sctable")
};