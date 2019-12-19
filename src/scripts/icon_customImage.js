(() => {
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [55.749535, 37.604101],
            zoom: 14
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        ChoccoShop1 = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Chocco',
            balloonContent: 'Наш фирменный магазин 1'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/map/marker.png',
            // Размеры метки.
            iconImageSize: [46, 57],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        }),

        ChoccoShop2 = new ymaps.Placemark([55.743553, 37.580894], {
            hintContent: 'Chocco',
            balloonContent: 'Наш фирменный магазин 2'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/map/marker.png',
            // Размеры метки.
            iconImageSize: [46, 57],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        }),

        ChoccoShop3 = new ymaps.Placemark([55.757256, 37.620167], {
            hintContent: 'Chocco',
            balloonContent: 'Наш фирменный магазин 3'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/map/marker.png',
            // Размеры метки.
            iconImageSize: [46, 57],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        }),

        ChoccoShop4 = new ymaps.Placemark([55.758715, 37.583223], {
            hintContent: 'Chocco',
            balloonContent: 'Наш фирменный магазин 4'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/map/marker.png',
            // Размеры метки.
            iconImageSize: [46, 57],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        });

    myMap.geoObjects
        .add(ChoccoShop1)
        .add(ChoccoShop2)
        .add(ChoccoShop3)
        .add(ChoccoShop4);
});
})()