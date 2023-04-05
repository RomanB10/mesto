# Проектная работа учебного курса Яндекс.Практикум: "Mesto" (спринт 5-9).
->[Сайт](https://romanb10.github.io/mesto/index.html)<-

### Обзор

* Интро
* Функциональность
* Ссылка на сайт
* Стэк
* Применяемые технологии
* Статус выполнения проекта
* Screenshot

**Интро**
* <p align="left"> Адаптивный одностраничный сайт о различных локациях с возможностью актуализации контента,созданный по макету графического редактора Figma.<a href="https://www.figma.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="20" height="20"/> </a></p>
* Сервис позволяет добалять и редактировать данные профиля, загружать карточки с фотогрфиями любимых мест в неограниченном количестве, отмечать понравившиеся лайком, а также удалять уже поднадоевшие.

**Функциональность**
  - Реализовано три диалоговых окна (PopUp)
      - Редактирование имени и информации о себе, вызывается нажатием на кнопку (необходимо заполнить поле «Имя» и «О себе»)
      - Форма добавления карточки, вызывается нажатием на кнопку «+»(необходимо заполнить поле «Название» и добавить ссылку на картинку в поле «Ссылка на картинку»)
      - Открытие попапа с картинкой, вызывается нажатием на картинку
      - Обновление аватара пользователя, вызывается нажатием на иконку редактирования при наведении курсора на сам аватар ( необходимо добавить ссылку на аватар в поле «Ссылка на картинку»)
  - Плавное открытие и закрытие попапов
  - Реализована возможность закрытия попапов кликом на темный фон и нажатием на клавишу Esc.
  - При переполнении блоков текстовым содержимым,проставляется многоточие и текст обрезается
  - Реализована возможность установки лайков карточкам (можно лайкнуть любую карточку)
  - Отображение количества лайков карточки (на каждой карточке написано, сколько у неё лайков)
  - Реализована возможность удаления карточек(если карточка создана не вами, на ней нет иконки удаления,также перед удалением высчечивается попап подтверждения удаления)
  - Реализовано подключение проекта к серверу
      - Информация о пользователе подгружаться с сервера
      - Начальные карточки подгружаться с сервера
      - Отредактированные данные профиля сохраняются на сервере
      - Добавление новой карточки, удаление происходит с обновленнием данных на сервере
  - При редактировании профиля,добавлении новой карточки,обновлении аватара происходит уведомление пользователя о процессе загрузки,в виде измененного текста кнопки «Сохранить» на: «Сохранение...», пока данные загружаются
  
  
**Ссылка на сайт**
* [https://romanb10.github.io/mesto/index.html](https://romanb10.github.io/mesto/index.html)

**Стэк**

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

**Применяемые технологии**
* Grid Layout
* Flex-box верстка
* Позиционирование
* Медиазапросы
* Формы(валидация форм на стороне клиента)
* Улучшенный UX всех форм
* Организация файловой структуры по Nested БЭМ
* Webpack
* API

**Статус выполнения проекта**
* Завершен

**Screenshot**
  
- Одностраничное приложение
  ![image](https://user-images.githubusercontent.com/105459169/230109591-36045679-e9b8-4c38-80d8-5c1e8dd6415a.png)
- Попап обновления аватара,
  *для смены аватара необходимо кликнуть по нему*
 ![image](https://user-images.githubusercontent.com/105459169/230110042-58087a19-d2fa-4996-b7bd-77967777f4ce.png)
- Попап редактирования профиля,
  *для редактирования профиля необходимо кликнуть* ![image](https://user-images.githubusercontent.com/105459169/230097338-e9fc9b1e-6999-4abb-bd2b-ae2781c4dfa9.png)
  ![image](https://user-images.githubusercontent.com/105459169/230110311-f03067cd-6758-44dd-a0d8-966f78c8a6ce.png)
  ![image](https://user-images.githubusercontent.com/105459169/230110506-87ee995f-40ef-499b-a2e5-322333e63caa.png)
- Попап добавления новой карточки
  *для добавления новой карточки необходимо кликнуть*, ![image](https://user-images.githubusercontent.com/105459169/230097610-a71c7f56-b271-4956-86e8-e4ca4b1af74f.png)
  ![image](https://user-images.githubusercontent.com/105459169/230110785-2765fdab-6f4a-4e7b-9428-85e4d2f0d095.png)
  ![image](https://user-images.githubusercontent.com/105459169/230110973-ee360849-2083-4841-9aea-d145119ddb6b.png)
- Попап открытия картинки большого размера,
  *для открытия большой картинки необходимо кликнуть по карточке с картинкой*
  ![image](https://user-images.githubusercontent.com/105459169/230111167-536c7e89-0c65-4abc-aaec-eb2a68db4a30.png)


