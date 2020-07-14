var UIController = (function(){
  var DOMstrings = {
    // for class
    curMonthYear: '.today__monthAndYear',
    curDayOfWeek: '.today__dayOfWeek',
    curDate: '.today__date',

    prevMonth: '.calendar__btn1',
    calMonth: '.calendar__month',
    nextMonth: '.calendar__btn2',

    calDatesContainer: '.calendar__datesContainer',

    listAddDesc: '.list__addDesc',
    listAddBtn: '.list__addBtn',
    listContainer: '.list__container',
    listItemC: '.list__item',
    listItemChkBtn: '.list__itemCheckBtn',
    listCompItemChkBtn: '.list__compItemCheckBtn',
    listItemDelBtn: '.list__itemDelBtn',
    listTotal: '.options__totalItemsNum',
    listClearComp: '.option__clearComp',

    displayAll: '.option__showAll',
    displayActive: '.option__showActive',
    displayComplete: '.option__showComp',
    displayAllOn: '.option__showAll_on',
    displayActiveOn: '.option__showActive_on',
    displayCompleteOn: '.option__showComp_on',

    // for Html
    calDatesItemId: 'calendar__datesItem',
    calDatesItemSelected: 'calendar__datesItem_selected',
    calDatesItemList: 'calendar__datesItem_list',

    listItem: 'list__item',
    listItemCheckBtn: 'list__itemCheckBtn',
    listCompItemCheckBtn: 'list__compItemCheckBtn',
    listItemDesc: 'list__itemDesc',
    listCompItemDesc: 'list__compItemDesc',
    listItemDeleteBtn: 'list__itemDelBtn',
    listRadioBtnEmpty: 'ion-ios-radio-button-off',
    listRadioBtnChecked: 'ion-ios-checkmark-circle-outline',
    listCloseIcon: 'ion-ios-close',

    dpAll: 'option__showAll',
    dpActive: 'option__showActive',
    dpComplete: 'option__showComp',
    dpAllOn: 'option__showAll_on',
    dpActiveOn: 'option__showActive_on',
    dpCompleteOn: 'option__showComp_on'

  };

  return {
    getDOMstrings: function(){
      return DOMstrings;
    },

    drawCurDate: function(curDate){

      var modMonth = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
      var modDay = ['Sunday','Monday','Tuesday','Wednsday','Thursday','Friday','Saturday','Sunday'];

      document.querySelector(DOMstrings.curMonthYear).textContent = modMonth[curDate.month] + ' ' + curDate.year;
      document.querySelector(DOMstrings.curDayOfWeek).textContent = modDay[curDate.dayOfWeek];
      document.querySelector(DOMstrings.curDate).textContent = curDate.date;
    },

    drawCalendar: function(calDt,curDt,dateList) {
      var el = document.querySelector(DOMstrings.calDatesContainer);
      el.innerHTML = "";
      var newHtml;

      //insert blank date grids
      for (i=calDt.startDay; i>0; i--) {
        newHtml = '<div class="%item%"></div>';
        newHtml = newHtml.replace('%item%', DOMstrings.calDatesItemId);

        el.insertAdjacentHTML('beforeEnd',newHtml);
      }

      var date=1;
      //insert date grids with date
      for (i=calDt.daysInMonth; i>0; i--) {
        newHtml = '<div class="%item%" id="%id%">%date%</div>';
        newHtml = newHtml.replace('%id%', DOMstrings.calDatesItemId + '-' + date);
        newHtml = newHtml.replace('%date%', date);
        newHtml = newHtml.replace('%item%', DOMstrings.calDatesItemId);

        el.insertAdjacentHTML('beforeEnd',newHtml);
        date++;
      }

      //change date background if it has an uncomplete list
      for (i=0; i<dateList.length; i++){
        var data;
        data = DOMstrings.calDatesItemId + '-' + dateList[i];
        document.getElementById(data).className = DOMstrings.calDatesItemList;
      }

      //change date background if it has current day
      if (calDt.year == curDt.year && calDt.month == curDt.month) {
        var data;
        data = DOMstrings.calDatesItemId + '-' + curDt.date;
        document.getElementById(data).className = DOMstrings.calDatesItemSelected;
      }

      var modMonth = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
      document.querySelector(DOMstrings.calMonth).textContent = modMonth[calDt.month] + ' ' + calDt.year;
    },

    clearAddToDoList: function() {
      document.querySelector(DOMstrings.listAddDesc).value = "";
    },

    drawToDoList: function(list, display){
      var el = document.querySelector(DOMstrings.listContainer);
      el.innerHTML = "";
      var newHtml;

      for (i=0; i<list.length; i++){
        newHtml = '<div class="%listItem%" id="%listItemId%"><button class="%chkBtn%"><i class="%radioBtn%" id="%chkBtnId%"></i></button><div class="%itemDesc%">%desc%</div><button class="%delBtn%"><i class="%closeIcon%" id="%delBtnId%"></i></button></div>';

        if (list[i].completed == 0 && display != 'complete'){
          newHtml = newHtml.replace('%listItem%', DOMstrings.listItem);
          newHtml = newHtml.replace('%listItemId%', DOMstrings.listItem + '-' + i);
          newHtml = newHtml.replace('%chkBtn%', DOMstrings.listItemCheckBtn);
          newHtml = newHtml.replace('%chkBtnId%', DOMstrings.listItemCheckBtn + '-' + i);
          newHtml = newHtml.replace('%radioBtn%', DOMstrings.listRadioBtnEmpty);
          newHtml = newHtml.replace('%itemDesc%', DOMstrings.listItemDesc);
          newHtml = newHtml.replace('%desc%', list[i].desc);
          newHtml = newHtml.replace('%delBtn%', DOMstrings.listItemDeleteBtn);
          newHtml = newHtml.replace('%delBtnId%', DOMstrings.listItemDeleteBtn + '-' + i);
          newHtml = newHtml.replace('%closeIcon%', DOMstrings.listCloseIcon);
          el.insertAdjacentHTML('beforeEnd',newHtml);
        } else if (list[i].completed == 1 && display != 'active'){
          newHtml = newHtml.replace('%listItem%', DOMstrings.listItem);
          newHtml = newHtml.replace('%listItemId%', DOMstrings.listItem + '-' + i);
          newHtml = newHtml.replace('%chkBtn%', DOMstrings.listCompItemCheckBtn);
          newHtml = newHtml.replace('%chkBtnId%', DOMstrings.listItemCheckBtn + '-' + i);
          newHtml = newHtml.replace('%radioBtn%', DOMstrings.listRadioBtnChecked);
          newHtml = newHtml.replace('%itemDesc%', DOMstrings.listCompItemDesc);
          newHtml = newHtml.replace('%desc%', list[i].desc);
          newHtml = newHtml.replace('%delBtn%', DOMstrings.listItemDeleteBtn);
          newHtml = newHtml.replace('%delBtnId%', DOMstrings.listItemDeleteBtn + '-' + i);
          newHtml = newHtml.replace('%closeIcon%', DOMstrings.listCloseIcon);
          el.insertAdjacentHTML('beforeEnd',newHtml);
        }
      }
    },

    deleteList: function(idNum){
      var el = document.getElementById(DOMstrings.listItem + '-' + idNum);
      el.parentNode.removeChild(el);
    },

    updateTotal: function(list){
      var total=0;
      for (i=0; i<list.length; i++){
        if (list[i].completed == 0 ) total++;
      }
       document.querySelector(DOMstrings.listTotal).textContent = total;
    },

    toggleDisplayBtn: function(formal,toggle){
      if (formal == "all") document.querySelector(DOMstrings.displayAllOn).className = DOMstrings.dpAll;
      if (formal == "active") document.querySelector(DOMstrings.displayActiveOn).className = DOMstrings.dpActive;
      if (formal == "complete") document.querySelector(DOMstrings.displayCompleteOn).className = DOMstrings.dpComplete;
      if (toggle == "all") document.querySelector(DOMstrings.displayAll).className = DOMstrings.dpAllOn;
      if (toggle == "active") document.querySelector(DOMstrings.displayActive).className = DOMstrings.dpActiveOn;
      if (toggle == "complete") document.querySelector(DOMstrings.displayComplete).className = DOMstrings.dpCompleteOn;
    }
  };

})();

var processor = (function(){

  var data = [];
  // {
  //   '20190405': [
  //     {desc: 'dfsdf', completed: 0},
  //     {desc: 'dfsdf', completed: 0}
  //   ]
  // };

  return {
    calcDaysOfMonth: function(inputMonth, inputYear){
      var daysOfMonths = [31,28,31,30,31,30,31,31,30,31,30,31,31];

      // total days of input month in input year
      var totalDays = daysOfMonths[inputMonth];

      // adjust days for Febuaries
      if (inputMonth == 1){
        inputYear%4 == 0 ? totalDays++ : null;
        inputYear%100 == 0 ? totalDays-- : null;
        inputYear%400 == 0 ? totalDays++ : null;
      }

      // calc starting day of 1st of input month in input year
      var startingDay = 0;
      // 0000 - 3 - 1st is Friday
      // years divided by 400 --> +1
      // years divided by 100 --> -1
      // years divided by 4 --> +1
      // amount of years passed from 0000 --> +1
      // days from March 1st --> ++
      //
      // %7   result   index --> index is result-4,
      // 0    Wed      Sun
      // 1    Thu      Mon
      // 2    Fri      Tue
      // 3    Sat      Wed
      // 4    Sun      Thu
      // 5    Mon      Fri
      // 6    Tue      Sat

      // set beginning month to March for calculation convenience
      if (inputMonth < 2){
        inputYear--;
        inputMonth += 12;
      }

      startingDay = inputYear + Math.floor(inputYear/400) - Math.floor(inputYear/100) + Math.floor(inputYear/4);

      for (i = inputMonth - 1; i > 1; i--){
        startingDay += daysOfMonths[i];
      }

      startingDay = startingDay % 7;
      startingDay -= 4;
      startingDay < 0 ? startingDay += 7 : null;

      return {
        // when startDay is 0, 1st is Sunday
        startDay: startingDay,
        daysInMonth: totalDays
      };
    },

    updateToDoList: function(curDt, tdsList){
      for (i=0; i < data.length; i++){
        if (data[i].year == curDt.year){
          if (data[i].month == curDt.month){
            if (data[i].date == curDt.date){
              data.splice(i,1);
              i--;
            }
          }
        }
      }

      var td=[], cp=[];
      for (i=0; i < tdsList.length; i++){
        if(tdsList[i].completed == 0){
          td.push(tdsList[i].desc);
        } else {
          cp.push(tdsList[i].desc);
        }
      }

      if (td.length || cp.length){
        data.push({
          year: curDt.year,
          month: curDt.month,
          date: curDt.date,
          todo: td,
          comp: cp
        });
      }
    },

    loadTodaysList: function(curDt){
      var td=[], cp=[], list=[];

      for (i=0; i < data.length; i++){
        if (data[i].year == curDt.year){
          if (data[i].month == curDt.month){
            if (data[i].date == curDt.date){
              td = data[i].todo;
              cp = data[i].comp;
            }
          }
        }
      }

      for (i=0; i < td.length; i++){
        list.push({ desc: td[i], completed: 0});
      }
      for (i=0; i < cp.length; i++){
        list.push({ desc: cp[i], completed: 1});
      }

      return list;
    },

    // return days with list of the current calendar month
    checkDaysWithList: function(calDt){
      dateList = [];
      for (i=0; i<data.length; i++){
        if (data[i].year == calDt.year){
          if (data[i].month == calDt.month){
            dateList.push(data[i].date);
          }
        }
      }
      return dateList;
    },

    deleteCompData: function(tdList){
      for (i=0; i<tdList.length; i++){
        if (tdList[i].completed == 1){
          data.splice(i,1);
          i--;
        }
      }
    }
  }

})();

var controller = (function(UIcntrl, process) {

  var curDate = {
    month:0,
    year:0,
    day:0,
    date:0
  };

  var calDate = {
    month:0,
    year:0,
    startDay:0,
    daysInMonth:30
  };

  var todaysList=[]; // each object with 'desc' and 'completed'
  var displayType='all'; //all / active / complete
  var calDaysWithList=[]; //array of days with lists of current calendar month

  var setEventListeners = function(){
    var DOM = UIcntrl.getDOMstrings();
    var left=0;
    var completed=0;

    document.querySelector(DOM.prevMonth).addEventListener('click',prevMonth);
    document.querySelector(DOM.nextMonth).addEventListener('click',nextMonth);
    document.querySelector(DOM.calDatesContainer).addEventListener('click',selectDate);

    document.querySelector(DOM.listAddBtn).addEventListener('click',addToDoList);
    document.addEventListener('keypress',function(event) {
      if (event.keycode === 13 || event.which === 13) {
       addToDoList();
      }
    });

    //check list for left or completed lists
    for (i=0; i < todaysList.length; i++){
      todaysList[i].completed == 0 ? left++ : null ;
      todaysList[i].completed == 1 ? completed++ : null ;
    }
    // add eventListeners for left or completed lists
    if (left) {
      var classes = document.querySelectorAll(DOM.listItemChkBtn);
      for (i=0; i < classes.length ; i++) {
        classes[i].addEventListener('click',completeList);
      }
      classes = document.querySelectorAll(DOM.listItemDelBtn);
      for (i=0; i < classes.length ; i++) {
        classes[i].addEventListener('click',deleteList);
      }
    }
    if (completed) {
      var classes = document.querySelectorAll(DOM.listCompItemChkBtn);
      for (i=0; i < classes.length ; i++) {
        classes[i].addEventListener('click',unCompleteList);
      }
      classes = document.querySelectorAll(DOM.listItemDelBtn);
      for (i=0; i < classes.length ; i++) {
        classes[i].addEventListener('click',deleteList);
      }
    }

    //set display type
    if (displayType != 'all') document.querySelector(DOM.displayAll).addEventListener('click',displayAll);
    if (displayType != 'active') document.querySelector(DOM.displayActive).addEventListener('click',displayActive);
    if (displayType != 'complete') document.querySelector(DOM.displayComplete).addEventListener('click',displayComplete);

    document.querySelector(DOM.listClearComp).addEventListener('click',deleteCompleted);

  };

  var resetDate = function(){
    var date = new Date;
    // set today to current date
    curDate.month = date.getMonth();
    curDate.year = date.getFullYear();
    curDate.dayOfWeek = date.getDay();
    curDate.date = date.getDate();

    // set calendar date to current month
    calDate.month = curDate.month;
    calDate.year = curDate.year;
    calDate.startDay = process.calcDaysOfMonth(curDate.month, curDate.year).startDay;
    calDate.daysInMonth = process.calcDaysOfMonth(curDate.month, curDate.year).daysInMonth;

    calDaysWithList = process.checkDaysWithList(calDate);
  };

  var prevMonth = function(){
    // change calendar month. Year, too if necessary
    if (calDate.month == 0){
      calDate.month = 11;
      calDate.year--;
    } else {
      calDate.month--;
    }
    //calculate days, dates for calendar
    calDate.startDay = process.calcDaysOfMonth(calDate.month, calDate.year).startDay;
    calDate.daysInMonth = process.calcDaysOfMonth(calDate.month, calDate.year).daysInMonth;

    //check days with lists for calendar
    calDaysWithList = process.checkDaysWithList(calDate);

    //UIcntrl draw calendar
    UIcntrl.drawCalendar(calDate, curDate, calDaysWithList);
  };

  var nextMonth = function(){
    // change calendar month. Year, too if necessary
    if (calDate.month == 11){
      calDate.month = 0;
      calDate.year++;
    } else {
      calDate.month++;
    }
    //calculate days, dates for calendar
    calDate.startDay = process.calcDaysOfMonth(calDate.month, calDate.year).startDay;
    calDate.daysInMonth = process.calcDaysOfMonth(calDate.month, calDate.year).daysInMonth;

    //check days with lists for calendar
    calDaysWithList = process.checkDaysWithList(calDate);

    //UIcntrl draw calendar
    UIcntrl.drawCalendar(calDate, curDate, calDaysWithList);
  };
  var splitter = function(fullId){
    var result;
    result = fullId.split('-');

    return parseInt(result[1]);
  };
  var updatingToDoList = function(){
    UIcntrl.drawToDoList(todaysList, displayType);
    UIcntrl.updateTotal(todaysList);
    setEventListeners();
  };

  var selectDate = function(event){
    id = splitter(event.target.id);

    // if there is ID with number(with a date) update current date
    if(id){
      curDate.month = calDate.month;
      curDate.year = calDate.year;
      curDate.date = parseInt(id);

      day = calDate.startDay + curDate.date -1;
      curDate.dayOfWeek = day%7;

      UIcntrl.drawCurDate(curDate);

      todaysList = process.loadTodaysList(curDate);

      process.updateToDoList(curDate, todaysList);
      UIcntrl.clearAddToDoList();
      calDaysWithList = process.checkDaysWithList(calDate);
      updatingToDoList();
      UIcntrl.drawCalendar(calDate, curDate, calDaysWithList);
    }
  };

  var addToDoList = function(){
    var DOM = UIcntrl.getDOMstrings();

    var addDesc = document.querySelector(DOM.listAddDesc).value;
    if (addDesc != ""){
      // add Desc to todaysList
      todaysList.push({desc: addDesc, completed: 0});
      // add Desc to toDoList with curDate & month, year
      process.updateToDoList(curDate, todaysList);
      UIcntrl.clearAddToDoList();
      updatingToDoList();
      UIcntrl.drawCalendar(calDate, curDate, calDaysWithList);
    }
  };

  var completeList = function(event){
    var idNumber;
    idNumber = splitter(event.target.id);
    todaysList[idNumber].completed = 1;
    process.updateToDoList(curDate, todaysList);
    updatingToDoList();
  };

  var unCompleteList = function(event){
    var idNumber;
    idNumber = splitter(event.target.id);
    todaysList[idNumber].completed = 0;
    process.updateToDoList(curDate, todaysList);
    updatingToDoList();
  };

  var deleteList = function(event){
    var idNumber;
    idNumber = splitter(event.target.id);
    todaysList.splice(idNumber,1);
    process.updateToDoList(curDate, todaysList);
    updatingToDoList();
  };

  var displayAll = function(){
    if (displayType != 'all'){
      var formal = displayType;
      displayType = 'all';
      UIcntrl.toggleDisplayBtn(formal,'all');
      updatingToDoList();
    }
  };
  var displayActive = function(){
    if (displayType != 'active'){
      var formal = displayType;
      displayType = 'active';
      UIcntrl.toggleDisplayBtn(formal,'active');
      updatingToDoList();

    }
  };
  var displayComplete = function(){
    if (displayType !== 'complete'){
      var formal = displayType;
      displayType = 'complete';
      UIcntrl.toggleDisplayBtn(formal,'complete');
      updatingToDoList();
    }
  };
  var deleteCompleted = function(){
    for (i=0; i<todaysList.length; i++){
      if (todaysList[i].completed == 1){
        todaysList.splice(i,1);
        i--;
      }
    }
    process.updateToDoList(curDate, todaysList);
    process.deleteCompData(todaysList);
    updatingToDoList();
  };

  return {
    init: function(){
      setEventListeners();
      resetDate();
      UIcntrl.drawCurDate(curDate);
      UIcntrl.drawCalendar(calDate, curDate, calDaysWithList);
      UIcntrl.updateTotal(todaysList)
    }
  };

})(UIController,processor);

controller.init();



//
// var db;
//
// // Let us open our database
// var DBOpenRequest = window.indexedDB.open("toDoList", 4);
//
// DBOpenRequest.onsuccess = function(event) {
//   // store the result of opening the database in db.
//   db = DBOpenRequest.result;
//   console.log('Database initialised');
//   displayData();
// };
//
// // This event handles the event whereby a new version of
// // the database needs to be created Either one has not
// // been created before, or a new version number has been
// // submitted via the window.indexedDB.open line above
// DBOpenRequest.onupgradeneeded = function(event) {
//   var db = event.target.result;
//
//   db.onerror = function(event) {
//     console.log('Error loading database');
//   };
//
//   // Create an objectStore for this database
//
//   var objectStore = db.createObjectStore("toDoList", { keyPath: "taskTitle" });
//
//   // define what data items the objectStore will contain
//
//   objectStore.createIndex("completed", "completed", { unique: false });
//   objectStore.createIndex("day", "day", { unique: false });
//   objectStore.createIndex("month", "month", { unique: false });
//   objectStore.createIndex("year", "year", { unique: false });
//
//   console.log('Object store created');
// };
//
// // open a read/write db transaction, ready for adding the data
// var transaction = db.transaction(["toDoList"], "readwrite");
//
// // report on the success of the transaction completing, when everything is done
// transaction.oncomplete = function(event) {
//   console.log('Transaction completed');
// };
// transaction.onerror = function(event) {
//   console.log('Transaction not opened due to error. Duplicate items not allowed');
// };
//
// // create an object store on the transaction
// var objectStore = transaction.objectStore("toDoList");
//
// // Create a new item to add in to the object store
// var newItem = [
//   { taskTitle: "Walk dog", completed: "yes", day: 24, month: 'December', year: 2013}
// ];
//
// // make a request to add our newItem object to the object store
// var objectStoreRequest = objectStore.add(newItem[0]);
//
// objectStoreRequest.onsuccess = function(event) {
//   console.log('Request successful.');
// }
