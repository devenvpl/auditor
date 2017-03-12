# AUDITOR

## HOW TO RUN - API

```
$: cd api
$: composer install && php bin/console server:run
```

## HOW TO RUN - WEBAUI

```
$: cd webui

; requirements
$: npm install gulp -g
$: npm install browserify -g

; run
$: npm install && gulp dist && gulp serve
```