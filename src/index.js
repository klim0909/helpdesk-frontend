// src/index.js
import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
    const ticketList = document.getElementById('ticket-list');
    const ticketForm = document.getElementById('ticket-form');
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');

    const baseUrl = '/api';

    function fetchTickets() {
        fetch(`${baseUrl}/?method=allTickets`)
            .then(response => response.json())
            .then(data => {
                ticketList.innerHTML = '';
                data.forEach(ticket => {
                    const ticketItem = document.createElement('div');
                    ticketItem.innerText = ticket.name;
                    ticketList.appendChild(ticketItem);
                });
            })
            .catch(error => console.error('Error fetching tickets:', error));
    }

    ticketForm.addEventListener('submit', event => {
        event.preventDefault();
        const name = nameInput.value;
        const description = descriptionInput.value;

        fetch(`${baseUrl}/?method=createTicket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, status: false }),
        })
            .then(response => response.json())
            .then(() => {
                fetchTickets();
                nameInput.value = '';
                descriptionInput.value = '';
            })
            .catch(error => console.error('Error creating ticket:', error));
    });

    fetchTickets();
});
