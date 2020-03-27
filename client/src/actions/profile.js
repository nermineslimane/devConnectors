import axios from 'axios'
import { setAlert } from './alert'
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_ACCOUNT,
  CLEAR_PROFILE
} from './types'

//GET user's profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('api/profile/me')
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}
//Create or update a profile

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post('/api/profile', formData, config)
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

    dispatch(setAlert(edit ? 'Profile updated' : 'Profile Created', 'success'))
    if (!edit) {
      history.push('dashboard')
    }
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}
//Add experience

export const addExperience = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.put('/api/profile/experience', formData, config)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience added', 'success'))

    history.push('dashboard')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

//Add education

export const addEducation = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.put('/api/profile/education', formData, config)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education added', 'success'))

    history.push('dashboard')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}
//delete experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`api/profile/experience/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience Removed', 'success'))
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

//delete education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`api/profile/education/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education Removed', 'success'))
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

//delete profile
export const deleteProfile = () => async dispatch => {
  if (window.confirm('Are you sure ? this can NOt be undone !')) {
    try {
      const res = await axios.delete('api/profile')
      dispatch({
        type: CLEAR_PROFILE
      })
      dispatch({
        type: DELETE_ACCOUNT
      })

      dispatch(setAlert('Your account has been permanently deleted'))
    } catch (err) {
      const errors = err.response.data.errors
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      })
    }
  }
}
