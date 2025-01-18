// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchCardDetails} = props
  const {result, competingTeam, competingTeamLogo, matchStatus} =
    matchCardDetails

  const activeClassStatus =
    matchStatus === 'Won' ? 'match-status won' : 'match-status lost'
  return (
    <li className="recent-match-details-container">
      <img
        src={competingTeamLogo}
        className="competing-team-logo"
        alt={`competing team ${competingTeam}`}
      />
      <p className="competing-team">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={activeClassStatus}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
