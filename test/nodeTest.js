var soda= require('./soda.js');

soda.filter("date", function(input, length){
    return "2d" + length;
});

soda.filter("filter1", function(input, show){
    // console.log(input, show);
    return input + show;
});
var data = {
  a: 1,
   list: [
         {list: [{'title': '<>aa</h1>'}, {'title': 'bb'}], name: 0, show: 1},
         {list: [{'title': 0 }, {'title': 'bb'}], name: 'b'},
         {list: [{'title': 'aa'}, {'title': 'bb'}], name: 'b'},
         {list: [{'title': 'aa'}, {'title': 'bb'}], name: 'b'},
         {list: [{'title': 'aa'}, {'title': 'bb'}], name: 'b'},
         {list: [{'title': 'aa'}, {'title': 'bb'}], name: 'b'},
         {list: [{'title': 'aa'}, {'title': 'bb'}], name: 'c'}
   ],

     style: {
       width: 100,
        height: 100,
        opacity: 0.4
     },

     b: '<div><a href=pp>{{s|sdfsdf{{adfdsf}}</a></div>',
       mm: null,

       trackObject: {
         a: 1,
         b: '2'
       }
};

data.style['background-color'] = 'red';

var result = soda(`
<!--test comment<div></div>-->
<!--[if IE 8]> 
<link type="text/css" rel="stylesheet" href="my.css" />   
<![endif]-->

<div>
<!--
<p>safasdf</p>
-->
<!--
<div>sdafasdf</div>
-->
</div>

<div soda-pic='{{2}}%'></div>
{{style['background-color']}}                         <span class="result">=> red </span><br />
{{list[0].show}}                                      <span class="result">=> 1 </span><br />
{{list[0]}}                                            <span class="result">=> [object object] </span><br />
<span soda-repeat="item in mm"></span>
{{2}}{{3}}                                                <span class="result">=> 23 </span><br />
<span soda-if="2">显示</span>                          <span class="result">=> 显示 </span><br />
<span soda-if="0">不显示</span>                        <span class="result">=> </span><br />
<span soda-if="true">true显示</span>                     <span class="result">=> true显示 </span><br />
<span soda-if="false">false显示</span>                   <span class="result">=> </span><br />

{{a.p || a}} <span class="result">=> 1</span><br />
{{0}}   <span class="result">=> 0</span><br />
{{'aa' + 1}} <span class="result">=> aa1</span><br />
<img soda-src="pp{{'aa'}}.img" soda-if='1' />                 <span class="result">=> 裂图</span><br />
<div soda-repeat="item in list" data-id="{{item.name}}" id="sd{{p}}">
{{item.show |   date:'2'}}
{{item.show |        filter1:$index}}
  <div soda-bind-html="'b{{fsadf}}' + 0">
    <div>sadf</div>
  </div>
  <img soda-src="pp{{'aa2'}}.img" soda-if='0' />
</div>


<div class="{{a+1}}" soda-if="a" soda-class="!a ? 'active' : 'p'">{{a}}</div>
{{list[0]['name']}}
<div id="pp" soda-style="style" style="opacity: 1;"></div>

<span soda-repeat="item in list by $mm">
{{$mm}}
</span>
<span class="result">=> 0 1 ... 6</span><br />


<span soda-repeat="item in list by $ff">
{{$ff + 1}}
</span>
<span class="result">=> 1 ... 7</span><br />

{{list[list[0].show === 1 ? list[0].name : 1].list[0].title}}   <span class="result">=> <>aa&lt;/h1></span><br />


<span soda-repeat="(key, value) in trackObject">{{key}}:{{value}}</span>  <span class="result">=> a:1 b:2</span><br />

<div soda-replace="'<b>bold</b><i>italic</i>'">b</div> <span class="result">=> <b>bold</b><i>italic</i></span><br />
`, data);

console.log(result);
