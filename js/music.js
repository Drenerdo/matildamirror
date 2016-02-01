var $play        = $('.spotify-player--play #play'),
    $pause       = $('.spotify-player--play #pause'),
    $prev        = $('.spotify-player--prev'),
    $next        = $('.spotify-player--next'),
    $songTime    = $('.spotify-artist--song_time span'),
    $songName    = $('.spotify-artist--song span'),
    $artistName  = $('.spotify-artist--name span'),
    $artistTitle = $('.spotify-artist--title'),
    $currentSong = $('.spotify-cover.default img'),
    $prevSong    = $('.spotify-cover.prev'),
    $nextSong    = $('.spotify-cover.next'),
    $songPlay    = $('#music'),
    $poster      = $('.default img'),
    $span        = '<span>',
    i = 1;

var $spotify = {
  
  'song_1': { 
    'src' : 'https://api.spotify.com/v1/tracks/1MDoll6jK4rrk2BcFRP5i7',
    'poster': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/42764/adele_bg.jpg'
  },
  'song_2': {
    'src' : 'https://api.spotify.com/v1/tracks/1UfBAJfmofTffrae5ls6DA',
     'poster': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/42764/drake_bg.jpg'
  },
  'song_3': {
    'src' : 'https://api.spotify.com/v1/tracks/6nsLzJfvp5OLd4mgqUJkpq',
     'poster': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/42764/avicii_bg.jpg'
  }
}

function objectSize(the_object) {
 
  var object_size = 0;
  for (key in the_object){
    if (the_object.hasOwnProperty(key)) {
      object_size++;
    }
  }
  return object_size;
}

function getData(songURL, callback) {
    $.ajax({
        url: songURL,
        success: callback,
        error: function(request, status, error) {
            console.log(status);
        }
    });
};

function init(i){
  
  var  i = i;
  var song = 'song_' + i;
  var nextSong = 'song_' + i + 1;
  var prevSong = 'song_' + i - 1;
  
   getData( $spotify[song].src, function(data) {
      
     var data         = data;
     var name         = data.artists[0].name;
     var songName     = data.name;
     var songUrl      = data.preview_url;
     var poster       = data.album.images[0].url;
     var customPoster = $spotify[song].poster;
     
    
    
    songTitle(name, '.default .spotify-artist--title'); 
    $songPlay.attr('src', songUrl);
    $artistName.html(name);
    $songName.html(songName); 
    $currentSong.attr('src', customPoster);
 });
}

function songTitle(name) {
  for (var i = 0, len = name.length; i < len; i++) {
    var space = (270/name.length) * i;
    var newName = '<span style="left: '+space+'px" >' + name[i] + '</span>';
    $artistTitle.append(newName);  
  }
}

$play.on('click', function(){
 
  $($songPlay)[0].play();
  TweenMax.to($play, 0.3, {opacity:0, visibility:'hidden'});
  TweenMax.to($pause, 0.3, {opacity:1, visibility:'visible'});
  $songTime = $songPlay[0].duration;
  $songPlay[0].ontimeupdate = function() {updateTimeline($songTime)}; 
});

$pause.on('click', function(){

   $($songPlay)[0].pause();
  TweenMax.to($pause, 0.3, {opacity:0, visibility:'hidden'});
  TweenMax.to($play, 0.3, {opacity:1, visibility:'visible'});
});

$next.on('click', function(){
  i++;
  
  if( i > objectSize($spotify) ) {
    i = 1;
  }
  if( i < 1 ) {
    i = objectSize($spotify);
  }
    animateOut();
  
  setTimeout(function() {
    
    init(i);
    animateIn();
    
  },500); 
  
  TweenMax.to($pause, 0.3, {opacity:0, visibility:'hidden'});
  TweenMax.to($play, 0.3, {opacity:1, visibility:'visible'});
  $('.spotify-artist--song_time span').css('width','0');
});

$prev.on('click', function(){
    i--;
  
  if( i > objectSize($spotify) ) {
    i = 1;
  }
  if( i < 1 ) {
    i = objectSize($spotify);
  }
    animateOut();
  
  setTimeout(function() {
    
    init(i);
    animateIn();
    
  },500); 
  
  TweenMax.to($pause, 0.3, {opacity:0, visibility:'hidden'});
  TweenMax.to($play, 0.3, {opacity:1, visibility:'visible'});
  $('.spotify-artist--song_time span').css('width','0');
});

function updateTimeline($songTime) {
   
    var timeLine = 270;
    var timeSecs = 270/$songTime;
    $('.spotify-artist--song_time span').css('width', timeSecs * $songPlay[0].currentTime);
}

function animateOut() {
  
  $artistTitle.removeClass('animate'); 
  $poster.removeClass('animationScale').addClass('animationScaleDown');  
  $songName.removeClass('animationTop');
  $artistName.removeClass('animationTop');
  setTimeout(function(){
    $artistTitle.html('');
  }, 400)
}

function animateIn() {
  
  $poster.removeClass('animationScaleDown');
  setTimeout(function(){
     $poster.addClass('animationScale');
     $artistTitle.addClass('animate');
     $songName.addClass('animationTop');
     $artistName.addClass('animationTop');
   },200) 
}

$(window).on("load", function() {
    init(1);
    animateIn();
});


