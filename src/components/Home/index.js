// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    teamsDataList: [],
  }

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    console.log(response)
    const jsonData = await response.json()
    console.log(jsonData)
    const updatedJsonData = jsonData.teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))

    this.setState({
      isLoading: false,
      teamsDataList: updatedJsonData,
    })
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderTeamsData = () => {
    const {teamsDataList} = this.state
    return (
      <ul className="teams-card-container">
        {teamsDataList.map(eachTeamCard => (
          <TeamCard teamCardDetails={eachTeamCard} key={eachTeamCard.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-container">
        <div className="heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            className="ipl-logo"
            alt="ipl logo"
          />
          <h1 className="dashboard-heading">IPL Dashboard</h1>
        </div>
        {isLoading ? this.renderLoader() : this.renderTeamsData()}
      </div>
    )
  }
}

export default Home
