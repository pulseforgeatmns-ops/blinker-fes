const cars = [
  { name: "Tesla Model 3", category: "Electric Sedan", year: 2024, price: 249, seats: 5, trans: "Auto", fuel: "Electric" },
  { name: "Toyota RAV4", category: "SUV", year: 2023, price: 189, seats: 5, trans: "Auto", fuel: "Petrol" },
  { name: "BMW 3 Series", category: "Luxury Sedan", year: 2024, price: 319, seats: 5, trans: "Auto", fuel: "Petrol" },
  { name: "Hyundai Tucson", category: "SUV", year: 2022, price: 159, seats: 5, trans: "Auto", fuel: "Petrol" },
  { name: "Audi Q5", category: "Luxury SUV", year: 2023, price: 359, seats: 5, trans: "Auto", fuel: "Diesel" },
  { name: "Ford Ranger", category: "Ute", year: 2022, price: 199, seats: 5, trans: "Auto", fuel: "Diesel" },
]

function renderCars(list) {
  const grid = document.getElementById('cars-grid')
  grid.innerHTML = list.map(car => `
    <div class="car-card">
      <div class="car-img">🚗</div>
      <div class="car-info">
        <span class="car-category">${car.category}</span>
        <span class="car-year">${car.year}</span>
        <h3>${car.name}</h3>
        <p>👥 ${car.seats} Seats &nbsp; ⚙️ ${car.trans} &nbsp; ⛽ ${car.fuel}</p>
        <hr />
        <div class="card-footer">
          <div>
            <small>FROM</small>
            <strong>$${car.price}/wk</strong>
          </div>
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  `).join('')
}

renderCars(cars)

document.getElementById('sort').addEventListener('change', function() {
  const value = this.value
  let sorted = [...cars]

  if (value === 'name-asc') sorted.sort((a, b) => a.name.localeCompare(b.name))
  if (value === 'name-desc') sorted.sort((a, b) => b.name.localeCompare(a.name))
  if (value === 'year-desc') sorted.sort((a, b) => b.year - a.year)
  if (value === 'year-asc') sorted.sort((a, b) => a.year - b.year)

  renderCars(sorted)
})