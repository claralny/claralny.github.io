//song list
let All_song = [

  {
    name: "Fire",
    path: "import/fire.mp3",
    img: "import/fire.jpg",
    singer: "Kid Cudi"
   },

   {
     name: "Ultraviolence",
     path: "import/ultraviolence.mp3",
     img: "import/ultraviolence.jpg",
     singer: "Lana Del Rey"
   },

   {
     name: "November Has Come",
     path: "import/november.mp3",
     img: "import/gorillaz.jpg",
     singer: "Gorillaz"
   },
   
   {
     name: "Empathy",
     path: "import/empathy.mp3",
     img: "import/crystal.jpg",
     singer: "Crystal Castles"
   },
   {
     name: "Igor's Theme",
     path: "import/igor.mp3",
     img: "import/igor.jpg",
     singer: "Tyler the Creator"
   },
   {
     name: "Summertime",
     path: "import/summertime.mp3",
     img: "import/mareux.jpg",
     singer: "Mareux"
   },
   {
     name: "Self Care",
     path: "import/selfcare.mp3",
     img: "import/macmiller.jpg",
     singer: "Mac Miller"
   },
   
   {
     name: "Gangsta's Paradise",
     path: "import/gangsta.mp3",
     img: "import/coolio.jpg",
     singer: "Coolio"
   },
   {
     name: "bunnybunnybunny",
     path: "import/bunny.mp3",
     img: "import/bunny.jpg",
     singer: "Mietze Comte"
   },
   {
     name: "Motion Picture Soundtrack",
     path: "import/motion.mp3",
     img: "import/radiohead.jpg",
     singer: "Radiohead"
   },
   {
     name: "Brûlant",
     path: "import/brulant.mp3",
     img: "import/filmnoir.jpg",
     singer: "Film Noir"
   },
   
   {
     name: "Docteur Lulu",
     path: "import/docteur.mp3",
     img: "import/zuukou.jpg",
     singer: "Zuukou Mayzie"
   },
   {
     name: "How",
     path: "import/ihow.mp3",
     img: "import/nbhd.jpg",
     singer: "The Neighbourhood"
   },
   {
    name: "Heaven",
    path: "import/heaven.mp3",
    img: "import/imonster.jpg",
    singer: "I Monster"
   },

   {
    name: "18cigz",
    path: "import/18cigz.mp3",
    img: "import/acr.jpg",
    singer: "Angsty Camboyz Revenge"
   },

   {
    name: "Romantika",
    path: "import/romantika.mp3",
    img: "import/romantika.jpg",
    singer: "Brutalismus 3000"
   },


   {
    name: "Heaven",
    path: "import/heaven.mp3",
    img: "import/imonster.jpg",
    singer: "I Monster"
   }
];
/*you can add more song & images from you computer*/


/*tracks*/
let tracks = document.querySelector('.tracks');

//creating a list or generating Html
for (let i = 0; i < All_song.length; i++) {

  let Html = ` <div class="song">
      <div class="img">
      <img src="${All_song[i].img}"/>
      </div>
      <div class="more">
      <audio src="${All_song[i].path}" id="music"></audio>
      <div class="song_info">
         <p id="title">${All_song[i].name}</p>
         <p>${All_song[i].singer}</p>
      </div>
      <button id="play_btn"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
      </div>
    </div>`;

  tracks.insertAdjacentHTML("beforeend", Html);
};


/*please follow all the rules so that you do not face any problem*/