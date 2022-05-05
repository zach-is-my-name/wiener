import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
export function useGetWien(obj) {
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      renderObject = _useState2[0],
      setRenderObject = _useState2[1];

  useEffect(function () {
    function getLatestWien() {
      return _getLatestWien.apply(this, arguments);
    } //todo


    function _getLatestWien() {
      _getLatestWien = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var _yield$axios$get, data, markdownNewsletter, date;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return axios.get('http://weekinethereumnews.com');

              case 2:
                _yield$axios$get = _context.sent;
                data = _yield$axios$get.data;
                markdownNewsletter = applyMarkdown(data);
                date = getDateFromNewsletter(markdownNewsletter);
                addNewsletterToDb(date, markdownNewsletter);
                setRenderObject({
                  date: date,
                  content: loadNewsletter(date)
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _getLatestWien.apply(this, arguments);
    }

    function loadWienFromArchive(_x) {
      return _loadWienFromArchive.apply(this, arguments);
    } //todo


    function _loadWienFromArchive() {
      _loadWienFromArchive = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(date) {
        var newsletter;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                newsletter = fs.readFileSync('./archive/markdownNewsletters/' + date, {
                  encoding: 'utf8',
                  flag: 'r'
                });
                return _context2.abrupt("return", newsletter);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return _loadWienFromArchive.apply(this, arguments);
    }

    function getBackWiens(_x2) {
      return _getBackWiens.apply(this, arguments);
    } //todo


    function _getBackWiens() {
      _getBackWiens = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(start) {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      return _getBackWiens.apply(this, arguments);
    }

    function searchWiens() {
      return _searchWiens.apply(this, arguments);
    }

    function _searchWiens() {
      _searchWiens = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
      return _searchWiens.apply(this, arguments);
    }

    switch (obj) {
      case obj.search:
        searchWiens(searchTerm);

      case obj.load:
        loadWienFromArchive();

      case obj.back:
        getBackWiens(start);

      default:
        getLatestWien();
    }
  }, []);
  return renderObject;
}