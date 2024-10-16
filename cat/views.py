import logging

import requests

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
        # Создание объекта CatImage
        cat_image = CatImage.objects.create(image=image)

        # Вызов API GenApi
        headers = {
            'Accept': 'application/json',
            'Authorization': f'Bearer {config.API_AI_KEY}',
        }
        url_endpoint = "https://api.gen-api.ru/api/v1/functions/replace-background"

        response = requests.post(
            url_endpoint,
            files={
                'prompt': prompt,  # Передача 'prompt' как текста
                'implementation': 'sdxl-controlnet',  # Передача 'implementation' как текста
                'image': open(cat_image.image.path, 'rb'),  # Передача файла 'image'
            },
            headers=headers
        )
        logging.info(f'Sending request to {url_endpoint} with data: {response}')

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
                        logging.info(f'Output URL: {edited_image_url}')

                        # Сохранение отредактированного изображения
                        response = requests.get(edited_image_url, stream=True)
                        cat_image.image.save(f'edited_{cat_image.id}.jpg', response.raw)
                        # Отображение результата на странице
                        return render(request, 'index.html', {'edited_image': cat_image.image.url, 'error': None})
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


def publish(request, cat_image_id):
    cat_image = CatImage.objects.get(pk=cat_image_id)
    cat_image.is_published = True
    cat_image.save()
    return redirect('gallery')


def gallery(request):
    published_images = CatImage.objects.filter(is_published=True)

    # Отображение галереи
    return render(request, 'gallery.html', {'published_images': published_images})
