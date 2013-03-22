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

        describe("addClass", function() {

            it("can add a class to a DIV", function() {
                var div = document.createElement("div");
                div.addClass('test');
                expect(div.className).toEqual('test');

            });
            
            it("can add multiple classes to a DIV with a class", function() {
                var div = document.createElement("div");
                div.className = 'one second';
                div.addClass('third fourth fifth');
                expect(div.className).toContain("one");
                expect(div.className).toContain("second");  
                expect(div.className).toContain("third"); 
                expect(div.className).toContain("fourth"); 
                expect(div.className).toContain("fifth"); 
            });

            it("can add an empty classname to a DIV an expecting an error", function() {
                var div = document.createElement("div");
                div.className = 'one second';
                expect(function(){div.addClass('');}).toThrow();
            });
            
        });
        
        describe("removeClass", function() {

            it("can remove one class from a DIV", function() {
                var div = document.createElement("div");
                div.className = 'i have many classes';
                div.removeClass('many');
                expect(div.className).toEqual('i have classes');

            });

            it("can remove multiple classes from a DIV", function() {
                var div = document.createElement("div");
                div.className = 'i have many classes';
                div.removeClass('many i classes');
                expect(div.className).toEqual('have');

            });
        });
        
        describe("hasClass", function() {

            it("can check an existing class from an element", function() {
                var div = document.createElement("div");
                div.className = 'what a wonderful test';
         
                expect(div.hasClass('wonderful')).toBeTruthy();

            });
            
            it("can check multiple existing classes from an element", function() {
                var div = document.createElement("div");
                div.className = 'what a wonderful test';
         
                expect(div.hasClass('wonderful a')).toBeTruthy();

            });
            it("can check if one class not existing in the classes of an element", function() {
                var div = document.createElement("div");
                div.className = 'what a wonderful test';
         
                expect(div.hasClass('horrible')).toBeFalsy();

            });
            
            it("can check if one class of multiple classes is not in the classList of a DIV", function() {
                var div = document.createElement("div");
                div.className = 'what a wonderful test';
         
                expect(div.hasClass('wonderful wrong')).toBeFalsy();

            });
            
        });
    });
});