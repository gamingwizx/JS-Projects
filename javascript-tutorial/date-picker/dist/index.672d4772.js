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
*/ /* 
1) npm init
2) npm install parcel && npm install date-fns
3) open the date-fns documentation
4) 
*/ const calendarButton = document.querySelector(".date-picker-button");
const datePickerContainer = document.querySelector(".date-picker-container");
const datePicker = document.querySelector(".date-picker");
console.log(calendarButton);
calendarButton.addEventListener("click", (e)=>{
    datePicker.classList.toggle("show");
});
datePickerContainer.addEventListener("click", (e)=>{});

//# sourceMappingURL=index.672d4772.js.map
