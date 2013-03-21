// TODO: this should really be in more than one file

describe("shuriken", function() {

	describe("document", function() {

		describe("create", function() {

			it("can make simple, empty elements", function() {
				var div = document.create("<div>");
				var span = document.create("<span></span>");
				var a = document.create("<a>");
				expect(div).toEqual(jasmine.any(HTMLDivElement));
				expect(span).toEqual(jasmine.any(HTMLSpanElement));
				expect(a).toEqual(jasmine.any(HTMLAnchorElement));
			});

			it("can make elements with attributes", function() {
				var div = document.create('<div id="foo">');
				var span = document.create('<span class="bar"></span>');
				var a = document.create('<a href="http://example.com/">');
				expect(div).toEqual(jasmine.any(HTMLDivElement));
				expect(div.id).toEqual("foo");
				expect(span).toEqual(jasmine.any(HTMLSpanElement));
				expect(span.className).toEqual("bar");
				expect(a).toEqual(jasmine.any(HTMLAnchorElement));
				expect(a.href).toEqual("http://example.com/");
			});

			it("can make elements with inner HTML", function() {
				var div = document.create("<div>Hello world!</div>");
				expect(div).toEqual(jasmine.any(HTMLDivElement));
				expect(div.innerHTML).toEqual("Hello world!");
			});

			it("can make simple text", function() {
				var html = document.create("foo bar");
				expect(html).toEqual(jasmine.any(Text));
			});

		});

	});
	
    describe("node", function() {

        describe("text", function() {

            it("can set text to an element", function() {
                var div = document.createElement("div");
                div.text('example text')
                expect(div.textContent).toEqual('example text');

            });

            it("can clear the text from an element", function() {
                var div = document.createElement("div");
                div.textContent = 'hello world';
                div.text('');
                expect(div.textContent).toEqual('');

            });

            it("can read the text from an element", function() {
                var div = document.createElement("div");
                div.textContent = 'hello world';
                var text = div.text();
                expect(text).toEqual('hello world');

            });
              
        });

        describe("html", function() {

            it("can set html to an element", function() {
                var div = document.createElement("div");
                div.html('<strong>test</strong>')
                expect(div.innerHTML).toEqual('<strong>test</strong>');

            });

            it("can clear the text from an element", function() {
                var div = document.createElement("div");
                div.innerHTML = '<strong>hello world</strong>';
                div.html('');
                expect(div.innerHTML).toEqual('');

            });

        });
        
    });
});