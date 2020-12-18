const Intern = require("../lib/Intern");

test("set school", () => {
    const testVal = "UCLA";
    const int = new Intern("Yith", 1, "test@test.com", testVal);
    expect(int.school).toBe(testVal);
});

test("getRole()", () => {
    const testVal = "Intern";
    const int = new Intern("Yeeee", 1, "test@test.com", "UCLA");
    expect(int.getRole()).toBe(testVal);
});

test("getSchool()", () => {
    const testVal = "UCLA";
    const int = new Intern("Haw", 1, "test@test.com", testVal);
    expect(int.getSchool()).toBe(testVal);
});