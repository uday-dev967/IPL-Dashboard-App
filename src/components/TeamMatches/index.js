import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {teamMatchesData: {}, isLoading: true}

  componentDidMount() {
    this.getTeamData()
  }

  getTeamData = async () => {
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const latestMatchData = data.latest_match_details
    const recentMatchData = data.recent_matches
    const updateLatestMatchData = {
      umpires: latestMatchData.umpires,
      result: latestMatchData.result,
      manOfTheMatch: latestMatchData.man_of_the_match,
      id: latestMatchData.id,
      date: latestMatchData.date,
      venue: latestMatchData.venue,
      competingTeam: latestMatchData.competing_team,
      competingTeamLogo: latestMatchData.competing_team_logo,
      firstInnings: latestMatchData.first_innings,
      secondInnings: latestMatchData.second_innings,
      matchStatus: latestMatchData.match_status,
    }
    const updatedRecentMatchData = recentMatchData.map(each => ({
      umpires: each.umpires,
      result: each.result,
      manOfTheMatch: each.man_of_the_match,
      id: each.id,
      date: each.date,
      venue: each.venue,
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      firstInnings: each.first_innings,
      secondInnings: each.second_innings,
      matchStatus: each.match_status,
    }))

    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: updateLatestMatchData,
      recentMatchDetails: updatedRecentMatchData,
    }
    this.setState({teamMatchesData: updatedData, isLoading: false})
  }

  render() {
    const {teamMatchesData, isLoading} = this.state
    console.log(teamMatchesData)
    const {match} = this.props
    const {params} = match
    const {id} = params
    const {
      teamBannerUrl,
      latestMatchDetails,
      recentMatchDetails,
    } = teamMatchesData
    return (
      <>
        <div className={`bg-container ${id}`}>
          {isLoading ? (
            // eslint-disable-next-line react/no-unknown-property
            <div testid="loader">
              <Loader type="Oval" color="#ffffff" height={50} width={50} />
            </div>
          ) : (
            <>
              <img
                src={teamBannerUrl}
                className="banner-img"
                alt="team banner"
              />
              <h1 className="latest-name">Latest Matches</h1>
              <LatestMatch
                key={latestMatchDetails.id}
                latestDetails={latestMatchDetails}
              />
              <ul className="recent-list">
                {recentMatchDetails.map(eachValue => (
                  <MatchCard key={eachValue.id} matchDetails={eachValue} />
                ))}
              </ul>
            </>
          )}
        </div>
      </>
    )
  }
}

export default TeamMatches
