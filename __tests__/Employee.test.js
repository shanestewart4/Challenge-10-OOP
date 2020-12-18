const Employee = require("../lib/Employee");

test("instantiate Employee instance", () => {
    const emp = new Employee();
    expect(typeof (emp)).toBe("object");
})

test("set name", () => {
    const name = "Alice";
    const emp = new Employee(name);
    expect(emp.name).toBe(name);
});

test("set id", () => {
    const testVal = 100;
    const e = new Employee("Foo", testVal);
    expect(e.id).toBe(testVal);
});

test("set email", () => {
    const testVal = "test@test.com";
    const emp = new Employee("Foo", 1, testVal);
    expect(emp.email).toBe(testVal);
});

test("getName()", () => {
    const testVal = "Alice";
    const emp = new Employee(testVal);
    expect(emp.getName()).toBe(testVal);
});

test("getId()", () => {
    const testVal = 100;
    const emp = new Employee("Foo", testVal);
    expect(emp.getId()).toBe(testVal);
});

test("getEmail()", () => {
    const testVal = "test@test.com";
    const emp = new Employee("Foo", 1, testVal);
    expect(emp.getEmail()).toBe(testVal);
});

test("getRole() should return \"Employee\"", () => {
    const testVal = "Employee";
    const emp = new Employee("Alice", 1, "test@test.com");
    expect(emp.getRole()).toBe(testVal);
});