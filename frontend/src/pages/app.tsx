import './app.css';
import { Route } from 'react-router-dom';
import ProblemsPage from './problems/problems.page';
import ProblemPage from "./problem/problem.page"
import { Helmet } from 'react-helmet';
import SignUpPage from './sign-up/sign-up.page';
import LogInPage from './log-in/log-in.page';

const App = () => {
  return (
    <div className="App">
      <Helmet>
        <title>Evaluator</title>
      </Helmet>
      <Route exact path="/" component={ProblemsPage} />
      <Route exact path="/problem/details/:problemId" component={ProblemPage} />
      <Route exact path="/sign-up" component={SignUpPage} />
      <Route exact path="/log-in" component={LogInPage} />
    </div>
  );
}

export default App;
