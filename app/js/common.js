var allLazyLoad = [...document.querySelectorAll('.lazyload')];

function allLozadImg() {
    allLazyLoad.forEach((el) => {
        var observer = lozad(el); // passing a `NodeList` (e.g. `document.querySelectorAll()`) is also valid
        observer.observe();
        el.addEventListener('load', () => {
            el.classList.add('is-loaded')
        })
        // if (el.loaded()) {
        //     el.classList.add('is-loaded');
        // }
    })
}

allLozadImg();

//add counting number to show delay speed
var counterContainer = [...document.querySelectorAll('.counting-delay')];

function addCoutingDelay() {
    if (counterContainer.length) {
        counterContainer.forEach((cont) => {
            var anims = [...cont.children];
            console.log(anims);
            anims.forEach((btn, k) => {
                btn.classList.add('anim');
                btn.dataset.animDelay = k * 100;
            })
        })
    }
}

addCoutingDelay();


// scroll animations
var anim = document.querySelectorAll('.anim')

function scrollAnimations() {
    if (anim.length) {
        var observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                var el = entry.target
                if (entry.isIntersecting) {
                    if (el.classList.contains('anim-js')) {

                    } else {
                        el.style.animationDelay = el.dataset.animDelay + 'ms';
                        el.style.animationDuration = el.dataset.animDuration + 'ms';
                        el.style.animationName = el.dataset.anim;
                    }


                    el.classList.add('done');
                    observer.unobserve(entry.target);
                }

            })
        }, {threshold: .5});
        if (window.innerWidth > 991) {
            anim.forEach(animate => {
                observer.observe(animate)
            })
        } else {

            anim.forEach(animate => {

                observer.observe(animate)


            })
        }
    }
}


scrollAnimations();







let btnVideoPlay = document.getElementById('play-btn');

function checkWhatVideoType() {
    if (btnVideoPlay) {
        if (btnVideoPlay.classList.contains('vimeo')) {

            var player2 = new Vimeo.Player(document.querySelector('#vimeo-player'));
            btnVideoPlay.addEventListener('click', () => {
                if (btnVideoPlay.classList.contains('pause')) {
                    player2.pause();
                    btnVideoPlay.classList.remove('pause');
                    document.querySelector('.video-box').classList.remove('hide-poster');
                } else {
                    player2.play();
                    btnVideoPlay.classList.add('pause');
                    document.querySelector('.video-box').classList.add('hide-poster');
                }
            });
        }
        else {
            var tag = document.createElement("script");
            tag.src = "//www.youtube.com/player_api";
            var firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            var player;

// this function gets called when API is ready to use
            function onYouTubePlayerAPIReady() {
                // create the global player from the specific iframe (#video)
                player = new YT.Player("video-player", {
                    events: {
                        // call this function when player is ready to use
                        onReady: onPlayerReady
                    }
                });
            }

            function onPlayerReady(event) {
                // bind events
                var playButton = document.getElementById("play-btn");
                playButton.addEventListener("click", function () {

                    if (playButton.classList.contains('pause')) {
                        player.pauseVideo();
                        playButton.classList.remove('pause');
                        document.querySelector('.video-box').classList.remove('hide-poster');
                    } else {
                        player.playVideo();
                        playButton.classList.add('pause');
                        document.querySelector('.video-box').classList.add('hide-poster');
                    }
                });



            }

            onYouTubePlayerAPIReady();
        }
    }

}

checkWhatVideoType();
// Inject YouTube API script







