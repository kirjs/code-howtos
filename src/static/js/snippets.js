/**
 * Menu
 *
 * @type {{}}
 */
var menu = {};

menu.pages = function () {
    return m.request({method: "GET", url: "urls.json"});
};

menu.controller = function () {
    var pagesSource = menu.pages();

    return {
        pages: function () {
            var result = pagesSource();
            return Object.keys(result).reduce(function (arr, key) {
                arr.push({
                    title: key,
                    url: result[key].replace('.md', '')
                });
                return arr;

            }, []);
        }

    }
};

menu.view = function (ctrl) {
    return m("ul",
        ctrl.pages().map(function (page) {
            return m("li", m("a", {href: '?/' + page.url}, page.title));
        }));


};

/**
 * Content
 *
 * @type {{controller: Function, view: Function}}
 */



var content = {
    page: function (page) {
        return m.request({
            method: "GET",
            url: "content/" + page + ".html",
            deserialize: function (_) {
                return _;
            }
        });
    },
    controller: function () {
        this.page = content.page(m.route.param("page"));
    },
    view: function (controller) {
        return m("div", m.trust(controller.page()));
    }
};

m.route(document.getElementById("content"), "/clojure", {
    "/:page": content
});

m.module(document.getElementById("pages"), menu);