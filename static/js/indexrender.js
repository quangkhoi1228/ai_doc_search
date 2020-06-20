shinobi.indexrender = {
    menuData: [],
    init: function () {
        shinobi.indexrender.getMenuData(function () {
            shinobi.indexrender.renderMenu();
            shinobi.indexrender.addEventSearch();
        })
    },

    addEventSearch: function () {
        var container = document.querySelector('.filter-section');
        var button = container.querySelector('.submit-button');
        button.onclick = function () {
            shinobi.mapping.getValueElement(container, function (request) {
                switch (request.searchtype) {
                    case 'menu':
                        shinobi.indexrender.searchMenu(request);
                        break;
                    case 'content':
                        shinobi.indexrender.searchContent(request);
                        break;
                    default:
                        break;
                }
            })
        }
    },

    searchMenu: function (request) {

        console.log(request);

    },

    searchContent: function (request) {

    },

    renderMenu: function () {
        var container = document.getElementById('menuLeft');
        container.innerHTML = '';
        var data = shinobi.indexrender.menuData;
        shinobi.menurender.build('#menuLeft', data);

    },
    getMenuData: function (callback) {
        shinobi.xhradapter.getResource('/static/json/menudata.json', function (response) {
            console.log(response);
            shinobi.indexrender.menuData = JSON.parse(response);
            console.log(shinobi.indexrender.menuData)
            callback();
        })
    },
};