


document.addEventListener('DOMContentLoaded', function() {
  
  let linkGry = document.querySelector('a[href="#gry"]');
  let linkAktualnosci = document.querySelector('a[href="#aktualnosci"]');
  let linkSklepy = document.querySelector('a[href="#inne"]');

  let sekcjaGry = document.querySelector('.gry');
  let sekcjaAktualnosci = document.querySelector('.aktualnosci');
  let sekcjaSklepy = document.querySelector('.sklepy');

  let divSortGry = document.querySelector('#sortowanieGry');
  let divSortAkt = document.querySelector('#sortowanieAkt');
  let divSortInne = document.querySelector('#sortowanieInne');

  linkGry.addEventListener('click', function() {
    sekcjaGry.style.display = 'flex';
    sekcjaAktualnosci.style.display = 'none';
    sekcjaSklepy.style.display = 'none';
    divSortAkt.style.display = 'none';
    divSortGry.style.display = 'block';
    divSortInne.style.display = 'none';
  });

  linkAktualnosci.addEventListener('click', function() {
    sekcjaGry.style.display = 'none';
    sekcjaAktualnosci.style.display = 'flex';
    sekcjaSklepy.style.display = 'none';
    divSortAkt.style.display = 'block';
    divSortGry.style.display = 'none';
    divSortInne.style.display = 'none';
  });

  linkSklepy.addEventListener('click', function() {
    sekcjaGry.style.display = 'none';
    sekcjaAktualnosci.style.display = 'none';
    sekcjaSklepy.style.display = 'flex';
    divSortAkt.style.display = 'none';
    divSortGry.style.display = 'none';
    divSortInne.style.display = 'block';
  });


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




  let links = document.querySelectorAll('a');

  links.forEach(function(link) {
    link.addEventListener('click', function(event) {

      let sectionId = this.getAttribute('href').substring(1);

      let section = document.querySelector('#' + sectionId);

      let allSections = document.querySelectorAll('section');
      allSections.forEach(function(sec) {
        sec.style.display = 'none';
      });

      section.style.display = 'flex';
    });
  });
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//rotowanie trojkata
document.querySelectorAll('.sort').forEach((sortDiv) => {
  const pImgDiv = sortDiv.querySelector('.p-img');
  const triangleDiv = pImgDiv.querySelector('.trojkat');
  const siblingDivs = Array.from(pImgDiv.parentNode.children).slice(1);
  const toggleVisibility = () => {
    siblingDivs.forEach((div) => div.style.display = div.style.display === "" || div.style.display === "none" ? "flex" : "none");
    triangleDiv.style.transform = triangleDiv.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
  };
  siblingDivs.forEach((div) => div.style.display = "none");
  pImgDiv.addEventListener('click', toggleVisibility);
});
window.onbeforeunload = () => {
  document.querySelectorAll('.sort .p-img').forEach((pImgDiv) => {
    Array.from(pImgDiv.parentNode.children).slice(1).forEach((div) => div.style.display = "none");
  });
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// Rozwijanie i zwijanie divów
const triangleDiv = document.querySelector('.wyszukiwanie .trojkat');
const filtrowanieDiv = document.querySelector('.filtrowanie');
const zatwierdzanieDiv = document.querySelector('.zatwierdzanie');
const filtrDiv = document.querySelector('.filtr');
const wyszukiwanieDiv = document.querySelector('.wyszukiwanie');
const lupaImg = document.querySelector('.lupa');

// Przechowujemy oryginalną wysokość diva .filtr, .wyszukiwanie i wielkość obrazu .lupa
const originalHeightFiltr = getComputedStyle(filtrDiv).height;
const originalHeightWyszukiwanie = getComputedStyle(wyszukiwanieDiv).height;
const originalSizeLupa = getComputedStyle(lupaImg).width;

// Zwijamy divy na starcie i zmieniamy wysokość diva .filtr na 10%
if (window.innerWidth < 1125) {
  filtrowanieDiv.style.display = "none";
  zatwierdzanieDiv.style.display = "none";
  filtrDiv.style.height = "10%";
  wyszukiwanieDiv.style.height = "100%";
}

const toggleVisibility = () => {
  if (window.innerWidth < 1125) {
    const isHidden = filtrowanieDiv.style.display === "none";
    filtrowanieDiv.style.display = isHidden ? "flex" : "none";
    zatwierdzanieDiv.style.display = isHidden ? "flex" : "none";
    filtrDiv.style.height = isHidden ? originalHeightFiltr : "10%";
    wyszukiwanieDiv.style.height = isHidden ? originalHeightWyszukiwanie : "100%";
    lupaImg.style.width = isHidden ? "2%" : originalSizeLupa;
  }
};

triangleDiv.addEventListener('click', toggleVisibility);

window.addEventListener('resize', () => {
  if (window.innerWidth < 1125) {
    filtrowanieDiv.style.display = "none";
    zatwierdzanieDiv.style.display = "none";
    filtrDiv.style.height = "10%";
    wyszukiwanieDiv.style.height = "100%";
    lupaImg.style.width = originalSizeLupa;
  } else {
    // Usuwamy style inline, aby zastosować style z CSS
    filtrowanieDiv.style.display = "";
    zatwierdzanieDiv.style.display = "";
    filtrDiv.style.height = "";
    wyszukiwanieDiv.style.height = "";
    lupaImg.style.width = "";
  }
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Pobierz pole wyszukiwania
let searchInput = document.querySelector('#search');

// Dodaj zdarzenie 'input' do pola wyszukiwania
searchInput.addEventListener('input', function() {
  // Pobierz wprowadzoną frazę
  let phrase = removeDiacritics(this.value.toLowerCase());

  // Wybierz sekcje do przeszukania
  let sections = ['gry', 'aktualnosci', 'inne'];

  // Przeszukaj każdą sekcję
  sections.forEach(function(sectionId) {
    let section = document.querySelector('#' + sectionId);

    // Wyszukaj elementy div lub a zawierające element p o klasie 'nazwa'
    let parentElements = section.querySelectorAll('div:has(p.nazwa), a:has(p.nazwa)');

    // Przejdź przez każdy element div lub a
    parentElements.forEach(function(parent) {
      // Sprawdź, czy tekst elementu p zawiera wprowadzoną frazę
      let p = parent.querySelector('p.nazwa');
      if (removeDiacritics(p.textContent.toLowerCase()).includes(phrase)) {
        // Jeżeli tak, wyświetl element div lub a
        parent.style.display = '';
        parent.style.position = 'relative';
      } else {
        // Jeżeli nie, ukryj element div lub a
        parent.style.display = 'none';
      }
    });
  });
});
// Wyszukiwanie
function removeDiacritics(str) {
  let diacritics = [
    [/ą/g, 'a'], [/ć/g, 'c'], [/ę/g, 'e'], [/ł/g, 'l'], [/ń/g, 'n'], [/ó/g, 'o'], [/ś/g, 's'], [/ź/g, 'z'], [/ż/g, 'z'],
    [/Ą/g, 'A'], [/Ć/g, 'C'], [/Ę/g, 'E'], [/Ł/g, 'L'], [/Ń/g, 'N'], [/Ó/g, 'O'], [/Ś/g, 'S'], [/Ź/g, 'Z'], [/Ż/g, 'Z']
  ];
  diacritics.forEach(function(replacement) {
    str = str.replace(replacement[0], replacement[1]);
  });
  return str;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('section'));

  sections.forEach((section, sectionIndex) => {
    const hearts = Array.from(section.querySelectorAll('.heart'));

    hearts.forEach((heart, heartIndex) => {
      const localStorageKey = 'heart' + (sectionIndex * sections.length + heartIndex);

      if (localStorage.getItem(localStorageKey) === 'red') {
        heart.src = '/img/heartred.png';
      } else {
        heart.src = '/img/heartempty.png';
      }

      heart.addEventListener('click', (event) => {
        event.preventDefault(); 
        event.stopPropagation(); 

        if (heart.src.includes('heartempty')) {
          heart.src = '/img/heartred.png';
          localStorage.setItem(localStorageKey, 'red');
        } else {
          heart.src = '/img/heartempty.png';
          localStorage.setItem(localStorageKey, 'empty');
        }
        sortDivs(section);
      });
    });

    sortDivs(section);
  });
});

function sortDivs(section) {
  let container = section;
  let links = Array.from(container.querySelectorAll('a , .gra'));

  if (!container.originalOrder) {
    container.originalOrder = links.slice();
  }

  links.sort((a, b) => {
    let imgA = a.querySelector('.heart').src;
    let imgB = b.querySelector('.heart').src;

    if (imgA.includes('heartred') && imgB.includes('heartempty')) {
      return -1;
    } else if (imgA.includes('heartempty') && imgB.includes('heartred')) {
      return 1;
    } else {
      return container.originalOrder.indexOf(a) - container.originalOrder.indexOf(b);
    }
  });

  links.forEach((link) => {
    container.appendChild(link);
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  const removeFavoritesButton = document.querySelector('#usunulubione');
  const sections = Array.from(document.querySelectorAll('section'));

  // Sprawdź, czy są jakiekolwiek ulubione elementy po załadowaniu strony
  const anyHeartIsRed = Array.from(document.querySelectorAll('.heart')).some((heart) => heart.src.includes('heartred'));
  if (anyHeartIsRed) {
    removeFavoritesButton.style.display = 'block';
  } else {
    removeFavoritesButton.style.display = 'none';
  }

  sections.forEach((section, sectionIndex) => {
    const hearts = Array.from(section.querySelectorAll('.heart'));

    hearts.forEach((heart, heartIndex) => {
      // Obserwuj zmiany atrybutu src serca
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
            const anyHeartIsRed = Array.from(document.querySelectorAll('.heart')).some((heart) => heart.src.includes('heartred'));

            if (anyHeartIsRed) {
              removeFavoritesButton.style.display = 'block';
            } else {
              removeFavoritesButton.style.display = 'none';
              sortDivs(section);
            }
          }
        });
      });

      observer.observe(heart, {
        attributes: true 
      });
    });
  });

  removeFavoritesButton.addEventListener('click', () => {
    sections.forEach((section, sectionIndex) => {
      const hearts = Array.from(section.querySelectorAll('.heart'));
      hearts.forEach((heart, heartIndex) => {
        const localStorageKey = 'heart' + (sectionIndex * sections.length + heartIndex);

        heart.src = '/img/heartempty.png';
        localStorage.setItem(localStorageKey, 'empty');
      });
    });

    const anyHeartIsRed = Array.from(document.querySelectorAll('.heart')).some((heart) => heart.src.includes('heartred'));

    if (!anyHeartIsRed) {
      removeFavoritesButton.style.display = 'none';
    }
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Sortowanie alfabetyczne
document.addEventListener('DOMContentLoaded', (event) => {
  const azRadio = document.querySelector('#az');
  const zaRadio = document.querySelector('#za');
  const removeSortButton = document.querySelector('#usunalfabetyczne');
  const sections = Array.from(document.querySelectorAll('section'));
  let originalOrder = sections.map(section => Array.from(section.children));

  azRadio.addEventListener('change', () => {
    if (azRadio.checked) {
      sortElementsAlphabetically(true);
      removeSortButton.style.display = 'block';
    }
  });

  zaRadio.addEventListener('change', () => {
    if (zaRadio.checked) {
      sortElementsAlphabetically(false);
      removeSortButton.style.display = 'block';
    }
  });

  removeSortButton.addEventListener('click', () => {
    removeSortButton.style.display = 'none';
    removeAlphabeticalSorting();
    azRadio.checked = false;
    zaRadio.checked = false;
  });
  function sortElementsAlphabetically(ascending) {
    sections.forEach((section) => {
      const elements = Array.from(section.querySelectorAll('a.gra, a.strony'));

      elements.sort((a, b) => {
        const aText = a.querySelector('p.nazwa').textContent.trim().toLowerCase();
        const bText = b.querySelector('p.nazwa').textContent.trim().toLowerCase();

        if (ascending) {
          return aText.localeCompare(bText);
        } else {
          return bText.localeCompare(aText);
        }
      });
      elements.forEach((element) => {
        section.appendChild(element);
      });
    });
  }
  function removeAlphabeticalSorting() {
    sections.forEach((section, index) => {
      originalOrder[index].forEach((element) => {
        section.appendChild(element);
      });
    });
  }
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function() {
  
  function filter() { 
    let results = document.querySelectorAll("[data-filtr]");
    let inputs = document.querySelectorAll(".filtrowanie input:checked");
    let filters = Array.from(inputs, function (input) {
      return input.id; 
    });

    let removeFiltersButton = document.getElementById("usunfiltry");
        
    if (filters.length > 0) {
      results.forEach(function (result) {
        let match = true;
        filters.forEach(function (filter) {
          if (!result.getAttribute("data-filtr").includes(filter)) {
            match = false;
          }
        });
        if (match) {
          result.style.display = "block";
        } else {
          result.style.display = "none";
        }
      });
      removeFiltersButton.style.display = "block";
    } else {
      results.forEach(function (result) {
        result.style.display = "block";
      });
      removeFiltersButton.style.display = "none";
    }
  }

  function removeFilters() {
    let inputs = document.querySelectorAll(".filtrowanie input:checked");
    inputs.forEach(function(input) {
      input.checked = false;
    });
    filter();
  }

  let confirmButton = document.getElementById("confirm");
  let removeFiltersButton = document.getElementById("usunfiltry");

  confirmButton.addEventListener("click", filter);
  removeFiltersButton.addEventListener("click", removeFilters);
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Znajdź elementy .arrow, .filtr, .zakladka, .arrow1 i .arrow2
let arrow = document.querySelector('.arrow');
let filtr = document.querySelector('.filtr');
let zakladka = document.querySelector('.zakladka');
let arrow1 = document.querySelector('.arrow1');
let arrow2 = document.querySelector('.arrow2');

let arrowClicked = false;

// Dodaj nasłuchiwacz zdarzeń kliknięcia do elementu .arrow
arrow.addEventListener('click', function() {
  arrowClicked = !arrowClicked;
  
  if (arrowClicked) {
    // Zmień style dla .filtr i .zakladka
    if (window.innerWidth <= 1125) {
      filtr.style.height = '0%'; // Zmień wysokość na 0%, jeśli szerokość okna jest mniejsza lub równa 1125px
      zakladka.style.width = '100%';
      // Zmień style dla .arrow
      arrow.style.position = 'absolute';
      arrow.style.top = '0';
      arrow.style.left = '50%';
      arrow.style.transform = 'translateX(-50%) rotate(90deg)';
    } else {
      filtr.style.width = '';
      zakladka.style.width = '';
    }
    // Dodaj klasę 'clicked' do .arrow1 i .arrow2
    arrow1.classList.add('clicked');
    arrow2.classList.add('clicked');
  } else {
    // Przywróć pierwotne style dla .filtr i .zakladka
    filtr.style.width = ''; // Zastąp pustym ciągiem, aby przywrócić domyślny styl
    filtr.style.height = ''; // Zastąp pustym ciągiem, aby przywrócić domyślny styl
    zakladka.style.width = ''; // Zastąp pustym ciągiem, aby przywrócić domyślny styl
    // Usuń klasę 'clicked' z .arrow1 i .arrow2
    arrow1.classList.remove('clicked');
    arrow2.classList.remove('clicked');
    // Przywróć pierwotne style dla .arrow
    if (window.innerWidth <= 1125) {
      arrow.style.position = 'absolute';
      arrow.style.top = '0';
      arrow.style.left = '50%';
      arrow.style.transform = 'translateX(-50%) rotate(90deg)';
    } else {
      arrow.style.position = '';
      arrow.style.top = '';
      arrow.style.left = '';
      arrow.style.transform = '';
    }
  }
});

// Dodaj nasłuchiwacz zdarzeń DOMContentLoaded do dokumentu
document.addEventListener('DOMContentLoaded', function() {
  if (window.innerWidth <= 1125) {
    // Zmień style dla .arrow
    arrow.style.position = 'absolute';
    arrow.style.top = '0';
    arrow.style.left = '50%';
    arrow.style.transform = 'translateX(-50%) rotate(90deg)';
    
    // Zmień style dla .filtr i .zakladka
    if (arrowClicked) {
      filtr.style.height = '0%';
      zakladka.style.width = '100%';
    } else {
      filtr.style.height = '';
      zakladka.style.width = '';
    }
  }
});

// Ustaw .zakladka na position: relative;
zakladka.style.position = 'relative';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


