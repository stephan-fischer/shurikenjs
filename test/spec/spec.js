// TODO: this should really be in more than one file

describe("shuriken", function() {

	describe("document", function() {

		describe("create", function() {
			it("can make simple, empty elements", function() {
				var div = document.create("div");
				var span = document.create("span");
				var a = document.create("a");
				expect(div).toEqual(jasmine.any(Node));
				expect(span).toEqual(jasmine.any(Node));
				expect(a).toEqual(jasmine.any(Node));
			});
		});

	});

});