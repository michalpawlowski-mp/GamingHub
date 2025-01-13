
document.addEventListener('DOMContentLoaded', function() {
  
  let sekcjaGry = document.querySelector('.gry');
  let sekcjaAktualnosci = document.querySelector('.aktualnosci');
  let sekcjaSklepy = document.querySelector('.sklepy');
  let divSortGry = document.querySelector('#sortowanieGry');
  let divSortAkt = document.querySelector('#sortowanieAkt');
  let divSortInne = document.querySelector('#sortowanieInne');
  let divSortStr = document.querySelector('#sortowanieStrony');
  let links = document.querySelectorAll('a');

  links.forEach(function(link) {
    link.addEventListener('click', function(e) {

      let sectionId = this.getAttribute('href').substring(1);

      if (this.getAttribute('href').startsWith('http')) {
        e.preventDefault();
        window.open(this.getAttribute('href'));
        return;
      }

      let allSections = document.querySelectorAll('section');
      allSections.forEach(function(sec) {
        sec.style.display = 'none';
      });

      divSortGry.style.display = 'none';
      divSortAkt.style.display = 'none';
      divSortInne.style.display = 'none';
      divSortStr.style.display = 'none';

      if (sectionId === 'gry') {
        sekcjaGry.style.display = 'flex';
        divSortGry.style.display = 'block';
      } else if (sectionId === 'aktualnosci') {
        sekcjaAktualnosci.style.display = 'flex';
        divSortAkt.style.display = 'block';
      } else if (sectionId === 'inne') {
        sekcjaSklepy.style.display = 'flex';
        divSortInne.style.display = 'block';
      } else {
        let section = document.querySelector('#' + sectionId + '.lista');
        if (section) {
          section.style.display = 'flex';
          divSortStr.style.display = 'block';
        }
      }
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
if (window.innerWidth < 1315) {
  filtrowanieDiv.style.display = "none";
  zatwierdzanieDiv.style.display = "none";
  filtrDiv.style.height = "10%";
  wyszukiwanieDiv.style.height = "100%";
}

const toggleVisibility = () => {
  if (window.innerWidth < 1315) {
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
  if (window.innerWidth < 1315) {
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




let searchInput = document.querySelector('#search');

searchInput.addEventListener('input', function() {

  let phrase = removeDiacritics(this.value.toLowerCase());

  let sections = ['.gry', '.aktualnosci', '.sklepy', '.lista'];

  sections.forEach(function(sectionClass) {
    let sectionElements = document.querySelectorAll(sectionClass);

    sectionElements.forEach(function(section) {
      let parentElements = section.querySelectorAll('div:has(p.nazwa), a:has(p.nazwa)');

      parentElements.forEach(function(parent) {

        let p = parent.querySelector('p.nazwa');
        if (removeDiacritics(p.textContent.toLowerCase()).includes(phrase)) {

          parent.style.display = '';
        } else {

          parent.style.display = 'none';
        }
      });
    });
  });
});

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
    const hearts = Array.from(section.querySelectorAll('.heart'));-+

    hearts.forEach((heart, heartIndex) => {
      const localStorageKey = 'heart' + (sectionIndex * sections.length + heartIndex);

      if (localStorage.getItem(localStorageKey) === 'red') {
        heart.src = '/img/heartred.png';
      } else {
        heart.src = './img/heartempty.png';
      }

      heart.addEventListener('click', (event) => {
        event.preventDefault(); 
        event.stopPropagation(); 

        if (heart.src.includes('heartempty')) {
          heart.src = '/img/heartred.png';
          localStorage.setItem(localStorageKey, 'red');
        } else {
          heart.src = './img/heartempty.png';
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
      // Użyj oryginalnego porządku jako kryterium sortowania, gdy stany serc są takie same
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

/*
document.addEventListener('DOMContentLoaded', () => {
  const removeFavoritesButton = document.querySelector('#usunulubione');
  const sections = Array.from(document.querySelectorAll('section'));

  const updateButtonDisplay = () => {
    const anyHeartIsRed = Array.from(document.querySelectorAll('.heart')).some((heart) => heart.src.includes('heartred'));
    removeFavoritesButton.style.display = anyHeartIsRed ? 'block' : 'none';
  };

  updateButtonDisplay();

  sections.forEach((section) => {
    const hearts = Array.from(section.querySelectorAll('.heart'));

    hearts.forEach((heart) => {
      const observer = new MutationObserver(() => {
        updateButtonDisplay();
        if (!Array.from(document.querySelectorAll('.heart')).some((heart) => heart.src.includes('heartred'))) {
          sortDivs(section);
        }
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

        heart.src = './img/heartempty.png';
        localStorage.setItem(localStorageKey, 'empty');
      });
    });

    updateButtonDisplay();
  });
});*/


document.addEventListener('DOMContentLoaded', () => {
  const removeFavoritesButton = document.querySelector('#usunulubione');
  const removeSortButton = document.querySelector('#usunalfabetyczne');
  const azRadio = document.querySelector('#az');
  const zaRadio = document.querySelector('#za');
  const sections = Array.from(document.querySelectorAll('section'));
  let originalOrder = sections.map(section => Array.from(section.children));

  const updateButtonDisplay = () => {
    const anyHeartIsRed = Array.from(document.querySelectorAll('.heart')).some((heart) => heart.src.includes('heartred'));
    removeFavoritesButton.style.display = anyHeartIsRed ? 'block' : 'none';
  };

  updateButtonDisplay();

  sections.forEach((section) => {
    const hearts = Array.from(section.querySelectorAll('.heart'));

    hearts.forEach((heart) => {
      const observer = new MutationObserver(() => {
        updateButtonDisplay();
        if (!Array.from(document.querySelectorAll('.heart')).some((heart) => heart.src.includes('heartred'))) {
          sortDivs(section);
        }
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

        heart.src = './img/heartempty.png';
        localStorage.setItem(localStorageKey, 'empty');
      });
    });

    updateButtonDisplay();
  });

  const radios = [azRadio, zaRadio];
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        removeSortButton.style.display = 'block';
      }
    });
  });
  removeSortButton.addEventListener('click', () => {
    removeAlphabeticalSorting();
    radios.forEach(radio => radio.checked = false);
    removeSortButton.style.display = 'none';
  });

  function removeAlphabeticalSorting() {
    sections.forEach((section, index) => {
      while (section.firstChild) {
        section.removeChild(section.firstChild);
      }
      originalOrder[index].forEach((element) => {
        section.appendChild(element);
      });
    });
  }

  function removeFilters() {
    let inputs = document.querySelectorAll(".filtrowanie input:checked");
    inputs.forEach(function(input) {
      input.checked = false;
    });
    let removeFiltersButton = document.getElementById("usunfiltry");
    removeFiltersButton.style.display = "none";
    // Wywołujemy zdarzenie kliknięcia na przycisku potwierdzenia
    let confirmButton = document.getElementById("confirm");
    confirmButton.click();
  }

  let removeFiltersButton = document.getElementById("usunfiltry");
  removeFiltersButton.addEventListener("click", removeFilters);

  let confirmButton = document.getElementById("confirm");
  confirmButton.addEventListener("click", function() {
    let inputs = document.querySelectorAll(".filtrowanie input:checked");
    if (inputs.length > 0) {
      removeFiltersButton.style.display = "block";
    }
  });
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  const azRadio = document.querySelector('#az');
  const zaRadio = document.querySelector('#za');
  const sections = Array.from(document.querySelectorAll('section'));

  azRadio.addEventListener('change', () => {
    if (azRadio.checked) {
      sortElementsAlphabetically(true);
    }
  });

  zaRadio.addEventListener('change', () => {
    if (zaRadio.checked) {
      sortElementsAlphabetically(false);
    }
  });

  function sortElementsAlphabetically(ascending) {
    sections.forEach((section) => {
      const elements = Array.from(section.querySelectorAll('a.gra, a.strony, a.strona-gry'));

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
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
document.addEventListener('DOMContentLoaded', () => {
  const removeSortButton = document.querySelector('#usunalfabetyczne');
  const azRadio = document.querySelector('#az');
  const zaRadio = document.querySelector('#za');
  const sections = Array.from(document.querySelectorAll('section'));
  let originalOrder = sections.map(section => Array.from(section.children));

  const radios = [azRadio, zaRadio];
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        removeSortButton.style.display = 'block';
      }
    });
  });
  removeSortButton.addEventListener('click', () => {
    removeAlphabeticalSorting();
    radios.forEach(radio => radio.checked = false);
    removeSortButton.style.display = 'none';
  });

  function removeAlphabeticalSorting() {
    sections.forEach((section, index) => {
      while (section.firstChild) {
        section.removeChild(section.firstChild);
      }
      originalOrder[index].forEach((element) => {
        section.appendChild(element);
      });
    });
  }
});*/






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
    } else {
      results.forEach(function (result) {
        result.style.display = "block";
      });
    }
  }

  let confirmButton = document.getElementById("confirm");
  confirmButton.addEventListener("click", filter);
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
document.addEventListener("DOMContentLoaded", function() {
  
  function removeFilters() {
    let inputs = document.querySelectorAll(".filtrowanie input:checked");
    inputs.forEach(function(input) {
      input.checked = false;
    });
    let removeFiltersButton = document.getElementById("usunfiltry");
    removeFiltersButton.style.display = "none";
    // Wywołujemy zdarzenie kliknięcia na przycisku potwierdzenia
    let confirmButton = document.getElementById("confirm");
    confirmButton.click();
  }

  let removeFiltersButton = document.getElementById("usunfiltry");
  removeFiltersButton.addEventListener("click", removeFilters);

  let confirmButton = document.getElementById("confirm");
  confirmButton.addEventListener("click", function() {
    let inputs = document.querySelectorAll(".filtrowanie input:checked");
    if (inputs.length > 0) {
      removeFiltersButton.style.display = "block";
    }
  });
});*/



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let arrow = document.querySelector('.arrow');
let filtr = document.querySelector('.filtr');
let zakladka = document.querySelector('.zakladka');
let arrow1 = document.querySelector('.arrow1');
let arrow2 = document.querySelector('.arrow2');
let arrowClicked = false;

arrow.addEventListener('click', function() {
  arrowClicked = !arrowClicked;
  
  if (arrowClicked) {
    filtr.style.display = 'none'; 
    zakladka.style.display = 'flex'; 
    zakladka.style.width = '100%'; 
    zakladka.style.height = '100%'; 
    updateArrowStyle();
    arrow1.classList.add('clicked');
    arrow2.classList.add('clicked');
  } else {
    filtr.style.display = ''; 
    zakladka.style.display = ''; 
    zakladka.style.width = '';
    zakladka.style.height = ''; 
    arrow1.classList.remove('clicked');
    arrow2.classList.remove('clicked');
    updateArrowStyle();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  updateArrowStyle();
  
  if (arrowClicked) {
    filtr.style.display = 'none';
    zakladka.style.display = 'flex';
    zakladka.style.width = '100%';
    zakladka.style.height = '100%';
  } else {
    filtr.style.display = '';
    zakladka.style.display = '';
    zakladka.style.width = '';
    zakladka.style.height = '';
  }
});

window.addEventListener('resize', function() {
  updateArrowStyle();
});
zakladka.style.position = 'relative';

function updateArrowStyle() {
  if (window.innerWidth <= 1315) {
    arrow.style.position = 'absolute';
    arrow.style.top = '0';
    arrow.style.left = '50%';
    arrow.style.transform = 'translateX(-50%) rotate(90deg)';
  } else {
    arrow.style.position = 'absolute';
    arrow.style.top = '50%';
    arrow.style.left = '0';
    arrow.style.transform = 'translateY(-50%)';
  }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

