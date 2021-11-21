const menuBtn = document.querySelector(".menu_bar");
const displayToggleArray = [
  document.querySelector(".sidebar .title"),
  document.querySelector(".sidebar .sider_bar_footer"),
  document.querySelector(".sidebar .bar_logo .logo"),
  ...document.querySelectorAll(".sidebar .navigation_menu ul li a .label"),
];
const widthToggleArray = [
  document.querySelector(".header"),
  document.querySelector(".body"),
  document.querySelector(".footer"),
];
menuBtn.addEventListener("click", () => {
  if (window.innerWidth > 992) {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("expended");
    widthToggleArray.forEach((c) => c.classList.toggle("viewPortToggle"));
    if (sidebar.classList.contains("expended")) {
      displayToggleArray.forEach((c) => (c.style.display = "none"));
    } else {
      setTimeout(() => {
        displayToggleArray.forEach((c) => (c.style.display = "block"));
      }, 300);
    }
  } else {
    menuBtn.classList.toggle("cross_bar");
    document
      .querySelector(".mobile_menu_wrapper")
      .classList.toggle("sidebarinout");
  }
});

const profilesTriggers = document.querySelector(".profiles_triggers");
const profileTriggersDropdown = document.getElementById("p_t_dropdown");
profileTriggersDropdown.addEventListener("click", () => {
  if (profilesTriggers.style.display === "flex") {
    profileTriggersDropdown.innerHTML = "<i class='fas fa-chevron-down'></i>";
    profilesTriggers.style.opacity = "0";
    profilesTriggers.style.top = "30px";
    setTimeout(() => {
      profilesTriggers.style.display = "none";
    }, 300);
  } else {
    profileTriggersDropdown.innerHTML = "<i class='fas fa-chevron-up'></i>";
    profilesTriggers.style.display = "flex";
    setTimeout(() => {
      profilesTriggers.style.opacity = "1";
      profilesTriggers.style.top = "100%";
    }, 10);
  }
});

// DOM Elements
const form = document.querySelector('.addHashDataInView');
const addNewInput = document.querySelector('#addNew');
const audianceInput = document.querySelector('#audiance');
const hashtagsGroupContainer = document.querySelector('.hashtag_groups_container');
let hashtagsGroup = document.querySelector('.hashtag_groups_container').children;

const groupList = document.querySelector('.group_list');
const sliderNext = document.querySelector('#sliderNext');
const sliderPrev = document.querySelector('#sliderPrev');

const totalAudience = document.querySelector('#totalAudience');
const copyHashTags = document.querySelector('#copyHashTags');

const addToTableBtn = document.querySelector('.addToTableBtn');
const addToTableBtnGroup = document.querySelector('#addToTableBtnGroup');

const hashtagsArray = [
  {
    group: 'Group 1',
    hashtags: ['#hashtag1', '#hashtag2'],
    audiences: [3000000, 1000000],
    hashtagsUser: ['User1', 'User2'],
    hashtagsDate: ['10/13/2021', '10/24/2021'],
    user: 'User1',
    saved: '8/21/2021 8:00 AM',
  },
]

const getDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  return today;
}

const getTime = () => {
  let date = new Date();
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}
// Group left right
function goToslide(slider, slide){
  for (let i = 0; i < slider.length; i++) {
    slider[i].style.transform = `translateX(${100 * (i - slide)}%)`;
  }
}
let curSlide = 0;
let groupNum = 2;
let maxSlide = 0;
let currentLastHg = 0;

// Total Audience Calculation
function formatTA (labelValue) {
  return Math.abs(Number(labelValue)) >= 1.0e+9
  ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
  : Math.abs(Number(labelValue)) >= 1.0e+6
  ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
  : Math.abs(Number(labelValue)) >= 1.0e+3
  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"
  : Math.abs(Number(labelValue));
}
const totalAudienceCalculation = (c) => {
  if(hashtagsArray[c].audiences.length === 0){
    totalAudience.innerHTML = 'N/A';
  }else{
    let formatedTA = formatTA(hashtagsArray[c].audiences.reduce((a,c)=>a+c));
    totalAudience.innerHTML = formatedTA;
  }
} 
totalAudienceCalculation(curSlide);

function sliderNextFn(arrSlide, arrSlide2) {
  if(hashtagsGroup[currentLastHg].children.length >= 5 && curSlide === maxSlide){
    arrSlide.insertAdjacentHTML('beforeend', `<p>Group ${groupNum}</p>`);
    arrSlide2.insertAdjacentHTML('beforeend', `<div class='hashtag_group'></div>`);
    hashtagsGroup = arrSlide2.children;
    hashtagsArray[curSlide+1]= {
      group: `Group ${groupNum}`,
      hashtags: [],
      audiences: [],
      hashtagsUser: [],
      hashtagsDate: [],
    }
    groupNum++;
  }
  maxSlide = arrSlide.children.length - 1;
  currentLastHg = arrSlide2.children.length - 1;
  if(hashtagsGroup[currentLastHg].children.length < 5 && curSlide === maxSlide){
    curSlide = maxSlide;
    alert('Please add at least 30 hashtags in a group');
  }else{
    if(curSlide === maxSlide){
        curSlide = 0;
    }else{
        curSlide++;
    };
  }
  totalAudienceCalculation(curSlide);
  addToTableBtnGroup.innerHTML = `${hashtagsArray[curSlide].group}`
  goToslide(arrSlide.children, curSlide);
  goToslide(arrSlide2.children, curSlide);
}

function sliderPrevFn(arrSlide, arrSlide2) {
  if(curSlide === 0){
      curSlide = maxSlide;
  }else{
      curSlide--;
  };
  addToTableBtnGroup.innerHTML = `${hashtagsArray[curSlide].group}`
  totalAudienceCalculation(curSlide);
  goToslide(arrSlide.children, curSlide);
  goToslide(arrSlide2.children, curSlide);
}

sliderNext.addEventListener('click', ()=>{
    sliderNextFn(groupList, hashtagsGroupContainer);
});
sliderPrev.addEventListener('click', ()=>{
  sliderPrevFn(groupList, hashtagsGroupContainer);
});


// Form adding hashtag
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  if(hashtagsGroup[curSlide].children.length >= 5){
    alert('You can add maximum 30 hashtags in a group')
    sliderNextFn(groupList, hashtagsGroupContainer);
  }else{
    let today = getDate();
    let hashtag = `<div class="hashtag">
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
      <div class="wave wave4"></div>
      <div class="menu">
        <button><i class="fas fa-ellipsis-v"></i></button>
      </div>
      <div class="name">
        <h1>#${addNewInput.value}</h1>
      </div>
      <div class="audiance">
        <p>Audiance:</p>
        <span>${audianceInput.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
      </div>
      <div class="date">
        <p>Added on</p>
        <span>${today}</spans>
      </div>
      <div class="user">
        <p>by</p>
        <span>User</span>
      </div>
    </div>`
    if(addNewInput.value !== '' && audianceInput.value !== ''){
      hashtagsArray[curSlide] = {
        ...hashtagsArray[curSlide],
        audiences: [...hashtagsArray[curSlide].audiences, Number(audianceInput.value)],
        hashtags: [...hashtagsArray[curSlide].hashtags, `#${addNewInput.value}`],
        hashtagsUser: [...hashtagsArray[curSlide].hashtagsUser, 'User2'],
        hashtagsDate: [...hashtagsArray[curSlide].hashtagsDate, today]
      }
      totalAudienceCalculation(curSlide);
      addNewInput.value = '';
      audianceInput.value = '';
      hashtagsGroup[curSlide].insertAdjacentHTML("beforeend", hashtag);
    }else{
      alert('Please fill up the form to add hashtag')
    }
  }
})

function validate(evt) {
  let theEvent = evt || window.event;
  let key;

  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
      key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  let regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    alert('You can only add number in \'Audience\'')
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

let tableData = [
  {
    hashtagGroup: 'Group 1',
    savedOn : `10/12/2021, 4:05 PM`,
    savedBy : 'User1',
    totalAudience : '3.00M',
    totalAudienceNumber : 3000000,
    successRate : 'N/A'
  }
];

// Add data into table
addToTableBtn.addEventListener('click', ()=>{
  let currentData = {
    hashtagGroup: hashtagsArray[curSlide].group,
    savedOn : `${getDate()}, ${getTime()}`,
    savedBy : 'User',
    totalAudience : formatTA(hashtagsArray[curSlide].audiences.reduce((a,c)=>a+c)),
    totalAudienceNumber : hashtagsArray[curSlide].audiences.reduce((a,c)=>a+c),
    successRate : 'N/A'
  }
  tableData.push(currentData);
  let tableDataHtml = `<tr>
    <td>${currentData.hashtagGroup}</td>
    <td>${currentData.savedOn}</td>
    <td>${currentData.savedBy}</td>
    <td>${currentData.totalAudience}</td>
    <td>${currentData.successRate}</td>
  </tr>`
  document.querySelector('.hashtagsGroupTable tbody').insertAdjacentHTML('beforeend', tableDataHtml)
})

// Copy to clipboard
copyHashTags.addEventListener('click', ()=>{
  let hashtagsFormat = hashtagsArray[curSlide].hashtags.join(' ');
  navigator.clipboard.writeText(hashtagsFormat);
  alert("Hashtags Copied!")
})

// Success rate message tooltip
const sTooltipTrigger = document.querySelector('#stooltiptrigger');
const tooltip = document.querySelector('#stooltip');
sTooltipTrigger.addEventListener('mouseover', ()=>{
    tooltip.style.display = 'block';
});
sTooltipTrigger.addEventListener('mouseout', ()=>{
    tooltip.style.display = 'none';
})

// Table Sorting
const success = document.querySelector(".success");

const displayTable = function (data) {
  const tbody = document.querySelector(".hashtagsGroupTable tbody");
  tbody.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let row = `
    <tr>
      <td>${data[i].hashtagGroup}</td>
      <td>${data[i].savedOn}</td>
      <td>${data[i].savedBy}</td>
      <td>${data[i].totalAudience}</td>
      <td>${data[i].successRate}</td>
    </tr>
    `;
    tbody.innerHTML += row;
  }
};

success.addEventListener("click", function () {
  let column = success.dataset.col;
  let order = success.dataset.order;

  const arrow1 = document.querySelector('.sortArrays i:first-child');
  const arrow2 = document.querySelector('.sortArrays i:last-child');

  if (order === "desc") {
    success.dataset.order = "asc";
    tableData.sort((a, b) => (a.totalAudienceNumber > b.totalAudienceNumber ? 1 : -1));
    arrow1.style.display = 'none';
    arrow2.style.display = 'block';
  } else {
    success.dataset.order = "desc";
    tableData.sort((a, b) => (a.totalAudienceNumber < b.totalAudienceNumber ? 1 : -1));
    arrow1.style.display = 'block';
    arrow2.style.display = 'none';
  }
  displayTable(tableData);
});

displayTable(tableData);
