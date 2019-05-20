// 布尔值
let isDone: boolean = false;
// 数字
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;     // 十六进制
let binaryLiteral: number = 0b1010;  // 二进制
let octalLiteral: number = 0o744;    // 八进制
// 字符串
let name: string = 'bob';
name = 'smith';

let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${name} I'll be ${age + 1} years old next month.`;

/**
 * 数组
 */
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];  // 使用数组泛型，Array<元素类型>
// 元组Tuple,  元组类型允许表示一个一直元素类型的数组，各元素的类型不必相同。比如，你可以定义一对值分别为string和number类型的元组
let x: [string, number];
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
// 当访问一个已知索引的元素，会得到正确的类型
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr' function
// 当访问一个越界的元素，会使用联合类型替代
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
console.log(x[5].toString());  // OK, 'string'和'number'都有 toString
x[6] = true; // Error, 布尔不是(string | number)类型

/**
 * 枚举
 * enum类型是对JavaScript 标准数据类型的一个补充。像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
 */
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
// 默认情况下，从0开始微元素编号。你也可以手动的指定成员的数值。例如，我们将上面的累计改成从1开始编号：
enum Color {Red = 1, Green, blue};
let c: Color = Color.Green;
// 枚举类型提供的一个便利是你可以由枚举的值得到它的名字。例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];
console.log(colorName); // 显示'Green'因为上面代码里它的值是2

/*
 * Any
 * 有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。这些值可能来自于动态的内容，比如来
 * 自用户输入或第三方代码库。这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段
 * 的检查。那么我们可以使用any类型来标记这些变量
 */
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false; // okay, definitely a boolean
// 在对现有代码进行改写的时候，any类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。你可能
// 认为Object有相似的作用，就像它在其他语言中那样。但是Object类型的变量只是允许你给它赋任意值-但是
// 却不能够在它上面调用任意的方法，即便它真的有这些方法
let notSure: any = 4;
notSure.ifItExists();  // okay， ifItExists might exist at runtime
notSure.toFixed();     // okay, toFixed exists (but the compiler doesn't check)

let prettySure: object = 4;
prettySure.toFiexd();   // Error: Property 'toFixed' doesn't exits on type 'Object'.

// 当你只知道一部分数据的类型时，any类型也是有用的。比如，你有一个数组，它包含了不同的类型的数据：
let list: any[] = [1, true, 'free'];
list[1] = 100;

/**
 * Void
 * 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。当一个函数没有返回值时，你通常会见到其返回值类型是void:
 */
function warnUser(): void {
    console.log('This is my warning message');
}
// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null:
let unusable: void = undefined;

/**
 * Null 和 Undefined
 * TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。和void相似，他们的本身的类型用处不是很大：
 */
let u: undefined = undefined;
let n: null = null;
// 默认情况下null和undefined是所有类型的子类型。就是说你可以把null和undefined赋值给number类型的变量。
// 然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。这能避免很多常见的问题。
// 也许在某处你想传入一个string或null或undefined，你可以使用联合类型string | null | undefined。
// 注意：我们鼓励尽可能地使用--strictNullChecks，但在本手册里我们假设这个标记是关闭的。

/**
 * Never
 * never类型表示的是那些永不存在的值的类型。例如，never类型是那些总是抛出异常或根本就不会有返回值的函数表达式
 * 或者箭头函数表达式的返回值类型；变量也可能是never类型，当它们被永不为真的类型保护所约束时。
 * never是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型(除了never本身之外)。
 * 即使any也不可以赋值给never。
 */
function error(message: string): never {
    throw new Error(message);
}
function fail() {
    return error('Something failed');
}
function infiniteLoop(): never {
    while (true) {

    }
}

/**
 * Object
 * object表示非原始类型，也就是除number, string, boolean, symbol 或undefined之外的类型。
 * 使用object类型，就可以更好的表示像Object.create这样的API。例如：
 */
declare function create(o: object | null): void;
create({prop: 0}); // OK
create(null);      // OK
create(42);        // Error
create('string');  // Error
create(false);     // Error
create(undefined); // Error

/**
 * 类型断言
 * 有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。
 * 通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。
 * 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。
 */
// 类型断言有两种形式。 其一是“尖括号”语法：
let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length;
// 另一个为as语法
let someValue: any = 'this is a string';
let strLength: number = (someValue as string).length;