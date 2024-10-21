import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail'

document.addEventListener('DOMContentLoaded', function () {

  const shareBtnsGenerator = function(petProfession, imageLink) {
    document.getElementById('shareButton').classList.remove('result__share-btn_unactivate')

    const shareButtonTg = document.getElementById('telegramShare');
    const shareButtonVk = document.getElementById('vkShare');
    const shareCopyText = document.getElementById('copyTextShare');

    const shareText = `Хоть%20у%20него%20и%20лапки,%20но%20мой%20питомец%20${petProfession}!%20(${window.location.origin + imageLink})%20А%20кем%20бы%20мог%20работать%20твой?%20Пройди%20тест%20и%20узнай%20тут%20->%20${window.location.origin}`;
    const shareTgText = `Хоть%20у%20него%20и%20лапки,%20но%20мой%20питомец%20${petProfession}!%20А%20кем%20бы%20мог%20работать%20твой?%20Пройди%20тест%20и%20узнай%20тут%20->%20${window.location.origin}`;
    const shareTextForCopy = `Хоть у него и лапки, но мой питомец ${petProfession}! (${window.location.origin + imageLink}) А кем бы мог работать твой? Пройди тест и узнай тут -> ${window.location.origin}`;

    const telegramShareUrl = `https://t.me/share/url?url=${window.location.origin + imageLink}&text=${shareTgText}`;
    const vkShareUrl = `https://vk.com/share.php?url=${window.location.origin}&title=Кто%20твой%20питомец%20в%20IT?&description=${shareText}&image${window.location.origin + imageLink}`;

    shareButtonTg.href = telegramShareUrl;
    shareButtonVk.href = vkShareUrl;

    shareCopyText.addEventListener('click', function() {
      navigator.clipboard.writeText(shareTextForCopy)
        .then(() => {
          copyTextShare.classList.add('result__share-item_copy-done');
          setTimeout(function() {
            copyTextShare.classList.remove('result__share-item_copy-done');
          }, 3500);
        })
        .catch(err => {
          console.error('Ошибка при копировании текста: ', err);
        });
    });
    
  }

  let openingTime
  const handleFirstScroll = () => {
    // Ваше действие при первом скролле
    openingTime = new Date();

    // Удаляем обработчик события после первого срабатывания
    window.removeEventListener('scroll', handleFirstScroll);
  };
  window.addEventListener('scroll', handleFirstScroll);


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

  const testFileTextInputs = function () {
    if (nameInput.value.trim() !== "" && fileInput.files.length > 0) {
      nameInputBtn.disabled = false;
      // document.querySelector('.start__title').textContent = 'Отлично, можем начинать!'
      // document.querySelector('.start').classList.remove('start_pe-none')
    } else {
      nameInputBtn.disabled = true;
      document.querySelector('.start__title').textContent = 'Сперва добавь изображение и напиши имя питомца!'
      document.querySelector('.start').classList.add('start_pe-none')
    }
  }

  nameInputBtn.addEventListener('click', function (event) {
    event.preventDefault();

    document.querySelector('.start__title').textContent = 'Отлично, можем начинать!'
    document.querySelector('.start').classList.remove('start_pe-none')

    petName = nameInput.value;
    namePet.forEach(function (item) {
      item.textContent = petName ? petName : '';
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

  nameInput.addEventListener('input', function () {
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
  const professions = [{
      name: 'Тестировщик',
      pattern: ['a', 'a', 'c', 'a', 'b', 'a'],
      text: 'На работе зорко выискивает потенциальные проблемы в продукте и баги в коде, а дома исследует каждый уголок.',
      prompt: 'Replace the background with an image of a modern office with multiple computers on desks. The screens should display software testing tools. The environment should be calm and neat, with a minimalist office design.'
    },
    {
      name: 'Мобайл-разработчик',
      pattern: ['b', 'c', 'b', 'b', 'b', 'b'],
      text: 'На работе изучает новые технологии и пилит приложения, а дома полон энергии и предан хозяину.',
      prompt: 'Replace the background with an image of an office space with mobile devices on the desks. The screens should show mobile apps in development. The environment is modern and tech-focused, with many screens and gadgets around.'
    },
    {
      name: 'Фронтенд-разработчик',
      pattern: ['c', 'c', 'b', 'c', 'b', 'b'],
      text: 'На работе создает юзер-френдли интерфейсы, а дома создает уют и много играет.',
      prompt: 'Replace the background with an office image showing large monitors displaying browsers with websites under development. The screens should show HTML code and UI design elements. The office should look modern and vibrant, with creative elements.'
    },
    {
      name: 'Бэкенд-разработчик',
      pattern: ['b', 'b', 'a', 'a', 'a', 'a'],
      text: 'На работе разрабатывает функционал и проводит код-ревью, а дома тихо отдыхает от суеты.',
      prompt: 'Replace the background with an office with servers and monitors displaying code in programming languages such as Python or Java. In the background, system architecture diagrams and databases should be visible. The office should look professional and tech-focused.'
    },
    {
      name: 'Продакт-менеджер',
      pattern: ['a', 'a', 'a', 'c', 'c', 'a'],
      text: 'На работе договаривается с бизнесом и проводит питчинг, а дома всегда находится рядом и просит ласки.',
      prompt: 'Replace the background with a view of a business class office with large windows overlooking a modern city. Laptops should be on the desks, and the screens should display project planning and charts. The environment should look spacious and bright.'
    },
    {
      name: 'Техподдержка',
      pattern: ['a', 'b', 'a', 'c', 'a', 'c'],
      text: 'На работе быстро решает проблемы пользователей, а дома жаждет внимания и тактильности.',
      prompt: 'Replace the background with an office showing multiple workstations equipped with computers running user support software. Screens should display chat windows and ticketing systems. The office should look active and dynamic.'
    },
    {
      name: 'Проджект-менеджер',
      pattern: ['c', 'a', 'b', 'c', 'c', 'b'],
      text: 'На работе согласовывает сроки и пингует разработчиков, а дома хочет, чтобы от него все отстали.',
      prompt: 'Replace the background with a spacious office with project planning boards and charts on the walls. Laptops should be on the desks, and the screens should display project roadmaps and task completion graphs. The office should look like a project management hub.'
    },
    {
      name: 'Разработчик 1С',
      pattern: ['b', 'b', 'c', 'a', 'b', 'a'],
      text: 'На работе разрабатывает функционал и инфраструктуру, а дома расслабленно наблюдает за происходящим вокруг.',
      prompt: 'Replace the background with a modern office with computers displaying 1C software. The office should have shelves with documentation and work materials. The environment should be calm and professional, reflecting the work of a 1C developer.'
    },
    {
      name: 'Аналитик',
      pattern: ['c', 'b', 'c', 'a', 'a', 'c'],
      text: 'На работе собирает данные и создает модели, а дома предпочитает спать и есть в одно и то же время.',
      prompt: 'Replace the background with an office showing monitors displaying analytics dashboards and data graphs. The screens should show charts, tables, and data analysis tools. The office should look professional and technologically equipped.'
    }
  ];

  const submitButton = document.getElementById('submitButton');
  const profPetDiv = document.getElementById('profPet');
  const profPetText = document.getElementById('profPetText');
  const promptText = document.getElementById('promptText');

  const nameInputFinal = document.getElementById('nameInputFinal');
  const nameProfessionFinal = document.getElementById('nameProfessionFinal');
  const durationInputFinal = document.getElementById('durationInputFinal');

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

    const finalTime = timeDuration(openingTime, new Date())
    durationInputFinal.value = finalTime;


    const form = document.getElementById('postForm');
    const file = form.querySelector('#fileInput');
    const answers = [];

    // Проверяем, можно ли отправлять форму
    const cookieExpiration = getCookieExpirationTime("formAccessDenied");

    if (file.value === '') {
      photoBlock.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      return
    } else {

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
        promptText.value = profession.prompt;

        nameInputFinal.value = nameInput.value
        nameProfessionFinal.value = profession.name

        if (cookieExpiration) {
          // Выводим сообщение с оставшимся временем с помощью alert
          alert(`Форма недоступна. Попробуйте снова через 12 часов.`);
          // Блокируем кнопку отправки
          submitButton.disabled = true;
        } else {
          sendImage()
        }
      }
    }
  });

  const sendImage = function () {
    const form = document.getElementById('postForm');
    const formData = new FormData(form);
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  
    // Находим элемент изображения
    const resultBlock = document.querySelector('.result');
    const resultImage = document.querySelector('#result__image');
    const resultImageLink = resultImage.querySelector('.result__image-link');
    const resultImagePicture = resultImage.querySelector('.result__image-picture');
  
    const messageForm = document.getElementById('messageForm');
  
    // Устанавливаем прелоадер как background-image до получения ответа
    resultImageLink.classList.remove('result__image-link_starter');
    resultImageLink.classList.add('result__image-link_preloader');
  
    resultBlock.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  
    fetch('/', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': csrftoken // Добавляем токен в заголовок
        }
      })
      .then(response => {
        if (!response.ok) {
          // Если статус ответа не в диапазоне 200–299, обрабатываем как ошибку
          throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        // Получаем URL изображения из JSON-ответа
        const editedImageUrl = data.edited_image;
  
        // Обновляем элемент с изображением 
        resultImageLink.classList.remove('result__image-link_preloader');
        resultImageLink.setAttribute('href', window.location.origin + editedImageUrl);
        resultImagePicture.setAttribute('src', window.location.origin + editedImageUrl);
  
        resultImagePicture.classList.remove('result__image-picture_hidden');
  
        const lightGalleryResultElement = document.getElementById('result__image');
        // Инициализация Lightgallery с опциями
        lightGallery(lightGalleryResultElement, {
          plugins: [lgThumbnail], // Подключаем плагины
          speed: 500, // Скорость анимации
          mobileSettings: {
            download: true,
          }
        });
  
        shareBtnsGenerator(nameProfessionFinal.value, data.edited_image);
  
        // Установка куки на 12 часов после успешной отправки
        if (getCookie('formAccess') === 'attention') {
          setCookie("formAccessDenied", "real_blocked", 12);
        } else {
          setCookie("formAccess", "attention", 12);
        }
      })
      .catch(error => {
        // Обрабатываем ошибки (включая ошибки 400 и другие)
        console.error('Ошибка:', error);
        resultImageLink.classList.remove('result__image-link_preloader');
        resultImageLink.classList.add('result__image-link_error');
        resultImagePicture.classList.add('result__image-picture_hidden');
  
        messageForm.textContent = 'Ошибка при отправке формы, перезагрузите страницу и попробуйте еще раз позже.';
        messageForm.classList.add('form__message_error');
      });
  }

  const shareButton = document.getElementById('shareButton');
  const shareResult = document.querySelector('.result__share-list')
  if (shareButton) {
    shareButton.addEventListener('click', () => {
      shareResult.classList.toggle('result__share-list_visible');
    });

    shareButton.addEventListener('click', (event) => {
      if (!shareButton.contains(event.target)) {
        shareResult.classList.toggle('result__share-list_visible');
      }
    });
  }

  const noPetButton = document.getElementById('noPetButton');
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
      if (!noPetButton.contains(event.target)) {
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

  const getGallery = function () {
    fetch('/get_public_images/') // Укажите правильный URL для получения данных
      .then(response => response.json())
      .then(data => {

        if (data.images && data.images.length > 0) {
          // data.images - это массив объектов с URL изображений
          const images = data.images;


          // Получаем контейнер, куда будем добавлять новые элементы
          const gridList = document.getElementById('besties__grid-list');

          // Очищаем контейнер перед добавлением новых элементов (если это нужно)
          gridList.innerHTML = '';

          // Перебираем изображения и создаем элементы
          images.forEach((imageData, index) => {
            // Создаем новый элемент "a" с классами и атрибутами
            const anchor = document.createElement('a');
            anchor.classList.add('besties__grid-item', `besties__grid-item_${index + 1}`);
            anchor.href = window.location.origin + imageData.url; // Устанавливаем ссылку на изображение

            // Создаем новый элемент "img" и добавляем его в ссылку
            const img = document.createElement('img');
            img.classList.add('besties__grid-image');
            img.src = window.location.origin + imageData.url; // Устанавливаем src изображения
            img.alt = `${imageData.name}: ${imageData.profession}`; // Устанавливаем alt для изображения

            // Вставляем изображение внутрь ссылки
            anchor.appendChild(img);

            // Вставляем ссылку внутрь контейнера grid-list
            gridList.appendChild(anchor);
          });
          const lightGalleryElement = document.getElementById('besties__grid-list');
          // Инициализация Lightgallery с опциями
          lightGallery(lightGalleryElement, {
            plugins: [lgThumbnail], // Подключаем плагины
            speed: 500, // Скорость анимации
            mobileSettings: {
              download: true,
            }
          });
        } else {
          console.log('Нет изображений для отображения.');
        }
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  };

  // Вызываем функцию для получения галереи изображений
  getGallery();

  const timeDuration = function (time_start, time_end) {
    return ((time_end - time_start) / 1000);
  }



  // Установка куки с временем истечения
function setCookie(name, value, hours) {
  const date = new Date();
  date.setTime(date.getTime() + (hours * 60 * 60 * 1000)); // Устанавливаем время истечения
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Получение значения куки
function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// Проверка оставшегося времени действия куки
function getCookieExpirationTime(cookieName) {
  const cookieValue = getCookie(cookieName);
  if (!cookieValue) {
    return null;
  }
  
  // Получаем дату истечения куки
  const expirationTime = new Date(document.cookie.split('expires=')[1]);
  const currentTime = new Date();
  
  // Вычисляем разницу во времени
  const timeDifference = expirationTime - currentTime;
  
  if (timeDifference <= 0) {
    return null; // Кука уже истекла
  }

  const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  
  return { hours: hoursLeft, minutes: minutesLeft };
}


})