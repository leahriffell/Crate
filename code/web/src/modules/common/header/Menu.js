// Imports
import React from 'react'

// Component
// this refers to the whole menu
// children passed in as props is what is getting rendered
const Menu = (props) => {
  const { children, ...others } = props

  return (
    <div {...others}>
      {children}
    </div>
  )
}

export default Menu
