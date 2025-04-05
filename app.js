// Alap osztály egy felhasználóhoz
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    getInfo() {
        return `${this.name} (${this.email})`;
    }
}

// Admin osztály, amely kiterjeszti a User osztályt
class Admin extends User {
    constructor(name, email, role) {
        super(name, email);
        this.role = role;
    }

    deleteUser(user, userList) {
        if (confirm(`Biztosan törölni akarod ezt a felhasználót: ${user.name}?`)) {
            const index = userList.indexOf(user);
            if (index > -1) {
                userList.splice(index, 1);
                updateUserList(userList);
            }
        }
    }
}

// Felhasználói lista
let userList = [
    new User("Kiss Péter", "peter@example.com"),
    new User("Nagy Anna", "anna@example.com")
];

// Admin létrehozása
const admin = new Admin("Admin János", "admin@example.com", "Szuperadmin");

// Felhasználói lista frissítése a DOM-on
function updateUserList(list) {
    const ul = document.getElementById("userList");
    ul.innerHTML = "";
    list.forEach((user, index) => {
        const li = document.createElement("li");
        li.textContent = user.getInfo();
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Törlés";
        deleteBtn.onclick = () => admin.deleteUser(user, list);
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    });
}

// Új felhasználó hozzáadása
document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const newUser = new User(name, email);
    userList.push(newUser);
    updateUserList(userList);
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
});

// Kezdeti lista megjelenítése
updateUserList(userList);
