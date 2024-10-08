let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let url = urlParams.get('id');

// Redirect to /video.html if 'url' parameter is present
if (url && !window.location.href.includes('video.html')) {
    let baseUrl = window.location.href.split('?')[0];
    if (baseUrl.includes('index.html')) {
        baseUrl = baseUrl.replace('index.html', 'HTML/video.html');
    } else {
        // Ensure correct URL format for video page redirection
        baseUrl = baseUrl.endsWith('/') ? `${baseUrl}HTML/video.html` : `${baseUrl}/HTML/video.html`;
    }
    window.location.href = baseUrl + queryString;
}

// Toggle search display based on click location
window.addEventListener('mouseup',function(event){
    let search = document.querySelector('.search');
    let isClickInside = false
    event.target.classList.forEach((item) => {
        if(item.includes('gsc')){
            isClickInside = true;
        }
    });
    if(!isClickInside){
        search.style.display = 'none';
    }
});

// Display search when search button is clicked
document.querySelector('.search-button').addEventListener('click', function() {
    document.querySelector('.search').style.display = 'inherit';
});
