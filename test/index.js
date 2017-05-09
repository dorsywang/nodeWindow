var assert = require('assert');

var NodeWindow = require("./../src/nodeWindow");
var nodeWindow  = new NodeWindow();
var window = nodeWindow.runHTML(`
    <html>>
        <head>
            <title></title>
        </head>

        <body>
            <div>xxxxxxxxxxxxxxxxxx</div>
            <script type="text/javascript">console.log('ok')</script>
        </body>
    </html>
`, {}, {});

var document = window.document;

describe('Element', function() {
  
  describe('innerHTML', function() {
    it('should return correct html with attributes', function() {
        var div = document.createElement('div');
        var html = '<img src="http://www.qq.com" /><div data-click="</div">test</div>';
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

        assert.equal('div', div.tagName);
    });
  });

 describe('outerHTML', function() {
    it('should return correct outerHTML', function() {
        var div = document.createElement('div');

        div.innerHTML = '<img /><div class="div"></div>';


        assert.equal('<div><img /><div class="div"></div></div>', div.outerHTML);
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
});

