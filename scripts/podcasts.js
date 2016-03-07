

var PodcastBox = React.createClass({
  render: function() {
    return (
      <div className="podcastBox">
          <PodcastList  data={this.props.data} />
      </div>
    );
  }
});

var PodcastList = React.createClass({
  render: function() {
    var podcastEntries = this.props.data.map(function(podcast) {
      return (
        <Podcast  key={podcast.id} 
        feedUrl={podcast.feedUrl} >
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
  getInitialState: function() {
    return {podcastTitle: "",
          feedUrl: "",
          imgUrl: "",
          episodeTitle: "",
          episodeDate: "",
          episodeDescription: "",
          episodeDownload: ""
        };
  },
  loadFeed: function() {
    var _this = this;

    var feedUrl = "http://cors.io/?u=" + this.props.feedUrl;
    //console.log(this.props);
    var feedId = this.props.feedId;
    var entry;
    $.get(feedUrl, function getFeed(data) {
      var el = $(data).find("item").first();
      entry = 
        {podcastTitle: $(data).find("title").first().text(),
          feedUrl: feedUrl,
          imgUrl: $(data).find("url").text(),
          episodeTitle: el.find("title").text(),
          episodeDate: el.find("pubDate").text(),
          episodeDescription: el.find("description").text(),
          episodeDownload: el.find("enclosure").attr('url')
        };
      _this.setState(entry);
    });
    //console.log(this.state);
  },
  componentDidMount: function() {
    this.loadFeed();
    setInterval(this.loadFeed, this.props.pollInterval);
  },
  render: function() {
    //console.log(this.state);
    return (
        <div className="podcast">
          <div className="podcastTitle">
            <h2 style={noMargin}>{this.state.podcastTitle}</h2>
            <a href={this.state.stieUrl}><img height="80%" src={this.state.imgUrl} alt={this.state.podcastTitle + " logo"}/></a>
          </div>
          <div className="episode">
            {this.state.episodeTitle}<br/>
            {this.state.episodeDate}<br/>
            {this.state.episodeDescription}
            <a href={this.state.episodeDownload} className="download">Download</a>
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

var data = [
  {id: 1, feedUrl: "http://www.giantbomb.com/podcast-xml/beastcast/" },
  {id: 2, feedUrl: "http://feeds.feedburner.com/uhhyeahdude/podcast" },
  {id: 3, feedUrl: "http://feeds.serialpodcast.org/serialpodcast" },
  {id: 5, feedUrl: "http://feeds.feedburner.com/mbmbam?format=xml" },
];



ReactDOM.render(
  //React.createElement(PodcastBox, null),
  <PodcastBox data={data} pollInterval={2000} />,
  document.getElementById('content')
);