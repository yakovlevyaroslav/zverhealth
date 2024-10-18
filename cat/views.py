import logging

import requests
from django.http import JsonResponse

from django.shortcuts import redirect, render

import config
from cat.models import CatImage

# Настройка логирования
logging.basicConfig(filename='api_requests.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def index(request):
    if request.method == 'POST':
        # Получение файла изображения
        image = request.FILES.get('image')
        prompt = request.POST.get('prompt')
        name = request.POST.get('name')
        profession = request.POST.get('profession')
        duration = float(request.POST.get('duration'))

        # Проверка duration
        if duration < 5:
            return JsonResponse({'error': 'Невозможно отправить форму.'}, status=403)

        # Вызов API GenApi
        input_ai = {
            "prompt": prompt,
            'implementation': 'sdxl-controlnet',
        }
        headers = {
            'Accept': 'application/json',
            'Authorization': f'Bearer {config.API_AI_KEY}',
        }
        url_endpoint = "https://api.gen-api.ru/api/v1/functions/replace-background"

        logging.info(f'Sending request to {url_endpoint} with data: {input_ai}')

        response = requests.post(
            url_endpoint,
            files={
                'prompt': (None, input_ai['prompt']),  # Передача 'prompt' как текста
                'implementation': (None, input_ai['implementation']),  # Передача 'implementation' как текста
                'image': image,  # Передача файла 'image'
            },
            headers=headers
        )

        print(response.json())

        # Обработка ответа API GenApi
        if response.status_code == 200:
            request_id = response.json()['request_id']
            logging.info(f'Request ID: {request_id}')

            # Ожидание завершения обработки
            while True:
                get_url = f"https://api.gen-api.ru/api/v1/request/get/{request_id}"
                logging.info(f'Getting status from: {get_url}')
                get_response = requests.get(get_url, headers=headers)
                if get_response.status_code == 200:
                    status = get_response.json()['status']
                    logging.info(f'Status: {status}')
                    if status == 'success':
                        edited_image_url = get_response.json()['result'][0]
                        print(edited_image_url)
                        logging.info(f'Output URL: {edited_image_url}')

                        # Сохранение отредактированного изображения
                        response = requests.get(edited_image_url, stream=True)
                        cat_image = CatImage.objects.create(name=name, profession=profession)
                        cat_image.image.save(f'edited_{cat_image.id}.jpg', response.raw)
                        print(f'Сохранено: {cat_image.image.url}')
                        # Отображение результата на странице
                        return JsonResponse({'edited_image': cat_image.image.url})
                    elif status == 'error':
                        # Обработка ошибки API
                        logging.error(f'Error processing image: {get_response.json()}')
                        return render(request, 'index.html', {'error': 'Ошибка обработки изображения'})
                else:
                    # Ошибка при получении статуса
                    logging.error(f'Error getting status: {get_response.status_code}')
                    return render(request, 'index.html', {'error': 'Ошибка получения статуса'})
        else:
            # Обработка ошибки
            logging.error(f'Error sending request: {response.status_code}')
            return render(request, 'index.html', {'error': 'Ошибка обработки изображения'})

    # Отображение страницы загрузки
    return render(request, 'index.html')


def get_public_images(request):
    """Эндпоинт для вывода последних 20 публичных картинок с информацией о них."""
    images = CatImage.objects.filter(is_public=True).order_by('-id')[:20]
    image_data = []
    for image in images:
        image_data.append({
            'url': image.image.url,
            'name': image.name,
            'profession': image.profession
        })

    return JsonResponse({'images': image_data})
