import classes from './app.css'
import { Button } from './button'

export const App: React.VFC = () => (
  <div className={classes.root}>
    <span className={classes.title}>
      Hello!
    </span>
    <Button>
      Click here!
    </Button>
  </div>
)