

var PodcastBox = React.createClass({
  render: function() {
    return (
      <div className="podcastBox">
          <PodcastList data={this.props.data} />
      </div>
    );
  }
});

var PodcastList = React.createClass({
  render: function() {
    //var podcastEntries = this.props.data.map(function(comment) {
    return (
        <div className="podcastList">
          <Podcast 
            imgUrl="http://static.giantbomb.com/uploads/original/0/31/2750982-beastcast_itunes.png"
            podcastTitle="The BeastCast"
            episodeTitle="number 40"
            episodeDate="Monday, February 26th 2016 @ 6:00 AM">
              A description
            </Podcast>
        </div>
      );
  }
});
//<PodcastTitle imgUrl="http://static.giantbomb.com/uploads/original/0/31/2750982-beastcast_itunes.png">The BeastCast!</PodcastTitle>
//<Episode episodeTitle="number 40" episodeDate="Monday, February 26th 2016 @ 6:00 AM">A description</Episode>
          

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

ReactDOM.render(
  React.createElement(PodcastBox, null),
  //<PodcastBox data={data} />
  document.getElementById('content')
);