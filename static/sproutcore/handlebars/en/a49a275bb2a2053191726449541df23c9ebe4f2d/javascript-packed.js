var handlebars=(function(){var f={trace:function c(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,statements:6,simpleInverse:7,statement:8,openInverse:9,closeBlock:10,openBlock:11,mustache:12,partial:13,CONTENT:14,COMMENT:15,OPEN_BLOCK:16,inMustache:17,CLOSE:18,OPEN_INVERSE:19,OPEN_ENDBLOCK:20,path:21,OPEN:22,OPEN_UNESCAPED:23,OPEN_PARTIAL:24,params:25,param:26,STRING:27,pathSegments:28,SEP:29,ID:30,"$accept":0,"$end":1},terminals_:{2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"OPEN_PARTIAL",27:"STRING",29:"SEP",30:"ID"},productions_:[0,[3,2],[4,3],[4,1],[4,0],[6,1],[6,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,3],[13,4],[7,2],[17,2],[17,1],[25,2],[25,1],[26,1],[26,1],[21,1],[28,3],[28,1]],performAction:function b(g,j,k,n,m,i,l){var h=i.length-1;
switch(m){case 1:return i[h-1];break;case 2:this.$=new n.ProgramNode(i[h-2],i[h]);
break;case 3:this.$=new n.ProgramNode(i[h]);break;case 4:this.$=new n.ProgramNode([]);
break;case 5:this.$=[i[h]];break;case 6:i[h-1].push(i[h]);this.$=i[h-1];break;case 7:this.$=new n.InverseNode(i[h-2],i[h-1],i[h]);
break;case 8:this.$=new n.BlockNode(i[h-2],i[h-1],i[h]);break;case 9:this.$=i[h];
break;case 10:this.$=i[h];break;case 11:this.$=new n.ContentNode(i[h]);break;case 12:this.$=new n.CommentNode(i[h]);
break;case 13:this.$=new n.MustacheNode(i[h-1]);break;case 14:this.$=new n.MustacheNode(i[h-1]);
break;case 15:this.$=i[h-1];break;case 16:this.$=new n.MustacheNode(i[h-1]);break;
case 17:this.$=new n.MustacheNode(i[h-1],true);break;case 18:this.$=new n.PartialNode(i[h-1]);
break;case 19:this.$=new n.PartialNode(i[h-2],i[h-1]);break;case 20:break;case 21:this.$=[i[h-1]].concat(i[h]);
break;case 22:this.$=[i[h]];break;case 23:i[h-1].push(i[h]);this.$=i[h-1];break;case 24:this.$=[i[h]];
break;case 25:this.$=i[h];break;case 26:this.$=new n.StringNode(i[h]);break;case 27:this.$=new n.IdNode(i[h]);
break;case 28:i[h-2].push(i[h]);this.$=i[h-2];break;case 29:this.$=[i[h]];break}},table:[{3:1,4:2,5:[2,4],6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],24:[1,15]},{1:[3]},{5:[1,16]},{5:[2,3],7:17,8:18,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,19],20:[2,3],22:[1,13],23:[1,14],24:[1,15]},{5:[2,5],14:[2,5],15:[2,5],16:[2,5],19:[2,5],20:[2,5],22:[2,5],23:[2,5],24:[2,5]},{4:20,6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],24:[1,15]},{4:21,6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],24:[1,15]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],24:[2,9]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],24:[2,10]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],24:[2,11]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],24:[2,12]},{17:22,21:23,28:24,30:[1,25]},{17:26,21:23,28:24,30:[1,25]},{17:27,21:23,28:24,30:[1,25]},{17:28,21:23,28:24,30:[1,25]},{21:29,28:24,30:[1,25]},{1:[2,1]},{6:30,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],24:[1,15]},{5:[2,6],14:[2,6],15:[2,6],16:[2,6],19:[2,6],20:[2,6],22:[2,6],23:[2,6],24:[2,6]},{17:22,18:[1,31],21:23,28:24,30:[1,25]},{10:32,20:[1,33]},{10:34,20:[1,33]},{18:[1,35]},{18:[2,22],21:38,25:36,26:37,27:[1,39],28:24,30:[1,25]},{18:[2,27],27:[2,27],29:[1,40],30:[2,27]},{18:[2,29],27:[2,29],29:[2,29],30:[2,29]},{18:[1,41]},{18:[1,42]},{18:[1,43]},{18:[1,44],21:45,28:24,30:[1,25]},{5:[2,2],8:18,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,2],22:[1,13],23:[1,14],24:[1,15]},{14:[2,20],15:[2,20],16:[2,20],19:[2,20],22:[2,20],23:[2,20],24:[2,20]},{5:[2,7],14:[2,7],15:[2,7],16:[2,7],19:[2,7],20:[2,7],22:[2,7],23:[2,7],24:[2,7]},{21:46,28:24,30:[1,25]},{5:[2,8],14:[2,8],15:[2,8],16:[2,8],19:[2,8],20:[2,8],22:[2,8],23:[2,8],24:[2,8]},{14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],24:[2,14]},{18:[2,21],21:38,26:47,27:[1,39],28:24,30:[1,25]},{18:[2,24],27:[2,24],30:[2,24]},{18:[2,25],27:[2,25],30:[2,25]},{18:[2,26],27:[2,26],30:[2,26]},{30:[1,48]},{14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],24:[2,13]},{5:[2,16],14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],24:[2,16]},{5:[2,17],14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],24:[2,17]},{5:[2,18],14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],24:[2,18]},{18:[1,49]},{18:[1,50]},{18:[2,23],27:[2,23],30:[2,23]},{18:[2,28],27:[2,28],29:[2,28],30:[2,28]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],24:[2,19]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],24:[2,15]}],defaultActions:{16:[2,1]},parseError:function d(h,g){throw new Error(h)
},parse:function e(o){var x=this,l=[0],G=[null],s=[],H=this.table,h="",q=0,E=0,j=0,n=2,u=1;
this.lexer.setInput(o);this.lexer.yy=this.yy;this.yy.lexer=this.lexer;var i=this.lexer.yylloc;
s.push(i);if(typeof this.yy.parseError==="function"){this.parseError=this.yy.parseError
}function w(p){l.length=l.length-2*p;G.length=G.length-p;s.length=s.length-p}function v(){var p;
p=x.lexer.lex()||1;if(typeof p!=="number"){p=x.symbols_[p]||p}return p}var D,z,k,C,I,t,B={},y,F,g,m;
while(true){k=l[l.length-1];if(this.defaultActions[k]){C=this.defaultActions[k]}else{if(D==null){D=v()
}C=H[k]&&H[k][D]}if(typeof C==="undefined"||!C.length||!C[0]){if(!j){m=[];for(y in H[k]){if(this.terminals_[y]&&y>2){m.push("'"+this.terminals_[y]+"'")
}}var A="";if(this.lexer.showPosition){A="Parse error on line "+(q+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+m.join(", ")
}else{A="Parse error on line "+(q+1)+": Unexpected "+(D==1?"end of input":("'"+(this.terminals_[D]||D)+"'"))
}this.parseError(A,{text:this.lexer.match,token:this.terminals_[D]||D,line:this.lexer.yylineno,loc:i,expected:m})
}if(j==3){if(D==u){throw new Error(A||"Parsing halted.")}E=this.lexer.yyleng;h=this.lexer.yytext;
q=this.lexer.yylineno;i=this.lexer.yylloc;D=v()}while(1){if((n.toString()) in H[k]){break
}if(k==0){throw new Error(A||"Parsing halted.")}w(1);k=l[l.length-1]}z=D;D=n;k=l[l.length-1];
C=H[k]&&H[k][n];j=3}if(C[0] instanceof Array&&C.length>1){throw new Error("Parse Error: multiple actions possible at state: "+k+", token: "+D)
}switch(C[0]){case 1:l.push(D);G.push(this.lexer.yytext);s.push(this.lexer.yylloc);
l.push(C[1]);D=null;if(!z){E=this.lexer.yyleng;h=this.lexer.yytext;q=this.lexer.yylineno;
i=this.lexer.yylloc;if(j>0){j--}}else{D=z;z=null}break;case 2:F=this.productions_[C[1]][1];
B.$=G[G.length-F];B._$={first_line:s[s.length-(F||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(F||1)].first_column,last_column:s[s.length-1].last_column,};
t=this.performAction.call(B,h,E,q,this.yy,C[1],G,s);if(typeof t!=="undefined"){return t
}if(F){l=l.slice(0,-1*F*2);G=G.slice(0,-1*F);s=s.slice(0,-1*F)}l.push(this.productions_[C[1]][0]);
G.push(B.$);s.push(B._$);g=H[l[l.length-2]][l[l.length-1]];l.push(g);break;case 3:return true
}}return true}};var a=(function(){var j=({EOF:1,parseError:function l(o,n){if(this.yy.parseError){this.yy.parseError(o,n)
}else{throw new Error(o)}},setInput:function(n){this._input=n;this._more=this._less=this.done=false;
this.yylineno=this.yyleng=0;this.yytext=this.matched=this.match="";this.conditionStack=["INITIAL"];
this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0};return this},input:function(){var o=this._input[0];
this.yytext+=o;this.yyleng++;this.match+=o;this.matched+=o;var n=o.match(/\n/);if(n){this.yylineno++
}this._input=this._input.slice(1);return o},unput:function(n){this._input=n+this._input;
return this},more:function(){this._more=true;return this},pastInput:function(){var n=this.matched.substr(0,this.matched.length-this.match.length);
return(n.length>20?"...":"")+n.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var n=this.match;
if(n.length<20){n+=this._input.substr(0,20-n.length)}return(n.substr(0,20)+(n.length>20?"...":"")).replace(/\n/g,"")
},showPosition:function(){var n=this.pastInput();var o=new Array(n.length+1).join("-");
return n+this.upcomingInput()+"\n"+o+"^"},next:function(){if(this.done){return this.EOF
}if(!this._input){this.done=true}var r,p,o,n;if(!this._more){this.yytext="";this.match=""
}var s=this._currentRules();for(var q=0;q<s.length;q++){p=this._input.match(this.rules[s[q]]);
if(p){n=p[0].match(/\n.*/g);if(n){this.yylineno+=n.length}this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:n?n[n.length-1].length-1:this.yylloc.last_column+p.length};
this.yytext+=p[0];this.match+=p[0];this.matches=p;this.yyleng=this.yytext.length;
this._more=false;this._input=this._input.slice(p[0].length);this.matched+=p[0];r=this.performAction.call(this,this.yy,this,s[q],this.conditionStack[this.conditionStack.length-1]);
if(r){return r}else{return}}}if(this._input===""){return this.EOF}else{this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})
}},lex:function g(){var n=this.next();if(typeof n!=="undefined"){return n}else{return this.lex()
}},begin:function h(n){this.conditionStack.push(n)},popState:function m(){return this.conditionStack.pop()
},_currentRules:function k(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules
}});j.performAction=function i(r,o,q,n){var p=n;switch(q){case 0:this.begin("mu");
if(o.yytext){return 14}break;case 1:return 14;break;case 2:return 24;break;case 3:return 16;
break;case 4:return 20;break;case 5:return 19;break;case 6:return 19;break;case 7:return 23;
break;case 8:return 23;break;case 9:o.yytext=o.yytext.substr(3,o.yyleng-5);this.begin("INITIAL");
return 15;break;case 10:return 22;break;case 11:return 29;break;case 12:break;case 13:this.begin("INITIAL");
return 18;break;case 14:this.begin("INITIAL");return 18;break;case 15:o.yytext=o.yytext.substr(1,o.yyleng-2).replace(/\\"/g,'"');
return 27;break;case 16:return 30;break;case 17:return"INVALID";break;case 18:return 5;
break}};j.rules=[/^[^\x00]*?(?=(\{\{))/,/^[^\x00]+/,/^\{\{>/,/^\{\{#/,/^\{\{\//,/^\{\{\^/,/^\{\{\s*else\b/,/^\{\{\{/,/^\{\{&/,/^\{\{!.*?\}\}/,/^\{\{/,/^\//,/^\s+/,/^\}\}\}/,/^\}\}/,/^"(\\["]|[^"])*"/,/^[a-zA-Z0-9_.]+(?=[} /])/,/^./,/^$/];
j.conditions={mu:{rules:[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],inclusive:false},INITIAL:{rules:[0,1,18],inclusive:true}};
return j})();f.lexer=a;return f})();var Handlebars={};Handlebars.Parser=handlebars;
Handlebars.parse=function(a){Handlebars.Parser.yy=Handlebars.AST;return Handlebars.Parser.parse(a)
};Handlebars.print=function(a){return new Handlebars.PrintVisitor().accept(a)};Handlebars.Runtime={};
Handlebars.Runtime.compile=function(b){var a=Handlebars.parse(b);return function(d,f,c){f=f||Handlebars.helpers;
c=c||Handlebars.partials;var g=new Handlebars.Context(d,f,c);var e=new Handlebars.Runtime(g);
e.accept(a);return e.buffer}};Handlebars.helpers={};Handlebars.partials={};Handlebars.registerHelper=function(b,c,a){if(a){c.not=a
}this.helpers[b]=c};Handlebars.registerPartial=function(a,b){this.partials[a]=b};
Handlebars.registerHelper("blockHelperMissing",function(e,g,a){a=a||function(){};
var c="";var f=Object.prototype.toString.call(e);if(f==="[object Function]"){e=e()
}if(e===true){return g(this)}else{if(e===false||e==null){return a(this)}else{if(f==="[object Array]"){if(e.length>0){for(var d=0,b=e.length;
d<b;d++){c=c+g(e[d])}}else{c=a(this)}return c}else{return g(e)}}}},function(a,b){return b(a)
});Handlebars.registerHelper("each",function(e,f,a){var c="";if(e&&e.length>0){for(var d=0,b=e.length;
d<b;d++){c=c+f(e[d])}}else{c=a(this)}return c});Handlebars.registerHelper("if",function(b,c,a){if(!b||b==[]){return a(this)
}else{return c(this)}});Handlebars.registerHelper("unless",function(b,c,a){Handlebars.helpers["if"].call(this,b,a,c)
});Handlebars.registerHelper("with",function(a,b){return b(a)});Handlebars.logger={DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(b,a){}};
Handlebars.log=function(b,a){Handlebars.logger.log(b,a)};(function(){Handlebars.AST={};
Handlebars.AST.ProgramNode=function(c,b){this.type="program";this.statements=c;if(b){this.inverse=new Handlebars.AST.ProgramNode(b)
}};Handlebars.AST.MustacheNode=function(c,b){this.type="mustache";this.id=c[0];this.params=c.slice(1);
this.escaped=!b};Handlebars.AST.PartialNode=function(c,b){this.type="partial";this.id=c;
this.context=b};var a=function(b,c){if(b.original!==c.original){throw new Handlebars.Exception(b.original+" doesn't match "+c.original)
}};Handlebars.AST.BlockNode=function(c,b,d){a(c.id,d);this.type="block";this.mustache=c;
this.program=b};Handlebars.AST.InverseNode=function(c,b,d){a(c.id,d);this.type="inverse";
this.mustache=c;this.program=b};Handlebars.AST.ContentNode=function(b){this.type="content";
this.string=b};Handlebars.AST.IdNode=function(f){this.type="ID";this.original=f.join("/");
var d=[],g=0;for(var e=0,b=f.length;e<b;e++){var c=f[e];if(c===".."){g++}else{if(c==="."||c==="this"){continue
}else{d.push(c)}}}this.parts=d;this.depth=g;this.isSimple=(d.length===1)&&(g===0)
};Handlebars.AST.StringNode=function(b){this.type="STRING";this.string=b};Handlebars.AST.CommentNode=function(b){this.type="comment";
this.comment=b}})();Handlebars.Visitor=function(){};Handlebars.Visitor.prototype={accept:function(a){return this[a.type](a)
}};Handlebars.Exception=function(a){this.message=a};Handlebars.SafeString=function(a){this.string=a
};Handlebars.SafeString.prototype.toString=function(){return this.string.toString()
};(function(){var c={"<":"&lt;",">":"&gt;"};var d=/&(?!\w+;)|[<>]/g;var b=/[&<>]/;
var a=function(e){return c[e]||"&amp;"};Handlebars.Utils={escapeExpression:function(e){if(e instanceof Handlebars.SafeString){return e.toString()
}else{if(e==null||e===false){return""}}if(!b.test(e)){return e}return e.replace(d,a)
},isEmpty:function(e){if(typeof e==="undefined"){return true}else{if(e===null){return true
}else{if(e===false){return true}else{if(Object.prototype.toString.call(e)==="[object Array]"&&e.length===0){return true
}else{return false}}}}}}})();Handlebars.Compiler=function(){};Handlebars.JavaScriptCompiler=function(){};
(function(e,d){e.OPCODE_MAP={appendContent:1,getContext:2,lookupWithHelpers:3,lookup:4,append:5,invokeMustache:6,appendEscaped:7,pushString:8,truthyOrFallback:9,functionOrFallback:10,invokeProgram:11,invokePartial:12,push:13,invokeInverse:14};
e.MULTI_PARAM_OPCODES={appendContent:1,getContext:1,lookupWithHelpers:1,lookup:1,invokeMustache:2,pushString:1,truthyOrFallback:1,functionOrFallback:1,invokeProgram:2,invokePartial:1,push:1,invokeInverse:1};
e.DISASSEMBLE_MAP={};for(var g in e.OPCODE_MAP){var f=e.OPCODE_MAP[g];e.DISASSEMBLE_MAP[f]=g
}e.multiParamSize=function(h){return e.MULTI_PARAM_OPCODES[e.DISASSEMBLE_MAP[h]]};
e.prototype={disassemble:function(){var s=this.opcodes,q,m;var p=[],u,k,v;for(var r=0,n=s.length;
r<n;r++){q=s[r];if(q==="DECLARE"){k=s[++r];v=s[++r];p.push("DECLARE "+k+" = "+v)}else{u=e.DISASSEMBLE_MAP[q];
var t=e.multiParamSize(q);var h=[];for(var o=0;o<t;o++){m=s[++r];if(typeof m==="string"){m='"'+m.replace("\n","\\n")+'"'
}h.push(m)}u=u+" "+h.join(" ");p.push(u)}}return p.join("\n")},guid:0,compile:function(h){this.children=[];
this.depths={list:[]};return this.program(h)},accept:function(h){return this[h.type](h)
},program:function(k){var j=k.statements,n;this.opcodes=[];for(var m=0,h=j.length;
m<h;m++){n=j[m];this[n.type](n)}this.depths.list=this.depths.list.sort(function(l,i){return l-i
});return this},compileProgram:function(k){var h=new e().compile(k);var m=this.guid++;
this.usePartial=this.usePartial||h.usePartial;this.children[m]=h;for(var n=0,j=h.depths.list.length;
n<j;n++){depth=h.depths.list[n];if(depth<2){continue}else{this.addDepth(depth-1)}}return m
},block:function(n){var k=n.mustache;var m=k.params,l,o,i,j;this.pushParams(m);this.ID(k.id);
var h=this.compileProgram(n.program);if(n.program.inverse){j=this.compileProgram(n.program.inverse)
}if(n.program.inverse){this.declare("inverse",j)}this.opcode("invokeProgram",h,m.length);
this.declare("inverse",null);this.opcode("append")},inverse:function(i){this.ID(i.mustache.id);
var h=this.compileProgram(i.program);this.opcode("invokeInverse",h);this.opcode("append")
},partial:function(h){var i=h.id;this.usePartial=true;if(h.context){this.ID(h.context)
}else{this.opcode("push","context")}this.opcode("invokePartial",i.original);this.opcode("append")
},content:function(h){this.opcode("appendContent",h.string)},mustache:function(h){var i=h.params;
this.pushParams(i);this.ID(h.id);this.opcode("invokeMustache",i.length,h.id.original);
if(h.escaped){this.opcode("appendEscaped")}else{this.opcode("append")}},ID:function(k){this.addDepth(k.depth);
this.opcode("getContext",k.depth);this.opcode("lookupWithHelpers",k.parts[0]||null);
for(var j=1,h=k.parts.length;j<h;j++){this.opcode("lookup",k.parts[j])}},STRING:function(h){this.opcode("pushString",h.string)
},comment:function(){},pushParams:function(k){var h=k.length,j;while(h--){j=k[h];
this[j.type](j)}},opcode:function(h,j,i){this.opcodes.push(e.OPCODE_MAP[h]);if(j!==undefined){this.opcodes.push(j)
}if(i!==undefined){this.opcodes.push(i)}},declare:function(h,i){this.opcodes.push("DECLARE");
this.opcodes.push(h);this.opcodes.push(i)},addDepth:function(h){if(h===0){return}if(!this.depths[h]){this.depths[h]=true;
this.depths.list.push(h)}}};d.prototype={nameLookup:function(j,h,i){if(d.RESERVED_WORDS[h]){return j+"['"+h+"']"
}else{return j+"."+h}},appendToBuffer:function(h){return"buffer = buffer + "+h+";"
},initializeBuffer:function(){return this.quotedString("")},compile:function(i,k){this.environment=i;
this.data=k;this.preamble();this.stackSlot=0;this.stackVars=[];this.registers={list:[]};
this.compileChildren(i,k);Handlebars.log(Handlebars.logger.DEBUG,i.disassemble()+"\n\n");
var m=i.opcodes,l,j,n,h;this.i=0;for(b=m.length;this.i<b;this.i++){l=this.nextOpcode(0);
if(l[0]==="DECLARE"){this.i=this.i+2;this[l[1]]=l[2]}else{this.i=this.i+l[1].length;
this[l[0]].apply(this,l[1])}}return this.createFunction()},nextOpcode:function(q){var m=this.environment.opcodes,l=m[this.i+q],k,o;
var p,h;if(l==="DECLARE"){k=m[this.i+1];o=m[this.i+2];return["DECLARE",k,o]}else{k=e.DISASSEMBLE_MAP[l];
p=e.multiParamSize(l);h=[];for(var i=0;i<p;i++){h.push(m[this.i+i+1+q])}return[k,h]
}},eat:function(h){this.i=this.i+h.length},preamble:function(){var h=[];h.push("var buffer = "+this.initializeBuffer()+", currentContext = context");
var i="helpers = helpers || Handlebars.helpers;";if(this.environment.usePartial){i=i+" partials = partials || Handlebars.partials;"
}h.push(i);this.lastContext=0;this.source=h},createFunction:function(){var j={escapeExpression:Handlebars.Utils.escapeExpression,invokePartial:Handlebars.VM.invokePartial,programs:[],program:function(q,r,p,s){var l=this.programs[q];
if(s){return Handlebars.VM.program(this.children[q],r,p,s)}else{if(l){return l}else{l=this.programs[q]=Handlebars.VM.program(this.children[q],r,p);
return l}}},programWithDepth:Handlebars.VM.programWithDepth,noop:Handlebars.VM.noop};
var n=this.stackVars.concat(this.registers.list);if(n.length>0){this.source[0]=this.source[0]+", "+n.join(", ")
}this.source[0]=this.source[0]+";";this.source.push("return buffer;");var o=["Handlebars","context","helpers","partials"];
if(this.data){o.push("data")}for(var k=0,h=this.environment.depths.list.length;k<h;
k++){o.push("depth"+this.environment.depths.list[k])}if(o.length===4&&!this.environment.usePartial){o.pop()
}o.push(this.source.join("\n"));var m=Function.apply(this,o);m.displayName="Handlebars.js";
Handlebars.log(Handlebars.logger.DEBUG,m.toString()+"\n\n");j.render=m;j.children=this.environment.children;
return function(p,r,l,s,q){try{var i=Array.prototype.slice.call(arguments);i.unshift(Handlebars);
return j.render.apply(j,i)}catch(t){throw t}}},appendContent:function(h){this.source.push(this.appendToBuffer(this.quotedString(h)))
},append:function(){var h=this.popStack();this.source.push("if("+h+" || "+h+" === 0) { "+this.appendToBuffer(h)+" }")
},appendEscaped:function(){var i=this.nextOpcode(1),h="";if(i[0]==="appendContent"){h=" + "+this.quotedString(i[1][0]);
this.eat(i)}this.source.push(this.appendToBuffer("this.escapeExpression("+this.popStack()+")"+h))
},getContext:function(h){if(this.lastContext!==h){this.lastContext=h;if(h===0){this.source.push("currentContext = context;")
}else{this.source.push("currentContext = depth"+h+";")}}},lookupWithHelpers:function(j){if(j){var h=this.nextStack();
var i="if('"+j+"' in helpers) { "+h+" = "+this.nameLookup("helpers",j,"helper")+"; } else { "+h+" = "+this.nameLookup("currentContext",j,"context")+"; }";
this.source.push(i)}else{this.pushStack("currentContext")}},lookup:function(i){var h=this.topStack();
this.source.push(h+" = "+this.nameLookup(h,i,"context")+";")},pushString:function(h){this.pushStack(this.quotedString(h))
},push:function(h){this.pushStack(h)},invokeMustache:function(o,j){var n=["context"],l,p;
l=this.popStack();for(var h=0;h<o;h++){n.push(this.popStack())}if(this.data){n.push("data")
}var m=n.join(", ");var k=["context"].concat(this.quotedString(j)).concat(n.slice(1));
p=this.nextStack();if(o===0){this.source.push("if(typeof "+l+" === 'function') { "+p+" = "+l+".call("+m+"); }")
}else{this.source.push("if(typeof "+l+" === 'function') { "+p+" = "+l+".call("+m+"); } else { "+p+" = helpers.helperMissing.call("+k+") }")
}},invokeProgram:function(q,m){var n=this.programExpression(this.inverse);var r=this.popStack();
var h=r;var l=["context"];var s=["context",h];for(var o=0;o<m;o++){var k=this.popStack();
l.push(k);s.push(k)}var j=this.programExpression(q);l.push(j,n);s.push(j,n);if(this.data){l.push("data");
s.push("data")}var p=this.nextStack();this.source.push("if(typeof "+h+" === 'function') { "+p+" = "+h+".call("+l.join(", ")+"); }");
this.source.push("else { "+p+" = helpers.blockHelperMissing.call("+s.join(", ")+"); }")
},invokeInverse:function(j){var h=this.programExpression(j);var i=["context",this.topStack(),"this.noop",h];
this.pushStack("helpers.blockHelperMissing.call("+i.join(", ")+")")},invokePartial:function(h){this.pushStack("this.invokePartial("+this.nameLookup("partials",h,"partial")+", '"+h+"', "+this.popStack()+", helpers, partials);")
},compiler:d,compileChildren:function(h,o){var m=h.children,q,n;var p=[];for(var k=0,j=m.length;
k<j;k++){q=m[k];n=new this.compiler();p[k]=n.compile(q,o)}h.rawChildren=m;h.children=p
},programExpression:function(j){if(j==null){return"this.noop"}var m=[j,"helpers","partials"];
var n=this.environment.rawChildren[j].depths.list;if(this.data){m.push("data")}for(var k=0,h=n.length;
k<h;k++){depth=n[k];if(depth===1){m.push("context")}else{m.push("depth"+(depth-1))
}}if(!this.environment.usePartial){if(m[3]){m[2]="null"}else{m.pop()}}if(n.length===0){return"this.program("+m.join(", ")+")"
}else{m[0]="this.children["+j+"]";return"this.programWithDepth("+m.join(", ")+")"
}},register:function(h,i){this.useRegister(h);this.source.push(h+" = "+i+";")},useRegister:function(h){if(!this.registers[h]){this.registers[h]=true;
this.registers.list.push(h)}},pushStack:function(h){this.source.push(this.nextStack()+" = "+h+";");
return"stack"+this.stackSlot},nextStack:function(){this.stackSlot++;if(this.stackSlot>this.stackVars.length){this.stackVars.push("stack"+this.stackSlot)
}return"stack"+this.stackSlot},popStack:function(){return"stack"+this.stackSlot--
},topStack:function(){return"stack"+this.stackSlot},quotedString:function(h){return'"'+h.replace(/\\/,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r")+'"'
}};var a=("break case catch continue default delete do else finally for function if in instanceof new return switch this throw try typeof var void while with null true false").split(" ");
compilerWords=d.RESERVED_WORDS={};for(var c=0,b=a.length;c<b;c++){compilerWords[a[c]]=true
}})(Handlebars.Compiler,Handlebars.JavaScriptCompiler);Handlebars.VM={programWithDepth:function(b){var a=Array.prototype.slice.call(arguments,1);
return function(d,e,c,f){a[0]=e||a[0];a[1]=c||a[1];a[2]=f||a[2];return b.apply(this,[d].concat(a))
}},program:function(b,c,a,d){return function(f,e,h,g){return b(f,e||c,h||a,g||d)}
},noop:function(){return""},compile:function(c,d){var b=Handlebars.parse(c);var a=new Handlebars.Compiler().compile(b);
return new Handlebars.JavaScriptCompiler().compile(a,d)},invokePartial:function(a,b,d,e,c){if(a===undefined){throw new Handlebars.Exception("The partial "+b+" could not be found")
}else{if(a instanceof Function){return a(d,e,c)}else{c[b]=Handlebars.VM.compile(a);
return c[b](d,e,c)}}}};Handlebars.compile=Handlebars.VM.compile;require("handlebars");
SC.Handlebars={};SC.Handlebars.JavaScriptCompiler=function(){};SC.Handlebars.JavaScriptCompiler.prototype=SC.beget(Handlebars.JavaScriptCompiler.prototype);
SC.Handlebars.JavaScriptCompiler.prototype.compiler=SC.Handlebars.JavaScriptCompiler;
SC.Handlebars.JavaScriptCompiler.prototype.nameLookup=function(c,a,b){if(b==="context"){return"SC.get("+c+", "+this.quotedString(a)+");"
}else{return Handlebars.JavaScriptCompiler.prototype.nameLookup.call(this,c,a,b)}};
SC.Handlebars.compile=function(c){var b=Handlebars.parse(c);var a=new Handlebars.Compiler().compile(b);
return new SC.Handlebars.JavaScriptCompiler().compile(a,true)};Handlebars.registerHelper("view",function(i,h,c,d){if(h.isRenderData){d=h;
h=null}var b;if(i.isClass||i.isObject){b=i;if(!b){throw"Null or undefined object was passed to the #view helper. Did you mean to pass a property path string?"
}}else{b=SC.objectForPropertyPath(i);if(!b){throw"Unable to find view at path '"+i+"'"
}}var f=d.view;var g=f.get("childViews");var e=f.createChildView(b);if(h){e.template=h
}g.pushObject(e);var a=SC.RenderContext(e.get("tagName"));e.applyAttributesToContext(a);
e.render(a,YES);return new Handlebars.SafeString(a.join())});Handlebars.registerHelper("bind",function(g,e,c,d){if(e.isRenderData){d=e;
e=null}var f=d.view;var b="handlebars-bound-"+jQuery.uuid++;var i=this.get(g);var h=this,a=SC.RenderContext("span").id(b);
this.addObserver(g,function(){var j=h.get(g);if(e&&(j!==null||j!==undefined)){var k=SC.RenderContext("span").id(b);
k.push(e(h.get(g)));var l=k.element();f.$("#"+b).replaceWith(l)}else{if(j!==null||j!==undefined){f.$("#"+b).html(Handlebars.Utils.escapeExpression(h.get(g)))
}else{f.$("#"+b).html("")}}});if(i!==null||i!==undefined){if(e){a.push(e(i))}else{a.push(Handlebars.Utils.escapeExpression(i))
}}return new Handlebars.SafeString(a.join())});Handlebars.registerHelper("collection",function(e,c,a,d){var b;
if(typeof e==="string"){b=SC.objectForPropertyPath(e)||SC.TemplateCollectionView}else{b=e
}if(c){if(b.isClass){b.prototype.itemViewTemplate=c;b.prototype.inverseTemplate=a
}else{b.itemViewTemplate=c;b.inverseTemplate=a}}return Handlebars.helpers.view.call(this,b,Handlebars.VM.noop,a,d)
});Handlebars.registerHelper("bindCollection",function(f,b,d,a,e){var c=SC.objectForPropertyPath(f)||SC.TemplateCollectionView;
var g=SC.Binding.from(b,this);if(!a){e=d;d=null}if(d){c.prototype.itemViewTemplate=d
}if(c.isClass){c=c.extend({contentBinding:g})}else{c.bindings.push(g.to("content",c))
}return Handlebars.helpers.collection.call(this,c,d,a,e)});if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/handlebars")
};