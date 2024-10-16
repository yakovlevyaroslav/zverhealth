run:
	npm run build
	python3 manage.py collectstatic
	python3 manage.py migrate