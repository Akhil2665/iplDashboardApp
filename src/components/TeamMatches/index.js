// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    matchDetailsList: {},
  }

  componentDidMount() {
    this.getTeamData()
  }

  getTeamData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const jsonData = await response.json()

    const updatedMatchCardData = {
      latestMatchDetails: jsonData.latest_match_details,
      recentMatches: jsonData.recent_matches,
      teamBannerUrl: jsonData.team_banner_url,
    }

    this.setState({
      isLoading: false,
      matchDetailsList: updatedMatchCardData,
    })
  }

  renderselectedTeamData = () => {
    const {matchDetailsList} = this.state
    const {latestMatchDetails, teamBannerUrl, recentMatches} = matchDetailsList
    const updatedLatestMatchDetails = {
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      competingTeam: latestMatchDetails.competing_team,
      matchStatus: latestMatchDetails.match_status,
      result: latestMatchDetails.result,
      venue: latestMatchDetails.venue,
      id: latestMatchDetails.id,
      umpires: latestMatchDetails.umpires,
      firstInnings: latestMatchDetails.first_innings,
      secondInnings: latestMatchDetails.second_innings,
      date: latestMatchDetails.date,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
    }

    const updatedrecentMatches = recentMatches.map(eachTeamCard => ({
      id: eachTeamCard.id,
      competingTeam: eachTeamCard.competing_team,
      competingTeamLogo: eachTeamCard.competing_team_logo,
      matchStatus: eachTeamCard.match_status,
      result: eachTeamCard.result,
    }))

    return (
      <div className="team-matches-container">
        <img
          src={teamBannerUrl}
          alt="team banner"
          className="team-banner-image"
        />
        <h1 className="latest-matches-heading">Latest Matches</h1>
        <div className="latest-match-details-container">
          <LatestMatch latestMatchDetails={updatedLatestMatchDetails} />
        </div>
        <ul className="teams-card-container">
          {updatedrecentMatches.map(eachTeamCard => {
            console.log(eachTeamCard)
            return (
              <MatchCard
                matchCardDetails={eachTeamCard}
                key={eachTeamCard.id}
              />
            )
          })}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div>
        <div>
          {isLoading ? this.renderLoader() : this.renderselectedTeamData()}
        </div>
      </div>
    )
  }
}

export default TeamMatches
