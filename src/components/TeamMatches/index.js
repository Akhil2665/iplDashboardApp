// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import TeamStats from '../TeamStats'

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

  getNoOfMatches = value => {
    const {matchDetailsList} = this.state
    const {latestMatchDetails, recentMatches} = matchDetailsList
    console.log(latestMatchDetails, 'latestMatchDetails')
    const currentMatch = value === latestMatchDetails.matchStatus ? 1 : 0
    const result =
      recentMatches.filter(match => match.match_status === value).length +
      currentMatch
    return result
  }

  generatePieChartData = () => [
    {name: 'Won', value: this.getNoOfMatches('Won')},
    {name: 'Lost', value: this.getNoOfMatches('Lost')},
    {name: 'Drawn', value: this.getNoOfMatches('Drawn')},
  ]

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

    const onClickedBackBtn = () => {
      const {history} = this.props
      history.push('/')
    }

    return (
      <div className="team-matches-container">
        <button className="back-btn" type="button" onClick={onClickedBackBtn}>
          Back
        </button>
        <TeamStats data={this.generatePieChartData()} />
        <img
          src={teamBannerUrl}
          alt="team banner"
          className="team-banner-image"
        />
        <h1 className="latest-matches-heading">Latest Matches</h1>
        <div className="latest-match-details-container">
          <LatestMatch latestMatchDetails={updatedLatestMatchDetails} />
        </div>
        <ul className="recent-matches-list">
          {updatedrecentMatches.map(eachTeamCard => {
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
    <div data-testid="loader">
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
