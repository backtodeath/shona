angular.module('starter.services', [])

  .factory('getBible', ['$http', function ($http) {
    var bible = {};
    bible.loaded = false;
    bible.bNamesLoaded = false;
    bible.curBookName = 'none';
    
    function getBookNames() {
      return $http.get("bible/Books.json")
        .then(function (data) {
          bible.books = data.data;
          bible.bNamesLoaded = true;
          return data.data;
        });
    }

    function getBook(book) {

      book = book.replace(/\s/g, '');

      return $http.get("bible/parts/" + book + ".json")
        .then(function (data) {
          bible.curBook = data.data;
          bible.curBookName = bible.curBook.book;
          bible.loaded = true;
          return data.data;
        }, function (reason) {
          return "failed to load book";
        });
    }

    function cleanString(unsafe) {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function getChapter(curChap) {
      return bible.curBook.chapters[curChap - 1];
    }

    function newTestament() {
      return getBookNames().then(function (books) {
        return books.slice(17, books.size);
      });
    }

    function oldTestament() {
      return getBookNames().then(function (books) {
        return books.slice(0, 17);
      });
    }

    function Bible() {
      return bible.curBook;
    }

    function areBooksLoaded() {
      return bible.bNamesLoaded;
    }

    function isBibleLoaded() {
      return bible.loaded;
    }

    function currentBook() {
      return bible.curBookName;
    }

    return {
      "getBook": getBook,
      "Bible": Bible,
      "newTestament": newTestament,
      "oldTestament": oldTestament,
      "getChapter": getChapter,
      "isBibleLoaded": isBibleLoaded,
      "areBooksLoaded": areBooksLoaded,
      "currentBook": currentBook,
      "cleanString": cleanString
    }

  }])

  .factory('settings', function ($rootScope) {
    var style = {};
    style.size = 16;

    var css = {};
    var night = false;

    css.main = {
      'background-color': '#fff',
      'color': 'black',
      'font-size': '16px'
    };

    css.verse = {};
    css.verse.number = {};
    css.smallText = {'font-size': (style.size - 4) + 'px'};
    css.header = {};
    css.noneTextBG = {};
    css.listItem = {};
    css.button = {};

    setDay();

    function incTextSize() {
      if (style.size < 60) {
        style.size = style.size + 1;
        setTextSize();
      }
      return css;
    }

    function decTextSize() {
      if (style.size > 1) {
        style.size = style.size - 1;
        setTextSize();
      }
      return css;
    }

    function getTextSize() {
      return style.size;
    }

    function getStyle() {
      return css;
    }

    function getNight() {
      return night;
    }

    function setStyle(styler) {
      if (styler) {
        setNight();
      } else {
        setDay();
      }
      return css;
    }

    function setNight() {
      night = true;
      css.main['background-color'] = '#444';
      css.main['color'] = '#fff';
      css.header['background-color'] = '#2C2C2C';
      css.header['color'] = '#fe9241';
      css.button['background-color'] = '#696969';
      css.button['color'] = '#D2691E';
      css.listItem['background-color'] = '#C0C0C0';
      css.listItem['color'] = '#FFFFFF';
      css.noneTextBG['background-color'] = '#2F4F4F';
      css.verse.number['color'] = '#D2691E';
      $rootScope.$broadcast('css:changed');
    }

    function setDay() {
      night = false;
      css.main['background-color'] = '#FFF8DC';
      css.main['color'] = '!default';
      css.header['background-color'] = '!default';
      css.header['color'] = '!default';
      css.button['background-color'] = '!default';
      css.button['color'] = '!default';
      css.listItem['background-color'] = '!default';
      css.listItem['color'] = '!default';
      css.noneTextBG['background-color'] = '!default';
      css.verse.number['color'] = '#D2691E';
      $rootScope.$broadcast('css:changed');
    }

    function setTextSize() {
      css.header['font-size'] = (style.size + 2) + 'px';
      css.smallText['font-size'] = (style.size - 4) + 'px';
      css.main['font-size'] = style.size + 'px';
      css.listItem['font-size'] = style.size + 'px';
      css.button['font-size'] = style.size + 'px';
      css.verse.number['font-size'] = style.size + 'px';
      $rootScope.$broadcast('css:changed');
    }

    return {
      "incTextSize": incTextSize,
      "decTextSize": decTextSize,
      "getTextSize": getTextSize,
      "setStyle": setStyle,
      "getStyle": getStyle,
      "getNight": getNight
    }
  });
