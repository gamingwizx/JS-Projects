/* 
1) click button and show the calendar
    1) add an eventlistener to the button
    2) show the calendar when click buttons
        1) each number in the calendar will set the day
        2) clicking the next button will set the months and year of date
        
2) click the dates in the calendar, closes the calendar, and show the date in the button
    1) add event listener in each button in the calendar

    2) changes the date in the button
        
    3) closes the modal in the calendar
*/

/* 
1) npm init
2) npm install parcel && npm install date-fns
3) open the date-fns documentation
4) 
*/
import {
  format,
  compareAsc,
  addMonths,
  getUnixTime,
  fromUnixTime,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDate,
  isSameMonth,
  startOfWeek,
  endOfWeek,
  subMonths,
  isSameDay
} from "date-fns"

const calendarButton = document.querySelector(".date-picker-button")
const datePickerContainer = document.querySelector(".date-picker-container")
const datePicker = document.querySelector(".date-picker")
const datePickerGridDatesList = document.querySelector(
  ".date-picker-grid-dates"
)

const datePickerDate = document.querySelector(".current-month")

function setDayChosen(day) {
  const currentDateDay = datePicker.dataset.currentMonthandYear
}

function setMonthChosen() {
  const currentDate = datePickerDate.dataset.currentMonthandYear
  addMonths(currentDate, -1)
  datePickerDate.dataset.currentMonthandYear = currentDate
}

function setupDate(currentDate) {
  const datePicker = getUnixTime(currentDate)
  const formattedDate = format(currentDate, "MMMM dd, yyyy")
  calendarButton.dataset.currentDate = datePicker
  calendarButton.innerHTML = formattedDate
}

function setDateIntoButton(date) {
  const formattedDate = format(date, "MMMM dd, yyyy")
  calendarButton.dataset.currentDate = getUnixTime(date)
  calendarButton.innerHTML = formattedDate
}

function setupDayButtons(currentDate) {
  datePickerGridDatesList.innerHTML = ""
  const firstDay = startOfWeek(startOfMonth(currentDate))
  const lastDay = endOfWeek(endOfMonth(currentDate))
  const dates = eachDayOfInterval({ start: firstDay, end: lastDay })
  dates.forEach((date) => {
    const button = document.createElement("button")
    button.innerHTML = getDate(date)
    button.classList.add("date")

    if (!isSameMonth(date, currentDate)) {
      button.classList.add("date-picker-other-month-date")
    }

    if (isSameDay(date, currentDate)) {
      button.classList.add("selected")
    }
    datePickerGridDatesList.appendChild(button)

    button.addEventListener("click", (e) => {
      button.classList.add("selected")
      setDateIntoButton(date)

      datePicker.classList.toggle("show")
    })
  })
  //Get the current day, get the end and start of day
  //append it into a list
}

function getPreviousDate() {
  //1) set current date
  const currentDate = fromUnixTime(datePickerDate.dataset.selectedDate)
  const date = subMonths(currentDate, 1)
  return date
}

function getNextDate() {
  const currentDate = fromUnixTime(datePickerDate.dataset.selectedDate)
  const date = addMonths(currentDate, 1)
  return date
}

function setDateOnCalendarDisplay(date) {
  const formattedDate = format(date, "MMMM - yyyy")
  datePickerDate.innerHTML = formattedDate
  datePickerDate.dataset.selectedDate = getUnixTime(formattedDate)
}

function setDateSelectedOnCalendar(selectedDate) {}

calendarButton.addEventListener("click", (e) => {
  datePicker.classList.toggle("show")

  const selectedDate = fromUnixTime(calendarButton.dataset.currentDate)

  setDateOnCalendarDisplay(selectedDate)
  setupDayButtons(selectedDate)
})

datePickerContainer.addEventListener("click", (e) => {
  if (!e.target.matches(".prev-month-button")) return

  const previousDate = getPreviousDate(calendarButton.dataset.selectedDate)

  setDateOnCalendarDisplay(previousDate)
  setupDayButtons(previousDate)
})

datePickerContainer.addEventListener("click", (e) => {
  if (!e.target.matches(".next-month-button")) return

  const previousDate = getNextDate(calendarButton.dataset.selectedDate)

  setDateOnCalendarDisplay(previousDate)
  setupDayButtons(previousDate)
})

document.addEventListener("click", (e) => {
  if (!e.target.matches("date")) return

  const daySelected = e.target.matches(".date")
})

setupDate(new Date())
