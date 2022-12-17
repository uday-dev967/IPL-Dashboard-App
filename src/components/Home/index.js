import Loader from 'react-loader-spinner'
import {Component} from 'react'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {teamList: [], isLoading: true}

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data
    const updatedList = teams.map(each => ({
      id: each.id,
      teamImageUrl: each.team_image_url,
      name: each.name,
    }))
    this.setState({teamList: updatedList, isLoading: false})
  }

  render() {
    const {teamList, isLoading} = this.state
    return (
      <div className="main-cont">
        {isLoading ? (
          // eslint-disable-next-line react/no-unknown-property
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <div className="logo-main">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                className="ipl-logo"
                alt="ipl logo"
              />
              <h1 className="logo-name">IPL Dashboard</h1>
            </div>
            <ul className="dash-list">
              {teamList.map(eachValue => (
                <TeamCard key={eachValue.id} teamItem={eachValue} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default Home
