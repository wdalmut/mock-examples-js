const users = require('../src');

describe("User", () => {

  describe("With mocked DB", () => {
    let db = null;

    beforeEach(() => {
      db = require('../src/db');
    });

    it("should get the user", () => {
      spyOn(db, 'query').and.returnValue({
        id: 1,
        firstname: "Walter",
        lastname: "Dal Mut",
      });

      user = users(db).getUser(1);

      expect(user.firstname).toEqual("Walter");
      expect(user.lastname).toEqual("Dal Mut");
    });

    it("should return 'null' on errors", () => {
      spyOn(db, 'query').and.throwError("Missing user");

      user = users(db).getUser(1);

      expect(user).toBe(null);
    });
  });

  describe("With stubbed DB", () => {
    let db = null;

    beforeEach(() => {
      db = jasmine.createSpyObj('db', ['query', 'insert']);
    });

    it("should mock out the database", () => {
      db.query.and.returnValue({ firstname: "Walter" });

      user = users(db).getUser(1);
      expect(user.firstname).toEqual("Walter");
    });
  });
});
