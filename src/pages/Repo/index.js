import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import {
  Container,
  Breadcrumb,
  RepoIcon,
  Stats,
  StarIcon,
  ForkIcon,
  LinkButton,
  GithubIcon,
} from './styles'
import { useFetch } from '../../hooks/useFetch'

function getRepo(reponame, repos) {
  let repo = {}

  repos.data.forEach((item) => {
    if (item.name === reponame) {
      repo = item
      return
    }
  })

  return repo
}

const Repo = () => {
  const { username = 'junilima', reponame = 'github-react' } = useParams()
  const repos = useFetch(`users/${username}/repos`)

  if (!repos | !repos.data) {
    return <h1>Loading...</h1>
  }

  if (repos?.error) {
    return <h1>{repos.error}</h1>
  }

  const repo = getRepo(reponame, repos)

  console.log(repo)
  if (!repo) {
    return <h1>Repository not found</h1>
  }

  return (
    <Container>
      <Breadcrumb>
        <RepoIcon />
        <Link className={'username'} to={`/${username}`}>
          {username}
        </Link>
        <span>/</span>
        <Link className={'reponame'} to={`/${username}/${reponame}`}>
          {reponame}
        </Link>
      </Breadcrumb>

      <p>{repo.description}</p>

      <Stats>
        <li>
          <StarIcon />
          <b>{repo.stargazers_count}</b>
          <span>stars</span>
        </li>
        <li>
          <ForkIcon />
          <b>{repo.forks}</b>
          <span>forks</span>
        </li>
      </Stats>

      <LinkButton href={`https://github.com/${username}/`}>
        <GithubIcon />
        <span> View on Github</span>
      </LinkButton>
    </Container>
  )
}

export default Repo
