import React from 'react'
import { useParams } from 'react-router-dom'

import {
  Container,
  Main,
  LeftSide,
  RightSide,
  Repos,
  CalendarHeading,
  RepoIcon,
  Tab,
} from './styles'
import ProfileData from '../../components/ProfileData'
import RepoCard from '../../components/RepoCard'
import RandomCalendar from '../../components/RandomCalendar'
import { useFetch } from '../../hooks/useFetch'

const Profile = () => {
  const { username = 'junilima' } = useParams()
  const user = useFetch(`users/${username}`)
  const repos = useFetch(`users/${username}/repos`)

  if (!user || !repos || !user.data || !repos.data) {
    return <h1>Loading...</h1>
  }

  if (user?.error) {
    return <h1>{user.error}</h1>
  }

  if (repos?.error) {
    return <h1>{repos.error}</h1>
  }

  const TabContent = () => {
    return (
      <div className="content">
        <RepoIcon />
        <span className="label">Repositores</span>
        <span className="number">{user.data?.public_repos}</span>
      </div>
    )
  }

  return (
    <Container>
      <Tab className="desktop">
        <div className="wrapper">
          <span className="offset" />
          <TabContent />
        </div>
        <span className="line" />
      </Tab>

      <Main>
        <LeftSide>
          <ProfileData
            username={user.data.login}
            name={user.data.name}
            avatarUrl={user.data.avatar_url}
            followers={user.data.followers}
            following={user.data.following}
            company={user.data.company}
            location={user.data.location}
            email={user.data.email}
            blog={user.data.blog}
          />
        </LeftSide>
        <RightSide>
          <Tab className="mobile">
            <TabContent />
            <span className="line" />
          </Tab>

          <Repos>
            <h2>Random repos</h2>

            <div>
              {repos.data.map((item) => (
                <RepoCard
                  key={item.name}
                  username={item.owner.login}
                  reponame={item.name}
                  description={item.description}
                  language={item.language}
                  forks={item.stargazers_count}
                  stars={item.forks}
                />
              ))}
            </div>
          </Repos>

          <CalendarHeading>
            Random calendar (do not represent actual data)
          </CalendarHeading>

          <RandomCalendar />
        </RightSide>
      </Main>
    </Container>
  )
}

export default Profile
