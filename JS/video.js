//let queryString = window.location.search;
//let urlParams = new URLSearchParams(queryString);
let watchCount = urlParams.get('watchCount') ?? 0;
let commentCount = urlParams.get('commentsCount') ?? 0;
let likeCount = urlParams.get('likes') ?? 0;
let shareCount = urlParams.get('sharesCount') ?? 0;
let encryptedID = urlParams.get('id');  // Assume the ID is encrypted in the URL
// document.getElementById('forward').style.display = 'none';
// document.getElementById('backward').style.display = 'none';
document.getElementById('play-stop').style.display = 'none';
togglePlayStopIcons(false);

if (encryptedID) {
    fetch(`https://www.knlibya.com/video?id=${encryptedID}`) // Point to the backend
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch the story');
            }
            return response.json();
        })
        .then(async data => {
            let url = decodeURIComponent(data.url);

            let videoElement = document.getElementById('video');
            videoElement.src = url;

            // decode url
            let thumbnail = decodeURIComponent(data.thumbnailFirebaseUrl);

            let OGopject =
            {
                type: 'video.move',
                title: data.publisherUsername,
                url: url,
                description: data.description,
                image: thumbnail,
                imageWidth: '1200',
                imageHeight: '630',
                video: url,
                videoSecureUrl: url,
                videoHeight: data.videoHeight,
                videoWidth: data.videoWidth
            };


            setOpenGraphTags(OGopject);


            // show thumbnail as background image
            document.querySelector('.video').style.backgroundImage = `url(${thumbnail})`;
            // Update the video URL and other details
     // Ensure 'data.url' is the correct field name
            // function to hide three bottoms
            await videoElement.load();
            videoElement.play(); // Play the video
   
            videoElement.muted = false;

            setTimeout(() => {
                document.querySelector('#play-stop').style.display = 'none';
                document.querySelector('#play').style.display = 'none';
                document.querySelector('#stop').style.display = 'flex';
            }, 500);
            
            // Reload the video source


            // make video element not visible
            videoElement.style.display = 'none';
            watchCount = data.watchCount ?? 0;
            commentCount = data.commentsCount ?? 0;
            likeCount = data.likes ?? 0;
            shareCount = data.sharesCount ?? 0;




            document.getElementById('watchCount').innerText = watchCount;
            document.getElementById('commentCount').innerText = commentCount;
            document.getElementById('likeCount').innerText = likeCount;
            document.getElementById('shareCount').innerText = shareCount;
      
        })
        .catch(error => {
            console.error('Error fetching video details:', error);
        });
} else {
    console.error('No encrypted ID found in URL');
}

// Toggle fullscreen mode on video button click
document.querySelector('.video-button').addEventListener('click', function () {
    const wrapper = document.querySelector('.video');
    if (!document.fullscreenElement) {
        wrapper.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

// Handle forward and backward skip buttons
// document.querySelector('#forward').addEventListener('click', function () {
//     document.getElementById('video').currentTime += 10;
// });

// document.querySelector('#backward').addEventListener('click', function () {
//     document.getElementById('video').currentTime -= 10;
// });

// Play/Stop video toggle button
document.querySelector('#play-stop').addEventListener('click', function () {
    let video = document.getElementById('video');
    if (video.paused) {
        video.play();
        togglePlayStopIcons(true);
    } else {
        video.pause();
        togglePlayStopIcons(false);
    }
});

// Function to dynamically set Open Graph tags
function setOpenGraphTags({
    type, title, url, description, image, imageWidth, imageHeight, video, videoSecureUrl, videoHeight, videoWidth
}) {
    const setMetaTag = (property, content) => {
        let metaTag = document.querySelector(`meta[property="${property}"]`);
        if (metaTag) {
            metaTag.setAttribute('content', content);
        } else {
            metaTag = document.createElement('meta');
            metaTag.setAttribute('property', property);
            metaTag.setAttribute('content', content);
            document.head.appendChild(metaTag);
        }
    };

    setMetaTag('og:type', type);
    setMetaTag('og:title', title);
    setMetaTag('og:url', url);
    setMetaTag('og:description', description);
    setMetaTag('og:image', image);
    setMetaTag('og:image:width', imageWidth);
    setMetaTag('og:image:height', imageHeight);
    setMetaTag('og:video', video);
    setMetaTag('og:video:secure_url', videoSecureUrl);
    setMetaTag('og:video:height', videoHeight);
    setMetaTag('og:video:width', videoWidth);
}

document.querySelector('#sound').addEventListener('click', function () {
    let video = document.getElementById('video');
    if (video.muted) {
        video.muted = false;
        toggleMuteButton(false);
    } else {
        video.muted = true;
        toggleMuteButton(true);
    }
});

// Function to toggle play and stop icons
function togglePlayStopIcons(isPlaying) {
    document.querySelector('#play').style.display = isPlaying ? 'none' : 'flex';
    document.querySelector('#stop').style.display = isPlaying ? 'flex' : 'none';
}

function toggleMuteButton(isMuted) {
    document.querySelector('#unmuted').style.display = isMuted ? 'none' : 'flex';
    document.querySelector('#muted').style.display = isMuted ? 'flex' : 'none';
}

// Show skip buttons when interacting with video
document.querySelector('.video').addEventListener('mousemove', handleSkipButtons);
document.querySelector('.video').addEventListener('touchstart', handleSkipButtons);

// Function to handle showing and hiding skip buttons
let timeout;
function handleSkipButtons() {
    document.querySelectorAll('.skip').forEach(item => item.style.display = 'flex');
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
        document.querySelectorAll('.skip').forEach(item => item.style.display = 'none');
    }, 3000);
}

// console log when video still loading
document.getElementById('video').addEventListener('loadeddata', function () {
    // remove background image when video is loaded
    document.querySelector('.video').style.backgroundImage = 'none';
    // make video element visible
    document.getElementById('video').style.display = 'inherit';

    // document.getElementById('forward').style.display = 'none';
    document.getElementById('play-stop').style.display = 'flex';
    // document.getElementById('backward').style.display = 'none';
});



