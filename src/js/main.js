document.addEventListener('DOMContentLoaded', function () {
  const imageBlock = document.getElementById('imageBlock');
  const fileInput = document.getElementById('fileInput');

  // При клике на блок с картинкой инициируем загрузку файла
  imageBlock.addEventListener('click', function () {
    fileInput.click();
  });

  // Обработчик изменения (выбора файла)
  fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      // Чтение файла как Data URL
      reader.onload = function (event) {
        // Задаем загруженное изображение как фон для блока
        imageBlock.style.backgroundImage = `url(${event.target.result})`;
        imageBlock.textContent = ''; // Убираем текст внутри блока после загрузки
      }

      reader.readAsDataURL(file); // Чтение файла
    }

    testFileTextInputs()
  });


  const nameInput = document.getElementById('nameInput');
  const nameInputBtn = document.getElementById('nameInputBtn');

  // const namePet = document.getElementById('namePet');
  const namePet = document.querySelectorAll('.pet-name');

  const startBlock = document.querySelector('.start');

  let petName = '';

  const testFileTextInputs = function() {
    if (nameInput.value.trim() !== "" && fileInput.files.length > 0) {
      nameInputBtn.disabled = false;
    } else {
      nameInputBtn.disabled = true;
    }
  }

  nameInputBtn.addEventListener('click', function (event) {
    event.preventDefault();
    petName = nameInput.value;
    namePet.forEach(function(item) {
      item.textContent = petName ? petName : '(Имя питомца)';
    })
    if (petName) {
      startBlock.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  })

  nameInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      nameInputBtn.click();
    }
  });

  nameInput.addEventListener('input', function() {
    testFileTextInputs()
  });

  const mainBtn = document.querySelector('.main__btn');
  const photoBlock = document.querySelector('.photo');

  mainBtn.addEventListener('click', function () {
    photoBlock.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });


  const slides = document.querySelectorAll('.slide');
  const nextButtons = document.querySelectorAll('.next-btn');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;

  // Функция для обновления слайдера
  function updateSlider() {
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Обновление активного индикатора
    dots.forEach(dot => dot.classList.remove('test__steps-item_active'));
    dots[currentIndex].classList.add('test__steps-item_active');
  }

  // Обработчик клика по кнопке "Далее" внутри каждого слайда
  nextButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateSlider();
      }
    });

    // Следим за выбором радио-инпутов
    const radios = slides[index].querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        button.disabled = false; // Активируем кнопку "Далее", если выбран радио-инпут
      });
    });
  });
  

  // Обработчик клика по точкам (индикаторам)
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
    });
  });
  const professions = [
    { name: 'Тестировщик', 
      pattern: ['a', 'a', 'c', 'a', 'b', 'a'], 
      text: 'На работе зорко выискивает потенциальные проблемы в продукте и баги в коде, а дома исследует каждый уголок.' },
    { name: 'Мобайл-разработчик', 
      pattern: ['b', 'c', 'b', 'b', 'b', 'b'],
      text: 'На работе изучает новые технологии и пилит приложения, а дома полон энергии и предан хозяину.' },
    { name: 'Фронтенд-разработчик', 
      pattern: ['c', 'c', 'b', 'c', 'b', 'b'],
      text: 'На работе создает юзер-френдли интерфейсы, а дома создает уют и много играет.' },
    { name: 'Бэкенд-разработчик', 
      pattern: ['b', 'b', 'a', 'a', 'a', 'a'],
      text: 'На работе разрабатывает функционал и проводит код-ревью, а дома тихо отдыхает от суеты.' },
    { name: 'Продакт-менеджер', 
      pattern: ['a', 'a', 'a', 'c', 'c', 'a'],
      text: 'На работе договаривается с бизнесом и проводит питчинг, а дома всегда находится рядом и просит ласки.' },
    { name: 'Техподдержка', 
      pattern: ['a', 'b', 'a', 'c', 'a', 'c'],
      text: 'На работе быстро решает проблемы пользователей, а дома жаждет внимания и тактильности.' },
    { name: 'Проджект-менеджер', 
      pattern: ['c', 'a', 'b', 'c', 'c', 'b'],
      text: 'На работе согласовывает сроки и пингует разработчиков, а дома хочет, чтобы от него все отстали.' },
    { name: 'Разработчик 1С', 
      pattern: ['b', 'b', 'c', 'a', 'b', 'a'],
      text: 'На работе разрабатывает функционал и инфраструктуру, а дома расслабленно наблюдает за происходящим вокруг.' },
    { name: 'Аналитик', 
      pattern: ['c', 'b', 'c', 'a', 'a', 'c'],
      text: 'На работе собирает данные и создает модели, а дома предпочитает спать и есть в одно и то же время.' }
  ];
  
  const submitButton = document.getElementById('submitButton');
  const profPetDiv = document.getElementById('profPet');
  const profPetText = document.getElementById('profPetText');
  
  // Функция для подсчета совпадений с шаблоном
  function checkProfession(answers, pattern) {
    let matches = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === pattern[i]) {
        matches++;
      }
    }
    return matches; // Возвращаем количество совпадений
  }
  
  // Функция для выбора случайной профессии
  function getRandomProfession() {
    const randomIndex = Math.floor(Math.random() * professions.length); // Случайный индекс профессии
    return professions[randomIndex];
  }
  
  // Функция для определения профессии
  function calculateProfession(answers) {
    let matchedProfession = null;
    let maxMatches = 0;
  
    // Проверяем количество совпадений для каждой профессии
    for (let profession of professions) {
      const matches = checkProfession(answers, profession.pattern);
      if (matches > maxMatches) { // Ищем профессию с наибольшим количеством совпадений
        maxMatches = matches;
        matchedProfession = profession; // Сохраняем профессию с наибольшим количеством совпадений
      }
    }
  
    // Если есть профессия с наибольшим количеством совпадений, возвращаем её
    return matchedProfession ? matchedProfession : getRandomProfession();
  }
  
  // Обработчик нажатия на кнопку "Узнать результат"
  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (nameInputBtn.hasAttribute('disabled')) {
      photoBlock.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      return
    } else {
      document.querySelector('.result').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      const answers = [];
    
      // Собираем выбранные ответы
      for (let i = 1; i <= 6; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
          answers.push(answer.value); // Добавляем выбранный ответ в массив
        }
      }
    
      // Проверяем, все ли вопросы были отвечены
      if (answers.length === 6) {
        const profession = calculateProfession(answers); // Определяем профессию
        profPetDiv.textContent = profession.name; // Записываем результат в #profPet
        profPetText.textContent = profession.text; // Записываем результат в #profPet// Создаем объект FormData для отправки формы

        sendImage()
      }
    }
  });

  const noPetButton = document.getElementById('noPetBtn');
  const noPetTooltip = document.getElementById('noPetTooltip');
    
    // Определение мобильного устройства
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Для мобильных устройств: показ тултипа по клику
      noPetButton.addEventListener('click', () => {
        noPetTooltip.classList.toggle('visible');
      });

      // Скрытие тултипа, если нажали вне кнопки
      noPetButton.addEventListener('click', (event) => {
        if (!button.contains(event.target)) {
          noPetTooltip.classList.remove('visible');
        }
      });
    } else {
      // Для десктопов: показ тултипа при наведении
      noPetButton.addEventListener('mouseenter', () => {
        noPetTooltip.classList.add('visible');
      });

      noPetButton.addEventListener('mouseleave', () => {
        noPetTooltip.classList.remove('visible');
      });
    }

    const sendImage = function() {
      const form = document.getElementById('postForm');
      const formData = new FormData(form);
      const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
      // const promptText = document.getElementById('promptText');


      // Находим элемент изображения
      const imageElement = document.querySelector('#result__image');

      // Устанавливаем прелоадер как background-image до получения ответа
      imageElement.classList.add('result__image_preloader'); // Замените на путь к вашему файлу прелоадера

      fetch('/asd', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': csrftoken // Добавляем токен в заголовок
        }
      })
      .then(response => response.json())
      .then(data => {
        // Получаем URL изображения из JSON-ответа
        const editedImageUrl = data.edited_image;

        // Обновляем элемент с изображением 
        imageElement.style.backgroundImage = `url(${editedImageUrl})`;
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
    }

    
    const getGallery = function() {
      fetch('/get_public_images/')
        .then(response => response.json())
        .then(data => {
          // Проверяем, что у нас есть изображения
          if (data.images && data.images.length > 0) {
            const galleryContainer = document.getElementById('besties__grid'); // Блок для вставки
    
            // Очищаем блок, если нужно начать с чистого листа
            galleryContainer.innerHTML = '';
    
            // Перебираем все изображения
            data.images.forEach((image, index) => {
              // Если индекс кратен 5 (то есть каждые 5 элементов), создаем новый блок besties__grid-list
              if (index % 5 === 0) {
                const gridList = document.createElement('div');
                gridList.classList.add('besties__grid-list');
                galleryContainer.appendChild(gridList);
              }
    
              // Создаем элемент besties__grid-item
              const gridItem = document.createElement('div');
              gridItem.classList.add('besties__grid-item');
              gridItem.classList.add(`besties__grid-item_${(index % 5) + 1}`); // Присваиваем соответствующий класс от 1 до 5
    
              // Устанавливаем изображение как background-image
              gridItem.style.backgroundImage = `url(${image})`;
    
              // Добавляем элемент в последний блок besties__grid-list
              const lastGridList = document.querySelector('#besties__grid .besties__grid-list:last-child');
              lastGridList.appendChild(gridItem);
            });
          } else {
            console.log('Нет изображений для отображения.');
          }
        })
        .catch(error => {
          console.error('Ошибка:', error);
        });
    };
    
    // Вызываем функцию для получения галереи
    getGallery();
    
})