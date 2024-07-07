/*
  TODO: 2. Select all elements needed
    * The form element (has the id `quiz-form`)
    * The answer inputs (have the class `answer`)
    * BONUS: The questions (have the class `question-item`)
    * BONUS: The alert (has the id `alert`)
*/

// TODO: 3. Create a submit event listener for the form that does the following.
//    1. Prevent the default behaviour
//    2. Get all selected answers (use the `checked` property on the input to determine if it is selected or not)
//    3. Loop through the selected answer to see if they are correct or not (Check the value of the answer to see if it is the string "true")
//    4. For each correct answer add the class `correct` to the parent with the class `question-item` and remove the class `incorrect`.
//    5. For each incorrect answer add the class `incorrect` to the parent with the class `question-item` and remove the class `correct`.
//    6. BONUS: Make sure unanswered questions show up as incorrect. The easiest way to do this is to add the incorrect class and removing the correct class from all question items before checking the correct answers
//    7. BONUS: If all answers are correct show the element with the id `alert` and hide it after one second (look into setTimeout) (use the class active to show the alert and remove the class to hide it)

const formElement = document.querySelector("#quiz-form")
const questionItems = document.querySelectorAll(".question-item")
const alert = document.querySelector("#alert")
const questionItemsList = Array.from(questionItems)

const answers = document.querySelectorAll(".answer")
const answersList = Array.from(answers)

formElement.addEventListener("submit", (e) => {
  e.preventDefault()

  const correctAnswers = answersList.filter((answer) => {
    return answer.checked
  })

  correctAnswers.forEach((answer) => {
    const isAnswerCorrect = answer.value === "true"
    const questionItem = answer.closest(".question-item")

    if (isAnswerCorrect) {
      questionItem.classList.add("correct")
      questionItem.classList.remove("incorrect")
    } else {
      questionItem.classList.add("incorrect")
      questionItem.classList.remove("correct")
    }
  })

  const areAllAnswersCorrect = correctAnswers.every(
    (answer) => answer.value === "true"
  )

  if (areAllAnswersCorrect) {
    //1) the alert, show the alert
    // 1) add classlist called "active"

    alert.classList.add("active")
  }
})

/* 
1) when submit check, check for answers
  1) add event listener for submission of form
  2) get the id/class of form
  3) get the value of checked value input
    1) get the list of element with the id question item
    2) from that list, traverse downwards by looping through the elements, and check which element has a checked true
    3) if checked true, get the value within the answer item
  4) compare if the value equals to certain value
    1) create an object with the following property: correctness, answer, question
  5) if equal to the value, then follow the next step
2) if correct, mark the whole question as green
  1) get the element of the answer item
  2) add style color as green
  3) set it as correct
3) if wrong, mark the whole question as red
4) if all correct, show a pop up window
*/
