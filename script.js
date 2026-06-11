const apiKey = '3ddca7f6'

let allMovies = []

function fetchMovies(searchTerm) {
  fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.Search) {
        allMovies = data.Search.slice(0, 6)
        renderMovies(allMovies)
      } else {
        document.getElementById('cars-grid').innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:40px;color:#6b7280;font-size:16px">No movies found. Try another search.</p>`
      }
    })
}

function renderMovies(list) {
  const grid = document.getElementById('cars-grid')

  grid.innerHTML = list.map(movie => `
    <div class="car-card">
      <div class="car-img">
        ${movie.Poster !== 'N/A' 
          ? `<img src="${movie.Poster}" alt="${movie.Title}" style="width:100%; height:100%; object-fit:cover;" />`
          : `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:48px;">🎬</div>`
        }
      </div>
      <div class="car-info">
        <span class="car-category">${movie.Type}</span>
        <span class="car-year">${movie.Year}</span>
        <h3>${movie.Title}</h3>
        <div class="card-footer">
          <div>
            <small>IMDB ID</small>
            <strong>${movie.imdbID}</strong>
          </div>
          <button>View</button>
        </div>
      </div>
    </div>
  `).join('')
}

document.getElementById('sort').addEventListener('change', function() {
  const value = this.value
  let sorted = [...allMovies]

  if (value === 'name-asc') sorted.sort((a, b) => a.Title.localeCompare(b.Title))
  if (value === 'name-desc') sorted.sort((a, b) => b.Title.localeCompare(a.Title))
  if (value === 'year-desc') sorted.sort((a, b) => b.Year - a.Year)
  if (value === 'year-asc') sorted.sort((a, b) => a.Year - b.Year)

  renderMovies(sorted)
})

// Search bar functionality
const searchInput = document.querySelector('.search-bar input')
const searchButton = document.querySelector('.search-bar button')

function handleSearch() {
  const term = searchInput.value.trim()
  if (term) {
    fetchMovies(term)
  }
}

searchButton.addEventListener('click', handleSearch)
searchInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') handleSearch()
})

// Initial load
fetchMovies('marvel')