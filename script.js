const searchInput = document.getElementById('dest-search');
const cards = document.querySelectorAll('.destination-card');

if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
        const query = e.target.value.toLowerCase();
        
        cards.forEach(card => {
            const cityName = card.querySelector('h3').textContent.toLowerCase();
            card.style.display = cityName.includes(query) ? 'block' : 'none';
        });
    });
}

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

const modal = document.getElementById('bookingModal');
const bookButtons = document.querySelectorAll('.btn-book');
const closeBtn = document.querySelector('.close-modal');

bookButtons.forEach(btn => {
    btn.onclick = function() {
        const location = this.getAttribute('data-location');
        document.getElementById('modal-title').innerText = `Book your trip to ${location}`;
        modal.style.display = "flex";
    }
});

if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = "none";
}

window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
};

const bookingForm = document.getElementById('travel-form');
if (bookingForm) {
    bookingForm.onsubmit = (e) => {
        e.preventDefault();
        alert("Pack your bags! Your AuraTravels itinerary is being prepared.");
        modal.style.display = "none";
    };
}
