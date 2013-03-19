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

		});

	});

});