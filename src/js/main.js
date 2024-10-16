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
  submitButton.addEventListener('click', () => {
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
        
        const formData = new FormData();
    
        // Добавляем файл
        const file = fileInput.files[0];
        if (file) {
          formData.append('file', file);
        } else {
          console.error('Файл не выбран');
          return; // Прерываем выполнение, если файл не выбран
        }
    
        // Добавляем профессию питомца
        formData.append('profession', profession.name);
    
        // Отправляем POST-запрос
        fetch('/your-endpoint-url', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          console.log('Успешная отправка:', data);
        })
        .catch(error => {
          console.error('Ошибка отправки:', error);
        });
    
      } else {
        profPetDiv.textContent = 'Пожалуйста, ответьте на все вопросы'; // Сообщение, если не все вопросы отвечены
      }
    }
  });
})