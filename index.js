var numberofDrums = document.querySelectorAll(".drum").length;

// Variables to store the recording sequence
let recording = [];
let isRecording = false;

// Reference to the record and play buttons
const recordBtn = document.getElementById('record-btn');
const playBtn = document.getElementById('play-btn');
const beatBtn = document.getElementById('beat-btn'); // Button to generate random beat


const volumeControl = document.getElementById('volume-control');
const volumeLabel = document.getElementById('volume-label');

// Update the volume label when the slider is moved
volumeControl.addEventListener('input', () => {
  const volumeValue = Math.round(volumeControl.value * 100); // Convert to percentage
  volumeLabel.textContent = `${volumeValue}%`;
});

// Global Volume Variable
let volume = 0.5;

// Update Volume on Slider Change
document.getElementById("volume-control").addEventListener("input", function () {
  volume = this.value;
});

// Define drum sounds
const drumSounds = {
  w: new Audio("sounds/tom-1.mp3"),
  a: new Audio("sounds/tom-2.mp3"),
  s: new Audio("sounds/tom-3.mp3"),
  d: new Audio("sounds/tom-4.mp3"),
  j: new Audio("sounds/snare.mp3"),
  k: new Audio("sounds/crash.mp3"),
  l: new Audio("sounds/kick-bass.mp3")
};

// Function to play sound immediately
function makeSound(key) {
  if (drumSounds[key]) {
    var sound = drumSounds[key];
    sound.volume = volume; // Set volume dynamically
    sound.currentTime = 0; // Reset sound to start (important to avoid stacking sounds)
    sound.play(); // Play the sound immediately
  } else {
    console.log('No sound assigned for key:', key);
  }
}

// Function to handle button animation
function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  activeButton.classList.add("pressed");
  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);
}

// Function to start recording
recordBtn.addEventListener('click', () => {
  isRecording = !isRecording;
  if (isRecording) {
    recording = []; // Clear previous recording
    recordBtn.textContent = 'Stop Recording';
    playBtn.disabled = true; // Disable play until recording stops
  } else {
    recordBtn.textContent = 'Record';
    playBtn.disabled = false; // Enable play after recording
  }
});

// Function to start playing the recording
playBtn.addEventListener('click', () => {
  if (!recording.length) return;

  playBtn.textContent = 'Stop Playing';
  recordBtn.disabled = true; // Disable record button during playback

  let timeOffset = 0; // Start at the beginning of the sequence

  // Play each sound in the recording with a delay
  recording.forEach(drum => {
    setTimeout(() => {
      makeSound(drum); // Play sound
      buttonAnimation(drum); // Add animation
    }, timeOffset);
    timeOffset += 500; // Delay between sounds (adjust as needed)
  });

  // Reset buttons after playback
  setTimeout(() => {
    playBtn.textContent = 'Play';
    recordBtn.disabled = false; // Enable record button after playback
  }, timeOffset);
});

// Function to record drum sequence
const drums = document.querySelectorAll('.drum');
drums.forEach(drum => {
  drum.addEventListener('click', () => {
    if (isRecording) {
      recording.push(drum.classList[0]); // Record key for each drum clicked
    }

    // Play sound and add pressed effect
    makeSound(drum.classList[0]);
    buttonAnimation(drum.classList[0]);
  });
});

// Add event listener for keyboard press
document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase(); // Get the key pressed and convert it to lowercase
  if (drumSounds[key]) {
    if (isRecording) {
      recording.push(key); // Record key for each key pressed
    }

    makeSound(key); // Play the drum sound immediately
    buttonAnimation(key); // Add the button animation
  }
});

// Function to generate a random beat sequence
function generateRandomBeat() {
    const keys = ['w', 'a', 's', 'd', 'j', 'k', 'l']; // Available keys
    const randomBeat = [];
    const beatLength = 8; // Length of the sequence, can be adjusted
  
    // Generate a random sequence
    for (let i = 0; i < beatLength; i++) {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      randomBeat.push(randomKey);
    }
  
    return randomBeat;
  }
  
  // Function to play the generated beat sequence
  function playRandomBeat() {
    const randomBeat = generateRandomBeat();
    let timeOffset = 0; // Start at the beginning of the sequence
  
    // Play each sound in the random beat with a delay
    randomBeat.forEach(key => {
      setTimeout(() => {
        makeSound(key); // Play sound
        buttonAnimation(key); // Add animation
      }, timeOffset);
      timeOffset += 500; // Delay between sounds (adjust as needed)
    });
  }
  
  // Beat Generator Button Event
  beatBtn.addEventListener('click', () => {
    playRandomBeat(); // Play the random beat when the button is clicked
  });



// var numberofDrums = document.querySelectorAll(".drum").length;

// // Variables to store the recording sequence
// let recording = [];
// let isRecording = false;
// let isPlaying = false;

// // Reference to the record and play buttons
// const recordBtn = document.getElementById('record-btn');
// const playBtn = document.getElementById('play-btn');


// const volumeControl = document.getElementById('volume-control');
// const volumeLabel = document.getElementById('volume-label');

// // Update the volume label when the slider is moved
// volumeControl.addEventListener('input', () => {
//   const volumeValue = Math.round(volumeControl.value * 100); // Convert to percentage
//   volumeLabel.textContent = `${volumeValue}%`;
// });


// // Global Volume Variable
// let volume = 0.5;

// // Update Volume on Slider Change
// document.getElementById("volume-control").addEventListener("input", function () {
//   volume = this.value;
// });

// for (var i = 0; i < numberofDrums; i++) {
//   document.querySelectorAll(".drum")[i].addEventListener("click", function() {
    
//     var buttonInnerHTML = this.innerHTML;

//     makeSound(buttonInnerHTML);

//     buttonAnimation(buttonInnerHTML);

//   });

// }

// document.addEventListener("keydown", function(event) {

//     makeSound(event.key);

//     buttonAnimation(event.key);

// });

// function makeSound(key) {

//     switch (key) {
//         case "w":
//           var tom1 = new Audio("sounds/tom-1.mp3");
//           tom1.volume = volume;
//           tom1.play();
//           break;

//         case "a":
//             var tom2 = new Audio("sounds/tom-2.mp3");
//             tom2.volume = volume;
//             tom2.play();
//             break;
        
//         case "s":
//             var tom3 = new Audio("sounds/tom-3.mp3");
//             tom3.play();
//             break;
        
//         case "d":
//             var tom4 = new Audio("sounds/tom-4.mp3");
//             tom4.play();
//             break;
        
//         case "j":
//             var snare = new Audio("sounds/snare.mp3");
//             snare.play();
//             break;
        
//         case "k":
//             var crash = new Audio("sounds/crash.mp3");
//             crash.play();
//             break;
        
//         case "l":
//             var kick = new Audio("sounds/kick-bass.mp3");
//             kick.play();
//             break;
        
//         default: console.log(buttonInnerHTML);


//     }

// }

// function buttonAnimation(currentKey) {

//     var activeButton = document.querySelector("." + currentKey);

//     activeButton.classList.add("pressed");

//     setTimeout(function() {
//         activeButton.classList.remove("pressed");
//     }, 100);

// }

// // Function to start recording
// recordBtn.addEventListener('click', () => {
//     isRecording = !isRecording;
//     if (isRecording) {
//       recording = []; // Clear previous recording
//       recordBtn.textContent = 'Stop Recording';
//       playBtn.disabled = true; // Disable play until recording stops
//     } else {
//       recordBtn.textContent = 'Record';
//       playBtn.disabled = false; // Enable play after recording
//     }
//   });
  
//   // Function to start playing the recording
//   playBtn.addEventListener('click', () => {
//     if (!recording.length) return;
  
//     isPlaying = true;
//     playBtn.textContent = 'Stop Playing';
//     recordBtn.disabled = true; // Disable record button during playback
  
//     let timeOffset = 0; // Start at the beginning of the sequence
//     recording.forEach(drums => {
//       setTimeout(() => {
//         drums.forEach(drum => {
//           const drumElement = document.querySelector(`.${drum}`);
//           if (drumElement) {

//             drumSounds[drum].currentTime = 0; // Ensure sound starts from the beginning
//             drumSounds[drum].play();

//             drumElement.classList.add('pressed');
//             setTimeout(() => drumElement.classList.remove('pressed'), 200); // Press effect duration
//           }
//         });
//       }, timeOffset);
//       timeOffset += 500; // Delay between notes (adjust this for your needs)
//     });
  
//     setTimeout(() => {
//       playBtn.textContent = 'Play';
//       recordBtn.disabled = false; // Enable record button after playback
//     }, timeOffset);
//   });
  
//   // Function to record drum sequence
//   const drums = document.querySelectorAll('.drum');
//   drums.forEach(drum => {
//     drum.addEventListener('click', () => {
//       if (isRecording) {
//         recording.push([drum.classList[0]]); // Record which drum was pressed
//       }

//       // Play sound and add pressed effect
//     drumSounds[drum.classList[0]].currentTime = 0; // Reset sound to start
//     drumSounds[drum.classList[0]].play();
  
//       drum.classList.add('pressed');
//       setTimeout(() => drum.classList.remove('pressed'), 200); // Press effect
//     });
//   });