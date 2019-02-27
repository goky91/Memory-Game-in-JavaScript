var username = document.getElementById('input-name');

var playBtn = document.getElementById('playButton');

playBtn.addEventListener('click', function(){
    localStorage.setItem('user', username.value);
    location.href = 'game.html'
});
