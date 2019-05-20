function greeter(person: Person) {
    return `Hello, ${person.firstName} ${person.lastName}`;
}


class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

let user = new Student('Jane', 'M', 'user');

document.body.innerHTML = greeter(user);