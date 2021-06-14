import React from "react"
import { Button, Alert, Card } from "react-bootstrap"
import { useAuth } from "../../Context/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { useTheme } from "../../Context/ThemeContext"

function Profile() {
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const {theme} = useTheme()

  const logOutHandler = () => {
    logout()
    history.push("/login")
  }

  return (
    <>
      <Card border="primary" bg={theme.variant==="light" ?"light" :"dark"} text>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {currentUser && <Alert variant="success">{currentUser.email}</Alert>}
          <Link to="/update">Update Profile</Link>
          <Button className="w-100 mt-2" onClick={logOutHandler}>
            Logout
          </Button>
        </Card.Body>
      </Card>
    </>
  )
}

export default Profile
