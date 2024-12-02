
//Initialize the Variables
let surahIndex = 0;
let audioElement = new Audio('surahs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let surahItems =Array.from(document.getElementsByClassName('surahItem'));
let masterSurahName = document.getElementById('masterSurahName');
// Array of object
let surahs =[
    {surahName: "Surah AL Mulk", filePath: "surahs/1.mp3", coverPath: "/imgs/cover1.jpg"},
    {surahName: "Surah Ar Rehman", filePath: "surahs/2.mp3", coverPath: "/imgs/cover1.jpg"},
    {surahName: "Surah Ul Kahf", filePath: "surahs/3.mp3", coverPath: "/imgs/cover1.jpg"},
    {surahName: "Surah Yaseen", filePath: "surahs/4.mp3", coverPath: "/imgs/cover1.jpg"},
    {surahName: "Surah Yusuf", filePath: "surahs/5.mp3", coverPath: "/imgs/cover1.jpg"},
]
 
// Display data in list
surahItems.forEach((element, i) =>{
    element.getElementsByTagName("img")[0].src = surahs[i].coverPath;
    element.getElementsByClassName('surahName')[0].innerText = surahs[i].surahName;
    
});

// audioElement.play();
 
// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to timeupdate event of audio
audioElement.addEventListener('timeupdate', ()=>{
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;  //progress update according to time
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays =()=>{
    Array.from(document.getElementsByClassName('surahItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
}

Array.from(document.getElementsByClassName('surahItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        // console.log(e.target);
        makeAllPlays();
        surahIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `surahs/${surahIndex+1}.mp3`;  //play specific surah 
        masterSurahName.innerText = surahs[surahIndex] .surahName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(surahIndex>=4){
        surahIndex = 0
    }
    else{
        surahIndex += 1;
    }
        audioElement.src = `surahs/${surahIndex+1}.mp3`;
        masterSurahName.innerText = surahs[surahIndex] .surahName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(surahIndex<=0){
        surahIndex = 0;
    }
    else{
        surahIndex -= 1;
    }
    audioElement.src = `surahs/${surahIndex+1}.mp3`;
    masterSurahName.innerText = surahs[surahIndex] .surahName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
})

