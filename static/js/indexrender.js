shinobi.indexrender = {
    menuData: [],
    init: function () {
        shinobi.indexrender.getMenuData(function () {
            shinobi.indexrender.renderMenu();
            shinobi.indexrender.renderContent();
            shinobi.indexrender.addEventSearch();
        })
    },

    renderContent: function () {

        var data = shinobi.indexrender.menuData;
        var result = shinobi.indexrender.getCurrentMenuData(data, {
            hasFound: false,
            value: null,
        });

        var contentIframe = document.getElementById('contentIframe');
        var currentItem = result.value;
        contentIframe.src = (currentItem) ? currentItem.pdfurl : '';
        var tagsButton = document.querySelector('.button[data-target="quickviewDefault"]');
        if (currentItem) {
            tagsButton.classList.remove('is-hidden');


            var tagsContainer = document.querySelector('#quickviewDefault .quickview-body .quickview-block');
            tagsContainer.innerHTML = '';
            var listTags = (currentItem.hasOwnProperty('menutags')) ? currentItem.menutags.split(',') : [];
            listTags.forEach(function (tagItem) {
                var tag = document.createElement('span');
                tag.setAttribute('class', 'tag is-link is-rounded');
                tag.innerHTML = tagItem;
                tagsContainer.appendChild(tag);
            })
        } else {
            tagsButton.classList.add('is-hidden');
        }
    },

    getCurrentMenuData: function (data, option) {
        var returnValue = null;
        var menuId = shinobi.util.getSearchParam('idmenu');
        data.forEach(function (item) {

            if (item.menucode.trim().toString() == menuId.trim().toString()) {

                if (option.hasFound == false) {
                    option.hasFound = true;
                    option.value = item;
                }

            } else {
                if (item.hasOwnProperty('menuchildren')) {
                    if (option.hasFound == false) {
                        shinobi.indexrender.getCurrentMenuData(item.menuchildren, option)
                    }
                }
            }
        })

        return option;
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
                    case 'tags':
                        shinobi.indexrender.searchTags(request);
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

    searchTags: function (request) {
        if (request.searchkey.trim() == '') {
            shinobi.indexrender.renderMenu();
        } else {
            var data = shinobi.indexrender.menuData;
            var newData = [];
            var option = shinobi.indexrender.searchDataMenuTags(data, {
                request: request,
                newData: newData,
            });
            shinobi.indexrender.renderMenu(option.newData);

        }

    },

    searchDataMenuTags: function (data, option) {
        data.forEach(function (item, index) {
            var listTag = (item.hasOwnProperty('menutags')) ? item.menutags.split(',') : [];
            if (!listTag.includes(option.request.searchkey.toLowerCase())) {
                if (item.hasOwnProperty('menuchildren') && item.menuchildren.length > 0) {
                    shinobi.indexrender.searchDataMenuTags(item.menuchildren, option);
                }
            } else {
                option.newData.push(item);
            }
        })

        return option;
    },

    searchMenu: function (request) {
        if (request.searchkey.trim() == '') {
            shinobi.indexrender.renderMenu();
        } else {
            var data = shinobi.indexrender.menuData;
            var newData = [];
            var option = shinobi.indexrender.searchDataMenuTitle(data, {
                request: request,
                newData: newData,
            });
            shinobi.indexrender.renderMenu(option.newData);

        }

    },

    searchDataMenuTitle: function (data, option) {
        data.forEach(function (item, index) {
            if (!item.menuname.toLowerCase().includes(option.request.searchkey.toLowerCase())) {
                if (item.hasOwnProperty('menuchildren') && item.menuchildren.length > 0) {
                    shinobi.indexrender.searchDataMenuTitle(item.menuchildren, option);
                }
            } else {
                option.newData.push(item);
            }
        })

        return option;
    },

    searchContent: function (request) {
        if (request.searchkey.trim() == '') {
            shinobi.indexrender.renderMenu();
        } else {
            var data = shinobi.indexrender.menuData;
            var newData = [];
            var option = shinobi.indexrender.searchDataMenuContent(data, {
                request: request,
                newData: newData,
                callback: function (currentOption) {
                    console.log(currentOption);
                    shinobi.indexrender.renderMenu(currentOption.newData);
                }
            });



        }
    },

    searchDataMenuContent: function (data, option) {
        data.forEach(function (item, index) {
            if (item.hasOwnProperty('contenturl')) {
                var content = shinobi.xhradapter.getResource(item.contenturl, function (response) {
                    var data = response.toString().toLowerCase();
                    if (!data.includes(option.request.searchkey.toLowerCase())) {
                        if (item.hasOwnProperty('menuchildren') && item.menuchildren.length > 0) {
                            shinobi.indexrender.searchDataMenuContent(item.menuchildren, option);
                        }
                    } else {
                        option.newData.push(item);
                    }

                    if (option.hasOwnProperty('callback')) {
                        option.callback(option);
                    }
                })
            } else {
                if (item.hasOwnProperty('menuchildren') && item.menuchildren.length > 0) {
                    shinobi.indexrender.searchDataMenuContent(item.menuchildren, option);
                }
            }
        })
    },

    renderMenu: function (dataInput) {
        var container = document.getElementById('menuLeft');
        container.innerHTML = '';
        var data = (dataInput) ? dataInput : shinobi.indexrender.menuData;
        if (data.length > 0) {
            shinobi.menurender.build('#menuLeft', data);
            shinobi.menumodule.activeCurrentTab(container, {
                includesSearch: true
            });
        } else {
            container.innerHTML = '<i>Không tìm thấy kết quả</i>';
        }


    },
    getMenuData: function (callback) {
        shinobi.xhradapter.getResource('/static/json/menudata.json', function (response) {
            shinobi.indexrender.menuData = JSON.parse(response);
            callback();
        })
    },
};