# Как загрузить резюме на GitHub и включить автоматическую публикацию

Сайт и сценарий GitHub Actions уже готовы. На GitHub нужно загрузить **исходный проект**, затем включить Pages.

## 1. Создай новый репозиторий

1. Открой [github.com/new](https://github.com/new) и войди в свой аккаунт.
2. В **Repository name** введи `resume-react`.
3. Выбери **Public**.
4. Не добавляй README, `.gitignore` и лицензию через эту форму — новый репозиторий должен быть пустым, необходимые файлы уже есть в проекте.
5. Нажми **Create repository**.
6. Скопируй HTTPS-адрес репозитория. Например: `https://github.com/IsagiYoichiEgo/resume-react.git`.

Можно выбрать другое название. Сценарий сам определит путь GitHub Pages.

## 2. Загрузи проект

Нужен [Git для Windows](https://git-scm.com/downloads/win). После установки перезапусти VS Code, чтобы терминал увидел Git.

Распакуй архив, открой **папку `resume-react`** в VS Code и выбери **Terminal → New Terminal**. Проверь, что здесь находится `package.json`. Не загружай папку `outputs` целиком.

Выполни команды по очереди. В строке `git remote add` подставь HTTPS-адрес **своего нового репозитория**:

```powershell
git init -b main
git add .
git commit -m "Create React TypeScript resume with automatic deployment"
git remote add origin https://github.com/IsagiYoichiEgo/resume-react.git
git push -u origin main
```

При первом отправлении Git может предложить авторизацию в браузере — войди в свой GitHub-аккаунт.

Если Git сообщает `Author identity unknown`, укажи своё имя и email **для этого проекта**, затем повтори `git commit` и `git push`:

```powershell
git config user.name "Твоё имя"
git config user.email "Твой email из GitHub"
```

После загрузки в корне репозитория должны быть видны `src`, `public`, `.github`, `package.json` и `package-lock.json`. Папки `node_modules` и `dist` загружать не нужно: они исключены через `.gitignore`. Папка `.github` обязательно должна попасть в репозиторий.

## 3. Включи GitHub Pages

1. В своём репозитории открой вкладку **Settings**.
2. Слева нажми **Pages**.
3. В разделе **Build and deployment** найди **Source**.
4. Выбери **GitHub Actions**.

Не выбирай **Deploy from a branch**: это задание использует автоматическую сборку через Actions.

## 4. Запусти публикацию

Первая сборка могла начаться сразу после `git push`, ещё до включения Pages. Если она завершилась ошибкой, это исправляется после шага 3:

1. Открой вкладку **Actions** в репозитории.
2. Слева выбери **Build and deploy resume**.
3. Нажми **Run workflow**.
4. Выбери ветку **main** и нажми зелёную кнопку **Run workflow**.
5. Открой появившийся запуск и дождись зелёных отметок у заданий **build** и **deploy**.

Если кнопки Run workflow не видно, обнови страницу после загрузки проекта. Можно также открыть неудачный запуск и выбрать **Re-run all jobs**.

## 5. Открой сайт

В **Settings → Pages** появится адрес опубликованного сайта. Он также будет в успешном задании **deploy**.

Для аккаунта `IsagiYoichiEgo` и репозитория `resume-react` ожидаемый адрес:

**https://IsagiYoichiEgo.github.io/resume-react/**

Если название репозитория или аккаунт отличаются, используй адрес из Pages. После первой публикации обновление страницы может появиться с небольшой задержкой.

## 6. Как обновлять сайт

Измени нужные файлы и выполни в папке проекта:

```powershell
git add .
git commit -m "Update resume"
git push
```

Каждый `push` в **main** автоматически запускает сборку и публикацию. Нажимать Run workflow при обычных обновлениях не нужно.

## Как устроена автоматизация

```text
Изменения → git push в main → GitHub Actions
                              ↓
                          npm ci
                              ↓
                    TypeScript + Vite build
                              ↓
                        артефакт dist
                              ↓
                        GitHub Pages
```

`package-lock.json` фиксирует версии зависимостей, чтобы локальная сборка и сервер GitHub использовали одинаковые пакеты. `BASE_PATH` передаёт в Vite фактический путь сайта, поэтому JavaScript, CSS и favicon работают и по адресу `/resume-react/`, и для репозитория вида `USERNAME.github.io`.

## Если что-то не получилось

| Что видно | Что сделать |
| --- | --- |
| `npm` или `git` не распознаётся | Установи Node.js или Git, затем перезапусти VS Code. |
| `npm.ps1` заблокирован | Используй `npm.cmd` вместо `npm`. |
| Нет workflow во вкладке Actions | Проверь, что файл лежит именно в `.github/workflows/deploy.yml` в корне репозитория. |
| Ошибка на Configure GitHub Pages | Выбери Settings → Pages → Source → GitHub Actions, затем запусти workflow повторно. |
| Ошибка на `npm ci` | Проверь, что `package-lock.json` загружен. Если менял зависимости, запусти локально `npm install` и загрузи обновлённые `package.json` и `package-lock.json`. |
| Workflow не запускается после push | Проверь имя ветки: в этом сценарии используется `main`. |
| Ошибка проверки TypeScript | Открой шаг Check TypeScript and build — там будут имя файла и строка, которые нужно исправить. |
| Зелёная сборка, но 404 | Дождись успешного задания deploy и открой точный адрес из Settings → Pages. |
| Сайт показывает старую версию | Дождись последнего успешного deploy, затем нажми Ctrl+F5. |

## Что показать преподавателю

- Ссылку на репозиторий с исходниками React и TypeScript.
- Файл `.github/workflows/deploy.yml`.
- Успешный запуск во вкладке **Actions**, где есть build и deploy.
- Работающий сайт по ссылке GitHub Pages.
- Для демонстрации автоматизации: измени строку в резюме, сделай commit и push, дождись нового запуска Actions и обнови сайт.

Официальная документация: [GitHub Pages и собственные workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [публикация Vite на GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages).
