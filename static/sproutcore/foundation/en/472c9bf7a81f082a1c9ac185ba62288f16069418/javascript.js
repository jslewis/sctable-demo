SC.TreeItemContent={isTreeItemContent:YES,treeItemChildren:null,treeItemIsExpanded:YES,treeItemIsGrouped:NO,treeItemDisclosureState:function(b,a){return this.get("treeItemIsExpanded")?SC.BRANCH_OPEN:SC.BRANCH_CLOSED
},treeItemCollapse:function(b,a){this.setIfChanged("treeItemIsExpanded",NO)},treeItemExpand:function(b,a){this.setIfChanged("treeItemIsExpanded",YES)
},treeItemBranchIndexes:function(e,c){var d=this.get("treeItemChildren"),b,g,a,f;
if(!d){return null}b=SC.IndexSet.create();g=d.get("length");for(a=0;a<g;a++){if(!(f=d.objectAt(a))){continue
}if(!f.get("treeItemChildren")){continue}if(f.treeItemDisclosureState(this,a)!==SC.LEAF_NODE){b.add(a)
}}return b.get("length")>0?b:null}};SC.BRANCH_OPEN=17;SC.BRANCH_CLOSED=18;SC.LEAF_NODE=32;
SC.CollectionContent={isCollectionContent:YES,contentIndexIsSelected:function(b,c,a){var d=b.get("selection");
return d?d.contains(c,a):NO},contentIndexIsEnabled:function(b,c,a){return b.get("isEnabled")
},contentGroupIndexes:function(a,b){return null},contentIndexIsGroup:function(b,c,a){return NO
},contentIndexOutlineLevel:function(b,c,a){return -1},contentIndexDisclosureState:function(b,c,a){return SC.LEAF_NODE
},contentIndexExpand:function(b,c,a){console.log("contentIndexExpand(%@, %@, %@)".fmt(b,c,a))
},contentIndexCollapse:function(b,c,a){console.log("contentIndexCollapse(%@, %@, %@)".fmt(b,c,a))
}};sc_require("mixins/tree_item_content");sc_require("mixins/collection_content");
SC.TreeItemObserver=SC.Object.extend(SC.Array,SC.CollectionContent,{item:null,delegate:null,parentObserver:null,parentItem:function(){var a=this.get("parentObserver");
return a?a.get("item"):null}.property("parentObserver").cacheable(),index:null,outlineLevel:0,children:null,disclosureState:SC.BRANCH_OPEN,branchIndexes:function(){var e=this.get("item"),b,f,a,d,c;
if(!e){return SC.IndexSet.EMPTY}else{if(e.isTreeItemContent){f=this.get("parentItem");
a=this.get("index");return e.treeItemBranchIndexes(f,a)}else{d=this.get("children");
if(!d){return null}c=SC.IndexSet.create();b=d.get("length");f=e;for(a=0;a<b;a++){if(!(e=d.objectAt(a))){continue
}if(!this._computeChildren(e,f,a)){continue}if(this._computeDisclosureState(e,f,a)!==SC.LEAF_NODE){c.add(a)
}}return c.get("length")>0?c:null}}}.property("children").cacheable(),isHeaderVisible:function(){return !!this.get("parentObserver")
}.property("parentObserver").cacheable(),length:0,objectAt:function(f,c){var g=this.get("length"),i=this.get("item"),a=this._objectAtCache,h=f,e=0,d,b;
if(f>=g){return undefined}if(this.get("isHeaderVisible")){if(f===0){return i}else{h--
}}i=null;if(!a){a=this._objectAtCache=[]}if((i=a[f])!==undefined){return i}b=this.get("children");
if(!b){return undefined}if(d=this.get("branchIndexes")){d.forEach(function(l){if(i||(l>h)){return
}var k=this.branchObserverAt(l),j;if(!k){return}j=k.get("length");if(l+j>h){i=k.objectAt(h-l,c);
h=-1}else{h-=j-1}},this)}if(h>=0){i=b.objectAt(h,c)}a[f]=i;return i},replace:function(a,b,j,d){var i=a,g=null,e,f,h;
if(d===undefined){d=SC.DROP_BEFORE}if(this.get("isHeaderVisible")){i--}if(i<0){throw"Tree Item cannot replace itself"
}if(e=this.get("branchIndexes")){e.forEach(function(k){if(g||(k>=i)){return}if(!(g=this.branchObserverAt(k))){return
}f=g.get("length");if((k+f===i)&&d===SC.DROP_AFTER){i-=k}else{if(k+f>i){i-=k}else{i-=f-1;
g=null}}},this)}if(g){g.replace(i,b,j,d);return this}h=i+b;if(b>1&&e){e.forEachIn(i,e.get("max")-i,function(k){if(k>h){return
}if(!(g=this.branchObserverAt(k))){return}f=g.get("length");h-=f-1},this)}b=h-i;var c=this.get("children");
if(!c){throw"cannot replace() tree item with no children"}if((b<0)||(h>c.get("length"))){throw"replace() range must lie within a single tree item"
}c.replace(i,b,j,d);return this},observerContentDidChange:function(g,f,e){this.invalidateBranchObserversAt(g);
this._objectAtCache=this._outlineLevelCache=null;this._disclosureStateCache=null;
this._contentGroupIndexes=NO;this.notifyPropertyChange("branchIndexes");var b=this.get("length"),c=this._computeLength(),a=this.get("parentObserver"),d;
if(b!==c){this.set("length",c)}if(!this._notifyParent){return this}if(a){d=SC.IndexSet.create(this.get("index"));
a._childrenRangeDidChange(a.get("children"),null,"[]",d)}else{if(b===c){f=this.expandChildIndex(g+f);
g=this.expandChildIndex(g);f=f-g;e=0}else{g=this.expandChildIndex(g);f=c-g;e=c-b}this.enumerableContentDidChange(g,f,e)
}},expandChildIndex:function(c){var b=c;if(this.get("isHeaderVisible")){c++}var a=this.get("branchIndexes");
if(!a||a.get("length")===0){return b}a.forEachIn(0,c,function(d){b+=this.branchObserverAt(d).get("length")-1
},this);return b},_contentGroupIndexes:NO,contentGroupIndexes:function(g,e){if(e!==this){return null
}var f=this._contentGroupIndexes;if(f!==NO){return f}if(this.get("parentObserver")){return null
}var j=this.get("item"),i,b,d,h,c,a;if(j&&j.isTreeItemContent){i=j.get("treeItemIsGrouped")
}else{i=!!this.delegate.get("treeItemIsGrouped")}if(i){f=SC.IndexSet.create();b=this.get("branchIndexes");
a=this.get("children");d=a?a.get("length"):0;h=c=0;if(b){b.forEach(function(l){f.add(h,(l+1)-c);
h+=(l+1)-c;c=l+1;var k=this.branchObserverAt(l);if(k){h+=k.get("length")-1}},this)
}if(c<d){f.add(h,d-c)}}else{f=null}this._contentGroupIndexes=f;return f},contentIndexIsGroup:function(b,d,a){var c=this.contentGroupIndexes(b,d);
return c?c.contains(a):NO},contentIndexOutlineLevel:function(j,g,e){if(g!==this){return -1
}var a=this._outlineLevelCache;if(a&&(a[e]!==undefined)){return a[e]}if(!a){a=this._outlineLevelCache=[]
}var f=this.get("length"),k=e,d=0,h=null,c,b,i;if(e>=f){return -1}if(this.get("isHeaderVisible")){if(e===0){return a[0]=this.get("outlineLevel")-1
}else{k--}}if(c=this.get("branchIndexes")){c.forEach(function(n){if((h!==null)||(n>k)){return
}var m=this.branchObserverAt(n),l;if(!m){return}l=m.get("length");if(n+l>k){h=m.contentIndexOutlineLevel(j,m,k-n);
k=-1}else{k-=l-1}},this)}if(k>=0){h=this.get("outlineLevel")}a[e]=h;return h},contentIndexDisclosureState:function(j,g,e){if(g!==this){return -1
}var a=this._disclosureStateCache;if(a&&(a[e]!==undefined)){return a[e]}if(!a){a=this._disclosureStateCache=[]
}var f=this.get("length"),k=e,d=0,h=null,c,b,i;if(e>=f){return SC.LEAF_NODE}if(this.get("isHeaderVisible")){if(e===0){return a[0]=this.get("disclosureState")
}else{k--}}if(c=this.get("branchIndexes")){c.forEach(function(n){if((h!==null)||(n>k)){return
}var m=this.branchObserverAt(n),l;if(!m){return}l=m.get("length");if(n+l>k){h=m.contentIndexDisclosureState(j,m,k-n);
k=-1}else{k-=l-1}},this)}if(k>=0){h=SC.LEAF_NODE}a[e]=h;return h},contentIndexExpand:function(b,f,a){var c,g=a,d,e;
if(f!==this){return}if(this.get("isHeaderVisible")){if(a===0){this._expand(this.get("item"));
return}else{g--}}if(c=this.get("branchIndexes")){c.forEach(function(k){if(k>=g){return
}var j=this.branchObserverAt(k),h;if(!j){return}h=j.get("length");if(k+h>g){j.contentIndexExpand(b,j,g-k);
g=-1}else{g-=h-1}},this)}if(g>=0){d=this.get("children");e=d?d.objectAt(g):null;if(e){this._expand(e,this.get("item"),g)
}}},contentIndexCollapse:function(b,f,a){var c,d,e,g=a;if(f!==this){return}if(this.get("isHeaderVisible")){if(a===0){this._collapse(this.get("item"));
return}else{g--}}if(c=this.get("branchIndexes")){c.forEach(function(k){if(k>=g){return
}var j=this.branchObserverAt(k),h;if(!j){return}h=j.get("length");if(k+h>g){j.contentIndexCollapse(b,j,g-k);
g=-1}else{g-=h-1}},this)}if(g>=0){d=this.get("children");e=d?d.objectAt(g):null;if(e){this._collapse(e,this.get("item"),g)
}}},branchObserverAt:function(d){var g=this._branchObserversByIndex,c=this._branchObserverIndexes,e,h,b,j,a,f,i;
if(!g){g=this._branchObserversByIndex=[]}if(!c){c=this._branchObserverIndexes=SC.IndexSet.create()
}if(e=g[d]){return e}a=this.get("children");j=a?a.objectAt(d):null;if(!j){return null
}g[d]=e=SC.TreeItemObserver.create({item:j,delegate:this.get("delegate"),parentObserver:this,index:d,outlineLevel:this.get("outlineLevel")+1});
c.add(d);return e},invalidateBranchObserversAt:function(c){var b=this._branchObserversByIndex,a=this._branchObserverIndexes;
if(!b||b.length<=c){return this}if(c<0){c=0}a.forEachIn(c,a.get("max")-c,function(e){var d=b[e];
if(d){d.destroy()}},this);b.length=c;return this},init:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("item");if(!a){throw"SC.TreeItemObserver.item cannot be null"}a.addObserver("*",this,this._itemPropertyDidChange);
this._itemPropertyDidChange(a,"*");this._notifyParent=YES},destroy:function(){this.invalidateBranchObserversAt(0);
this._objectAtCache=null;var c=this.get("item");if(c){c.removeObserver("*",this,this._itemPropertyDidChange)
}var a=this._children,b=this._childrenRangeObserver;if(a&&b){a.removeRangeObserver(b)
}arguments.callee.base.apply(this,arguments)},_itemPropertyDidChange:function(f,b){var a=this.get("children"),e=this.get("disclosureState"),d=this.get("item"),c;
this.beginPropertyChanges();c=this._computeDisclosureState(d);if(e!==c){this.set("disclosureState",c)
}c=this._computeChildren(d);if(a!==c){this.set("children",c)}this.endPropertyChanges()
},_childrenDidChange:function(){var c=this.get("disclosureState"),d=c===SC.BRANCH_OPEN?this.get("children"):null,b=this._children,a=this._childrenRangeObserver;
if(b===d){return this}if(a){b.removeRangeObserver(a)}if(d){this._childrenRangeObserver=d.addRangeObserver(null,this,this._childrenRangeDidChange)
}else{this._childrenRangeObserver=null}this._children=d;this._childrenRangeDidChange(d,null,"[]",null)
}.observes("children","disclosureState"),_childrenRangeDidChange:function(f,i,h,d){var a=this.get("children"),e=a?a.get("length"):0,c=d?d.get("min"):0,g=d?d.get("max"):e,b=this._childrenLen||0;
this._childrenLen=e;this.observerContentDidChange(c,g-c,e-b)},_computeDisclosureState:function(d,e,b){var c,a;
if(!d||!this._computeChildren(d)){return SC.LEAF_NODE}else{if(d.isTreeItemContent){if(e===undefined){e=this.get("parentItem")
}if(b===undefined){b=this.get("index")}return d.treeItemDisclosureState(e,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}return d.get(c)?SC.BRANCH_OPEN:SC.BRANCH_CLOSED}}},_collapse:function(d,e,b){var c,a;
if(!d||!this._computeChildren(d)){return this}else{if(d.isTreeItemContent){if(e===undefined){e=this.get("parentItem")
}if(b===undefined){b=this.get("index")}d.treeItemCollapse(e,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}d.setIfChanged(c,NO)}}return this},_expand:function(d,e,b){var c,a;
if(!d||!this._computeChildren(d)){return this}else{if(d.isTreeItemContent){if(e===undefined){e=this.get("parentItem")
}if(b===undefined){b=this.get("index")}d.treeItemExpand(e,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}d.setIfChanged(c,YES)}}return this},_computeChildren:function(c){var a,b;
if(!c){return null}else{if(c.isTreeItemContent){return c.get("treeItemChildren")}else{b=this._treeItemChildrenKey;
if(!b){a=this.get("delegate");b=a?a.get("treeItemChildrenKey"):"treeItemChildren";
this._treeItemChildrenKey=b}return c.get(b)}}},_computeLength:function(){var b=this.get("isHeaderVisible")?1:0,d=this.get("disclosureState"),c=this.get("children"),a;
if((d===SC.BRANCH_OPEN)&&c){b+=c.get("length");if(a=this.get("branchIndexes")){a.forEach(function(e){var f=this.branchObserverAt(e);
b+=f.get("length")-1},this)}}return b}});sc_require("private/tree_item_observer");
SC.TreeController=SC.ObjectController.extend(SC.SelectionSupport,{treeItemIsGrouped:NO,treeItemIsExpandedKey:"treeItemIsExpanded",treeItemChildrenKey:"treeItemChildren",arrangedObjects:function(){var a,b=this.get("content");
if(b){a=SC.TreeItemObserver.create({item:b,delegate:this})}else{a=null}this._sctc_arrangedObjects=a;
return a}.property().cacheable(),_sctc_invalidateArrangedObjects:function(){this.propertyWillChange("arrangedObjects");
var a=this._sctc_arrangedObjects;if(a){a.destroy()}this._sctc_arrangedObjects=null;
this.propertyDidChange("arrangedObjects")}.observes("content","treeItemIsExpandedKey","treeItemChildrenKey","treeItemIsGrouped"),_sctc_arrangedObjectsContentDidChange:function(){this.updateSelectionAfterContentChange()
}.observes("*arrangedObjects.[]"),canSelectGroups:NO,firstSelectableObject:function(){var d=this.get("arrangedObjects"),c,b,a=0;
if(!d){return null}if(this.get("canSelectGroups")){return d.get("firstObject")}c=d.contentGroupIndexes(null,d);
b=d.get("length");while(c.contains(a)&&(a<b)){a++}return a>=b?null:d.objectAt(a)}.property()});
SC.Gesture=SC.Object.extend({name:"gesture",touchIsInGesture:function(b,a){return NO
},touchStart:function(a){},touchesDragged:function(a,b){},touchEnd:function(a){},start:function(){if(!this.get("isActive")){this.set("isActive",YES);
var b=SC.$A(arguments);b.unshift(this);var a=this.name+"Start";if(this.view[a]){this.view[a].apply(this.view,b)
}}},end:function(){if(this.get("isActive")){this.set("isActive",NO);var b=SC.$A(arguments);
b.unshift(this);var a=this.name+"End";if(this.view[a]){this.view[a].apply(this.view,b)
}}},change:function(){if(this.get("isActive")){var b=SC.$A(arguments);b.unshift(this);
var a=this.name+"Changed";if(this.view[a]){this.view[a].apply(this.view,b)}}},cancel:function(){if(this.get("isActive")){this.set("isActive",NO);
var b=SC.$A(arguments);b.unshift(this);var a=this.name+"Cancelled";if(this.view[a]){this.view[a].apply(this.view,b)
}}},trigger:function(){var b=SC.$A(arguments);b.unshift(this);var a=this.name;if(this.view[a]){this.view[a].apply(this.view,b)
}},take:function(a){a.isTaken=YES;if(SC.none(a.touchResponder)||a.touchResponder!==this){a.makeTouchResponder(this,YES)
}},release:function(a){a.isTaken=NO;if(a.nextTouchResponder){a.makeTouchResponder(a.nextTouchResponder)
}},discardTouch:function(a){a.isTaken=YES;a.makeTouchResponder(null)},statusForTouch:function(c){var b=SC.guidFor(c.view)+this.name;
var a=c[b];if(!a){a=c[b]={}}return a},unassignedTouchDidStart:function(a){if(a.isTaken){return
}if(this.touchIsInGesture(a,this.statusForTouch(a))){this.take(a)}},unassignedTouchesDidChange:function(a,b){b.forEach(function(c){if(c.isTaken){return
}if(this.touchIsInGesture(c,this.statusForTouch(c))){this.take(c)}},this)},unassignedTouchDidEnd:function(a){},interestedInTouch:function(b){var a=this.statusForTouch(b);
if(a.isInterested){return}a.isInterested=YES;b.isInteresting++},uninterestedInTouch:function(b){var a=this.statusForTouch(b);
if(!a.isInterested){return}a.isInterested=NO;b.isInteresting--}});sc_require("system/gesture");
SC.PinchGesture=SC.Gesture.extend({name:"pinch",acceptsMultitouch:YES,scale:1,unassignedTouchesDidChange:function(a,b){if(b.length==2){this.take(b[0]);
this.take(b[1])}},touchStart:function(b){var a=b.touchesForResponder(this);if(!a||a.length==0){return YES
}else{if(a.length==1){this.start([a[0],b]);return YES}else{return NO}}},touchesDragged:function(a,c){var d=c.firstObject(),b=d.averagedTouchesForView(this);
if(b.touchCount==2){if(!this._startDistance){this._startDistance=b.d}this.scale=b.d/this._startDistance;
this.change(c,this.scale)}},touchEnd:function(b){this._startDistance=null;var a=b.touchesForResponder(this);
this.trigger(a,this.scale);this.end(a,this.scale);if(a){a.forEach(function(c){this.release(c)
},this)}}});sc_require("system/gesture");SC.SWIPE_HORIZONTAL="X";SC.SWIPE_VERTICAL="Y";
SC.SWIPE_ANY="XY";SC.SWIPE_LEFT="LEFT";SC.SWIPE_RIGHT="RIGHT";SC.SWIPE_UP="UP";SC.SWIPE_DOWN="DOWN";
SC.SwipeGesture=SC.Gesture.extend({name:"swipe",acceptsMultitouch:YES,direction:SC.SWIPE_HORIZONTAL,currentDirection:null,startDistance:5,swipeDistance:40,tolerance:0.5,touchIsInGesture:function(i,g){if(!g.flunked){var j=this.get("direction"),e=this.get("currentDirection"),a=this.get("startDistance"),h=i.pageX-i.startX,f=i.pageY-i.startY,c=Math.abs(h),b=Math.abs(f);
if(Math.abs(h)>a||Math.abs(f)>a){if(!e){if(j==SC.SWIPE_ANY){if(c>b){e=SC.SWIPE_HORIZONTAL
}else{if(b>c){e=SC.SWIPE_VERTICAL}else{return NO}}}else{e=j}this.set("currentDirection",e)
}var l=(e==SC.SWIPE_HORIZONTAL)?h:f,k=(e==SC.SWIPE_HORIZONTAL)?f:h;if(Math.abs(l)*this.get("tolerance")>Math.abs(k)){return YES
}}}return NO},touchStart:function(e){var b=this.get("currentDirection"),c=e["page"+b]-e["start"+b],a;
if(c<0){a=(b===SC.SWIPE_HORIZONTAL)?SC.SWIPE_LEFT:SC.SWIPE_UP}else{a=(b===SC.SWIPE_HORIZONTAL)?SC.SWIPE_RIGHT:SC.SWIPE_DOWN
}this.start(e,a,c);return YES},touchesDragged:function(j,e){var c=e.firstObject();
var f=this.get("currentDirection"),a=(f===SC.SWIPE_HORIZONTAL?"Y":"X"),i=c["page"+f]-c["start"+f],g=c["page"+a]-c["start"+a],h;
if(i<0){h=(f===SC.SWIPE_HORIZONTAL)?SC.SWIPE_LEFT:SC.SWIPE_UP}else{h=(f===SC.SWIPE_HORIZONTAL)?SC.SWIPE_RIGHT:SC.SWIPE_DOWN
}if(Math.abs(i)<this.get("startDistance")||Math.abs(i)*this.get("tolerance")<Math.abs(g)){this.release(c);
var b=c.touchesForResponder(this);if(!b||b.length==0){this.cancel(c,h,i)}}else{this.change(c,h,i)
}},touchEnd:function(h){var f=this.get("currentDirection"),e=(f===SC.SWIPE_HORIZONTAL?"Y":"X"),g=h["page"+f]-h["start"+f],b=h["page"+e]-h["start"+e],a;
if(g<0){a=(f===SC.SWIPE_HORIZONTAL)?SC.SWIPE_LEFT:SC.SWIPE_UP}else{a=(f===SC.SWIPE_HORIZONTAL)?SC.SWIPE_RIGHT:SC.SWIPE_DOWN
}if(Math.abs(g)>this.get("swipeDistance")||Math.abs(g)*this.get("tolerance")<Math.abs(b)){this.trigger(h,a)
}this.end(h,a,g);this.set("currentDirection",null);var c=h.touchesForResponder(this);
if(c){c.forEach(function(d){this.release(d)},this)}},cancel:function(){arguments.callee.base.apply(this,arguments);
this.set("currentDirection",null)}});sc_require("system/gesture");SC.TapGesture=SC.Gesture.extend({name:"tap",acceptsMultitouch:NO,_tapCount:null,_candidateTouch:null,_eventTimer:null,tapWiggle:10,tapDelay:200,touchIsInGesture:function(b,a){return !a.tapFlunked
},touchStart:function(a){if(this._eventTimer){this._eventTimer.invalidate()}if(this._candidateTouch&&this._candidateTouch.touch.identifier!==a.identifier){this._cancelTap(a);
return NO}this._candidateTouch={startTime:Date.now(),touch:a};this.start(a);return YES
},touchesDragged:function(a,c){var e=c[0];var b=(c.length>1||!this._candidateTouch||e.identifier!==this._candidateTouch.touch.identifier);
var d=this._calculateDragDistance(e)>this.get("tapWiggle");if(b||d){this._cancelTap(e)
}},touchEnd:function(a){if(this._calculateDragDistance(a)>this.get("tapWiggle")||Date.now()-this._candidateTouch.startTime>this.get("tapDelay")){this._cancelTap(a)
}else{this._addTap(a)}},_addTap:function(b){var a=this;if(this._eventTimer){this._eventTimer.invalidate()
}this._tapCount=(this._tapCount||0)+1;this._candidateTouch=null;this._eventTimer=SC.Timer.schedule({target:a,action:function(){this._triggerTap(b)
},interval:this.get("tapDelay")});this.change(b,this._tapCount);this.trigger(b,this._tapCount)
},_cancelTap:function(a){this.statusForTouch(a).tapFlunked=YES;this.cancel(a,this._tapCount);
if(this._eventTimer){this._eventTimer.invalidate()}this._tapCount=null;this._candidateTouch=null;
this._eventTimer=null},_triggerTap:function(a){this.end(a,this._tapCount);this._tapCount=null;
this._candidateTouch=null;this._eventTimer=null},_calculateDragDistance:function(a){return Math.sqrt(Math.pow(a.pageX-a.startX,2)+Math.pow(a.pageY-a.startY,2))
}});SC.AutoMixin={autoMixins:[],createChildView:function(b,c){if(!c){c={}}c.owner=c.parentView=this;
c.isVisibleInWindow=this.get("isVisibleInWindow");if(!c.page){c.page=this.page}var a=this.get("autoMixins");
a.push(c);b=b.create.apply(b,a);return b}};SC.mixin({_copy_computed_props:["maxWidth","maxHeight","paddingLeft","paddingRight","paddingTop","paddingBottom","fontFamily","fontSize","fontStyle","fontWeight","fontVariant","lineHeight","whiteSpace"],stringFromLayout:function(e){var d=["maxHeight","maxWidth","minHeight","minWidth","centerY","centerX","width","height","bottom","right","top","left"],a=[],c,b=d.length;
while(--b>=0){c=d[b];if(e.hasOwnProperty(c)){a.push(c+":"+e[c])}}return"{"+a.join(", ")+"}"
},heightForString:function(h,c,b,a,g){var e=this._heightCalcElement,f,i;if(!g){h=SC.RenderContext.escapeHTML(h)
}f=(a&&SC.typeOf(a)===SC.T_ARRAY)?a.join(" "):"";if(!c){c=100}if(!e){e=this._heightCalcElement=document.createElement("div");
document.body.insertBefore(e,null)}b=b+"; width: "+c+"px; left: "+(-1*c)+"px; position: absolute";
var d=SC.$(e);d.attr("style",b);if(f!==""){d.attr("class",f)}e.innerHTML=h;i=e.clientHeight;
e=null;return i},prepareStringMeasurement:function(o,a){var k=this._metricsCalculationElement,h,p,c,d;
h=SC.A(a).join(" ");if(!k){var n=document.createElement("div");SC.mixin(n.style,{position:"absolute",left:"0px",top:"0px",height:"0px",right:"0px",overflow:"hidden"});
k=this._metricsCalculationElement=document.createElement("div");n.appendChild(k);
document.body.insertBefore(n,null)}d=SC.$(k);if(SC.typeOf(o)!=SC.T_STRING){var g=null;
if(document.defaultView&&document.defaultView.getComputedStyle){g=document.defaultView.getComputedStyle(o,null)
}else{g=o.currentStyle}var m=this._copy_computed_props;for(var j=0;j<m.length;j++){var b=m[j],f=g[b];
k.style[b]=f}var l=k.style;if(l.font===""){var e="";if(l.fontStyle){e+=l.fontStyle+" "
}if(l.fontVariant){e+=l.fontVariant+" "}if(l.fontWeight){e+=l.fontWeight+" "}if(l.fontSize){e+=l.fontSize
}else{e+="10px"}if(l.lineHeight){e+="/"+l.lineHeight}e+=" ";if(l.fontFamily){e+=l.fontFamily
}else{l+="sans-serif"}k.style.font=e}SC.mixin(k.style,{left:"0px",top:"0px",position:"absolute",bottom:"auto",right:"auto",width:"auto",height:"auto"});
g=null}else{c=o;d.attr("style",c+"; position:absolute; left: 0px; top: 0px; bottom: auto; right: auto; width: auto; height: auto;")
}k.className=h;k=null},teardownStringMeasurement:function(){var a=this._metricsCalculationElement;
a.innerHTML="";a.className="";a.setAttribute("style","");a=null},measureString:function(c,b){if(!b){c=SC.RenderContext.escapeHTML(c)
}var d=this._metricsCalculationElement;if(!d){throw"measureString requires a string measurement environment to be set up. Did you mean metricsForString?"
}if(typeof d.innerText!="undefined"){d.innerText=c}else{d.textContent=c}var a={width:d.clientWidth,height:d.clientHeight};
d=null;return a},metricsForString:function(c,d,e,b){SC.prepareStringMeasurement(d,e);
var a=SC.measureString(c,b);SC.teardownStringMeasurement();return a}});sc_require("system/utils/string_measurement");
SC.AutoResize={autoResizeField:"displayTitle",shouldAutoResize:YES,shouldMeasureSize:YES,shouldResizeWidth:YES,shouldResizeHeight:NO,measuredSize:{width:0,height:0},autoSizePadding:10,initMixin:function(){this.addObserver(this.get("autoResizeField"),this,this._scar_valueDidChange)
},batchResizeId:null,_SCAR_measurementPending:NO,_SCAR_requestedBatchResizeId:null,_SCAR_batchResizeIdDidChange:function(){var b=this.get("batchResizeId"),a=this._SCAR_requestedBatchResizeId;
if(this._SCAR_measurementPending&&this._SCAR_requestedBatchResizeId!==b){SC.AutoResize.cancelResize(this,a);
SC.AutoResize.requestResize(this,b)}}.observes("batchResizeId"),measureSizeLater:function(){if(!this.get("shouldMeasureSize")){return
}var a=this.get("batchResizeId");SC.AutoResize.requestResize(this,a);this._SCAR_measurementPending=YES;
this._SCAR_requestedBatchResizeId=a},measureSize:function(c){var e,d,g=this.get(this.get("autoResizeField")),b,f,a;
if(SC.none(g)||g===""){e={width:0,height:0}}else{if(c){e=SC.measureString(g)}else{d=this.kindOf(SC.TextFieldView)?this.$input()[0]:this.get("layer");
if(!d){return}e=SC.metricsForString(g,d)}}this.set("measuredSize",e);if(this.get("shouldAutoResize")){b=this.get("autoSizePadding");
if(SC.typeOf(b)===SC.T_NUMBER){f=a=b}else{f=b.height;a=b.width}if(this.get("shouldResizeWidth")){this.adjust("width",e.width+a)
}if(this.get("shouldResizeHeight")){this.adjust("height",e.height+f)}}this._SCAR_measurementPending=NO;
return e},_scar_valueDidChange:function(){this.measureSizeLater()},didAppendToDocument:function(){this.measureSizeLater()
},didCreateLayer:function(){this.measureSizeLater()},needResize:null,untaggedViews:null,requestResize:function(b,e){if(SC.none(e)){var d=SC.AutoResize.untaggedViews||(SC.AutoResize.untaggedViews=SC.CoreSet.create());
d.add(b)}else{var c=SC.AutoResize.needResize||(SC.AutoResize.needResize={}),a=c[e]||(c[e]=SC.CoreSet.create());
a.add(b)}SC.RunLoop.currentRunLoop.invokeLast(SC.AutoResize.doBatchResize)},cancelResize:function(a,c){var b=SC.none(c)?SC.AutoResize.untaggedViews:SC.AutoResize.needResize[c];
if(b){b.remove(a)}},doBatchResize:function(){var a,c,b,d,e;e=SC.AutoResize.needResize;
for(a in e){c=e[a];while(b=c.pop()){d=b.get("layer");if(d){SC.prepareStringMeasurement(d);
b.measureSize(YES);break}}while(b=c.pop()){b.measureSize(YES)}SC.teardownStringMeasurement()
}c=SC.AutoResize.untaggedViews;if(!c){return}while(b=c.pop()){b.measureSize()}}};
SC.Button={value:null,toggleOnValue:YES,toggleOffValue:NO,localize:NO,localizeBindingDefault:SC.Binding.bool(),title:"",contentTitleKey:null,icon:null,contentIconKey:null,needsEllipsis:YES,displayTitle:function(){var a=this.get("title");
return(a&&this.get("localize"))?a.loc():(a||"")}.property("title","localize").cacheable(),keyEquivalent:null,renderTitle:function(b,a){var g=this.get("icon"),d="",h=this.get("displayTitle"),i=(!SC.none(h)&&h.length>0),c,j,e;
if(this.get("escapeHTML")){h=SC.RenderContext.escapeHTML(h)}if(g){var f=SC.BLANK_IMAGE_URL;
if(g.indexOf("/")>=0){d='<img src="'+g+'" alt="" class="icon" />'}else{d='<img src="'+f+'" alt="" class="'+g+'" />'
}i=YES}e=d+h;if(a){if(this.get("needsEllipsis")){b.push('<label class="sc-button-label ellipsis">'+e+"</label>")
}else{b.push('<label class="sc-button-label">'+e+"</label>")}this._ImageTitleCached=e
}else{c=this.$("label");if((j=c[0])){if(i){c.setClass("ellipsis",this.get("needsEllipsis"));
if(this._ImageTitleCached!==e){this._ImageTitleCached=e;j.innerHTML=e}}else{j.innerHTML=""
}}}return b},contentPropertyDidChange:function(h,c){var b=this.get("displayDelegate"),e=this.get("content"),g;
var d=this.getDelegateProperty("contentValueKey",b);if(d&&(c===d||c==="*")){this.set("value",e?(e.get?e.get(d):e[d]):null)
}var a=this.getDelegateProperty("contentTitleKey",b);if(a&&(c===a||c==="*")){this.set("title",e?(e.get?e.get(a):e[a]):null)
}var f=this.getDelegateProperty("contentIconKey",b);if(f&&(c===f||c==="*")){this.set("icon",e?(e.get?e.get(f):e[f]):null)
}return this},_button_displayObserver:function(){this.displayDidChange()}.observes("title","icon","value"),performKeyEquivalent:function(c,b){if(!this.get("isVisibleInWindow")){return NO
}if(!this.get("isEnabled")){return NO}var a=this.get("keyEquivalent");if(a){if(a===c){return this.triggerAction(b)
}}else{if((this.get("isDefault")&&(c==="return"))||(this.get("isCancel")&&(c==="escape"))){return this.triggerAction(b)
}}return NO},triggerAction:function(a){throw"SC.Button.triggerAction() is not defined in %@".fmt(this)
},computeIsSelectedForValue:function(d){var b=this.get("toggleOnValue"),c,a;if(SC.typeOf(d)===SC.T_ARRAY){if(d.length===1){c=(d[0]==b)
}else{c=null;d.find(function(e){a=(e==b);if(c===null){c=a}else{if(a!==c){c=SC.MIXED_STATE
}}return c===SC.MIXED_STATE})}}else{if(d===SC.MIXED_STATE){c=SC.MIXED_STATE}else{c=(d===b)
}}return c},initMixin:function(){if(!SC.none(this.get("value"))){this._button_valueDidChange()
}},_button_valueDidChange:function(){var b=this.get("value"),a=this.computeIsSelectedForValue(b);
this.set("isSelected",a)}.observes("value"),_button_isSelectedDidChange:function(){var c=this.get("isSelected"),b=this.computeIsSelectedForValue(this.get("value"));
if((c!==SC.MIXED_STATE)&&(b!==c)){var a=(c)?"toggleOnValue":"toggleOffValue";this.set("value",this.get(a))
}}.observes("isSelected")};SC.ContentDisplay={concatenatedProperties:"contentDisplayProperties",displayProperties:["content"],contentDisplayProperties:[],initMixin:function(){this._display_contentDidChange()
},destroyMixin:function(){if(!this._display_content){return}this._display_stopObservingContent(this._display_content);
this._display_content=null},_display_beginObservingContent:function(a){var b=this._display_contentPropertyDidChange;
if(SC.isArray(a)){a.invoke("addObserver","*",this,b)}else{if(a.addObserver){a.addObserver("*",this,b)
}}},_display_stopObservingContent:function(a){var b=this._display_contentPropertyDidChange;
if(SC.isArray(a)){a.invoke("removeObserver","*",this,b)}else{if(a.removeObserver){a.removeObserver("*",this,b)
}}},_display_contentDidChange:function(d,a,c){if((c=this.get("content"))===this._display_content){return
}var b=this._display_content;if(b){this._display_stopObservingContent(b)}b=this._display_content=c;
if(b){this._display_beginObservingContent(b)}this.displayDidChange()}.observes("content","contentDisplayProperties"),_display_contentPropertyDidChange:function(e,c,d,b){if(c==="*"){this.displayDidChange()
}else{var a=this.get("contentDisplayProperties");if(a&&a.indexOf(c)>=0){this.displayDidChange()
}}}};SC.STRING_TITLEIZE_REGEXP=(/([\s|\-|\_|\n])([^\s|\-|\_|\n]?)/g);SC.STRING_HUMANIZE_REGEXP=(/[\-_]/g);
SC.STRING_TRIM_REGEXP=(/^\s+|\s+$/g);SC.STRING_TRIM_LEFT_REGEXP=(/^\s+/g);SC.STRING_TRIM_RIGHT_REGEXP=(/\s+$/g);
SC.STRING_REGEXP_ESCAPED_REGEXP=(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g);SC.STRING_DASHERIZE_CACHE={top:"top",left:"left",right:"right",bottom:"bottom",width:"width",height:"height",minWidth:"min-width",maxWidth:"max-width"};
SC.INFLECTION_CONSTANTS={PLURAL:[[/(quiz)$/i,"$1zes"],[/^(ox)$/i,"$1en"],[/([m|l])ouse$/i,"$1ice"],[/(matr|vert|ind)ix|ex$/i,"$1ices"],[/(x|ch|ss|sh)$/i,"$1es"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/(hive)$/i,"$1s"],[/(?:([^f])fe|([lr])f)$/i,"$1$2ves"],[/sis$/i,"ses"],[/([ti])um$/i,"$1a"],[/(buffal|tomat)o$/i,"$1oes"],[/(bu)s$/i,"$1ses"],[/(alias|status)$/i,"$1es"],[/(octop|vir)us$/i,"$1i"],[/(ax|test)is$/i,"$1es"],[/s$/i,"s"],[/$/,"s"]],SINGULAR:[[/(quiz)zes$/i,"$1"],[/(matr)ices$/i,"$1ix"],[/(vert|ind)ices$/i,"$1ex"],[/^(ox)en/i,"$1"],[/(alias|status)es$/i,"$1"],[/(octop|vir)i$/i,"$1us"],[/(cris|ax|test)es$/i,"$1is"],[/(shoe)s$/i,"$1"],[/(o)es$/i,"$1"],[/(bus)es$/i,"$1"],[/([m|l])ice$/i,"$1ouse"],[/(x|ch|ss|sh)es$/i,"$1"],[/(m)ovies$/i,"$1ovie"],[/(s)eries$/i,"$1eries"],[/([^aeiouy]|qu)ies$/i,"$1y"],[/([lr])ves$/i,"$1f"],[/(tive)s$/i,"$1"],[/(hive)s$/i,"$1"],[/([^f])ves$/i,"$1fe"],[/(^analy)ses$/i,"$1sis"],[/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i,"$1$2sis"],[/([ti])a$/i,"$1um"],[/(n)ews$/i,"$1ews"],[/s$/i,""]],IRREGULAR:[["move","moves"],["sex","sexes"],["child","children"],["man","men"],["person","people"]],UNCOUNTABLE:["sheep","fish","series","species","money","rice","information","info","equipment"]};
SC.StringInflections={capitalizeEach:function(){return this.replace(SC.STRING_TITLEIZE_REGEXP,function(c,a,b){return(b)?(a+b.toUpperCase()):a
}).capitalize()},titleize:function(){var a=this.replace(SC.STRING_DECAMELIZE_REGEXP,"$1_$2");
return a.replace(SC.STRING_TITLEIZE_REGEXP,function(c,d,b){return(b)?(" "+b.toUpperCase()):" "
}).capitalize()},classify:function(){var a=this.replace(SC.STRING_TITLEIZE_REGEXP,function(e,f,d){return(d)?d.toUpperCase():""
});var c=a.charAt(0),b=c.toUpperCase();return(c!==b)?(b+a.slice(1)):a},humanize:function(){return this.decamelize().replace(SC.STRING_HUMANIZE_REGEXP," ")
},escapeForRegExp:function(){return this.replace(SC.STRING_REGEXP_ESCAPED_REGEXP,"\\$1")
},removeDiacritics:function(){var a=SC.diacriticMappingTable;if(!a){SC.diacriticMappingTable={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Ā":"A","Ă":"A","Ą":"A","Ǎ":"A","Ǟ":"A","Ǡ":"A","Ǻ":"A","Ȁ":"A","Ȃ":"A","Ȧ":"A","Ḁ":"A","Ạ":"A","Ả":"A","Ấ":"A","Ầ":"A","Ẩ":"A","Ẫ":"A","Ậ":"A","Ắ":"A","Ằ":"A","Ẳ":"A","Ẵ":"A","Ặ":"A","Å":"A","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ç":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ḉ":"C","Ď":"D","Ḋ":"D","Ḍ":"D","Ḏ":"D","Ḑ":"D","Ḓ":"D","È":"E","É":"E","Ê":"E","Ë":"E","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ȩ":"E","Ḕ":"E","Ḗ":"E","Ḙ":"E","Ḛ":"E","Ḝ":"E","Ẹ":"E","Ẻ":"E","Ẽ":"E","Ế":"E","Ề":"E","Ể":"E","Ễ":"E","Ệ":"E","Ḟ":"F","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","Ǧ":"G","Ǵ":"G","Ḡ":"G","Ĥ":"H","Ȟ":"H","Ḣ":"H","Ḥ":"H","Ḧ":"H","Ḩ":"H","Ḫ":"H","Ì":"I","Í":"I","Î":"I","Ï":"I","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ḭ":"I","Ḯ":"I","Ỉ":"I","Ị":"I","Ĵ":"J","Ķ":"K","Ǩ":"K","Ḱ":"K","Ḳ":"K","Ḵ":"K","Ĺ":"L","Ļ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ḻ":"L","Ḽ":"L","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ñ":"N","Ń":"N","Ņ":"N","Ň":"N","Ǹ":"N","Ṅ":"N","Ṇ":"N","Ṉ":"N","Ṋ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ō":"O","Ŏ":"O","Ő":"O","Ơ":"O","Ǒ":"O","Ǫ":"O","Ǭ":"O","Ȍ":"O","Ȏ":"O","Ȫ":"O","Ȭ":"O","Ȯ":"O","Ȱ":"O","Ṍ":"O","Ṏ":"O","Ṑ":"O","Ṓ":"O","Ọ":"O","Ỏ":"O","Ố":"O","Ồ":"O","Ổ":"O","Ỗ":"O","Ộ":"O","Ớ":"O","Ờ":"O","Ở":"O","Ỡ":"O","Ợ":"O","Ṕ":"P","Ṗ":"P","Ŕ":"R","Ŗ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṙ":"R","Ṛ":"R","Ṝ":"R","Ṟ":"R","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","Ș":"S","Ṡ":"S","Ṣ":"S","Ṥ":"S","Ṧ":"S","Ṩ":"S","Ţ":"T","Ť":"T","Ț":"T","Ṫ":"T","Ṭ":"T","Ṯ":"T","Ṱ":"T","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","Ư":"U","Ǔ":"U","Ǖ":"U","Ǘ":"U","Ǚ":"U","Ǜ":"U","Ȕ":"U","Ȗ":"U","Ṳ":"U","Ṵ":"U","Ṷ":"U","Ṹ":"U","Ṻ":"U","Ụ":"U","Ủ":"U","Ứ":"U","Ừ":"U","Ử":"U","Ữ":"U","Ự":"U","Ṽ":"V","Ṿ":"V","Ŵ":"W","Ẁ":"W","Ẃ":"W","Ẅ":"W","Ẇ":"W","Ẉ":"W","Ẋ":"X","Ẍ":"X","Ý":"Y","Ŷ":"Y","Ÿ":"Y","Ȳ":"Y","Ẏ":"Y","Ỳ":"Y","Ỵ":"Y","Ỷ":"Y","Ỹ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","Ẑ":"Z","Ẓ":"Z","Ẕ":"Z","`":"`","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","ā":"a","ă":"a","ą":"a","ǎ":"a","ǟ":"a","ǡ":"a","ǻ":"a","ȁ":"a","ȃ":"a","ȧ":"a","ḁ":"a","ạ":"a","ả":"a","ấ":"a","ầ":"a","ẩ":"a","ẫ":"a","ậ":"a","ắ":"a","ằ":"a","ẳ":"a","ẵ":"a","ặ":"a","ḃ":"b","ḅ":"b","ḇ":"b","ç":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ḉ":"c","ď":"d","ḋ":"d","ḍ":"d","ḏ":"d","ḑ":"d","ḓ":"d","è":"e","é":"e","ê":"e","ë":"e","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","ȅ":"e","ȇ":"e","ȩ":"e","ḕ":"e","ḗ":"e","ḙ":"e","ḛ":"e","ḝ":"e","ẹ":"e","ẻ":"e","ẽ":"e","ế":"e","ề":"e","ể":"e","ễ":"e","ệ":"e","ḟ":"f","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","ǧ":"g","ǵ":"g","ḡ":"g","ĥ":"h","ȟ":"h","ḣ":"h","ḥ":"h","ḧ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ì":"i","í":"i","î":"i","ï":"i","ĩ":"i","ī":"i","ĭ":"i","į":"i","ǐ":"i","ȉ":"i","ȋ":"i","ḭ":"i","ḯ":"i","ỉ":"i","ị":"i","ĵ":"j","ǰ":"j","ķ":"k","ǩ":"k","ḱ":"k","ḳ":"k","ḵ":"k","ĺ":"l","ļ":"l","ľ":"l","ḷ":"l","ḹ":"l","ḻ":"l","ḽ":"l","ḿ":"m","ṁ":"m","ṃ":"m","ñ":"n","ń":"n","ņ":"n","ň":"n","ǹ":"n","ṅ":"n","ṇ":"n","ṉ":"n","ṋ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ō":"o","ŏ":"o","ő":"o","ơ":"o","ǒ":"o","ǫ":"o","ǭ":"o","ȍ":"o","ȏ":"o","ȫ":"o","ȭ":"o","ȯ":"o","ȱ":"o","ṍ":"o","ṏ":"o","ṑ":"o","ṓ":"o","ọ":"o","ỏ":"o","ố":"o","ồ":"o","ổ":"o","ỗ":"o","ộ":"o","ớ":"o","ờ":"o","ở":"o","ỡ":"o","ợ":"o","ṕ":"p","ṗ":"p","ŕ":"r","ŗ":"r","ř":"r","ȑ":"r","ȓ":"r","ṙ":"r","ṛ":"r","ṝ":"r","ṟ":"r","ś":"s","ŝ":"s","ş":"s","š":"s","ș":"s","ṡ":"s","ṣ":"s","ṥ":"s","ṧ":"s","ṩ":"s","ţ":"t","ť":"t","ț":"t","ṫ":"t","ṭ":"t","ṯ":"t","ṱ":"t","ẗ":"t","ù":"u","ú":"u","û":"u","ü":"u","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","ư":"u","ǔ":"u","ǖ":"u","ǘ":"u","ǚ":"u","ǜ":"u","ȕ":"u","ȗ":"u","ṳ":"u","ṵ":"u","ṷ":"u","ṹ":"u","ṻ":"u","ụ":"u","ủ":"u","ứ":"u","ừ":"u","ử":"u","ữ":"u","ự":"u","ṽ":"v","ṿ":"v","ŵ":"w","ẁ":"w","ẃ":"w","ẅ":"w","ẇ":"w","ẉ":"w","ẘ":"w","ẋ":"x","ẍ":"x","ý":"y","ÿ":"y","ŷ":"y","ȳ":"y","ẏ":"y","ẙ":"y","ỳ":"y","ỵ":"y","ỷ":"y","ỹ":"y","ź":"z","ż":"z","ž":"z","ẑ":"z","ẓ":"z","ẕ":"z"};
a=SC.diacriticMappingTable}var d,e,b="",f=this.length;for(var c=0;c<=f;++c){d=this.charAt(c);
e=a[d];if(e){b+=e}else{b+=d}}return b},trim:function(){return this.replace(SC.STRING_TRIM_REGEXP,"")
},trimLeft:function(){return this.replace(SC.STRING_TRIM_LEFT_REGEXP,"")},trimRight:function(){return this.replace(SC.STRING_TRIM_RIGHT_REGEXP,"")
},pluralize:function(){var j,e,b=this.split(/\s/).pop(),g=this.replace(b,""),a=b.charAt(0).match(/[A-Z]/)?true:false;
b=b.toLowerCase();for(j=0,e=SC.INFLECTION_CONSTANTS.UNCOUNTABLE.length;j<e;j++){var f=SC.INFLECTION_CONSTANTS.UNCOUNTABLE[j];
if(b==f){return this.toString()}}for(j=0,e=SC.INFLECTION_CONSTANTS.IRREGULAR.length;
j<e;j++){var c=SC.INFLECTION_CONSTANTS.IRREGULAR[j][0],i=SC.INFLECTION_CONSTANTS.IRREGULAR[j][1];
if((b==c)||(b==i)){if(a){i=i.capitalize()}return g+i}}for(j=0,e=SC.INFLECTION_CONSTANTS.PLURAL.length;
j<e;j++){var h=SC.INFLECTION_CONSTANTS.PLURAL[j][0],d=SC.INFLECTION_CONSTANTS.PLURAL[j][1];
if(h.test(b)){return this.replace(h,d)}}},singularize:function(){var j,e,b=this.split(/\s/).pop(),g=this.replace(b,""),a=b.charAt(0).match(/[A-Z]/)?true:false;
b=b.toLowerCase();for(j=0,e=SC.INFLECTION_CONSTANTS.UNCOUNTABLE.length;j<e;j++){var f=SC.INFLECTION_CONSTANTS.UNCOUNTABLE[j];
if(b==f){return this.toString()}}for(j=0,e=SC.INFLECTION_CONSTANTS.IRREGULAR.length;
j<e;j++){var c=SC.INFLECTION_CONSTANTS.IRREGULAR[j][0],i=SC.INFLECTION_CONSTANTS.IRREGULAR[j][1];
if((b==c)||(b==i)){if(a){c=c.capitalize()}return g+c}}for(j=0,e=SC.INFLECTION_CONSTANTS.SINGULAR.length;
j<e;j++){var h=SC.INFLECTION_CONSTANTS.SINGULAR[j][0],d=SC.INFLECTION_CONSTANTS.SINGULAR[j][1];
if(h.test(b)){return this.replace(h,d)}}}};SC.String.strip=SC.String.trim;SC.supplement(SC.String,SC.StringInflections);
SC.supplement(String.prototype,SC.StringInflections);sc_require("mixins/string");
SC.AUTO_CONTROL_SIZE="__AUTO__";SC.JUMBO_CONTROL_SIZE="sc-jumbo-size";SC.HUGE_CONTROL_SIZE="sc-huge-size";
SC.LARGE_CONTROL_SIZE="sc-large-size";SC.REGULAR_CONTROL_SIZE="sc-regular-size";SC.SMALL_CONTROL_SIZE="sc-small-size";
SC.TINY_CONTROL_SIZE="sc-tiny-size";SC.Control={isControl:YES,initMixin:function(){this._control_contentDidChange()
},isSelected:NO,isSelectedBindingDefault:SC.Binding.oneWay().bool(),isActive:NO,isActiveBindingDefault:SC.Binding.oneWay().bool(),value:null,content:null,contentValueKey:null,contentPropertyDidChange:function(b,a){return this.updatePropertyFromContent("value",a,"contentValueKey",b)
},updatePropertyFromContent:function(f,c,e,d){var a,b;if(e===undefined){e="content"+f.capitalize()+"Key"
}if(this[e]){e=this.get(e)}else{if((a=this.displayDelegate)&&(b=a[e])){e=a.get?a.get(e):b
}else{return this}}if(c==="*"||c===e){if(d===undefined){d=this.get("content")}if(d){b=d.get?d.get(e):d[e]
}else{b=null}this.set(f,b)}return this},updateContentWithValueObserver:function(){var a=this.contentValueKey?this.get("contentValueKey"):this.getDelegateProperty("contentValueKey",this.displayDelegate),b=this.get("content");
if(!a||!b){return}var c=this.get("value");if(typeof b.setIfChanged===SC.T_FUNCTION){b.setIfChanged(a,c)
}else{if(b[a]!==c){b[a]=c}}}.observes("value"),fieldKey:null,fieldLabel:null,errorLabel:function(){var a,c,b;
if(a=this.get("fieldLabel")){return a}c=this.get("fieldKey")||this.constructor.toString();
b=(c||"").humanize().capitalize();return"ErrorLabel."+c.locWithDefault(("FieldKey."+c).locWithDefault(b))
}.property("fieldLabel","fieldKey").cacheable(),controlSize:SC.REGULAR_CONTROL_SIZE,displayProperties:"isEnabled isSelected isActive controlSize".w(),_CONTROL_TMP_CLASSNAMES:{},renderMixin:function(b,g){var d=this.get("isSelected"),c=!this.get("isEnabled"),e=this._CONTROL_TMP_CLASSNAMES;
e.mixed=d===SC.MIXED_STATE;e.sel=d&&(d!==SC.MIXED_STATE);e.active=this.get("isActive");
var f=this.get("controlSize");if(g){b.setClass(e);if(f!==SC.AUTO_CONTROL_SIZE){b.addClass(f)
}}else{b.$().setClass(e);if(f!==SC.AUTO_CONTROL_SIZE){b.$().addClass(f)}}if(!g&&this.$input){var a=this.$input();
if(a.attr("type")!=="radio"){this.$input().attr("disabled",c)}}},_control_content:null,_control_contentDidChange:function(){var b=this.get("content");
if(this._control_content===b){return}var c=this.contentPropertyDidChange,a=this._control_content;
if(a&&a.removeObserver){a.removeObserver("*",this,c)}this._control_content=b;if(b&&b.addObserver){b.addObserver("*",this,c)
}this.contentPropertyDidChange(b,"*")}.observes("content"),_control_contentValueKeyDidChange:function(){this.contentPropertyDidChange(this.get("content"),"*")
}.observes("contentValueKey")};SC.Editable={editorDelegate:null,isEditable:NO,isEditing:NO,beginEditing:function(){if(!this.get("isEditable")){return NO
}if(this.get("isEditing")){return YES}this.beginPropertyChanges();this.set("isEditing",YES);
this.becomeFirstResponder();this.endPropertyChanges();return YES},discardEditing:function(){return !this.get("isEditing")
},commitEditing:function(){if(!this.get("isEditing")){return YES}this.set("isEditing",NO);
this.resignFirstResponder();this.invokeDelegateMethod(this.get("editorDelegate"),"inlineEditorShouldCommitEditing",this,this.get("value"));
return YES}};SC.ALIGN_JUSTIFY="justify";SC.FlowedLayout={layoutDirection:SC.LAYOUT_HORIZONTAL,autoResize:YES,shouldResizeWidth:YES,shouldResizeHeight:YES,align:SC.ALIGN_LEFT,canWrap:YES,defaultFlowSpacing:{left:0,bottom:0,top:0,right:0},flowPadding:{left:0,bottom:0,right:0,top:0},_scfl_validFlowPadding:function(){var b=this.get("flowPadding")||{},a={};
a.left=b.left||0;a.top=b.top||0;a.bottom=b.bottom||0;a.right=b.right||0;return a}.property("flowPadding").cacheable(),concatenatedProperties:["childMixins"],initMixin:function(){this.invokeOnce("_scfl_tile")
},_scfl_childViewsDidChange:function(a){this.invokeOnce("_scfl_tile")}.observes("childViews"),_scfl_layoutPropertyDidChange:function(){this.invokeOnce("_scfl_tile")
},layoutDidChangeFor:function(g){if(!this._scfl_itemLayouts){return arguments.callee.base.apply(this,arguments)
}var b=this._scfl_itemLayouts[SC.guidFor(g)],a=g.get("layout"),d=g.get("frame");if(!b){return arguments.callee.base.apply(this,arguments)
}var e=YES;if(b.left&&b.left!==a.left){e=NO}else{if(b.top&&b.top!==a.top){e=NO}else{if(!g.get("fillWidth")&&b.width&&b.width!==a.width){e=NO
}else{if(!b.width&&!g.get("fillWidth")&&d.width!==g._scfl_lastFrame.width){e=NO}else{if(!g.get("fillHeight")&&b.height&&b.height!==a.height){e=NO
}else{if(!b.height&&!g.get("fillHeight")&&d.height!==g._scfl_lastFrame.height){e=NO
}}}}}}if(e){return arguments.callee.base.apply(this,arguments)}this.invokeOnce("_scfl_tile");
arguments.callee.base.apply(this,arguments)},observeChildLayout:function(a){if(a._scfl_isBeingObserved){return
}a._scfl_isBeingObserved=YES;a.addObserver("isVisible",this,"_scfl_layoutPropertyDidChange");
a.addObserver("useAbsoluteLayout",this,"_scfl_layoutPropertyDidChange");a.addObserver("calculatedWidth",this,"_scfl_layoutPropertyDidChange");
a.addObserver("calculatedHeight",this,"_scfl_layoutPropertyDidChange")},unobserveChildLayout:function(a){a._scfl_isBeingObserved=NO;
a.removeObserver("isVisible",this,"_scfl_layoutPropertyDidChange");a.removeObserver("useAbsoluteLayout",this,"_scfl_layoutPropertyDidChange");
a.removeObserver("calculatedWidth",this,"_scfl_layoutPropertyDidChange");a.removeObserver("calculatedHeight",this,"_scfl_layoutPropertyDidChange")
},shouldIncludeChildInFlow:function(a){return a.get("isVisible")&&!a.get("useAbsoluteLayout")
},flowSpacingForView:function(a,b){var c=b.get("flowSpacing");if(SC.none(c)){c=this.get("defaultFlowSpacing")
}if(SC.typeOf(c)===SC.T_NUMBER){c={left:c,right:c,bottom:c,top:c}}else{c.left=c.left||0;
c.right=c.right||0;c.top=c.top||0;c.bottom=c.bottom||0}return c},flowSizeForView:function(a,c){var b=c.get("calculatedWidth"),e=c.get("calculatedHeight");
var d={},g=c.get("frame");c._scfl_lastFrame=g;if(b){d.width=b}else{if(c._scfl_cachedCalculatedFlowSize&&c._scfl_cachedCalculatedFlowSize.width==g.width){d.width=c._scfl_cachedFlowSize.width
}else{d.width=g.width}}if(e){d.height=e}else{if(c._scfl_cachedCalculatedFlowSize&&c._scfl_cachedCalculatedFlowSize.height==g.height){d.height=c._scfl_cachedFlowSize.height
}else{d.height=g.height}}if(c.get("isSpacer")){if(this.get("layoutDirection")===SC.LAYOUT_HORIZONTAL){d.width=0
}else{d.height=0}}if(this.get("layoutDirection")===SC.LAYOUT_HORIZONTAL&&c.get("fillHeight")){d.height=0
}else{if(this.get("layoutDirection")===SC.LAYOUT_VERTICAL&&c.get("fillWidth")){d.width=0
}}return d},flowRow:function(c,r,a,d,h,n,k,p){if(n==="left"){d-=h.left+h.right}else{d-=h.top+h.bottom
}var s,q=c.length,i,t,m=0,b=0,o=0;for(i=0;i<q;i++){s=c[i];if(s.get("isSpacer")){b+=s.get("spaceUnits")||1
}else{m+=s._scfl_cachedSpacedSize[n==="left"?"width":"height"]}}if(q>1&&p===SC.ALIGN_JUSTIFY){b+=q-1
}if(b>0){o=(d-m)/b;m=d}var g=h.left,f=h.top,l,j,e=0;if(n==="left"){f=r}else{g=r}if(p===SC.ALIGN_RIGHT||p===SC.ALIGN_BOTTOM){if(n==="left"){g=(d-m-h.right)
}else{f=(d-m-h.bottom)}}else{if(p===SC.ALIGN_CENTER||p===SC.ALIGN_MIDDLE){if(n==="left"){g=(d-h.top-h.bottom)/2-m/2
}else{f=(d-h.top-h.bottom)/2-m/2}}}for(i=0;i<q;i++){s=c[i];l=undefined;j=undefined;
if(s.get("fillHeight")&&n==="left"){j=a-s._scfl_cachedSpacedSize.height}if(s.get("fillWidth")&&n==="top"){l=a-s._scfl_cachedSpacedSize.width
}if(s.get("isSpacer")){e=s._scfl_cachedSpacedSize[n==="left"?"width":"height"];e=Math.max(e,o*(s.get("spaceUnits")||1));
if(n==="left"){l=e}else{j=e}}else{if(n==="left"){e=s._scfl_cachedSpacedSize.width
}else{e=s._scfl_cachedSpacedSize.height}}this.flowPositionView(i,s,g,f,l,j);if(n==="left"){g+=e
}else{f+=e}if(p===SC.ALIGN_JUSTIFY){if(n==="left"){g+=o}else{f+=o}}}if(n==="left"){return g
}return f},flowPositionView:function(f,i,e,d,a,h){var g=this._scfl_itemLayouts[SC.guidFor(i)],c=i._scfl_cachedSpacing;
var b={left:e+c.left,top:d+c.top};if(a!==undefined){b.width=a}if(h!==undefined){b.height=h
}this._scfl_itemLayouts[SC.guidFor(i)]=b;if(g&&g.left==b.left&&g.top==b.top&&g.width==b.width&&b.width!==undefined&&g.height==b.height&&b.height!==undefined){return
}i.adjust(b)},renderMixin:function(a){a.css("minWidth",this.get("calculatedWidth"));
a.css("minHeight",this.get("calculatedHeight"))},clippingFrame:function(){var b=arguments.callee.base.apply(this,arguments),a=this.get("calculatedWidth"),c=this.get("calculatedHeight");
if(a){b.width=a}if(c){b.height=c}return b}.property("calculatedWidth","calculatedHeight"),_scfl_calculatedSizeDidChange:function(){var c=this.$(),a=this.get("calculatedWidth"),b=this.get("calculatedHeight");
if(a){c.css("minWidth",this.get("calculatedWidth"))}if(b){c.css("minHeight",this.get("calculatedHeight"))
}}.observes("calculatedWidth","calculatedHeight"),_scfl_tile:function(){if(!this._scfl_itemLayouts){this._scfl_itemLayouts={}
}var k=this._scfl_isObserving||SC.CoreSet.create(),F=SC.CoreSet.create();var e=this.get("childViews"),f,t,B=e.length,m=[],h=[],E=0,a=0,p,g=NO,C=0,l=0,x=this.get("frame").width,u=this.get("frame").height,o=this.get("canWrap"),D=this.get("layoutDirection"),r=this.get("_scfl_validFlowPadding"),b,z,d,A=this.get("align"),s=0;
var y,w,i,v,c,n,q,j;if(D===SC.LAYOUT_HORIZONTAL){j=x;q=x-r.right;y="left";v="top";
w="right";c="bottom";i="width";n="height"}else{j=u;q=u-r.bottom;y="top";v="left";
w="bottom";c="right";i="height";n="width"}C=r[v];l=r[y];for(t=0;t<B;t++){f=e[t];k.remove(SC.guidFor(f));
F.add(f);p=f.get("startsNewRow");if(!this.shouldIncludeChildInFlow(f)){g=p||g;continue
}b=this.flowSizeForView(t,f);z=this.flowSpacingForView(t,f);d={width:b.width+z.left+z.right,height:b.height+z.top+z.bottom};
f._scfl_cachedFlowSize=b;f._scfl_cachedSpacedSize=d;f._scfl_cachedSpacing=z;if(p||g||(o&&h.length>0&&l+b[i]>=q)){g=NO;
this.flowRow(h,C,a,j,r,y,v,A);h=[];m.push(h);C+=a;a=E;l=r[y]}h.push(f);a=Math.max(d[n],a);
l+=d[i];s=Math.max(s,l)}l=this.flowRow(h,C,a,j,r,y,v,A);s=Math.max(s,l);this._scfl_lastFrameSize=this.get("frame");
if(this.get("autoResize")){if(s){if(D===SC.LAYOUT_HORIZONTAL){if(this.get("shouldResizeWidth")){this.set("calculatedWidth",s+r[w])
}}else{if(this.get("shouldResizeHeight")){this.set("calculatedHeight",s+r[w])}}}if(C+a){if(D===SC.LAYOUT_HORIZONTAL){if(this.get("shouldResizeHeight")){this.set("calculatedHeight",C+a+r[c])
}}else{if(this.get("shouldResizeWidth")){this.set("calculatedWidth",C+a+r[c])}}}}B=k.length;
for(t=0;t<B;t++){this.unobserveChildLayout(k[t])}B=F.length;for(t=0;t<B;t++){this.observeChildLayout(F[t])
}this._scfl_isObserving=F},_scfl_frameDidChange:function(){var b=this.get("frame"),a=this._scfl_lastFrameSize;
this._scfl_lastFrameSize=b;if(a&&a.width==b.width&&a.height==b.height){return}this.invokeOnce("_scfl_tile")
}.observes("frame"),destroyMixin:function(){var c=this._scfl_isObserving;if(!c){return
}var b=c.length,a;for(a=0;a<b;a++){this.unobserveChildLayout(c[a])}},reorder:function(b){if(!SC.typeOf(b)===SC.T_ARRAY){b=arguments
}var c=b.length,d=this.childViews,a;this.beginPropertyChanges();while(c-->0){a=b[c];
d.removeObject(a);d.unshiftObject(a)}this.endPropertyChanges();this._scfl_childViewsDidChange();
return this}};SC.Gesturable={concatenatedProperties:["gestures"],gestures:[],initMixin:function(){this.createGestures()
},createGestures:function(){var e=this.get("gestures"),b,a=e.length,c,d=[];for(b=0;
b<a;b++){if(SC.typeOf(e[b])===SC.T_STRING){c=this.get(e[b])}else{c=e[b]}if(!c){throw"Could not find gesture named '"+e[b]+"' on view."
}if(c.isClass){c=c.create({view:this})}if(SC.typeOf(e[b])===SC.T_STRING){this[e[b]]=c
}d.push(c)}this.set("gestures",d)},touchStart:function(a){this.gestureTouchStart(a)
},touchesDragged:function(a,b){this.gestureTouchesDragged(a,b)},touchEnd:function(a){this.gestureTouchEnd(a)
},gestureTouchStart:function(e){e.isInteresting=0;var d=this.get("gestures"),b,a=d.length,c;
for(b=0;b<a;b++){c=d[b];c.unassignedTouchDidStart(e)}},gestureTouchesDragged:function(c,e){var f=this.get("gestures"),b,a=f.length,d;
for(b=0;b<a;b++){d=f[b];d.unassignedTouchesDidChange(c,e)}},gestureTouchEnd:function(e){var d=this.get("gestures"),b,a=d.length,c;
for(b=0;b<a;b++){c=d[b];c.unassignedTouchDidEnd(e)}}};SC.InlineEditable={editorDelegate:null,isEditable:YES,isEditing:NO,beginEditing:function(){if(this.get("isEditing")){return YES
}return this.invokeDelegateMethod(this.get("editorDelegate"),"beginEditingFor",this,this.get("value"))
},discardEditing:function(){if(!this.get("isEditing")){return YES}return this.invokeDelegateMethod(this.get("editorDelegate"),"discardEditingFor",this)
},commitEditing:function(){if(!this.get("isEditing")){return YES}return this.invokeDelegateMethod(this.get("editorDelegate"),"commitEditingFor",this)
},inlineEditorWillBeginEditing:function(a){this.set("isEditing",YES)},inlineEditorDidBeginEditing:function(a){return YES
},inlineEditorShouldCommitEditing:function(a,b){this.setIfChanged("value",b);return YES
},inlineEditorDidEndEditing:function(a,b){this.inlineEditorShouldCommitEditing(a,b);
this.set("isEditing",NO);return YES}};SC.InlineEditorDelegate={isInlineEditorDelegate:YES,exampleInlineTextFieldView:SC.InlineTextFieldView,inlineEditorClassName:null,isInlineEditorMultiline:NO,beginEditingFor:function(c,b){if(!c.get("isEditable")){return NO
}if(c.get("isEditing")){return YES}var d=c.$(),g=c.get("value")||"",e=SC.viewportOffset(d[0]),a=c.convertFrameFromView(c.get("frame"),null),h=this.get("exampleInlineTextFieldView");
e.width=a.width;e.height=a.height;c.inlineEditorWillBeginEditing();h.beginEditing({pane:c.get("pane"),frame:e,layout:c.get("layout"),exampleInlineTextFieldView:h,delegate:this,inlineEditorClassName:this.get("inlineEditorClassName"),exampleElement:d,value:b,multiline:this.get("isInlineEditorMultiline"),isCollection:NO});
h.editor._target=c},parentViewForEditor:function(a){return a.get("parentView")},commitEditingFor:function(a){if(!a.get("isEditing")){return NO
}return SC.InlineTextFieldView.commitEditing()},discardEditingFor:function(a){if(!a.get("isEditing")){return NO
}return SC.InlineTextFieldView.discardEditing()},inlineEditorDidBeginEditing:function(b){var a=b._target;
return a.inlineEditorDidBeginEditing(b)},inlineEditorShouldCommitEditing:function(b,c){var a=b._target;
return a.inlineEditorShouldCommitEditing(b,c)},inlineEditorDidEndEditing:function(b,c){var a=b._target;
return a.inlineEditorDidEndEditing(b,c)}};SC.Validatable={initMixin:function(){this._validatable_validatorDidChange()
},validator:null,errorLabel:null,isValid:function(){return SC.typeOf(this.get("value"))!==SC.T_ERROR
}.property("value"),ownerForm:null,performValidate:function(c){var a=SC.VALIDATE_OK;
if(this._validator){var b=this.get("ownerForm");if(c){a=this._validator.validatePartial(b,this);
if((a==SC.VALIDATE_NO_CHANGE)&&(this._validator.validateChange(b,this)==SC.VALIDATE_OK)){a=SC.VALIDATE_OK
}}else{a=this._validator.validateChange(b,this)}}return a},performValidateSubmit:function(){return this._validator?this._validator.validateSubmit(this.get("ownerForm"),this):SC.VALIDATE_OK
},performValidateKeyDown:function(a){var b=a.getCharString();if(!b){return YES}return this._validator?this._validator.validateKeyDown(this.get("ownerForm"),this,b):YES
},validatorObject:function(){return this._validator}.property(),validateSubmit:function(){return this.performValidateSubmit()
},objectForFieldValue:function(b,a){return this._validator?this._validator.objectForFieldValue(b,this.get("ownerForm"),this):b
},fieldValueForObject:function(a){return this._validator?this._validator.fieldValueForObject(a,this.get("ownerForm"),this):a
},_validatable_displayObserver:function(){this.displayDidChange()}.observes("isValid"),renderMixin:function(a){a.setClass("invalid",!this.get("isValid"))
},_validatable_validatorDidChange:function(){var a=this.get("ownerForm");var b=SC.Validator.findFor(a,this,this.get("validator"));
if(b!=this._validator){this.propertyWillChange("validatorObject");if(this._validator){this._validator.detachFrom(a,this)
}this._validator=b;if(this._validator){this._validator.attachTo(a,this)}this.propertyDidChange("validatorObject")
}}.observes("validator","ownerForm")};sc_require("mixins/validatable");SC.FieldView=SC.View.extend(SC.Control,SC.Validatable,{isTextArea:NO,_field_isMouseDown:NO,fieldValue:function(){var a=this.get("value");
if(SC.typeOf(a)===SC.T_ERROR){a=a.get("errorValue")}return this.fieldValueForObject(a)
}.property("value","validator").cacheable(),$input:function(){if(this.get("isTextArea")){return this.$("textarea").andSelf().filter("textarea")
}else{return this.$("input").andSelf().filter("input")}},setFieldValue:function(b){if(SC.none(b)){b=""
}var a=this.$input();if(a.val()!==b){a.val(b)}return this},getFieldValue:function(){return this.$input().val()
},_field_fieldValueDidChange:function(a){SC.run(function(){this.fieldValueDidChange(NO)
},this)},fieldValueDidChange:function(a){var c=this.getFieldValue();var b=this.objectForFieldValue(c,a);
this.setIfChanged("value",b)},_field_valueDidChange:function(){this.setFieldValue(this.get("fieldValue"))
}.observes("fieldValue"),didCreateLayer:function(){this.setFieldValue(this.get("fieldValue"));
SC.Event.add(this.$input(),"change",this,this._field_fieldValueDidChange)},didAppendToDocument:function(){if(this.get("isTextArea")){this.setFieldValue(this.get("fieldValue"));
SC.Event.add(this.$input(),"change",this,this._field_fieldValueDidChange)}},willDestroyLayer:function(){SC.Event.remove(this.$input(),"change",this,this._field_fieldValueDidChange)
},mouseDown:function(a){this._field_isMouseDown=YES;a.allowDefault();return YES},mouseExited:function(a){if(this._field_isMouseDown){this.set("isActive",NO)
}a.allowDefault();return YES},mouseEntered:function(a){this.set("isActive",this._field_isMouseDown);
a.allowDefault();return YES},mouseUp:function(a){if(this._field_isMouseDown){this.set("isActive",NO)
}this._field_isMouseDown=NO;a.allowDefault();return YES},keyDown:function(b){if(b.which===9||b.keyCode===9){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(a){a.becomeFirstResponder()}else{b.allowDefault()}return YES}if(this.performValidateKeyDown(b)){this._isKeyDown=YES;
b.allowDefault()}else{b.stop()}return YES},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$input()[0].focus()
}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}},_field_setFieldValue:function(b){this.propertyWillChange("fieldValue");
if(this.fieldValueForObject){b=this.fieldValueForObject(b)}var a=this.setFieldValue(b);
this.propertyDidChange("fieldValue");return a},_field_getFieldValue:function(){var a=this.getFieldValue();
if(this.objectForFieldValue){a=this.objectForFieldValue(a)}return a}});SC.TextSelection=SC.Object.extend(SC.Copyable,SC.Freezable,{start:-1,end:-1,length:function(){var b=this.get("start");
var a=this.get("end");if((b)===-1||(a===-1)){return -1}else{return a-b}}.property("start","end").cacheable(),init:function(){arguments.callee.base.apply(this,arguments);
this.freeze()},copy:function(){return SC.TextSelection.create({start:this.get("start"),end:this.get("end")})
},toString:function(){var a=this.get("length");if(a&&a>0){if(a===1){return"[%@ character selected: {%@, %@}]".fmt(a,this.get("start"),this.get("end"))
}else{return"[%@ characters selected: {%@, %@}]".fmt(a,this.get("start"),this.get("end"))
}}else{return"[no text selected; caret at %@]".fmt(this.get("start"))}}});SC.StaticLayout={hasStaticLayout:YES};
sc_require("views/field");sc_require("system/text_selection");sc_require("mixins/static_layout");
sc_require("mixins/editable");SC.TextFieldView=SC.FieldView.extend(SC.StaticLayout,SC.Editable,{tagName:"label",classNames:["sc-text-field-view"],isTextField:YES,applyImmediately:YES,isPassword:NO,isTextArea:NO,hint:"",isEditing:NO,hintON:YES,defaultTabbingEnabled:YES,isContextMenuEnabled:YES,continuouslyUpdatesValue:YES,allowsErrorAsValue:YES,leftAccessoryView:null,rightAccessoryView:null,spellCheckEnabled:YES,maxLength:5096,_isFocused:NO,init:function(){var a=this.get("value");
this.set("hintON",(!a||a&&a.length===0));return arguments.callee.base.apply(this,arguments)
},isEditable:function(){return this.get("isEnabled")}.property("isEnabled").cacheable(),selection:function(l,j){var d=this.$input()[0],f,a,c;
if(j===undefined){if(d){a=null;c=null;if(!d.value){a=c=0}else{try{if("selectionStart" in d){a=d.selectionStart
}if("selectionEnd" in d){c=d.selectionEnd}}catch(g){return null}if(a===null||c===null){var k=document.selection;
if(k){var i=k.type;if(i&&(i==="None"||i==="Text")){f=k.createRange();if(!this.get("isTextArea")){var b=f.text.length;
a=Math.abs(f.moveStart("character",0-(d.value.length+1)));c=a+b}else{var h=f.duplicate();
h.moveToElementText(d);h.setEndPoint("EndToStart",f);a=h.text.length;c=a+f.text.length
}}}}}return SC.TextSelection.create({start:a,end:c})}else{return null}}else{if(!j||!j.kindOf||!j.kindOf(SC.TextSelection)){throw"When setting the selection, you must specify an SC.TextSelection instance."
}if(d){if(d.setSelectionRange){d.setSelectionRange(j.get("start"),j.get("end"))}else{f=d.createTextRange();
a=j.get("start");f.move("character",a);f.moveEnd("character",j.get("end")-a);f.select()
}}return j}}.property("fieldValue").cacheable(),displayProperties:"hint fieldValue isEditing leftAccessoryView rightAccessoryView isTextArea".w(),createChildViews:function(){arguments.callee.base.apply(this,arguments);
this.accessoryViewObserver()},acceptsFirstResponder:function(){return this.get("isEnabled")
}.property("isEnabled"),accessoryViewObserver:function(){var f,h=["leftAccessoryView","rightAccessoryView"],a=h.length,b,e,d,g;
for(b=0;b<a;b++){e=h[b];d=this["_"+e];g=this.get(e);if(!(d&&g&&(d===g))){if(d){f=d.get("classNames");
f=f.without("sc-text-field-accessory-view");d.set("classNames",f);this.removeChild(d);
d=null;this["_"+e]=null}if(g){if(g.isClass){g=g.create({layoutView:this})}f=g.get("classNames");
var c="sc-text-field-accessory-view";if(f.indexOf(c)<0){f=SC.clone(f);f.push(c);g.set("classNames",f)
}this.appendChild(g);this["_"+e]=g}}}}.observes("leftAccessoryView","rightAccessoryView"),layoutChildViewsIfNeeded:function(a){if(!a){a=this.get("isVisibleInWindow")
}if(a&&this.get("childViewsNeedLayout")){var b=this.get("rightAccessoryView");if(b&&b.get){var c=b.get("layout");
if(c){c.left=null;if(!c.right){c.right=0}b.adjust({layout:c})}}}arguments.callee.base.apply(this,arguments)
},render:function(e,f){arguments.callee.base.apply(this,arguments);var a,d,c,b;a=this.get("fieldValue");
if(SC.none(a)){a=""}a=String(a);e.setClass("not-empty",a.length>0);d=this._getAccessoryViewWidths();
c=d.left;b=d.right;if(c){c+="px"}if(b){b+="px"}this._renderField(e,f,a,c,b);if(SC.browser.mozilla){this.invokeLast(this._applyFirefoxCursorFix)
}},_forceRenderFirstTime:NO,_renderFieldLikeFirstTime:function(){this.set("_forceRenderFirstTime",YES)
}.observes("isTextArea"),shouldRenderBorder:YES,_renderField:function(c,i,o,g,l){var m=this.get("hint"),e,t,p,d,q,b,j,f,n=this.get("spellCheckEnabled"),s,h=this.get("maxLength"),a;
c.setClass("text-area",this.get("isTextArea"));a=(parseInt(SC.browser.webkit,0)<532);
c.setClass("oldWebKitFieldPadding",a);s=n?' spellcheck="true"':' spellcheck="false"';
if(i||this._forceRenderFirstTime){this._forceRenderFirstTime=NO;e=this.get("isEnabled")?"":'disabled="disabled"';
t=this.get("layerId");if(this.get("shouldRenderBorder")){c.push('<span class="border"></span>')
}p="";if(g||l){p='style="';if(g){p+="left: "+g+"; "}if(l){p+="right: "+l+";"}p+='"'
}c.push('<span class="padding" '+p+">");o=this.get("escapeHTML")?SC.RenderContext.escapeHTML(o):o;
if(!this.get("_supportsPlaceHolder")&&(!o||(o&&o.length===0))){o=this.get("hint");
c.setClass("sc-hint",YES)}f=(SC.browser.mozilla&&(parseFloat(SC.browser.mozilla)<1.9||SC.browser.mozilla.match(/1\.9\.0|1\.9\.1/)))?"field oldGecko":"field";
if(this.get("isTextArea")){c.push('<textarea class="',f,'" name="',t,'" ',e,' placeholder="',m,'"',s,' maxlength="',h,'">',o,"</textarea></span>")
}else{d=this.get("isPassword")?"password":"text";c.push('<input class="',f,'" type="',d,'" name="',t,'" ',e,' value="',o,'" placeholder="',m,'"',s,' maxlength="',h,'" /></span>')
}}else{var k=this.$input();if(!this.get("_supportsPlaceHolder")){var r=this.get("value");
if((!r||(r&&r.length===0))){if(this.get("hintON")&&!this.get("isFirstResponder")){c.setClass("sc-hint",YES);
k.val(m)}else{c.setClass("sc-hint",NO);k.val("")}}}else{k.attr("placeholder",m)}b=k[0];
if(b){if(!this.get("isEnabled")){b.disabled="true"}else{b.disabled=null}j=b.parentNode.style;
if(g){if(j.left!==g){j.left=g}}else{j.left=null}if(l){if(j.right!==l){j.right=l}}else{j.right=null
}}}},_getAccessoryViewWidths:function(){var c={},k=["left","right"],d=k.length,f,g,l,j,a,h,e,b;
for(f=0;f<d;f++){g=k[f];l=this.get(g+"AccessoryView");if(l){if(l.isClass){l=l.create({layoutView:this})
}if(l.get){b=l.get("frame");if(b){a=b.width;if(a){h=l.get("layout");if(h){e=h[g];
a+=e}c[g]=a}}}}}return c},didCreateLayer:function(){arguments.callee.base.apply(this,arguments);
if(!this.get("_supportsPlaceHolder")&&this.get("hintON")){var b=this.$input().val();
if(!b||(b&&b.length===0)){this.$input().val(this.get("hint"))}}if(this.get("isTextArea")){this.invokeLast(this._addTextAreaEvents)
}else{this._addTextAreaEvents();if(SC.browser.mozilla){var a=this.$input();SC.Event.add(a,"keypress",this,this._firefox_dispatch_keypress)
}}},_addTextAreaEvents:function(){var a=this.$input();SC.Event.add(a,"focus",this,this._textField_fieldDidFocus);
SC.Event.add(a,"blur",this,this._textField_fieldDidBlur);SC.Event.add(a,"select",this,this._textField_selectionDidChange);
if(SC.browser.mozilla){this._cacheInputElement=this.$input();this._cachePaddingElement=this.$(".padding")
}},willDestroyLayer:function(){arguments.callee.base.apply(this,arguments);var a=this.$input();
SC.Event.remove(a,"focus",this,this._textField_fieldDidFocus);SC.Event.remove(a,"blur",this,this._textField_fieldDidBlur);
SC.Event.remove(a,"select",this,this._textField_selectionDidChange);SC.Event.remove(a,"keypress",this,this._firefox_dispatch_keypress)
},_textField_fieldDidFocus:function(a){SC.run(function(){this.set("focused",YES);
this.fieldDidFocus(a);var b=this.get("value");if(!this.get("_supportsPlaceHolder")&&((!b)||(b&&b.length===0))){this.set("hintON",NO)
}},this)},_textField_fieldDidBlur:function(a){SC.run(function(){this.set("focused",NO);
this.fieldDidBlur(this._origEvent);var b=this.get("value");if(!this.get("_supportsPlaceHolder")&&((!b)||(b&&b.length===0))){this.set("hintON",YES)
}},this)},fieldDidFocus:function(a){this.beginEditing(a);if(this._didHideInterceptForPane){this._didHideInterceptForPane.showTouchIntercept();
this._didHideInterceptForPane=null}var b=this.get("pane");if(b&&b.get("hasTouchIntercept")){b.hideTouchIntercept();
this._didHideInterceptForPane=this.get("pane")}},fieldDidBlur:function(a){this.commitEditing(a);
var b=this._didHideInterceptForPane;if(b){b.showTouchIntercept();b=null}},_field_fieldValueDidChange:function(a){if(this.get("focused")){SC.run(function(){this.fieldValueDidChange(NO)
},this)}},_topOffsetForFirefoxCursorFix:3,_applyFirefoxCursorFix:function(){if(parseFloat(SC.browser.mozilla)<1.9&&!this.get("useStaticLayout")){var h,d,c,i,b,g,e,f;
e=this._cacheInputElement;f=this._cachePaddingElement;if(f&&f[0]){g=f[0];b=SC.$(g).offset();
if(SC.browser.compareVersion(1,9,2)<0&&e[0].tagName.toLowerCase()==="input"){h=b.top+this._topOffsetForFirefoxCursorFix
}else{h=b.top}d=b.left;c=g.offsetWidth;i=g.offsetHeight;var a="position: fixed; top: %@px; left: %@px; width: %@px; height: %@px;".fmt(h,d,c,i);
if(!this._prevStyle||this._prevStyle!=a){e.attr("style",a)}this._prevStyle=a}}return this
},_firefox_dispatch_keypress:function(a){var d=this.get("selection"),e=this.get("value"),c=e?e.length:0,b;
if(!d||((d.get("length")===0&&(d.get("start")===0)||d.get("end")===c))){b=SC.RootResponder.responder;
if(a.keyCode===9){return}b.keypress.call(b,a);a.stopPropagation()}},_textField_selectionDidChange:function(){this.notifyPropertyChange("selection")
},willBecomeKeyResponderFrom:function(a){if(this.get("isVisibleInWindow")){var b=this.$input()[0];
try{if(b){b.focus()}}catch(c){}if(!this._txtFieldMouseDown){this.invokeLast(this._selectRootElement)
}}},willLoseKeyResponderTo:function(a){},_selectRootElement:function(){var a=this.$input()[0];
if(a){a.select()}else{this._textField_selectionDidChange()}},didLoseKeyResponderTo:function(a){var b=this.$input()[0];
if(b){b.blur()}this.invokeLater("scrollToOriginIfNeeded",100)},scrollToOriginIfNeeded:function(){var b=this.get("pane");
if(!b){return}var a=b.get("firstResponder");if(!a||!a.get("isTextField")){document.body.scrollTop=document.body.scrollLeft=0
}},parentViewDidResize:function(){if(SC.browser.mozilla){this.invokeLast(this._applyFirefoxCursorFix)
}arguments.callee.base.apply(this,arguments)},keyDown:function(b){var e,a;var g=b.which,c=false;
if((g===13&&!b.isIMEInput)&&!this.get("isTextArea")){if(!this.get("continuouslyUpdatesValue")){e=this.getValidatedValueFromFieldValue(NO);
if((SC.typeOf(e)!==SC.T_ERROR)||this.get("allowsErrorAsValue")){this.setIfChanged("value",e);
this.applyValueToField(e)}}return NO}if(g===27){return NO}if((g===9||b.keyCode===9)&&this.get("defaultTabbingEnabled")){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(a){a.becomeFirstResponder()}else{b.allowDefault()}return YES}if(!SC.browser.webkit&&this.get("isTextArea")){var f=this.get("value"),d=b.which;
if(f&&((!SC.browser.mozilla&&d>47)||(SC.browser.mozilla&&((d>32&&d<43)||d>47)&&!(b.keyCode>36&&b.keyCode<41)))&&(f.length>=this.get("maxLength"))){c=true
}}if((this.performValidateKeyDown(b)||SC.platform.touch)&&!c){this._isKeyDown=YES;
b.allowDefault()}else{b.stop()}if(this.get("applyImmediately")){this.invokeLater(this.fieldValueDidChange,1)
}return YES},keyUp:function(a){if(SC.browser.mozilla&&a.keyCode===13){this.fieldValueDidChange()
}this.notifyPropertyChange("selection");this._isKeyDown=NO;a.allowDefault();return YES
},mouseDown:function(a){var b=this.get("fieldValue");this._txtFieldMouseDown=YES;
if(!this.get("isEnabled")){a.stop();return YES}else{return arguments.callee.base.apply(this,arguments)
}},mouseUp:function(a){this._txtFieldMouseDown=NO;this.notifyPropertyChange("selection");
if(!this.get("isEnabled")){a.stop();return YES}return arguments.callee.base.apply(this,arguments)
},mouseWheel:function(a){if(this.get("isTextArea")){a.allowDefault();return YES}else{return NO
}},selectStart:function(a){return YES},_supportsPlaceHolder:SC.platform.input.placeholder,valueObserver:function(){var b=this.get("value"),a;
if(b&&b.length>0){this.set("hintON",NO);a=this.get("maxLength");if(!SC.browser.webkit&&b.length>a){this.set("value",b.substr(0,a))
}}else{this.set("hintON",YES)}}.observes("value")});SC.mixin({_downloadFrames:0,download:function(d){var a=document.createElement("iframe"),c="DownloadFrame_"+this._downloadFrames;
SC.$(a).attr("id",c);a.style.border="10px";a.style.width="0px";a.style.height="0px";
a.style.position="absolute";a.style.top="-10000px";a.style.left="-10000px";if(!SC.browser.isSafari){SC.$(a).attr("src",d)
}document.getElementsByTagName("body")[0].appendChild(a);if(SC.browser.isSafari){SC.$(a).attr("src",d)
}this._downloadFrames=this._downloadFrames+1;if(!SC.browser.isSafari){var b=function(){document.body.removeChild(document.getElementById(c));
c=null};b.invokeLater(null,2000)}a=null},getStyle:function(a,b){var c="";if(document.defaultView&&document.defaultView.getComputedStyle){c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b)
}else{if(a.currentStyle){b=b.replace(/\-(\w)/g,function(d,e){return e.toUpperCase()
});c=a.currentStyle[b]}}return c},uniJapaneseConvert:function(e){var a,c="",b,d;for(b=0,d=e.length;
b<d;b++){a=e.charCodeAt(b);a=((a>=65281&&a<=65392)?a-65248:a);a=(a===12540?45:a);
c=c+String.fromCharCode(a)}return c}});sc_require("views/text_field");sc_require("system/utils/misc");
SC.InlineTextFieldView=SC.TextFieldView.extend({_topOffsetForFirefoxCursorFix:0,beginEditing:function(c){if(!c){throw"InlineTextField.beginEditing() requires options"
}if(this.get("isEditing")){return NO}var d={},f,b,e,a;a=c.delegate;this.set("editorDelegate",a);
this.beginPropertyChanges();this.set("isEditing",YES);this.set("escapeHTML",c.escapeHTML);
this._optframe=c.frame;this._optIsCollection=c.isCollection;this._exampleElement=c.exampleElement;
if(!this._optframe||!a){throw"At least frame and delegate options are required for inline editor"
}this._originalValue=c.value;if(SC.none(this._originalValue)){this._originalValue=""
}this._multiline=(c.multiline!==undefined)?c.multiline:NO;if(this._multiline){this.set("isTextArea",YES)
}else{this.set("isTextArea",NO)}this._commitOnBlur=(c.commitOnBlur!==undefined)?c.commitOnBlur:YES;
this.set("validator",c.validator);this.set("value",this._originalValue);f=c.pane;
d.height=this._optframe.height;d.width=this._optframe.width;b=c.layout;e=f.$()[0];
if(this._optIsCollection&&b.left){d.left=this._optframe.x-b.left-e.offsetLeft-1;if(SC.browser.msie==7){d.left--
}}else{d.left=this._optframe.x-e.offsetLeft-1;if(SC.browser.msie==7){d.left--}}if(this._optIsCollection&&b.top){d.top=this._optframe.y-b.top-e.offsetTop;
if(SC.browser.msie==7){d.top=d.top-2}}else{d.top=this._optframe.y-e.offsetTop;if(SC.browser.msie==7){d.top=d.top-2
}}this.set("layout",d);this.set("parentNode",f);f.appendChild(this);this._className=c.inlineEditorClassName;
if(this._className&&!this.hasClassName(this._className)){this.setClassName(this._className,true)
}this._previousFirstResponder=f?f.get("firstResponder"):null;this.becomeFirstResponder();
this.endPropertyChanges();this.invokeLast(function(){a.inlineEditorDidBeginEditing(this)
});return YES},commitEditing:function(a){if(!SC.$ok(this.validateSubmit())){return NO
}return this._endEditing(this.get("value"),a)},discardEditing:function(){return this._endEditing(this._originalValue)
},blurEditor:function(a){if(!this.get("isEditing")){return YES}return this._commitOnBlur?this.commitEditing(a):this.discardEditing(a)
},_endEditing:function(d,b,c){var a=this.get("editorDelegate");if(!this.get("isEditing")||!a){return YES
}if(!a.inlineEditorShouldCommitEditing(this,d)){SC.Logger.warn("InlineTextField._endEditing() cannot end without inlineEditorShouldCommitEditing() on the delegate.");
return NO}a.inlineEditorDidEndEditing(this,d);if(this._className){this.setClassName(this._className,false)
}this._originalValue=this._delegate=this._exampleElement=this._optframe=this._className=null;
this.set("isEditing",NO);if(this.get("isFirstResponder")){var e=this.get("pane");
if(e&&this._previousFirstResponder){e.makeFirstResponder(this._previousFirstResponder)
}else{this.resignFirstResponder()}}this._previousFirstResponder=null;if(this.get("parentNode")){this.removeFromParent()
}return YES},isEditing:NO,mouseDown:function(a){arguments.callee.base.call(this,a);
return this.get("isEditing")},touchStart:function(a){this.mouseDown(a)},keyDown:function(a){var b=this.interpretKeyEvents(a);
this.fieldValueDidChange(true);return !b?NO:b},insertText:null,_scitf_blurInput:function(){var a=this.$input()[0];
if(a){a.blur()}a=null},willRemoveFromParent:function(){return this._scitf_blurInput()
},willLoseFirstResponder:function(b,a){if(b!==this){return}this._previousFirstResponder=null;
this._origEvent=a;this._scitf_blurInput();return this.blurEditor(a)},cancel:function(){this.discardEditing();
return YES},fieldValueDidChange:function(a){arguments.callee.base.call(this,a)},insertNewline:function(a){if(this._multiline){a.allowDefault();
return arguments.callee.base.call(this,a)}else{if(this.get("value")!=this.$input().val()){this.set("value",this.$input().val())
}this.commitEditing();return YES}},insertTab:function(a){var c=this._delegate;this.resignFirstResponder();
this.commitEditing();if(c){var b=c.get("nextValidKeyView");if(b&&b.beginEditing){b.beginEditing()
}}return YES},insertBacktab:function(a){var b=this._delegate;this.resignFirstResponder();
this.commitEditing();if(b){var c=b.get("previousValidKeyView");if(c&&c.beginEditing){c.beginEditing()
}}return YES},deleteForward:function(a){a.allowDefault();return YES},deleteBackward:function(a){a.allowDefault();
return YES}});SC.InlineTextFieldView.mixin({beginEditing:function(b){this._exampleElement=b.exampleElement;
var a=b.exampleInlineTextFieldView?b.exampleInlineTextFieldView:this,f=b.layout,e=this.updateViewStyle(),g=this.updateViewPaddingStyle();
var h=".inline-editor input{"+e+"} ";h=h+".inline-editor textarea{"+e+"} .inline-editor .padding{"+g+"}";
var d=document.getElementsByTagName("head")[0],c=document.createElement("style");
c.type="text/css";c.media="screen";if(c.styleSheet){c.styleSheet.cssText=h}else{c.appendChild(document.createTextNode(h))
}d.appendChild(c);this.editor=a.create({classNames:"inline-editor",layout:f});return this.editor.beginEditing(b)
},commitEditing:function(){return this.editor?this.editor.commitEditing():YES},discardEditing:function(){return this.editor?this.editor.discardEditing():YES
},updateViewStyle:function(){var b=this._exampleElement[0],c="",a=SC.getStyle(b,"font-size");
if(a&&a.length>0){c=c+"font-size: "+a+" !important; "}a=SC.getStyle(b,"font-family");
if(a&&a.length>0){c=c+"font-family: "+a+" !important; "}a=SC.getStyle(b,"font-weight");
if(a&&a.length>0){c=c+"font-weight: "+a+" !important; "}a=SC.getStyle(b,"z-index");
if(a&&a.length>0){c=c+"z-index: "+a+" !important; "}a=SC.getStyle(b,"line-height");
if(a&&a.length>0){c=c+"line-height: "+a+" !important; "}a=SC.getStyle(b,"text-align");
if(a&&a.length>0){c=c+"text-align: "+a+" !important; "}a=SC.getStyle(b,"top-margin");
if(a&&a.length>0){c=c+"top-margin: "+a+" !important; "}a=SC.getStyle(b,"bottom-margin");
if(a&&a.length>0){c=c+"bottom-margin: "+a+" !important; "}a=SC.getStyle(b,"left-margin");
if(a&&a.length>0){c=c+"left-margin: "+a+" !important; "}a=SC.getStyle(b,"right-margin");
if(a&&a.length>0){c=c+"right-margin: "+a+" !important; "}return c},updateViewPaddingStyle:function(){var b=this._exampleElement[0];
var c="";var a=SC.getStyle(b,"padding-top");if(a&&a.length>0){c=c+"top: "+a+" !important; "
}a=SC.getStyle(b,"padding-bottom");if(a&&a.length>0){c=c+"bottom: "+a+" !important; "
}a=SC.getStyle(b,"padding-left");if(a&&a.length>0){c=c+"left: "+a+" !important; "
}a=SC.getStyle(b,"padding-right");if(a&&a.length>0){c=c+"right: "+a+" !important; "
}return c},editor:null});SC.RenderDelegate=SC.Object.extend({});sc_require("render_delegates/render_delegate");
SC.BaseTheme.canvasImageRenderDelegate=SC.RenderDelegate.create({name:"canvasImage",render:function(d,b){var c=d.get("width")||0,a=d.get("height")||0;
b.attr("width",c);b.attr("height",a)},update:function(a,e){var g=e[0],h=a.get("image"),d=a.get("frame"),l=d.width,i=d.height,k=a.get("innerFrame"),m=a.get("backgroundColor"),o=a.get("renderState"),b;
var j=![l,i].isEqual(o._lastFrameValues),n=![k.x,k.y,k.width,k.height].isEqual(o._lastInnerFrameValues),f=a.didChangeFor("canvasImageRenderDelegate","backgroundColor"),c=a.didChangeFor("canvasImageRenderDelegate","image")||(h&&h.complete)!==o._lastImageComplete;
if(j||n||f||c){if(g&&g.getContext){g.height=i;g.width=l;b=g.getContext("2d");b.clearRect(0,0,l,i);
if(m){b.fillStyle=m;b.fillRect(0,0,l,i)}if(h&&h.complete){b.drawImage(h,Math.floor(k.x),Math.floor(k.y),Math.floor(k.width),Math.floor(k.height))
}}o._lastFrameValues=[l,i];o._lastInnerFrameValues=[k.x,k.y,k.width,k.height];o._lastImageComplete=h&&h.complete
}}});sc_require("render_delegates/render_delegate");SC.BaseTheme.containerRenderDelegate=SC.RenderDelegate.create({render:function(b,a){},update:function(){}});
sc_require("render_delegates/render_delegate");SC.BaseTheme.imageRenderDelegate=SC.RenderDelegate.create({name:"image",render:function(f,c){var e=f.get("image"),b=f.get("imageValue"),d=f.get("type")||SC.IMAGE_TYPE_URL,a=f.get("toolTip");
c=c.begin("img");c.attr("src",e.src);if(b&&d===SC.IMAGE_TYPE_CSS_CLASS){c.addClass(b);
this._last_class=b}if(a){c.attr("title",a);c.attr("alt",a)}c.addStyle(this.imageStyles(f));
c=c.end()},update:function(e,a){var d=e.get("image"),c=e.get("imageValue"),b=e.get("toolTip");
a=a.find("img");a.attr("src",d.src);if(c!==this._last_class){a.setClass(this._last_class,NO)
}a.addClass(c);this._last_class=c;if(b){a.attr("title",b);a.attr("alt",b)}a.css(this.imageStyles(e))
},imageStyles:function(b){var a=b.get("innerFrame");return{position:"absolute",left:Math.round(a.x),top:Math.round(a.y),width:Math.round(a.width),height:Math.round(a.height)}
}});sc_require("render_delegates/render_delegate");SC.BaseTheme.labelRenderDelegate=SC.RenderDelegate.create({name:"label",render:function(c,b){b.addStyle({textAlign:c.get("textAlign"),fontWeight:c.get("fontWeight")});
b.setClass("ellipsis",c.get("needsEllipsis")||NO);b.setClass("icon",c.get("icon")||NO);
var a=this._htmlForTitleAndIcon(c);b.push(a);c.get("renderState")._lastHTMLForTitleAndIcon=a
},update:function(c,a){a.css({textAlign:c.get("textAlign")||null,fontWeight:c.get("fontWeight")||null});
a.setClass("ellipsis",c.get("needsEllipsis")||NO);var b=this._htmlForTitleAndIcon(c);
if(c.get("renderState")._lastHTMLForTitleAndIcon!==b){a.html(b);c.get("renderState")._lastHTMLForTitleAndIcon=b
}},_htmlForTitleAndIcon:function(e){var d=e.get("title"),c=e.get("hint"),b=e.get("escapeHTML"),a=e.get("icon")||"";
if(d&&b){d=SC.RenderContext.escapeHTML(d)}if(c&&!d){if(b){c=SC.RenderContext.escapeHTML(c)
}d="<span class='sc-hint'>"+c+"</span>"}if(a){if(a.indexOf("/")>=0){a='<img src="'+a+'" alt="" class="icon" />'
}else{a='<img src="'+SC.BLANK_IMAGE_URL+'" alt="" class="icon '+a+'" />'}}return a+d
}});sc_require("core");SC.Benchmark={verbose:NO,enabled:YES,events:{},stats:{},globalStartTime:null,addEvent:function(a,b){if(!b){b=new Date().getTime()
}this.events[a]=b},start:function(b,a,e,d){if(!this.enabled){return}var f=(e||Date.now()),c;
if(a){c=this._subStatFor(b,a)}else{c=this._statFor(b)}if(d&&c._starts.length>0){c._starts.push("ignore")
}else{c._starts.push(f)}c._times.push({start:f,_subStats:{}});return b},end:function(c,b,f){var e;
if(!this.enabled){return}if(b){e=this._subStatFor(c,b)}else{e=this._statFor(c)}var g=e._starts.pop();
if(!g){console.log('SC.Benchmark "%@" ended without a matching start.  No information was saved.'.fmt(c));
return}if(g=="ignore"){return}var a=(f||Date.now());var d=a-g;e._times[e._times.length-1].end=a;
e._times[e._times.length-1].dur=d;e.amt+=d;e.runs++;if(this.verbose){this.log(c)}},setGlobalStartTime:function(a){this.globalStartTime=a
},bench:function(e,d,a){if(!d){d="bench%@".fmt(this._benchCount++)}if(!a){a=1}var b;
while(--a>=0){var c=SC.Benchmark.start(d);b=e();SC.Benchmark.end(c)}return b},install:function(a,d,b){a["b__"+d]=a[d];
var c=a["b__"+d];a[d]=function(){var f="%@(%@)".fmt(d,$A(arguments).join(", "));SC.Benchmark.start(f,b);
var e=c.apply(this,arguments);SC.Benchmark.end(f);return e}},restore:function(a,b){a[b]=a["b__"+b]
},report:function(c){if(c){return this._genReport(c)}var b=[];for(var a in this.stats){if(!this.stats.hasOwnProperty(a)){continue
}b.push(this._genReport(a))}return b.join("\n")},timelineReport:function(a){a=(a)?"SproutCore Application":a;
var b=[a,"User-Agent: %@".fmt(navigator.userAgent),"Report Generated: %@ (%@)".fmt(new Date().toString(),Date.now()),""];
var d=this._compileChartData(true);for(var c=0;c<d.length;c++){if(d[c][4]){b.push(this._timelineGenSubReport(d[c]))
}else{b.push(this._timelineGenReport(d[c]))}}return b.join("\n")},getTimelineChartContent:function(){var l=this._compileChartData(false);
var g=l.length;if(g===0){return}var c=this.globalStartTime?this.globalStartTime:l[0][1];
var d=l[g-1][2]-c;var n=25+g*30;var q=Math.ceil(d/200)+1;var r=q*50;var m=10,s=300;
var o="<div class = 'sc-benchmark-timeline-chart' style = 'position:relative;'>";
o+="<div class = 'sc-benchmark-top'></div>";for(var p=0;p<q;p++){o+="<div class = 'sc-benchmark-tick' style = '";
o+="left: "+(m+p*50)+"px; ";o+="height: "+n+"px;";o+="'></div>";o+="<div class = 'sc-benchmark-tick-label' style = '";
o+="left: "+(m+p*50)+"px; ";o+="'>"+(p*200)+"ms</div>"}for(p=0;p<g;p++){o+="<div class = 'sc-benchmark-row ";
o+=(p%2===0)?"even":"odd";o+="' style = '";o+="top: "+(50+(p*30))+"px; ";o+="'></div>";
var j=document.createElement("div");var f=l[p][1];var e=l[p][2];var a=l[p][3];o+="<div class = 'sc-benchmark-bar' style = '";
o+="left:"+(m+((f-c)/4))+"px; width: "+((a/4))+"px;";o+="top: "+(28+(p*30))+"px;";
o+="' title = 'start: "+(f-c)+" ms, end: "+(e-c)+" ms, duration: "+a+" ms'";o+=">";
o+="&nbsp;"+l[p][0]+" <span class='sc-benchmark-emphasis'>";o+=a+"ms (start: "+(f-c)+"ms)";
o+="</span>";o+="</div>"}var b=this.events,k=0;for(p in b){var h=b[p]-c;o+="<div class = 'sc-benchmark-event idx"+(k%10)+"' style = '";
o+="left: "+(m+h/4)+"px; height: "+n+"px; top: 20px;";o+="' title = '"+p+": "+h+"'></div>";
k++}o+="</div>";return{html:o,totalCapturedTime:d,pointsCaptured:g,width:r+m+s,height:n}
},getTimelineChartView:function(){var a=SC.ScrollView.create({contentView:SC.StaticContentView.extend({}),reload:function(){var b=SC.Benchmark.getTimelineChartContent();
this.contentView.set("content",b.html);this.contentView.adjust({width:b.width,height:b.height});
this.chartContent=b;SC.RunLoop.invokeLater(SC.Benchmark,function(){this.contentView.notifyPropertyChange("frame")
})}});a.reload();return a},timelineChart:function(a){SC.RunLoop.begin();var c=0;this.hideChart();
var b=this.getTimelineChartView();var e=b.chartContent.pointsCaptured,d=b.chartContent.totalCapturedTime;
this._benchmarkChart=SC.Pane.create({classNames:"sc-benchmark-pane".w(),layout:{left:20,right:20,bottom:20,top:20},childViews:"title exit".w(),exit:SC.ButtonView.extend({layout:{right:20,top:20,width:100,height:30},title:"Hide Chart",target:this,action:"hideChart"}),title:SC.LabelView.extend({classNames:"sc-benchmark-title".w(),layout:{left:20,top:23,right:200,height:30},value:((a)?a:"SproutCore Application")+(" - Total Captured Time: "+d+" ms - Points Captured: "+e),fontWeight:"bold"})}).append();
b.set("layout",{left:20,top:60,bottom:20,right:20});this._benchmarkChart.appendChild(b);
SC.RunLoop.end()},hideChart:function(){if(this._benchmarkChart){this._benchmarkChart.remove();
this._benchmarkChart=null}return YES},tryToPerform:function(b,a){if(this[b]){return this[b](a)
}return NO},log:function(d){var c=this.report(d).split("\n"),b=c.length,a;for(a=0;
a<b;a++){console.log(c[a])}},startProfile:function(a){if(!this.enabled){return}if(console&&console.profile){console.profile(a)
}},endProfile:function(a){if(!this.enabled){return}if(console&&console.profileEnd){console.profileEnd(a)
}},loadPreloadEvents:function(){var f=SC.benchmarkPreloadEvents,e=[],b,a,c;if(typeof webkitPerformnce!=="undefined"){SC.mixin(f,webkitPerformane.timing)
}if(!this.globalStartTime){var d="navigation navigationStart headStart".w();a=d.length;
for(b=0;b<a;b++){if(f[d[b]]){this.globalStartTime=f[d[b]];break}}}this.javascriptStartTime=f.headStart;
SC.mixin(this.events,f);this._hasLoadedPreloadEvents=true},_loadBenchmarksFromEvents:function(){if(!this._hasLoadedPreloadEvents){this.loadPreloadEvents()
}var b=this.events;for(var a in b){if(a.substr(-3)!=="End"){continue}var c=a.substr(0,a.length-3);
if(!b[c+"Start"]){continue}SC.Benchmark.start(c,undefined,b[c+"Start"]);SC.Benchmark.end(c,undefined,b[c+"End"]);
delete b[c+"Start"];delete b[c+"End"]}},_compileChartData:function(g){this._loadBenchmarksFromEvents();
var l=[],a;for(var m in this.stats){var e=this.stats[m];for(var f=0;f<e._times.length;
f++){var n=e._times[f];a=(e._times.length>1)?(f+1)+" - "+m:m;l.push([a,n.start,n.end,n.dur,false]);
if(g){var b=n._subStats;for(var c in b){var h=b[c];for(var d=0;d<h._times.length;
d++){var o=h._times[d];a=(h._times.length>1)?(d+1)+" - "+c:c;l.push([a,o.start,o.end,o.dur,true])
}}}}}l.sort(function(j,i){if(j[1]<i[1]){return -1}else{if(j[1]==i[1]){if(j[3]&&!i[3]){return -1
}if(!j[3]&&i[3]){return 1}return 0}}return 1});return l},_genReport:function(a){var b=this._statFor(a);
var d=(b.runs>0)?(Math.floor(b.amt*1000/b.runs)/1000):0;var c=b._times[b._times.length-1];
return"BENCH %@ msec: %@ (%@x); latest: %@".fmt(d,(b.name||a),b.runs,c.end-c.start)
},_timelineGenReport:function(a){if(this.globalStartTime){return"BENCH start: %@ msec, duration: %@ msec,  %@".fmt((a[1]-this.globalStartTime),a[3],a[0])
}else{return"BENCH duration: %@ msec, %@".fmt(a[3],a[0])}},_timelineGenSubReport:function(a){if(this.globalStartTime){return"   CHECKPOINT BENCH start: %@ msec, duration: %@ msec,  %@".fmt((a[1]-this.globalStartTime),a[3],a[0])
}else{return"   CHECKPOINT BENCH duration: %@ msec, %@".fmt(a[3],a[0])}},_subStatFor:function(d,c){var e=this.stats[c]._times.length;
if(e===0){return}var a=this.stats[c]._times[this.stats[c]._times.length-1]._subStats;
var b=a[d];if(!b){a[d]={runs:0,amt:0,name:d,_starts:[],_times:[]};b=a[d]}return b
},_statFor:function(b){var a=this.stats[b];if(!a){a=this.stats[b]={runs:0,amt:0,name:b,_starts:[],_times:[]};
a=this.stats[b]}return a},reset:function(){this.stats={}},_bench:function(b,a){SC.Benchmark.bench(b,a,1)
},_benchCount:1};SC.Benchmark=SC.Benchmark;SC.Cookie=SC.Object.extend({name:null,value:"",expires:null,path:null,domain:null,secure:NO,isCookie:YES,destroy:function(){this.set("expires",-1);
this.write();arguments.callee.base.apply(this,arguments)},write:function(){var b=this.get("name"),i=this.get("value"),c=this.get("expires"),k=this.get("path"),e=this.get("domain"),a=this.get("secure");
var h="";if(c&&(SC.typeOf(c)===SC.T_NUMBER||(SC.DateTime&&c.get&&c.get("milliseconds"))||SC.typeOf(c.toUTCString)===SC.T_FUNCTION)){var d;
if(SC.typeOf(c)===SC.T_NUMBER){d=new Date();d.setTime(d.getTime()+(c*24*60*60*1000))
}else{if(SC.DateTime&&c.get&&c.get("milliseconds")){d=new Date(c.get("milliseconds"))
}else{if(SC.typeOf(c.toUTCString)===SC.T_FUNCTION){d=c}}}if(d){h="; expires="+d.toUTCString()
}}var j=k?"; path="+k:"";var g=e?"; domain="+e:"";var f=a?"; secure":"";document.cookie=[b,"=",encodeURIComponent(i),h,j,g,f].join("");
return this}});SC.Cookie.mixin({find:function(a){if(document.cookie&&document.cookie!=""){var d=document.cookie.split(";");
for(var c=0;c<d.length;c++){var b=String(d[c]).trim();if(b.substring(0,a.length+1)===(a+"=")){return SC.Cookie.create({name:a,value:decodeURIComponent(b.substring(a.length+1))})
}}}return null}});SC.mixin(SC.$.fn,{setClass:function(d,c){if(SC.none(d)){return this
}var e=SC.typeOf(d)!==SC.T_STRING,a=this._fixupClass,b;this.each(function(){if(this.nodeType!==1){return
}var h=this.className.split(/\s+/),g=NO;if(e){for(var f in d){if(d.hasOwnProperty(f)){g=a(h,f,d[f])||g
}}}else{g=a(h,d,c)}if(g){this.className=h.join(" ")}});return this},_fixupClass:function(d,a,c){var b=d.indexOf(a);
if(c){if(b<0){d.push(a);return YES}}else{if(b>=0){d[b]=null;return YES}}return NO
}});SC.ExceptionHandler={enabled:(SC.buildMode!=="debug"),handleException:function(a){if(this.isShowingErrorDialog){return
}this._displayErrorDialog(a)},_displayErrorDialog:function(b){var a=this._errorDialogHTMLForException(b),c=document.createElement("div");
c.style.cssText="left: 0px; right: 0px; top: 0px; bottom: 0px; position: absolute; background-color: white; background-color: rgba(255,255,255,0.6); z-index:100;";
c.innerHTML=a;document.body.appendChild(c);this.isShowingErrorDialog=YES},_errorDialogHTMLForException:function(b){var a;
a=['<div id="sc-error-dialog" style="position: absolute; width: 500px; left: 50%; top: 50%; margin-left: -250px; background-color: white; border: 1px solid black; font-family: Monaco, monospace; font-size: 9px; letter-spacing: 1px; padding: 10px">',"An error has occurred which prevents the application from running:","<br><br>",b.message,'<div id="sc-error-dialog-reload-button" onclick="window.location.reload();" style="float: right; font-family: Monaco, monospace; font-size: 9px; letter-spacing: 1px; border: 1px solid black; padding: 3px; clear: both; margin-top: 20px; cursor: pointer;">',"Reload","</div>","</div>"];
return a.join("")},isShowingErrorDialog:NO};SC.IMAGE_ABORTED_ERROR=SC.$error("SC.Image.AbortedError","Image",-100);
SC.IMAGE_FAILED_ERROR=SC.$error("SC.Image.FailedError","Image",-101);SC.imageQueue=SC.Object.create({loadLimit:4,activeRequests:0,loadImage:function(a,e,f,d){var b=SC.typeOf(e);
if(SC.none(f)&&SC.typeOf(e)===SC.T_FUNCTION){e=null;f=e}if(SC.typeOf(f)===SC.T_STRING){f=e[f]
}if(SC.none(d)){d=SC.none(e)&&SC.none(f)}var c=this._imageEntryFor(a);if(c.status===this.IMAGE_LOADED){if(f){f.call(e||c.image,c.url,c.image)
}}else{if(e||f){this._addCallback(c,e,f)}c.retainCount++;this._scheduleImageEntry(c,d)
}},releaseImage:function(a,d,e){var c=this._imageEntryFor(a,NO);if(!c){return this
}if(--c.retainCount<=0){this._deleteEntry(c)}else{if(d||e){var b=SC.typeOf(d);if(SC.none(e)&&SC.typeOf(d)===SC.T_FUNCTION){d=null;
e=d}if(SC.typeOf(e)===SC.T_STRING){e=d[e]}this._removeCallback(c,d,e)}}},reloadImage:function(a){var b=this._imageEntryFor(a,NO);
if(b&&b.status===this.IMAGE_LOADED){b.status=this.IMAGE_WAITING}},loadNextImage:function(){var c=null,a;
if(this.get("activeRequests")>=this.get("loadLimit")){return}a=this._foregroundQueue;
while(a.length>0&&!c){c=a.shift()}if(!c){a=this._backgroundQueue;while(a.length>0&&!c){c=a.shift()
}}this.set("isLoading",!!c);if(c){var b=c.image;if(!b){return}$(b).bind("abort",this._imageDidAbort);
$(b).bind("error",this._imageDidError);$(b).bind("load",this._imageDidLoad);b.src=c.url;
this._loading.push(c);this.incrementProperty("activeRequests");this.loadNextImage()
}},_imageEntryFor:function(c,a){if(a===undefined){a=YES}var d=this._images[c];if(!d&&a){var b=new Image();
d=this._images[c]={url:c,status:this.IMAGE_WAITING,callbacks:[],retainCount:0,image:b};
b.entry=d}return d},_deleteEntry:function(a){this._unscheduleImageEntry(a);delete this._images[a.url]
},_addCallback:function(c,d,e){var b=c.callbacks;var a=b.find(function(f){return f[0]===d&&f[1]===e
},this);if(!a){b.push([d,e])}b=null;return this},_removeCallback:function(b,c,d){var a=b.callbacks;
a.forEach(function(f,e){if(f[0]===c&&f[1]===d){a[e]=null}},this);a=null;return this
},_scheduleImageEntry:function(d,c){var b=this._backgroundQueue;var e=this._foregroundQueue;
if(d.status===this.IMAGE_LOADED){return this}if((d.status===this.IMAGE_QUEUED)&&!c&&d.isBackground){b[b.indexOf(d)]=null;
d.status=this.IMAGE_WAITING}if(d.status!==this.IMAGE_QUEUED){var a=(c)?b:e;a.push(d);
d.status=this.IMAGE_QUEUED;d.isBackground=c}if(!this.isLoading){this.invokeLater(this.loadNextImage,100)
}this.set("isLoading",YES);return this},_unscheduleImageEntry:function(b){if(b.status!==this.IMAGE_QUEUED){return this
}var a=b.isBackground?this._backgroundQueue:this._foregroundQueue;a[a.indexOf(b)]=null;
if(this._loading.indexOf(b)>=0){if(a.image){a.image.abort()}this.imageStatusDidChange(b,this.ABORTED)
}return this},_imageDidAbort:function(){SC.run(function(){SC.imageQueue.imageStatusDidChange(this.entry,SC.imageQueue.ABORTED)
},this)},_imageDidError:function(){SC.run(function(){SC.imageQueue.imageStatusDidChange(this.entry,SC.imageQueue.ERROR)
},this)},_imageDidLoad:function(){SC.run(function(){SC.imageQueue.imageStatusDidChange(this.entry,SC.imageQueue.LOADED)
},this)},imageStatusDidChange:function(c,a){if(!c){return}var b=c.url;var d;switch(a){case this.LOADED:d=c.image;
break;case this.ABORTED:d=SC.IMAGE_ABORTED_ERROR;break;case this.ERROR:d=SC.IMAGE_FAILED_ERROR;
break;default:d=SC.IMAGE_FAILED_ERROR;break}c.callbacks.forEach(function(f){var g=f[0],h=f[1];
h.call(g,b,d)},this);c.callbacks=[];c.status=(a===this.LOADED)?this.IMAGE_LOADED:this.IMAGE_WAITING;
var e=c.image;if(e){e.onload=e.onerror=e.onabort=null;if(a!==this.LOADED){c.image=null
}}this._loading[this._loading.indexOf(c)]=null;if(this._loading.length>this.loadLimit*2){this._loading=this._loading.compact()
}this.decrementProperty("activeRequests");this.loadNextImage()},init:function(){arguments.callee.base.apply(this,arguments);
this._images={};this._loading=[];this._foregroundQueue=[];this._backgroundQueue=[]
},IMAGE_LOADED:"loaded",IMAGE_QUEUED:"queued",IMAGE_WAITING:"waiting",ABORTED:"aborted",ERROR:"error",LOADED:"loaded"});
SC.mixin(SC.Logger,{debugEnabled:NO,exists:NO,fallBackOnLog:NO,dirxml:function(){var b=this.get("reporters"),a=SC.A(arguments);
b.forEach(function(c){if(c.dirxml===undefined||c.dirxml.apply===undefined){return
}c.dirxml.apply(c,a)},this);return this},group:function(){var b=this.get("reporters"),a=SC.A(arguments);
b.forEach(function(c){if(c.group===undefined||c.group.apply===undefined){return}c.group.apply(c,a)
},this);return this},groupEnd:function(){var b=this.get("reporters"),a=SC.A(arguments);
b.forEach(function(c){if(c.groupEnd===undefined||c.groupEnd.apply===undefined){return
}c.groupEnd.apply(c,a)},this);return this},profile:function(){var b=this.get("reporters"),a=SC.A(arguments);
b.forEach(function(c){if(c.profile===undefined||c.profile.apply===undefined){return
}c.profile.apply(c,a)},this);return this},profileEnd:function(){var b=this.get("reporters"),a=SC.A(arguments);
b.forEach(function(c){if(c.profileEnd===undefined||c.profileEnd.apply===undefined){return
}c.profileEnd.apply(c,a)},this);return this},time:function(){var b=this.get("reporters"),a=SC.A(arguments);
b.forEach(function(c){if(c.time===undefined||c.time.apply===undefined){return}c.time.apply(c,a)
},this);return this},timeEnd:function(){var b=this.get("reporters"),a=SC.A(arguments);
b.forEach(function(c){if(c.timeEnd===undefined||c.timeEnd.apply===undefined){return
}c.timeEnd.apply(c,a)},this);return this},trace:function(){var b=this.get("reporters"),a=SC.A(arguments);
b.forEach(function(c){if(c.trace===undefined||c.trace.apply===undefined){return}c.trace.apply(c,a)
},this);return this}});SC.Math=SC.Object.create({near:function(c,b,a){if(!a){a=0.00001
}return Math.abs(c-b)<=a},round:function(d,a){if(!a){a=0}var b=Math.pow(10,a);if(a<0){var c=b.toString();
b=c.substring(0,c.indexOf("1")+1)}d=d.valueOf();return Math.round(d*b)/b}});SC.LOG_MODULE_LOADING=YES;
SC.Module=SC.Object.create({isModuleReady:function(a){var b=SC.MODULE_INFO[a];return b?!!b.isReady:NO
},loadModule:function(b,g,a){var c=SC.MODULE_INFO[b],h,f;var i=SC.A(arguments).slice(3);
var d=SC.LOG_MODULE_LOADING;var j,e;if(a===undefined&&SC.typeOf(g)===SC.T_FUNCTION){a=g;
g=null}if(d){console.log("SC.Module: Attempting to load '%@'".fmt(b))}if(!c){throw"SC.Module: could not find module '%@'".fmt(b)
}c.isPrefetching=NO;if(c.isLoaded){if(d){console.log("SC.Module: Module '%@' already loaded.".fmt(b))
}if(c.source){if(d){console.log("SC.Module: Evaluating JavaScript for module '%@'.".fmt(b))
}this._evaluateStringLoadedModule(c)}if(a){if(SC.isReady){SC.Module._invokeCallback(b,g,a,i)
}else{SC.ready(SC.Module,function(){SC.Module._invokeCallback(b,g,a,i)})}}}else{if(d){console.log("SC.Module: Module '%@' is not loaded, loading now.".fmt(b))
}h=c.callbacks||[];if(a){h.push(function(){SC.Module._invokeCallback(b,g,a,i)})}c.callbacks=h;
if(!c.isLoading){this._loadDependenciesForModule(b);this._loadCSSForModule(b);this._loadJavaScriptForModule(b);
c.isLoading=YES}}},prefetchModule:function(a){var b=SC.MODULE_INFO[a];if(b.isLoading||b.isLoaded){return
}if(SC.LOG_MODULE_LOADING){console.log("SC.Module: Prefetching module '%@'.".fmt(a))
}this._loadDependenciesForModule(a);this._loadCSSForModule(a);this._loadJavaScriptForModule(a);
b.isLoading=YES;b.isPrefetching=YES},_executeLazilyInstantiatedModule:function(b,c,i){var h=SC.LAZY_INSTANTIATION[b];
var g;var a;var j,d;if(SC.LOG_MODULE_LOADING){console.log("SC.Module: Module '%@' is marked for lazy instantiation, instantiating it now…".fmt(b))
}d=h.length;for(j=0;j<d;j++){try{h[j]()}catch(f){console.error("SC.Module: Failed to lazily instatiate entry for  '%@'".fmt(b))
}}delete SC.LAZY_INSTANTIATION[b];g=this._targetForTargetName(c);a=this._methodForMethodNameInTarget(i,g);
if(!a){throw"SC.Module: could not find callback for lazily instantiated module '%@'".fmt(b)
}},_evaluateStringLoadedModule:function(b){var a=b.source;jQuery.globalEval(a);delete b.source;
b.isReady=YES},_loadCSSForModule:function(d){var f=document.getElementsByTagName("head")[0];
var e=SC.MODULE_INFO[d];var h=e.styles||[];var b=h.length;var c;var g;var a;if(!f){f=document.documentElement
}b=h.length;for(a=0;a<b;a++){c=h[a];if(c.length>0){if(SC.LOG_MODULE_LOADING){console.log("SC.Module: Loading CSS file in '%@' -> '%@'".fmt(d,c))
}g=document.createElement("link");g.setAttribute("href",c);g.setAttribute("rel","stylesheet");
g.setAttribute("type","text/css");f.appendChild(g)}}g=null},_loadJavaScriptForModule:function(b){var c=SC.MODULE_INFO[b];
var d;var a;var e=c.dependencies;var f=YES;if(e&&e.length>0){f=this._dependenciesMetForModule(b)
}if(c.isPrefetched){a=c.stringURL}else{if(f){a=c.scriptURL}else{a=c.stringURL}}if(a.length>0){if(SC.LOG_MODULE_LOADING){console.log("SC.Module: Loading JavaScript file in '%@' -> '%@'".fmt(b,a))
}d=document.createElement("script");d.setAttribute("type","text/javascript");d.setAttribute("src",a);
d.onload=function(){SC.Module._moduleDidLoad(b)};document.body.appendChild(d)}},_dependenciesMetForModule:function(c){var e=SC.MODULE_INFO[c].dependencies||[];
var b,a=e.length;var f;var d;for(b=0;b<a;b++){f=e[b];d=SC.MODULE_INFO[f];if(!d){throw"SC.loadModule: Unable to find dependency %@ for module %@.".fmt(f,c)
}if(!d.isReady){return NO}}return YES},_loadDependenciesForModule:function(a){var b=SC.MODULE_INFO[a];
var e=SC.LOG_MODULE_LOADING;var i=b.dependencies||[];var f=YES;var g=i.length;var j;
var d;var c;var h;for(j=0;j<g;j++){d=i[j];c=SC.MODULE_INFO[d];if(!c){throw"SC.Module: could not find required module '%@' for module '%@'".fmt(d,a)
}else{if(c.isLoading){f=NO;h=c.dependents;if(!h){c.dependents=h=[]}h.push(a)}else{if(c.isReady){continue
}else{f=NO;h=c.dependents;if(!h){c.dependents=h=[]}h.push(a);if(e){console.log("SC.Module: '%@' depends on '%@', loading dependency…".fmt(a,d))
}SC.Module.loadModule(d)}}}}},_invokeCallback:function(c,d,a,b){var g;var f;f=this._targetForTargetName(d);
g=this._methodForMethodNameInTarget(a,f);if(!g){if(SC.LAZY_INSTANTIATION[c]){this._executeLazilyInstantiatedModule(c,d,a)
}else{throw"SC.Module: could not find callback for '%@'".fmt(c)}}if(!b){b=[]}b.unshift(c);
var e=!!SC.RunLoop.currentRunLoop;if(e){SC.run(function(){g.apply(f,b)})}else{g.apply(f,b)
}},_invokeCallbacksForModule:function(c){var e=SC.MODULE_INFO[c],d;if(!e){return}if(SC.LOG_MODULE_LOADING){console.log("SC.Module: Module '%@' has completed loading, invoking callbacks.".fmt(c))
}d=e.callbacks||[];for(var b=0,a=d.length;b<a;++b){d[b]()}},_evaluateAndInvokeCallbacks:function(a){var c=SC.MODULE_INFO;
var b=c[a];var d=SC.LOG_MODULE_LOADING;if(d){console.log("SC.Module: Evaluating and invoking callbacks for '%@'.".fmt(a))
}if(b.source){this._evaluateStringLoadedModule(b)}b.isReady=YES;if(SC.isReady){SC.Module._invokeCallbacksForModule(a);
delete b.callbacks}else{SC.ready(SC,function(){SC.Module._invokeCallbacksForModule(a);
delete b.callbacks})}var g=b.dependents||[];var e,i;for(var h=0,f=g.length;h<f;h++){e=g[h];
i=c[e];if(i.isLoaded&&this._dependenciesMetForModule(e)){if(d){console.log("SC.Module: Now that %@ has loaded, all dependencies for a dependent %@ are met.".fmt(a,e))
}this._evaluateAndInvokeCallbacks(e)}}},_moduleDidLoad:function(b){var c=SC.MODULE_INFO[b];
var e=SC.LOG_MODULE_LOADING;var d;var f,a;if(e){console.log("SC.Module: Module '%@' finished loading.".fmt(b))
}if(!c){if(e){console.log("SC._moduleDidLoad() called for unknown module '@'.".fmt(b))
}c=SC.MODULE_INFO[b]={isLoaded:YES,isReady:YES};return}if(c.isLoaded){if(e){console.log("SC._moduleDidLoad() called more than once for module '%@'. Skipping.".fmt(b))
}return}delete c.isLoading;c.isLoaded=YES;if(!c.isPrefetching){d=this._dependenciesMetForModule(b);
if(d){this._evaluateAndInvokeCallbacks(b)}else{if(e){console.log("SC.Module: Dependencies for '%@' not met yet, waiting to evaluate.".fmt(b))
}}}else{delete c.isPrefetching;if(e){console.log("SC.Module: Module '%@' was prefetched, not evaluating until needed.".fmt(b))
}}},_targetForTargetName:function(a){if(SC.typeOf(a)===SC.T_STRING){return SC.objectForPropertyPath(a)
}return a},_methodForMethodNameInTarget:function(a,b){if(SC.typeOf(a)===SC.T_STRING){return SC.objectForPropertyPath(a,b)
}return a}});SC.ready(function(){var e=SC.MODULE_INFO;var c;var d;var a;for(c in e){d=e[c];
if(d.isPrefetched){var b=c;a=SC.Task.create({run:function(){SC.Module.prefetchModule(b)
}});SC.backgroundTaskQueue.push(a)}}});SC.Response=SC.Object.extend({isError:NO,errorValue:function(){return this
}.property().cacheable(),errorObject:null,request:null,originalRequest:function(){var a=this.get("request");
while(a.get("source")){a=a.get("source")}return a}.property("request").cacheable(),type:function(){return this.getPath("request.type")
}.property("request").cacheable(),address:function(){return this.getPath("request.address")
}.property("request").cacheable(),isJSON:function(){return this.getPath("request.isJSON")||NO
}.property("request").cacheable(),isXML:function(){return this.getPath("request.isXML")||NO
}.property("request").cacheable(),listeners:function(){return this.getPath("request.listeners")
}.property("request").cacheable(),status:-100,headers:null,body:function(){var a=this.get("encodedBody");
if(a&&this.get("isJSON")){try{a=SC.json.decode(a)}catch(b){return SC.Error.create({message:b.name+": "+b.message,label:"Response",errorValue:this})
}}return a}.property("encodedBody").cacheable(),response:function(){return this.get("body")
}.property("body").cacheable(),isCancelled:NO,timedOut:null,timeoutTimer:null,fire:function(){var a=this.get("request"),c=a?a.get("source"):null;
if(c&&c.willSend){c.willSend(a,this)}a.freeze();if(!this.get("isCancelled")){this.invokeTransport()
}var b=a.get("timeout");if(b){var d=SC.Timer.schedule({target:this,action:"timeoutReached",interval:b,repeats:NO});
this.set("timeoutTimer",d)}if(!this.get("isCancelled")&&c&&c.didSend){c.didSend(a,this)
}},invokeTransport:function(){this.receive(function(a){this.set("status",200)},this)
},receive:function(e,a){if(!this.get("timedOut")){var d=this.get("timeoutTimer");
if(d){d.invalidate()}this.set("timedOut",NO)}var b=this.get("request");var c=b?b.get("source"):null;
SC.run(function(){if(c&&c.willReceive){c.willReceive(b,this)}e.call(a,!this.get("isCancelled"));
if(!this.get("isCancelled")&&c&&c.didReceive){c.didReceive(b,this)}if(!this.get("isCancelled")){this.notify()
}},this);SC.Request.manager.transportDidClose(this);return this},cancel:function(){if(!this.get("isCancelled")){this.set("isCancelled",YES);
this.cancelTransport();SC.Request.manager.transportDidClose(this)}},timeoutReached:function(){if(this.get("timedOut")===null){this.set("timedOut",YES);
this.cancelTransport();this.receive(function(b){if(!b){return}var a=SC.$error("HTTP Request timed out","Request",0);
a.set("errorValue",this);this.set("isError",YES);this.set("errorObject",a);this.set("status",0)
},this);return YES}return NO},cancelTransport:function(){},_notifyListener:function(b,a){var e=b[a],f,d,c;
if(!e){return NO}f=(e.params||[]).copy();f.unshift(this);d=e.target;c=e.action;if(SC.typeOf(c)===SC.T_STRING){c=d[c]
}return c.apply(d,f)},notify:function(){var b=this.get("listeners"),a=this.get("status"),c=Math.floor(a/100)*100,d=NO;
if(!b){return this}d=this._notifyListener(b,a);if(!d){d=this._notifyListener(b,c)
}if(!d){d=this._notifyListener(b,0)}return this},toString:function(){var a=arguments.callee.base.apply(this,arguments);
return"%@<%@ %@, status=%@".fmt(a,this.get("type"),this.get("address"),this.get("status"))
}});SC.XHRResponse=SC.Response.extend({headers:function(){var c=this.get("rawRequest"),b=c?c.getAllResponseHeaders():null,a={};
if(!b){return a}b.split("\n").forEach(function(g){var d=g.indexOf(":"),e,f;if(d>=0){e=g.slice(0,d);
f=g.slice(d+1).trim();a[e]=f}},this);return a}.property("status").cacheable(),header:function(a){var b=this.get("rawRequest");
return b?b.getResponseHeader(a):null},encodedBody:function(){var b=this.get("rawRequest"),a;
if(!b){a=null}else{if(this.get("isXML")){a=b.responseXML}else{a=b.responseText}}return a
}.property("status").cacheable(),cancelTransport:function(){var a=this.get("rawRequest");
if(a){a.abort()}this.set("rawRequest",null)},invokeTransport:function(){var d,f,b,c,e;
d=this.createRequest();this.set("rawRequest",d);c=!!this.getPath("request.isAsynchronous");
if(c){if(!SC.browser.msie&&!SC.browser.opera){SC.Event.add(d,"readystatechange",this,this.finishRequest,d)
}else{f=this;b=function(){if(!f){return null}var g=f.finishRequest();if(g){f=null
}return g};d.onreadystatechange=b}}d.open(this.get("type"),this.get("address"),c);
e=this.getPath("request.headers");for(var a in e){d.setRequestHeader(a,e[a])}d.send(this.getPath("request.encodedBody"));
if(!c){this.finishRequest()}return d},createRequest:function(){function a(){for(var b=0;
b<arguments.length;b++){try{var c=arguments[b]();return c}catch(d){}}return NO}return a(function(){return new XMLHttpRequest()
},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")
})},finishRequest:function(c){var e=this.get("rawRequest"),a=e.readyState,d,b,f;if(a===4&&!this.get("timedOut")){this.receive(function(g){if(!g){return
}b=-1;try{b=e.status||0}catch(i){}if((b<200)||(b>=300)){try{f=e.statusText||""}catch(h){f=""
}d=SC.$error(f||"HTTP Request failed","Request",b);d.set("errorValue",this);this.set("isError",YES);
this.set("errorObject",d)}this.set("status",b)},this);if(!SC.browser.msie&&!SC.browser.opera){SC.Event.remove(e,"readystatechange",this,this.finishRequest)
}else{e.onreadystatechange=null}return YES}return NO}});sc_require("system/response");
SC.Request=SC.Object.extend(SC.Copyable,SC.Freezable,{isAsynchronous:YES,isJSON:NO,isXML:NO,init:function(){arguments.callee.base.apply(this,arguments);
this.header("X-Requested-With","XMLHttpRequest");this.header("X-SproutCore-Version",SC.VERSION)
},headers:function(){var a=this._headers;if(!a){a=this._headers={}}return a}.property().cacheable(),responseClass:SC.XHRResponse,source:null,address:null,type:"GET",timeout:null,body:null,encodedBody:function(){var a=this.get("body");
if(a&&this.get("isJSON")){a=SC.json.encode(a)}return a}.property("isJSON","isXML","body").cacheable(),willSend:function(b,a){},didSend:function(b,a){},willReceive:function(b,a){},didReceive:function(b,a){},COPY_KEYS:"isAsynchronous isJSON isXML address type timeout body responseClass willSend didSend willReceive didReceive".w(),copy:function(){var a={},d=this.COPY_KEYS,f=d.length,b,c,e;
while(--f>=0){b=d[f];if(this.hasOwnProperty(b)){a[b]=this.get(b)}}if(this.hasOwnProperty("listeners")){a.listeners=SC.copy(this.get("listeners"))
}if(this.hasOwnProperty("_headers")){a._headers=SC.copy(this._headers)}a.source=this.get("source")||this;
return this.constructor.create(a)},header:function(a,b){var c;if(SC.typeOf(a)===SC.T_STRING){c=this._headers;
if(arguments.length===1){return c?c[a]:null}else{this.propertyWillChange("headers");
if(!c){c=this._headers={}}c[a]=b;this.propertyDidChange("headers");return this}}else{if(b===undefined){c=a;
this.beginPropertyChanges();for(a in c){if(!c.hasOwnProperty(a)){continue}this.header(a,c[a])
}this.endPropertyChanges();return this}}return this},async:function(a){if(a===undefined){a=YES
}return this.set("isAsynchronous",a)},timeoutAfter:function(a){return this.set("timeout",a)
},json:function(a){if(a===undefined){a=YES}if(a){this.set("isXML",NO)}return this.set("isJSON",a)
},xml:function(a){if(a===undefined){a=YES}if(a){this.set("isJSON",NO)}return this.set("isXML",a)
},_prep:function(){var a=!!this.header("Content-Type");if(this.get("isJSON")&&!a){this.header("Content-Type","application/json")
}else{if(this.get("isXML")&&!a){this.header("Content-Type","text/xml")}}return this
},send:function(a){var b=this.get("timeout");if(b){if(!this.get("isAsynchronous")){throw"Timeout values cannot be used with synchronous requests"
}}else{if(b===0){throw"The timeout value must either not be specified or must be greater than 0"
}}if(a){this.set("body",a)}return SC.Request.manager.sendRequest(this.copy()._prep())
},resend:function(){var a=this.get("source")?this:this.copy()._prep();return SC.Request.manager.sendRequest(a)
},notify:function(a,e,d,f){var c=YES;if(SC.typeOf(a)!==SC.T_NUMBER){f=SC.A(arguments).slice(2);
d=e;e=a;a=0;c=NO}else{f=SC.A(arguments).slice(3)}var b=this.get("listeners");if(!b){this.set("listeners",b={})
}b[a]={target:e,action:d,params:f};return this}});SC.Request.mixin({getUrl:function(a){return this.create().set("address",a).set("type","GET")
},postUrl:function(b,a){var c=this.create().set("address",b).set("type","POST");if(a){c.set("body",a)
}return c},deleteUrl:function(a){return this.create().set("address",a).set("type","DELETE")
},putUrl:function(b,a){var c=this.create().set("address",b).set("type","PUT");if(a){c.set("body",a)
}return c}});SC.Request.manager=SC.Object.create(SC.DelegateSupport,{maxRequests:6,inflight:[],pending:[],sendRequest:function(b){if(!b){return null
}var a=b.get("responseClass").create({request:b});this.get("pending").pushObject(a);
this.fireRequestIfNeeded();return a},cancel:function(b){var d=this.get("pending"),c=this.get("inflight"),a;
if(d.indexOf(b)>=0){this.propertyWillChange("pending");d.removeObject(b);this.propertyDidChange("pending");
return YES}else{if(c.indexOf(b)>=0){b.cancel();c.removeObject(b);this.fireRequestIfNeeded();
return YES}else{return NO}}},cancelAll:function(){if(this.get("pending").length||this.get("inflight").length){this.set("pending",[]);
this.get("inflight").forEach(function(a){a.cancel()});this.set("inflight",[]);return YES
}else{return NO}},fireRequestIfNeeded:function(){var d=this.get("pending"),c=this.get("inflight"),a=this.get("maxRequests"),b;
if((d.length>0)&&(c.length<a)){b=d.shiftObject();c.pushObject(b);b.fire()}},transportDidClose:function(a){this.get("inflight").removeObject(a);
this.fireRequestIfNeeded()}});SC.routes=SC.Object.create({wantsHistory:NO,usesHistory:null,baseURI:document.baseURI,_didSetup:NO,_location:null,_firstRoute:null,_extractParametersAndRoute:function(c){var a={},h=c.route||"",e,b,d,g,f,j;
e=(h.indexOf("?")<0&&h.indexOf("&")>=0)?"&":"?";b=h.split(e);h=b[0];if(b.length===1){b=[]
}else{if(b.length===2){b=b[1].split("&")}else{if(b.length>2){b.shift()}}}g=b.length;
for(d=0;d<g;++d){f=b[d].split("=");a[f[0]]=f[1]}for(j in c){if(c.hasOwnProperty(j)&&j!=="route"){a[j]=""+c[j]
}}b=[];for(j in a){b.push([j,a[j]].join("="))}a.params=e+b.join("&");a.route=h;return a
},location:function(c,d){var a,b;if(d!==undefined){if(d===null){d=""}if(typeof(d)==="object"){a=this._extractParametersAndRoute(d);
d=a.route+a.params}if(!SC.empty(d)||(this._location&&this._location!==d)){b=encodeURI(d);
if(this.usesHistory){if(b.length>0){b="/"+b}window.history.pushState(null,null,this.get("baseURI")+b)
}else{window.location.hash=b}}this._location=d}return this._location}.property(),ping:function(){var a;
if(!this._didSetup){this._didSetup=YES;if(this.get("wantsHistory")&&SC.platform.supportsHistory){this.usesHistory=YES;
this.popState();SC.Event.add(window,"popstate",this,this.popState)}else{this.usesHistory=NO;
if(SC.platform.supportsHashChange){this.hashChange();SC.Event.add(window,"hashchange",this,this.hashChange)
}else{a=this;this._invokeHashChange=function(){a.hashChange();setTimeout(a._invokeHashChange,100)
};this._invokeHashChange()}}}},hashChange:function(a){var b=window.location.hash;
b=(b&&b.length>0)?b.slice(1,b.length):"";if(!SC.browser.isMozilla){b=decodeURI(b)
}if(this.get("location")!==b){SC.run(function(){this.set("location",b)},this)}},popState:function(a){var b=this.get("baseURI"),c=document.location.href;
if(c.slice(0,b.length)===b){c=c.slice(b.length+1,c.length);if(this.get("location")!==c){SC.run(function(){this.set("location",c)
},this)}}},add:function(a,b,c){if(!this._didSetup){this.invokeLast(this.ping)}if(c===undefined&&SC.typeOf(b)===SC.T_FUNCTION){c=b;
b=null}else{if(SC.typeOf(c)===SC.T_STRING){c=b[c]}}if(!this._firstRoute){this._firstRoute=this._Route.create()
}this._firstRoute.add(a.split("/"),b,c);return this},locationDidChange:function(){this.trigger()
}.observes("location"),trigger:function(){var a=this._firstRoute,b=this.get("location"),d,c;
if(a){d=this._extractParametersAndRoute({route:b});b=d.route;delete d.route;delete d.params;
c=a.routeForParts(b.split("/"),d);if(c&&c.target&&c.method){c.method.call(c.target,d)
}}},_Route:SC.Object.extend({target:null,method:null,staticRoutes:null,dynamicRoutes:null,wildcardRoutes:null,add:function(c,b,e){var a,d;
c=SC.clone(c);if(!c||c.length===0){this.target=b;this.method=e}else{a=c.shift();switch(a.slice(0,1)){case":":a=a.slice(1,a.length);
if(!this.dynamicRoutes){this.dynamicRoutes={}}if(!this.dynamicRoutes[a]){this.dynamicRoutes[a]=this.constructor.create()
}d=this.dynamicRoutes[a];break;case"*":a=a.slice(1,a.length);if(!this.wildcardRoutes){this.wildcardRoutes={}
}d=this.wildcardRoutes[a]=this.constructor.create();break;default:if(!this.staticRoutes){this.staticRoutes={}
}if(!this.staticRoutes[a]){this.staticRoutes[a]=this.constructor.create()}d=this.staticRoutes[a]
}if(d){d.add(c,b,e)}}},routeForParts:function(d,e){var b,c,a;d=SC.clone(d);if(!d||d.length===0){return this.method?this:null
}else{b=d.shift();if(this.staticRoutes&&this.staticRoutes[b]){return this.staticRoutes[b].routeForParts(d,e)
}else{for(c in this.dynamicRoutes){a=this.dynamicRoutes[c].routeForParts(d,e);if(a){e[c]=b;
return a}}for(c in this.wildcardRoutes){d.unshift(b);e[c]=d.join("/");return this.wildcardRoutes[c].routeForParts(null,e)
}return null}}}})});SC.StaticQueue=SC.mixin({},{_content:null,create:function(a){var b=SC.beget(this);
b._content=[];b._content.length=a;return b},enqueue:function(a){if(this.length>=this._content.length){return
}this._content[this._tail++]=a;if(this._tail>=this._content.length){this._tail=0}this.length++;
return this},dequeue:function(){var a;if(this.length>0){a=this._content[this._head++]
}else{return null}if(this._head>=this._content.length){this._head=0}this.length--;
return a},peek:function(a){a=a||0;return this._content[(this._head+a)%this.length]
},length:0,_head:0,_tail:0});SC.Task=SC.Object.extend({run:function(a){}});sc_require("tasks/task");
SC.TaskQueue=SC.Task.extend({init:function(){var a=this;this._doIdleEntry=function(){a._idleEntry()
};this._tasks=[]},runWhenIdle:NO,runLimit:50,interval:50,isRunning:NO,minimumIdleDuration:500,_tasks:null,hasTasks:function(){return this._tasks.length>0
}.property("taskCount").cacheable(),taskCount:function(){return this._tasks.length
}.property().cacheable(),push:function(a){this._tasks.push(a);this.notifyPropertyChange("taskCount")
},next:function(){if(this._tasks.length<1){return null}var a=this._tasks.shift();
this.notifyPropertyChange("taskCount");return a},_taskCountDidChange:function(){this._setupIdle()
}.observes("taskCount"),_setupIdle:function(){if(this.get("runWhenIdle")&&!this._idleIsScheduled&&this.get("taskCount")>0){setTimeout(this._doIdleEntry,this.get("interval"));
this._idleIsScheduled=YES}},_idleEntry:function(){this._idleIsScheduled=NO;var a=SC.RunLoop.lastRunLoopEnd;
if(Date.now()-a>this.get("minimumIdleDuration")){SC.run(this.run,this);SC.RunLoop.lastRunLoopEnd=a
}this._setupIdle()},run:function(a){this.set("isRunning",YES);if(!a){a=this.get("runLimit")
}var b,c=Date.now();while(b=this.next()){b.run(this);if(Date.now()-c>a){break}}this.set("isRunning",NO)
}});SC.backgroundTaskQueue=SC.TaskQueue.create({runWhenIdle:YES});SC.time=function(a){var b=SC.beget(fn);
b.value=timeOffset;return b};(function(){var a=new Date();SC.mixin(SC.time,{month:function(c,b){a.setTime(c);
if(b===undefined){return a.getMonth()}a.setMonth(b);return a.getTime()},utc:function(b){a.setTime(b);
return b+(a.getTimezoneOffset()*60*1000)},local:function(b){a.setTime(b);return b-(a.getTimezoneOffset()*60*1000)
},parse:function(b){},format:function(b){}})})();SC.time.fmt=SC.time.format;SC.time.fn={done:function(){return this.value
}};"month day year".split(" ").forEach(function(a){SC.time.fn[a]=function(b){if(b===undefined){return SC.time[a](this.value)
}else{this.value=SC.time[a](this.value,b);return this}}});var MONTH_NAMES=new Array("January","February","March","April","May","June","July","August","September","October","November","December","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var DAY_NAMES=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sun","Mon","Tue","Wed","Thu","Fri","Sat");
function LZ(a){return(a<0||a>9?"":"0")+a}SC.Locale.define("en",{longMonthNames:"January February March April May".split(" "),shortMonthNames:[],shortDateFormat:"dd/mm/yy",longDateFormat:""});
SC.mixin(Date,{isDate:function(c,b){var a=Date.getDateFromFormat(c,b);if(a==0){return false
}return true},compareDates:function(e,f,c,d){var b=Date.getDateFromFormat(e,f);var a=Date.getDateFromFormat(c,d);
if(b==0||a==0){return -1}else{if(b>a){return 1}}return 0},getDateFromFormat:function(z,q){z=z+"";
q=q+"";var w=0;var l=0;var s="";var f="";var v="";var h,g;var b=new Date();var j=b.getFullYear();
var u=b.getMonth()+1;var t=1;var d=b.getHours();var r=b.getMinutes();var n=b.getSeconds();
var k="";var o=SC.Locale.currentLocale;while(l<q.length){s=q.charAt(l);f="";while((q.charAt(l)==s)&&(l<q.length)){f+=q.charAt(l++)
}if(f=="yyyy"||f=="yy"||f=="y"){if(f=="yyyy"){h=4;g=4}if(f=="yy"){h=2;g=2}if(f=="y"){h=2;
g=4}j=Date._getInt(z,w,h,g);if(j==null){return 0}w+=j.length;if(j.length==2){if(j>70){j=1900+(j-0)
}else{j=2000+(j-0)}}}else{if(f=="MMM"||f=="NNN"){u=0;for(var p=0;p<MONTH_NAMES.length;
p++){var e=MONTH_NAMES[p];if(z.substring(w,w+e.length).toLowerCase()==e.toLowerCase()){if(f=="MMM"||(f=="NNN"&&p>11)){u=p+1;
if(u>12){u-=12}w+=e.length;break}}}if((u<1)||(u>12)){return 0}}else{if(f=="EE"||f=="E"){for(var p=0;
p<DAY_NAMES.length;p++){var m=DAY_NAMES[p];if(z.substring(w,w+m.length).toLowerCase()==m.toLowerCase()){w+=m.length;
break}}}else{if(f=="MM"||f=="M"){u=Date._getInt(z,w,f.length,2);if(u==null||(u<1)||(u>12)){return 0
}w+=u.length}else{if(f=="dd"||f=="d"){t=Date._getInt(z,w,f.length,2);if(t==null||(t<1)||(t>31)){return 0
}w+=t.length}else{if(f=="hh"||f=="h"){d=Date._getInt(z,w,f.length,2);if(d==null||(d<1)||(d>12)){return 0
}w+=d.length}else{if(f=="HH"||f=="H"){d=Date._getInt(z,w,f.length,2);if(d==null||(d<0)||(d>23)){return 0
}w+=d.length}else{if(f=="KK"||f=="K"){d=Date._getInt(z,w,f.length,2);if(d==null||(d<0)||(d>11)){return 0
}w+=d.length}else{if(f=="kk"||f=="k"){d=Date._getInt(z,w,f.length,2);if(d==null||(d<1)||(d>24)){return 0
}w+=d.length;d--}else{if(f=="mm"||f=="m"){r=Date._getInt(z,w,f.length,2);if(r==null||(r<0)||(r>59)){return 0
}w+=r.length}else{if(f=="ss"||f=="s"){n=Date._getInt(z,w,f.length,2);if(n==null||(n<0)||(n>59)){return 0
}w+=n.length}else{if(f=="a"){if(z.substring(w,w+2).toLowerCase()=="am"){k="AM"}else{if(z.substring(w,w+2).toLowerCase()=="pm"){k="PM"
}else{return 0}}w+=2}else{if(z.substring(w,w+f.length)!=f){return 0}else{w+=f.length
}}}}}}}}}}}}}}if(w!=z.length){return 0}if(u==2){if(((j%4==0)&&(j%100!=0))||(j%400==0)){if(t>29){return 0
}}else{if(t>28){return 0}}}if((u==4)||(u==6)||(u==9)||(u==11)){if(t>30){return 0}}if(d<12&&k=="PM"){d=d-0+12
}else{if(d>11&&k=="AM"){d-=12}}var a=new Date(j,u-1,t,d,r,n);return a.getTime()},parseDate:function(k){var g=(arguments.length==2)?arguments[1]:false;
generalFormats=new Array("E NNN dd HH:mm:ss UTC yyyy","y-M-d","y-M-d","MMM d, y","MMM d,y","y-MMM-d","d-MMM-y","MMM d","d MMM y","d.MMM.y","y MMM d","y.MMM.d");
monthFirst=new Array("M/d/y","M-d-y","M.d.y","MMM-d","M/d","M-d");dateFirst=new Array("d/M/y","d-M-y","d.M.y","d-MMM","d/M","d-M");
var b=new Array("generalFormats",g?"dateFirst":"monthFirst",g?"monthFirst":"dateFirst");
var h=null;h=0;var e=new Date().getTime();switch(k.toLowerCase()){case"yesterday".loc():h=e-(24*60*60*1000);
break;case"today".loc():case"now".loc():h=e;break;case"tomorrow".loc():h=e+(24*60*60*1000);
break}if(h>0){return new Date(h)}for(var f=0;f<b.length;f++){var a=window[b[f]];for(var c=0;
c<a.length;c++){h=Date.getDateFromFormat(k,a[c]);if(h==0){h=Date.getDateFromFormat(k,a[c]+" H:m:s")
}if(h==0){h=Date.getDateFromFormat(k,a[c]+" h:m:s a")}if(h!=0){return new Date(h)
}}}return null},_isInteger:function(c){var b="1234567890";for(var a=0;a<c.length;
a++){if(b.indexOf(c.charAt(a))==-1){return false}}return true},_getInt:function(f,d,e,c){for(var a=c;
a>=e;a--){var b=f.substring(d,d+a);if(b.length<e){return null}if(Date._isInteger(b)){return b
}}return null}});SC.mixin(Date.prototype,{format:function(D){D=D+"";var I=this;var l="";
var v=0;var G="";var f="";var j=I.getFullYear()+"";var g=I.getMonth()+1;var F=I.getDate();
var o=I.getDay();var n=I.getHours();var x=I.getMinutes();var q=I.getSeconds();var t,u,b,r,J,e,C,B,z,p,N,n,L,i,a,A;
var w=new Object();if(j.length<4){j=""+(j-0+1900)}w.y=""+j;w.yyyy=j;w.yy=j.substring(2,4);
w.M=g;w.MM=LZ(g);w.MMM=MONTH_NAMES[g-1];w.NNN=MONTH_NAMES[g+11];w.d=F;w.dd=LZ(F);
w.E=DAY_NAMES[o+7];w.EE=DAY_NAMES[o];w.H=n;w.HH=LZ(n);if(n==0){w.h=12}else{if(n>12){w.h=n-12
}else{w.h=n}}w.hh=LZ(w.h);if(n>11){w.K=n-12}else{w.K=n}w.k=n+1;w.KK=LZ(w.K);w.kk=LZ(w.k);
if(n>11){w.a="PM"}else{w.a="AM"}w.m=x;w.mm=LZ(x);w.s=q;w.ss=LZ(q);while(v<D.length){G=D.charAt(v);
f="";while((D.charAt(v)==G)&&(v<D.length)){f+=D.charAt(v++)}if(w[f]!=null){l=l+w[f]
}else{l=l+f}}return l},utcFormat:function(){return(new Date(this.getTime()+(this.getTimezoneOffset()*60*1000))).format("E NNN dd HH:mm:ss UTC yyyy")
}});SC.UserDefaults=SC.Object.extend({ready:NO,userDomain:null,appDomain:null,_defaults:null,_safari3DB:null,defaults:function(a){this._defaults=a;
this.allPropertiesDidChange()},readDefault:function(h){var c,a,i,g,j,f;h=this._normalizeKeyName(h);
a=this._userKeyName(h);if(this._written){c=this._written[a]}if(SC.browser.msie=="7.0"){i=document.body;
try{i.load("SC.UserDefaults")}catch(b){console.err("Couldn't load userDefaults in IE7: "+b.description)
}}else{if(this.HTML5DB_noLocalStorage){f=this._safari3DB}else{i=window.localStorage;
if(!i&&window.globalStorage){i=window.globalStorage[window.location.hostname]}}}if(i||f){g=["SC.UserDefaults",a].join("-at-");
if(SC.browser.msie=="7.0"){c=i.getAttribute(g.replace(/\W/gi,""))}else{if(f){c=this.dataHash[g]
}else{c=i[g]}}if(!SC.none(c)){try{c=SC.json.decode(c)}catch(d){}}}j=this.delegate;
if(j&&j.userDefaultsNeedsDefault){c=j.userDefaultsNeedsDefault(this,h,a)}if((c===undefined)&&this._defaults){c=this._defaults[a]||this._defaults[h]
}return c},writeDefault:function(j,h){var d,b,k,i,l,g;j=this._normalizeKeyName(j);
d=this._userKeyName(j);b=this._written;if(!b){b=this._written={}}b[d]=h;if(SC.browser.msie=="7.0"){k=document.body
}else{if(this.HTML5DB_noLocalStorage){g=this._safari3DB}else{k=window.localStorage;
if(!k&&window.globalStorage){k=window.globalStorage[window.location.hostname]}}}i=["SC.UserDefaults",d].join("-at-");
if(k||g){var a=SC.json.encode(h);if(SC.browser.msie=="7.0"){k.setAttribute(i.replace(/\W/gi,""),a);
k.save("SC.UserDefaults")}else{if(g){var c=this;g.transaction(function(e){e.executeSql("delete from SCLocalStorage where key = ?",[i],function(){e.executeSql("insert into SCLocalStorage(key, value) VALUES ('"+i+"', '"+a+"');",[],c._nullDataHandler,c.killTransaction)
})});this.dataHash[i]=a}else{try{k[i]=a}catch(f){console.error("Failed using localStorage. "+f)
}}}}l=this.delegate;if(l&&l.userDefaultsDidChange){l.userDefaultsDidChange(this,j,h,d)
}return this},resetDefault:function(i){var a,d,b,j,h,g;a=this._normalizeKeyName(i);
d=this._userKeyName(a);this.propertyWillChange(i);this.propertyWillChange(a);b=this._written;
if(b){delete b[d]}if(SC.browser.msie=="7.0"){j=document.body}else{if(this.HTML5DB_noLocalStorage){g=this._safari3DB
}else{j=window.localStorage;if(!j&&window.globalStorage){j=window.globalStorage[window.location.hostname]
}}}h=["SC.UserDefaults",d].join("-at-");if(j){if(SC.browser.msie=="7.0"){j.setAttribute(h.replace(/\W/gi,""),null);
j.save("SC.UserDefaults")}else{if(g){var c=this;g.transaction(function(e){e.executeSql("delete from SCLocalStorage where key = ?",[h],null)
});delete this.dataHash[h]}else{try{delete j[h]}catch(f){console.warn("Deleting local storage encountered a problem. "+f)
}}}}this.propertyDidChange(i);this.propertyDidChange(a);return this},unknownProperty:function(a,b){if(b===undefined){return this.readDefault(a)
}else{this.writeDefault(a,b);return b}},_normalizeKeyName:function(a){if(a.indexOf(":")<0){var b=this.get("appDomain")||"app";
a=[b,a].join(":")}return a},_userKeyName:function(b){var a=this.get("userDomain")||"(anonymous)";
return[a,b].join("-at-")},_domainDidChange:function(){var a=NO;if(this.get("userDomain")!==this._scud_userDomain){this._scud_userDomain=this.get("userDomain");
a=YES}if(this.get("appDomain")!==this._scud_appDomain){this._scud_appDomain=this.get("appDomain");
a=YES}if(a){this.allPropertiesDidChange()}}.observes("userDomain","appDomain"),init:function(){arguments.callee.base.apply(this,arguments);
jQuery.readyWait++;if(SC.userDefaults&&SC.userDefaults.get("dataHash")){var f=SC.userDefaults.get("dataHash");
if(f){this.dataHash=SC.userDefaults.get("dataHash")}}this._scud_userDomain=this.get("userDomain");
this._scud_appDomain=this.get("appDomain");if(SC.browser.msie=="7.0"){document.body.addBehavior("#default#userData")
}this.HTML5DB_noLocalStorage=((parseInt(SC.browser.webkit,0)>523)&&(parseInt(SC.browser.webkit,0)<528));
if(this.HTML5DB_noLocalStorage){var d;try{if(!window.openDatabase){console.error("Trying to load a database with safari version 3.1 to get SC.UserDefaults to work. You are either in a previous version or there is a problem with your browser.");
return}else{var a="scdb",c="1.0",b="SproutCore database",i=65536;d=openDatabase(a,c,b,i)
}}catch(h){console.error("Trying to load a database with safari version 3.1 to get SC.UserDefaults to work. You are either in a previous version or there is a problem with your browser.");
return}if(d){var g=this;d.transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS SCLocalStorage(key TEXT NOT NULL PRIMARY KEY, value TEXT NOT NULL);",[],g._nullDataHandler,g.killTransaction)
});d.transaction(function(e){e.parent=g;e.executeSql("SELECT * from SCLocalStorage;",[],function(o,l){var m={},n;
for(var k=0,j=l.rows.length;k<j;k++){n=l.rows.item(k);m[n.key]=n.value}o.parent.dataHash=m;
SC.run(function(){jQuery.ready(true)})},g.killTransaction)});this._safari3DB=d}}else{jQuery.ready(true)
}},_killTransaction:function(b,a){return true},_nullDataHandler:function(b,a){}});
SC.userDefaults=SC.UserDefaults.create();SC.mixin({convertHsvToHex:function(j,w,o){var a=0,k=0,n=0;
if(o>0){var e=(j==1)?0:Math.floor(j*6),l=(j==1)?0:(j*6)-e,d=o*(1-w),c=o*(1-(w*l)),u=o*(1-(w*(1-l))),m=[[o,u,d],[c,o,d],[d,o,u],[d,c,o],[u,d,o],[o,d,c]];
a=Math.round(255*m[e][0]);k=Math.round(255*m[e][1]);n=Math.round(255*m[e][2])}return this.parseColor("rgb("+a+","+k+","+n+")")
},convertHexToHsv:function(g){var c=this.expandColor(g),a=Math.max(Math.max(c[0],c[1]),c[2]),d=Math.min(Math.min(c[0],c[1]),c[2]),f=(a===0)?0:(1-d/a),b=a/255,e=(a==d)?0:((a==c[0])?((c[1]-c[2])/(a-d)/6):((a==c[1])?((c[2]-c[0])/(a-d)/6+1/3):((c[0]-c[1])/(a-d)/6+2/3)));
e=(e<0)?(e+1):((e>1)?(e-1):e);return[e,f,b]},PARSE_COLOR_RGBRE:/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i,PARSE_COLOR_HEXRE:/^\#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,expandColor:function(b){var c,e,d,a;
c=this.parseColor(b);if(c){e=parseInt(c.slice(1,3),16);d=parseInt(c.slice(3,5),16);
a=parseInt(c.slice(5,7),16);return[e,d,a]}},parseColor:function(d){var e=0,a="#",c,b;
if(c=this.PARSE_COLOR_RGBRE.exec(d)){for(e=1;e<=3;e++){b=Math.max(0,Math.min(255,parseInt(c[e],0)));
a+=this.toColorPart(b)}return a}if(c=this.PARSE_COLOR_HEXRE.exec(d)){if(c[1].length==3){for(e=0;
e<3;e++){a+=c[1].charAt(e)+c[1].charAt(e)}return a}return"#"+c[1]}return false},toColorPart:function(a){if(a>255){a=255
}var b=a.toString(16);if(a<16){return"0"+b}return b}});SC.mixin({ZERO_RANGE:{start:0,length:0},RANGE_NOT_FOUND:{start:0,length:-1},valueInRange:function(b,a){return(b>=0)&&(b>=a.start)&&(b<(a.start+a.length))
},minRange:function(a){return a.start},maxRange:function(a){return(a.length<0)?-1:(a.start+a.length)
},unionRanges:function(c,b){if((c==null)||(c.length<0)){return b}if((b==null)||(b.length<0)){return c
}var d=Math.min(c.start,b.start),a=Math.max(SC.maxRange(c),SC.maxRange(b));return{start:d,length:a-d}
},intersectRanges:function(c,b){if((c==null)||(b==null)){return SC.RANGE_NOT_FOUND
}if((c.length<0)||(b.length<0)){return SC.RANGE_NOT_FOUND}var d=Math.max(SC.minRange(c),SC.minRange(b)),a=Math.min(SC.maxRange(c),SC.maxRange(b));
if(a<d){return SC.RANGE_NOT_FOUND}return{start:d,length:a-d}},subtractRanges:function(c,b){if((c==null)||(b==null)){return SC.RANGE_NOT_FOUND
}if((c.length<0)||(b.length<0)){return SC.RANGE_NOT_FOUND}var a=Math.max(SC.minRange(c),SC.minRange(b)),d=Math.min(SC.maxRange(c),SC.maxRange(b));
if(a<d){return SC.RANGE_NOT_FOUND}return{start:d,length:a-d}},cloneRange:function(a){return{start:a.start,length:a.length}
},rangesEqual:function(b,a){if(b===a){return true}if(b==null){return a.length<0}if(a==null){return b.length<0
}return(b.start==a.start)&&(b.length==a.length)}});require("tasks/task");SC.didPreloadBundle=function(){};
SC.PreloadBundleTask=SC.Task.extend({bundle:null,target:"SC",action:"preloaded",run:function(a){var b;
if(b=this.get("bundle")){var c=Date.now();SC.Module.loadModule(this.get("bundle"),this.get("target"),this.get("action"))
}}});SC.VALIDATE_OK=YES;SC.VALIDATE_NO_CHANGE=NO;SC.Validator=SC.Object.extend({fieldValueForObject:function(b,c,a){return b
},objectForFieldValue:function(c,b,a){return c},validate:function(a,b){return true
},validateError:function(a,b){return SC.$error("Invalid.General(%@)".loc(b.get("fieldValue")),b.get("fieldKey"))
},validateChange:function(b,c,a){return this.validate(b,c)?SC.VALIDATE_OK:this.validateError(b,c)
},validateSubmit:function(a,b){return this.validate(a,b)?SC.VALIDATE_OK:this.validateError(a,b)
},validatePartial:function(a,b){if(!b.get("isValid")){return this.validate(a,b)?SC.VALIDATE_OK:this.validateError(a,b)
}else{return SC.VALIDATE_NO_CHANGE}},validateKeyDown:function(b,c,a){return true},attachTo:function(a,b){},detachFrom:function(a,b){}});
SC.Validator.mixin({OK:true,NO_CHANGE:false,findFor:function(e,g,f){var c;if(!f){return
}if(f instanceof SC.Validator){c=f}else{if(f.isClass){c=f.create()}else{if(SC.typeOf(f)===SC.T_STRING){var b=null;
var a=f.match(/^(.+)\[(.*)\]/);if(a){f=a[1];b=a[2]}f=f.classify();var d=SC.Validator[f];
if(SC.none(d)){throw"validator %@ not found for %@".fmt(f,g)}else{if(b){if(!e){throw"named validator (%@) could not be found for field %@ because the field does not belong to a form".fmt(b,g)
}if(!e._validatorHash){e._validatorHash={}}c=(b)?e._validatorHash[b]:null;if(!c){c=d.create()
}if(b){e._validatorHash[b]=c}}else{c=d.create()}}}}}return c},fieldValueForObject:function(a,b,c){if(this.prototype&&this.prototype.fieldValueForObject){return this.prototype.fieldValueForObject(a,b,c)
}else{return null}},objectForFieldValue:function(b,a,c){if(this.prototype&&this.prototype.objectForFieldValue){return this.prototype.objectForFieldValue(b,a,c)
}else{return null}}});sc_require("validators/validator");SC.Validator.CreditCard=SC.Validator.extend({fieldValueForObject:function(a,b,c){if(typeof(a)=="string"&&a.length==16){a=[a.slice(0,4),a.slice(4,8),a.slice(8,12),a.slice(12,16)].join(" ")
}return a},objectForFieldValue:function(b,a,c){return b.replace(/[\s-\.\:]/g,"")},validate:function(a,b){return this.checkNumber(b.get("fieldValue"))
},validateError:function(b,c){var a=c.get("errorLabel")||"Field";return SC.$error("Invalid.CreditCard(%@)".loc(a),a)
},validateKeyDown:function(b,c,a){return !!a.match(/[0-9\- ]/)},checkNumber:function(h){if(!h||h.length===0){return YES
}h=h.replace(/[^0-9]/g,"");var a="0123456789";var g=h.length;var f=parseInt(h,0);
var l=h.toString();l=l.replace(/^\s+|\s+$/g,"");var k=0;var n=true;var b=false;var m;
var d;for(var c=0;c<g;c++){m=""+l.substring(c,c+1);if(a.indexOf(m)=="-1"){n=false
}}if(!n){b=false}if((g===0)&&(b)){b=false}else{if(g>=15){for(var e=g;e>0;e--){d=parseInt(f,0)%10;
d=parseInt(d,0);k+=d;e--;f=f/10;d=parseInt(f,0)%10;d=d*2;switch(d){case 10:d=1;break;
case 12:d=3;break;case 14:d=5;break;case 16:d=7;break;case 18:d=9;break;default:d=d
}f=f/10;k+=d}if((k%10)===0){b=true}else{b=false}}}return b}});sc_require("validators/validator");
SC.Validator.Date=SC.Validator.extend({format:"NNN d, yyyy h:mm:ss a",fieldValueForObject:function(b,c,d){var a;
if(typeof(b)==="number"){a=new Date(b)}else{if(b instanceof Date){a=b}}if(a){b=a.format(this.get("format"))
}return b},objectForFieldValue:function(c,b,d){if(c){var a=Date.parseDate(c);c=(a)?a.getTime():null
}return c}});require("validators/validator");SC.Validator.DateTime=SC.Validator.extend({format:"%d/%m/%Y",fieldValueForObject:function(a,b,c){if(SC.kindOf(a,SC.DateTime)){a=a.toFormattedString(this.get("format"))
}else{a=null}return a},objectForFieldValue:function(b,a,c){if(b){b=SC.DateTime.parse(b,this.get("format"))
}return b}});sc_require("validators/validator");SC.Validator.Email=SC.Validator.extend({validate:function(a,b){return(b.get("fieldValue")||"").match(/.+@.+\...+/)
},validateError:function(b,c){var a=c.get("errorLabel")||"Field";return SC.$error("Invalid.Email(%@)".loc(a),a)
}});SC.Validator.EmailOrEmpty=SC.Validator.Email.extend({validate:function(a,c){var b=c.get("fieldValue");
return(b&&b.length>0)?b.match(/.+@.+\...+/):true}});sc_require("validators/validator");
SC.Validator.NotEmpty=SC.Validator.extend({validate:function(a,c){var b=c.get("fieldValue");
if(SC.none(b)){return NO}if(!SC.none(b.length)){return b.length>0}return YES},validateError:function(b,c){var a=c.get("errorLabel")||"Field";
return SC.$error("Invalid.NotEmpty(%@)".loc(a.capitalize()),c.get("errorLabel"))}});
sc_require("validators/validator");sc_require("system/utils/misc");SC.Validator.Number=SC.Validator.extend({places:0,fieldValueForObject:function(a,b,c){switch(SC.typeOf(a)){case SC.T_NUMBER:a=a.toFixed(this.get("places"));
break;case SC.T_NULL:case SC.T_UNDEFINED:a="";break}return a},objectForFieldValue:function(c,b,d){var a;
c=c.replace(/,/g,"");switch(SC.typeOf(c)){case SC.T_STRING:if(c.length===0){c=null
}else{if(this.get("places")>0){c=parseFloat(c)}else{if(c.length==1&&c.match(/-/)){c=null
}else{a=parseInt(c,0);if(isNaN(a)){c=SC.uniJapaneseConvert(c);c=parseInt(c,0);if(isNaN(c)){c=""
}}else{c=a}}}}break;case SC.T_NULL:case SC.T_UNDEFINED:c=null;break}return c},validate:function(a,c){var b=c.get("fieldValue");
return(b==="")||!(isNaN(b)||isNaN(parseFloat(b)))},validateError:function(b,c){var a=c.get("errorLabel")||"Field";
return SC.$error("Invalid.Number(%@)".loc(a),a)},validateKeyDown:function(b,c,a){var d=c.$input().val();
if(!d){d=""}d+=a;if(this.get("places")===0){if(a.length===0){return true}else{return d.match(/^[\-{0,1}]?[0-9,\0]*/)[0]===d
}}else{if(a.length===0){return true}else{return d.match(/^[\-{0,1}]?[0-9,\0]*\.?[0-9\0]+/)===d
}}}});sc_require("validators/validator");SC.Validator.Password=SC.Validator.extend({attachTo:function(a,b){arguments.callee.base.apply(this,arguments);
if(!this.fields){this.fields=[]}this.fields.push(b)},validate:function(e){if(!this.fields||this.fields.length===0){return true
}var d=false;var b=false;var a=true;var c=this.fields[0].get("fieldValue");this.fields.forEach(function(g){var f=g.get("fieldValue");
if(f!=c){a=false}if(!f||f.length===0){d=true}if(f&&f.length>0){b=true}});if(e){return(b===false)?false:a
}else{return(d===true)?true:a}},updateFields:function(c,b){if(!this.fields||this.fields.length===0){return true
}var a="Invalid.Password".loc();var d=this._field;this.fields.forEach(function(e){var g=(b)?null:((e==d)?a:"");
c.setErrorFor(e,g)});return(b)?SC.VALIDATE_OK:a},validateChange:function(b,c,a){return this.updateFields(b,this.validate(false))
},validateSubmit:function(a,b){return this.updateFields(a,this.validate(true))},validatePartial:function(b,c){var a=!this._field.get("isValid");
if(a){return this.updateFields(b,this.validate(false))}else{return SC.VALIDATE_NO_CHANGE
}}});sc_require("validators/validator");SC.Validator.PositiveInteger=SC.Validator.extend({defaultValue:null,fieldValueForObject:function(a,b,c){switch(SC.typeOf(a)){case SC.T_NUMBER:a=a.toFixed(0);
break;case SC.T_NULL:case SC.T_UNDEFINED:a=this.get("defaultValue");break}return a
},objectForFieldValue:function(b,a,c){b=b.replace(/,/g,"");switch(SC.typeOf(b)){case SC.T_STRING:if(b.length===0){b=this.get("defaultValue")
}else{b=parseInt(b,0)}break;case SC.T_NULL:case SC.T_UNDEFINED:b=this.get("defaultValue");
break}return b},validate:function(a,c){var b=c.get("fieldValue");return(b==="")||!isNaN(b)
},validateError:function(b,c){var a=c.get("errorLabel")||"Field";return SC.$error("Invalid.Number(%@)".loc(a),a)
},validateKeyDown:function(b,c,a){var d=c.$input().val();if(!d){d=""}d+=a;if(a.length===0){return true
}else{return d.match(/^[0-9\0]*/)[0]===d}}});SC.ContainerView=SC.View.extend({classNames:["sc-container-view"],renderDelegateName:"containerRenderDelegate",nowShowing:null,contentView:null,contentViewBindingDefault:SC.Binding.single(),replaceContent:function(a){this.removeAllChildren();
if(a){this.appendChild(a)}},createChildViews:function(){var a=this.get("contentView");
if(a){a=this.contentView=this.createChildView(a);this.childViews=[a]}},awake:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("nowShowing");if(a&&a.length>0){this.nowShowingDidChange()}},nowShowingDidChange:function(){var b=this.get("nowShowing");
if(b===SC.CONTENT_SET_DIRECTLY){return}if(SC.typeOf(b)===SC.T_STRING&&b.length>0){if(b.indexOf(".")>0){b=SC.objectForPropertyPath(b)
}else{var a=this.getPath(b);b=SC.kindOf(a,SC.View)?a:SC.objectForPropertyPath(b,this.get("page"))
}}if(SC.typeOf(b)===SC.T_CLASS){if(b.kindOf(SC.View)){b=b.create()}else{b=null}}if(b&&!(b instanceof SC.View)){b=null
}this.set("contentView",b)}.observes("nowShowing"),contentViewDidChange:function(){this.replaceContent(this.get("contentView"))
}.observes("contentView")});SC.SCALE_NONE="none";SC.FILL="fill";SC.FILL_PROPORTIONALLY="fillProportionally";
SC.BEST_FIT="fitBest";SC.BEST_FIT_DOWN_ONLY="fitBestDown";SC.IMAGE_STATE_NONE="none";
SC.IMAGE_STATE_LOADING="loading";SC.IMAGE_STATE_LOADED="loaded";SC.IMAGE_STATE_FAILED="failed";
SC.IMAGE_TYPE_NONE="NONE";SC.IMAGE_TYPE_URL="URL";SC.IMAGE_TYPE_CSS_CLASS="CSS_CLASS";
SC.BLANK_IMAGE_DATAURL="data:image/gif;base64,R0lGODlhAQABAJAAAP///wAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==";
SC.BLANK_IMAGE_URL=SC.browser.msie&&SC.browser.msie<8?"http://jslewis.github.com/sctable-demo/static/sproutcore/foundation/en/472c9bf7a81f082a1c9ac185ba62288f16069418/blank.gif":SC.BLANK_IMAGE_DATAURL;
SC.BLANK_IMAGE=new Image();SC.BLANK_IMAGE.src=SC.BLANK_IMAGE_URL;SC.BLANK_IMAGE.width=SC.BLANK_IMAGE.height=1;
SC.ImageView=SC.View.extend(SC.Control,{classNames:"sc-image-view",displayProperties:"image imageValue innerFrame frame status scale toolTip type".w(),renderDelegateName:function(){return(this.get("useCanvas")?"canvasImage":"image")+"RenderDelegate"
}.property("useCanvas").cacheable(),tagName:function(){return this.get("useCanvas")?"canvas":"div"
}.property("useCanvas").cacheable(),align:SC.ALIGN_CENTER,canLoadInBackground:NO,image:SC.BLANK_IMAGE,innerFrame:function(){var c=this.get("image"),e=this.get("align"),b=this.get("scale"),a=this.get("frame"),f=c.width,d=c.height,h,g,i;
i={x:0,y:0,width:a.width,height:a.height};if(b===SC.FILL){return i}h=a.width/f;g=a.height/d;
switch(b){case SC.FILL_PROPORTIONALLY:b=h>g?h:g;break;case SC.BEST_FIT:b=h<g?h:g;
break;case SC.BEST_FIT_DOWN_ONLY:if((f>a.width)||(d>a.height)){b=h<g?h:g}else{b=1
}break;case SC.SCALE_NONE:b=1;break;default:if(isNaN(window.parseFloat(b))||(window.parseFloat(b)<=0)){SC.Logger.warn("SC.ImageView: The scale '%@' was not understood.  Scale must be one of SC.FILL, SC.FILL_PROPORTIONALLY, SC.BEST_FIT, SC.BEST_FIT_DOWN_ONLY or a positive number greater than 0.00.".fmt(b));
return i}}f*=b;d*=b;i.width=Math.round(f);i.height=Math.round(d);switch(e){case SC.ALIGN_LEFT:i.x=0;
i.y=(a.height/2)-(d/2);break;case SC.ALIGN_RIGHT:i.x=a.width-f;i.y=(a.height/2)-(d/2);
break;case SC.ALIGN_TOP:i.x=(a.width/2)-(f/2);i.y=0;break;case SC.ALIGN_BOTTOM:i.x=(a.width/2)-(f/2);
i.y=a.height-d;break;case SC.ALIGN_TOP_LEFT:i.x=0;i.y=0;break;case SC.ALIGN_TOP_RIGHT:i.x=a.width-f;
i.y=0;break;case SC.ALIGN_BOTTOM_LEFT:i.x=0;i.y=a.height-d;break;case SC.ALIGN_BOTTOM_RIGHT:i.x=a.width-f;
i.y=a.height-d;break;default:i.x=(a.width/2)-(f/2);i.y=(a.height/2)-(d/2)}return i
}.property("align","image","scale","frame").cacheable(),imageValue:function(){var a=this.get("value");
return a&&a.isEnumerable?a.firstObject():a}.property("value").cacheable(),localize:YES,scale:SC.FILL,status:SC.IMAGE_STATE_NONE,type:function(){var a=this.get("imageValue");
if(SC.ImageView.valueIsUrl(a)){return SC.IMAGE_TYPE_URL}else{if(!SC.none(a)){return SC.IMAGE_TYPE_CSS_CLASS
}}return SC.IMAGE_TYPE_NONE}.property("imageValue").cacheable(),useCanvas:function(){return SC.platform.supportsCanvas
}.property().cacheable(),useImageQueue:YES,value:null,init:function(){arguments.callee.base.apply(this,arguments);
this._image_valueDidChange();if(this.get("useImageCache")!==undefined){SC.Logger.warn("%@ has useImageCache set, please set useImageQueue instead".fmt(this));
this.set("useImageQueue",this.get("useImageCache"))}},layerDidChange:function(){if(this.get("useCanvas")){this.set("layerNeedsUpdate",YES)
}}.observes("layer"),_image_valueDidChange:function(){var b=this.get("imageValue"),a=this.get("type");
if(b!==this._iv_value){this._iv_value=b;this.set("image",SC.BLANK_IMAGE);this.set("status",SC.IMAGE_STATE_LOADING);
if(!this._loadImageUsingCache()){if(!this._loadImage()){}}}}.observes("imageValue"),_loadImageUsingCache:function(){var c=this.get("imageValue"),b=this.get("type");
if(b===SC.IMAGE_TYPE_URL&&this.get("useImageQueue")){var a=this.get("isVisibleInWindow")||this.get("canLoadInBackground");
SC.imageQueue.loadImage(c,this,this._loadImageUsingCacheDidComplete,a);return YES
}return NO},_loadImageUsingCacheDidComplete:function(a,c){var b=this.get("imageValue");
if(b===a){if(SC.ok(c)){this.didLoad(c)}else{this.didError(c)}}},_loadImage:function(){var c=this.get("imageValue"),a=this.get("type"),b=this,e;
if(a===SC.IMAGE_TYPE_URL){e=new Image();var d=function(){SC.run(function(){b._loadImageDidComplete(c,SC.$error("SC.Image.FailedError","Image",-101))
})};var f=function(){SC.run(function(){b._loadImageDidComplete(c,e)})};$(e).bind("error",d);
$(e).bind("abort",d);$(e).bind("load",f);e.src=c;return YES}return NO},_loadImageDidComplete:function(a,c){var b=this.get("imageValue");
if(b===a){if(SC.ok(c)){this.didLoad(c)}else{this.didError(c)}}},didLoad:function(a){this.set("status",SC.IMAGE_STATE_LOADED);
if(!a){a=SC.BLANK_IMAGE}this.set("image",a)},didError:function(a){this.set("status",SC.IMAGE_STATE_FAILED);
this.set("image",SC.BLANK_IMAGE)}});SC.ImageView.valueIsUrl=function(a){return a?a.indexOf("/")>=0:NO
};sc_require("mixins/inline_editable");sc_require("mixins/inline_editor_delegate");
SC.REGULAR_WEIGHT="normal";SC.BOLD_WEIGHT="bold";SC.LabelView=SC.View.extend(SC.Control,SC.InlineEditorDelegate,SC.InlineEditable,{classNames:["sc-label-view"],displayProperties:"displayTitle textAlign fontWeight icon escapeHTML needsEllipsis hint".w(),isEditable:NO,exampleInlineTextFieldView:SC.InlineTextFieldView,editorDelegate:null,fontWeight:SC.REGULAR_WEIGHT,escapeHTML:true,escapeHTMLBindingDefault:SC.Binding.oneWay().bool(),localize:false,localizeBindingDefault:SC.Binding.oneWay().bool(),formatter:null,value:"",hint:null,icon:null,textAlign:SC.ALIGN_LEFT,renderDelegateName:"labelRenderDelegate",displayTitle:function(){var g,e;
g=this.get("value");e=this.getDelegateProperty("formatter",this.displayDelegate);
if(e){var f=(SC.typeOf(e)===SC.T_FUNCTION)?e(g,this):e.fieldValueForObject(g,this);
if(!SC.none(f)){g=f}}if(SC.typeOf(g)===SC.T_ARRAY){var d=[];for(var b=0,c=g.get("length");
b<c;b++){var a=g.objectAt(b);if(!SC.none(a)&&a.toString){a=a.toString()}d.push(a)
}g=d.join(",")}if(!SC.none(g)&&g.toString){g=g.toString()}if(g&&this.getDelegateProperty("localize",this.displayDelegate)){g=g.loc()
}return g}.property("value","localize","formatter").cacheable(),hintValue:function(){var a=this.get("hint");
return a}.property("hint").cacheable(),doubleClick:function(a){return this.beginEditing()
},inlineEditorDidBeginEditing:function(b){var a=this.$();this._oldOpacity=a.css("opacity");
a.css("opacity",0)},inlineEditorDidBeginEditing:function(a){this._oldOpacity=this.get("layout").opacity;
this.adjust("opacity",0)},inlineEditorDidEndEditing:function(a,b){this.setIfChanged("value",b);
this.adjust("opacity",this._oldOpacity);this._oldOpacity=null;this.set("isEditing",NO)
}});if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/foundation")
};