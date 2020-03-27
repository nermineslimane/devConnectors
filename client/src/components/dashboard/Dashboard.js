import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Spinner } from '../layout/Spinner'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [])
  return loading && profile === null ? (
    <Spinner />
  ) : profile !== null ? (
    <Fragment>
      <DashboardActions />
      <Experience experience={profile.experience} />
      <Education education={profile.education} />
    </Fragment>
  ) : (
    <Fragment>
      <p>You have not Setup a profile,please add some info</p>
      <Link className='btn btn-primary my-1' to='/create-profile'>
        Create Profile
      </Link>
    </Fragment>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
