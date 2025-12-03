const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const message = document.getElementsByClassName('message')[0];

if (loginBtn){
loginBtn.addEventListener('click', function() {
    const user = username.value.trim();
    const pass = password.value.trim();
    if (message) message.style.display = 'block';
    if(!user || !pass) {
        if (message) {
            message.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Please enter both username and password.';
            message.style.color = 'red';
            message.style.border = '1px solid red';
        }
        return;
    }
    if(user === 'admin' && pass === '123') {
        if (message) {
            message.innerHTML = '<i class="fa-solid fa-circle-check"></i> Login successful!';
            message.style.color = 'green';
            message.style.border = '1px solid green';
        }
        setTimeout(() => {
            window.location.href = 'product-filter.html';
        }, 1000);
    } else {
        if (message) {
            message.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Invalid username or password.';
            message.style.color = 'red';
            message.style.border = '1px solid red';
        }
    }
});
}



const allCards = document.querySelectorAll('.product-card');
const categoryButtons = document.querySelectorAll('.category');
const searchBox = document.querySelector('.search');
const searchButton = document.querySelector('.search-btn');

function showCards() {
    if (searchBox === null) return;

    const searchText = searchBox.value.toLowerCase().trim();

    let activeCategory = 'all';
    const activeButton = document.querySelector('.category.active');
    if (activeButton) {
        activeCategory = activeButton.textContent.toLowerCase().trim();
    }

    allCards.forEach(card => {

        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        const productCategory = card.querySelector('.product-category').textContent.toLowerCase();

        const name_to_search = productName.includes(searchText);

        const category_to_filter = (activeCategory === 'all') || (productCategory === activeCategory);

        if (name_to_search && category_to_filter) {
            card.style.display = '';        
        } else {
            card.style.display = 'none';    
        }
    });
}

categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.category').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        showCards();
    });
});

if (searchButton) {
    searchButton.addEventListener('click', showCards);
}

if (searchBox) {
    searchBox.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            showCards();
        }
    });
}
showCards();