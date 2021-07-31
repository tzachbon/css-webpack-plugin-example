import classes from './button.css'

export const Button: React.FC = (
  {
    children
  }
) => (
  <button className={classes.button} onClick={() => console.log(children)}>
    {children}
  </button>
)