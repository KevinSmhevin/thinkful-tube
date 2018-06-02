const youtube_search_url = 'https://www.googleapis.com/youtube/v3/search';
const youtubeApiKey = 'AIzaSyAWK0d4_yCyzK3PyHSHVHOP2eHiAwZa_qM';
// const youtubePartValue = 'snippet';
// const youtubeSearchResults = 10; 
const outputElem = $('.js-output')


function getDataFromApi(searchTerm, callback) {
  const queryData = {
    part: `snippet`,
    q: `${searchTerm} in:name`,
    key: 'AIzaSyAWK0d4_yCyzK3PyHSHVHOP2eHiAwZa_qM',
    maxResults: `5`,
    pageToken: page
  }
  $.getJSON(youtube_search_url, queryData, callback)
}

// function nextPage(searchTerm, callback) {
//   const queryData = {
//     part: `snippet`,
//     q: `${searchTerm} in:name`,
//     key: 'AIzaSyAWK0d4_yCyzK3PyHSHVHOP2eHiAwZa_qM',
//     pageToken: 
//   }
// }

// function getDataFromApi(searchTerm, callback) {
//   const queryData = {
//     url: youtube_search_url,
//     data: {
//       part: 'snippet',
//       key: 'AIzaSyAWK0d4_yCyzK3PyHSHVHOP2eHiAwZa_qM',
//       q: `${searchTerm}`,
//       maxResults: '10',
//     },
//     dataType: 'json',
//     type: 'GET',
//     success: callback
//   }
//   $.ajax(queryData);
// }

function renderResult(result) {
  //  const channelURL = youtube_search_url + '?' + 'part=' + youtubePartValue + '&' + 'key=' + youtubeApiKey + '&' + 'maxResults=' + youtubeSearchResults + '&channelId=' + result.snippet.channelId;

  return `
  <div>
    <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a><br>
    <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.default.url}" alt="video-image"></a><br>
    <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.channelTitle}</a><br>
    <a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">See more videos from this channel</a>
    <br><br>
  </div>
  `
}

function displayYoutubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item))
  const outputElem = $('.js-output');
  const numberOfResults = `<p>Total Results: ${data.pageInfo.totalResults} <br>Currently Displaying: ${data.pageInfo.resultsPerPage}</p>`
  $('.search-results').html(numberOfResults)
  $('.js-results')
    .prop('hidden', false)
    .html(results);
    console.log(data.nextPageToken)
  $('.page-token').html(data.nextPageToken)
}

function watchSubmit () {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData)
  })
}

$(watchSubmit);