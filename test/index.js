var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

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
    <html>
        <head class="node">
            <title></title>
        </head>

        <body>
            <div id="id1">xxxxxxxxxxxxxxxxxx</div>
            <script type="text/javascript">console.log('ok')</script>
            <p class="node"></p>
            <div class="node"></div>
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

    it('should return correct attribute', function() {
        var div = document.createElement('div');

        div.innerHTML = '<p id="2">xxx</p>';


        assert.equal('2', div.childNodes[0].id);
    });
  });

  describe('setAttribute', function() {
    it('should return correct attribute', function() {
        var div = document.createElement('div');

        div.setAttribute('style', 'background-color: red;');


        assert.equal('background-color: red;', div.getAttribute('style'));
    });
  });


  describe('removeAttribute', function() {
    it('should return correct attribute', function() {
        var div = document.createElement('div');

        div.setAttribute('style', 'background-color: red;');
        div.removeAttribute('style');

        var attr = div.getAttribute('style');

        expect(attr).to.be.null;
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
        expect(el).to.exist;

        expect(el).to.have.deep.property('id', 'id1');

    });
  });


 describe('getElementsByClassName', function() {
    it('should return correct elements', function() {
        var result = document.getElementsByClassName('node');
        expect(result).to.exist;

        assert.equal(3, result.length);

    });
  });


  describe('getElementsByTagName', function() {
    it('should return correct elements', function() {
        var div = document.createElement('div');

        div.innerHTML = `
            <div>
                <p id='1'></p>
                <p id='2'></p>
            </div>
        `;
        var result = div.getElementsByTagName('p');
        expect(result).to.exist;

        assert.equal(2, result.length);

    });
  });

  describe('removeChild', function() {
    it('should return correct elements', function() {
        var div = document.createElement('div');

        div.innerHTML = `<p id='1'></p><p id='2'></p>`;

        var child = div.childNodes[0];

        child.parentNode.removeChild(child);

        assert.notEqual(child, div[0]);

        expect(child.parentNode).to.be.null;
    });
  });

  describe('contains', function() {

    it('should return correct elements', function() {
        var div = document.createElement('div');

        div.innerHTML = `
            <div>
                <p id='1'></p>
                <p id='2'></p>
            </div>

            <p id="f1"></p>
        `;

        assert.equal(true, div.contains(div));

        assert.equal(true, div.contains(div.getElementsByTagName('p')[0]));
        assert.equal(false, div.getElementsByTagName('p')[2].contains(div));


    });
  });

  describe('blur & unblur', function() {

    it('should exists and show message', function() {
        expect(document.blur).to.be.empty;
        expect(document.unblur).to.be.empty;
        expect(document.body.blur).to.be.exist;
        expect(document.body.unblur).to.be.exist;

        assert.equal('function', typeof document.body.blur);
        assert.equal('function', typeof document.body.unblur);
    });
  
  });


  describe('set text and safe output', function() {

    it('should return escaped text', function() {
        var text = document.createTextNode();

        text.nodeValue = '<h1>ok</h1>';

        var div = document.createElement('div');

        div.appendChild(text);

        assert.equal('<h1>ok</h1>',  text.nodeValue);
        assert.equal('&lt;h1&gt;ok&lt;/h1&gt;',  div.innerHTML);

        /*
        var t = '<h1><sdf</h1>';

        div.innerHTML = t;
        console.log(div.innerHTML);

        assert.equal('<h1>&lt;</h1>',  div.innerHTML);
        */
    });


    it('should not return escaped text', function() {
        var script= document.createElement('script');

        var text = "<>";
        var textNode = document.createTextNode();

        textNode.nodeValue = text;


        script.appendChild(textNode);

        assert.equal(text,  script.innerHTML);
    });
  
  
  });
});

