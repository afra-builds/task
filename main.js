let searchInput = document.querySelector("#searchInput");
let loading = document.querySelector("#loading");
let errorMessage = document.querySelector("#errorMessage");
let userList = document.querySelector("#userList");
let allUsers= [];
class User {
    constructor(id,name, email, city) {
        this.id =id;
        this.name = name;
        this.email = email;
        this.city = city; 
}
get userInfo() {
        return `${this.name} - ${this.email} - ${this.city}`;
    }
}
async function getUsers() {
    loading.style.display="block";
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        if(!response.ok){
            throw new Error("failed to fetch users");
        }
        let users = await response.json();
       allUsers = users.map(user =>{
    return new User
    (user.id,user.name,user.email,user.address.city)
    });
    displayUsers(allUsers);
    } catch (error) {
        errorMessage.textContent = "Error loading users.";
        console.error( error);
    }
    finally {
        loading.style.display = "none";
    }
}
function displayUsers(users){
    userList.innerHTML = "";
    users.forEach(user => {
        let{name,email,city,userInfo}= user;
        let card = `
    <div class="user-card">
        <h3>Name: ${name}</h3>
        <p>Email: ${email}</p>
        <p>City:  ${city}</p>
        <p>Info:  ${userInfo}</p>
        <button class="delete-btn"data-id="${user.id}">Delete</button>
    </div>
`;
userList.insertAdjacentHTML("beforeend", card);
    });
}
searchInput.addEventListener("input", () => {
    let searchText = searchInput.value.toLowerCase();

    let filteredUsers = allUsers.filter(user =>{
     return   user.name.toLowerCase().includes(searchText);
});
    displayUsers(filteredUsers);
});
userList.addEventListener("click", event => {
    let button = event.target.closest(".delete-btn");

    if (!button) return;

    let deleteId = Number(button.dataset.id);

    allUsers = allUsers.filter(user => user.id !== deleteId);

    displayUsers(allUsers);
});
getUsers();

