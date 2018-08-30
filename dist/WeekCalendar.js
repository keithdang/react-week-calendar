"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _Utils = require("./Utils");

var Utils = _interopRequireWildcard(_Utils);

var _CalendarHeader = require("./CalendarHeader");

var _CalendarHeader2 = _interopRequireDefault(_CalendarHeader);

var _CalendarBody = require("./CalendarBody");

var _CalendarBody2 = _interopRequireDefault(_CalendarBody);

var _ScaleColumn = require("./ScaleColumn");

var _ScaleColumn2 = _interopRequireDefault(_ScaleColumn);

var _HeaderCell = require("./HeaderCell");

var _HeaderCell2 = _interopRequireDefault(_HeaderCell);

var _DayCell = require("./DayCell");

var _DayCell2 = _interopRequireDefault(_DayCell);

var _Event = require("./Event");

var _Event2 = _interopRequireDefault(_Event);

var _Modal = require("./Modal");

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var propTypes = {
  firstDay: _propTypes2.default.object, // the first day in the caledar
  numberOfDays: _propTypes2.default.number,
  scaleHeaderTitle: _propTypes2.default.string,
  headerCellComponent: _propTypes2.default.func,
  dayFormat: _propTypes2.default.string, // header day format

  startTime: _propTypes2.default.object, // the start time of the scale and calendar
  endTime: _propTypes2.default.object, // the end time of the scale and calendar
  scaleUnit: _propTypes2.default.number,
  scaleFormat: _propTypes2.default.string,
  cellHeight: _propTypes2.default.number,
  dayCellComponent: _propTypes2.default.func,

  selectedIntervals: _propTypes2.default.array,
  onIntervalSelect: _propTypes2.default.func,
  onIntervalUpdate: _propTypes2.default.func,
  onIntervalRemove: _propTypes2.default.func,

  eventComponent: _propTypes2.default.func,
  onEventClick: _propTypes2.default.func,

  modalComponent: _propTypes2.default.func,
  useModal: _propTypes2.default.bool
};

var defaultProps = {
  firstDay: (0, _moment2.default)(),
  numberOfDays: 7,
  scaleHeaderTitle: "",
  headerCellComponent: _HeaderCell2.default,
  dayFormat: "dd., DD.MM",
  startTime: (0, _moment2.default)({ h: 0, m: 0 }),
  endTime: (0, _moment2.default)({ h: 23, m: 59 }),
  scaleUnit: 15,
  scaleFormat: "HH:mm",
  cellHeight: 25,
  dayCellComponent: _DayCell2.default,
  selectedIntervals: [],
  eventComponent: _Event2.default,
  modalComponent: _Modal2.default,
  useModal: true
};

var WeekCalendar = (function(_React$Component) {
  _inherits(WeekCalendar, _React$Component);

  function WeekCalendar(props) {
    _classCallCheck(this, WeekCalendar);

    var _this = _possibleConstructorReturn(
      this,
      (WeekCalendar.__proto__ || Object.getPrototypeOf(WeekCalendar)).call(
        this,
        props
      )
    );

    _initialiseProps.call(_this);

    var scaleUnit = props.scaleUnit,
      startTime = props.startTime,
      endTime = props.endTime;

    var scaleIntervals = Utils.getIntervalsByDuration(
      scaleUnit,
      startTime,
      endTime
    );

    _this.state = {
      scaleIntervals: scaleIntervals,
      columnDimensions: [],
      scrollPosition: {
        top: 0,
        left: 0
      },
      startSelectionPosition: null,
      preselectedInterval: null
    };
    return _this;
  }

  _createClass(WeekCalendar, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.calculateColumnDimension();
        window.addEventListener("resize", this.calculateColumnDimension);
        window.addEventListener("mouseup", this.handleSelectionStop);
      }
    },
    {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        if (
          nextProps.scaleUnit !== this.props.scaleUnit ||
          nextProps.startTime !== this.props.startTime ||
          nextProps.endTime !== this.props.endTime
        ) {
          var scaleIntervals = Utils.getIntervalsByDuration(
            nextProps.scaleUnit,
            nextProps.startTime,
            nextProps.endTime
          );
          this.setState({
            scaleIntervals: scaleIntervals
          });
        }
      }
    },
    {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        window.removeEventListener("resize", this.calculateColumnDimension);
        window.removeEventListener("mouseup", this.handleSelectionStop);
      }
    },
    {
      key: "renderSelectedIntervals",
      value: function renderSelectedIntervals() {
        var _this2 = this;

        var _props = this.props,
          firstDay = _props.firstDay,
          numberOfDays = _props.numberOfDays,
          cellHeight = _props.cellHeight,
          scaleUnit = _props.scaleUnit,
          selectedIntervals = _props.selectedIntervals;
        var _state = this.state,
          columnDimensions = _state.columnDimensions,
          scaleIntervals = _state.scaleIntervals;

        var result = [];
        if (columnDimensions.length === 0 || selectedIntervals.length === 0) {
          return result;
        }
        var EventComponent = this.props.eventComponent;
        var offsetTop = Utils.getOffset(scaleIntervals[0].start);

        var _loop = function _loop(dayIndex) {
          var day = (0, _moment2.default)(firstDay)
            .startOf("day")
            .add(dayIndex, "day");
          var intervals = selectedIntervals.filter(function(interval) {
            return (
              interval.start.isSame(day, "day") ||
              interval.end.isSame(day, "day")
            );
          });
          if (intervals.length > 0) {
            intervals.sort(function(i1, i2) {
              return i1.start.diff(i2.start, "minutes");
            });

            intervals.forEach(function(interval, index, array) {
              var startY = 0;
              if (!interval.start.isBefore(day)) {
                startY = Utils.getNumberOfCells(
                  interval.start,
                  scaleUnit,
                  false,
                  offsetTop
                );
              }

              if (startY > scaleIntervals.length) {
                return;
              }

              var beforeIntersectionNumber = array.filter(function(i, i1) {
                return i1 < index && interval.start.isBefore(i.end);
              }).length;
              var afterIntersectionNumber = array.filter(function(i, i1) {
                return i1 > index && interval.end.isAfter(i.start);
              }).length;
              var groupIntersection =
                beforeIntersectionNumber + afterIntersectionNumber + 1;

              var endY = Utils.getNumberOfCells(
                interval.end,
                scaleUnit,
                true,
                offsetTop
              );
              if (endY > scaleIntervals.length) {
                endY = scaleIntervals.length;
              }
              var top = startY * cellHeight;
              var width =
                (columnDimensions[dayIndex].width - 15) / groupIntersection;
              var left =
                columnDimensions[dayIndex].left +
                (width + 7) * beforeIntersectionNumber;
              var height = (endY - startY) * cellHeight;
              var eventWrapperStyle = {
                top: top,
                left: left,
                width: width,
                height: height
              };
              var eventComponent = _react2.default.createElement(
                "div",
                {
                  className: "weekCalendar__overlay",
                  key: dayIndex * 10 + index,
                  style: eventWrapperStyle,
                  onClick: _this2.handleEventClick.bind(_this2, interval)
                },
                _react2.default.createElement(EventComponent, interval)
              );
              result.push(eventComponent);
            });
          }
        };

        for (var dayIndex = 0; dayIndex < numberOfDays; dayIndex += 1) {
          _loop(dayIndex);
        }
        return result;
      }
    },
    {
      key: "renderOverlay",
      value: function renderOverlay() {
        if (this.state.startSelectionPosition != null) {
          var startPosition = this.state.startSelectionPosition;
          var mousePosition = this.state.mousePosition;

          var top =
            Math.min(startPosition.y, mousePosition.y) * this.props.cellHeight;
          var left = this.state.columnDimensions[
            Math.min(startPosition.x, mousePosition.x)
          ].left;

          var lastSelectedColumn = this.state.columnDimensions[
            Math.max(startPosition.x, mousePosition.x)
          ];
          var width = lastSelectedColumn.left - left + lastSelectedColumn.width;
          var height =
            (Math.max(startPosition.y, mousePosition.y) + 1) *
              this.props.cellHeight -
            top;
          var overlayStyle = {
            top: top,
            left: left,
            width: width,
            height: height
          };
          return _react2.default.createElement("div", {
            className:
              "weekCalendar__overlay weekCalendar__overlay_status_selection",
            style: overlayStyle
          });
        }
        return null;
      }
    },
    {
      key: "renderModal",
      value: function renderModal() {
        var useModal = this.props.useModal;
        var preselectedInterval = this.state.preselectedInterval;

        if (useModal && preselectedInterval) {
          var ModalComponent = this.props.modalComponent;
          return _react2.default.createElement(
            "div",
            { className: "calendarModal" },
            _react2.default.createElement("div", {
              className: "calendarModal__backdrop",
              onClick: this.closeModule
            }),
            _react2.default.createElement(
              "div",
              { className: "calendarModal__content" },
              _react2.default.createElement(
                ModalComponent,
                _extends({}, preselectedInterval, {
                  onRemove: this.removePreselectedInterval,
                  onSave: this.submitPreselectedInterval
                })
              )
            )
          );
        }

        return null;
      }
    },
    {
      key: "render",
      value: function render() {
        var _props2 = this.props,
          firstDay = _props2.firstDay,
          numberOfDays = _props2.numberOfDays,
          headerCellComponent = _props2.headerCellComponent,
          dayFormat = _props2.dayFormat,
          scaleUnit = _props2.scaleUnit,
          scaleFormat = _props2.scaleFormat,
          cellHeight = _props2.cellHeight,
          dayCellComponent = _props2.dayCellComponent,
          scaleHeaderTitle = _props2.scaleHeaderTitle;

        var isSelection = this.state.startSelectionPosition != null;

        return _react2.default.createElement(
          "div",
          {
            className: isSelection
              ? "weekCalendar weekCalendar__status_selection"
              : "weekCalendar"
          },
          _react2.default.createElement(
            "div",
            { className: "weekCalendar__scaleHeader" },
            _react2.default.createElement("span", null, scaleHeaderTitle)
          ),
          _react2.default.createElement(
            "div",
            {
              className: "weekCalendar__header",
              style: { left: -this.state.scrollPosition.left }
            },
            _react2.default.createElement(_CalendarHeader2.default, {
              firstDay: firstDay,
              numberOfDays: numberOfDays,
              dayFormat: dayFormat,
              columnDimensions: this.state.columnDimensions,
              headerCellComponent: headerCellComponent
            })
          ),
          _react2.default.createElement(
            "div",
            {
              className: "weekCalendar__scaleColumn",
              style: { top: -this.state.scrollPosition.top }
            },
            _react2.default.createElement(_ScaleColumn2.default, {
              scaleUnit: this.props.scaleUnit,
              scaleFormat: scaleFormat,
              scaleIntervals: this.state.scaleIntervals,
              cellHeight: this.props.cellHeight
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "weekCalendar__content", onScroll: this.handleScroll },
            _react2.default.createElement(_CalendarBody2.default, {
              firstDay: firstDay,
              numberOfDays: numberOfDays,
              scaleUnit: scaleUnit,
              scaleIntervals: this.state.scaleIntervals,
              cellHeight: cellHeight,
              dayCellComponent: dayCellComponent,
              onSelectionStart: this.handleSelectionStart,
              onCellMouseEnter: this.handleCellMouseEnter
            }),
            this.renderSelectedIntervals(),
            this.renderOverlay()
          ),
          this.renderModal()
        );
      }
    }
  ]);

  return WeekCalendar;
})(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.calculateColumnDimension = function() {
    var numberOfDays = _this3.props.numberOfDays;

    var columnDimensions = [];
    for (var i = 0; i < numberOfDays; i += 1) {
      var left =
        i === 0
          ? 0
          : columnDimensions[i - 1].left + columnDimensions[i - 1].width;
      var columnWidth = 0;

      var columnElement = document.querySelectorAll(
        "[data-colpos='" + i + "']"
      )[0];
      if (columnElement) {
        columnWidth = columnElement.getBoundingClientRect().width;
      }
      columnDimensions.push({
        left: left,
        width: columnWidth
      });
    }
    _this3.setState({ columnDimensions: columnDimensions });
  };

  this.handleScroll = function(e) {
    _this3.setState({
      scrollPosition: {
        top: e.target.scrollTop,
        left: e.target.scrollLeft
      }
    });
  };

  this.handleCellMouseEnter = function(col, row) {
    if (_this3.state.startSelectionPosition != null) {
      _this3.setState({
        mousePosition: {
          x: col,
          y: row
        }
      });
    }
  };

  this.handleSelectionStart = function(col, row) {
    var startSelectionPosition = {
      x: col,
      y: row
    };
    _this3.setState({
      startSelectionPosition: startSelectionPosition,
      mousePosition: startSelectionPosition
    });
  };

  this.handleSelectionStop = function(e) {
    if (e.button !== 0) {
      return;
    }

    var _props3 = _this3.props,
      firstDay = _props3.firstDay,
      scaleUnit = _props3.scaleUnit,
      useModal = _props3.useModal;
    var _state2 = _this3.state,
      startSelectionPosition = _state2.startSelectionPosition,
      mousePosition = _state2.mousePosition,
      scaleIntervals = _state2.scaleIntervals;

    if (startSelectionPosition == null) {
      return;
    }

    var endCol = mousePosition.x;
    var endRow = mousePosition.y;

    var minDayIndex = Math.min(startSelectionPosition.x, endCol);
    var maxDayIndex = Math.max(startSelectionPosition.x, endCol);

    var startDay = (0, _moment2.default)(firstDay).add(minDayIndex, "days");
    var endDay = (0, _moment2.default)(firstDay).add(maxDayIndex, "days");

    var minCellIndex = Math.min(startSelectionPosition.y, endRow);
    var maxCellIndex = Math.max(startSelectionPosition.y, endRow) + 1;
    var offsetTop = Utils.getOffset(scaleIntervals[0].start);
    var startSelectionTime = Utils.getMoment(
      scaleUnit,
      minCellIndex,
      offsetTop
    );
    var endSelectionTime = Utils.getMoment(scaleUnit, maxCellIndex, offsetTop);

    var start = (0, _moment2.default)(startDay)
      .hour(startSelectionTime.hour())
      .minute(startSelectionTime.minute())
      .second(0);
    var end = (0, _moment2.default)(endDay)
      .hour(endSelectionTime.hour())
      .minute(endSelectionTime.minute())
      .second(0);

    if (useModal) {
      var preselectedInterval = {
        start: start,
        end: end
      };
      _this3.setState({
        preselectedInterval: preselectedInterval,
        updateEvent: false
      });
    } else {
      var result = Utils.getIntervals(start, end);
      if (_this3.props.onIntervalSelect) {
        _this3.props.onIntervalSelect(result);
      }
    }

    _this3.setState({
      startSelectionPosition: null,
      mousePosition: null
    });
  };

  this.removePreselectedInterval = function() {
    var _state3 = _this3.state,
      preselectedInterval = _state3.preselectedInterval,
      updateEvent = _state3.updateEvent;

    if (updateEvent && _this3.props.onIntervalRemove) {
      _this3.props.onIntervalRemove(preselectedInterval);
    }
    _this3.setState({ preselectedInterval: null });
  };

  this.submitPreselectedInterval = function(newValue) {
    var _state4 = _this3.state,
      preselectedInterval = _state4.preselectedInterval,
      updateEvent = _state4.updateEvent;

    if (updateEvent) {
      if (_this3.props.onIntervalUpdate) {
        _this3.props.onIntervalUpdate(
          _extends({}, preselectedInterval, newValue)
        );
      }
    } else if (_this3.props.onIntervalSelect) {
      var _intervals = Utils.getIntervals(
        preselectedInterval.start,
        preselectedInterval.end
      );
      var result = _intervals.map(function(interval) {
        return _extends({}, interval, newValue);
      });
      _this3.props.onIntervalSelect(result);
    }

    _this3.setState({ preselectedInterval: null });
  };

  this.closeModule = function() {
    _this3.setState({
      preselectedInterval: null
    });
  };

  this.handleEventClick = function(oEvent) {
    if (_this3.props.onEventClick) {
      _this3.props.onEventClick(oEvent);
    }
    _this3.setState({
      preselectedInterval: oEvent,
      updateEvent: true
    });
  };
};

WeekCalendar.propTypes = propTypes;
WeekCalendar.defaultProps = defaultProps;

exports.default = WeekCalendar;
