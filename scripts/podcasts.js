

var PodcastBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className="podcastBox">
          <PodcastList data={this.props.data} />
      </div>
    );
  }
});
          //<PodcastList data={this.props.data} />

var PodcastList = React.createClass({
  handleFeedCallback: function(recievedEntry) {
    entry = recievedEntry;
  },
  componentDidMount: function() {
    this.setState({entry: podcast});
  },
  render: function() {
    var podcastEntries = this.props.data.map(function(podcast) {

      var feedUrl = podcast.feedUrl
      var feed = new google.feeds.Feed(feedUrl);
      var entry = {podcastTitle: "The BeaaaastCast",
            feedUrl: "http://www.giantbomb.com/podcast-xml/beastcast/",
            imgUrl: "http://static.giantbomb.com/uploads/original/0/31/2750982-beastcast_itunes.png",
            episodeTitle: "number 40",
            episodeDate: "Monday, February 26th 2016 @ 6:00 AM",
            episodeDescription: " We've got pricing news that seems to make the reality of VR a bit more virtual, our thoughts on SUPERHOT, updates on the Coleco Chameleon and Leland Yee, your questions, our mistakes, and more! ",
            episodeDownload: "http://www.giantbomb.com/podcasts/download/1519/Ep40_-_The_Giant_Beastcast-02-25-2016-1683396598.mp3"
          };
      feed.setNumEntries(4);
      feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);
      feed.load(function(result) {
        if (!result.error) {
          entry = result.feed;
          google.setOnLoadCallback(this.handleFeedCallback);
        }
        else
        {
          console.log(result.error.message);
        }
        console.log(entry.entries[0].content);
      });
      return (
        <Podcast key={podcast.id} 
        podcastTitle={entry.podcastTitle} 
        imgUrl={podcast.imgUrl}
        episodeTitle={podcast.episodeTitle}
        episodeDate={podcast.episodeDate}
        episodeDownload={podcast.episodeDownload}>
          {entry.podcastTitle}
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
            feedUrl: "http://www.giantbomb.com/podcast-xml/beastcast/",
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

ReactDOM.render(
  //React.createElement(PodcastBox, null),
  <PodcastBox data={data} />,
  document.getElementById('content')
);