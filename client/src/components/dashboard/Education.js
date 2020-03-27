import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profile'

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(edu => (
    <tr key={edu.id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment>-
        {edu.to === null ? (
          'Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
        )}
      </td>

      <td>
        <button
          onClick={() => deleteEducation(edu._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ))

  return (
    <Fragment>
      <div class='profile-exp bg-white p-2'>
        <h2 class='text-primary'>Education Credentials</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>School</th>
              <th className='hide-sm'>Degree</th>
              <th className='hide-sm'>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      </div>
    </Fragment>
  )
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education)
