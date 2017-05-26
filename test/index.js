var assert = require('assert');
var chai = require('chai');

if(typeof describe === 'undefined'){
    describe =  function(name, func){
        console.log(name);

        func && func();
    };

    it = function(name, func){
        console.log(name);
        func && func();
    };
}

var ParseDom = require("./../src/parseDom");

var NodeWindow = require("./../src/nodeWindow");
var nodeWindow  = new NodeWindow();
var window = nodeWindow.runHTML(`
    <html>>
        <head>
            <title></title>
        </head>

        <body>
            <div id="id1">xxxxxxxxxxxxxxxxxx</div>
            <script type="text/javascript">console.log('ok')</script>
        </body>
    </html>
`, {}, {});

var document = window.document;

describe('preParseDom', function(){
  describe('commentNode', function() {
    it('should return commentNode', function() {
        var htmlStr = "<!--sadfasdfasdfasdfsadfas<div>--><div>sadfsadf</div>";

        var parseDom = new ParseDom();
        var nodes = parseDom.preParse(htmlStr);

         assert.equal('commentTag', nodes[0].tagType);
    });
  });

});

describe('Element', function() {
  
  describe('innerHTML', function() {
    it('should return correct html with attributes', function() {
        var div = document.createElement('div');
        var html = '<img src="http://www.qq.com" /><div data-click="</div">test</div>';
        div.innerHTML = html;

        var innerHTML = div.innerHTML;
        assert.equal(html, innerHTML);
    });

    it('should return correct html', function() {
        var div = document.createElement('div');
        var html = '<div><!--<div>sdafasdf</div>--></div><div soda-pic="{{2}}%"></div>';
        div.innerHTML = html;

        var innerHTML = div.innerHTML;
        assert.equal(html, innerHTML);
    });
  });

  describe('classList', function() {
    it('should return class2 only', function() {
        var div = document.createElement('div');

        div.classList.add('class1');
        div.classList.add('class1');
        div.classList.add('class2');
        div.classList.remove('class1');

        assert.equal('<div class="class2"></div>', div.outerHTML);
    });
  });

  describe('className', function() {
    it('should return class2', function() {
        var div = document.createElement('div');

        div.className = 'class2';

        assert.equal('class2', div.className);
    });
  });

  describe('tagName', function() {
    it('should return correct tagName', function() {
        var div = document.createElement('div');

        assert.equal('DIV', div.tagName);
    });
  });

 describe('get outerHTML', function() {
    it('should return correct outerHTML', function() {
        var div = document.createElement('div');

        div.innerHTML = '<img /><div class="div"></div>';


        assert.equal('<div><img /><div class="div"></div></div>', div.outerHTML);
    });
  });

 describe('set outerHTML', function() {
    it('should return correct outerHTML', function() {
        var div = document.createElement('div');

        div.innerHTML = '<div><span>dsafdsf</span></div>';

        var child = div.childNodes[0];

        var outerHTML = '<p>aaaaa</p>';
        child.outerHTML = outerHTML;


        assert.equal(outerHTML, div.childNodes[0].outerHTML);
    });
  });

  describe('getAttribute', function() {
    it('should return correct attribute', function() {
        var div = document.createElement('div');

        div.innerHTML = '<p data-p="<div>">xxx</p>';


        assert.equal('<div>', div.childNodes[0].getAttribute('data-p'));
    });
  });

  describe('setAttribute', function() {
    it('should return correct attribute', function() {
        var div = document.createElement('div');

        div.setAttribute('style', 'background-color: red;');


        assert.equal('background-color: red;', div.getAttribute('style'));
    });
  });

 describe('getCommentNode', function() {
    it('should return correct node', function() {
        var div = document.createElement('div');

        div.innerHTML = "<!--sadf<div>sadfsadf--><p>dsafasdf</p>";

        var child = div.childNodes[0];
          assert.equal('#comment', child.nodeName);

    });

    it('should return comment html', function() {
        var div = document.createElement('div');

        var html = "<!--sadf<div>sadfsadf--><p>dsafasdf</p>";
        div.innerHTML  = html;

          assert.equal(html, div.innerHTML);

    });
  });

  describe('insertBefore', function() {
    it('should return correct element', function() {
        var div = document.createElement('div');

        div.innerHTML = "<p id='test'></p>";

        var div2 = document.createElement('div');

        div.insertBefore(div2, div.childNodes[0]);
        console.log(div.childNodes[0].tagName);
        assert.equal('DIV', div.childNodes[0].tagName);
        assert.equal('P', div.childNodes[1].tagName);


    });

   it('append: should return correct element', function() {
        var div = document.createElement('div');

        div.innerHTML = "<p id='test'></p>";

        var div2 = document.createElement('div');

        div.appendChild(div2);

        assert.equal('DIV', div.childNodes[1].tagName);




   });
  });

  describe('getElementById', function() {
    it('should return correct element with id', function() {
        var el = document.getElementById('id1');
        chai.expect(el).to.exist;

    });
  });
  
});

