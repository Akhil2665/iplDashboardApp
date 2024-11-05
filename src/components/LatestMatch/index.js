// Write your code here
import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    result,
    date,
    venue,
    umpires,
    firstInnings,
    secondInnings,
    manOfTheMatch,
  } = latestMatchDetails
  console.log(`latest match ${competingTeam}`)
  console.log(competingTeam)
  return (
    <div className="latest-match-details-container">
      <div className="competing-team-details-container">
        <div className="venue-details-container">
          <p className="team-name">{competingTeam}</p>
          <p className="match-date">{date}</p>
          <p className="match-date">{venue}</p>
          <p className="match-date">{result}</p>
        </div>
        <img
          src={competingTeamLogo}
          className="competing-team-logo-image"
          alt={`latest match ${competingTeam}`}
        />
      </div>

      <div className="match-summary-container">
        <p className="summary-heading">First Innings</p>
        <p className="summary-content">{firstInnings}</p>
        <p className="summary-heading">Second Innings</p>
        <p className="summary-content">{secondInnings}</p>
        <p className="summary-heading">Man Of The Match</p>
        <p className="summary-content">{manOfTheMatch}</p>
        <p className="summary-heading">Umpires</p>
        <p className="summary-content">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
