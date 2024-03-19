const jsonData = {
    "theater1": {
      "movies": {
        "a": {
          "prime_seat": {
            "price": 150.00
          },
          "classic_seat": {
            "price": 100.00
          }
        },
        "b": {
          "prime_seat": {
            "price": 180.00
          },
          "classic_seat": {
            "price": 120.00
          }
        },
        "c": {
          "prime_seat": {
            "price": 160.00
          },
          "classic_seat": {
            "price": 110.00
          }
        },
        "d": {
          "prime_seat": {
            "price": 170.00
          },
          "classic_seat": {
            "price": 100.50
          }
        },
        "e": {
          "prime_seat": {
            "price": 190.00
          },
          "classic_seat": {
            "price": 130.00
          }
        }
      }
    },
    "theater2": {
      "movies": {
        "a": {
          "prime_seat": {
            "price": 140.00
          },
          "classic_seat": {
            "price": 90.00
          }
        },
        "b": {
          "prime_seat": {
            "price": 160.00
          },
          "classic_seat": {
            "price": 110.00
          }
        },
        "c": {
          "prime_seat": {
            "price": 150.00
          },
          "classic_seat": {
            "price": 100.50
          }
        },
        "d": {
          "prime_seat": {
            "price": 170.00
          },
          "classic_seat": {
            "price": 120.00
          }
        },
        "e": {
          "prime_seat": {
            "price": 180.00
          },
          "classic_seat": {
            "price": 130.00
          }
        }
      }
    },
    "theater3": {
      "movies": {
        "a": {
          "prime_seat": {
            "price": 160.00
          },
          "classic_seat": {
            "price": 110.00
          }
        },
        "b": {
          "prime_seat": {
            "price": 180.00
          },
          "classic_seat": {
            "price": 120.00
          }
        },
        "c": {
          "prime_seat": {
            "price": 170.00
          },
          "classic_seat": {
            "price": 111.50
          }
        },
        "d": {
          "prime_seat": {
            "price": 198.00
          },
          "classic_seat": {
            "price": 137.00
          }
        },
        "e": {
          "prime_seat": {
            "price": 200.00
          },
          "classic_seat": {
            "price": 145.00
          }
        }
      }
    },
    "theater4": {
      "movies": {
        "a": {
          "prime_seat": {
            "price": 155.00
          },
          "classic_seat": {
            "price": 105.00
          }
        },
        "b": {
          "prime_seat": {
            "price": 185.00
          },
          "classic_seat": {
            "price": 125.00
          }
        },
        "c": {
          "prime_seat": {
            "price": 175.00
          },
          "classic_seat": {
            "price": 110.50
          }
        },
        "d": {
          "prime_seat": {
            "price": 160.00
          },
          "classic_seat": {
            "price": 105.50
          }
        },
        "e": {
          "prime_seat": {
            "price": 198.00
          },
          "classic_seat": {
            "price": 138.00
          }
        }
      }
    }
  };
  const theaterSelect = document.getElementById('theaterSelect');
  const movieSelect = document.getElementById('movieSelect');
  const seatMap = document.getElementById('seatMap');
  const totalCostElement = document.getElementById('totalCost');
  const seatsSelectedElement = document.getElementById('seatsSelected');
  const primeSeatPriceElement = document.getElementById('primeSeatPrice');
  const classicSeatPriceElement = document.getElementById('classicSeatPrice');
  
  let selectedSeats = [];
  let totalCost = 0;
  

  for (const theater in jsonData) {
    const option = document.createElement('option');
    option.value = theater;
    option.textContent = theater;
    theaterSelect.appendChild(option);
  }
  
  theaterSelect.addEventListener('change', () => {
    const theater = theaterSelect.value;
    const movie = movieSelect.value;
    generateSeatMap(theater, movie);
    displaySeatPrices(theater, movie);
  });
  
 
  function populateMovieSelect(theater) {
    movieSelect.innerHTML = ''; 
  
    for (const movie in jsonData[theater].movies) {
      const option = document.createElement('option');
      option.value = movie;
      option.textContent = movie;
      movieSelect.appendChild(option);
    }
  }
  
  movieSelect.addEventListener('change', () => {
    const theater = theaterSelect.value;
    const movie = movieSelect.value;
    generateSeatMap(theater, movie);
    displaySeatPrices(theater, movie);
  });
  
  function generateSeatMap(theater, movie) {
 
    const numRows = 16; 
    const numSeatsPerRow = 10;
  
    let seatMapHTML = '<table>';
    seatMapHTML += '<thead><tr><th></th>';
  
    for (let i = 1; i <= numSeatsPerRow; i++) {
      seatMapHTML += `<th>${i}</th>`;
    }
  
    seatMapHTML += '</tr></thead>';
    seatMapHTML += '<tbody>';
  
    for (let row = 'A'.charCodeAt(0); row <= 'P'.charCodeAt(0); row++) {
      if (String.fromCharCode(row) === 'A') {
        seatMapHTML += `<tr class="prime-row-label"><td>Prime</td><td colspan="9"></td></tr>`;
      }
  
      seatMapHTML += '<tr>';
      seatMapHTML += `<td>${String.fromCharCode(row)}</td>`;
  
      for (let seat = 1; seat <= numSeatsPerRow; seat++) {
        const isPrimeSeat = (
          (row >= 'A'.charCodeAt(0) && row <= 'E'.charCodeAt(0)) || 
          (row >= 'Y'.charCodeAt(0) && seat >= 3 && seat <= 7)
        );
        const seatClass = isPrimeSeat ? 'prime-seat' : 'classic-seat';
  
        seatMapHTML += `<td class="seat ${seatClass}">${String.fromCharCode(row)}${seat}</td>`;
      }
  
      if (String.fromCharCode(row) === 'E') {
        seatMapHTML += '<tr class="classic-row-label"><td>Classic</td><td colspan="9"></td></tr>';
      }
  
      seatMapHTML += '</tr>';
    }
  
    seatMapHTML += '</tbody>';
    seatMapHTML += '</table>';
  
    seatMap.innerHTML = seatMapHTML;
  
    const seatElements = document.querySelectorAll('.seat');
  
    seatElements.forEach(seat => {
      seat.addEventListener('click', () => {
        if (!seat.classList.contains('selected-seat')) {
          seat.classList.add('selected-seat');
          selectedSeats.push(seat.textContent);
          totalCost += getSeatPrice(seat);
        } else {
          seat.classList.remove('selected-seat');
          selectedSeats = selectedSeats.filter(s => s !== seat.textContent);
          totalCost -= getSeatPrice(seat);
        }
  
        totalCostElement.textContent = totalCost.toFixed(2);
        seatsSelectedElement.textContent = selectedSeats.length;
      });
    });
  }
  
  
 
  function getSeatPrice(seat) {
    const theater = theaterSelect.value;
    const movie = movieSelect.value;
  
    if (jsonData[theater] && jsonData[theater].movies[movie]) {
      const pricingData = jsonData[theater].movies[movie];
      if (seat.classList.contains('classic-seat')) { 
        return pricingData['classic_seat'].price;
      } else {
        return pricingData['prime_seat'].price;
      }
    }
  
   
    return 0;
  }
  

  function displaySeatPrices(theater, movie) {
    if (jsonData[theater] && jsonData[theater].movies[movie]) {
      const pricingData = jsonData[theater].movies[movie];
      primeSeatPriceElement.textContent = pricingData['prime_seat'].price.toFixed(2);
      classicSeatPriceElement.textContent = pricingData['classic_seat'].price.toFixed(2);
    }
  }
  

  populateMovieSelect(theaterSelect.value);
  generateSeatMap(theaterSelect.value, movieSelect.value);
  displaySeatPrices(theaterSelect.value, movieSelect.value);
  