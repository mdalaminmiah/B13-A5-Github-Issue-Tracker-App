##1️⃣ What is the difference between var, let, and const?

**Answer:**

In JavaScript, variables can be declared using `var`, `let`, or `const`. They differ in **scope, hoisting, and mutability**.

- **`var`**
    - **Scope:** Function-scoped, meaning it is accessible throughout the function where it is declared.
    - **Hoisting:** Variables declared with `var` are hoisted to the top of their scope and initialized with `undefined`.
    - **Redeclaration & Update:** Can be redeclared and updated.
    - **Example:**
    ```javascript
    function testVar() {
        console.log(a); // undefined
        var a = 10;
        console.log(a); // 10
    }
    testVar();
    ```
- **`let`**
    - **Scope:** Block-scoped, meaning it is only accessible within the {} block.
    - **Hoisting:** Hoisted but not initialized; accessing before declaration causes a `ReferenceError.`
    - **Redeclaration & Update:** Cannot be redeclared in the same scope, but can be updated.
    - **Example:**

    ```javascript
    let x = 5;
    x = 10; // allowed
    // let x = 20; // Error: x has already been declared
    ```

- **`const`**
    - **Scope:** Block-scoped.
    - **Hoisting:** Similar to `let`.
    - **Redeclaration & Update:** Cannot be redeclared or updated. Must be initialized at the time of declaration.
    - **Example:**

    ```javascript
    const pi = 3.14;
    // pi = 3.1415; // Error: Assignment to constant variable
    ```

    - **Tip:** Use `const` by default and `let` if the variable value will change. Avoid `var` in modern JavaScript.

---

##2️⃣ What is the spread operator (...)?

**Answer:**

The **spread operator** (`...`) allows an **iterable** (like an array or object) to be expanded into individual elements. It is commonly used for **copying arrays, merging arrays, and passing multiple arguments** to functions.

- **`Array example:`**

    ```javascript
    const arr1 = [1, 2, 3];
    const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
    ```

- **`Object example:`**

    ```javascript
    const obj1 = { a: 1, b: 2 };
    const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }
    ```

- **`Function arguments example:`**

    ```javascript
    function sum(a, b, c) {
        return a + b + c;
    }
    const nums = [1, 2, 3];
    console.log(sum(...nums)); // 6
    ```

- **Tip:** Spread operator is **different from rest operator**, though both use `....`
    - **Spread:** Expands an iterable
    - **Rest:** Collects remaining elements into an array

---

##3️⃣ What is the difference between map(), filter(), and forEach()?

**Answer:**

---

##4️⃣ What is an arrow function?

**Answer:**

---

##5️⃣ What are template literals?

**Answer:**

---
