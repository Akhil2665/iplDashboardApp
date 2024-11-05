// Write your code here
import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {teamCardDetails} = props
  const {id, name, teamImageUrl} = teamCardDetails

  return (
    <Link to={`/team-matches/${id}`}>
      <li className="each-team-card-container">
        <img src={teamImageUrl} alt={name} className="team-image-url" />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard

// const teamId = name
//   .split(' ')
//   .map(each => each[0].toUpperCase())
//   .join('')
// console.log(teamId)
