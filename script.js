let filmsData = [];

// Fetch films data and populate the table
function fetchFilms() {
    fetch('films.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            filmsData = data;
            renderFilms(filmsData);
        })
        .catch(error => {
            console.error('Error fetching films:', error);
            alert('Failed to load films. Please try again later.');
        });
}

// Render films in the table
function renderFilms(films) {
    const tableBody = document.querySelector('#films-table tbody');
    tableBody.innerHTML = '';

    films.forEach(film => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.release_year}</td>
            <td>${film.director}</td>
            <td>$${film.box_office.toLocaleString()}</td>
            <td>${film.country}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Filter films by release year
function filterFilmsByYear(year) {
    if (!year) {
        return filmsData;
    }
    return filmsData.filter(film => film.release_year == year);
}

// Event listener for the filter button
document.getElementById('filter-button').addEventListener('click', () => {
    const year = document.getElementById('year-filter').value;
    const filteredFilms = filterFilmsByYear(year);
    renderFilms(filteredFilms);
});

// Event listener for the reset button
document.getElementById('reset-button').addEventListener('click', () => {
    document.getElementById('year-filter').value = '';
    renderFilms(filmsData);
});

fetchFilms();
