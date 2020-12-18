const Engineer = require("../lib/Engineer");

test("set GitHUb", () => {
    const testVal = "GitHubUser";
    const eng = new Engineer("Weep", 1, "test@test.com", testVal);
    expect(eng.github).toBe(testVal);
});

test("getRole()", () => {
    const testVal = "Engineer";
    const eng = new Engineer("Feh", 1, "test@test.com", "GitHubUser");
    expect(eng.getRole()).toBe(testVal);
});

test("Can get GitHub username via getGithub()", () => {
    const testVal = "GitHubUser";
    const eng = new Engineer("Door", 1, "test@test.com", testVal);
    expect(eng.getGithub()).toBe(testVal);
});