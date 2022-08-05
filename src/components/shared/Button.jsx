import PropTypes from 'prop-types'

function Button({ children, version,  type, isDisaled}) {
  return (
    <button type={type} disabled={isDisaled} className={`btn btn-${version}`}>
      {children}
    </button>
  )
}

Button.defaultProps = {
    type: 'button',
    version: 'primary',
    isDisaled: false,
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    version: PropTypes.string,
    type: PropTypes.string,
    isDisaled: PropTypes.bool,
}

export default Button
