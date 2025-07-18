// script.js
// Configuration for the city scene
const config = {
  buildings: 15,                // Number of buildings
  people: 50,                   // Number of people
  time: new Date().getHours(),  // Hour of the day (default: current hour)
  signageDistance: 350,         // Distance (in px) between digital signages
  vehicles: 80,                 // Number of vehicles per lane
  maxWindowOn: 5,               // Max windows turning on at once
  maxWindowOff: 5,              // Max windows turning off at once
  windowLitProbability: 0.4,    // Probability of windows being lit at night
  windowTurnOnProbability: 0.3, // Probability of a window turning on
  windowTurnOffProbability: 0.3 // Probability of a window turning off
};

config.time = 18

const isNight = config.time >= 18 || config.time < 6;
const $city = $('#city');

$city.css('background', isNight
  ? 'linear-gradient(to bottom, #000022 0%, #222 100%)'
  : 'linear-gradient(to bottom, #87ceeb 0%, #f0f0f0 100%)'
);
if (isNight) {
  for (let i = 0; i < 80; i++) {
  const star = $('<div class="star"></div>');
  const size = Math.random() * 2 + 1;
  const duration = 5 + Math.random() * 2;     // 1s to 3s
  const delay = Math.random() * 1;            // up to 3s delay
  const x = Math.random() * 1900;
  const y = Math.random() * 400;

  // Add unique animation for each star
  const animationName = `twinkle-${i}`;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ${animationName} {
      0%   { opacity: 0.2; }
      50%  { opacity: ${0.5 + Math.random() * 0.5}; }
      100% { opacity: 0.2; }
    }
  `;
  document.head.appendChild(style);

  star.css({
    width: `${size}px`,
    height: `${size}px`,
    top: `${y}px`,
    left: `${x}px`,
    animation: `${animationName} ${duration}s ease-in-out ${delay}s infinite`
  });

  $city.append(star);
}

} else {
$(document).ready(function () {
  const $city = $('#city'); // make sure this exists first

  const cloudImages = ['cloud1.png','cloud2.png','cloud3.png','cloud4.png'];

  function spawnCloud() {
    const imgName = cloudImages[Math.floor(Math.random() * cloudImages.length)];
    const size = 1 + Math.random() * 100;
    const top = Math.random() * 120;
    const speed = 300 + Math.random() * 300; // slower for natural movement
    // const delay = Math.random() * 20; // random delay to spread clouds
    const delay = -Math.random() * speed; // negative value, starts cloud midway
    const startX = -300 + Math.random() * 1600;  // can start anywhere
    const endX = startX + 1000 + Math.random() * 800; // move to right
    // const delay = first ? -Math.random() * speed : Math.random() * 20;
    const $cloud = $(`
      <div class="cloud">
        <img src="public/assets/clouds/${imgName}" style="width: 100%; height: auto;" />
      </div>
    `).css({
      top: `${top}px`,
      width: `${size}px`,
      animationDuration: `${speed}s`,
      animationDelay: `${delay}s`,
      '--start-x': `${startX}px`,
      '--end-x': `${endX}px`
    });

    $cloud.on('animationend webkitAnimationEnd oAnimationEnd', () => {
      $cloud.remove();
      // spawnCloud(); // respawn
      spawnCloud(false);
    });

    $city.append($cloud);
  }
for (let i = 0; i < 6; i++) {
    spawnCloud(true);
  }
  // for (let i = 0; i < 6; i++) spawnCloud();
 for (let i = 0; i < 6; i++) {
    setTimeout(spawnCloud, Math.random() * 10000);
  }


  // 🐦 Bird logic
  const birdImages = ['bird1.gif','bird2.gif'];

  function spawnBird() {
    const imgName = birdImages[Math.floor(Math.random() * birdImages.length)];
    const size = 300 + Math.random() * 70;
    const top = 20 + Math.random() * 80;
    const speed = 1 + Math.random() * 50; // moderate natural bird flight speed
    const delay = Math.random() * 10; // random delay to spread birds
    const scale = 0.6 + Math.random() * 0.4;
    const startX = -200 - Math.random() * 300;
    const endX = 2000 + Math.random() * 200;
    const midX = (startX + endX) / 2;
    const $bird = $(`
      <div class="bird" style="
        --start-x: ${startX}px;
        --mid-x: ${midX}px;
        --end-x: ${endX}px;
        --scale: ${scale};
        top: ${top}px;
        width: ${size}px;
        animation-duration: ${speed}s;
        animation-delay: ${delay}s;
      ">
        <img src="public/assets/birds/${imgName}" alt="bird" />
      </div>
    `);

    $bird.on('animationend webkitAnimationEnd oAnimationEnd', () => {
      $bird.remove();
      setTimeout(spawnBird, Math.random() * 5000 + 2000); // add natural delay between bird spawns
    });

    $city.append($bird);
  }

  // Start with a few birds
  for (let i = 0; i < 2; i++) {
    // spawnBird();
     setTimeout(spawnBird, Math.random() * 5000);
  }
});


}


for (let i = 0; i < config.buildings; i++) {
  // Set width to a random multiple of 9 between 54 and 81px
  const minWidth = 45;
  const maxWidth = 81;
  const possibleWidths = [];
  for (let w = minWidth; w <= maxWidth; w += 9) possibleWidths.push(w);
  const width = possibleWidths[Math.floor(Math.random() * possibleWidths.length)];
  const windowSize = 5;
  const windowMargin = 2;
  const minHeight = 100;
  const height = minHeight + Math.random() * 200; // random height, always at least 100px for base
  const left = Math.random() * (1905 - width);

  const $building = $('<div class="building"></div>').css({
    height: height + 'px',
    width: width + 'px',
    left: left + 'px',
    background: `hsl(0, 0%, ${20 + Math.random() * 10}%)`, // slight variations of gray
    zIndex: i + 5// z-index based on creation order, starting from 1
  });

  // Set .buildingwindows height to building height minus random 100-150px
  const reduceHeight = 40 + Math.random() * 50; // 100px to 150px
  const $buildingWindows = $('<div class="buildingwindows"></div>').css({
    width: width + 'px',
    height: (height - reduceHeight) + 'px'
  });

  let windowCount = 0;
  let maxWindowCount = Math.floor(width/(windowSize + 2 * windowMargin)) * Math.floor((height - reduceHeight)/(windowSize + 2 *windowMargin))
  for (let i = 0; i < maxWindowCount; i++) {
    const $window = $('<div class="window"></div>');
  
    if (!isNight || Math.random() > config.windowLitProbability) {
      $window.css('background-color', '#222');
      $window.data('lit', false);
    } else {
      $window.css('background-color', 'yellow');
      $window.data('lit', true);
    }
  
    $buildingWindows.append($window);
    windowCount++;
  }
  $building.append($buildingWindows);
  
  // Add door to building
  const doorPadding = 5 + Math.random() * 35; // 5px to 40px
  const doorHeight = Math.min(30, height - reduceHeight - 10); // max 30px, but not taller than window area
  const minDoorWidth = width * 0.4; // minimum 40% of building width
  const maxDoorWidth = width - (2 * doorPadding);
  const doorWidth = Math.max(minDoorWidth, maxDoorWidth);
  const $door = $('<div class="building-door"></div>').css({
    position: 'absolute',
    bottom: '0px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: doorWidth + 'px',
    height: doorHeight + 'px',
    background: '#000',
    border: '1px solid #333',
    borderRadius: '2px 2px 0 0'
  });
  $building.append($door);
  
  $city.append($building);
}

$city.append('<div class="walkway"></div>');
const $walkway = $city.find('.walkway');

// Add paved stone patterns to walkway
const stoneSize = 12;
const stoneMargin = 1;
const walkwayWidth = 1905;
const walkwayHeight = 20;
const stonesPerRow = Math.floor(walkwayWidth / (stoneSize + stoneMargin));
const stoneRows = Math.floor(walkwayHeight / (stoneSize + stoneMargin));

const $pavementContainer = $('<div class="pavement-container"></div>');
for (let r = 0; r < stoneRows; r++) {
  for (let c = 0; c < stonesPerRow; c++) {
    const $stone = $('<div class="pavement-stone"></div>').css({
      position: 'absolute',
      width: stoneSize + 'px',
      height: stoneSize + 'px',
      left: (c * (stoneSize + stoneMargin)) + 'px',
      top: (r * (stoneSize + stoneMargin)) + 'px',
      background: `hsl(0, 0%, ${40 + Math.random() * 20}%)`,
      borderRadius: '1px',
      border: '1px solid #666'
    });
    $pavementContainer.append($stone);
  }
}
$walkway.append($pavementContainer);

const wallstoneSize = 5;
const wallstoneMargin = 1;
const wallwalkwayWidth = 1905;
const wallwalkwayHeight =10;
const wallstonesPerRow = Math.floor(wallwalkwayWidth / (wallstoneSize + wallstoneMargin));
const wallstoneRows = Math.floor(wallwalkwayHeight / (wallstoneSize + wallstoneMargin));
const $wallContainer = $('<div class="wall-container"></div>');
for (let r = 0; r < wallstoneRows; r++) {
  for (let c = 0; c < wallstonesPerRow; c++) {
    const $wallstone = $('<div class="wall-stone"></div>').css({
      position: 'absolute',
      width: wallstoneSize + 'px',
      height: wallstoneSize + 'px',
      left: (c * (wallstoneSize + wallstoneMargin)) + 'px',
      top: (r * (wallstoneSize + wallstoneMargin)) + 'px',
      background: `hsl(0, 0%, ${40 + Math.random() * 20}%)`,
      borderRadius: '1px',
      border: '1px solid #0c0b0bff'
    });
    $wallContainer.append($wallstone);
  }
}
$walkway.append($wallContainer);
//giving colours
function randomNeonColor() {
  const colors = [
    '#c4f2bbff', // neon green
    '#f3adadff', // neon red
    '#a7f3f3ff', // cyan
    '#ef81efff', // magenta
    '#f3f3a0ff', // bright yellow
    '#f1b4daff', // pink
    '#7ff1c5ff', // neon aqua
    '#f19a78ff', // orange
    '#c887f0ff'  // violet
      // '#39FF14', // neon green
      // '#FF3131', // neon red
      // '#00FFFF', // cyan
      // '#FF00FF', // magenta
      // '#FFFF33', // bright yellow
      // '#FF6EC7', // pink
      // '#00FF9F', // neon aqua
      // '#FF5F1F', // orange
      // '#9D00FF'  // violet
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};


// Create wrapper for signages
const $signageWrapper = $('<div class="signage-wrapper"></div>');
const signageCount = Math.floor(1905 / config.signageDistance);
for (let i = 0; i < signageCount; i++) {
  // Center each signage in the walkway using a wrapper div
  const $signageItemWrapper = $('<div class="digital-signage-wrapper" style="position:absolute; left:' + (i * config.signageDistance + config.signageDistance / 2) + 'px; bottom:20px; width:0; height:100%;"></div>');
  const $signage = $('<div class="digital-signage">AD</div>');
  const $base = $('<div class="digital-signage-base"></div>');
  $signageItemWrapper.append($signage).append($base);
  $signageWrapper.append($signageItemWrapper);
}

const glowColor = randomNeonColor();
const textColor = randomNeonColor();

function animateSignages() {
  $('.digital-signage').each(function () {
    const color = randomNeonColor();
    $(this).css({
  '--glow-color': color, // Used by ::after
  'box-shadow': `0 0 10px ${color}, 0 0 20px ${color}`, // Neon glow
  'border-color': color, // Optional: makes border pulse with glow
  'background-color': color, // ❌ Avoid unless you want to change signage background
});

  });
}

setInterval(animateSignages, 800); // Change every 800ms

$walkway.append($signageWrapper);


// Create wrapper for streetlights
const $streetlightWrapper = $('<div class="streetlight-wrapper"></div>');
for (let i = 0; i < 10; i++) {
  const left = i * 180 + 40;
  const isMorning = config.time >= 6 && config.time < 12;
  const lightColor = isNight ? '#ffff80' : (isMorning ? '#f0f0f0':'#f0f0f0');
  const $light = $(`<div class="streetlight" style="left:${left}px; bottom:20px;">
    <div class="light" style="background:${lightColor}"></div>
  </div>`);
  $streetlightWrapper.append($light);
  
  // Add streetlight reflection on walkway
  if (isNight || isMorning) {
    const $reflection = $('<div class="streetlight-reflection"></div>').css({
      position: 'absolute',
      left: (left - 15) + 'px',
      bottom: '0px',
      width: '30px',
      height: '25px',
      background: `radial-gradient(ellipse, ${lightColor}60 0%, transparent 70%)`,
      borderRadius: '50%',
      zIndex: 50
    });
    $streetlightWrapper.append($reflection);
  }
}
$walkway.append($streetlightWrapper);

// Create wrapper for people
const $peopleWrapper = $('<div class="people-wrapper"></div>');

$city.append('<div class="road"></div>');

const $road = $city.find('.road');
$road.append('<div class="median"></div>');
$road.append('<div class="lefttoright-road"></div>');
$road.append('<div class="righttoleft-road"></div>');

const $leftToRight = $road.find('.lefttoright-road');
const $rightToLeft = $road.find('.righttoleft-road');

// Style for road lanes
$leftToRight.css({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '32px',
  zIndex: 55
});
$rightToLeft.css({
  position: 'absolute',
  left: 0,
  bottom: 20,
  width: '100%',
  height: '32px',
  zIndex: 55
});


// const $curb = $('<div class="curb-line"></div>').css({
//   position: 'absolute',
//   left: 0,
//   bottom: '58px',
//   width: '100%',
//   height: '6px',
//   background: '#333',
//   boxShadow: '0 -2px 4px #0005',
//   zIndex: 51
// });
// $road.append($curb);

// Add digital signages to the walkway (not city)
// This block is now redundant as signages are handled by $signageWrapper
// const signageCount = Math.floor(1905 / config.signageDistance);
// for (let i = 0; i < signageCount; i++) {
//   // Center each signage in the walkway using a wrapper div
//   const $signageWrapper = $('<div class="digital-signage-wrapper" style="position:absolute; left:' + (i * config.signageDistance + config.signageDistance / 2) + 'px; bottom:20px; width:0; height:100%;"></div>');
//   const $signage = $('<div class="digital-signage">AD</div>');
//   const $base = $('<div class="digital-signage-base"></div>');
//   $signageWrapper.append($signage).append($base);
//   $walkway.append($signageWrapper);
// }

// for (let i = 0; i < 10; i++) {
//   const left = i * 180 + 40;
//   const isMorning = config.time >= 6 && config.time < 12;
//   const lightColor = isNight ? '#ffff80' : (isMorning ? '#f0f0f0' : 'transparent');
//   const $light = $(`<div class="streetlight" style="left:${left}px; bottom:30px;">
//     <div class="light" style="background:${lightColor}"></div>
//   </div>`);
//   $walkway.append($light);
  
//   // Add streetlight reflection on walkway
//   if (isNight || isMorning) {
//     const $reflection = $('<div class="streetlight-reflection"></div>').css({
//       position: 'absolute',
//       left: (left - 15) + 'px',
//       bottom: '0px',
//       width: '30px',
//       height: '25px',
//       background: `radial-gradient(ellipse, ${lightColor}60 0%, transparent 70%)`,
//       borderRadius: '50%',
//       zIndex: 101
//     });
//     $walkway.append($reflection);
//   }
// }

// Animate people
const peopleRefs = [];
const leftPeopleImages = ['walkl1.png', 'walkl2.png', 'walkl3.png','walkl4.png', 'walkl5.png'];
const rightPeopleImages = ['walkr1.png', 'walkr2.png', 'walkr3.png','walkr4.png', 'walkr5.png'];

function createPerson(id) {
  // Place person at a random horizontal position within the city width
 const direction = Math.random() < 0.5 ? 'left' : 'right';
const imgList = direction === 'left' ? leftPeopleImages : rightPeopleImages;
const imgName = imgList[Math.floor(Math.random() * imgList.length)];

const left = direction === 'left'
  ? 1905 + Math.random() * 300   // start from right if walking left
  : -100 + Math.random() * 300;  // start from left if walking right

const bottom = Math.random() *12;

const $person = $(`
  <div class="person person-${id} ${direction}">
    <img src="./public/assets/people/${imgName}" style="width: 100%; height: 100%;" />
  </div>
`).css({
  left: left + 'px',
  bottom: bottom + 'px',
  width: '10px',
  height: '15px',
  position: 'absolute'
});

  $peopleWrapper.append($person);
  peopleRefs.push($person);
  animatePerson($person);
}

function getNearbyPeople($person, distance = 50) {
  const myLeft = parseFloat($person.css('left'));
  return peopleRefs.filter(ref => {
    if (ref[0] === $person[0]) return false;
    const otherLeft = parseFloat(ref.css('left'));
    return Math.abs(myLeft - otherLeft) <= distance;
  });
}

function animatePerson($person) {
  let speed = 0 + Math.random()*0.5;
  let paused = false;
  let groupDelay = 3000 + Math.random() * 3000;

  function move() {
    let currentLeft = parseFloat($person.css('left'));
if ($person.hasClass('left') && currentLeft < -50) {
  $person.css('left', 1905 + Math.random() * 300 + 'px');
  setTimeout(move, 50);
  return;
} else if ($person.hasClass('right') && currentLeft > 1920) {
  $person.css('left', -100 + Math.random() * 300 + 'px');
  setTimeout(move, 50);
  return;
}

   

    // Check for group pause: only pause if 2 or more others are within 50px (group of 3+)
    const nearby = getNearbyPeople($person);
    if (!paused && nearby.length >= 2 && Math.random() < 0.01) {
      paused = true;
      setTimeout(() => {
        paused = false;
        move();
      }, groupDelay);
      return;
    }

    if (!paused) {
      if ($person.hasClass('left')) {
  $person.css('left', (currentLeft - speed) + 'px');
} else {
  $person.css('left', (currentLeft + speed) + 'px');
}

    }
     const currentBottom = parseFloat($person.css('bottom'));
  const signageBase = 15;
  if (currentBottom >= signageBase) {
    $person.css('z-index', 85);
  } else {
    $person.css('z-index', 102);
  }
    requestAnimationFrame(move);
  }

  requestAnimationFrame(move);
}

for (let i = 0; i < config.people; i++) {
  createPerson(i);
}
$walkway.append($peopleWrapper);

// Vehicle logic
const ltrVehicleImages = [
  'biker.png',
  'pickupr.png',
  'carr.png',
  'busr.png',
  'truckr.png'
];
const rtlVehicleImages = [
  'bikel.png',
  'pickupl.png',
  'carl.png',
  'busl.png',
  'truckl.png'
];
function createVehicle(lane, direction, id, prevEnd = null) {
  // Get correct image list for the lane direction
  const vehicleList = direction === 'ltr' ? ltrVehicleImages : rtlVehicleImages;
  const imgName = vehicleList[Math.floor(Math.random() * vehicleList.length)];

  // Assign size based on vehicle type (filename)
  let width, height;
  if (imgName.includes('bus') || imgName.includes('truck')) {
    // Bus and Truck: largest
    width = 120 + Math.random() * 30;
    height = 40 + Math.random() * 10;
  } else if (imgName.includes('pickup')) {
    // Pickup: between truck and car
    width = 90 + Math.random() * 15;
    height = 35 + Math.random() * 10;
  } else if (imgName.includes('car')) {
    width = 70 + Math.random() * 20;
    height = 35 + Math.random() * 5;
  } else if (imgName.includes('bike')) {
    width = 40 + Math.random() * 10;
    height = 25 + Math.random() * 5;
  } else {
    width = 70;
    height = 30;
  }

  const margin = 30 + Math.random() * 120;
  let pos;
  if (prevEnd !== null) {
    pos = prevEnd + margin;
  }

  const $vehicle = $(`
    <div class="vehicle-${direction}-${id}">
      <img src="./public/assets/vehicles/veh/${imgName}" style="width: 100%; height: 100%;" />
    </div>
  `).css({
    position: 'absolute',
    width: width + 'px',
    height: height + 'px',
    bottom: direction === 'ltr' ? (2 + Math.random() * 10) + 'px' : '',
    top: direction === 'rtl' ? (2 + Math.random() * 10) + 'px' : '',
    left: direction === 'ltr' && pos !== undefined ? pos + 'px' : '',
    right: direction === 'rtl' && pos !== undefined ? pos + 'px' : ''
  });

  $vehicle.data('width', width);
  $vehicle.data('margin', margin);
  lane.append($vehicle);
  return $vehicle;
}
function createVehiclesWithSpacing(lane, direction, count) {
  const vehicles = [];
  let pos = 0;

  for (let i = 0; i < count; i++) {
    const $v = createVehicle(lane, direction, i);
    const width = $v.data('width');
    const margin = 30 + Math.random() * 120;

    if (direction === 'ltr') {
      $v.css('left', pos + 'px');
    } else {
      $v.css('right', pos + 'px');
    }

    pos += width + margin;
    vehicles.push($v);
  }

  return vehicles;
}
function animateVehicles(vehicles, direction) {
  function moveAll() {
    vehicles.forEach(($v, idx) => {
      const prop = direction === 'ltr' ? 'left' : 'right';
      let pos = parseFloat($v.css(prop));
      const width = $v.width();
      const speed = 1.5; // fixed speed for linear flow

      // Move vehicle forward
      $v.css(prop, (pos + speed) + 'px');

      // If off screen, recycle to back of line

        if (pos > 1905) {
        const lastVehicle = vehicles.reduce((max, v) => {
          const p = parseFloat(v.css(prop));
          return p > max ? p : max;
        }, 0);
        
        const margin = 40 + Math.random() * 100;
        const newPos = lastVehicle + $v.width() + margin;

        $v.css(prop, newPos + 'px');
      }
    });

    requestAnimationFrame(moveAll);
  }

  moveAll();
}

const ltrVehicles = createVehiclesWithSpacing($leftToRight, 'ltr', config.vehicles);
const rtlVehicles = createVehiclesWithSpacing($rightToLeft, 'rtl', config.vehicles);
animateVehicles(ltrVehicles, 'ltr');
animateVehicles(rtlVehicles, 'rtl');

// Dynamic window lighting logic
function dynamicWindowLighting() {
  const $windows = $('.buildingwindows .window');
  let turningOn = 0;
  let turningOff = 0;

  function blinkWindow($w, on, cb) {
    let count = 0;
    function blink() {
      $w.css('background-color', count % 2 === 0 ? (on ? 'yellow' : '#222') : (on ? '#222' : 'yellow'));
      count++;
      if (count < 6) {
        setTimeout(blink, 120);
      } else {
        $w.css('background-color', on ? 'yellow' : '#222');
        $w.data('lit', on);
        if (cb) cb();
      }
    }
    blink();
  }

  function trySwitch() {
    // Turn on windows
    if (turningOn < config.maxWindowOn) {
      const offWindows = $windows.filter(function() { return !$ (this).data('lit'); });
      if (offWindows.length > 0 && Math.random() < config.windowTurnOnProbability) {
        const $w = $(offWindows[Math.floor(Math.random() * offWindows.length)]);
        turningOn++;
        blinkWindow($w, true, () => { turningOn--; });
      }
    }
    // Turn off windows
    if (turningOff < config.maxWindowOff) {
      const onWindows = $windows.filter(function() { return $ (this).data('lit'); });
      if (onWindows.length > 0 && Math.random() < config.windowTurnOffProbability) {
        const $w = $(onWindows[Math.floor(Math.random() * onWindows.length)]);
        turningOff++;
        blinkWindow($w, false, () => { turningOff--; });
      }
    }
    setTimeout(trySwitch, 400 + Math.random() * 600);
  }
  trySwitch();
}
if (isNight) {
  setTimeout(dynamicWindowLighting, 2000);
} 
// function createVehiclesWithSpacing(lane, direction, count) {
//   const vehicles = [];
//   let prevEnd = null;
//   for (let i = 0; i < count; i++) {
//     const $v = createVehicle(lane, direction, i, prevEnd);
//     const width = $v.data('width');
//     const margin = $v.data('margin');
//     if (direction === 'ltr') {
//       prevEnd = parseFloat($v.css('left')) + width;
//       prevEnd += margin;
//     } else {
//       prevEnd = parseFloat($v.css('right')) + width;
//       prevEnd += margin;
//     }
//     vehicles.push($v);
//   }
//   return vehicles;
// }
// function animateVehicles(vehicles, direction) {
//   let paused = false;
//   let groupDelay = 2000 + Math.random() * 3000;
// let speed = 1 + Math.random() * 1;

//   function moveAll() {
//     if (paused) {
//       setTimeout(moveAll, 50);
//       return;
//     }
//     let anyStopped = false;
//     // Calculate the furthest vehicle's end position
//     let furthestEnd = null;
//     vehicles.forEach(($v, idx) => {
//       let pos = parseFloat($v.css(direction === 'ltr' ? 'left' : 'right'));
//       const width = $v.width();
//       const margin = $v.data('margin') || 30;
//       let speed = 1 + Math.random() * 2;
//       // if (Math.random() < 0.002) {
//       //   // Randomly pause all vehicles
//       //   paused = true;
//       //   setTimeout(() => {
//       //     paused = false;
//       //     moveAll();
//       //   }, groupDelay);
//       //   anyStopped = true;
//       //   return;
//       // }
//       if (direction === 'ltr') {
//         if (pos > 1905) {
//           // Find the max right edge among all vehicles
//           // let maxRight = Math.max(...vehicles.map(v => parseFloat(v.css('left')) + v.width()));
//           // let newPos = maxRight + margin;
//           // $v.css('left', newPos + 'px');
//           const width = $v.data('width') || 80;
//           const margin = 50 + Math.random() * 120;
//           const newPos = -width - Math.random() * 200;
//           $v.data('margin', margin);
//           $v.css('left', newPos + 'px');

//         } else {
//           $v.css('left', (pos + speed) + 'px');
//         }
//       } else {
//         if (pos > 1905) {
//           // Find the max right edge among all vehicles (for right lane, use right property)
//           // let maxRight = Math.max(...vehicles.map(v => parseFloat(v.css('right')) + v.width()));
//           // let newPos = maxRight + margin;
//           // $v.css('right', newPos + 'px');
//           const width = $v.data('width') || 80;
//           const margin = 50 + Math.random() * 120;
//           const newPos = -width - Math.random() * 200;
//           $v.data('margin', margin);
//           $v.css('right', newPos + 'px');

//         } else {
//           $v.css('right', (pos + speed) + 'px');
//         }
//       }
//     });
//     if (!anyStopped) requestAnimationFrame(moveAll);
//   }
//   moveAll();
// }

// Create and animate vehicles for both lanes




// function createVehicle(lane, direction, id, prevEnd = null) {
//   const imgName = vehicleList[Math.floor(Math.random() * vehicleList.length)];

// let width, height;

// if (imgName.includes('bus') || imgName.includes('truck')) {
//   // Bus and Truck are the biggest
//   width = 120 + Math.random() * 30;
//   height = 40 + Math.random() * 10;
// } else if (imgName.includes('pickup')) {
//   // Pickup is between truck and car
//   width = 90 + Math.random() * 15;
//   height = 35 + Math.random() * 10;
// } else if (imgName.includes('car')) {
//   width = 70 + Math.random() * 20;
//   height = 30 + Math.random() * 5;
// } else if (imgName.includes('bike')) {
//   width = 40 + Math.random() * 10;
//   height = 25 + Math.random() * 5;
// } else {
//   width = 70;
//   height = 30;
// }

//   const vehicleList = direction === 'ltr' ? ltrVehicleImages : rtlVehicleImages;
//   // const imgName = vehicleList[Math.floor(Math.random() * vehicleList.length)];
//   //  const width = 60 + Math.random() * 40;
//   // const height = 30 + Math.random() * 20;
//   const margin = 30 + Math.random() * 120;
//   let pos;
//   if (prevEnd !== null) {
//     pos = prevEnd + margin;
//   } else {
//     // pos = direction === 'ltr' ? (-width - Math.random()*200) : (-width - Math.random()*200);
//     // pos = -width - (Math.random() * 1000); // random scatter across start zone
// }
//  const $vehicle = $(`
//     <div class="vehicle-${direction}-${id}">
//       <img src="./public/assets/vehicles/veh/${imgName}" style="width: 100%; height: 100%;" />
//     </div>
//   `).css({
//     position: 'absolute',
//     width: width + 'px',
//     height: height + 'px',
//     bottom: direction === 'ltr' ? (2 + Math.random() * 10) + 'px' : '',
//     top: direction === 'rtl' ? (2 + Math.random() * 10) + 'px' : '',
//     left: direction === 'ltr' ? pos + 'px' : '',
//     right: direction === 'rtl' ? pos + 'px' : ''
//   });
//   $vehicle.data('width', width);
//   $vehicle.data('margin', margin);
//   lane.append($vehicle);
//   return $vehicle;
// }