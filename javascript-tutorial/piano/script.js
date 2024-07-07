/* 
1) when hit certain keys, it will trigger the event listener of each keys
    1) associate each keys on the keyboard with the keys on the screen
        1) create an object that associates keys, note and frequency
2) create event listener for each keys
    1) loop through the object containing the keys, note and frequency
    2) create an element in javascript that uses the data node as reference
    3) add event listener to each elements
2) on triggering the event listener, it will create a sound
    1) create a script that plots the keys associated with the frequency
    2) in the event listener, loop through the object to get the frequency

    To set the volume between sounds
    1) audioContext.gain.value = gain
    2) the gain would be gain = 1 / activenotes.length
    3) 

    */

const audioContext = new AudioContext()

const NOTE_KEYS = [
  {
    note: "C",
    key: "A",
    frequency: 261.626,
    active: false
  },
  {
    note: "Dd",
    key: "S",
    frequency: 277.183,
    active: false
  },
  {
    note: "D",
    key: "D",
    frequency: 293.655,
    active: false
  },
  {
    note: "Eb",
    key: "F",
    frequency: 311.127,
    active: false
  },
  {
    note: "E",
    key: "G",
    frequency: 329.628,
    active: false
  },
  {
    note: "F",
    key: "H",
    frequency: 349.228,
    active: false
  },
  {
    note: "Gb",
    key: "J",
    frequency: 369.994,
    active: false
  },
  {
    note: "G",
    key: "K",
    frequency: 391.995,
    active: false
  },
  {
    note: "Ab",
    key: "L",
    frequency: 415.305,
    active: false
  },
  {
    note: "A",
    key: "I",
    frequency: 440,
    active: false
  },
  {
    note: "Bb",
    key: "O",
    frequency: 466.164,
    active: false
  },
  {
    note: "B",
    key: "P",
    frequency: 493.883,
    active: false
  }
]

document.addEventListener("keyup", (e) => {
  const noteDetail = getNoteDetail(e.code)

  if (noteDetail == null) return
  const keyElement = document.querySelector(`[data-note="${noteDetail.note}"]`)
  keyElement.classList.remove("pressed")
  stopNote(noteDetail)
})

document.addEventListener("keydown", (e) => {
  const noteDetail = getNoteDetail(e.code)

  if (noteDetail == null) return

  const keyElement = document.querySelector(`[data-note="${noteDetail.note}"]`)
  keyElement.classList.toggle("pressed")
  playNote(noteDetail)
})

// NOTE_KEYS.forEach((noteObject) => {
//   const element = document.querySelector(`[data-note="${noteObject.note}"]`)
// })
function playNote(noteDetail) {
  if (!noteDetail.active) {
    noteDetail.active = true

    const activeNotes = NOTE_KEYS.filter((elements) => elements.active)
    const gain = 10 / activeNotes.length

    startNote(noteDetail, gain)
  }
}

function getNoteDetail(note) {
  for (i = 0; i < NOTE_KEYS.length; i++) {
    if (`Key${NOTE_KEYS[i].key}` == note) {
      return NOTE_KEYS[i]
    }
  }
}

// function playNote(noteObject) {

// }

function stopNote(noteDetail) {
  if (noteDetail.oscillator != null) {
    noteDetail.oscillator.stop()
    noteDetail.oscillator.disconnect()
    noteDetail.active = false
  }
}

function startNote(noteDetail, gain) {
  const gainNode = audioContext.createGain()
  gainNode.gain.value = gain
  const oscillator = audioContext.createOscillator()
  oscillator.frequency.value = noteDetail.frequency
  oscillator.type = "sine"
  oscillator.connect(audioContext.destination)
  oscillator.start()
  noteDetail.oscillator = oscillator
}
