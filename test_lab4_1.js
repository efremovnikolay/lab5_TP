/**
 * Модуль для автоматизации тестирования веб-приложения с использованием Selenium WebDriver.
 * @module TestModule
 */

/**
 * @const {object} Builder - Класс для создания экземпляров WebDriver.
 * @const {object} By - Классы для поиска элементов на веб-странице.
 * @const {object} until - Классы для ожидания определенных условий.
 * @const {function} path - Функция для работы с путями файловой системы.
 */
const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');

/**
 * Основная функция для выполнения автоматизированного тестирования.
 * @async
 * @function runTests
 */
(async function runTests() {
    /**
     * Создание экземпляра WebDriver для браузера Chrome.
     */
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        /**
         * Формирование URL-адреса файла index.html.
         * @type {string}
         */
        const fileUrl = `file://${path.join(__dirname, 'index.html')}`; //#DownloadProtocol.html
        driver.get(fileUrl);

        // Тест 1
        console.log();
        console.log('Тест 1:');
        /**
         * Поиск элемента с идентификатором 'sidebar'.
         * @type {WebElement}
         */
        const elementSidebar = await driver.findElement(By.id('sidebar'));
        const id = await elementSidebar.getAttribute('id');
        const color = await elementSidebar.getCssValue('background-color');

        if (color === 'rgba(0, 121, 194, 1)') {
            console.log('Элемент с id=[' + id + '] имеет ожидаемый цвет.');
        } else {
            console.error('Элемент с id=[' + id + '] имеет неожиданный цвет.');
        }

        // Тест 2
        console.log();
        console.log('Тест 2:');
        /**
         * Поиск элемента с классом 'menu-text-downloadProtocol'.
         * @type {WebElement}
         */
        const spanElement = await driver.findElement(By.className('menu-text-downloadProtocol'));
        await driver.manage().window().fullscreen(); //Разворачиваем на полный экран, чтобы у элемента появился текст
        const textSpan = await spanElement.getText();
        const id2 = await spanElement.getAttribute('class');

        console.log('textSpan:', textSpan);

        if (textSpan === 'Загрузка протокола') {
            console.log('Текстовое содержимое элемента class=[' + id2 + '] соответствует ожидаемому.');
        } else {
            console.error('Текстовое содержимое элемента class=[' + id2 + '] не соответствует ожидаемому.');
        }

        // Тест 3
        console.log();
        console.log('Тест 3:');
        /**
         * Поиск элемента с классом 'download-protocol'.
         * @type {WebElement}
         */
        const elementMenu = await driver.findElement(By.className('download-protocol'));
        //Нажимаем на элемент, который должен изменить класс
        await elementMenu.click();

        //Получаем класс элемента после нажатия
        let newClass = await elementMenu.getAttribute('class');

        console.log(`Новый класс элемента: ${newClass}`);
        if (newClass.includes('active')) {
            console.log('Элемент имеет ожидаемый класс.');
        } else {
            console.error('Элемент имеет неожиданный класс.');
        }

        //Нажмём на другой элемент меню для проверки
        const elementMenu2 = await driver.findElement(By.className('errand'));
        await elementMenu2.click();
        newClass = await elementMenu.getAttribute('class');
        if (newClass.includes('active')) {
            console.log('Элемент имеет ожидаемый класс.');
        } else {
            console.error('Элемент имеет неожиданный класс.');
        }

        // Тест 4
        console.log();
        console.log('Тест 4:');
        //Свернём экран и проверим свойство css display на "none"
        await driver.manage().window().minimize();
        const displayValue = await spanElement.getCssValue('display');
        if (displayValue === 'none') {
            console.log('Свойство display у элемента с классом my-element равно "none"');
        } else {
            console.error(`Свойство display у элемента с классом my-element равно ${displayValue}`);
        }

        //Свернём экран для проверки свойства display на полном экране
        await driver.manage().window().fullscreen();
        const displayValue2 = await spanElement.getCssValue('display');
        if (displayValue2 === 'none') {
            console.log('Свойство display у элемента с классом my-element равно "none"');
        } else {
            console.error(`Свойство display у элемента с классом my-element равно ${displayValue2}`);
        }

    } finally {
        /**
         * Завершение работы WebDriver.
         */
        await driver.quit();
    }
})();
