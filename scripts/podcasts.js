

var PodcastBox = React.createClass({
  getInitialState: function() {
    return {entry: []};
  },
  componentDidMount: function() {
    //Don't know if it trust https://crossorigin.me/ but it
    //bypasses CORS protection
    var feedUrl = "https://crossorigin.me/http://feeds.feedburner.com/uhhyeahdude/podcast";
    $.get(feedUrl, function getFeed(data) {
      console.log($(data).find("item").children(0));
      var el = $(data).find("item").children(0);
      console.log("title      : " + el.find("title").find("data").text());
      console.log("author     : " + el.find("author").text());
      console.log("description: " + el.find("description").text());
      /*$(data).find("item").each(function () { // or "item" or whatever suits your feed
         var el = $(this);

         console.log("------------------------");
         console.log("title      : " + el.find("title").text());
         console.log("author     : " + el.find("author").text());
         console.log("description: " + el.find("description").text());
      });*/
    });
  },
  render: function() {
    return (
      <div className="podcastBox">
          <PodcastList data={this.props.data} pollInterval={2000} />
      </div>
    );
  }
});
          //<PodcastList data={this.props.data} />

var PodcastList = React.createClass({
  getInitialState: function() {
    return {entry: []};
  },
  loadFeeds: function() {

      /*
      //var podcastEntries = this.props.data.map(function(podcast) {
      //var entry;
      var feedUrl = this.props.data[0].feedUrl;
      //console.log(this.props.data[0].feedUrl);
      var feed = new google.feeds.Feed(feedUrl);
      feed.setNumEntries(4);
      feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);
      feed.load(apiCallback);
        if (!result.error) {
          //entry = result.feed;
          this.setState({entry: result.feed});
          //google.setOnLoadCallback(this.handleFeedCallback);
          //this.setState({entry: result.feed});
        }
        else
        {
          console.log(result.error.message);
        }
      });
    );*/
  },
  //apiCallback: function() {

  //}
  componentDidMount: function() {

    this.loadFeeds();
    setInterval(this.loadFeeds, this.props.pollInterval);
  },
  render: function() {
    var podcastEntries = this.props.data.map(function(podcast) {
      return (
        <Podcast  key={podcast.id} 
        podcastTitle={podcast.podcastTitle} 
        imgUrl={podcast.imgUrl}
        episodeTitle={podcast.episodeTitle}
        episodeDate={podcast.episodeDate}
        episodeDownload={podcast.episodeDownload}>
          {podcast.podcastTitle}
        </Podcast>
      );
    });
    return (
        <div className="podcastList"> 
          {podcastEntries}
        </div>
    );
  }
});       

var Podcast = React.createClass({
  render: function() {
    return (
        <div className="podcast">
          <div className="podcastTitle">
            <h2 style={noMargin}>{this.props.podcastTitle}</h2>
            <a href={this.props.stieUrl}><img height="80%" src={this.props.imgUrl} alt={this.props.podcastTitle + " logo"}/></a>
          </div>
          <div className="episode">
            {this.props.episodeTitle}<br/>
            {this.props.episodeDate}<br/>
            {this.props.children}
            <a href={this.props.episodeDownload} className="download">Download</a>
          </div>
        </div>
      );
  }
});


//Inline Styles:
var noMargin = {
  marginTop:0,
  marginBottom:0
}
/**
getFeed:function(feedUrl) {
  var feed = new google.feeds.Feed(feedUrl);  
  feed.setNumEntries(1);
  feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);
  feed.load(function(result) {
  if (!result.error) {
    return result.feed;
  }
},*/

var data = [
  {id: 1, podcastTitle: "The BeastCast",
            feedUrl: "http://www.giantbomb.com/podcast-xml/beastcast/",
            imgUrl: "http://static.giantbomb.com/uploads/original/0/31/2750982-beastcast_itunes.png",
            episodeTitle: "number 40",
            episodeDate: "Monday, February 26th 2016 @ 6:00 AM",
            episodeDescription: " We've got pricing news that seems to make the reality of VR a bit more virtual, our thoughts on SUPERHOT, updates on the Coleco Chameleon and Leland Yee, your questions, our mistakes, and more! ",
            episodeDownload: "http://www.giantbomb.com/podcasts/download/1519/Ep40_-_The_Giant_Beastcast-02-25-2016-1683396598.mp3"
          },
  {id: 2, podcastTitle: "Serial",
            feedUrl: "http://feeds.feedburner.com/uhhyeahdude/podcast",
            imgUrl: "http://a5.mzstatic.com/us/r30/Music69/v4/70/c9/71/70c97133-f3a8-738e-ea2c-27a6dc7d9731/cover170x170.jpeg",
            episodeTitle: "S02 Episode 08: Hindsight, Part 2",
            episodeDate: "February-19-16 5:30 AM",
            episodeDescription: "Woulda, coulda, shoulda…",
            episodeDownload: "https://dts.podtrac.com/redirect.mp3/dovetail.prxu.org/serial/71b7d15f-8dd1-46d0-b761-a41ccdba0641/serial-s02-e08.mp3"
          },
  {id: 3, podcastTitle: "Serial",
            feedUrl: "http://www.giantbomb.com/podcast-xml/beastcast/",
            imgUrl: "http://a5.mzstatic.com/us/r30/Music69/v4/70/c9/71/70c97133-f3a8-738e-ea2c-27a6dc7d9731/cover170x170.jpeg",
            episodeTitle: "S02 Episode 08: Hindsight, Part 2",
            episodeDate: "February-19-16 5:30 AM",
            episodeDescription: "Woulda, coulda, shoulda…",
            episodeDownload: "https://dts.podtrac.com/redirect.mp3/dovetail.prxu.org/serial/71b7d15f-8dd1-46d0-b761-a41ccdba0641/serial-s02-e08.mp3"
          },
];

/**
var Api = {
  fetchRss(url) {
    var feed = new google.feeds.Feed(url);
    feed.setNumEntries(4);
    feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);
    feed.load(function(result) {
      if (!result.error) {
      }
      else
      {
        console.log(result.error.message);
      }
        return result.feed;
    }
  }
};

//from https://github.com/christopherdro/react-native-rss-reader/blob/master/App/Api/RssFeedApi.js
var Api = {
  fetchRss(url) {
    if (!(/^http:\/\//.test(url))) {
      url = "http://" + url;
    }
    var GOOGLE_FEED_API_URL = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q="
    var url = GOOGLE_FEED_API_URL + encodeURIComponent(url);

    return fetch(url).then((res) => res.json());
  }
};*/

ReactDOM.render(
  //React.createElement(PodcastBox, null),
  <PodcastBox data={data} pollInterval={2000} />,
  document.getElementById('content')
);