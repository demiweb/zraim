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
        } else {
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

let startQuiz = [...document.querySelectorAll('.start-quiz')];
let quizAnswers = [...document.querySelectorAll('.radio-conts')];
let quizSection = [...document.querySelectorAll('.quiz-section')];

function quizControl() {
    if (quizAnswers.length) {
        startQuiz.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                document.querySelector('.quiz-conts').classList.add('visible');
                document.querySelector('.main-section').classList.add('hide');
                document.querySelector('.logo').classList.add('bot');
                document.querySelector('.go-conts2').classList.add('bot');

            })
        });
        document.querySelector('.go-conts').addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            document.querySelector('.go-conts').classList.add('hide');
            document.querySelector('.go-conts2').classList.add('hide');
            quizSection.forEach((btn) => {
                btn.classList.remove('visible');
                if (btn.dataset.numb === '4') {
                    btn.classList.add('visible');
                }
            })
        });
        document.querySelector('.go-conts2').addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            document.querySelector('.go-conts2').classList.add('hide');
            quizSection.forEach((btn) => {
                btn.classList.remove('visible');
                if (btn.dataset.numb === '4') {
                    btn.classList.add('visible');
                }
            })
        });
        quizAnswers.forEach((btn) => {
            let next = btn.dataset.next;
            btn.addEventListener('click', () => {
                btn.closest('.quiz-section').classList.remove('visible');
                quizSection.forEach((sec) => {

                    if (sec.dataset.numb === next) {
                        console.log(next);
                        if (next === '4') {
                            document.querySelector('.go-conts').classList.add('hide');
                            document.querySelector('.go-conts2').classList.add('hide');
                        } else {
                            document.querySelector('.go-conts').classList.remove('hide');
                            document.querySelector('.go-conts2').classList.remove('hide');
                        }
                        sec.classList.add('visible');
                    }
                });
                if (next === 'end') {
                    document.querySelector('.quiz-conts').classList.add('end');
                    console.log('end');
                    document.querySelector('.go-conts').classList.add('hide');
                    document.querySelector('.go-conts2').classList.add('hide');
                    let imgLink = btn.dataset.img;
                    let socLink = btn.dataset.link;
                    let name = btn.dataset.name;
                    let numberPhone = btn.dataset.number;
                    let whats = document.querySelector('.call-whats');
                    let manBox = document.querySelector('.man-box');
                    let callHim = document.querySelector('.call-him');
                    whats.querySelector('.img img').src = imgLink;
                    manBox.querySelector('img').src = imgLink;
                    callHim.href = numberPhone;
                    callHim.innerHTML = name;
                    whats.href = socLink;
                }
            })
        });

        document.querySelector('.form .btn').addEventListener('click', (e) => {
            // e.preventDefault();
            // e.stopPropagation();

            //add to submit script
            document.querySelector('.quiz-conts').classList.remove('visible');
            document.querySelector('.thanks-conts').classList.add('visible');
            //add to submit script
        })
    }
}

quizControl();
//mdl controls

var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom - 40 <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};


let scrollItem = document.querySelector('.down-text');
function ifHaveScrollItem() {
    if (scrollItem) {
        $(window).scroll(function (e) {
            $el = $('.footer');
            $el.toggleClass('scroll', $(this).scrollTop() > 32);

        });
        window.addEventListener('scroll', function (event) {
            if (isInViewport(scrollItem)) {
                document.querySelector('.content .text.hero-text .btn').classList.add('hide');
            } else {
                document.querySelector('.content .text.hero-text .btn').classList.remove('hide');

            }
        }, false);
    }
}
// ifHaveScrollItem();

let modBonus = [...document.querySelectorAll('.modal-bonus')];

function controlBonusMod() {
    if (modBonus.length) {
        modBonus.forEach((btn) => {
            let back = btn.querySelector('.modal-bonus__cont');
            let back2 = btn.querySelector('.bonus-contact__modal');
            let close = btn.querySelector('.close-mdl');

            back.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                document.body.classList.remove('no-scroll');
                btn.classList.remove('visible');
            });
            close.addEventListener('click', (e) => {

                document.body.classList.remove('no-scroll');
                btn.classList.remove('visible');
            });
            back2.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();

            })
        })
    }
}

controlBonusMod()

//mdl controls







